# 字段映射（v1.1）

本表记录大众通信官方 API v2 已核对字段与原型展示位置的对应关系。

| Field ID | Source ID | Page / Area | API / Data Field | Display Name | Display Format | Enum / Mapping | Empty / Error Rule | Annotation Point | Used In |
|---|---|---|---|---|---|---|---|---|---|
| FLD-001 | SRC-002 | 通话记录 | `status` | 通话状态 | 状态码转中文 + 中台状态归并 | 大众原始展示：`0=等待呼叫`、`1=呼叫成功`、`2=运营商拦截`、`3=拒接`、`4=无应答/无人接听`、`5=空号`、`6=关机`、`7=停机`、`8=占线/用户正忙`、`9=呼入限制`、`10=欠费`、`11=黑名单`、`12=用户屏蔽`；大众按完整中台状态归并：`0→等待呼叫`、`1→已接通`、`4→无人接听`、`8→占线`、`3→拒接`、`5→空号`、`6→关机`、`7→停机`、`10→欠费`、`11/12→黑名单过滤`、`9→呼叫受限`、`2→线路拦截`；中科金归并取自中科金接入原型：`7→已接通`、`5/11→无人接听`、`9→占线`、`13→空号`、`15→关机`、`14→停机`、`12→无法接通`、`8→呼叫受限`、`6→外呼失败`、`4→等待重呼`、`17→号码故障`、`18→线路故障`；电声仅保留直接回传状态与中台状态的映射关系（`answerStatus=301→已接通`、`302→秒挂`、`303→伪接通`、`205→拒接`、`206→无人接听`，`answerStatus` 缺失或未知时 `answerMainStatus=3→已接通`、`2→无法接通`），移除了依据中台状态强制映射的伪规则；中科金 `1-未拨打`、`2-等待接听`、`3-接听中` 为中间态，不进入最终通话结果表；`待呼叫去重` 不承接大众 0-等待呼叫，仅保留为中台/科大去重类状态；大众无对应回传的中台状态为无法接通、拦截规则、待呼叫去重、分机号错误、主叫欠费、呼损客户、外呼失败、转人工呼损、等待重呼、号码故障、线路故障 | 未知码通话记录显示原值；中台归并状态显示“未知状态” | result-records 状态列 / docs 状态映射表 | result-records, result-clue, report-call |
| FLD-002 | SRC-002 | 线索记录/标签/数据概览 | `intention_results` | 意向等级 | 数值转字母等级及名称 | `1=A-高意向`; `2=B-意向客户`; `3=C-潜在客户`; `4=D-一般意向`; `5=E-需再次跟进`; `6=F-号码无效` | 空值显示“未评级” | result-clue 意向列 / scene-list 意向分类与意向洞察 | result-clue, sys-tags, scene-list |
| FLD-003 | SRC-001 | 外呼列表 | `task_type` | 任务类型 | 编码转名称 | 大众通信统一使用 `7=新版2.0任务`；不再兼容旧版 2.0 | 由 SaaS 配置，空值显示 `-` | scene-list 任务类型 | scene-list |
| FLD-004 | SRC-001 | 业务场景/外呼列表/通话记录 | `uuid` | 关联任务 ID | UUID 字符串 | 大众通信任务唯一标识；`wiki_ref=lib-外呼任务字段`；通话统计仅在数据层按 uuid 汇总，不在页面展示该字段 | 场景关联时必填；通话记录按 uuid 查询 | 各页任务 ID 字段 | sys-scene, scene-list, result-records |
| FLD-005 | SRC-001 | 外呼列表/任务详情 | `new_task_extra.line[]` | 外呼线路 | 线路编码+并发 | DT-NJ-001 / DT-SZ-001 / DT-SH-001 | 由 SaaS 配置，中台仅只读展示 | scene-list 任务详情 | scene-list |
| FLD-006 | SRC-001 | 外呼列表/任务详情 | `maximumcall` / `new_task_extra.limit` / `new_task_extra.cps` | 并发配置 | 非负整数 | 总并发、任务并发、每秒发起数 | 由 SaaS 配置，中台仅只读展示 | scene-list 任务详情 | scene-list |
| FLD-007 | SRC-001 | 任务详情 | `new_task_extra.pop_mode` | 弹号顺序 | 编码转名称 | `0=随机`; `1=顺序`; `2=倒序` | 由 SaaS 配置；空值显示 `-` | scene-list 任务详情 | scene-list |
| FLD-008 | SRC-001 | 外呼列表 | `status` | 任务状态 | 状态码转卡片状态 | `1=暂停中`; `2=执行中`; `3=等待执行` | `new_task_extra` 空时标记异常 | scene-list 状态 | scene-list |
| FLD-009 | SRC-001 | 计费统计 | 中台派生 `billingType` | 计费类型 | 数据层归类字段 | 按通话时长 / 坐席费+通话费；按截图不在主列表展示 | 未配置显示 `-` | report-billing 数据归类 | report-billing |
| FLD-010 | SRC-001 | 通话详情 | `duration` / `bill` | 通话时长/计费时长 | 毫秒转中文时长 | 官方原值为毫秒 | 空值显示 `-` | result-records 详情 | result-records, report-billing |
| FLD-011 | SRC-001 | 任务详情/基础信息 | `name` / `remark` | 任务基础信息 | 中文文本 | 大众通信任务统一按新版 2.0 外呼接口和 3.0 大模型接口口径展示；不推导接口未定义的启动方式 | 空值显示 `-` | scene-list 任务详情 | scene-list |
| FLD-012 | SRC-001 | 任务详情/呼叫与时段 | `destination_extension` / `dial_time_id` / `_originate_timeout` / `start_time` / `stop_time` / `work_week` / `work_hour` / `holiday` | 呼叫配置与执行时段 | 分组只读文本 | 工作周 `0=周日…6=周六` | 空数组显示无或 `-` | scene-list 任务详情 | scene-list |
| FLD-013 | SRC-001 | 任务详情/重呼配置 | `redial_enabled` / `redial_new_number_policy` / `redial_interval` / `redial_max_times` / `redial_conditions[].hangup_cause` / `redial_conditions[].da_status` | 新 2.0 重呼策略 | 布尔、整数、状态数组 | `da_status` 兼容状态码与官方英文状态值 | 字段缺失或空值显示 `-`；关闭时仍展示接口返回的其他配置 | scene-list 任务详情自动重拨设置 | scene-list |
| FLD-014 | SRC-005 | 通话结束回调/通话详情 | `callid` / 内部查询 `recordid` | 会话 id | 原始 ID 字符串 | 页面展示名统一为“会话 id”，取回调 `callid`；内部以同值作为详情接口 `recordid` 查询，不单独展示详情记录 ID | 未收到 `callid` 时不产生通话记录，因此不存在详情页等待回调状态 | result-records 列表准入与通话详情弹窗 | result-records |
| FLD-015 | SRC-005 | 通话详情 | 回调 `recordingUrl` / 详情 `records[].question` / `records[].answer_content` | 通话录音 / 通话文本 | 播放器+对话气泡 | `question=客户`; `answer_content=AI客服`；按 `sequence` 排序，过滤有最终结果的 `asrprogress_notify` | 无录音链接显示“本次未生成录音”；无可用文本显示“本次通话未生成对话文本” | result-records / result-clue 录音和文本区 | result-records, result-clue |
| FLD-016 | SRC-005 | 通话详情/百炼智能体 | `componet` / `component` 自定义字段；百炼 `bailianSummary` | 外呼小结 / 最后回访记录 | 只读文本 | 大众返回自定义组件总结时优先展示；未返回时展示百炼智能体提取的通话总结；线索记录“最后回访记录”同此口径 | 大众与百炼均为空时显示 `-` | result-records / result-clue 外呼小结与最后回访记录 | result-records, result-clue |
| FLD-017 | SRC-005 | 百炼智能体 | `bailianTagName` | 意向标签 | 只读文本 | 外呼结果下方标签固定取百炼智能体标签，不取大众自定义组件 | 空值显示 `-` | result-records / result-clue 意向标签 | result-records, result-clue |
| FLD-018 | SRC-005 | 通话详情 | 回调 `callid`，中台 `sceneCode/sceneName`，接口 `startTime/endTime/duration/status`，以及 `componet/component` 自定义组件字段 | 详细信息 / 客户详细标签 | 只读文本行/胶囊标签 | 通话记录详情和线索详情按同一顺序展示：会话 id、用户号码、场景编码、场景名称、对话时长、通话开始时间、通话结束时间、通话结果、转人工状态、转人工时间、用户关注、意向标签、通话标签；场景编码/名称为关联中台场景信息；通话标签和线索客户详细标签均展示已返回值的非总结自定义字段名称 | 空值显示 `-`；无通话标签显示 `-` | result-records / result-clue 详细信息与客户详细标签 | result-records, result-clue |

> 说明：SRC-001/SRC-002 所在 WIKI 页状态为 `partial`，上表仅使用其中已由官方 v2 文档或官方截图核对的字段。
