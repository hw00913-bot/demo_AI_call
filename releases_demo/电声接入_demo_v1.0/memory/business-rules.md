# 已确认业务规则

## 业务对象定义

- **外呼任务 (Call Strategy)**：由东风日产在智能外呼中台创建业务场景后，通过新版 `/strategy/policy/create` 在电声侧生成或维护的任务配置，以 `strategyCode` 作为外部唯一编码。
  - 新建电声业务场景提交时必须先调用电声接口。仅当响应 `code=S0000` 且返回 `strategyId`、`strategyCode` 后，才写入本地业务场景、外呼任务和任务详情；接口失败时本地不入库。
- **导入批次 (Import Batch)**：上传文件单次最多包含 50 条线索，中台按号码逐条调用新版 `/lead/batch/async/import`。每个号码生成一个唯一 `importBatchId`，固定提交 `isCompleted=true`，不保留未完成批次。
- **执行批次 (Execute Batch)**：每个完成态导入批次按任务配置进入执行流程并返回 `executeBatchId`。当前版本没有独立启动接口，执行批次仅支持查询和整批停止。
- **客户线索 (Customer / Lead)**：以电话号码为唯一标识的呼叫对象，包含门店编码 `dlrCode`、最后通话状态及最终意向。
- **通话记录 (Call Record)**：单次物理通话产生的流水记录，包括录音 URL、起止时间、接听状态和小结信息。
- **通话小结 (Call Summary)**：AI 外呼引擎对通话进行 NLU 解析后产出的结构化意向评级与标签。

## 关键字段含义

- **中台通话状态映射 (`answerMainStatus` / `answerStatus`)** [FLD-006, FLD-007]：
  - 中台只有一个“通话状态”字段，不新增主接听状态和子接听状态字段。
  - 优先按 `answerStatus` 映射具体状态；缺失或未知时才按 `answerMainStatus` 兜底。
  - 中台在原有状态基础上新增“秒挂、伪接通”，完整 25 项枚举为：已接通、秒挂、伪接通、无人接听、占线、拒接、空号、关机、停机、欠费、无法接通、黑名单过滤、拦截规则、待呼叫去重、分机号错误、呼叫受限、主叫欠费、呼损客户、外呼失败、转人工呼损、线路拦截、等待重呼、号码故障、线路故障、等待呼叫。
  - 电声直接映射：`301` → 已接通，`302` → 秒挂，`303` → 伪接通，`205` → 拒接，`206` → 无人接听；子状态不可识别时，`answerMainStatus=3` → 已接通，`answerMainStatus=2` → 无法接通。
  - 电声当前不提供占线、空号、关机、停机、欠费等细分状态，不允许推测生成。
  - 电声原始字段保存在供应商原始数据中用于排查，不在中台业务页面独立展示。
- **意向研判分类 (`intentionStatus` / `intentionRank`)** [FLD-009, FLD-010]：
  - `intentionStatus` 为是否有意向的大类标定。
  - `intentionRank` 细分为字母等级（A/B/C/D），代表用户对购车意愿的高低。
  - 电声任务沿用中台原有意向配置、分类统计和洞察功能，配置弹窗与洞察图例仅使用 A（高）、B（中）、C（低）、D（无意向）。
  - 未接通不得映射为 E/F 意向等级，应由主、子接听状态承载。
- **加微状态 (`wechatStatus`)** [FLD-011]：
  - 代表该线索关联的微信好友添加结果，用于在前台做加微成功率的过滤及只读显示。
- **电声呼叫任务配置** [FLD-016 ~ FLD-023]：
  - 新建电声业务场景时配置场景类型、呼叫星期、呼叫时段、重试配置、黑名单校验和自动启动配置；机器人编码由场景类型自动映射。
  - 转人工本期不开放。由于接口要求 `humanTransfer` 必传，中台固定提交 `{ "enabled": false }`，页面不提供配置。
  - 呼叫时段映射到 `callTimeWindow.windows[]`，支持多条配置；每条时段独立选择星期、开始时间和结束时间。
  - 排除日期映射到 `callTimeWindow.excludeDates`，为可选的 `yyyy-MM-dd` 字符串数组，用于节假日或禁止拨打日期，仅在批次启动前生效。
  - `callTimeWindow.onOutOfWindow` 不由中台填写，字段缺省时由电声按“顺延”处理。
  - `autoStart.enabled` 必填且默认为 `true`；用户关闭自动启动时生成 `enabled=false`，中台要求必须同时填写 `yyyy-MM-dd HH:mm:ss` 格式的 `executeDateTime`。
  - 自动重拨采用单条 N 天 M 呼配置，维护最大执行天数、最大呼叫次数和间隔分钟数组，不支持新增多条规则。
  - 页面不提供机器人选择控件；新线索和冷线索分别从 `config/diansheng-robots.json` 读取固定机器人映射，只读展示名称和编码，提交时自动写入 `robotCode`。映射缺失时禁止生成任务。
  - 任务 id 不由前端输入；新版接口以 `strategyCode` 作为任务主键，线索导入后异步生成执行批次与任务。
  - 呼叫任务配置写入任务详情，用于后续外呼列表与评审核对。

## 主要状态和枚举

- **任务状态枚举**：
  - `1` / 跟进中：任务下至少有一条客户线索未完成呼叫。
  - `2` / 已完成：任务下所有客户线索全部呼叫完成。
  - `3` / 已终止：任务已被产品经理手动终止，此时任务下所有线索置为已完成。
- **电声任务创建规则**：
  - 必填项：任务编码 `strategyCode`、任务名称 `strategyName`、线索类型与机器人映射、呼叫时间窗口、重试配置、黑名单校验配置、自动启动配置；`humanTransfer.enabled` 固定为 `false`。
  - 提交成功后返回 `strategyId`、`strategyCode`、`statusType`、`createdTime`；线索导入必须引用已启用的 `strategyCode`。
  - 电声 `statusType=1`（启用）映射中台任务“进行中”，`statusType=0`（冻结）映射中台任务“用户暂停”。
  - 中台暂停电声任务时调用 `/strategy/policy/status/inactive/update`；仅当接口成功且返回 `statusType=0` 后更新本地为“用户暂停”，接口失败时本地状态保持不变。
  - 外呼列表-电声任务-任务详情按任务详情接口字段展示，不再展示中科金专属的 AI 坐席数、外呼号码、签名 MD5 Key 等字段。
  - 中途修改自动重拨配置后，已有待重拨号码不再执行旧配置，页面以提示文案说明该边界。
  - 开启自动重拨时，至少需要保留一条已选择首次呼叫状态的重呼规则。
- **呼叫名单与执行批次规则**：
  - 已分配、待呼叫、已呼叫、已过滤、呼叫失败是中台号码流转状态，不直接等同于电声执行批次状态或线索状态。
  - 电声导入接口固定传 `isCompleted=true` 并返回 `executeBatchId`，中台必须按号码保存“任务—策略编码—号码—导入批次号—执行批次号”关系。
  - 执行批次入口位于任务查看抽屉的“呼叫名单”中；批次详情按本地批次号逐条调用 `/execute/batch/detail/query` 刷新。
  - `WAIT_START`、`RUNNING` 批次可停止；`STOPPED`、`FINISHED`、`FAILED` 不可重复停止。停止接口失败时本地状态不变。
  - 停止批次只更新批次状态及未完成线索，不修改电声策略 `statusType` 和中台任务状态。
- **通话状态码映射表** (依据 [通话状态码.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/通话状态码.md) 权威核对)：
  - `answerStatus=301` → 已接通；`302` → 秒挂；`303` → 伪接通；`205` → 拒接；`206` → 无人接听。
  - 子状态无法识别时，`answerMainStatus=3` → 已接通，`answerMainStatus=2` → 无法接通。
  - 电声 `leadStatus=BLOCKED` 或 `finalCallResult=BLOCKED` 将呼叫名单归为已过滤，并映射本地通话状态“黑名单过滤”。
- **外呼过滤结果**：
  - 电声仅通过 `BLOCKED` 标识线索被过滤或拉黑，不返回空号、停机、重复号码等细分过滤原因。
  - 黑名单只支持手工或 API 维护，通话回调不会自动新增黑名单记录。

## 权限或角色边界

- **超级管理员**：可见全量租户数据，但只能操作并修改自己创建的任务，无权操作其他角色创建的任务。
- **租户管理员**：可见并操作本租户下的所有任务、统计报表与线索。
- **租户运营**：本租户只读权限。对于“业务场景创建”、“线路管理”、“通道管理”等配置页面无操作和提交权限。
- **电声业务场景创建权限**：仅超级管理员和租户管理员可新建或编辑；租户运营只读。

## 异常、空状态或边界规则

- **签名校验请求体生成算法** (依据 20260713 接口文档校验)：
  1. 签名字段放在 Body，使用 `x_url_custom`、`x_nonce_str_custom`、`x_timestamp_custom`、`x_sign_custom`；
  2. POST 顶级参数 Key 按字典升序排列；
  3. 按排序后的 Key 依次拼接对应参数值，`null` 跳过，数组用英文逗号连接，对象按双方约定 JSON 字符串参与；
  4. 追加请求地址、随机字符串、时间戳和 MD5 Key；
  5. MD5 加密（UTF-8）后生成 32 位小写签名，写入 `x_sign_custom`。
- **话单推送重试机制**：
  - 话单回调接口由电声推送给中台，中台的 HTTP 响应体必须在 5 秒内返回 `"code": "S0000"`，否则电声将触发最多 3 次重试。
- **过滤结果展示**：原型不单独展示 `finalCallResult`。当 `leadStatus` 或 `finalCallResult` 为 `BLOCKED` 时，在已过滤名单的“过滤原因”列显示中台状态“黑名单过滤”；完整枚举原值继续保存在供应商数据中，非拦截类通话状态读取 `answerStatus`。
- **通话详情外呼结果来源**：
  - 外呼小结优先读取电声 `summary`；无值时读取百炼 `bailianSummary`；两者均无值时显示 `-`。
  - 外呼结果内容只读取百炼智能体 `bailianAgentTags`，固定展示意向标签、计划到店时间、预计购车时间、意向品牌中文名、意向车系中文名，缺失值显示 `-`。
  - 电声 `intentionStatus`、`intentionRank`、`intentionTag` 只在详细信息中作为供应商原始结果展示，不参与外呼结果标签生成。

## 外部资料或接口来源引用

- 新版外呼任务创建：见 [ diansheng-api 20260707 - 新增外呼任务 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260707.md#L132)
- 新版批量导入线索：见 [ diansheng-api 20260707 - 批量导入线索 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260707.md#L759)
- 最新执行流程：中台按一号码一批次固定提交 `isCompleted=true`；执行批次只提供详情查询和整批停止，见 [diansheng-api 20260713](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260713.pdf)。
- D01 (旧版批量导入线索)：见 [ diansheng-api - 接口 1 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md#L191)
- D08 (导入结果回调)：见 [ diansheng-api - 导入回调 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md#L300)
- D05 (外呼前过滤上报)：见 [ diansheng-api - 过滤接口 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md#L350)
- D02/D06 (通话记录与小结推送)：见 [ diansheng-api - 话单推送回调 ](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md#L362)

## 标签管理规则

- 电声项目在系统管理下提供 `标签管理` 页面，默认进入 `供应商标签集 / 电声平台 / 门店租户 / 新线索`。
- 标签管理统一维护督办、服务、回访、新线索、冷线索及后续新增场景，不按电声任务场景支持范围禁用标签配置。
- 标签管理保留场景新增、编辑、启停和删除能力；新增场景默认启用，并同步出现在中台标签集和供应商标签集中。
- 电声仅支持新线索和冷线索的限制仅作用于新建业务场景表单，不作用于标签管理。
- 电声供应商标签池来源于当前电声话单与线索结果，包括 `intentionRank`、`wechatStatus` 和 `BLOCKED`；“需重拨”根据执行批次线索明细的 `attemptCount > 1` 派生。本期不提供转人工标签，也不配置空号、停机、重复号码等无接口依据的过滤标签。
- 供应商标签必须映射到中台本地标签集后，才作为统一意向/跟进口径使用；页面保留供应商标签启用、停用、新增、编辑、删除和本地标签映射能力。
