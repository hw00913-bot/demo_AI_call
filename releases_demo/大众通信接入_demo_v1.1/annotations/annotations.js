window.AnnotationData = {
  "index": [],
  "interaction": [],
  "sys-tenant": [],
  "sys-tags": [
    {
      "id": "1",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-local-root']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "中台标签集",
      "sections": {
        "functionName": "中台标签集",
        "functionDesc": "管理平台统一的标准标签库。按租户类型（门店租户/总部租户）和场景（督办/服务/回访/新线索/冷线索）组织本地标准标签，供应商标签最终需要映射到这些本地标签。",
        "permissionScope": "超级管理员",
        "dataSource": "中台标签配置数据",
        "valueLogic": "每个租户类型+场景组合维护一组独立的标准标签，包含标签编码、名称和排序字段。标签编码按 LOCAL-{租户类型}-{场景编码}-{序号} 规则自动生成。",
        "fieldDesc": "序号、本地编码、本地标签名称、排序、操作（编辑/删除）",
        "interactionDesc": "点击展开租户类型节点，再点击场景节点加载对应标签列表。支持编辑标签名称、新增本地标签、删除本地标签。绿色圆点表示该场景已配置标签数量。",
        "judgeRule": "同一租户类型+场景下，本地标签名称不可重复。删除前校验是否被供应商标签映射引用。",
        "exceptionRule": "场景状态为停用时，新增按钮禁用。被供应商标签映射引用的本地标签不可直接删除。",
        "otherDesc": "与供应商标签集通过「映射本地标签」下拉关联，确保供应商标签统一收敛到中台标准标签。"
      },
      "desc": "1. 功能名称：中台标签集<br>2. 功能说明：管理平台统一的标准标签库。按租户类型和场景组织本地标准标签，供应商标签最终需要映射到这些本地标签。<br>3. 权限范围：超级管理员<br>4. 数据来源：中台标签配置数据<br>5. 取值逻辑：每个租户类型+场景组合维护一组独立的标准标签，包含标签编码、名称和排序字段。标签编码按 LOCAL-{租户类型}-{场景编码}-{序号} 规则自动生成。<br>6. 字段说明：序号、本地编码、本地标签名称、排序、操作（编辑/删除）<br>7. 交互说明：点击展开租户类型节点，再点击场景节点加载对应标签列表。支持编辑标签名称、新增本地标签、删除本地标签。绿色圆点表示该场景已配置标签数量。<br>8. 判断规则：同一租户类型+场景下，本地标签名称不可重复。删除前校验是否被供应商标签映射引用。<br>9. 异常规则：场景状态为停用时，新增按钮禁用。被供应商标签映射引用的本地标签不可直接删除。<br>10. 其他说明：与供应商标签集通过「映射本地标签」下拉关联，确保供应商标签统一收敛到中台标准标签。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "2",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-supplier-root']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "供应商标签集",
      "sections": {
        "functionName": "供应商标签集",
        "functionDesc": "管理各供应商（科大讯飞/冰兰/一知科技/中科金等）的标签池和启用配置。左侧按供应商→租户类型→场景三级结构组织，选择场景后配置该供应商在此场景下启用的标签及映射关系。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签池配置数据",
        "valueLogic": "每个供应商维护独立的标签池（标签编码按 TAG-{供应商编码}-{序号} 规则生成）。在具体场景下，通过 enabledTagIds 配置启用哪些标签。供应商标签通过映射关系关联到中台本地标准标签。",
        "fieldDesc": "启用复选框、序号、本地编码、标签名称、映射本地标签下拉、排序、操作（编辑/保存/取消/删除）",
        "interactionDesc": "展开供应商节点→租户类型节点→场景节点，右侧加载标签配置表格。支持勾选启用/停用标签、编辑标签名称、删除标签、通过下拉选择映射的本地标签。工具栏支持搜索、按启用状态筛选、全选启用/清空启用。",
        "judgeRule": "标签名称在同一供应商标签池内不可重复。删除标签前校验是否被其他配置引用。",
        "exceptionRule": "供应商或场景状态为停用时，启用复选框、编辑和删除按钮均禁用。已启用标签在对应行高亮显示。",
        "otherDesc": "标签编码前缀 TAG-{供应商编码} 确保跨供应商唯一。映射下拉选项来自中台标签集的对应租户类型+场景组合。"
      },
      "desc": "1. 功能名称：供应商标签集<br>2. 功能说明：管理各供应商的标签池和启用配置。左侧按供应商→租户类型→场景三级结构组织，选择场景后配置该供应商在此场景下启用的标签及映射关系。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签池配置数据<br>5. 取值逻辑：每个供应商维护独立的标签池。在具体场景下，通过 enabledTagIds 配置启用哪些标签。供应商标签通过映射关系关联到中台本地标准标签。<br>6. 字段说明：启用复选框、序号、本地编码、标签名称、映射本地标签下拉、排序、操作（编辑/保存/取消/删除）<br>7. 交互说明：展开供应商→租户类型→场景节点，右侧加载标签配置表格。支持勾选启用/停用标签、编辑标签名称、删除标签、通过下拉选择映射的本地标签。工具栏支持搜索、按启用状态筛选、全选启用/清空启用。<br>8. 判断规则：标签名称在同一供应商标签池内不可重复。删除标签前校验是否被其他配置引用。<br>9. 异常规则：供应商或场景状态为停用时，启用复选框、编辑和删除按钮均禁用。<br>10. 其他说明：标签编码前缀 TAG-{供应商编码} 确保跨供应商唯一。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "3",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-scene-config']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "场景配置",
      "sections": {
        "functionName": "场景配置",
        "functionDesc": "管理标签配置中的场景列表。支持查看、新增、编辑、启用/停用和删除场景。场景是标签配置的最低层级，与租户类型组合形成配置单元。",
        "permissionScope": "超级管理员",
        "dataSource": "场景配置数据",
        "valueLogic": "场景包含本地编码（按 SCN-NEW-{序号} 自动生成）、名称和启用/停用状态。场景编码用于本地标签编码和供应商标签编码的生成。",
        "fieldDesc": "序号、本地编码、场景名称、状态（启用/停用）、操作（编辑/保存/取消/启用开关/删除）",
        "interactionDesc": "点击「⚙ 场景配置」按钮打开弹窗。弹窗内展示场景列表表格，支持行内编辑场景名称、切换启用/停用状态、删除场景。底部「+ 新增场景」按钮弹出输入框创建新场景。",
        "judgeRule": "场景名称不可重复。删除场景前校验该场景下是否存在标签配置，有配置时拦截并提示。",
        "exceptionRule": "删除有配置的场景时提示需先清空配置。场景状态变更后左侧树节点同步刷新。",
        "otherDesc": "当前支持 5 个场景：督办(db)、服务(fw)、回访(hf)、新线索(xxs)、冷线索(lxs)。"
      },
      "desc": "1. 功能名称：场景配置<br>2. 功能说明：管理标签配置中的场景列表。支持查看、新增、编辑、启用/停用和删除场景。<br>3. 权限范围：超级管理员<br>4. 数据来源：场景配置数据<br>5. 取值逻辑：场景包含本地编码、名称和启用/停用状态。<br>6. 字段说明：序号、本地编码、场景名称、状态、操作<br>7. 交互说明：点击按钮打开弹窗，支持行内编辑、启用/停用切换、删除场景。底部按钮新增场景。<br>8. 判断规则：场景名称不可重复。删除前校验是否存在标签配置。<br>9. 异常规则：有配置的场景不可删除，需先清空配置。<br>10. 其他说明：当前支持 5 个场景：督办、服务、回访、新线索、冷线索。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "4",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-supplier-mgr']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "供应商管理",
      "sections": {
        "functionName": "供应商管理",
        "functionDesc": "管理智能外呼平台的供应商列表。支持查看、新增、编辑和启用/停用供应商。每个供应商维护独立的标签池，用于外呼结果的意向标签标注。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商配置数据",
        "valueLogic": "供应商包含本地编码（按 SUP-NEW-{序号} 自动生成）、名称、标签池数量和启用/停用状态。标签池数量为只读展示。",
        "fieldDesc": "序号、本地编码、供应商名称、标签数、状态（启用/停用）、操作（编辑/保存/取消/启用开关）",
        "interactionDesc": "点击「🏢 供应商管理」按钮打开弹窗。弹窗内展示供应商列表表格，支持行内编辑名称、切换启用/停用状态。底部「+ 新增供应商」按钮创建新供应商并初始化空标签池。",
        "judgeRule": "供应商名称不可重复。新增供应商时自动创建空的标签池。",
        "exceptionRule": "供应商停用后，对应标签配置中所有启用勾选和编辑按钮禁用。",
        "otherDesc": "当前支持 5 个供应商：科大讯飞(kdxf)、冰兰-vcp(blvcp)、冰兰(bl)、一知科技(yzzh)、中科金(zkj)。新增供应商编码按 SUP-NEW-{序号} 自动生成。"
      },
      "desc": "1. 功能名称：供应商管理<br>2. 功能说明：管理智能外呼平台的供应商列表。支持查看、新增、编辑和启用/停用供应商。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商配置数据<br>5. 取值逻辑：供应商包含本地编码、名称、标签池数量和启用/停用状态。<br>6. 字段说明：序号、本地编码、供应商名称、标签数、状态、操作<br>7. 交互说明：点击按钮打开弹窗，支持行内编辑名称、切换启用/停用状态。底部按钮新增供应商。<br>8. 判断规则：供应商名称不可重复。新增时自动创建空标签池。<br>9. 异常规则：供应商停用后对应配置中操作禁用。<br>10. 其他说明：当前支持 5 个供应商。新增供应商编码按 SUP-NEW-{序号} 自动生成。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "5",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-add-tag']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "新增供应商标签",
      "sections": {
        "functionName": "新增供应商标签",
        "functionDesc": "在当前供应商的标签池中新增标签。新增后的标签出现在该供应商所有场景的标签列表中，默认未启用。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签池",
        "valueLogic": "新标签自动生成本地编码（TAG-{供应商编码}-{序号}），排序值为当前最大排序值+1，platformTagId 预留为空。",
        "fieldDesc": "标签名称（必填）",
        "interactionDesc": "点击按钮弹出输入框，输入标签名称后确认创建。系统校验名称在当前供应商标签池内是否重复。创建成功后刷新当前标签列表。",
        "judgeRule": "标签名称不可与当前供应商标签池内已有标签重复。名称不能为空。",
        "exceptionRule": "当前供应商或场景停用时按钮禁用。",
        "otherDesc": "新增标签默认排序在末尾。需要先选择左侧场景节点才能新增。"
      },
      "desc": "1. 功能名称：新增供应商标签<br>2. 功能说明：在当前供应商的标签池中新增标签。新增后的标签出现在该供应商所有场景的标签列表中，默认未启用。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签池<br>5. 取值逻辑：新标签自动生成本地编码，排序值为当前最大排序值+1。<br>6. 字段说明：标签名称（必填）<br>7. 交互说明：点击按钮弹出输入框，输入标签名称后确认创建。校验名称是否重复。<br>8. 判断规则：标签名称不可与已有标签重复。名称不能为空。<br>9. 异常规则：供应商或场景停用时按钮禁用。<br>10. 其他说明：需要先选择左侧场景节点才能新增。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "6",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-search']",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "搜索标签",
      "sections": {
        "functionName": "搜索标签",
        "functionDesc": "在当前标签列表中按标签名称或本地编码进行实时过滤，快速定位目标标签。",
        "permissionScope": "不涉及权限控制",
        "dataSource": "当前已加载的标签列表数据",
        "valueLogic": "前端实时过滤，输入关键词后筛选标签名称或本地编码包含关键词的行。不区分大小写。",
        "fieldDesc": "输入框，placeholder 为「搜索标签名称/编码」",
        "interactionDesc": "输入文字后页面实时过滤标签列表行，显示匹配的标签。清空输入框恢复完整列表。",
        "judgeRule": "无输入时显示全部标签。",
        "exceptionRule": "无匹配结果时列表为空。",
        "otherDesc": "搜索与状态筛选（全部/已启用/未启用）可叠加使用。"
      },
      "desc": "1. 功能名称：搜索标签<br>2. 功能说明：在当前标签列表中按标签名称或本地编码进行实时过滤。<br>3. 权限范围：不涉及权限控制<br>4. 数据来源：当前已加载的标签列表数据<br>5. 取值逻辑：前端实时过滤，输入关键词后筛选匹配行。<br>6. 字段说明：输入框，placeholder 为「搜索标签名称/编码」<br>7. 交互说明：输入文字后实时过滤，清空恢复完整列表。<br>8. 判断规则：无输入时显示全部标签。<br>9. 异常规则：无匹配结果时列表为空。<br>10. 其他说明：搜索与状态筛选可叠加使用。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "7",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-filter']",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "标签状态筛选",
      "sections": {
        "functionName": "标签状态筛选",
        "functionDesc": "按启用状态筛选标签列表，支持查看全部标签、仅已启用标签或仅未启用标签。",
        "permissionScope": "不涉及权限控制",
        "dataSource": "标签配置的 enabledTagIds 数据",
        "valueLogic": "根据标签ID是否在配置的 enabledTagIds 中判断启用状态。筛选条件与搜索关键词可叠加。",
        "fieldDesc": "下拉选择：全部标签 / 已启用 / 未启用",
        "interactionDesc": "选择筛选项后列表实时刷新。可配合搜索框进一步缩小范围。",
        "judgeRule": "默认选中「全部标签」。",
        "exceptionRule": "无。",
        "otherDesc": "筛选不影响标签数据本身，仅控制前端展示。"
      },
      "desc": "1. 功能名称：标签状态筛选<br>2. 功能说明：按启用状态筛选标签列表，支持查看全部标签、仅已启用标签或仅未启用标签。<br>3. 权限范围：不涉及权限控制<br>4. 数据来源：标签配置的 enabledTagIds 数据<br>5. 取值逻辑：根据标签ID是否在配置的 enabledTagIds 中判断启用状态。<br>6. 字段说明：下拉选择：全部标签 / 已启用 / 未启用<br>7. 交互说明：选择筛选项后列表实时刷新。<br>8. 判断规则：默认选中「全部标签」。<br>9. 异常规则：无。<br>10. 其他说明：筛选不影响标签数据本身，仅控制前端展示。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "8",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-enable-all']",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "全选启用 / 清空启用",
      "sections": {
        "functionName": "全选启用 / 清空启用",
        "functionDesc": "批量操作：一键启用当前供应商标签池中所有标签，或一键清空当前场景的标签启用配置。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签池 + 当前场景配置",
        "valueLogic": "「全选启用」将当前供应商标签池中所有标签的ID写入配置的 enabledTagIds，同时自动推断映射关系到本地标签。「清空启用」将 enabledTagIds 置为空数组。",
        "fieldDesc": "两个按钮：「全选启用」和「清空启用」",
        "interactionDesc": "点击「全选启用」后所有标签行的启用复选框勾选，并自动匹配本地标签映射。点击「清空启用」后所有复选框取消勾选。操作后自动刷新树节点指示器和计数。",
        "judgeRule": "全选启用会触发自动映射推断逻辑。",
        "exceptionRule": "供应商或场景停用时两个按钮均禁用。",
        "otherDesc": "与单个标签的启用/停用操作影响相同的底层数据结构。"
      },
      "desc": "1. 功能名称：全选启用 / 清空启用<br>2. 功能说明：批量操作：一键启用所有标签或一键清空当前配置。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签池 + 当前场景配置<br>5. 取值逻辑：全选启用以所有标签ID覆盖 enabledTagIds；清空启用将 enabledTagIds 置为空。<br>6. 字段说明：两个按钮：「全选启用」和「清空启用」<br>7. 交互说明：点击后批量更新复选框状态，自动刷新指示器和计数。<br>8. 判断规则：全选启用会触发自动映射推断。<br>9. 异常规则：供应商或场景停用时按钮禁用。<br>10. 其他说明：与单个标签启用/停用操作影响相同的底层数据。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "9",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-enable-col']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "标签启用开关",
      "sections": {
        "functionName": "标签启用开关",
        "functionDesc": "勾选或取消勾选以控制单个标签在当前场景配置中的启用状态。启用后的标签将生效于对应的外呼场景。",
        "permissionScope": "超级管理员",
        "dataSource": "场景配置的 enabledTagIds",
        "valueLogic": "勾选时将标签ID添加到当前场景配置的 enabledTagIds 数组并自动匹配本地标签映射；取消勾选时从数组中移除。",
        "fieldDesc": "每行首列的复选框",
        "interactionDesc": "点击复选框切换启用/停用。启用状态的行正常显示，未启用的行半透明显示。操作后自动更新配置计数和树节点指示器。",
        "judgeRule": "无额外校验。",
        "exceptionRule": "供应商或场景停用时复选框禁用。",
        "otherDesc": "与「全选启用/清空启用」操作相同数据结构。"
      },
      "desc": "1. 功能名称：标签启用开关<br>2. 功能说明：勾选或取消勾选以控制单个标签在当前场景配置中的启用状态。<br>3. 权限范围：超级管理员<br>4. 数据来源：场景配置的 enabledTagIds<br>5. 取值逻辑：勾选时添加标签ID到 enabledTagIds；取消时移除。<br>6. 字段说明：每行首列的复选框<br>7. 交互说明：点击切换启用/停用，启用行正常显示，未启用行半透明。<br>8. 判断规则：无额外校验。<br>9. 异常规则：供应商或场景停用时复选框禁用。<br>10. 其他说明：与「全选启用/清空启用」操作相同数据结构。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "10",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-mapping-col']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "映射本地标签",
      "sections": {
        "functionName": "映射本地标签",
        "functionDesc": "将供应商标签映射到中台本地标准标签。映射后的供应商标签在实际外呼结果中会统一转换为中台标准标签，确保跨供应商的意向标签语义一致。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签到本地标签的映射表 + 本地标签集",
        "valueLogic": "下拉选项来自当前租户类型+场景对应的中台本地标签集。选择后记录到映射表中；选择「未映射」清除映射关系。新启用标签时自动推断映射（根据关键词匹配）。",
        "fieldDesc": "下拉选择器，选项格式为「本地编码 / 本地标签名称」",
        "interactionDesc": "点击下拉框选择目标本地标签，选择后立即保存映射关系。映射数量在标题区实时更新。未映射的标签在下拉中显示「未映射」。",
        "judgeRule": "自动映射推断基于标签名称关键词（高/中/低意向等）匹配。手动选择优先于自动推断。",
        "exceptionRule": "供应商或场景停用时下拉框禁用。",
        "otherDesc": "映射是实现供应商标签统一收敛到中台标准标签的核心机制。"
      },
      "desc": "1. 功能名称：映射本地标签<br>2. 功能说明：将供应商标签映射到中台本地标准标签，确保跨供应商的意向标签语义一致。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签到本地标签的映射表 + 本地标签集<br>5. 取值逻辑：下拉选项来自中台本地标签集，选择后记录映射关系。新启用标签时自动推断映射。<br>6. 字段说明：下拉选择器，选项格式为「本地编码 / 本地标签名称」<br>7. 交互说明：点击下拉选择目标本地标签，选择后立即保存。映射数量实时更新。<br>8. 判断规则：自动映射根据标签名称关键词推断，手动选择优先。<br>9. 异常规则：供应商或场景停用时下拉框禁用。<br>10. 其他说明：映射是实现供应商标签统一收敛到中台标准标签的核心机制。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "11",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-action-col']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "标签操作（编辑/删除）",
      "sections": {
        "functionName": "标签操作",
        "functionDesc": "对供应商标签池中的单个标签进行编辑或删除。编辑修改标签名称，删除从标签池和所有关联配置中移除该标签。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签池 + 所有相关配置",
        "valueLogic": "编辑：修改标签名称，更新标签池数据。删除：从标签池移除、从所有场景配置的 enabledTagIds 中移除、从所有映射关系中移除。",
        "fieldDesc": "每行操作列按钮：✏ 编辑 → ✓ 保存 / ✕ 取消；🗑 删除",
        "interactionDesc": "点击「✏ 编辑」进入行内编辑模式，标签名称变为输入框、排序变为数字输入框，确认后保存。修改排序时系统自动移位同标签池内其他标签，保持排序连续不重复。点击「🗑 删除」弹出确认框，确认后执行级联删除。",
        "judgeRule": "编辑时名称不能为空、不可与同供应商标签池内其他标签重名。排序值必须为不小于1的整数，修改后触发移位规则。删除时提示被引用数量。",
        "exceptionRule": "供应商或场景停用时编辑和删除按钮禁用。",
        "otherDesc": "删除操作不可恢复，影响所有关联的配置和映射。排序移位规则详见 memory/business-rules.md。"
      },
      "desc": "1. 功能名称：标签操作<br>2. 功能说明：对供应商标签池中的单个标签进行编辑或删除。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签池 + 所有相关配置<br>5. 取值逻辑：编辑修改标签名称；删除从标签池、所有配置和映射中移除。<br>6. 字段说明：✏ 编辑 → ✓ 保存 / ✕ 取消；🗑 删除<br>7. 交互说明：点击编辑进入行内编辑，名称和排序均可修改；修改排序时自动移位同池内其他标签保持连续。点击删除弹出确认框后级联删除。<br>8. 判断规则：编辑时名称为空或重复则拦截；排序值不小于1的整数，修改触发移位。删除时提示被引用数量。<br>9. 异常规则：供应商或场景停用时按钮禁用。<br>10. 其他说明：删除操作不可恢复。排序移位规则详见 memory/business-rules.md。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "12",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-add-local-tag']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "新增本地标签",
      "sections": {
        "functionName": "新增本地标签",
        "functionDesc": "在当前租户类型+场景下新增中台本地标准标签。新增的本地标签会出现在供应商标签的映射下拉选项中。",
        "permissionScope": "超级管理员",
        "dataSource": "中台本地标签集 MockLocalTagSets",
        "valueLogic": "新标签自动生成本地编码（LOCAL-{租户类型编码}-{场景编码}-{序号}），排序值为当前最大排序值+1。",
        "fieldDesc": "标签名称（必填）",
        "interactionDesc": "点击「新增本地标签」按钮弹出输入框，输入名称后确认创建。校验名称在当前本地标签集内是否重复。创建成功后刷新列表。",
        "judgeRule": "本地标签名称在当前租户类型+场景下不可重复。名称不能为空。",
        "exceptionRule": "场景停用时按钮禁用。",
        "otherDesc": "需要在左侧中台标签集下选择场景节点后操作。"
      },
      "desc": "1. 功能名称：新增本地标签<br>2. 功能说明：在当前租户类型+场景下新增中台本地标准标签。<br>3. 权限范围：超级管理员<br>4. 数据来源：中台本地标签集 MockLocalTagSets<br>5. 取值逻辑：新标签自动生成本地编码，排序值为当前最大排序值+1。<br>6. 字段说明：标签名称（必填）<br>7. 交互说明：点击按钮弹出输入框，输入名称后确认创建。<br>8. 判断规则：本地标签名称在当前租户类型+场景下不可重复。<br>9. 异常规则：场景停用时按钮禁用。<br>10. 其他说明：需要在左侧中台标签集下选择场景节点后操作。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "13",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-scene-modal']",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "场景配置弹窗",
      "sections": {
        "functionName": "场景配置弹窗",
        "functionDesc": "弹窗形式的场景管理界面。展示所有场景列表，支持新增、编辑、启用/停用和删除场景。场景是标签配置体系的最细粒度维度。",
        "permissionScope": "超级管理员",
        "dataSource": "场景配置数据",
        "valueLogic": "同「场景配置」功能。弹窗打开时加载最新场景列表。",
        "fieldDesc": "序号、本地编码、场景名称、状态（启用/停用）、操作按钮",
        "interactionDesc": "从工具栏「⚙ 场景配置」按钮打开。弹窗可拖拽移动、可调整大小。表格内支持行内编辑、状态切换、删除操作。底部「+ 新增场景」按钮新增。",
        "judgeRule": "同「场景配置」功能。",
        "exceptionRule": "同「场景配置」功能。",
        "otherDesc": "弹窗内容区域可滚动。关闭弹窗后自动刷新左侧配置树。"
      },
      "desc": "1. 功能名称：场景配置弹窗<br>2. 功能说明：弹窗形式的场景管理界面。展示所有场景列表，支持新增、编辑、启用/停用和删除场景。<br>3. 权限范围：超级管理员<br>4. 数据来源：场景配置数据<br>5. 取值逻辑：同「场景配置」功能。<br>6. 字段说明：序号、本地编码、场景名称、状态、操作按钮<br>7. 交互说明：从工具栏按钮打开，可拖拽可缩放，表格内行内编辑。<br>8. 判断规则：同「场景配置」功能。<br>9. 异常规则：同「场景配置」功能。<br>10. 其他说明：关闭弹窗后自动刷新左侧配置树。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "14",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-supplier-modal']",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "供应商管理弹窗",
      "sections": {
        "functionName": "供应商管理弹窗",
        "functionDesc": "弹窗形式的供应商管理界面。展示所有供应商列表，支持新增、编辑、启用/停用供应商。每个供应商维护独立的标签池。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商配置数据 + 标签池数据",
        "valueLogic": "同「供应商管理」功能。弹窗打开时加载最新供应商列表，标签数从对应标签池实时计算。",
        "fieldDesc": "序号、本地编码、供应商名称、标签数、状态（启用/停用）、操作按钮",
        "interactionDesc": "从工具栏「🏢 供应商管理」按钮打开。弹窗可拖拽移动、可调整大小。表格内支持行内编辑、状态切换。底部「+ 新增供应商」按钮新增。",
        "judgeRule": "同「供应商管理」功能。",
        "exceptionRule": "同「供应商管理」功能。",
        "otherDesc": "弹窗内容区域可滚动。关闭弹窗后自动刷新左侧配置树。"
      },
      "desc": "1. 功能名称：供应商管理弹窗<br>2. 功能说明：弹窗形式的供应商管理界面。展示所有供应商列表，支持新增、编辑、启用/停用供应商。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商配置数据 + 标签池数据<br>5. 取值逻辑：同「供应商管理」功能。<br>6. 字段说明：序号、本地编码、供应商名称、标签数、状态、操作按钮<br>7. 交互说明：从工具栏按钮打开，可拖拽可缩放，表格内行内编辑。<br>8. 判断规则：同「供应商管理」功能。<br>9. 异常规则：同「供应商管理」功能。<br>10. 其他说明：关闭弹窗后自动刷新左侧配置树。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "15",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-disable-all']",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "清空启用",
      "sections": {
        "functionName": "清空启用",
        "functionDesc": "一键清空当前场景配置中所有已启用的标签，将 enabledTagIds 重置为空数组。",
        "permissionScope": "超级管理员",
        "dataSource": "当前场景配置的 enabledTagIds",
        "valueLogic": "将当前供应商+租户类型+场景组合的 enabledTagIds 设置为空数组，所有标签行变为未启用状态。",
        "fieldDesc": "按钮「清空启用」",
        "interactionDesc": "点击按钮后所有标签复选框取消勾选，行变为半透明，计数归零。树节点指示器变灰。",
        "judgeRule": "无需额外确认，直接执行。",
        "exceptionRule": "供应商或场景停用时按钮禁用。",
        "otherDesc": "与「全选启用」互逆操作。"
      },
      "desc": "1. 功能名称：清空启用<br>2. 功能说明：一键清空当前场景配置中所有已启用的标签。<br>3. 权限范围：超级管理员<br>4. 数据来源：当前场景配置的 enabledTagIds<br>5. 取值逻辑：将 enabledTagIds 设置为空数组。<br>6. 字段说明：按钮「清空启用」<br>7. 交互说明：点击后所有标签复选框取消勾选。<br>8. 判断规则：无需额外确认，直接执行。<br>9. 异常规则：供应商或场景停用时按钮禁用。<br>10. 其他说明：与「全选启用」互逆操作。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "16",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-tag-sort-col']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "排序（供应商模式）",
      "sections": {
        "functionName": "排序",
        "functionDesc": "控制标签在列表中的展示顺序。编辑模式下可修改排序值，系统自动移位同标签池内其他标签，确保排序连续不重复。",
        "permissionScope": "超级管理员",
        "dataSource": "供应商标签池中各标签的 sort 字段",
        "valueLogic": "排序值为整数（≥1）。编辑后触发移位规则：后移时区间内其他标签 sort-1，前移时区间内其他标签 sort+1。新增标签默认排序为当前最大值+1。列表按 sort 升序排列。",
        "fieldDesc": "只读时为数字文本，编辑模式下变为数字输入框（min=1）",
        "interactionDesc": "点击✏编辑后，排序列切换为数字输入框，可直接输入目标排序值。保存时校验值≥1的整数，并执行移位逻辑。取消编辑恢复原值。",
        "judgeRule": "排序值必须为不小于1的整数。编辑后执行 shiftSortValues() 移位，确保同标签池内无重复排序。",
        "exceptionRule": "排序值非整数或小于1时提示错误并拒绝保存。",
        "otherDesc": "中台模式（本地标签集）排序列具有相同的编辑和移位能力。移位规则详见 memory/business-rules.md。"
      },
      "desc": "1. 功能名称：排序<br>2. 功能说明：控制标签在列表中的展示顺序。编辑模式下可修改排序值，系统自动移位同标签池内其他标签。<br>3. 权限范围：超级管理员<br>4. 数据来源：供应商标签池中各标签的 sort 字段<br>5. 取值逻辑：排序值为整数（≥1）。编辑后触发移位规则。新增标签默认排序为当前最大值+1。<br>6. 字段说明：只读时为数字文本，编辑模式下变为数字输入框<br>7. 交互说明：点击编辑后排序切换为输入框，保存时校验并移位，取消恢复原值。<br>8. 判断规则：排序值必须为不小于1的整数。编辑后执行移位确保无重复。<br>9. 异常规则：排序值非整数或小于1时拒绝保存。<br>10. 其他说明：中台模式排序列具有相同的编辑和移位能力。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "17",
      "page": "sys-tags",
      "revision": "2",
      "target": "[data-anno='sys-tags-local-sort-col']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "排序（中台模式）",
      "sections": {
        "functionName": "排序（中台模式）",
        "functionDesc": "控制本地标准标签在列表中的展示顺序。功能与供应商模式排序一致，编辑后自动移位同标签集内其他标签。",
        "permissionScope": "超级管理员",
        "dataSource": "中台本地标签集中各标签的 sort 字段",
        "valueLogic": "与供应商模式排序共用 shiftSortValues() 移位函数，逻辑一致。新增本地标签默认排序为当前最大值+1。",
        "fieldDesc": "只读时为数字文本，编辑模式下变为数字输入框（min=1）",
        "interactionDesc": "与供应商模式一致：点击编辑后切换为输入框，保存时校验并移位，取消恢复原值。",
        "judgeRule": "排序值必须为不小于1的整数。编辑后执行移位确保同标签集内无重复排序。",
        "exceptionRule": "排序值非整数或小于1时提示错误并拒绝保存。",
        "otherDesc": "与供应商模式排序共用同一套移位逻辑。"
      },
      "desc": "1. 功能名称：排序（中台模式）<br>2. 功能说明：控制本地标准标签在列表中的展示顺序，编辑后自动移位。<br>3. 权限范围：超级管理员<br>4. 数据来源：中台本地标签集中各标签的 sort 字段<br>5. 取值逻辑：与供应商模式排序共用移位函数，新增默认最大值+1。<br>6. 字段说明：只读时为数字文本，编辑模式下变为数字输入框<br>7. 交互说明：与供应商模式一致，点击编辑后排序切换为输入框。<br>8. 判断规则：排序值必须为不小于1的整数，编辑后移位确保无重复。<br>9. 异常规则：排序值非整数或小于1时拒绝保存。<br>10. 其他说明：与供应商模式排序共用同一套移位逻辑。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "32",
      "page": "sys-tags",
      "revision": "1",
      "target": "[data-anno='sys-tags-dazhong-manual']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "大众通信手工配置标识",
      "sections": {
        "functionName": "大众通信标签手工配置",
        "functionDesc": "标识大众通信的标签完全由管理员在中台手工维护：不从接口自动读取标签、不使用任何一键自动映射算法。标签的新增、编辑、删除、排序、启停以及到本地标准标签的映射关系均通过界面手动操作完成。",
        "permissionScope": "超级管理员",
        "dataSource": "MockSupplierTagPool['dazhong'] 中的 6 个标签（A-高意向 ~ F-号码无效）",
        "valueLogic": "ensureMappingsForEnabledTags() 函数明确跳过 supplierId === 'dazhong' 的自动映射逻辑。所有大众通信标签的启用和映射必须由管理员逐个手动配置。标签编码按 TAG-DZ-{序号} 规则生成。",
        "fieldDesc": "蓝色提示标签「中台手工配置」，显示在供应商标签集工作区顶部",
        "interactionDesc": "选择大众通信供应商节点后，右侧工作区顶部展示此标识，下方黄色提示条说明「大众通信标签由管理员在中台手工新增、编辑、删除、排序和启停，不从接口自动读取」。",
        "judgeRule": "大众通信标签全量启用（btn-enable-all）时不会触发自动映射推断，映射下拉保持未映射状态。",
        "exceptionRule": "大众通信供应商节点状态为停用时，标签操作按钮全部禁用。",
        "otherDesc": "与一知科技、中科金等其他供应商的自动映射逻辑明确区分。其他供应商启用标签时会自动调用 guessLocalTagId() 推断映射关系。"
      },
      "desc": "1. 功能名称：大众通信标签手工配置<br>2. 功能说明：大众通信标签完全由管理员手工维护，禁止自动映射。<br>3. 权限范围：超级管理员<br>4. 数据来源：MockSupplierTagPool['dazhong']<br>5. 取值逻辑：ensureMappingsForEnabledTags 跳过 dazhong，不触发自动映射。<br>6. 字段说明：蓝色提示标签「中台手工配置」<br>7. 交互说明：选择大众通信节点后展示手工配置提示。<br>8. 判断规则：全量启用不触发自动映射。<br>9. 异常规则：停用时操作禁用。<br>10. 其他说明：与其他供应商的自动映射逻辑明确区分。",
      "sourceRefs": [
        "SRC-002",
        "SRC-003"
      ],
      "fieldRefs": [
        "FLD-002"
      ]
    }
  ],
  "sys-scene": [
    {
      "id": "18",
      "page": "sys-scene",
      "revision": "2",
      "target": "[data-anno='sys-scene-add-btn']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "新增业务场景",
      "sections": {
        "functionName": "新增业务场景",
        "functionDesc": "打开右侧抽屉表单，创建新的外呼业务场景。表单中的智能平台选项和场景类型选项的数据来源于标签管理模块的供应商列表和场景列表。",
        "permissionScope": "超级管理员",
        "dataSource": "智能平台选项 → MockTagSuppliers（标签管理-供应商列表）；场景类型选项 → MockTagScenes（标签管理-场景列表）；可用租户 → MockTenantRows",
        "valueLogic": "智能平台选择后切换对应的平台配置面板（一知科技/中科金智能），显示该平台的场景ID、模型类型等字段。中科金平台默认预设「姓名/name」作为场景传入信息。",
        "fieldDesc": "场景名称、场景编码、场景描述、可用租户（多选）、智能平台（Radio：冰兰/科大讯飞/一知科技/中科金智能）、场景类型（Radio：首访/服务/回访/新线索/冷线索）、数据导入方式、平台专属配置",
        "interactionDesc": "点击按钮从右侧滑入抽屉表单。选择智能平台后联动显示对应平台的配置面板。场景类型、可用租户等字段独立选择。底部「确定」提交，「取消」关闭抽屉。",
        "judgeRule": "智能平台和场景类型为必选项。中科金平台默认插入「姓名/name」字段到场景传入信息表格。",
        "exceptionRule": "平台切换时清空已选的模型类型、重置场景传入信息表格。",
        "otherDesc": "智能平台和场景类型的选项数据应与标签管理模块保持一致。当前为硬编码，未来应改为从 MockTagSuppliers / MockTagScenes 动态读取。"
      },
      "desc": "1. 功能名称：新增业务场景<br>2. 功能说明：打开右侧抽屉表单创建新的外呼业务场景。智能平台和场景类型选项来源于标签管理模块。<br>3. 权限范围：超级管理员<br>4. 数据来源：智能平台→MockTagSuppliers；场景类型→MockTagScenes；可用租户→MockTenantRows<br>5. 取值逻辑：选择智能平台后切换对应平台配置面板。<br>6. 字段说明：场景名称、编码、描述、可用租户、智能平台、场景类型、导入方式、平台专属配置<br>7. 交互说明：点击按钮右侧滑入抽屉，选择平台联动面板切换。<br>8. 判断规则：智能平台和场景类型为必选项。<br>9. 异常规则：平台切换时清空模型类型和场景传入信息。<br>10. 其他说明：平台和场景类型的选项应与标签管理模块保持一致。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "19",
      "page": "sys-scene",
      "revision": "2",
      "target": "[data-anno='sys-scene-platform']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "智能平台选择",
      "sections": {
        "functionName": "智能平台",
        "functionDesc": "选择业务场景所属的智能外呼平台。选项数据来源于标签管理模块的供应商列表（MockTagSuppliers），当前硬编码为：冰兰、科大讯飞、一知科技、中科金智能。",
        "permissionScope": "超级管理员",
        "dataSource": "标签管理模块 → 供应商列表（MockTagSuppliers）。当前为硬编码 Radio 选项，应与供应商列表保持同步。",
        "valueLogic": "选择平台后触发 onPlatformChange()：显示对应平台的配置面板（一知科技面板/中科金智能面板），清空模型类型选择，重置场景传入信息表格。",
        "fieldDesc": "Radio 单选组，选项：冰兰、科大讯飞、一知科技、中科金智能",
        "interactionDesc": "点击 Radio 选项切换平台。切换后下方显示对应平台的专属配置字段（场景ID、模型类型、账号选择等）。",
        "judgeRule": "必选项。切换平台会清空之前已选的模型类型和场景传入信息。",
        "exceptionRule": "未选择平台时，所有平台配置面板隐藏。",
        "otherDesc": "与标签管理模块供应商列表存在数据依赖关系。新增供应商时需同步更新此处的平台选项列表。"
      },
      "desc": "1. 功能名称：智能平台<br>2. 功能说明：选择业务场景所属的智能外呼平台。数据来源于标签管理模块的供应商列表。<br>3. 权限范围：超级管理员<br>4. 数据来源：标签管理模块→MockTagSuppliers，当前硬编码为冰兰/科大讯飞/一知科技/中科金智能<br>5. 取值逻辑：选择后触发平台面板切换。<br>6. 字段说明：Radio 单选组<br>7. 交互说明：点击切换平台，联动显示专属配置面板。<br>8. 判断规则：必选项，切换时清空模型类型和场景传入信息。<br>9. 异常规则：未选择时平台配置面板隐藏。<br>10. 其他说明：与标签管理供应商列表存在数据依赖，新增供应商需同步更新。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "20",
      "page": "sys-scene",
      "revision": "2",
      "target": "[data-anno='sys-scene-scene-type']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "场景类型选择",
      "sections": {
        "functionName": "场景类型",
        "functionDesc": "选择业务场景的类型分类。选项数据来源于标签管理模块的场景列表（MockTagScenes），当前硬编码为：首访、服务、回访、新线索、冷线索，与标签管理场景（督办/服务/回访/新线索/冷线索）对应。",
        "permissionScope": "超级管理员",
        "dataSource": "标签管理模块 → 场景列表（MockTagScenes）。当前为硬编码 Radio 选项，应与场景列表保持同步。",
        "valueLogic": "场景类型决定外呼任务的业务属性。标签管理模块中场景编码（db/fw/hf/xxs/lxs）用于标签配置的维度划分。",
        "fieldDesc": "Radio 单选组，选项：首访、服务、回访、新线索、冷线索",
        "interactionDesc": "点击 Radio 选项选择场景类型。",
        "judgeRule": "必选项。",
        "exceptionRule": "无。",
        "otherDesc": "与标签管理模块场景列表存在数据依赖关系。「首访」对应标签管理中的「督办(db)」场景。新增场景时需同步更新此处的类型选项列表。"
      },
      "desc": "1. 功能名称：场景类型<br>2. 功能说明：选择业务场景的类型分类。数据来源于标签管理模块的场景列表。<br>3. 权限范围：超级管理员<br>4. 数据来源：标签管理模块→MockTagScenes，当前硬编码为首访/服务/回访/新线索/冷线索<br>5. 取值逻辑：场景类型决定外呼任务的业务属性。<br>6. 字段说明：Radio 单选组<br>7. 交互说明：点击选择场景类型。<br>8. 判断规则：必选项。<br>9. 异常规则：无。<br>10. 其他说明：与标签管理场景列表存在数据依赖，首访对应督办(db)。新增场景需同步更新。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-001"
      ]
    },
    {
      "id": "21",
      "page": "sys-scene",
      "revision": "2",
      "target": "[data-anno='sys-scene-dazhong-taskid']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "大众通信任务关联 (UUID + 模型 + 账号)",
      "sections": {
        "functionName": "大众通信任务ID关联与模型账号配置",
        "functionDesc": "在大众通信 SaaS 创建并配置好外呼任务（重呼、并发、呼叫时间、线路等策略）后，将任务的 uuid 粘贴到此处完成关联。中台保留模型类型和账号选择，用于保证中台业务场景表的数据一致性。",
        "permissionScope": "超级管理员",
        "dataSource": "大众通信 SaaS 创建的任务 uuid + 中台模型类型/账号配置",
        "valueLogic": "必填大众通信任务 uuid。选择大模型或小模型（dzModelType）后，级联展示并联动大众通信默认账号下拉。模型类型和账号数据写入中台业务场景表，与实际外呼使用的接口版本解耦。",
        "fieldDesc": "大众通信任务ID 文本输入框（uuid 格式）、模型类型单选组（大模型/小模型）、账号下拉选择器（默认账号）",
        "interactionDesc": "在输入框中填入大众通信外呼任务 uuid。下方有蓝色提示条说明需先在大众通信后台创建任务。选择大模型或小模型后展示账号下拉框。切换平台时自动清空所有已填配置并隐藏面板。",
        "judgeRule": "任务 uuid 为必填项。选择模型类型后才展示并选择具体账号。",
        "exceptionRule": "切换智能平台至一知科技、中科金智能或其他平台时，自动清空大众通信面板已填内容、已选模型和账号并隐藏。",
        "otherDesc": "重呼、并发、呼叫时间、线路等策略在大众通信 SaaS 配置，中台只读展示。模型类型和账号字段保留是为了中台表字段一致性，不是用来控制外呼接口版本。"
      },
      "desc": "1. 功能名称：大众通信任务ID关联与模型账号配置<br>2. 功能说明：关联 uuid，保留模型类型和账号选择以保证中台表一致性。<br>3. 权限范围：超级管理员<br>4. 数据来源：SaaS uuid + 中台模型/账号配置<br>5. 取值逻辑：必填 uuid，选择模型后级联展示账号。<br>6. 字段说明：任务ID输入框、模型类型Radio、账号下拉<br>7. 交互说明：填入 uuid 保存，选模型展账号，切换平台清空隐藏。<br>8. 判断规则：uuid 必填，选模型后才可选账号。<br>9. 异常规则：切换平台清空所有已填配置。<br>10. 其他说明：模型和账号为中台表一致性保留，非控制接口版本。",
      "sourceRefs": [
        "SRC-001",
        "SRC-005"
      ],
      "fieldRefs": [
        "FLD-004",
        "FLD-008"
      ]
    },
    {
      "id": "31",
      "page": "sys-scene",
      "revision": "1",
      "target": "[data-anno='sys-scene-dazhong-taskid-runtime']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 4
      },
      "title": "大众通信任务 UUID 输入框（运行时）",
      "sections": {
        "functionName": "大众通信任务 UUID 运行时输入",
        "functionDesc": "新建或编辑业务场景时，选择「大众通信」平台后展示的 UUID 输入框。由 upgradeDazhongPanel() 动态替换面板内容，与静态标注点独立。",
        "permissionScope": "超级管理员",
        "dataSource": "用户手动输入的大众通信任务 uuid",
        "valueLogic": "输入值用于保存时生成 sceneId（优先取 uuid，无 uuid 时自动生成 DZ+时间戳）。关联后该场景下的通话记录通过 uuid 归集大众通信数据。",
        "fieldDesc": "文本输入框，placeholder 为「请输入任务 uuid」",
        "interactionDesc": "点击输入框输入大众通信 SaaS 中创建的任务 uuid。输入后点击「确定」保存，系统将 uuid 作为 sceneId 写入 MockSceneList。",
        "judgeRule": "保存时非空校验，为空时提示「请输入大众通信任务 uuid」。格式不做严格校验。",
        "exceptionRule": "无。",
        "otherDesc": "该输入框与静态标注点 sys-scene-dazhong-taskid 对应同一功能，由抽屉打开时 upgradeDazhongPanel() 动态生成。"
      },
      "desc": "1. 功能名称：大众通信任务 UUID 运行时输入<br>2. 功能说明：选择「大众通信」后展示的 UUID 输入框，由 upgradeDazhongPanel() 动态生成。<br>3. 权限范围：超级管理员<br>4. 数据来源：用户手动输入<br>5. 取值逻辑：输入值用于保存时生成 sceneId。<br>6. 字段说明：文本输入框<br>7. 交互说明：输入 uuid 后保存关联。<br>8. 判断规则：保存时非空校验。<br>9. 异常规则：无。<br>10. 其他说明：由 upgradeDazhongPanel() 动态替换面板内容。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-004"
      ]
    }
  ],
  "result-clue": [
    {
      "id": "22",
      "page": "result-clue",
      "revision": "1",
      "target": "[data-anno='result-clue-scene-filter']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 6
      },
      "title": "场景名称",
      "sections": {
        "functionName": "场景名称筛选",
        "functionDesc": "用于在线索记录中选择具体外呼场景，并驱动后续「最后通话用户意向级别」筛选项的显示和取值范围。",
        "permissionScope": "当前登录账号可查看的线索记录范围。不同账号只能看到其租户权限范围内可访问的场景。",
        "dataSource": "业务场景列表 + 当前登录账号租户信息 + 标签管理中的供应商标签集配置。",
        "valueLogic": "场景名称下拉先按登录账号的租户类型过滤可访问场景；用户选中具体场景名称后，系统读取该业务场景关联的场景类型，再用「登录账号租户类型 + 场景类型」作为查询条件，查询对应供应商标签集中已配置/已启用的标签。最后通话用户意向级别的可选项来自这些供应商标签映射后的意向标签集合。",
        "fieldDesc": "下拉选择框；默认值为「请选择」。选中具体场景后，才展示并加载「最后通话用户意向级别」。",
        "interactionDesc": "未选择场景名称时，隐藏最后通话用户意向级别筛选项；选择场景名称后，显示该筛选项，并按当前场景对应的供应商标签结果刷新级别选项；重置筛选时清空场景并隐藏级别筛选。",
        "judgeRule": "必须选中具体场景名称后才能使用最后通话用户意向级别筛选；仅按当前登录账号租户类型和场景类型有关联的供应商标签生成级别选项。",
        "exceptionRule": "若选中场景未配置场景类型、未关联供应商标签，或当前租户类型下没有可用供应商标签，则最后通话用户意向级别只显示空选项或保持不可选。",
        "otherDesc": "该逻辑与标签管理页的「供应商标签集」配置相关：供应商标签集按供应商、租户类型、场景类型维护，线索记录页只消费已建立的标签配置和映射结果。"
      },
      "desc": "1. 功能名称：场景名称筛选<br>2. 功能说明：用于在线索记录中选择具体外呼场景，并驱动「最后通话用户意向级别」筛选项。<br>3. 权限范围：当前登录账号可查看的租户范围。<br>4. 数据来源：业务场景列表、登录账号租户信息、标签管理中的供应商标签集配置。<br>5. 取值逻辑：场景名称先按登录账号租户类型过滤；选中具体场景后，读取该场景关联的场景类型，再按「登录账号租户类型 + 场景类型」查询对应关联的供应商标签，最后通话用户意向级别取这些供应商标签映射后的意向标签集合。<br>6. 字段说明：下拉选择框，默认「请选择」。<br>7. 交互说明：未选场景时隐藏最后通话用户意向级别；选中场景后显示并刷新级别选项；重置后恢复隐藏。<br>8. 判断规则：必须选中具体场景后才能使用级别筛选。<br>9. 异常规则：无关联供应商标签时，级别选项为空或不可选。<br>10. 其他说明：该逻辑消费标签管理页供应商标签集的配置和映射结果。",
      "sourceRefs": [
        "SRC-001",
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-002"
      ]
    }
  ],
  "result-records": [
    {
      "id": "23",
      "page": "result-records",
      "revision": "2",
      "target": "[data-anno='result-records-header']",
      "position": {
        "placement": "bottom-left",
        "offsetX": 0,
        "offsetY": 6
      },
      "title": "通话记录页面 -- 平台筛选与大众通信回调",
      "sections": {
        "functionName": "通话记录列表与大众通信回调准入",
        "functionDesc": "通话记录列表主控制区，支持按智能平台（一知科技/中科金智能/大众通信）筛选。大众通信记录由通话结束回调落库：收到回调 callid 才产生通话记录，未收到回调不展示。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockCallRecordRows（通话记录表），大众通信记录通过 DazhongTaskUuidByScene 按场景名称归集 uuid",
        "valueLogic": "大众通信通话状态码（0-12）通过 formatDazhongCallStatus() 映射为中文标签展示。筛选时按 displayStatus 匹配。列表默认将大众通信数据置顶。",
        "fieldDesc": "用户号码、通话开始/结束时间、通话时长、场景名称、关联任务ID、通话状态、外呼总结、智能平台、最后通话节点、操作",
        "interactionDesc": "通过智能平台下拉筛选大众通信后查询。大众通信记录行展示 13 种状态码的中文解析。支持按开始/结束时间排序。点击「详情」打开通话详情弹窗。",
        "judgeRule": "仅当 item.callid 存在时才展示大众通信记录（表示已收到回调）。无 callid 的记录被过滤不展示。",
        "exceptionRule": "未知状态码（0-12 范围外）显示原数值，中台归并显示「未知状态」。详情查询未命中时提示稍后重试。",
        "otherDesc": "通话详情通过 recordid=callid 查询 MockDazhongCallDetailByRecordId。外呼小结先展示大众组件总结，缺失时展示百炼智能体总结。"
      },
      "desc": "1. 功能名称：通话记录列表与大众通信回调准入<br>2. 功能说明：支持按平台筛选，大众通信记录依赖回调 callid 才落库展示。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockCallRecordRows + 大众通信回调<br>5. 取值逻辑：13 种状态码映射中文标签，无 callid 不展示记录。<br>6. 字段说明：号码、时间、时长、场景、任务ID、状态、总结、平台、节点<br>7. 交互说明：筛选平台后查询，点击详情打开弹窗。<br>8. 判断规则：callid 存在才展示大众通信记录。<br>9. 异常规则：未知码显示原值，详情未命中提示重试。<br>10. 其他说明：详情通过 recordid=callid 查询，总结优先大众组件。",
      "sourceRefs": [
        "SRC-001",
        "SRC-005"
      ],
      "fieldRefs": [
        "FLD-001",
        "FLD-004",
        "FLD-014"
      ]
    },
    {
      "id": "24",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-audio']",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 6
      },
      "title": "会话录音与语音回放",
      "sections": {
        "functionName": "会话音频播放器及转写文本",
        "functionDesc": "通话详情弹窗左侧，用于播放智能外呼期间的录音片段，展示人机对话的详细文本上下文。",
        "permissionScope": "超级管理员/门店客服",
        "dataSource": "会话录音及转写文本",
        "valueLogic": "点击播放播放音频流，下方实时对应渲染对话气泡文本，标明AI与客户的对话次序。",
        "fieldDesc": "播放控制条、转写文本展示区",
        "interactionDesc": "点击播放暂停，可自由拖拽滚动条，对话文本可同步高亮显示或滚动定位。",
        "judgeRule": "非空则加载音频数据。",
        "exceptionRule": "音频丢失时提示无法播放。",
        "otherDesc": "语音回放是验证AI意向判定正确性的最直观依据。"
      },
      "desc": "1. 功能名称：会话音频播放器及转写文本<br>2. 功能说明：通话详情弹窗左侧，用于播放智能外呼期间的录音片段，展示人机对话的详细文本上下文。<br>3. 权限范围：超级管理员/门店客服<br>4. 数据来源：会话录音及转写文本<br>5. 取值逻辑：点击播放播放音频流，下方实时对应渲染对话气泡文本。<br>6. 字段说明：播放控制条、转写文本展示区。<br>7. 交互说明：点击播放暂停，可自由拖拽滚动条，对话文本可同步滚动。<br>8. 判断规则：非空则加载音频数据。<br>9. 异常规则：音频丢失时提示无法播放。<br>10. 其他说明：语音回放是验证AI意向判定正确性的最直观依据。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-003"
      ]
    },
    {
      "id": "25",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-summary']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 6
      },
      "title": "外呼小结与AI标签",
      "sections": {
        "functionName": "外呼结果概括和小结展示",
        "functionDesc": "通话详情弹窗右侧，提取的外呼大模型意向标注及本次会话的详细文本小结（由智能中台基于供应商返回的最后节点与翻译文本自动概括）。",
        "permissionScope": "超级管理员/门店客服",
        "dataSource": "外呼大盘会话提取数据",
        "valueLogic": "大模型概括的中文段落结合意向标签（大众通信映射转换后的级别）进行结构化显示。",
        "fieldDesc": "外呼小结文本域、意向标签文本标签",
        "interactionDesc": "只读显示，在弹窗打开时加载展现，提供一目了然的会话要点。",
        "judgeRule": "无。",
        "exceptionRule": "无提取内容时展示占位符横杠。",
        "otherDesc": "此处的意向标签经过了中台本地标签的映射转换展示。"
      },
      "desc": "1. 功能名称：外呼结果概括和小结展示<br>2. 功能说明：通话详情弹窗右侧，提取的外呼大模型意向标注及本次会话的详细文本小结。<br>3. 权限范围：超级管理员/门店客服<br>4. 数据来源：外呼大盘会话提取数据<br>5. 取值逻辑：大模型概括的中文段落结合意向标签进行结构化显示。<br>6. 字段说明：外呼小结文本域、意向标签文本标签。<br>7. 交互说明：只读显示，在弹窗打开时加载展现。<br>8. 判断规则：无。<br>9. 异常规则：无提取内容时展示占位符。<br>10. 其他说明：此处的意向标签经过了中台本地标签的映射转换展示。",
      "sourceRefs": [
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-002"
      ]
    },
    {
      "id": "26",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-fields']",
      "position": {
        "placement": "bottom-right",
        "offsetX": 0,
        "offsetY": 6
      },
      "title": "线索基本信息字段",
      "sections": {
        "functionName": "呼叫会话详细基础字段",
        "functionDesc": "通话详情弹窗右下侧，用以展示当前被呼叫客户的系统详情（手机号、位置、开始/结束时间等）。",
        "permissionScope": "超级管理员/门店客服",
        "dataSource": "呼叫会话记录基础库",
        "valueLogic": "展示主叫号码、被叫位置、通话发起和切断时间等只读详细参数。",
        "fieldDesc": "包括主叫、被叫、主叫归属、被叫归属、持续时间等基础表单行",
        "interactionDesc": "只读展示，不可编辑。",
        "judgeRule": "无。",
        "exceptionRule": "部分字段缺失时显示空或未知。",
        "otherDesc": "作为排查客诉或呼叫异常的底表参照数据。"
      },
      "desc": "1. 功能名称：呼叫会话详细基础字段<br>2. 功能说明：通话详情弹窗右下侧，展示被呼叫客户的手机、主叫、时间、归属地等基础属性字段。<br>3. 权限范围：超级管理员/门店客服<br>4. 数据来源：呼叫会话记录基础库。<br>5. 取值逻辑：展示只读详细参数。<br>6. 字段说明：包括主叫、被叫、主叫归属、被叫归属、持续时间等基础属性表单行。<br>7. 交互说明：只读展示，不可编辑。<br>8. 判断规则：无。<br>9. 异常规则：无。<br>10. 其他说明：作为排查客诉或呼叫异常的底表参照数据。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-004"
      ]
    },
    {
      "id": "33",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-task-filter']",
      "position": { "placement": "bottom-right", "offsetX": 0, "offsetY": 4 },
      "title": "大众通信任务 UUID 筛选",
      "sections": {
        "functionName": "关联任务 ID 筛选",
        "functionDesc": "通话记录筛选栏提供「关联任务 ID」输入框，按大众通信任务 uuid 查询该任务下的所有通话记录。其他平台的记录不展示此字段或显示「-」。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "通话记录的 taskUuid 字段，由 DazhongTaskUuidByScene 按场景名称映射注入",
        "valueLogic": "输入 uuid 后点击查询，前端过滤 item.taskUuid 包含关键字的记录。大众通信记录的 taskUuid 在页面初始化时映射。",
        "fieldDesc": "文本输入框，placeholder 为「请输入大众任务 uuid」",
        "interactionDesc": "输入大众通信任务 uuid（或部分 uuid）后点击查询，列表实时过滤。",
        "judgeRule": "按 taskUuid 字符串包含匹配过滤。仅大众通信记录有此字段有值。",
        "exceptionRule": "输入不存在的 uuid 时列表为空。非大众通信记录 taskUuid 显示「-」。",
        "otherDesc": "与通话统计页面的场景名称筛选配合，按任务维度追踪通话结果。"
      },
      "desc": "1. 功能名称：关联任务 ID 筛选<br>2. 功能说明：按大众通信任务 uuid 过滤通话记录。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：taskUuid，由 DazhongTaskUuidByScene 映射<br>5. 取值逻辑：输入 uuid 后前端按包含匹配过滤。<br>6. 字段说明：文本输入框<br>7. 交互说明：输入 uuid 查询过滤。<br>8. 判断规则：按 taskUuid 包含匹配。<br>9. 异常规则：不存在时列表为空。<br>10. 其他说明：与通话统计配合追踪任务维度结果。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-004"]
    },
    {
      "id": "34",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-recording-player']",
      "position": { "placement": "top-left", "offsetX": 0, "offsetY": 0 },
      "title": "大众通信录音播放器",
      "sections": {
        "functionName": "大众通信通话录音与文本区",
        "functionDesc": "通话详情弹窗左侧的通话录音和文本区域。大众通信录音来自回调 recordingUrl，通话文本来自详情 records 数组。播放器和文本气泡组合展示。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "录音：回调 recordingUrl；文本：详情 records[].question（客户）/ answer_content（AI客服）",
        "valueLogic": "录音播放器仅在 recordingUrl 存在时渲染。通话文本按 sequence 排序，过滤已有 asrmessage_notify 的 asrprogress_notify 中间结果，清理 <break> 等 SSML 标签。question=客户发言，answer_content=AI客服发言。",
        "fieldDesc": "录音播放器（播放/暂停/进度/音量）、对话气泡（客户/AI客服角色标签+文本）",
        "interactionDesc": "点击播放/暂停按钮控制录音（模拟播放计时每秒前进）。对话文本以聊天气泡样式展示，标明角色标签。",
        "judgeRule": "无 recordingUrl 时展示「本次未生成录音」。records 为空时展示「本次通话未生成对话文本」。",
        "exceptionRule": "未接通记录通常无录音和对话文本，显示对应空状态提示。",
        "otherDesc": "SSML 标签在渲染前清除。asrmessage_notify 最终结果覆盖同 question_index 的 asrprogress_notify 中间结果。bridge_status 存在时角色标记为「人工客服」。"
      },
      "desc": "1. 功能名称：大众通信录音与文本区<br>2. 功能说明：详情左侧展示录音播放器和对话文本，录音来自回调，文本来自详情 records。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：回调 recordingUrl + 详情 records 数组<br>5. 取值逻辑：录音有则展示，文本按 seq 排序过滤中间结果清 SSML。<br>6. 字段说明：播放器控件、对话气泡<br>7. 交互说明：点击播放/暂停，文本以气泡展示。<br>8. 判断规则：无录音/文本展示空状态提示。<br>9. 异常规则：未接通通常无录音和文本。<br>10. 其他说明：SSML 标签渲染前清除，中间结果被最终结果覆盖。",
      "sourceRefs": ["SRC-005"],
      "fieldRefs": ["FLD-015"]
    },
    {
      "id": "35",
      "page": "result-records",
      "revision": "1",
      "target": "[data-anno='result-records-transcript-view']",
      "position": { "placement": "bottom-left", "offsetX": 0, "offsetY": 6 },
      "title": "大众通信通话文本视图",
      "sections": {
        "functionName": "通话文本对话视图",
        "functionDesc": "通话详情弹窗左侧下方的通话文本区域，以聊天气泡形式展示客户与 AI 客服的对话内容。文本从大众通信详情 records 数组中提取并处理。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "大众通信详情 records[].question / answer_content",
        "valueLogic": "extractDazhongDialogRows() 处理 records：按 sequence 排序，过滤已有最终结果 asrmessage_notify 的同 question_index 中间结果 asrprogress_notify，cleanTranscriptText() 清除 SSML 标签。",
        "fieldDesc": "对话气泡列表，每行包含角色标签（客户/AI客服）和文本内容",
        "interactionDesc": "滚动查看完整对话。气泡按角色区分样式。",
        "judgeRule": "records 为空或无有效对话内容时展示「本次通话未生成对话文本」。",
        "exceptionRule": "仅 asrprogress_notify 而无 asrmessage_notify 的记录，中间结果保留展示。",
        "otherDesc": "与线索记录中的通话文本共享 extractDazhongDialogRows() 处理逻辑。"
      },
      "desc": "1. 功能名称：通话文本对话视图<br>2. 功能说明：以聊天气泡展示客户与 AI 对话，文本从详情 records 提取处理。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：records[].question / answer_content<br>5. 取值逻辑：按 seq 排序过滤中间结果清 SSML。<br>6. 字段说明：对话气泡（角色+文本）<br>7. 交互说明：滚动查看对话。<br>8. 判断规则：无有效内容展示空状态。<br>9. 异常规则：仅有中间结果时保留。<br>10. 其他说明：与线索记录共享处理逻辑。",
      "sourceRefs": ["SRC-005"],
      "fieldRefs": ["FLD-015"]
    }
  ],
  "scene-list": [
    {
      "id": "27",
      "page": "scene-list",
      "revision": "1",
      "target": "[data-anno='scene-list-dazhong-readonly']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "大众通信任务卡片 -- 部分只读 + 手动导入",
      "sections": {
        "functionName": "大众通信外呼任务卡片控制",
        "functionDesc": "展示大众通信外呼任务卡片及其远端任务状态。卡片上的编辑按钮及更多菜单（删除/暂停/终止/启动）保持置灰不可点击；但呼叫名单中的手动导入功能对所有平台开放。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "大众通信 API 2.0 数据（task_type=7），Mock 数据库",
        "valueLogic": "远端状态 status 解析为：1=用户暂停、2=进行中、3=未开始。卡片编辑和更多菜单保持禁用（title 提示前往 SaaS），但呼叫名单→已分配→手动导入按钮对所有平台可用，支持 CSV 文件上传，大众通信单次最多导入 100 条。",
        "fieldDesc": "任务名称、平台标识（大众通信）、远端状态点、关联任务 ID (uuid)、卡片操作按钮组（编辑置灰）、更多菜单（全部置灰）",
        "interactionDesc": "编辑按钮 disabled 且 title 提示「请前往大众通信 SaaS 编辑」。更多菜单各项均置灰。点击「查看」打开详情抽屉，切换到呼叫名单→已分配 Tab 可使用手动导入。",
        "judgeRule": "大众通信任务策略（重呼/并发/线路等）全在大众通信 SaaS 配置。中台侧卡片编辑和更多菜单防误操作，但手动导入对超管开放。大众通信导入限制 100 条/次。",
        "exceptionRule": "导入超过 100 条时拦截并提示拆分文件。重新上传会覆盖原有号码。",
        "otherDesc": "数据概览与意向洞察统一按大众 1-6 映射展示完整等级名称（A-高意向 ~ F-号码无效）。大众通信列表默认置顶。"
      },
      "desc": "1. 功能名称：大众通信外呼任务卡片控制<br>2. 功能说明：展示大众通信任务卡片，编辑/更多菜单置灰，手动导入对所有平台开放。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：大众通信 API 2.0 数据，Mock 数据库。<br>5. 取值逻辑：远端状态解析为 1=用户暂停、2=进行中、3=未开始。导入限制 100 条。<br>6. 字段说明：任务名称、平台标识、远端状态、uuid、操作按钮。<br>7. 交互说明：编辑和更多菜单置灰，查看打开详情，呼叫名单支持手动导入。<br>8. 判断规则：策略在 SaaS 配置，中台防误操作。<br>9. 异常规则：导入超 100 条拦截提示。<br>10. 其他说明：大众通信列表默认置顶。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-003",
        "FLD-004",
        "FLD-008"
      ]
    },
    {
      "id": "28",
      "page": "scene-list",
      "revision": "1",
      "target": "[data-anno='scene-list-task-detail']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "大众通信任务详情 (API v2 / 大模型 3.0)",
      "sections": {
        "functionName": "大众通信任务详情只读抽屉",
        "functionDesc": "抽屉形式展示大众通信新版 2.0 外呼任务编辑接口返回的 new_task_extra 及 3.0 大模型信息。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "GET /agent-api/new/user/{user_id}/task/{task_id}/edit 返回的 new_task_extra 字段",
        "valueLogic": "聚合为单列只读信息行展示 7 项业务字段：任务名称、话术名称、任务 ID、任务描述、拨打时段、AI 坐席和自动重拨设置。自动重拨内完整展示启用状态、首次外呼优先、间隔、次数、挂断原因与对话状态。",
        "fieldDesc": "单列业务信息行（只读文本）",
        "interactionDesc": "点击任务卡片「查看」呼出右侧抽屉，包含「任务详情」Tab，信息全只读展示。",
        "judgeRule": "接口未返回或未定义的字段统一显示「-」。",
        "exceptionRule": "不再兼容或读取旧版 2.0 的 task_extras 数据。",
        "otherDesc": "不展示中台外呼进度条或启动方式等外部接口未定义的控件与字段。"
      },
      "desc": "1. 功能名称：大众通信任务详情只读抽屉<br>2. 功能说明：抽屉形式展示大众通信新版 2.0 外呼任务编辑接口返回的 new_task_extra 及 3.0 大模型信息。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：new_task_extra 字段。<br>5. 取值逻辑：展示任务名称、话术名称、任务 ID、描述、拨打时段、AI 坐席及自动重拨 7 项字段。<br>6. 字段说明：单列业务信息行。<br>7. 交互说明：点击卡片查看呼出右侧抽屉，信息只读。<br>8. 判断规则：接口未返回字段显示「-」。<br>9. 异常规则：不兼容旧版 2.0 task_extras。<br>10. 其他说明：详见文档说明。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-003",
        "FLD-005",
        "FLD-006",
        "FLD-007",
        "FLD-011",
        "FLD-012",
        "FLD-013"
      ]
    },
    {
      "id": "29",
      "page": "scene-list",
      "revision": "1",
      "target": "[data-anno='scene-list-card-grid']",
      "position": {
        "placement": "top-left",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "外呼任务列表网格",
      "sections": {
        "functionName": "外呼任务卡片平铺列表",
        "functionDesc": "展示当前业务场景下挂载的所有外呼任务卡片（包括一知科技、中科金智能和大众通信）。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "智能外呼中台外呼任务库，Mock 数据库",
        "valueLogic": "按场景分组聚合展示多平台任务卡片，默认置顶大众通信任务。",
        "fieldDesc": "任务卡片列表网格",
        "interactionDesc": "平铺展示任务卡片，支持点击卡片进入详情和操作按钮。",
        "judgeRule": "根据任务所属平台应用不同的控制逻辑与展示模式。",
        "exceptionRule": "无任务时展示空状态提示。",
        "otherDesc": "大众通信任务置顶居首呈现。"
      },
      "desc": "1. 功能名称：外呼任务卡片平铺列表<br>2. 功能说明：展示当前场景下挂载的所有外呼任务卡片。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：外呼任务库 Mock 数据库。<br>5. 取值逻辑：平铺展示任务卡片，默认置顶大众通信任务。<br>6. 字段说明：任务卡片列表网格。<br>7. 交互说明：点击卡片进入详情和对应操作。<br>8. 判断规则：按所属平台应用对应控制逻辑。<br>9. 异常规则：无任务时展示空态。<br>10. 其他说明：大众通信任务置顶呈现。",
      "sourceRefs": [
        "SRC-001"
      ],
      "fieldRefs": [
        "FLD-004"
      ]
    },
    {
      "id": "30",
      "page": "scene-list",
      "revision": "1",
      "target": "[data-anno='scene-list-data-overview']",
      "position": {
        "placement": "top-right",
        "offsetX": 0,
        "offsetY": 0
      },
      "title": "大众通信任务数据概览 (A-F 意向洞察)",
      "sections": {
        "functionName": "大众通信数据概览与意向洞察",
        "functionDesc": "展示大众通信外呼任务的触达数据、意向分类及 A-F 意向洞察分布图。",
        "permissionScope": "话务运营人员",
        "dataSource": "大众通信外呼结果汇总",
        "valueLogic": "意向分类指标卡、配置下拉及环形分布图统一使用 1-6 数值映射的 A-高意向、B-意向客户、C-潜在客户、D-一般意向、E-需再次跟进、F-号码无效完整枚举。",
        "fieldDesc": "意向分类指标卡、意向洞察环形图",
        "interactionDesc": "点击意向分类下拉框可切换统计维度，右侧图表同步更新分布比例。",
        "judgeRule": "大众任务仅能使用 6 个标准大众枚举，非大众任务沿用原平台枚举。",
        "exceptionRule": "无数据时图表显示空数据占位。",
        "otherDesc": "支持配置前 3 项核心意向指标展示在卡片顶部。"
      },
      "desc": "1. 功能名称：大众通信数据概览与意向洞察<br>2. 功能说明：展示大众通信任务的触达数据、意向分类及 A-F 意向洞察分布图。<br>3. 权限范围：话务运营人员<br>4. 数据来源：大众通信外呼结果汇总。<br>5. 取值逻辑：意向分类及分布图统一按 A-F 枚举展现。<br>6. 字段说明：意向分类指标卡、意向洞察图。<br>7. 交互说明：下拉框切换分类维度，图表同步更新。<br>8. 判断规则：仅能使用 6 个标准大众枚举。<br>9. 异常规则：无数据时显示空数据。<br>10. 其他说明：详见文档说明。",
      "sourceRefs": [
        "SRC-002"
      ],
      "fieldRefs": [
        "FLD-002"
      ]
    },
    {
      "id": "36",
      "page": "scene-list",
      "revision": "1",
      "target": "[data-anno='scene-list-call-list']",
      "position": { "placement": "top-left", "offsetX": 0, "offsetY": 0 },
      "title": "呼叫名单 -- 已分配/待呼叫/已呼叫",
      "sections": {
        "functionName": "呼叫名单子标签页",
        "functionDesc": "任务详情抽屉中「呼叫名单」Tab 下的子标签页：已分配、待呼叫、已呼叫、已过滤、呼叫失败。支持查看和管理各阶段的号码列表。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "已分配：MockAssignedData（或手动导入）；已呼叫：MockCalledRows；呼叫失败：MockFailedRows",
        "valueLogic": "已分配 Tab 展示手动导入或系统传入的号码。大众通信支持手动导入 CSV，单次最多 100 条。导入后号码显示在前端 MockAssignedData，可移除单条。各子标签自带筛选栏和数据表格。",
        "fieldDesc": "已分配：用户号码、号码分配时间、等待提交时间、操作（移除）。已呼叫：号码、提交时间、拨打次数、外呼结果、通道、时间、时长、小结、节点、操作（通话记录）",
        "interactionDesc": "切换到呼叫名单 Tab 后默认展示已分配子标签。点击子标签切换查看不同阶段的号码。已分配 Tab 展示手动导入按钮和批量移除按钮，支持 CSV 文件上传。已呼叫 Tab 可点击通话记录查看详情。",
        "judgeRule": "大众通信导入限制 100 条/次，超出拦截提示。重新上传会覆盖原有号码（MockAssignedData 按场景 id 覆盖）。",
        "exceptionRule": "无已分配数据时展示空状态（📦 暂无数据），含手动导入入口。",
        "otherDesc": "大众通信任务详情中的呼叫名单手动导入对所有平台可用，不限于特定平台。"
      },
      "desc": "1. 功能名称：呼叫名单子标签页<br>2. 功能说明：查看和管理已分配/待呼叫/已呼叫等各阶段号码列表，支持手动导入。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockAssignedData / MockCalledRows / MockFailedRows<br>5. 取值逻辑：已分配展示导入或传入号码，大众通信限制 100 条/次。<br>6. 字段说明：号码、时间、等待提交时间、操作等。<br>7. 交互说明：切换子标签查看，已分配可手动导入 CSV。<br>8. 判断规则：大众通信导入限 100 条，超出拦截。<br>9. 异常规则：无数据展示空状态。<br>10. 其他说明：手动导入对所有平台开放。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-004"]
    }
  ],
  "report-call": [
    {
      "id": "37",
      "page": "report-call",
      "revision": "1",
      "target": "[data-anno='report-call-header']",
      "position": { "placement": "bottom-left", "offsetX": 0, "offsetY": 6 },
      "title": "通话统计 -- 大众通信数据汇总",
      "sections": {
        "functionName": "通话统计页面",
        "functionDesc": "按日期和场景维度统计外呼通话数据。大众通信数据与其他平台并列展示，默认置顶。支持外呼统计和客户统计两个子标签。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockCallStatsRows（含大众通信 2 条 + 其他平台多条）",
        "valueLogic": "统计维度：拨打总次数、呼叫名单总数、接通总数、未接通总数、接通率（接通/名单）、触达率（接通+未接通/拨打）、累计通话时长。大众通信数据按 uuid 汇总。",
        "fieldDesc": "序号、呼叫时间、场景名称、拨打总次数、名单总数、接通总数、未接通总数、接通率、触达率、累计通话时长",
        "interactionDesc": "筛选区提供呼叫时间和场景名称筛选。点击查询过滤数据。支持外呼统计和客户统计两个 Tab 切换。",
        "judgeRule": "筛选不区分平台，所有记录在同一列表中展示。大众通信记录默认置顶。",
        "exceptionRule": "无匹配数据时展示空状态（📦 暂无数据）。",
        "otherDesc": "通话统计中的结果是对中台同步通话记录的只读汇总，实际数据以大众通信 SaaS 为准。"
      },
      "desc": "1. 功能名称：通话统计页面<br>2. 功能说明：按日期和场景统计外呼通话数据，大众通信与其他平台并列展示。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockCallStatsRows<br>5. 取值逻辑：按场景+日期汇总，大众通信默认置顶。<br>6. 字段说明：时间、场景、拨打/名单/接通/未接通数、接通率、触达率、时长。<br>7. 交互说明：筛选后查询，支持外呼/客户统计切换。<br>8. 判断规则：所有平台同一列表，大众通信置顶。<br>9. 异常规则：无数据展示空状态。<br>10. 其他说明：实际数据以大众通信 SaaS 为准。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-001", "FLD-004"]
    }
  ],
  "report-billing": [
    {
      "id": "38",
      "page": "report-billing",
      "revision": "1",
      "target": "[data-anno='report-billing-rule']",
      "position": { "placement": "top-left", "offsetX": 0, "offsetY": 0 },
      "title": "计费统计 -- 大众通信计费规则",
      "sections": {
        "functionName": "计费统计规则说明",
        "functionDesc": "计费统计页面顶部备注，说明通话计费规则：以客户接通为准，按分钟收费，未满 1 分钟按 1 分钟计费。大众通信的计费类型和智能平台仅作为数据层归类字段，不在主列表展示。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "中台通话记录派生汇总",
        "valueLogic": "计费时长 = 向上取整（通话秒数 / 60）。计费类型（按通话时长/坐席费+通话费）和智能平台作为内部归类字段，主列表仅展示计费日期、租户名称、计费时长、操作。",
        "fieldDesc": "备注文字栏",
        "interactionDesc": "只读展示在页面顶部，提供计费口径说明。",
        "judgeRule": "计费以客户接通为准，未接通不计费。",
        "exceptionRule": "实际账单以大众通信 SaaS 为准，中台为派生汇总。",
        "otherDesc": "大众通信 billingType 和 platform 字段在 MockBillingStatsRows 数据层标注，主列表不渲染。"
      },
      "desc": "1. 功能名称：计费统计规则说明<br>2. 功能说明：计费规则备注，以接通为准按分钟收费，未满 1 分钟按 1 分钟计。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：中台通话记录派生汇总<br>5. 取值逻辑：计费时长=向上取整(秒数/60)。<br>6. 字段说明：备注文字栏<br>7. 交互说明：只读展示在页面顶部。<br>8. 判断规则：以客户接通为准计费。<br>9. 异常规则：实际账单以 SaaS 为准。<br>10. 其他说明：计费类型和平台在主列表不展示。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-009", "FLD-010"]
    },
    {
      "id": "39",
      "page": "report-billing",
      "revision": "1",
      "target": "[data-anno='report-billing-header']",
      "position": { "placement": "bottom-left", "offsetX": 0, "offsetY": 4 },
      "title": "计费统计 -- 大众通信租户维度汇总",
      "sections": {
        "functionName": "计费统计页面标题区",
        "functionDesc": "计费统计页面标题与说明：查看不同租户的每日通话计费明细，按账号收费不统计在内。大众通信计费数据与其他平台一致展示。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockBillingStatsRows（大众通信 4 条租户记录）",
        "valueLogic": "筛选区仅提供计费日期和租户名称筛选，保持精简。计费时长分钟数从 MockBillingStatsRows.durationMinutes 读取。",
        "fieldDesc": "页面标题、副标题说明文字",
        "interactionDesc": "查看各租户的计费汇总，点击详情可展开每日明细。",
        "judgeRule": "筛选不区分平台，所有租户在同一列表中。",
        "exceptionRule": "无。",
        "otherDesc": "与通话统计不同，计费统计按租户维度而非场景维度汇总。"
      },
      "desc": "1. 功能名称：计费统计页面<br>2. 功能说明：按租户维度查看每日通话计费明细。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockBillingStatsRows<br>5. 取值逻辑：筛选仅支持计费日期和租户名称。<br>6. 字段说明：页面标题、副标题<br>7. 交互说明：查看汇总，点击详情展开明细。<br>8. 判断规则：不区分平台筛选。<br>9. 异常规则：无。<br>10. 其他说明：按租户维度汇总，与通话统计不同。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-009"]
    },
    {
      "id": "40",
      "page": "report-billing",
      "revision": "1",
      "target": "[data-anno='report-billing-summary-table']",
      "position": { "placement": "top-right", "offsetX": 0, "offsetY": 0 },
      "title": "计费统计汇总表",
      "sections": {
        "functionName": "计费统计汇总表",
        "functionDesc": "计费统计主列表，展示各租户的计费日期、租户名称、计费时长。点击详情可查看每日明细和通话计费明细。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockBillingStatsRows（大众通信 4 条 + 预留扩展）",
        "valueLogic": "主表仅展示 5 列：序号、计费日期（dateFrom~dateTo）、租户名称、计费时长（分钟）、操作（详情链接）。计费类型和智能平台不在此表展示。",
        "fieldDesc": "序号、计费日期（范围）、租户名称、计费时长（分钟数）、操作（详情链接）",
        "interactionDesc": "点击详情打开弹窗，展示该租户的每日计费明细表。每日明细中再点击详情打开右侧抽屉展示通话计费明细。",
        "judgeRule": "无特殊校验。",
        "exceptionRule": "无数据时展示空状态。",
        "otherDesc": "支持嵌套两层详情：第一层每日明细（MockBillingDetail），第二层通话计费明细（MockBillingCallDetail）。"
      },
      "desc": "1. 功能名称：计费统计汇总表<br>2. 功能说明：主列表展示租户计费汇总，点击详情展开每日明细。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockBillingStatsRows<br>5. 取值逻辑：主表 5 列，计费类型和平台不展示。<br>6. 字段说明：序号、日期、租户、时长、操作<br>7. 交互说明：详情→每日明细→通话明细（两层嵌套）。<br>8. 判断规则：无特殊校验。<br>9. 异常规则：无数据展示空状态。<br>10. 其他说明：支持两层嵌套详情。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-009", "FLD-010"]
    },
    {
      "id": "41",
      "page": "report-billing",
      "revision": "1",
      "target": "[data-anno='report-billing-detail-table']",
      "position": { "placement": "top-left", "offsetX": 0, "offsetY": 0 },
      "title": "计费每日明细表",
      "sections": {
        "functionName": "计费每日明细",
        "functionDesc": "点击计费汇总表「详情」后弹出的每日计费明细。展示该租户每日的计费数据，包含日期、租户名称、模型类型、计费时长。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockBillingDetail（按 id 索引）",
        "valueLogic": "每日明细含模型类型（大模型/小模型）字段，用于区分大众通信 3.0 大模型接口和其他模型。计费时长按分钟展示。",
        "fieldDesc": "序号、计费日期、租户名称、模型类型、计费时长、操作（详情链接）",
        "interactionDesc": "弹窗内展示每日明细表格，支持导出按钮。点击详情可进一步打开通话计费明细抽屉。",
        "judgeRule": "无。",
        "exceptionRule": "数据不存在时展示空状态。",
        "otherDesc": "与汇总表形成两层嵌套展示：汇总→每日明细→通话明细。"
      },
      "desc": "1. 功能名称：计费每日明细表<br>2. 功能说明：租户每日计费明细，含模型类型和计费时长。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockBillingDetail<br>5. 取值逻辑：按日期展示模型类型和分钟数。<br>6. 字段说明：序号、日期、租户、模型类型、时长、操作<br>7. 交互说明：弹窗展示，支持导出，可进一步查看通话明细。<br>8. 判断规则：无。<br>9. 异常规则：无数据展示空状态。<br>10. 其他说明：两层嵌套的第二层。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-009", "FLD-010"]
    },
    {
      "id": "42",
      "page": "report-billing",
      "revision": "1",
      "target": "[data-anno='report-billing-call-detail']",
      "position": { "placement": "top-left", "offsetX": 0, "offsetY": 0 },
      "title": "通话计费明细（三层嵌套最内层）",
      "sections": {
        "functionName": "通话计费明细抽屉",
        "functionDesc": "计费统计三层嵌套的最内层：右侧抽屉展示单个租户每日的具体通话计费记录，包含每通电话的用户号码、时间、时长、计费分钟和场景名称。",
        "permissionScope": "话务运营人员 / 超级管理员",
        "dataSource": "MockBillingCallDetail（按 id 索引）",
        "valueLogic": "每通电话展示通话时长和计费分钟（向上取整）。备注再次说明计费规则。大众通信的通话计费从详情 duration/bill 字段毫秒值转换。",
        "fieldDesc": "序号、用户号码、通话开始时间、通话结束时间、通话时长、计费分钟、场景名称",
        "interactionDesc": "从每日明细点击详情打开右侧抽屉。表格展示该租户当天的所有通话及其计费分钟数。底部备注计费规则。",
        "judgeRule": "通话时长与计费分钟的关系：计费分钟 = Math.ceil(通话秒数 / 60)。",
        "exceptionRule": "无通话记录时展示空状态。",
        "otherDesc": "三层嵌套的最后一层。原型中的 duration/bill 毫秒值与实际计费账单的对账精度待联调确认。"
      },
      "desc": "1. 功能名称：通话计费明细抽屉<br>2. 功能说明：三层嵌套最内层，展示每通电话的计费详情。<br>3. 权限范围：话务运营人员 / 超级管理员<br>4. 数据来源：MockBillingCallDetail<br>5. 取值逻辑：每通电话的时长和向上取整的计费分钟。<br>6. 字段说明：号码、开始/结束时间、时长、计费分钟、场景<br>7. 交互说明：右侧抽屉展示，底部备注计费规则。<br>8. 判断规则：计费分钟=向上取整(秒数/60)。<br>9. 异常规则：无数据展示空状态。<br>10. 其他说明：dur/bill 毫秒值与实账单的对账待联调。",
      "sourceRefs": ["SRC-001"],
      "fieldRefs": ["FLD-009", "FLD-010"]
    }
  ]
};
