# 标注准备覆盖清单

> 记录当前标注覆盖的核心页面、验收项、资料来源和字段事实。仅保留页面初始态稳定可见的锚点，避免抽屉、弹窗、隐藏 Tab 内的锚点挂偏。

## Coverage

| Annotation ID | Page | Target Selector | Requirement ID | Source Refs | Field Refs | Coverage Note |
| --- | --- | --- | --- | --- | --- | --- |
| 31 | sys-scene | `[data-anno="sys-scene-add-btn"]` | R-002 | SRC-008, SRC-002, SRC-003 | FLD-001, FLD-016 ~ FLD-023 | 覆盖电声业务场景新增入口；进入抽屉后配置呼叫任务配置、模型类型和电声账号，按新版接口提交生成外呼任务 |
| 32 | sys-scene | `[data-anno="sys-scene-table"]` | R-002 | SRC-001, SRC-002, SRC-003, SRC-005 | FLD-001 | 覆盖业务场景列表，首行展示电声平台业务场景 |
| 4 | scene-list | `[data-anno="scene-list-card-grid"]` | R-001, R-002, R-003 | SRC-001, SRC-002, SRC-003, SRC-005 | FLD-001, FLD-002, FLD-016 ~ FLD-023 | 覆盖电声外呼任务卡片列表和任务状态入口 |
| 8 | result-records | `[data-anno="result-records-list"]` | R-005 | SRC-001, SRC-002, SRC-006 | FLD-006, FLD-007, FLD-008, FLD-010, FLD-012, FLD-014 | 覆盖电声通话记录列表；列表不展示线路类型和加微状态 |
| 11 | result-clue | `[data-anno="result-clue-list"]` | R-006 | SRC-001, SRC-002, SRC-003, SRC-004 | FLD-003, FLD-010, FLD-011, FLD-014 | 覆盖线索记录列表：门店编码、回访次数、意向级别、回访明细穿透 |
| 12 | result-clue | `[data-anno="result-clue-scene-filter"]` | R-006 | SRC-001, SRC-002 | FLD-001, FLD-010 | 覆盖场景与意向级别联动筛选 |
| 13 | report-call | `[data-anno="report-call-view"]` | R-007 | SRC-001, SRC-002, SRC-003, SRC-004, SRC-005, SRC-006, SRC-007 | FLD-001, FLD-002, FLD-003, FLD-004, FLD-006, FLD-007, FLD-008, FLD-009, FLD-010 | 覆盖电声通话统计：外呼统计与客户统计、数据聚合与平均通话时长 |
| 14 | sys-tags | `[data-anno="sys-tags-supplier-root"]` | R-008 | SRC-009 | FLD-010, FLD-011, FLD-013, FLD-014 | 覆盖电声供应商标签集：意向等级、加微、重拨、过滤原因；本期不含转人工 |
| 15 | sys-tags | `[data-anno="sys-tags-local-root"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-013, FLD-014 | 覆盖中台本地标准标签集，按租户类型和场景组织 |
| 16 | sys-tags | `[data-anno="sys-tags-scene-config"]` | R-008 | SRC-001, SRC-002 | FLD-001, FLD-002 | 覆盖标签场景配置入口 |
| 17 | sys-tags | `[data-anno="sys-tags-supplier-mgr"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商管理入口 |
| 18 | sys-tags | `[data-anno="sys-tags-tag-search"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商标签名称与编码搜索 |
| 19 | sys-tags | `[data-anno="sys-tags-tag-filter"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商标签启用状态筛选 |
| 20 | sys-tags | `[data-anno="sys-tags-enable-all"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖全选启用批量操作 |
| 21 | sys-tags | `[data-anno="sys-tags-disable-all"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖清空启用批量操作 |
| 22 | sys-tags | `[data-anno="sys-tags-add-tag"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖新增供应商标签入口 |
| 23 | sys-tags | `[data-anno="sys-tags-tag-enable-col"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖标签启用复选框列 |
| 24 | sys-tags | `[data-anno="sys-tags-tag-mapping-col"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商标签到本地标签的映射下拉列 |
| 25 | sys-tags | `[data-anno="sys-tags-tag-sort-col"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商标签排序列 |
| 26 | sys-tags | `[data-anno="sys-tags-tag-action-col"]` | R-008 | SRC-001, SRC-002 | FLD-010, FLD-011, FLD-012, FLD-013, FLD-014 | 覆盖供应商标签编辑与删除操作列 |

## Gaps

- 抽屉、弹窗和隐藏 Tab 内元素不作为当前标注锚点；如后续需要覆盖电声呼叫任务配置表单，可新增打开抽屉后的二级标注流程。
