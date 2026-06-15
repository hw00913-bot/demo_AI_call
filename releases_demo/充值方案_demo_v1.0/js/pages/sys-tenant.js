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

  function historyPaymentTag(item) {
    return item.orderType === '试用单'
      ? '<span class="tenant-status tenant-status-paid">无需支付</span>'
      : statusTag(item.status);
  }

  function getHistoryRows() {
    window.MockTenantRechargeHistory = window.MockTenantRechargeHistory || [];
    return window.MockTenantRechargeHistory;
  }

  function getFrozenTasks() {
    return window.MockTenantFrozenTasks || [];
  }

  function getBalanceAdjustments() {
    window.MockTenantBalanceAdjustments = window.MockTenantBalanceAdjustments || [];
    return window.MockTenantBalanceAdjustments;
  }

  function getPriceRules() {
    return window.MockTenantPriceRules || [];
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

  function isRechargeActivated(row) {
    return !!(row && (row.activated === true || row.validityActivated === true));
  }

  function canActivateRecharge(row) {
    return row && row.status === '已支付' && !isRechargeActivated(row);
  }

  function packageDays(packageName) {
    const map = { '半年套餐': 183, '全年套餐': 365 };
    return map[packageName] || 0;
  }

  function formatBalance(value) {
    return `¥${Number(value || 0).toFixed(2)}`;
  }

  function formatMinutes(value) {
    return `${Number(value || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} 分钟`;
  }

  function formatUnitPrice(value) {
    return `¥${Number(value || 0).toFixed(2)}/分钟`;
  }

  function adjustmentTypeText(type) {
    return type === 'MANUAL_DEDUCT' ? '手工扣减' : type;
  }

  function addDays(dateStr, days) {
    const date = new Date(dateStr.replace(/-/g, '/'));
    date.setDate(date.getDate() + Number(days || 0) - 1);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatLocalDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatLocalDateTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${formatLocalDate(date)} ${hours}:${minutes}:${seconds}`;
  }

  function currentBizDate() {
    return formatLocalDate(new Date());
  }

  function isFrozenExpired(createdAt) {
    if (!createdAt) return true;
    var created = new Date(createdAt.replace(/-/g, '/'));
    if (Number.isNaN(created.getTime())) return true;
    var hoursDiff = (new Date() - created) / (1000 * 60 * 60);
    return hoursDiff >= 24;
  }

  function getFrozenReleaseReason(task) {
    if (!task || task.status !== '冻结中') return '';
    if (task.taskStatus === '已完成') return '任务已完成';
    if (task.taskStatus === '已终止') return '任务已终止';
    if (isFrozenExpired(task.createdAt)) return '冻结超过24小时';
    return '';
  }

  function releaseFrozenTask(task, reason, releasedAt) {
    if (!task || task.status !== '冻结中' || !reason) return false;
    task.status = '已释放';
    task.releasedAt = releasedAt || formatLocalDateTime(new Date());
    task.releaseReason = reason;
    return true;
  }

  function syncFrozenTaskReleases() {
    const releasedAt = formatLocalDateTime(new Date());
    return getFrozenTasks().reduce((released, task) => {
      const reason = getFrozenReleaseReason(task);
      return releaseFrozenTask(task, reason, releasedAt) ? released + 1 : released;
    }, 0);
  }

  function releaseFrozenTasksByScene(sceneName, taskStatus) {
    const releasedAt = formatLocalDateTime(new Date());
    let releasedCount = 0;
    let releasedAmount = 0;

    getFrozenTasks().forEach(task => {
      if (task.sceneName !== sceneName || task.status !== '冻结中') return;
      task.taskStatus = taskStatus;
      const reason = getFrozenReleaseReason(task);
      if (!releaseFrozenTask(task, reason, releasedAt)) return;
      releasedCount += 1;
      releasedAmount += Number(task.frozenMinutes || 0) * Number(task.unitPriceSnapshot || 0);
    });

    return { releasedCount, releasedAmount };
  }

  function latestValidTo(tenantName) {
    const validDates = getHistoryRows()
      .filter(item =>
        item.status === '已支付' &&
        isRechargeActivated(item) &&
        normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) &&
        item.validTo &&
        item.validTo !== '-'
      )
      .map(item => item.validTo)
      .sort();
    return validDates.sort().pop() || '';
  }

  function getTenantPriceConfigs(tenantName, modelType) {
    return getPriceRules()
      .filter(item =>
        normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) &&
        (!modelType || item.modelType === modelType) &&
        item.pricingScope === 'MODEL_DEFAULT' &&
        !item.providerCode &&
        item.status === '启用'
      )
      .sort((a, b) => {
        return a.modelType === b.modelType ? 0 : (a.modelType === '大模型' ? -1 : 1);
      });
  }

  function resolveTenantUnitPrice(tenantName, modelType, providerCode) {
    const rules = getPriceRules().filter(item =>
      normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) &&
      item.modelType === modelType &&
      item.status === '启用'
    );
    const providerRule = providerCode
      ? rules.find(item => item.pricingScope === 'PROVIDER_OVERRIDE' && item.providerCode === providerCode)
      : null;
    return providerRule || rules.find(item => item.pricingScope === 'MODEL_DEFAULT' && !item.providerCode) || null;
  }

  function getTenantAllPriceConfigs(tenantName) {
    return getPriceRules()
      .filter(item =>
        normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) &&
        item.pricingScope === 'MODEL_DEFAULT' &&
        !item.providerCode
      )
      .sort((a, b) => {
        return a.modelType === b.modelType ? 0 : (a.modelType === '大模型' ? -1 : 1);
      });
  }

  function amountToMinutes(amount, unitPrice) {
    const price = Number(unitPrice || 0);
    return price > 0 ? Number(amount || 0) / price : 0;
  }

  function formatMinuteRange(configs, amount) {
    const values = configs
      .map(item => amountToMinutes(amount, item.unitPrice))
      .filter(value => Number.isFinite(value));
    if (!values.length) return '未配置';
    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);
    if (Math.abs(max - min) < 0.005) return formatMinutes(min);
    return `${formatMinutes(min).replace(' 分钟', '')} ~ ${formatMinutes(max)}`;
  }

  function getTenantBaseRow(tenantName) {
    return getTenantRows().find(item =>
      normalizeTenantName(item.name) === normalizeTenantName(tenantName)
    );
  }

  function getTenantBillingSummary(tenantName) {
    syncFrozenTaskReleases();
    const tenant = getTenantBaseRow(tenantName);

    const priceConfigs = getTenantAllPriceConfigs(tenantName);
    const largeConfigs = priceConfigs.filter(item => item.modelType === '大模型' && item.status === '启用');
    const smallConfigs = priceConfigs.filter(item => item.modelType === '小模型' && item.status === '启用');
    const paidRows = getHistoryRows().filter(item =>
      item.status === '已支付' &&
      normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName)
    );
    const activatedRows = paidRows.filter(isRechargeActivated);
    const validityRow = activatedRows
      .filter(item => item.validFrom && item.validFrom !== '-' && item.validTo && item.validTo !== '-')
      .sort((a, b) => String(b.validTo).localeCompare(String(a.validTo)))[0];
    const pendingRow = paidRows.find(item => !isRechargeActivated(item));
    const pendingValidityRow = paidRows.find(item =>
      !isRechargeActivated(item) &&
      canGenerateValidity({
        rechargeStatus: item.status,
        billingType: item.billingType
      })
    );
    const totalRechargeAmount = activatedRows.reduce((sum, item) => {
      return sum + (canAddCallBalance({
        rechargeStatus: item.status,
        billingType: item.billingType
      }) ? Number(item.rechargeAmount || 0) : 0);
    }, 0);
    const adjustments = getBalanceAdjustments().filter(item =>
      item.status === '已生效' &&
      normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName)
    );
    const adjustmentOutAmount = adjustments
      .filter(item => item.direction === 'OUT')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const consumedAmount = Number(tenant && tenant.consumedAmount || 0);
    const balanceAmount = totalRechargeAmount - adjustmentOutAmount - consumedAmount;
    const frozenTasks = getFrozenTasks().filter(item =>
      item.status === '冻结中' &&
      normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName)
    );
    const totalFrozenAmount = frozenTasks.reduce((sum, item) => {
      return sum + Number(item.frozenMinutes || 0) * Number(item.unitPriceSnapshot || 0);
    }, 0);
    const availableAmount = Math.max(balanceAmount - totalFrozenAmount, 0);
    const displayBalanceAmount = Math.max(balanceAmount, 0);
    const hasFrozenShortfall = totalFrozenAmount > 0 && balanceAmount < totalFrozenAmount;
    const pricingRows = priceConfigs.map(config => {
      const modelTasks = frozenTasks.filter(item => item.modelType === config.modelType);
      const frozenMinutes = modelTasks.reduce((sum, item) => sum + Number(item.frozenMinutes || 0), 0);
      const frozenAmount = modelTasks.reduce((sum, item) => {
        return sum + Number(item.frozenMinutes || 0) * Number(item.unitPriceSnapshot || 0);
      }, 0);
      return {
        modelType: config.modelType,
        pricingScope: config.pricingScope,
        unitPrice: Number(config.unitPrice || 0),
        status: config.status,
        frozenMinutes,
        frozenAmount,
        balanceMinutes: amountToMinutes(displayBalanceAmount, config.unitPrice),
        availableMinutes: amountToMinutes(availableAmount, config.unitPrice)
      };
    });
    const hasAvailableMinutes = availableAmount > 0 && (largeConfigs.length > 0 || smallConfigs.length > 0);
    const baseCanCall = !!validityRow && validityRow.validFrom <= currentBizDate() &&
      validityRow.validTo >= currentBizDate() && hasAvailableMinutes;
    const controlState = getCallControlStates().find(item => normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName));
    const manualEnabled = controlState ? controlState.enabled : true;
    const canCall = baseCanCall && manualEnabled;

    return {
      validity: validityRow ? `${validityRow.validFrom} ~ ${validityRow.validTo}`
        : (pendingValidityRow ? '待生效' : '未生成'),
      totalRechargeAmount,
      adjustmentOutAmount,
      pricingRows,
      largeBalanceRange: formatMinuteRange(largeConfigs, displayBalanceAmount),
      largeAvailableRange: formatMinuteRange(largeConfigs, availableAmount),
      smallBalanceRange: formatMinuteRange(smallConfigs, displayBalanceAmount),
      smallAvailableRange: formatMinuteRange(smallConfigs, availableAmount),
      balanceAmount,
      totalFrozenAmount,
      availableAmount,
      hasFrozenShortfall,
      canCall,
      callStatus: canCall ? '可发起' : '不可发起',
      callStatusCls: canCall ? 'tenant-call-status-ok' : 'tenant-call-status-disabled',
      callManageEnabled: baseCanCall,
      callManageText: manualEnabled ? '停用呼叫' : '启用呼叫',
      hasPendingRecharge: !!pendingRow
    };
  }

  function applyOrderToRow(row, order) {
    row.rechargeNo = order.no;
    row.storeCode = order.storeCode || '-';
    row.storeName = order.storeName || '-';
    row.rechargeStatus = order.status;
    row.billingType = order.billingType;
    row.seatFeePackage = order.seatFeePackage || '-';
    row.periodDays = packageDays(order.seatFeePackage) || order.periodDays || 0;
    row.rechargeAmount = canAddCallBalance(row) ? order.rechargeAmount || 0 : 0;
    row.localAddedAt = row.localAddedAt || formatLocalDateTime(new Date());
    row.validFrom = '-';
    row.validTo = '-';
    row.enabled = false;
    row.activated = false;
    row.validityActivated = false;
  }

  function activateRecharge(rechargeNo) {
    const historyRow = getHistoryRows().find(item => item.rechargeNo === rechargeNo);
    if (!historyRow) {
      showToast('未找到关联充值单', 'error');
      return;
    }
    if (!canActivateRecharge(historyRow)) {
      showToast(isRechargeActivated(historyRow) ? '该充值单已生效' : '充值单未支付，无法生效', 'warning');
      return;
    }

    if (canGenerateValidity({
      rechargeStatus: historyRow.status,
      billingType: historyRow.billingType
    })) {
      showActivationDurationModal(historyRow);
      return;
    }
    finalizeRechargeActivation(historyRow);
  }

  function getActivationValidity(historyRow, durationDays) {
    const tenantName = historyRow.tenantName;
    const baseDate = latestValidTo(tenantName);
    const addedAt = String(historyRow.bindTime || currentBizDate()).slice(0, 10);
    const validFrom = baseDate && baseDate >= addedAt ? addDays(baseDate, 2) : addedAt;
    return {
      baseDate: baseDate || '-',
      validFrom,
      validTo: addDays(validFrom, durationDays)
    };
  }

  function finalizeRechargeActivation(historyRow, durationDays) {
    const tenantName = historyRow.tenantName;
    const changesValidity = canGenerateValidity({
      rechargeStatus: historyRow.status,
      billingType: historyRow.billingType
    });
    if (changesValidity) {
      const validity = getActivationValidity(historyRow, durationDays);
      historyRow.periodDays = durationDays;
      historyRow.validFrom = validity.validFrom;
      historyRow.validTo = validity.validTo;
    } else {
      historyRow.validFrom = '-';
      historyRow.validTo = '-';
    }
    historyRow.activated = true;
    historyRow.validityActivated = true;
    historyRow.activatedAt = formatLocalDateTime(new Date());

    const billingRow = findBillingByTenant(tenantName);
    if (billingRow && billingRow.rechargeNo === historyRow.rechargeNo) {
      billingRow.validFrom = historyRow.validFrom;
      billingRow.validTo = historyRow.validTo;
      billingRow.enabled = true;
      billingRow.activated = true;
      billingRow.validityActivated = true;
    }

    var container = document.getElementById('page-content');
    if (container) container.innerHTML = render();
    updateDrawerFieldsAfterActivation(tenantName);
    const historyBody = document.getElementById('tenantHistoryBody');
    if (historyBody) historyBody.innerHTML = renderHistoryRows(tenantName);
    const currentOrderNo = document.getElementById('tenantRechargeNo')?.value;
    if (currentOrderNo) renderCheckedOrder(getOrders().find(item => item.no === currentOrderNo) || null);
    const changesBalance = canAddCallBalance({
      rechargeStatus: historyRow.status,
      billingType: historyRow.billingType
    });
    const resultText = changesValidity && changesBalance
      ? '有效期和余额已更新'
      : (changesValidity ? '有效期已更新' : '余额已更新');
    showToast(`充值单已生效，${resultText}`, 'success');
  }

  function showActivationDurationModal(historyRow) {
    closeActivationDurationModal();
    const defaultDays = packageDays(historyRow.seatFeePackage) || Number(historyRow.periodDays || 0);
    const validity = getActivationValidity(historyRow, defaultDays);
    const html = `
      <div class="tenant-pricing-modal-backdrop" id="tenantActivationDurationBackdrop" onclick="window.Pages['sys-tenant'].closeActivationDurationModal(event)">
        <div class="tenant-pricing-modal tenant-activation-duration-modal" id="tenantActivationDurationModal" data-recharge-no="${historyRow.rechargeNo}" onclick="event.stopPropagation()">
          <div class="tenant-pricing-modal-header">
            <div>
              <div class="tenant-pricing-modal-title">确认添加有效时长</div>
              <div class="tenant-pricing-modal-subtitle">${historyRow.rechargeNo} · ${historyRow.seatFeePackage || '-'}</div>
            </div>
            <button class="tenant-pricing-modal-close" onclick="window.Pages['sys-tenant'].closeActivationDurationModal()">&#x2715;</button>
          </div>
          <div class="tenant-pricing-modal-body">
            <div class="tenant-activation-duration-summary">
              <div><span>当前有效期至</span><strong>${validity.baseDate}</strong></div>
              <div><span>新增有效期起始</span><strong id="tenantActivationValidFrom">${validity.validFrom}</strong></div>
              <div><span>预计有效期至</span><strong id="tenantActivationValidTo">${validity.validTo}</strong></div>
            </div>
            <div class="tenant-adjustment-field tenant-activation-duration-field">
              <label>添加有效时长</label>
              <div class="tenant-duration-input-wrap">
                <input id="tenantActivationDurationDays" type="number" min="1" step="1" value="${defaultDays}" oninput="window.Pages['sys-tenant'].updateActivationDurationPreview()">
                <span>日</span>
              </div>
            </div>
            <div class="biz-modal-notice tenant-pricing-config-notice">
              <span class="biz-notice-icon">&#x26A0;</span>
              <div class="biz-notice-body">系统已按套餐反显默认时长，可在生效前调整。确认后将按调整后的天数顺延租户有效期。</div>
            </div>
          </div>
          <div class="tenant-pricing-modal-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-tenant'].closeActivationDurationModal()">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].confirmActivationDuration()">确认生效</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeActivationDurationModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('tenantActivationDurationBackdrop')?.remove();
  }

  function updateActivationDurationPreview() {
    const modal = document.getElementById('tenantActivationDurationModal');
    if (!modal) return;
    const historyRow = getHistoryRows().find(item => item.rechargeNo === modal.dataset.rechargeNo);
    const durationDays = Number(document.getElementById('tenantActivationDurationDays')?.value);
    const validTo = document.getElementById('tenantActivationValidTo');
    if (!historyRow || !validTo) return;
    validTo.textContent = Number.isInteger(durationDays) && durationDays > 0
      ? getActivationValidity(historyRow, durationDays).validTo
      : '-';
  }

  function confirmActivationDuration() {
    const modal = document.getElementById('tenantActivationDurationModal');
    if (!modal) return;
    const historyRow = getHistoryRows().find(item => item.rechargeNo === modal.dataset.rechargeNo);
    const input = document.getElementById('tenantActivationDurationDays');
    const durationDays = Number(input && input.value);
    if (!historyRow || !canActivateRecharge(historyRow)) {
      closeActivationDurationModal();
      showToast('充值单状态已变化，请刷新后重试', 'warning');
      return;
    }
    if (!Number.isInteger(durationDays) || durationDays <= 0) {
      input?.focus();
      showToast('添加有效时长必须为大于 0 的整数', 'warning');
      return;
    }
    closeActivationDurationModal();
    finalizeRechargeActivation(historyRow, durationDays);
  }

  function updateDrawerFieldsAfterActivation(tenantName) {
    var summary = getTenantBillingSummary(tenantName);
    var validityInput = document.getElementById('tenantValidity');
    if (validityInput) validityInput.value = summary.validity;
    var totalRechargeInput = document.getElementById('tenantTotalRecharge');
    if (totalRechargeInput) totalRechargeInput.value = formatBalance(summary.totalRechargeAmount);
    var availableBalanceInput = document.getElementById('tenantAvailableBalance');
    if (availableBalanceInput) availableBalanceInput.value = summary.availableAmount;
    var pricingBody = document.getElementById('tenantPricingBody');
    if (pricingBody) pricingBody.innerHTML = renderPricingRows(tenantName);
    var callStatusInput = document.getElementById('tenantCallStatus');
    if (callStatusInput) callStatusInput.value = summary.callStatus;
    var riskNotice = document.getElementById('tenantBalanceRiskNotice');
    if (riskNotice) riskNotice.innerHTML = renderBalanceRisk(summary);
    var adjustmentBody = document.getElementById('tenantAdjustmentBody');
    if (adjustmentBody) adjustmentBody.innerHTML = renderAdjustmentRows(tenantName);
    var historyBody = document.getElementById('tenantHistoryBody');
    if (historyBody) historyBody.innerHTML = renderHistoryRows(tenantName);
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
      localAddedAt: formatLocalDateTime(new Date()),
      periodDays: 0,
      rechargeAmount: 0,
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
          <td>
            <button class="tenant-billing-config-btn"${row.name === '东风日产-燃油车' ? ' data-anno="tenant-pricing-config"' : ''} onclick="window.Pages['sys-tenant'].showPricingConfigModal('${row.name}')">计费配置</button>
          </td>
          <td class="tenant-minute-range">${summary.largeAvailableRange}</td>
          <td class="tenant-minute-range">${summary.smallAvailableRange}</td>
          <td><span class="tenant-call-status ${summary.callStatusCls}">${summary.callStatus}</span></td>
          <td>${row.type}</td>
          <td>${row.tenantId}</td>
          <td>${row.desc}</td>
          <td>${row.status}</td>
          <td>${row.updater}</td>
          <td>${row.updateTime}</td>
          <td>
            <button class="tenant-op-btn primary"${row.name === '东风日产-燃油车' ? ' data-anno="tenant-recharge-config"' : ''} onclick="window.Pages['sys-tenant'].showBillingDrawer('${row.name}')">充值管理</button>
            <button class="tenant-op-btn control ${summary.callManageEnabled ? '' : 'disabled'}"${idx === 0 ? ' data-anno="tenant-call-control"' : ''} ${summary.callManageEnabled ? '' : 'disabled'} onclick="window.Pages['sys-tenant'].toggleCallControl('${row.name}')">${summary.callManageEnabled ? summary.callManageText : '管理呼叫'}</button>
            <button class="tenant-op-btn blue" onclick="showToast('编辑功能开发中','info')">编辑</button>
            <button class="tenant-op-btn red" onclick="showToast('删除功能开发中','info')">删除</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderPricingRows(tenantName) {
    const rows = getTenantBillingSummary(tenantName).pricingRows;
    if (!rows.length) {
      return '<tr><td colspan="7"><div class="tenant-history-empty">暂无计费配置</div></td></tr>';
    }
    return rows.map(item => `
      <tr>
        <td><span class="tenant-model-tag ${item.modelType === '大模型' ? 'large' : 'small'}">${item.modelType}</span></td>
        <td>${formatUnitPrice(item.unitPrice)}</td>
        <td>${formatMinutes(item.frozenMinutes)}</td>
        <td>${formatBalance(item.frozenAmount)}</td>
        <td>${formatMinutes(item.balanceMinutes)}</td>
        <td><strong>${formatMinutes(item.availableMinutes)}</strong></td>
        <td><span class="tenant-price-status ${item.status === '停用' ? 'disabled' : ''}">${item.status}</span></td>
      </tr>
    `).join('');
  }

  function renderBalanceRisk(summary) {
    if (!summary.hasFrozenShortfall) return '';
    return `
      <div class="tenant-balance-risk">
        <strong>当前无新增冻结额度</strong>
        <span>当前资金余额 ${formatBalance(summary.balanceAmount)}，有效冻结金额 ${formatBalance(summary.totalFrozenAmount)}，可用金额按 0 计算。任务完成、终止或冻结超过 24 小时后将自动释放占用；后续导入按本次预计冻结金额单独校验。</span>
      </div>
    `;
  }

  function getImportCapacity(data) {
    const tenantName = data && data.tenantName || '';
    const modelType = data && data.modelType || '';
    const providerCode = data && data.providerCode || '';
    const estimatedMinutesPerPhone = Number(data && data.estimatedMinutesPerPhone || 0);
    const summary = getTenantBillingSummary(tenantName);
    const priceRule = resolveTenantUnitPrice(tenantName, modelType, providerCode);
    const unitPrice = Number(priceRule && priceRule.unitPrice || 0);
    const freezeAmountPerPhone = estimatedMinutesPerPhone * unitPrice;
    const maxImportCount = freezeAmountPerPhone > 0
      ? Math.floor(summary.availableAmount / freezeAmountPerPhone)
      : 0;

    return {
      tenantName,
      modelType,
      providerCode,
      estimatedMinutesPerPhone,
      unitPrice,
      pricingScope: priceRule ? priceRule.pricingScope : '',
      availableAmount: summary.availableAmount,
      freezeAmountPerPhone,
      maxImportCount,
      validity: summary.validity,
      canCall: summary.canCall,
      priceConfigured: unitPrice > 0
    };
  }

  function createImportFreeze(data) {
    const capacity = getImportCapacity(data);
    const phoneCount = Math.floor(Number(data && data.phoneCount || 0));
    const requiredFreezeAmount = phoneCount * capacity.freezeAmountPerPhone;
    const allowed = phoneCount > 0 &&
      capacity.priceConfigured &&
      capacity.canCall &&
      requiredFreezeAmount <= capacity.availableAmount;

    if (!allowed) {
      return Object.assign({}, capacity, { phoneCount, requiredFreezeAmount, allowed: false });
    }

    const now = new Date();
    getFrozenTasks().push({
      id: Date.now(),
      tenantName: capacity.tenantName,
      modelType: capacity.modelType,
      vendorCode: capacity.providerCode,
      vendorName: data.vendorName || capacity.providerCode || '-',
      taskNo: `CALL${formatLocalDate(now).replace(/-/g, '')}${String(Date.now()).slice(-5)}`,
      sceneName: data.sceneName || '-',
      frozenMinutes: phoneCount * capacity.estimatedMinutesPerPhone,
      unitPriceSnapshot: capacity.unitPrice,
      taskStatus: '待执行',
      status: '冻结中',
      createdAt: formatLocalDateTime(now),
      releasedAt: '',
      releaseReason: ''
    });

    return Object.assign({}, capacity, { phoneCount, requiredFreezeAmount, allowed: true });
  }

  function renderAdjustmentRows(tenantName) {
    const rows = getBalanceAdjustments()
      .filter(item => normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName))
      .sort((a, b) => String(b.effectiveAt).localeCompare(String(a.effectiveAt)));
    if (!rows.length) {
      return '<tr><td colspan="8"><div class="tenant-history-empty">暂无余额调整记录</div></td></tr>';
    }
    return rows.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.adjustmentNo}</td>
        <td>${adjustmentTypeText(item.type)}</td>
        <td><span class="tenant-adjustment-direction out">调减</span></td>
        <td>${formatBalance(item.amount)}</td>
        <td>${item.reason || '-'}</td>
        <td>${item.operator}</td>
        <td>${item.effectiveAt}</td>
      </tr>
    `).join('');
  }

  function renderHistoryRows(tenantName) {
    const normalizedName = normalizeTenantName(tenantName);
    const rows = getHistoryRows().filter(item =>
      item.status === '已支付' &&
      normalizeTenantName(item.tenantName) === normalizedName
    );
    if (!rows.length) {
      return `
        <tr>
          <td colspan="15">
            <div class="tenant-history-empty">暂无历史关联充值单记录</div>
          </td>
        </tr>
      `;
    }

    var activateAnnoAdded = false;
    return rows.map((item, index) => {
      const activated = isRechargeActivated(item);
      const order = getOrders().find(orderItem => orderItem.no === item.rechargeNo);
      const storeCode = item.storeCode || (order && order.storeCode) || '-';
      const storeName = item.storeName || (order && order.storeName) || '-';
      const activateAnno = !activated && !activateAnnoAdded
        ? ' data-anno="tenant-activate-validity"'
        : '';
      if (!activated && !activateAnnoAdded) activateAnnoAdded = true;
      const validity = item.validFrom && item.validFrom !== '-' && item.validTo && item.validTo !== '-'
        ? `${item.validFrom} ~ ${item.validTo}`
        : '-';
      const operation = !activated
        ? '<button class="tenant-history-activate-btn"' + activateAnno + ' onclick="window.Pages[\'sys-tenant\'].activateRecharge(\'' + item.rechargeNo + '\')">生效</button>'
        : '<span class="tenant-muted">已生效</span>';
      return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.rechargeNo}</td>
        <td>${item.orderType || '付费单'}</td>
        <td>${storeCode}</td>
        <td>${storeName}</td>
        <td>${historyPaymentTag(item)}</td>
        <td><span class="tenant-activation-status ${activated ? 'active' : 'pending'}">${activated ? '已生效' : '待生效'}</span></td>
        <td>${item.billingType}</td>
        <td>${item.seatFeePackage || '-'}</td>
        <td>${item.periodDays || 0} 天</td>
        <td>${formatBalance(item.rechargeAmount)}</td>
        <td>${validity}</td>
        <td>${item.operator}</td>
        <td>${item.bindTime}</td>
        <td>${operation}</td>
      </tr>
    `;
    }).join('');
  }

  function render() {
    return `
      <div class="scene-list-page tenant-page">
        <div class="tenant-list-content">
          <div class="tenant-list-header">
            <div class="tenant-list-title"><span data-anno="tenant-list">租户管理</span></div>
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
                    <th>计费配置</th>
                    <th>大模型可用分钟数</th>
                    <th>小模型可用分钟数</th>
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
      showToast('当前租户已过期或可用分钟数为0，不能手动开启呼叫', 'warning');
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

  function renderPricingConfigEditRows(tenantName) {
    const configs = getTenantAllPriceConfigs(tenantName);
    if (!configs.length) {
      return '<tr><td colspan="4"><div class="tenant-history-empty">暂无计费配置</div></td></tr>';
    }
    return configs.map(item => `
      <tr class="tenant-pricing-edit-row" data-model-type="${item.modelType}">
        <td><span class="tenant-model-tag ${item.modelType === '大模型' ? 'large' : 'small'}">${item.modelType}</span></td>
        <td>
          <div class="tenant-price-input-wrap">
            <span>¥</span>
            <input class="tenant-price-input" type="number" min="0.01" step="0.01" value="${Number(item.unitPrice || 0).toFixed(2)}">
            <span>/分钟</span>
          </div>
        </td>
        <td>
          <select class="tenant-price-status-select">
            <option value="启用"${item.status === '启用' ? ' selected' : ''}>启用</option>
            <option value="停用"${item.status === '停用' ? ' selected' : ''}>停用</option>
          </select>
        </td>
        <td class="tenant-config-effect">当前作为该模型默认价，未来可被供应商专属价覆盖</td>
      </tr>
    `).join('');
  }

  function showPricingConfigModal(tenantName) {
    closePricingConfigModal();
    const html = `
      <div class="tenant-pricing-modal-backdrop" id="tenantPricingConfigBackdrop" onclick="window.Pages['sys-tenant'].closePricingConfigModal(event)">
        <div class="tenant-pricing-modal" id="tenantPricingConfigModal" data-tenant-name="${tenantName}" onclick="event.stopPropagation()">
          <div class="tenant-pricing-modal-header">
            <div>
              <div class="tenant-pricing-modal-title">计费配置</div>
              <div class="tenant-pricing-modal-subtitle">${tenantName}</div>
            </div>
            <button class="tenant-pricing-modal-close" onclick="window.Pages['sys-tenant'].closePricingConfigModal()">&#x2715;</button>
          </div>
          <div class="tenant-pricing-modal-body">
            <div class="biz-modal-notice tenant-pricing-config-notice">
              <span class="biz-notice-icon">&#x26A0;</span>
              <div class="biz-notice-body">当前版本只配置大模型和小模型默认单价。供应商作为未来扩展维度暂不参与配置；价格调整不追溯已冻结任务。</div>
            </div>
            <div class="tenant-pricing-table-wrap">
              <table class="tenant-pricing-table tenant-pricing-edit-table">
                <thead>
                  <tr>
                    <th>模型</th>
                    <th>通话单价</th>
                    <th>状态</th>
                    <th>生效规则</th>
                  </tr>
                </thead>
                <tbody>${renderPricingConfigEditRows(tenantName)}</tbody>
              </table>
            </div>
          </div>
          <div class="tenant-pricing-modal-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-tenant'].closePricingConfigModal()">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].savePricingConfig()">保存配置</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closePricingConfigModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('tenantPricingConfigBackdrop')?.remove();
  }

  function savePricingConfig() {
    const modal = document.getElementById('tenantPricingConfigModal');
    if (!modal) return;
    const tenantName = modal.dataset.tenantName;
    const rows = Array.from(modal.querySelectorAll('.tenant-pricing-edit-row'));
    const updates = [];

    for (const row of rows) {
      const input = row.querySelector('.tenant-price-input');
      const statusSelect = row.querySelector('.tenant-price-status-select');
      const unitPrice = Number(input && input.value);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        input?.focus();
        showToast('通话单价必须大于 0', 'warning');
        return;
      }
      updates.push({
        modelType: row.dataset.modelType,
        unitPrice,
        status: statusSelect ? statusSelect.value : '启用'
      });
    }

    updates.forEach(update => {
      const config = getPriceRules().find(item =>
        normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName) &&
        item.modelType === update.modelType &&
        item.pricingScope === 'MODEL_DEFAULT' &&
        !item.providerCode
      );
      if (!config) return;
      config.unitPrice = update.unitPrice;
      config.status = update.status;
    });

    const container = document.getElementById('page-content');
    if (container) container.innerHTML = render();
    closePricingConfigModal();
    showToast('计费配置已保存', 'success');
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
            <span class="biz-drawer-title">充值管理</span>
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
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantValidity" value="${summary.validity}" readonly></div>
              </div>
              <div class="biz-form-row">
                <label class="biz-form-label">历史充值总额</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantTotalRecharge" value="${formatBalance(summary.totalRechargeAmount)}" readonly></div>
              </div>
              <input type="hidden" id="tenantAvailableBalance" value="${summary.availableAmount}">
              <div class="biz-form-row">
                <label class="biz-form-label">呼叫控制状态</label>
                <div class="biz-form-field"><input class="biz-form-input readonly" id="tenantCallStatus" value="${summary.callStatus}" readonly></div>
              </div>
            </div>

            <div class="tenant-billing-tabs" role="tablist">
              <button class="tenant-billing-tab active" role="tab" data-tab="pricing" onclick="window.Pages['sys-tenant'].switchBillingTab('pricing')">计费明细</button>
              <button class="tenant-billing-tab" role="tab" data-tab="recharge" onclick="window.Pages['sys-tenant'].switchBillingTab('recharge')">充值单管理</button>
              <button class="tenant-billing-tab" role="tab" data-tab="adjustment" data-anno="tenant-manual-adjustment" onclick="window.Pages['sys-tenant'].switchBillingTab('adjustment')">余额调整</button>
            </div>

            <div class="tenant-billing-tab-panel active" data-panel="pricing" role="tabpanel">
              <div class="tenant-drawer-section tenant-tab-section">
                <div class="biz-modal-notice tenant-notice tenant-pricing-notice">
                  <span class="biz-notice-icon">&#x26A0;</span>
                  <div class="biz-notice-body">大模型和小模型余额均由同一资金余额按模型默认单价换算，两类分钟数是不同计价视图，不可相加。</div>
                </div>
                <div id="tenantBalanceRiskNotice">${renderBalanceRisk(summary)}</div>
                <div class="tenant-pricing-table-wrap">
                  <table class="tenant-pricing-table">
                    <thead>
                      <tr>
                        <th>模型</th>
                        <th>模型默认单价</th>
                        <th>冻结分钟数</th>
                        <th>冻结金额</th>
                        <th>通话余额</th>
                        <th>可用分钟数</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody id="tenantPricingBody">${renderPricingRows(tenantLocked)}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="tenant-billing-tab-panel" data-panel="recharge" role="tabpanel">
              <div class="tenant-drawer-section">
                <div class="tenant-section-title">关联充值单</div>
                <div class="biz-form-row">
                  <label class="biz-form-label required">关联类型</label>
                  <div class="biz-form-field">
                    <div class="biz-radio-group tenant-association-type">
                      <label class="biz-radio">
                        <input type="radio" name="tenantRechargeAssociationType" value="PAID" checked onchange="window.Pages['sys-tenant'].switchRechargeAssociationType(this.value)">
                        <span>付费单</span>
                      </label>
                      <label class="biz-radio">
                        <input type="radio" name="tenantRechargeAssociationType" value="TRIAL" onchange="window.Pages['sys-tenant'].switchRechargeAssociationType(this.value)">
                        <span>试用单</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div id="tenantPaidRechargeFields">
                <div class="biz-form-row">
                  <label class="biz-form-label required">充值单号</label>
                  <div class="biz-form-field">
                    <div class="tenant-recharge-check">
                      <input class="biz-form-input" id="tenantRechargeNo" value="${row.rechargeNo || ''}" placeholder="请输入充值单号" oninput="window.Pages['sys-tenant'].previewRechargeOrder()">
                      <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].readRechargeOrder()" style="height:36px;padding:0 14px;">读取</button>
                    </div>
                  </div>
                </div>
                <div class="tenant-order-preview" id="tenantOrderPreview"></div>
                <div class="biz-modal-notice tenant-notice">
                  <span class="biz-notice-icon">&#x26A0;</span>
                  <div class="biz-notice-body">充值金额进入统一资金账户。大模型和小模型余额按各自默认单价换算，分钟数不可相加。</div>
                </div>
                </div>
                <div id="tenantTrialRechargeFields" class="tenant-trial-form" style="display:none;">
                  <div class="biz-form-row">
                    <label class="biz-form-label required">有效时间</label>
                    <div class="biz-form-field">
                      <select class="biz-form-select" id="tenantTrialValidityMonths">
                        <option value="1">1 个月</option>
                        <option value="2">2 个月</option>
                        <option value="3">3 个月</option>
                      </select>
                    </div>
                  </div>
                  <div class="biz-form-row">
                    <label class="biz-form-label required">通话费用</label>
                    <div class="biz-form-field">
                      <input class="biz-form-input" id="tenantTrialCallFee" type="number" min="0.01" step="0.01" placeholder="请输入通话费用（元）">
                    </div>
                  </div>
                  <div class="tenant-recharge-confirm">
                    <span>确认后生成待生效的试用单记录</span>
                    <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].confirmTrialOrder()">确认关联</button>
                  </div>
                  <div class="biz-modal-notice tenant-notice">
                    <span class="biz-notice-icon">&#x26A0;</span>
                    <div class="biz-notice-body">试用有效时间按每月 30 日换算；生效时可再次调整添加时长，通话费用在生效后计入资金余额。</div>
                  </div>
                </div>
              </div>

              <div class="tenant-drawer-section tenant-tab-section">
                <div class="tenant-section-title">历史关联充值单</div>
                <div class="tenant-history-table-wrap">
                  <table class="tenant-history-table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>充值单号</th>
                        <th>关联类型</th>
                        <th>门店编码</th>
                        <th>门店名称</th>
                        <th>支付状态</th>
                        <th>生效状态</th>
                        <th>计费类型</th>
                        <th>坐席费套餐</th>
                        <th>周期</th>
                        <th>充值金额</th>
                        <th>有效期</th>
                        <th>操作人</th>
                        <th>关联时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody id="tenantHistoryBody">${renderHistoryRows(tenantLocked)}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="tenant-billing-tab-panel" data-panel="adjustment" role="tabpanel">
              <div class="tenant-drawer-section tenant-tab-section tenant-adjustment-section">
                <div class="tenant-list-tools" style="margin-bottom:12px;">
                  <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].showAdjustmentModal()" style="height:34px;padding:0 16px;">+ 手工调整</button>
                </div>
                <div class="tenant-history-table-wrap tenant-adjustment-table-wrap">
                  <table class="tenant-history-table tenant-adjustment-table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>调整单号</th>
                        <th>调整类型</th>
                        <th>方向</th>
                        <th>金额</th>
                        <th>原因</th>
                        <th>操作人</th>
                        <th>生效时间</th>
                      </tr>
                    </thead>
                    <tbody id="tenantAdjustmentBody">${renderAdjustmentRows(tenantLocked)}</tbody>
                  </table>
                </div>
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

  function switchBillingTab(tabName) {
    const drawer = document.getElementById('tenantBillingDrawer');
    if (!drawer) return;
    drawer.querySelectorAll('.tenant-billing-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    drawer.querySelectorAll('.tenant-billing-tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === tabName);
    });
  }

  function switchRechargeAssociationType(type) {
    const paidPanel = document.getElementById('tenantPaidRechargeFields');
    const trialPanel = document.getElementById('tenantTrialRechargeFields');
    const isTrial = type === 'TRIAL';
    if (paidPanel) paidPanel.style.display = isTrial ? 'none' : 'block';
    if (trialPanel) trialPanel.style.display = isTrial ? 'block' : 'none';
  }

  function getTenantStoreInfo(tenantName) {
    const order = getOrders().find(item =>
      normalizeTenantName(item.tenantName) === normalizeTenantName(tenantName)
    );
    const tenant = getTenantRows().find(item =>
      normalizeTenantName(item.name) === normalizeTenantName(tenantName)
    );
    return {
      storeCode: (order && order.storeCode) || (tenant && tenant.tenantId) || '-',
      storeName: (order && order.storeName) || tenantName || '-'
    };
  }

  function confirmTrialOrder() {
    const tenantName = document.getElementById('tenantName')?.value || '';
    const months = Number(document.getElementById('tenantTrialValidityMonths')?.value);
    const callFeeInput = document.getElementById('tenantTrialCallFee');
    const callFee = Number(callFeeInput?.value);

    if (![1, 2, 3].includes(months)) {
      showToast('请选择有效时间', 'warning');
      return;
    }
    if (!Number.isFinite(callFee) || callFee <= 0) {
      callFeeInput?.focus();
      showToast('通话费用必须大于 0', 'warning');
      return;
    }

    const now = new Date();
    const store = getTenantStoreInfo(tenantName);
    const rechargeNo = `TRY${formatLocalDate(now).replace(/-/g, '')}${String(now.getTime()).slice(-6)}`;
    getHistoryRows().unshift({
      id: now.getTime(),
      orderType: '试用单',
      tenantName,
      rechargeNo,
      storeCode: store.storeCode,
      storeName: store.storeName,
      status: '已支付',
      billingType: '坐席费+通话费',
      seatFeePackage: `试用${months}个月`,
      trialMonths: months,
      periodDays: months * 30,
      rechargeAmount: callFee,
      validFrom: '-',
      validTo: '-',
      validityActivated: false,
      activated: false,
      operator: 'xtadmin',
      bindTime: formatLocalDateTime(now)
    });

    if (callFeeInput) callFeeInput.value = '';
    const monthsSelect = document.getElementById('tenantTrialValidityMonths');
    if (monthsSelect) monthsSelect.value = '1';
    const historyBody = document.getElementById('tenantHistoryBody');
    if (historyBody) historyBody.innerHTML = renderHistoryRows(tenantName);
    updateDrawerFieldsAfterActivation(tenantName);
    showToast('试用单已关联，请在历史记录中点击“生效”', 'success');
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
        ? '<div class="tenant-empty-preview">充值单号已变更，请重新读取</div>'
        : '<div class="tenant-empty-preview">请输入充值单号并点击“读取”</div>';
      return;
    }
    const preview = buildSubmitPreview(order);
    var billingTenantName = document.getElementById('tenantName')?.value || '';
    var historyRow = getHistoryRows().find(item =>
      item.rechargeNo === order.no &&
      normalizeTenantName(item.tenantName) === normalizeTenantName(billingTenantName)
    );
    var isSubmitted = !!historyRow;
    var validityDisplay = preview.validity;
    if (isSubmitted && historyRow.validFrom && historyRow.validFrom !== '-' && historyRow.validTo && historyRow.validTo !== '-') {
      validityDisplay = `${historyRow.validFrom} ~ ${historyRow.validTo}`;
    } else if (isSubmitted && !isRechargeActivated(historyRow) && canGenerateValidity({
      rechargeStatus: historyRow.status,
      billingType: historyRow.billingType
    })) {
      validityDisplay = '待生效';
    }
    const tenantName = document.getElementById('tenantName')?.value || '';
    const largeConfigs = getTenantPriceConfigs(tenantName, '大模型');
    const smallConfigs = getTenantPriceConfigs(tenantName, '小模型');
    const rechargeAmount = order.status === '已支付' ? order.rechargeAmount : 0;
    const tenantMatched = normalizeTenantName(order.tenantName) === normalizeTenantName(tenantName);
    const duplicated = getHistoryRows().some(item => item.rechargeNo === order.no);
    const canConfirm = order.status === '已支付' && tenantMatched && !duplicated;
    const confirmText = duplicated
      ? '该充值单已关联'
      : (!tenantMatched ? '门店与当前租户不匹配' : (order.status === '已支付' ? '请核对门店信息后确认关联' : `当前状态为${order.status}，不可关联`));
    box.innerHTML = `
      <div class="tenant-preview-grid">
        <div><span>充值单状态</span>${statusTag(order.status)}</div>
        <div><span>门店编码</span><strong>${order.storeCode || '-'}</strong></div>
        <div><span>门店名称</span><strong>${order.storeName || '-'}</strong></div>
        <div><span>所属租户</span><strong>${order.tenantName || '-'}</strong></div>
        <div><span>计费类型</span><strong>${order.billingType}</strong></div>
        <div><span>坐席费套餐</span><strong>${order.seatFeePackage || '-'}</strong></div>
        <div><span>租户有效期</span><strong>${validityDisplay}</strong></div>
        <div><span>充值金额</span><strong>${formatBalance(rechargeAmount)}${isSubmitted && !isRechargeActivated(historyRow) ? '（待生效）' : ''}</strong></div>
        <div><span>大模型等价分钟数</span><strong>${formatMinuteRange(largeConfigs, rechargeAmount)}</strong></div>
        <div><span>小模型等价分钟数</span><strong>${formatMinuteRange(smallConfigs, rechargeAmount)}</strong></div>
      </div>
      <div class="tenant-recharge-confirm ${canConfirm ? '' : 'disabled'}">
        <span>${confirmText}</span>
        <button class="btn btn-primary" ${canConfirm ? '' : 'disabled'} onclick="window.Pages['sys-tenant'].confirmRechargeOrder()">确认关联</button>
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

  function readRechargeOrder() {
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
      storeCode: '-',
      storeName: '-',
      periodDays: 0,
      billingType: '仅坐席费',
      seatFeePackage: '-',
      rechargeAmount: 0
    };
    renderCheckedOrder(order);

    const drawer = document.getElementById('tenantBillingDrawer');
    if (!drawer) return;
    if (order.status !== '已支付') {
      showToast(`充值单读取完成，当前状态：${order.status}`, 'warning');
      return;
    }
    const tenantName = document.getElementById('tenantName')?.value || '';
    if (normalizeTenantName(order.tenantName) !== normalizeTenantName(tenantName)) {
      showToast('充值单门店与当前租户不匹配，请核对后重试', 'warning');
      return;
    }
    if (getHistoryRows().some(item => item.rechargeNo === order.no)) {
      showToast('该充值单号已关联，请勿重复关联', 'warning');
      return;
    }
    showToast('充值单读取成功，请核对门店信息后确认关联', 'success');
  }

  function confirmRechargeOrder() {
    const drawer = document.getElementById('tenantBillingDrawer');
    if (!drawer) return;
    const order = drawer._checkedOrder;
    const no = document.getElementById('tenantRechargeNo')?.value.trim();
    if (!order || order.no !== no) {
      showToast('请先读取当前充值单号', 'warning');
      renderCheckedOrder(null);
      return;
    }
    if (order.status !== '已支付') {
      showToast(`当前充值单状态为${order.status}，不能关联`, 'warning');
      return;
    }
    const tenantName = document.getElementById('tenantName')?.value || '';
    if (normalizeTenantName(order.tenantName) !== normalizeTenantName(tenantName)) {
      showToast('充值单门店与当前租户不匹配，不能关联', 'warning');
      return;
    }
    if (getHistoryRows().some(item => item.rechargeNo === order.no)) {
      showToast('该充值单号已关联，请勿重复关联', 'warning');
      renderCheckedOrder(order);
      return;
    }

    const rowId = Number(drawer.dataset.rowId);
    const isNew = drawer.dataset.new === '1';
    const row = isNew ? { id: rowId } : getBillingRows().find(item => item.id === rowId);
    row.tenantName = tenantName || row.tenantName;
    row.localAddedAt = formatLocalDateTime(new Date());

    applyOrderToRow(row, order);
    if (isNew) getBillingRows().push(row);

    if (row.rechargeStatus === '已支付') {
      getHistoryRows().unshift({
        id: Date.now(),
        orderType: '付费单',
        tenantName: row.tenantName,
        rechargeNo: row.rechargeNo,
        storeCode: row.storeCode,
        storeName: row.storeName,
        status: row.rechargeStatus,
        billingType: row.billingType,
        seatFeePackage: row.seatFeePackage,
        periodDays: row.periodDays,
        rechargeAmount: row.rechargeAmount,
        validFrom: row.validFrom,
        validTo: row.validTo,
        validityActivated: row.validityActivated,
        activated: false,
        operator: 'xtadmin',
        bindTime: row.localAddedAt
      });
    }

    const historyBody = document.getElementById('tenantHistoryBody');
    if (historyBody) historyBody.innerHTML = renderHistoryRows(row.tenantName);
    updateDrawerFieldsAfterActivation(row.tenantName);
    renderCheckedOrder(order);
    showToast('充值单已关联，请在历史记录中点击“生效”后更新有效期和余额', 'success');
  }

  function createBalanceAdjustment(data) {
    const now = new Date();
    getBalanceAdjustments().unshift({
      id: Date.now(),
      adjustmentNo: `ADJ${formatLocalDate(now).replace(/-/g, '')}${String(Date.now()).slice(-5)}`,
      tenantName: data.tenantName,
      type: 'MANUAL_DEDUCT',
      direction: 'OUT',
      amount: data.amount,
      reason: data.reason,
      operator: 'xtadmin',
      status: '已生效',
      effectiveAt: formatLocalDateTime(now)
    });
  }

  function refreshAfterBalanceAdjustment(tenantName, successText) {
    updateDrawerFieldsAfterActivation(tenantName);
    const container = document.getElementById('page-content');
    if (container) container.innerHTML = render();
    const updatedSummary = getTenantBillingSummary(tenantName);
    showToast(
      updatedSummary.availableAmount <= 0
        ? `${successText}，当前已无新增冻结额度`
        : successText,
      updatedSummary.availableAmount <= 0 ? 'warning' : 'success'
    );
  }

  function showAdjustmentModal() {
    closeAdjustmentModal();
    const tenantName = document.getElementById('tenantName')?.value || '';
    const summary = getTenantBillingSummary(tenantName);
    const html = `
      <div class="tenant-pricing-modal-backdrop" id="tenantAdjustmentBackdrop" onclick="window.Pages['sys-tenant'].closeAdjustmentModal(event)">
        <div class="tenant-pricing-modal tenant-refund-modal" id="tenantAdjustmentModal" onclick="event.stopPropagation()">
          <div class="tenant-pricing-modal-header">
            <div>
              <div class="tenant-pricing-modal-title">手工调整</div>
              <div class="tenant-pricing-modal-subtitle">${tenantName}</div>
            </div>
            <button class="tenant-pricing-modal-close" onclick="window.Pages['sys-tenant'].closeAdjustmentModal()">&#x2715;</button>
          </div>
          <div class="tenant-pricing-modal-body">
            <div class="tenant-refund-summary">
              <div><span>当前资金余额</span><strong>${formatBalance(summary.balanceAmount)}</strong></div>
            </div>
            <div class="biz-modal-notice tenant-pricing-config-notice">
              <span class="biz-notice-icon">&#x26A0;</span>
              <div class="biz-notice-body">手工扣减金额不能超过当前资金余额，不占用冻结金额。</div>
            </div>
            <div class="tenant-refund-form">
              <div class="tenant-adjustment-field">
                <label>金额</label>
                <input id="tenantAdjustmentModalAmount" type="number" min="0.01" step="0.01" placeholder="请输入金额">
              </div>
              <div class="tenant-adjustment-field">
                <label>原因</label>
                <input id="tenantAdjustmentModalReason" type="text" maxlength="100" placeholder="请输入原因">
              </div>
            </div>
          </div>
          <div class="tenant-pricing-modal-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-tenant'].closeAdjustmentModal()">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-tenant'].submitAdjustmentFromModal()">确认调整</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeAdjustmentModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('tenantAdjustmentBackdrop')?.remove();
  }

  function submitAdjustmentFromModal() {
    const tenantName = document.getElementById('tenantName')?.value || '';
    const amountInput = document.getElementById('tenantAdjustmentModalAmount');
    const amount = Number(amountInput && amountInput.value);
    const reasonInput = document.getElementById('tenantAdjustmentModalReason');
    const reason = String(reasonInput && reasonInput.value || '').trim();
    const summary = getTenantBillingSummary(tenantName);

    if (!Number.isFinite(amount) || amount <= 0) {
      amountInput?.focus();
      showToast('金额必须大于 0', 'warning');
      return;
    }
    if (!reason) {
      reasonInput?.focus();
      showToast('请输入原因', 'warning');
      return;
    }
    if (amount > summary.balanceAmount) {
      showToast(`金额不能超过当前资金余额 ${formatBalance(summary.balanceAmount)}`, 'warning');
      return;
    }

    createBalanceAdjustment({ tenantName, amount, reason });
    closeAdjustmentModal();
    refreshAfterBalanceAdjustment(tenantName, '手工扣减已生效');
  }

  window.Pages = window.Pages || {};
  window.Pages['sys-tenant'] = {
    render,
    init,
    showBillingDrawer,
    closeBillingDrawer,
    switchBillingTab,
    switchRechargeAssociationType,
    previewRechargeOrder,
    readRechargeOrder,
    confirmRechargeOrder,
    confirmTrialOrder,
    showAdjustmentModal,
    closeAdjustmentModal,
    submitAdjustmentFromModal,
    activateRecharge,
    closeActivationDurationModal,
    updateActivationDurationPreview,
    confirmActivationDuration,
    toggleFrozenTooltip,
    toggleCallControl,
    getImportCapacity,
    createImportFreeze,
    syncFrozenTaskReleases,
    releaseFrozenTasksByScene,
    showPricingConfigModal,
    closePricingConfigModal,
    savePricingConfig
  };

  document.addEventListener('click', function () {
    document.querySelectorAll('.tenant-th-help.open').forEach(item => item.classList.remove('open'));
  });
})();
