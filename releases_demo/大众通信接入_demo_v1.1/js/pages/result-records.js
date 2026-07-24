/**
 * js/pages/result-records.js — 通话记录
 */
(function () {
  'use strict';

  var sourceRows = window.MockCallRecordRows || [];
  var rows = dazhongFirst(sourceRows.filter(function (item) {
    return item.platform !== '大众通信' || Boolean(item.callid);
  }));
  var dazhongDetails = window.MockDazhongCallDetailByRecordId || {};
  var sortField = null;   // 'startTime' | 'endTime'
  var sortOrder = 'asc';  // 'asc' | 'desc'
  var audioTimer = null;

  function dazhongFirst(list) {
    return list.slice().sort(function (a, b) {
      return (b.platform === '大众通信') - (a.platform === '大众通信');
    });
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function cleanTranscriptText(value) {
    return String(value || '')
      .replace(/<break\b[^>]*\/?\s*>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extractDazhongDialogRows(records) {
    var list = Array.isArray(records) ? records.slice() : [];
    var keptProgress = {};
    return list.filter(function (record, index) {
      if (record.notify !== 'asrprogress_notify') return true;
      var key = String(record.question_index === undefined ? index : record.question_index);
      var hasFinal = list.slice(index + 1).some(function (next) {
        return next.question_index === record.question_index && next.notify === 'asrmessage_notify';
      });
      if (hasFinal || keptProgress[key]) return false;
      keptProgress[key] = true;
      return true;
    }).sort(function (a, b) {
      return Number(a.sequence || 0) - Number(b.sequence || 0);
    }).reduce(function (dialogRows, record) {
      var question = cleanTranscriptText(record.question);
      var answer = cleanTranscriptText(record.answer_content);
      if (question) dialogRows.push({ role: '客户', text: question, sequence: record.sequence });
      if (answer) dialogRows.push({ role: record.bridge_status ? '人工客服' : 'AI客服', text: answer, sequence: record.sequence });
      return dialogRows;
    }, []);
  }

  function flattenComponentValues(input, output) {
    if (input === undefined || input === null) return output;
    if (Array.isArray(input)) {
      input.forEach(function (item) { flattenComponentValues(item, output); });
      return output;
    }
    if (typeof input !== 'object') return output;
    output.push(input);
    ['children', 'fields', 'items', 'values', 'components', 'component', 'componet'].forEach(function (key) {
      flattenComponentValues(input[key], output);
    });
    return output;
  }

  function getComponentText(component) {
    return ['value', 'text', 'content', 'result', 'answer', 'fieldValue'].map(function (key) {
      return cleanTranscriptText(component[key]);
    }).find(function (value) { return Boolean(value); }) || '';
  }

  function getComponentLabelText(component) {
    return [component.name, component.title, component.label, component.key, component.field, component.fieldName, component.code]
      .map(function (value) { return String(value || '').toLowerCase(); })
      .join(' ');
  }

  function getComponentDisplayName(component) {
    return [component.name, component.title, component.label, component.fieldName, component.field, component.key, component.code].map(function (value) {
      return cleanTranscriptText(value);
    }).find(function (value) { return Boolean(value); }) || '';
  }

  function isSummaryComponent(component) {
    return /通话总结|外呼总结|总结|summary|call_summary/.test(getComponentLabelText(component));
  }

  function extractDazhongComponentSummary(detail) {
    var roots = [detail.componet, detail.component, detail.components, detail.customFields, detail.custom_fields];
    var components = flattenComponentValues(roots, []);
    var summary = components.map(function (component) {
      if (!isSummaryComponent(component)) return '';
      return getComponentText(component);
    }).find(function (value) { return Boolean(value); });
    return summary || '';
  }

  function extractDazhongComponentTagNames(detail) {
    var roots = [detail.componet, detail.component, detail.components, detail.customFields, detail.custom_fields];
    var components = flattenComponentValues(roots, []);
    var seen = {};
    return components.reduce(function (names, component) {
      var name = getComponentDisplayName(component);
      if (!name || isSummaryComponent(component) || !getComponentText(component) || seen[name]) return names;
      seen[name] = true;
      names.push(name);
      return names;
    }, []);
  }

  function formatDazhongCallStatus(code) {
    var mapping = {
      0: '等待呼叫',
      1: '呼叫成功',
      2: '运营商拦截',
      3: '拒接',
      4: '无应答/无人接听',
      5: '空号',
      6: '关机',
      7: '停机',
      8: '占线/用户正忙',
      9: '呼入限制',
      10: '欠费',
      11: '黑名单',
      12: '用户屏蔽'
    };
    return mapping[code] !== undefined ? mapping[code] : (code !== undefined ? code : '-');
  }

  function getFilteredRows() {
    var page = document.querySelector('.result-records-page');
    if (!page) return rows;
    
    var phoneInput = document.getElementById('recordPhone');
    var sceneInput = document.getElementById('recordScene');
    var taskInput = document.getElementById('recordTaskId');
    var phoneVal = phoneInput ? phoneInput.value.trim() : '';
    var sceneVal = sceneInput ? sceneInput.value.trim() : '';
    var taskVal = taskInput ? taskInput.value.trim() : '';
    
    var selects = page.querySelectorAll('.record-select');
    var statusVal = selects[0] ? selects[0].value : '';
    var platformVal = selects[1] ? selects[1].value : '';
    
    var list = rows.filter(function (item) {
      if (platformVal && item.platform !== platformVal) return false;
      if (phoneVal && (item.phone || '').indexOf(phoneVal) === -1) return false;
      if (sceneVal && (item.sceneName || '').indexOf(sceneVal) === -1) return false;
      if (taskVal && (item.taskUuid || '').indexOf(taskVal) === -1) return false;
      if (statusVal) {
        var displayStatus = item.status;
        if (item.platform === '大众通信' && item.status !== undefined) {
          displayStatus = formatDazhongCallStatus(item.status);
        }
        if (displayStatus !== statusVal) return false;
      }
      return true;
    });

    if (!sortField) return dazhongFirst(list);
    list.sort(function (a, b) {
      var va = a[sortField] || '';
      var vb = b[sortField] || '';
      if (sortOrder === 'asc') return va.localeCompare(vb);
      return vb.localeCompare(va);
    });
    return list;
  }

  function renderRows() {
    var list = getFilteredRows();
    if (!list.length) {
      return '<tr><td colspan="12"><div style="text-align:center;padding:48px;color:#bbb;">暂无数据</div></td></tr>';
    }
    return list.map(function (item, index) {
      var displayStatus = item.status;
      if (item.platform === '大众通信' && item.status !== undefined) {
        displayStatus = formatDazhongCallStatus(item.status);
      }
      var realIndex = rows.indexOf(item);
      return '<tr>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + item.phone + '</td>' +
        '<td>' + item.startTime + '</td>' +
        '<td>' + item.endTime + '</td>' +
        '<td>' + item.duration + '</td>' +
        '<td class="record-scene-name">' + item.sceneName + '</td>' +
        '<td title="' + (item.taskUuid || '-') + '">' + (item.taskUuid || '-') + '</td>' +
        '<td>' + displayStatus + '</td>' +
        '<td class="record-summary" title="' + (item.summary || '-') + '">' + (item.summary || '-') + '</td>' +
        '<td>' + (item.platform || '-') + '</td>' +
        '<td>' + (item.lastNode || '-') + '</td>' +
        '<td class="record-action-cell"><a href="#" onclick="event.preventDefault();window.Pages[\'result-records\'].showDetail(' + realIndex + ')">详情</a></td>' +
        '</tr>';
    }).join('');
  }

  function getDefaultDialogRows() {
    return [
      { role: '客服', text: '您好~' },
      { role: '客户', text: '用户无应答' },
      { role: '客服', text: '喂，尊敬的客户您好，我是东风日产厂家客服，看您之前有关注过日产的车，想问您最近还考虑买车吗？' },
      { role: '客户', text: '忙着呢，什么事啊，我知道了，你那有这打电话这个' },
      { role: '客户', text: '哦，我我你能不能联系我了，我知道了，我我现在开着车忙呢，不方便接听啊' },
      { role: '客服', text: '好的，您先忙，稍后安排4S销售顾问联系您，有需要的可以再了解下，感谢您的接听，再见！' }
    ];
  }

  function renderDialogRows(dialogRows) {
    if (!dialogRows || !dialogRows.length) {
      return '<div class="record-detail-empty">本次通话未生成对话文本</div>';
    }
    return dialogRows.map(function (row) {
      return '\n        <div class="record-detail-talk-row">\n          <div class="record-detail-speaker">' + escapeHtml(row.role) + '</div>\n          <div class="record-detail-bubble">' + escapeHtml(row.text) + '</div>\n        </div>';
    }).join('');
  }

  function resolveDetailContext(item) {
    if (item.platform !== '大众通信') {
      return { item: item, isDazhong: false, state: 'legacy', dialogRows: getDefaultDialogRows(), recordingAvailable: true, recordingDuration: '0:23', recordingUrl: 'legacy-provider-recording' };
    }
    var callid = item.callid || '';
    if (!callid) return null;
    var detail = dazhongDetails[callid];
    if (!detail) {
      return { item: item, isDazhong: true, state: 'not-found', callid: callid, recordid: callid, dialogRows: [], recordingAvailable: false };
    }
    var componentSummary = extractDazhongComponentSummary(detail);
    var componentTagNames = extractDazhongComponentTagNames(detail);
    var bailianSummary = cleanTranscriptText(item.bailianSummary || detail.bailianSummary);
    var bailianTagName = cleanTranscriptText(item.bailianTagName || detail.bailianTagName || item.aiTagName);
    var dazhongTagName = cleanTranscriptText(item.dazhongTagName || detail.dazhongTagName || item.aiTagName);
    return {
      item: Object.assign({}, item, detail, {
        summary: componentSummary || bailianSummary || '-',
        bailianSummary: bailianSummary,
        bailianTagName: bailianTagName,
        dazhongTagName: dazhongTagName,
        aiTagName: bailianTagName || item.aiTagName || detail.aiTagName || '-'
      }),
      isDazhong: true,
      state: 'fetched',
      callid: callid,
      recordid: detail.recordid,
      componentSummary: componentSummary,
      componentTagNames: componentTagNames,
      dialogRows: extractDazhongDialogRows(detail.records),
      recordingUrl: item.recordingUrl || '',
      recordingAvailable: Boolean(item.recordingUrl),
      recordingDuration: detail.recordingDuration || '0:00'
    };
  }

  function renderOutboundResult(item, context) {
    if (context && context.isDazhong && context.state !== 'fetched') {
      return '<div class="record-detail-empty record-detail-empty-panel">详情查询暂未命中，请稍后重试。</div>';
    }
    return '\n      <div class="record-detail-fields">\n        <div class="record-detail-section-title">外呼小结</div>\n        <div class="record-detail-summary" data-anno="result-records-summary" style="margin-bottom:16px;">' + (item.summary || '-') + '</div>\n        <div><span class="record-info-label">意向标签：</span><span class="record-info-value">' + (item.aiTagName || '-') + '</span></div>\n        <div><span class="record-info-label">计划到店时间：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">预计购车时间：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">意向品牌中文名：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">意向车系中文名：</span><span class="record-info-value">-</span></div>\n      </div>\n    ';
  }

  function renderDetailInfo(item, context) {
    var displayStatus = item.status || '-';
    if (item.platform === '大众通信' && item.status !== undefined) {
      displayStatus = formatDazhongCallStatus(item.status);
    }
    var isDazhong = Boolean(context && context.isDazhong);
    var submitTime = item.submitTime || '-';
    var dialCount = item.dialCount !== undefined ? item.dialCount : (isDazhong ? '1（回调记录）' : 0);
    var channel = item.channel || (isDazhong && item.callerNumber ? item.callerNumber + '（主叫号码）' : '-');
    var lastCallTime = item.lastCallTime || (isDazhong ? item.startTime : '-') || '-';
    if (isDazhong) {
      var fields = [
        ['会话 id', context.callid || '-'],
        ['用户号码', item.phone || '-'],
        ['场景编码', item.sceneCode || '-'],
        ['场景名称', item.sceneName || '-'],
        ['对话时长', item.duration || '-'],
        ['通话开始时间', item.startTime || '-'],
        ['通话结束时间', item.endTime || '-'],
        ['通话结果', displayStatus],
        ['转人工状态', item.transferStatus || '无转人工'],
        ['转人工时间', item.transferTime || '-'],
        ['用户关注', item.userConcern || '-'],
        ['意向标签', item.dazhongTagName || '-'],
        ['通话标签', context.componentTagNames || []]
      ];
    } else {
      var fields = [
        ['用户号码', item.phone || '-'],
        ['号码提交时间', submitTime],
        ['已拨打次数', dialCount],
        ['外呼通道', channel],
        ['最终外呼时间', lastCallTime],
        ['通话时长', item.duration || '-'],
        ['会话 id', item.sessionId || '-']
      ];
    }
    function renderInfoValue(value) {
      if (Array.isArray(value)) {
        if (!value.length) return '-';
        return '<span class="record-info-pill-list">' + value.map(function (name) {
          return '<span class="record-info-pill">' + escapeHtml(name) + '</span>';
        }).join('') + '</span>';
      }
      return escapeHtml(value);
    }
    var infoRows = fields.map(function (f) {
      return '<div class="record-info-row"><span class="record-info-label">' + escapeHtml(f[0]) + ':</span><span class="record-info-value">' + renderInfoValue(f[1]) + '</span></div>';
    }).join('');
    return '<div class="record-info-list" data-anno="result-records-fields">' + infoRows + '</div>';
  }

  function renderRightPanel(item, context) {
    return '\n      <div class="record-detail-right-tabs">\n        <div class="record-tab active" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'outbound\')">外呼结果</div>\n        <div class="record-tab" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'info\')">详细信息</div>\n      </div>\n      <div class="record-detail-tab-content" id="recordDetailTabContent">\n        ' + renderOutboundResult(item, context) + '\n      </div>\n    ';
  }

  function renderDetailModal(context) {
    var item = context.item;
    var titleLabel = '会话 id：';
    var titleId = context.isDazhong ? context.callid : (item.sessionId || '-');
    var leftContent;
    if (context.isDazhong && context.state !== 'fetched') {
      leftContent = '<div class="record-detail-empty record-detail-empty-main">已使用 recordid 查询，详情暂未返回。</div>';
    } else {
      leftContent = '<section class="record-detail-media-section" data-anno="result-records-recording-player">' +
        '<div class="record-detail-subtitle"><span>通话录音</span></div>' +
        '<div class="record-audio-card">' +
        (context.recordingAvailable ? '<div class="record-audio-pill" title="' + escapeHtml(context.recordingUrl) + '"><button class="record-audio-play" type="button" aria-label="播放录音" onclick="window.Pages[\'result-records\'].toggleAudio(this)">&#9654;</button><span class="record-audio-time"><span class="record-audio-current">0:00</span> / <span class="record-audio-duration">' + context.recordingDuration + '</span></span><span class="record-audio-line" onclick="window.Pages[\'result-records\'].seekAudio(event,this)"><span class="record-audio-progress"></span></span><span class="record-audio-volume" title="音量">&#128266;</span><span class="record-audio-more" title="更多">&#8942;</span></div><span class="record-audio-icon" title="录音">&#127911;</span><span class="record-audio-icon" title="文本">&#128196;</span>' : '<div class="record-detail-empty record-detail-empty-audio">本次未生成录音</div>') +
        '</div></section><section class="record-detail-transcript" data-anno="result-records-transcript-view"><div class="record-detail-subtitle"><span>通话文本</span></div>' + renderDialogRows(context.dialogRows) + '</section>';
    }
    return '\n      <div class="record-detail-backdrop" id="recordDetailBackdrop" onclick="window.Pages[\'result-records\'].closeDetail(event)">\n        <div class="record-detail-modal" onclick="event.stopPropagation()">\n          <div class="record-detail-header">\n            <button class="record-detail-close" onclick="window.Pages[\'result-records\'].closeDetail()">&#215;</button>\n            <span class="record-detail-title">' + titleLabel + ' ' + titleId + '</span>\n          </div>\n          <div class="record-detail-body">\n            <div class="record-detail-left" data-anno="result-records-audio">' + leftContent + '</div>\n            <div class="record-detail-right">\n              <div class="record-detail-content">\n                ' + renderRightPanel(item, context) + '\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  }

  function showDetail(index) {
    var item = rows[index] || rows[0] || {};
    var context = resolveDetailContext(item);
    if (!context) return;
    document.body.insertAdjacentHTML('beforeend', renderDetailModal(context));
    // 存储 index 供 tab 切换使用
    var backdrop = document.getElementById('recordDetailBackdrop');
    if (backdrop) {
      backdrop._detailIndex = index;
      backdrop._detailContext = context;
    }
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
    stopAudioPlayback();
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
    var tbody = document.querySelector('.record-table tbody');
    if (tbody) tbody.innerHTML = renderRows();
    showToast('已重置筛选条件');
  }

  function query() {
    var tbody = document.querySelector('.record-table tbody');
    if (tbody) {
      tbody.innerHTML = renderRows();
    }
    showToast('查询完成', 'info');
  }

  function render() {
    return `
      <div class="result-records-page">
        <div class="record-hero-card" data-anno="result-records-header">
          <div class="record-title">通话记录</div>
          <div class="record-subtitle">查看每一通外呼结果；大众通信先接收通话结束回调，再根据 callid 查询通话详情。</div>
        </div>
        <div class="record-filter-card">
          <div class="record-filter-item"><label>用户号码：</label><input type="text" id="recordPhone" class="record-input" placeholder="请输入"></div>
          <div class="record-filter-item"><label>场景名称：</label><input type="text" id="recordScene" class="record-input" placeholder="请输入"></div>
          <div class="record-filter-item" data-anno="result-records-task-filter"><label>关联任务 ID：</label><input type="text" id="recordTaskId" class="record-input" placeholder="请输入大众任务 uuid"></div>
          <div class="record-filter-item"><label>通话状态：</label><select class="record-select"><option value="">请选择</option><option value="等待呼叫">等待呼叫</option><option value="呼叫成功">呼叫成功</option><option value="运营商拦截">运营商拦截</option><option value="拒接">拒接</option><option value="无应答/无人接听">无应答/无人接听</option><option value="空号">空号</option><option value="关机">关机</option><option value="停机">停机</option><option value="占线/用户正忙">占线/用户正忙</option><option value="呼入限制">呼入限制</option><option value="欠费">欠费</option><option value="黑名单">黑名单</option><option value="用户屏蔽">用户屏蔽</option><option value="已接听">已接听</option><option value="无应答">无应答</option><option value="忙线中">忙线中</option><option value="无法接通">无法接通</option></select></div>
          <div class="record-filter-item"><label>智能平台：</label><select class="record-select"><option value="">全部</option><option value="一知科技">一知科技</option><option value="中科金智能">中科金智能</option><option value="大众通信">大众通信</option></select></div>
          <div class="record-filter-actions"><button class="btn btn-default" onclick="window.Pages['result-records'].resetFilters()">重置</button><button class="btn btn-primary" onclick="window.Pages['result-records'].query()">查询</button></div>
        </div>
        <div class="record-table-panel">
          <div class="record-toolbar"><button class="btn btn-primary" onclick="showToast('导出功能开发中','info')">＋ 导出</button><span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span></div>
          <div class="record-table-scroll"><table class="record-table"><thead><tr>
            <th>序号</th><th>用户号码</th><th>通话开始时间 <span class="sort-toggle" onclick="window.Pages['result-records'].toggleSort('startTime', this)" title="排序">&#8693;</span></th><th>通话结束时间 <span class="sort-toggle" onclick="window.Pages['result-records'].toggleSort('endTime', this)" title="排序">&#8693;</span></th><th>通话时长</th><th>场景名称</th><th>关联任务 ID</th><th>通话状态</th><th>外呼总结</th><th>智能平台</th><th>最后通话节点</th><th class="record-action-cell">操作</th>
          </tr></thead><tbody>${renderRows()}</tbody></table></div>
        </div>
      </div>`;
  }

  function init() {}

  function switchDetailTab(el, tab) {
    var container = document.getElementById('recordDetailTabContent');
    if (!container) return;
    el.parentElement.querySelectorAll('.record-tab').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    if (tab === 'outbound') {
      var outboundIndexEl = el.closest('.record-detail-backdrop');
      var outboundContext = outboundIndexEl ? outboundIndexEl._detailContext : null;
      container.innerHTML = renderOutboundResult(outboundContext ? outboundContext.item : {}, outboundContext);
    } else {
      var indexEl = el.closest('.record-detail-backdrop');
      var detailContext = indexEl ? indexEl._detailContext : null;
      container.innerHTML = renderDetailInfo(detailContext ? detailContext.item : {}, detailContext);
    }
  }

  function toggleSort(field, el) {
    if (sortField === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortOrder = 'asc';
    }
    // 更新排序箭头
    document.querySelectorAll('.sort-toggle').forEach(function (s) { s.textContent = '⇅'; });
    el.textContent = sortOrder === 'asc' ? '↑' : '↓';
    // 刷新表格
    var tbody = document.querySelector('.record-table tbody');
    if (tbody) tbody.innerHTML = renderRows();
  }

  function parseDuration(value) {
    var parts = String(value || '0:00').split(':').map(Number);
    return parts.length === 2 ? (parts[0] * 60 + parts[1]) : 0;
  }

  function formatAudioTime(seconds) {
    var value = Math.max(0, Math.floor(seconds || 0));
    return Math.floor(value / 60) + ':' + String(value % 60).padStart(2, '0');
  }

  function stopAudioPlayback() {
    if (audioTimer) clearInterval(audioTimer);
    audioTimer = null;
  }

  function updateAudioPlayer(card, current, total) {
    var currentEl = card.querySelector('.record-audio-current');
    var progressEl = card.querySelector('.record-audio-progress');
    if (currentEl) currentEl.textContent = formatAudioTime(current);
    if (progressEl) progressEl.style.width = (total ? Math.min(100, current / total * 100) : 0) + '%';
    card._audioCurrent = current;
  }

  function toggleAudio(button) {
    var card = button.closest('.record-audio-card');
    if (!card) return;
    var durationLabel = card.querySelector('.record-audio-duration');
    var total = parseDuration(durationLabel ? durationLabel.textContent : '0:00');
    if (button.classList.contains('is-playing')) {
      stopAudioPlayback();
      button.classList.remove('is-playing');
      button.innerHTML = '&#9654;';
      button.setAttribute('aria-label', '播放录音');
      return;
    }
    stopAudioPlayback();
    document.querySelectorAll('.record-audio-play.is-playing').forEach(function (other) {
      other.classList.remove('is-playing');
      other.innerHTML = '&#9654;';
    });
    button.classList.add('is-playing');
    button.innerHTML = '&#10074;&#10074;';
    button.setAttribute('aria-label', '暂停录音');
    audioTimer = setInterval(function () {
      var next = Number(card._audioCurrent || 0) + 1;
      if (next >= total) {
        next = total;
        stopAudioPlayback();
        button.classList.remove('is-playing');
        button.innerHTML = '&#9654;';
      }
      updateAudioPlayer(card, next, total);
    }, 1000);
  }

  function seekAudio(event, track) {
    var card = track.closest('.record-audio-card');
    if (!card) return;
    var durationLabel = card.querySelector('.record-audio-duration');
    var total = parseDuration(durationLabel ? durationLabel.textContent : '0:00');
    var rect = track.getBoundingClientRect();
    var ratio = rect.width ? Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) : 0;
    updateAudioPlayer(card, Math.round(total * ratio), total);
  }

  window.Pages = window.Pages || {};
  window.Pages['result-records'] = { render: render, init: init, resetFilters: resetFilters, query: query, showDetail: showDetail, closeDetail: closeDetail, toggleSort: toggleSort, switchDetailTab: switchDetailTab, toggleAudio: toggleAudio, seekAudio: seekAudio };
})();
