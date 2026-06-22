/**
 * js/pages/sys-tags.js — 标签管理页面
 * 左侧：供应商→租户类型→场景 三级配置树
 * 右侧：标签列表 CRUD + 复制配置
 * 弹窗：场景配置 CRUD
 */

window.Pages = window.Pages || {};
window.Pages['sys-tags'] = (function() {
  'use strict';

  /* ===== 内部状态 ===== */
  var currentSupplier = '';
  var currentTenantType = '';
  var currentScene = '';
  var promptCallback = null;
  var confirmCallback = null;

  /* ===== 渲染入口 ===== */
  function render() {
    return buildPageHTML();
  }

  function init() {
    bindTreeEvents();
    bindTagEvents();
    bindSceneModalEvents();
    bindCopyModalEvents();
    bindSupplierModalEvents();
    bindPromptModalEvents();
    bindConfirmModalEvents();
    // 默认展开第一个供应商的第一个场景
    autoSelectFirst();
  }

  /* ===== 页面 HTML ===== */
  function buildPageHTML() {
    return '<div class="tags-page" style="flex:1;display:flex;flex-direction:column;height:100%;min-height:0;">' +
      // 顶部工具栏
      buildToolbarHTML() +
      // 主体：左侧树 + 右侧内容
      '<div class="tags-main" style="flex:1;display:flex;min-height:0;overflow:hidden;">' +
        buildTreePanelHTML() +
        buildContentPanelHTML() +
      '</div>' +
      // 弹窗
      buildSceneModalHTML() +
      buildCopyModalHTML() +
      buildSupplierModalHTML() +
      buildPromptModalHTML() +
      buildConfirmModalHTML() +
      // 内联样式
      buildStylesHTML() +
    '</div>';
  }

  /* ===== 工具栏 ===== */
  function buildToolbarHTML() {
    return '<div class="tags-toolbar" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#fff;border-bottom:1px solid #e8e8e8;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<span style="font-size:15px;font-weight:600;">📋 意向标签配置</span>' +
      '</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button class="btn-scene-mgr" style="padding:6px 16px;background:#fff;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:13px;" onclick="window.Pages[\'sys-tags\'].openSceneModal()">⚙ 场景配置</button>' +
        '<button class="btn-supplier-mgr" style="padding:6px 16px;background:#fff;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:13px;" onclick="window.Pages[\'sys-tags\'].openSupplierModal()">🏢 供应商管理</button>' +
      '</div>' +
    '</div>';
  }

  /* ===== 左侧配置树 ===== */
  function buildTreePanelHTML() {
    var html = '<div class="tags-tree-panel" id="tags-tree-panel" style="width:260px;min-width:260px;background:#fafafa;border-right:1px solid #e8e8e8;overflow-y:auto;padding:8px 0;">';
    html += '<div class="tree-header" style="padding:8px 16px;font-size:12px;color:#999;font-weight:500;">配置树</div>';

    MockTagSuppliers.forEach(function(sup) {
      var supHasConfig = checkSupplierHasAnyConfig(sup.id);
      html += '<div class="tree-supplier-group">';
      // 供应商节点
      html += '<div class="tree-node tree-supplier" data-supplier="' + sup.id + '" style="display:flex;align-items:center;padding:6px 16px;cursor:pointer;font-size:13px;user-select:none;">';
      html += '<span class="tree-arrow" style="display:inline-flex;width:16px;font-size:10px;color:#999;transition:transform 0.2s;">▸</span>';
      html += '<span class="tree-icon" style="margin-right:6px;">🔵</span>';
      html += '<span class="tree-label" style="color:#333;font-weight:500;">' + escapeHTML(sup.name) + '</span>';
      html += '</div>';
      // 子节点容器
      html += '<div class="tree-children" style="display:none;">';

      MockTenantTypes.forEach(function(tt) {
        html += '<div class="tree-tenant-group">';
        html += '<div class="tree-node tree-tenant" data-supplier="' + sup.id + '" data-tenant="' + tt.id + '" style="display:flex;align-items:center;padding:6px 16px 6px 40px;cursor:pointer;font-size:13px;user-select:none;">';
        html += '<span class="tree-arrow" style="display:inline-flex;width:16px;font-size:10px;color:#999;transition:transform 0.2s;">▸</span>';
        html += '<span class="tree-icon" style="margin-right:6px;">📁</span>';
        html += '<span class="tree-label" style="color:#555;">' + tt.name + '</span>';
        html += '</div>';
        html += '<div class="tree-children" style="display:none;">';

        MockTagScenes.forEach(function(sc) {
          var configKey = sup.id + '_' + tt.id + '_' + sc.id;
          var hasConfig = !!MockTagConfigs[configKey];
          var dotColor = hasConfig ? '#52c41a' : '#d9d9d9';
          html += '<div class="tree-node tree-scene leaf" data-supplier="' + sup.id + '" data-tenant="' + tt.id + '" data-scene="' + sc.id + '" style="display:flex;align-items:center;padding:5px 16px 5px 64px;cursor:pointer;font-size:13px;user-select:none;border-radius:0;">';
          html += '<span class="tree-dot" style="width:7px;height:7px;border-radius:50%;background:' + dotColor + ';margin-right:8px;flex-shrink:0;"></span>';
          html += '<span class="tree-label" style="color:#555;">' + escapeHTML(sc.name) + '</span>';
          html += '</div>';
        });

        html += '</div></div>';
      });

      html += '</div></div>';
    });

    html += '</div>';
    return html;
  }

  /* ===== 右侧内容面板 ===== */
  function buildContentPanelHTML() {
    return '<div class="tags-content-panel" id="tags-content-panel" style="flex:1;display:flex;flex-direction:column;min-height:0;overflow-y:auto;background:#fff;padding:20px 24px;">' +
      buildEmptyStateHTML() +
    '</div>';
  }

  function buildEmptyStateHTML() {
    return '<div class="tags-empty-state" id="tags-empty-state" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#999;">' +
      '<div style="font-size:48px;margin-bottom:16px;opacity:0.5;">📋</div>' +
      '<div style="font-size:15px;font-weight:500;margin-bottom:8px;">请选择配置节点</div>' +
      '<div style="font-size:13px;color:#bbb;">在左侧配置树中点击场景节点，查看或编辑标签配置</div>' +
    '</div>';
  }

  function buildTagListHTML(supplierId, tenantType, sceneId) {
    var configData = getTagConfig(supplierId, tenantType, sceneId);
    var supplier = findSupplier(supplierId);
    var tenant = findTenantType(tenantType);
    var scene = findScene(sceneId);
    var enabledIds = configData.enabledTagIds;

    var html = '<div id="tags-detail-area" style="flex:1;display:flex;flex-direction:column;min-height:0;">';

    // 标题区
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">';
    html += '<div>';
    html += '<span style="font-size:14px;color:#999;">' + supplier.name + ' / ' + tenant.name + ' / </span>';
    html += '<span style="font-size:15px;font-weight:600;color:#333;">' + scene.name + '</span>';
    html += '<span style="margin-left:10px;font-size:12px;color:#52c41a;">● 已配置 ' + enabledIds.length + ' 个标签</span>';
    html += '</div>';
    html += '<div style="display:flex;gap:8px;">';
    html += '<button class="btn-copy-config" style="padding:6px 14px;background:#fff;border:1px solid #1677ff;color:#1677ff;border-radius:4px;cursor:pointer;font-size:13px;">📋 复制配置</button>';
    html += '<button class="btn-add-tag" style="padding:6px 14px;background:#1677ff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">+ 新增标签</button>';
    html += '</div>';
    html += '</div>';

    // 提示：当前显示的标签来自供应商标签池
    html += '<div style="padding:8px 12px;background:#fffbe6;border:1px solid #ffe58f;border-radius:4px;margin-bottom:12px;font-size:12px;color:#ad8b00;">';
    html += '💡 以下为供应商 <b>' + supplier.name + '</b> 的标签池。<b style="color:#52c41a;">绿色勾选</b> 表示当前组合已启用该标签，点击行可切换启用状态。';
    html += '</div>';

    // 标签表格
    html += '<div style="flex:1;overflow-y:auto;">';
    html += '<table class="data-table" style="width:100%;border-collapse:collapse;">';
    html += '<thead><tr>';
    html += '<th style="width:50px;text-align:center;">启用</th>';
    html += '<th style="width:60px;">序号</th>';
    html += '<th>标签名称</th>';
    html += '<th style="width:100px;">排序</th>';
    html += '<th style="width:120px;">操作</th>';
    html += '</tr></thead>';
    html += '<tbody id="tags-table-body">';

    configData.tags.forEach(function(tag, idx) {
      var isEnabled = configData.enabledSet[tag.id];
      html += '<tr class="tag-row" data-tag-id="' + tag.id + '" style="' + (isEnabled ? '' : 'opacity:0.5;') + '">';
      html += '<td style="text-align:center;">';
      html += '<input type="checkbox" class="tag-enable-cb" data-tag-id="' + tag.id + '" ' + (isEnabled ? 'checked' : '') + ' style="cursor:pointer;width:16px;height:16px;">';
      html += '</td>';
      html += '<td style="color:#999;">' + (idx + 1) + '</td>';
      html += '<td>';
      html += '<span class="tag-name-display">' + escapeHTML(tag.name) + '</span>';
      html += '<input type="text" class="tag-name-input" value="' + escapeHTML(tag.name) + '" style="display:none;width:100%;padding:4px 8px;border:1px solid #d9d9d9;border-radius:4px;font-size:13px;">';
      html += '</td>';
      html += '<td style="color:#999;">' + tag.sort + '</td>';
      html += '<td>';
      html += '<button class="btn-tag-edit" data-tag-id="' + tag.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✏ 编辑</button>';
      html += '<button class="btn-tag-save" data-tag-id="' + tag.id + '" style="display:none;padding:3px 10px;font-size:12px;border:1px solid #52c41a;background:#52c41a;color:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✓ 保存</button>';
      html += '<button class="btn-tag-cancel" data-tag-id="' + tag.id + '" style="display:none;padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✕ 取消</button>';
      html += '<button class="btn-tag-delete" data-tag-id="' + tag.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #ff4d4f;color:#ff4d4f;background:#fff;border-radius:3px;cursor:pointer;">🗑 删除</button>';
      html += '</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  /* ===== 弹窗 HTML ===== */

  function buildSceneModalHTML() {
    var html = '<div class="modal-overlay" id="scene-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;">';
    html += '<div class="modal-content" style="background:#fff;border-radius:8px;width:520px;max-height:70vh;display:flex;flex-direction:column;box-shadow:0 4px 24px rgba(0,0,0,0.15);">';
    html += '<div class="modal-header" style="padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">';
    html += '<span style="font-size:16px;font-weight:600;">⚙ 场景配置</span>';
    html += '<button class="btn-close-modal" onclick="window.Pages[\'sys-tags\'].closeSceneModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#999;padding:0;">✕</button>';
    html += '</div>';
    html += '<div class="modal-body" id="scene-modal-body" style="flex:1;overflow-y:auto;padding:20px;">';
    html += buildSceneTableHTML();
    html += '</div>';
    html += '<div class="modal-footer" style="padding:12px 20px;border-top:1px solid #f0f0f0;text-align:right;">';
    html += '<button class="btn-add-scene" style="padding:6px 16px;background:#1677ff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">+ 新增场景</button>';
    html += '</div>';
    html += '</div></div>';
    return html;
  }

  function buildSceneTableHTML() {
    var html = '<table class="data-table" style="width:100%;border-collapse:collapse;">';
    html += '<thead><tr><th style="width:60px;">序号</th><th>场景名称</th><th style="width:80px;">状态</th><th style="width:100px;">操作</th></tr></thead>';
    html += '<tbody>';
    MockTagScenes.forEach(function(sc, idx) {
      var statusColor = sc.status === 'enabled' ? '#52c41a' : '#d9d9d9';
      var statusText = sc.status === 'enabled' ? '启用' : '停用';
      html += '<tr data-scene-id="' + sc.id + '">';
      html += '<td style="color:#999;">' + (idx + 1) + '</td>';
      html += '<td><span class="scene-name-display">' + escapeHTML(sc.name) + '</span>';
      html += '<input type="text" class="scene-name-input" value="' + escapeHTML(sc.name) + '" style="display:none;width:100%;padding:4px 8px;border:1px solid #d9d9d9;border-radius:4px;font-size:13px;"></td>';
      html += '<td><span style="color:' + statusColor + ';">● ' + statusText + '</span></td>';
      html += '<td>';
      html += '<button class="btn-scene-edit" data-scene-id="' + sc.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✏</button>';
      html += '<button class="btn-scene-save" data-scene-id="' + sc.id + '" style="display:none;padding:3px 10px;font-size:12px;background:#52c41a;color:#fff;border:none;border-radius:3px;cursor:pointer;margin-right:4px;">✓</button>';
      html += '<button class="btn-scene-cancel" data-scene-id="' + sc.id + '" style="display:none;padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✕</button>';
      html += '<button class="btn-scene-toggle" data-scene-id="' + sc.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #faad14;color:#faad14;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">' + (sc.status === 'enabled' ? '停用' : '启用') + '</button>';
      html += '<button class="btn-scene-delete" data-scene-id="' + sc.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #ff4d4f;color:#ff4d4f;background:#fff;border-radius:3px;cursor:pointer;">🗑</button>';
      html += '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
  }

  function buildCopyModalHTML() {
    var html = '<div class="modal-overlay" id="copy-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;">';
    html += '<div class="modal-content" style="background:#fff;border-radius:8px;width:460px;box-shadow:0 4px 24px rgba(0,0,0,0.15);">';
    html += '<div class="modal-header" style="padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">';
    html += '<span style="font-size:16px;font-weight:600;">📋 复制配置到其他节点</span>';
    html += '<button onclick="window.Pages[\'sys-tags\'].closeCopyModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#999;padding:0;">✕</button>';
    html += '</div>';
    html += '<div class="modal-body" id="copy-modal-body" style="padding:20px;">';
    html += '<div style="margin-bottom:12px;font-size:13px;color:#666;">选择目标节点（可多选），将当前标签配置复制到所选节点：</div>';
    html += '<div id="copy-target-list" style="max-height:300px;overflow-y:auto;border:1px solid #e8e8e8;border-radius:4px;padding:8px;"></div>';
    html += '</div>';
    html += '<div class="modal-footer" style="padding:12px 20px;border-top:1px solid #f0f0f0;text-align:right;">';
    html += '<button onclick="window.Pages[\'sys-tags\'].closeCopyModal()" style="padding:6px 16px;background:#fff;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:13px;margin-right:8px;">取消</button>';
    html += '<button class="btn-copy-confirm" style="padding:6px 16px;background:#1677ff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">确认复制</button>';
    html += '</div>';
    html += '</div></div>';
    return html;
  }

  function buildSupplierModalHTML() {
    var html = '<div class="modal-overlay" id="supplier-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;">';
    html += '<div class="modal-content" style="background:#fff;border-radius:8px;width:500px;max-height:70vh;display:flex;flex-direction:column;box-shadow:0 4px 24px rgba(0,0,0,0.15);">';
    html += '<div class="modal-header" style="padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">';
    html += '<span style="font-size:16px;font-weight:600;">🏢 供应商管理</span>';
    html += '<button onclick="window.Pages[\'sys-tags\'].closeSupplierModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#999;padding:0;">✕</button>';
    html += '</div>';
    html += '<div class="modal-body" id="supplier-modal-body" style="flex:1;overflow-y:auto;padding:20px;">';
    html += buildSupplierTableHTML();
    html += '</div>';
    html += '<div class="modal-footer" style="padding:12px 20px;border-top:1px solid #f0f0f0;text-align:right;">';
    html += '<button class="btn-add-supplier" style="padding:6px 16px;background:#1677ff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">+ 新增供应商</button>';
    html += '</div>';
    html += '</div></div>';
    return html;
  }

  function buildSupplierTableHTML() {
    var html = '<table class="data-table" style="width:100%;border-collapse:collapse;">';
    html += '<thead><tr><th style="width:60px;">序号</th><th>供应商名称</th><th style="width:60px;">标签数</th><th style="width:80px;">状态</th><th style="width:100px;">操作</th></tr></thead>';
    html += '<tbody>';
    MockTagSuppliers.forEach(function(sp, idx) {
      var tagCount = (MockSupplierTagPool[sp.id] || []).length;
      var statusColor = sp.status === 'enabled' ? '#52c41a' : '#d9d9d9';
      var statusText = sp.status === 'enabled' ? '启用' : '停用';
      html += '<tr data-supplier-id="' + sp.id + '">';
      html += '<td style="color:#999;">' + (idx + 1) + '</td>';
      html += '<td><span class="spl-name-display">' + escapeHTML(sp.name) + '</span>';
      html += '<input type="text" class="spl-name-input" value="' + escapeHTML(sp.name) + '" style="display:none;width:100%;padding:4px 8px;border:1px solid #d9d9d9;border-radius:4px;font-size:13px;"></td>';
      html += '<td style="color:#999;">' + tagCount + '</td>';
      html += '<td><span style="color:' + statusColor + ';">● ' + statusText + '</span></td>';
      html += '<td>';
      html += '<button class="btn-spl-edit" data-supplier-id="' + sp.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✏</button>';
      html += '<button class="btn-spl-save" data-supplier-id="' + sp.id + '" style="display:none;padding:3px 10px;font-size:12px;background:#52c41a;color:#fff;border:none;border-radius:3px;cursor:pointer;margin-right:4px;">✓</button>';
      html += '<button class="btn-spl-cancel" data-supplier-id="' + sp.id + '" style="display:none;padding:3px 10px;font-size:12px;border:1px solid #d9d9d9;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">✕</button>';
      html += '<button class="btn-spl-toggle" data-supplier-id="' + sp.id + '" style="padding:3px 10px;font-size:12px;border:1px solid #faad14;color:#faad14;background:#fff;border-radius:3px;cursor:pointer;margin-right:4px;">' + (sp.status === 'enabled' ? '停用' : '启用') + '</button>';
      html += '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
  }

  /* ===== 通用 Input 弹窗（替代 prompt） ===== */
  function buildPromptModalHTML() {
    return '<div class="modal-overlay" id="prompt-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:1100;align-items:center;justify-content:center;">' +
      '<div class="modal-content" style="background:#fff;border-radius:8px;width:400px;box-shadow:0 4px 24px rgba(0,0,0,0.15);">' +
        '<div class="modal-header" style="padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">' +
          '<span id="prompt-modal-title" style="font-size:15px;font-weight:600;">输入</span>' +
          '<button onclick="window.Pages[\'sys-tags\'].closePromptModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:#999;padding:0;">✕</button>' +
        '</div>' +
        '<div style="padding:20px;">' +
          '<input type="text" id="prompt-modal-input" style="width:100%;padding:8px 12px;border:1px solid #d9d9d9;border-radius:4px;font-size:14px;box-sizing:border-box;" placeholder="">' +
          '<div id="prompt-modal-error" style="color:#ff4d4f;font-size:12px;margin-top:6px;display:none;"></div>' +
        '</div>' +
        '<div style="padding:12px 20px;border-top:1px solid #f0f0f0;text-align:right;">' +
          '<button class="btn-prompt-cancel" style="padding:6px 16px;background:#fff;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:13px;margin-right:8px;">取消</button>' +
          '<button class="btn-prompt-confirm" style="padding:6px 16px;background:#1677ff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">确认</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ===== 通用 Confirm 弹窗（替代 confirm） ===== */
  function buildConfirmModalHTML() {
    return '<div class="modal-overlay" id="confirm-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:1100;align-items:center;justify-content:center;">' +
      '<div class="modal-content" style="background:#fff;border-radius:8px;width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.15);">' +
        '<div class="modal-header" style="padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">' +
          '<span id="confirm-modal-title" style="font-size:15px;font-weight:600;">确认操作</span>' +
          '<button onclick="window.Pages[\'sys-tags\'].closeConfirmModal(false)" style="background:none;border:none;font-size:18px;cursor:pointer;color:#999;padding:0;">✕</button>' +
        '</div>' +
        '<div style="padding:20px;">' +
          '<div style="display:flex;align-items:flex-start;gap:12px;">' +
            '<span style="font-size:22px;flex-shrink:0;">⚠️</span>' +
            '<span id="confirm-modal-msg" style="font-size:14px;color:#333;line-height:1.6;"></span>' +
          '</div>' +
        '</div>' +
        '<div style="padding:12px 20px;border-top:1px solid #f0f0f0;text-align:right;">' +
          '<button class="btn-confirm-cancel" style="padding:6px 16px;background:#fff;border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:13px;margin-right:8px;">取消</button>' +
          '<button class="btn-confirm-ok" style="padding:6px 16px;background:#ff4d4f;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;">确认删除</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ===== 内联样式 ===== */
  function buildStylesHTML() {
    return '<style>' +
      '.tree-node:hover { background: #e6f7ff; }' +
      '.tree-node.selected { background: #bae7ff !important; }' +
      '.tree-node.selected .tree-label { color: #1677ff !important; font-weight:600; }' +
      '.tree-node.tree-supplier.expanded .tree-arrow { transform: rotate(90deg); }' +
      '.tree-node.tree-tenant.expanded .tree-arrow { transform: rotate(90deg); }' +
      '.tag-row:hover { background: #fafafa; }' +
      '.modal-overlay.show { display: flex !important; }' +
      '.btn-tag-delete:hover { background: #fff1f0 !important; }' +
    '</style>';
  }

  /* ===== 树事件绑定 ===== */
  function bindTreeEvents() {
    var treePanel = document.getElementById('tags-tree-panel');
    if (!treePanel) return;

    treePanel.addEventListener('click', function(e) {
      var node = e.target.closest('.tree-node');
      if (!node) return;

      // 供应商节点：展开/折叠
      if (node.classList.contains('tree-supplier')) {
        toggleTreeNode(node);
        return;
      }

      // 租户节点：展开/折叠
      if (node.classList.contains('tree-tenant')) {
        toggleTreeNode(node);
        return;
      }

      // 场景节点：选中并加载标签
      if (node.classList.contains('tree-scene')) {
        selectSceneNode(node);
      }
    });
  }

  function toggleTreeNode(node) {
    var children = node.nextElementSibling;
    if (!children || !children.classList.contains('tree-children')) return;
    var isHidden = children.style.display === 'none';
    children.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      node.classList.add('expanded');
    } else {
      node.classList.remove('expanded');
    }
  }

  function selectSceneNode(node) {
    var supplierId = node.getAttribute('data-supplier');
    var tenantType = node.getAttribute('data-tenant');
    var sceneId = node.getAttribute('data-scene');

    currentSupplier = supplierId;
    currentTenantType = tenantType;
    currentScene = sceneId;

    // 高亮
    var panel = document.getElementById('tags-tree-panel');
    if (panel) {
      panel.querySelectorAll('.tree-node').forEach(function(n) { n.classList.remove('selected'); });
    }
    node.classList.add('selected');

    // 展开路径
    expandPath(node);

    // 加载右侧标签列表
    loadTagList(supplierId, tenantType, sceneId);

    // 更新面包屑
    updatePageBreadcrumb();
  }

  function expandPath(sceneNode) {
    // 向上展开所有父节点
    var parent = sceneNode.parentElement;
    while (parent) {
      if (parent.classList.contains('tree-children')) {
        parent.style.display = 'block';
        var prevNode = parent.previousElementSibling;
        if (prevNode && prevNode.classList.contains('tree-node')) {
          prevNode.classList.add('expanded');
        }
      }
      parent = parent.parentElement;
    }
  }

  function updatePageBreadcrumb() {
    if (!currentSupplier) return;
    var supplier = findSupplier(currentSupplier);
    var tenant = findTenantType(currentTenantType);
    var scene = findScene(currentScene);
    var bcEl = document.getElementById('breadcrumb');
    if (!bcEl) return;
    var label = (supplier ? supplier.name : '') + ' / ' +
                (tenant ? tenant.name : '') + ' / ' +
                (scene ? scene.name : '');
    bcEl.innerHTML = '<span class="bc-link" onclick="navigateTo(\'sys-scene\',\'sys-scene\')">系统管理</span>' +
                     '<span class="bc-sep">/</span>' +
                     '<span class="bc-current">标签管理</span>';
  }

  /* ===== 标签列表加载 ===== */
  function loadTagList(supplierId, tenantType, sceneId) {
    var panel = document.getElementById('tags-content-panel');
    if (!panel) return;
    panel.innerHTML = buildTagListHTML(supplierId, tenantType, sceneId);
    bindTagEvents();
  }

  /* ===== 标签事件绑定 ===== */
  function bindTagEvents() {
    var panel = document.getElementById('tags-content-panel');
    if (!panel) return;

    // 启用勾选
    panel.querySelectorAll('.tag-enable-cb').forEach(function(cb) {
      cb.addEventListener('change', function() {
        toggleTagEnable(cb.getAttribute('data-tag-id'), cb.checked);
      });
    });

    // 编辑
    panel.querySelectorAll('.btn-tag-edit').forEach(function(btn) {
      btn.addEventListener('click', function() {
        enterEditMode(btn.getAttribute('data-tag-id'));
      });
    });

    // 保存
    panel.querySelectorAll('.btn-tag-save').forEach(function(btn) {
      btn.addEventListener('click', function() {
        saveTagEdit(btn.getAttribute('data-tag-id'));
      });
    });

    // 取消
    panel.querySelectorAll('.btn-tag-cancel').forEach(function(btn) {
      btn.addEventListener('click', function() {
        cancelTagEdit(btn.getAttribute('data-tag-id'));
      });
    });

    // 删除
    panel.querySelectorAll('.btn-tag-delete').forEach(function(btn) {
      btn.addEventListener('click', function() {
        deleteTag(btn.getAttribute('data-tag-id'));
      });
    });

    // 新增标签
    var addBtn = panel.querySelector('.btn-add-tag');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        addNewTag();
      });
    }

    // 复制配置
    var copyBtn = panel.querySelector('.btn-copy-config');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        openCopyModal();
      });
    }
  }

  /* ===== 标签 CRUD ===== */

  function toggleTagEnable(tagId, checked) {
    if (!currentSupplier || !currentTenantType || !currentScene) return;
    var configKey = currentSupplier + '_' + currentTenantType + '_' + currentScene;
    var config = MockTagConfigs[configKey];
    if (!config) {
      config = { enabledTagIds: [] };
      MockTagConfigs[configKey] = config;
    }
    if (checked) {
      if (config.enabledTagIds.indexOf(tagId) === -1) {
        config.enabledTagIds.push(tagId);
      }
      showToast('标签已启用', 'success');
    } else {
      config.enabledTagIds = config.enabledTagIds.filter(function(id) { return id !== tagId; });
      showToast('标签已停用', 'info');
    }
    // 更新行样式
    refreshTagRowStyle(tagId, checked);
    // 更新树节点指示器
    refreshTreeNodeDot();
    // 更新标题计数
    refreshTagCount();
  }

  function refreshTagRowStyle(tagId, enabled) {
    var row = document.querySelector('.tag-row[data-tag-id="' + tagId + '"]');
    if (row) {
      row.style.opacity = enabled ? '1' : '0.5';
    }
  }

  function refreshTagCount() {
    if (!currentSupplier || !currentTenantType || !currentScene) return;
    var configKey = currentSupplier + '_' + currentTenantType + '_' + currentScene;
    var config = MockTagConfigs[configKey];
    var count = config ? config.enabledTagIds.length : 0;
    var detailArea = document.getElementById('tags-detail-area');
    if (detailArea) {
      var statusSpan = detailArea.querySelector('span[style*="color:#52c41a"]');
      if (statusSpan) {
        statusSpan.textContent = '● 已配置 ' + count + ' 个标签';
      }
    }
  }

  function refreshTreeNodeDot() {
    if (!currentSupplier || !currentTenantType || !currentScene) return;
    var configKey = currentSupplier + '_' + currentTenantType + '_' + currentScene;
    var hasConfig = !!MockTagConfigs[configKey];
    var panel = document.getElementById('tags-tree-panel');
    if (!panel) return;
    var node = panel.querySelector('.tree-scene[data-supplier="' + currentSupplier + '"][data-tenant="' + currentTenantType + '"][data-scene="' + currentScene + '"]');
    if (node) {
      var dot = node.querySelector('.tree-dot');
      if (dot) {
        dot.style.background = hasConfig ? '#52c41a' : '#d9d9d9';
      }
    }
  }

  function enterEditMode(tagId) {
    var row = document.querySelector('.tag-row[data-tag-id="' + tagId + '"]');
    if (!row) return;
    row.querySelector('.tag-name-display').style.display = 'none';
    row.querySelector('.tag-name-input').style.display = 'inline-block';
    row.querySelector('.btn-tag-edit').style.display = 'none';
    row.querySelector('.btn-tag-delete').style.display = 'none';
    row.querySelector('.btn-tag-save').style.display = 'inline-block';
    row.querySelector('.btn-tag-cancel').style.display = 'inline-block';
    row.querySelector('.tag-name-input').focus();
  }

  function saveTagEdit(tagId) {
    var row = document.querySelector('.tag-row[data-tag-id="' + tagId + '"]');
    if (!row) return;
    var input = row.querySelector('.tag-name-input');
    var newName = input.value.trim();
    if (!newName) {
      showToast('标签名称不能为空', 'error');
      return;
    }
    // 更新数据
    updateTagInPool(currentSupplier, tagId, 'name', newName);
    // 更新显示
    row.querySelector('.tag-name-display').textContent = newName;
    exitEditMode(row);
    showToast('标签已更新', 'success');
  }

  function cancelTagEdit(tagId) {
    var row = document.querySelector('.tag-row[data-tag-id="' + tagId + '"]');
    if (!row) return;
    var input = row.querySelector('.tag-name-input');
    input.value = row.querySelector('.tag-name-display').textContent;
    exitEditMode(row);
  }

  function exitEditMode(row) {
    row.querySelector('.tag-name-display').style.display = '';
    row.querySelector('.tag-name-input').style.display = 'none';
    row.querySelector('.btn-tag-edit').style.display = '';
    row.querySelector('.btn-tag-delete').style.display = '';
    row.querySelector('.btn-tag-save').style.display = 'none';
    row.querySelector('.btn-tag-cancel').style.display = 'none';
  }

  function updateTagInPool(supplierId, tagId, field, value) {
    var pool = MockSupplierTagPool[supplierId];
    if (!pool) return;
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id === tagId) {
        pool[i][field] = value;
        return;
      }
    }
  }

  function deleteTag(tagId) {
    if (!currentSupplier) return;
    // 检查是否被其他配置引用
    var usedIn = [];
    Object.keys(MockTagConfigs).forEach(function(key) {
      if (key.indexOf(currentSupplier) === 0) {
        var cfg = MockTagConfigs[key];
        if (cfg.enabledTagIds.indexOf(tagId) !== -1) {
          usedIn.push(key);
        }
      }
    });
    var msg = usedIn.length > 0
      ? '该标签在 ' + usedIn.length + ' 个配置中处于启用状态，删除后将从所有配置中移除。'
      : '确认删除该标签？此操作不可恢复。';
    showConfirmModal('删除标签', msg, function(confirmed) {
      if (!confirmed) return;
      // 从标签池中删除
      var pool = MockSupplierTagPool[currentSupplier];
      MockSupplierTagPool[currentSupplier] = pool.filter(function(t) { return t.id !== tagId; });
      // 从所有配置中移除
      Object.keys(MockTagConfigs).forEach(function(key) {
        if (key.indexOf(currentSupplier) === 0) {
          var cfg = MockTagConfigs[key];
          cfg.enabledTagIds = cfg.enabledTagIds.filter(function(id) { return id !== tagId; });
        }
      });
      showToast('标签已删除', 'success');
      loadTagList(currentSupplier, currentTenantType, currentScene);
    });
  }

  function addNewTag() {
    if (!currentSupplier) {
      showToast('请先在左侧选择一个场景节点', 'info');
      return;
    }
    var pool = MockSupplierTagPool[currentSupplier];
    showPromptModal('新增标签', '请输入新标签名称', function(value) {
      // 校验重名
      var exists = pool.some(function(t) { return t.name === value; });
      if (exists) return '标签名称已存在';
      return null; // 通过
    }, function(name) {
      var maxSort = 0;
      pool.forEach(function(t) { if (t.sort > maxSort) maxSort = t.sort; });
      var newTag = {
        id: currentSupplier + '_' + Date.now(),
        name: name,
        sort: maxSort + 1,
        platformTagId: null
      };
      pool.push(newTag);
      showToast('标签已添加', 'success');
      loadTagList(currentSupplier, currentTenantType, currentScene);
    });
  }

  /* ===== 场景弹窗 ===== */
  function bindSceneModalEvents() {
    var overlay = document.getElementById('scene-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSceneModal();
    });

    // 编辑
    overlay.querySelectorAll('.btn-scene-edit').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-scene-id');
        enterSceneEditMode(sid);
      });
    });

    // 保存
    overlay.querySelectorAll('.btn-scene-save').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-scene-id');
        saveSceneEdit(sid);
      });
    });

    // 取消
    overlay.querySelectorAll('.btn-scene-cancel').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-scene-id');
        cancelSceneEdit(sid);
      });
    });

    // 启用/停用
    overlay.querySelectorAll('.btn-scene-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-scene-id');
        toggleSceneStatus(sid);
      });
    });

    // 删除
    overlay.querySelectorAll('.btn-scene-delete').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-scene-id');
        deleteScene(sid);
      });
    });

    // 新增
    var addBtn = overlay.querySelector('.btn-add-scene');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        addNewScene();
      });
    }
  }

  function enterSceneEditMode(sceneId) {
    var row = document.querySelector('#scene-modal-body tr[data-scene-id="' + sceneId + '"]');
    if (!row) return;
    row.querySelector('.scene-name-display').style.display = 'none';
    row.querySelector('.scene-name-input').style.display = 'inline-block';
    row.querySelector('.btn-scene-edit').style.display = 'none';
    row.querySelector('.btn-scene-toggle').style.display = 'none';
    row.querySelector('.btn-scene-delete').style.display = 'none';
    row.querySelector('.btn-scene-save').style.display = 'inline-block';
    row.querySelector('.btn-scene-cancel').style.display = 'inline-block';
    row.querySelector('.scene-name-input').focus();
  }

  function saveSceneEdit(sceneId) {
    var row = document.querySelector('#scene-modal-body tr[data-scene-id="' + sceneId + '"]');
    if (!row) return;
    var input = row.querySelector('.scene-name-input');
    var newName = input.value.trim();
    if (!newName) {
      showToast('场景名称不能为空', 'error');
      return;
    }
    var scene = findScene(sceneId);
    if (scene) scene.name = newName;
    row.querySelector('.scene-name-display').textContent = newName;
    exitSceneEditMode(row);
    showToast('场景已更新', 'success');
    // 刷新树
    refreshTreePanel();
  }

  function cancelSceneEdit(sceneId) {
    var row = document.querySelector('#scene-modal-body tr[data-scene-id="' + sceneId + '"]');
    if (!row) return;
    var input = row.querySelector('.scene-name-input');
    input.value = row.querySelector('.scene-name-display').textContent;
    exitSceneEditMode(row);
  }

  function exitSceneEditMode(row) {
    row.querySelector('.scene-name-display').style.display = '';
    row.querySelector('.scene-name-input').style.display = 'none';
    row.querySelector('.btn-scene-edit').style.display = '';
    row.querySelector('.btn-scene-toggle').style.display = '';
    row.querySelector('.btn-scene-delete').style.display = '';
    row.querySelector('.btn-scene-save').style.display = 'none';
    row.querySelector('.btn-scene-cancel').style.display = 'none';
  }

  function toggleSceneStatus(sceneId) {
    var scene = findScene(sceneId);
    if (!scene) return;
    scene.status = scene.status === 'enabled' ? 'disabled' : 'enabled';
    // 刷新弹窗表格
    refreshSceneModalBody();
    refreshTreePanel();
    showToast('场景状态已更新', 'success');
  }

  function deleteScene(sceneId) {
    // 检查是否被配置引用
    var usedIn = [];
    Object.keys(MockTagConfigs).forEach(function(key) {
      if (key.indexOf('_' + sceneId) === key.length - sceneId.length - 1 || key.indexOf('_' + sceneId) > 0) {
        if (key.split('_').pop() === sceneId) usedIn.push(key);
      }
    });
    if (usedIn.length > 0) {
      showToast('该场景下有 ' + usedIn.length + ' 个配置，请先清空配置后再删除', 'error');
      return;
    }
    showConfirmModal('删除场景', '确认删除该场景？此操作不可恢复。', function(confirmed) {
      if (!confirmed) return;
      MockTagScenes = MockTagScenes.filter(function(s) { return s.id !== sceneId; });
      refreshSceneModalBody();
      refreshTreePanel();
      // 如果当前选中的是这个场景，清空右侧面板
      if (currentScene === sceneId) {
        resetContentPanel();
      }
      showToast('场景已删除', 'success');
    });
  }

  function addNewScene() {
    showPromptModal('新增场景', '请输入新场景名称', function(value) {
      var exists = MockTagScenes.some(function(s) { return s.name === value; });
      if (exists) return '场景名称已存在';
      return null;
    }, function(name) {
      var newId = 'sc_' + Date.now();
      MockTagScenes.push({ id: newId, name: name, status: 'enabled' });
      refreshSceneModalBody();
      refreshTreePanel();
      showToast('场景已添加', 'success');
    });
  }

  function refreshSceneModalBody() {
    var body = document.getElementById('scene-modal-body');
    if (body) body.innerHTML = buildSceneTableHTML();
    bindSceneModalEvents();
  }

  function refreshTreePanel() {
    var panel = document.getElementById('tags-tree-panel');
    if (!panel) return;
    var panelParent = panel.parentElement;
    var container = panelParent;
    // 重建树面板
    panel.outerHTML = buildTreePanelHTML();
    bindTreeEvents();
    // 恢复选中状态
    restoreSelection();
  }

  function restoreSelection() {
    if (currentSupplier && currentTenantType && currentScene) {
      var node = document.querySelector('.tree-scene[data-supplier="' + currentSupplier + '"][data-tenant="' + currentTenantType + '"][data-scene="' + currentScene + '"]');
      if (node) selectSceneNode(node);
    }
  }

  function resetContentPanel() {
    var panel = document.getElementById('tags-content-panel');
    if (!panel) return;
    currentSupplier = '';
    currentTenantType = '';
    currentScene = '';
    panel.innerHTML = buildEmptyStateHTML();
  }

  /* ===== 复制配置弹窗 ===== */
  function openCopyModal() {
    var overlay = document.getElementById('copy-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('show');
    buildCopyTargetList();
  }

  function buildCopyTargetList() {
    var list = document.getElementById('copy-target-list');
    if (!list) return;
    var html = '';
    MockTagSuppliers.forEach(function(sup) {
      html += '<div style="padding:6px 8px;font-weight:600;font-size:13px;color:#333;">' + escapeHTML(sup.name) + '</div>';
      MockTenantTypes.forEach(function(tt) {
        MockTagScenes.forEach(function(sc) {
          // 排除当前选中的节点
          if (sup.id === currentSupplier && tt.id === currentTenantType && sc.id === currentScene) return;
          var cfgKey = sup.id + '_' + tt.id + '_' + sc.id;
          html += '<label style="display:flex;align-items:center;padding:4px 8px 4px 24px;cursor:pointer;font-size:13px;">';
          html += '<input type="checkbox" class="copy-target-cb" value="' + cfgKey + '" style="margin-right:8px;">';
          html += tt.name + ' / ' + sc.name;
          html += '</label>';
        });
      });
    });
    list.innerHTML = html || '<div style="padding:12px;color:#999;text-align:center;">无可用目标节点</div>';
  }

  function bindCopyModalEvents() {
    var overlay = document.getElementById('copy-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeCopyModal();
    });

    var confirmBtn = overlay.querySelector('.btn-copy-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function() {
        executeCopy();
      });
    }
  }

  function executeCopy() {
    var sourceKey = currentSupplier + '_' + currentTenantType + '_' + currentScene;
    var sourceConfig = MockTagConfigs[sourceKey];
    if (!sourceConfig) {
      showToast('源配置不存在', 'error');
      return;
    }
    var checkboxes = document.querySelectorAll('.copy-target-cb:checked');
    if (checkboxes.length === 0) {
      showToast('请选择至少一个目标节点', 'info');
      return;
    }
    var count = 0;
    checkboxes.forEach(function(cb) {
      var targetKey = cb.value;
      MockTagConfigs[targetKey] = { enabledTagIds: sourceConfig.enabledTagIds.slice() };
      count++;
    });
    closeCopyModal();
    refreshTreePanel();
    showToast('已复制到 ' + count + ' 个节点', 'success');
  }

  function closeCopyModal() {
    var overlay = document.getElementById('copy-modal-overlay');
    if (overlay) overlay.classList.remove('show');
  }

  /* ===== 供应商弹窗 ===== */
  function bindSupplierModalEvents() {
    var overlay = document.getElementById('supplier-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSupplierModal();
    });

    overlay.querySelectorAll('.btn-spl-edit').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-supplier-id');
        enterSupplierEditMode(sid);
      });
    });

    overlay.querySelectorAll('.btn-spl-save').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-supplier-id');
        saveSupplierEdit(sid);
      });
    });

    overlay.querySelectorAll('.btn-spl-cancel').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-supplier-id');
        cancelSupplierEdit(sid);
      });
    });

    overlay.querySelectorAll('.btn-spl-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var sid = btn.getAttribute('data-supplier-id');
        toggleSupplierStatus(sid);
      });
    });

    var addBtn = overlay.querySelector('.btn-add-supplier');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        addNewSupplier();
      });
    }
  }

  function enterSupplierEditMode(splId) {
    var row = document.querySelector('#supplier-modal-body tr[data-supplier-id="' + splId + '"]');
    if (!row) return;
    row.querySelector('.spl-name-display').style.display = 'none';
    row.querySelector('.spl-name-input').style.display = 'inline-block';
    row.querySelector('.btn-spl-edit').style.display = 'none';
    row.querySelector('.btn-spl-toggle').style.display = 'none';
    row.querySelector('.btn-spl-save').style.display = 'inline-block';
    row.querySelector('.btn-spl-cancel').style.display = 'inline-block';
    row.querySelector('.spl-name-input').focus();
  }

  function saveSupplierEdit(splId) {
    var row = document.querySelector('#supplier-modal-body tr[data-supplier-id="' + splId + '"]');
    if (!row) return;
    var input = row.querySelector('.spl-name-input');
    var newName = input.value.trim();
    if (!newName) {
      showToast('供应商名称不能为空', 'error');
      return;
    }
    var supplier = findSupplier(splId);
    if (supplier) supplier.name = newName;
    row.querySelector('.spl-name-display').textContent = newName;
    exitSupplierEditMode(row);
    showToast('供应商已更新', 'success');
    refreshTreePanel();
  }

  function cancelSupplierEdit(splId) {
    var row = document.querySelector('#supplier-modal-body tr[data-supplier-id="' + splId + '"]');
    if (!row) return;
    var input = row.querySelector('.spl-name-input');
    input.value = row.querySelector('.spl-name-display').textContent;
    exitSupplierEditMode(row);
  }

  function exitSupplierEditMode(row) {
    row.querySelector('.spl-name-display').style.display = '';
    row.querySelector('.spl-name-input').style.display = 'none';
    row.querySelector('.btn-spl-edit').style.display = '';
    row.querySelector('.btn-spl-toggle').style.display = '';
    row.querySelector('.btn-spl-save').style.display = 'none';
    row.querySelector('.btn-spl-cancel').style.display = 'none';
  }

  function toggleSupplierStatus(splId) {
    var supplier = findSupplier(splId);
    if (!supplier) return;
    supplier.status = supplier.status === 'enabled' ? 'disabled' : 'enabled';
    refreshSupplierModalBody();
    refreshTreePanel();
    showToast('供应商状态已更新', 'success');
  }

  function addNewSupplier() {
    showPromptModal('新增供应商', '请输入新供应商名称', function(value) {
      var exists = MockTagSuppliers.some(function(s) { return s.name === value; });
      if (exists) return '供应商名称已存在';
      return null;
    }, function(name) {
      var newId = 'sp_' + Date.now();
      MockTagSuppliers.push({ id: newId, name: name, status: 'enabled' });
      MockSupplierTagPool[newId] = [];
      refreshSupplierModalBody();
      refreshTreePanel();
      showToast('供应商已添加', 'success');
    });
  }

  function refreshSupplierModalBody() {
    var body = document.getElementById('supplier-modal-body');
    if (body) body.innerHTML = buildSupplierTableHTML();
    bindSupplierModalEvents();
  }

  /* ===== 通用 Prompt 弹窗 ===== */
  function showPromptModal(title, placeholder, validateFn, callback) {
    var overlay = document.getElementById('prompt-modal-overlay');
    var input = document.getElementById('prompt-modal-input');
    var titleEl = document.getElementById('prompt-modal-title');
    var errorEl = document.getElementById('prompt-modal-error');
    if (!overlay || !input) return;
    titleEl.textContent = title;
    input.value = '';
    input.placeholder = placeholder || '';
    if (errorEl) errorEl.style.display = 'none';
    promptCallback = { validate: validateFn, cb: callback };
    overlay.classList.add('show');
    setTimeout(function() { input.focus(); }, 100);
  }

  function bindPromptModalEvents() {
    var overlay = document.getElementById('prompt-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePromptModal();
    });

    var input = document.getElementById('prompt-modal-input');
    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') confirmPromptModal();
        if (e.key === 'Escape') closePromptModal();
      });
    }

    var confirmBtn = overlay.querySelector('.btn-prompt-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', confirmPromptModal);
    }

    var cancelBtn = overlay.querySelector('.btn-prompt-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', closePromptModal);
    }
  }

  function confirmPromptModal() {
    var input = document.getElementById('prompt-modal-input');
    var errorEl = document.getElementById('prompt-modal-error');
    var value = input ? input.value.trim() : '';
    if (!value) {
      if (errorEl) { errorEl.textContent = '输入内容不能为空'; errorEl.style.display = 'block'; }
      return;
    }
    if (promptCallback && promptCallback.validate) {
      var errMsg = promptCallback.validate(value);
      if (errMsg) {
        if (errorEl) { errorEl.textContent = errMsg; errorEl.style.display = 'block'; }
        return;
      }
    }
    closePromptModal();
    if (promptCallback && promptCallback.cb) promptCallback.cb(value);
  }

  function closePromptModal() {
    var overlay = document.getElementById('prompt-modal-overlay');
    if (overlay) overlay.classList.remove('show');
    promptCallback = null;
  }

  /* ===== 通用 Confirm 弹窗 ===== */
  function showConfirmModal(title, message, callback) {
    var overlay = document.getElementById('confirm-modal-overlay');
    var titleEl = document.getElementById('confirm-modal-title');
    var msgEl = document.getElementById('confirm-modal-msg');
    if (!overlay) return;
    titleEl.textContent = title;
    msgEl.textContent = message;
    confirmCallback = callback;
    overlay.classList.add('show');
  }

  function bindConfirmModalEvents() {
    var overlay = document.getElementById('confirm-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeConfirmModal(false);
    });

    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeConfirmModal(false);
    });

    var okBtn = overlay.querySelector('.btn-confirm-ok');
    if (okBtn) {
      okBtn.addEventListener('click', function() { closeConfirmModal(true); });
    }

    var cancelBtn = overlay.querySelector('.btn-confirm-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() { closeConfirmModal(false); });
    }
  }

  function closeConfirmModal(confirmed) {
    var overlay = document.getElementById('confirm-modal-overlay');
    if (overlay) overlay.classList.remove('show');
    var cb = confirmCallback;
    confirmCallback = null;
    if (cb) cb(confirmed);
  }

  /* ===== 工具函数 ===== */

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function findSupplier(id) {
    for (var i = 0; i < MockTagSuppliers.length; i++) {
      if (MockTagSuppliers[i].id === id) return MockTagSuppliers[i];
    }
    return null;
  }

  function findTenantType(id) {
    for (var i = 0; i < MockTenantTypes.length; i++) {
      if (MockTenantTypes[i].id === id) return MockTenantTypes[i];
    }
    return null;
  }

  function findScene(id) {
    for (var i = 0; i < MockTagScenes.length; i++) {
      if (MockTagScenes[i].id === id) return MockTagScenes[i];
    }
    return null;
  }

  function checkSupplierHasAnyConfig(supplierId) {
    var keys = Object.keys(MockTagConfigs);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf(supplierId) === 0) return true;
    }
    return false;
  }

  function autoSelectFirst() {
    if (MockTagSuppliers.length === 0) return;
    var firstSup = MockTagSuppliers[0];
    var firstTT = MockTenantTypes[0];
    var firstSc = MockTagScenes[0];
    // 找第一个有配置的场景
    for (var t = 0; t < MockTenantTypes.length; t++) {
      for (var s = 0; s < MockTagScenes.length; s++) {
        var key = firstSup.id + '_' + MockTenantTypes[t].id + '_' + MockTagScenes[s].id;
        if (MockTagConfigs[key]) {
          firstTT = MockTenantTypes[t];
          firstSc = MockTagScenes[s];
          t = MockTenantTypes.length; // break outer
          break;
        }
      }
    }
    var node = document.querySelector('.tree-scene[data-supplier="' + firstSup.id + '"][data-tenant="' + firstTT.id + '"][data-scene="' + firstSc.id + '"]');
    if (node) selectSceneNode(node);
  }

  /* ===== 对外方法 ===== */
  return {
    render: render,
    init: init,
    openSceneModal: function() {
      var overlay = document.getElementById('scene-modal-overlay');
      if (overlay) overlay.classList.add('show');
    },
    closeSceneModal: function() {
      var overlay = document.getElementById('scene-modal-overlay');
      if (overlay) overlay.classList.remove('show');
    },
    openSupplierModal: function() {
      var overlay = document.getElementById('supplier-modal-overlay');
      if (overlay) overlay.classList.add('show');
    },
    closeSupplierModal: function() {
      var overlay = document.getElementById('supplier-modal-overlay');
      if (overlay) overlay.classList.remove('show');
    },
    openCopyModal: openCopyModal,
    closeCopyModal: closeCopyModal,
    closePromptModal: closePromptModal,
    closeConfirmModal: closeConfirmModal,
    refreshTreePanel: refreshTreePanel
  };
})();
