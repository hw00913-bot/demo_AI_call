/**
 * js/nav.js — 导航路由 + 面包屑 + 菜单交互
 */

/* ===== 路由表：navKey -> { pageKey, breadcrumb } ===== */
const RouteMap = {
  'nav-home':   { page: 'home',           bc: [] },
  'nav-scene':  { page: null,             bc: [] },
  'scene-list': { page: 'scene-list',     bc: [{ label: '外呼场景', link: 'nav-scene' }, '外呼列表'] },
  'scene-block':{ page: 'scene-block',    bc: [{ label: '外呼场景', link: 'nav-scene' }, '外呼拦截'] },
  'nav-report': { page: null,             bc: [] },
  'report-call':{ page: 'report-call',    bc: [{ label: '统计分析', link: 'nav-report' }, '通话统计'] },
  'report-billing':{ page: 'report-billing', bc: [{ label: '统计分析', link: 'nav-report' }, '计费统计'] },
  'report-clue':{ page: 'report-clue',    bc: [{ label: '统计分析', link: 'nav-report' }, '线索统计'] },
  'nav-result': { page: null,             bc: [] },
  'result-records':{ page: 'result-records', bc: [{ label: '外呼结果', link: 'nav-result' }, '通话记录'] },
  'result-clue':{ page: 'result-clue',    bc: [{ label: '外呼结果', link: 'nav-result' }, '线索记录'] },
  'nav-system': { page: null,             bc: [] },
  'sys-account':{ page: 'sys-account',    bc: [{ label: '系统管理', link: 'nav-system' }, '账号管理'] },
  'sys-tenant': { page: 'sys-tenant',     bc: [{ label: '系统管理', link: 'nav-system' }, '租户管理'] },
  'sys-channel':{ page: 'sys-channel',    bc: [{ label: '系统管理', link: 'nav-system' }, '通道管理'] },
  'sys-scene':  { page: 'sys-scene',      bc: [{ label: '系统管理', link: 'nav-system' }, '业务场景'] },
};

/* ===== 占位页面（未开发模块） ===== */
(function () {
  const placeholderNames = {
    'home': '首页', 'scene-block': '外呼拦截',
    'report-call': '通话统计', 'report-billing': '计费统计',
    'result-records': '通话记录', 'result-clue': '线索记录',
    'sys-account': '账号管理', 'sys-tenant': '租户管理',
    'sys-channel': '通道管理', 'sys-scene': '业务场景'
  };
  Object.keys(placeholderNames).forEach(key => {
    window.Pages = window.Pages || {};
    if (!window.Pages[key]) {
      window.Pages[key] = {
        render() {
          return `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#999;">
              <div style="font-size:48px;opacity:.5">🚧</div>
              <div style="font-size:16px;font-weight:500">「${placeholderNames[key]}」功能正在开发中</div>
              <div style="font-size:13px;color:#bbb">请查看已完成的「线索统计」或「外呼列表」报表</div>
            </div>
          `;
        },
        init() {}
      };
    }
  });
})();

/* ===== 核心路由函数 ===== */
function navigateTo(pageKey, navId) {
  const module = window.Pages[pageKey];
  const container = document.getElementById('page-content');
  if (!container) return;

  if (module && module.render) {
    container.innerHTML = module.render();
    if (module.init) setTimeout(() => module.init(), 0);
  } else {
    container.innerHTML = `<div style="padding:40px;color:#999;text-align:center">页面加载失败: ${pageKey}</div>`;
  }

  // 更新面包屑
  updateBreadcrumb(navId);
}

function updateBreadcrumb(navId) {
  const route = RouteMap[navId];
  const bcEl = document.getElementById('breadcrumb');
  if (!bcEl || !route) return;

  const items = [];
  route.bc.forEach((item, idx) => {
    if (idx > 0) items.push('<span class="bc-sep">/</span>');
    if (typeof item === 'string') {
      items.push(`<span class="bc-current">${item}</span>`);
    } else {
      items.push(`<span class="bc-link" onclick="navigateTo('${RouteMap[item.link].page}','${item.link}')">${item.label}</span>`);
    }
  });

  bcEl.innerHTML = items.join('') || '<span class="bc-current">首页</span>';
}

/* ===== 左侧菜单展开/收起 ===== */
function toggleMenu(el, key) {
  const sub = document.getElementById('sub-' + key);
  if (!sub) return;
  const isOpen = sub.classList.contains('open');

  document.querySelectorAll('.nav-sub').forEach(s => {
    if (s !== sub) {
      s.classList.remove('open');
      const parentId = s.id.replace('sub-', 'nav-');
      const p = document.getElementById(parentId);
      if (p) p.classList.remove('open', 'active-parent');
    }
  });

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
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active', 'active-parent', 'open'));
  document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.nav-sub').forEach(s => s.classList.remove('open'));
  el.classList.add('active');
  navigateTo('home', 'nav-home');
  showToast('欢迎来到智能外呼中台！', 'success');
}

/* ===== 二级菜单项选择 ===== */
function selectSubMenu(el, menuName) {
  const navId = el.id || findNavIdByText(menuName);
  if (navId === 'report-clue') {
    window.location.href = '../线索报表_v1.0/index.html';
    return;
  }

  document.querySelectorAll('.nav-sub-item').forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active', 'active-parent'));

  el.classList.add('active');
  const sub = el.closest('.nav-sub');
  if (sub) {
    const parentId = sub.id.replace('sub-', 'nav-');
    const parent = document.getElementById(parentId);
    if (parent) parent.classList.add('active-parent');
  }

  // 找到对应的 navId 和 pageKey
  if (navId && RouteMap[navId]) {
    navigateTo(RouteMap[navId].page, navId);
  } else {
    showToast(`「${menuName}」功能正在开发中`, 'info');
  }
}

function findNavIdByText(text) {
  const map = {
    '外呼列表': 'scene-list', '外呼拦截': 'scene-block',
    '通话统计': 'report-call', '计费统计': 'report-billing', '线索统计': 'report-clue',
    '通话记录': 'result-records', '线索记录': 'result-clue',
    '账号管理': 'sys-account', '租户管理': 'sys-tenant',
    '通道管理': 'sys-channel', '业务场景': 'sys-scene'
  };
  return map[text];
}

/* ===== 页面初始化 ===== */
document.addEventListener('DOMContentLoaded', function () {
  // 移除统计分析菜单的初始状态
  const navReport = document.getElementById('nav-report');
  if (navReport) navReport.classList.remove('open', 'active-parent');
  const subReport = document.getElementById('sub-report');
  if (subReport) subReport.classList.remove('open');
  const clueItem = document.getElementById('report-clue');
  if (clueItem) clueItem.classList.remove('active');

  // 清理外呼场景初始状态
  const navScene = document.getElementById('nav-scene');
  if (navScene) navScene.classList.remove('open', 'active-parent');
  const subScene = document.getElementById('sub-scene');
  if (subScene) subScene.classList.remove('open');
  const listItem = document.getElementById('scene-list');
  if (listItem) listItem.classList.remove('active');

  // 默认展开"系统管理"菜单并进入"业务场景"
  const navSystem = document.getElementById('nav-system');
  if (navSystem) navSystem.classList.add('open', 'active-parent');
  const subSystem = document.getElementById('sub-system');
  if (subSystem) subSystem.classList.add('open');
  const sceneItem = document.getElementById('sys-scene');
  if (sceneItem) sceneItem.classList.add('active');

  navigateTo('sys-scene', 'sys-scene');
});
