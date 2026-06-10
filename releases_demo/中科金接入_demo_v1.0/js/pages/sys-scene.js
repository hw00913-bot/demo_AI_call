/**
 * js/pages/sys-scene.js — 业务场景管理页
 */

(function () {
  'use strict';

  /* 业务场景 mock 数据 */
  const MockSceneRows = [
    { id: 1, name: '燃油车新线索-一知', sceneId: '2021498427234983938', code: 'AI-XXY', category: '新线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10', status: 'running' },
    { id: 2, name: 'NEV-留资未满-N6推荐', sceneId: '2048744508251602945', code: 'NEV-LZWM-N6', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 3, name: 'NEV-冷线索-天籁推荐-0410版', sceneId: '2046521635889888801', code: 'TL-LXY', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 4, name: 'NEV-留资未满-N7推荐', sceneId: '2048741810617876481', code: 'NEV-LZWM-N7', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 5, name: 'NEV-留资未满-天籁推荐', sceneId: '2048742457857703938', code: 'NEV-LZWM-TL', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 6, name: 'NEV-留资未满-NX8推荐', sceneId: '2048743349159886849', code: 'NEV-LZWM-NX8', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 7, name: 'DCC-一知-N7冷线索', sceneId: '2027729970601218049', code: 'DCC-YZ-N7-LXS', category: '冷线索', tenant: '东风日产-燃油车', platform: '一知科技', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 8, name: '燃油车新线索-中科金', sceneId: 'ZKJ20260601001', code: 'ZKJ-XXY', category: '新线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-01 09:15:00' },
    { id: 9, name: 'NEV-冷线索-中科金', sceneId: 'ZKJ20260602002', code: 'ZKJ-LXS', category: '冷线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-02 10:30:00' },
    { id: 10, name: 'DCC-中科金-N7冷线索', sceneId: 'ZKJ20260603003', code: 'ZKJ-DCC-N7', category: '冷线索', tenant: '东风日产-燃油车', platform: '中科金智能', updater: '-', updateTime: '2026-06-03 14:00:00' }
  ];
  let SceneRows = MockSceneRows.map(function (row) { return Object.assign({}, row); });

  function renderSceneRowsHtml() {
    return SceneRows.map(function (row) {
      return '\n        <tr>\n          <td>' + row.id + '</td>\n          <td>' + row.name + '</td>\n          <td>' + row.sceneId + '</td>\n          <td>' + row.code + '</td>\n          <td>' + row.category + '</td>\n          <td>' + (row.platform || '一知科技') + '</td>\n          <td>' + row.tenant + '</td>\n          <td>' + row.updater + '</td>\n          <td>' + row.updateTime + '</td>\n          <td>\n            <a href="#" class="biz-action-edit" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showEditModal(' + row.id + ')">编辑</a>\n            <a href="#" class="biz-action-delete" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showDeleteConfirm(' + row.id + ')">删除</a>\n          </td>\n        </tr>';
    }).join('');
  }

  function refreshSceneTable() {
    var tbody = document.getElementById('bizSceneTableBody');
    if (!tbody) return;
    tbody.innerHTML = renderSceneRowsHtml();
  }

  function isRunningScene(scene) {
    return !!(scene && (scene.status === 'running' || scene.status === '进行中'));
  }

  function showDeleteConfirm(sceneId) {
    var row = SceneRows.find(function (item) { return item.id === sceneId; });
    if (!row) return;
    if (isRunningScene(row)) {
      showToast('有进行中的任务无法删除', 'warning');
      return;
    }
    if (document.getElementById('bizDeleteSceneBackdrop')) return;

    var html = '\n      <div class="biz-dialog-backdrop" id="bizDeleteSceneBackdrop" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm(event)">\n        <div class="biz-dialog" onclick="event.stopPropagation()">\n          <div class="biz-dialog-header">\n            <span class="biz-dialog-title">删除确认</span>\n            <span class="biz-dialog-close" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm()">&#x2715;</span>\n          </div>\n          <div class="biz-dialog-body">\n            <div style="font-size:14px;color:#333;line-height:1.7;">确认删除「' + row.name + '」吗？删除后不可恢复。</div>\n          </div>\n          <div class="biz-dialog-footer">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeDeleteConfirm()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].confirmDeleteScene(' + sceneId + ')" style="height:32px;padding:0 20px;">确认</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeDeleteConfirm(e) {
    if (e && e.target !== e.currentTarget) return;
    var bd = document.getElementById('bizDeleteSceneBackdrop');
    if (bd) bd.remove();
  }

  function confirmDeleteScene(sceneId) {
    SceneRows = SceneRows.filter(function (item) { return item.id !== sceneId; });
    closeDeleteConfirm();
    refreshSceneTable();
    showToast('删除成功', 'success');
  }

  function render() {
    var tableRows = renderSceneRowsHtml();
    return '\n      <div class="scene-list-page">\n        <div class="scene-page-header" style="border-bottom:none;padding-bottom:8px;">\n          <div class="scene-page-title-row">\n            <span class="scene-page-title">业务场景</span>\n          </div>\n          <div class="scene-page-subtitle" style="margin-top:6px;">创建使用智能外呼任务的业务场景，通过分配外呼平台的通话机器人和通话通道完成创建。</div>\n        </div>\n\n        <div class="filter-bar" style="background:#fff;border-radius:10px;padding:16px 24px;margin:0 20px 12px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;box-shadow:0 1px 4px rgba(0,0,0,0.05);border:1px solid #ebeef2;">\n          <div class="filter-item">\n            <label>场景名称：</label>\n            <input type="text" class="filter-input" placeholder="请输入" style="width:180px;">\n          </div>\n          <div class="filter-item">\n            <label>场景分类：</label>\n            <select class="filter-select" style="width:160px;color:#bbb;">\n              <option value="">请选择</option>\n              <option value="new">新线索</option>\n              <option value="cold">冷线索</option>\n            </select>\n          </div>\n          <div class="filter-item">\n            <label>所属平台：</label>\n            <select class="filter-select" style="width:160px;color:#bbb;">\n              <option value="">全部</option>\n              <option value="一知科技">一知科技</option>\n              <option value="中科金智能">中科金智能</option>\n            </select>\n          </div>\n          <div class="btn-group" style="margin-left:auto;">\n            <button class="btn btn-default" onclick="resetFilter(this.closest(\'.scene-list-page\'))">重置</button>\n            <button class="btn btn-primary" onclick="doQuery()">查询</button>\n          </div>\n        </div>\n\n        <div style="padding:0 20px;margin-bottom:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center;">\n          <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].showAddModal()" style="height:34px;padding:0 16px;border-radius:6px;font-size:13px;display:flex;align-items:center;gap:6px;" data-anno="sys-scene-add-btn">\n            <span style="font-size:15px;font-weight:500;">+</span> 新增业务场景\n          </button>\n          <span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>\n          <span class="biz-icon-btn" onclick="showToast(\'设置功能开发中\',\'info\')" title="设置">&#x2699;</span>\n        </div>\n\n        <div class="table-wrap" style="margin:0 20px 20px;flex:1;overflow:hidden;display:flex;flex-direction:column;">\n          <div class="table-container" style="flex:1;overflow:auto;">\n            <table class="data-table biz-scene-table" style="min-width:1300px;">\n              <thead>\n                <tr>\n                  <th>序号</th>\n                  <th>场景名称</th>\n                  <th>场景id</th>\n                  <th>场景编码</th>\n                  <th>场景分类</th>\n                  <th>所属平台</th>\n                  <th>可用租户</th>\n                  <th>更新人</th>\n                  <th>更新时间</th>\n                  <th style="text-align:center;">操作</th>\n                </tr>\n              </thead>\n              <tbody id="bizSceneTableBody">\n                ' + tableRows + '\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    ';
  }

  /* ===== 新建/编辑业务场景抽屉 ===== */
  function showAddModal(modalTitle) {
    modalTitle = modalTitle || '新建业务场景';
    var html = '\n      <div class="biz-drawer-backdrop" id="bizAddSceneBackdrop" onclick="window.Pages[\'sys-scene\'].closeAddModal(event)">\n        <div class="biz-drawer" id="bizAddSceneDrawer" onclick="event.stopPropagation()">\n          <div class="biz-drawer-header">\n            <span class="biz-drawer-title">' + modalTitle + '</span>\n            <span class="biz-drawer-close" onclick="window.Pages[\'sys-scene\'].closeAddModal()">&#x2715;</span>\n          </div>\n\n          <div class="biz-drawer-body">\n            <!-- 表单 -->\n            <div class="biz-form">\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景名称</label>\n                <div class="biz-form-field">\n                  <input type="text" class="biz-form-input" placeholder="给场景起个名字" maxlength="20" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'nameCount\',20)">\n                  <span class="biz-char-count" id="nameCount">0 / 20</span>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景编码</label>\n                <div class="biz-form-field">\n                  <input type="text" class="biz-form-input" placeholder="请输入字母、数字、符号" maxlength="20" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'codeCount\',20)">\n                  <span class="biz-char-count" id="codeCount">0 / 20</span>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label">场景描述</label>\n                <div class="biz-form-field">\n                  <textarea class="biz-form-textarea" placeholder="请输入场景简要描述" rows="3"></textarea>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">可用租户</label>\n                <div class="biz-form-field">\n                  <div class="biz-checkbox-group">\n                    <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝兴"><span>重庆东南方渝兴</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝发"><span>重庆东南方渝发</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="东风日产-点检"><span>东风日产-点检</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="东风日产-燃油车"><span>东风日产-燃油车</span></label>\n                    <label class="biz-checkbox"><input type="checkbox" value="超级管理组"><span>超级管理组</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">智能平台</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group" data-anno="sys-scene-platform">\n                    <label class="biz-radio"><input type="radio" name="platform" value="冰兰" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>冰兰</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="科大讯飞" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>科大讯飞</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="一知科技" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>一知科技</span></label>\n                    <label class="biz-radio"><input type="radio" name="platform" value="中科金智能" onchange="window.Pages[\'sys-scene\'].onPlatformChange()"><span>中科金智能</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row">\n                <label class="biz-form-label required">场景类型</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="首访"><span>首访</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="服务"><span>服务</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="回访"><span>回访</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="新线索"><span>新线索</span></label>\n                    <label class="biz-radio"><input type="radio" name="sceneType" value="冷线索"><span>冷线索</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <div class="biz-form-row" id="importTypeRowDefault">\n                <label class="biz-form-label required">数据导入方式</label>\n                <div class="biz-form-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="importType" value="手动导入"><span>手动导入</span></label>\n                    <label class="biz-radio"><input type="radio" name="importType" value="自动传入"><span>自动传入</span></label>\n                  </div>\n                </div>\n              </div>\n\n              <!-- 平台面板切换区 -->\n              <!-- 一知科技面板 -->\n              <div id="platformPanelYizhi" class="biz-platform-panel">\n                <div class="biz-form-row">\n                  <label class="biz-form-label required">一知科技场景id</label>\n                  <div class="biz-form-field">\n                    <input type="text" class="biz-form-input" placeholder="请输入一知科技平台创建的自助场景id">\n                  </div>\n                </div>\n\n                <div class="biz-form-row">\n                  <label class="biz-form-label"></label>\n                  <div class="biz-form-field">\n                    <div class="biz-modal-notice" style="margin:0;flex:1;">\n                      <span class="biz-notice-icon">&#x26A0;</span>\n                      <div class="biz-notice-body">你需要先在一知后台创建自动任务后，将自动任务 id 复制粘贴到此处完成关联。</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="biz-form-row hidden" id="modelTypeRow">\n                  <label class="biz-form-label required">模型类型</label>\n                  <div class="biz-form-field">\n                    <div class="biz-radio-group">\n                      <label class="biz-radio"><input type="radio" name="modelType" value="小模型" onchange="window.Pages[\'sys-scene\'].onModelTypeChange()"><span>小模型</span></label>\n                      <label class="biz-radio"><input type="radio" name="modelType" value="大模型" onchange="window.Pages[\'sys-scene\'].onModelTypeChange()"><span>大模型</span></label>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <!-- 中科金智能面板（参照一知科技字段结构） -->\n              <div id="platformPanelZhongkejin" class="biz-platform-panel hidden">\n                <div class="biz-form-row">\n                  <label class="biz-form-label required">中科金任务id</label>\n                  <div class="biz-form-field">\n                    <input type="text" class="biz-form-input" placeholder="请输入中科金智能平台创建的外呼任务id" data-anno="sys-scene-zkj-taskid">\n                  </div>\n                </div>\n\n                <div class="biz-form-row">\n                  <label class="biz-form-label"></label>\n                  <div class="biz-form-field">\n                    <div class="biz-modal-notice" style="margin:0;flex:1;">\n                      <span class="biz-notice-icon">&#x26A0;</span>\n                      <div class="biz-notice-body">你需要先在中科金后台创建自动任务后，将自动任务 id 复制粘贴到此处完成关联。</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="biz-form-row hidden" id="zkjModelTypeRow">\n                  <label class="biz-form-label required">模型类型</label>\n                  <div class="biz-form-field">\n                    <div class="biz-radio-group">\n                      <label class="biz-radio"><input type="radio" name="zkjModelType" value="小模型" onchange="window.Pages[\'sys-scene\'].onZkjModelTypeChange()"><span>小模型</span></label>\n                      <label class="biz-radio"><input type="radio" name="zkjModelType" value="大模型" onchange="window.Pages[\'sys-scene\'].onZkjModelTypeChange()"><span>大模型</span></label>\n                    </div>\n                  </div>\n                </div>\n                <div class="biz-form-row hidden" id="zkjAccountRow">\n                  <label class="biz-form-label required">选择中科金账号</label>\n                  <div class="biz-form-field">\n                    <select class="biz-form-select" disabled>\n                      <option>默认账号</option>\n                    </select>\n                  </div>\n                </div>\n              </div>\n              <div class="biz-form-row" style="align-items:flex-start;margin-top:30px;">\n                <label class="biz-form-label required">业务信息</label>\n                <div class="biz-form-field" style="flex-direction:column;align-items:flex-start;gap:0;">\n                  <div class="biz-inner-tabs">\n                    <div class="biz-inner-tab active" onclick="window.Pages[\'sys-scene\'].switchBizTab(this,\'input\')"><span class="biz-required-tag">*</span> 场景传入信息</div>\n                    <div class="biz-inner-tab" onclick="window.Pages[\'sys-scene\'].switchBizTab(this,\'extract\')">场景提取信息</div>\n                  </div>\n                  <div class="biz-inner-panel" id="bizPanel-input">\n                    <table class="biz-inner-table">\n                      <thead>\n                        <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td colspan="5">\n                            <div class="biz-empty-mini">\n                              <div class="biz-empty-icon">&#128230;</div>\n                              <div class="biz-empty-text">暂无数据</div>\n                            </div>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                    <div class="biz-add-field-row">\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showFieldModal(\'场景传入信息\')">+ 添加字段</a>\n                    </div>\n                  </div>\n                  <div class="biz-inner-panel" id="bizPanel-extract" style="display:none;">\n                    <table class="biz-inner-table">\n                      <thead>\n                        <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td colspan="5">\n                            <div class="biz-empty-mini">\n                              <div class="biz-empty-icon">&#128230;</div>\n                              <div class="biz-empty-text">暂无数据</div>\n                            </div>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                    <div class="biz-add-field-row">\n                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages[\'sys-scene\'].showFieldModal(\'场景提取信息\')">+ 添加字段</a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class="biz-drawer-footer" id="bizModalFooter">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeAddModal()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" data-anno="sys-scene-submit-btn" onclick="window.Pages[\'sys-scene\'].submitAddModal()" style="height:32px;padding:0 20px;">确定</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      var backdrop = document.getElementById('bizAddSceneBackdrop');
      var drawer = document.getElementById('bizAddSceneDrawer');
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
      // 抽屉打开后刷新标注点，使抽屉内元素的标注可见
      setTimeout(function () {
        if (window.AnnotationRuntime && window.AnnotationRuntime.refresh) {
          window.AnnotationRuntime.refresh();
        }
      }, 350);
    });
    onPlatformChange();
  }

  function closeAddModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var backdrop = document.getElementById('bizAddSceneBackdrop');
    var drawer = document.getElementById('bizAddSceneDrawer');
    if (!backdrop && !drawer) return;
    if (backdrop) backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(function () {
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
      if (window.AnnotationRuntime && window.AnnotationRuntime.refresh) {
        window.AnnotationRuntime.refresh();
      }
    }, 320);
  }

  function showEditModal(sceneId) {
    showAddModal('编辑业务场景');
  }

  function updateCharCount(input, id, limit) {
    var el = document.getElementById(id);
    if (el) el.textContent = input.value.length + ' / ' + limit;
  }

  function switchBizTab(el, tab) {
    var parent = el.closest('.biz-form-field');
    parent.querySelectorAll('.biz-inner-tab').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    parent.querySelectorAll('.biz-inner-panel').forEach(function (p) { p.style.display = 'none'; });
    var panel = parent.querySelector('#bizPanel-' + tab);
    if (panel) panel.style.display = 'block';
  }

  function submitAddModal() {
    showToast('创建成功', 'success');
    closeAddModal();
  }

  /* ===== 添加场景信息弹窗（小弹窗，居中） ===== */
  function showFieldModal(bizType) {
    var html = '\n      <div class="biz-dialog-backdrop" id="bizFieldBackdrop" onclick="window.Pages[\'sys-scene\'].closeFieldModal(event)">\n        <div class="biz-dialog" onclick="event.stopPropagation()">\n          <div class="biz-dialog-header">\n            <span class="biz-dialog-title">添加场景信息</span>\n            <span class="biz-dialog-close" onclick="window.Pages[\'sys-scene\'].closeFieldModal()">&#x2715;</span>\n          </div>\n          <div class="biz-dialog-body">\n            <div class="biz-dialog-form">\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">业务信息</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input readonly" value="' + bizType + '" readonly>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">字段名称</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input" id="fieldName" placeholder="输入字段名称，支持汉字、字母、数字、符号，如&ldquo;订单号&rdquo;" maxlength="50" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'fieldNameCount\',50)">\n                  <span class="biz-char-count" id="fieldNameCount">0 / 50</span>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">参数名</label>\n                <div class="biz-dialog-field">\n                  <input type="text" class="biz-dialog-input" id="fieldCode" placeholder="输入参数名称，支持字母、数字、符号，如&ldquo;id&rdquo;" maxlength="50" oninput="window.Pages[\'sys-scene\'].updateCharCount(this,\'fieldCodeCount\',50)">\n                  <span class="biz-char-count" id="fieldCodeCount">0 / 50</span>\n                </div>\n              </div>\n              <div class="biz-dialog-row">\n                <label class="biz-dialog-label required">是否必填</label>\n                <div class="biz-dialog-field">\n                  <div class="biz-radio-group">\n                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="1"><span>必填</span></label>\n                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="0"><span>选填</span></label>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="biz-dialog-footer">\n            <button class="btn btn-default" onclick="window.Pages[\'sys-scene\'].closeFieldModal()" style="height:32px;padding:0 20px;">取消</button>\n            <button class="btn btn-primary" onclick="window.Pages[\'sys-scene\'].confirmAddField()" style="height:32px;padding:0 20px;">确定</button>\n          </div>\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeFieldModal(e) {
    if (e && e.target !== e.currentTarget) return;
    var bd = document.getElementById('bizFieldBackdrop');
    if (bd) { bd.remove(); }
  }

  function confirmAddField() {
    var name = document.getElementById('fieldName') ? document.getElementById('fieldName').value.trim() : '';
    var code = document.getElementById('fieldCode') ? document.getElementById('fieldCode').value.trim() : '';
    var requiredEl = document.querySelector('input[name="fieldRequired"]:checked');
    var required = requiredEl ? (requiredEl.value === '1' ? '是' : '否') : '否';

    if (!name || !code) {
      showToast('请填写字段名称和参数名', 'warning');
      return;
    }

    var activePanel = document.querySelector('.biz-inner-panel:not([style*="display:none"]):not([style*="display: none"])') || document.getElementById('bizPanel-input');
    var tbody = activePanel ? activePanel.querySelector('tbody') : null;
    if (!tbody) { closeFieldModal(); return; }

    var emptyRow = tbody.querySelector('td[colspan]');
    if (emptyRow) tbody.innerHTML = '';

    var idx = tbody.children.length + 1;
    var tr = document.createElement('tr');
    var requiredHtml = required === '是' ? '<span class="biz-required-tag">* 是</span>' : '否';
    tr.innerHTML = '<td>' + idx + '</td><td>' + name + '</td><td>' + code + '</td><td>' + requiredHtml + '</td><td><a href="#" class="biz-action-delete" onclick="event.preventDefault();this.closest(\'tr\').remove();">删除</a></td>';
    tbody.appendChild(tr);

    showToast('添加成功', 'success');
    closeFieldModal();
  }

  function init() {}

  /* ===== 智能平台切换 ===== */
  function onPlatformChange() {
    var platform = document.querySelector('input[name="platform"]:checked');
    var panelYizhi = document.getElementById('platformPanelYizhi');
    var panelZkj = document.getElementById('platformPanelZhongkejin');
    var modelTypeRow = document.getElementById('modelTypeRow');
    var zkjModelTypeRow = document.getElementById('zkjModelTypeRow');

    // 全部隐藏
    if (panelYizhi) panelYizhi.classList.add('hidden');
    if (panelZkj) panelZkj.classList.add('hidden');
    if (modelTypeRow) modelTypeRow.classList.add('hidden');
    if (zkjModelTypeRow) zkjModelTypeRow.classList.add('hidden');
    var zkjAccountRow = document.getElementById('zkjAccountRow');
    if (zkjAccountRow) zkjAccountRow.classList.add('hidden');

    // 清空一知模型类型
    var yzChecked = document.querySelector('input[name="modelType"]:checked');
    if (yzChecked) yzChecked.checked = false;

    // 清空中科金模型类型
    var zkjChecked = document.querySelector('input[name="zkjModelType"]:checked');
    if (zkjChecked) zkjChecked.checked = false;

    // 重置场景传入信息表格（清空自定义字段）
    var inputTbody = document.querySelector('#bizPanel-input tbody');
    if (inputTbody) {
      inputTbody.innerHTML = '<tr><td colspan="5"><div class="biz-empty-mini"><div class="biz-empty-icon">&#128230;</div><div class="biz-empty-text">暂无数据</div></div></td></tr>';
    }

    if (!platform) return;

    if (platform.value === '一知科技') {
      if (panelYizhi) panelYizhi.classList.remove('hidden');
      if (modelTypeRow) modelTypeRow.classList.remove('hidden');
    } else if (platform.value === '中科金智能') {
      if (panelZkj) panelZkj.classList.remove('hidden');
      if (zkjModelTypeRow) zkjModelTypeRow.classList.remove('hidden');
      // 中科金智能默认字段：姓名 / name / 必填
      if (inputTbody) {
        inputTbody.innerHTML = '<tr><td>1</td><td>姓名</td><td>name</td><td><span class="biz-required-tag">* 是</span></td><td><span class="biz-action-disabled">删除</span></td></tr>';
      }
    }
  }

  /* ===== 一知科技 — 模型类型选择（账号下拉已移除） ===== */
  function onModelTypeChange() {}

  /* ===== 中科金智能 — 模型类型选择（账号下拉已移除） ===== */
  function onZkjModelTypeChange() {
    var modelType = document.querySelector('input[name="zkjModelType"]:checked');
    var accountRow = document.getElementById('zkjAccountRow');
    if (accountRow) {
      if (modelType) {
        accountRow.classList.remove('hidden');
      } else {
        accountRow.classList.add('hidden');
      }
    }
  }

  window.Pages = window.Pages || {};
  window.Pages['sys-scene'] = {
    render: render,
    init: init,
    showAddModal: showAddModal,
    showEditModal: showEditModal,
    closeAddModal: closeAddModal,
    submitAddModal: submitAddModal,
    showDeleteConfirm: showDeleteConfirm,
    closeDeleteConfirm: closeDeleteConfirm,
    confirmDeleteScene: confirmDeleteScene,
    updateCharCount: updateCharCount,
    switchBizTab: switchBizTab,
    showFieldModal: showFieldModal,
    closeFieldModal: closeFieldModal,
    confirmAddField: confirmAddField,
    onPlatformChange: onPlatformChange,
    onModelTypeChange: onModelTypeChange,
    onZkjModelTypeChange: onZkjModelTypeChange
  };
})();
