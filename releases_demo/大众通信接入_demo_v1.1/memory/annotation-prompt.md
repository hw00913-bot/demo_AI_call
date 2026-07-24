# 标注提示词模版 (Annotation Prompt)

本文件整理了交付给标注生成器所使用的提示词及大纲模板。

## 手动标注提示词

用于生成 annotations.js 标注气泡的提示词模板如下。

```text
请仅基于本文件列出的 v1.1 验收项、SRC-* 来源、FLD-* 字段和 data-anno 锚点，生成前台 UI 标注 JSON。
不得继承、续写或改造底座历史标注。标注 id 必须从字符串 "1" 开始全局连续递增。
每条标注必须包含 sourceRefs；字段相关标注必须包含 fieldRefs。target 只能逐字使用本文件锚点清单中的 selector。
每条标注写全以下 10 个维度：functionName、functionDesc、permissionScope、dataSource、valueLogic、fieldDesc、interactionDesc、judgeRule、exceptionRule、otherDesc。
不适用的维度说明原因，不得编造。资料不足时输出缺口说明，不生成“待确认”占位标注。
```

## 标注输入资料

本阶段标注所使用的输入资料和对应的事实引用包括：
- 来源资料：[SRC-001](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/source-materials.md) (大众通信外呼 API 规范及 13 个通话状态码)。
- 来源资料：[SRC-002](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/source-materials.md) (意向等级 A-F 等级定义事实)。
- 来源资料：`SRC-003` （意向标签基础原型，current）。
- 来源资料：`SRC-004` （dazhong-loop-context 查询输出，partial，仅作 loop 初始映射）。

## 可用 data-anno 锚点清单

- page: report-billing | data-anno: report-billing-rule | selector: [data-anno="report-billing-rule"] | file: js/pages/report-billing.js
- page: report-billing | data-anno: report-billing-header | selector: [data-anno="report-billing-header"] | file: js/pages/report-billing.js
- page: report-billing | data-anno: report-billing-summary-table | selector: [data-anno="report-billing-summary-table"] | file: js/pages/report-billing.js
- page: report-billing | data-anno: report-billing-detail-table | selector: [data-anno="report-billing-detail-table"] | file: js/pages/report-billing.js
- page: report-billing | data-anno: report-billing-call-detail | selector: [data-anno="report-billing-call-detail"] | file: js/pages/report-billing.js
- page: report-call | data-anno: report-call-header | selector: [data-anno="report-call-header"] | file: js/pages/report-call.js
- page: report-call | data-anno: report-call-task-filter | selector: [data-anno="report-call-task-filter"] | file: js/pages/report-call.js
- page: result-clue | data-anno: result-clue-scene-filter | selector: [data-anno="result-clue-scene-filter"] | file: js/pages/result-clue.js
- page: result-records | data-anno: result-records-summary | selector: [data-anno="result-records-summary"] | file: js/pages/result-records.js
- page: result-records | data-anno: result-records-fields | selector: [data-anno="result-records-fields"] | file: js/pages/result-records.js
- page: result-records | data-anno: result-records-audio | selector: [data-anno="result-records-audio"] | file: js/pages/result-records.js
- page: result-records | data-anno: result-records-header | selector: [data-anno="result-records-header"] | file: js/pages/result-records.js
- page: result-records | data-anno: result-records-task-filter | selector: [data-anno="result-records-task-filter"] | file: js/pages/result-records.js
- page: scene-list | data-anno: scene-list-card-grid | selector: [data-anno="scene-list-card-grid"] | file: js/pages/scene-list.js
- page: scene-list | data-anno: scene-list-task-detail | selector: [data-anno="scene-list-task-detail"] | file: js/pages/scene-list.js
- page: scene-list | data-anno: scene-list-dazhong-readonly | selector: [data-anno="scene-list-dazhong-readonly"] | file: js/pages/scene-list.js
- page: scene-list | data-anno: scene-list-call-list | selector: [data-anno="scene-list-call-list"] | file: js/pages/scene-list.js
- page: scene-list | data-anno: scene-list-data-overview | selector: [data-anno="scene-list-data-overview"] | file: js/pages/scene-list.js
- page: sys-scene | data-anno: sys-scene-add-btn | selector: [data-anno="sys-scene-add-btn"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-platform | selector: [data-anno="sys-scene-platform"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-scene-type | selector: [data-anno="sys-scene-scene-type"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-taskid | selector: [data-anno="sys-scene-dazhong-taskid"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-taskid-runtime | selector: [data-anno="sys-scene-dazhong-taskid-runtime"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-task-type | selector: [data-anno="sys-scene-dazhong-task-type"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-line | selector: [data-anno="sys-scene-dazhong-line"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-concurrency | selector: [data-anno="sys-scene-dazhong-concurrency"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-pop-mode | selector: [data-anno="sys-scene-dazhong-pop-mode"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-dazhong-billing | selector: [data-anno="sys-scene-dazhong-billing"] | file: js/pages/sys-scene.js
- page: report-call | data-anno: report-call-platform-filter | selector: [data-anno="report-call-platform-filter"] | file: js/pages/report-call.js
- page: report-billing | data-anno: report-billing-platform-filter | selector: [data-anno="report-billing-platform-filter"] | file: js/pages/report-billing.js
- page: sys-scene | data-anno: sys-scene-zkj-taskid | selector: [data-anno="sys-scene-zkj-taskid"] | file: js/pages/sys-scene.js
- page: sys-scene | data-anno: sys-scene-submit-btn | selector: [data-anno="sys-scene-submit-btn"] | file: js/pages/sys-scene.js
- page: sys-tags | data-anno: sys-tags-scene-config | selector: [data-anno="sys-tags-scene-config"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-supplier-mgr | selector: [data-anno="sys-tags-supplier-mgr"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-local-root | selector: [data-anno="sys-tags-local-root"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-supplier-root | selector: [data-anno="sys-tags-supplier-root"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-dazhong-manual | selector: [data-anno="sys-tags-dazhong-manual"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-add-tag | selector: [data-anno="sys-tags-add-tag"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-search | selector: [data-anno="sys-tags-tag-search"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-filter | selector: [data-anno="sys-tags-tag-filter"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-enable-all | selector: [data-anno="sys-tags-enable-all"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-disable-all | selector: [data-anno="sys-tags-disable-all"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-enable-col | selector: [data-anno="sys-tags-tag-enable-col"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-mapping-col | selector: [data-anno="sys-tags-tag-mapping-col"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-sort-col | selector: [data-anno="sys-tags-tag-sort-col"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-tag-action-col | selector: [data-anno="sys-tags-tag-action-col"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-add-local-tag | selector: [data-anno="sys-tags-add-local-tag"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-local-sort-col | selector: [data-anno="sys-tags-local-sort-col"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-scene-modal | selector: [data-anno="sys-tags-scene-modal"] | file: js/pages/sys-tags.js
- page: sys-tags | data-anno: sys-tags-supplier-modal | selector: [data-anno="sys-tags-supplier-modal"] | file: js/pages/sys-tags.js

## 标注生成要求

- 所有的标注必须带有严格递增的全局唯一 ID 字符串，不能按页面重复。
- 标注数据中必须包含 `sourceRefs`（关联到 `SRC-001`–`SRC-004`）。
- 标注数据中必须包含 `fieldRefs`，用来映射到 field-map.md 中已定义的核心业务字段，本次主要覆盖的字段清单包括：
  - FLD-001
  - FLD-002
  - FLD-003
  - FLD-004
  - FLD-005
  - FLD-006
  - FLD-007
  - FLD-008
  - FLD-009
  - FLD-010

## 回写说明

- PM 审核通过手动生成的标注数据后，应将其粘贴合并回 `annotations/annotations.js` 中。
