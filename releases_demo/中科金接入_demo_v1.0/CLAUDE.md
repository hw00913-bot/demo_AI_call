# 项目协作规则

## 开始工作前

1. 先阅读 `memory/project.md`、`memory/business-rules.md` 和 `memory/open-items.md`。
2. 涉及需求解释时，再阅读 `docs/requirements.md` 和 `docs/decisions.md`。
3. 涉及页面标注时，必须以 `.clauderules` 为唯一标注规则源。
4. 先理解现有代码和逻辑；非必要不得修改既有业务板块。

## 项目边界

- 项目是无构建步骤的静态前端原型，唯一演示入口为 `index.html`。
- 默认页面为系统管理下的租户管理，路由 key 为 `sys-tenant`。
- 标注系统与业务代码分离；除稳定锚点外，不得为标注修改业务逻辑。

## 本轮迭代：中科金智能平台对接

### 范围

对接中科金智能平台的外呼能力，涉及四个模块，按依赖顺序迭代：

| 期数 | 模块 | 类型 | 路由 key | 涉及文件 |
| --- | --- | --- | --- | --- |
| 1 | 业务场景维护 | 增量修改 | `sys-scene` | `js/pages/sys-scene.js`、`mock/data.js` |
| 2 | 外呼列表 | 增量修改 | `scene-list` | `js/pages/scene-list.js`、`mock/data.js` |
| 3 | 通话记录 | 新建页面 | `result-records` | `js/pages/result-records.js`（新）、`mock/data.js`、`index.html`、`js/nav.js` |
| 4 | 通话统计 + 计费统计 | 新建页面 | `report-call`、`report-billing` | `js/pages/report-call.js`（新）、`js/pages/report-billing.js`（新）、`mock/data.js`、`index.html`、`js/nav.js` |

### 交互参照规则

1. **创建业务场景的交互模式**，参照 `../冰兰接入_v1.0/` 中的 `js/pages/sys-scene.js`：
   - 单页表单模式：Step 1（填写场景信息）和 Step 2（填写呼叫策略）内容合并到 Step 1 中展示。
   - 智能平台选择（Radio）前置到 Step 1 基本信息区，位于场景类型上方。
   - 底部按钮统一为「取消」+「确定」。

2. **中科金平台的字段**，参照冰兰版中 **一知科技** 的面板结构（`platformPanelDefault`）：
   - 中科金场景id（文本输入）
   - 提示 notice
   - 模型类型（Radio: 小模型/大模型）
   - 选择中科金账号（Select，按模型类型过滤）
   - 即中科金字段 = 一知科技的字段结构，不参照冰兰的复杂字段（呼叫通道/线路/时段/重拨等）。

3. **平台面板切换逻辑**（`onPlatformChange`）：四个平台（冰兰/科大讯飞/一知科技/中科金智能）各自控制对应面板的显隐，互斥展示。

4. **外呼列表** 和 **通话记录** 的页面结构，参照冰兰版对应文件。

### 权限规则

| 页面 | 路由 key | 超级管理员 | 租户管理员 | 租户运营 | 数据范围 |
| --- | --- | --- | --- | --- | --- |
| 业务场景 | `sys-scene` | ✅ | ✅ | ❌ | 超管看全部，租户仅看本租户 |
| 外呼列表 | `scene-list` | ✅ | ✅ | ✅ | 超管看全部，租户仅看本租户 |
| 通话记录 | `result-records` | ✅ | ✅ | ✅ | 超管看全部，租户仅看本租户 |
| 通话统计 | `report-call` | ✅ | ✅ | ✅ | 超管看全部，租户仅看本租户 |
| 计费统计 | `report-billing` | ✅ | ✅ | ✅ | 超管看全部，租户仅看本租户 |

> 说明：页面可见性指左侧导航菜单的显隐控制；数据范围指列表/统计查询时按租户过滤的逻辑。

### 修改约束

- 不得顺带重构与本次迭代无关的模块（租户管理、导航框架、公共工具）。
- 结构调整不得改变已有业务逻辑、Mock 语义、页面文案或交互结果。
- `index.html` 只用于入口结构、脚本引用和必要锚点。
- 修改业务规则后，同步更新 `memory/business-rules.md`。
- 作出新的结构或交互决策后，同步更新 `docs/decisions.md`。
- 未确认的问题写入 `memory/open-items.md`，不得自行当作已确认需求。
- 新建页面使用 IIFE + `'use strict'`，注册到 `window.Pages`。
- 新建页面 JS 文件需在 `index.html` 中添加脚本引用，需在 `js/nav.js` 中移除对应占位注册。

## 目录职责

```text
index.html              演示入口
assets/css/             业务样式
js/                     应用和页面逻辑
js/pages/               页面模块
mock/                   全站 Mock 数据
docs/                   功能说明、需求与设计决策
memory/                 项目长期事实、规则、变更与待确认项
annotations/            标注数据、运行时和样式
tools/                  非运行时维护脚本
.clauderules            标注 Agent 规则
```

## 代码规范

- 2 空格缩进，UTF-8，简体中文 UI 文案。
- 原生 JavaScript 使用 IIFE 和 `'use strict'`，页面注册到 `window.Pages`。
- 优先增量修改，不引入构建工具或框架。
- JS 修改后执行语法检查；入口或样式路径修改后进行浏览器回归。
