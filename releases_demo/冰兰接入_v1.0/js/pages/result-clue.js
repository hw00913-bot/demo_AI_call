/**
 * js/pages/result-clue.js — 线索记录
 */

(function () {
  const rows = window.MockClueRecordRows || [];

  function formatTime(value) {
    return String(value || '-').replace(' ', '<br>');
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

    return rows.map(item => `
      <tr>
        <td>${formatTime(item.lastVisitTime)}</td>
        <td>${item.visitCount}</td>
        <td>${item.lastCallStatus}</td>
        <td class="clue-ellipsis" title="${item.lastRecord}">${item.lastRecord}</td>
        <td>${item.intention}</td>
        <td><a href="#" class="clue-link" onclick="event.preventDefault();showToast('客户详细标签开发中','info')">查看</a></td>
        <td class="clue-scene-name">${item.sceneName}</td>
        <td>${formatTime(item.firstVisitTime)}</td>
        <td>${formatTime(item.secondVisitTime)}</td>
        <td>${formatTime(item.thirdVisitTime)}</td>
        <td class="clue-action-cell"><a href="#" onclick="event.preventDefault();showToast('线索详情开发中','info')">详情</a></td>
      </tr>
    `).join('');
  }

  function render() {
    return `
      <div class="clue-records-page">
        <div class="clue-page-header">
          <span class="clue-page-title">线索记录</span>
          <span class="clue-page-subtitle">以线索的维度查看统计结果。</span>
        </div>

        <div class="clue-filter-card">
          <div class="record-filter-item">
            <label>用户号码：</label>
            <input type="text" class="record-input" placeholder="请输入">
          </div>
          <div class="record-filter-item">
            <label>最后回访时间：</label>
            <div class="record-date-range">
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-date-sep">&#8594;</span>
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-calendar">&#128197;</span>
            </div>
          </div>
          <div class="record-filter-item">
            <label>最后通话状态：</label>
            <select class="record-select">
              <option value="">请选择</option>
              <option value="已接通">已接通</option>
              <option value="无人接听">无人接听</option>
              <option value="占线">占线</option>
              <option value="拒接">拒接</option>
            </select>
          </div>
          <div class="record-filter-item">
            <label>最后通话意向级别：</label>
            <select class="record-select">
              <option value="">请选择</option>
              <option value="A">A(有购车计划)</option>
              <option value="B">B(无购车计划)</option>
              <option value="C">C(待筛选)</option>
              <option value="O">O(同意加微信)</option>
            </select>
          </div>
          <div class="record-filter-item">
            <label>场景名称：</label>
            <select class="record-select">
              <option value="">请选择</option>
              <option value="燃油车新线索-一知">燃油车新线索-一知</option>
            </select>
          </div>
          <div class="clue-filter-actions">
            <button class="btn btn-default" onclick="window.Pages['result-clue'].resetFilters()">重置</button>
            <button class="btn btn-primary" onclick="doQuery()">查询</button>
            <button class="record-expand-btn" onclick="showToast('筛选项已展开','info')">收起 <span>&#8963;</span></button>
          </div>
        </div>

        <div class="clue-table-panel">
          <div class="record-toolbar">
            <button class="btn btn-primary" onclick="showToast('导出功能开发中','info')">导出</button>
            <button class="report-icon-btn" onclick="doRefresh()" data-tooltip="刷新">&#10227;</button>
            <button class="report-icon-btn" onclick="showToast('列设置功能开发中','info')" data-tooltip="列设置">&#9881;</button>
          </div>
          <div class="clue-table-scroll">
            <table class="clue-table">
              <thead>
                <tr>
                  <th>最后回访时间</th>
                  <th>回访次数</th>
                  <th>最后通话状态</th>
                  <th>最后回访记录</th>
                  <th>最后通话意向级别</th>
                  <th>客户详细标签</th>
                  <th>场景名称</th>
                  <th>首次实际回访时间</th>
                  <th>二次实际回访时间</th>
                  <th>三次实际回访时间</th>
                  <th class="clue-action-cell">操作</th>
                </tr>
              </thead>
              <tbody>${renderRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function resetFilters() {
    const page = document.querySelector('.clue-records-page');
    if (!page) return;
    page.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
    page.querySelectorAll('select').forEach(select => {
      select.selectedIndex = 0;
    });
    showToast('已重置筛选条件');
  }

  window.Pages = window.Pages || {};
  window.Pages['result-clue'] = {
    render,
    init() {},
    resetFilters,
  };
})();
