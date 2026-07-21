/**
 * js/pages/sys-tenant.js — 租户管理页
 */

(function () {
  const StatusMeta = {
    '已支付': { cls: 'tenant-status-paid', text: '已支付' },
    '未支付': { cls: 'tenant-status-pending', text: '未支付' },
    '查询失败': { cls: 'tenant-status-error', text: '查询失败' },
    '不存在': { cls: 'tenant-status-invalid', text: '不存在' },
    '已取消': { cls: 'tenant-status-cancelled', text: '已取消' }
  };

  function getTenantRows() {
    return window.MockTenantRows || [];
  }

  function getBillingRows() {
    window.MockTenantBillingRows = window.MockTenantBillingRows || [];
    return window.MockTenantBillingRows;
  }

  function getOrders() {
    return window.MockRechargeOrders || [];
  }

  function statusTag(status) {
    const meta = StatusMeta[status] || StatusMeta['查询失败'];
    return `<span class="tenant-status ${meta.cls}">${meta.text}</span>`;
  }

  function getHistoryRows() {
    window.MockTenantRechargeHistory = window.MockTenantRechargeHistory || [];
    return window.MockTenantRechargeHistory;
  }

  function getFrozenTasks() {
    return window.MockTenantFrozenTasks || [];
  }

  function getCallControlStates() {
    window.MockTenantCallControlStates = window.MockTenantCallControlStates || [];
    return window.MockTenantCallControlStates;
  }

  function canGenerateValidity(row) {
    return row.rechargeStatus === '已支付' && (row.billingType === '仅坐席费' || row.billingType === '坐席费+通话费');
  }

  function canAddCallBalance(row) {
    return row.rechargeStatus === '已支付' && (row.billingType === '仅通话费' || row.billingType === '坐席费+通话费');
  }

  function canActivateValidity(row) {
    return row && canGenerateValidity(row) &&
           row.rechargeStatus === '已支付' &&
           !row.validityActivated;
  }

  function packageDays(packageName) {
    const map = { '半年套餐': 180, '全年套餐': 365 };
    return map[packageName] || 0;
  }

  function formatBalance(value) {
    return `¥${Number(value || 0).toFixed(2)}`;
  }

  function addDays(dateStr, days) {
    const date = new Date(dateStr.replace(/-/g, '/'));
    date.setDate(date.getDate() + Number(days || 0) - 1);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function currentBizDate() {
    return '2026-06-03';
  }

  function isFrozenExpired(createdAt) {
    if (!createdAt) return true;
    var created = new Date(createdAt.replace(/-/g, '/'));
    var now = new Date();
    var hoursDiff = (now - created) / (1000 * 60 * 60);
    return hoursDiff >= 24;
  }

  function latestValidTo(tenantName) {
    const validDates = getHistoryRows()
      .filter(item => item.status === '已支付' && normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) && item.validTo && item.validTo !== '-')
      .map(item => item.validTo)
      .sort();
    const current = findBillingByTenant(tenantName);
    if (current && current.rechargeStatus === '已支付' && current.validTo && current.validTo !== '-') validDates.push(current.validTo);
    return validDates.sort().pop() || '';
  }

  function getTenantBillingSummary(tenantName) {
    const row = findBillingByTenant(tenantName);
    const paidMap = new Map();
    getHistoryRows()
      .filter(item => item.status === '已支付' && normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName))
      .forEach(item => paidMap.set(item.rechargeNo, item));
    if (row && row.rechargeStatus === '已支付' && row.rechargeNo) {
      paidMap.set(row.rechargeNo, row);
    }

    const paidRows = Array.from(paidMap.values());
    const validityRow = paidRows
      .filter(item => item.validFrom && item.validFrom !== '-' && item.validTo && item.validTo !== '-')
      .sort((a, b) => String(b.validTo).localeCompare(String(a.validTo)))[0];
    // 检测是否有待生效的有效期行
    const pendingRow = paidRows.find(item =>
      item.rechargeStatus === '已支付' &&
      (item.billingType === '仅坐席费' || item.billingType === '坐席费+通话费') &&
      !item.validityActivated
    );
    const balance = paidRows.reduce((sum, item) => sum + Number(item.callBalance || 0), 0);
    // 冻结任务超过24小时后自动释放，不再从可用余额中扣除
    const frozen = getFrozenTasks()
      .filter(item => item.status === '冻结中' && normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) && !isFrozenExpired(item.createdAt))
      .reduce((sum, item) => sum + Number(item.frozenAmount || 0), 0);
    const available = balance - frozen;
    const baseCanCall = !!validityRow && validityRow.validFrom <= currentBizDate() && validityRow.validTo >= currentBizDate() && available > 0;
    const controlState = getCallControlStates().find(item => normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName));
    const manualEnabled = controlState ? controlState.enabled : true;
    const canCall = baseCanCall && manualEnabled;

    return {
      validity: validityRow ? `${validityRow.validFrom} ~ ${validityRow.validTo}`
        : (pendingRow ? '待生效' : '未生成'),
      balance: formatBalance(balance),
      frozen: formatBalance(frozen),
      available: formatBalance(available),
      callStatus: canCall ? '可发起' : '不可发起',
      callStatusCls: canCall ? 'tenant-call-status-ok' : 'tenant-call-status-disabled',
      callManageEnabled: baseCanCall,
      callManageText: manualEnabled ? '停用呼叫' : '启用呼叫',
      hasPendingValidity: !!pendingRow
    };
  }

  function applyOrderToRow(row, order) {
    row.rechargeNo = order.no;
    row.rechargeStatus = order.status;
    row.billingType = order.billingType;
    row.seatFeePackage = order.seatFeePackage || '-';
    row.periodDays = packageDays(order.seatFeePackage) || order.periodDays || 0;
    row.callBalance = canAddCallBalance(row) ? order.callBalance || 0 : 0;
    row.localAddedAt = row.localAddedAt || '2026-06-03 10:00:00';

    if (canGenerateValidity(row)) {
      // 有效期不再自动生成，需用户手动点击"生效"
      row.validFrom = '-';
      row.validTo = '-';
      row.enabled = false;
      row.validityActivated = false;
    } else {
      row.validFrom = '-';
      row.validTo = '-';
      row.enabled = false;
    }
  }

  function activateValidity(tenantName) {
    const name = tenantName || document.getElementById('tenantName')?.value;
    if (!name) {
      showToast('租户名称无效', 'error');
      return;
    }

    const row = findBillingByTenant(name);
    if (!row) {
      showToast('未找到租户计费信息', 'error');
      return;
    }
    if (!canActivateValidity(row)) {
      if (row.rechargeStatus !== '已支付') {
        showToast('充值单未支付，无法生效', 'warning');
      } else if (row.validityActivated) {
        showToast('有效期已生效，无需重复操作', 'warning');
      } else {
        showToast('当前计费类型不适用有效期', 'warning');
      }
      return;
    }

    // 使用原有的有效期计算逻辑
    const baseDate = latestValidTo(name);
    const addedAt = row.localAddedAt.slice(0, 10);
    row.validFrom = baseDate && baseDate >= addedAt
      ? addDays(baseDate, 2)
      : addedAt;
    row.validTo = addDays(row.validFrom, row.periodDays);
    row.enabled = true;
    row.validityActivated = true;

    // 同步历史记录中的有效期
    const historyRow = getHistoryRows().find(function(item) {
      return item.rechargeNo === row.rechargeNo &&
        item.status === '已支付' &&
        normalizeTenantName(item.tenantName) === normalizeTenantName(name);
    });
    if (historyRow) {
      historyRow.validFrom = row.validFrom;
      historyRow.validTo = row.validTo;
    }

    // 刷新列表
    var container = document.getElementById('page-content');
    if (container) container.innerHTML = render();

    // 更新抽屉内字段
    updateDrawerFieldsAfterActivation(name);

    showToast('有效期已生效', 'success');
  }

  function updateDrawerFieldsAfterActivation(tenantName) {
    var summary = getTenantBillingSummary(tenantName);
    var validityInput = document.getElementById('tenantValidity');
    if (validityInput) validityInput.value = summary.validity;
    var balanceInput = document.getElementById('tenantCallBalance');
    if (balanceInput) balanceInput.value = summary.balance;
    var frozenInput = document.getElementById('tenantFrozenAmount');
    if (frozenInput) frozenInput.value = summary.frozen;
    var availableInput = document.getElementById('tenantAvailableBalance');
    if (availableInput) availableInput.value = summary.available;
    var callStatusInput = document.getElementById('tenantCallStatus');
    if (callStatusInput) callStatusInput.value = summary.callStatus;
  }

  function findBillingByTenant(tenantName) {
    return getBillingRows().find(row => row.tenantName === tenantName || normalizeTenantName(row.tenantName) === normalizeTenantName(tenantName));
  }

  function normalizeTenantName(name) {
    return String(name || '').replace(/东风南方|东南方|南方/g, '').trim();
  }

  function buildBillingSeed(tenantName) {
    return {
      id: Date.now(),
      tenantName,
      billingType: '仅坐席费',
      rechargeNo: '',
      rechargeStatus: '未支付',
      seatFeePackage: '-',
      localAddedAt: '2026-06-03 10:00:00',
      periodDays: 0,
      callBalance: 0,
      validFrom: '-',
      validTo: '-',
      enabled: false,
      validityActivated: false
    };
  }

  function renderRows() {
    return getTenantRows().map((row, idx) => {
      const summary = getTenantBillingSummary(row.name);
      return `
        <tr>
          <td>${row.no}</td>
          <td>${row.name}</td>
          <td>${summary.validity}</td>
          <td>${summary.balance}</td>
          <td>${summary.frozen}</td>
          <td>${summary.available}</td>
          <td><span class="tenant-call-status ${summary.callStatusCls}">${summary.callStatus}</span></td>
          <td>${row.type}</td>
          <td>${row.tenantId}</td>
          <td>${row.desc}</td>
          <td>${row.status}</td>
          <td>${row.updater}</td>
          <td>${row.updateTime}</td>
          <td>
            <button class="tenant-op-btn primary" onclick="window.Pages['sys-tenant'].showBillingDrawer('${row.name}')">充值单配置</button>
            ${summary.hasPendingValidity ? '<button class="tenant-op-btn primary" onclick="window.Pages[\'sys-tenant\'].activateValidity(\'' + row.name + '\')">生效</button>' : ''}
            <button class="tenant-op-btn control ${summary.callManageEnabled ? '' : 'disabled'}" ${summary.callManageEnabled ? '' : 'disabled'} onclick="window.Pages['sys-tenant'].toggleCallControl('${row.name}')">${summary.callManageEnabled ? summary.callManageText : '管理呼叫'}</button>
            <button class="tenant-op-btn blue" onclick="showToast('编辑功能开发中','info')">编辑</button>
            <button class="tenant-op-btn red" onclick="showToast('删除功能开发中','info')">删除</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderHistoryRows(tenantName) {
    const rows = getHistoryRows().filter(item => item.status === '已支付');
    if (!rows.length) {
      return `
        <tr>
          <td colspan="9">
            <div class="tenant-history-empty">暂无历史关联充值单记录</div>
          </td>
        </tr>
      `;
    }

    return rows.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.rechargeNo}</td>
        <td>${statusTag(item.status)}</td>
        <td>${item.billingType}</td>
        <td>${item.seatFeePackage || '-'}</td>
        <td>${item.periodDays || 0} 天</td>
        <td>${formatBalance(item.callBalance)}</td>
        <td>${item.operator}</td>
        <td>${item.bindTime}</td>
      </tr>
    `).join('');
  }

  function render() {
    return `
      <div class="scene-list-page tenant-page">
        <div class="tenant-list-content">
          <div class="tenant-list-header">
            <div class="tenant-list-title"><span>租户管理</span></div>
            <div class="tenant-list-desc">管理每个租户的信息。</div>
          </div>

          <div class="tenant-filter-card">
            <div class="filter-item">
              <label>租户名称：</label>
              <input type="text" class="filter-input" placeholder="请输入" style="width:210px;">
            </div>
            <div class="btn-group tenant-filter-actions">
              <button class="btn btn-default" onclick="resetFilter(this.closest('.tenant-page'))">重置</button>
              <button class="btn btn-primary" onclick="doQuery()">查询</button>
            </div>
          </div>

          <div class="tenant-list-card">
            <div class="tenant-list-tools">
              <button class="btn btn-primary" onclick="showToast('新建租户功能开发中','info')" style="height:34px;padding:0 16px;">+ 新建</button>
              <span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>
              <span class="biz-icon-btn" onclick="showToast('设置功能开发中','info')" title="设置">&#x2699;</span>
            </div>
            <div class="table-container">
              <table class="data-table tenant-native-table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>租户名称</th>
                    <th>有效期</th>
                    <th>话费余额</th>
                    <th>
                      <span class="tenant-th-help">
                        冻结金额
                        <button type="button" class="tenant-help-trigger" onclick="window.Pages['sys-tenant'].toggleFrozenTooltip(event)" aria-label="冻结金额说明">&#9432;</button>
                        <span class="tenant-help-popover">冻结金额是指发起外呼时会根据外呼量预先冻结预计的金额，最终根据实际外呼结果扣减对应费用后，优先从冻结金额扣除实际产生的通话费用。冻结任务创建24小时后自动释放回可用余额。</span>
                      </span>
                    </th>
                    <th>可用余额</th>
                    <th>呼叫控制状态</th>
                    <th>租户类型</th>
                    <th>租户 id</th>
                    <th>描述</th>
                    <th>状态</th>
                    <th>更新人</th>
                    <th>更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>${renderRows()}</tbody>
              </table>
            </div>
            <div class="tenant-pagination">第 1-5 条/总共 5 条&nbsp;&nbsp; &lt; <span>1</span> &gt;</div>
          </div>
        </div>
      </div>
    `;
  }

  function init() {}

  function toggleFrozenTooltip(event) {
    event.stopPropagation();
    const wrap = event.currentTarget.closest('.tenant-th-help');
    if (!wrap) return;
    const isOpen = wrap.classList.contains('open');
    document.querySelectorAll('.tenant-th-help.open').forEach(item => item.classList.remove('open'));
    if (!isOpen) wrap.classList.add('open');
  }

  function toggleCallControl(tenantName) {
    const summary = getTenantBillingSummary(tenantName);
    if (!summary.callManageEnabled) {
      showToast('当前租户已过期或可用余额为0，不能手动开启呼叫', 'warning');
      return;
    }

    const rows = getCallControlStates();
    let state = rows.find(item => normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName));
    if (!state) {
      state = { tenantName, enabled: true };
      rows.push(state);
    }
    state.enabled = !state.enabled;
    const container = document.getElementById('page-content');
    if (container) container.innerHTML = render();
    showToast(state.enabled ? '已启用呼叫控制状态' : '已停用呼叫控制状态', 'success');
  }

  function showBillingDrawer(tenantName) {
    const existed = findBillingByTenant(tenantName);
    const row = existed || buildBillingSeed(tenantName);
    const tenantLocked = tenantName || row.tenantName;
    const summary = getTenantBillingSummary(tenantLocked);
    const html = `
      <div class="biz-drawer-backdrop" id="tenantBillingBackdrop" onclick="window.Pages['sys-tenant'].closeBillingDrawer(event)">
        <div class="biz-drawer tenant-drawer" id="tenantBillingDrawer" onclick="event.stopPropagation()" data-row-id="${row.id}" data-new="${existed ? '0' : '1'}">
          <div class="biz-drawer-header">
            <span class="biz-drawer-title">充值单配置</span>
            <span class="biz-drawer-close" onclick="window.Pages['sys-tenant'].closeBillingDrawer()">&#x2715;</span>
          </div>
          <div class="biz-drawer-body">
            <div class="tenant-drawer-section">
              <div class="tenant-section-title">租户信息</div>
              <div class="biz-form-row">
                <label class="biz-form-label required">租户</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantName" value="${tenantLocked}" readonly></div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">有效期</label>
                <div class="biz-form-field" style="display:flex;align-items:center;gap:8px;">
                  <input class="biz-form-input readonly" id="tenantValidity" value="${summary.validity}" readonly style="flex:1;">
                  ${summary.hasPendingValidity ? '<button class="btn btn-primary" onclick="window.Pages[\'sys-tenant\'].activateValidity()" style="height:36px;padding:0 14px;white-space:nowrap;">生效</button>' : ''}
                </div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">通话余额</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantCallBalance" value="${summary.balance}" readonly></div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">冻结金额</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantFrozenAmount" value="${summary.frozen}" readonly></div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">可用余额</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantAvailableBalance" value="${summary.available}" readonly></div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">呼叫控制状态</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantCallStatus" value="${summary.callStatus}" readonly></div>
              </div>
            </div>

            <div class="tenant-drawer-section">
              <div class="tenant-section-title">关联充值单</div>
              <div class="biz-form-row">
                <label class="biz-form-label required">充值单号</label>
                <div class="biz-form-field">
                  <div class="tenant-recharge-check">
                    <input class="biz-form-input" id="tenantRechargeNo" value="${row.rechargeNo || ''}" placeholder="请输入充值单号" oninput="window.Pages['sys-tenant'].previewRechargeOrder()">
                    <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].submitRechargeOrder()" style="height:36px;padding:0 14px;">提交</button>
                  </div>
                </div>
              </div>
              <div class="tenant-order-preview" id="tenantOrderPreview"></div>
              <div class="biz-modal-notice tenant-notice">
                <span class="biz-notice-icon">&#x26A0;</span>
                <div class="biz-notice-body">仅坐席费生成有效期（需手动点击"生效"）；仅通话费增加套餐话费；坐席费+通话费同时生成有效期（需手动点击"生效"）并增加套餐话费。</div>
              </div>
            </div>

            <div class="tenant-drawer-section">
              <div class="tenant-section-title">历史关联充值单</div>
              <div class="tenant-history-table-wrap">
                <table class="tenant-history-table">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>充值单号</th>
                      <th>状态</th>
                      <th>计费类型</th>
                      <th>坐席费套餐</th>
                      <th>周期</th>
                      <th>套餐话费</th>
                      <th>操作人</th>
                      <th>关联时间</th>
                    </tr>
                  </thead>
                  <tbody id="tenantHistoryBody">${renderHistoryRows(tenantLocked)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="biz-drawer-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-tenant'].closeBillingDrawer()" style="height:32px;padding:0 20px;">关闭</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    requestAnimationFrame(() => {
      document.getElementById('tenantBillingBackdrop')?.classList.add('open');
      document.getElementById('tenantBillingDrawer')?.classList.add('open');
      renderCheckedOrder(row.rechargeNo ? getOrders().find(item => item.no === row.rechargeNo) : null);
    });
  }

  function closeBillingDrawer(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('tenantBillingBackdrop');
    const drawer = document.getElementById('tenantBillingDrawer');
    if (!backdrop || !drawer) return;
    drawer.classList.add('closing');
    backdrop.classList.remove('open');
    setTimeout(() => backdrop.remove(), 280);
  }

  function renderCheckedOrder(order) {
    const drawer = document.getElementById('tenantBillingDrawer');
    if (drawer) {
      drawer._checkedOrder = order || null;
    }
    const no = document.getElementById('tenantRechargeNo')?.value;
    const box = document.getElementById('tenantOrderPreview');
    if (!box) return;
    if (!order) {
      box.innerHTML = no
        ? '<div class="tenant-empty-preview">请点击“提交”关联充值单</div>'
        : '<div class="tenant-empty-preview">请输入充值单号并点击“提交”</div>';
      return;
    }
    const preview = buildSubmitPreview(order);
    // 检查是否已提交且待生效
    var billingTenantName = document.getElementById('tenantName')?.value || '';
    var billingRow = findBillingByTenant(billingTenantName);
    var isSubmitted = billingRow && billingRow.rechargeNo === order.no;
    var validityDisplay = (!isSubmitted || !canGenerateValidity(billingRow) || billingRow.validityActivated)
      ? preview.validity
      : preview.validity + '（待生效）';
    box.innerHTML = `
      <div class="tenant-preview-grid">
        <div><span>充值单状态</span>${statusTag(order.status)}</div>
        <div><span>计费类型</span><strong>${order.billingType}</strong></div>
        <div><span>坐席费套餐</span><strong>${order.seatFeePackage || '-'}</strong></div>
        <div><span>租户有效期</span><strong>${validityDisplay}</strong></div>
        <div><span>套餐话费</span><strong>${formatBalance(order.status === '已支付' ? order.callBalance : 0)}</strong></div>
      </div>
    `;
  }

  function previewRechargeOrder() {
    renderCheckedOrder(null);
  }

  function buildSubmitPreview(order) {
    const tenantName = document.getElementById('tenantName')?.value || '';
    if (order.status !== '已支付' || !(order.billingType === '仅坐席费' || order.billingType === '坐席费+通话费')) {
      return { validity: '-' };
    }
    const now = currentBizDate();
    const baseDate = latestValidTo(tenantName);
    const validFrom = baseDate && baseDate >= now ? addDays(baseDate, 2) : now;
    const days = packageDays(order.seatFeePackage) || order.periodDays || 0;
    return { validity: `${validFrom} ~ ${addDays(validFrom, days)}` };
  }

  function submitRechargeOrder() {
    const no = document.getElementById('tenantRechargeNo')?.value.trim();
    if (!no) {
      showToast('请输入充值单号', 'warning');
      renderCheckedOrder(null);
      return;
    }

    const order = getOrders().find(item => item.no === no) || {
      no,
      tenantName: document.getElementById('tenantName')?.value || '',
      status: '不存在',
      periodDays: 0,
      billingType: '仅坐席费',
      seatFeePackage: '-',
      callBalance: 0
    };
    renderCheckedOrder(order);

    const drawer = document.getElementById('tenantBillingDrawer');
    if (!drawer) return;
    const rowId = Number(drawer.dataset.rowId);
    const isNew = drawer.dataset.new === '1';
    const row = isNew ? { id: rowId } : getBillingRows().find(item => item.id === rowId);
    row.tenantName = document.getElementById('tenantName')?.value || row.tenantName;
    row.localAddedAt = row.localAddedAt || '2026-06-03 10:00:00';

    if (order.status === '已支付' && getHistoryRows().some(item => item.rechargeNo === order.no)) {
      showToast('该充值单号已关联，请勿重复提交', 'warning');
      return;
    }

    applyOrderToRow(row, order);
    if (isNew) getBillingRows().push(row);

    if (row.rechargeStatus === '已支付') {
      getHistoryRows().unshift({
        id: Date.now(),
        tenantName: row.tenantName,
        rechargeNo: row.rechargeNo,
        status: row.rechargeStatus,
        billingType: row.billingType,
        seatFeePackage: row.seatFeePackage,
        periodDays: row.periodDays,
        callBalance: row.callBalance,
        validFrom: row.validFrom,
        validTo: row.validTo,
        operator: 'xtadmin',
        bindTime: row.localAddedAt
      });
    }

    const historyBody = document.getElementById('tenantHistoryBody');
    if (historyBody) historyBody.innerHTML = renderHistoryRows(row.tenantName);
    updateDrawerFieldsAfterActivation(row.tenantName);
    const successMsg = canGenerateValidity(row)
      ? '充值单已提交，请手动点击"生效"生成有效期'
      : (canAddCallBalance(row) ? '充值单已提交，通话余额已更新' : `充值单未关联，当前状态：${row.rechargeStatus}`);
    showToast(successMsg, canGenerateValidity(row) || canAddCallBalance(row) ? 'success' : 'warning');
  }

  window.Pages = window.Pages || {};
  window.Pages['sys-tenant'] = {
    render,
    init,
    showBillingDrawer,
    closeBillingDrawer,
    previewRechargeOrder,
    submitRechargeOrder,
    activateValidity,
    toggleFrozenTooltip,
    toggleCallControl
  };

  document.addEventListener('click', function () {
    document.querySelectorAll('.tenant-th-help.open').forEach(item => item.classList.remove('open'));
  });
})();
