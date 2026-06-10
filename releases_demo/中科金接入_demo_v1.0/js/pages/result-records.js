/**
 * js/pages/result-records.js — 通话记录
 */
(function () {
  'use strict';

  var rows = window.MockCallRecordRows || [];
  var sortField = null;   // 'startTime' | 'endTime'
  var sortOrder = 'asc';  // 'asc' | 'desc'

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
    if (!rows.length) {
      return '\n        <tr>\n          <td colspan="11">\n            <div style="text-align:center;padding:48px;color:#bbb;">暂无数据</div>\n          </td>\n        </tr>';
    }
    return rows.map(function (item, index) {
      return '\n      <tr>\n        <td>' + (index + 1) + '</td>\n        <td>' + item.phone + '</td>\n        <td>' + item.startTime + '</td>\n        <td>' + item.endTime + '</td>\n        <td>' + item.duration + '</td>\n        <td class="record-scene-name">' + item.sceneName + '</td>\n        <td>' + item.status + '</td>\n        <td class="record-summary" title="' + (item.summary || '-') + '">' + (item.summary || '-') + '</td>\n        <td>' + (item.platform || '-') + '</td>\n        <td>' + (item.lastNode || '-') + '</td>\n        <td class="record-action-cell">\n          <a href="#" onclick="event.preventDefault();window.Pages[\'result-records\'].showDetail(' + index + ')">详情</a>\n        </td>\n      </tr>';
    }).join('');
  }

  function renderDialogRows() {
    var dialogRows = [
      { role: '客服', text: '您好~' },
      { role: '客户', text: '用户无应答' },
      { role: '客服', text: '喂，尊敬的客户您好，我是东风日产厂家客服，看您之前有关注过日产的车，想问您最近还考虑买车吗？' },
      { role: '客户', text: '忙着呢，什么事啊，我知道了，你那有这打电话这个' },
      { role: '客户', text: '哦，我我你能不能联系我了，我知道了，我我现在开着车忙呢，不方便接听啊' },
      { role: '客服', text: '好的，您先忙，稍后安排4S销售顾问联系您，有需要的可以再了解下，感谢您的接听，再见！' }
    ];
    return dialogRows.map(function (row) {
      return '\n        <div class="record-detail-talk-row">\n          <div class="record-detail-speaker">' + row.role + '</div>\n          <div class="record-detail-bubble">' + row.text + '</div>\n        </div>';
    }).join('');
  }

  function renderOutboundResult() {
    return '\n      <div class="record-detail-fields">\n        <div class="record-detail-section-title">外呼小结</div>\n        <div class="record-detail-summary" data-anno="result-records-summary" style="margin-bottom:16px;">-</div>\n        <div><span class="record-info-label">标签合集：</span><span class="record-info-value">call_coll_tag_031:开着车忙</span></div>\n        <div><span class="record-info-label">购车意向：</span><span class="record-info-value">little_intention</span></div>\n        <div><span class="record-info-label">计划到店时间：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">预计购车时间：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">意向品牌中文名：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">意向车系中文名：</span><span class="record-info-value">-</span></div>\n        <div><span class="record-info-label">意向等级编码(A-E)：</span><span class="record-info-value">C</span></div>\n      </div>\n    ';
  }

  function renderDetailInfo(item) {
    var fields = [
      ['会话 id', item.sessionId || '-'],
      ['通话状态', item.status || '-'],
      ['通话开始时间', item.startTime || '-'],
      ['通话结束时间', item.endTime || '-'],
      ['主叫号码', item.callerNumber || '-'],
      ['通话时长', item.duration || '-'],
      ['被叫号码', item.phone || '-'],
      ['主叫号码归属', item.callerLocation || '-'],
      ['被叫号码省份城市', item.calleeLocation || '-'],
      ['意向标签', item.aiTagName || '-'],
      ['提取标签', item.extractTags || '-']
    ];
    var infoRows = fields.map(function (f) {
      return '<div class="record-info-row"><span class="record-info-label">' + f[0] + ':</span><span class="record-info-value">' + f[1] + '</span></div>';
    }).join('');
    return '<div class="record-info-list" data-anno="result-records-fields">' + infoRows + '</div>';
  }

  function renderRightPanel(item) {
    return '\n      <div class="record-detail-right-tabs">\n        <div class="record-tab active" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'outbound\')">外呼结果</div>\n        <div class="record-tab" onclick="window.Pages[\'result-records\'].switchDetailTab(this,\'info\')">详细信息</div>\n      </div>\n      <div class="record-detail-tab-content" id="recordDetailTabContent">\n        ' + renderOutboundResult() + '\n      </div>\n    ';
  }

  function renderDetailModal(item) {
    return '\n      <div class="record-detail-backdrop" id="recordDetailBackdrop" onclick="window.Pages[\'result-records\'].closeDetail(event)">\n        <div class="record-detail-modal" onclick="event.stopPropagation()">\n          <div class="record-detail-header">\n            <button class="record-detail-close" onclick="window.Pages[\'result-records\'].closeDetail()">&#215;</button>\n            <span class="record-detail-title">会话 id： 2059190973162029057</span>\n          </div>\n          <div class="record-detail-body">\n            <div class="record-detail-left" data-anno="result-records-audio">\n              <div class="record-audio-card">\n                <div class="record-audio-pill">\n                  <span class="record-audio-play">&#9654;</span>\n                  <span>0:00 / 0:23</span>\n                  <span class="record-audio-line"></span>\n                  <span class="record-audio-volume">&#128266;</span>\n                  <span class="record-audio-more">&#8942;</span>\n                </div>\n                <span class="record-audio-icon">&#127911;</span>\n                <span class="record-audio-icon">&#128196;</span>\n              </div>\n              <div class="record-detail-transcript">\n                ' + renderDialogRows() + '\n              </div>\n            </div>\n            <div class="record-detail-right">\n              <div class="record-detail-content">\n                ' + renderRightPanel(item) + '\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
  }

  function showDetail(index) {
    var item = rows[index] || rows[0] || {};
    document.body.insertAdjacentHTML('beforeend', renderDetailModal(item));
    // 存储 index 供 tab 切换使用
    var backdrop = document.getElementById('recordDetailBackdrop');
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
    return '\n      <div class="result-records-page">\n        <div class="record-hero-card" data-anno="result-records-header">\n          <div class="record-title">通话记录</div>\n          <div class="record-subtitle">查看每一通外呼的结果。</div>\n        </div>\n\n        <div class="record-filter-card">\n          <div class="record-filter-item">\n            <label>用户号码：</label>\n            <input type="text" class="record-input" placeholder="请输入">\n          </div>\n          <div class="record-filter-item">\n            <label>场景名称：</label>\n            <input type="text" class="record-input" placeholder="请输入">\n          </div>\n          <div class="record-filter-item">\n            <label>通话状态：</label>\n            <select class="record-select">\n              <option value="">请选择</option>\n              <option value="已接通">已接通</option>\n              <option value="无人接听">无人接听</option>\n              <option value="占线">占线</option>\n              <option value="拒接">拒接</option>\n              <option value="关机">关机</option>\n            </select>\n          </div>\n          <div class="record-filter-item">\n            <label>智能平台：</label>\n            <select class="record-select">\n              <option value="">全部</option>\n              <option value="一知科技">一知科技</option>\n              <option value="中科金智能">中科金智能</option>\n            </select>\n          </div>\n          <div class="record-filter-actions">\n            <button class="btn btn-default" onclick="window.Pages[\'result-records\'].resetFilters()">重置</button>\n            <button class="btn btn-primary" onclick="doQuery()">查询</button>\n          </div>\n        </div>\n\n        <div class="record-table-panel">\n          <div class="record-toolbar">\n            <button class="btn btn-primary" onclick="showToast(\'导出功能开发中\',\'info\')">＋ 导出</button>\n            <span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>\n          </div>\n          <div class="record-table-scroll">\n            <table class="record-table">\n              <thead>\n                <tr>\n                  <th>序号</th>\n                  <th>用户号码</th>\n                  <th>通话开始时间 <span class="sort-toggle" onclick="window.Pages[\'result-records\'].toggleSort(\'startTime\', this)" title="排序">&#8693;</span></th>\n                  <th>通话结束时间 <span class="sort-toggle" onclick="window.Pages[\'result-records\'].toggleSort(\'endTime\', this)" title="排序">&#8693;</span></th>\n                  <th>通话时长</th>\n                  <th>场景名称</th>\n                  <th>通话状态</th>\n                  <th>外呼总结</th>\n                  <th>智能平台</th>\n                  <th>最后通话节点</th>\n                  <th class="record-action-cell">操作</th>\n                </tr>\n              </thead>\n              <tbody>' + renderRows() + '</tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  }

  function init() {}

  function switchDetailTab(el, tab) {
    var container = document.getElementById('recordDetailTabContent');
    if (!container) return;
    el.parentElement.querySelectorAll('.record-tab').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    if (tab === 'outbound') {
      container.innerHTML = renderOutboundResult();
    } else {
      // 找到当前详情弹窗对应的 item
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
    // 更新排序箭头
    document.querySelectorAll('.sort-toggle').forEach(function (s) { s.textContent = '⇅'; });
    el.textContent = sortOrder === 'asc' ? '↑' : '↓';
    // 刷新表格
    var tbody = document.querySelector('.record-table tbody');
    if (tbody) tbody.innerHTML = renderRows();
  }

  window.Pages = window.Pages || {};
  window.Pages['result-records'] = { render: render, init: init, resetFilters: resetFilters, showDetail: showDetail, closeDetail: closeDetail, toggleSort: toggleSort, switchDetailTab: switchDetailTab };
})();
