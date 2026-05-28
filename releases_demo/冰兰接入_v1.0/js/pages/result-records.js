/**
 * js/pages/result-records.js — 通话记录
 */

(function () {
  const rows = window.MockCallRecordRows || [];

  function renderRows() {
    if (!rows.length) {
      return `
        <tr>
          <td colspan="11">
            <div class="report-empty">
              <div class="report-empty-icon">&#128230;</div>
              <div>暂无数据</div>
            </div>
          </td>
        </tr>
      `;
    }

    return rows.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.phone}</td>
        <td>${item.startTime}</td>
        <td>${item.endTime}</td>
        <td>${item.duration}</td>
        <td class="record-scene-name">${item.sceneName}</td>
        <td>${item.status}</td>
        <td class="record-summary" title="${item.summary || '-'}">${item.summary || '-'}</td>
        <td>${item.platform || '-'}</td>
        <td>${item.lastNode || '-'}</td>
        <td class="record-action-cell">
          <a href="#" onclick="event.preventDefault();window.Pages['result-records'].showDetail(${index})">详情</a>
        </td>
      </tr>
    `).join('');
  }

  function renderDialogRows() {
    const dialogRows = [
      { role: '客服', text: '您好~' },
      { role: '客户', text: '用户无应答' },
      { role: '客服', text: '喂，尊敬的客户您好，我是东风日产厂家客服，看您之前有关注过日产的车，想问您最近还考虑买车吗？' },
      { role: '客户', text: '忙着呢，什么事啊，我知道了，你那有这打电话这个' },
      { role: '客户', text: '哦，我我你能不能联系我了，我知道了，我我现在开着车忙呢，不方便接听啊' },
      { role: '客服', text: '好的，您先忙，稍后安排4S销售顾问联系您，有需要的可以再了解下，感谢您的接听，再见！' },
    ];

    return dialogRows.map(row => `
      <div class="record-detail-talk-row">
        <div class="record-detail-speaker">${row.role}</div>
        <div class="record-detail-bubble">${row.text}</div>
      </div>
    `).join('');
  }

  function renderOutboundResult() {
    return `
      <div class="record-detail-fields">
        <div><span class="record-info-label">标签合集：</span><span class="record-info-value">call_coll_tag_031:开着车忙</span></div>
        <div><span class="record-info-label">购车意向：</span><span class="record-info-value">little_intention</span></div>
        <div><span class="record-info-label">计划到店时间：</span><span class="record-info-value">-</span></div>
        <div><span class="record-info-label">预计购车时间：</span><span class="record-info-value">-</span></div>
        <div><span class="record-info-label">意向品牌中文名：</span><span class="record-info-value">-</span></div>
        <div><span class="record-info-label">意向车系中文名：</span><span class="record-info-value">-</span></div>
        <div><span class="record-info-label">意向等级编码(A-E)：</span><span class="record-info-value">C</span></div>
      </div>
    `;
  }

  function renderDetailInfo() {
    const fields = [
      ['会话 Id', '0001'],
      ['线索 Id', '123455'],
      ['线索跟进状态', '跟进完成'],
      ['跟进失败原因', '-'],
      ['话单状态', '已接通'],
      ['通话开始时间', '2026-01-02 12:00'],
      ['通话结束时间', '2026-01-02 12:00'],
      ['主叫号码', '1380009999'],
      ['被叫号码', '13444556677'],
      ['通话时长', '27 秒'],
      ['意向等级', '高'],
      ['线索状态', '有效'],
      ['无效原因', '-'],
      ['意向车系', '天籁'],
      ['意向车型', '智驾尊贵版'],
      ['所在地', '广东-广州-天河'],
      ['客户购车门店', '广州某下店'],
      ['是否贷款购车', '是'],
      ['是否有置换计划', '是'],
      ['是否有试乘试驾', '是'],
      ['购车预算', '10万'],
      ['预计购车时间', '半个月以内'],
      ['是否同意到店', '是'],
      ['预约到店时间', '未知'],
      ['客户姓氏', '张'],
      ['是否添加微信', '否'],
      ['联系方式', '13455566898'],
      ['对比竞品', '比亚迪'],
      ['是否关注现车', '否'],
      ['是否到店', '否'],
      ['是否关注二手车', '否'],
      ['是否关注售后', '是'],
    ];

    return `
      <div class="record-detail-section-title">外呼小结</div>
      <div class="record-detail-summary">姓孙的客户在对话中明确对轩逸的贷款优惠感兴趣，希望明天到静海店购车和试驾，询问了现车情况，同时也在对比比亚迪的车，想要加微信详聊。</div>
      <div class="record-info-list">
        ${fields.map(([label, value]) => `
          <div class="record-info-row">
            <span class="record-info-label">${label}:</span>
            <span class="record-info-value">${value}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderDetailModal(item) {
    const summary = item.summary || '客户近期有购车可能，购车城市未提及。客户表示正开车忙，不方便接听。已告知安排4S销售顾问联系，后续需关注销售顾问与客户沟通情况，了解购车具体意向。';
    return `
      <div class="record-detail-backdrop" id="recordDetailBackdrop" onclick="window.Pages['result-records'].closeDetail(event)">
        <div class="record-detail-modal" onclick="event.stopPropagation()">
          <div class="record-detail-header">
            <button class="record-detail-close" onclick="window.Pages['result-records'].closeDetail()">&#215;</button>
            <span class="record-detail-title">会话 id： 2059190973162029057</span>
          </div>
          <div class="record-detail-body">
            <div class="record-detail-left">
              <div class="record-audio-card">
                <div class="record-audio-pill">
                  <span class="record-audio-play">&#9654;</span>
                  <span>0:00 / 0:23</span>
                  <span class="record-audio-line"></span>
                  <span class="record-audio-volume">&#128266;</span>
                  <span class="record-audio-more">&#8942;</span>
                </div>
                <span class="record-audio-icon">&#127911;</span>
                <span class="record-audio-icon">&#128196;</span>
              </div>
              <div class="record-detail-transcript">
                ${renderDialogRows()}
              </div>
            </div>
            <div class="record-detail-right">
              <div class="record-detail-content">
                ${renderDetailInfo()}
                <div class="record-detail-divider"></div>
                ${renderOutboundResult()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function showDetail(index) {
    const item = rows[index] || rows[0] || {};
    document.body.insertAdjacentHTML('beforeend', renderDetailModal(item));
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const backdrop = document.getElementById('recordDetailBackdrop');
      const drawer = backdrop ? backdrop.querySelector('.record-detail-modal') : null;
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
    });
  }

  function closeDetail(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('recordDetailBackdrop');
    const drawer = backdrop ? backdrop.querySelector('.record-detail-modal') : null;
    if (!backdrop) return;
    backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(() => {
      backdrop.remove();
      document.body.style.overflow = '';
    }, 260);
  }

  function render() {
    return `
      <div class="result-records-page">
        <div class="record-hero-card">
          <div class="record-title">通话记录</div>
          <div class="record-subtitle">查看每一通外呼的结果</div>
        </div>

        <div class="record-filter-card">
          <div class="record-filter-item">
            <label>用户号码：</label>
            <input type="text" class="record-input" placeholder="请输入">
          </div>
          <div class="record-filter-item">
            <label>通话开始时间：</label>
            <div class="record-date-range">
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-date-sep">&#8594;</span>
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-calendar">&#128197;</span>
            </div>
          </div>
          <div class="record-filter-item">
            <label>通话结束时间：</label>
            <div class="record-date-range">
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-date-sep">&#8594;</span>
              <input type="text" class="record-date-input" placeholder="请选择">
              <span class="record-calendar">&#128197;</span>
            </div>
          </div>
          <div class="record-filter-item">
            <label>场景名称：</label>
            <input type="text" class="record-input" placeholder="请输入">
          </div>
          <div class="record-filter-item">
            <label>通话状态：</label>
            <select class="record-select">
              <option value="">请选择</option>
              <option value="已接通">已接通</option>
              <option value="无人接听">无人接听</option>
              <option value="占线">占线</option>
              <option value="拒接">拒接</option>
              <option value="关机">关机</option>
            </select>
          </div>
          <div class="record-filter-item">
            <label>智能平台：</label>
            <select class="record-select">
              <option value="冰兰" selected>冰兰</option>
              <option value="一知科技">一知科技</option>
              <option value="科大">科大</option>
            </select>
          </div>
          <div class="record-filter-actions">
            <button class="btn btn-default" onclick="window.Pages['result-records'].resetFilters()">重置</button>
            <button class="btn btn-primary" onclick="doQuery()">查询</button>
            <button class="record-expand-btn" onclick="showToast('高级筛选功能开发中','info')">收起 <span>&#8963;</span></button>
          </div>
        </div>

        <div class="record-table-panel">
          <div class="record-toolbar">
            <button class="btn btn-primary" onclick="showToast('导出功能开发中','info')">＋ 导出</button>
            <button class="report-icon-btn" onclick="doRefresh()" data-tooltip="刷新">&#10227;</button>
            <button class="report-icon-btn" onclick="showToast('列设置功能开发中','info')" data-tooltip="列设置">&#9881;</button>
          </div>
          <div class="record-table-scroll">
            <table class="record-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>用户号码</th>
                  <th>通话开始时间 <span class="record-sort">&#8597;</span></th>
                  <th>通话结束时间 <span class="record-sort">&#8597;</span></th>
                  <th>通话时长</th>
                  <th>场景名称</th>
                  <th>通话状态</th>
                  <th>外呼总结</th>
                  <th>智能平台</th>
                  <th>最后通话节点</th>
                  <th class="record-action-cell">操作</th>
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
    const page = document.querySelector('.result-records-page');
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
  window.Pages['result-records'] = {
    render,
    init() {},
    resetFilters,
    showDetail,
    closeDetail,
  };
})();
