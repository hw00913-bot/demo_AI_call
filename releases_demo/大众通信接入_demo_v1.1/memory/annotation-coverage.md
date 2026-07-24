# 标注覆盖率报告 (Annotation Coverage)

本文件评估并记录了当前项目中所有可用标注点的覆盖情况。

## 标注覆盖统计明细

### 已覆盖的标注 ID 列表
为满足全局 ID 唯一性及连续性，项目中的标注 ID 均已规范覆盖。以下为已覆盖的标注 ID 汇总：
- 覆盖标注: ID 1 | 页面: sys-tags | 标题: 中台标签集 | 目标: [data-anno='sys-tags-local-root']
- 覆盖标注: ID 2 | 页面: sys-tags | 标题: 供应商标签集 | 目标: [data-anno='sys-tags-supplier-root']
- 覆盖标注: ID 3 | 页面: sys-tags | 标题: 场景配置 | 目标: [data-anno='sys-tags-scene-config']
- 覆盖标注: ID 4 | 页面: sys-tags | 标题: 供应商管理 | 目标: [data-anno='sys-tags-supplier-mgr']
- 覆盖标注: ID 5 | 页面: sys-tags | 标题: 新增供应商标签 | 目标: [data-anno='sys-tags-add-tag']
- 覆盖标注: ID 6 | 页面: sys-tags | 标题: 搜索标签 | 目标: [data-anno='sys-tags-tag-search']
- 覆盖标注: ID 7 | 页面: sys-tags | 标题: 标签状态筛选 | 目标: [data-anno='sys-tags-tag-filter']
- 覆盖标注: ID 8 | 页面: sys-tags | 标题: 全选启用 / 清空启用 | 目标: [data-anno='sys-tags-enable-all']
- 覆盖标注: ID 9 | 页面: sys-tags | 标题: 标签启用开关 | 目标: [data-anno='sys-tags-tag-enable-col']
- 覆盖标注: ID 10 | 页面: sys-tags | 标题: 映射本地标签 | 目标: [data-anno='sys-tags-tag-mapping-col']
- 覆盖标注: ID 11 | 页面: sys-tags | 标题: 标签操作（编辑/删除） | 目标: [data-anno='sys-tags-tag-action-col']
- 覆盖标注: ID 12 | 页面: sys-tags | 标题: 新增本地标签 | 目标: [data-anno='sys-tags-add-local-tag']
- 覆盖标注: ID 13 | 页面: sys-tags | 标题: 场景配置弹窗 | 目标: [data-anno='sys-tags-scene-modal']
- 覆盖标注: ID 14 | 页面: sys-tags | 标题: 供应商管理弹窗 | 目标: [data-anno='sys-tags-supplier-modal']
- 覆盖标注: ID 15 | 页面: sys-tags | 标题: 清空启用 | 目标: [data-anno='sys-tags-disable-all']
- 覆盖标注: ID 16 | 页面: sys-tags | 标题: 排序（供应商模式） | 目标: [data-anno='sys-tags-tag-sort-col']
- 覆盖标注: ID 17 | 页面: sys-tags | 标题: 排序（中台模式） | 目标: [data-anno='sys-tags-local-sort-col']
- 覆盖标注: ID 18 | 页面: sys-scene | 标题: 新增业务场景 | 目标: [data-anno='sys-scene-add-btn']
- 覆盖标注: ID 19 | 页面: sys-scene | 标题: 智能平台选择 | 目标: [data-anno='sys-scene-platform']
- 覆盖标注: ID 20 | 页面: sys-scene | 标题: 场景类型选择 | 目标: [data-anno='sys-scene-scene-type']
- 覆盖标注: ID 21 | 页面: sys-scene | 标题: 大众通信任务关联 | 目标: [data-anno='sys-scene-dazhong-taskid']
- 覆盖标注: ID 22 | 页面: result-clue | 标题: 场景名称 | 目标: [data-anno='result-clue-scene-filter']
- 覆盖标注: ID 23 | 页面: result-records | 标题: 通话记录平台筛选与状态码解析 | 目标: [data-anno='result-records-header']
- 覆盖标注: ID 24 | 页面: result-records | 标题: 会话录音与语音回放 | 目标: [data-anno='result-records-audio']
- 覆盖标注: ID 25 | 页面: result-records | 标题: 外呼小结与AI标签 | 目标: [data-anno='result-records-summary']
- 覆盖标注: ID 26 | 页面: result-records | 标题: 线索基本信息字段 | 目标: [data-anno='result-records-fields']

### 覆盖的需求点
- 覆盖需求：R-001 (新增业务场景)
- 覆盖需求：R-002 (通话记录平台筛选)
- 覆盖需求：R-003 (线索记录场景意向展示)
- 覆盖需求：R-004 (意向标签手动映射)
- 覆盖需求：R-005 (大/小模型配置联动)
- 覆盖需求：R-006 (外呼任务状态对齐，通过 scene-list 卡片/详情与交互文档追溯)
- 覆盖需求：R-007 (通话与计费统计平台筛选，已补充 v1.1 提示词锚点)

### 覆盖的字段引用
- 覆盖字段引用：FLD-001 (智能平台)
- 覆盖字段引用：FLD-002 (场景类型/意向级别)
- 覆盖字段引用：FLD-003 (会话录音文本)
- 覆盖字段引用：FLD-004 (大众通信外呼任务)
- 提示词覆盖字段引用：FLD-005（外呼线路）
- 提示词覆盖字段引用：FLD-006（总并发数）
- 提示词覆盖字段引用：FLD-007（弹号顺序）
- 提示词覆盖字段引用：FLD-008（任务状态）
- 提示词覆盖字段引用：FLD-009（计费类型）
- 提示词覆盖字段引用：FLD-010（通话/计费时长）

### 覆盖的外部来源引用
- 覆盖来源引用：SRC-001 (大众通信外呼 API 规范及 13 个通话状态码)
- 覆盖来源引用：SRC-002 (意向等级 A-F 等级定义事实)
- 提示词覆盖来源引用：SRC-003 (意向标签基础原型)
- 提示词覆盖来源引用：SRC-004 (WIKI loop context 派生输出)

## 覆盖率总结

v1.0 底座仍保留历史标注 1–26；v1.1 新增需求 R-006/R-007、字段 FLD-005–FLD-010 与来源 SRC-003/SRC-004 已进入手动标注提示词，未自动回写 `annotations/annotations.js`。PM 若需更新气泡，应使用本轮提示词生成一套全新、全局连续的标注，不续写历史 ID。
