(function () {
  'use strict';

  var visible = true;
  var activePopup = null;
  var currentAnno = null;
  var dragState = null;
  var observer = null;

  var sectionFields = [
    ['functionName', '功能名称'],
    ['functionDesc', '功能说明'],
    ['permissionScope', '权限范围'],
    ['dataSource', '数据来源'],
    ['valueLogic', '取值逻辑'],
    ['fieldDesc', '字段说明'],
    ['interactionDesc', '交互说明'],
    ['judgeRule', '判断规则'],
    ['exceptionRule', '异常规则'],
    ['otherDesc', '其他说明']
  ];

  function getConfig() {
    return window.AnnotationConfig || {};
  }

  function getPageKey() {
    var cfg = getConfig();
    if (typeof cfg.page === 'function') return cfg.page();
    if (cfg.page) return cfg.page;
    var active = document.querySelector('.nav-sub-item.active');
    return active && active.id ? active.id : 'index';
  }

  function getRawAnnotations() {
    var cfg = getConfig();
    var page = getPageKey();
    if (cfg.dataKey && Array.isArray(window[cfg.dataKey])) {
      return window[cfg.dataKey].filter(function (item) { return item.page === page; });
    }
    if (window.AnnotationData && Array.isArray(window.AnnotationData[page])) {
      return window.AnnotationData[page];
    }
    return [];
  }

  function storageKey() {
    return 'prototype_annotations_' + getPageKey();
  }

  function loadCached() {
    try {
      var raw = window.localStorage.getItem(storageKey());
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveCached(items) {
    try {
      window.localStorage.setItem(storageKey(), JSON.stringify(items));
    } catch (err) {
      showToast('保存到浏览器缓存失败');
    }
  }

  function getAnnotations() {
    var source = getRawAnnotations();
    if (!source.length) return [];
    var cached = loadCached();
    var map = {};
    source.forEach(function (item) { map[item.id] = clone(item); });
    cached.forEach(function (item) { map[item.id] = clone(item); });
    return Object.keys(map).map(function (id) { return map[id]; }).sort(function (a, b) {
      return Number(a.id) - Number(b.id);
    });
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function ensureToggle() {
    var buttons = document.querySelectorAll('#anno-toggle-btn');
    buttons.forEach(function (btn, index) {
      if (index > 0) btn.remove();
    });
    var btn = document.getElementById('anno-toggle-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'anno-toggle-btn';
      btn.type = 'button';
      btn.title = '显示/隐藏标注';
      btn.textContent = '●';
      btn.addEventListener('click', function () {
        visible = !visible;
        btn.classList.toggle('anno-hidden', !visible);
        closePopup();
        render();
      });
      document.body.appendChild(btn);
    }
    placeToggle(btn);
  }

  function placeToggle(btn) {
    var topBar = document.querySelector('.top-bar');
    var sideMenu = document.querySelector('.side-menu, .sidebar, .nav-panel');
    var top = topBar ? topBar.getBoundingClientRect().bottom + 12 : 16;
    var left = sideMenu ? sideMenu.getBoundingClientRect().right + 16 : 16;
    btn.style.top = Math.max(16, top) + 'px';
    btn.style.left = Math.max(16, left) + 'px';
  }

  function ensureOverlay() {
    var overlay = document.getElementById('anno-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'anno-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function render() {
    ensureToggle();
    var overlay = ensureOverlay();
    overlay.innerHTML = '';
    if (!visible) return;
    getAnnotations().forEach(function (anno, index) {
      var target = resolveTarget(anno.target);
      if (!target) return;
      var marker = document.createElement('button');
      marker.type = 'button';
      marker.className = 'anno-marker';
      marker.textContent = anno.id || String(index + 1);
      marker.title = anno.title || '';
      marker.addEventListener('click', function (event) {
        event.stopPropagation();
        openPopup(anno, marker);
      });
      overlay.appendChild(marker);
      positionMarker(marker, target, anno.position);
    });
  }

  function resolveTarget(selector) {
    if (!selector) return null;
    try {
      var nodes = document.querySelectorAll(selector);
      return nodes.length === 1 ? nodes[0] : null;
    } catch (err) {
      return null;
    }
  }

  function positionMarker(marker, target, position) {
    var rect = target.getBoundingClientRect();
    var pos = position || {};
    var placement = pos.placement || 'top-right';
    var x = rect.right;
    var y = rect.top;
    if (placement.indexOf('left') >= 0) x = rect.left;
    if (placement.indexOf('bottom') >= 0) y = rect.bottom;
    if (placement.indexOf('center') >= 0) y = rect.top + rect.height / 2;
    marker.style.left = Math.round(x + Number(pos.offsetX || 0) - 10) + 'px';
    marker.style.top = Math.round(y + Number(pos.offsetY || 0) - 10) + 'px';
  }

  function openPopup(anno, marker) {
    closePopup();
    currentAnno = clone(anno);
    activePopup = document.createElement('div');
    activePopup.className = 'anno-popup';
    activePopup.innerHTML = buildViewHTML(currentAnno);
    document.body.appendChild(activePopup);
    positionPopup(activePopup, marker);
    bindViewEvents();
    bindDrag();
  }

  function positionPopup(popup, marker) {
    var rect = marker.getBoundingClientRect();
    var left = rect.right + 12;
    var top = rect.top;
    if (left + 560 > window.innerWidth - 16) left = window.innerWidth - 576;
    if (top + 360 > window.innerHeight - 16) top = window.innerHeight - 376;
    popup.style.left = Math.max(16, left) + 'px';
    popup.style.top = Math.max(16, top) + 'px';
  }

  function buildViewHTML(anno) {
    return ''
      + '<div class="anno-popup-header">'
      + '  <div class="anno-popup-title">' + escapeHTML(anno.title || '未命名标注') + '</div>'
      + '  <button class="anno-popup-close" type="button" title="关闭">&times;</button>'
      + '</div>'
      + '<div class="anno-popup-body"><div class="anno-popup-desc">' + (anno.desc || generateDesc(anno.sections)) + '</div></div>'
      + '<div class="anno-popup-footer">'
      + '  <button class="anno-btn anno-copy" type="button">复制数据</button>'
      + '  <button class="anno-btn anno-btn-primary anno-edit" type="button">编辑</button>'
      + '</div>';
  }

  function buildEditHTML(anno) {
    var sections = anno.sections || {};
    var fields = sectionFields.map(function (field) {
      return ''
        + '<div class="anno-edit-field">'
        + '  <label class="anno-edit-label">' + field[1] + '</label>'
        + '  <textarea class="anno-edit-textarea" data-section="' + field[0] + '">' + escapeHTML(sections[field[0]] || '') + '</textarea>'
        + '</div>';
    }).join('');
    return ''
      + '<div class="anno-popup-header">'
      + '  <div class="anno-popup-title">编辑标注</div>'
      + '  <button class="anno-popup-close" type="button" title="关闭">&times;</button>'
      + '</div>'
      + '<div class="anno-popup-body">'
      + '  <div class="anno-edit-field">'
      + '    <label class="anno-edit-label">标注标题</label>'
      + '    <input class="anno-edit-input" id="anno-edit-title" value="' + escapeHTML(anno.title || '') + '">'
      + '  </div>'
      + fields
      + '</div>'
      + '<div class="anno-popup-footer">'
      + '  <button class="anno-btn anno-cancel" type="button">取消</button>'
      + '  <button class="anno-btn anno-copy" type="button">复制数据</button>'
      + '  <button class="anno-btn anno-btn-primary anno-save" type="button">保存</button>'
      + '</div>';
  }

  function bindViewEvents() {
    activePopup.querySelector('.anno-popup-close').addEventListener('click', closePopup);
    activePopup.querySelector('.anno-copy').addEventListener('click', copyCurrent);
    activePopup.querySelector('.anno-edit').addEventListener('click', function () {
      activePopup.innerHTML = buildEditHTML(currentAnno);
      bindEditEvents();
      bindDrag();
    });
  }

  function bindEditEvents() {
    activePopup.querySelector('.anno-popup-close').addEventListener('click', closePopup);
    activePopup.querySelector('.anno-cancel').addEventListener('click', function () {
      activePopup.innerHTML = buildViewHTML(currentAnno);
      bindViewEvents();
      bindDrag();
    });
    activePopup.querySelector('.anno-copy').addEventListener('click', copyCurrent);
    activePopup.querySelector('.anno-save').addEventListener('click', saveEdit);
  }

  function saveEdit() {
    currentAnno.title = activePopup.querySelector('#anno-edit-title').value.trim();
    currentAnno.sections = {};
    activePopup.querySelectorAll('[data-section]').forEach(function (field) {
      currentAnno.sections[field.getAttribute('data-section')] = field.value.trim();
    });
    sectionFields.forEach(function (field) {
      if (!(field[0] in currentAnno.sections)) currentAnno.sections[field[0]] = '';
    });
    currentAnno.desc = generateDesc(currentAnno.sections);
    var items = getAnnotations();
    var found = false;
    items = items.map(function (item) {
      if (item.id === currentAnno.id) {
        found = true;
        return clone(currentAnno);
      }
      return item;
    });
    if (!found) items.push(clone(currentAnno));
    saveCached(items);
    activePopup.innerHTML = buildViewHTML(currentAnno);
    bindViewEvents();
    bindDrag();
    showToast('已保存到浏览器缓存');
  }

  function copyCurrent() {
    if (!currentAnno) return;
    copyText(JSON.stringify(currentAnno, null, 2));
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showToast('数据已复制'); });
      return;
    }
    var input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    showToast('数据已复制');
  }

  function bindDrag() {
    var header = activePopup.querySelector('.anno-popup-header');
    header.addEventListener('mousedown', function (event) {
      if (event.target.closest('button')) return;
      var rect = activePopup.getBoundingClientRect();
      dragState = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      event.preventDefault();
    });
  }

  function closePopup() {
    if (activePopup) activePopup.remove();
    activePopup = null;
    currentAnno = null;
    dragState = null;
  }

  function generateDesc(sections) {
    var data = sections || {};
    return sectionFields.map(function (field, index) {
      return (index + 1) + '. ' + field[1] + '：' + escapeHTML(data[field[0]] || '待确认');
    }).join('<br>');
  }

  function escapeHTML(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(text) {
    var old = document.querySelector('.anno-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'anno-toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 1800);
  }

  document.addEventListener('mousemove', function (event) {
    if (!dragState || !activePopup) return;
    var x = Math.max(8, Math.min(event.clientX - dragState.x, window.innerWidth - activePopup.offsetWidth - 8));
    var y = Math.max(8, Math.min(event.clientY - dragState.y, window.innerHeight - activePopup.offsetHeight - 8));
    activePopup.style.left = x + 'px';
    activePopup.style.top = y + 'px';
  });

  document.addEventListener('mouseup', function () {
    dragState = null;
  });

  window.addEventListener('resize', render);
  window.addEventListener('scroll', render, true);

  function observeChanges() {
    var root = document.getElementById('page-content') || document.body;
    observer = new MutationObserver(function (mutations) {
      var shouldRender = mutations.some(function (mutation) {
        var target = mutation.target;
        if (target && target.closest && target.closest('#anno-overlay, #anno-toggle-btn, .anno-popup, .anno-toast')) {
          return false;
        }
        return true;
      });
      if (!shouldRender) return;
      window.clearTimeout(observer._timer);
      observer._timer = window.setTimeout(render, 120);
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  function init() {
    try {
      ensureToggle();
      ensureOverlay();
      render();
      observeChanges();
    } catch (err) {
      console.warn('[AnnotationRuntime] init failed:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AnnotationRuntime = {
    refresh: render,
    getPageKey: getPageKey,
    getAnnotations: getAnnotations,
    close: closePopup
  };
})();
