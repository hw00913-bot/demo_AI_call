# 电声接口文档变更检查

检查日期：2026-07-20

## 检查来源

- 旧版：[电声-日产AI语音外呼对接API文档.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md)
- 新版：[电声-日产AI语音外呼对接API文档_20260707.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260707.md)
- 最新版：[电声-日产AI语音外呼对接API文档_20260713.pdf](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260713.pdf)

## 20260713 版对原型的影响

| 变更项 | 最新接口口径 | 原型处理 |
| --- | --- | --- |
| 签名参数 | `x_url_custom`、`x_nonce_str_custom`、`x_timestamp_custom`、`x_sign_custom` 放在请求体 | 原型不真实加签，文档改为请求体字段说明 |
| 机器人映射 | `leadTypeRobotMapping` 为单对象，不再有 `defaultConfig`、`mappings`、`scriptCode` | 新建场景和任务 Mock 改为单对象 |
| 呼叫次数 | 使用 `nDayMCallPolicy`，仅保留 `days`、`maxAttempts`、`intervalMinutes` | 新建场景改为单组“N天M呼”配置，删除首次状态和多条重呼规则 |
| 排除日期 | `callTimeWindow.excludeDates` 为可选 `Array[String]`，格式 `yyyy-MM-dd`，仅在批次启动前生效 | 新建场景在呼叫时段下方支持添加、删除多个排除日期，空值过滤且重复值去重 |
| 自动启动 | `autoStart.enabled` 必填；接口允许 `enabled=false` 时可传 `executeDateTime`，格式 `yyyy-MM-dd HH:mm:ss` | 新建场景新增“是否自动启动”开关，默认开启；中台规则进一步要求关闭时执行时间必填 |
| 黑名单分组 | 任务使用 `blacklistGroupCode`；黑名单接口以 `groupCode` 作为外部唯一键，`groupId` 仅为远端内部标识 | 外呼拦截以中台分组为主数据，电声同步设置在分组弹窗维护；首个号码新增时电声自动建组 |
| 导入完成 | 导入接口必填 `isCompleted`，完成后由策略自动进入执行流程 | 中台按“一号码一批次”调用，固定传 `true`，前端不提供批次与完成状态配置 |
| 状态范围 | 主状态仅 2/3，子状态仅 205/206/301/302/303 | 保留当前状态映射，去掉忙线、欠费、关机等非新版状态 |
| 回调字段 | 增加归属地、`recordUrl`、`contextId`、外部通话/任务 ID、`clueImportLabel`、`clueAttr` | 中台接收并保存；运营详情仅展示归属地，录音地址供播放器内部使用，其余字段不直接展示 |

## 结论

新版接口不是小版本字段补充，而是把旧版“任务 ID + 线索导入”的主流程调整为“外呼任务 + 导入批次 + 执行批次”。

当前项目统一以 `strategyCode` 作为任务引用键。每个号码独立导入，固定传入 `isCompleted=true` 并进入执行流程；20260713 版已删除独立启动接口。

## 关键变更

| 变更项 | 旧版口径 | 20260707 新版口径 | 对原型影响 |
| --- | --- | --- | --- |
| 签名位置 | 请求头 | 20260713 版改为 Body 中的 `x_url_custom`、`x_nonce_str_custom`、`x_timestamp_custom`、`x_sign_custom` | 静态原型不展示或真实加签 |
| 签名内容 | 按业务参数 Key 排序拼接参数名 | 按业务参数 Key 排序后拼接参数值 | 签名说明已过期 |
| 任务主键 | `robotCallJobId` | 不对外体现内部 `taskId`；策略用 `strategyCode`，执行用 `executeBatchId` | 新建场景不应继续说明为“生成任务 ID” |
| 线索导入接口 | `/api/v1/common/lead/import` | `/lead/batch/async/import` | 导入数据需引用 `strategyCode` |
| 批次号 | `batchId` | `importBatchId` / `executeBatchId` | 外呼列表和详情说明需区分导入批次、执行批次 |
| 客户线索 ID | `partnerClueId` | `leadId` | 线索字段映射需更新 |
| 呼叫时段 | `runStrategy.beginTime/endTime/weekdays` | `callTimeWindow.windows[].beginTime/endTime/weekdays` | 新建场景的呼叫时段应映射到任务对象 |
| 重拨 | 简单重拨次数/间隔 | `nDayMCallPolicy`，包含 `days`、`maxAttempts`、`intervalMinutes` | 已调整为单条自动重呼配置，呼叫状态固定为“未接通” |
| 黑名单 | 旧方案假设存在 D05 细分过滤结果 | `blacklistCheck.enabled` + `blacklistGroupCode` | 黑名单仅通过手工或 API 维护；话单不回调空号、停机、重复号码等细分原因 |
| 启动/停止 | 历史任务维度 | 导入完成标记替代启动接口；查询 `/execute/batch/detail/query`，整批停止 `/execute/batch/stop` | 移除电声启动/暂停和单线索终止入口 |

## 当前原型待确认

- 当前页面的“优先级”字段在新版接口中未找到同名入参，已按 PM 反馈从电声新建业务场景中删除。
- “规则拦截”在新版接口中无同名入参，已确认从电声新建业务场景中移除，不展示也不提交。
- 页面保留“确定并生成任务”作为中台业务文案，实际调用 `/strategy/policy/create` 创建电声外呼任务；接口失败时本地不入库。
- 20260713 话单回调没有 `isRedial`。页面若展示“是否重拨”，应根据执行批次线索明细 `attemptCount > 1` 派生，不能作为回调字段读取。

## 已同步文档

- `memory/source-materials.md` 新增 SRC-008。
- `docs/requirements.md` 改为策略主流程。
- `docs/decisions.md` 新增 D-011。
- `memory/business-rules.md` 补充外呼任务、导入批次、执行批次。
- `memory/field-map.md` 将核心字段更新为 `strategyCode`、`importBatchId`、`executeBatchId`、`leadId` 和新版任务对象。
