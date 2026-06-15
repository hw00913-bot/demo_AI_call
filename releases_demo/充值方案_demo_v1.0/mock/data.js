/**
 * mock/data.js - 全站 Mock 数据
 */

/* ===== 外呼列表 Mock 数据 ===== */
var MockSceneList = [
  { id: 1, name: '渝兴店售后-临保邀约', status: 'not_started', source: '手动导入', assigned: 0, pending: 0, called: 0, tenantName: '东风日产-燃油车', modelType: '大模型', vendorCode: 'IFLYTEK', vendorName: '科大讯飞', estimatedMinutesPerPhone: 1 },
  { id: 2, name: '渝兴店售后-流失招揽', status: 'not_started', source: '手动导入', assigned: 0, pending: 0, called: 4 },
  { id: 3, name: '渝发店售前-冷线索激活', status: 'terminated', source: '手动导入', assigned: 0, pending: 0, called: 2785 },
  { id: 4, name: '渝兴店售前-冷线索激活', status: 'terminated', source: '手动导入', assigned: 0, pending: 0, called: 2705 },
  { id: 5, name: 'NEV-留资未满-N6推荐', status: 'paused', source: '接口传入', assigned: 0, pending: 0, called: 11 },
  { id: 6, name: 'NEV-留资未满-NX8推荐', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 800 },
  { id: 7, name: 'NEV-留资未满-天籁推荐', status: 'not_started', source: '接口传入', assigned: 0, pending: 0, called: 8 },
  { id: 8, name: 'NEV-留资未满-N7推荐', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 1081 },
  { id: 9, name: '华北店-新线索跟进', status: 'running', source: '手动导入', assigned: 120, pending: 45, called: 75 },
  { id: 10, name: '华东店-保客回访', status: 'running', source: '接口传入', assigned: 500, pending: 80, called: 420 },
  { id: 11, name: '华南店-试驾邀约', status: 'paused', source: '手动导入', assigned: 200, pending: 0, called: 200 },
  { id: 12, name: '西南店-流失预警', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 1560 }
];

/* ===== 已呼叫数据 ===== */
var MockCalledRows = [
  { phone: '138****1234', submitTime: '2026-05-18 09:15:00', dialCount: 1, result: '已接听', channel: '通道A', lastCallTime: '2026-05-18 09:16:30', duration: '00:02:15', summary: '客户表示有兴趣', lastNode: '意向确认' },
  { phone: '139****5678', submitTime: '2026-05-18 10:20:00', dialCount: 2, result: '已接听', channel: '通道B', lastCallTime: '2026-05-18 10:22:00', duration: '00:01:45', summary: '客户需进一步跟进', lastNode: '信息确认' },
  { phone: '136****9012', submitTime: '2026-05-18 11:00:00', dialCount: 1, result: '未接听', channel: '通道A', lastCallTime: '2026-05-18 11:01:00', duration: '00:00:00', summary: '无人接听', lastNode: '外呼' }
];

/* ===== 呼叫失败数据 ===== */
var MockFailedRows = [
  { phone: '150****3456', submitTime: '2026-05-18 14:00:00', reason: '空号' },
  { phone: '151****7890', submitTime: '2026-05-18 14:30:00', reason: '停机' }
];

/* ===== 线索统计 NEV Mock 数据 ===== */
var MockClueStatNEV = [
  { no: 1, date: '2026-05-18', type: '新线索', import: 120, connected: 85, dispatch: 80, rate: '70.8%', avg: '00:01:32', A: 15, B: 25, C: 20, D: 15, E: 10 },
  { no: 2, date: '2026-05-17', type: '冷线索', import: 200, connected: 150, dispatch: 140, rate: '75.0%', avg: '00:01:48', A: 30, B: 40, C: 35, D: 25, E: 20 },
  { no: 3, date: '2026-05-16', type: '新线索', import: 150, connected: 100, dispatch: 95, rate: '66.7%', avg: '00:01:25', A: 20, B: 30, C: 25, D: 15, E: 10 },
  { no: 4, date: '2026-05-15', type: '冷线索', import: 180, connected: 130, dispatch: 120, rate: '72.2%', avg: '00:01:40', A: 25, B: 35, C: 30, D: 20, E: 20 },
  { no: 5, date: '2026-05-14', type: '新线索', import: 100, connected: 70, dispatch: 65, rate: '70.0%', avg: '00:01:30', A: 12, B: 20, C: 18, D: 10, E: 10 }
];

/* ===== 线索统计 ICE Mock 数据 ===== */
var MockClueStatICE = [
  { no: 1, date: '2026-05-18', type: '新线索', import: 80, connected: 55, dispatch: 50, rate: '68.8%', avg: '00:01:20', A: 10, B: 18, C: 15, D: 8, E: 4 },
  { no: 2, date: '2026-05-17', type: '冷线索', import: 150, connected: 110, dispatch: 100, rate: '73.3%', avg: '00:01:35', A: 20, B: 30, C: 28, D: 18, E: 14 },
  { no: 3, date: '2026-05-16', type: '新线索', import: 90, connected: 60, dispatch: 55, rate: '66.7%', avg: '00:01:22', A: 12, B: 16, C: 14, D: 10, E: 8 },
  { no: 4, date: '2026-05-15', type: '冷线索', import: 120, connected: 85, dispatch: 80, rate: '70.8%', avg: '00:01:30', A: 18, B: 25, C: 22, D: 12, E: 8 },
  { no: 5, date: '2026-05-14', type: '新线索', import: 70, connected: 48, dispatch: 45, rate: '68.6%', avg: '00:01:18', A: 8, B: 14, C: 12, D: 8, E: 6 }
];

/* ===== 线索明细 NEV Mock 数据 ===== */
var MockClueDetailNEV = [
  { no: 1, time: '2026-05-18 09:00', code: 'CL20260518001', scene: 'NEV-留资未满-N6推荐', type: '新线索', phone: '138****0001', storeCode: 'CQ001', storeName: '重庆渝兴店', callTime: '2026-05-18 09:15', status: '已接听', duration: '00:02:15', level: 'A', dispatch: '已下发' },
  { no: 2, time: '2026-05-18 10:00', code: 'CL20260518002', scene: 'NEV-留资未满-N7推荐', type: '冷线索', phone: '139****0002', storeCode: 'CQ002', storeName: '重庆渝发店', callTime: '2026-05-18 10:20', status: '无应答', duration: '00:00:00', level: 'C', dispatch: '未下发' },
  { no: 3, time: '2026-05-18 11:00', code: 'CL20260518003', scene: 'NEV-留资未满-天籁推荐', type: '新线索', phone: '136****0003', storeCode: 'CQ001', storeName: '重庆渝兴店', callTime: '2026-05-18 11:00', status: '忙线中', duration: '00:00:00', level: 'D', dispatch: '未下发' },
  { no: 4, time: '2026-05-18 12:00', code: 'CL20260518004', scene: 'NEV-留资未满-NX8推荐', type: '冷线索', phone: '137****0004', storeCode: 'CQ003', storeName: '重庆江北店', callTime: '2026-05-18 12:30', status: '已接听', duration: '00:01:45', level: 'B', dispatch: '已下发' },
  { no: 5, time: '2026-05-18 13:00', code: 'CL20260518005', scene: 'NEV-留资未满-N6推荐', type: '新线索', phone: '135****0005', storeCode: 'CQ002', storeName: '重庆渝发店', callTime: '2026-05-18 13:15', status: '空号', duration: '00:00:00', level: 'E', dispatch: '未下发' }
];

/* ===== 线索明细 ICE Mock 数据 ===== */
var MockClueDetailICE = [
  { no: 1, time: '2026-05-18 08:00', code: 'IC20260518001', scene: '燃油车-冷线索', type: '冷线索', phone: '158****1001', storeCode: 'SH001', storeName: '上海静安店', callTime: '2026-05-18 08:30', status: '已接听', duration: '00:01:30', level: 'A', dispatch: '已下发' },
  { no: 2, time: '2026-05-18 09:00', code: 'IC20260518002', scene: '燃油车-新线索', type: '新线索', phone: '159****1002', storeCode: 'HZ001', storeName: '杭州旗舰店', callTime: '2026-05-18 09:20', status: '已接听', duration: '00:02:00', level: 'B', dispatch: '已下发' },
  { no: 3, time: '2026-05-18 10:00', code: 'IC20260518003', scene: '燃油车-冷线索', type: '冷线索', phone: '160****1003', storeCode: 'BJ001', storeName: '北京朝阳店', callTime: '2026-05-18 10:10', status: '无应答', duration: '00:00:00', level: 'C', dispatch: '未下发' },
  { no: 4, time: '2026-05-18 11:00', code: 'IC20260518004', scene: '燃油车-新线索', type: '新线索', phone: '161****1004', storeCode: 'GZ001', storeName: '广州天河店', callTime: '2026-05-18 11:45', status: '已接听', duration: '00:01:15', level: 'B', dispatch: '已下发' },
  { no: 5, time: '2026-05-18 12:00', code: 'IC20260518005', scene: '燃油车-冷线索', type: '冷线索', phone: '162****1005', storeCode: 'SH002', storeName: '上海徐汇店', callTime: '2026-05-18 12:05', status: '忙线中', duration: '00:00:00', level: 'D', dispatch: '未下发' }
];

/* ===== 线索回流 Mock 数据 ===== */
var MockClueReturn = [
  { no: 1, date: '2026-05-18', scene: '燃油车新线索', import: 500, submit: 480, return: 450 },
  { no: 2, date: '2026-05-17', scene: '燃油车新线索', import: 600, submit: 580, return: 550 },
  { no: 3, date: '2026-05-16', scene: '燃油车新线索', import: 450, submit: 430, return: 400 },
  { no: 4, date: '2026-05-15', scene: '燃油车新线索', import: 550, submit: 520, return: 490 },
  { no: 5, date: '2026-05-14', scene: '燃油车新线索', import: 400, submit: 380, return: 360 }
];

/* ===== 租户计费管理 Mock 数据 ===== */
var MockTenantBillingRows = [
  {
    id: 1,
    tenantName: '东风日产-燃油车',
    accountName: '一知账号 A',
    billingType: '坐席费+通话费',
    rechargeNo: 'RC20260601001',
    rechargeStatus: '已支付',
    localAddedAt: '2026-06-01 09:30:00',
    seatFeePackage: '全年套餐',
    periodDays: 365,
    rechargeAmount: 2000,
    validFrom: '2026-06-01',
    validTo: '2027-05-31',
    enabled: true,
    validityActivated: true
  },
  {
    id: 2,
    tenantName: '重庆东南方渝兴',
    accountName: '一知账号 C',
    billingType: '仅坐席费',
    rechargeNo: 'RC20260602002',
    rechargeStatus: '未支付',
    localAddedAt: '2026-06-02 10:10:00',
    seatFeePackage: '半年套餐',
    periodDays: 183,
    rechargeAmount: 0,
    validFrom: '-',
    validTo: '-',
    enabled: false,
    validityActivated: false
  },
  {
    id: 3,
    tenantName: '重庆东南方渝发',
    accountName: '一知账号 B',
    billingType: '其他',
    rechargeNo: 'RC20260501003',
    rechargeStatus: '已取消',
    localAddedAt: '2026-05-01 14:20:00',
    seatFeePackage: '-',
    periodDays: 0,
    rechargeAmount: 0,
    validFrom: '-',
    validTo: '-',
    enabled: false,
    validityActivated: false
  },
  {
    id: 4,
    tenantName: '东风日产-点检',
    accountName: '一知账号 D',
    billingType: '仅坐席费',
    rechargeNo: 'RC20260605005',
    rechargeStatus: '已支付',
    localAddedAt: '2026-06-05 09:00:00',
    seatFeePackage: '半年套餐',
    periodDays: 183,
    rechargeAmount: 0,
    validFrom: '-',
    validTo: '-',
    enabled: false,
    validityActivated: false
  }
];

var MockRechargeOrders = [
  { no: 'RC20260601001', tenantName: '东风日产-燃油车', storeCode: 'HQ-RY-001', storeName: '东风日产燃油车总部', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', rechargeAmount: 2000 },
  { no: 'RC20260602002', tenantName: '重庆东南方渝兴', storeCode: 'CQ-YX-001', storeName: '重庆东风南方渝兴店', status: '未支付', seatFeePackage: '半年套餐', periodDays: 183, billingType: '仅坐席费', rechargeAmount: 0 },
  { no: 'RC20260603003', tenantName: '重庆东南方渝发', storeCode: 'CQ-YF-001', storeName: '重庆东风南方渝发店', status: '查询失败', seatFeePackage: '半年套餐', periodDays: 183, billingType: '坐席费+通话费', rechargeAmount: 1000 },
  { no: 'RC20260604004', tenantName: '东风日产-点检', storeCode: 'HQ-DJ-001', storeName: '东风日产点检总部', status: '不存在', seatFeePackage: '半年套餐', periodDays: 183, billingType: '仅坐席费', rechargeAmount: 0 },
  { no: 'RC20260605005', tenantName: '超级管理组', storeCode: 'HQ-SYS-001', storeName: '超级管理组', status: '已取消', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', rechargeAmount: 3000 },
  { no: 'RC20260606006', tenantName: '重庆东南方渝发', storeCode: 'CQ-YF-001', storeName: '重庆东风南方渝发店', status: '已支付', seatFeePackage: '半年套餐', periodDays: 183, billingType: '仅坐席费', rechargeAmount: 0 },
  { no: 'RC20260607007', tenantName: '重庆东南方渝兴', storeCode: 'CQ-YX-001', storeName: '重庆东风南方渝兴店', status: '已支付', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', rechargeAmount: 1500 },
  { no: 'RC20260608008', tenantName: '重庆东南方渝兴', storeCode: 'CQ-YX-001', storeName: '重庆东风南方渝兴店', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', rechargeAmount: 2500 },
  { no: 'RC20260609009', tenantName: '东风日产-燃油车', storeCode: 'HQ-RY-001', storeName: '东风日产燃油车总部', status: '已支付', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', rechargeAmount: 520 },
  { no: 'RC20260610010', tenantName: '重庆东南方渝发', storeCode: 'CQ-YF-001', storeName: '重庆东风南方渝发店', status: '已支付', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', rechargeAmount: 800 },
  { no: 'RC20260615011', tenantName: '重庆东南方渝兴', storeCode: 'CQ-YX-001', storeName: '重庆东风南方渝兴店', status: '已支付', seatFeePackage: '半年套餐', periodDays: 183, billingType: '仅坐席费', rechargeAmount: 0 },
  { no: 'RC-HQ-001', tenantName: '东风日产-燃油车', storeCode: 'HQ-RY-001', storeName: '东风日产燃油车总部', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', rechargeAmount: 999999999 },
  { no: 'RC-HQ-002', tenantName: '东风日产-点检', storeCode: 'HQ-DJ-001', storeName: '东风日产点检总部', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', rechargeAmount: 999999999 },
  { no: 'RC-HQ-003', tenantName: '超级管理组', storeCode: 'HQ-SYS-001', storeName: '超级管理组', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', rechargeAmount: 999999999 }
];

var MockTenantAccounts = [
  { accountName: '一知账号 A', tenantName: '东风日产-燃油车', modelType: '大模型' },
  { accountName: '一知账号 B', tenantName: '重庆东南方渝发', modelType: '大模型' },
  { accountName: '一知账号 C', tenantName: '重庆东南方渝兴', modelType: '小模型' },
  { accountName: '一知账号 D', tenantName: '东风日产-点检', modelType: '小模型' }
];

var MockTenantRows = [
  { no: 1, name: '重庆东风南方渝兴', consumedAmount: 120, type: '门店', tenantId: '2054080803329462274', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 14:06:41' },
  { no: 2, name: '重庆东风南方渝发', consumedAmount: 260, type: '门店', tenantId: '2054073731284819970', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 13:38:35' },
  { no: 3, name: '东风日产-点检', consumedAmount: 0, type: '总部', tenantId: '2016181907299717121', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-01-28 00:10:00' },
  { no: 4, name: '东风日产-燃油车', consumedAmount: 180, type: '总部', tenantId: '2016155108954767361', desc: '请勿删除', status: '启用', updater: 'xtadmin', updateTime: '2026-01-28 00:09:27' },
  { no: 5, name: '超级管理组', consumedAmount: 0, type: '总部', tenantId: '1958770839827107842', desc: '系统默认组别，不可删除与修改', status: '启用', updater: 'xtadmin', updateTime: '2026-01-11 09:00:43' }
];

/* 当前版本只配置模型默认价；providerCode 为空表示适用于该模型的所有供应商。 */
var MockTenantPriceRules = [
  { tenantName: '重庆东风南方渝兴', modelType: '大模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.42, status: '启用' },
  { tenantName: '重庆东风南方渝兴', modelType: '小模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.28, status: '启用' },
  { tenantName: '重庆东风南方渝发', modelType: '大模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.32, status: '启用' },
  { tenantName: '重庆东风南方渝发', modelType: '小模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.24, status: '启用' },
  { tenantName: '东风日产-点检', modelType: '大模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.48, status: '启用' },
  { tenantName: '东风日产-点检', modelType: '小模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.35, status: '启用' },
  { tenantName: '东风日产-燃油车', modelType: '大模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.40, status: '启用' },
  { tenantName: '东风日产-燃油车', modelType: '小模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.26, status: '启用' },
  { tenantName: '超级管理组', modelType: '大模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.45, status: '启用' },
  { tenantName: '超级管理组', modelType: '小模型', providerCode: null, pricingScope: 'MODEL_DEFAULT', unitPrice: 0.30, status: '启用' }
];

/* 供应商目录暂不参与当前计价，未来可通过 PROVIDER_OVERRIDE 规则覆盖模型默认价。 */
var MockBillingVendors = [
  { providerCode: 'IFLYTEK', providerName: '科大讯飞', status: '启用' },
  { providerCode: 'YIZHI', providerName: '一知科技', status: '启用' },
  { providerCode: 'ZKJ', providerName: '中科金', status: '启用' },
  { providerCode: 'BINGLAN', providerName: '冰兰', status: '启用' }
];

var MockTenantRechargeHistory = [
  { id: 1, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20250512001', status: '已支付', billingType: '仅坐席费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 0, validFrom: '2025-05-12', validTo: '2026-05-11', operator: 'xtadmin', bindTime: '2025-05-12 14:12:08', activated: true, validityActivated: true },
  { id: 2, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20260412001', status: '已取消', billingType: '仅坐席费', seatFeePackage: '-', periodDays: 0, rechargeAmount: 0, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-04-12 10:22:31', activated: false, validityActivated: false },
  { id: 7, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20260608008', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 2500, validFrom: '2026-06-12', validTo: '2027-06-11', operator: 'xtadmin', bindTime: '2026-06-12 08:00:00', activated: true, validityActivated: true },
  { id: 8, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20260607007', status: '已支付', billingType: '仅通话费', seatFeePackage: '-', periodDays: 0, rechargeAmount: 1500, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-06-07 10:15:00', activated: true, validityActivated: true },
  { id: 12, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20260615011', storeCode: 'CQ-YX-001', storeName: '重庆东风南方渝兴店', status: '已支付', billingType: '仅坐席费', seatFeePackage: '半年套餐', periodDays: 183, rechargeAmount: 0, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-06-15 15:30:00', activated: false, validityActivated: false },
  { id: 3, tenantName: '重庆东风南方渝发', rechargeNo: 'RC20250512002', status: '未支付', billingType: '坐席费+通话费', seatFeePackage: '半年套餐', periodDays: 183, rechargeAmount: 1000, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2025-05-12 13:45:20', activated: false, validityActivated: false },
  { id: 4, tenantName: '东风日产-燃油车', rechargeNo: 'RC20260601001', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 2000, validFrom: '2026-06-01', validTo: '2027-05-31', operator: 'xtadmin', bindTime: '2026-06-01 09:30:00', activated: true, validityActivated: true },
  { id: 5, tenantName: '重庆东风南方渝发', rechargeNo: 'RC20260606006', storeCode: 'CQ-YF-001', storeName: '重庆东风南方渝发店', status: '已支付', billingType: '仅坐席费', seatFeePackage: '半年套餐', periodDays: 183, rechargeAmount: 0, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-06-06 10:15:00', activated: false, validityActivated: false },
  { id: 6, tenantName: '东风日产-燃油车', rechargeNo: 'RC20260609009', status: '已支付', billingType: '仅通话费', seatFeePackage: '-', periodDays: 0, rechargeAmount: 520, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-06-09 11:20:00', activated: false, validityActivated: false },
  { id: 9, tenantName: '东风日产-燃油车', rechargeNo: 'RC-HQ-001', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 999999999, validFrom: '2026-01-01', validTo: '2099-12-31', operator: 'xtadmin', bindTime: '2026-01-01 00:00:00', activated: true, validityActivated: true },
  { id: 10, tenantName: '东风日产-点检', rechargeNo: 'RC-HQ-002', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 999999999, validFrom: '2026-01-01', validTo: '2099-12-31', operator: 'xtadmin', bindTime: '2026-01-01 00:00:00', activated: true, validityActivated: true },
  { id: 11, tenantName: '超级管理组', rechargeNo: 'RC-HQ-003', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, rechargeAmount: 999999999, validFrom: '2026-01-01', validTo: '2099-12-31', operator: 'xtadmin', bindTime: '2026-01-01 00:00:00', activated: true, validityActivated: true }
];

/* 手工扣减只形成租户资金调整流水，不关联充值单，不修改冻结任务。 */
var MockTenantBalanceAdjustments = [
  { id: 1, adjustmentNo: 'ADJ20260610001', tenantName: '东风日产-燃油车', type: 'MANUAL_DEDUCT', direction: 'OUT', amount: 100, reason: '线下业务处理后同步扣减余额', operator: 'xtadmin', status: '已生效', effectiveAt: '2026-06-10 16:20:00' }
];

var MockTenantFrozenTasks = [
  { id: 1, tenantName: '重庆东风南方渝发', modelType: '小模型', vendorCode: 'YIZHI', vendorName: '一知科技', taskNo: 'CALL20260605001', sceneName: '渝发店售前-冷线索激活', frozenMinutes: 1250, unitPriceSnapshot: 0.26, taskStatus: '进行中', status: '冻结中', createdAt: '2026-06-12 08:00:00', releasedAt: '', releaseReason: '' },
  { id: 2, tenantName: '东风日产-燃油车', modelType: '大模型', vendorCode: 'IFLYTEK', vendorName: '科大讯飞', taskNo: 'CALL20260603002', sceneName: '燃油车-冷线索', frozenMinutes: 1800, unitPriceSnapshot: 0.40, taskStatus: '进行中', status: '冻结中', createdAt: '2026-06-12 10:05:00', releasedAt: '', releaseReason: '' },
  { id: 3, tenantName: '重庆东风南方渝兴', modelType: '小模型', vendorCode: 'ZKJ', vendorName: '中科金', taskNo: 'CALL20260602001', sceneName: '渝兴店售后-流失招揽', frozenMinutes: 800, unitPriceSnapshot: 0.32, taskStatus: '已完成', status: '已释放', createdAt: '2026-06-02 15:12:00', releasedAt: '2026-06-02 16:08:00', releaseReason: '任务已完成' },
  { id: 4, tenantName: '重庆东风南方渝发', modelType: '大模型', vendorCode: 'YIZHI', vendorName: '一知科技', taskNo: 'CALL20260601003', sceneName: '渝发店售后-临保邀约', frozenMinutes: 300, unitPriceSnapshot: 0.35, taskStatus: '已完成', status: '已扣费', createdAt: '2026-06-01 11:30:00', releasedAt: '2026-06-01 12:10:00', releaseReason: '任务结算完成' },
  { id: 5, tenantName: '东风日产-燃油车', modelType: '小模型', vendorCode: 'BINGLAN', vendorName: '冰兰', taskNo: 'CALL20260610004', sceneName: '历史超时任务', frozenMinutes: 500, unitPriceSnapshot: 0.26, taskStatus: '进行中', status: '冻结中', createdAt: '2026-06-10 08:00:00', releasedAt: '', releaseReason: '' },
  { id: 6, tenantName: '东风日产-燃油车', modelType: '大模型', vendorCode: 'ZKJ', vendorName: '中科金', taskNo: 'CALL20260612005', sceneName: '已终止演示任务', frozenMinutes: 200, unitPriceSnapshot: 0.40, taskStatus: '已终止', status: '冻结中', createdAt: '2026-06-12 14:00:00', releasedAt: '', releaseReason: '' }
];
