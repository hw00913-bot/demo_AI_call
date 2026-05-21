/**
 * js/pages/report-clue.js — 线索统计页（从原 index.html 完整迁移）
 */

(function () {

  /* ===== 渲染状态标签 ===== */
  const tagHTML = {
    '已接听': '<span class="tag tag-green">已接听</span>',
    '无应答': '<span class="tag tag-red">无应答</span>',
    '忙线中': '<span class="tag tag-red">忙线中</span>',
    '空号':   '<span class="tag tag-red">空号</span>',
    'A': '<span class="tag tag-blue">A</span>',
    'B': '<span class="tag tag-blue">B</span>',
    'C': '<span class="tag tag-gray">C</span>',
    'D': '<span class="tag tag-gray">D</span>',
    'E': '<span class="tag tag-gray">E</span>',
  };

  function renderStatRow(row) {
    return `<tr>
      <td>${row.no}</td><td>${row.date}</td><td>${row.type}</td>
      <td>${row.import}</td><td>${row.connected}</td><td>${row.dispatch}</td>
      <td>${row.rate}</td><td>${row.avg}</td>
      <td>${row.A}</td><td>${row.B}</td><td>${row.C}</td><td>${row.D}</td><td>${row.E}</td>
    </tr>`;
  }

  function renderDetailRow(row) {
    return `<tr>
      <td>${row.no}</td><td>${row.time}</td><td>${row.code}</td>
      <td>${row.scene}</td><td>${row.type}</td><td>${row.phone}</td>
      <td>${row.storeCode}</td><td>${row.storeName}</td>
      <td>${row.callTime}</td><td>${tagHTML[row.status] || row.status}</td>
      <td>${row.duration}</td><td>${tagHTML[row.level] || row.level}</td><td>${row.dispatch}</td>
    </tr>`;
  }

  function renderReturnRow(row) {
    return `<tr>
      <td style="width:80px">${row.no}</td>
      <td>${row.date}</td>
      <td>${row.scene}</td>
      <td style="font-weight:500;color:#262626">${row.import}</td>
      <td style="font-weight:500;color:#262626">${row.submit}</td>
      <td style="font-weight:500;color:#52c41a">${row.return}</td>
    </tr>`;
  }

  function renderPagination() {
    return `
      <div class="pagination">
        <span class="total-text">共 5 条数据</span>
        <button class="page-btn disabled">&lt;</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">4</button>
        <button class="page-btn">5</button>
        <button class="page-btn">6</button>
        <button class="page-btn">7</button>
        <button class="page-btn">8</button>
        <button class="page-btn">9</button>
        <button class="page-btn">&gt;</button>
        <select class="page-select"><option>10 条/页</option><option>20 条/页</option></select>
        <div class="page-jump">跳至 <input type="text" class="filter-input" style="width:40px;height:28px;border:1px solid #d9d9d9;border-radius:4px;text-align:center;outline:none;" value="5"> 页</div>
      </div>
    `;
  }

  function render() {
    return `
      <!-- 页面标题区 -->
      <div class="page-header" style="background: linear-gradient(135deg, #1677ff 0%, #4096ff 100%);color:#fff;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;">
        <span class="page-title" style="font-size:15px;font-weight:600;letter-spacing:0.5px">线索统计</span>
        <div class="user-info" style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:4px;">
          <span>超级管理员</span><span style="font-size:10px">&#9662;</span>
        </div>
      </div>

      <div class="tab-container" style="display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;">
        <div class="tab-bar">
          <div class="tab-item active" onclick="switchTab(this,'tab-manual')">外呼线索统计</div>
          <div class="tab-item" onclick="switchTab(this,'tab-ai')">外呼线索明细</div>
          <div class="tab-item" onclick="switchTab(this,'tab-return')">线索回流统计</div>
        </div>

        <div class="content-main" style="flex:1;overflow-y:auto;padding:0;background:#f0f2f5;">
          <!-- 外呼线索统计 -->
          <div id="tab-manual" class="tab-panel" style="display:flex;">
            <div class="sub-tab-bar"><div class="sub-tab-bar-inner">
              <div class="sub-tab-item active" onclick="switchSubTab(this,'manual-nev')">NEV 线索</div>
              <div class="sub-tab-item" onclick="switchSubTab(this,'manual-ice')">ICE 线索</div>
            </div></div>

            <div id="manual-nev" class="sub-tab-panel" style="display:flex;">
              <div class="filter-bar">
                <div class="filter-item"><label>导入时间：</label><div class="filter-date-range">
                  <input type="date" class="filter-input" style="width:130px"><span class="sep">—</span><input type="date" class="filter-input" style="width:130px">
                </div></div>
                <div class="filter-item"><label>业务类型：</label><select class="filter-select"><option value="">全部</option><option value="new">新线索</option><option value="cold">冷线索</option></select></div>
                <div class="btn-group">
                  <button class="btn btn-default" onclick="resetFilter(this.closest('.sub-tab-panel'))">重置</button>
                  <button class="btn btn-primary" onclick="doQuery()">查询</button>
                  <button class="btn btn-success" onclick="doExport(event)">导出</button>
                  <button class="btn btn-reload" onclick="doRefresh()">刷新</button>
                </div>
              </div>
              <div class="table-wrap">
                <div class="table-container">
                  <table class="data-table"><thead><tr>
                    <th>序号</th><th>导入日期</th><th>业务类型</th><th>导入线索量</th><th>AI 外呼已接通量</th><th>已下发线索数</th><th>AI 接通率</th><th>平均通话时长</th><th>A (高意向)</th><th>B (潜在)</th><th>C (一般)</th><th>D (忙碌/敷衍)</th><th>E (拒绝/无效)</th>
                  </tr></thead><tbody>${MockClueStatNEV.map(renderStatRow).join('')}</tbody></table>
                </div>
                ${renderPagination()}
              </div>
            </div>

            <div id="manual-ice" class="sub-tab-panel" style="display:none;">
              <div class="filter-bar">
                <div class="filter-item"><label>导入时间：</label><div class="filter-date-range">
                  <input type="date" class="filter-input" style="width:130px"><span class="sep">—</span><input type="date" class="filter-input" style="width:130px">
                </div></div>
                <div class="filter-item"><label>业务类型：</label><select class="filter-select"><option value="">全部</option><option value="new">新线索</option><option value="cold">冷线索</option></select></div>
                <div class="btn-group">
                  <button class="btn btn-default" onclick="resetFilter(this.closest('.sub-tab-panel'))">重置</button>
                  <button class="btn btn-primary" onclick="doQuery()">查询</button>
                  <button class="btn btn-success" onclick="doExport(event)">导出</button>
                  <button class="btn btn-reload" onclick="doRefresh()">刷新</button>
                </div>
              </div>
              <div class="table-wrap">
                <div class="table-container">
                  <table class="data-table"><thead><tr>
                    <th>序号</th><th>导入日期</th><th>业务类型</th><th>导入线索量</th><th>AI 外呼已接通量</th><th>已下发线索数</th><th>AI 接通率</th><th>平均通话时长</th><th>A (高意向)</th><th>B (潜在)</th><th>C (一般)</th><th>D (忙碌/敷衍)</th><th>E (拒绝/无效)</th>
                  </tr></thead><tbody>${MockClueStatICE.map(renderStatRow).join('')}</tbody></table>
                </div>
                ${renderPagination()}
              </div>
            </div>
          </div>

          <!-- 外呼线索明细 -->
          <div id="tab-ai" class="tab-panel" style="display:none;">
            <div class="sub-tab-bar"><div class="sub-tab-bar-inner">
              <div class="sub-tab-item active" onclick="switchSubTab(this,'ai-nev')">NEV 线索</div>
              <div class="sub-tab-item" onclick="switchSubTab(this,'ai-ice')">ICE 线索</div>
            </div></div>

            <div id="ai-nev" class="sub-tab-panel" style="display:flex;">
              <div class="filter-bar">
                <div class="filter-item"><label>导入时间：</label><div class="filter-date-range">
                  <input type="datetime-local" class="filter-input date" style="width:180px"><span class="sep">—</span><input type="datetime-local" class="filter-input date" style="width:180px">
                </div></div>
                <div class="filter-item"><label>首次外呼时间：</label><div class="filter-date-range">
                  <input type="datetime-local" class="filter-input date" style="width:180px"><span class="sep">—</span><input type="datetime-local" class="filter-input date" style="width:180px">
                </div></div>
                <div class="filter-item"><label>呼叫任务场景名称：</label><select class="filter-select"><option value="">全部</option><option>一知-nev-新线索</option><option>一知-保有客户-回访</option></select></div>
                <div class="filter-item"><label>意向级别：</label>
                  <div class="multi-select-wrap"><div class="multi-select-display" onclick="toggleMultiSelect(event,this)">全部</div>
                    <div class="multi-select-dropdown">
                      <div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>A (高意向)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>B (潜在)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>C (一般)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>D (忙碌/敷衍)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>E (拒绝/无效)</label></div>
                    </div>
                  </div>
                </div>
                <div class="filter-item"><label>业务类型：</label><select class="filter-select"><option value="">全部</option><option value="new">新线索</option><option value="cold">冷线索</option></select></div>
                <div class="filter-item"><label>大区：</label><select class="filter-select region-select" onchange="handleRegionChange(this)"><option value="">全部</option><option>华东大区</option><option>华南大区</option><option>华北大区</option></select></div>
                <div class="filter-item"><label>小区：</label><select class="filter-select district-select" onchange="handleDistrictChange(this)"><option value="">全部</option></select></div>
                <div class="filter-item"><label>门店：</label>
                  <div class="multi-select-wrap"><div class="multi-select-display" onclick="toggleMultiSelect(event,this)">全部</div>
                    <div class="multi-select-dropdown store-dropdown">
                      <div class="store-search-wrap" style="padding:6px 12px;border-bottom:1px solid #f0f0f0;">
                        <input type="text" placeholder="输入门店名称过滤..." oninput="handleStoreSearch(this)" class="filter-input" style="width:100%;box-sizing:border-box;height:26px;font-size:11px;padding:4px 8px;border-radius:4px;border:1px solid #d9d9d9;">
                      </div>
                      <div class="store-options-list"><div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div></div>
                    </div>
                  </div>
                </div>
                <div class="btn-group">
                  <button class="btn btn-default" onclick="resetFilter(this.closest('.sub-tab-panel'))">重置</button>
                  <button class="btn btn-primary" onclick="doQuery()">查询</button>
                  <button class="btn btn-success" onclick="doExport(event)">导出</button>
                  <button class="btn btn-reload" onclick="doRefresh()">刷新</button>
                </div>
              </div>
              <div class="table-wrap">
                <div class="table-container">
                  <table class="data-table"><thead><tr>
                    <th>序号</th><th>导入时间</th><th>线索编码</th><th>呼叫任务场景名称</th><th>业务类型</th><th>手机号</th><th>门店编码</th><th>门店名称</th><th>呼叫时间</th><th>通话状态</th><th>通话时长</th><th>意向级别</th><th>下发门店</th>
                  </tr></thead><tbody>${MockClueDetailNEV.map(renderDetailRow).join('')}</tbody></table>
                </div>
                ${renderPagination()}
              </div>
            </div>

            <div id="ai-ice" class="sub-tab-panel" style="display:none;">
              <div class="filter-bar">
                <div class="filter-item"><label>导入时间：</label><div class="filter-date-range">
                  <input type="datetime-local" class="filter-input date" style="width:180px"><span class="sep">—</span><input type="datetime-local" class="filter-input date" style="width:180px">
                </div></div>
                <div class="filter-item"><label>首次外呼时间：</label><div class="filter-date-range">
                  <input type="datetime-local" class="filter-input date" style="width:180px"><span class="sep">—</span><input type="datetime-local" class="filter-input date" style="width:180px">
                </div></div>
                <div class="filter-item"><label>呼叫任务场景名称：</label><select class="filter-select"><option value="">全部</option><option>一知-燃油车-冷线索</option></select></div>
                <div class="filter-item"><label>意向级别：</label>
                  <div class="multi-select-wrap"><div class="multi-select-display" onclick="toggleMultiSelect(event,this)">全部</div>
                    <div class="multi-select-dropdown">
                      <div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>A (高意向)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>B (潜在)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>C (一般)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>D (忙碌/敷衍)</label></div>
                      <div class="multi-select-option"><input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>E (拒绝/无效)</label></div>
                    </div>
                  </div>
                </div>
                <div class="filter-item"><label>业务类型：</label><select class="filter-select"><option value="">全部</option><option value="new">新线索</option><option value="cold">冷线索</option></select></div>
                <div class="filter-item"><label>大区：</label><select class="filter-select region-select" onchange="handleRegionChange(this)"><option value="">全部</option><option>华东大区</option><option>华南大区</option><option>华北大区</option></select></div>
                <div class="filter-item"><label>小区：</label><select class="filter-select district-select" onchange="handleDistrictChange(this)"><option value="">全部</option></select></div>
                <div class="filter-item"><label>门店：</label>
                  <div class="multi-select-wrap"><div class="multi-select-display" onclick="toggleMultiSelect(event,this)">全部</div>
                    <div class="multi-select-dropdown store-dropdown">
                      <div class="store-search-wrap" style="padding:6px 12px;border-bottom:1px solid #f0f0f0;">
                        <input type="text" placeholder="输入门店名称过滤..." oninput="handleStoreSearch(this)" class="filter-input" style="width:100%;box-sizing:border-box;height:26px;font-size:11px;padding:4px 8px;border-radius:4px;border:1px solid #d9d9d9;">
                      </div>
                      <div class="store-options-list"><div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div></div>
                    </div>
                  </div>
                </div>
                <div class="btn-group">
                  <button class="btn btn-default" onclick="resetFilter(this.closest('.sub-tab-panel'))">重置</button>
                  <button class="btn btn-primary" onclick="doQuery()">查询</button>
                  <button class="btn btn-success" onclick="doExport(event)">导出</button>
                  <button class="btn btn-reload" onclick="doRefresh()">刷新</button>
                </div>
              </div>
              <div class="table-wrap">
                <div class="table-container">
                  <table class="data-table"><thead><tr>
                    <th>序号</th><th>导入时间</th><th>线索编码</th><th>呼叫任务场景名称</th><th>业务类型</th><th>手机号</th><th>门店编码</th><th>门店名称</th><th>呼叫时间</th><th>通话状态</th><th>通话时长</th><th>意向级别</th><th>下发门店</th>
                  </tr></thead><tbody>${MockClueDetailICE.map(renderDetailRow).join('')}</tbody></table>
                </div>
                ${renderPagination()}
              </div>
            </div>
          </div>

          <!-- 线索回流统计 -->
          <div id="tab-return" class="tab-panel" style="display:none;padding:16px;flex-direction:column;box-sizing:border-box;">
            <div style="background:#fafafa;border-left:4px solid #1677ff;padding:10px 14px;margin-bottom:12px;border-radius:0 4px 4px 0;font-size:13px;color:#595959;box-shadow:0 1px 4px rgba(0,0,0,0.03)">
              统计业务系统传入后，提交到外呼和回传业务系统的数据。
            </div>
            <div class="filter-bar">
              <div class="filter-item"><label>统计时间：</label><div class="filter-date-range">
                <input type="date" class="filter-input" style="width:130px"><span class="sep">—</span><input type="date" class="filter-input" style="width:130px">
              </div></div>
              <div class="filter-item"><label>场景名称：</label><select class="filter-select" style="width:160px"><option value="">全部</option><option>燃油车新线索</option></select></div>
              <div class="btn-group">
                <button class="btn btn-default" onclick="resetFilter(this.closest('.tab-panel'))">重置</button>
                <button class="btn btn-primary" onclick="doQuery()" style="background:#1677ff;border-color:#1677ff">
                  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor" style="margin-right:4px"><path d="M909.6 854.5L729 673.9c56.8-63 91.4-146.2 91.4-237.5 0-200.7-162.7-363.4-363.4-363.4S93.6 235.7 93.6 436.4s162.7 363.4 363.4 363.4c91.3 0 174.5-34.6 237.5-91.4l180.6 180.6c15.2 15.2 40 15.2 55.2 0l21.9-21.9c15.2-15.2 15.2-40 0-55.2zM457 721.8c-157.6 0-285.4-127.8-285.4-285.4S299.4 151 457 151s285.4 127.8 285.4 285.4-127.8 285.4-285.4 285.4z"></path></svg>
                  搜索
                </button>
              </div>
            </div>
            <div class="table-wrap">
              <div class="table-container">
                <table class="data-table" style="min-width:100%"><thead><tr>
                  <th style="width:80px">序号</th>
                  <th>统计时间 <span style="font-size:10px;color:#bfbfbf;margin-left:4px;cursor:pointer">&#8645;</span></th>
                  <th>场景名称</th><th>线索传入数</th><th>提交外呼数</th><th>线索回流数</th>
                </tr></thead><tbody>${MockClueReturn.map(renderReturnRow).join('')}</tbody></table>
              </div>
              ${renderPagination()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function init() {
    const container = document.getElementById('page-content');
    if (!container) return;
    initDefaultDates(container);
    // 确保第一个tab-panel和sub-tab-panel显示
    const firstPanel = container.querySelector('.tab-panel');
    if (firstPanel) firstPanel.style.display = 'flex';
    const firstSub = container.querySelector('.sub-tab-panel');
    if (firstSub) firstSub.style.display = 'flex';
  }

  window.Pages = window.Pages || {};
  window.Pages['report-clue'] = { render, init };
})();
