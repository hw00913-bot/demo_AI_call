/**
 * mock/data.js - 全站 Mock 数据
 */

/* ===== 外呼列表 Mock 数据 ===== */
var MockSceneList = [
  { id: 13, name: '华北店-新线索-中科金', status: 'running', source: '手动导入', platform: '中科金智能', assigned: 80, pending: 30, called: 50 },
  { id: 14, name: '华东店-保客回访-中科金', status: 'running', source: '接口传入', platform: '中科金智能', assigned: 300, pending: 60, called: 240 },
  { id: 15, name: '华南店-试驾邀约-中科金', status: 'not_started', source: '手动导入', platform: '中科金智能', assigned: 0, pending: 0, called: 0 },
  { id: 16, name: '西南店-流失预警-中科金', status: 'terminated', source: '接口传入', platform: '中科金智能', assigned: 0, pending: 0, called: 980 },
  { id: 1, name: '渝兴店售后-临保邀约', status: 'not_started', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 0 },
  { id: 2, name: '渝兴店售后-流失招揽', status: 'not_started', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 4 },
  { id: 3, name: '渝发店售前-冷线索激活', status: 'terminated', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 2785 },
  { id: 4, name: '渝兴店售前-冷线索激活', status: 'terminated', source: '手动导入', platform: '一知科技', assigned: 0, pending: 0, called: 2705 },
  { id: 5, name: 'NEV-留资未满-N6推荐', status: 'paused', source: '接口传入', platform: '一知科技', assigned: 0, pending: 0, called: 11 },
  { id: 6, name: 'NEV-留资未满-NX8推荐', status: 'terminated', source: '接口传入', platform: '一知科技', assigned: 0, pending: 0, called: 800 },
  { id: 7, name: 'NEV-留资未满-天籁推荐', status: 'not_started', source: '接口传入', platform: '一知科技', assigned: 0, pending: 0, called: 8 },
  { id: 8, name: 'NEV-留资未满-N7推荐', status: 'terminated', source: '接口传入', platform: '一知科技', assigned: 0, pending: 0, called: 1081 },
  { id: 9, name: '华北店-新线索跟进', status: 'running', source: '手动导入', platform: '一知科技', assigned: 120, pending: 45, called: 75 },
  { id: 10, name: '华东店-保客回访', status: 'running', source: '接口传入', platform: '一知科技', assigned: 500, pending: 80, called: 420 },
  { id: 11, name: '华南店-试驾邀约', status: 'paused', source: '手动导入', platform: '一知科技', assigned: 200, pending: 0, called: 200 },
  { id: 12, name: '西南店-流失预警', status: 'terminated', source: '接口传入', platform: '一知科技', assigned: 0, pending: 0, called: 1560 }
];

/* ===== 通话记录 Mock 数据 ===== */
var MockCallRecordRows = [
  { phone: '15305168633', startTime: '2026-06-03 16:10:58', endTime: '2026-06-03 16:11:28', duration: '30秒', sceneName: '华北店-新线索-中科金', status: '已接通', summary: '客户对中科金平台外呼活动感兴趣，预计1周内到店试驾，有购车意愿。', platform: '中科金智能', lastNode: '意向确认', sessionId: '2059190973162029057', callerNumber: '0755-88886666', aiTagName: '高意向', extractTags: '购车意愿明确, 近期到店', callerLocation: '广东深圳', calleeLocation: '中国-广东-广州' },
  { phone: '15926488867', startTime: '2026-06-03 15:30:49', endTime: '2026-06-03 15:31:19', duration: '30秒', sceneName: '华东店-保客回访-中科金', status: '已接通', summary: '客户满意保客回访服务，暂无换购需求，表示后续有需要会主动联系。', platform: '中科金智能', lastNode: '满意度调研', sessionId: '2059190973162029058', callerNumber: '021-66667777', aiTagName: '低意向', extractTags: '保客满意, 暂无换购', callerLocation: '上海', calleeLocation: '中国-上海-浦东' },
  { phone: '18153323979', startTime: '2026-06-03 14:10:33', endTime: '2026-06-03 14:11:04', duration: '-', sceneName: '华南店-试驾邀约-中科金', status: '占线', summary: '', platform: '中科金智能', lastNode: '-', sessionId: '2059190973162029059', callerNumber: '020-55554444', aiTagName: '-', extractTags: '-', callerLocation: '广东广州', calleeLocation: '中国-广东-深圳' },
  { phone: '18525601142', startTime: '2026-06-03 11:20:19', endTime: '2026-06-03 11:20:50', duration: '-', sceneName: '西南店-流失预警-中科金', status: '拒接', summary: '', platform: '中科金智能', lastNode: '-', sessionId: '2059190973162029060', callerNumber: '028-33332222', aiTagName: '-', extractTags: '-', callerLocation: '四川成都', calleeLocation: '中国-四川-成都' },
  { phone: '16674357576', startTime: '2026-06-02 16:10:16', endTime: '2026-06-02 16:10:54', duration: '27秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户预计1周内到店购车，有购车意愿。', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029055', callerNumber: '010-99998888', aiTagName: '高意向', extractTags: '购车意愿, 一周内到店', callerLocation: '北京', calleeLocation: '中国-北京-朝阳' },
  { phone: '15158207682', startTime: '2026-06-02 15:10:15', endTime: '2026-06-02 15:11:05', duration: '50秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户未明确购车意愿、时间及城市。希望通过销售顾问加微信获取详细优惠信息。', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029056', callerNumber: '010-99998888', aiTagName: '低意向', extractTags: '意向不明确, 需跟进', callerLocation: '北京', calleeLocation: '中国-北京-海淀' },
  { phone: '19562456113', startTime: '2026-06-02 14:10:05', endTime: '2026-06-02 14:10:35', duration: '-', sceneName: 'DCC-一知-N7冷线索', status: '无人接听', summary: '', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029057', callerNumber: '020-55554444', aiTagName: '-', extractTags: '-', callerLocation: '广东广州', calleeLocation: '中国-广东-佛山' },
  { phone: '13375248621', startTime: '2026-06-02 10:09:58', endTime: '2026-06-02 10:10:41', duration: '32秒', sceneName: 'NEV-留资未满-N6推荐', status: '已接通', summary: '客户表示近期考虑看车，需要销售顾问进一步确认车型和到店时间。', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029058', callerNumber: '023-77776666', aiTagName: '中意向', extractTags: '近期看车, 车型待定', callerLocation: '重庆', calleeLocation: '中国-重庆-渝北' },
  { phone: '18673642091', startTime: '2026-06-01 16:09:44', endTime: '2026-06-01 16:10:14', duration: '-', sceneName: '渝发店售前-冷线索激活', status: '关机', summary: '', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029059', callerNumber: '023-77776666', aiTagName: '-', extractTags: '-', callerLocation: '重庆', calleeLocation: '中国-重庆-渝北' },
  { phone: '17784269023', startTime: '2026-06-01 10:09:31', endTime: '2026-06-01 10:10:08', duration: '24秒', sceneName: '华北店-新线索跟进', status: '已接通', summary: '客户希望了解金融方案，已同意后续门店销售联系。', platform: '一知科技', lastNode: '-', sessionId: '2059190973162029060', callerNumber: '010-99998888', aiTagName: '高意向', extractTags: '关注金融方案, 同意联系', callerLocation: '北京', calleeLocation: '中国-北京-朝阳' }
];

/* ===== 通话统计 Mock 数据 ===== */
var MockCallStatsRows = [
  { date: '2026-06-03', sceneName: '华北店-新线索-中科金', dialTotal: 80, rosterTotal: 80, connectedTotal: 50, missedTotal: 12, duration: '23分15秒' },
  { date: '2026-06-03', sceneName: '华东店-保客回访-中科金', dialTotal: 300, rosterTotal: 300, connectedTotal: 240, missedTotal: 30, duration: '1小时12分8秒' },
  { date: '2026-06-02', sceneName: '华南店-试驾邀约-中科金', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-06-02', sceneName: '西南店-流失预警-中科金', dialTotal: 980, rosterTotal: 980, connectedTotal: 620, missedTotal: 0, duration: '2小时18分42秒' },
  { date: '2026-06-03', sceneName: '渝兴店售后-临保邀约', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-06-03', sceneName: '华北店-新线索跟进', dialTotal: 120, rosterTotal: 120, connectedTotal: 75, missedTotal: 18, duration: '21分42秒' },
  { date: '2026-06-02', sceneName: '华东店-保客回访', dialTotal: 500, rosterTotal: 500, connectedTotal: 420, missedTotal: 40, duration: '1小时46分8秒' },
  { date: '2026-06-02', sceneName: '渝发店售前-冷线索激活', dialTotal: 2785, rosterTotal: 2785, connectedTotal: 1980, missedTotal: 0, duration: '8小时15分30秒' },
  { date: '2026-06-01', sceneName: 'NEV-留资未满-N6推荐', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-06-01', sceneName: 'NEV-留资未满-N7推荐', dialTotal: 1081, rosterTotal: 1081, connectedTotal: 720, missedTotal: 0, duration: '3小时5分17秒' }
];

/* ===== 计费统计 Mock 数据（按租户维度） ===== */
var MockBillingStatsRows = [
  { id: 1, dateFrom: '2026-06-01', dateTo: '2026-06-09', tenantName: '重庆东风南方渝兴', durationMinutes: 105 },
  { id: 2, dateFrom: '2026-06-01', dateTo: '2026-06-09', tenantName: '东风日产-燃油车', durationMinutes: 65309 }
];

/* ===== 计费统计-详情 Mock 数据 ===== */
var MockBillingDetail = {
  1: [
    { date: '2026-06-09', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-08', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-07', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-06', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-05', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-04', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-03', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-02', tenantName: '重庆东风南方渝兴', modelType: '-', durationMinutes: '-' },
    { date: '2026-06-01', tenantName: '重庆东风南方渝兴', modelType: '小模型', durationMinutes: '105分钟' }
  ],
  2: [
    { date: '2026-06-09', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '8540分钟' },
    { date: '2026-06-08', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '7230分钟' },
    { date: '2026-06-07', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '6101分钟' },
    { date: '2026-06-06', tenantName: '东风日产-燃油车', modelType: '小模型', durationMinutes: '8125分钟' },
    { date: '2026-06-05', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '7742分钟' },
    { date: '2026-06-04', tenantName: '东风日产-燃油车', modelType: '小模型', durationMinutes: '6803分钟' },
    { date: '2026-06-03', tenantName: '东风日产-燃油车', modelType: '小模型', durationMinutes: '9156分钟' },
    { date: '2026-06-02', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '7230分钟' },
    { date: '2026-06-01', tenantName: '东风日产-燃油车', modelType: '大模型', durationMinutes: '6382分钟' }
  ]
};

/* ===== 通话计费明细 Mock（嵌套抽屉） ===== */
var MockBillingCallDetail = {
  1: [
    { date: '2026-06-01', phone: '13988776655', startTime: '2026-06-01 09:15', endTime: '2026-06-01 09:16', duration: '22秒', billingMinutes: '1分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '13422122345', startTime: '2026-06-01 10:30', endTime: '2026-06-01 10:31', duration: '45秒', billingMinutes: '1分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '13367676565', startTime: '2026-06-01 11:00', endTime: '2026-06-01 11:02', duration: '1分34秒', billingMinutes: '2分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '13567675454', startTime: '2026-06-01 14:20', endTime: '2026-06-01 14:21', duration: '1分34秒', billingMinutes: '2分钟', sceneName: '冷线索' },
    { date: '2026-06-01', phone: '13423344455', startTime: '2026-06-01 15:45', endTime: '2026-06-01 15:51', duration: '6分0秒', billingMinutes: '6分钟', sceneName: '冷线索' }
  ],
  2: [
    { date: '2026-06-01', phone: '15811223344', startTime: '2026-06-01 08:30', endTime: '2026-06-01 08:31', duration: '18秒', billingMinutes: '1分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '13688990011', startTime: '2026-06-01 09:00', endTime: '2026-06-01 09:01', duration: '55秒', billingMinutes: '1分钟', sceneName: '冷线索' },
    { date: '2026-06-01', phone: '17766554433', startTime: '2026-06-01 10:15', endTime: '2026-06-01 10:16', duration: '1分12秒', billingMinutes: '2分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '18900112233', startTime: '2026-06-01 11:45', endTime: '2026-06-01 11:48', duration: '2分38秒', billingMinutes: '3分钟', sceneName: '冷线索' },
    { date: '2026-06-01', phone: '13122334455', startTime: '2026-06-01 14:20', endTime: '2026-06-01 14:28', duration: '7分15秒', billingMinutes: '8分钟', sceneName: '新线索' },
    { date: '2026-06-01', phone: '15677889900', startTime: '2026-06-01 16:00', endTime: '2026-06-01 16:01', duration: '32秒', billingMinutes: '1分钟', sceneName: '新线索' }
  ]
};

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
    modelType: '大模型',
    localAddedAt: '2026-06-01 09:30:00',
    seatFeePackage: '全年套餐',
    periodDays: 365,
    callBalance: 2000,
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
    modelType: '小模型',
    localAddedAt: '2026-06-02 10:10:00',
    seatFeePackage: '半年套餐',
    periodDays: 180,
    callBalance: 0,
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
    modelType: '大模型',
    localAddedAt: '2026-05-01 14:20:00',
    seatFeePackage: '-',
    periodDays: 0,
    callBalance: 0,
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
    modelType: '小模型',
    localAddedAt: '2026-06-05 09:00:00',
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
  { no: 'RC20260601001', tenantName: '东风日产-燃油车', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', callBalance: 2000 },
  { no: 'RC20260602002', tenantName: '重庆东南方渝兴', status: '未支付', seatFeePackage: '半年套餐', periodDays: 180, billingType: '仅坐席费', callBalance: 0 },
  { no: 'RC20260603003', tenantName: '重庆东南方渝发', status: '查询失败', seatFeePackage: '半年套餐', periodDays: 180, billingType: '坐席费+通话费', callBalance: 1000 },
  { no: 'RC20260604004', tenantName: '东风日产-点检', status: '不存在', seatFeePackage: '半年套餐', periodDays: 180, billingType: '仅坐席费', callBalance: 0 },
  { no: 'RC20260605005', tenantName: '超级管理组', status: '已取消', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', callBalance: 3000 },
  { no: 'RC20260606006', tenantName: '重庆东南方渝发', status: '已支付', seatFeePackage: '半年套餐', periodDays: 180, billingType: '仅坐席费', callBalance: 0 },
  { no: 'RC20260607007', tenantName: '重庆东南方渝兴', status: '已支付', seatFeePackage: '-', periodDays: 0, billingType: '仅通话费', callBalance: 1500 },
  { no: 'RC20260608008', tenantName: '重庆东南方渝兴', status: '已支付', seatFeePackage: '全年套餐', periodDays: 365, billingType: '坐席费+通话费', callBalance: 2500 }
];

var MockTenantAccounts = [
  { accountName: '一知账号 A', tenantName: '东风日产-燃油车', modelType: '大模型' },
  { accountName: '一知账号 B', tenantName: '重庆东南方渝发', modelType: '大模型' },
  { accountName: '一知账号 C', tenantName: '重庆东南方渝兴', modelType: '小模型' },
  { accountName: '一知账号 D', tenantName: '东风日产-点检', modelType: '小模型' }
];

var MockTenantRows = [
  { no: 1, name: '重庆东风南方渝兴', type: '门店', tenantId: '2054080803329462274', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 14:06:41' },
  { no: 2, name: '重庆东风南方渝发', type: '门店', tenantId: '2054073731284819970', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-05-12 13:38:35' },
  { no: 3, name: '东风日产-点检', type: '总部', tenantId: '2016181907299717121', desc: '-', status: '启用', updater: 'xtadmin', updateTime: '2026-01-28 00:10:00' },
  { no: 4, name: '东风日产-燃油车', type: '总部', tenantId: '2016155108954767361', desc: '请勿删除', status: '启用', updater: 'xtadmin', updateTime: '2026-01-28 00:09:27' },
  { no: 5, name: '超级管理组', type: '总部', tenantId: '1958770839827107842', desc: '系统默认组别，不可删除与修改', status: '启用', updater: 'xtadmin', updateTime: '2026-01-11 09:00:43' }
];

var MockTenantRechargeHistory = [
  { id: 1, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20250512001', status: '已支付', billingType: '仅坐席费', seatFeePackage: '全年套餐', periodDays: 365, callBalance: 0, validFrom: '2025-05-12', validTo: '2026-05-11', operator: 'xtadmin', bindTime: '2025-05-12 14:12:08', validityActivated: true },
  { id: 2, tenantName: '重庆东风南方渝兴', rechargeNo: 'RC20260412001', status: '已取消', billingType: '仅坐席费', seatFeePackage: '-', periodDays: 0, callBalance: 0, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-04-12 10:22:31', validityActivated: false },
  { id: 3, tenantName: '重庆东风南方渝发', rechargeNo: 'RC20250512002', status: '未支付', billingType: '坐席费+通话费', seatFeePackage: '半年套餐', periodDays: 180, callBalance: 1000, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2025-05-12 13:45:20', validityActivated: false },
  { id: 4, tenantName: '东风日产-燃油车', rechargeNo: 'RC20260601001', status: '已支付', billingType: '坐席费+通话费', seatFeePackage: '全年套餐', periodDays: 365, callBalance: 2000, validFrom: '2026-06-01', validTo: '2027-05-31', operator: 'xtadmin', bindTime: '2026-06-01 09:30:00', validityActivated: true },
  { id: 5, tenantName: '重庆东风南方渝发', rechargeNo: 'RC20260607007', status: '已支付', billingType: '仅通话费', seatFeePackage: '-', periodDays: 0, callBalance: 1500, validFrom: '-', validTo: '-', operator: 'xtadmin', bindTime: '2026-06-07 10:15:00', validityActivated: false }
];

var MockTenantFrozenTasks = [
  { id: 1, tenantName: '重庆东风南方渝发', taskNo: 'CALL20260605001', sceneName: '渝发店售前-冷线索激活', phoneCount: 1200, unitPrice: 0.25, frozenAmount: 300, status: '冻结中', createdAt: '2026-06-05 08:00:00' },
  { id: 2, tenantName: '东风日产-燃油车', taskNo: 'CALL20260603002', sceneName: '燃油车-冷线索', phoneCount: 1800, unitPrice: 0.40, frozenAmount: 720, status: '冻结中', createdAt: '2026-06-03 10:05:00' },
  { id: 3, tenantName: '重庆东风南方渝兴', taskNo: 'CALL20260602001', sceneName: '渝兴店售后-流失招揽', phoneCount: 800, unitPrice: 0.25, frozenAmount: 0, status: '已释放', createdAt: '2026-06-02 15:12:00' },
  { id: 4, tenantName: '重庆东风南方渝发', taskNo: 'CALL20260601003', sceneName: '渝发店售后-临保邀约', phoneCount: 300, unitPrice: 0.25, frozenAmount: 0, status: '已扣费', createdAt: '2026-06-01 11:30:00' }
];

/* ===== 中科金 外呼任务详情 Mock（按外呼列表 item.id 索引） ===== */
var MockZkjTaskDetail = {
  13: {
    taskCode: 'e9a0edb5e839eada14624f83df4c4dd0',
    taskName: '华北店-新线索-中科金',
    createdAt: '2026-06-03 09:15:00',
    taskStatus: 2,
    taskType: 1,
    outboundDate: '2026-06-03 09:00',
    outboundExpireDate: '2026-06-30',
    outboundStrategy: 2,
    outboundLevel: 3,
    robotId: '2f50535d41a44ec0afe9727a7a43a770',
    robotName: '东风日产新线索话术',
    outboundNo: '1070678044124068',
    outboundTotal: 80,
    outboundProgress: 50,
    outboundCircleType: 1,
    outboundCircleValue: '1,2,3,4,5,6,7',
    outboundTimeInterval: '["09:00-11:30","13:30-17:30"]',
    aiSeatsNum: 4,
    aiSeatsFlag: 1,
    answerTimeout: 45,
    recallModel: 1,
    recallStatus: '5,9,12,14,15',
    maxRecallTimes: 1,
    recallPeriodMin: 30,
    recallStrategy: '[{"status":5,"time":1,"period":30},{"status":9,"time":1,"period":60}]',
    blacklistGroupIds: 'groupA001',
    dialogTaskId: 'flow_hb_xcl_001',
    dialogTaskName: '新线索标准流程',
    interceptStrategyCode: '6dk9gd823kv90o1am86kf9s',
    didStrategy: 1
  },
  14: {
    taskCode: 'fbe766f9679360af55cf89871370d3c4',
    taskName: '华东店-保客回访-中科金',
    createdAt: '2026-06-01 10:00:00',
    taskStatus: 2,
    taskType: 2,
    outboundDate: '2026-06-01 10:00',
    outboundExpireDate: '2026-07-31',
    outboundStrategy: 2,
    outboundLevel: 2,
    robotId: '3a60646e52b55db1bgf0838b84b881',
    robotName: '保客回访话术',
    outboundNo: '1070678044124069',
    outboundTotal: 300,
    outboundProgress: 240,
    outboundCircleType: 1,
    outboundCircleValue: '1,2,3,4,5,6,7',
    outboundTimeInterval: '["09:00-12:00","14:00-18:00"]',
    aiSeatsNum: 6,
    aiSeatsFlag: 0,
    answerTimeout: 40,
    recallModel: 2,
    recallStatus: '5,9,12,14,15,6',
    maxRecallTimes: 2,
    recallPeriodMin: 20,
    recallStrategy: '',
    blacklistGroupIds: '',
    dialogTaskId: 'flow_hd_hf_001',
    dialogTaskName: '保客回访标准流程',
    interceptStrategyCode: '',
    didStrategy: 0
  },
  15: {
    taskCode: 'c8d1fec694a047ebbf2593788249c5e5',
    taskName: '华南店-试驾邀约-中科金',
    createdAt: '2026-06-05 14:30:00',
    taskStatus: 1,
    taskType: 1,
    outboundDate: '',
    outboundExpireDate: '',
    outboundStrategy: 2,
    outboundLevel: 3,
    robotId: '4b71757f63c66ec2chg1949c95c992',
    robotName: '试驾邀约话术',
    outboundNo: '1070678044124070',
    outboundTotal: 0,
    outboundProgress: 0,
    outboundCircleType: 1,
    outboundCircleValue: '1,2,3,4,5,6,7',
    outboundTimeInterval: '["10:00-12:00","14:00-19:00"]',
    aiSeatsNum: 3,
    aiSeatsFlag: 0,
    answerTimeout: 45,
    recallModel: 0,
    recallStatus: '',
    maxRecallTimes: 0,
    recallPeriodMin: 0,
    recallStrategy: '',
    blacklistGroupIds: '',
    dialogTaskId: 'flow_hn_sj_001',
    dialogTaskName: '试驾邀约标准流程',
    interceptStrategyCode: '',
    didStrategy: 0
  },
  16: {
    taskCode: 'a492e8f048d00bcc723d62719e245546',
    taskName: '西南店-流失预警-中科金',
    createdAt: '2026-05-01 08:00:00',
    taskStatus: 4,
    taskType: 2,
    outboundDate: '2026-05-01 08:00',
    outboundExpireDate: '2026-06-30',
    outboundStrategy: 2,
    outboundLevel: 1,
    robotId: '5c82868g74d77fd3dih2050a06d0a3',
    robotName: '流失预警话术',
    outboundNo: '1070678044124071',
    outboundTotal: 980,
    outboundProgress: 980,
    outboundCircleType: 1,
    outboundCircleValue: '1,2,3,4,5,6,7',
    outboundTimeInterval: '["09:00-12:00","13:30-18:00","18:30-20:00"]',
    aiSeatsNum: 8,
    aiSeatsFlag: 1,
    answerTimeout: 50,
    recallModel: 1,
    recallStatus: '5,9,12,14,15,6,11',
    maxRecallTimes: 3,
    recallPeriodMin: 15,
    recallStrategy: '[{"status":5,"time":3,"period":15},{"status":9,"time":2,"period":30}]',
    blacklistGroupIds: 'groupB001,groupB002',
    dialogTaskId: 'flow_xn_ls_001',
    dialogTaskName: '流失预警标准流程',
    interceptStrategyCode: '6dk9gd823kv90o1am86kf9s',
    didStrategy: 1
  }
};

/* ===== 中科金 拦截策略 Mock（模拟 /task/interceptStrategy/designatedEnable 返回） ===== */
var MockZkjInterceptStrategies = [
  { strategyCode: '6dk9gd823kv90o1am86kf9s', name: '测试策略0828' },
  { strategyCode: 'x8fl2he934lw01p2bn97g0t', name: '空号过滤策略' }
];
