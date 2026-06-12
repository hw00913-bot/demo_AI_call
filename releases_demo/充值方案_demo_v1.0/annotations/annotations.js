window.AnnotationData = {
  "index": [],
  "interaction": [],
  "sys-tenant": [
    {
      id: "1",
      page: "sys-tenant",
      target: "[data-anno='tenant-list']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "租户列表",
      sections: {
        functionName: "租户列表",
        functionDesc: "展示租户基础信息、计费汇总和呼叫控制状态，并提供租户名称筛选及计费配置、充值管理、呼叫控制等管理入口。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "租户基础信息、已生效充值单记录、冻结中的外呼任务、余额调整流水和呼叫控制配置。",
        valueLogic: "资金余额 = 已生效通话充值总额 - 手工扣减金额 - 已消费金额。冻结总额 = 有效冻结任务的冻结分钟数 × 单价快照。可用金额 = max(资金余额 - 冻结总额, 0)。每分钟数按对应模型默认单价换算。大模型和小模型分钟数不可相加。总部类型租户通过数据层配置超大额充值单实现几乎无限可用分钟数，不设特殊代码分支。",
        fieldDesc: "列表展示计费配置入口、大模型可用分钟数、小模型可用分钟数、有效期与呼叫控制状态。",
        interactionDesc: "点击“计费配置”弹窗编辑大模型、小模型默认单价和启停状态；点击“充值管理”打开三Tab抽屉；满足呼叫条件时可启用或停用呼叫。",
        judgeRule: "租户处于有效期内、统一可用金额大于 0 且未被手动停用时，呼叫控制状态显示“可发起”。",
        exceptionRule: "没有已生效坐席费套餐时有效期显示“未生成”或“待生效”；未配置模型默认价时分钟数显示“未配置”；统一可用金额为零时不可发起呼叫。",
        otherDesc: "供应商是未来可选覆盖维度，当前不参与价格配置。冻结任务在任务完成、终止或超过24小时后自动释放。渝兴店演示数据已按可发起逻辑配置，总部租户通过超大额充值单实现分钟数充裕。"
      }
    },
    {
      id: "2",
      page: "sys-tenant",
      target: "[data-anno='tenant-recharge-config']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "充值管理",
      sections: {
        functionName: "充值管理",
        functionDesc: "为租户管理充值单关联、生效、计费明细查看和手工扣减，统一维护租户资金账户。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "充值单记录、历史关联充值单、价格规则、冻结任务和余额调整流水。",
        valueLogic: "关联充值单后为待生效；逐单生效后按计费类型更新有效期、资金余额或两者。资金余额 = 已生效通话充值总额 - 手工扣减金额 - 已消费金额。",
        fieldDesc: "抽屉分为计费明细、充值单管理和余额调整三个 Tab；租户信息区展示租户、有效期、历史充值总额和呼叫控制状态。",
        interactionDesc: "计费明细Tab只读展示模型单价、冻结、余额和可用分钟数。充值单管理Tab提供充值单关联、预览和历史记录。余额调整Tab独立管理手工扣减流水。",
        judgeRule: "只有已支付且未重复关联的充值单可写入历史记录；只有已生效充值单才产生有效期或通话余额。",
        exceptionRule: "未支付、已取消、不存在或查询失败的充值单不写入历史记录；输入为空或充值单号重复时给出提示。",
        otherDesc: "充值单真实性、支付状态及计费信息在正式系统中应由后端接口校验。"
      }
    },
    {
      id: "3",
      page: "sys-tenant",
      target: "[data-anno='tenant-activate-validity']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "手动生效",
      sections: {
        functionName: "手动生效",
        functionDesc: "对已关联的充值单逐条生效，按计费类型更新有效期、余额或两者。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "历史关联充值单、充值金额、套餐信息和租户已有有效期记录。",
        valueLogic: "仅坐席费更新有效期，仅通话费更新余额，组合单同时更新；新有效期在已有有效期之后顺延。",
        fieldDesc: "历史记录逐行展示充值单号、支付状态、生效状态、计费类型、充值金额、有效期和操作。",
        interactionDesc: "待生效记录显示“生效”按钮；点击后刷新租户列表、计费明细和历史记录，按钮变为“已生效”。已生效记录不显示操作按钮。",
        judgeRule: "充值单必须已支付、已经关联且当前尚未生效。",
        exceptionRule: "充值单未支付、记录不存在或已经生效时不允许重复操作。",
        otherDesc: "待生效充值单不参与余额与有效期汇总。"
      }
    },
    {
      id: "4",
      page: "sys-tenant",
      target: "[data-anno='tenant-call-control']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "管理呼叫",
      sections: {
        functionName: "管理呼叫",
        functionDesc: "在租户满足基础呼叫条件时，手动启用或停用该租户的外呼能力。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "租户有效期、可用分钟数和呼叫控制配置。",
        valueLogic: "租户处于有效期内且统一可用金额大于 0 时允许管理呼叫；手动停用后状态为“不可发起”。基础条件通过后，具体导入时还需按本次预计冻结金额做单次校验，不设全局冻结覆盖不足拦截。",
        fieldDesc: "按钮根据状态显示“停用呼叫”“启用呼叫”或“管理呼叫”；列表状态显示“可发起”或“不可发起”。",
        interactionDesc: "点击可用按钮切换呼叫控制状态并刷新列表；不满足基础条件时按钮置灰。",
        judgeRule: "只有有效期有效且统一可用金额大于 0 时，管理呼叫按钮才可操作。",
        exceptionRule: "租户已过期或统一可用金额为零时不能手动开启呼叫。",
        otherDesc: "手动停用状态不会因后续充值自动解除，需要再次手动启用。导入时的冻结金额校验由导入弹窗独立执行。"
      }
    },
    {
      id: "5",
      page: "sys-tenant",
      target: "[data-anno='tenant-pricing-config']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "计费配置",
      sections: {
        functionName: "计费配置",
        functionDesc: "为单个租户配置大模型和小模型的默认通话单价及启停状态。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "租户价格规则。",
        valueLogic: "当前版本只配置模型默认价，供应商字段不参与配置。价格调整不追溯已冻结任务；调价后实时刷新租户列表和计费明细中的分钟数。",
        fieldDesc: "弹窗展示模型类型、通话单价（元/分钟）、启停状态和生效规则说明。",
        interactionDesc: "点击租户列表“计费配置”按钮打开弹窗；修改单价或状态后点击保存配置生效，取消则丢弃更改。",
        judgeRule: "通话单价必须大于 0，否则拒绝保存。",
        exceptionRule: "单价 ≤ 0 时提示错误并聚焦对应输入框。",
        otherDesc: "供应商专属价为未来扩展预留，当前版本不展示、不配置。"
      }
    },
    {
      id: "6",
      page: "sys-tenant",
      target: "[data-anno='tenant-manual-adjustment']",
      position: { placement: "top-right", offsetX: 0, offsetY: 0 },
      title: "手工调整",
      sections: {
        functionName: "手工调整",
        functionDesc: "入口位于充值管理抽屉的“余额调整”Tab，点击Tab后展示手工调整按钮和调整记录表。手工扣减不关联充值单、不区分模型类型、不占用冻结金额。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "余额调整流水。",
        valueLogic: "扣减金额直接从资金余额中扣除，影响公式为：资金余额 = 已生效通话充值总额 - 手工扣减金额 - 已消费金额。扣减后实时刷新所有分钟数视图。",
        fieldDesc: "Tab内包含“+ 手工调整”按钮和调整记录表（序号、调整单号、调整类型、金额、原因、操作人、生效时间）。弹窗展示当前资金余额、金额输入框和原因输入框。",
        interactionDesc: "打开充值管理抽屉后点击“余额调整”Tab，再点击“+ 手工调整”按钮弹出弹窗；输入金额和原因后确认；扣减成功后写入调整流水并刷新页面。",
        judgeRule: "扣减金额必须大于 0，且不能超过当前资金余额。",
        exceptionRule: "金额 ≤ 0 或为空时提示“金额必须大于 0”；超过资金余额时提示上限；原因为空时提示“请输入原因”。",
        otherDesc: "已生效调整流水不可删除或修改。线下退款及其他手工操作统一通过此入口处理。"
      }
    }
  ]
};
