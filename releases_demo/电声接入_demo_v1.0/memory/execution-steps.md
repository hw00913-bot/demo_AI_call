# 执行步骤

> 每个步骤都必须小到可以独立实现、验证和修复。不要把不确定需求写成已确认任务。

---

## Step 01: 基础路由与菜单树更新

### Goal
更新导航配置文件以适应电声原型的子模块跳转，准备基础页面切换骨架。

### Files
- `config/nav.json`

### Expected Change
- update

### Inputs
- `memory/project.md`
- `memory/project-structure.md`

### Work
- 修改导航配置文件，确认菜单树包含：系统管理-业务场景、外呼场景-外呼列表、统计分析-通话统计、外呼结果-通话记录、外呼结果-线索记录。

### Acceptance
- 启动本地服务，通过 HTTP 协议打开 `index.html` 页面。
- 导航菜单能够正常显示并且各项均可点击切换，无 404 资源错误。

### Verification
- 检查控制台报错和网络请求资源加载状态。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: index
- annotation-required: no

### Dependencies
- None

### Failure Handling
- 若加载失败，检查 `nav.json` 语法错误。

---

## Step 02: 电声对接核心 Mock 数据架构搭建

### Goal
重构全站 Mock 数据源，为电声场景提供符合 D01、D08、D05、D02、D06 协议的模拟业务数据集。

### Files
- `mock/data.js`

### Expected Change
- update

### Inputs
- `memory/business-rules.md`
- `memory/field-map.md` (FLD-001 ~ FLD-023)

### Work
- 删除中科金底座原有的 Mock 定义。
- 定义电声任务/任务列表（含提交后生成的 `strategyCode` / `strategyId`、任务名称、模型类型、账号、机器人编码、呼叫时段、重试配置、黑名单校验等字段）。
- 初始化导入批次模拟对象。
- 定义含有电声子接听状态码（`301`、`302`、`303`、`205`、`206`）、意向状态码（`intentionStatus`, `intentionRank`）、加微状态（`wechatStatus`）的客户模拟数据集；重拨由执行明细 `attemptCount` 派生。
- 转人工本期不实现；任务请求中的 `humanTransfer.enabled` 固定为 `false`。

### Acceptance
- JS 语法正确，没有报未声明变量或未关闭大括号错误。
- 数据集中的键名（如 `answerMainStatus`、`answerStatus`）与 [field-map.md](file:///Users/huhaowen/Documents/33-智能外呼/demo_AI_call/releases_demo/电声接入_demo_v1.0/memory/field-map.md) 完美匹配。

### Verification
- 运行语法校验命令：
  ```bash
  node --check mock/data.js
  ```

### Verification Skill
- Verification Skill: `prototype-verifier`

### Annotation Impact
- affected-pages: None
- annotation-required: no

### Dependencies
- Step 01

### Failure Handling
- 解决一切语法报错，确保字段不出现单词拼写错误。

---

## Step 03: 业务场景新建页面电声逻辑适配

### Goal
在业务场景页面中新增平台“电声”，屏蔽外呼通道、加微配置、线路类型、签名参数和手工任务 id，改为配置呼叫任务配置并在提交时生成电声外呼任务。

### Files
- `js/pages/sys-scene.js`

### Expected Change
- update

### Inputs
- `memory/project-startup-plan.md`
- `memory/field-map.md` (FLD-016 ~ FLD-023)

### Work
- 在智能平台下拉菜单中新增“电声”选项。
- 监听平台选择，当平台为“电声”时，展示呼叫任务配置字段：场景类型匹配机器人、呼叫时段、单条自动重呼配置、黑名单校验、自动启动；机器人只读展示，优先级不展示，规则拦截需按待确认项处理。
- 重呼规则表格支持添加/删除多条策略，每条规则可选择首次呼叫状态、重拨次数、重拨间隔和启用状态。
- 电声场景不展示任务 id 输入框；按 20260707 新版接口，提交时应模拟 `/strategy/policy/create` 生成 `strategyCode`。
- 提交新建表单时，把业务场景、外呼列表卡片、生成任务编码和呼叫任务配置同步追加到 `SceneRows`、`MockSceneList` 和 `MockZkjTaskDetail`。

### Acceptance
- 点击“新建业务场景”打开抽屉，平台选择“电声”后，外呼通道、加微配置、线路类型、签名参数和任务 id 输入框均不出现。
- 成功显示呼叫任务配置字段组，机器人由场景类型自动匹配，呼叫星期为必填；不存在机器人选择控件。
- 点击「确定并生成任务」后，外呼列表中能动态出现新生成的电声卡片，任务详情中存在 `strategyCode` 和呼叫任务配置，无报错。

### Verification
- 浏览器中测试新建，检查新任务卡片在列表页的呈现，控制台无报错。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: sys-scene
- annotation-required: yes

### Dependencies
- Step 02

### Failure Handling
- 若弹窗切换联动失效，检查选择器事件绑定，若保存不成功，调试 `MockSceneList.push` 的数据结构。

---

## Step 04: 外呼详情三页签与五栏名单功能实现

### Goal
实现电声列表卡片的查看详情，滑出包含“数据概览”、“呼叫名单”和“任务详情”的三 Tab 页，支持终止外呼和已过滤分类。

### Files
- `js/pages/scene-list.js`

### Expected Change
- update

### Inputs
- `memory/business-rules.md`
- `memory/field-map.md` (FLD-001 ~ FLD-015)

### Work
- 改造任务卡片的“查看”点击事件，滑出详情抽屉。
- **数据概览 Tab**：聚合读取 Mock 数据展示：导入/外呼/过滤/接听客户数量；意向分类展示 ABCD 客户统计。
- **呼叫名单 Tab**：切分为五栏。已过滤栏依据线索结果 `BLOCKED` 统一显示“过滤/拉黑”，不展示电声未返回的细分过滤原因。
- **终止外呼动作**：在“待呼叫”名单列表中，提供多选框及“终止外呼”按钮，点击后弹出二次确认提示“确认终止后，后续将停止该线索的外呼任务”，点击确定后将该数据状态置为已终止并从列表移除。
- **任务详情 Tab**：渲染当前电声任务卡片的各参数（任务编码、平台、模型类型、账号、机器人、呼叫时段、重拨策略等）。

### Acceptance
- 点击任务卡片“查看”能顺利滑出详情页。
- 切换“数据概览”、“呼叫名单”、“任务详情”三个 Tab 没有样式和脚本问题。
- 已过滤名单中，每一条记录均准确展示过滤理由。
- 终止外呼弹出提示并正常执行状态扭转。

### Verification
- 浏览器进行页签切换，运行终止外呼交互并核对已过滤字段。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: scene-list
- annotation-required: yes

### Dependencies
- Step 03

### Failure Handling
- 调试动态生成的列表 DOM 点击绑定，确保事件没有丢失。

---

## Step 05: 通话记录字段强化与通话详情展示

### Goal
在通话记录列表中展示电声通话核查字段，并在详情中展现录音、转写文本和小结信息。

### Files
- `js/pages/result-records.js`

### Expected Change
- update

### Inputs
- `memory/business-rules.md`
- `memory/field-map.md` (FLD-008, FLD-011, FLD-012, FLD-014)

### Work
- 在通话记录列表中展示客户号码、通话时间、时长、场景、通话状态、外呼总结、智能平台、最后节点和操作。
- 列表不展示“线路类型”和“加微状态”，避免与当前电声核查口径无关的信息干扰。
- 点击“详情”打开通话记录详情弹窗，展示通话文本、录音、小结和详细数据。

### Acceptance
- 列表字段符合当前电声核查口径，不出现“线路类型”和“加微状态”列。
- 点击通话详情后能直接看到机器人会话记录和外呼小结。

### Verification
- 浏览器验证通话详情抽屉展现，控制台无报错。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: result-records
- annotation-required: yes

### Dependencies
- Step 04

### Failure Handling
- 若详情未出现，核实 Mock 话单对象与详情弹窗选择器绑定。

---

## Step 06: 线索回访明细与重拨派生状态

### Goal
在线索记录中展示电声线索和重拨标识，并在明细弹窗中按执行明细的已拨打次数展示重拨状态。

### Files
- `js/pages/result-clue.js`

### Expected Change
- update

### Inputs
- `memory/field-map.md` (FLD-005, FLD-014)

### Work
- 在线索记录聚合列表中增加“门店编码 dlrCode”列展示。
- 点击“详情”弹出“回访明细”弹窗。回访明细列表包含：序号、回访轮次、用户号码、回访小结、客户详细标签、意向级别、通话状态、通话时长、是否重拨。
- 其中“是否重拨”列根据 `attemptCount > 1` 渲染为“是”，否则为“否”；未取得执行明细时展示“-”。
- 点击明细里的详情，同样滑出通话详情抽屉，查阅话单和意向结果。

### Acceptance
- 线索列表成功加载门店编码。
- 弹出回访明细弹窗，且表格里的“是否重拨”与 `attemptCount` 一致。
- 点击明细详情能无缝联动拉起通话记录详情抽屉。

### Verification
- 检查回访明细弹窗和嵌套的通话详情抽屉，确认 console 无报错，资源引用正常。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: result-clue
- annotation-required: yes

### Dependencies
- Step 05

### Failure Handling
- 确保嵌套的弹窗和抽屉事件不会引发 DOM 层级穿透或重叠样式问题。

---

## Step 07: 数据统计分析页面电声任务统计适配

### Goal
更新通话统计页面，支持按电声场景和任务维度统计并聚合成数据报表展示。

### Files
- `js/pages/report-call.js`

### Expected Change
- update

### Inputs
- `memory/business-rules.md`
- `memory/field-map.md` (FLD-001, FLD-006 ~ FLD-010)

### Work
- 改造通话统计页面的外呼统计和客户统计列表。
- 支持按照场景名称（“电声”场景）进行筛选。
- 在页面中聚合展示拨打次数、名单数、接通数、接通率、触达率和通话时长。
- 确认总接听率（接听客户数 / 外呼数）、平均通话时长（实际通话秒数 / 呼叫数）能正常输出。

### Acceptance
- 切换到通话统计页面，按电声任务筛选时，数据和表格被正常渲染。
- 图表中可以展现电声任务的通话时长和呼叫比例统计。

### Verification
- 浏览器筛选核对报表数值，控制台无报错。

### Verification Skill
- Verification Skill: `prototype-verifier`
- Browser Evidence Tool: `playwright-cli when needed`

### Annotation Impact
- affected-pages: report-call
- annotation-required: yes

### Dependencies
- Step 06

### Failure Handling
- 若统计数据为 0，核对 Mock 中通话记录、过滤记录与生成任务编码 `strategyCode` 及执行批次 `executeBatchId` 的对应关系。
