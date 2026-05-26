/**
 * js/common.js — 当前页面使用的公共函数
 */

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
  const bgMap = { success: '#52c41a', info: '#1677ff', warning: '#faad14', error: '#ff4d4f', default: 'rgba(0,0,0,0.75)' };
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

function doQuery() { showToast('查询中...'); }
function doRefresh() { showToast('已刷新'); }

/* ===== 筛选重置（传入容器限定范围） ===== */
function resetFilter(container) {
  const scope = container || document;
  scope.querySelectorAll('input').forEach((inp) => {
    if (inp.type === 'checkbox' || inp.type === 'radio') return;
    inp.value = '';
  });
  scope.querySelectorAll('select').forEach((sel) => {
    sel.selectedIndex = 0;
  });
  showToast('已重置筛选条件');
}

/* ===== 全局 Tooltip（统一替代原生 title） ===== */
let activeTooltipTarget = null;
let globalTooltipEl = null;

function ensureGlobalTooltip() {
  if (globalTooltipEl) return globalTooltipEl;
  const el = document.createElement('div');
  el.id = 'global-tooltip';
  el.className = 'global-tooltip';
  el.innerHTML = `
    <div class="global-tooltip-content"></div>
    <div class="global-tooltip-arrow"></div>
  `;
  document.body.appendChild(el);
  globalTooltipEl = el;
  return el;
}

function getTooltipText(target) {
  return target.getAttribute('data-tooltip') || target.getAttribute('title') || '';
}

function positionGlobalTooltip() {
  if (!activeTooltipTarget || !globalTooltipEl) return;
  const rect = activeTooltipTarget.getBoundingClientRect();
  const tipRect = globalTooltipEl.getBoundingClientRect();
  const gap = 10;
  const minMargin = 8;

  let top = rect.top - tipRect.height - gap;
  let placeBelow = false;
  if (top < minMargin) {
    top = rect.bottom + gap;
    placeBelow = true;
  }

  let left = rect.left + (rect.width - tipRect.width) / 2;
  left = Math.max(minMargin, Math.min(left, window.innerWidth - tipRect.width - minMargin));

  globalTooltipEl.style.top = `${top}px`;
  globalTooltipEl.style.left = `${left}px`;
  globalTooltipEl.classList.toggle('below', placeBelow);
}

function showGlobalTooltip(target) {
  const text = getTooltipText(target);
  if (!text) return;

  const tooltip = ensureGlobalTooltip();
  const content = tooltip.querySelector('.global-tooltip-content');
  if (!content) return;

  if (target.hasAttribute('title')) {
    target.setAttribute('data-native-title', target.getAttribute('title') || '');
    target.removeAttribute('title');
  }

  content.textContent = text;
  activeTooltipTarget = target;
  tooltip.classList.add('show');
  positionGlobalTooltip();
}

function hideGlobalTooltip() {
  if (!globalTooltipEl) return;
  if (activeTooltipTarget && activeTooltipTarget.hasAttribute('data-native-title')) {
    const nativeTitle = activeTooltipTarget.getAttribute('data-native-title') || '';
    if (nativeTitle) activeTooltipTarget.setAttribute('title', nativeTitle);
    activeTooltipTarget.removeAttribute('data-native-title');
  }
  globalTooltipEl.classList.remove('show', 'below');
  activeTooltipTarget = null;
}

document.addEventListener('mouseover', (e) => {
  const trigger = e.target.closest('[data-tooltip],[title]');
  if (!trigger) return;
  if (activeTooltipTarget === trigger) return;
  showGlobalTooltip(trigger);
});

document.addEventListener('mouseout', (e) => {
  if (!activeTooltipTarget) return;
  const current = e.target.closest('[data-tooltip],[title],[data-native-title]');
  if (current !== activeTooltipTarget) return;
  if (e.relatedTarget && activeTooltipTarget.contains(e.relatedTarget)) return;
  hideGlobalTooltip();
});

document.addEventListener('focusin', (e) => {
  const trigger = e.target.closest('[data-tooltip],[title]');
  if (trigger) showGlobalTooltip(trigger);
});

document.addEventListener('focusout', (e) => {
  if (!activeTooltipTarget) return;
  const current = e.target.closest('[data-tooltip],[title],[data-native-title]');
  if (current === activeTooltipTarget) hideGlobalTooltip();
});

window.addEventListener('scroll', positionGlobalTooltip, true);
window.addEventListener('resize', positionGlobalTooltip);
