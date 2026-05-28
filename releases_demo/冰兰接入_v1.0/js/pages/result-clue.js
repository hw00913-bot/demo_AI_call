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
        <td><a href="#" class="clue-link" onclick="event.preventDefault();window.Pages['result-clue'].showCustomerTags()">查看</a></td>
        <td class="clue-scene-name">${item.sceneName}</td>
        <td>${formatTime(item.firstVisitTime)}</td>
        <td>${formatTime(item.secondVisitTime)}</td>
        <td>${formatTime(item.thirdVisitTime)}</td>
        <td class="clue-action-cell"><a href="#" onclick="event.preventDefault();window.Pages['result-clue'].showClueDetail()">详情</a></td>
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

  function renderCustomerTagsModal() {
    const tags = [
      ['线索状态', '有效'],
      ['无效原因', '-'],
      ['意向车系', '天籁'],
      ['意向车型', '智驾尊贵版'],
      ['所在省份', '广东'],
      ['所在城市', '广州'],
      ['所在区域', '天河'],
      ['客户购车门店', '广州某下店'],
      ['是否贷款购车', '是'],
      ['是否有置换计划', '是'],
      ['是否有试乘试驾', '是'],
      ['购车预算', '10万'],
      ['预计购车时间', '半个月以内'],
      ['是否同意到店', '是'],
      ['预约到店时间', '未知'],
      ['客户姓氏', '张'],
      ['是否添加微信', '是'],
      ['联系方式', '1380009999'],
      ['对比竞品', '比亚迪'],
      ['是否关注现车', '是'],
      ['是否到店', '否'],
      ['是否关注二手车', '否'],
      ['是否关注售后', '否'],
    ];

    return `
      <div class="clue-tags-backdrop" id="clueTagsBackdrop" onclick="window.Pages['result-clue'].closeCustomerTags(event)">
        <div class="clue-tags-modal" onclick="event.stopPropagation()">
          <div class="clue-tags-header">
            <span class="clue-tags-title">客户详细标签</span>
            <button class="clue-tags-close" onclick="window.Pages['result-clue'].closeCustomerTags()">&#215;</button>
          </div>
          <div class="clue-tags-body">
            ${tags.map(tag => `
              <div class="clue-tags-item">
                <span>${tag[0]}:</span>
                <strong>${tag[1]}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function showCustomerTags() {
    const old = document.getElementById('clueTagsBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', renderCustomerTagsModal());
    document.body.style.overflow = 'hidden';
  }

  function closeCustomerTags(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('clueTagsBackdrop');
    if (backdrop) backdrop.remove();
    document.body.style.overflow = '';
  }

  function renderClueDetailModal() {
    return `
      <div class="clue-detail-backdrop" id="clueDetailBackdrop" onclick="window.Pages['result-clue'].closeClueDetail(event)">
        <div class="clue-detail-modal" onclick="event.stopPropagation()">
          <div class="clue-detail-header">
            <span class="clue-detail-title">详情</span>
            <button class="clue-detail-close" onclick="window.Pages['result-clue'].closeClueDetail()">&#215;</button>
          </div>
          <div class="clue-detail-toolbar">
            <button class="btn btn-primary" onclick="showToast('导出功能开发中','info')">导出</button>
            <button class="report-icon-btn" onclick="doRefresh()" data-tooltip="刷新">&#10227;</button>
            <button class="report-icon-btn" onclick="showToast('列设置功能开发中','info')" data-tooltip="列设置">&#9881;</button>
          </div>
          <div class="clue-detail-table-wrap">
            <table class="clue-detail-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>回访轮次</th>
                  <th>用户号码</th>
                  <th>回访记录</th>
                  <th>客户详细标签</th>
                  <th>意向级别</th>
                  <th>通话状态</th>
                  <th>通话时长</th>
                  <th>通话开始时间</th>
                  <th>通话结束时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>第一次回访</td>
                  <td>15607511604</td>
                  <td class="clue-detail-ellipsis" title="此客户暂无购车计划">此客户暂无购车计...</td>
                  <td><a href="#" class="clue-link" onclick="event.preventDefault();window.Pages['result-clue'].showCustomerTags()">查看</a></td>
                  <td>B(无购车计划)</td>
                  <td>已接通</td>
                  <td>1秒</td>
                  <td>2026-05-27<br>16:24:14</td>
                  <td>2026-05-27<br>16:24:25</td>
                  <td><a href="#" class="clue-link" onclick="event.preventDefault();window.Pages['result-clue'].showCallDetailDrawer()">详情</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clue-detail-pagination">
            <span>第 1-1 条/总共 1 条</span>
            <span class="clue-detail-page-arrow disabled">‹</span>
            <span class="clue-detail-page-current">1</span>
            <span class="clue-detail-page-arrow disabled">›</span>
            <span class="clue-detail-page-size">20 条/页⌄</span>
          </div>
        </div>
      </div>
    `;
  }

  function showClueDetail() {
    const old = document.getElementById('clueDetailBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', renderClueDetailModal());
    document.body.style.overflow = 'hidden';
  }

  function closeClueDetail(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('clueDetailBackdrop');
    if (backdrop) backdrop.remove();
    if (!document.getElementById('clueTagsBackdrop')) document.body.style.overflow = '';
  }

  function renderCallDetailDrawer() {
    const transcript = [
      ['客服', '您好~'],
      ['客户', '用户无应答'],
      ['客服', '喂，尊敬的客户您好，我是东风日产厂家客服，看您之前有关注过日产的车，想问您最近还考虑买车吗？'],
      ['客户', '忙着呢，什么事啊，我知道了，你那有这打电话这个'],
      ['客户', '哦，我我你能不能联系我了，我知道了，我我现在开着车忙呢，不方便接听啊'],
      ['客服', '好的，您先忙，稍后安排4S销售顾问联系您，有需要的可以再了解下，感谢您的接听，再见！'],
    ];
    const fields = [
      ['会话 Id:', '0001'],
      ['线索 Id:', '123455'],
      ['线索跟进状态:', '跟进完成'],
      ['跟进失败原因:', '-'],
      ['话单状态:', '已接通'],
      ['通话开始时间:', '2026-01-02 12:00'],
      ['通话结束时间:', '2026-01-02 12:00'],
      ['主叫号码:', '1380009999'],
      ['被叫号码:', '13444556677'],
      ['通话时长:', '27 秒'],
      ['意向等级:', '高'],
      ['线索状态:', '有效'],
      ['无效原因:', '-'],
      ['意向车系:', '天籁'],
      ['意向车型:', '智驾尊贵版'],
      ['所在地:', '广东-广州-天河'],
      ['客户购车门店:', '广州某下店'],
      ['是否贷款购车:', '是'],
      ['是否有置换计划:', '是'],
      ['是否有试乘试驾:', '是'],
      ['购车预算:', '10万'],
      ['预计购车时间:', '半个月以内'],
      ['是否同意到店:', '是'],
      ['预约到店时间:', '未知'],
      ['客户姓氏:', '张'],
    ];

    return `
      <div class="clue-call-drawer-backdrop" id="clueCallDrawerBackdrop" onclick="window.Pages['result-clue'].closeCallDetailDrawer(event)">
        <div class="clue-call-drawer" id="clueCallDrawer" onclick="event.stopPropagation()">
          <div class="clue-call-drawer-header">
            <button class="clue-call-drawer-close" onclick="window.Pages['result-clue'].closeCallDetailDrawer()">&#215;</button>
            <span class="clue-call-drawer-title">会话 id： 2059190973162029057</span>
          </div>
          <div class="clue-call-drawer-body">
            <div class="clue-call-drawer-left">
              <div class="clue-call-audio-card">
                <div class="clue-call-audio-pill">
                  <span class="clue-call-play">&#9658;</span>
                  <span>0:00 / 0:23</span>
                  <span class="clue-call-audio-line"></span>
                  <span class="clue-call-volume">&#128264;</span>
                  <span class="clue-call-more">&#8942;</span>
                </div>
                <span class="clue-call-audio-icon">&#127908;</span>
                <span class="clue-call-audio-icon">&#128196;</span>
              </div>
              <div class="clue-call-transcript">
                ${transcript.map(item => `
                  <div class="clue-call-talk-row">
                    <div class="clue-call-speaker">${item[0]}</div>
                    <div class="clue-call-bubble">${item[1]}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="clue-call-drawer-right">
              <div class="clue-call-section-title">外呼小结</div>
              <div class="clue-call-summary">
                姓孙的客户在对话中明确对轩逸的贷款优惠感兴趣，希望明天到静海店购车和试驾，询问了现车情况，同时也在对比比亚迪的车，想要加微信详聊。
              </div>
              <div class="clue-call-fields">
                ${fields.map(item => `
                  <div class="clue-call-field-row">
                    <span>${item[0]}</span>
                    <strong>${item[1]}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function showCallDetailDrawer() {
    const old = document.getElementById('clueCallDrawerBackdrop');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', renderCallDetailDrawer());
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const backdrop = document.getElementById('clueCallDrawerBackdrop');
      const drawer = document.getElementById('clueCallDrawer');
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
    });
  }

  function closeCallDetailDrawer(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('clueCallDrawerBackdrop');
    const drawer = document.getElementById('clueCallDrawer');
    if (!backdrop || !drawer) return;
    drawer.classList.add('closing');
    backdrop.classList.remove('open');
    setTimeout(() => {
      backdrop.remove();
      if (!document.getElementById('clueDetailBackdrop') && !document.getElementById('clueTagsBackdrop')) {
        document.body.style.overflow = '';
      }
    }, 240);
  }

  window.Pages = window.Pages || {};
  window.Pages['result-clue'] = {
    render,
    init() {},
    resetFilters,
    showCustomerTags,
    closeCustomerTags,
    showClueDetail,
    closeClueDetail,
    showCallDetailDrawer,
    closeCallDetailDrawer,
  };
})();
