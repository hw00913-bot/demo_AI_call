/**
 * mock/data.js - 全站 Mock 数据（已适配电声平台任务、批次、话单及过滤结果）
 */

/* ===== 外呼列表 Mock 数据 ===== */
var MockSceneList = [
  { id: 13, name: '东风日产-新线索-内部调优', status: 'running', statusType: 1, source: '接口传入', platform: '电声平台', assigned: 120, pending: 35, called: 85 },
  { id: 14, name: '东风日产-冷线索-上线验证', status: 'running', statusType: 1, source: '接口传入', platform: '电声平台', assigned: 500, pending: 80, called: 420 },
  { id: 15, name: '渝兴店售前-电声线索激活', status: 'paused', statusType: 0, source: '手动导入', platform: '电声平台', assigned: 0, pending: 0, called: 0 },
  { id: 16, name: '渝发店-电声冷线索激活', status: 'paused', statusType: 0, source: '手动导入', platform: '电声平台', assigned: 0, pending: 0, called: 980 },
  { id: 1, name: '渝兴店售后-一知临保', status: 'not_started', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 0 },
  { id: 2, name: '渝兴店售后-一知流失招揽', status: 'not_started', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 4 }
];

/* ===== 电声执行批次（中台保存任务、导入批次与执行批次关系） ===== */
var MockDianshengExecuteBatches = [
  {
    taskId: 13,
    strategyCode: 'STR_NISSAN_NEW_LEAD_001',
    executeBatchId: 'EXE202607020001',
    importBatchId: 'IMP202607020001',
    executeStatus: 'RUNNING',
    leadCount: 120,
    runningCount: 35,
    completedCount: 80,
    blockedCount: 5,
    cancelledCount: 0,
    startTime: '2026-07-02 10:00:00',
    endTime: '-'
  },
  {
    taskId: 13,
    strategyCode: 'STR_NISSAN_NEW_LEAD_001',
    executeBatchId: 'EXE202607010003',
    importBatchId: 'IMP202607010003',
    executeStatus: 'FINISHED',
    leadCount: 50,
    runningCount: 0,
    completedCount: 47,
    blockedCount: 3,
    cancelledCount: 0,
    startTime: '2026-07-01 14:00:00',
    endTime: '2026-07-01 17:18:26'
  },
  {
    taskId: 14,
    strategyCode: 'STR_NISSAN_COLD_LEAD_001',
    executeBatchId: 'EXE202607020002',
    importBatchId: 'IMP202607020002',
    executeStatus: 'WAIT_START',
    leadCount: 500,
    runningCount: 500,
    completedCount: 0,
    blockedCount: 0,
    cancelledCount: 0,
    startTime: '-',
    endTime: '-'
  },
  {
    taskId: 16,
    strategyCode: 'STR_NISSAN_COLD_LEAD_003',
    executeBatchId: 'EXE202607010006',
    importBatchId: 'IMP202607010006',
    executeStatus: 'STOPPED',
    leadCount: 980,
    runningCount: 0,
    completedCount: 620,
    blockedCount: 20,
    cancelledCount: 340,
    startTime: '2026-07-01 09:30:00',
    endTime: '2026-07-01 11:42:08'
  }
];

/* ===== 通话记录 Mock 数据 ===== */
var MockCallRecordRows = [
  {
    phone: '138****0001',
    startTime: '2026-07-02 10:15:00',
    endTime: '2026-07-02 10:15:45',
    duration: '45秒',
    sceneName: '东风日产-新线索-内部调优',
    status: '已接听',
    finalCallResult: 'COMPLETED',
    summary: '客户对东风日产品牌首保项目感兴趣，确认周日到店，购车意向较强。已推送至门店系统。',
    bailianSummary: '客户确认周日到店，关注首保礼包，建议门店提前确认预约。',
    bailianAgentTags: {
      '意向标签': '高意向',
      '计划到店时间': '本周日早上',
      '预计购车时间': '3个月内',
      '意向品牌中文名': '东风日产',
      '意向车系中文名': 'N7'
    },
    platform: '电声平台',
    lastNode: '',
    sessionId: 'CALL_DS_001',
    importBatchId: 'IMP202607020001',
    executeBatchId: 'EXE202607020001',
    leadId: 'LEAD_DS_001',
    callId: 'CALL_DS_001',
    position: '东风日产新线索机器人',
    caller: '020-88886666',
    callerNumber: '020-88886666',
    aiTagName: '高意向',
    intentionStatus: 2,
    intentionRank: 'A',
    intentionTag: { '购车意向': '较强', '到店计划': '周日到店', '关注权益': '首保礼包' },
    callerLocation: '广东广州',
    calleeLocation: '中国-广东-广州',
    callerAmapProvinceName: '广东省',
    callerAmapCityName: '广州市',
    phoneAmapProvinceName: '广东省',
    phoneAmapCityName: '广州市',
    wechatStatus: '已加微',
    answerMainStatus: 3,
    answerStatus: 301,
    contextId: 'CTX_DS_001',
    externalCallId: 'EXT_CALL_001',
    externalTaskId: 'EXT_TASK_001',
    recordUrl: 'https://example.com/mock-record-001.mp3',
    clueImportLabel: '新线索-7月2日',
    clueAttr: { dealerCode: 'H2901', model: 'N7' },
    sipStatus: '200',
    chatLogs: [
      { role: 'assistant', text: '您好，这里是东风日产客户关怀中心，请问是张先生吗？' },
      { role: 'user', text: '是的，我是。什么事？' },
      { role: 'assistant', text: '为了感谢您对东风日产的支持，我们特地在周末为您预约了首保体验活动，还有精美礼包赠送，请问您有空到店吗？' },
      { role: 'user', text: '周日早上我有空，不知道具体有什么礼包？' },
      { role: 'assistant', text: '周日早上为您预留了专属席位，礼包包含车载吸尘器和保养优惠券，稍后会将活动信息推送给您。' }
    ]
  },
  {
    phone: '139****0002',
    startTime: '2026-07-02 09:30:10',
    endTime: '2026-07-02 09:30:20',
    duration: '10秒',
    sceneName: '东风日产-冷线索-上线验证',
    status: '秒挂',
    finalCallResult: 'COMPLETED',
    summary: '客户接通后声称忙碌并迅速挂断电话（秒挂）。暂无有效交互。',
    bailianSummary: '客户表示正在忙，通话快速结束，建议稍后再次联系。',
    bailianAgentTags: {
      '意向标签': '待确认',
      '计划到店时间': '-',
      '预计购车时间': '-',
      '意向品牌中文名': '-',
      '意向车系中文名': '-'
    },
    platform: '电声平台',
    lastNode: '',
    sessionId: 'CALL_DS_002',
    importBatchId: 'IMP202607020002',
    executeBatchId: 'EXE202607020002',
    leadId: 'LEAD_DS_002',
    callId: 'CALL_DS_002',
    position: '东风日产冷线索机器人',
    caller: '021-66667777',
    callerNumber: '021-66667777',
    aiTagName: '无意向',
    intentionStatus: 1,
    intentionRank: 'D',
    intentionTag: { '沟通状态': '客户忙碌', '跟进建议': '稍后再联系' },
    callerLocation: '上海',
    calleeLocation: '中国-上海-浦东',
    callerAmapProvinceName: '上海市',
    callerAmapCityName: '上海市',
    phoneAmapProvinceName: '上海市',
    phoneAmapCityName: '上海市',
    wechatStatus: '未加微',
    answerMainStatus: 3,
    answerStatus: 302,
    contextId: 'CTX_DS_002',
    externalCallId: 'EXT_CALL_002',
    externalTaskId: 'EXT_TASK_002',
    recordUrl: 'https://example.com/mock-record-002.mp3',
    clueImportLabel: '冷线索-7月2日',
    clueAttr: { dealerCode: 'H3101' },
    sipStatus: '200',
    chatLogs: [
      { role: 'assistant', text: '您好，这里是东风日产客户关怀中心，请问是王女士吗？' },
      { role: 'user', text: '现在正忙着呢，挂了啊。' }
    ]
  },
  {
    phone: '181****0003',
    startTime: '2026-07-02 09:12:00',
    endTime: '2026-07-02 09:12:30',
    duration: '-',
    sceneName: '东风日产-新线索-内部调优',
    status: '拒接',
    finalCallResult: 'EXHAUSTED',
    summary: '',
    bailianSummary: '客户拒接，本通电话未形成有效沟通。',
    bailianAgentTags: {
      '意向标签': '未识别',
      '计划到店时间': '-',
      '预计购车时间': '-',
      '意向品牌中文名': '-',
      '意向车系中文名': '-'
    },
    platform: '电声平台',
    lastNode: '',
    sessionId: 'CALL_DS_003',
    importBatchId: 'IMP202607020001',
    executeBatchId: 'EXE202607020001',
    leadId: 'LEAD_DS_003',
    callId: 'CALL_DS_003',
    position: '东风日产新线索机器人',
    caller: '020-88886666',
    callerNumber: '020-88886666',
    aiTagName: '-',
    intentionStatus: 0,
    intentionRank: '',
    intentionTag: null,
    callerLocation: '广东广州',
    calleeLocation: '中国-广东-深圳',
    callerAmapProvinceName: '广东省',
    callerAmapCityName: '广州市',
    phoneAmapProvinceName: '广东省',
    phoneAmapCityName: '深圳市',
    wechatStatus: '未加微',
    answerMainStatus: 2,
    answerStatus: 205,
    contextId: 'CTX_DS_003',
    externalCallId: 'EXT_CALL_003',
    externalTaskId: 'EXT_TASK_003',
    recordUrl: '',
    clueImportLabel: '新线索-7月2日',
    clueAttr: { dealerCode: 'H2902' },
    sipStatus: '603',
    chatLogs: []
  },
  {
    phone: '185****0004',
    startTime: '2026-07-01 16:22:00',
    endTime: '2026-07-01 16:22:50',
    duration: '50秒',
    sceneName: '东风日产-冷线索-上线验证',
    status: '已接听',
    finalCallResult: 'COMPLETED',
    summary: '客户表示车已经卖了，不需要后续的服务回访。判定为无意向流失保客。',
    bailianSummary: '客户车辆已售，不需要继续回访。',
    bailianAgentTags: {
      '意向标签': '无意向',
      '计划到店时间': '-',
      '预计购车时间': '-',
      '意向品牌中文名': '东风日产',
      '意向车系中文名': '轩逸'
    },
    platform: '电声平台',
    lastNode: '',
    sessionId: 'CALL_DS_004',
    importBatchId: 'IMP202607020002',
    executeBatchId: 'EXE202607020002',
    leadId: 'LEAD_DS_004',
    callId: 'CALL_DS_004',
    position: '东风日产冷线索机器人',
    caller: '021-66667777',
    callerNumber: '021-66667777',
    aiTagName: '无意向',
    intentionStatus: 1,
    intentionRank: 'D',
    intentionTag: { '流失原因': '车辆已售', '跟进建议': '无需回访' },
    callerLocation: '上海',
    calleeLocation: '中国-上海-黄浦',
    callerAmapProvinceName: '上海市',
    callerAmapCityName: '上海市',
    phoneAmapProvinceName: '上海市',
    phoneAmapCityName: '上海市',
    wechatStatus: '未加微',
    answerMainStatus: 3,
    answerStatus: 301,
    contextId: 'CTX_DS_004',
    externalCallId: 'EXT_CALL_004',
    externalTaskId: 'EXT_TASK_004',
    recordUrl: 'https://example.com/mock-record-004.mp3',
    clueImportLabel: '冷线索-7月1日',
    clueAttr: { dealerCode: 'H3102' },
    sipStatus: '200',
    chatLogs: [
      { role: 'assistant', text: '您好，这里是东风日产，想跟您做个简短的车主回访。' },
      { role: 'user', text: '不用回访了，我那台轩逸上个月已经卖掉了。' },
      { role: 'assistant', text: '好的，耽误您的时间了，祝您生活愉快，再见。' }
    ]
  }
];

/* ===== 通话统计 Mock 数据 ===== */
var MockCallStatsRows = [
  { date: '2026-07-02', sceneName: '东风日产-新线索-内部调优', dialTotal: 80, rosterTotal: 80, connectedTotal: 50, missedTotal: 30, duration: '23分15秒' },
  { date: '2026-07-02', sceneName: '东风日产-冷线索-上线验证', dialTotal: 300, rosterTotal: 300, connectedTotal: 240, missedTotal: 60, duration: '1小时12分8秒' },
  { date: '2026-07-01', sceneName: '渝兴店售前-电声线索激活', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-07-01', sceneName: '渝发店-电声冷线索激活', dialTotal: 980, rosterTotal: 980, connectedTotal: 620, missedTotal: 360, duration: '2小时18分42秒' }
];

/* ===== 租户计费管理 Mock 数据 ===== */
var MockTenantBillingRows = [
  {
    id: 1,
    tenantName: '东风日产-燃油车',
    accountName: '电声账号 A',
    billingType: '坐席费+通话费',
    rechargeNo: 'RC20260701001',
    rechargeStatus: '已支付',
    modelType: '大模型',
    localAddedAt: '2026-07-01 09:30:00',
    seatFeePackage: '全年套餐',
    periodDays: 365,
    callBalance: 5000,
    validFrom: '2026-07-01',
    validTo: '2027-06-30',
    enabled: true,
    validityActivated: true
  },
  {
    id: 2,
    tenantName: '重庆东风南方渝兴',
    accountName: '电声账号 B',
    billingType: '仅坐席费',
    rechargeNo: 'RC20260702002',
    rechargeStatus: '未支付',
    modelType: '小模型',
    localAddedAt: '2026-07-02 10:10:00',
    seatFeePackage: '半年套餐',
    periodDays: 180,
    callBalance: 0,
    validFrom: '-',
    validTo: '-',
    enabled: false,
    validityActivated: false
  }
];

var MockRechargeOrders = [
  { no: 'RC20260701001', tenantName: '东风日产-燃油车', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', callBalance: 5000 },
  { no: 'RC20260702002', tenantName: '重庆东风南方渝兴', status: '未支付', seatFeePackage: '半年套餐', periodDays: 180, billingType: '仅坐席费', callBalance: 0 }
];

var MockTenantAccounts = [
  { accountName: '电声账号 A', tenantName: '东风日产-燃油车', modelType: '大模型' },
  { accountName: '电声账号 B', tenantName: '重庆东风南方渝兴', modelType: '小模型' }
];

var MockTenantRows = [
  { no: 1, name: '重庆东风南方渝兴', type: '门店', tenantId: '2054080803329462274', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 14:06:41' },
  { no: 2, name: '重庆东风南方渝发', type: '门店', tenantId: '2054073731284819970', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 13:38:35' },
  { no: 3, name: '东风日产-燃油车', type: '总部', tenantId: '2016155108954767361', desc: '请勿删除', status: '启用', updater: 'xtadmin', updateTime: '2026-01-28 00:09:27' }
];

var MockTenantRechargeHistory = [
  { id: 1, tenantName: '东风日产-燃油车', rechargeNo: 'RC20260701001', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, callBalance: 5000, validFrom: '2026-07-01', validTo: '2027-06-30', operator: 'xtadmin', bindTime: '2026-07-01 09:30:00', validityActivated: true }
];

var MockTenantFrozenTasks = [
  { id: 1, tenantName: '东风日产-燃油车', taskNo: 'CALL_DS_F01', sceneName: '东风日产-新线索-内部调优', phoneCount: 120, unitPrice: 0.35, frozenAmount: 42, status: '冻结中', createdAt: '2026-07-02 08:00:00' }
];

/* ===== 计费统计 Mock 数据（按租户维度） ===== */
var MockBillingStatsRows = [
  { id: 1, dateFrom: '2026-07-01', dateTo: '2026-07-09', tenantName: '东风日产-燃油车', durationMinutes: 6500 }
];

/* ===== 计费统计-详情 Mock 数据 ===== */
var MockBillingDetail = {
  1: [
    { date: '2026-07-02', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '3500分钟' },
    { date: '2026-07-01', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '3000分钟' }
  ]
};

/* ===== 通话计费明细 Mock ===== */
var MockBillingCallDetail = {
  1: [
    { date: '2026-07-02', phone: '138****0001', startTime: '2026-07-02 10:15', endTime: '2026-07-02 10:15', duration: '45秒', billingMinutes: '1分钟', sceneName: '东风日产-新线索-内部调优' },
    { date: '2026-07-02', phone: '139****0002', startTime: '2026-07-02 09:30', endTime: '2026-07-02 09:30', duration: '10秒', billingMinutes: '1分钟', sceneName: '东风日产-冷线索-上线验证' }
  ]
};



/* ===== 标签管理 Mock 数据（电声平台同步） ===== */

/* 供应商列表：本项目只启用电声平台，标签管理页可继续新增供应商做对照配置。 */
var MockTagSuppliers = [
  { id: 'diansheng', localCode: 'SUP-DS', name: '电声平台', status: 'enabled' }
];

/* 租户类型常量 */
var MockTenantTypes = [
  { id: 'store', name: '门店租户' },
  { id: 'headquarters', name: '总部租户' }
];

/* 场景类型与任务管理一致；电声当前仅支持新线索和冷线索。 */
var MockTagScenes = [
  { id: 'supervision', localCode: 'SCN-SUPERVISION', name: '督办', status: 'enabled' },
  { id: 'service', localCode: 'SCN-SERVICE', name: '服务', status: 'enabled' },
  { id: 'revisit', localCode: 'SCN-REVISIT', name: '回访', status: 'enabled' },
  { id: 'xxs', localCode: 'SCN-XXS', name: '新线索', status: 'enabled' },
  { id: 'lxs', localCode: 'SCN-LXS', name: '冷线索', status: 'enabled' }
];

/* 电声供应商标签池：来自电声话单字段；重拨由执行明细派生。 */
var MockSupplierTagPool = {
  'diansheng': [
    { id: 'ds_1', localCode: 'TAG-DS-001', name: 'A-高意向', sort: 1, platformTagId: 'intentionRank:A' },
    { id: 'ds_2', localCode: 'TAG-DS-002', name: 'B-中意向', sort: 2, platformTagId: 'intentionRank:B' },
    { id: 'ds_3', localCode: 'TAG-DS-003', name: 'C-低意向', sort: 3, platformTagId: 'intentionRank:C' },
    { id: 'ds_4', localCode: 'TAG-DS-004', name: 'D-无意向', sort: 4, platformTagId: 'intentionRank:D' },
    { id: 'ds_6', localCode: 'TAG-DS-006', name: '已加微', sort: 6, platformTagId: 'wechatStatus:added' },
    { id: 'ds_7', localCode: 'TAG-DS-007', name: '需重拨', sort: 7, platformTagId: 'derived:attemptCount>1' },
    { id: 'ds_8', localCode: 'TAG-DS-008', name: '过滤/拉黑', sort: 8, platformTagId: 'finalCallResult:BLOCKED' }
  ]
};

/* 配置单元：key = "supplierId_tenantType_sceneId" -> enabledTagIds[] */
var MockTagConfigs = {
  'diansheng_store_xxs': { enabledTagIds: ['ds_1','ds_2','ds_3','ds_4','ds_6','ds_7','ds_8'] },
  'diansheng_store_lxs': { enabledTagIds: ['ds_1','ds_2','ds_3','ds_4','ds_6','ds_7','ds_8'] },
  'diansheng_headquarters_xxs': { enabledTagIds: ['ds_1','ds_2','ds_3','ds_4','ds_6','ds_7','ds_8'] },
  'diansheng_headquarters_lxs': { enabledTagIds: ['ds_1','ds_2','ds_3','ds_4','ds_6','ds_7','ds_8'] }
};

/* 本地标准标签集：供应商标签最终映射到这里的唯一标签。 */
var MockLocalTagSets = {
  'store_xxs': [
    { id: 'local_store_xxs_1', localCode: 'LOCAL-STORE-XXS-001', name: '高意向', sort: 1 },
    { id: 'local_store_xxs_2', localCode: 'LOCAL-STORE-XXS-002', name: '中意向', sort: 2 },
    { id: 'local_store_xxs_3', localCode: 'LOCAL-STORE-XXS-003', name: '低意向', sort: 3 },
    { id: 'local_store_xxs_4', localCode: 'LOCAL-STORE-XXS-004', name: '无意向', sort: 4 },
    { id: 'local_store_xxs_5', localCode: 'LOCAL-STORE-XXS-005', name: '人工跟进', sort: 5 },
    { id: 'local_store_xxs_6', localCode: 'LOCAL-STORE-XXS-006', name: '无效客户', sort: 6 }
  ],
  'store_lxs': [
    { id: 'local_store_lxs_1', localCode: 'LOCAL-STORE-LXS-001', name: '高意向', sort: 1 },
    { id: 'local_store_lxs_2', localCode: 'LOCAL-STORE-LXS-002', name: '中意向', sort: 2 },
    { id: 'local_store_lxs_3', localCode: 'LOCAL-STORE-LXS-003', name: '低意向', sort: 3 },
    { id: 'local_store_lxs_4', localCode: 'LOCAL-STORE-LXS-004', name: '无意向', sort: 4 },
    { id: 'local_store_lxs_5', localCode: 'LOCAL-STORE-LXS-005', name: '人工跟进', sort: 5 },
    { id: 'local_store_lxs_6', localCode: 'LOCAL-STORE-LXS-006', name: '无效客户', sort: 6 }
  ],
  'headquarters_xxs': [
    { id: 'local_hq_xxs_1', localCode: 'LOCAL-HQ-XXS-001', name: '总部高意向', sort: 1 },
    { id: 'local_hq_xxs_2', localCode: 'LOCAL-HQ-XXS-002', name: '总部中意向', sort: 2 },
    { id: 'local_hq_xxs_3', localCode: 'LOCAL-HQ-XXS-003', name: '总部低意向', sort: 3 },
    { id: 'local_hq_xxs_4', localCode: 'LOCAL-HQ-XXS-004', name: '总部无意向', sort: 4 },
    { id: 'local_hq_xxs_5', localCode: 'LOCAL-HQ-XXS-005', name: '总部人工跟进', sort: 5 },
    { id: 'local_hq_xxs_6', localCode: 'LOCAL-HQ-XXS-006', name: '总部无效客户', sort: 6 }
  ],
  'headquarters_lxs': [
    { id: 'local_hq_lxs_1', localCode: 'LOCAL-HQ-LXS-001', name: '总部高意向', sort: 1 },
    { id: 'local_hq_lxs_2', localCode: 'LOCAL-HQ-LXS-002', name: '总部中意向', sort: 2 },
    { id: 'local_hq_lxs_3', localCode: 'LOCAL-HQ-LXS-003', name: '总部低意向', sort: 3 },
    { id: 'local_hq_lxs_4', localCode: 'LOCAL-HQ-LXS-004', name: '总部无意向', sort: 4 },
    { id: 'local_hq_lxs_5', localCode: 'LOCAL-HQ-LXS-005', name: '总部人工跟进', sort: 5 },
    { id: 'local_hq_lxs_6', localCode: 'LOCAL-HQ-LXS-006', name: '总部无效客户', sort: 6 }
  ]
};

/* 供应商标签到本地标准标签映射：key = "supplierId_tenantType_sceneId"。 */
var MockSupplierLocalTagMappings = {};

function getTagConfig(supplierId, tenantType, sceneId) {
  var key = supplierId + '_' + tenantType + '_' + sceneId;
  var config = MockTagConfigs[key];
  var pool = MockSupplierTagPool[supplierId] || [];
  if (config) {
    var enabledSet = {};
    config.enabledTagIds.forEach(function(tid) { enabledSet[tid] = true; });
    return {
      tags: pool,
      configExists: true,
      enabledTagIds: config.enabledTagIds.slice(),
      enabledSet: enabledSet
    };
  }
  return {
    tags: pool,
    configExists: false,
    enabledTagIds: [],
    enabledSet: {}
  };
}

/* ===== 已呼叫数据 (已匹配电声字段) ===== */
var MockCalledRows = [
  { phone: '138****0001', submitTime: '2026-07-02 10:15:00', dialCount: 1, result: '接听', finalCallResult: 'COMPLETED', channel: '内部测试线路', lastCallTime: '2026-07-02 10:15:45', duration: '45秒', summary: '客户对首保项目感兴趣，周日到店。', lastNode: '', wechatStatus: '已加微' },
  { phone: '139****0002', submitTime: '2026-07-02 09:30:00', dialCount: 1, result: '秒挂', finalCallResult: 'COMPLETED', channel: '日产电话线路', lastCallTime: '2026-07-02 09:30:20', duration: '10秒', summary: '接通后秒挂。', lastNode: '', wechatStatus: '未加微' },
  { phone: '185****0004', submitTime: '2026-07-01 16:20:00', dialCount: 1, result: '接听', finalCallResult: 'COMPLETED', channel: '日产电话线路', lastCallTime: '2026-07-01 16:22:50', duration: '50秒', summary: '车已卖掉，无后续回访需要。', lastNode: '', wechatStatus: '未加微' }
];

/* ===== 呼叫失败数据 ===== */
var MockFailedRows = [
  { phone: '188****5555', submitTime: '2026-07-02 10:00:00', reason: 'D01导入失败: 电话格式非合法11位手机号' }
];

/* ===== 已过滤数据（电声只返回 BLOCKED，不返回细分过滤原因） ===== */
var MockFilteredRows = [
  { phone: '130****9991', submitTime: '2026-07-02 10:02:00', dialCount: 0, finalCallResult: 'BLOCKED', filterTime: '2026-07-02 10:02:10' },
  { phone: '131****9992', submitTime: '2026-07-02 10:03:00', dialCount: 0, finalCallResult: 'BLOCKED', filterTime: '2026-07-02 10:03:15' }
];

/* ===== 线索流回 Mock 数据 ===== */
var MockClueReturn = [
  { no: 1, date: '2026-07-02', scene: '东风日产-新线索-内部调优', import: 120, submit: 120, return: 85 },
  { no: 2, date: '2026-07-02', scene: '东风日产-冷线索-上线验证', import: 500, submit: 500, return: 420 }
];

/* ===== 电声外呼任务配置详情 Mock ===== */
var MockZkjTaskDetail = {
  13: {
    taskCode: 'job_ds_001_hb_xcl',
    taskName: '东风日产-新线索-内部调优',
    strategyId: 10001,
    strategyCode: 'STR_NISSAN_NEW_LEAD_001',
    strategyName: '东风日产新线索激活任务',
    statusType: 1,
    strategyStatus: 'ACTIVE',
    sceneTypeName: '新线索',
    createdTime: '2026-07-02 08:30:00',
    updatedTime: '2026-07-02 08:30:00',
    leadTypeRobotMapping: { leadTypeCode: 'NEW_LEAD', leadTypeName: '新线索', robotCode: 'robot_ds_nissan_001' },
    callTimeWindow: {
      windows: [
        { beginTime: '09:00', endTime: '11:30', weekdays: [1, 2, 3, 4, 5, 6, 7] },
        { beginTime: '13:30', endTime: '17:30', weekdays: [1, 2, 3, 4, 5, 6, 7] }
      ],
      excludeDates: []
    },
    nDayMCallPolicy: { days: 3, maxAttempts: 3, intervalMinutes: [30, 60] },
    humanTransfer: { enabled: false },
    blacklistCheck: { enabled: true, blacklistGroupCode: 'nissan_default' },
    autoStart: { enabled: true },
    remark: '日产新线索激活任务',
    importBatchId: 'IMP202607020001',
    executeBatchId: 'EXE202607020001',
    executeStatus: 'RUNNING',
    createdAt: '2026-07-02 08:30:00',
    robotId: 'robot_ds_nissan_001',
    robotName: '东风日产新线索机器人'
  },
  14: {
    taskCode: 'job_ds_002_hd_bk',
    taskName: '东风日产-冷线索-上线验证',
    strategyId: 10002,
    strategyCode: 'STR_NISSAN_COLD_LEAD_001',
    strategyName: '东风日产冷线索激活任务',
    statusType: 1,
    strategyStatus: 'ACTIVE',
    sceneTypeName: '冷线索',
    createdTime: '2026-07-02 09:00:00',
    updatedTime: '2026-07-02 09:00:00',
    leadTypeRobotMapping: { leadTypeCode: 'COLD_LEAD', leadTypeName: '冷线索', robotCode: 'robot_ds_nissan_002' },
    callTimeWindow: {
      windows: [
        { beginTime: '09:00', endTime: '12:00', weekdays: [1, 2, 3, 4, 5, 6, 7] },
        { beginTime: '14:00', endTime: '18:00', weekdays: [1, 2, 3, 4, 5, 6, 7] }
      ],
      excludeDates: []
    },
    nDayMCallPolicy: { days: 3, maxAttempts: 4, intervalMinutes: [30, 60, 120] },
    humanTransfer: { enabled: false },
    blacklistCheck: { enabled: true, blacklistGroupCode: 'nissan_default' },
    autoStart: { enabled: true },
    remark: '日产冷线索持续跟进任务',
    importBatchId: 'IMP202607020002',
    executeBatchId: 'EXE202607020002',
    executeStatus: 'RUNNING',
    createdAt: '2026-07-02 09:00:00',
    robotId: 'robot_ds_nissan_002',
    robotName: '东风日产冷线索机器人'
  }
};

/* ===== 电声接听状态码翻译与本地映射 ===== */
var ZkjCallStatusLabels = {
  '301': '接听',
  '302': '秒挂',
  '303': '伪接通',
  '205': '拒接',
  '206': '无应答'
};

var ZkjStatusToLocal = {
  '301': '已接听',
  '302': '秒挂',
  '303': '已接听',
  '205': '拒接',
  '206': '无应答'
};

/* ===== 线索记录明细 (电声Mock数据) ===== */
var MockClueDetailNEV = [
  { no: 1, time: '2026-07-02 09:00', code: 'CLUE_DS_01', scene: '东风日产-新线索-内部调优', type: '新线索', phone: '138****0001', storeCode: 'DLR_01', storeName: '广州花都店', callTime: '2026-07-02 10:15', status: '已接听', duration: '45秒', level: 'A', dispatch: '已下发' },
  { no: 2, time: '2026-07-02 09:10', code: 'CLUE_DS_02', scene: '东风日产-新线索-内部调优', type: '新线索', phone: '181****0003', storeCode: 'DLR_02', storeName: '深圳香蜜湖店', callTime: '2026-07-02 09:12', status: '拒接', duration: '-', level: 'C', dispatch: '未下发' }
];

var MockClueDetailICE = [
  { no: 1, time: '2026-07-02 09:00', code: 'CLUE_DS_03', scene: '东风日产-冷线索-上线验证', type: '冷线索', phone: '139****0002', storeCode: 'DLR_03', storeName: '上海徐汇店', callTime: '2026-07-02 09:30', status: '秒挂', duration: '10秒', level: 'D', dispatch: '已下发' },
  { no: 2, time: '2026-07-01 16:00', code: 'CLUE_DS_04', scene: '东风日产-冷线索-上线验证', type: '冷线索', phone: '185****0004', storeCode: 'DLR_04', storeName: '上海静安店', callTime: '2026-07-01 16:22', status: '已接听', duration: '50秒', level: 'D', dispatch: '已下发' }
];

/* ===== 线索统计 Mock 数据 ===== */
var MockClueStatNEV = [
  { no: 1, date: '2026-07-02', type: '新线索', import: 120, connected: 85, dispatch: 80, rate: '70.8%', avg: '45秒', A: 15, B: 25, C: 20, D: 15, E: 10 }
];

var MockClueStatICE = [
  { no: 1, date: '2026-07-02', type: '冷线索', import: 500, connected: 420, dispatch: 400, rate: '84.0%', avg: '50秒', A: 30, B: 70, C: 120, D: 200, E: 0 }
];
