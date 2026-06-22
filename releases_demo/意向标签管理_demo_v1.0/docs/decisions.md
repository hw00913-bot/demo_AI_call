# 项目决策记录

## D-001 静态原型架构

继续使用无构建步骤的 HTML、CSS 和原生 JavaScript，不引入框架或包管理器。根目录只保留演示入口和项目级规则文件。

## D-002 目录职责分离

业务样式放入 `assets/css/`，Mock 放入 `mock/`，说明文档放入 `docs/`，长期项目事实放入 `memory/`，标注工具放入 `annotations/`，维护脚本放入 `tools/`。

## D-003 项目记忆分层

`CLAUDE.md` 只定义协作和修改边界；`memory/` 保存长期事实与待确认项；`docs/` 保存可评审需求和设计决策；`.clauderules` 只负责标注 Agent。

## D-004 标注系统隔离

标注安装不得默认生成业务标注或手动新增入口。编辑结果默认只保存到浏览器缓存，不自动回写文件。标注运行时、样式和数据统一放在 `annotations/`。

## D-005 业务变更控制

目录调整不得改变租户计费计算和页面交互。新增需求优先在现有页面模块内增量实现，非必要不修改其他模块。

## D-006 排序移位机制

标签排序编辑采用移位策略（非交换或全量重排）。修改标签排序时，同标签池/标签集内排序值在 (oldSort, newSort] 或 [newSort, oldSort) 区间内的其他标签自动 ±1，保持排序连续不重复。`shiftSortValues()` 为通用函数，供应商模式和中台模式共用。

## D-007 PromptModal 回调安全

`confirmPromptModal` 中必须在调用 `closePromptModal()` 之前保存 `promptCallback` 引用，因为 `closePromptModal()` 内部会将 `promptCallback` 置为 null。使用局部变量 `var cb = promptCallback` 保存后再关闭弹窗。

## D-008 跨模块数据依赖

业务场景管理（sys-scene）的新增业务场景表单中，「智能平台」和「场景类型」字段的数据来源为标签管理模块的供应商列表和场景列表。当前两处均为硬编码，未来应改为从 MockTagSuppliers / MockTagScenes 动态读取。新增供应商或场景时需同步更新业务场景的选项。

## D-009 标注系统页面覆盖

标注数据按页面 key 分组存储在 `annotations/annotations.js` 中。当前覆盖 sys-tags（17条）和 sys-scene（3条）两个页面。`AnnotationConfig.page` 使用函数动态获取当前激活的导航项 ID 作为 page key。新增页面标注时需确保目标页面存在对应的 `data-anno` 锚点。
