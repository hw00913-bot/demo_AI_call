# 字段映射

> 将 API 文档、参考项目、截图和口述需求中的字段事实整理为 `FLD-*`。执行步骤、验收、验证和标注应引用这些字段编号，避免只停留在来源级 `SRC-*`。

## 使用规则

- 每个字段使用稳定编号：`FLD-001`、`FLD-002`。
- `Source ID` 必须引用 `memory/source-materials.md` 中的 `SRC-*`。
- 如果没有 API 或字段级资料，必须写明 `No field-level source` 和原因。
- 涉及页面展示、筛选、表单、详情、状态、枚举、空值和异常展示的字段，都必须记录。

## Fields

| Field ID | Source ID | Page / Area | API / Data Field | Display Name | Display Format | Enum / Mapping | Empty / Error Rule | Annotation Point | Used In |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FLD-001 | SRC-008 | 新建场景提交结果, 任务详情 | `strategyCode` / `strategyId` | 外呼任务编码 | 文本 | `strategyCode` 为外部唯一编码，`strategyId` 为电声内部生成 | 新建表单不手填任务 id；任务创建失败则创建失败 | 提交生成任务后的基准键 | sys-scene.js, scene-list.js |
| FLD-002 | SRC-009 | 导入结果, 详情 | `importBatchId` / `executeBatchId` | 导入/执行批次号 | 文本 | 导入批次由导入接口返回；`isCompleted=true` 且进入执行流程后返回执行批次 | 新建任务时不预生成批次；`isCompleted=false` 不触发执行 | 导入与执行的批次关联键 | scene-list.js |
| FLD-003 | SRC-008 | 通话记录, 线索记录 | `leadId` / `contextId` | 线索ID | 文本 | 字符串 | 必须唯一 | 关联具体客户线索的基准键 | result-records.js, result-clue.js |
| FLD-004 | SRC-001 | 呼叫名单, 通话/线索记录 | `phoneNumber` / `phone` | 被叫手机号 | 脱敏文本 | 11位手机号，如 `138****8000` | 必填 | 客户号码标识 | js/pages/* |
| FLD-005 | SRC-001 | 线索记录, 呼叫名单 | `dlrCode` | 门店编码 | 文本 | 字符串，如 `H2901` | 空展示为 `-` | 门店匹配字段 | result-clue.js, scene-list.js |
| FLD-006 | SRC-001 | 通话记录, 数据概览 | `answerMainStatus` | 通话状态（兜底来源） | 单一状态标签 | `2` → 无法接通, `3` → 已接通 | 无法识别显示 `-` | 仅当 `answerStatus` 缺失或未知时使用；页面不展示原始主状态 | result-records.js, scene-list.js |
| FLD-007 | SRC-001 | 通话记录, 呼叫名单 | `answerStatus` | 通话状态（优先来源） | 单一状态标签 | `301` → 已接通, `302` → 秒挂, `303` → 伪接通, `205` → 拒接, `206` → 无人接听 | 未识别时回退 FLD-006 | 中台使用 25 项统一状态字典；秒挂和伪接通为新增标准状态 | result-records.js, scene-list.js |
| FLD-008 | SRC-001 | 通话记录, 统计报表 | `callDurationSeconds` | 实际通话时长 | 文本 (如 `45秒`) | 整数 (秒) | 未接通显示为 `-` | 实际时长统计 | result-records.js, report-call.js |
| FLD-009 | SRC-009 | 通话详情, 数据概览 | `intentionStatus` | 意向状态 | 单值胶囊 | `0` 无结果, `1` 无意向, `2` 有意向 | 默认为 `0` | 详细信息归入“意向研判”小节；不作为百炼外呼结果来源 | result-records.js, scene-list.js |
| FLD-010 | SRC-009 | 通话详情, 线索记录, 任务意向配置与洞察 | `intentionRank` | 意向等级 | 单值胶囊/配置选项/图表图例 | `A`(高意向), `B`(中意向), `C`(低意向), `D`(无意向) | 空值按原有页面规则展示 | 详细信息使用胶囊；电声配置下拉和洞察图例不提供 E/F | result-records.js, result-clue.js, scene-list.js |
| FLD-010A | SRC-009 | 通话详情 | `intentionTag` | 意向标签 | 多胶囊 | 兼容 Object、Array 和 String；对象拆成独立“字段：值”胶囊 | 空展示为“无”胶囊 | 多标签自动换行；不作为百炼外呼结果来源 | result-records.js |
| FLD-010B | SRC-009 | 已过滤名单 | `leadStatus` / `finalCallResult` | 通话状态、过滤原因 | 状态标签 | `BLOCKED` -> “黑名单过滤” | 空展示为 `-` | 电声原始值保留在供应商数据中；页面展示中台标准状态 | scene-list.js |
| FLD-011 | SRC-001 | 通话记录, 线索记录 | `wechatStatus` | 加微状态 | 文本 | `0` 未加微, `1` 已加微 | 默认为 `0` | 只读展现加微研判结果 | result-records.js, result-clue.js |
| FLD-012 | SRC-009 | 接口固定参数 | `humanTransfer.enabled` | 转人工开关 | 隐藏字段 | 固定为 `false` | 必传 | 本期不考虑转人工；前端不配置、不展示，仅为满足接口必填结构提交关闭值 | sys-scene.js |
| FLD-013 | SRC-009 | 已过滤名单 tab | `leadStatus` / `finalCallResult` | 过滤结果 | 标签 | `BLOCKED` -> “黑名单过滤” | 空展示为 `-` | 当前电声拦截能力来自策略关联黑名单；不映射为拦截规则或线路拦截 | scene-list.js |
| FLD-014 | SRC-009 | 执行批次线索明细, 线索记录 | `attemptCount` | 是否重拨 | 派生文本 | `attemptCount > 1` -> "是"，否则为“否” | 次数缺失时展示 `-` | 20260713 话单回调无 `isRedial`，不可直接读取 | scene-list.js, result-clue.js |
| FLD-015 | SRC-003 | 历史任务详情 | `callLine` | 使用线路 | 文本 | `INTERNAL` (内部测试线路), `NISSAN` (日产电话线路) | 新建电声场景不再配置 | 历史任务或 Mock 详情兼容字段 | scene-list.js |
| FLD-016 | SRC-008 | 新建场景-呼叫任务配置, 任务详情 | `leadTypeRobotMapping.robotCode` | 匹配机器人 | 只读文本 | 新线索=`robot_ds_nissan_001`；冷线索=`robot_ds_nissan_002`；名称和编码来自 `config/diansheng-robots.json` | 页面不可选；映射缺失时禁止生成任务 | 电声任务创建接口入参 | sys-scene.js |
| FLD-017 | SRC-008 | 新建场景-场景类型 | `leadTypeCode` / `leadTypeRobotMapping.leadTypeCode` | 线索类型编码 | 单选映射 | 新线索=`NEW_LEAD`；冷线索=`COLD_LEAD` | 电声平台必填，随场景类型自动绑定 | 电声任务创建入参 | sys-scene.js |
| FLD-018 | SRC-008 | 新建场景-呼叫任务配置, 任务详情 | `callTimeWindow.windows[].weekdays` | 呼叫星期 | 多行多选 | 每条 `windows[]` 独立配置 `1-7`，1=周一，7=周日 | 电声新建必填，至少保留一条完整时段且每条至少选择一天 | 限定电声可呼叫日期 | sys-scene.js |
| FLD-019 | SRC-008 | 新建场景-呼叫任务配置, 任务详情 | `callTimeWindow.windows[].beginTime` / `endTime` | 呼叫时段 | 多行时间范围 | 每条 `windows[]` 独立配置 `HH:mm-HH:mm` | 电声新建必填；每条呼叫时段必须同时填写开始和结束时间 | 限定电声可呼叫时段 | sys-scene.js |
| FLD-019A | SRC-009 | 新建场景-呼叫任务配置, 任务详情 | `callTimeWindow.excludeDates` | 排除日期 | 多日期 | `Array[String]`，每项格式 `yyyy-MM-dd` | 可选；空值不提交，重复日期去重；仅在批次启动前生效 | 节假日或禁止拨打日期 | sys-scene.js |
| FLD-020 | SRC-009 | 新建场景-呼叫任务配置, 任务详情 | `nDayMCallPolicy.days` / `maxAttempts` / `intervalMinutes` | 自动重呼配置 | 单行组合配置 | 呼叫状态固定“未接通”；配置最大执行天数、最大呼叫次数及 15/30/45/60/90/120 分钟多选间隔 | 仅支持一条配置；间隔至少选择一项 | 控制 N 天 M 呼 | sys-scene.js |
| FLD-021 | SRC-009 | 新建场景接口请求 | `humanTransfer.enabled` | 转人工配置 | 隐藏固定值 | `false` | 接口必填 | 本期不开放转人工功能，不在页面和任务详情展示 | sys-scene.js |
| FLD-022 | SRC-009 | 新建场景-呼叫任务配置, 任务详情 | `blacklistCheck.enabled` / `blacklistGroupCode` | 黑名单校验 | 开关+分组 | 单个电声平台分组编码 | 开启时必须选择并提交分组编码 | 创建任务前的黑名单校验配置 | sys-scene.js |
| FLD-023 | SRC-009 | 新建场景-呼叫任务配置, 任务详情 | `autoStart.enabled` / `autoStart.executeDateTime` | 是否自动启动 | 开关+日期时间 | `enabled=true/false`；关闭时传 `yyyy-MM-dd HH:mm:ss` 执行时间 | `enabled` 必填，默认开启；中台规则要求 `enabled=false` 时 `executeDateTime` 必填 | 导入完成后是否自动进入执行 | sys-scene.js |
| FLD-024 | SRC-009 | 外呼列表-电声任务详情 | `createdTime` / `updatedTime` / `leadTypeRobotMapping.robotCode` / `leadTypeRobotMapping.leadTypeName` | 任务基础信息 | 文本 | 机器人名称按本地机器人配置转换并展示为“名称（编码）”，场景类型展示名称 | 空展示为 `-` | 页面不展示任务状态和完整线索类型与机器人映射对象 | scene-list.js |
| FLD-025 | SRC-009 | 外呼列表-电声任务详情 | `callTimeWindow` / `nDayMCallPolicy` / `blacklistCheck` / `autoStart` / `remark` | 任务配置对象 | 多行文本 | 展示本期开放的任务配置对象；超出时段未返回时按顺延展示 | 缺失对象展示为 `-` | 不展示执行批次字段和本期关闭的 `humanTransfer` | scene-list.js |
| FLD-025A | SRC-009 | 外呼列表-电声任务卡片 | `statusType` | 任务状态 | 状态标签+更多菜单 | `1` 启用 -> “进行中”；`0` 冻结 -> “用户暂停” | 缺失时保留本地原状态 | 菜单固定展示删除、暂停、终止、启动，当前仅暂停可用；成功返回 `0` 后更新本地状态；不放置停止执行批次 | scene-list.js |
| FLD-025B | SRC-009 | 外呼列表-呼叫名单-执行批次 | `executeBatchId` / `importBatchId` / `executeStatus` / `leadCount` / `runningCount` / `completedCount` / `blockedCount` / `cancelledCount` / `startTime` / `endTime` | 执行批次 | 弹窗表格 | 按当前中台任务关联的执行批次号查询电声批次详情；状态翻译为待启动、执行中、已停止、已结束、执行失败 | 无批次展示空状态；查询失败保留弹窗并提示重试 | 待启动和执行中可停止，成功后更新批次但不修改任务状态 | scene-list.js |
| FLD-026 | SRC-009 | 外呼拦截-外呼黑名单 | `blacklistGroup` / `platformBindings[].platformCode` / `externalGroupCode` / `externalGroupId` / `status` | 中台黑名单分组 | 分组卡片+平台同步弹窗 | 中台维护分组名称、描述和有效期；一个分组可启用多个平台，每个平台独立保存远端分组键和同步结果 | 未启用平台展示“仅本地”；只能选择已完成接入的平台 | 中台主数据+多平台通道适配 | scene-block.js |
| FLD-027 | SRC-009 | 外呼拦截-外呼黑名单 | `phoneNumber` / `name` / `addType` / `sourceType` / `reason` / `effectiveStart` / `effectiveEnd` / `platformSync[platformCode]` | 黑名单号码 | 表格+详情弹窗 | 添加类型支持 `OTHER`、`INTENT`、`DECLINE`，直接映射平台 `addType`；号码按平台编码分别记录同步状态 | `addType` 必填；任一平台失败时保留本地拦截 | 中台黑名单号码与多平台同步结果 | scene-block.js |
| FLD-028 | SRC-009 / 百炼智能体 | 通话详情-外呼结果 | `summary` / `bailianSummary` | 外呼小结 | 文本 | 电声总结优先，百炼总结兜底 | 两者均为空显示 `-` | 空字符串视为无值；两个来源字段分别保存 | result-records.js |
| FLD-029 | 百炼智能体 | 通话详情-外呼结果 | `bailianAgentTags` | 外呼结果标签 | 固定五字段键值 | 意向标签、计划到店时间、预计购车时间、意向品牌中文名、意向车系中文名 | 单项缺失显示 `-` | 字段值均来自百炼智能体；不使用电声 `intentionStatus`、`intentionRank`、`intentionTag` 拼装 | result-records.js |

## Open Field Questions

- None
