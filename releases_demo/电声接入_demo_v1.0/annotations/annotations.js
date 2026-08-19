window.AnnotationData = {
  "index": [],
  "interaction": [],
  "sys-tenant": [],
  "sys-scene": [
    {
      "id": "31",
      "page": "sys-scene",
      "target": "[data-anno=\"sys-scene-add-btn\"]",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声业务场景新增入口",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-003"
      ],
      "fieldRefs": [
        "FLD-001"
      ],
      "sections": {
        "functionName": "电声业务场景新增入口",
        "functionDesc": "打开新增业务场景抽屉，承接电声平台业务数据接入、任务自动生成和场景建档。",
        "permissionScope": "仅超级管理员、租户管理员可见和操作。",
        "dataSource": "中台本地表单，提交后写入场景列表；电声平台在提交时调用接口生成外呼任务。",
        "valueLogic": "点击按钮 → 打开右侧抽屉 → 填写场景名称、编码、租户、平台、类型、呼叫任务配置、模型类型和电声账号 → 提交创建并生成任务。",
        "fieldDesc": "新增业务场景按钮。",
        "interactionDesc": "点击按钮后从右侧滑出抽屉表单。表单包含场景基本信息（名称/编码/描述/租户/平台/类型/导入方式）和平台专属面板（电声呼叫任务配置/一知/中科金）。",
        "judgeRule": "租户运营角色不可见此按钮。",
        "exceptionRule": "",
        "otherDesc": "当前原型映射：sys-scene.js showAddModal() 函数。"
      },
      "desc": "1. 功能名称：新增业务场景入口\n2. 功能说明：打开新建业务场景抽屉表单，配置外呼场景参数。\n3. 权限范围：仅超级管理员、租户管理员可见。\n4. 数据来源：中台本地表单。\n5. 取值逻辑：点击 → 抽屉 → 填写 → 提交。\n6. 字段说明：新增业务场景按钮。\n7. 交互说明：右侧滑出抽屉表单。\n8. 判断规则：租户运营不可见。\n9. 异常规则：-\n10. 其他说明：当前原型映射：sys-scene.js showAddModal()。",
      "description": "入口用于新增电声接入业务场景，进入后配置电声平台、呼叫任务配置、模型类型、电声账号、租户和场景分类，提交时自动生成任务。"
    },
    {
      "id": "32",
      "page": "sys-scene",
      "target": "[data-anno=\"sys-scene-table\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声业务场景列表",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-003",
        "SRC-005"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-002"
      ],
      "sections": {
        "functionName": "电声业务场景列表",
        "functionDesc": "集中查看业务场景的名称、编号、租户、分类、平台来源、更新时间和状态，首条为电声平台业务场景。",
        "permissionScope": "超级管理员查看全部场景，租户管理员仅查看本租户场景，租户运营只读。",
        "dataSource": "中台本地维护的场景配置数据。",
        "valueLogic": "列表按更新时间倒序展示。筛选支持场景名称模糊搜索、场景分类下拉和所属平台下拉。操作列根据角色权限显示编辑和删除入口。",
        "fieldDesc": "序号、场景名称、场景id、场景编码、场景分类（首访/服务/回访/新线索/冷线索）、所属平台（电声/冰兰/科大讯飞/一知科技/中科金）、可用租户、更新人、更新时间、操作（编辑/删除）。",
        "interactionDesc": "表格列表，支持筛选和分页。点击编辑打开编辑抽屉，点击删除弹出确认框。",
        "judgeRule": "进行中的场景不可删除。编辑操作需要超级管理员或租户管理员权限。",
        "exceptionRule": "无数据时展示空状态。",
        "otherDesc": "当前原型映射：sys-scene.js render() 中的 scene-list-page 表格。场景数据来自 SceneRows 和 MockSceneList。"
      },
      "desc": "1. 功能名称：业务场景列表\n2. 功能说明：展示所有业务场景，支持筛选和操作。\n3. 权限范围：超管全量/租户管理员本租户/租户运营只读。\n4. 数据来源：中台本地维护。\n5. 取值逻辑：按更新时间倒序，支持名称/分类/平台筛选。\n6. 字段说明：序号、名称、id、编码、分类、平台、租户、更新人、时间、操作。\n7. 交互说明：表格 → 筛选 → 编辑/删除操作。\n8. 判断规则：进行中不可删除。\n9. 异常规则：无数据展示空状态。\n10. 其他说明：当前原型映射：SceneRows / MockSceneList。",
      "description": "列表首行展示电声业务数据，用于确认电声平台场景已接入并处于启用状态。"
    }
  ],
  "scene-list": [
    {
      "id": "4",
      "page": "scene-list",
      "target": "[data-anno=\"scene-list-card-grid\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声场景任务卡片",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-003",
        "SRC-005"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-002"
      ],
      "sections": {
        "functionName": "电声场景任务卡片",
        "functionDesc": "以卡片方式承载电声业务场景的执行状态，便于快速进入后续数据追踪。",
        "permissionScope": "超级管理员、租户管理员、租户运营可见。超级管理员查看全部任务，租户仅读取本租户数据。",
        "dataSource": "MockSceneList 内存数据集。",
        "valueLogic": "按场景名称、状态、所属平台筛选。卡片展示：已分配数量、待呼叫数量、已呼叫数量。任务状态：未开始/进行中/已完成/已终止。",
        "fieldDesc": "场景名称、任务状态、所属平台（电声平台/一知科技等）、数据来源（手动导入/接口传入）、已分配/待呼叫/已呼叫数量。",
        "interactionDesc": "卡片网格布局。点击查看打开右侧抽屉，包含数据概览、呼叫名单（已分配/待呼叫/已呼叫/已过滤/呼叫失败）、任务详情三个 Tab。更多操作菜单支持删除/暂停/终止/启动。",
        "judgeRule": "任务启停的前置条件由后台控制。",
        "exceptionRule": "任务删除后卡片将消失。",
        "otherDesc": "当前原型映射：MockSceneList。电声平台场景卡片中隐藏外呼通道和加微配置。"
      },
      "desc": "1. 功能名称：电声外呼任务列表\n2. 功能说明：展示电声外呼场景卡片，电声平台下隐藏外呼通道和加微选项配置。\n3. 权限范围：超管/租户管理员/租户运营可见。\n4. 数据来源：MockSceneList 内存数据集。\n5. 取值逻辑：按场景名称/状态/平台筛选，卡片展示数量指标。\n6. 字段说明：场景名称、状态、平台、来源、数量。\n7. 交互说明：卡片网格 → 点击查看 → 右侧抽屉（数据概览/呼叫名单/任务详情）。\n8. 判断规则：后台控制启停条件。\n9. 异常规则：任务删除后卡片消失。\n10. 其他说明：当前原型映射：MockSceneList。",
      "description": "卡片视图用于查看电声接入后的业务场景运行态，包括任务量、接通率、完成率和最新更新时间。"
    }
  ],
  "result-records": [
    {
      "id": "8",
      "page": "result-records",
      "target": "[data-anno=\"result-records-list\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声通话记录列表",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-006"
      ],
      "fieldRefs": [
        "FLD-011",
        "FLD-012",
        "FLD-014"
      ],
      "sections": {
        "functionName": "电声通话记录列表",
        "functionDesc": "用于复核电声业务产生的通话记录，不再展示线路类型和加微状态，减少与当前业务无关的信息干扰。",
        "permissionScope": "超级管理员、租户管理员、租户运营可见。超级管理员读取全部通话记录，租户仅读取本租户数据。",
        "dataSource": "电声 D02 话单回调、录音地址和转写文本回调。",
        "valueLogic": "通话状态使用中台统一 25 项枚举；电声 answerStatus 301 映射为已接通、302 映射为秒挂、303 映射为伪接通、205 映射为拒接、206 映射为无人接听，子状态未知时由 answerMainStatus 3/2 兜底为已接通/无法接通；通话时长取 callDurationSeconds。",
        "fieldDesc": "用户号码、通话开始时间、通话结束时间、通话时长、场景名称、通话状态、外呼总结、智能平台、最后通话节点、操作。",
        "interactionDesc": "表格列表，支持按用户号码、场景名称、中台完整通话状态、智能平台筛选。点击详情打开通话详情弹窗。",
        "judgeRule": "未接通或通话异常的记录可能无小结。",
        "exceptionRule": "无数据时展示空状态。",
        "otherDesc": "当前原型映射：MockCallRecordRows。电声不支持的细分状态不推测生成，原始主、子状态仅在底层保留。"
      },
      "desc": "1. 功能名称：电声通话记录列表\n2. 功能说明：查看每通电声外呼的时间、时长、中台统一状态和小结。\n3. 权限范围：超管/租户管理员/租户运营可见。\n4. 数据来源：电声 D02 话单回调。\n5. 取值逻辑：answerStatus 301→已接通、302→秒挂、303→伪接通、205→拒接、206→无人接听，answerMainStatus 仅作兜底。\n6. 字段说明：号码、时间、时长、场景、状态、小结、平台、最后节点、操作。\n7. 交互说明：表格列表 → 完整状态筛选 → 点击详情打开弹窗。\n8. 判断规则：电声无细分码的状态不得推测生成。\n9. 异常规则：无数据展示空状态。\n10. 其他说明：当前原型映射：MockCallRecordRows。",
      "description": "列表保留电声外呼核查所需字段，聚焦客户信息、场景、通话状态、接通结果和意向结论。"
    }
  ],
  "result-clue": [
    {
      "id": "11",
      "page": "result-clue",
      "target": "[data-anno=\"result-clue-list\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声线索记录列表",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-003",
        "SRC-004"
      ],
      "fieldRefs": [
        "FLD-003",
        "FLD-010",
        "FLD-011",
        "FLD-014"
      ],
      "sections": {
        "functionName": "电声线索记录列表",
        "functionDesc": "承接电声外呼后沉淀的线索数据，支持按场景、意向、跟进状态和同步状态筛查。",
        "permissionScope": "继承外呼结果模块权限。",
        "dataSource": "电声 D02 话单回调、D06 通话小结推送以及标签管理中的电声供应商标签映射结果。",
        "valueLogic": "最后通话意向级别优先取 intentionRank 或映射后的本地意向标签；客户详细标签聚合意向标签、关注点、预计到店/购车时间和通话标签。",
        "fieldDesc": "用户号码、最后回访时间、回访次数、最后通话状态、最后回访记录、最后通话意向级别、客户详细标签、场景名称、首次/二次/三次实际回访时间、操作。",
        "interactionDesc": "点击客户详细标签-查看打开标签弹窗；点击详情打开回访明细弹窗，明细中可继续打开单次通话详情抽屉。",
        "judgeRule": "空数据时展示空状态。",
        "exceptionRule": "数据缺失时对应字段展示 -。",
        "otherDesc": "当前原型映射：result-clue.js 中的 allRows 数据集。isRedial 字段在回访明细中呈现。"
      },
      "desc": "1. 功能名称：电声线索记录列表\n2. 功能说明：按线索维度聚合回访结果，展示门店编码、回访次数、意向级别，支持回访明细穿透。\n3. 权限范围：继承外呼结果模块权限。\n4. 数据来源：D02 话单 + D06 小结 + 标签映射。\n5. 取值逻辑：意向级别取 intentionRank 或映射标签。\n6. 字段说明：号码、回访时间/次数、状态、记录、意向级别、标签、操作。\n7. 交互说明：查看标签 → 详情回访明细 → 穿透单次通话详情。\n8. 判断规则：空数据展示空状态。\n9. 异常规则：缺失展示 -。\n10. 其他说明：当前原型映射：result-clue.js allRows。",
      "description": "线索列表按意向标签管理样式组织，便于查看电声线索的客户、标签、分组、跟进和同步状态。"
    },
    {
      "id": "12",
      "page": "result-clue",
      "target": "[data-anno=\"result-clue-scene-filter\"]",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声业务场景筛选",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-010"
      ],
      "sections": {
        "functionName": "电声业务场景筛选",
        "functionDesc": "通过业务场景维度过滤电声线索列表，避免跨场景数据混杂。",
        "permissionScope": "继承线索记录页面权限。",
        "dataSource": "业务场景列表、当前账号租户权限、系统管理-标签管理中的电声供应商标签配置。",
        "valueLogic": "先按场景名称定位场景类型，再按租户类型 + 场景类型读取电声供应商标签集中已启用且已映射的意向标签作为多选项。",
        "fieldDesc": "场景名称下拉框 + 意向级别多选下拉。",
        "interactionDesc": "未选择场景时隐藏意向级别筛选；选中场景后显示多选下拉，支持多选并按 OR 逻辑过滤线索。",
        "judgeRule": "",
        "exceptionRule": "若该场景未配置电声标签或映射为空，则显示暂无级别。",
        "otherDesc": "当前原型映射：result-clue.js 中的 updateLevelFilterVisibility 联动逻辑。"
      },
      "desc": "1. 功能名称：场景名称与意向级别筛选\n2. 功能说明：选择电声场景后联动展示意向级别多选筛选项。\n3. 权限范围：继承线索记录权限。\n4. 数据来源：场景列表 + 租户权限 + 标签配置。\n5. 取值逻辑：按场景类型读取已启用已映射的意向标签。\n6. 字段说明：场景名称下拉 + 意向级别多选。\n7. 交互说明：选择场景 → 显示意向级别多选 → OR 逻辑过滤。\n8. 判断规则：未选场景时隐藏。\n9. 异常规则：无标签配置时显示暂无级别。\n10. 其他说明：当前原型映射：result-clue.js updateLevelFilterVisibility。",
      "description": "筛选项用于限定电声线索所属业务场景，帮助运营人员只查看目标场景下的线索结果。"
    }
  ],
  "report-call": [
    {
      "id": "13",
      "page": "report-call",
      "target": "[data-anno=\"report-call-view\"]",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声通话统计",
      "sourceRefs": [
        "SRC-001",
        "SRC-002",
        "SRC-003",
        "SRC-004",
        "SRC-005",
        "SRC-006",
        "SRC-007"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-002",
        "FLD-003",
        "FLD-004",
        "FLD-005",
        "FLD-006",
        "FLD-007",
        "FLD-008",
        "FLD-009",
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "电声通话统计",
        "functionDesc": "面向电声外呼场景展示统计概览、趋势分析和结果分布，辅助评估业务接入效果。",
        "permissionScope": "超级管理员、租户管理员、租户运营可见。超级管理员读取全部数据，租户仅读取本租户数据。",
        "dataSource": "电声话单回调聚合统计数据。",
        "valueLogic": "外呼统计表展示拨打总次数、呼叫名单总数、接通总数、未接通总数、接通率、触达率、累计通话时长。客户统计表展示客户总数、有效通话客户数、累计通话时长、客户平均通话时长。",
        "fieldDesc": "外呼统计：序号、呼叫时间、场景名称、拨打总次数、呼叫名单总数、接通总数、未接通总数、接通率、触达率、累计通话时长。客户统计：序号、呼叫时间、场景名称、客户总数、有效通话客户数、累计通话时长、客户平均通话时长。",
        "interactionDesc": "支持按呼叫时间、场景名称、智能平台筛选。两个 Tab 切换：外呼统计/客户统计。",
        "judgeRule": "统计数据更新频率由后台控制。",
        "exceptionRule": "无符合条件的数据时展示空状态。",
        "otherDesc": "当前原型映射：MockCallStatsRows。统计维度聚焦基础指标。"
      },
      "desc": "1. 功能名称：通话统计\n2. 功能说明：外呼统计与客户统计列表按电声任务进行数据聚合，输出平均通话时长。\n3. 权限范围：超管/租户管理员/租户运营，超管全部/租户本租户。\n4. 数据来源：电声话单回调聚合。\n5. 取值逻辑：接通率 = 接通/名单总数，触达率 = (接通+未接通)/拨打。\n6. 字段说明：拨打次数、名单/接通/未接通总数、接通率、触达率、时长等。\n7. 交互说明：双 Tab 切换 + 筛选。\n8. 判断规则：后台控制更新频率。\n9. 异常规则：无数据展示空状态。\n10. 其他说明：当前原型映射：MockCallStatsRows。",
      "description": "统计页汇总电声业务外呼的核心指标、趋势和效果分布，用于评估接入后的通话表现。"
    }
  ],
  "sys-tags": [
    {
      "id": "14",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-supplier-root\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声供应商标签集",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "供应商标签集",
        "functionDesc": "维护电声平台原始标签池及其在各租户类型、各场景下的启用配置。电声标签包括意向等级、加微状态、挂机类型、是否重拨、过滤原因等，启用后通过映射本地标签统一业务语义。",
        "permissionScope": "仅超级管理员、租户管理员可见和操作。",
        "dataSource": "电声 D02/D05/D06 回调字段和中台 MockSupplierTagPool。",
        "valueLogic": "电声标签包括 intentionRank、wechatStatus、hangupType、isRedial、过滤原因等。启用后通过映射本地标签统一业务语义。",
        "fieldDesc": "供应商标签编码、标签名称、映射本地标签、排序、启用状态、操作。",
        "interactionDesc": "展开电声平台 → 租户类型 → 场景后，在右侧配置启用、映射、排序和编辑。",
        "judgeRule": "同一供应商标签池内标签名称不可重复。",
        "exceptionRule": "供应商停用后其标签不可继续启用或编辑。",
        "otherDesc": "当前原型映射：MockSupplierTagPool。标签编码格式 TAG-DS-*。"
      },
      "desc": "1. 功能名称：供应商标签集\n2. 功能说明：维护电声平台原始标签池（意向等级、加微、转人工、重拨、D05 过滤原因），支持启用/映射/排序。\n3. 权限范围：超管/租户管理员。\n4. 数据来源：电声回调字段 + MockSupplierTagPool。\n5. 取值逻辑：启用 + 映射本地标签统一语义。\n6. 字段说明：编码、名称、映射、排序、启用、操作。\n7. 交互说明：展开树节点 → 右侧配置面板。\n8. 判断规则：名称不可重复。\n9. 异常规则：供应商停用后禁用编辑。\n10. 其他说明：编码格式 TAG-DS-*。"
    },
    {
      "id": "15",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-local-root\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声本地标准标签",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-013",
        "FLD-014",
        "FLD-015"
      ],
      "sections": {
        "functionName": "中台标签集",
        "functionDesc": "维护电声回调标签最终归一后的本地标准标签，按租户类型和场景组织。电声供应商标签必须映射到本地标签后才进入线索记录、数据概览和意向统计口径。",
        "permissionScope": "仅超级管理员、租户管理员可见和操作。",
        "dataSource": "中台本地标签配置。",
        "valueLogic": "供应商标签映射到本地标签后统一业务语义；线索记录和统计分析优先使用映射后的本地标签。",
        "fieldDesc": "本地编码、本地标签名称、排序、操作。",
        "interactionDesc": "点击左侧中台标签集树节点，右侧展示对应标签列表，支持新增、编辑、删除和排序。",
        "judgeRule": "同一租户类型+场景下本地标签名称不可重复；被供应商标签映射引用时不应直接删除。",
        "exceptionRule": "场景停用后新增入口禁用。",
        "otherDesc": "当前原型映射：MockLocalTagPool。"
      },
      "desc": "1. 功能名称：中台标签集\n2. 功能说明：维护电声回调标签归一后的本地标准标签，按租户类型和场景组织。\n3. 权限范围：超管/租户管理员。\n4. 数据来源：中台本地标签配置。\n5. 取值逻辑：供应商标签映射到本地标签后统一语义。\n6. 字段说明：本地编码、标签名称、排序、操作。\n7. 交互说明：树节点切换 → 右侧标签列表。\n8. 判断规则：名称不可重复；映射引用时不可删除。\n9. 异常规则：场景停用后禁用新增。\n10. 其他说明：当前原型映射：MockLocalTagPool。"
    },
    {
      "id": "16",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-scene-config\"]",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签场景配置",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-002"
      ],
      "sections": {
        "functionName": "场景配置",
        "functionDesc": "维护标签管理使用的场景枚举，并与电声业务场景的新线索、冷线索、服务、回访等类型保持一致。",
        "permissionScope": "仅超级管理员、租户管理员可操作。",
        "dataSource": "中台本地场景配置。",
        "valueLogic": "线索记录筛选和供应商标签配置通过场景类型关联；新增场景类型后需同步维护对应标签集。",
        "fieldDesc": "场景名称、场景编码、场景类型、状态、操作。",
        "interactionDesc": "点击场景配置按钮打开弹窗，查看和维护场景列表。",
        "judgeRule": "",
        "exceptionRule": "场景停用后，对应标签新增和启用操作应禁用。",
        "otherDesc": "当前原型映射：场景配置弹窗。"
      },
      "desc": "1. 功能名称：场景配置\n2. 功能说明：维护标签管理使用的场景枚举。\n3. 权限范围：超管/租户管理员。\n4. 数据来源：中台本地场景配置。\n5. 取值逻辑：场景类型关联线索筛选和标签配置。\n6. 字段说明：场景名称、编码、类型、状态、操作。\n7. 交互说明：点击按钮 → 弹窗查看维护。\n8. 判断规则：-\n9. 异常规则：场景停用后禁用标签操作。\n10. 其他说明：当前原型映射：场景配置弹窗。"
    },
    {
      "id": "17",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-supplier-mgr\"]",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声供应商管理",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-002"
      ],
      "sections": {
        "functionName": "供应商管理",
        "functionDesc": "维护电声平台作为标签供应商的基础信息、编码和启用状态。",
        "permissionScope": "仅超级管理员、租户管理员可操作。",
        "dataSource": "中台供应商配置。",
        "valueLogic": "供应商编码用于生成供应商标签编码并区分不同平台标签池。",
        "fieldDesc": "供应商名称、供应商编码、标签数量、启用状态、操作。",
        "interactionDesc": "点击供应商管理按钮打开弹窗，查看和维护供应商列表。",
        "judgeRule": "同一平台下供应商编码不可重复。",
        "exceptionRule": "供应商停用后，其标签配置不可继续启用或编辑。",
        "otherDesc": "当前原型映射：供应商管理弹窗。"
      },
      "desc": "1. 功能名称：供应商管理\n2. 功能说明：维护电声平台作为标签供应商的基础信息。\n3. 权限范围：超管/租户管理员。\n4. 数据来源：中台供应商配置。\n5. 取值逻辑：编码用于生成 TAG-DS-* 标签编码。\n6. 字段说明：名称、编码、标签数量、状态、操作。\n7. 交互说明：点击按钮 → 弹窗查看维护。\n8. 判断规则：编码不可重复。\n9. 异常规则：停用后禁用标签操作。\n10. 其他说明：当前原型映射：供应商管理弹窗。"
    },
    {
      "id": "18",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-search\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签搜索",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "供应商标签搜索",
        "functionDesc": "按标签名称或编码检索电声标签池，快速定位意向等级、加微状态、转人工、重拨、过滤原因等标签。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "当前供应商+租户类型+场景下的标签列表。",
        "valueLogic": "输入关键字后仅过滤当前供应商、当前租户类型、当前场景下的标签列表。",
        "fieldDesc": "搜索输入框，支持按标签名称或编码模糊匹配。",
        "interactionDesc": "输入关键字后实时过滤标签列表。",
        "judgeRule": "",
        "exceptionRule": "无匹配结果时展示空状态。",
        "otherDesc": "当前原型映射：sys-tags.js 中的 tagSearchInput。"
      },
      "desc": "1. 功能名称：供应商标签搜索\n2. 功能说明：按名称或编码检索电声标签池。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：当前上下文标签列表。\n5. 取值逻辑：关键字模糊匹配名称或编码。\n6. 字段说明：搜索输入框。\n7. 交互说明：输入关键字实时过滤。\n8. 判断规则：-\n9. 异常规则：无匹配展示空状态。\n10. 其他说明：当前原型映射：tagSearchInput。"
    },
    {
      "id": "19",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-filter\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签启用筛选",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "标签启用状态筛选",
        "functionDesc": "按全部、已启用、未启用筛选当前电声标签。已启用标签写入当前场景配置的 enabledTagIds，才参与线索标签和意向统计口径。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "当前场景配置的 enabledTagIds。",
        "valueLogic": "已启用标签参与业务查询与统计；未启用标签保留在标签池中但不进入业务口径。",
        "fieldDesc": "下拉筛选：全部标签、已启用、未启用。",
        "interactionDesc": "选择筛选条件后实时过滤标签列表。",
        "judgeRule": "",
        "exceptionRule": "未启用标签保留在标签池中但不进入业务查询与统计。",
        "otherDesc": "当前原型映射：sys-tags.js 中的 tagStatusFilter。"
      },
      "desc": "1. 功能名称：标签启用状态筛选\n2. 功能说明：按全部/已启用/未启用筛选标签。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：当前场景 enabledTagIds。\n5. 取值逻辑：已启用标签参与统计口径。\n6. 字段说明：下拉筛选三态。\n7. 交互说明：选择后实时过滤。\n8. 判断规则：-\n9. 异常规则：未启用标签不进入业务口径。\n10. 其他说明：当前原型映射：tagStatusFilter。"
    },
    {
      "id": "20",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-enable-all\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签全选启用",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "全选启用",
        "functionDesc": "将当前场景下的电声供应商标签全部启用，写入 enabledTagIds。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "当前标签池所有标签。",
        "valueLogic": "把当前标签池所有标签 id 写入 enabledTagIds，并按关键词自动推断本地标签映射。",
        "fieldDesc": "全选启用按钮。",
        "interactionDesc": "点击按钮 → 所有标签启用 → 更新 enabledTagIds。",
        "judgeRule": "自动映射只是初始建议，人工调整后的映射优先。",
        "exceptionRule": "场景或供应商停用时按钮禁用。",
        "otherDesc": "当前原型映射：sys-tags.js 中的 btn-enable-all。"
      },
      "desc": "1. 功能名称：全选启用\n2. 功能说明：批量启用当前场景下所有标签。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：当前标签池所有标签。\n5. 取值逻辑：所有 id 写入 enabledTagIds。\n6. 字段说明：全选启用按钮。\n7. 交互说明：一键批量启用。\n8. 判断规则：自动映射只是初始建议。\n9. 异常规则：停用时禁用。\n10. 其他说明：当前原型映射：btn-enable-all。"
    },
    {
      "id": "21",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-disable-all\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签清空启用",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "清空启用",
        "functionDesc": "清空当前场景下已启用的电声标签，将 enabledTagIds 置为空，不删除供应商标签池中的标签。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "当前场景配置的 enabledTagIds。",
        "valueLogic": "将 enabledTagIds 置为空；清空后线索记录筛选、意向统计和客户详细标签不再使用这些供应商标签。",
        "fieldDesc": "清空启用按钮。",
        "interactionDesc": "点击按钮 → 清空启用列表 → 更新 enabledTagIds 为空。",
        "judgeRule": "",
        "exceptionRule": "场景或供应商停用时按钮禁用。",
        "otherDesc": "当前原型映射：sys-tags.js 中的 btn-disable-all。"
      },
      "desc": "1. 功能名称：清空启用\n2. 功能说明：清空当前场景已启用标签。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：当前场景 enabledTagIds。\n5. 取值逻辑：enabledTagIds 置为空。\n6. 字段说明：清空启用按钮。\n7. 交互说明：一键清空启用列表。\n8. 判断规则：-\n9. 异常规则：停用时禁用。\n10. 其他说明：当前原型映射：btn-disable-all。"
    },
    {
      "id": "22",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-add-tag\"]",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声新增供应商标签",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "新增供应商标签",
        "functionDesc": "在电声供应商标签池中新增回调标签。当电声新增回调字段或业务需要新增标签口径时，通过该入口扩展标签池。",
        "permissionScope": "仅超级管理员、租户管理员可操作。",
        "dataSource": "用户输入 + 中台本地标签池。",
        "valueLogic": "新增标签自动生成编码和排序，默认未启用，需要在具体场景下勾选启用并完成本地标签映射。",
        "fieldDesc": "新增标签按钮。",
        "interactionDesc": "点击按钮 → 弹出新增标签表单 → 填写名称 → 确定后写入标签池。",
        "judgeRule": "同一供应商标签池内标签名称不可重复。",
        "exceptionRule": "场景或供应商停用时按钮禁用。",
        "otherDesc": "当前原型映射：sys-tags.js 中的 btn-add-tag。"
      },
      "desc": "1. 功能名称：新增供应商标签\n2. 功能说明：在电声标签池中新增回调标签。\n3. 权限范围：超管/租户管理员。\n4. 数据来源：用户输入。\n5. 取值逻辑：新增后默认未启用，需勾选+映射。\n6. 字段说明：新增标签按钮。\n7. 交互说明：点击 → 表单 → 确定写入。\n8. 判断规则：名称不可重复。\n9. 异常规则：停用时禁用。\n10. 其他说明：当前原型映射：btn-add-tag。"
    },
    {
      "id": "23",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-enable-col\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签启用列",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "标签启用列",
        "functionDesc": "控制单个电声供应商标签是否参与当前场景。勾选即启用，取消勾选即停用，并同步更新左侧场景节点的配置数量提示。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "当前场景配置 enabledTagIds。",
        "valueLogic": "勾选状态来自 enabledTagIds 是否包含该标签 id。",
        "fieldDesc": "启用列：复选框。",
        "interactionDesc": "勾选/取消勾选切换单个标签的启用状态。",
        "judgeRule": "",
        "exceptionRule": "场景或供应商停用时复选框禁用。",
        "otherDesc": "当前原型映射：sys-tags.js 中的标签启用复选框列。"
      },
      "desc": "1. 功能名称：标签启用列\n2. 功能说明：控制单个标签是否参与当前场景。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：当前场景 enabledTagIds。\n5. 取值逻辑：enabledTagIds 包含即勾选。\n6. 字段说明：启用复选框。\n7. 交互说明：勾选/取消切换状态。\n8. 判断规则：-\n9. 异常规则：停用时禁用。\n10. 其他说明：当前原型映射：标签启用复选框列。"
    },
    {
      "id": "24",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-mapping-col\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签映射本地标签",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "映射本地标签",
        "functionDesc": "把电声原始标签转换为中台统一标签。下拉选项来自同租户类型、同场景下的中台标签集。线索记录和统计分析优先使用映射后的本地标签语义。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "同租户类型+场景下的中台标签集。",
        "valueLogic": "保存后形成供应商标签到本地标签的映射关系，避免不同供应商字段口径不一致。",
        "fieldDesc": "映射本地标签下拉选择框。",
        "interactionDesc": "在下拉框中选择对应的本地标签完成映射。",
        "judgeRule": "",
        "exceptionRule": "无可用本地标签时下拉为空。",
        "otherDesc": "当前原型映射：sys-tags.js 中的映射下拉列。"
      },
      "desc": "1. 功能名称：映射本地标签\n2. 功能说明：将电声原始标签映射到中台统一标签。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：同租户类型+场景下中台标签集。\n5. 取值逻辑：映射后统一业务语义。\n6. 字段说明：映射下拉选择框。\n7. 交互说明：下拉选择对应本地标签。\n8. 判断规则：-\n9. 异常规则：无可用本地标签时为空。\n10. 其他说明：当前原型映射：映射下拉列。"
    },
    {
      "id": "25",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-sort-col\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签排序",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "标签排序",
        "functionDesc": "控制电声标签在配置列表和业务展示中的相对顺序。排序值为不小于 1 的整数，编辑后自动移位同标签池内其他标签保持连续。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "中台标签池中的排序值。",
        "valueLogic": "修改排序后自动移位同标签池内其他标签，保持排序连续不重复。",
        "fieldDesc": "排序输入框：不小于 1 的整数。",
        "interactionDesc": "输入新排序值 → 保存 → 自动移位保持连续。",
        "judgeRule": "排序值必须为不小于 1 的整数。",
        "exceptionRule": "排序为空、非数字或小于 1 时拒绝保存。",
        "otherDesc": "当前原型映射：sys-tags.js 中的排序列。"
      },
      "desc": "1. 功能名称：标签排序\n2. 功能说明：控制标签在列表和业务展示中的顺序。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：中台标签池排序值。\n5. 取值逻辑：修改后自动移位保持连续。\n6. 字段说明：排序输入框（整数>=1）。\n7. 交互说明：输入 → 保存 → 自动移位。\n8. 判断规则：不小于 1 的整数。\n9. 异常规则：空/非数字/<1 拒绝保存。\n10. 其他说明：当前原型映射：排序列。"
    },
    {
      "id": "26",
      "page": "sys-tags",
      "target": "[data-anno=\"sys-tags-tag-action-col\"]",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "电声标签编辑删除",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-010",
        "FLD-011",
        "FLD-012",
        "FLD-013",
        "FLD-014"
      ],
      "sections": {
        "functionName": "标签操作",
        "functionDesc": "编辑或删除电声供应商标签池中的单个标签。编辑时名称不能为空且不能与同供应商标签池内其他标签重名；删除前提示该标签是否被场景启用或被本地标签映射引用。",
        "permissionScope": "继承标签管理页面权限。",
        "dataSource": "中台标签池中的标签数据。",
        "valueLogic": "编辑更新标签名称和属性；删除从标签池中移除。",
        "fieldDesc": "操作列：编辑按钮、删除按钮。",
        "interactionDesc": "点击编辑 → 弹窗修改 → 保存。点击删除 → 二次确认 → 移除。",
        "judgeRule": "编辑时名称不能为空且不可重名；删除前检查引用关系。",
        "exceptionRule": "供应商或场景停用时编辑和删除操作禁用。",
        "otherDesc": "当前原型映射：sys-tags.js 中的操作列。"
      },
      "desc": "1. 功能名称：标签操作\n2. 功能说明：编辑或删除供应商标签。\n3. 权限范围：继承标签管理权限。\n4. 数据来源：中台标签池数据。\n5. 取值逻辑：编辑更新属性；删除从池中移除。\n6. 字段说明：编辑/删除按钮。\n7. 交互说明：编辑 → 弹窗修改；删除 → 二次确认。\n8. 判断规则：名称不可空/不可重名；删除前检查引用。\n9. 异常规则：停用时禁用操作。\n10. 其他说明：当前原型映射：操作列。"
    }
  ]
};
