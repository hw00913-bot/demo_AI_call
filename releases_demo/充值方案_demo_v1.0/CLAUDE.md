# CLAUDE.md

## 迭代范围约束

**本次项目迭代仅对租户管理（系统管理 → 租户管理）做修改，不得修改其他模块。**

禁止修改的模块：
- 外呼列表（`js/pages/scene-list.js`）
- 业务场景（`js/pages/sys-scene.js`）
- 导航/路由（`js/nav.js`）
- 公共工具（`js/common.js`、`js/app.js`）
- 全站样式（`style.css`）
- Mock 数据中不归属租户管理的部分（`data/mock.js` 中非租户相关变量）

允许修改的文件：
- `js/pages/sys-tenant.js` — 租户管理页面逻辑
- `data/mock.js` — 仅限租户相关 Mock 数据（`MockTenantRows`、`MockTenantBillingRows`、`MockRechargeOrders`、`MockTenantRechargeHistory`、`MockTenantFrozenTasks`、`MockTenantCallControlStates`、`MockTenantAccounts`）
- `index.html` — 仅在必须新增租户管理相关 DOM 锚点或脚本引用时
- `interaction.html` — 功能说明文档（如需记录租户管理的迭代）

---

## 项目概述

智能外呼中台，纯前端原型项目（HTML + CSS + 原生 JS，无框架）。自建平台，对接第三方智能外呼平台（一知科技、科大讯飞、冰兰），对客户手机号进行智能外呼。

- 入口文件：`index.html`（SPA 模式，所有页面通过 JS 路由动态渲染）
- 功能说明文档：`interaction.html`

## 项目文件结构

```
充值方案_demo_v1.0/
├── index.html                        # 唯一入口页面
├── interaction.html                  # 功能说明文档（独立页面）
├── style.css                         # 全站样式
├── js/
│   ├── common.js                     # 公共工具函数
│   ├── nav.js                        # 导航路由 + 面包屑 + 菜单
│   ├── app.js                        # 全局工具（formatNumber/formatDate）
│   └── pages/
│       ├── scene-list.js             # 外呼列表（卡片、详情抽屉、手动导入、意向配置）
│       ├── sys-scene.js              # 业务场景管理（列表、三步向导新建抽屉）
│       └── sys-tenant.js             # 租户管理（列表、充值单配置抽屉、呼叫控制）
├── data/
│   ├── mock.js                       # 全站 Mock 数据
│   └── annotations.js                # 标注数据（空）
└── annotations-tool/                 # 页面标注系统（annotation-runtime.js + annotation.css）
```

## 架构要点

- **SPA 路由**：通过 `window.Pages[pageKey].render()` 动态替换 `#page-content` 内容，无框架依赖
- **页面注册**：每个页面是独立 IIFE，挂载到 `window.Pages`，暴露 `render()` 和 `init()` 方法
- **默认首页**：启动后默认进入系统管理 → 租户管理（`sys-tenant`）
- **路由映射**：定义在 `js/nav.js` 的 `RouteMap` 对象中
- **全局函数**：`showToast()`、`doQuery()`、`doRefresh()`、`resetFilter()` 等定义在 `js/common.js`
- **Mock 数据**：全局变量挂载在 `window` 上（`MockTenantRows` 等），各页面 IIFE 通过 `window.MockXxx` 或内部 getter 函数访问

## 租户管理模块详解（`js/pages/sys-tenant.js`）

### 入口
- 路由 key：`sys-tenant`
- 注册方式：`window.Pages['sys-tenant'] = { render, init, showBillingDrawer, ... }`

### 租户列表
- 表格列：序号、租户名称、有效期、话费余额、冻结金额、可用余额、呼叫控制状态、租户类型、租户id、描述、状态、更新人、更新时间、操作
- 每行的"有效期/话费余额/冻结金额/可用余额/呼叫控制状态"由 `getTenantBillingSummary(tenantName)` 动态计算得出，非直接来自 `MockTenantRows`
- 操作按钮：充值单配置、停用/启用呼叫、编辑、删除

### 计费汇总逻辑（`getTenantBillingSummary`）
核心计算函数，汇总所有已支付的历史充值单 + 当前充值单：
- **有效期**：取所有已支付记录中最晚的 `validTo`，格式 `validFrom ~ validTo`，无记录显示"未生成"
- **话费余额**：所有已支付记录的 `callBalance` 总和
- **冻结金额**：`MockTenantFrozenTasks` 中状态为"冻结中"的 `frozenAmount` 总和，按租户名聚合
- **可用余额**：余额 - 冻结
- **可呼叫判断**：有效期覆盖当前日期 + 可用余额 > 0 → 基础可呼叫；再结合 `MockTenantCallControlStates` 的手动开关
- **租户名匹配**：通过 `normalizeTenantName()` 去除"东风南方/东南方/南方"等前缀差异

### 充值单配置抽屉（`showBillingDrawer`）
- 右侧滑出抽屉，展示租户信息摘要
- 输入充值单号并点击"提交"，调用 `submitRechargeOrder()`
- `applyOrderToRow(row, order)` 根据计费类型（仅坐席费/仅通话费/坐席费+通话费）计算有效期和余额
- **有效期无缝衔接**：新有效期从已有最新有效期次日（+2天）开始，防止空窗期
- 套餐周期映射：半年套餐=180天，全年套餐=365天
- 已支付的充值单会写入 `MockTenantRechargeHistory`

### 呼叫控制（`toggleCallControl`）
- 维护 `MockTenantCallControlStates` 数组
- 基础条件不满足时按钮 disabled，不可操作
- 切换后重新渲染租户列表

### Mock 数据依赖（`data/mock.js` 中租户相关变量）
| 变量 | 用途 |
|------|------|
| `MockTenantRows` | 租户列表基础信息（5条） |
| `MockTenantBillingRows` | 租户当前计费配置（3条） |
| `MockRechargeOrders` | 充值单数据（8条） |
| `MockTenantRechargeHistory` | 历史关联充值单记录（5条） |
| `MockTenantFrozenTasks` | 冻结任务（4条） |
| `MockTenantCallControlStates` | 呼叫控制手动状态（sys-tenant.js 内部 getter，需初始化空数组） |
| `MockTenantAccounts` | 一知账号与租户、模型类型关联 |

---

## 代码规范

- 缩进：2 空格
- 编码：UTF-8
- 语言：简体中文（UI 文案、注释）
- 函数命名：小驼峰（`camelCase`）
- 文件内使用 `'use strict'`
- 页面模块使用 IIFE 封装，避免全局污染
- 新增功能优先增量实现，避免影响既有演示页面
