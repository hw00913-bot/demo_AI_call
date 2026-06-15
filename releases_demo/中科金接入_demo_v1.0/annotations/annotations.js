window.AnnotationData = {
  index: [],
  interaction: [],
  "sys-tenant": [],
  "sys-scene": [
    {
      id: "1",
      page: "sys-scene",
      target: "[data-anno='sys-scene-add-btn']",
      position: {
        placement: "top-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "新增业务场景",
      sections: {
        functionName: "新增业务场景",
        functionDesc: "创建使用智能外呼任务的业务场景，通过分配外呼平台的通话机器人和通话通道完成创建。",
        permissionScope: "仅超级管理员、租户管理员可见和操作。租户运营不可见。",
        dataSource: "中台本地维护，创建后获得场景编码和场景id。中科金平台通过「创建外呼任务」接口获得 taskCode，回填到中科金任务id。",
        valueLogic: "场景名称、场景编码、可用租户为必填。智能平台选择后展示对应平台面板。中科金任务id 来自中科金 API 返回的 taskCode。",
        fieldDesc: "场景名称（最长20字）、场景编码（字母/数字/符号）、场景描述、可用租户（多选）、智能平台（四选一）、场景类型（首访/服务/回访/新线索/冷线索）、数据导入方式、平台面板字段、业务信息（传入/提取字段）。",
        interactionDesc: "点击「新增业务场景」打开右侧抽屉表单。选择智能平台后展示对应面板。中科金面板包含任务id输入和模型类型选择。填写完成后点击「确定」提交。",
        judgeRule: "进行中的场景不可删除。",
        exceptionRule: "平台切换时清空已有平台面板的已填数据。",
        otherDesc: "当前原型映射：MockSceneRows。中科金任务id 对应 API OpenCallTaskResponse.taskCode。"
      },
      desc: "1. 功能名称：新增业务场景<br>2. 功能说明：创建使用智能外呼任务的业务场景，通过分配外呼平台的通话机器人和通话通道完成创建。<br>3. 权限范围：仅超级管理员、租户管理员可见和操作。租户运营不可见。<br>4. 数据来源：中台本地维护。中科金平台通过 API 获得 taskCode 回填。<br>5. 取值逻辑：场景名称、场景编码、可用租户为必填。<br>6. 字段说明：场景名称、场景编码、场景描述、可用租户、智能平台、场景类型、数据导入方式、平台面板字段、业务信息。<br>7. 交互说明：点击「新增业务场景」打开右侧抽屉表单。选择平台后展示对应面板。<br>8. 判断规则：进行中的场景不可删除。<br>9. 异常规则：平台切换时清空已有面板数据。<br>10. 其他说明：中科金任务id 对应 API taskCode。"
    },
    {
      id: "2",
      page: "sys-scene",
      target: "[data-anno='sys-scene-zkj-taskid']",
      position: {
        placement: "bottom-right",
        offsetX: 482,
        offsetY: 12
      },
      title: "新建业务场景",
      sections: {
        functionName: "新建业务场景弹窗",
        functionDesc: "关联中科金智能平台的外呼任务编码。该值来自中科金「创建外呼任务」API 返回的 taskCode（32位任务编码）。",
        permissionScope: "超级管理员或租户管理员",
        dataSource: "中科金 API POST /outbound/openapi/v2/task/create 返回的 taskCode。",
        valueLogic: "用户在中科金后台创建外呼任务后，将返回的 taskCode 粘贴到此处。创建任务时需指定 robotId、robotName、outboundNo 等参数。",
        fieldDesc: "1.场景名称：本地定义字段，输入见图；\n2.场景编码：本地定义字段，输入见图；\n3.场景描述：本地定义字段，输入  见图；\n4.可用租户：如果是租户账号默认选中且仅显示租户名称；\n5.智能平台：选中后显示对应平台的输入内容；\n6.场景类型：本地字段 ，单选；\n7.数据导入方式：本地字段，单选；\n8.大小模型选择：本地字段，单选；\n9.选择账号：本地字段，如果选中中科金，显示默认值不可修改，反显实际账号名称\n 10.业务信息：场景传入信息（必填），传入第三方扩展字段或变量，用于模型外呼，场景提取信息（非必填）用于匹配百炼智能体返回的 json，选中中科金默认在场景传入信息生成一个 name 的必填字段，如果提交到中科金接口，空值时默认填入「尊敬的客户」",
        interactionDesc: "文本输入框，用户手动粘贴中科金任务id。",
        judgeRule: "是否校验 taskCode 格式和有效性。",
        exceptionRule: "taskCode 无效时的处理逻辑，提示任务编码无效，请检查是否提供正确的任务编码。",
        otherDesc: ""
      },
      desc: "1. 功能名称：新建业务场景弹窗<br>2. 功能说明：关联中科金智能平台的外呼任务编码。该值来自中科金「创建外呼任务」API 返回的 taskCode（32位任务编码）。<br>3. 权限范围：超级管理员或租户管理员<br>4. 数据来源：中科金 API POST /outbound/openapi/v2/task/create 返回的 taskCode。<br>5. 取值逻辑：用户在中科金后台创建外呼任务后，将返回的 taskCode 粘贴到此处。创建任务时需指定 robotId、robotName、outboundNo 等参数。<br>6. 字段说明：1.场景名称：本地定义字段，输入见图；\n2.场景编码：本地定义字段，输入见图；\n3.场景描述：本地定义字段，输入  见图；\n4.可用租户：如果是租户账号默认选中且仅显示租户名称；\n5.智能平台：选中后显示对应平台的输入内容；\n6.场景类型：本地字段 ，单选；\n7.数据导入方式：本地字段，单选；\n8.大小模型选择：本地字段，单选；\n9.选择账号：本地字段，如果选中中科金，显示默认值不可修改，反显实际账号名称\n 10.业务信息：场景传入信息（必填），传入第三方扩展字段或变量，用于模型外呼，场景提取信息（非必填）用于匹配百炼智能体返回的 json，选中中科金默认在场景传入信息生成一个 name 的必填字段，如果提交到中科金接口，空值时默认填入「尊敬的客户」<br>7. 交互说明：文本输入框，用户手动粘贴中科金任务id。<br>8. 判断规则：是否校验 taskCode 格式和有效性。<br>9. 异常规则：taskCode 无效时的处理逻辑，提示任务编码无效，请检查是否提供正确的任务编码。<br>10. 其他说明：待确认"
    },
    {
      id: "3",
      page: "sys-scene",
      target: "[data-anno='sys-scene-submit-btn']",
      position: {
        placement: "top-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "确定按钮",
      sections: {
        functionName: "提交新建业务场景",
        functionDesc: "点击确定按钮后，系统调用接口校验表单数据的完整性以及外部任务的有效性，校验通过后创建业务场景。",
        permissionScope: "待确认",
        dataSource: "中台本地校验 + 中科金 API 查询 taskCode 有效性。",
        valueLogic: "1. 校验场景名称、场景编码、可用租户等必填字段是否完整；2. 根据选择的智能平台校验对应平台字段（如中科金任务id）是否填写；3. 调用中科金「外呼任务详情」接口验证 taskCode 是否存在且有效。",
        fieldDesc: "触发校验：场景名称、场景编码、可用租户、智能平台选择、平台面板字段（中科金任务id / 一知科技场景id 等）、场景类型、数据导入方式。",
        interactionDesc: "点击确定按钮 → 前端表单校验 → 调用中科金 API 验证 taskCode → 校验通过后关闭抽屉并提示创建成功，校验失败时提示具体错误信息。",
        judgeRule: "校验数据完整性（所有必填项已填写）；校验外部任务有效性（taskCode 在中科金平台存在且状态有效）。",
        exceptionRule: "taskCode 不存在或无效时提示用户检查任务编码；中科金 API 不可用时提示用户稍后重试。",
        otherDesc: ""
      },
      desc: "1. 功能名称：提交新建业务场景<br>2. 功能说明：点击确定按钮后校验数据完整性和外部任务有效性<br>3. 权限范围：待确认<br>4. 数据来源：中台校验 + 中科金 API<br>5. 取值逻辑：校验必填字段 + 验证 taskCode<br>6. 字段说明：场景名称、编码、租户、平台、平台字段等<br>7. 交互说明：点击确定 → 校验 → 通过则创建成功<br>8. 判断规则：必填完整 + taskCode 有效<br>9. 异常规则：无效提示检查编码，API 不可用提示重试<br>10. 其他说明：待确认"
    }
  ],
  "scene-list": [
    {
      id: "4",
      page: "scene-list",
      target: "[data-anno='scene-list-card-grid']",
      position: {
        placement: "top-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "外呼列表",
      sections: {
        functionName: "外呼列表",
        functionDesc: "展示当前系统中的外呼任务卡片，每个卡片显示场景名称、任务状态、所属平台、数据来源以及已分配/待呼叫/已呼叫数量。",
        permissionScope: "超级管理员、租户管理员、租户运营可见。超级管理员读取全部外呼任务，租户仅读取本租户数据。",
        dataSource: "中科金 API GET /outbound/openapi/v2/task（外呼任务列表），或中台本地维护。",
        valueLogic: "按场景名称、状态、所属平台筛选。卡片展示：已分配数量、待呼叫数量、已呼叫数量。任务状态码：1未开始/2进行中/3已完成/4已终止/5排队中/6手动暂停/7自动暂停/8已过期。",
        fieldDesc: "场景名称、任务状态（未开始/进行中/用户暂停/已终止）、所属平台（一知科技/中科金智能）、数据来源（手动导入/接口传入）、已分配/待呼叫/已呼叫数量。",
        interactionDesc: "卡片网格布局。点击「查看」打开右侧抽屉，包含数据概览、呼叫名单（已分配/待呼叫/已呼叫/已过滤/呼叫失败）、任务详情三个 Tab。更多操作菜单支持删除/暂停/终止/启动。",
        judgeRule: "待确认任务启停的前置条件和权限。",
        exceptionRule: "待确认网络异常或中科金 API 不可用时的降级策略。",
        otherDesc: "当前原型映射：MockSceneList。任务详情已对接中科金 API 字段，展示任务编码、机器人名称、启动方式、拨打时段、AI坐席数、重呼策略、外呼进度。"
      },
      desc: "1. 功能名称：外呼列表<br>2. 功能说明：展示外呼任务卡片，支持查看详情和启停操作<br>3. 权限范围：超管/租户管理员/租户运营可见，超管看全部，租户看本租户<br>4. 数据来源：中科金 API 外呼任务列表<br>5. 取值逻辑：按场景名称/状态/平台筛选，卡片展示已分配/待呼叫/已呼叫<br>6. 字段说明：场景名称、状态、平台、来源、数量<br>7. 交互说明：卡片网格 → 点击查看 → 右侧抽屉（数据概览/呼叫名单/任务详情）<br>8. 判断规则：待确认启停条件<br>9. 异常规则：待确认<br>10. 其他说明：任务详情已对接中科金 API 字段"
    },
    {
      id: "5",
      page: "scene-list",
      target: "[data-anno='scene-list-task-detail']",
      position: {
        placement: "top-right",
        offsetX: 1,
        offsetY: 0
      },
      title: "任务详情（中科金）",
      sections: {
        functionName: "中科金任务详情",
        functionDesc: "查看中科金外呼任务的详细信息，字段按中科金 API OpenCallTaskResponse 结构展示。",
        permissionScope: "同外呼列表。超级管理员查看全部任务详情，租户仅查看本租户任务。",
        dataSource: "中科金 API GET /outbound/openapi/v2/task/{taskCode}。",
        valueLogic: "各字段直接来自 API 返回，包括：创建日期（本地字段）、机器人名称（robotName+robotId）、任务编码（taskCode）、启动方式（taskType 1手动/2定时）、拨打时段（外呼周期+外呼时段合并）、AI坐席数（aiSeatsNum/aiSeatsFlag）、自动重拨设置（recallModel/recallStrategy/recallStatus）、外呼进度。",
        fieldDesc: "创建日期、机器人名称（含robotId）、任务编码（taskCode）、启动方式（手动/定时+日期）、拨打时段（每周几+时段区间）、AI坐席数（弹性坐席开关）、自动重拨设置（高级模式显示recallStrategy策略组，普通模式显示状态/次数/间隔，关闭显示关闭）、外呼进度（已完成/总数）。",
        interactionDesc: "在外呼列表点击「查看」→ 抽屉中点击「任务详情」Tab 查看。",
        judgeRule: "待确认",
        exceptionRule: "数据缺失时显示「暂无任务详情数据」。",
        otherDesc: "当前原型映射：MockZkjTaskDetail[id]。"
      },
      desc: "1. 功能名称：中科金任务详情<br>2. 功能说明：查看中科金外呼任务的详细信息，字段按中科金 API OpenCallTaskResponse 结构展示。<br>3. 权限范围：同外呼列表。超级管理员查看全部任务详情，租户仅查看本租户任务。<br>4. 数据来源：中科金 API GET /outbound/openapi/v2/task/{taskCode}。<br>5. 取值逻辑：各字段直接来自 API 返回，包括：创建日期（本地字段）、机器人名称（robotName+robotId）、任务编码（taskCode）、启动方式（taskType 1手动/2定时）、拨打时段（外呼周期+外呼时段合并）、AI坐席数（aiSeatsNum/aiSeatsFlag）、自动重拨设置（recallModel/recallStrategy/recallStatus）、外呼进度。<br>6. 字段说明：创建日期、机器人名称（含robotId）、任务编码（taskCode）、启动方式（手动/定时+日期）、拨打时段（每周几+时段区间）、AI坐席数（弹性坐席开关）、自动重拨设置（高级模式显示recallStrategy策略组，普通模式显示状态/次数/间隔，关闭显示关闭）、外呼进度（已完成/总数）。<br>7. 交互说明：在外呼列表点击「查看」→ 抽屉中点击「任务详情」Tab 查看。<br>8. 判断规则：待确认<br>9. 异常规则：数据缺失时显示「暂无任务详情数据」。<br>10. 其他说明：当前原型映射：MockZkjTaskDetail[id]。"
    },
    {
      id: "6",
      page: "scene-list",
      target: "[data-anno='scene-list-data-overview']",
      position: {
        placement: "top-left",
        offsetX: 40,
        offsetY: -62
      },
      title: "数据概览",
      sections: {
        functionName: "数据概览分页功能",
        functionDesc: "外呼任务的数据概览页面，包含外呼数据、意向分类、意向洞察、通话时长统计四个区块。",
        permissionScope: "",
        dataSource: "通过中科金接口或本地数据进行统计",
        valueLogic: "通过接口回调获取到通话记录，提供接口让中科金传入通话文本、本地存储数据字段",
        fieldDesc: "1.导入客户数 = 去重后的传入/导入手机号总数；\n2.外呼客户数 = 成功提交到外部接口的去重手机号数；\n客户数 = 从回调通话状态识别的过滤数；\n4.接听率 = 已接听/外呼客户数；\n5.未接通率 = 接通数/导入客户数；\n6.平均通话时长= 总通话时长/接通数；\n7.总外呼数 = 成功提交的不去重手机号数；\n8.过滤比例 = 过滤客户数/导入客户数；\n9.意向分布环形图按意向等级展示占比，意向分类取中科金【aiTagName】；\n10.意向分类区块：某类客户占比、某类客户数（取配置选中的意向标签对应的客户数）；\n11.通话时段占比：不同通话时长区间的占比。",
        interactionDesc: "外呼列表卡片点击「查看」→ 数据概览 Tab 默认展示。意向分类右上角「配置」按钮可设置意向等级标签。",
        judgeRule: "1.通话状态枚举值等于 8 即为已过滤",
        exceptionRule: "无数据时隐藏",
        otherDesc: "1.意向等级枚举：A (高意向)；B (低意向)；C (意向待定)；D (无意向)；E (未接通)；F（停机/空号）"
      },
      desc: "1. 功能名称：数据概览分页功能<br>2. 功能说明：外呼任务的数据概览页面，包含外呼数据、意向分类、意向洞察、通话时长统计四个区块。<br>3. 权限范围：待确认<br>4. 数据来源：通过中科金接口或本地数据进行统计<br>5. 取值逻辑：通过接口回调获取到通话记录，提供接口让中科金传入通话文本、本地存储数据字段<br>6. 字段说明：1.导入客户数 = 去重后的传入/导入手机号总数；\n2.外呼客户数 = 成功提交到外部接口的去重手机号数；\n客户数 = 从回调通话状态识别的过滤数；\n4.接听率 = 已接听/外呼客户数；\n5.未接通率 = 接通数/导入客户数；\n6.平均通话时长= 总通话时长/接通数；\n7.总外呼数 = 成功提交的不去重手机号数；\n8.过滤比例 = 过滤客户数/导入客户数；\n9.意向分布环形图按意向等级展示占比，意向分类取中科金【aiTagName】；\n10.意向分类区块：某类客户占比、某类客户数（取配置选中的意向标签对应的客户数）；\n11.通话时段占比：不同通话时长区间的占比。<br>7. 交互说明：外呼列表卡片点击「查看」→ 数据概览 Tab 默认展示。意向分类右上角「配置」按钮可设置意向等级标签。<br>8. 判断规则：1.通话状态枚举值等于 8 即为已过滤<br>9. 异常规则：无数据时隐藏<br>10. 其他说明：1.意向等级枚举：A (高意向)；B (低意向)；C (意向待定)；D (无意向)；E (未接通)；F（停机/空号）"
    },
    {
      id: "7",
      page: "scene-list",
      target: "[data-anno='scene-list-call-list']",
      position: {
        placement: "top-left",
        offsetX: 201,
        offsetY: -111
      },
      title: "呼叫名单",
      sections: {
        functionName: "呼叫名单分页",
        functionDesc: "查看外呼任务下的呼叫名单，按外呼状态分为五个子标签：已分配、待呼叫、已呼叫、已过滤、呼叫失败。",
        permissionScope: "",
        dataSource: "中科金 API 外呼名单数据，部分由中台本地 Mock 维护。",
        valueLogic: "已分配：号码传入成功等待进入呼叫队列；待呼叫：提交到本地后，未收到回调结果的号码；已呼叫：已完成外呼后接收到回调记录的信息；已过滤：从通话回调取通话状态=8；呼叫失败：提交接口返回失败的数据，当天会重新提交任务。",
        fieldDesc: "1.已分配：用户号码、号码分配时间、等待提交时间；\n2.待呼叫：用户号码、号码提交时间、已拨打次数、等待呼叫时长、正在排队通道；\n3.已呼叫：用户号码、号码提交时间、已拨打次数、最终外呼结果、外呼通道、最终外呼时间、通话时长、外呼小结、最后通话节点；\n4.已过滤：用户号码、号码提交时间、已拨打次数、过滤原因、过滤时间；\n5.呼叫失败：用户号码、号码提交时间、失败原因。",
        interactionDesc: "1.在查看外呼抽屉中点击「呼叫名单」Tab，通过五个子标签切换查看不同状态的号码列表。\n2.已分配子标签支持「手动导入」和「批量移除」操作。\n3.已呼叫子标签支持「导出」和查看「通话记录」。\n4.已呼叫列表点击通话记录以抽屉弹窗的方式弹出，不要新开一个页面。",
        judgeRule: "待确认",
        exceptionRule: "无数据时各子标签展示空状态。",
        otherDesc: "接听状态枚举：4:等待重呼 5:未接听 6:拨打失败 7:已接听 8:限制拨打 9:占线 11:来电提醒 12:无法接通 13:空号 14:停机 15:关机 17:号码故障 18:线路故障"
      },
      desc: "1. 功能名称：呼叫名单分页<br>2. 功能说明：查看外呼任务下的呼叫名单，按外呼状态分为五个子标签：已分配、待呼叫、已呼叫、已过滤、呼叫失败。<br>3. 权限范围：待确认<br>4. 数据来源：中科金 API 外呼名单数据，部分由中台本地 Mock 维护。<br>5. 取值逻辑：已分配：号码传入成功等待进入呼叫队列；待呼叫：提交到本地后，未收到回调结果的号码；已呼叫：已完成外呼后接收到回调记录的信息；已过滤：从通话回调取通话状态=8；呼叫失败：提交接口返回失败的数据，当天会重新提交任务。<br>6. 字段说明：1.已分配：用户号码、号码分配时间、等待提交时间；\n2.待呼叫：用户号码、号码提交时间、已拨打次数、等待呼叫时长、正在排队通道；\n3.已呼叫：用户号码、号码提交时间、已拨打次数、最终外呼结果、外呼通道、最终外呼时间、通话时长、外呼小结、最后通话节点；\n4.已过滤：用户号码、号码提交时间、已拨打次数、过滤原因、过滤时间；\n5.呼叫失败：用户号码、号码提交时间、失败原因。<br>7. 交互说明：1.在查看外呼抽屉中点击「呼叫名单」Tab，通过五个子标签切换查看不同状态的号码列表。\n2.已分配子标签支持「手动导入」和「批量移除」操作。\n3.已呼叫子标签支持「导出」和查看「通话记录」。\n4.已呼叫列表点击通话记录以抽屉弹窗的方式弹出，不要新开一个页面。<br>8. 判断规则：待确认<br>9. 异常规则：无数据时各子标签展示空状态。<br>10. 其他说明：接听状态枚举：4:等待重呼 5:未接听 6:拨打失败 7:已接听 8:限制拨打 9:占线 11:来电提醒 12:无法接通 13:空号 14:停机 15:关机 17:号码故障 18:线路故障"
    }
  ],
  "result-records": [
    {
      id: "8",
      page: "result-records",
      target: "[data-anno='result-records-header']",
      position: {
        placement: "top-left",
        offsetX: 60,
        offsetY: 33
      },
      title: "通话记录",
      sections: {
        functionName: "通话记录列表",
        functionDesc: "查看每一通外呼的结果，包括通话时间、时长、通话状态、外呼总结、最后通话节点等信息。",
        permissionScope: "超级管理员、租户管理员、租户运营可见。超级管理员读取全部通话记录，租户仅读取本租户数据。",
        dataSource: "中科金 API 通话记录回调+录音下载+录音文本推送",
        valueLogic: "1.通话记录回调recordId+recordDate+callid；\n2.通过通话录音文件下载_V2接口callRoomId=callId+mediaRecordingId=recordId下载录音文件；\n3.通过查询录音转译文本callRoomId=callId+mediaRecordingId=recordId下载录音文件文本；\n4.如果当天查询没有返回，第二天通过\nwebhook录音转译推送返回",
        fieldDesc: "1.用户号码：对应接口文档 cellphone\n2.通话开始时间：对应接口文档callStartTime\n3.通话结束时间：对应接口文档callEndTime\n4.通话时长：对应接口文档callDurationSec\n5.场景名称：本地字段\n6.通话状态：对应接口文档callStatus\n7.外呼总结：百炼智能体返回的通话小结\n8.智能平台：取本地字段\n9.最后通话节点：仅科大显示",
        interactionDesc: "表格列表，支持按用户号码、场景名称、通话状态、智能平台筛选。点击「详情」打开通话详情弹窗，展示外呼小结、会话对话记录、意向等级等。",
        judgeRule: "",
        exceptionRule: "",
        otherDesc: "中科金通话状态码 → 本地状态映射：4:等待重呼→等待重呼；5:未接听→无应答；6:拨打失败→外呼失败；7:已接听→已接听；8:限制拨打→呼叫受限；9:占线→忙线中；11:来电提醒→无应答；12:无法接通→无法接通；13:空号→空号；14:停机→停机；15:关机→关机；17:号码故障→号码故障；18:线路故障→线路故障"
      },
      desc: "1. 功能名称：通话记录列表<br>2. 功能说明：查看每一通外呼的结果，包括通话时间、时长、通话状态、外呼总结、最后通话节点等信息。<br>3. 权限范围：超级管理员、租户管理员、租户运营可见。超级管理员读取全部通话记录，租户仅读取本租户数据。<br>4. 数据来源：中科金 API 通话记录回调+录音下载+录音文本推送<br>5. 取值逻辑：1.通话记录回调recordId+recordDate+callid；\n2.通过通话录音文件下载_V2接口callRoomId=callId+mediaRecordingId=recordId下载录音文件；\n3.通过查询录音转译文本callRoomId=callId+mediaRecordingId=recordId下载录音文件文本；\n4.如果当天查询没有返回，第二天通过\nwebhook录音转译推送返回<br>6. 字段说明：1.用户号码：对应接口文档 cellphone\n2.通话开始时间：对应接口文档callStartTime\n3.通话结束时间：对应接口文档callEndTime\n4.通话时长：对应接口文档callDurationSec\n5.场景名称：本地字段\n6.通话状态：对应接口文档callStatus\n7.外呼总结：百炼智能体返回的通话小结\n8.智能平台：取本地字段\n9.最后通话节点：仅科大显示<br>7. 交互说明：表格列表，支持按用户号码、场景名称、通话状态、智能平台筛选。点击「详情」打开通话详情弹窗，展示外呼小结、会话对话记录、意向等级等。<br>8. 判断规则：待确认<br>9. 异常规则：待确认<br>10. 其他说明：中科金通话状态码与本地状态映射关系：4:等待重呼→等待重呼；5:未接听→无应答；6:拨打失败→外呼失败；7:已接听→已接听；8:限制拨打→呼叫受限；9:占线→忙线中；11:来电提醒→无应答；12:无法接通→无法接通；13:空号→空号；14:停机→停机；15:关机→关机；17:号码故障→号码故障；18:线路故障→线路故障"
    },
    {
      id: "9",
      page: "result-records",
      target: "[data-anno='result-records-summary']",
      position: {
        placement: "top-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "外呼结果",
      sections: {
        functionName: "外呼结果",
        functionDesc: "展示通对话的外呼总结，由中科金对通话内容进行分析后生成。",
        permissionScope: "",
        dataSource: "回调接口。",
        valueLogic: "从通话记录回调接口获取通话总结和意向标签字段直接展示。",
        fieldDesc: "外呼小结、意向标签、计划到店时间、预计购车时间、意向品牌中文名、意向车系中文名。",
        interactionDesc: "在通话详情弹窗右侧面板顶部展示。",
        judgeRule: "未接通或通话异常的记录可能无小结，展示「暂无小结」。",
        exceptionRule: "summary 为空时展示「暂无小结」。",
        otherDesc: ""
      },
      desc: "1. 功能名称：外呼结果<br>2. 功能说明：展示通对话的外呼总结，由中科金对通话内容进行分析后生成。<br>3. 权限范围：待确认<br>4. 数据来源：回调接口。<br>5. 取值逻辑：从通话记录回调接口获取通话总结和意向标签字段直接展示。<br>6. 字段说明：外呼小结、意向标签、计划到店时间、预计购车时间、意向品牌中文名、意向车系中文名。<br>7. 交互说明：在通话详情弹窗右侧面板顶部展示。<br>8. 判断规则：未接通或通话异常的记录可能无小结，展示「暂无小结」。<br>9. 异常规则：summary 为空时展示「暂无小结」。<br>10. 其他说明：待确认"
    },
    {
      id: "10",
      page: "result-records",
      target: "[data-anno='result-records-fields']",
      position: {
        placement: "top-right",
        offsetX: -156,
        offsetY: -54
      },
      title: "通话详情字段",
      sections: {
        functionName: "通话详情信息字段",
        functionDesc: "展示单条通话记录的详细信息，包含会话标识、通话时间、主被叫号码、归属地、意向标签等。",
        permissionScope: "",
        dataSource: "中科金 API 外呼记录详情 / 回调接口返回。",
        valueLogic: "会话id 对应 API sessionId；通话状态对应 callStatus；通话开始/结束时间对应 callStartTime/callEndTime；主叫号码对应 callerNumber；通话时长对应 callDurationSec；被叫号码对应 cellphone；意向标签对应 aiTagName；主叫号码归属对应 callerProvince/callerCity；被叫号码省份城市对应 numberAttribute。",
        fieldDesc: "1.会话 id：中科金回调 sessionId\n2.通话状态：对应 callStatus\n3.通话开始时间：callStartTime\n4.通话结束时间：callEndTime\n5.主叫号码：系统外呼号码\n6.通话时长：callDurationSec\n7.被叫号码：客户手机号 cellphone\n8.主叫号码归属：callerProvince/callerCity\n9.被叫号码省份城市：numberAttribute",
        interactionDesc: "在通话详情弹窗右侧面板，位于外呼小结下方以行列形式展示。",
        judgeRule: "",
        exceptionRule: "字段无数据时展示「-」。",
        otherDesc: "当前原型映射：MockCallRecordRows。字段按中科金 API AudioCallbackResponse 结构映射。"
      },
      desc: "1. 功能名称：通话详情信息字段<br>2. 功能说明：展示单条通话记录的详细信息，包含会话标识、通话时间、主被叫号码、归属地、意向标签等。<br>3. 权限范围：待确认<br>4. 数据来源：中科金 API 外呼记录详情 / 回调接口返回。<br>5. 取值逻辑：会话id 对应 API sessionId；通话状态对应 callStatus；通话开始/结束时间对应 callStartTime/callEndTime；主叫号码对应 callerNumber；通话时长对应 callDurationSec；被叫号码对应 cellphone；意向标签对应 aiTagName；主叫号码归属对应 callerProvince/callerCity；被叫号码省份城市对应 numberAttribute。<br>6. 字段说明：1.会话 id：中科金回调 sessionId\n2.通话状态：对应 callStatus\n3.通话开始时间：callStartTime\n4.通话结束时间：callEndTime\n5.主叫号码：系统外呼号码\n6.通话时长：callDurationSec\n7.被叫号码：客户手机号 cellphone\n8.主叫号码归属：callerProvince/callerCity\n9.被叫号码省份城市：numberAttribute<br>7. 交互说明：在通话详情弹窗右侧面板，位于外呼小结下方以行列形式展示。<br>8. 判断规则：待确认<br>9. 异常规则：字段无数据时展示「-」。<br>10. 其他说明：当前原型映射：MockCallRecordRows。字段按中科金 API AudioCallbackResponse 结构映射。"
    },
    {
      id: "11",
      page: "result-records",
      target: "[data-anno='result-records-audio']",
      position: {
        placement: "top-left",
        offsetX: 99,
        offsetY: 1
      },
      title: "通话录音与文本",
      sections: {
        functionName: "通话录音与对话文本",
        functionDesc: "展示通话录音播放控件和客服-客户对话文本记录。录音可通过中科金回调的 URL 下载获取，对话文本通过 webhook录音转译推送接口，通过audioRecordCode 字段获取。",
        permissionScope: "",
        dataSource: "1.录音通过接口回调地址下载\n2.文本通过提供接口由中科金写入",
        valueLogic: "录音播放器展示录音时长，支持播放/暂停、音量调节。对话文本按客服和客户角色分开展示，以对话气泡形式呈现。",
        fieldDesc: "左侧上方：音频播放条（播放按钮、进度条、时长、音量、更多操作）；左侧下方：对话文本（客服气泡/客户气泡交替展示）。",
        interactionDesc: "点击播放按钮开始播放录音，拖动进度条跳转。对话文本滚动查看完整对话记录。",
        judgeRule: "通话时间过短可能不产生录音文件。录音文件生成是异步操作，收到回调后立即下载可能出现文件不存在，以每 5 分钟调用一次的机制执行直到本地保存到录音文件。",
        exceptionRule: "无录音时隐藏播放控件或显示不可用状态。对话文本为空时展示空状态。",
        otherDesc: "当前原型映射：renderDialogRows 硬编码对话示例。API 映射：录音→recordId/recordDate，ASR→/content/{audioRecordCode}。"
      },
      desc: "1. 功能名称：通话录音与对话文本<br>2. 功能说明：展示通话录音播放控件和客服-客户对话文本记录。录音可通过中科金回调的 URL 下载获取，对话文本通过 webhook录音转译推送接口，通过audioRecordCode 字段获取。<br>3. 权限范围：待确认<br>4. 数据来源：1.录音通过接口回调地址下载\n2.文本通过提供接口由中科金写入<br>5. 取值逻辑：录音播放器展示录音时长，支持播放/暂停、音量调节。对话文本按客服和客户角色分开展示，以对话气泡形式呈现。<br>6. 字段说明：左侧上方：音频播放条（播放按钮、进度条、时长、音量、更多操作）；左侧下方：对话文本（客服气泡/客户气泡交替展示）。<br>7. 交互说明：点击播放按钮开始播放录音，拖动进度条跳转。对话文本滚动查看完整对话记录。<br>8. 判断规则：通话时间过短可能不产生录音文件。录音文件生成是异步操作，收到回调后立即下载可能出现文件不存在，以每 5 分钟调用一次的机制执行直到本地保存到录音文件。<br>9. 异常规则：无录音时隐藏播放控件或显示不可用状态。对话文本为空时展示空状态。<br>10. 其他说明：当前原型映射：renderDialogRows 硬编码对话示例。API 映射：录音→recordId/recordDate，ASR→/content/{audioRecordCode}。"
    }
  ],
  "report-call": [
    {
      id: "12",
      page: "report-call",
      target: "[data-anno='report-call-header']",
      position: {
        placement: "bottom-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "通话统计",
      sections: {
        functionName: "通话统计",
        functionDesc: "查看外呼任务的通话统计数据，包含外呼统计和客户统计两个维度。",
        permissionScope: "超级管理员、租户管理员、租户运营可见。超级管理员读取全部数据统计，租户仅读取本租户数据。",
        dataSource: "中科金 API POST /outbound/openapi/report/call/out/statByDate。按日期范围查询，可指定 taskCodes 和 robotIds 筛选。",
        valueLogic: "API 返回统计指标：外呼量、接通量/率、对话轮次分布(0/1/2/3/4/5/5+轮)、通话时长分段分布(≤10s/11-20s/21-30s/31-40s/41-50s/51-60s/>60s)、意向标签分布、导入名单量、首句挂机量/率、开口量/率、语音助手占比、拦截量/率、空关停量/率、短信触发量/成功率、目标完成量/率。当前原型仅展示基本的拨打次数/接通/未接通/接通率/触达率/累计时长。",
        fieldDesc: "外呼统计表：序号、呼叫时间、场景名称、拨打总次数、呼叫名单总数、接通总数、未接通总数、接通率、触达率、累计通话时长。客户统计表：序号、呼叫时间、场景名称、客户总数、有效通话客户数、累计通话时长、客户平均通话时长。",
        interactionDesc: "支持按呼叫时间、场景名称、智能平台筛选。两个 Tab 切换：外呼统计 / 客户统计。",
        judgeRule: "待确认统计数据的更新频率和延迟。",
        exceptionRule: "待确认",
        otherDesc: "当前原型映射：MockCallStatsRows。统计维度远少于 API 提供的指标（缺少对话轮次分布、时长分段、意向标签分布、首句挂机率、开口率、拦截率等）。"
      },
      desc: "1. 功能名称：通话统计<br>2. 功能说明：外呼统计和客户统计两个维度<br>3. 权限范围：超管/租户管理员/租户运营，超管全部/租户本租户<br>4. 数据来源：中科金 API statByDate<br>5. 取值逻辑：API 丰富指标，原型仅展示基础数据<br>6. 字段说明：拨打次数、接通、未接通、接通率、触达率、时长<br>7. 交互说明：双 Tab + 筛选<br>8. 判断规则：待确认<br>9. 异常规则：待确认<br>10. 其他说明：统计维度远少于 API 提供能力"
    }
  ],
  "report-billing": [
    {
      id: "13",
      page: "report-billing",
      target: "[data-anno='report-billing-header']",
      position: {
        placement: "bottom-right",
        offsetX: 0,
        offsetY: 0
      },
      title: "计费统计",
      sections: {
        functionName: "计费统计",
        functionDesc: "按日期范围和租户查看通话计费时长，并逐级追溯到租户通话汇总和具体通话计费记录。",
        permissionScope: "超级管理员、租户管理员、租户运营均可见。超级管理员读取全部租户计费数据，租户仅读取本租户数据。",
        dataSource: "外呼平台提供通话记录与通话时长，中台按租户聚合。中科金不提供独立计费接口，计费分钟由中台根据接通记录计算。",
        valueLogic: "先按查询日期范围筛选接通记录，再按租户汇总计费分钟。每通电话的计费分钟为通话秒数除以 60 后向上取整。",
        fieldDesc: "筛选条件：计费开始日期、计费结束日期、租户名称。主表：序号、计费日期、租户名称、计费时长、操作。",
        interactionDesc: "选择日期范围或租户后点击「查询」刷新列表；点击主表「详情」打开租户通话汇总弹窗；弹窗内再次点击「详情」打开通话计费明细抽屉。",
        judgeRule: "仅客户接通的通话参与计费；未满 1 分钟按 1 分钟计费。",
        exceptionRule: "无符合条件的数据时展示空状态；外呼平台记录缺失或时长无效时不纳入计费汇总，并需保留异常记录供核对。",
        otherDesc: "当前页面展示计费时长，不展示金额。若后续增加金额，应由计费分钟与生效单价计算，并保留单价版本和生效时间。"
      },
      desc: "1. 功能名称：计费统计<br>2. 功能说明：按日期和租户查看计费时长并逐级追溯通话记录<br>3. 权限范围：超管查看全部，租户角色查看本租户<br>4. 数据来源：外呼平台通话记录，中台聚合计算<br>5. 取值逻辑：接通时长除以60后向上取整并按租户汇总<br>6. 字段说明：计费日期、租户名称、计费时长<br>7. 交互说明：筛选 → 租户汇总 → 通话计费明细<br>8. 判断规则：未接通不收费，未满1分钟按1分钟<br>9. 异常规则：无数据展示空状态，异常时长不计费<br>10. 其他说明：当前页面展示时长，不展示金额"
    },
    {
      id: "14",
      page: "report-billing",
      target: "[data-anno='report-billing-rule']",
      position: {
        placement: "bottom-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "通话计费规则",
      sections: {
        functionName: "通话计费规则",
        functionDesc: "说明通话记录进入计费统计的基本条件和分钟换算方式。",
        permissionScope: "所有可访问计费统计页面的角色均可见。",
        dataSource: "中台计费规则配置与外呼平台返回的接通状态、通话时长。",
        valueLogic: "客户接通后开始计费；单通计费分钟 = 通话时长秒数 ÷ 60 后向上取整。",
        fieldDesc: "接通状态、实际通话时长、计费分钟。",
        interactionDesc: "规则以页面顶部提示常驻展示，无需用户操作。",
        judgeRule: "未接通不计费；1 至 60 秒计 1 分钟；61 至 120 秒计 2 分钟，依此类推。",
        exceptionRule: "通话时长为空、负数或结束时间早于开始时间时不自动计费，进入异常核对。",
        otherDesc: "该规则只描述通话时长计费。账号费、坐席费等其他费用不在本统计内。"
      },
      desc: "1. 功能名称：通话计费规则<br>2. 功能说明：说明接通计费和分钟向上取整规则<br>3. 权限范围：计费统计页面可见角色<br>4. 数据来源：接通状态与通话时长<br>5. 取值逻辑：秒数除以60向上取整<br>6. 字段说明：接通状态、实际时长、计费分钟<br>7. 交互说明：页面顶部常驻提示<br>8. 判断规则：未接通不计费，未满1分钟按1分钟<br>9. 异常规则：无效时长进入异常核对<br>10. 其他说明：不包含账号费和坐席费"
    },
    {
      id: "15",
      page: "report-billing",
      target: "[data-anno='report-billing-summary-table']",
      position: {
        placement: "top-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "租户计费汇总",
      sections: {
        functionName: "租户计费汇总",
        functionDesc: "按查询日期范围和租户汇总已接通电话的计费分钟。",
        permissionScope: "超级管理员查看全部租户；租户管理员和租户运营仅查看所属租户。",
        dataSource: "外呼平台通话记录，经中台按日期和租户聚合。",
        valueLogic: "同一租户在查询日期范围内的每通计费分钟求和，形成列表中的计费时长。",
        fieldDesc: "序号、计费日期、租户名称、计费时长、操作。",
        interactionDesc: "点击某行「详情」打开该租户在当前日期范围内的通话计费汇总弹窗。",
        judgeRule: "计费日期以查询范围展示；计费时长单位为分钟。",
        exceptionRule: "无匹配数据时展示「暂无数据」；聚合结果与明细合计不一致时需提示数据核对。",
        otherDesc: "当前原型每页展示 20 条，分页区域展示当前条数和总条数。"
      },
      desc: "1. 功能名称：租户计费汇总<br>2. 功能说明：按日期和租户汇总计费分钟<br>3. 权限范围：超管全部，租户角色本租户<br>4. 数据来源：通话记录聚合<br>5. 取值逻辑：单通计费分钟求和<br>6. 字段说明：日期、租户、计费时长、操作<br>7. 交互说明：点击详情查看通话汇总<br>8. 判断规则：单位为分钟<br>9. 异常规则：无数据展示空状态，汇总不一致需核对<br>10. 其他说明：默认每页20条"
    },
    {
      id: "16",
      page: "report-billing",
      target: "[data-anno='report-billing-detail-table']",
      position: {
        placement: "top-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "租户计费详情",
      sections: {
        functionName: "租户计费详情",
        functionDesc: "展示所选租户在查询日期范围内每天的计费明细，包括计费日期、模型类型和计费时长。",
        permissionScope: "继承计费统计页面的数据权限。",
        dataSource: "中台按日期和租户聚合的计费数据。",
        valueLogic: "按日期逐日展示计费时长，未产生计费的日期展示「-」。计费时长单位为分钟。",
        fieldDesc: "序号、计费日期、租户名称、模型类型（大模型/小模型）、计费时长、操作。",
        interactionDesc: "点击行级「详情」打开右侧通话计费明细抽屉；支持导出、刷新和表格设置入口。",
        judgeRule: "计费时长应与该日期范围内的通话计费分钟合计一致。",
        exceptionRule: "无数据的日期展示「-」；数据加载失败时保留弹窗并提示。",
        otherDesc: "弹窗用于从主列表下钻到每日计费维度，关闭后返回计费统计主列表。"
      },
      desc: "1. 功能名称：租户计费详情<br>2. 功能说明：展示租户每日计费明细<br>3. 权限范围：继承计费统计权限<br>4. 数据来源：按日期和租户聚合<br>5. 取值逻辑：逐日展示计费时长，无数据展示「-」<br>6. 字段说明：计费日期、租户名称、模型类型、计费时长、操作<br>7. 交互说明：点击详情打开右侧明细抽屉<br>8. 判断规则：计费时长与日期范围内分钟合计一致<br>9. 异常规则：无数据展示「-」<br>10. 其他说明：从主列表下钻到每日维度"
    },
    {
      id: "17",
      page: "report-billing",
      target: "[data-anno='report-billing-call-detail']",
      position: {
        placement: "bottom-left",
        offsetX: 0,
        offsetY: 0
      },
      title: "通话计费明细",
      sections: {
        functionName: "通话计费明细",
        functionDesc: "在右侧抽屉中集中核对所选租户的通话计费记录及分钟换算结果。",
        permissionScope: "继承计费统计页面和所选租户的数据权限。",
        dataSource: "租户通话计费汇总中的通话记录。",
        valueLogic: "逐行展示通话实际时长与计费分钟，底部再次提示计费规则。",
        fieldDesc: "序号、用户号码、通话开始时间、通话结束时间、通话时长、计费分钟、场景名称。",
        interactionDesc: "点击第一层弹窗的行级「详情」从右侧打开抽屉；点击关闭按钮或遮罩返回第一层详情。",
        judgeRule: "明细行数和计费分钟合计应与上一级汇总一致。",
        exceptionRule: "数据加载失败时保留第一层弹窗并提示失败，不应关闭整个计费统计页面。",
        otherDesc: "该层用于核对通话级计费依据，不提供计费规则编辑能力。"
      },
      desc: "1. 功能名称：通话计费明细<br>2. 功能说明：右侧抽屉核对通话计费记录<br>3. 权限范围：继承页面和租户权限<br>4. 数据来源：租户通话计费汇总<br>5. 取值逻辑：展示实际时长和计费分钟<br>6. 字段说明：号码、时间、时长、计费分钟、场景<br>7. 交互说明：行级详情打开，关闭后返回第一层弹窗<br>8. 判断规则：行数和分钟合计与上一级一致<br>9. 异常规则：加载失败保留第一层弹窗并提示<br>10. 其他说明：仅核对，不编辑计费规则"
    }
  ]
};
