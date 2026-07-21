# 项目结构摘要

> S5 阶段读取真实文件结构后填写本文件。S6 拆分以此为可编辑边界，不得把总控工具包（tools/prototype-loop-orchestrator）纳入业务实现范围。

## 可编辑业务文件清单

| 路径 | 类型 | 责任 | 可编辑原因 |
|---|---|---|---|
| index.html | entry | 原型总入口 | 全站统一的入口和动态渲染容器 |
| js/pages/sys-scene.js | page | 系统管理-业务场景 | 实现电声平台的业务场景参数配置逻辑 |
| js/pages/scene-list.js | page | 外呼列表及查看详情 | 实现外呼任务卡片展现、已过滤分类、以及数据概览/呼叫名单/任务详情三页签切换 |
| js/pages/report-call.js | page | 统计分析-通话统计 | 实现外呼和客户多维度数据报表的展示 |
| js/pages/result-records.js | page | 外呼结果-通话记录 | 实现通话记录列表、详情抽屉、意向与话单字段查看 |
| js/pages/result-clue.js | page | 外呼结果-线索记录 | 实现客户线索聚合列表、回访明细弹窗及通话详情 |
| mock/data.js | mock | 内存数据库与状态机 | 全站 Mock 数据的定义以及导入/过滤/通话/小结等流程状态机的核心驱动逻辑 |
| config/nav.json | config | 页面路由与菜单树 | 主导航菜单树配置，定义可访问的模块和跳转关联 |
| assets/css/app.css | style | 应用主样式 | 负责原型系统内各页面局部的布局和元素样式细化 |
| assets/css/global.css | style | 全局规范样式 | 统一的 B 端配色、通用表格、通用状态标签等设计规范 |

## 页面与入口

- **入口页面**：[index.html](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/index.html)。
- **页面路由/导航**：[config/nav.json](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/config/nav.json)，配合公共逻辑文件 [js/nav.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/js/nav.js) 进行路由控制。
- **页面实现文件**：存放于 [js/pages/](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/js/pages) 目录下的一系列页面渲染与绑定脚本。

## 公共组件与复用边界

- **公共逻辑**：[js/common.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/js/common.js) 和 [js/app.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/js/app.js)（包含通用消息弹窗、页面动态加载基础）。
- **组件目录**：[js/components/](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/js/components)（如包含复用的分页器、搜索框等组件，修改时须确保不影响其他页面）。

## 数据与配置来源

- **Mock 数据位置**：[mock/data.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/mock/data.js)。
- **项目配置文件**：[config/project.json](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/config/project.json)（含稳定 projectId 标识等）。

## 标注与交互说明位置

- **源码锚点位置**：各业务页面及组件中的 `data-anno`。
- **标注运行时位置**：[annotations/](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/annotations/)（含标注渲染的核心 CSS 和 JS）。
- **交互说明位置**：[docs/interaction.html](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/docs/interaction.html)。

## 不纳入实现/交付的目录

- **tools/prototype-loop-orchestrator/**：项目内总控工具包，不作为业务实现、验证对账、标注覆盖或交付统计范围。
