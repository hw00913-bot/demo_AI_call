# 详细执行步骤 (Execution Steps)

本文件定义了“大众通信接入”原型迭代项目 v1.0 中，在 S7 实现阶段需要按顺序严格执行的五步代码开发及单步验证指令。

---

## 步骤 01：初始化大众通信 Mock 数据

### 需求来源
- 对应 [project-startup-plan.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/project-startup-plan.md) 中的“数据和字段来源”与“项目范围”。

### 目标
- 全局 Mock 数据库支持大众通信的供应商信息、13 种通话状态码数据、A-F 等级标签池以及相关的通话记录、线索记录及场景列表示例数据。

### 文件
- [mock/data.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/mock/data.js)

### 预期变更类型
- update

### 输入
- memory/project-startup-plan.md
- memory/project.md
- memory/source-materials.md
- memory/field-map.md

### 工作
1. 在 `MockTagSuppliers` 数组中追加大众通信供应商信息：`{ id: 'dazhong', localCode: 'SUP-DZ', name: '大众通信', status: 'enabled' }`。
2. 在 `MockSupplierTagPool` 对象中追加 `'dazhong'` 的 6 个意向标签池，按 `FLD-002` 的 A-F 级添加：
   - A-高意向 (sort=1)、B-意向客户 (sort=2)、C-潜在客户 (sort=3)、D-一般意向 (sort=4)、E-需再次跟进 (sort=5)、F-号码无效 (sort=6)。
3. 在 `MockCallRecordRows` 中加入 3 条 `platform: '大众通信'` 的通话记录记录，并用 `call_status` (`FLD-001`) 填入测试码（如 1=呼叫成功、3=拒接、8=占线）。
4. 在 `MockClueDetailNEV` 和 `MockClueDetailICE` 中加入 `level` 为 A、B、C、D、E、F 以及空值（未评级）的大众通信线索示例行。
5. 在 `MockSceneList` 和 `SceneRows` 默认数组中追加 1 条大众通信的初始场景数据。

### 验收
- 全局 Mock 变量能够正确被浏览器控制台读取，包含大众通信相关条目。

### 验证
- 打开控制台，执行 `console.log(MockTagSuppliers)` 检查是否包含 `dazhong` 项。
- 执行 `console.log(MockSupplierTagPool['dazhong'])` 验证是否包含 6 个意向标签。

### 验证技能
- `prototype-verifier`

### 标注影响
- affected-pages: None
- annotation-required: no

### 依赖
- None

### 失败处理
- 失败时回到 S3 检查 field-map.md 字段是否被误写。

---

## 步骤 02：在业务场景管理页中接入大众通信平台配置

### 需求来源
- 对应 [project-startup-plan.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/project-startup-plan.md) 的“业务场景管理页”及 [DEC-002](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/docs/decisions.md)。

### 目标
- 支持在前台业务场景页中，为大众通信提供极简的“大众通信任务 ID (uuid)”表单输入框，而不显示复杂的模型及账号关联。

### 文件
- [js/pages/sys-scene.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-scene.js)

### 预期变更类型
- update

### 输入
- memory/project-startup-plan.md
- memory/field-map.md (FLD-003, FLD-004)

### 工作
1. 在新增/编辑业务场景抽屉的“智能平台”单选组中增加“大众通信”单选项，绑定平台 `onPlatformChange` 切换。
2. 在抽屉中添加大众通信专属的面版 `#platformPanelDazhong`，内含一个“大众通信任务 ID”必填输入框（关联 `FLD-004` 即 `uuid`），并提供合理的 Notice 警告横幅。
3. 更新 `onPlatformChange()` 切换逻辑，当选择“大众通信”时隐藏一知和中科金面板，仅显示大众通信面板，且不展示大/小模型等其他复杂配置项。
4. 修改表单保存方法 `submitAddModal()`，获取大众通信输入的任务 ID，并回写至 `MockSceneRows` 的 `sceneId` 中，其 platform 标识为 `'大众通信'`。

### 验收
- 点击“新增业务场景”，选择平台为“大众通信”，可正常切换展示仅包含“大众通信任务 ID”的简洁面板。
- 填写完整后点击确定，业务场景列表中能正常生成一条所属平台为“大众通信”的记录。

### 验证
- 打开浏览器，进入“业务场景”页，点击“新增业务场景”并切换到“大众通信”，验证输入框提示和布局无变形。

### 验证技能
- `prototype-verifier`

### 标注影响
- affected-pages: sys-scene
- annotation-required: yes

### 依赖
- 步骤 01

### 失败处理
- 失败时回到 S5 项目结构读取中确认 sys-scene.js 的渲染接口是否被破坏。

---

## 步骤 03：通话记录页增加平台筛选器并解析大众通信状态码

### 需求来源
- 对应 [project-startup-plan.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/project-startup-plan.md) 的“通话记录页”及 [DEC-003](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/docs/decisions.md)。

### 目标
- 支持按平台/供应商筛选通话记录。当筛选“大众通信”时，仅展示大众通信呼叫明细，且通话状态码 `FLD-001` (call_status) 能正常解析为 0-12 的中文。

### 文件
- [js/pages/result-records.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-records.js)

### 预期变更类型
- update

### 输入
- memory/project-startup-plan.md
- memory/field-map.md (FLD-001)

### 工作
1. 在通话记录页面顶部筛选区域增加“所属平台”下拉选择框（包含选项：全部、一知科技、中科金智能、大众通信）。
2. 在过滤数据渲染方法中，引入平台过滤逻辑，根据筛选框的选中值对 `MockCallRecordRows` 进行筛选过滤。
3. 编写大众通信通话状态解析函数 `formatDazhongCallStatus(code)`：根据 `FLD-001`（0 等待呼叫、1 呼叫成功... 12 用户屏蔽）进行状态文本翻译；若传入其他状态码值，则降级原值显示。
4. 修改通话表格行渲染逻辑，当记录行的 `platform` 为 `'大众通信'` 时，其通话状态列通过上述解析函数进行翻译。

### 验收
- 打开通话记录页，点击“所属平台”筛选下拉框选择“大众通信”并查询，列表仅显示大众通信数据，状态列显示为正确的中文状态名称（如“呼叫成功”、“占线/用户正忙”）。

### 验证
- 检查筛选后的表格行 DOM 节点中，通话状态列的文字是否不再是数字，而是映射后的中文。

### 验证技能
- `prototype-verifier`

### 标注影响
- affected-pages: result-records
- annotation-required: yes

### 依赖
- 步骤 01

### 失败处理
- 回到 S3 检查 field-map.md 的 FLD-001 通话状态码是否定义全面。

---

## 步骤 04：线索记录页解析大众通信意向等级

### 需求来源
- 对应 [project-startup-plan.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/project-startup-plan.md) 的“线索记录页”及 [DEC-003](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/docs/decisions.md)。

### 目标
- 支持在线索记录中，自动解析大众通信数据行的意向等级为 A-F 展示，其他平台或空值显示为默认样式或“未评级”。

### 文件
- [js/pages/result-clue.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/result-clue.js)

### 预期变更类型
- update

### 输入
- memory/project-startup-plan.md
- memory/field-map.md (FLD-002)

### 工作
1. 修改线索详情表格渲染逻辑，读取记录行的平台归属。
2. 编写大众通信意向评级转换逻辑 `formatDazhongIntention(level)`，根据 `FLD-002` 将数值 1-6 分别映射翻译为字母评级（1=A级、2=B级、3=C级、4=D级、5=E级、6=F级）。若值为空或超出范围，映射显示为“未评级”。
3. 渲染每一行线索数据时，若 `platform === '大众通信'`，其意向等级列输出评级字母（如“A级”），不干扰其他平台原有的等级展示。

### 验收
- 进入线索记录页，大众通信线索记录行的意向列显示为 A级、B级...F级；若对应线索无等级则显示为“未评级”。

### 验证
- 检查线索记录列表，大众通信的数据行的意向评级文字显示是否符合字母期望。

### 验证技能
- `prototype-verifier`

### 标注影响
- affected-pages: result-clue
- annotation-required: yes

### 依赖
- 步骤 01

### 失败处理
- 检查 data.js 中的大众通信 Mock 数据线索的等级设定是否在 1-6 范围内。

---

## 步骤 05：意向标签管理页支持大众通信手动映射

### 需求来源
- 对应 [project-startup-plan.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/memory/project-startup-plan.md) 的“意向标签管理页”及 [DEC-004](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/docs/decisions.md)。

### 目标
- 在左侧供应商树菜单中添加“大众通信”，并在其“供应商模式”面板中展示 A-F 供应商标签，全面支持手动关联本地标准标签，不启用自动猜测映射算法。

### 文件
- [js/pages/sys-tags.js](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/大众通信接入_demo_v1.0/js/pages/sys-tags.js)

### 预期变更类型
- update

### 输入
- memory/project-startup-plan.md
- memory/field-map.md (FLD-002)

### 工作
1. 修改左侧供应商树构建逻辑，在供应商分类下追加“大众通信 (dazhong)”节点，并为店面和总部租户类型配置初始化叶子菜单。
2. 确保在右侧“供应商模式”渲染时，能够正确拉取到 `MockSupplierTagPool['dazhong']` 下的 A-F 这 6 个标签行。
3. 检查并屏蔽大众通信的“一键自动映射”或 `guessLocalTagId()` 调用——若是大众通信平台，首次启用或配置时，其本地映射下拉选择框默认保留空值，等待管理员手动在页面上下拉选择并保存。
4. 保证在选中大众通信后，新增标签、编辑、排序移位以及供应商状态启用/停用等基础交互逻辑在 sys-tags 内运行正常。

### 验收
- 进入标签管理页，在左侧树结构中选中大众通信叶子节点，右侧能列出 A-F 六个标签，点击本地标准映射下拉框可以手动进行保存，且不触发任何自动映射。

### 验证
- 验证左侧树中大众通信节点的展开与选中态；确认其本地映射列可以正常手动更改。

### 验证技能
- `prototype-verifier`

### 标注影响
- affected-pages: sys-tags
- annotation-required: yes

### 依赖
- 步骤 01

### 失败处理
- 检查 sys-tags.js 中对于左侧树和右侧面板渲染的供应商 ID 列表是否添加了 'dazhong' 这一条件判断。

---

## 步骤 06：对齐大众任务意向分类枚举

### 需求来源
- PM 终态修订：数据概览“意向分类”需与大众通信意向枚举值对齐。

### 目标
- 大众通信任务的数据概览分类卡片、配置默认值及配置下拉统一使用 FLD-002 的完整 A–F 名称，其他平台显示与交互保持不变。

### 文件
- `js/pages/scene-list.js`
- `memory/business-rules.md`
- `memory/field-map.md`
- `memory/acceptance-map.md`

### 预期变更类型
- update

### 输入
- `memory/business-rules.md`
- `memory/source-materials.md`（SRC-002）
- `memory/field-map.md`（FLD-002）

### 工作
1. 将大众通信意向分类配置的默认值由“ A级/B级…”改为完整枚举名称。
2. 将大众通信配置下拉限制为 A-高意向、B-意向客户、C-潜在客户、D-一般意向、E-需再次跟进、F-号码无效。
3. 大众任务分类卡片使用完整枚举名称生成占比、客户数与合计标题，避免“客户类客户”等重复文案。
4. 保持一知、中科金现有分类配置与标题不变。

### 验收
- 大众任务分类卡片默认显示“A-高意向占比”“B-意向客户占比”“A-高意向数量”“B-意向客户数量”等完整枚举文案。
- 配置下拉完整且仅包含大众通信 6 个枚举值。
- 一知、中科金的分类卡片仍沿用原标签。

### 验证
- 浏览器进入大众通信任务“查看 → 数据概览”，检查意向分类卡片与配置弹窗。
- 打开一知或中科金任务数据概览，回归分类标题与配置选项。
- 检查页面 console 无阻塞错误、静态资源无 404。

### 验证技能
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### 标注影响
- affected-pages: scene-list
- annotation-required: yes

### 依赖
- 步骤 01

### 失败处理
- 若枚举名称不一致，回到 S3 核对 FLD-002 与 SRC-002；若其他平台回归失败，留在 S7 修复平台分支。

---

## 步骤 07：根据回调 ID 查询并展示通话详情

### 需求来源
- PM 补充接口口径：`callid=recordid`，必须先收到回调 `callid` 才能查询详情（SRC-005）。

### 目标
- 大众通信通话详情弹窗根据回调 `callid` 查找独立详情数据，并可观察地展示 `callid=recordid` 与数据获取状态。

### 文件
- `index.html`
- `mock/data.js`
- `js/pages/result-records.js`
- `assets/css/app.css`
- `docs/requirements.md`
- `docs/interaction.html`
- `memory/business-rules.md`
- `memory/source-materials.md`
- `memory/field-map.md`
- `memory/acceptance-map.md`

### 预期变更类型
- update

### 输入
- `memory/business-rules.md`
- `memory/source-materials.md`（SRC-005）
- `memory/field-map.md`（FLD-014）

### 工作
1. 在大众通信通话列表 Mock 中区分回调摘要与按 `recordid` 索引的详情数据，列表内的大众数据必须已有 `callid`，并保证 `callid=recordid`。
2. 打开大众通信详情时，从列表行取得 `callid`，将同值作为 `recordid` 命中详情；不直接把列表摘要伪装成接口详情。
3. 在“详细信息”中展示回调通话 ID、详情查询记录 ID、“回调 → 详情接口”数据链路与获取状态；详情内容顶部不另外展示来源提示条。
4. 大众通信未收到回调 `callid` 时不生成通话记录；列表准入层过滤缺少 `callid` 的大众数据，详情页不提供等待回调状态。
5. 其他平台通话详情保持原有交互。

### 验收
- 已回调的大众记录显示一致的 `callid` 和 `recordid`，且页面数据来自该 `recordid` 命中的详情。
- 缺少回调 `callid` 的大众数据不出现在通话记录列表，页面不出现等待回调文案。
- 一知、中科金详情不受影响。

### 验证
- 浏览器筛选大众通信，确认只展示含 `callid` 的记录，打开详情核对 `callid=recordid` 和查询状态。
- 打开其他平台记录回归详情弹窗。
- 检查 console 无阻塞错误、静态资源无 404。

### 验证技能
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`
- Support Skill: `superpowers-pm-prototype/skills/verification-before-completion`

### 标注影响
- affected-pages: result-records
- annotation-required: yes

### 依赖
- 步骤 03

### 失败处理
- 若 ID 不一致，回到 S3 核对 FLD-014；若无 `callid` 数据进入列表或详情命中失败，留在 S7 修复数据准入与页面逻辑。

---

## 步骤 08：大众通信录音播放与通话文本查看

### 需求来源
- PM 补充：按中科金、一知通话记录详情的交互，生成大众通信录音播放与文本查看功能；录音来自回调，文本来自通话详情。

### 目标
- 大众通信详情抽屉复用现有信息架构，可播放/暂停录音、跳转进度，并将详情 records 转为客户与 AI 客服对话。

### 文件
- `mock/data.js`
- `js/pages/result-records.js`
- `assets/css/app.css`
- `index.html`
- `docs/interaction.html`
- `memory/source-materials.md`
- `memory/field-map.md`
- `memory/business-rules.md`
- `memory/acceptance-map.md`

### 预期变更类型
- update

### 输入
- `memory/source-materials.md`（SRC-005）
- `memory/field-map.md`（FLD-014、FLD-015）
- `memory/business-rules.md`

### 工作
1. 将回调录音链接保存在列表记录 `recordingUrl`，不从详情文本数据推导录音。
2. 通话详情 Mock 使用 `records[].question/answer_content/sequence/notify/question_index`，页面过滤重复 ASR 中间结果并清理 SSML。
3. 详情左侧新增通话录音播放/暂停、进度跳转与通话文本区域，保持一知、中科金原交互可用。
4. 未接通记录的详情仍可打开，录音和文本区分别展示空状态，不展示等待回调。
5. 录音区和通话文本区只保留标题，不展示“回调录音”或“详情接口”来源标签。

### 验收
- 成功通话展示回调录音播放器和 3 条去重对话，不展示 `asrprogress_notify` 片段或 SSML 标签。
- 播放、暂停和进度交互有可观察反馈。
- 无录音/无文本数据精准展示各自空状态，不影响一知和中科金。
- 详情标题栏下方直接展示录音/文本和外呼结果，无顶部获取状态条、无来源标签。

### 验证
- 打开大众通信成功记录，点击播放并检查时间与进度变化；检查文本角色、顺序与去重。
- 打开未接通大众记录检查空状态，打开一知/中科金详情做回归。
- 检查 console 无阻塞错误、静态资源无 404。

### 验证技能
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `browser:control-in-app-browser`
- Support Skill: `superpowers-pm-prototype/skills/verification-before-completion`

### 标注影响
- affected-pages: result-records
- annotation-required: yes

### 依赖
- 步骤 07
