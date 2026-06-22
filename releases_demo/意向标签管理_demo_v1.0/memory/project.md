# 项目信息

- **项目名称**：智能外呼中台
- **类型**：无构建步骤的静态前端原型
- **唯一演示入口**：`index.html`
- **默认页面**：系统管理 → 标签管理（路由 key: `sys-tags`）

## 已实现模块

| 模块 | 路由 key | 文件 | 说明 |
|------|----------|------|------|
| 标签管理 | `sys-tags` | `js/pages/sys-tags.js` | 供应商/中台标签配置、场景管理、供应商管理 |
| 业务场景 | `sys-scene` | `js/pages/sys-scene.js` | 业务场景 CRUD，智能平台配置 |
| 外呼列表 | `scene-list` | `js/pages/scene-list.js` | 外呼任务卡片列表 |
| 通话记录 | `result-records` | `js/pages/result-records.js` | 通话记录表格 + 详情弹窗 |
| 线索记录 | `result-clue` | `js/pages/result-clue.js` | 线索维度的回访记录、标签、通话详情 |
| 通话统计 | `report-call` | `js/pages/report-call.js` | 外呼/客户统计 |
| 计费统计 | `report-billing` | `js/pages/report-billing.js` | 计费明细 + 嵌套抽屉 |
| 租户管理 | `sys-tenant` | `js/pages/sys-tenant.js` | 租户计费、充值、冻结管理 |
| 其他 | - | `js/nav.js` 占位 | 外呼拦截、线索记录(旧)、账号管理等 🚧 |

## 标注系统

- 标注运行时：`annotations/annotation-runtime.js` + `annotation.css`
- 标注数据：`annotations/annotations.js`（20条：sys-tags 17条 + sys-scene 3条）
- 标注保存服务：`tools/annotation-save-server.js`（可选，需 Node.js）
