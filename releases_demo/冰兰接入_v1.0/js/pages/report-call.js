/**
 * js/pages/report-call.js — 通话统计
 */

(function () {
  const rows = window.MockCallStatsRows || [];

  function formatRate(value, total) {
    if (!total) return '0.00%';
    return ((value / total) * 100).toFixed(2) + '%';
  }

  function renderRows() {
    if (!rows.length) {
      return `
        <tr>
          <td colspan="10">
            <div class="report-empty">
              <div class="report-empty-icon">&#128230;</div>
              <div>暂无数据</div>
            </div>
          </td>
        </tr>
      `;
    }

    return rows.map((item, index) => {
      const connectedRate = formatRate(item.connectedTotal, item.rosterTotal);
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${item.date}</td>
          <td class="report-scene-name">${item.sceneName}</td>
          <td>${item.dialTotal}</td>
          <td>${item.rosterTotal}</td>
          <td>${item.connectedTotal}</td>
          <td>${item.missedTotal}</td>
          <td>${connectedRate}</td>
          <td>${connectedRate}</td>
          <td>${item.duration}</td>
        </tr>
      `;
    }).join('');
  }

  function renderCustomerRows() {
    if (!rows.length) {
      return `
        <tr>
          <td colspan="7">
            <div class="report-empty">
              <div class="report-empty-icon">&#128230;</div>
              <div>暂无数据</div>
            </div>
          </td>
        </tr>
      `;
    }

    const avgDurationMap = ['18秒', '19秒', '-', '24秒', '-', '-', '-', '20秒', '-', '17秒', '18秒', '19秒'];
    return rows.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.date}</td>
        <td class="report-scene-name">${item.sceneName}</td>
        <td>${item.rosterTotal}</td>
        <td>${item.connectedTotal}</td>
        <td>${item.duration}</td>
        <td>${avgDurationMap[index] || '-'}</td>
      </tr>
    `).join('');
  }

  function renderCallStats() {
    return `
      <div class="report-table-panel">
        <div class="report-table-actions">
          <button class="report-icon-btn" onclick="doRefresh()" data-tooltip="刷新">&#10227;</button>
          <button class="report-icon-btn" onclick="showToast('列设置功能开发中','info')" data-tooltip="列设置">&#9881;</button>
        </div>
        <div class="report-table-scroll">
          <table class="report-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>呼叫时间</th>
                <th>场景名称</th>
                <th>拨打总次数</th>
                <th>呼叫名单总数</th>
                <th>接通总数</th>
                <th>未接通总数</th>
                <th>接通率</th>
                <th>触达率</th>
                <th>累计通话时长</th>
              </tr>
            </thead>
            <tbody>${renderRows()}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderCustomerStats() {
    return `
      <div class="report-table-panel">
        <div class="report-table-heading">
          <div></div>
          <div class="report-table-actions">
            <button class="report-icon-btn" onclick="doRefresh()" data-tooltip="刷新">&#10227;</button>
            <button class="report-icon-btn" onclick="showToast('列设置功能开发中','info')" data-tooltip="列设置">&#9881;</button>
          </div>
        </div>
        <div class="report-table-scroll">
          <table class="report-table customer-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>呼叫时间</th>
                <th>场景名称</th>
                <th>客户总数</th>
                <th>有效通话客户数</th>
                <th>累计通话时长</th>
                <th>客户平均通话时长</th>
              </tr>
            </thead>
            <tbody>${renderCustomerRows()}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderTabContent(activeTab) {
    return activeTab === 'customer' ? renderCustomerStats() : renderCallStats();
  }

  function render() {
    return `
      <div class="report-call-page">
        <div class="report-page-header">
          <div class="report-title-row">
            <span class="report-title">通话统计</span>
            <span class="report-subtitle">创建任务时导入外呼名单，通过手动启动任务进行智能外呼任务。</span>
          </div>
        </div>

        <div class="report-tabs">
          <button class="report-tab active" data-tab="call" onclick="window.Pages['report-call'].switchTab(this,'call')">外呼统计</button>
          <button class="report-tab" data-tab="customer" onclick="window.Pages['report-call'].switchTab(this,'customer')">客户统计</button>
        </div>

        <div class="report-filter-card">
          <div class="report-filter-item">
            <label>呼叫时间：</label>
            <div class="report-date-range">
              <input type="text" class="report-filter-input" value="2026-04-26">
              <span class="report-date-sep">&#8594;</span>
              <input type="text" class="report-filter-input" value="2026-05-26">
              <span class="report-calendar">&#128197;</span>
            </div>
          </div>
          <div class="report-filter-item">
            <label>场景名称：</label>
            <select class="report-filter-select">
              <option value="">请选择</option>
              ${rows.map(item => `<option value="${item.sceneName}">${item.sceneName}</option>`).join('')}
            </select>
          </div>
          <div class="report-filter-actions">
            <button class="btn btn-default" onclick="window.Pages['report-call'].resetFilters()">重置</button>
            <button class="btn btn-primary" onclick="doQuery()">查询</button>
          </div>
        </div>

        <div id="reportCallContent" class="report-content">
          ${renderTabContent('call')}
        </div>
      </div>
    `;
  }

  function switchTab(el, tabName) {
    document.querySelectorAll('.report-tab').forEach(tab => tab.classList.remove('active'));
    el.classList.add('active');
    const content = document.getElementById('reportCallContent');
    if (content) content.innerHTML = renderTabContent(tabName);
  }

  function resetFilters() {
    const page = document.querySelector('.report-call-page');
    if (!page) return;
    const inputs = page.querySelectorAll('.report-filter-input');
    if (inputs[0]) inputs[0].value = '2026-04-26';
    if (inputs[1]) inputs[1].value = '2026-05-26';
    const select = page.querySelector('.report-filter-select');
    if (select) select.selectedIndex = 0;
    showToast('已重置筛选条件');
  }

  window.Pages = window.Pages || {};
  window.Pages['report-call'] = {
    render,
    init() {},
    switchTab,
    resetFilters,
  };
})();
