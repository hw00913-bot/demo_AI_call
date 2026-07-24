# 项目结构摘要 (Project Structure)

本文件记录了“大众通信接入”原型迭代项目当前的真实文件系统结构、可编辑的业务逻辑落点以及明确排除的控制目录，为后续 S6 任务拆分提供准确的物理边界。

## 页面入口与导航结构
- **原型入口**：[index.html](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/index.html)（定义全局导航外壳与内容区锚点）。
- **页面路由与导航定义**：
  - [js/nav.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/nav.js)（配置路由表，控制 SPA 导航渲染）。
  - [config/nav.json](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/config/nav.json)（静态菜单栏结构声明）。

## 数据与标注运行时位置
- **Mock 数据库**：[mock/data.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/mock/data.js)（存放全站 Mock 数据，如外呼列表、通话与线索记录等）。
- **标注运行时**：
  - 核心标注文件：[annotations/annotations.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/annotations/annotations.js)（由 PM 手动回写，挂载已启用的标记点数据）。
  - 标注渲染脚本：[annotations/annotation-runtime.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/annotations/annotation-runtime.js)（渲染固定在 DOM 元素上的气泡点）。
  - 标注样式：[annotations/annotation.css](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/annotations/annotation.css)。

## 可编辑的业务文件清单
所有属于本次迭代的大众通信相关改动必须**局限**在以下业务文件中，严禁越界修改其他无关文件：
- **场景配置功能**：[js/pages/sys-scene.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-scene.js)（配置大众通信任务 ID 与平台单选）。
- **通话记录解析与筛选**：[js/pages/result-records.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-records.js)（通话状态码解析与供应商筛选过滤）。
- **线索记录解析**：[js/pages/result-clue.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-clue.js)（解析意向等级为 A-F 展示）。
- **标签手动配置映射**：[js/pages/sys-tags.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-tags.js)（手动配置大众通信供应商下的意向标签池及标准标签映射）。
- **Mock 基础数据库**：[mock/data.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/mock/data.js)（追加并配置大众通信模拟数据记录）。
- **CSS 视觉优化**：
  - [assets/css/app.css](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/assets/css/app.css)（业务层公共与页面专属样式）。
  - [assets/css/global.css](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/assets/css/global.css)（全局重置基础样式）。

## 明确排除的控制目录
以下为总控运行工具和版本库，**严禁在实现阶段对其进行任何业务逻辑代码修改**，也不得把它们纳入开发落点和交付清单中：
- `tools/prototype-loop-orchestrator/`（总控包）
- `.git/`（版本库）
