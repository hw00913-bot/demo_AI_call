/**
 * data/mock.js — 全站 Mock 数据
 */

/* ===== 外呼列表 Mock 数据 ===== */
var MockSceneList = [
  { id: 1, name: '渝兴店售后-临保邀约', status: 'not_started', source: '手动导入', assigned: 0, pending: 0, called: 0 },
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