/**
 * js/pages/sys-scene.js — 业务场景管理页
 */

(function () {
  'use strict';

  /* 业务场景 mock 数据 */
  const MockSceneRows = [
    { id: 1, name: '东风日产-电声新线索', sceneId: 'DS20260702001', code: 'DS-XXS-001', category: '新线索', tenant: '东风日产-燃油车', platform: '电声平台', updater: '-', updateTime: '2026-07-02 14:55:00', status: 'running' },
    { id: 2, name: '燃油车新线索-一知', sceneId: '2021498427234983938', code: 'AI-XXY', category: '新线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10', status: 'running' },
    { id: 3, name: 'NEV-留资未满-N6推荐', sceneId: '2048744508251602945', code: 'NEV-LZWM-N6', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 4, name: 'NEV-冷线索-天籁推荐-0410版', sceneId: '2046521635889888801', code: 'TL-LXY', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 5, name: 'NEV-留资未满-N7推荐', sceneId: '2048741810617876481', code: 'NEV-LZWM-N7', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 6, name: 'NEV-留资未满-天籁推荐', sceneId: '2048742457857703938', code: 'NEV-LZWM-TL', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 7, name: 'NEV-留资未满-NX8推荐', sceneId: '2048743349159886849', code: 'NEV-LZWM-NX8', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 8, name: 'DCC-一知-N7冷线索', sceneId: '2027729970601218049', code: 'DCC-YZ-N7-LXS', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 9, name: '燃油车新线索-中科金', sceneId: 'ZKJ20260601001', code: 'ZKJ-XXY', category: '新线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-01 09:15:00' },
    { id: 10, name: 'NEV-冷线索-中科金', sceneId: 'ZKJ20260602002', code: 'ZKJ-LXS', category: '冷线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-02 10:30:00' },
    { id: 11, name: 'DCC-中科金-N7冷线索', sceneId: 'ZKJ20260603003', code: 'ZKJ-DCC-N7', category: '冷线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-03 14:00:00' }
  ];
  let SceneRows = MockSceneRows.map(function (row) { return Object.assign({}, row); });

  let DianshengSceneRobotMappingsCache = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getDianshengSceneRobotMappings() {
    if (DianshengSceneRobotMappingsCache) return DianshengSceneRobotMappingsCache;
    var fallback = {
      NEW_LEAD: { sceneTypeName: '新线索', robotCode: 'robot_ds_nissan_001', robotName: '东风日产新线索机器人' },
      COLD_LEAD: { sceneTypeName: '冷线索', robotCode: 'robot_ds_nissan_002', robotName: '东风日产冷线索机器人' }
    };
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'config/diansheng-robots.json?v=2', false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = JSON.parse(xhr.responseText);
        if (data && data.sceneRobotMappings && typeof data.sceneRobotMappings === 'object') {
          DianshengSceneRobotMappingsCache = data.sceneRobotMappings;
          return DianshengSceneRobotMappingsCache;
        }
      }
    } catch (e) {}
    DianshengSceneRobotMappingsCache = fallback;
    return DianshengSceneRobotMappingsCache;
  }

  function getDianshengSceneRobot(sceneTypeName) {
    var leadTypeCode = getDianshengLeadTypeCode(sceneTypeName);
    return getDianshengSceneRobotMappings()[leadTypeCode] || null;
  }

  function renderDianshengRobotOptions() {
    var mappings = getDianshengSceneRobotMappings();
    return Object.keys(mappings).map(function(leadTypeCode) {
      var mapping = mappings[leadTypeCode];
      return '<option value="' + escapeHtml(mapping.robotCode) + '">' +
        escapeHtml(mapping.robotName + '（' + mapping.robotCode + '）') + '</option>';
    }).join('');
  }

  function onDianshengSceneTypeChange() {
    var sceneType = document.querySelector('input[name="sceneType"]:checked');
    var mapping = sceneType ? getDianshengSceneRobot(sceneType.value) : null;
    var nameElement = document.getElementById('dsMatchedRobotName');
    var codeElement = document.getElementById('dsMatchedRobotCode');
    var bindingElement = document.getElementById('dsMatchedRobot');
    if (!nameElement || !codeElement || !bindingElement) return;

    nameElement.textContent = mapping ? mapping.robotName : '暂未配置匹配机器人';
    codeElement.textContent = mapping ? mapping.robotCode : '请联系管理员补充场景与机器人映射';
    bindingElement.classList.toggle('is-missing', !mapping);
  }

  function replaceDianshengRobotSelector() {
    var selector = document.getElementById('dsRobotId');
    if (!selector) return;
    var row = selector.closest('.biz-form-row');
    var label = row ? row.querySelector('.biz-form-label') : null;
    var field = row ? row.querySelector('.biz-form-field') : null;
    if (label) {
      label.textContent = '匹配机器人';
      label.classList.remove('required');
    }
    if (field) {
      field.innerHTML = '<div class="ds-robot-binding" id="dsMatchedRobot">' +
        '<strong id="dsMatchedRobotName">-</strong>' +
        '<span id="dsMatchedRobotCode">-</span>' +
        '</div><span class="ds-robot-binding-help">由场景类型自动匹配，无需手动配置</span>';
    }
    Array.prototype.forEach.call(document.querySelectorAll('input[name="sceneType"]'), function(input) {
      input.addEventListener('change', onDianshengSceneTypeChange);
    });
    onDianshengSceneTypeChange();
  }
  var DianshengCallWindowIndex = 1;

  function renderDianshengCallWindowRow(index) {
    var removeAction = index === 0
      ? '<span class="biz-action-disabled">删除</span>'
      : '<a href="#" class="biz-action-delete" onclick="event.preventDefault();window.Pages[\'sys-scene\'].removeDianshengCallWindow(this)">删除</a>';
    var weekdayHtml = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(function(day) {
      return '<label><input type="checkbox" class="ds-window-weekday" value="' + day + '"><span>' + day + '</span></label>';
    }).join('');
    return '<div class="ds-call-window-row">' +
      '<div class="ds-call-window-head"><span>时段' + (index + 1) + '</span>' + removeAction + '</div>' +
      '<div class="ds-week-list">' + weekdayHtml + '</div>' +
      '<div class="ds-time-editor">' +
        '<input type="time" class="ds-time-input ds-window-start" aria-label="呼叫开始时间">' +
        '<span class="ds-time-arrow">→</span>' +
        '<input type="time" class="ds-time-input ds-window-end" aria-label="呼叫结束时间">' +
      '</div>' +
    '</div>';
  }

  function addDianshengCallWindow() {
    var body = document.getElementById('dsCallWindowList');
    if (!body) return;
    body.insertAdjacentHTML('beforeend', renderDianshengCallWindowRow(DianshengCallWindowIndex++));
  }

  function removeDianshengCallWindow(el) {
    var row = el && el.closest ? el.closest('.ds-call-window-row') : null;
    if (row) row.remove();
  }

  function getDianshengCallWindows() {
    return Array.prototype.map.call(document.querySelectorAll('#dsCallWindowList .ds-call-window-row'), function(row) {
      var weekdays = Array.prototype.map.call(row.querySelectorAll('.ds-window-weekday:checked'), function(el) { return el.value; });
      var startEl = row.querySelector('.ds-window-start');
      var endEl = row.querySelector('.ds-window-end');
      return {
        weekdays: weekdays,
        beginTime: startEl ? startEl.value : '',
        endTime: endEl ? endEl.value : ''
      };
    }).filter(function(win) { return win.weekdays.length || win.beginTime || win.endTime; });
  }

  var DianshengExcludeDateIndex = 1;

  function renderDianshengExcludeDateRow(index) {
    return '<div class="ds-exclude-date-item">' +
      '<input type="date" class="biz-form-input ds-exclude-date-input" aria-label="排除日期' + (index + 1) + '">' +
      '<button type="button" class="ds-icon-action ds-exclude-date-remove" aria-label="删除排除日期" title="删除排除日期" onclick="window.Pages[\'sys-scene\'].removeDianshengExcludeDate(this)">×</button>' +
    '</div>';
  }

  function renderDianshengExcludeDateField() {
    return '<div class="biz-form-row ds-exclude-date-row" id="dsExcludeDateRow">' +
      '<label class="biz-form-label ds-form-label-with-help"><span>排除日期</span><span class="ds-info-icon" tabindex="0" aria-label="查看排除日期说明" data-tooltip="用于配置节假日或禁止拨打日期，日期格式为 yyyy-MM-dd。配置仅在外呼批次启动前生效，批次执行中不支持修改。">i</span></label>' +
      '<div class="biz-form-field ds-exclude-date-field">' +
        '<div class="ds-exclude-date-list" id="dsExcludeDateList">' + renderDianshengExcludeDateRow(0) + '</div>' +
        '<a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].addDianshengExcludeDate()">添加日期</a>' +
      '</div>' +
    '</div>';
  }

  function addDianshengExcludeDate() {
    var list = document.getElementById('dsExcludeDateList');
    if (list) list.insertAdjacentHTML('beforeend', renderDianshengExcludeDateRow(DianshengExcludeDateIndex++));
  }

  function removeDianshengExcludeDate(button) {
    var item = button && button.closest ? button.closest('.ds-exclude-date-item') : null;
    if (item) item.remove();
  }

  function getDianshengExcludeDates() {
    var dates = Array.prototype.map.call(document.querySelectorAll('#dsExcludeDateList .ds-exclude-date-input'), function(input) {
      return input.value;
    }).filter(Boolean);
    return dates.filter(function(date, index) { return dates.indexOf(date) === index; });
  }

  function renderDianshengAutoStartField() {
    return '<div class="biz-form-row ds-auto-start-row" id="dsAutoStartRow">' +
      '<label class="biz-form-label required">是否自动启动</label>' +
      '<div class="biz-form-field ds-auto-start-field">' +
        '<div class="ds-auto-start-control">' +
          '<label class="ds-switch"><input type="checkbox" id="dsAutoStartEnabled" checked onchange="window.Pages[\'sys-scene\'].onDianshengAutoStartChange()"><span></span></label>' +
          '<span class="ds-auto-start-value" id="dsAutoStartValue">是</span>' +
        '</div>' +
        '<div class="ds-auto-start-time hidden" id="dsAutoStartTimeWrap">' +
          '<label class="required" for="dsAutoStartTime">执行时间</label>' +
          '<input type="datetime-local" class="biz-form-input ds-auto-start-time-input" id="dsAutoStartTime" aria-label="自动启动执行时间">' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function onDianshengAutoStartChange() {
    var enabledInput = document.getElementById('dsAutoStartEnabled');
    var valueText = document.getElementById('dsAutoStartValue');
    var timeWrap = document.getElementById('dsAutoStartTimeWrap');
    var timeInput = document.getElementById('dsAutoStartTime');
    var enabled = !enabledInput || enabledInput.checked;
    if (valueText) valueText.textContent = enabled ? '是' : '否';
    if (timeWrap) timeWrap.classList.toggle('hidden', enabled);
    if (timeInput) timeInput.required = !enabled;
  }

  function getDianshengAutoStart() {
    var enabledInput = document.getElementById('dsAutoStartEnabled');
    var timeInput = document.getElementById('dsAutoStartTime');
    var enabled = !enabledInput || enabledInput.checked;
    var autoStart = { enabled: enabled };
    if (!enabled && timeInput && timeInput.value) {
      var executeDateTime = timeInput.value.replace('T', ' ');
      autoStart.executeDateTime = executeDateTime.length === 16 ? executeDateTime + ':00' : executeDateTime;
    }
    return autoStart;
  }

  function renderDianshengIntervalOptions() {
    return ['15', '30', '45', '60', '90', '120'].map(function (value) {
      return '<label class="ds-multi-select-option"><input type="checkbox" class="ds-redial-interval-option" value="' + value + '" onchange="window.Pages[\'sys-scene\'].updateDianshengIntervalSummary(this)"><span>' + value + ' 分钟</span></label>';
    }).join('');
  }

  function renderDianshengIntervalControl() {
    return '<div class="ds-multi-select" onclick="event.stopPropagation()">' +
      '<button type="button" class="biz-form-select ds-multi-select-trigger" onclick="window.Pages[\'sys-scene\'].toggleDianshengIntervalMenu(this)"><span class="ds-multi-select-value">请选择间隔分钟数</span><span class="ds-multi-select-arrow">▾</span></button>' +
      '<div class="ds-multi-select-menu">' + renderDianshengIntervalOptions() + '</div>' +
    '</div>';
  }

  function renderDianshengRedialRuleRow() {
    return '<tr class="ds-redial-rule-row">' +
      '<td><input class="biz-form-input ds-redial-call-status" value="未接通" disabled aria-label="呼叫状态"></td>' +
      '<td><input class="biz-form-input ds-redial-days" type="number" min="1" max="365" value="3" aria-label="最大执行天数"></td>' +
      '<td><input class="biz-form-input ds-redial-times" type="number" min="1" max="20" value="3" aria-label="最大呼叫次数"></td>' +
      '<td>' + renderDianshengIntervalControl() + '</td>' +
    '</tr>';
  }

  function getDianshengRedialRules() {
    var row = document.querySelector('#dsRedialRulesBody .ds-redial-rule-row');
    if (!row) return { days: 1, maxAttempts: 1, intervalMinutes: [] };
    var days = row.querySelector('.ds-redial-days');
    var times = row.querySelector('.ds-redial-times');
    var intervals = row.querySelectorAll('.ds-redial-interval-option:checked');
    var intervalMinutes = Array.prototype.map.call(intervals, function(option) {
      return parseInt(option.value, 10);
    }).filter(function(value) { return Number.isFinite(value) && value > 0; });
    return {
      days: Math.max(1, parseInt(days && days.value, 10) || 1),
      maxAttempts: Math.max(1, parseInt(times && times.value, 10) || 1),
      intervalMinutes: intervalMinutes
    };
  }

  function normalizeDianshengCallCountPanel() {
    var panel = document.getElementById('platformPanelDiansheng');
    if (!panel) return;
    var blacklistGroupSelect = panel.querySelector('#dsBlacklistGroup');
    if (blacklistGroupSelect && blacklistGroupSelect.options.length >= 3) {
      blacklistGroupSelect.options[1].value = 'nissan_default';
      blacklistGroupSelect.options[2].value = 'nissan_test_drive_unsubscribe';
    }
    var callTimeRow = panel.querySelector('.ds-call-time-row');
    if (callTimeRow && !panel.querySelector('#dsExcludeDateRow')) {
      callTimeRow.insertAdjacentHTML('afterend', renderDianshengExcludeDateField());
    }
    var blacklistRow = panel.querySelector('#dsBlacklistEnabled') && panel.querySelector('#dsBlacklistEnabled').closest('.ds-switch-row');
    if (blacklistRow && !panel.querySelector('#dsAutoStartRow')) {
      blacklistRow.insertAdjacentHTML('afterend', renderDianshengAutoStartField());
    }
    var switchRow = panel.querySelector('#dsAutoRedial') && panel.querySelector('#dsAutoRedial').closest('.ds-switch-row');
    if (switchRow) {
      var label = switchRow.querySelector('.biz-form-label');
      var warning = switchRow.querySelector('.ds-warning');
      if (label) label.textContent = '自动重呼配置';
      if (warning) warning.textContent = '按“N天M呼”配置，间隔分钟数按实际呼叫顺序填写';
      var toggle = switchRow.querySelector('.ds-switch');
      if (toggle) toggle.remove();
    }
    var table = panel.querySelector('.ds-redial-table');
    if (table) {
      var headers = table.querySelectorAll('thead th');
      ['呼叫状态', '最大执行天数', '最大呼叫次数', '间隔分钟数'].forEach(function(text, index) {
        if (headers[index]) headers[index].textContent = text;
      });
      for (var i = 4; i < headers.length; i += 1) headers[i].remove();
      var row = table.querySelector('.ds-redial-rule-row');
      if (row) {
        var cells = row.querySelectorAll('td');
        if (cells[0]) cells[0].innerHTML = '<input class="biz-form-input ds-redial-call-status" value="未接通" disabled aria-label="呼叫状态">';
        if (cells[1]) cells[1].innerHTML = '<input class="biz-form-input ds-redial-days" type="number" min="1" max="365" value="3" aria-label="最大执行天数">';
        if (cells[2]) cells[2].innerHTML = '<input class="biz-form-input ds-redial-times" type="number" min="1" max="20" value="3" aria-label="最大呼叫次数">';
        if (cells[3]) cells[3].innerHTML = renderDianshengIntervalControl();
        for (var j = 4; j < cells.length; j += 1) cells[j].remove();
      }
    }
    Array.prototype.forEach.call(panel.querySelectorAll('.ds-redial-field .biz-add-link'), function (link) {
      if (link.textContent.indexOf('添加重呼规则') !== -1) link.remove();
    });
    Array.prototype.forEach.call(panel.querySelectorAll('.ds-switch-row'), function (row) {
      var label = row.querySelector('.biz-form-label');
      if (label && label.textContent.trim() === '规则拦截') row.remove();
    });
  }

  function toggleDianshengIntervalMenu(button) {
    var control = button && button.closest('.ds-multi-select');
    if (control) control.classList.toggle('open');
  }

  function updateDianshengIntervalSummary(input) {
    var control = input && input.closest('.ds-multi-select');
    if (!control) return;
    var values = Array.prototype.map.call(control.querySelectorAll('.ds-redial-interval-option:checked'), function(option) {
      return option.value;
    });
    var valueText = control.querySelector('.ds-multi-select-value');
    if (valueText) valueText.textContent = values.length ? values.join('、') + ' 分钟' : '请选择间隔分钟数';
  }

  function closeDianshengIntervalMenus(event) {
    if (event && event.target.closest && event.target.closest('.ds-multi-select')) return;
    Array.prototype.forEach.call(document.querySelectorAll('.ds-multi-select.open'), function(control) {
      control.classList.remove('open');
    });
  }

  function mapDianshengWeekdays(weekdays) {
    var map = { '周一': 1, '周二': 2, '周三': 3, '周四': 4, '周五': 5, '周六': 6, '周日': 7 };
    return (weekdays || []).map(function(day) { return map[day]; }).filter(Boolean);
  }

  function getDianshengLeadTypeCode(sceneTypeName) {
    var leadTypeMap = {
      '新线索': 'NEW_LEAD',
      '冷线索': 'COLD_LEAD'
    };
    return leadTypeMap[sceneTypeName] || '';
  }

  function renderSceneRowsHtml() {
    return SceneRows.map(function (row) {
      return '\n        <tr>\n          <td>' + row.id + '</td>\n          <td>' + row.name + '</td>\n          <td>' + row.sceneId + '</td>\n          <td>' + row.code + '</td>\n          <td>' + row.category + '</td>\n          <td>' + (row.platform || '一知科技') + '</td>\n          <td>' + row.tenant + '</td>\n          <td>' + row.updater + '</td>\n          <td>' + row.updateTime + '</td>\n          <td>\n            <a href="#" class="biz-action-edit" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showEditModal(' + row.id + ')">编辑</a>\n            <a href="#" class="biz-action-delete" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showDeleteConfirm(' + row.id + ')">删除</a>\n          </td>\n        </tr>';
    }).join('');
  }

  function refreshSceneTable() {
    var tbody = document.getElementById('bizSceneTableBody');
    if (!tbody) return;
    tbody.innerHTML = renderSceneRowsHtml();
  }

  function isRunningScene(scene) {
    return !!(scene && (scene.status === 'running' || scene.status === '进行中'));
  }

  function showDeleteConfirm(sceneId) {
    var row = SceneRows.find(function (item) { return item.id === sceneId; });
    if (!row) return;
    if (isRunningScene(row)) {
      showToast('有进行中的任务无法删除', 'warning');
      return;
    }
    if (document.getElementById('bizDeleteSceneBackdrop')) return;

    var html = '\n      <div class="biz-dialog-backdrop" id="bizDeleteSceneBackdrop" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm(event)">\n        <div class="biz-dialog" onclick="event.stopPropagation()">\n          <div class="biz-dialog-header">\n            <span class="biz-dialog-title">删除确认</span>\n            <span class="biz-dialog-close" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm()">&#x2715;</span>\n          </div>\n          <div class="biz-dialog-body">\n            <div style="font-size:14px;color:#333;line-height:1.7;">确认删除「' + row.name + '」吗？删除后不可恢复。</div>\n          </div>\n          <div class="biz-dialog-footer">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].confirmDeleteScene(' + sceneId + ')" style="height:32px;padding:0 20px;">确认</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeDeleteConfirm(e) {
    if (e && e.target !== e.currentTarget) return;
    var bd = document.getElementById('bizDeleteSceneBackdrop');
    if (bd) bd.remove();
  }

  function confirmDeleteScene(sceneId) {
    SceneRows = SceneRows.filter(function (item) { return item.id !== sceneId; });
    closeDeleteConfirm();
    refreshSceneTable();
    showToast('删除成功', 'success');
  }

  function render() {
    var tableRows = renderSceneRowsHtml();
    return '\n      <div class="scene-list-page">\n        <div class="scene-page-header" style="border-bottom:none;padding-bottom:8px;">\n          <div class="scene-page-title-row">\n            <span class="scene-page-title">业务场景</span>\n          </div>\n          <div class="scene-page-subtitle" style="margin-top:6px;">创建使用智能外呼任务的业务场景，通过分配外呼平台的通话机器人和通话通道完成创建。</div>\n        </div>\n\n        <div class="filter-bar" style="background:#fff;border-radius:10px;padding:16px 24px;margin:0 20px 12px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;box-shadow:0 1px 4px rgba(0,0,0,0.05);border:1px solid #ebeef2;">\n          <div class="filter-item">\n            <label>场景名称：</label>\n            <input type="text" class="filter-input" placeholder="请输入" style="width:180px;">\n          </div>\n          <div class="filter-item">\n            <label>场景分类：</label>\n            <select class="filter-select" style="width:160px;color:#bbb;">\n              <option value="">请选择</option>\n              <option value="new">新线索</option>\n              <option value="cold">冷线索</option>\n            </select>\n          </div>\n          <div class="filter-item">\n            <label>所属平台：</label>\n            <select class="filter-select" style="width:160px;color:#bbb;">\n              <option value="">全部</option>\n              <option value="一知科技">一知科技</option>\n              <option value="中科金智能">中科金智能</option>\n              <option value="电声平台">电声平台</option>\n            </select>\n          </div>\n          <div class="btn-group" style="margin-left:auto;">\n            <button class="btn btn-default" onclick="resetFilter(this.closest(\'.scene-list-page\'))">重置</button>\n            <button class="btn btn-primary" onclick="doQuery()">查询</button>\n          </div>\n        </div>\n\n        <div style="padding:0 20px;margin-bottom:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center;">\n          <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].showAddModal()" style="height:34px;padding:0 16px;border-radius:6px;font-size:13px;display:flex;align-items:center;gap:6px;" data-anno="sys-scene-add-btn">\n            <span style="font-size:15px;font-weight:500;">+</span> 新增业务场景\n          </button>\n          <span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>\n          <span class="biz-icon-btn" onclick="showToast(\'设置功能开发中\',\'info\')" title="设置">&#x2699;</span>\n        </div>\n\n        <div class="table-wrap" style="margin:0 20px 20px;flex:1;overflow:hidden;display:flex;flex-direction:column;" data-anno="sys-scene-table">\n          <div class="table-container" style="flex:1;overflow:auto;">\n            <table class="data-table biz-scene-table" style="min-width:1300px;">\n              <thead>\n                <tr>\n                  <th>序号</th>\n                  <th>场景名称</th>\n                  <th>场景id</th>\n                  <th>场景编码</th>\n                  <th>场景分类</th>\n                  <th>所属平台</th>\n                  <th>可用租户</th>\n                  <th>更新人</th>\n                  <th>更新时间</th>\n                  <th style="text-align:center;">操作</th>\n                </tr>\n              </thead>\n              <tbody id="bizSceneTableBody">\n                ' + tableRows + '\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  }

  /* ===== 新建/编辑业务场景抽屉 ===== */
  function showAddModal(modalTitle) {
    modalTitle = modalTitle || '新建业务场景';
    DianshengCallWindowIndex = 1;
    var dsRobotOptionsHtml = renderDianshengRobotOptions();
    var html = '\n      <div class="biz-drawer-backdrop" id="bizAddSceneBackdrop" onclick="window.Pages[\'sys-scene\'].closeAddModal(event)">\n        <div class="biz-drawer" id="bizAddSceneDrawer" onclick="event.stopPropagation()">\n          <div class="biz-drawer-header">\n            <span class="biz-drawer-title">' + modalTitle + '</span>\n            <span class="biz-drawer-close" onclick="window.Pages[\'sys-scene\'].closeAddModal()">&#x2715;</span>\n          </div>\n\n          <div class="biz-drawer-body">\n            <!-- 表单 -->\n            <div class="biz-form">\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景名称</label>\n                <div class="biz-form-field">\n                  <input type="text" class="biz-form-input" placeholder="给场景起个名字" maxlength="20" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'nameCount\',20)">\n                  <span class="biz-char-count" id="nameCount">0 / 20</span>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景编码</label>\n                <div class="biz-form-field">\n                  <input type="text" class="biz-form-input" placeholder="请输入字母、数字、符号" maxlength="20" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'codeCount\',20)">\n                  <span class="biz-char-count" id="codeCount">0 / 20</span>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label">场景描述</label>\n                <div class="biz-form-field">\n                  <textarea class="biz-form-textarea" placeholder="请输入场景简要描述" rows="3"></textarea>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">可用租户</label>\n                <div class="biz-form-field">\n                  <div class="biz-checkbox-group">\n                    <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝兴"><span>重庆东南方渝兴</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝发"><span>重庆东南方渝发</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="东风日产-点检"><span>东风日产-点检</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="东风日产-燃油车"><span>东风日产-燃油车</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="超级管理组"><span>超级管理组</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">智能平台</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="platform" value="电声平台" checked data-anno="sys-scene-platform-diansheng" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>电声平台</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="冰兰" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>冰兰</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="科大讯飞" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>科大讯飞</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="一知科技" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>一知科技</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="中科金智能" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>中科金智能</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景类型</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="首访"><span>首访</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="服务"><span>服务</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="回访"><span>回访</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="新线索" checked><span>新线索</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="冷线索"><span>冷线索</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row" id="importTypeRowDefault">\n                <label class="biz-form-label required">数据导入方式</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="importType" value="手动导入"><span>手动导入</span></label>\n                    <label class="biz-radio"><input type="radio" name="importType" value="自动传入" checked><span>自动传入</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <!-- 平台面板切换区 -->\n              <!-- 电声平台面板 -->\n              <div id="platformPanelDiansheng" class="biz-platform-panel" data-anno="sys-scene-diansheng-panel">\n                <div class="ds-call-strategy">\n                  <div class="ds-call-title">呼叫任务配置</div>\n                  <div class="biz-form-row">\n                    <label class="biz-form-label required">机器人id</label>\n                    <div class="biz-form-field">\n                      <select class="biz-form-select" id="dsRobotId">' + dsRobotOptionsHtml + '</select>\n                    </div>\n                  </div>\n                  <div class="biz-form-row ds-call-time-row">\n                    <label class="biz-form-label required">呼叫时段</label>\n                    <div class="biz-form-field ds-call-time-field">\n                      <div class="ds-call-window-list" id="dsCallWindowList">\n                        ' + renderDianshengCallWindowRow(0) + '\n                      </div>\n                      <span class="ds-error-text">请至少配置一个完整的呼叫时段</span>\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].addDianshengCallWindow()">添加时段</a>\n                    </div>\n                  </div>\n                  <div class="biz-form-row ds-switch-row">\n                    <label class="biz-form-label required">自动重拨</label>\n                    <div class="biz-form-field ds-switch-field">\n                      <label class="ds-switch"><input type="checkbox" id="dsAutoRedial"><span></span></label>\n                      <span class="ds-warning">△ 中途修改自动重拨配置后，已有的待重拨号码将不执行重拨</span>\n                    </div>\n                  </div>\n                  <div class="biz-form-row ds-redial-row">\n                    <label class="biz-form-label"></label>\n                    <div class="biz-form-field ds-redial-field">\n                      <table class="ds-redial-table">\n                        <thead><tr><th>首次呼叫状态</th><th>重拨次数</th><th>重拨间隔</th><th>启用</th><th>操作</th></tr></thead>\n                        <tbody id="dsRedialRulesBody">\n                          ' + renderDianshengRedialRuleRow(0) + '\n                        </tbody>\n                      </table>\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].addDianshengRedialRule()">添加重呼规则</a>\n                    </div>\n                  </div>\n                  <div class="biz-form-row ds-switch-row">\n                    <label class="biz-form-label">黑名单拦截</label>\n                    <div class="biz-form-field ds-stack-field">\n                      <label class="ds-switch"><input type="checkbox" id="dsBlacklistEnabled"><span></span></label>\n                      <select class="biz-form-select ds-long-select" id="dsBlacklistGroup"><option value="">请选择黑名单分组</option><option>东风日产默认黑名单</option><option>试驾退订黑名单</option></select>\n                    </div>\n                  </div>\n                  <div class="biz-form-row ds-switch-row">\n                    <label class="biz-form-label">规则拦截</label>\n                    <div class="biz-form-field ds-stack-field">\n                      <label class="ds-switch"><input type="checkbox" id="dsRuleBlockEnabled"><span></span></label>\n                      <select class="biz-form-select ds-wide-select" id="dsRuleBlockGroup"><option value="">选择拦截分组</option><option>重复号码拦截</option><option>夜间号码拦截</option><option>高频呼叫拦截</option></select>\n                    </div>\n                  </div>\n                </div>\n                <div class="biz-form-row" id="dsModelTypeRow">\n                  <label class="biz-form-label required">模型类型</label>\n                  <div class="biz-form-field">\n                    <div class="biz-radio-group">\n                      <label class="biz-radio"><input type="radio" name="dsModelType" value="小模型" onchange="window.Pages[\'sys-scene\'].onDsModelTypeChange()"><span>小模型</span></label>\n                      <label class="biz-radio"><input type="radio" name="dsModelType" value="大模型" onchange="window.Pages[\'sys-scene\'].onDsModelTypeChange()"><span>大模型</span></label>\n                    </div>\n                  </div>\n                </div>\n                <div class="biz-form-row hidden" id="dsAccountRow">\n                  <label class="biz-form-label required">选择电声账号</label>\n                  <div class="biz-form-field">\n                    <select class="biz-form-select" id="dsAccountSelect">\n                      <option value="">请选择账号</option>\n                      <option value="电声账号 A" data-model="大模型">电声账号 A（大模型）</option>\n                      <option value="电声账号 B" data-model="小模型">电声账号 B（小模型）</option>\n                    </select>\n                  </div>\n                </div>\n              </div>\n\n              <!-- 一知科技面板 -->\n              <div id="platformPanelYizhi" class="biz-platform-panel hidden">\n                <div class="biz-form-row">\n                  <label class="biz-form-label required">一知科技场景id</label>\n                  <div class="biz-form-field">\n                    <input type="text" class="biz-form-input" placeholder="请输入一知科技平台创建的自助场景id">\n                  </div>\n                </div>\n\n                <div class="biz-form-row">\n                  <label class="biz-form-label"></label>\n                  <div class="biz-form-field">\n                    <div class="biz-modal-notice" style="margin:0;flex:1;">\n                      <span class="biz-notice-icon">&#x26A0;</span>\n                      <div class="biz-notice-body">你需要先在一知后台创建自动任务后，将自动任务 id 复制粘贴到此处完成关联。</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="biz-form-row hidden" id="modelTypeRow">\n                  <label class="biz-form-label required">模型类型</label>\n                  <div class="biz-form-field">\n                    <div class="biz-radio-group">\n                      <label class="biz-radio"><input type="radio" name="modelType" value="小模型" onchange="window.Pages[\'sys-scene\'].onModelTypeChange()"><span>小模型</span></label>\n                      <label class="biz-radio"><input type="radio" name="modelType" value="大模型" onchange="window.Pages[\'sys-scene\'].onModelTypeChange()"><span>大模型</span></label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <!-- 中科金智能面板（参照一知科技字段结构） -->\n              <div id="platformPanelZhongkejin" class="biz-platform-panel hidden">\n                <div class="biz-form-row">\n                  <label class="biz-form-label required">中科金任务id</label>\n                  <div class="biz-form-field">\n                    <input type="text" class="biz-form-input" placeholder="请输入中科金智能平台创建的外呼任务id">\n                  </div>\n                </div>\n\n                <div class="biz-form-row">\n                  <label class="biz-form-label"></label>\n                  <div class="biz-form-field">\n                    <div class="biz-modal-notice" style="margin:0;flex:1;">\n                      <span class="biz-notice-icon">&#x26A0;</span>\n                      <div class="biz-notice-body">你需要先在中科金后台创建自动任务后，将自动任务 id 复制粘贴到此处完成关联。</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="biz-form-row hidden" id="zkjModelTypeRow">\n                  <label class="biz-form-label required">模型类型</label>\n                  <div class="biz-form-field">\n                    <div class="biz-radio-group">\n                      <label class="biz-radio"><input type="radio" name="zkjModelType" value="小模型" onchange="window.Pages[\'sys-scene\'].onZkjModelTypeChange()"><span>小模型</span></label>\n                      <label class="biz-radio"><input type="radio" name="zkjModelType" value="大模型" onchange="window.Pages[\'sys-scene\'].onZkjModelTypeChange()"><span>大模型</span></label>\n                    </div>\n                  </div>\n                </div>\n                <div class="biz-form-row hidden" id="zkjAccountRow">\n                  <label class="biz-form-label required">选择中科金账号</label>\n                  <div class="biz-form-field">\n                    <select class="biz-form-select" disabled>\n                      <option>默认账号</option>\n                    </select>\n                  </div>\n                </div>\n              </div>\n              <div class="biz-form-row" style="align-items:flex-start;margin-top:30px;">\n                <label class="biz-form-label required">业务信息</label>\n                <div class="biz-form-field" style="flex-direction:column;align-items:flex-start;gap:0;">\n                  <div class="biz-inner-tabs">\n                    <div class="biz-inner-tab active" onclick="window.Pages[\'sys-scene\'].switchBizTab(this,\'input\')"><span class="biz-required-tag">*</span> 场景传入信息</div>\n                    <div class="biz-inner-tab" onclick="window.Pages[\'sys-scene\'].switchBizTab(this,\'extract\')">场景提取信息</div>\n                  </div>\n                  <div class="biz-inner-panel" id="bizPanel-input">\n                    <table class="biz-inner-table">\n                      <thead>\n                        <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td colspan="5">\n                            <div class="biz-empty-mini">\n                              <div class="biz-empty-icon">&#128230;</div>\n                              <div class="biz-empty-text">暂无数据</div>\n                            </div>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                    <div class="biz-add-field-row">\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showFieldModal(\'场景传入信息\')">+ 添加字段</a>\n                    </div>\n                  </div>\n                  <div class="biz-inner-panel" id="bizPanel-extract" style="display:none;">\n                    <table class="biz-inner-table">\n                      <thead>\n                        <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td colspan="5">\n                            <div class="biz-empty-mini">\n                              <div class="biz-empty-icon">&#128230;</div>\n                              <div class="biz-empty-text">暂无数据</div>\n                            </div>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                    <div class="biz-add-field-row">\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showFieldModal(\'场景提取信息\')">+ 添加字段</a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class="biz-drawer-footer" id="bizModalFooter">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeAddModal()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" id="bizSceneSubmitBtn" onclick="window.Pages[\'sys-scene\'].submitAddModal()" style="height:32px;padding:0 20px;">确定</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
    replaceDianshengRobotSelector();
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', closeDianshengIntervalMenus);
    requestAnimationFrame(function () {
      var backdrop = document.getElementById('bizAddSceneBackdrop');
      var drawer = document.getElementById('bizAddSceneDrawer');
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
      // 抽屉打开后刷新标注点，使抽屉内元素的标注可见
      setTimeout(function () {
        if (window.AnnotationRuntime && window.AnnotationRuntime.refresh) {
          window.AnnotationRuntime.refresh();
        }
      }, 350);
    });
    onPlatformChange();
  }

  function closeAddModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var backdrop = document.getElementById('bizAddSceneBackdrop');
    var drawer = document.getElementById('bizAddSceneDrawer');
    if (!backdrop && !drawer) return;
    if (backdrop) backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(function () {
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
      document.removeEventListener('click', closeDianshengIntervalMenus);
      if (window.AnnotationRuntime && window.AnnotationRuntime.refresh) {
        window.AnnotationRuntime.refresh();
      }
    }, 320);
  }

  function showEditModal(sceneId) {
    showAddModal('编辑业务场景');
  }

  function updateCharCount(input, id, limit) {
    var el = document.getElementById(id);
    if (el) el.textContent = input.value.length + ' / ' + limit;
  }

  function switchBizTab(el, tab) {
    var parent = el.closest('.biz-form-field');
    parent.querySelectorAll('.biz-inner-tab').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    parent.querySelectorAll('.biz-inner-panel').forEach(function (p) { p.style.display = 'none'; });
    var panel = parent.querySelector('#bizPanel-' + tab);
    if (panel) panel.style.display = 'block';
  }

  function buildDianshengStrategyRequest(payload) {
    var seq = Date.now().toString().slice(-8);
    return {
      strategyCode: 'STR_DS_' + seq,
      strategyName: payload.name + '任务',
      leadTypeRobotMapping: {
        leadTypeCode: payload.leadTypeCode,
        leadTypeName: payload.sceneTypeName,
        robotCode: payload.robotId
      },
      callTimeWindow: {
        windows: (payload.callWindows || []).map(function(win) {
          return {
            beginTime: win.beginTime,
            endTime: win.endTime,
            weekdays: mapDianshengWeekdays(win.weekdays)
          };
        }),
        excludeDates: payload.excludeDates || []
      },
      nDayMCallPolicy: payload.redialRules,
      humanTransfer: { enabled: false },
      blacklistCheck: { enabled: payload.blacklistEnabled, blacklistGroupCode: payload.blacklistGroup || 'nissan_default' },
      autoStart: payload.autoStart,
      remark: '由智能外呼中台业务场景创建'
    };
  }

  function callDianshengCreateStrategy(requestPayload) {
    if (window.DianshengApiAdapter && typeof window.DianshengApiAdapter.createStrategy === 'function') {
      return Promise.resolve(window.DianshengApiAdapter.createStrategy(requestPayload));
    }

    // 静态原型默认模拟 /strategy/policy/create；接入环境由 DianshengApiAdapter 替换。
    return new Promise(function(resolve) {
      setTimeout(function() {
        var failMode = window.location.search.indexOf('dianshengApi=fail') !== -1;
        if (failMode) {
          resolve({ code: 'E5001', message: '电声服务暂时不可用', data: null });
          return;
        }
        resolve({
          code: 'S0000',
          message: 'SUCCESS',
          data: {
            strategyId: Number(requestPayload.strategyCode.replace(/\D/g, '').slice(-8)) || Date.now(),
            strategyCode: requestPayload.strategyCode,
            statusType: 1,
            createdTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
          }
        });
      }, 500);
    });
  }

  function createDianshengTask(payload, requestPayload, responseData) {
    return {
      taskCode: responseData.strategyCode,
      strategyId: responseData.strategyId,
      strategyCode: responseData.strategyCode,
      statusType: Number(responseData.statusType),
      strategyStatus: responseData.statusType === 1 ? 'ACTIVE' : 'FROZEN',
      taskName: payload.name,
      strategyName: requestPayload.strategyName,
      accountName: payload.accountName,
      modelType: payload.modelType,
      robotId: payload.robotId,
      robotName: payload.robotName,
      sceneTypeName: payload.sceneTypeName,
      leadTypeCode: payload.leadTypeCode,
      callWindows: payload.callWindows,
      callWeekdays: payload.callWeekdays,
      callTimeRange: payload.callTimeRange,
      leadTypeRobotMapping: requestPayload.leadTypeRobotMapping,
      callTimeWindow: requestPayload.callTimeWindow,
      nDayMCallPolicy: requestPayload.nDayMCallPolicy,
      humanTransfer: requestPayload.humanTransfer,
      blacklistCheck: requestPayload.blacklistCheck,
      autoStart: requestPayload.autoStart,
      remark: requestPayload.remark,
      blacklistEnabled: payload.blacklistEnabled,
      blacklistGroup: payload.blacklistGroup,
      source: 'createTaskApi'
    };
  }

  function setDianshengSubmitLoading(loading) {
    var button = document.getElementById('bizSceneSubmitBtn');
    if (!button) return;
    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = '生成任务中...';
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalText || '确定并生成任务';
      button.disabled = false;
    }
  }

  async function submitAddModal() {
    var nameInput = document.querySelector('#bizAddSceneDrawer input[placeholder="给场景起个名字"]');
    var codeInput = document.querySelector('#bizAddSceneDrawer input[placeholder="请输入字母、数字、符号"]');
    var platformEl = document.querySelector('input[name="platform"]:checked');
    var sceneTypeEl = document.querySelector('input[name="sceneType"]:checked');
    
    var name = nameInput ? nameInput.value.trim() : '';
    var code = codeInput ? codeInput.value.trim() : '';
    var platform = platformEl ? platformEl.value : '电声平台';
    var sceneTypeName = sceneTypeEl ? sceneTypeEl.value : '新线索';
    var dsLeadTypeCode = platform === '电声平台' ? getDianshengLeadTypeCode(sceneTypeName) : '';
    var dsRobotMapping = platform === '电声平台' ? getDianshengSceneRobot(sceneTypeName) : null;
    var dsModelTypeEl = document.querySelector('input[name="dsModelType"]:checked');
    var dsAccountSelect = document.getElementById('dsAccountSelect');
    var dsModelType = dsModelTypeEl ? dsModelTypeEl.value : '';
    var dsAccountName = dsAccountSelect ? dsAccountSelect.value : '';
    var dsRobotId = dsRobotMapping ? dsRobotMapping.robotCode : '';
    var dsCallWindows = getDianshengCallWindows();
    var dsCallWindowInvalid = dsCallWindows.some(function(win) { return !win.weekdays.length || !win.beginTime || !win.endTime || win.beginTime >= win.endTime; });
    var dsWeekdays = Array.from(new Set(dsCallWindows.reduce(function(all, win) { return all.concat(win.weekdays); }, [])));
    var dsCallTimeRange = dsCallWindows.map(function(win) { return win.beginTime + '-' + win.endTime; }).join('、');
    var dsExcludeDates = getDianshengExcludeDates();
    var dsRedialRules = getDianshengRedialRules();
    var dsAutoStart = getDianshengAutoStart();
    
    if (!name || !code) {
      showToast('请填写必填项', 'warning');
      return;
    }
    
    if (platform === '电声平台' && (!dsLeadTypeCode || !dsCallWindows.length || dsCallWindowInvalid)) {
      showToast('请配置完整且起止时间有效的呼叫时段', 'warning');
      return;
    }

    if (platform === '电声平台' && !dsRedialRules.intervalMinutes.length) {
      showToast('请至少选择一个间隔分钟数', 'warning');
      return;
    }

    if (platform === '电声平台' && !dsRobotMapping) {
      showToast('当前场景类型暂未配置机器人，请联系管理员', 'warning');
      return;
    }
    
    if (platform === '电声平台' && (!dsModelType || !dsAccountName)) {
      showToast('请选择模型类型和电声账号', 'warning');
      return;
    }

    if (platform === '电声平台' && !dsAutoStart.enabled && !dsAutoStart.executeDateTime) {
      showToast('请选择自动启动执行时间', 'warning');
      return;
    }

    var dsBlacklistEnabled = !!(document.getElementById('dsBlacklistEnabled') && document.getElementById('dsBlacklistEnabled').checked);
    var dsBlacklistGroup = document.getElementById('dsBlacklistGroup') ? document.getElementById('dsBlacklistGroup').value : '';
    if (platform === '电声平台' && dsBlacklistEnabled && !dsBlacklistGroup) {
      showToast('请选择黑名单分组', 'warning');
      return;
    }

    var generatedTask = null;
    if (platform === '电声平台') {
      var dianshengPayload = {
        name: name,
        modelType: dsModelType,
        accountName: dsAccountName,
        robotId: dsRobotId,
        robotName: dsRobotMapping.robotName,
        sceneTypeName: sceneTypeName,
        leadTypeCode: dsLeadTypeCode,
        callWindows: dsCallWindows,
        callWeekdays: dsWeekdays,
        callTimeRange: dsCallTimeRange,
        excludeDates: dsExcludeDates,
        redialRules: dsRedialRules,
        autoStart: dsAutoStart,
        blacklistEnabled: dsBlacklistEnabled,
        blacklistGroup: dsBlacklistGroup
      };
      var strategyRequest = buildDianshengStrategyRequest(dianshengPayload);
      setDianshengSubmitLoading(true);
      try {
        var strategyResponse = await callDianshengCreateStrategy(strategyRequest);
        var responseData = strategyResponse && strategyResponse.data;
        if (!strategyResponse || strategyResponse.code !== 'S0000' || !responseData || !responseData.strategyId || !responseData.strategyCode) {
          throw new Error(strategyResponse && strategyResponse.message ? strategyResponse.message : '新增外呼策略失败');
        }
        generatedTask = createDianshengTask(dianshengPayload, strategyRequest, responseData);
      } catch (error) {
        showToast('任务生成失败：' + (error && error.message ? error.message : '电声接口异常'), 'error');
        return;
      } finally {
        setDianshengSubmitLoading(false);
      }
    }

    var newId = MockSceneList.length > 0 ? Math.max.apply(null, MockSceneList.map(function(s) { return s.id; })) + 1 : 13;
    
    // 插入到页面内部 rows 列表
    var newScene = {
      id: newId,
      name: name,
      sceneId: 'DS' + Date.now().toString().slice(-8),
      code: code,
      category: sceneTypeName,
      leadTypeCode: dsLeadTypeCode,
      tenant: '东风日产-燃油车',
      platform: platform,
      updater: 'xtadmin',
      updateTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'not_started'
    };
    
    SceneRows.push(newScene);
    
    // 同时也塞进外呼列表 MockSceneList
    MockSceneList.push({
      id: newId,
      name: name,
      status: generatedTask && generatedTask.statusType === 1 ? 'running' : 'paused',
      statusType: generatedTask ? generatedTask.statusType : 0,
      source: '接口传入',
      platform: platform,
      assigned: 0,
      pending: 0,
      called: 0
    });
    
    // 配置详情
    MockZkjTaskDetail[newId] = {
      taskCode: generatedTask ? generatedTask.taskCode : 'job_ds_' + newId,
      taskName: name,
      strategyId: generatedTask ? generatedTask.strategyId : newId,
      strategyCode: generatedTask ? generatedTask.strategyCode : 'STR_DS_' + newId,
      strategyName: generatedTask ? generatedTask.strategyName : name + '任务',
      statusType: generatedTask ? generatedTask.statusType : 0,
      strategyStatus: generatedTask ? generatedTask.strategyStatus : 'ACTIVE',
      sceneTypeName: generatedTask ? generatedTask.sceneTypeName : sceneTypeName,
      leadTypeCode: generatedTask ? generatedTask.leadTypeCode : '',
      createdTime: newScene.updateTime,
      updatedTime: newScene.updateTime,
      leadTypeRobotMapping: generatedTask ? generatedTask.leadTypeRobotMapping : null,
      callTimeWindow: generatedTask ? generatedTask.callTimeWindow : null,
      nDayMCallPolicy: generatedTask ? generatedTask.nDayMCallPolicy : null,
      humanTransfer: generatedTask ? generatedTask.humanTransfer : { enabled: false },
      blacklistCheck: generatedTask ? generatedTask.blacklistCheck : { enabled: false, blacklistGroupCode: '' },
      autoStart: generatedTask ? generatedTask.autoStart : { enabled: true },
      remark: generatedTask ? generatedTask.remark : '由智能外呼中台创建',
      createdAt: newScene.updateTime,
      robotId: generatedTask ? generatedTask.robotId : '-',
      robotName: generatedTask ? generatedTask.robotName : '东风日产线索机器人',
      modelType: generatedTask ? generatedTask.modelType : (dsModelType || '-'),
      accountName: generatedTask ? generatedTask.accountName : (dsAccountName || '-'),
      dsBlacklistEnabled: generatedTask ? generatedTask.blacklistEnabled : false,
      dsBlacklistGroup: generatedTask ? (generatedTask.blacklistGroup || '-') : '-'
    };
    
    showToast(generatedTask ? '创建成功，已调用电声接口生成任务：' + generatedTask.taskCode : '创建成功', 'success');
    closeAddModal();
    refreshSceneTable();
  }

  /* ===== 添加场景信息弹窗（小弹窗，居中） ===== */
  function showFieldModal(bizType) {
    var html = '\n      <div class="biz-dialog-backdrop" id="bizFieldBackdrop" onclick="window.Pages[\'sys-scene\'].closeFieldModal(event)">\n        <div class="biz-dialog" onclick="event.stopPropagation()">\n          <div class="biz-dialog-header">\n            <span class="biz-dialog-title">添加场景信息</span>\n            <span class="biz-dialog-close" onclick="window.Pages[\'sys-scene\'].closeFieldModal()">&#x2715;</span>\n          </div>\n          <div class="biz-dialog-body">\n            <div class="biz-dialog-form">\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">业务信息</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input readonly" value="' + bizType + '" readonly>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">字段名称</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input" id="fieldName" placeholder="输入字段名称，支持汉字、字母、数字、符号，如&ldquo;订单号&rdquo;" maxlength="50" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'fieldNameCount\',50)">\n                  <span class="biz-char-count" id="fieldNameCount">0 / 50</span>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">参数名</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input" id="fieldCode" placeholder="输入参数名称，支持字母、数字、符号，如&ldquo;id&rdquo;" maxlength="50" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'fieldCodeCount\',50)">\n                  <span class="biz-char-count" id="fieldCodeCount">0 / 50</span>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">是否必填</label>\n                <div class="biz-dialog-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="1"><span>必填</span></label>\n                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="0"><span>选填</span></label>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="biz-dialog-footer">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeFieldModal()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].confirmAddField()" style="height:32px;padding:0 20px;">确定</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeFieldModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var bd = document.getElementById('bizFieldBackdrop');
    if (bd) { bd.remove(); }
  }

  function confirmAddField() {
    var name = document.getElementById('fieldName') ? document.getElementById('fieldName').value.trim() : '';
    var code = document.getElementById('fieldCode') ? document.getElementById('fieldCode').value.trim() : '';
    var requiredEl = document.querySelector('input[name="fieldRequired"]:checked');
    var required = requiredEl ? (requiredEl.value === '1' ? '是' : '否') : '否';

    if (!name || !code) {
      showToast('请填写字段名称和参数名', 'warning');
      return;
    }

    var activePanel = document.querySelector('.biz-inner-panel:not([style*="display:none"]):not([style*="display: none"])') || document.getElementById('bizPanel-input');
    var tbody = activePanel ? activePanel.querySelector('tbody') : null;
    if (!tbody) { closeFieldModal(); return; }

    var emptyRow = tbody.querySelector('td[colspan]');
    if (emptyRow) tbody.innerHTML = '';

    var idx = tbody.children.length + 1;
    var tr = document.createElement('tr');
    var requiredHtml = required === '是' ? '<span class="biz-required-tag">* 是</span>' : '否';
    tr.innerHTML = '<td>' + idx + '</td><td>' + name + '</td><td>' + code + '</td><td>' + requiredHtml + '</td><td><a href="#" class="biz-action-delete" onclick="event.preventDefault();this.closest(\'tr\').remove();">删除</a></td>';
    tbody.appendChild(tr);

    showToast('添加成功', 'success');
    closeFieldModal();
  }

  function init() {}

  /* ===== 智能平台切换 ===== */
  function updateSceneTypeAvailability(platformValue) {
    var isDiansheng = platformValue === '电声平台';
    var unsupportedTypes = ['首访', '督办', '服务', '回访'];
    var sceneTypeInputs = document.querySelectorAll('input[name="sceneType"]');
    Array.prototype.forEach.call(sceneTypeInputs, function (input) {
      var disabled = isDiansheng && unsupportedTypes.indexOf(input.value) !== -1;
      input.disabled = disabled;
      var label = input.closest ? input.closest('.biz-radio') : input.parentNode;
      if (label) {
        label.classList.toggle('is-disabled', disabled);
        label.setAttribute('aria-disabled', disabled ? 'true' : 'false');
        var text = label.querySelector('span:not(.biz-required-tag)');
        if (text && input.value === '首访') text.textContent = isDiansheng ? '督办' : '首访';
      }
      if (disabled) input.checked = false;
    });

    if (isDiansheng && !document.querySelector('input[name="sceneType"]:checked')) {
      var newLeadInput = document.querySelector('input[name="sceneType"][value="新线索"]');
      if (newLeadInput) newLeadInput.checked = true;
    }
  }

  function onPlatformChange() {
    var platform = document.querySelector('input[name="platform"]:checked');
    var panelYizhi = document.getElementById('platformPanelYizhi');
    var panelZkj = document.getElementById('platformPanelZhongkejin');
    var panelDs = document.getElementById('platformPanelDiansheng');
    var dsAccountRow = document.getElementById('dsAccountRow');
    var modelTypeRow = document.getElementById('modelTypeRow');
    var zkjModelTypeRow = document.getElementById('zkjModelTypeRow');

    // 全部隐藏
    if (panelYizhi) panelYizhi.classList.add('hidden');
    if (panelZkj) panelZkj.classList.add('hidden');
    if (panelDs) panelDs.classList.add('hidden');
    if (dsAccountRow) dsAccountRow.classList.add('hidden');
    if (modelTypeRow) modelTypeRow.classList.add('hidden');
    if (zkjModelTypeRow) zkjModelTypeRow.classList.add('hidden');
    var zkjAccountRow = document.getElementById('zkjAccountRow');
    if (zkjAccountRow) zkjAccountRow.classList.add('hidden');

    // 清空电声模型类型和账号
    var dsChecked = document.querySelector('input[name="dsModelType"]:checked');
    if (dsChecked) dsChecked.checked = false;
    var dsAccountSelect = document.getElementById('dsAccountSelect');
    if (dsAccountSelect) dsAccountSelect.value = '';

    // 清空一知模型类型
    var yzChecked = document.querySelector('input[name="modelType"]:checked');
    if (yzChecked) yzChecked.checked = false;

    // 清空中科金模型类型
    var zkjChecked = document.querySelector('input[name="zkjModelType"]:checked');
    if (zkjChecked) zkjChecked.checked = false;

    // 重置场景传入信息表格（清空自定义字段）
    var inputTbody = document.querySelector('#bizPanel-input tbody');
    if (inputTbody) {
      inputTbody.innerHTML = '<tr><td colspan="5"><div class="biz-empty-mini"><div class="biz-empty-icon">&#128230;</div><div class="biz-empty-text">暂无数据</div></div></td></tr>';
    }

    var submitBtn = document.getElementById('bizSceneSubmitBtn');
    if (submitBtn) submitBtn.textContent = platform && platform.value === '电声平台' ? '确定并生成任务' : '确定';

    updateSceneTypeAvailability(platform ? platform.value : '');
    onDianshengSceneTypeChange();
    if (!platform) return;

    if (platform.value === '一知科技') {
      if (panelYizhi) panelYizhi.classList.remove('hidden');
      if (modelTypeRow) modelTypeRow.classList.remove('hidden');
    } else if (platform.value === '中科金智能') {
      if (panelZkj) panelZkj.classList.remove('hidden');
      if (zkjModelTypeRow) zkjModelTypeRow.classList.remove('hidden');
      // 中科金智能默认字段：姓名 / name / 必填
      if (inputTbody) {
        inputTbody.innerHTML = '<tr><td>1</td><td>姓名</td><td>name</td><td><span class="biz-required-tag">* 是</span></td><td><span class="biz-action-disabled">删除</span></td></tr>';
      }
    } else if (platform.value === '电声平台') {
      if (panelDs) panelDs.classList.remove('hidden');
      normalizeDianshengCallCountPanel();
      // 电声平台不默认配置场景传入字段，由用户按业务需要添加。
    }
  }

  /* ===== 电声平台 — 模型类型选择 ===== */
  function onDsModelTypeChange() {
    var modelType = document.querySelector('input[name="dsModelType"]:checked');
    var accountRow = document.getElementById('dsAccountRow');
    var accountSelect = document.getElementById('dsAccountSelect');
    if (!accountRow) return;
    if (modelType) {
      accountRow.classList.remove('hidden');
      if (accountSelect) {
        accountSelect.value = '';
        Array.prototype.forEach.call(accountSelect.options, function(option) {
          if (!option.value) {
            option.hidden = false;
          } else {
            option.hidden = option.getAttribute('data-model') !== modelType.value;
          }
        });
      }
    } else {
      accountRow.classList.add('hidden');
    }
  }

  /* ===== 一知科技 — 模型类型选择（账号下拉已移除） ===== */
  function onModelTypeChange() {}

  /* ===== 中科金智能 — 模型类型选择（账号下拉已移除） ===== */
  function onZkjModelTypeChange() {
    var modelType = document.querySelector('input[name="zkjModelType"]:checked');
    var accountRow = document.getElementById('zkjAccountRow');
    if (accountRow) {
      if (modelType) {
        accountRow.classList.remove('hidden');
      } else {
        accountRow.classList.add('hidden');
      }
    }
  }

  window.Pages = window.Pages || {};
  window.Pages['sys-scene'] = {
    render: render,
    init: init,
    showAddModal: showAddModal,
    showEditModal: showEditModal,
    closeAddModal: closeAddModal,
    submitAddModal: submitAddModal,
    showDeleteConfirm: showDeleteConfirm,
    closeDeleteConfirm: closeDeleteConfirm,
    confirmDeleteScene: confirmDeleteScene,
    updateCharCount: updateCharCount,
    switchBizTab: switchBizTab,
    showFieldModal: showFieldModal,
    closeFieldModal: closeFieldModal,
    confirmAddField: confirmAddField,
    onPlatformChange: onPlatformChange,
    onDianshengSceneTypeChange: onDianshengSceneTypeChange,
    toggleDianshengIntervalMenu: toggleDianshengIntervalMenu,
    updateDianshengIntervalSummary: updateDianshengIntervalSummary,
    getDianshengLeadTypeCode: getDianshengLeadTypeCode,
    onDsModelTypeChange: onDsModelTypeChange,
    addDianshengCallWindow: addDianshengCallWindow,
    removeDianshengCallWindow: removeDianshengCallWindow,
    addDianshengExcludeDate: addDianshengExcludeDate,
    removeDianshengExcludeDate: removeDianshengExcludeDate,
    getDianshengExcludeDates: getDianshengExcludeDates,
    onDianshengAutoStartChange: onDianshengAutoStartChange,
    getDianshengAutoStart: getDianshengAutoStart,
    onModelTypeChange: onModelTypeChange,
    onZkjModelTypeChange: onZkjModelTypeChange
  };
})();
