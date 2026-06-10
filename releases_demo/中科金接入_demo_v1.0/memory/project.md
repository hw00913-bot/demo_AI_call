# 项目记忆

## 版本

- 当前版本：**v1.0**（中科金智能平台对接）。
- 已完成模块：业务场景维护、外呼列表、通话记录、通话统计、计费统计。

## 项目定位

- 智能外呼中台纯前端原型，使用 HTML、CSS 和原生 JavaScript（IIFE + `'use strict'`）。
- 不需要构建或安装依赖，入口为根目录 `index.html`。
- 页面通过 `window.Pages[pageKey]` 注册，由 `js/nav.js` 负责路由切换。
- 默认打开系统管理下的业务场景，路由 key 为 `sys-scene`。

## 页面模块

| 路由 key | 页面 | 文件 | 类型 |
| --- | --- | --- | --- |
| `sys-scene` | 业务场景 | `js/pages/sys-scene.js` | 增量修改 |
| `scene-list` | 外呼列表 | `js/pages/scene-list.js` | 增量修改 |
| `result-records` | 通话记录 | `js/pages/result-records.js` | 新建 |
| `report-call` | 通话统计 | `js/pages/report-call.js` | 新建 |
| `report-billing` | 计费统计 | `js/pages/report-billing.js` | 新建 |
| `sys-tenant` | 租户管理 | `js/pages/sys-tenant.js` | 保留 |

## 权限规则

| 页面 | 超管 | 租户管理员 | 租户运营 | 数据范围 |
|------|------|-----------|---------|---------|
| 业务场景 | ✅ | ✅ | ❌ | 超管全部 / 租户本租户 |
| 外呼列表 | ✅ | ✅ | ✅ | 超管全部 / 租户本租户 |
| 通话记录 | ✅ | ✅ | ✅ | 超管全部 / 租户本租户 |
| 通话统计 | ✅ | ✅ | ✅ | 超管全部 / 租户本租户 |
| 计费统计 | ✅ | ✅ | ✅ | 超管全部 / 租户本租户 |

## 标注系统

- 5 个页面共 14 条标注（sys-scene:3, scene-list:4, result-records:1, report-call:1, report-billing:5）
- 标注数据：`annotations/annotations.js`
- 运行时：`annotations/annotation-runtime.js`（支持显示/隐藏、弹窗、编辑、拖拽、缓存保存）
- 样式：`annotations/annotation.css`
- 写回服务：`tools/annotation-save-server.js`（`node tools/annotation-save-server.js` 启动，端口 3457）
- 规则源：`.clauderules`

## 工作原则

- 先理解现有代码和业务逻辑，再修改。
- 非必要不修改现有板块内容，不做无关重构。
- 修改业务规则后同步更新 `memory/business-rules.md`。
- 作出新的结构或交互决策后同步更新 `docs/decisions.md`。
- 未确认的问题写入 `memory/open-items.md`。

## 目录说明

| 路径 | 职责 |
| --- | --- |
| `index.html` | 演示入口和资源加载 |
| `assets/css/app.css` | 全站业务样式 |
| `js/app.js` | 应用公共逻辑 |
| `js/nav.js` | 导航路由和菜单 |
| `js/common.js` | 公共工具函数 |
| `js/pages/` | 页面模块（5个业务页面） |
| `mock/data.js` | 全站 Mock 数据 |
| `annotations/` | 标注数据、运行时和样式 |
| `tools/` | 非运行时维护脚本（标注写回服务） |
| `memory/` | 项目长期事实、规则、变更和待确认 |
| `docs/` | 需求文档和设计决策 |
| `.clauderules` | 标注 Agent 规则 |

## 运行依赖

- `index.html` 脚本加载顺序：Mock → 公共逻辑 → 页面模块 → 应用工具 → 导航 → 标注数据 → 标注运行时
- 标注写回服务需单独启动：`node tools/annotation-save-server.js`（127.0.0.1:3457）
