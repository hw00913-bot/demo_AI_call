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

## 栈思维：修改前逐层评估影响面

每次修改需求，先逐层列出受影响文件和改动点，再动手。按以下顺序自底向上评估：

```
┌──────────────────────────────────────────────┐
│ 9. 交互文档   docs/interaction.html           │
│ 8. 项目记忆   memory/*.md                     │
│ 7. 标注锚点   .clauderules + annotations/     │
│ 6. 入口文件   index.html（引用/版本号）        │
│ 5. 业务样式   assets/css/app.css              │
│ 4. 跨模块集成  scene-list.js → sys-tenant.js  │
│ 3. UI 渲染    render* / show* / HTML 模板      │
│ 2. 业务逻辑   计算函数 / 校验 / 状态转换        │
│ 1. Mock 数据   mock/data.js（结构/字段/初值）   │
└──────────────────────────────────────────────┘
```

### 逐层检查清单

修改前回答以下问题，全部通过才能开始编码：

| 层 | 检查项 |
|----|--------|
| 1. Mock | 需要新增/修改/删除哪些 Mock 变量？字段结构如何？是否影响已有数据的语义？ |
| 2. 逻辑 | 涉及哪些计算函数？公式是否变化？校验条件是否调整？状态转换是否影响其他判断？ |
| 3. 渲染 | 哪些 HTML 模板需要改？新增/删除哪些 DOM 元素（id/class）？表格列数是否变化（同步改 colspan）？ |
| 4. 集成 | `window.Pages['sys-tenant']` 导出是否要增删？`scene-list.js` 调用的函数签名是否兼容？ |
| 5. 样式 | 新增 UI 组件是否需要 CSS？删除的组件样式是否可以清理？ |
| 6. 入口 | 脚本引用路径是否需要更新？版本号是否需要提升避免缓存？ |
| 7. 标注 | `data-anno` 锚点是否受影响？标注数据是否需要迁移？ |
| 8. 记忆 | `project.md` 计费实现描述、`business-rules.md` 规则、`change-log.md` 变更记录是否同步？ |
| 9. 文档 | `interaction.html` 版本说明/项目范围/功能说明是否需要更新？ |

### 修改完成后

1. JS 语法检查：`node -e "new Function(fs.readFileSync('...'))"`。
2. 确认受影响层已全部更新，未遗漏任何一层。
3. 若不涉及某层，明确说明原因，不得静默跳过。

## 代码规范

- 2 空格缩进，UTF-8，简体中文 UI 文案。
- 原生 JavaScript 使用 IIFE 和 `'use strict'`，页面注册到 `window.Pages`。
- 优先增量修改，不引入构建工具或框架。
- JS 修改后执行语法检查；入口或样式路径修改后进行浏览器回归。
