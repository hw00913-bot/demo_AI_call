# 技能库目录

这个目录保存原型循环过程中可直接调用或复制使用的技能包。

它不是单纯的登记目录。orchestrator 在运行 loop 时，可以按阶段从这里选择对应技能包使用。

## 当前技能包

```text
skill-library/
├── superpowers-pm-prototype/ # 已裁剪的 PM 原型循环默认技能包
├── memory-generator/         # S3 项目记忆生成 owner
├── create-prototype-project/ # S4 静态原型项目创建与迁移
├── structure-reader/         # S5 真实项目结构读取 owner
├── project-decomposer/       # S6 基于真实项目结构拆分需求实现步骤
├── prototype-builder/        # S7 原型实现 owner
├── prototype-verifier/       # S7 支持验证、S8 全局验证 owner
├── playwright-cli/           # 浏览器证据采集工具，供 verifier 调用
├── annotation-generator/     # S9 手动标注提示词准备规则
└── annotations/              # 页面标注运行时参考资源，不作为生成模板源
```

## 调用原则

- 先判断当前状态机阶段。
- 再从本目录选择匹配技能包。
- 读取该技能包自己的说明文件或规则文件。
- 只把技能用于它负责的阶段，不跨职责使用。
- 如果某阶段没有匹配技能，先记录缺口，不强行继续。

## 与其他文档的区别

- `skill-library/`：循环运行时可调用的技能包池。
- `docs/loop-overview.md`：整体阶段意图说明。
- 根目录 `SKILL.md`：本项目自身的总控 Skill。
- `orchestrator/`：运行时状态机、门禁、产物规则和预检脚本。
- `docs/design-principles.md`：脚本控制、Agent 生成、技能执行的边界原则。

## 阶段映射

阶段 → 技能的唯一权威是 `orchestrator/workflow.yaml` 的 `primary_worker`，由 `orchestrator/scripts/check_workflow_sync.py` 校验各技能 `适用阶段` 与之一致。本文件不复述该映射，避免并行漂移。

能力选择由总控根据阶段运行时完成，不再作为独立 S 阶段。

## 标注模板源

生成项目时，标注运行时和 `.clauderules` 的唯一模板源是：

- `create-prototype-project/assets/annotation-kit/`
- `create-prototype-project/assets/templates/annotations/annotations.js`

`skill-library/annotations/` 只保留参考运行时文件，不再维护另一套正式规则，避免与模板源漂移。

## 后续维护

新增技能包时，应同时更新：

- 本文件的“当前技能包”
- `orchestrator/workflow.yaml` 的 `primary_worker`
- 必要时新增或更新 `orchestrator/agent-contracts/`
- `orchestrator/scripts/check_workflow_sync.py` 覆盖的运行包同步检查
