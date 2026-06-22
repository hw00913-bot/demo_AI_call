/**
 * js/pages/report-call.js — 通话统计
 */
(function () {
  'use strict';

  var rows = window.MockCallStatsRows || [];

  function formatRate(value, total) {
    if (!total) return '0.00%';
    return ((value / total) * 100).toFixed(2) + '%';
  }

  function renderRows() {
    if (!rows.length) {
      return '\n        <tr>\n          <td colspan="10">\n            <div class="report-empty">\n              <div class="report-empty-icon">&#128230;</div>\n              <div>暂无数据</div>\n            </div>\n          </td>\n        </tr>';
    }
    return rows.map(function (item, index) {
      var connectedRate = formatRate(item.connectedTotal, item.rosterTotal);
      var touchRate = formatRate(item.connectedTotal + item.missedTotal, item.dialTotal);
      return '\n      <tr>\n        <td>' + (index + 1) + '</td>\n        <td>' + item.date + '</td>\n        <td class="report-scene-name">' + item.sceneName + '</td>\n        <td>' + item.dialTotal + '</td>\n        <td>' + item.rosterTotal + '</td>\n        <td>' + item.connectedTotal + '</td>\n        <td>' + item.missedTotal + '</td>\n        <td>' + connectedRate + '</td>\n        <td>' + touchRate + '</td>\n        <td>' + item.duration + '</td>\n      </tr>';
    }).join('');
  }

  function renderCustomerRows() {
    if (!rows.length) {
      return '\n        <tr>\n          <td colspan="7">\n            <div class="report-empty">\n              <div class="report-empty-icon">&#128230;</div>\n              <div>暂无数据</div>\n            </div>\n          </td>\n        </tr>';
    }
    return rows.map(function (item, index) {
      return '\n      <tr>\n        <td>' + (index + 1) + '</td>\n        <td>' + item.date + '</td>\n        <td class="report-scene-name">' + item.sceneName + '</td>\n        <td>' + item.rosterTotal + '</td>\n        <td>' + item.connectedTotal + '</td>\n        <td>' + item.duration + '</td>\n        <td>-</td>\n      </tr>';
    }).join('');
  }

  function renderTabContent(activeTab) {
    if (activeTab === 'customer') {
      return '\n      <div class="report-table-panel">\n        <div class="report-table-heading">\n          <div></div>\n          <div class="report-table-actions">\n            <span class="report-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>\n            <span class="report-icon-btn" onclick="showToast(\'列设置功能开发中\',\'info\')" title="列设置">&#9881;</span>\n          </div>\n        </div>\n        <div class="report-table-scroll">\n          <table class="report-table" style="min-width:960px;">\n            <thead>\n              <tr>\n                <th>序号</th>\n                <th>呼叫时间</th>\n                <th>场景名称</th>\n                <th>客户总数</th>\n                <th>有效通话客户数</th>\n                <th>累计通话时长</th>\n                <th>客户平均通话时长</th>\n              </tr>\n            </thead>\n            <tbody>' + renderCustomerRows() + '</tbody>\n          </table>\n        </div>\n      </div>';
    }
    return '\n      <div class="report-table-panel">\n        <div class="report-table-actions">\n          <span class="report-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>\n          <span class="report-icon-btn" onclick="showToast(\'列设置功能开发中\',\'info\')" title="列设置">&#9881;</span>\n        </div>\n        <div class="report-table-scroll">\n          <table class="report-table">\n            <thead>\n              <tr>\n                <th>序号</th>\n                <th>呼叫时间</th>\n                <th>场景名称</th>\n                <th>拨打总次数</th>\n                <th>呼叫名单总数</th>\n                <th>接通总数</th>\n                <th>未接通总数</th>\n                <th>接通率</th>\n                <th>触达率</th>\n                <th>累计通话时长</th>\n              </tr>\n            </thead>\n            <tbody>' + renderRows() + '</tbody>\n          </table>\n        </div>\n      </div>';
  }

  function render() {
    return '\n      <div class="report-call-page">\n        <div class="report-page-header">\n          <div class="report-title-row">\n            <span class="report-title">通话统计</span>\n            <span class="report-subtitle" data-anno="report-call-header">创建任务时导入外呼名单，通过手动启动任务进行智能外呼任务。</span>\n          </div>\n        </div>\n\n        <div class="report-tabs">\n          <button class="report-tab active" data-tab="call" onclick="window.Pages[\'report-call\'].switchTab(this,\'call\')">外呼统计</button>\n          <button class="report-tab" data-tab="customer" onclick="window.Pages[\'report-call\'].switchTab(this,\'customer\')">客户统计</button>\n        </div>\n\n        <div class="report-filter-card">\n          <div class="report-filter-item">\n            <label>呼叫时间：</label>\n            <div class="report-date-range">\n              <input type="text" class="report-filter-input" value="2026-06-01">\n              <span class="report-date-sep">&#8594;</span>\n              <input type="text" class="report-filter-input" value="2026-06-03">\n              <span class="report-calendar">&#128197;</span>\n            </div>\n          </div>\n          <div class="report-filter-item">\n            <label>场景名称：</label>\n            <select class="report-filter-select">\n              <option value="">请选择</option>\n              ' + rows.map(function (item) { return '<option value="' + item.sceneName + '">' + item.sceneName + '</option>'; }).join('\n              ') + '\n            </select>\n          </div>\n          <div class="report-filter-item">\n            <label>智能平台：</label>\n            <select class="report-filter-select" style="width:180px;">\n              <option value="">全部</option>\n              <option value="一知科技">一知科技</option>\n              <option value="中科金智能">中科金智能</option>\n            </select>\n          </div>\n          <div class="report-filter-actions">\n            <button class="btn btn-default" onclick="window.Pages[\'report-call\'].resetFilters()">重置</button>\n            <button class="btn btn-primary" onclick="doQuery()">查询</button>\n          </div>\n        </div>\n\n        <div id="reportCallContent" class="report-content">\n          ' + renderTabContent('call') + '\n        </div>\n      </div>\n    ';
  }

  function switchTab(el, tabName) {
    document.querySelectorAll('.report-tab').forEach(function (tab) { tab.classList.remove('active'); });
    el.classList.add('active');
    var content = document.getElementById('reportCallContent');
    if (content) content.innerHTML = renderTabContent(tabName);
  }

  function resetFilters() {
    var page = document.querySelector('.report-call-page');
    if (!page) return;
    var inputs = page.querySelectorAll('.report-filter-input');
    if (inputs[0]) inputs[0].value = '2026-06-01';
    if (inputs[1]) inputs[1].value = '2026-06-03';
    var select = page.querySelector('.report-filter-select');
    if (select) select.selectedIndex = 0;
    showToast('已重置筛选条件');
  }

  window.Pages = window.Pages || {};
  window.Pages['report-call'] = { render: render, init: function () {}, switchTab: switchTab, resetFilters: resetFilters };
})();
