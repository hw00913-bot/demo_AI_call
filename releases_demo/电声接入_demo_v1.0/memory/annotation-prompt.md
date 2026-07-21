# 手动标注提示词

请基于已通过验证的静态原型，生成面向产品经理评审的页面标注。标注必须覆盖当前电声接入核心页面、验收项、资料来源和字段事实。

## 锚点原则

- 只使用页面初始态稳定可见的锚点。
- 不使用抽屉、弹窗、隐藏 Tab 内的锚点，避免标注挂偏。
- 电声新建业务场景的呼叫任务配置字段当前不单独做标注锚点；通过“新增业务场景入口”标注说明进入抽屉后的配置内容。

## 本轮标注生成任务配置

| 标注 ID | Target Selector | 关联页面 | 标注说明及引用说明 |
| --- | --- | --- | --- |
| 31 | `[data-anno="sys-scene-add-btn"]` | sys-scene | 电声业务场景新增入口：打开抽屉后配置电声平台、呼叫任务配置、模型类型和电声账号，提交时模拟调用接口生成 `job_ds_*` 任务编码。引用：SRC-001, SRC-002, SRC-003；字段：FLD-001, FLD-016 ~ FLD-023 |
| 32 | `[data-anno="sys-scene-table"]` | sys-scene | 电声业务场景列表：首行展示电声平台业务场景，支持按名称、分类、所属平台筛选。引用：SRC-001, SRC-002, SRC-003, SRC-005；字段：FLD-001 |
| 4 | `[data-anno="scene-list-card-grid"]` | scene-list | 电声场景任务卡片：展示电声外呼场景运行态和数量指标。引用：SRC-001, SRC-002, SRC-003, SRC-005；字段：FLD-001, FLD-002, FLD-016 ~ FLD-023 |
| 8 | `[data-anno="result-records-list"]` | result-records | 电声通话记录列表：展示通话时间、时长、状态、小结、智能平台和最后节点；列表不展示线路类型和加微状态。引用：SRC-001, SRC-002, SRC-006；字段：FLD-006, FLD-007, FLD-008, FLD-010, FLD-012, FLD-014 |
| 11 | `[data-anno="result-clue-list"]` | result-clue | 电声线索记录列表：按线索维度聚合回访结果，展示门店编码、回访次数、意向级别，支持回访明细穿透。引用：SRC-001, SRC-002, SRC-003, SRC-004；字段：FLD-003, FLD-010, FLD-011, FLD-014 |
| 12 | `[data-anno="result-clue-scene-filter"]` | result-clue | 电声业务场景筛选：选择电声场景后联动展示意向级别筛选项。引用：SRC-001, SRC-002；字段：FLD-001, FLD-010 |
| 13 | `[data-anno="report-call-view"]` | report-call | 电声通话统计：外呼统计与客户统计列表按电声任务聚合，输出平均通话时长。引用：SRC-001, SRC-002, SRC-003, SRC-004, SRC-005, SRC-006, SRC-007；字段：FLD-001, FLD-002, FLD-003, FLD-004, FLD-006, FLD-007, FLD-008, FLD-009, FLD-010 |
| 14 | `[data-anno="sys-tags-supplier-root"]` | sys-tags | 电声供应商标签集：维护电声平台原始标签池（意向等级、加微、重拨、过滤原因），本期不含转人工。引用：SRC-009；字段：FLD-010, FLD-011, FLD-013, FLD-014 |
| 15 | `[data-anno="sys-tags-local-root"]` | sys-tags | 电声本地标准标签：维护电声回调标签归一后的本地标准标签，按租户类型和场景组织。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-013, FLD-014 |
| 16 | `[data-anno="sys-tags-scene-config"]` | sys-tags | 电声标签场景配置：维护标签管理模块可用的业务场景类型。引用：SRC-001, SRC-002；字段：FLD-001, FLD-002 |
| 17 | `[data-anno="sys-tags-supplier-mgr"]` | sys-tags | 电声供应商管理：维护电声平台作为标签供应商的基础信息。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 18 | `[data-anno="sys-tags-tag-search"]` | sys-tags | 电声标签搜索：按名称或编码检索电声标签池。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 19 | `[data-anno="sys-tags-tag-filter"]` | sys-tags | 电声标签启用筛选：按全部、已启用、未启用筛选标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 20 | `[data-anno="sys-tags-enable-all"]` | sys-tags | 电声标签全选启用：批量启用当前场景下所有标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 21 | `[data-anno="sys-tags-disable-all"]` | sys-tags | 电声标签清空启用：清空当前场景已启用标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 22 | `[data-anno="sys-tags-add-tag"]` | sys-tags | 电声新增供应商标签：在电声标签池中新增回调标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 23 | `[data-anno="sys-tags-tag-enable-col"]` | sys-tags | 电声标签启用列：控制单个标签是否参与当前场景。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 24 | `[data-anno="sys-tags-tag-mapping-col"]` | sys-tags | 电声标签映射本地标签：将电声原始标签映射到中台统一标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 25 | `[data-anno="sys-tags-tag-sort-col"]` | sys-tags | 电声标签排序：控制标签在配置列表和业务展示中的顺序。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |
| 26 | `[data-anno="sys-tags-tag-action-col"]` | sys-tags | 电声标签编辑删除：编辑或删除供应商标签。引用：SRC-001, SRC-002；字段：FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 |

## 标注生成要求

- 核心验收页面至少一条标注。
- `memory/acceptance-map.md` 中通过的核心验收项必须能追溯到标注或 `docs/interaction.html`。
- 每条标注的 `target` 必须逐字使用本文件中的 `Target Selector`。
- 标注说明不得再要求“电声任务id输入框”“线路类型配置”“签名密钥配置”“转人工历史页签”。

## 回写说明

如果 PM 确认要把生成的标注写回项目，由 Agent 读取当前 `annotations/annotations.js` 后手动合并。回写后至少运行 `node --check annotations/annotations.js` 并进行锚点可见性抽查。
