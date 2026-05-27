/**
 * data/mock.js — 全站 Mock 数据
 */

/* ===== 外呼列表 Mock 数据 ===== */
var MockSceneList = [
  { id: 1, name: '冰兰线索外呼', platform: '冰兰', status: 'running', source: '接口传入', assigned: 320, pending: 34, called: 286 },
  { id: 2, name: '渝兴店售后-临保邀约', status: 'not_started', source: '手动导入', assigned: 0, pending: 0, called: 0 },
  { id: 3, name: '渝兴店售后-流失招揽', status: 'not_started', source: '手动导入', assigned: 0, pending: 0, called: 4 },
  { id: 4, name: '渝发店售前-冷线索激活', status: 'terminated', source: '手动导入', assigned: 0, pending: 0, called: 2785 },
  { id: 5, name: '渝兴店售前-冷线索激活', status: 'terminated', source: '手动导入', assigned: 0, pending: 0, called: 2705 },
  { id: 6, name: 'NEV-留资未满-N6推荐', status: 'paused', source: '接口传入', assigned: 0, pending: 0, called: 11 },
  { id: 7, name: 'NEV-留资未满-NX8推荐', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 800 },
  { id: 8, name: 'NEV-留资未满-天籁推荐', status: 'not_started', source: '接口传入', assigned: 0, pending: 0, called: 8 },
  { id: 9, name: 'NEV-留资未满-N7推荐', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 1081 },
  { id: 10, name: '华北店-新线索跟进', status: 'running', source: '手动导入', assigned: 120, pending: 45, called: 75 },
  { id: 11, name: '华东店-保客回访', status: 'running', source: '接口传入', assigned: 500, pending: 80, called: 420 },
  { id: 12, name: '华南店-试驾邀约', status: 'paused', source: '手动导入', assigned: 200, pending: 0, called: 200 },
  { id: 13, name: '西南店-流失预警', status: 'terminated', source: '接口传入', assigned: 0, pending: 0, called: 1560 }
];

/* ===== 已呼叫数据 ===== */
var MockCalledRows = [
  { phone: '138****1234', submitTime: '2026-05-18 09:15:00', dialCount: 1, result: '已接听', channel: '通道A', lastCallTime: '2026-05-18 09:16:30', duration: '00:02:15', summary: '客户表示有兴趣', lastNode: '意向确认' },
  { phone: '139****5678', submitTime: '2026-05-18 10:20:00', dialCount: 2, result: '已接听', channel: '通道B', lastCallTime: '2026-05-18 10:22:00', duration: '00:01:45', summary: '客户需进一步跟进', lastNode: '信息确认' },
  { phone: '136****9012', submitTime: '2026-05-18 11:00:00', dialCount: 1, result: '未接听', channel: '通道A', lastCallTime: '2026-05-18 11:01:00', duration: '00:00:00', summary: '无人接听', lastNode: '外呼' }
];

/* ===== 待呼叫数据 ===== */
var MockPendingRows = [
  { id: 'pending-001', phone: '188****2301', submitTime: '2026-05-27 09:12:20', dialCount: 0, waitDuration: '00:08:32', channel: '冰兰外呼通道 / 一知线路' },
  { id: 'pending-002', phone: '186****7288', submitTime: '2026-05-27 09:18:45', dialCount: 0, waitDuration: '00:02:07', channel: '冰兰外呼通道 / 一知线路' },
  { id: 'pending-003', phone: '177****0935', submitTime: '2026-05-27 09:20:10', dialCount: 0, waitDuration: '00:00:42', channel: '冰兰外呼通道 / 一知线路' }
];

/* ===== 呼叫失败数据 ===== */
var MockFailedRows = [
  { phone: '150****3456', submitTime: '2026-05-18 14:00:00', reason: '空号' },
  { phone: '151****7890', submitTime: '2026-05-18 14:30:00', reason: '停机' }
];

/* ===== 通话统计 Mock 数据 ===== */
var MockCallStatsRows = [
  { date: '2026-05-26', sceneName: '渝北回兴店售前-冷线索激活', dialTotal: 395, rosterTotal: 395, connectedTotal: 277, missedTotal: 0, duration: '1小时25分14秒' },
  { date: '2026-05-26', sceneName: '一知-冷线索-大模型', dialTotal: 748, rosterTotal: 748, connectedTotal: 405, missedTotal: 0, duration: '2小时5分17秒' },
  { date: '2026-05-26', sceneName: '渝兴店售后-临保邀约', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-05-26', sceneName: '渝兴店售后-流失招揽', dialTotal: 146, rosterTotal: 146, connectedTotal: 88, missedTotal: 0, duration: '34分33秒' },
  { date: '2026-05-26', sceneName: '渝发店售前-冷线索激活', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-05-26', sceneName: '渝兴店售前-冷线索激活', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-05-26', sceneName: 'NEV-留资未满-N6推荐', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-05-26', sceneName: 'NEV-留资未满-NX8推荐', dialTotal: 22, rosterTotal: 22, connectedTotal: 20, missedTotal: 0, duration: '6分36秒' },
  { date: '2026-05-26', sceneName: 'NEV-留资未满-天籁推荐', dialTotal: 0, rosterTotal: 0, connectedTotal: 0, missedTotal: 0, duration: '-' },
  { date: '2026-05-26', sceneName: 'NEV-留资未满-N7推荐', dialTotal: 18, rosterTotal: 18, connectedTotal: 18, missedTotal: 0, duration: '5分1秒' },
  { date: '2026-05-26', sceneName: '华北店-新线索跟进', dialTotal: 120, rosterTotal: 120, connectedTotal: 79, missedTotal: 0, duration: '21分42秒' },
  { date: '2026-05-26', sceneName: '华东店-保客回访', dialTotal: 500, rosterTotal: 500, connectedTotal: 336, missedTotal: 0, duration: '1小时46分8秒' }
];

/* ===== 通话记录 Mock 数据 ===== */
var MockCallRecordRows = [
  { phone: '15305168633', startTime: '2026-05-26 16:10:58', endTime: '2026-05-26 16:11:28', duration: '-', sceneName: '燃油车新线索-一知', status: '无人接听', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '15926488867', startTime: '2026-05-26 16:10:49', endTime: '2026-05-26 16:11:19', duration: '-', sceneName: '燃油车新线索-一知', status: '占线', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '18153323979', startTime: '2026-05-26 16:10:33', endTime: '2026-05-26 16:11:04', duration: '-', sceneName: '燃油车新线索-一知', status: '占线', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '18525601142', startTime: '2026-05-26 16:10:19', endTime: '2026-05-26 16:10:50', duration: '-', sceneName: '燃油车新线索-一知', status: '拒接', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '16674357576', startTime: '2026-05-26 16:10:16', endTime: '2026-05-26 16:10:54', duration: '27秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户预计1周内到店购车，有购车意愿。客户痛点在于未明确表达具体购车需求及关注点，仅知晓日产优惠活动，需进一步沟通了解其对车型、配置、价格等方面的期望。', platform: '一知科技', lastNode: '-' },
  { phone: '15158207682', startTime: '2026-05-26 16:10:15', endTime: '2026-05-26 16:11:05', duration: '50秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户未明确购车意愿、时间及城市。其痛点可能在于对日产车优惠政策不够了解，希望通过销售顾问加微信获取详细优惠信息，以便进一步考虑购车。', platform: '一知科技', lastNode: '-' },
  { phone: '19562456113', startTime: '2026-05-26 16:10:05', endTime: '2026-05-26 16:10:35', duration: '-', sceneName: '燃油车新线索-一知', status: '无人接听', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '13375248621', startTime: '2026-05-26 16:09:58', endTime: '2026-05-26 16:10:41', duration: '32秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户表示近期考虑看车，需要销售顾问进一步确认车型和到店时间。', platform: '一知科技', lastNode: '-' },
  { phone: '18673642091', startTime: '2026-05-26 16:09:44', endTime: '2026-05-26 16:10:14', duration: '-', sceneName: '燃油车新线索-一知', status: '关机', summary: '', platform: '一知科技', lastNode: '-' },
  { phone: '17784269023', startTime: '2026-05-26 16:09:31', endTime: '2026-05-26 16:10:08', duration: '24秒', sceneName: '燃油车新线索-一知', status: '已接通', summary: '客户希望了解金融方案，已同意后续门店销售联系。', platform: '一知科技', lastNode: '-' }
];

/* ===== 线索记录 Mock 数据 ===== */
var MockClueRecordRows = [
  { lastVisitTime: '2026-05-26 17:28:10', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户目前没有购车计划，后续可低频跟进。', intention: 'B(无购车计划)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:28:10', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:27:50', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户已购车，暂无换购需求。', intention: 'H(客户已买车)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:27:50', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:27:10', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户预计1周内到店看车，需销售顾问联系。', intention: 'C(待筛选)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:27:10', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:27:10', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户有购车意向，关注优惠活动。', intention: 'C(待筛选)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:27:10', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:27:10', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户暂无购车计划，表示后续再考虑。', intention: 'B(无购车计划)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:27:10', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:26:40', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户有购买日产车的想法，需门店继续跟进。', intention: 'C(待筛选)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:26:40', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:25:10', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户预计1周内到店，愿意添加微信详聊。', intention: 'O(同意加微信)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:25:10', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:24:20', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户有购车计划，预算和车型待确认。', intention: 'A(有购车计划)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:24:20', secondVisitTime: '-', thirdVisitTime: '-' },
  { lastVisitTime: '2026-05-26 17:23:45', visitCount: 1, lastCallStatus: '已接通', lastRecord: '客户关注天籁车型，希望了解金融政策。', intention: 'A(有购车计划)', sceneName: '燃油车新线索-一知', firstVisitTime: '2026-05-26 17:23:45', secondVisitTime: '-', thirdVisitTime: '-' }
];
