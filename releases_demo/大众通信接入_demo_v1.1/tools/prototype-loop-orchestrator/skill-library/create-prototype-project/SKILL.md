---
name: create-prototype-project
description: 创建、迁移或确认静态原型项目结构。Use from the loop source repo to bootstrap/migrate a project with scripts/create_project.py; when this skill is copied into a generated project runtime package, use it only at S4 to confirm the already-created standard structure and hand back to the orchestrator.
---

# 创建/确认原型项目结构

本技能有两个运行上下文，必须先判断当前上下文再行动。

## 适用阶段

- S4 项目初始化

## 上下文判定

### A. loop 源仓库上下文

如果当前工作目录是 `prototype-loop-orchestrator` 源仓库，且存在 `skill-library/create-prototype-project/scripts/create_project.py`，本技能可以用于创建、迁移、底座裁剪或工具回灌。

### B. 生成项目 runtime 上下文

如果本技能位于业务项目的 `tools/prototype-loop-orchestrator/skill-library/create-prototype-project/SKILL.md`，或当前工作目录已经是带有 `config/workflow.json` 的生成项目，本技能在 S4 **只做结构确认**：

- 不运行 `scripts/create_project.py`。
- 不尝试创建、迁移或裁剪底座。
- 不要求项目内存在 create-project 的 templates、annotation-kit 或 scripts 目录。
- 只检查标准结构和 S0-S3 产物是否已经就绪，然后把结果反馈给总控。

生成项目里的 runtime package 只提供阶段规则和调度上下文，不携带完整创建工具链。创建、迁移、底座裁剪、`--sync-runtime` 和 `--sync-tools` 必须回到当前安装的 loop 技能或源仓库执行。

## S4 runtime 工作流程

在生成项目内进入 S4 时，只做以下动作：

1. 确认项目根目录存在 `config/workflow.json`，且 workflow 仍按 S0 起步顺序推进。
2. 确认标准结构存在：`.clauderules`、`index.html`、`CLAUDE.md`、`assets/`、`js/`、`mock/`、`docs/`、`flowcharts/`、`memory/`、`config/`、`annotations/`、`tools/loop_run.py`、`tools/loop_preflight.py`。
3. 确认 S1-S3 已产出并注入：`memory/project-startup-plan.md`、项目级 `CLAUDE.md`、`memory/project.md`、`memory/business-rules.md`、`memory/source-materials.md`、`memory/field-map.md`、`memory/open-items.md`。
4. 运行或提示总控运行 `python3 tools/loop_run.py check . --preflight-stage s4`。
5. 把“S4 结构已就绪、S3 记忆已注入”反馈给总控。

本技能到此为止：不运行任何 `loop_run.py complete`、不驱动 S0-S3 计划、不读 S5 结构、不进 S6。阶段推进由总控统一执行。

## 源仓库创建/迁移用法

以下命令只在 loop 源仓库上下文执行，不在生成项目 runtime package 内执行。

1. 将目标文件夹解析为绝对路径。
2. 在写入前检查该文件夹。
3. 如果是**空文件夹或不存在的文件夹**，运行：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/target/path" --name "项目名称"
   ```

   如果 S1-S3 已经生成启动规划、项目记忆或计划草稿，先放入一个种子目录，并使用：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/target/path" --name "项目名称" --seed-dir "/absolute/seed/path"
   ```

4. 对于**非空文件夹**：
   - 检查它是否是现有的原型项目。
   - 生成迁移计划：`python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --migrate`
   - 审查文件移动、冲突、入口页面以及受影响的引用。
   - 只有在确保计划安全后才应用执行：`python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --migrate --apply`
   - 仅在不进行重构、只添加缺失的框架文件时使用 `--merge`。
5. 如果是**基于底座迭代的新项目**，不要直接把底座目录整包复制后开始实现。必须二选一：
   - 让脚本复制并裁剪底座：

     ```bash
     python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/new/path" --name "项目名称" --from-base "/absolute/base/project"
     ```

   - 如果底座已经被手工复制到目标目录，先运行迁移计划，再应用并重置迭代状态：

     ```bash
     python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/new/path" --name "项目名称" --migrate
     python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/new/path" --name "项目名称" --migrate --apply --reset-iteration-state
     ```

6. 已生成项目开始继续迭代前，统一运行：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --sync-runtime
   ```

   该命令同时刷新 `tools/` 脚本、项目内可读阶段技能和三个交付分页壳；保留业务文件、memory、annotations、`docs/interaction.html` 正文和已有 ProcessOn 链接。总控必须在读取项目内 `status` / `dispatch` 前执行，避免旧项目继续使用过期 S9 规则或 final 门禁。

7. 如果只需要把最新版总控脚本和可读阶段技能回灌到已生成项目，运行：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --sync-tools
   ```

   该命令只覆盖 `tools/loop_run.py` 和 `tools/loop_preflight.py`，不修改业务文件、memory 或 annotations。
8. 如果旧项目同步新脚本后因缺少 `currentIteration.pmApprovedAt` 或 `currentIteration.startupPlanFrozenAt` 被 S4+ 门禁阻塞，先用已有 S2 证据显式回填工作流元数据：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --sync-workflow-metadata
   ```

   该命令只读取 `config/workflow.json`、`memory/stage-log.md` 和冻结记录，不伪造 PM 确认；缺少 S2 证据时会失败并要求人工处理。
9. 旧项目只需要补入或刷新流程图集时运行：

   ```bash
   python3 skill-library/create-prototype-project/scripts/create_project.py "/absolute/project/path" --sync-flowcharts
   ```

   该命令刷新 `flowcharts/index.html`，保留已有 `flowcharts/processon-links.txt`，并尝试升级标准导航；自定义导航不会被强制覆盖。
10. 新生成项目的 `config/workflow.json` 初始保持 `stage: "s0"`；不要因为本地已有缓存或生成脚本已创建文件，就让 workflow 跳过起始阶段。

## 迁移行为 (Migration Behavior)
迁移模式可识别这些保守的旧输入路径，并移动到当前目标结构：
style.css                              -> assets/css/app.css
data/mock.js                           -> mock/data.js
data/annotations.js                    -> annotations/annotations.js
annotations-tool/annotation-runtime.js -> annotations/annotation-runtime.js
annotations-tool/annotation.css        -> annotations/annotation.css
interaction.html                       -> docs/interaction.html
fix_report_clue.py                     -> tools/fix_report_clue.py

它会重新计算每个 HTML 文件中受影响的 src 和 href 值，创建缺失 advisory 的文档和记忆文件，并验证本地引用和 JavaScript 语法。旧路径只作为迁移输入识别，不代表新项目应继续使用的目标结构；它不会移动未识别的文件。

## 底座迭代裁剪规则 (Iteration Base Reset)

基于底座迭代时，底座只能提供业务页面、样式、组件、mock 基础形态和可复用交互。以下内容不得从底座继承到新项目：

- `.git/`、`.workbuddy/`、`.DS_Store`、`node_modules/`、`playwright-report/`、`test-results/`、`__pycache__/`。
- 旧项目的 `CLAUDE.md` 和 `.clauderules`。
- 旧项目的 `annotations/annotations.js` 标注数据。
- 旧项目的 `config/project.json` 和 `config/workflow.json`。
- 旧项目的 `memory/` 运行记忆、阶段日志、验证日志、任务计划、字段映射、来源记录和标注提示词。
- 旧项目的 `flowcharts/processon-links.txt`；流程图链接属于当前项目，不能从底座继承。

`--from-base` 会在复制时排除本地状态，并把上述 loop-owned 文件重置为当前模板。`--reset-iteration-state` 用于已经复制好的底座目录，会覆盖这些状态文件。业务配置如 `config/nav.json` 可保留，因为它通常描述底座页面结构；若 S1 明确要求重置页面结构，再由 S6/S7 按新范围修改。

重置后必须在 S1 的 `memory/project-startup-plan.md` 中明确记录：

- 底座项目路径。
- 底座保留内容。
- 底座重置为空内容。
- 底座禁止修改内容。

生成的项目结构 (Generated Structure)
project/
├── index.html
├── CLAUDE.md
├── .clauderules
├── assets/css/
│   ├── global.css                  # 全局B端设计规范与通用组件样式
│   └── app.css                     # 应用基础样式
├── js/app.js
├── js/common.js
├── js/delivery-nav.js              # 原型/说明文档/流程图集统一内部切换
├── js/nav.js                       # 配合 memory 动态渲染主导航与路由树
├── js/components/                 # 可复用的B端公共组件（如高级搜索、弹窗、分页器）
├── js/pages/                       # 具体的业务页面逻辑（如仪表盘、线索列表）
├── mock/data.js                    # 全站 B 端模拟数据集与状态机
├── docs/
│   ├── index.html                  # 说明文档展示入口
│   ├── interaction.html            # 交互、状态、验收和限制说明
│   └── decisions.md
├── flowcharts/
│   ├── index.html                  # 左侧目录、右侧 ProcessOn 嵌入展示页
│   └── processon-links.txt         # PM 手工维护的 ProcessOn 链接清单
├── memory/project-startup-plan.md  # S1 启动规划快照，S2 后冻结为只读溯源
├── memory/project.md               # S3 后的当前项目事实
├── memory/business-rules.md        # 业务领域知识、潜规则与核心概念定义
├── memory/source-materials.md      # 输入资料、外部文档、截图和口述内容的 SRC 编号记录
├── memory/field-map.md             # API/参考项目字段级事实的 FLD 编号记录
├── memory/task-plan.md             # 总控工作流的人类可读任务计划
├── memory/execution-steps.md       # 可执行步骤清单，供 builder/verifier 逐步 loop
├── memory/acceptance-map.md        # 需求、验收标准与验证方式映射
├── memory/verification-log.md      # 每步与全局验证记录
├── memory/loop-status.md           # PM 友好状态报告，由 loop_run.py 自动生成
├── memory/stage-log.md             # S0-S9 阶段完成记录和门禁结果
├── memory/circuit-state.json       # 熔断计数与连续失败状态
├── memory/annotation-prompt.md     # S9 手动标注提示词
├── memory/annotation-coverage.md   # 标注提示词覆盖验收、来源和字段的追溯清单
├── memory/change-log.md
├── memory/open-items.md
├── config/nav.json                 # 页面导航配置
├── config/workflow.json            # 总控工作流状态、入口与验证门禁配置
├── config/project.json             # 稳定 projectId 与创建信息
├── annotations/annotation-runtime.js
├── annotations/annotation.css
├── annotations/annotations.js
└── tools/
    ├── loop_run.py                 # 确定性阶段推进和状态写入脚本
    └── loop_preflight.py           # 确定性阶段门禁预检脚本

安全规则 (Safety Rules)
• 严禁从其他项目复制业务数据、需求、标注、名称、ID 或 Mock 记录。
• 使用空数据对象初始化 annotations/annotations.js。
• 基于底座迭代时，必须通过 `--from-base` 或 `--migrate --apply --reset-iteration-state` 裁剪底座；不得直接继承旧项目的 `.git/`、`.clauderules`、`CLAUDE.md`、`annotations/annotations.js`、`config/workflow.json`、`config/project.json` 或 `memory/`。
• 为每个项目生成一个唯一的标注 projectId。
• 除非用户明确要求替换，否则严禁覆盖现有文件。
• 当目标路径已存在时停止迁移；不要自动合并文件内容。
• 在使用 --apply 真正执行前，必须先在计划模式下运行迁移。
• 除非明确要求，否则不要引入任何前端框架、包管理器（npm等）或构建工具（Vite等）。
• 保持 index.html 作为此静态项目模板的默认入口。
• 原型必须在当前页面内切换“原型页面 / 说明文档 / 流程图集”：统一导航通过 iframe 加载非当前视图，并用 `#delivery=` 保存选中状态，不得把三个入口退化为整页跳转。业务侧栏可以自定义，但不得删除 `js/delivery-nav.js`。
• `flowcharts/processon-links.txt` 只保存当前项目的 ProcessOn 链接。支持“分类 | 名称 | URL”“名称 | URL”或单独 URL；展示页自动读取，Agent 不推导或修改外部流程图内容。
• 将不确定的需求记录在 memory/open-items.md 中；切勿将其视为已确认的内容。
• 严格将数据与逻辑分离：所有大型 B 端数据集和 Mock 表格必须存放在 mock/data.js 中。严禁在 js/pages/ 内部硬编码原始数据表。
• 强制对 Agent 配置进行架构分离：确保 CLAUDE.md 严格限定于本地开发/校验命令（如运行、测试等），而 .clauderules 则专门用于页面标注系统的安装、维护和运行时规则。
• 允许用户为 Claude Code 可见性把 `prototype-loop-orchestrator` 放入 `tools/prototype-loop-orchestrator/`；该目录必须被视为项目内总控工具包，不属于业务原型交付物，不参与实现步骤、验证对账、标注覆盖和交付统计。除非用户明确要求维护 loop，不应修改该目录。
• 阶段完成必须通过 `tools/loop_run.py complete ...` 写入 `config/workflow.json` 和 `memory/stage-log.md`，不要由 Agent 手写 pass。
• 静态原型交付目录不得保留 `node_modules/`、`package.json`、`package-lock.json`、`playwright-report/` 或 `test-results/`，除非 `config/project.json` 显式声明 `allowDependencies: true`。
模板资源 (Template Resources)
脚本会从 `assets/annotation-kit/` 复制可复用的标注运行时和 `.clauderules`。这是生成项目的唯一标注模板源；不要从 `skill-library/annotations/` 复制生成项目。不要为单个生成的项目去编辑这些原始资源；如果需要修改，请编辑已生成项目中的副本。

`tools/loop_run.py` 和 `tools/loop_preflight.py` 的主源是根目录 `orchestrator/scripts/`。`skill-library/create-prototype-project/scripts/` 保留与主源**字节一致的完整副本**（不是包装），由 `create_project.py` 拷入生成项目的 `tools/`；它是生成项目用的模板源，所以改了主源必须同步这份副本（`check_workflow_sync.py` 不涉及，只在 `orchestrator/scripts/`）。
