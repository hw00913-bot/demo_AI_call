# 资料来源索引（v1.1）

> 本项目只记录 WIKI 页 id 与 raw 逻辑引用，不复制 `01_WIKI_LLM` 知识库。消费时间：2026-07-14。

| Source ID | Type | Title | Status / Coverage | Key Points | Used In |
|---|---|---|---|---|---|
| SRC-001 | api-doc | 大众通信新版 2.0 外呼与 3.0 大模型接口 | current（中文：用户已确认）；任务编辑查询统一按新版 2.0 外呼接口和 3.0 大模型接口口径，不兼容旧版本 | `wiki_ref=project-大众通信接入, lib-外呼任务字段`; `raw_ref=raw/dazhong-api-official@v2`; `raw_path=raw/external/dazhong-api-official/任务编辑.md.md`; GET `/agent-api/new/user/{user_id}/task/{task_id}/edit` 返回 task_type、maximumcall、name、remark、状态及 `new_task_extra` 配置；原型不再读取 `task_extras` | sys-scene, scene-list, result-records, report-call, report-billing |
| SRC-002 | screenshot | 大众通信常见数据类型 | partial（中文：部分可用）；13 状态码与 A–F 已由官方截图确认 | `wiki_ref=lib-通话状态码, lib-意向等级, lib-外呼任务字段`; `raw_ref=raw/dazhong-datatype-reference@v1`; `raw_path=raw/external/dazhong-datatype-reference/common-datatypes.png` | scene-list, result-records, result-clue, sys-tags |
| SRC-003 | code-ref | 意向标签基础原型 | current（中文：已核对可信）；8 模块与标签/场景/计费规则 | `wiki_ref=project-意向标签`; `raw_ref=raw/intention-tag-demo@v1`; 用于保留原有标签排序、停用保护与手工映射交互 | sys-tags, 全局底座 |
| SRC-004 | wiki-query | `dazhong-loop-context` 查询输出 | partial（中文：部分可用）；生成于 2026-07-13，本轮另核对了 2026-07-14 更新页 | `wiki_ref=project-大众通信接入`; 用于建立 loop 的 SRC/FLD 初始映射，不作为真理源 | memory/* |
| SRC-005 | api-doc | PM 补充的大众通信回调与通话详情接口 | current（中文：用户已确认）；本轮确认 `callid=recordid`，线下澄清可由自定义组件返回通话总结，并与百炼智能体结果组合展示 | 通话结束回调返回 `callid` 和录音链接，并由回调产生通话记录；中台将同值作为通话详情查询的 `recordid`，通话文本从详情 `records[].question/answer_content` 提取；通过 SaaS 配置自定义字段后，可从通话详情 `componet/component` 自定义组件提取通话总结；外呼小结优先大众总结，缺失时展示百炼智能体通话总结；意向标签固定取百炼标签；未收到回调时不产生通话记录 | result-records |

## 消费边界

- 重复字段以 `raw/dazhong-api-official@v2` 对应的官方页口径为准。
- WIKI 页整体维持 `partial`，是因为出处链仍保留 derived v1，不代表已标记的官方 v2 字段未核对。
- 本原型只模拟页面和前端状态，不发起真实 API 请求。
