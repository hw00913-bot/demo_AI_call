/**
 * app.js — 外呼中台报表交互逻辑
 * 包含：Tab 切换、左侧导航、筛选重置、异步导出、多选下拉、全局通知
 */

/* ===== Tab 切换 ===== */
function switchTab(el, tabId) {
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  const panel = document.getElementById(tabId);
  if (panel) { panel.style.display = 'flex'; /* Ensure nested flex works */ }
}
/* ===== 二级 Tab 切换 ===== */
function switchSubTab(el, subTabId) {
  const parentPanel = el.closest('.tab-panel');
  if (!parentPanel) return;
  
  parentPanel.querySelectorAll('.sub-tab-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  
  parentPanel.querySelectorAll('.sub-tab-panel').forEach(p => p.style.display = 'none');
  const panel = document.getElementById(subTabId);
  if (panel) panel.style.display = 'flex';
}


/* ===== 左侧菜单展开/收起 ===== */
function toggleMenu(el, key) {
  const sub = document.getElementById('sub-' + key);
  if (!sub) return;
  const isOpen = sub.classList.contains('open');
  if (isOpen) {
    sub.classList.remove('open');
    el.classList.remove('open', 'active-parent');
  } else {
    sub.classList.add('open');
    el.classList.add('open', 'active-parent');
  }
}

/* ===== 首页点击激活 ===== */
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

/* ===== 子菜单项点击（激活 + 可扩展页面切换） ===== */
function switchSubAndPage(el, pageKey) {
  document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

/* ===== 页面初始化 ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* 子菜单项点击激活高亮 */
  document.querySelectorAll('.nav-sub-item[onclick]').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const sub = this.closest('.nav-sub');
      if (sub) {
        const parentId = sub.id.replace('sub-', 'nav-');
        const parent = document.getElementById(parentId);
        if (parent) {
          document.querySelectorAll('.nav-item').forEach(p => {
            if (p !== parent) p.classList.remove('active');
          });
          parent.classList.add('active-parent');
        }
      }
    });
  });

  /* 一级菜单无子菜单时激活自身 */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      const key = this.id ? this.id.replace('nav-', '') : null;
      const sub = key ? document.getElementById('sub-' + key) : null;
      if (!sub) {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active', 'active-parent'));
        document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  /* 默认展开"统计报表"菜单 */
  const navReport = document.getElementById('nav-report');
  if (navReport) navReport.classList.add('open', 'active-parent');

  /* 初始显示第一个 Tab 和 SubTab */
  const firstTab = document.querySelector('.tab-item.active');
  if (firstTab) {
    const tabId = firstTab.getAttribute('onclick').match(/'([^']+)'/)[1];
    const panel = document.getElementById(tabId);
    if (panel) {
      panel.style.display = 'flex';
      const firstSubTab = panel.querySelector('.sub-tab-item.active');
      if (firstSubTab) {
        const subTabId = firstSubTab.getAttribute('onclick').match(/'([^']+)'/)[1];
        const subPanel = document.getElementById(subTabId);
        if (subPanel) subPanel.style.display = 'flex';
      }
    }
  }

  /* 初始化默认日期范围（最近7天） */
  initDefaultDates();

  /* 点击页面其他区域关闭所有多选下拉 */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.multi-select-wrap')) {
      document.querySelectorAll('.multi-select-dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  /* 允许点击多选项任意区域（如文字或整行空白处）选中复选框 */
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.multi-select-option');
    if (option && e.target.tagName !== 'INPUT') {
      const checkbox = option.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

});

/* ===== 筛选操作 ===== */
function resetFilter() {
  /* 重置文本/日期输入 */
  document.querySelectorAll('.tab-panel[style*="block"] input').forEach(inp => inp.value = '');
  /* 重置多选下拉框 */
  document.querySelectorAll('.multi-select-wrap').forEach(wrap => {
    const allCb = wrap.querySelector('.opt-all');
    const items = wrap.querySelectorAll('.opt-item');
    if (allCb) allCb.checked = true;
    items.forEach(i => i.checked = false);
    updateMultiSelectDisplay(wrap);
  });
  showToast('已重置筛选条件');
}

function doQuery() { showToast('查询中...'); }

function doRefresh() { showToast('已刷新'); }

/* ===== 异步导出模拟 ===== */
function doExport(event) {
  const btn = event.currentTarget;
  if (btn.classList.contains('loading')) return; // 防止重复点击

  const originalContent = btn.innerHTML;
  btn.classList.add('loading');
  btn.innerHTML = '<span class="loading-icon"></span> 导出中...';
  btn.disabled = true;
  btn.style.cursor = 'not-allowed';
  btn.style.opacity = '0.7';

  showToast('导出任务已提交，系统正在生成报表，请稍后...', 'info');

  /* 模拟 2.5s 后台处理完成 */
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = originalContent;
    btn.disabled = false;
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
    showToast('导出成功！文件已准备就绪。', 'success');
  }, 2500);
}

/* ===== 多选下拉框交互 ===== */
function toggleMultiSelect(e, el) {
  e.stopPropagation();
  const dropdown = el.nextElementSibling;
  const isOpen = dropdown.classList.contains('open');
  document.querySelectorAll('.multi-select-dropdown').forEach(d => d.classList.remove('open'));
  if (!isOpen) dropdown.classList.add('open');
}

function handleAllOptions(cb) {
  const wrap = cb.closest('.multi-select-wrap');
  const items = wrap.querySelectorAll('.opt-item');
  if (cb.checked) {
    items.forEach(i => i.checked = false);
  }
  updateMultiSelectDisplay(wrap);
}

function handleOptionItem(cb) {
  const wrap = cb.closest('.multi-select-wrap');
  const allCb = wrap.querySelector('.opt-all');
  const checkedItems = wrap.querySelectorAll('.opt-item:checked');
  allCb.checked = checkedItems.length === 0;
  updateMultiSelectDisplay(wrap);
}

function updateMultiSelectDisplay(wrap) {
  const allCb = wrap.querySelector('.opt-all');
  const checkedItems = wrap.querySelectorAll('.opt-item:checked');
  const display = wrap.querySelector('.multi-select-display');
  if (allCb && allCb.checked) {
    display.textContent = '全部';
  } else if (checkedItems.length === 1) {
    display.textContent = checkedItems[0].nextElementSibling.textContent;
  } else if (checkedItems.length > 1) {
    display.textContent = '已选 ' + checkedItems.length + ' 项';
  } else {
    display.textContent = '请选择';
  }
}

/* ===== 全局通知（Toast） ===== */
function showToast(msg, type = 'default') {
  let toast = document.getElementById('toast-tip');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-tip';
    toast.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      color: #fff; padding: 10px 24px;
      border-radius: 4px; font-size: 14px; z-index: 9999;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex; align-items: center; gap: 8px;
      opacity: 0; pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  /* 不同类型的背景色 */
  const bgMap = { success: '#52c41a', info: '#1677ff', default: 'rgba(0,0,0,0.75)' };
  toast.style.background = bgMap[type] || bgMap.default;

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.top = '40px';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.top = '20px';
  }, 3000);
}

/* ===== 初始化默认日期 ===== */
function initDefaultDates() {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - 7);

  // 格式化函数
  const pad = (n) => n < 10 ? '0' + n : n;
  
  const formatDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const formatDateTime = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  // 遍历所有日期区间容器
  document.querySelectorAll('.filter-date-range').forEach(range => {
    const inputs = range.querySelectorAll('input.filter-input');
    if (inputs.length === 2) {
      const type = inputs[0].getAttribute('type');
      if (type === 'date') {
        inputs[0].value = formatDate(past);
        inputs[1].value = formatDate(now);
      } else if (type === 'datetime-local') {
        inputs[0].value = formatDateTime(past);
        inputs[1].value = formatDateTime(now);
      }
    }
  });
}
/* ===== 级联菜单逻辑 (大区 -> 小区 -> 门店) ===== */
const storeHierarchy = {
  "华东": {
    "浙江区": ["杭州旗舰店", "杭州西湖店", "杭州滨江店"],
    "上海区": ["上海静安店", "上海徐汇店"]
  },
  "华南": {
    "广东一区": ["广州天河店", "深圳南山店"],
    "广东二区": ["佛山顺德店"]
  },
  "华北": {
    "北京区": ["北京朝阳店", "北京海淀店"]
  }
};

function handleRegionChange(selectElem) {
  const region = selectElem.value;
  const parentContainer = selectElem.closest('.filter-bar');
  const districtSelect = parentContainer.querySelector('.district-select');
  const storeDropdown = parentContainer.querySelector('.store-dropdown');
  
  // 清空小区
  districtSelect.innerHTML = '<option value="">全部</option>';
  // 清空门店
  storeDropdown.innerHTML = '<div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div>';
  
  // 如果选择了大区，则填充对应的小区
  if (region && storeHierarchy[region]) {
    for (let district in storeHierarchy[region]) {
      const option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    }
  }
  
  // 更新门店显示文本
  parentContainer.querySelector('.multi-select-display').innerText = '全部';
}

function handleDistrictChange(selectElem) {
  const district = selectElem.value;
  const parentContainer = selectElem.closest('.filter-bar');
  const region = parentContainer.querySelector('.region-select').value;
  const storeDropdown = parentContainer.querySelector('.store-dropdown');
  
  // 清空门店
  storeDropdown.innerHTML = '<div class="multi-select-option"><input type="checkbox" class="opt-all" checked onchange="handleAllOptions(this)"><label>全部</label></div>';
  
  // 如果选择了小区，则填充对应的门店
  if (region && district && storeHierarchy[region][district]) {
    const stores = storeHierarchy[region][district];
    stores.forEach(store => {
      const div = document.createElement('div');
      div.className = 'multi-select-option';
      div.innerHTML = `<input type="checkbox" class="opt-item" onchange="handleOptionItem(this)"><label>${store}</label>`;
      storeDropdown.appendChild(div);
    });
  }
  
  // 更新门店显示文本
  parentContainer.querySelector('.multi-select-display').innerText = '全部';
}
