# Superpowers PM Prototype

这是为 PM 原型循环裁剪后的轻量版能力包。

它只服务于“产品经理需求到演示原型”的循环，不接管完整软件工程流程。

## 保留能力

```text
skills/
├── brainstorming/                  # 需求澄清
├── verification-before-completion/ # 交付前验证门禁
└── systematic-debugging/           # 失败根因定位
references/
└── writing-plans.md                # 历史拆分思想，仅供参考
```

## 默认不包含

以下能力不进入本裁剪包：

- `using-superpowers`
- `test-driven-development`
- `using-git-worktrees`
- `finishing-a-development-branch`
- `requesting-code-review`
- `receiving-code-review`
- `executing-plans`
- `subagent-driven-development`
- `dispatching-parallel-agents`
- `writing-skills`

## 调用原则

- 先遵循 `prototype-loop-orchestrator` 的状态机和门禁。
- 当前阶段需要时，再调用本包中的对应技能。
- 本包输出必须落到本项目标准 `docs/` 和 `memory/` 文件。
- 如果本包规则和 orchestrator 规则冲突，以 orchestrator 规则为准。
