/**
 * js/pages/result-clue.js — 线索记录
 */
(function () {
  'use strict';

  var allRows = [
    { phone: '13575197390', lastVisitTime: '2026-06-22 15:46:10', visitCount: 1, callStatus: '已接通', record: '-', level: 'C(待筛选)', tags: ['待筛选', '燃油车新线索'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:46:10', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'C(待筛选)', concern: '问车相关其他', city: '-', arrivalTime: '-', buyTime: '-', callTag: '-' }, summary: '客户暂未明确购车计划，建议继续培育。' },
    { phone: '13376738391', lastVisitTime: '2026-06-22 15:45:10', visitCount: 1, callStatus: '已接通', record: '客户表示对买车感兴趣，需销售顾问继续跟进。', level: 'B(无购车计划)', tags: ['无购车计划', '需跟进'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:45:10', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'B(无购车计划)', concern: '价格优惠', city: '-', arrivalTime: '-', buyTime: '-', callTag: '-' }, summary: '客户对车型有兴趣，但暂未形成明确购车时间。' },
    { phone: '13480297378', lastVisitTime: '2026-06-22 15:44:30', visitCount: 1, callStatus: '已接通', record: '客户预计1周内到店看车。', level: 'C(待筛选)', tags: ['待筛选', '到店意向'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:44:30', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'C(待筛选)', concern: '预约到店', city: '-', arrivalTime: '1周内', buyTime: '-', callTag: '-' }, summary: '客户有到店计划，需要门店及时承接。' },
    { phone: '13457998010', lastVisitTime: '2026-06-22 15:44:30', visitCount: 1, callStatus: '已接通', record: '客户表示无购车计划。', level: 'B(无购车计划)', tags: ['无购车计划'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:44:30', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'B(无购车计划)', concern: '-', city: '-', arrivalTime: '-', buyTime: '-', callTag: '-' }, summary: '客户当前无购车需求，建议低频触达。' },
    { phone: '15007685219', lastVisitTime: '2026-06-22 15:44:10', visitCount: 1, callStatus: '已接通', record: '客户有购车意愿，希望销售添加微信沟通。', level: 'O(同意加微信)', tags: ['同意加微信', '有购车意愿'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:44:10', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'O(同意加微信)', concern: '金融优惠', city: '-', arrivalTime: '-', buyTime: '近期', callTag: '同意加微信' }, summary: '客户同意加微信，建议尽快分配给销售。' },
    { phone: '13018675410', lastVisitTime: '2026-06-22 15:44:10', visitCount: 1, callStatus: '已接通', record: '客户已购车，此次无需继续跟进。', level: 'H(客户已买车)', tags: ['客户已买车'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:44:10', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'H(客户已买车)', concern: '-', city: '-', arrivalTime: '-', buyTime: '已购车', callTag: '-' }, summary: '客户已完成购车，建议从当前新线索流程剔除。' },
    { phone: '18839961699', lastVisitTime: '2026-06-22 15:42:30', visitCount: 1, callStatus: '已接通', record: '客户暂无购车计划，后续可再联系。', level: 'B(无购车计划)', tags: ['无购车计划', '可再联系'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:42:30', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'B(无购车计划)', concern: '问车相关其他', city: '-', arrivalTime: '-', buyTime: '-', callTag: '可再联系' }, summary: '客户暂无明确计划，进入后续培育池。' },
    { phone: '15859445411', lastVisitTime: '2026-06-22 15:42:00', visitCount: 1, callStatus: '已接通', record: '客户要求客服留下联系电话。', level: 'J(语音助手)', tags: ['语音助手', '需人工确认'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:42:00', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'J(语音助手)', concern: '人工服务', city: '-', arrivalTime: '-', buyTime: '-', callTag: '需人工确认' }, summary: '客户希望获取联系方式，可转人工或销售回访。' },
    { phone: '13809059760', lastVisitTime: '2026-06-22 15:41:40', visitCount: 1, callStatus: '已接通', record: '客户准备入手一台车，想了解优惠。', level: 'C(待筛选)', tags: ['待筛选', '关注优惠'], sceneName: '燃油车新线索-一知', firstVisitTime: '2026-06-22 15:41:40', secondVisitTime: '-', thirdVisitTime: '-', detailTags: { intent: 'C(待筛选)', concern: '价格优惠', city: '-', arrivalTime: '-', buyTime: '近期', callTag: '-' }, summary: '客户关注价格优惠，需要销售进一步确认预算和车型。' }
  ];
  var rows = allRows.slice();

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function shortText(value) {
    if (!value || value === '-') return '-';
    return value.length > 12 ? escapeHTML(value.slice(0, 12)) + '...' : escapeHTML(value);
  }

  function breakText(value, separator) {
    var text = escapeHTML(value || '-');
    return text.split(separator).join(separator + '<br>');
  }

  function uniqueOptions(field) {
    return allRows.reduce(function (acc, row) {
      if (row[field] && acc.indexOf(row[field]) === -1) acc.push(row[field]);
      return acc;
    }, []);
  }

  function renderOptions(field) {
    return uniqueOptions(field).map(function (item) {
      return '<option value="' + escapeHTML(item) + '">' + escapeHTML(item) + '</option>';
    }).join('');
  }

  function renderLevelOptionsByScene(sceneName) {
    return allRows.reduce(function (acc, row) {
      if (row.sceneName === sceneName && row.level && acc.indexOf(row.level) === -1) acc.push(row.level);
      return acc;
    }, []).map(function (item) {
      return '<option value="' + escapeHTML(item) + '">' + escapeHTML(item) + '</option>';
    }).join('');
  }

  function renderRows() {
    if (!rows.length) {
      return '<tr><td colspan="13"><div class="clue-empty">暂无线索记录</div></td></tr>';
    }
    return rows.map(function (item, index) {
      return '<tr>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + escapeHTML(item.phone) + '</td>' +
        '<td>' + breakText(item.lastVisitTime, ' ') + '</td>' +
        '<td>' + item.visitCount + '</td>' +
        '<td>' + escapeHTML(item.callStatus) + '</td>' +
        '<td class="clue-record-cell" title="' + escapeHTML(item.record) + '">' + shortText(item.record) + '</td>' +
        '<td>' + escapeHTML(item.level) + '</td>' +
        '<td><a href="#" onclick="event.preventDefault();window.Pages[\'result-clue\'].showTags(' + index + ')">查看</a></td>' +
        '<td class="clue-scene-cell">' + breakText(item.sceneName, '-') + '</td>' +
        '<td>' + breakText(item.firstVisitTime, ' ') + '</td>' +
        '<td>' + escapeHTML(item.secondVisitTime) + '</td>' +
        '<td>' + escapeHTML(item.thirdVisitTime || '-') + '</td>' +
        '<td class="clue-action-cell"><a href="#" onclick="event.preventDefault();window.Pages[\'result-clue\'].showDetail(' + index + ')">详情</a></td>' +
      '</tr>';
    }).join('');
  }

  function applyFilters() {
    var page = document.querySelector('.result-clue-page');
    if (!page) return;
    var phone = page.querySelector('#cluePhone').value.trim();
    var status = page.querySelector('#clueStatus').value;
    var scene = page.querySelector('#clueScene').value;
    var level = scene ? page.querySelector('#clueLevel').value : '';
    rows = allRows.filter(function (item) {
      return (!phone || item.phone.indexOf(phone) > -1) &&
        (!status || item.callStatus === status) &&
        (!level || item.level === level) &&
        (!scene || item.sceneName === scene);
    });
    refreshTable();
    showToast('查询完成，共 ' + rows.length + ' 条', 'info');
  }

  function resetFilters() {
    var page = document.querySelector('.result-clue-page');
    if (!page) return;
    page.querySelectorAll('input').forEach(function (input) { input.value = ''; });
    page.querySelectorAll('select').forEach(function (select) { select.selectedIndex = 0; });
    updateLevelFilterVisibility();
    rows = allRows.slice();
    refreshTable();
    showToast('已重置筛选条件');
  }

  function refreshTable() {
    var tbody = document.querySelector('#clueTableBody');
    if (tbody) tbody.innerHTML = renderRows();
    var total = document.querySelector('#clueTotalText');
    if (total) total.textContent = '共 ' + rows.length + ' 条';
  }

  function toggleFilters() {
    var card = document.querySelector('.clue-filter-card');
    var btn = document.querySelector('.clue-collapse-btn');
    if (!card || !btn) return;
    var collapsed = card.classList.toggle('is-collapsed');
    btn.innerHTML = collapsed ? '展开 <span>⌄</span>' : '收起 <span>⌃</span>';
  }

  function updateLevelFilterVisibility() {
    var sceneSelect = document.querySelector('#clueScene');
    var levelItem = document.querySelector('#clueLevelItem');
    var levelSelect = document.querySelector('#clueLevel');
    if (!sceneSelect || !levelItem || !levelSelect) return;
    var sceneName = sceneSelect.value;
    if (!sceneName) {
      levelItem.style.display = 'none';
      levelSelect.innerHTML = '<option value="">请选择</option>';
      return;
    }
    levelItem.style.display = '';
    levelSelect.innerHTML = '<option value="">请选择</option>' + renderLevelOptionsByScene(sceneName);
  }

  function showTags(index) {
    var item = rows[index] || {};
    var detailTags = item.detailTags || {};
    var fields = [
      ['意向标签', detailTags.intent || item.level || '-'],
      ['用户关注', detailTags.concern || '-'],
      ['购车城市', detailTags.city || '-'],
      ['预计到店时间', detailTags.arrivalTime || '-'],
      ['预计购车时间', detailTags.buyTime || '-'],
      ['通话标签', detailTags.callTag || '-']
    ];
    var body = fields.map(function (field) {
      return '<div class="clue-tag-field">' + escapeHTML(field[0]) + ': ' + escapeHTML(field[1]) + '</div>';
    }).join('');
    showTagModal(body);
  }

  function showTagModal(body) {
    var old = document.getElementById('clueTagBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', '<div class="clue-tag-backdrop" id="clueTagBackdrop" onclick="window.Pages[\'result-clue\'].closeTagModal(event)">' +
      '<div class="clue-tag-modal" onclick="event.stopPropagation()">' +
      '<div class="clue-tag-modal-header"><span>客户详细标签</span><button onclick="window.Pages[\'result-clue\'].closeTagModal()">×</button></div>' +
      '<div class="clue-tag-modal-body">' + body + '</div>' +
      '</div></div>');
    document.body.style.overflow = 'hidden';
  }

  function closeTagModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var modal = document.getElementById('clueTagBackdrop');
    if (modal) modal.remove();
    document.body.style.overflow = document.getElementById('clueVisitBackdrop') ? 'hidden' : '';
  }

  function showDetail(index) {
    var item = rows[index] || {};
    var old = document.getElementById('clueVisitBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', '<div class="clue-visit-backdrop" id="clueVisitBackdrop" onclick="window.Pages[\'result-clue\'].closeVisitModal(event)">' +
      '<div class="clue-visit-modal" onclick="event.stopPropagation()">' +
      '<div class="clue-visit-header"><span>详情</span><button onclick="window.Pages[\'result-clue\'].closeVisitModal()">×</button></div>' +
      '<div class="clue-visit-toolbar"><button class="btn btn-primary" onclick="doExport(event)">导 出</button><button class="clue-icon-btn" onclick="showToast(\'已刷新\',\'success\')" title="刷新">↻</button><button class="clue-icon-btn" onclick="showToast(\'字段设置功能开发中\',\'info\')" title="字段设置">⚙</button></div>' +
      '<div class="clue-visit-table-wrap"><table class="clue-visit-table"><thead><tr>' +
      '<th>序号</th><th>回访轮次</th><th>用户号码</th><th>回访记录</th><th>客户详细标签</th><th>意向级别</th><th>通话状态</th><th>通话时长</th><th>通话开始时间</th><th>通话结束时间</th><th>操作</th>' +
      '</tr></thead><tbody><tr>' +
      '<td>1</td><td>第一次回访</td><td>' + escapeHTML(item.phone || '-') + '</td>' +
      '<td class="clue-visit-record" title="' + escapeHTML(item.summary || item.record || '-') + '">' + shortText(item.summary || item.record || '-') + '</td>' +
      '<td><a href="#" onclick="event.preventDefault();window.Pages[\'result-clue\'].showTagsByPhone(\'' + escapeHTML(item.phone || '') + '\')">查看</a></td>' +
      '<td>' + escapeHTML(item.level || '-') + '</td><td>' + escapeHTML(item.callStatus || '-') + '</td><td>16秒</td>' +
      '<td>' + breakText((item.firstVisitTime || '').replace(':10', ':17'), ' ') + '</td><td>' + breakText((item.firstVisitTime || '').replace(':10', ':56'), ' ') + '</td>' +
      '<td><a href="#" onclick="event.preventDefault();window.Pages[\'result-clue\'].showCallDetailByPhone(\'' + escapeHTML(item.phone || '') + '\')">详情</a></td>' +
      '</tr></tbody></table></div>' +
      '<div class="clue-visit-footer"><span>第 1-1 条/总共 1 条</span><button class="clue-page-arrow disabled">‹</button><button class="clue-page-current">1</button><button class="clue-page-arrow disabled">›</button><select><option>20 条/页</option></select></div>' +
      '</div></div>');
    document.body.style.overflow = 'hidden';
  }

  function closeVisitModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var panel = document.getElementById('clueVisitBackdrop');
    if (panel) panel.remove();
    document.body.style.overflow = '';
  }

  function showTagsByPhone(phone) {
    var item = rows.concat(allRows).find(function (row) { return row.phone === phone; }) || {};
    var index = rows.indexOf(item);
    if (index > -1) {
      showTags(index);
      return;
    }
    var detailTags = item.detailTags || {};
    var fields = [
      ['意向标签', detailTags.intent || item.level || '-'],
      ['用户关注', detailTags.concern || '-'],
      ['购车城市', detailTags.city || '-'],
      ['预计到店时间', detailTags.arrivalTime || '-'],
      ['预计购车时间', detailTags.buyTime || '-'],
      ['通话标签', detailTags.callTag || '-']
    ];
    showTagModal(fields.map(function (field) {
      return '<div class="clue-tag-field">' + escapeHTML(field[0]) + ': ' + escapeHTML(field[1]) + '</div>';
    }).join(''));
  }

  function getRowByPhone(phone) {
    return rows.concat(allRows).find(function (row) { return row.phone === phone; }) || rows[0] || allRows[0] || {};
  }

  function renderCallTranscript() {
    var talks = [
      ['客服', '您好~'],
      ['客户', '东风日产来电'],
      ['客服', '喂，尊敬的客户您好，我是东风日产厂家客服，看您之前有关注过日产的车，想问您最近还考虑买车吗？'],
      ['客户', '用户无应答'],
      ['客服', '是这样，日产品牌正在做近期最大的优惠活动，有大额置换补贴、多期免息、终身质保等政策，多款主推车型都有特惠，部分车型日产车主再享2000置换补贴，您看这周要不要来免费试驾体验下']
    ];
    return talks.map(function (row) {
      return '<div class="clue-call-talk-row"><div class="clue-call-speaker">' + row[0] + '</div><div class="clue-call-bubble">' + escapeHTML(row[1]) + '</div></div>';
    }).join('');
  }

  function renderCallResult(item) {
    var detailTags = item.detailTags || {};
    return '<div class="clue-call-result">' +
      '<div class="clue-call-section-title">外呼小结</div>' +
      '<div class="clue-call-summary">客户意向等级为C待筛选，客服向其介绍日产优惠活动并邀请试驾。</div>' +
      '<div class="clue-call-info-row"><span>标签合集：</span><b>-</b></div>' +
      '<div class="clue-call-info-row"><span>购车意向：</span><b>' + escapeHTML(detailTags.intent === 'B(无购车计划)' ? 'non_intention' : '-') + '</b></div>' +
      '<div class="clue-call-info-row"><span>计划到店时间：</span><b>' + escapeHTML(detailTags.arrivalTime || '-') + '</b></div>' +
      '<div class="clue-call-info-row"><span>预计购车时间：</span><b>' + escapeHTML(detailTags.buyTime || '-') + '</b></div>' +
      '<div class="clue-call-info-row"><span>意向品牌中文名：</span><b>-</b></div>' +
      '<div class="clue-call-info-row"><span>意向车系中文名：</span><b>-</b></div>' +
      '<div class="clue-call-info-row"><span>意向等级编码(A-E)：</span><b>E</b></div>' +
      '</div>';
  }

  function renderCallInfo(item) {
    var fields = [
      ['会话 id', '2068963937235734529'],
      ['用户号码', item.phone || '-'],
      ['通话状态', item.callStatus || '-'],
      ['通话开始时间', item.firstVisitTime || '-'],
      ['通话结束时间', (item.firstVisitTime || '').replace(':10', ':56') || '-'],
      ['通话时长', '16秒'],
      ['场景名称', item.sceneName || '-']
    ];
    return '<div class="clue-call-info-list">' + fields.map(function (field) {
      return '<div class="clue-call-info-row"><span>' + escapeHTML(field[0]) + '：</span><b>' + escapeHTML(field[1]) + '</b></div>';
    }).join('') + '</div>';
  }

  function showCallDetailByPhone(phone) {
    var item = getRowByPhone(phone);
    var old = document.getElementById('clueCallBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', '<div class="clue-call-backdrop" id="clueCallBackdrop" onclick="window.Pages[\'result-clue\'].closeCallDetail(event)">' +
      '<div class="clue-call-drawer" onclick="event.stopPropagation()">' +
      '<div class="clue-call-header"><button onclick="window.Pages[\'result-clue\'].closeCallDetail()">×</button><span>会话 id： 2068963937235734529</span></div>' +
      '<div class="clue-call-body">' +
      '<div class="clue-call-left">' +
      '<div class="clue-call-audio"><span>▶</span><span>0:00 / 0:15</span><i></i><span>🔊</span><span>⋮</span><span class="clue-call-audio-icon">🎧</span><span class="clue-call-audio-icon">▣</span></div>' +
      '<div class="clue-call-transcript">' + renderCallTranscript() + '</div>' +
      '</div>' +
      '<div class="clue-call-right">' +
      '<div class="clue-call-tabs"><button class="active" onclick="window.Pages[\'result-clue\'].switchCallTab(this,\'result\',\'' + escapeHTML(item.phone || '') + '\')">外呼结果</button><button onclick="window.Pages[\'result-clue\'].switchCallTab(this,\'info\',\'' + escapeHTML(item.phone || '') + '\')">详细信息</button></div>' +
      '<div class="clue-call-tab-content" id="clueCallTabContent">' + renderCallResult(item) + '</div>' +
      '</div>' +
      '</div></div></div>');
    document.body.style.overflow = 'hidden';
  }

  function switchCallTab(el, tab, phone) {
    var item = getRowByPhone(phone);
    var wrap = el.closest('.clue-call-tabs');
    var content = document.getElementById('clueCallTabContent');
    if (!wrap || !content) return;
    wrap.querySelectorAll('button').forEach(function (btn) { btn.classList.remove('active'); });
    el.classList.add('active');
    content.innerHTML = tab === 'info' ? renderCallInfo(item) : renderCallResult(item);
  }

  function closeCallDetail(e) {
    if (e && e.target !== e.currentTarget) return;
    var panel = document.getElementById('clueCallBackdrop');
    if (panel) panel.remove();
    document.body.style.overflow = document.getElementById('clueVisitBackdrop') ? 'hidden' : '';
  }

  function render() {
    return '<div class="result-clue-page">' +
      '<div class="clue-page-header">' +
      '<span class="clue-title">线索记录</span>' +
      '<span class="clue-subtitle">以线索的维度查看统计结果。</span>' +
      '</div>' +
      '<div class="clue-filter-card">' +
      '<div class="clue-filter-body">' +
      '<div class="clue-filter-item"><label>用户号码：</label><input id="cluePhone" class="clue-input" placeholder="请输入"></div>' +
      '<div class="clue-filter-item"><label>最后回访时间：</label><div class="clue-date-range"><input class="clue-input" type="text" placeholder="请选择"><span>→</span><input class="clue-input" type="text" placeholder="请选择"><span class="clue-calendar">□</span></div></div>' +
      '<div class="clue-filter-item"><label>最后通话状态：</label><select id="clueStatus" class="clue-select"><option value="">请选择</option>' + renderOptions('callStatus') + '</select></div>' +
      '<div class="clue-filter-item" data-anno="result-clue-scene-filter"><label>场景名称：</label><select id="clueScene" class="clue-select" onchange="window.Pages[\'result-clue\'].updateLevelFilterVisibility()"><option value="">请选择</option>' + renderOptions('sceneName') + '</select></div>' +
      '<div class="clue-filter-item" id="clueLevelItem" style="display:none;"><label>最后通话用户意向级别：</label><select id="clueLevel" class="clue-select"><option value="">请选择</option></select></div>' +
      '</div>' +
      '<div class="clue-filter-actions"><button class="btn btn-default" onclick="window.Pages[\'result-clue\'].resetFilters()">重 置</button><button class="btn btn-primary" onclick="window.Pages[\'result-clue\'].applyFilters()">查 询</button><button class="clue-link-btn clue-collapse-btn" onclick="window.Pages[\'result-clue\'].toggleFilters()">收起 <span>⌃</span></button></div>' +
      '</div>' +
      '<div class="clue-table-panel">' +
      '<div class="clue-toolbar"><button class="btn btn-primary" onclick="doExport(event)">导 出</button><button class="clue-icon-btn" onclick="window.Pages[\'result-clue\'].resetFilters()" title="刷新">↻</button><button class="clue-icon-btn" onclick="showToast(\'字段设置功能开发中\',\'info\')" title="字段设置">⚙</button></div>' +
      '<div class="clue-table-scroll"><table class="clue-table"><thead><tr>' +
      '<th>序号</th><th>用户号码</th><th>最后回访时间</th><th>回访次数</th><th>最后通话状态</th><th>最后回访记录</th><th>最后通话意向级别</th><th>客户详细标签</th><th>场景名称</th><th>首次实际回访时间</th><th>二次实际回访时间</th><th>第三次实际回访时间</th><th class="clue-action-cell">操作</th>' +
      '</tr></thead><tbody id="clueTableBody">' + renderRows() + '</tbody></table></div>' +
      '<div class="clue-table-footer"><span id="clueTotalText">共 ' + rows.length + ' 条</span></div>' +
      '</div>' +
      '</div>';
  }

  function init() {
    rows = allRows.slice();
    updateLevelFilterVisibility();
  }

  window.Pages = window.Pages || {};
  window.Pages['result-clue'] = {
    render: render,
    init: init,
    applyFilters: applyFilters,
    resetFilters: resetFilters,
    updateLevelFilterVisibility: updateLevelFilterVisibility,
    toggleFilters: toggleFilters,
    showTags: showTags,
    showTagsByPhone: showTagsByPhone,
    showDetail: showDetail,
    showCallDetailByPhone: showCallDetailByPhone,
    switchCallTab: switchCallTab,
    closeCallDetail: closeCallDetail,
    closeVisitModal: closeVisitModal,
    closeTagModal: closeTagModal
  };
})();
