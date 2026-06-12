window.AnnotationData = {
  "index": [],
  "interaction": [],
  "sys-tenant": [
    {
      id: "1",
      page: "sys-tenant",
      target: "[data-anno='tenant-list']",
      position: {
        placement: "top-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "租户列表",
      sections: {
        functionName: "租户列表",
        functionDesc: "展示租户基础信息、计费汇总和呼叫控制状态，并提供租户名称筛选及相关管理入口。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "租户基础信息、已支付充值单记录、冻结中的外呼任务和呼叫控制配置。",
        valueLogic: "充值金额进入统一资金账户；扣除实际消费和冻结金额后得到可用金额，再按大模型、小模型默认单价换算可用分钟数。",
        fieldDesc: "列表展示计费配置入口、大模型和小模型可用分钟数、有效期与呼叫控制状态。",
        interactionDesc: "点击“计费配置”维护大模型、小模型默认单价和状态；点击“充值管理”打开充值抽屉；满足管理条件时可启用或停用呼叫。",
        judgeRule: "租户处于有效期内、统一可用金额大于 0 且未被手动停用时，呼叫控制状态显示“可发起”。",
        exceptionRule: "没有已生效坐席费套餐时有效期显示“未生成”或“待生效”；未配置模型默认价时分钟数显示“未配置”；统一可用金额为零时不可发起呼叫。",
        otherDesc: "供应商是未来可选覆盖维度，当前不参与价格配置；大、小模型分钟数不能相加。"
      }
    },
    {
      id: "2",
      page: "sys-tenant",
      target: "[data-anno='tenant-recharge-config']",
      position: {
        placement: "top-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "充值管理",
      sections: {
        functionName: "充值管理",
        functionDesc: "为当前租户关联不区分模型类型的充值金额，并更新统一资金账户。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "充值单记录和当前租户已有的充值关联记录。",
        valueLogic: "充值单关联后为待生效；生效后根据计费类型更新有效期、统一资金余额或两者，再按租户的大、小模型默认单价换算分钟数。",
        fieldDesc: "抽屉分为计费明细和充值单管理两个 Tab；历史记录展示支付状态、生效状态、有效期和逐单生效操作。",
        interactionDesc: "输入充值单号并提交后写入待生效记录；在对应历史记录点击“生效”后更新账户，已生效记录不可重复操作。",
        judgeRule: "只有已支付且未重复关联的充值单可写入历史记录；只有已生效充值单才产生有效期或通话余额。",
        exceptionRule: "未支付、已取消、不存在或查询失败的充值单不写入历史关联记录，也不产生有效期和通话余额；输入为空或充值单号重复时给出提示。",
        otherDesc: "充值单真实性、支付状态及计费信息在正式系统中应由后端接口校验。"
      }
    },
    {
      id: "3",
      page: "sys-tenant",
      target: "[data-anno='tenant-activate-validity']",
      position: {
        placement: "top-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "手动生效",
      sections: {
        functionName: "手动生效",
        functionDesc: "对指定的已关联充值单逐条生效，并按计费类型更新有效期、余额或两者。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "历史关联充值单、充值金额、套餐信息和租户已有有效期记录。",
        valueLogic: "仅坐席费更新有效期，仅通话费更新余额，组合单同时更新；新有效期在已有有效期之后顺延。",
        fieldDesc: "历史记录逐行展示生效状态、有效期和生效操作。",
        interactionDesc: "待生效记录显示“生效”按钮；点击后刷新租户列表、计费明细和历史记录，按钮变为已生效。",
        judgeRule: "充值单必须已支付、已经关联且当前尚未生效。",
        exceptionRule: "充值单未支付、记录不存在或已经生效时不允许重复操作。",
        otherDesc: "待生效充值单不参与余额与有效期汇总。"
      }
    },
    {
      id: "4",
      page: "sys-tenant",
      target: "[data-anno='tenant-call-control']",
      position: {
        placement: "top-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "管理呼叫",
      sections: {
        functionName: "管理呼叫",
        functionDesc: "在租户满足基础呼叫条件时，手动启用或停用该租户的外呼能力。",
        permissionScope: "产品超管可操作；其他角色权限待确认。",
        dataSource: "租户有效期、可用分钟数和呼叫控制配置。",
        valueLogic: "租户处于有效期内且统一可用金额大于 0 时允许管理呼叫；手动停用后状态为“不可发起”。",
        fieldDesc: "按钮根据状态显示“停用呼叫”“启用呼叫”或“管理呼叫”；列表状态显示“可发起”或“不可发起”。",
        interactionDesc: "点击可用按钮切换呼叫控制状态并刷新列表；不满足基础条件时按钮置灰。",
        judgeRule: "只有有效期有效且统一可用金额大于 0 时，管理呼叫按钮才可操作。",
        exceptionRule: "租户已过期或统一可用金额为零时不能手动开启呼叫。",
        otherDesc: "手动停用状态不会因后续充值自动解除，需要再次手动启用。"
      }
    }
  ]
};
