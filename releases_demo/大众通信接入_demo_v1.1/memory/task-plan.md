# 任务分解与开发计划 (Task Plan)

## v1.1 WIKI 对齐增量（已完成）

- [x] 更新 WIKI 溯源、官方字段名和 0–12 / A–F Mock 数据。
- [x] 业务场景只关联大众通信 uuid；任务类型、线路、并发等远端信息仅在外呼列表展示。
- [x] 打通通话统计和计费统计的大众通信筛选。
- [x] 外呼列表、任务详情、通话记录和统计记录统一按“uuid 关联、SaaS 操作、中台只读展示/汇总”对齐；大众标签由中台手工配置，不从接口读取。
- [x] 大众通信任务详情按新版 2.0 外呼任务编辑接口 `new_task_extra` 字段分组展示，不再兼容旧版 `task_extras`；保持中台只读。
- [x] 大众通信任务详情交互对齐一知和中科金：新版 2.0 外呼接口与 3.0 大模型接口口径按统一单列信息行展示，去掉额外详情数据。
- [x] 任务详情的自动重拨设置完整展示新 2.0 重呼字段，关闭状态也保留接口返回的策略值。
- [x] 大众任务数据概览的意向分类配置与意向洞察均按 A–F 意向等级枚举展示完整标签名称，其他平台保持原样。
- [x] 删除大众任务详情中由 `enable` 推导的“启动方式”，仅保留 2.0 任务编辑接口可直接支撑的字段。
- [x] 大众通信列表操作区对齐其他平台，编辑及更多菜单中的删除、暂停、终止、启动统一置灰禁用。
- [x] 补齐交付导航、说明文档入口和流程图集。
- [x] 完成桌面/移动端浏览器验证与资源检查。

本文件列出了当前迭代 v1.0 “大众通信接入”在 S7 开发实现阶段的具体任务步骤及执行文件，用于开发进度的实时跟踪。

## 开发实现步骤清单

- `[ ]` **步骤 01**：初始化大众通信 Mock 数据
  - *落点文件*：[mock/data.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/mock/data.js)
  - *简介*：增加大众通信供应商、标签池、通话及线索 Mock 数据。
- `[ ]` **步骤 02**：在业务场景管理页中接入大众通信平台配置
  - *落点文件*：[js/pages/sys-scene.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-scene.js)
  - *简介*：前台新增大众通信平台选择及简化配置输入面板。
- `[ ]` **步骤 03**：通话记录页增加平台筛选器并解析大众通信状态码
  - *落点文件*：[js/pages/result-records.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-records.js)
  - *简介*：新增下拉筛选器，并将 13 个 call_status 映射翻译为中文状态。
- `[ ]` **步骤 04**：线索记录页解析大众通信意向等级
  - *落点文件*：[js/pages/result-clue.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-clue.js)
  - *简介*：列表中的大众通信数据行将 1-6 级意向转换为 A-F 展示。
- `[ ]` **步骤 05**：意向标签管理页支持大众通信手动映射
  - *落点文件*：[js/pages/sys-tags.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-tags.js)
  - *简介*：左侧供应商树新增大众通信，右侧支持手动映射而不使用自动匹配。
- `[x]` **步骤 07**：根据回调 ID 查询并展示大众通信通话详情
  - *落点文件*：`index.html`、`mock/data.js`、`js/pages/result-records.js`、`assets/css/app.css`、`docs/interaction.html`
  - *简介*：回调携带 `callid` 后才生成通话记录，再以同值作为 `recordid` 命中独立详情数据；无回调数据不进入列表。
