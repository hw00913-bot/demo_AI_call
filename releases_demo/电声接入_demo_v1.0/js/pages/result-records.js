/**
 * js/pages/result-records.js — 通话记录
 */
(function () {
  'use strict';

  var rows = window.MockCallRecordRows || [];
  var sortField = null;   // 'startTime' | 'endTime'
  var sortOrder = 'asc';  // 'asc' | 'desc'
  var IntentionStatusMap = { '0': '无结果', '1': '无意向', '2': '有意向' };
  var IntentionRankMap = { A: 'A（高意向）', B: 'B（中意向）', C: 'C（低意向）', D: 'D（无意向）' };
  var DianshengCallStatusMap = {
    '301': '已接通',
    '302': '秒挂',
    '303': '伪接通',
    '205': '拒接',
    '206': '无人接听'
  };
  var BailianOutboundFields = ['意向标签', '计划到店时间', '预计购车时间', '意向品牌中文名', '意向车系中文名'];

  function getCallStatusText(item) {
    if (item.platform !== '电声平台') return item.status || '-';
    var detailStatus = DianshengCallStatusMap[String(item.answerStatus || '')];
    if (detailStatus) return detailStatus;
    if (String(item.answerMainStatus) === '3') return '已接通';
    if (String(item.answerMainStatus) === '2') return '无法接通';
    return item.status || '-';
  }

  function getOutboundSummary(item) {
    var dianshengSummary = String(item.dianshengSummary !== undefined ? item.dianshengSummary : (item.summary || '')).trim();
    if (dianshengSummary) return dianshengSummary;
    var bailianSummary = String(item.bailianSummary || '').trim();
    return bailianSummary || '-';
  }

  function getBailianTagValue(value) {
    if (Array.isArray(value)) return value.filter(Boolean).join('、') || '-';
    if (value && typeof value === 'object') return JSON.stringify(value);
    return value === undefined || value === null || value === '' ? '-' : String(value);
  }

  function renderBailianAgentTags(item) {
    var tags = item.bailianAgentTags && typeof item.bailianAgentTags === 'object' && !Array.isArray(item.bailianAgentTags)
      ? item.bailianAgentTags
      : {};
    return BailianOutboundFields.map(function (label) {
      return '<div><span class="record-info-label">' + label + '：</span><span class="record-info-value">' + getBailianTagValue(tags[label]) + '</span></div>';
    }).join('');
  }

  rows.forEach(function (item) {
    if (item.platform === '电声平台') {
      item.status = getCallStatusText(item);
      item.dianshengSummary = item.summary;
      item.summary = getOutboundSummary(item);
    }
  });

  function getSortedRows() {
    var list = rows.slice();
    if (!sortField) return list;
    list.sort(function (a, b) {
      var va = a[sortField] || '';
      var vb = b[sortField] || '';
      if (sortOrder === 'asc') return va.localeCompare(vb);
      return vb.localeCompare(va);
    });
    return list;
  }

  function renderRows() {
    var list = getSortedRows();
    if (!list.length) {
      return '\n        <tr>\n          <td colspan="11">\n            <div style="text-align:center;padding:48px;color:#bbb;">暂无数据</div>\n          </td>\n        </tr>';
    }
    return list.map(function (item, index) {
      return '\n      <tr>\n        <td>' + (index + 1) + '</td>\n        <td>' + item.phone + '</td>\n        <td>' + item.startTime + '</td>\n        <td>' + item.endTime + '</td>\n        <td>' + item.duration + '</td>\n        <td class="record-scene-name">' + item.sceneName + '</td>\n        <td>' + item.status + '</td>\n        <td class="record-summary" title="' + (item.summary || '-') + '">' + (item.summary || '-') + '</td>\n        <td>' + (item.platform || '-') + '</td>\n        <td>' + (item.lastNode || '-') + '</td>\n        <td class="record-action-cell">\n          <a href="#" onclick="event.preventDefault();window.Pages[\'result-records\'].showDetail(' + index + ')">详情</a>\n        </td>\n      </tr>';
    }).join('');
  }

  function renderDialogRows(chatLogs) {
    var logs = chatLogs;
    if (!logs || !logs.length) {
      logs = [
        { role: '客服', text: '您好~' },
        { role: '客户', text: '暂无机器通话记录' }
      ];
    }
    return logs.map(function (row) {
      var speaker = row.role === 'assistant' || row.role === '客服' ? '客服' : '客户';
      return '\n        <div class="record-detail-talk-row">\n          <div class="record-detail-speaker">' + speaker + '</div>\n          <div class="record-detail-bubble">' + row.text + '</div>\n        </div>';
    }).join('');
  }

  function getIntentionStatusText(value) {
    if (value === undefined || value === null || value === '') return '无结果';
    return IntentionStatusMap[String(value)] || String(value);
  }

  function getIntentionRankText(value) {
    if (!value) return '无结果';
    return IntentionRankMap[String(value).toUpperCase()] || String(value);
  }

  function normalizeIntentionTags(value, fallback) {
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    if (value && typeof value === 'object') {
      return Object.keys(value).reduce(function(tags, key) {
        var tagValue = value[key];
        if (tagValue === undefined || tagValue === null || tagValue === '') return tags;
        if (Array.isArray(tagValue)) tagValue = tagValue.join('、');
        else if (typeof tagValue === 'object') tagValue = JSON.stringify(tagValue);
        tags.push(key + '：' + tagValue);
        return tags;
      }, []);
    }
    if (typeof value === 'string' && value && value !== '-') return [value];
    return fallback && fallback !== '-' ? [fallback] : [];
  }

  function renderIntentionTags(item) {
    var tags = normalizeIntentionTags(item.intentionTag, item.aiTagName);
    if (!tags.length) return '<span class="record-intention-empty">无</span>';
    return '<span class="record-intention-tags">' + tags.map(function(tag) {
      return '<span class="record-intention-tag">' + tag + '</span>';
    }).join('') + '</span>';
  }

  function getIntentionTagsText(item) {
    var tags = normalizeIntentionTags(item.intentionTag, item.aiTagName);
    if (!tags.length) tags = ['无'];
    return '<span class="record-info-intent-pills">' + tags.map(function (tag) {
      return '<span class="record-info-intent-pill">' + tag + '</span>';
    }).join('') + '</span>';
  }

  function renderOutboundResult(item) {
    return '\n      <div class="record-detail-fields" data-anno="result-records-summary">\n        <div class="record-detail-section-title">外呼小结</div>\n        <div class="record-detail-summary" style="margin-bottom:16px;">' + getOutboundSummary(item) + '</div>\n        ' + renderBailianAgentTags(item) + '\n      </div>\n    ';
  }

  function renderDetailInfo(item) {
    var fields = [
      ['导入批次号', item.importBatchId || '-'],
      ['执行批次号', item.executeBatchId || '-'],
      ['线索 ID', item.leadId || '-'],
      ['话单 ID', item.callId || item.sessionId || '-'],
      ['通话状态', getCallStatusText(item)],
      ['意向状态', getIntentionStatusText(item.intentionStatus)],
      ['意向等级', getIntentionRankText(item.intentionRank)],
      ['意向标签', getIntentionTagsText(item)],
      ['通话开始时间', item.startTime || '-'],
      ['通话结束时间', item.endTime || '-'],
      ['主叫号码', item.caller || item.callerNumber || '-'],
      ['通话时长', item.duration || '-'],
      ['被叫号码', item.phone || '-'],
      ['主叫号码归属地', item.callerAmapProvinceName && item.callerAmapCityName ? item.callerAmapProvinceName + ' / ' + item.callerAmapCityName : (item.callerLocation || '-')],
      ['客户电话归属地', item.phoneAmapProvinceName && item.phoneAmapCityName ? item.phoneAmapProvinceName + ' / ' + item.phoneAmapCityName : (item.calleeLocation || '-')]
    ];
    var infoRows = fields.map(function (f) {
      var isIntentField = f[0] === '意向状态' || f[0] === '意向等级' || f[0] === '意向标签';
      var intentPositionClass = f[0] === '意向状态' ? ' record-info-row-intent-first' : (f[0] === '意向标签' ? ' record-info-row-intent-last' : '');
      return '<div class="record-info-row' + (isIntentField ? ' record-info-row-intent' + intentPositionClass : '') + '"><span class="record-info-label">' + f[0] + ':</span><span class="record-info-value">' + f[1] + '</span></div>';
    }).join('');
    return '<div class="record-info-list" data-anno="result-records-fields">' + infoRows + '</div>';
  }

  function renderRightPanel(item) {
    return '\n      <div class="record-detail-right-tabs">\n        <div class="record-tab active" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'outbound\')">外呼结果</div>\n        <div class="record-tab" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'info\')">详细信息</div>\n      </div>\n      <div class="record-detail-tab-content" id="recordDetailTabContent">\n        ' + renderOutboundResult(item) + '\n      </div>\n    ';
  }

  function renderDetailModal(item) {
    return '\n      <div class="record-detail-backdrop" id="recordDetailBackdrop" onclick="window.Pages[\'result-records\'].closeDetail(event)">\n        <div class="record-detail-modal" onclick="event.stopPropagation()">\n          <div class="record-detail-header" data-anno="result-records-header">\n            <button class="record-detail-close" onclick="window.Pages[\'result-records\'].closeDetail()">&#215;</button>\n            <span class="record-detail-title">会话 id： ' + (item.sessionId || '-') + '</span>\n          </div>\n          <div class="record-detail-body">\n            <div class="record-detail-left">\n              <div class="record-audio-card" data-anno="result-records-audio">\n                <div class="record-audio-pill">\n                  <span class="record-audio-play">&#9654;</span>\n                  <span>0:00 / 0:23</span>\n                  <span class="record-audio-line"></span>\n                  <span class="record-audio-volume">&#128266;</span>\n                  <span class="record-audio-more">&#8942;</span>\n                </div>\n                <span class="record-audio-icon">&#127911;</span>\n                <span class="record-audio-icon">&#128196;</span>\n              </div>\n              <div class="record-detail-transcript" id="transcriptContent" data-anno="result-records-transcript" style="height:calc(100% - 74px);overflow-y:auto;">\n                ' + renderDialogRows(item.chatLogs) + '\n              </div>\n            </div>\n            <div class="record-detail-right">\n              <div class="record-detail-content">\n                ' + renderRightPanel(item) + '\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  }

  function showDetail(index) {
    var item = rows[index] || rows[0] || {};
    document.body.insertAdjacentHTML('beforeend', renderDetailModal(item));
    var backdrop = document.getElementById('recordDetailBackdrop');
    var title = backdrop ? backdrop.querySelector('.record-detail-title') : null;
    if (title) title.textContent = '话单 ID：' + (item.callId || item.sessionId || '-');
    if (backdrop) backdrop._detailIndex = index;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      var backdrop = document.getElementById('recordDetailBackdrop');
      var drawer = backdrop ? backdrop.querySelector('.record-detail-modal') : null;
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
    });
  }

  function closeDetail(e) {
    if (e && e.target !== e.currentTarget) return;
    var backdrop = document.getElementById('recordDetailBackdrop');
    var drawer = backdrop ? backdrop.querySelector('.record-detail-modal') : null;
    if (!backdrop) return;
    backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(function () {
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
    }, 260);
  }

  function resetFilters() {
    var page = document.querySelector('.result-records-page');
    if (!page) return;
    page.querySelectorAll('input').forEach(function (inp) { inp.value = ''; });
    page.querySelectorAll('select').forEach(function (sel) { sel.selectedIndex = 0; });
    showToast('已重置筛选条件');
  }

  function render() {
    return '\n      <div class="result-records-page">\n        <div class="record-hero-card">\n          <div class="record-title">通话记录</div>\n          <div class="record-subtitle">查看每一通外呼的结果。</div>\n        </div>\n\n        <div class="record-filter-card">\n          <div class="record-filter-item">\n            <label>用户号码：</label>\n            <input type="text" class="record-input" placeholder="请输入">\n          </div>\n          <div class="record-filter-item">\n            <label>场景名称：</label>\n            <input type="text" class="record-input" placeholder="请输入">\n          </div>\n          <div class="record-filter-item">\n            <label>通话状态：</label>\n            <select class="record-select">\n              <option value="">请选择</option>\n              <option value="已接听">已接听</option>\n              <option value="无应答">无应答</option>\n              <option value="忙线中">忙线中</option>\n              <option value="关机">关机</option>\n              <option value="停机">停机</option>\n              <option value="拒接">拒接</option>\n              <option value="无法接通">无法接通</option>\n              <option value="外呼失败">外呼失败</option>\n            </select>\n          </div>\n          <div class="record-filter-item">\n            <label>智能平台：</label>\n            <select class="record-select">\n              <option value="">全部</option>\n              <option value="一知科技">一知科技</option>\n              <option value="中科金智能">中科金智能</option>\n              <option value="电声平台">电声平台</option>\n            </select>\n          </div>\n          <div class="record-filter-actions">\n            <button class="btn btn-default" onclick="window.Pages[\'result-records\'].resetFilters()">重置</button>\n            <button class="btn btn-primary" onclick="showToast(\'查询功能开发中\',\'info\')">查询</button>\n          </div>\n        </div>\n\n        <div class="record-table-panel" data-anno="result-records-list">\n          <div class="record-toolbar">\n            <button class="btn btn-primary" onclick="showToast(\'导出功能开发中\',\'info\')">＋ 导出</button>\n            <span class="biz-icon-btn" onclick="showToast(\'刷新成功\')" title="刷新">&#x21bb;</span>\n          </div>\n          <div class="record-table-scroll">\n            <table class="record-table">\n              <thead>\n                <tr>\n                  <th>序号</th>\n                  <th>用户号码</th>\n                  <th>通话开始时间 <span class="sort-toggle" onclick="window.Pages[\'result-records\'].toggleSort(\'startTime\', this)" title="排序">&#8693;</span></th>\n                  <th>通话结束时间 <span class="sort-toggle" onclick="window.Pages[\'result-records\'].toggleSort(\'endTime\', this)" title="排序">&#8693;</span></th>\n                  <th>通话时长</th>\n                  <th>场景名称</th>\n                  <th>通话状态</th>\n                  <th>外呼总结</th>\n                  <th>智能平台</th>\n                  <th>最后通话节点</th>\n                  <th class="record-action-cell">操作</th>\n                </tr>\n              </thead>\n              <tbody>' + renderRows() + '</tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  }

  function init() {
    var statusSelect = document.querySelector('.record-filter-card .record-select');
    if (statusSelect) {
      statusSelect.innerHTML = '<option value="">请选择</option>' + window.renderMiddleCallStatusOptions();
    }
  }

  function switchDetailTab(el, tab) {
    var container = document.getElementById('recordDetailTabContent');
    if (!container) return;
    el.parentElement.querySelectorAll('.record-tab').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    if (tab === 'outbound') {
      var outboundIndexEl = el.closest('.record-detail-backdrop');
      var outboundIndex = outboundIndexEl ? outboundIndexEl._detailIndex : 0;
      container.innerHTML = renderOutboundResult(rows[outboundIndex] || {});
    } else {
      var indexEl = el.closest('.record-detail-backdrop');
      var index = indexEl ? indexEl._detailIndex : 0;
      var item = rows[index] || {};
      container.innerHTML = renderDetailInfo(item);
    }
  }

  function toggleSort(field, el) {
    if (sortField === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortOrder = 'asc';
    }
    document.querySelectorAll('.sort-toggle').forEach(function (s) { s.textContent = '⇅'; });
    el.textContent = sortOrder === 'asc' ? '↑' : '↓';
    var tbody = document.querySelector('.record-table tbody');
    if (tbody) tbody.innerHTML = renderRows();
  }

  window.Pages = window.Pages || {};
  window.Pages['result-records'] = { render: render, init: init, resetFilters: resetFilters, showDetail: showDetail, closeDetail: closeDetail, toggleSort: toggleSort, switchDetailTab: switchDetailTab };
})();
