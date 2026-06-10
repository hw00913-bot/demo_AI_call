# 业务规则

## 一、概念映射

| 原型概念 | 中科金 API | 说明 |
|----------|-----------|------|
| 业务场景 | 外呼任务 (taskCode) | 一个场景对应一个外呼任务 |
| 中科金任务id | taskCode（32位） | 创建任务后获得 |
| 场景名称 | taskName | 一一对应 |
| 模型类型 (小/大) | 无 | 中台业务层概念，区分计费单价 |
| 所属平台 | 无 | 中台统一对接多平台 |
| 机器人/话术 | robotId + robotName | 创建任务必填 |

## 二、页面交互规则

### 业务场景 (sys-scene)

- 新建/编辑使用右侧抽屉表单，智能平台默认不选中
- 四个平台面板互斥展示，切换时清空已填数据
- 中科金面板：任务id + 模型类型（小/大）
- 确定按钮触发数据完整性和外部任务有效性校验
- 进行中的场景不可删除

### 外呼列表 (scene-list)

- 卡片网格展示，每卡片含状态、平台、来源、数量
- 中科金任务隐藏「启/停任务」按钮，编辑按钮置灰
- 查看抽屉三个 Tab：数据概览、呼叫名单、任务详情
- 呼叫名单五个子标签：已分配、待呼叫、已呼叫、已过滤、呼叫失败
- 已呼叫子标签筛选栏包含「最终外呼结果」下拉单选
- 任务详情按中科金 API 字段展示（10个字段）
- 拦截策略通过接口匹配 strategyCode→名称
- 手动导入号码上限 2,000

### 通话记录 (result-records)

- 表格列表，支持按号码、场景、状态、平台筛选
- 通话开始时间/通话结束时间表头支持排序切换（升序↑/降序↓）
- 详情弹窗展示外呼小结、对话记录、意向等级
- 当前展示 5 种通话状态（API 有 18 种）

### 通话统计 (report-call)

- 两个 Tab：外呼统计 + 客户统计
- 筛选：呼叫时间、场景名称、智能平台

### 计费统计 (report-billing)

- 按租户维度展示计费时长
- 筛选：计费日期 + 租户名称
- 主表 → 详情弹窗 → 右侧抽屉 三层下钻
- 计费规则：接通为准，按分钟收费，未满1分钟按1分钟
- 中科金 API 不提供计费接口，中台自行计算

## 三、中科金 API 体系

### 外呼任务

| 接口 | 地址 |
|------|------|
| 创建 | POST `/outbound/openapi/v2/task/create` |
| 列表 | GET/POST `/outbound/openapi/v2/task` |
| 详情 | GET/POST `/outbound/openapi/v2/task/{taskCode}` |
| 启动 | POST `/outbound/openapi/v2/task/start` |
| 暂停 | POST `/outbound/openapi/v2/task/pause` |

任务状态码：1未开始/2进行中/3已完成/4已终止/5排队中/6手动暂停/7自动暂停/8已过期

### 通话记录

| 接口 | 地址 |
|------|------|
| 详情 | GET/POST `/outbound/openapi/v2/detail/{audioRecordCode}` |
| 分页 | GET/POST `/outbound/openapi/v2/detail/list` |
| 回调 | webhook POST |

通话状态码：1未拨打/2等待接听/3接听中/4等待重呼/5未接听/6拨打失败/7已接听/8限制拨打/9占线/11来电提醒/12无法接通/13空号/14停机/15关机/17号码故障/18线路故障

### 外呼扩展

| 接口 | 地址 |
|------|------|
| 外呼号码组 | GET/POST `/outbound/openapi/v1/speech` |
| 机器人列表 | GET/POST `/outbound/openapi/v2/robot/queryRobotDialogList` |
| 拦截策略 | GET/POST `/outbound/openapi/v2/task/interceptStrategy/designatedEnable` |
| ASR文本 | GET/POST `/outbound/openapi/v2/content/{audioRecordCode}` |

### 通话统计

| 接口 | 地址 |
|------|------|
| 每日统计 | POST `/outbound/openapi/report/call/out/statByDate` |

### 计费统计

中科金 API 不提供计费接口，中台自行维护单价配置并结合通话时长计算。
