# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概览

智能外呼中台的静态前端原型（HTML/JS/CSS）。无框架、无构建步骤、无包管理器。直接在浏览器中打开 `index.html` 即可。所有数据均为存储在全局 `window.Mock*` 变量中的 Mock 数据——数据变更仅在页面刷新前有效。

## 运行方式

```bash
# 打开原型页面
open index.html

# 启动标注保存服务（用于将标注编辑持久化到文件）
node tools/annotation-save-server.js --port=3457
```

无需 `npm install`，无构建命令。标注保存服务需要 Node.js，但属于可选功能——应用无需它也能正常运行。

## 架构

### 导航与路由（SPA 模式）

`index.html` 定义了固定外壳：顶栏、侧边栏和 `<div id="page-content">` 容器。所有页面内容均动态渲染到该容器中。

- **`js/nav.js`** — 路由表（`RouteMap`）将 DOM 元素的 id 映射为页面 key 和面包屑。点击侧边栏项调用 `navigateTo(pageKey, navId)`，该方法调用 `window.Pages[pageKey].render()` 并替换内容容器的 innerHTML。
- **`js/common.js`** — 公共工具函数：Toast 通知（`showToast`）、筛选/查询/重置逻辑、多选下拉框、Tab 切换、日期初始化、门店层级（大区→小区→门店）级联选择、异步导出模拟（`doExport`）。
- **`js/app.js`** — 仅两个工具函数：`formatNumber` 和 `formatDate`，挂载在 `window` 上。

### 页面模块（IIFE 模式）

`js/pages/` 中的每个页面模块遵循相同的模式：

```js
window.Pages = window.Pages || {};
window.Pages['page-key'] = (function() {
  'use strict';
  function render() { return '<div>...</div>'; }  // 返回 HTML 字符串
  function init() { /* DOM 就绪后绑定事件 */ }
  return { render: render, init: init /*, 对外方法 */ };
})();
```

- `render()` 返回 HTML 字符串 —— 不得依赖 DOM 已就绪
- `init()` 在 innerHTML 设置后通过 `setTimeout(() => module.init(), 0)` 调用，用于事件绑定
- 对外方法（如 `openModal`、`showDetail`）暴露在返回对象上，通过 `window.Pages['page-key'].method()` 访问

### 脚本加载顺序（关键）

`index.html` 按以下顺序加载脚本：
1. `mock/data.js` — 所有 Mock 全局变量必须在页面渲染前存在
2. `js/common.js` — 页面使用的公共函数
3. `js/pages/*.js` — 页面模块，注册到 `window.Pages`
4. `js/app.js` — 工具函数
5. `js/nav.js` — 路由（在 DOMContentLoaded 时初始化默认页面）

### 页面与路由对照

| 路由 key | 文件 | 说明 |
|-----------|------|------|
| `sys-tags` | `js/pages/sys-tags.js` | 标签管理（当前迭代，约 1760 行） |
| `scene-list` | `js/pages/scene-list.js` | 外呼任务卡片列表 |
| `result-records` | `js/pages/result-records.js` | 通话记录表格 |
| `report-call` | `js/pages/report-call.js` | 通话统计 |
| `report-billing` | `js/pages/report-billing.js` | 计费统计 |
| `sys-scene` | `js/pages/sys-scene.js` | 业务场景管理 |
| `sys-tenant` | `js/pages/sys-tenant.js` | 租户管理 |
| 其他 | `js/nav.js` 占位 | 显示 🚧「功能正在开发中」 |

未实现的页面由 `js/nav.js` 中的占位工厂函数处理 —— 新增页面时不要移除该占位逻辑。

### 数据层

所有 Mock 数据以全局 `var` 声明的方式存放在 `mock/data.js` 中。数据在运行时可变——页面代码直接读写这些全局变量，没有状态管理抽象。

关键命名约定：
- `MockSceneList`、`MockCallRecordRows` 等 —— 原始数据数组
- 标签相关的 Mock 数据：`MockTagSuppliers`、`MockTenantTypes`、`MockTagScenes`、`MockSupplierTagPool`、`MockTagConfigs`、`MockLocalTagSets`、`MockSupplierLocalTagMappings`

### CSS

单一样式文件：`assets/css/app.css`（约 2858 行）。所有类名无作用域隔离（无 CSS Modules 或 BEM 约定）。选择器使用语义化前缀：`.tenant-*`、`.biz-*`、`.record-*`、`.scene-*`、`.card-*`。标签管理页面的样式以内联方式写在 `sys-tags.js` 中（该文件约第 428-452 行），不在 app.css 中。

## 标签管理模块（当前迭代）

`js/pages/sys-tags.js` 是最大的页面模块。核心设计：

- **左侧面板**（`tags-tree-panel`，260px）：两个根树 —— 中台标签集（本地标准标签）和供应商标签集（供应商标签配置）。三级层级：供应商 → 租户类型 → 场景。叶子场景节点点击后渲染右侧面板。
- **右侧面板**（`tags-content-panel`）：填充剩余宽度，内容随节点点击替换。两种模式：
  - **供应商模式**（`currentMode = 'supplier'`）：展示标签表格，包含启用勾选、行内编辑、删除、本地标签映射下拉框
  - **中台模式**（`currentMode = 'local'`）：展示本地标准标签表格，支持行内编辑/删除/新增
- **弹窗**：场景配置（⚙）、供应商管理（🏢）、通用 Prompt（文本输入）、通用 Confirm（删除确认）
- **自动映射**：`guessLocalTagId()` 根据关键词模式，启发式地将供应商标签匹配到本地标签
- **停用保护**：供应商或场景 `status === 'disabled'` 时，启用勾选框和编辑按钮均禁用
- **圆点指示器**：绿色圆点 = 有已启用标签配置；灰色圆点 = 无配置

向此页面添加功能时，需保持双模式结构（`currentMode`）和树状态恢复（`restoreSelection()`，在树重建后调用）的完整性。

## 标注系统

位于 `annotations/` 目录。用于原型评审的叠加层，在 DOM 元素上添加红色编号标记点。

- `annotation-runtime.js` — 自执行的 IIFE，读取 `window.AnnotationData`（或通过 `window.AnnotationConfig` 的 dataKey 读取），将标记渲染为固定定位按钮，并弹出弹窗用于查看/编辑标注信息（10 个标准字段：functionName、functionDesc、permissionScope、dataSource、valueLogic、fieldDesc、interactionDesc、judgeRule、exceptionRule、otherDesc）。
- `annotation.css` — 所有选择器以 `anno-` 为前缀。
- `tools/annotation-save-server.js` — Node.js HTTP 服务，通过读写 `annotations/annotations.js` 持久化标注编辑。

标注运行时在 DOMContentLoaded 时自动初始化。它监听 DOM 变更并重新渲染标记点。标记点位置可拖拽并保存到 localStorage。

标记点通过目标元素的 `data-anno` 属性定位。`sys-scene.js` 模块包含若干标注目标（如 `data-anno="sys-scene-add-btn"`、`data-anno="sys-scene-platform"`）。

## 修改约束（来自 docs/decisions.md 和 docs/requirements.md）

- 不得重构与当前任务无关的模块（租户管理、导航框架、公共工具函数）
- 不得改变已有业务逻辑、Mock 数据语义、页面文案或交互结果，除非明确要求
- `index.html` 仅用于入口结构、脚本引用和锚点——不得在其中添加页面专属标记
- 新建页面必须使用 IIFE + `'use strict'`，注册到 `window.Pages`
- 新增页面 JS 文件需要：在 `index.html` 中添加 `<script>` 标签，并在 `js/nav.js` 中移除对应的占位注册
- 修改业务规则后，同步更新 `memory/business-rules.md`
- 作出新的结构或交互决策后，同步更新 `docs/decisions.md`
- 未确认的问题写入 `memory/open-items.md`，不得自行当作已确认需求
- 标注系统编辑默认只保存到 localStorage；文件回写需要标注保存服务处于运行状态
