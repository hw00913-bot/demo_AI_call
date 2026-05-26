/**
 * js/pages/scene-list.js — 外呼列表（卡片网格页）
 */

(function () {
  const StatusMap = {
    not_started: { text: '未开始',   color: '#999999', dot: '#999999' },
    running:     { text: '进行中',   color: '#52c41a', dot: '#52c41a' },
    paused:      { text: '用户暂停', color: '#faad14', dot: '#faad14' },
    terminated:  { text: '已终止',   color: '#ff4d4f', dot: '#ff4d4f' },
  };
  const SourceTag = {
    '手动导入': { bg: '#e6f4ff', color: '#1677ff', border: '#91caff' },
    '接口传入': { bg: '#f6ffed', color: '#52c41a', border: '#b7eb8f' },
  };
  const FocusRankData = [
    { name: '询问地址', value: 67 },
    { name: '询问价格', value: 25 },
    { name: '询问优惠', value: 24 },
    { name: '询问身份', value: 16 },
    { name: '卖什么车', value: 8 },
    { name: '置换补贴', value: 7 },
    { name: '询问新能源车型', value: 4 },
    { name: '介绍某款车', value: 4 },
    { name: '机器人', value: 3 },
    { name: '质疑号码外显', value: 3 },
    { name: '询问营业时间', value: 2 },
    { name: '询问试驾', value: 2 },
    { name: '询问贷款政策', value: 2 },
    { name: '询问现车', value: 1 },
    { name: '询问售后服务', value: 1 },
    { name: '询问保养', value: 1 },
  ];

  function renderCard(item) {
    const s = StatusMap[item.status] || StatusMap.not_started;
    const tag = SourceTag[item.source] || SourceTag['手动导入'];
    return `
      <div class="scene-card" data-id="${item.id}">
        <div class="card-header">
          <div class="card-title">${item.name}</div>
          <div class="card-status">
            <span class="status-dot" style="background:${s.dot}"></span>
            <span class="status-text" style="color:${s.color}">${s.text}</span>
          </div>
        </div>
        <div class="card-tag" style="background:${tag.bg};color:${tag.color};border:1px solid ${tag.border}">
          ${item.source}
        </div>
        <div class="card-stats">
          <div class="stat-item">
            <div class="stat-label">已分配</div>
            <div class="stat-value">${item.assigned}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">待呼叫</div>
            <div class="stat-value">${item.pending}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">已呼叫</div>
            <div class="stat-value">${item.called}</div>
          </div>
        </div>
        <div class="card-action-btn-group">
            <button class="card-action-btn primary" onclick="window.Pages['scene-list'].showDetail(${item.id})">查看</button>
            <button class="card-action-btn default" onclick="showToast('编辑功能开发中','info')">编辑</button>
            <span class="card-action-more" onclick="window.Pages['scene-list'].toggleMoreMenu(event,${item.id})">⋮</span>
          </div>
      </div>
    `;
  }

  function render() {
    const cards = MockSceneList.map(renderCard).join('');
    return `
      <div class="scene-list-page">
        <!-- 页面标题区 -->
        <div class="scene-page-header">
          <div class="scene-page-title-row">
            <span class="scene-page-title">外呼列表</span>
            <span class="scene-page-subtitle">当前系统所有的外呼呼叫记录。</span>
          </div>
        </div>

        <!-- 筛选栏 -->
        <div class="filter-bar">
          <div class="filter-item">
            <label>场景名称：</label>
            <input type="text" class="filter-input" placeholder="请输入" style="width: 200px;">
          </div>
          <div class="filter-item">
            <label>状态：</label>
            <select class="filter-select" style="width: 140px;">
              <option value="">请选择</option>
              <option value="not_started">未开始</option>
              <option value="running">进行中</option>
              <option value="paused">用户暂停</option>
              <option value="terminated">已终止</option>
            </select>
          </div>
          <div class="btn-group">
            <button class="btn btn-default" onclick="resetFilter(this.closest('.scene-list-page'))">重置</button>
            <button class="btn btn-primary" onclick="doQuery()">查询</button>
          </div>
        </div>

        <!-- 卡片网格 -->
        <div class="scene-card-grid">
          ${cards}
        </div>
      </div>
    `;
  }

  /* 各子标签的表头、文案与行渲染配置 */
  const SubTabConfig = {
    '已分配': {
      summary: '共 0 个外呼号码传入成功，正在等待进入呼叫队列。',
      actions: true,
      exportBtn: false,
      cols: ['用户号码','号码分配时间','等待提交时间','操作'],
      rows: null,
      renderRow: null,
    },
    '待呼叫': {
      summary: '共 0 个外呼号码，正在等待呼叫队列。',
      actions: false,
      exportBtn: false,
      cols: ['用户号码','号码提交时间','已拨打次数','等待呼叫时长','正在排队通道'],
      rows: null,
      renderRow: null,
    },
    '已呼叫': {
      summary: `共 ${MockCalledRows.length} 个外呼号码，已呼叫。`,
      actions: false,
      exportBtn: true,
      cols: ['用户号码','号码提交时间','已拨打次数','最终外呼结果','外呼通道','最终外呼时间','通话时长','外呼小结','最后通话节点','操作'],
      rows: MockCalledRows,
      renderRow: r => `
        <td>${r.phone}</td>
        <td>${r.submitTime}</td>
        <td>${r.dialCount}</td>
        <td><span class="tag tag-green">${r.result}</span></td>
        <td>${r.channel}</td>
        <td>${r.lastCallTime}</td>
        <td>${r.duration}</td>
        <td title="${r.summary}" style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.summary}</td>
        <td>${r.lastNode}</td>
        <td><a href="#" class="card-action-link" onclick="event.preventDefault();showToast('通话记录开发中','info')">通话记录</a></td>`,
    },
    '已过滤': {
      summary: '共 0 个外呼号码，被过滤。',
      actions: false,
      exportBtn: false,
      cols: ['用户号码','号码提交时间 ↕','已拨打次数','过滤原因','过滤时间 ↕'],
      rows: null,
      renderRow: null,
    },
    '呼叫失败': {
      summary: `共 ${MockFailedRows.length} 个外呼号码，呼叫失败。`,
      actions: false,
      exportBtn: false,
      cols: ['用户号码','号码提交时间 ↕','失败原因'],
      rows: MockFailedRows,
      renderRow: r => `
        <td>${r.phone}</td>
        <td>${r.submitTime}</td>
        <td>${r.reason}</td>`,
    },
  };

  /* 各子标签对应的筛选栏 HTML */
  const SubTabFilterMap = {
    '已分配': `
      <div class="filter-item"><label>用户号码：</label><input type="text" class="filter-input" placeholder="请输入" style="width:180px;"></div>
      <div class="filter-item"><label>号码分配时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>`,
    '待呼叫': `
      <div class="filter-item"><label>用户号码：</label><input type="text" class="filter-input" placeholder="请输入" style="width:180px;"></div>
      <div class="filter-item"><label>号码提交时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>`,
    '已呼叫': `
      <div class="filter-item"><label>用户号码：</label><input type="text" class="filter-input" placeholder="请输入" style="width:180px;"></div>
      <div class="filter-item"><label>号码提交时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>`,
    '已过滤': `
      <div class="filter-item"><label>用户号码：</label><input type="text" class="filter-input" placeholder="请输入" style="width:180px;"></div>
      <div class="filter-item"><label>号码提交时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>
      <div class="filter-item"><label>过滤时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>`,
    '呼叫失败': `
      <div class="filter-item"><label>用户号码：</label><input type="text" class="filter-input" placeholder="请输入" style="width:180px;"></div>
      <div class="filter-item"><label>号码提交时间：</label><div class="filter-date-range"><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"><span class="sep">→</span><input type="text" class="filter-input date" placeholder="请选择" style="width:130px;"></div></div>`,
  };

  function renderSubContent(tabName) {
    const cfg = SubTabConfig[tabName] || SubTabConfig['已分配'];
    const colCount = cfg.cols.length;
    const actionsHtml = cfg.actions
      ? `<div class="scene-detail-actions"><button class="btn btn-default" onclick="window.Pages['scene-list'].showImportModal()">手动导入</button><button class="btn btn-default">批量移除</button></div>`
      : '';
    const exportHtml = cfg.exportBtn
      ? `<button class="btn btn-primary" onclick="showToast('导出功能开发中','info')">导出</button>`
      : '';

    // 导入记录特殊处理
    if (cfg.isImportRecord) {
      const importRows = cfg.rows.map(r => `
        <tr>
          <td>${r.name}</td>
          <td>${r.total.toLocaleString()}</td>
          <td>${r.success.toLocaleString()}</td>
          <td>${r.fail.toLocaleString()}</td>
          <td><span class="tag ${r.status === '已完成' ? 'tag-green' : 'tag-orange'}">${r.status}</span></td>
          <td>${r.time}</td>
          <td>${r.op}</td>
          <td>
            <a href="#" class="card-action-link" onclick="event.preventDefault();showToast('查看详情功能开发中','info')">详情</a>
          </td>
        </tr>
      `).join('');
      return `
        <div class="scene-detail-summary">
          <span>${cfg.summary}</span>
        </div>
        <div class="scene-detail-table-wrap">
          <table class="scene-detail-table">
            <thead><tr>
              <th>文件名</th>
              <th>导入总数</th>
              <th>成功数</th>
              <th>失败数</th>
              <th>状态</th>
              <th>导入时间</th>
              <th>操作人</th>
              <th>操作</th>
            </tr></thead>
            <tbody>${importRows}</tbody>
          </table>
        </div>
      `;
    }

    const colsHtml = cfg.cols.map(c => `<th>${c}</th>`).join('');

    let bodyHtml = '';
    if (cfg.rows && cfg.rows.length > 0 && cfg.renderRow) {
      bodyHtml = cfg.rows.map(r => `<tr>${cfg.renderRow(r)}</tr>`).join('');
    } else {
      bodyHtml = `<tr><td colspan="${colCount}">
        <div class="scene-detail-empty">
          <div style="font-size:32px;opacity:.3">&#128230;</div>
          <div style="font-size:13px;color:#bbb">暂无数据</div>
        </div></td></tr>`;
    }

    const paginationHtml = (cfg.rows && cfg.rows.length > 0) ? `
      <div class="scene-detail-pagination">
        <span>第 1-${cfg.rows.length} 条/总共 ${cfg.rows.length} 条</span>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="scene-detail-page-btn disabled">‹</div>
          <div class="scene-detail-page-btn active">1</div>
          <div class="scene-detail-page-btn disabled">›</div>
        </div>
        <span class="scene-detail-page-size">20 条/页 ∨</span>
      </div>` : '';

    const filterHtml = SubTabFilterMap[tabName] || SubTabFilterMap['已分配'];
    return `
      <div class="scene-detail-filter">
        ${filterHtml}
        <div class="btn-group">
          <button class="btn btn-default">重置</button>
          <button class="btn btn-primary">查询</button>
        </div>
      </div>
      <div class="scene-detail-summary">
        <span>${cfg.summary}</span>
        <div style="display:flex;gap:8px;align-items:center">${actionsHtml}${exportHtml}</div>
      </div>
      <div class="scene-detail-table-wrap">
        <table class="scene-detail-table">
          <thead><tr>${colsHtml}</tr></thead>
          <tbody>${bodyHtml}</tbody>
        </table>
      </div>
      ${paginationHtml}
    `;
  }

  function showDetail(id) {
    const item = MockSceneList.find(d => d.id === id);
    if (!item) return;
    const s = StatusMap[item.status] || StatusMap.not_started;
    const tag = SourceTag[item.source] || SourceTag['手动导入'];

    const html = `
      <div class="scene-detail-backdrop" id="sceneDetailBackdrop" onclick="window.Pages['scene-list'].closeDetail(event)">
        <div class="scene-detail-drawer" onclick="event.stopPropagation()">
          <div class="scene-detail-header">
            <span class="scene-detail-close" onclick="window.Pages['scene-list'].closeDetail()">&times;</span>
            <span class="scene-detail-title">查看外呼</span>
          </div>

          <div class="scene-detail-body">
            <div class="scene-detail-meta">
              <div class="scene-detail-meta-row">
                <div class="scene-detail-name"><label>场景名称：</label>${item.name}</div>
                <div class="scene-detail-status">
                  <label>状态：</label>
                  <span class="status-dot" style="background:${s.dot}"></span>
                  <span style="color:${s.color}">${s.text}</span>
                  <button class="scene-toggle-btn" onclick="showToast('启停任务功能开发中','info')">启/停任务</button>
                </div>
              </div>
              <div class="scene-detail-tags">
                <span class="scene-detail-tag" style="background:${tag.bg};color:${tag.color};border:1px solid ${tag.border}">一知科技</span>
                <span class="scene-detail-tag" style="background:${tag.bg};color:${tag.color};border:1px solid ${tag.border}">${item.source}</span>
              </div>
            </div>

            <div class="scene-detail-tabs">
              <div class="scene-detail-tab active" onclick="window.Pages['scene-list'].switchMainTab(this,'dataOverview')">数据概览</div>
              <div class="scene-detail-tab" onclick="window.Pages['scene-list'].switchMainTab(this,'callList')">呼叫名单</div>
              <div class="scene-detail-tab" onclick="window.Pages['scene-list'].switchMainTab(this,'taskDetail')">任务详情</div>
            </div>

            <div class="scene-detail-content" id="sceneDetailContent">
              ${renderMainTabContent('dataOverview')}
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
    // 入场动画：DOM 插入后下一帧添加 .open 触发 transition
    requestAnimationFrame(() => {
      const backdrop = document.getElementById('sceneDetailBackdrop');
      const drawer = document.querySelector('.scene-detail-drawer');
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
    });
  }

  function switchSubTab(el, tabName) {
    const container = document.getElementById('sceneSubContent');
    if (!container) return;
    document.querySelectorAll('.scene-detail-subtab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    container.innerHTML = renderSubContent(tabName);
  }

  /* ===== 主 tab 切换（呼叫名单 / 数据概览 / 任务详情） ===== */
  function switchMainTab(el, tabName) {
    const container = document.getElementById('sceneDetailContent');
    if (!container) return;
    document.querySelectorAll('.scene-detail-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    container.innerHTML = renderMainTabContent(tabName);
  }

  function renderFocusRows(list) {
    const maxValue = FocusRankData[0] ? FocusRankData[0].value : 1;
    return list.map(item => {
      const width = Math.max(Math.round((item.value / maxValue) * 100), 4);
      return `<div class="focus-row"><span>${item.name}</span><div class="focus-track"><i style="width:${width}%;"></i></div><em>${item.value}</em></div>`;
    }).join('');
  }

  function renderFocusRankModal() {
    const rows = FocusRankData.map((item, index) => `
      <div class="focus-rank-row">
        <span class="focus-rank-index">${index + 1}</span>
        <span class="focus-rank-name">${item.name}</span>
        <div class="focus-rank-track"><i style="width:${Math.max(Math.round((item.value / FocusRankData[0].value) * 100), 4)}%;"></i></div>
        <span class="focus-rank-value">${item.value}</span>
      </div>
    `).join('');

    return `
      <div class="focus-rank-backdrop" id="focusRankBackdrop" onclick="window.Pages['scene-list'].closeFocusRankModal(event)">
        <div class="focus-rank-modal" onclick="event.stopPropagation()">
          <div class="focus-rank-header">
            <span class="focus-rank-title">全部客户关注点排名</span>
            <span class="focus-rank-close" onclick="window.Pages['scene-list'].closeFocusRankModal()">&#10005;</span>
          </div>
          <div class="focus-rank-body">
            <div class="focus-rank-summary">共 ${FocusRankData.length} 个关注点，按出现次数降序排列</div>
            <div class="focus-rank-list">${rows}</div>
          </div>
        </div>
      </div>
    `;
  }

  function showFocusRankModal() {
    const old = document.getElementById('focusRankBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', renderFocusRankModal());
    document.body.style.overflow = 'hidden';
  }

  function closeFocusRankModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('focusRankBackdrop');
    if (backdrop) backdrop.remove();
    if (!document.getElementById('sceneDetailBackdrop') && !document.getElementById('intentConfigBackdrop')) {
      document.body.style.overflow = '';
    }
  }

  function renderMainTabContent(tabName) {
    if (tabName === 'callList') {
      return `
        <div class="scene-detail-subtabs">
          <div class="scene-detail-subtab active" onclick="window.Pages['scene-list'].switchSubTab(this,'已分配')">已分配</div>
          <div class="scene-detail-subtab" onclick="window.Pages['scene-list'].switchSubTab(this,'待呼叫')">待呼叫</div>
          <div class="scene-detail-subtab" onclick="window.Pages['scene-list'].switchSubTab(this,'已呼叫')">已呼叫</div>
          <div class="scene-detail-subtab" onclick="window.Pages['scene-list'].switchSubTab(this,'已过滤')">已过滤</div>
          <div class="scene-detail-subtab" onclick="window.Pages['scene-list'].switchSubTab(this,'呼叫失败')">呼叫失败</div>
        </div>
        <div id="sceneSubContent">${renderSubContent('已分配')}</div>
      `;
    } else if (tabName === 'dataOverview') {
      return `
        <div class="overview-section">
          <!-- ===== 区块一：外呼数据 ===== -->
          <div class="overview-block">
            <div class="overview-block-header">
              <div class="overview-block-title">外呼数据</div>
            </div>
            <div class="overview-block-body">
              <div class="overview-grid cols-6">
                <div class="overview-card">
                  <div class="overview-card-title">导入客户数 <span class="overview-help" data-tooltip="当前任务导入的客户手机号总数（去重）">&#9432;</span></div>
                  <div class="overview-card-value">6</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">外呼客户数 <span class="overview-help" data-tooltip="提交到外部智能呼叫系统接口的客户手机号总数（去重）">&#9432;</span></div>
                  <div class="overview-card-value">1</div>
                  <div class="overview-card-sub">总外呼数：2</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">过滤客户数 <span class="overview-help" data-tooltip="从本地任务已过滤获取（去重）">&#9432;</span></div>
                  <div class="overview-card-value">5</div>
                  <div class="overview-card-sub">过滤比例：83.33%</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">接听数 <span class="overview-help" data-tooltip="已接通的手机号数量（不去重）">&#9432;</span></div>
                  <div class="overview-card-value">0</div>
                  <div class="overview-card-sub">接听率：0%</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">未接通数 <span class="overview-help" data-tooltip="未接通的手机号数量（不去重）">&#9432;</span></div>
                  <div class="overview-card-value">0</div>
                  <div class="overview-card-sub">未接通率：0%</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">平均通话时长 <span class="overview-help" data-tooltip="每次通话的平均时长">&#9432;</span></div>
                  <div class="overview-card-value">0<span class="overview-unit">秒</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 区块二：意向分类 ===== -->
          <div class="overview-block">
            <div class="overview-block-header">
              <div class="overview-block-title orange">意向分类</div>
              <span class="overview-config-btn" onclick="window.Pages['scene-list'].showIntentConfig()">&#9881; 配置</span>
            </div>
            <div class="overview-block-body">
              <div class="overview-grid cols-3">
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel1Tag()}类客户占比 <span class="overview-help" data-tooltip="意向等级1客户占比">&#9432;</span></div>
                  <div class="overview-card-value sub">0<span class="overview-unit">%</span></div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel2Tag()}类客户占比 <span class="overview-help" data-tooltip="意向等级2客户占比">&#9432;</span></div>
                  <div class="overview-card-value sub">0<span class="overview-unit">%</span></div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel1Tag()}/${getIntentLevel2Tag()}类客户占比 <span class="overview-help" data-tooltip="意向等级1或2客户合计占比">&#9432;</span></div>
                  <div class="overview-card-value sub">0<span class="overview-unit">%</span></div>
                </div>
              </div>
              <div class="overview-grid cols-3" style="margin-top:1px;">
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel1Tag()}类客户数 <span class="overview-help" data-tooltip="意向等级1客户数量">&#9432;</span></div>
                  <div class="overview-card-value sub">0</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel2Tag()}类客户数 <span class="overview-help" data-tooltip="意向等级2客户数量">&#9432;</span></div>
                  <div class="overview-card-value sub">0</div>
                </div>
                <div class="overview-card">
                  <div class="overview-card-title">${getIntentLevel1Tag()}/${getIntentLevel2Tag()}类客户数 <span class="overview-help" data-tooltip="意向等级1或2客户合计数量">&#9432;</span></div>
                  <div class="overview-card-value sub">0</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 区块三：意向洞察 ===== -->
          <div class="overview-block">
            <div class="overview-block-header">
              <div class="overview-block-title blue">意向洞察</div>
            </div>
            <div class="overview-block-body">
              <div class="intent-donut-panel">
                <div class="intent-donut-chart" aria-label="意向分类占比图">
                  <div class="intent-donut-ring"></div>
                  <div class="intent-donut-label label-a"><span>A(高意向): 1.65%</span></div>
                  <div class="intent-donut-label label-b"><span>B(低意向): 2.48%</span></div>
                  <div class="intent-donut-label label-c"><span>C(意向待定): 5.73%</span></div>
                  <div class="intent-donut-label label-d"><span>D(无意向): 31.34%</span></div>
                  <div class="intent-donut-label label-e"><span>E(未接通): 54.42%</span></div>
                  <div class="intent-donut-label label-f"><span>F(停机/空号): 4.38%</span></div>
                </div>
              </div>

              <div class="overview-insight-grid">
                <div class="overview-chart-panel focus-panel">
                  <div class="overview-chart-header">
                    <div class="overview-chart-title">客户关注点</div>
                    <div class="overview-chart-tabs">
                      <span class="active">前十</span>
                      <span class="clickable" onclick="window.Pages['scene-list'].showFocusRankModal()">全部</span>
                    </div>
                  </div>
                  <div class="focus-list">
                    ${renderFocusRows(FocusRankData.slice(0, 10))}
                  </div>
                </div>

                <div class="overview-chart-panel duration-panel">
                  <div class="overview-chart-title">通话时长</div>
                  <div class="duration-axis-title">客户数量（位）</div>
                  <div class="duration-chart">
                    <div class="duration-grid-lines"><span></span><span></span><span></span><span></span><span></span><span></span></div>
                    <div class="duration-bars">
                      <div class="duration-bar-item"><strong>180</strong><i style="height:12%;"></i><span>0s~5s</span></div>
                      <div class="duration-bar-item"><strong>656</strong><i style="height:44%;"></i><span>5s~10s</span></div>
                      <div class="duration-bar-item"><strong>1341</strong><i style="height:89%;"></i><span>10s～30s</span></div>
                      <div class="duration-bar-item"><strong>272</strong><i style="height:18%;"></i><span>30s~60s</span></div>
                      <div class="duration-bar-item"><strong>45</strong><i style="height:3%;"></i><span>60s~90s</span></div>
                      <div class="duration-bar-item"><strong>28</strong><i style="height:2%;"></i><span>&gt;90s</span></div>
                    </div>
                    <div class="duration-y-axis"><span>1500</span><span>1200</span><span>900</span><span>600</span><span>300</span><span>0</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tabName === 'taskDetail') {
      return `
        <div class="task-detail-section">
          <div class="task-detail-row">
            <div class="task-detail-label">创建日期</div>
            <div class="task-detail-value">2026年05月08日 15:15:37</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">话术名称</div>
            <div class="task-detail-value">东风日产【渝兴店】店端售前-客户名录</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">任务id</div>
            <div class="task-detail-value">1704345113275</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">任务描述</div>
            <div class="task-detail-value">无</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">启动方式</div>
            <div class="task-detail-value">自动</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">拨打时间段</div>
            <div class="task-detail-value">每天 09:00~21:30</div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">风控策略</div>
            <div class="task-detail-value">
              <div>自定义策略：&nbsp;&nbsp;无</div>
              <div style="margin-top:2px;">账号黑名单：&nbsp;&nbsp;默认分组</div>
            </div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label">自动重拨设置</div>
            <div class="task-detail-value">
              <div>条件组1</div>
              <div>重拨间隔：60 分钟</div>
              <div>重拨次数：1 次</div>
              <div>重拨条件：无应答、忙线中、拒接、关机、停机、无法接通、主叫欠费、外呼失败</div>
            </div>
          </div>
          <div class="task-detail-row">
            <div class="task-detail-label"></div>
            <div class="task-detail-value">
              <div>条件组2</div>
              <div>重拨间隔：30 分钟</div>
              <div>重拨次数：2 次</div>
              <div>重拨条件：空号</div>
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  function closeDetail(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('sceneDetailBackdrop');
    const drawer = backdrop ? backdrop.querySelector('.scene-detail-drawer') : null;
    if (!backdrop || !drawer) return;
    if (backdrop) backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(() => {
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
    }, 320);
  }

  /* ===== 更多操作下拉菜单 ===== */
  let activeMoreMenu = null;

  function toggleMoreMenu(e, id) {
    e.stopPropagation();
    closeMoreMenu();

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuId = 'moreMenu-' + id;

    const html = `
      <div class="scene-more-menu" id="${menuId}" data-scene-id="${id}"
           style="position:fixed;z-index:3000;top:${rect.bottom + 6}px;left:${rect.left - 90}px;">
        <div class="scene-more-item" onclick="window.Pages['scene-list'].onMenuAction('删除',${id})">删除</div>
        <div class="scene-more-item" onclick="window.Pages['scene-list'].onMenuAction('暂停',${id})">暂停</div>
        <div class="scene-more-item" onclick="window.Pages['scene-list'].onMenuAction('终止',${id})">终止</div>
        <div class="scene-more-item primary" onclick="window.Pages['scene-list'].onMenuAction('启动',${id})">启动</div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    activeMoreMenu = document.getElementById(menuId);

    // 点击页面任意位置关闭
    requestAnimationFrame(() => {
      document.addEventListener('click', closeMoreMenu, { once: true });
    });
  }

  function closeMoreMenu() {
    if (activeMoreMenu) {
      activeMoreMenu.remove();
      activeMoreMenu = null;
    }
  }

  function onMenuAction(action, id) {
    closeMoreMenu();
    showToast(`${action}功能开发中（场景ID: ${id}）`, 'info');
  }

  /* ===== 手动导入弹窗 ===== */
  function renderImportUploadContent() {
    return `
      <div class="import-upload-area" onclick="showToast('上传功能开发中','info')">
        <div class="upload-icon">&#128228;</div>
        <div class="upload-text">点击或将文件拖拽到此处上传</div>
        <div class="upload-hint">
          支持文件：csv 、 xls 、 xlsx 文件，号码数量不大于 300,000<br>
          您可以选择重新上传，但重新上传会覆盖原有上传的号码
        </div>
      </div>
    `;
  }

  function renderImportRecordContent() {
    const records = [
      { id: 1, name: '渝发518.xlsx', total: 300000, success: 299950, fail: 50, status: '已完成', time: '2026-05-20 09:15:23', op: '张三' },
      { id: 2, name: '客户名单0520.csv', total: 5000, success: 4998, fail: 2, status: '导入中', time: '2026-05-20 09:18:45', op: '张三' },
    ];
    const rows = records.map(r => `
      <tr>
        <td>${r.name}</td>
        <td>${r.total.toLocaleString()}</td>
        <td>${r.success.toLocaleString()}</td>
        <td>${r.fail.toLocaleString()}</td>
        <td><span class="tag ${r.status === '已完成' ? 'tag-green' : 'tag-orange'}">${r.status}</span></td>
        <td>${r.time}</td>
        <td>${r.op}</td>
        <td><a href="#" class="card-action-link" onclick="event.preventDefault();window.Pages['scene-list'].exportImportResult(${r.fail})">导出失败记录</a></td>
      </tr>
    `).join('');
    return `
      <div class="import-record-summary">共 ${records.length} 条导入记录</div>
      <div class="scene-detail-table-wrap" style="margin-top:12px;">
        <table class="scene-detail-table">
          <thead><tr>
            <th>文件名</th>
            <th>导入总数</th>
            <th>成功数</th>
            <th>失败数</th>
            <th>状态</th>
            <th>导入时间</th>
            <th>操作人</th>
            <th>操作</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function showImportModal() {
    const html = `
      <div class="import-modal-backdrop" id="importModalBackdrop" onclick="window.Pages['scene-list'].closeImportModal(event)">
        <div class="import-modal" onclick="event.stopPropagation()">
          <div class="import-modal-header">
            <span class="title">手动导入</span>
            <span class="close-btn" onclick="window.Pages['scene-list'].closeImportModal()">&times;</span>
          </div>
          <div class="import-modal-tabs">
            <div class="import-modal-tab active" onclick="window.Pages['scene-list'].switchImportTab(this,'upload')">上传文件</div>
            <div class="import-modal-tab" onclick="window.Pages['scene-list'].switchImportTab(this,'record')">导入记录</div>
          </div>
          <div class="import-modal-body" id="importModalContent">
            ${renderImportUploadContent()}
          </div>
          <div class="import-modal-footer" id="importModalFooter">
            <button class="btn btn-default" onclick="showToast('下载模板功能开发中','info')">下载模板</button>
            <button class="btn btn-primary" onclick="window.Pages['scene-list'].doStartUpload()">开始上传</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
  }

  function switchImportTab(el, tabName) {
    document.querySelectorAll('.import-modal-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const content = document.getElementById('importModalContent');
    const footer = document.getElementById('importModalFooter');
    if (!content) return;
    if (tabName === 'upload') {
      content.innerHTML = renderImportUploadContent();
      footer.style.display = '';
    } else {
      content.innerHTML = renderImportRecordContent();
      footer.style.display = 'none';
    }
  }

  function closeImportModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('importModalBackdrop');
    if (backdrop) {
      backdrop.remove();
      document.body.style.overflow = '';
    }
  }

  function doStartUpload() {
    closeImportModal();
    showToast('上传已开始，请稍后查看导入记录', 'success');
  }

  function exportImportResult(failCount) {
    if (failCount === 0) {
      showToast('当前导入全部成功', 'success');
      return;
    }
    // 模拟导入结果数据
    const data = [
      { result: '成功', reason: '—', phone: '15975587676', orderNo: '0001', needRescue: '是', time: '2025.10.09 12:00' },
      { result: '失败', reason: '手机号格式有误', phone: '1597558767', orderNo: '0001', needRescue: '是', time: '2025.10.09 12:00' },
      { result: '失败', reason: '手机号为空', phone: '', orderNo: '0001', needRescue: '是', time: '2025.10.09 12:00' },
      { result: '失败', reason: '必填项为空', phone: '15975587676', orderNo: '0001', needRescue: '', time: '2025.10.09 12:00' },
      { result: '失败', reason: '手机号重复', phone: '15975587676', orderNo: '0001', needRescue: '是', time: '2025.10.09 12:00' },
    ];

    // 生成CSV内容
    const headers = ['导入结果', '失败原因', '手机号', '单号(必填)', '是否需要救援(必填)', '发生时间(必填)'];
    const rows = data.map(r => [
      r.result,
      r.reason,
      r.phone,
      r.orderNo,
      r.needRescue,
      r.time
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    // 添加BOM以支持中文
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '导入结果_' + new Date().toLocaleDateString().replace(/\//g, '-') + '.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('导出成功', 'success');
  }

  /* ===== 意向数据设置弹窗 ===== */
  // 意向等级配置数据（全局状态）
  let intentLevelsConfig = [
    { label: '意向等级1', tags: ['A (高意向)'] },
    { label: '意向等级2', tags: ['B (潜在)'] },
    { label: '意向等级3', tags: ['A (高意向)'] },
  ];

  // 可选的意向标签列表
  const intentTagOptions = [
    'A (高意向)',
    'B (潜在)',
    'C (一般)',
    'D (忙碌/敷衍)',
    'E (拒绝/无效/无应答)',
  ];

  // 获取意向等级1的标签名（用于显示）
  function getIntentLevel1Tag() {
    const level1 = intentLevelsConfig[0];
    if (!level1 || level1.tags.length === 0) return 'A (高意向)';
    return level1.tags[0];
  }

  // 获取意向等级2的标签名（用于显示）
  function getIntentLevel2Tag() {
    const level2 = intentLevelsConfig[1];
    if (!level2 || level2.tags.length === 0) return 'B (潜在)';
    return level2.tags[0];
  }

  // 获取意向等级选中的标签文本（用于显示）
  function getTagsDisplayText(levelIndex) {
    const level = intentLevelsConfig[levelIndex];
    if (!level || level.tags.length === 0) return '请选择标签';
    return level.tags.join('、');
  }

  // 获取意向等级选中标签数
  function getTagsCount(levelIndex) {
    const level = intentLevelsConfig[levelIndex];
    return level ? level.tags.length : 0;
  }

  function renderIntentConfigModal() {
    const rows = intentLevelsConfig.map((l, index) => {
      return `
        <div class="intent-config-row">
          <div class="intent-config-label"><span class="required">*</span>${l.label}：</div>
          <div class="intent-multi-select" data-level="${index}">
            <div class="intent-multi-select-display" onclick="window.Pages['scene-list'].toggleIntentDropdown(${index}, event)">
              <span class="intent-multi-select-text" id="intentSelectText_${index}">${getTagsDisplayText(index)}</span>
              <span class="intent-multi-select-count" id="intentSelectCount_${index}">${getTagsCount(index) > 0 ? '(' + getTagsCount(index) + ')' : ''}</span>
              <span class="intent-multi-select-arrow">&#9662;</span>
            </div>
            <div class="intent-multi-select-dropdown" id="intentDropdown_${index}">
              ${intentTagOptions.map(opt => `
                <div class="intent-multi-select-option ${l.tags.includes(opt) ? 'selected' : ''}" data-value="${opt}" onclick="window.Pages['scene-list'].toggleIntentOption(${index}, '${opt}', this, event)">
                  <span class="intent-checkbox">${l.tags.includes(opt) ? '&#10003;' : ''}</span>
                  <span class="intent-option-text">${opt}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
    return `
      <div class="intent-config-backdrop" id="intentConfigBackdrop" onclick="window.Pages['scene-list'].closeIntentConfig(event)">
        <div class="intent-config-modal" onclick="event.stopPropagation()">
          <div class="intent-config-header">
            <span class="intent-config-title">意向数据设置</span>
            <span class="intent-config-close" onclick="window.Pages['scene-list'].closeIntentConfig()">&#10005;</span>
          </div>
          <div class="intent-config-body">
            <div class="intent-config-tip">
              <span class="intent-config-tip-icon">&#9432;</span>
              <span>下列设置的字段将在任务数据内展示</span>
            </div>
            <div class="intent-config-section-title">意向数据</div>
            ${rows}
          </div>
          <div class="intent-config-footer">
            <button class="btn btn-default" onclick="window.Pages['scene-list'].closeIntentConfig()">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['scene-list'].saveIntentConfig()">保存</button>
          </div>
        </div>
      </div>
    `;
  }

  function showIntentConfig() {
    const html = renderIntentConfigModal();
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
    // 点击其他区域关闭下拉框
    document.addEventListener('click', closeIntentDropdownOutside);
  }

  function closeIntentDropdownOutside(e) {
    if (!e.target.closest('.intent-multi-select')) {
      document.querySelectorAll('.intent-multi-select-dropdown').forEach(d => d.classList.remove('open'));
    }
  }

  function toggleIntentDropdown(levelIndex, e) {
    e.stopPropagation();
    document.querySelectorAll('.intent-multi-select-dropdown').forEach((d, i) => {
      if (i !== levelIndex) d.classList.remove('open');
    });
    const dropdown = document.getElementById('intentDropdown_' + levelIndex);
    if (dropdown) {
      dropdown.classList.toggle('open');
    }
  }

  function toggleIntentOption(levelIndex, tagValue, el, e) {
    if (e) e.stopPropagation();
    const level = intentLevelsConfig[levelIndex];
    const idx = level.tags.indexOf(tagValue);
    if (idx > -1) {
      level.tags.splice(idx, 1);
      el.classList.remove('selected');
      el.querySelector('.intent-checkbox').textContent = '';
    } else {
      if (level.tags.length >= 3) {
        showToast('最多选择3项', 'warning');
        return;
      }
      level.tags.push(tagValue);
      el.classList.add('selected');
      el.querySelector('.intent-checkbox').textContent = '✓';
    }
    // 更新显示
    const textEl = document.getElementById('intentSelectText_' + levelIndex);
    const countEl = document.getElementById('intentSelectCount_' + levelIndex);
    if (textEl) textEl.textContent = getTagsDisplayText(levelIndex);
    if (countEl) countEl.textContent = getTagsCount(levelIndex) > 0 ? '(' + getTagsCount(levelIndex) + ')' : '';
    // 收起下拉框
    const dropdown = document.getElementById('intentDropdown_' + levelIndex);
    if (dropdown) dropdown.classList.remove('open');
  }

  function closeIntentConfig(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('intentConfigBackdrop');
    if (backdrop) {
      backdrop.remove();
      document.body.style.overflow = '';
      document.removeEventListener('click', closeIntentDropdownOutside);
    }
  }

  function saveIntentConfig() {
    showToast('保存成功', 'success');
    closeIntentConfig();
    // 更新页面上的意向分类标题
    updateIntentCardTitles();
  }

  // 更新意向分类卡片的标题（配置保存后调用）
  function updateIntentCardTitles() {
    const level1Tag = getIntentLevel1Tag();
    const level2Tag = getIntentLevel2Tag();
    const titles = document.querySelectorAll('.overview-block .overview-card-title');
    titles.forEach((title, index) => {
      // 根据 title 属性的 tooltip 文本判断是哪类卡片
      const helpEl = title.querySelector('.overview-help');
      if (!helpEl) return;
      const tooltip = helpEl.getAttribute('data-tooltip') || '';
      if (tooltip === '意向等级1客户占比') {
        title.innerHTML = level1Tag + '类客户占比 <span class="overview-help" data-tooltip="意向等级1客户占比">&#9432;</span>';
      } else if (tooltip === '意向等级2客户占比') {
        title.innerHTML = level2Tag + '类客户占比 <span class="overview-help" data-tooltip="意向等级2客户占比">&#9432;</span>';
      } else if (tooltip === '意向等级1或2客户合计占比') {
        title.innerHTML = level1Tag + '/' + level2Tag + '类客户占比 <span class="overview-help" data-tooltip="意向等级1或2客户合计占比">&#9432;</span>';
      } else if (tooltip === '意向等级1客户数量') {
        title.innerHTML = level1Tag + '类客户数 <span class="overview-help" data-tooltip="意向等级1客户数量">&#9432;</span>';
      } else if (tooltip === '意向等级2客户数量') {
        title.innerHTML = level2Tag + '类客户数 <span class="overview-help" data-tooltip="意向等级2客户数量">&#9432;</span>';
      } else if (tooltip === '意向等级1或2客户合计数量') {
        title.innerHTML = level1Tag + '/' + level2Tag + '类客户数 <span class="overview-help" data-tooltip="意向等级1或2客户合计数量">&#9432;</span>';
      }
    });
  }

  function init() {}

  window.Pages = window.Pages || {};
  window.Pages['scene-list'] = { render, init, showDetail, switchSubTab, switchMainTab, renderMainTabContent, closeDetail, toggleMoreMenu, closeMoreMenu, onMenuAction, showImportModal, closeImportModal, doStartUpload, switchImportTab, exportImportResult, showFocusRankModal, closeFocusRankModal, showIntentConfig, closeIntentConfig, saveIntentConfig, toggleIntentDropdown, toggleIntentOption };
})();
