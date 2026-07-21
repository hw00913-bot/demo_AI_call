# 资料记录

> 将产品经理输入、外部文档、截图、历史项目、口述要求、LLM WIKI 输出和补充资料整理为可引用记录。需求、验收、验证、交互说明和标注提示词应引用这些来源编号，而不是只依赖对话上下文。

## 使用规则

- 每条资料使用稳定编号：`SRC-001`、`SRC-002`。
- 没有外部资料时，也必须记录 `SRC-000 | No external source`，说明本轮只来自产品经理口述。
- 如使用独立 LLM WIKI，先把 query 输出作为 `SRC-*` 写入本表，并在 Key Points 中保留 `wiki_ref`、`raw_ref`、`status`、`coverage` 等元数据。
- 标注提示词和手动回写标注中的 `sourceRefs` 应优先引用这里的编号。

## Sources

| Source ID | Type | Title | Received At | Key Points | Used In |
| --- | --- | --- | --- | --- | --- |
| SRC-001 | API Document | [电声-日产AI语音外呼对接API文档.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档.md) | 2026-07-02 | WIKI 提供的官方核心接口规范。包含线索导入、话单推送、转人工推送字段协议及统一 MD5 签名头算法。 | memory/project.md, memory/business-rules.md, memory/field-map.md |
| SRC-008 | API Document | [电声-日产AI语音外呼对接API文档_20260707.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260707.md) | 2026-07-09 | 20260707 新版接口。新增外呼策略体系 `/strategy/policy/*`，线索导入改为 `/lead/batch/async/import` 并通过 `strategyCode` 引用策略；新增执行批次启动/查询/停止、黑名单分组、统一自定义签名 Header。 | docs/api-change-review.md, docs/requirements.md, docs/decisions.md, memory/business-rules.md, memory/field-map.md |
| SRC-009 | API Document | [电声-日产AI语音外呼对接API文档_20260713.pdf](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/raw/external/diansheng-api/电声-日产AI语音外呼对接API文档_20260713.pdf) | 2026-07-16 | 最新接口口径。签名参数改放请求体；机器人映射收敛为单对象；呼叫次数改为 `nDayMCallPolicy`；黑名单任务以 `blacklistGroupCode` 引用，黑名单记录以 `groupCode + phoneNumber` 幂等；导入增加 `isCompleted`；补充归属地、录音、上下文、外部任务和线索属性字段。 | docs/api-change-review.md, docs/requirements.md, js/pages/sys-scene.js, js/pages/scene-list.js, js/pages/scene-block.js, mock/data.js |
| SRC-002 | WIKI Knowledge | [电声接入.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/项目知识/电声接入.md) | 2026-07-02 | WIKI 的电声接入核心业务逻辑，定义了签名计算待加密明文拼接算法、挂机判定、加微限制和计费/实际时长映射。 | memory/project.md, memory/business-rules.md |
| SRC-003 | Business Doc | [电声交付-总体业务流程.md](file:///Users/huhaowen/Documents/33-智能外呼/测试 loop-flow/output/电声交付-总体业务流程.md) | 2026-07-02 | 时序图和交互流程。明确了调优版本（内部线路）与上线版本（日产线路）的差异与数据流向。 | memory/project.md, memory/business-rules.md |
| SRC-004 | Business Doc | [电声交付-S2-异常处理与重试.md](file:///Users/huhaowen/Documents/33-智能外呼/测试 loop-flow/output/电声交付-S2-异常处理与重试.md) | 2026-07-02 | 早期异常补偿方案；其中 D05 细分过滤原因已被 SRC-009 最新接口事实覆盖，不再作为原型依据。 | memory/project.md, memory/business-rules.md |
| SRC-005 | Base Project | [中科金接入_demo_v1.0](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/中科金接入_demo_v1.0) | 2026-07-02 | 项目的底层原型参考代码，提供了基础页面布局、导航结构和页面详情三 Tab（数据概览/呼叫名单/任务详情）的前端逻辑。 | memory/project.md, js/pages/* |
| SRC-006 | Concept Alignment | [通话状态码.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/通话状态码.md) | 2026-07-02 | 概念对齐表。指明了电声子接听状态码的具体映射（301/302/303 属已接通，205/206 属未接通）。 | memory/business-rules.md, memory/field-map.md |
| SRC-007 | Concept Alignment | [意向等级.md](file:///Users/huhaowen/Documents/00_automatic_prototype/01_WIKI_LLM/wiki/概念对齐/意向等级.md) | 2026-07-02 | 概念对齐表。明确电声提供细分意向等级 intentionRank（A/B/C/D）和有意向/无意向分类 intentionStatus。 | memory/business-rules.md, memory/field-map.md |
