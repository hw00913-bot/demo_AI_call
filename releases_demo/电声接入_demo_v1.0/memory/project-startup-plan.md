# 项目启动规划

> 本文件是 S1 项目讨论阶段的启动快照。它只记录项目启动时的初始规划，S2 项目确认后冻结；后续阶段只读，用于溯源。S2 之后的范围、资料、字段或页面变更，不回改本文件，必须写入 `docs/decisions.md` 或 `memory/change-log.md`。

## 文件规则

- **写入阶段**：S1 项目讨论。
- **冻结时机**：S2 项目确认完成时。
- **后续用途**：只读溯源。
- **后续变更位置**：`docs/decisions.md` / `memory/change-log.md`。
- **禁止事项**：S2 后不得修改本文件来伪造启动时已确认的范围。

## 启动来源

- **项目起点**：AI智能外呼中台与东风日产、电声AI语音外呼平台的对接交互。
- **底座项目**：[中科金接入_demo_v1.0](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/中科金接入_demo_v1.0)。
- **底座保留内容**：基础前端页面结构（index.html）、全局样式（global.css、app.css）、导航菜单逻辑（nav.js、nav.json）、以及公共组件与底座的基础列表页。
- **底座重置为空内容**：底座的运行记忆（`memory/`）已被重置；Mock 数据需要重构，移除原有中科金字段，重置为电声的真实 API 字段结构。
- **底座禁止修改内容**：通用导航控制逻辑与通用的 UI 主色调和整体系统底座布局。

## 产品形态

- **面向类型**：B端租户管理员、业务运营和超级管理员。
- **载体形态**：AI外呼中台静态前端原型系统（HTML/CSS/Vanilla JS）。
- **主要使用角色**：租户管理员（查看外呼概览、名单与记录），业务运营（查看名单与数据）。

## 项目目的

- **实现目的**：展示电声平台对接后的整体原型。模拟东风日产数据通过电声中台发送给电声AI语音外呼平台的执行路径，包括签名计算、线索上报、话单回调、以及转人工推送的完整闭环展现。
- **评审对象**：产品经理与业务干系人。
- **需要验证的业务假设**：
  - 电声业务场景能在前台配置呼叫任务配置，并按 20260707 新版接口在提交时生成/维护外呼任务编码 `strategyCode`。
  - 已过滤名单按最新版接口统一展示 `BLOCKED`（过滤/拉黑），不再假设电声返回空号、停机、重复号码等细分原因。
  - 能准确映射电声对接的核心业务字段：如主接听状态（`answerMainStatus`）、具体子接听状态（`answerStatus`）、意向研判状态（`intentionStatus`/`intentionRank`）以及加微状态（`wechatStatus`）。
  - 通话详情能直接查看机器人会话记录、录音文本和小结信息。
- **不属于本次验证目标**：真实的后端签名校验服务、真实的讯飞/电声外呼引擎调度、真实的录音文件下载。

## 项目范围

- **本期模块**：
  - 系统管理-业务场景（新增电声场景，无需配置外呼通道和加微坐席参数）
  - 外呼场景-外呼列表（电声外呼任务卡片及操作，支持详情滑页展示）
  - 数据查看（数据概览与详情）
  - 呼叫名单（已分配/待呼叫/已呼叫/已过滤/呼叫失败）
  - 统计分析-通话统计（外呼统计与客户统计）
  - 外呼结果（通话记录及详情、线索记录及回访明细）
- **本期页面**：
  - `index.html` (作为主要入口承载各子页面的动态渲染)
- **本期能力**：
  - 支持选择平台“电声”，不再提供外呼通道选择，直接对接默认的电声外呼模式。
  - 模拟电声呼叫任务配置配置、任务生成、数据导入、执行批次、话单回调和统计聚合。
  - 模拟线索导入（新版 `/lead/batch/async/import`）、执行批次启动/查询/停止（新版 `/execute/batch/*`）、话单回调和转人工推送接口的触发及状态变化。
  - 支持 `wechatStatus`（加微状态回调展现，前端只读呈现）、`isRedial`（是否重拨）、`dlrCode`（门店编码）、`hangupType`（挂机类型）、呼叫任务配置字段（机器人编码、线索类型映射、呼叫时段、重试配置、黑名单校验、自动启动）的渲染与查询。
- **核心流程**：
  - 新建电声业务场景并生成外呼任务 `strategyCode` -> 导入客户名单并返回 `importBatchId` -> 启动执行并返回 `executeBatchId` -> 触发外呼产生过滤或通话记录 -> 报表数据聚合与同步。

## 非本期范围

- **不做模块**：通道管理、账号管理等非外呼核心后台模块。
- **不做页面**：完全独立的后端配置接口页。
- **不做能力**：真正的录音音频播放、自动重试和分布式锁去重。
- **特别排除**：前端不做加微控制相关的任何配置项（如配置微信坐席和添加微信账号），亦不提供外呼通道的手动选择。

## UI 风格

- **视觉基调**：现代B端扁平设计，主色调沿用蓝色/深灰，卡片式布局。
- **是否沿用底座设计**：是，保持与智能外呼中台底座一致 of 视觉风格。
- **参考风格**：智能外呼中台标准UI。
- **禁用风格**：过度的立体拟物风格或高对比度红绿配色。

## 参考资料

- **本地参考项目**：[中科金接入_demo_v1.0](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/中科金接入_demo_v1.0)。
- **WIKI 权威参考资料（01_WIKI_LLM）**：
  - [电声-日产AI语音外呼对接API文档.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md)
  - [电声接入.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/项目知识/电声接入.md)
  - [智能平台.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/智能平台.md)
  - [通话状态码.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/通话状态码.md)
  - [意向等级.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/意向等级.md)
- **业务文档/总体业务流程**：
  - [电声交付-总体业务流程.md](file:///Users/huhaowen/Documents/33-智能外呼/测试 loop-flow/output/电声交付-总体业务流程.md)
  - [电声交付-S2-异常处理与重试.md](file:///Users/huhaowen/Documents/33-智能外呼/测试 loop-flow/output/电声交付-S2-异常处理与重试.md)

## LLM WIKI 调用计划

- **是否调用**：是，本期 S1/S3 完全消费 01_WIKI_LLM 中电声接入相关物化知识，并写入 `memory/source-materials.md` 与 `memory/field-map.md`。

## 数据和字段来源

- **底座数据**：抛弃中科金特有数据定义，重新设计 mock。
- **需要 mock 的数据**：
  - 外呼任务表（含提交后生成的 `strategyCode`/`strategyId`, `strategyName`, `modelType`, `accountName`, `robotCode`, `leadTypeRobotMapping`, `callTimeWindow`, `retryPolicy`, `blacklistCheck`, `autoStart`）。
  - 导入/执行批次表（含 `importBatchId`, `executeBatchId`, `totalCount`, `successCount`, `failCount`, `executeStatus`）。
  - 客户明细表（含 `phone`, `name`, `dlrCode`, `callStatus` [PENDING/CALLING/FILTERED/ANSWERED/NO_ANSWER/BUSY/REJECTED]）。
  - 接听状态映射（`answerMainStatus` [2未接通/3已接通] 与 `answerStatus` [301接听/302秒挂/303伪接通/205拒接/206无应答]）。
  - 意向研判字段（`intentionStatus` [0无结果/1无意向/2有意向], `intentionRank` [A/B/C/D]）。
  - 加微研判字段（`wechatStatus` [0未加微/1已加微]，由后台话单回调直接驱动并只读呈现在通话记录中）。
  - 过滤记录表（含 `phone`、`finalCallResult=BLOCKED`、本地更新时间）。
  - 通话小结关联（含 `callId`, `conversationText`, `tags`, `hangupSide`, `hangupType` [normal/human]）。
- **必须进入 `memory/field-map.md` 的字段**：
  - `strategyCode` / `strategyId` (提交后生成的外呼任务标识)
  - `robotCode` (机器人id)
  - `leadTypeRobotMapping` (线索类型与机器人映射)
  - `callTimeWindow` (呼叫时段)
  - `retryPolicy` (重试配置)
  - `blacklistCheck` (黑名单校验)
  - `autoStart` (自动启动配置)
  - `importBatchId` / `executeBatchId` (导入与执行批次号)
  - `dlrCode` (门店编码)
  - `answerMainStatus` (主接听状态)
  - `answerStatus` (子接听状态)
  - `intentionStatus` (意向状态)
  - `intentionRank` (意向等级)
  - `wechatStatus` (加微状态)
  - `hangupType` (挂机类型)
  - `isRedial` (是否重拨)

## 整体页面结构

- **导航结构**：保持智能外呼中台左侧导航不变。
- **页面列表**：
  - 业务场景管理 (`sys-scene.js`)
  - 外呼列表及详情 (`scene-list.js`)
  - 通话统计 (`report-call.js`)
  - 通话记录 (`result-records.js`)
  - 线索记录 (`result-clue.js`)
- **页面跳转关系**：
  - 点击左侧导航栏在各模块间切换。
  - **外呼列表点击“查看”滑出详情抽屉页，提供三个主页签展示**：
    1. **数据概览**：展示外呼数据（导入/外呼/过滤/接听客户数、总接听率等）与意向分类。
    2. **呼叫名单**：包含“已分配”、“待呼叫”（支持终止外呼）、“已呼叫”、“已过滤”（呈现过滤原因打标）和“呼叫失败”五个子列表。
    3. **任务详情**：展现场景参数（任务编码、平台、模型类型、账号、机器人、呼叫时段、重拨策略等）。
  - 通话记录点击“详情”滑出通话详情抽屉。
  - 线索记录点击“详情”展示回访明细弹窗，明细弹窗中点击单次详情滑出通话详情抽屉。

## 核心流程

- **用户入口**：`index.html` 打开后默认加载外呼列表页。
- **主流程步骤**：
  1. 新增业务场景时，在智能平台中选择“电声”，填写呼叫任务配置、模型类型和电声账号，提交后生成外呼任务 `strategyCode`；
  2. 导入客户，由新版 `/lead/batch/async/import` 发起上报，并返回 `importBatchId`；
  3. 执行呼叫，未接通或空号停机产生过滤（已过滤 tab 中展示详细原因打标）；
  4. 正常接通则由回调话单返回，详情中能够看到对话录音和文本、线路标识、意向研判状态（有意向/无意向及ABCD）、加微状态以及是否重拨；
  5. 话单中检测到转人工（`hangupType: "human"`）时，将转人工前的历史对话记录推送给坐席呈现。

## 验收方向

- **本轮完成后应看到**：
  - 新建场景抽屉能选择平台“电声”，该平台下不展示外呼通道、加微配置、线路类型、签名密钥或任务 id 输入框。
  - 电声平台展示呼叫任务配置字段，提交后按新版接口生成 `strategyCode` 并写入策略/任务详情 Mock。
  - **外呼列表点击“查看”按钮能成功展示“数据概览”、“呼叫名单”（含终止外呼）、“任务详情”三个主页签**。
  - 呼叫名单各子 tab 数据能够正确分类。
  - 已过滤 tab 统一展示 `BLOCKED` 对应的“过滤/拉黑”，不提供无接口依据的细分原因分类。
  - 通话记录列表聚焦客户、场景、通话状态、小结、智能平台和最后节点，不展示线路类型和加微状态列。
  - 通话详情直接展示机器人会话记录、录音、文本和外呼小结。
- **标注方式**：人工触发。S9 仅提供用于标注生成器的提示词 `memory/annotation-prompt.md`，不自动生成标注数据。

## 约束和风险

- **技术约束**：完全静态页面，所有数据变化须由 `mock/data.js` 通过内存态的事件流/状态更新来实现模拟。
- **字段风险**：避免混淆科大讯飞外呼平台与电声中台代理的层级字段。
- **人工核对项**：需对账 mock data 是否完全覆盖所有典型状态组合。

## S2 前待确认问题

- **阻塞确认项**：无阻塞。
- **可带默认假设继续的问题**：
  - 假设对于“电声”平台，我们的 UI 渲染基本继承“中科金”的整体交互框架，仅对“线路配置”、“签名配置”、“转人工小结推送”以及“过滤原因”与“加微状态”作适配性增加。
