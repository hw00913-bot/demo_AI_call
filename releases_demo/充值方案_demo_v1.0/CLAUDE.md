# 项目协作规则

## 开始工作前

1. 先阅读 `memory/project.md`、`memory/business-rules.md` 和 `memory/open-items.md`。
2. 涉及需求解释时，再阅读 `docs/requirements.md` 和 `docs/decisions.md`。
3. 涉及页面标注时，必须以 `.clauderules` 为唯一标注规则源。
4. 先理解现有代码和逻辑；非必要不得修改既有业务板块。

## 项目边界

- 项目是无构建步骤的静态前端原型，唯一演示入口为 `index.html`。
- 默认页面为系统管理下的租户管理，路由 key 为 `sys-tenant`。
- 本轮业务迭代范围是租户管理；不得顺带重构外呼列表、业务场景、导航和公共工具。
- 结构调整不得改变业务逻辑、Mock 语义、页面文案或交互结果。
- 标注系统与业务代码分离；除稳定锚点外，不得为标注修改业务逻辑。

## 目录职责

```text
index.html              演示入口
assets/css/             业务样式
js/                     应用和页面逻辑
mock/                   全站 Mock 数据
docs/                   功能说明、需求与设计决策
memory/                 项目长期事实、规则、变更与待确认项
annotations/            标注数据、运行时和样式
tools/                  非运行时维护脚本
.clauderules            标注 Agent 规则
```

## 修改约束

- 租户管理逻辑优先修改 `js/pages/sys-tenant.js`。
- 租户相关 Mock 只修改 `mock/data.js` 中对应变量。
- `index.html` 只用于入口结构、脚本引用和必要锚点。
- 修改业务规则后，同步更新 `memory/business-rules.md`。
- 作出新的结构或交互决策后，同步更新 `docs/decisions.md`。
- 未确认的问题写入 `memory/open-items.md`，不得自行当作已确认需求。

## 代码规范

- 2 空格缩进，UTF-8，简体中文 UI 文案。
- 原生 JavaScript 使用 IIFE 和 `'use strict'`，页面注册到 `window.Pages`。
- 优先增量修改，不引入构建工具或框架。
- JS 修改后执行语法检查；入口或样式路径修改后进行浏览器回归。
