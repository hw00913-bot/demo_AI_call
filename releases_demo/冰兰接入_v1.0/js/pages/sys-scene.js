/**
 * js/pages/sys-scene.js — 业务场景管理页
 */

(function () {
  /* 业务场景 mock 数据 */
  const MockSceneRows = [
    { id: 1, name: '燃油车新线索-一知', sceneId: '2021498427234983938', code: 'AI-XXY', category: '新线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10', status: 'running' },
    { id: 2, name: 'NEV-留资未满-N6推荐', sceneId: '2048744508251602945', code: 'NEV-LZWM-N6', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 3, name: 'NEV-冷线索-天籁推荐-0410版', sceneId: '2046521635889888801', code: 'TL-LXY', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 4, name: 'NEV-留资未满-N7推荐', sceneId: '2048741810617876481', code: 'NEV-LZWM-N7', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 5, name: 'NEV-留资未满-天籁推荐', sceneId: '2048742457857703938', code: 'NEV-LZWM-TL', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 6, name: 'NEV-留资未满-NX8推荐', sceneId: '2048743349159886849', code: 'NEV-LZWM-NX8', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 7, name: 'DCC-一知-N7冷线索', sceneId: '2027729970601218049', code: 'DCC-YZ-N7-LXS', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
  ];
  let SceneRows = MockSceneRows.map(row => ({ ...row }));

  function renderSceneRowsHtml() {
    return SceneRows.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.sceneId}</td>
        <td>${row.code}</td>
        <td>${row.category}</td>
        <td>${row.tenant}</td>
        <td>${row.updater}</td>
        <td>${row.updateTime}</td>
        <td>
          <a href="#" class="biz-action-edit" onclick="event.preventDefault();window.Pages['sys-scene'].showEditModal(${row.id})">编辑</a>
          <a href="#" class="biz-action-delete" onclick="event.preventDefault();window.Pages['sys-scene'].showDeleteConfirm(${row.id})">删除</a>
        </td>
      </tr>
    `).join('');
  }

  function refreshSceneTable() {
    const tbody = document.getElementById('bizSceneTableBody');
    if (!tbody) return;
    tbody.innerHTML = renderSceneRowsHtml();
  }

  function isRunningScene(scene) {
    return !!scene && (scene.status === 'running' || scene.status === '进行中');
  }

  function showDeleteConfirm(sceneId) {
    const row = SceneRows.find(item => item.id === sceneId);
    if (!row) return;
    if (isRunningScene(row)) {
      showToast('有进行中的任务无法删除', 'warning');
      return;
    }
    if (document.getElementById('bizDeleteSceneBackdrop')) return;

    const html = `
      <div class="biz-dialog-backdrop" id="bizDeleteSceneBackdrop" onclick="window.Pages['sys-scene'].closeDeleteConfirm(event)">
        <div class="biz-dialog" onclick="event.stopPropagation()">
          <div class="biz-dialog-header">
            <span class="biz-dialog-title">删除确认</span>
            <span class="biz-dialog-close" onclick="window.Pages['sys-scene'].closeDeleteConfirm()">&#x2715;</span>
          </div>
          <div class="biz-dialog-body">
            <div style="font-size:14px;color:#333;line-height:1.7;">确认删除「${row.name}」吗？删除后不可恢复。</div>
          </div>
          <div class="biz-dialog-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeDeleteConfirm()" style="height:32px;padding:0 20px;">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].confirmDeleteScene(${sceneId})" style="height:32px;padding:0 20px;">确认</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeDeleteConfirm(e) {
    if (e && e.target !== e.currentTarget) return;
    const bd = document.getElementById('bizDeleteSceneBackdrop');
    if (bd) bd.remove();
  }

  function confirmDeleteScene(sceneId) {
    SceneRows = SceneRows.filter(item => item.id !== sceneId);
    closeDeleteConfirm();
    refreshSceneTable();
    showToast('删除成功', 'success');
  }

  function render() {
    const tableRows = renderSceneRowsHtml();
    return `
      <div class="scene-list-page">
        <div class="scene-page-header" style="border-bottom:none;padding-bottom:8px;">
          <div class="scene-page-title-row">
            <span class="scene-page-title">业务场景</span>
          </div>
          <div class="scene-page-subtitle" style="margin-top:6px;">创建使用智能外呼任务的业务场景，通过分配外呼平台的通话机器人和通话通道完成创建。</div>
        </div>

        <div class="filter-bar" style="background:#fff;border-radius:10px;padding:16px 24px;margin:0 20px 12px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;box-shadow:0 1px 4px rgba(0,0,0,0.05);border:1px solid #ebeef2;">
          <div class="filter-item">
            <label>场景名称：</label>
            <input type="text" class="filter-input" placeholder="请输入" style="width:180px;">
          </div>
          <div class="filter-item">
            <label>场景分类：</label>
            <select class="filter-select" style="width:160px;color:#bbb;">
              <option value="">请选择</option>
              <option value="new">新线索</option>
              <option value="cold">冷线索</option>
            </select>
          </div>
          <div class="btn-group" style="margin-left:auto;">
            <button class="btn btn-default" onclick="resetFilter(this.closest('.scene-list-page'))">重置</button>
            <button class="btn btn-primary" onclick="doQuery()">查询</button>
          </div>
        </div>

        <div style="padding:0 20px;margin-bottom:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center;">
          <button class="btn btn-primary" onclick="window.Pages['sys-scene'].showAddModal()" style="height:34px;padding:0 16px;border-radius:6px;font-size:13px;display:flex;align-items:center;gap:6px;">
            <span style="font-size:15px;font-weight:500;">+</span> 新增业务场景
          </button>
          <span class="biz-icon-btn" onclick="doRefresh()" title="刷新">&#x21bb;</span>
          <span class="biz-icon-btn" onclick="showToast('设置功能开发中','info')" title="设置">&#x2699;</span>
        </div>

        <div class="table-wrap" style="margin:0 20px 20px;flex:1;overflow:hidden;display:flex;flex-direction:column;">
          <div class="table-container" style="flex:1;overflow:auto;">
            <table class="data-table biz-scene-table" style="min-width:1200px;">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>场景名称</th>
                  <th>场景id</th>
                  <th>场景编码</th>
                  <th>场景分类</th>
                  <th>可用租户</th>
                  <th>更新人</th>
                  <th>更新时间</th>
                  <th style="text-align:center;">操作</th>
                </tr>
              </thead>
              <tbody id="bizSceneTableBody">
                ${tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /* ===== 新建业务场景抽屉 ===== */
  function showAddModal(modalTitle = '新建业务场景') {
    BinglanSceneInputRows = BinglanSceneInputDefaults.map(item => ({ ...item }));
    const html = `
      <div class="biz-drawer-backdrop" id="bizAddSceneBackdrop" onclick="window.Pages['sys-scene'].closeAddModal(event)">
        <div class="biz-drawer" id="bizAddSceneDrawer" onclick="event.stopPropagation()">
          <div class="biz-drawer-header">
            <span class="biz-drawer-title">${modalTitle}</span>
            <span class="biz-drawer-close" onclick="window.Pages['sys-scene'].closeAddModal()">&#x2715;</span>
          </div>

          <div class="biz-drawer-body biz-single-form">
            <!-- 步骤条 -->
            <div class="biz-step-bar">
              <div class="biz-step active" id="bizStep1">
                <div class="biz-step-num">1</div>
                <div class="biz-step-text">
                  <div class="biz-step-title">填写场景信息</div>
                  <div class="biz-step-desc">配置场景基本信息</div>
                </div>
              </div>
              <div class="biz-step-line" id="bizLine1"></div>
              <div class="biz-step" id="bizStep2">
                <div class="biz-step-num">2</div>
                <div class="biz-step-text">
                  <div class="biz-step-title">填写呼叫策略</div>
                  <div class="biz-step-desc">配置场景呼叫策略 <span class="biz-step-help" onclick="showToast('呼叫策略说明开发中','info')">&#9432;</span></div>
                </div>
              </div>
              <div class="biz-step-line" id="bizLine2"></div>
              <div class="biz-step" id="bizStep3">
                <div class="biz-step-num">3</div>
                <div class="biz-step-text">
                  <div class="biz-step-title">完成</div>
                  <div class="biz-step-desc">完成创建任务</div>
                </div>
              </div>
            </div>

            <!-- ===== Step 1 内容 ===== -->
            <div id="stepContent1" class="step-content">
              <!-- 提示条 -->
              <div class="biz-modal-notice">
                <span class="biz-notice-icon">&#x26A0;</span>
                <div>
                  <div class="biz-notice-title">请注意！</div>
                  <div class="biz-notice-body">新增业务场景时如果对业务场景传入信息后有特殊业务依赖，请与提供业务数据的业务系统开发方协调一致取得新增业务信息。</div>
                </div>
              </div>

              <!-- 表单 -->
              <div class="biz-form">
                <div class="biz-form-row">
                  <label class="biz-form-label required">场景名称</label>
                  <div class="biz-form-field">
                    <input type="text" class="biz-form-input" placeholder="给场景起个名字" maxlength="20" oninput="window.Pages['sys-scene'].updateCharCount(this,'nameCount',20)">
                    <span class="biz-char-count" id="nameCount">0 / 20</span>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label required">场景编码</label>
                  <div class="biz-form-field">
                    <input type="text" class="biz-form-input" placeholder="请输入字母、数字、符号" maxlength="20" oninput="window.Pages['sys-scene'].updateCharCount(this,'codeCount',20)">
                    <span class="biz-char-count" id="codeCount">0 / 20</span>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label">场景描述</label>
                  <div class="biz-form-field">
                    <textarea class="biz-form-textarea" placeholder="请输入场景简要描述" rows="3"></textarea>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label required">可用租户</label>
                  <div class="biz-form-field">
                    <div class="biz-checkbox-group">
                      <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝兴"><span>重庆东南方渝兴</span></label>
                      <label class="biz-checkbox"><input type="checkbox" value="重庆东南方渝发"><span>重庆东南方渝发</span></label>
                      <label class="biz-checkbox"><input type="checkbox" value="东风日产-点检"><span>东风日产-点检</span></label>
                      <label class="biz-checkbox"><input type="checkbox" value="东风日产-燃油车"><span>东风日产-燃油车</span></label>
                      <label class="biz-checkbox"><input type="checkbox" value="超级管理组"><span>超级管理组</span></label>
                    </div>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label required">智能平台</label>
                  <div class="biz-form-field biz-inline-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="platform" value="冰兰" checked onchange="window.Pages['sys-scene'].onPlatformChange()"><span>冰兰</span></label>
                      <label class="biz-radio"><input type="radio" name="platform" value="科大讯飞" onchange="window.Pages['sys-scene'].onPlatformChange()"><span>科大讯飞</span></label>
                      <label class="biz-radio"><input type="radio" name="platform" value="一知科技" onchange="window.Pages['sys-scene'].onPlatformChange()"><span>一知科技</span></label>
                    </div>
                    <span class="biz-help-icon" title="智能平台说明" onclick="showToast('智能平台说明开发中','info')">&#9432;</span>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label required">场景类型</label>
                  <div class="biz-form-field biz-inline-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="sceneType" value="首访"><span>首访</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="服务"><span>服务</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="回访"><span>回访</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="新线索"><span>新线索</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="冷线索"><span>冷线索</span></label>
                    </div>
                    <span class="biz-help-icon" title="请根据实际业务场景需要选择，例如新线索业务选择新线索，如果没有想要的类型请联系开发或产品经理添加进系统。">&#9432;</span>
                  </div>
                </div>

                <div class="biz-form-row hidden" id="importTypeRowBinglan">
                  <label class="biz-form-label required">数据导入方式</label>
                  <div class="biz-form-field">
                    <div class="biz-inline-wrap">
                      <div class="biz-radio-group">
                        <label class="biz-radio"><input type="radio" name="binglanImportType" value="手动导入"><span>手动导入</span></label>
                        <label class="biz-radio"><input type="radio" name="binglanImportType" value="接口传入"><span>接口传入</span></label>
                      </div>
                      <div class="biz-inline-error">请输入数据导入方式</div>
                    </div>
                  </div>
                </div>

                <div class="biz-form-row hidden" id="callChannelRowBinglan">
                  <label class="biz-form-label required">呼叫通道</label>
                  <div class="biz-form-field">
                    <div class="biz-inline-wrap">
                      <select class="biz-form-select" id="binglanCallChannel" style="width:260px;" onchange="window.Pages['sys-scene'].onBinglanCallChannelChange(this)">
                        <option value="">请选择</option>
                        <option value="lianyou_vcp">联友 VCP</option>
                        <option value="binglan_channel">冰兰外呼通道</option>
                      </select>
                      <div class="biz-inline-error">请输入呼叫通道</div>
                    </div>
                  </div>
                </div>

                <div class="biz-form-row hidden" id="binglanLineRow">
                  <label class="biz-form-label required">线路</label>
                  <div class="biz-form-field">
                    <select class="biz-form-select" id="binglanLineSelect" style="width:260px;">
                      <option value="">请选择线路</option>
                      <option value="000001">一知线路（线路 id000001）</option>
                    </select>
                  </div>
                </div>

                <div class="biz-form-row" id="importTypeRowDefault">
                  <label class="biz-form-label required">数据导入方式</label>
                  <div class="biz-form-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="importType" value="手动导入"><span>手动导入</span></label>
                      <label class="biz-radio"><input type="radio" name="importType" value="自动传入"><span>自动传入</span></label>
                    </div>
                  </div>
                </div>

                <div class="biz-form-row biz-info-row" id="bizInfoRow" style="align-items:flex-start;">
                  <label class="biz-form-label required">业务信息</label>
                  <div class="biz-form-field" style="flex-direction:column;align-items:flex-start;gap:0;">
                    <div class="biz-inner-tabs">
                      <div class="biz-inner-tab active" onclick="window.Pages['sys-scene'].switchBizTab(this,'input')"><span class="biz-tab-required-star">*</span>场景传入信息</div>
                      <div class="biz-inner-tab" onclick="window.Pages['sys-scene'].switchBizTab(this,'extract')">场景提取信息</div>
                    </div>
                    <div class="biz-inner-panel" id="bizPanel-input">
                      <table class="biz-inner-table" id="bizInputTable">
                        <thead>
                          <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="5">
                              <div class="biz-empty-mini">
                                <div class="biz-empty-icon">&#128230;</div>
                                <div class="biz-empty-text">暂无数据</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="biz-add-field-row" id="bizInputAddRow">
                        <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages['sys-scene'].showFieldModal('场景传入信息')">+ 添加字段</a>
                      </div>
                    </div>
                    <div class="biz-inner-panel" id="bizPanel-extract" style="display:none;">
                      <table class="biz-inner-table">
                        <thead>
                          <tr><th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="5">
                              <div class="biz-empty-mini">
                                <div class="biz-empty-icon">&#128230;</div>
                                <div class="biz-empty-text">暂无数据</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="biz-add-field-row">
                        <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages['sys-scene'].showFieldModal('场景提取信息')">+ 添加字段</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ===== Step 2 内容 ===== -->
            <div id="stepContent2" class="step-content">
              <div class="biz-section-title">呼叫策略</div>
              <div class="biz-form">
                <div id="platformPanelBinglan" class="biz-platform-panel hidden">
                  <div class="biz-form-row">
                    <label class="biz-form-label required">机器人id</label>
                    <div class="biz-form-field">
                      <div id="binglanRobotIdInputWrap">
                        <input type="text" class="biz-form-input" placeholder="请输入机器人id">
                      </div>
                      <div id="binglanRobotIdSelectWrap" class="hidden">
                        <select class="biz-form-select" style="max-width:420px;">
                          <option value="">请选择机器人id</option>
                          <option value="0000001">东风日产冷线索激活（id：0000001）</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row" id="priorityRowBinglan">
                    <label class="biz-form-label required">优先级</label>
                    <div class="biz-form-field biz-inline-field">
                      <select class="biz-form-select" style="max-width:260px;">
                        <option value="">请选择</option>
                        <option value="1">高</option>
                        <option value="2">中</option>
                        <option value="3">低</option>
                      </select>
                      <span class="biz-help-icon" title="优先级说明" onclick="showToast('优先级说明开发中','info')">&#9432;</span>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label required">呼叫时段</label>
                    <div class="biz-form-field">
                      <div class="biz-inline-wrap">
                        <div class="biz-checkbox-group biz-week-group">
                          <label class="biz-checkbox"><input type="checkbox"><span>周一</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周二</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周三</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周四</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周五</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周六</span></label>
                          <label class="biz-checkbox"><input type="checkbox"><span>周日</span></label>
                        </div>
                        <div class="biz-inline-error">请输入呼叫时段</div>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label"></label>
                    <div class="biz-form-field">
                      <div id="binglanTimeSlots"></div>
                      <a href="#" class="biz-add-link" onclick="event.preventDefault();window.Pages['sys-scene'].addTimeSlot()">添加时段</a>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label required">自动重拨</label>
                    <div class="biz-form-field">
                      <div class="biz-switch-row">
                        <label class="biz-switch">
                          <input type="checkbox">
                          <span class="biz-switch-slider"></span>
                        </label>
                        <span class="biz-redial-tip"><span class="biz-redial-tip-icon">&#9888;</span>中途修改自动重拨策略后，已有的待重拨的号码将不执行重拨</span>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label"></label>
                    <div class="biz-form-field">
                      <div class="biz-redial-table-wrap">
                        <table class="biz-redial-table">
                          <thead>
                            <tr>
                              <th>首次呼叫状态</th>
                              <th>重拨次数</th>
                              <th>重拨间隔</th>
                              <th>启用</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>未接通</td>
                              <td>
                                <select class="biz-form-select">
                                  <option value="1">1</option>
                                  <option value="2" selected>2</option>
                                  <option value="3">3</option>
                                </select>
                              </td>
                              <td>
                                <select class="biz-form-select">
                                  <option value="15">15 分钟</option>
                                  <option value="30" selected>30 分钟</option>
                                  <option value="60">60 分钟</option>
                                </select>
                              </td>
                              <td>
                                <label class="biz-switch">
                                  <input type="checkbox">
                                  <span class="biz-switch-slider"></span>
                                </label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label">黑名单拦截</label>
                    <div class="biz-form-field">
                      <label class="biz-switch">
                        <input type="checkbox">
                        <span class="biz-switch-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label"></label>
                    <div class="biz-form-field" style="max-width:420px;">
                      <select class="biz-form-select">
                        <option value="">请选择黑名单分组</option>
                        <option value="default">默认分组</option>
                        <option value="custom">自定义分组</option>
                      </select>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label">规则拦截</label>
                    <div class="biz-form-field">
                      <label class="biz-switch">
                        <input type="checkbox">
                        <span class="biz-switch-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div class="biz-form-row binglan-channel-hidden-row">
                    <label class="biz-form-label"></label>
                    <div class="biz-form-field">
                      <select class="biz-form-select">
                        <option value="">选择拦截分组</option>
                        <option value="rule_default">默认规则组</option>
                        <option value="rule_custom">自定义规则组</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div id="platformPanelDefault" class="biz-platform-panel">
                  <div class="biz-form-row">
                    <label class="biz-form-label required">一知科技场景id</label>
                    <div class="biz-form-field">
                      <input type="text" class="biz-form-input" placeholder="请输入一知科技平台创建的自助场景id">
                    </div>
                  </div>

                  <div class="biz-form-row">
                    <label class="biz-form-label"></label>
                    <div class="biz-form-field">
                      <div class="biz-modal-notice" style="margin:0;flex:1;">
                        <span class="biz-notice-icon">&#x26A0;</span>
                        <div class="biz-notice-body">你需要先在一知后台创建自动任务后，将自动任务 id 复制粘贴到此处完成关联。</div>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row hidden" id="modelTypeRow">
                    <label class="biz-form-label required">模型类型</label>
                    <div class="biz-form-field">
                      <div class="biz-radio-group">
                        <label class="biz-radio"><input type="radio" name="modelType" value="小模型" onchange="window.Pages['sys-scene'].onModelTypeChange()"><span>小模型</span></label>
                        <label class="biz-radio"><input type="radio" name="modelType" value="大模型" onchange="window.Pages['sys-scene'].onModelTypeChange()"><span>大模型</span></label>
                      </div>
                    </div>
                  </div>

                  <div class="biz-form-row hidden" id="yizhiAccountRow" style="align-items:flex-start;">
                    <label class="biz-form-label required">选择一知账号</label>
                    <div class="biz-form-field" style="flex-direction:column;align-items:flex-start;gap:8px;">
                      <select class="biz-form-select" id="yizhiAccount" style="width:100%;">
                        <option value="">请先选择模型类型</option>
                      </select>
                      <div class="biz-modal-notice" style="margin:0;">
                        <span class="biz-notice-icon">&#x26A0;</span>
                        <div class="biz-notice-body">选择账号将会影响计费统计，选择前请确认该任务 id 是通过此账号创建</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ===== Step 3 内容 ===== -->
            <div id="stepContent3" class="step-content" style="display:none;">
              <div class="biz-result-wrap">
                <div class="biz-result-icon">&#10003;</div>
                <div class="biz-result-title">创建成功</div>
                <div class="biz-result-desc">业务场景已创建完成，请前往任务管理创建外呼任务。</div>
              </div>
            </div>
          </div>

          <div class="biz-drawer-footer" id="bizModalFooter">
            <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeAddModal()" style="height:32px;padding:0 20px;">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].submitAddModal()" style="height:32px;padding:0 20px;">确定</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';
    // 触发入场动画：下一帧添加 .open
    requestAnimationFrame(() => {
      const backdrop = document.getElementById('bizAddSceneBackdrop');
      const drawer = document.getElementById('bizAddSceneDrawer');
      if (backdrop) backdrop.classList.add('open');
      if (drawer) drawer.classList.add('open');
    });
    ensureTimeSlotsInit();
    // 初始化平台状态（处理一知科技默认选中的情况，change 事件不会自动触发）
    onPlatformChange();
    // 单页模式下，将呼叫策略区域移动到“业务信息”之前，紧跟“呼叫通道”后方
    const step2 = document.getElementById('stepContent2');
    const bizInfoRow = document.getElementById('bizInfoRow');
    if (step2 && bizInfoRow && bizInfoRow.parentNode) {
      bizInfoRow.parentNode.insertBefore(step2, bizInfoRow);
    }
  }

  function closeAddModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const backdrop = document.getElementById('bizAddSceneBackdrop');
    const drawer = document.getElementById('bizAddSceneDrawer');
    if (!backdrop && !drawer) return;
    // 播放关闭动画
    if (backdrop) backdrop.classList.remove('open');
    if (drawer) drawer.classList.add('closing');
    setTimeout(() => {
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
    }, 320);
  }

  function showEditModal(sceneId) {
    showAddModal('编辑业务场景');
  }

  function updateCharCount(input, id, limit) {
    const el = document.getElementById(id);
    if (el) el.textContent = `${input.value.length} / ${limit}`;
  }

  function switchBizTab(el, tab) {
    const parent = el.closest('.biz-form-field');
    parent.querySelectorAll('.biz-inner-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    parent.querySelectorAll('.biz-inner-panel').forEach(p => p.style.display = 'none');
    const panel = parent.querySelector('#bizPanel-' + tab);
    if (panel) panel.style.display = 'block';
  }

  function submitAddModal() {
    showToast('创建成功', 'success');
    closeAddModal();
  }

  /* ===== 添加场景信息弹窗（小弹窗，居中） ===== */
  function showFieldModal(bizType) {
    const html = `
      <div class="biz-dialog-backdrop" id="bizFieldBackdrop" onclick="window.Pages['sys-scene'].closeFieldModal(event)">
        <div class="biz-dialog" onclick="event.stopPropagation()">
          <div class="biz-dialog-header">
            <span class="biz-dialog-title">添加场景信息</span>
            <span class="biz-dialog-close" onclick="window.Pages['sys-scene'].closeFieldModal()">&#x2715;</span>
          </div>
          <div class="biz-dialog-body">
            <div class="biz-dialog-form">
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">业务信息</label>
                <div class="biz-dialog-field">
                  <input type="text" class="biz-dialog-input readonly" value="${bizType}" readonly>
                </div>
              </div>
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">字段名称</label>
                <div class="biz-dialog-field">
                  <input type="text" class="biz-dialog-input" id="fieldName" placeholder="输入字段名称，支持汉字、字母、数字、符号，如&ldquo;订单号&rdquo;" maxlength="50" oninput="window.Pages['sys-scene'].updateCharCount(this,'fieldNameCount',50)">
                  <span class="biz-char-count" id="fieldNameCount">0 / 50</span>
                </div>
              </div>
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">参数名</label>
                <div class="biz-dialog-field">
                  <input type="text" class="biz-dialog-input" id="fieldCode" placeholder="输入参数名称，支持字母、数字、符号，如&ldquo;id&rdquo;" maxlength="50" oninput="window.Pages['sys-scene'].updateCharCount(this,'fieldCodeCount',50)">
                  <span class="biz-char-count" id="fieldCodeCount">0 / 50</span>
                </div>
              </div>
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">是否必填</label>
                <div class="biz-dialog-field">
                  <div class="biz-radio-group">
                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="1"><span>必填</span></label>
                    <label class="biz-radio"><input type="radio" name="fieldRequired" value="0"><span>选填</span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="biz-dialog-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeFieldModal()" style="height:32px;padding:0 20px;">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].confirmAddField()" style="height:32px;padding:0 20px;">确定</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeFieldModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const bd = document.getElementById('bizFieldBackdrop');
    if (bd) { bd.remove(); }
  }

  function confirmAddField() {
    const name = document.getElementById('fieldName')?.value.trim();
    const code = document.getElementById('fieldCode')?.value.trim();
    const requiredEl = document.querySelector('input[name="fieldRequired"]:checked');
    const required = requiredEl ? (requiredEl.value === '1' ? '是' : '否') : '否';

    if (!name || !code) {
      showToast('请填写字段名称和参数名', 'warning');
      return;
    }

    // 找到当前激活的业务信息 tab 对应的表格
    const activePanel = document.querySelector('.biz-inner-panel:not([style*="display: none"])') || document.getElementById('bizPanel-input');
    const tbody = activePanel?.querySelector('tbody');
    if (!tbody) { closeFieldModal(); return; }

    // 检查当前是否为空状态
    const emptyRow = tbody.querySelector('td[colspan]');
    if (emptyRow) tbody.innerHTML = '';

    const idx = tbody.children.length + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx}</td><td>${name}</td><td>${code}</td><td>${required}</td><td><a href="#" class="biz-action-delete" onclick="event.preventDefault();this.closest('tr').remove();">删除</a></td>`;
    tbody.appendChild(tr);

    showToast('添加成功', 'success');
    closeFieldModal();
  }

  function init() {}

  const TimeSlotChineseNums = ['一','二','三','四','五','六','七','八','九','十'];

  function getTimeSlotLabel(order) {
    if (order >= 1 && order <= TimeSlotChineseNums.length) {
      return `时段${TimeSlotChineseNums[order - 1]}：`;
    }
    return `时段${order}：`;
  }

  function renderTimeSlotRow(order) {
    return `
      <div class="biz-time-slot-row">
        <span class="biz-slot-label">${getTimeSlotLabel(order)}</span>
        <div class="biz-time-range">
          <input type="time" class="biz-time-input">
          <span class="sep">→</span>
          <input type="time" class="biz-time-input">
          <span class="biz-time-icon">&#9716;</span>
        </div>
        <span class="biz-time-action" title="保存" onclick="showToast('时段已保存','success')">&#10003;</span>
        <span class="biz-time-action" title="删除" onclick="window.Pages['sys-scene'].removeTimeSlot(this)">&#128465;</span>
      </div>
    `;
  }

  function renumberTimeSlots() {
    const rows = document.querySelectorAll('#binglanTimeSlots .biz-time-slot-row');
    rows.forEach((row, index) => {
      const label = row.querySelector('.biz-slot-label');
      if (label) label.textContent = getTimeSlotLabel(index + 1);
    });
  }

  function ensureTimeSlotsInit() {
    const container = document.getElementById('binglanTimeSlots');
    if (!container) return;
    if (container.querySelector('.biz-time-slot-row')) return;
    container.insertAdjacentHTML('beforeend', renderTimeSlotRow(1));
  }

  function addTimeSlot() {
    const container = document.getElementById('binglanTimeSlots');
    if (!container) return;
    const nextOrder = container.querySelectorAll('.biz-time-slot-row').length + 1;
    container.insertAdjacentHTML('beforeend', renderTimeSlotRow(nextOrder));
    renumberTimeSlots();
  }

  function removeTimeSlot(triggerEl) {
    const container = document.getElementById('binglanTimeSlots');
    const row = triggerEl ? triggerEl.closest('.biz-time-slot-row') : null;
    if (!container || !row) return;
    const rows = container.querySelectorAll('.biz-time-slot-row');
    if (rows.length <= 1) {
      showToast('至少保留一个时段', 'warning');
      return;
    }
    row.remove();
    renumberTimeSlots();
  }

  const BinglanSceneInputDefaults = [
    { fieldName: '客户名字', paramName: 'customerName', required: '否' },
    { fieldName: '客户所在地', paramName: 'city', required: '否' },
    { fieldName: '意向车型', paramName: 'intentModel', required: '否' },
    { fieldName: '意向车系', paramName: 'intentSeries', required: '是' },
    { fieldName: '来源渠道', paramName: 'channel', required: '是' },
    { fieldName: '创建时间', paramName: 'createTime', required: '是' },
    { fieldName: '截止时间', paramName: 'deadline', required: '是' },
  ];
  let BinglanSceneInputRows = BinglanSceneInputDefaults.map(item => ({ ...item }));

  function renderBinglanSceneInputTable() {
    const inputTable = document.getElementById('bizInputTable');
    if (!inputTable) return;
    const theadRow = inputTable.querySelector('thead tr');
    const tbody = inputTable.querySelector('tbody');
    if (!theadRow || !tbody) return;

    theadRow.innerHTML = '<th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th>';
    tbody.innerHTML = BinglanSceneInputRows.map((item, index) => (
      `<tr>
        <td>${item.fieldName}</td>
        <td>${item.paramName}</td>
        <td>${item.required}</td>
        <td>
          <a href="#" class="biz-action-edit" onclick="event.preventDefault();window.Pages['sys-scene'].showInputFieldEditModal(${index})">编辑</a>
          <a href="#" class="biz-action-delete" onclick="event.preventDefault();window.Pages['sys-scene'].showInputFieldDeleteConfirm(${index})">删除</a>
        </td>
      </tr>`
    )).join('');
  }

  function showInputFieldEditModal(index) {
    const row = BinglanSceneInputRows[index];
    if (!row) return;
    const html = `
      <div class="biz-dialog-backdrop" id="bizInputFieldEditBackdrop" onclick="window.Pages['sys-scene'].closeInputFieldEditModal(event)">
        <div class="biz-dialog" onclick="event.stopPropagation()">
          <div class="biz-dialog-header">
            <span class="biz-dialog-title">编辑场景信息</span>
            <span class="biz-dialog-close" onclick="window.Pages['sys-scene'].closeInputFieldEditModal()">&#x2715;</span>
          </div>
          <div class="biz-dialog-body">
            <div class="biz-dialog-form">
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">字段名称</label>
                <div class="biz-dialog-field">
                  <input type="text" class="biz-dialog-input" id="editInputFieldName" value="${row.fieldName}" maxlength="50">
                </div>
              </div>
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">参数名</label>
                <div class="biz-dialog-field">
                  <input type="text" class="biz-dialog-input" id="editInputFieldCode" value="${row.paramName}" maxlength="50">
                </div>
              </div>
              <div class="biz-dialog-row">
                <label class="biz-dialog-label required">是否必填</label>
                <div class="biz-dialog-field">
                  <div class="biz-radio-group">
                    <label class="biz-radio"><input type="radio" name="editInputFieldRequired" value="是" ${row.required === '是' ? 'checked' : ''}><span>必填</span></label>
                    <label class="biz-radio"><input type="radio" name="editInputFieldRequired" value="否" ${row.required !== '是' ? 'checked' : ''}><span>选填</span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="biz-dialog-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeInputFieldEditModal()" style="height:32px;padding:0 20px;">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].confirmInputFieldEdit(${index})" style="height:32px;padding:0 20px;">确认</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeInputFieldEditModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const bd = document.getElementById('bizInputFieldEditBackdrop');
    if (bd) bd.remove();
  }

  function confirmInputFieldEdit(index) {
    const row = BinglanSceneInputRows[index];
    if (!row) return;
    const fieldName = document.getElementById('editInputFieldName')?.value.trim();
    const paramName = document.getElementById('editInputFieldCode')?.value.trim();
    const required = document.querySelector('input[name="editInputFieldRequired"]:checked')?.value || '否';
    if (!fieldName || !paramName) {
      showToast('请填写字段名称和参数名', 'warning');
      return;
    }

    row.fieldName = fieldName;
    row.paramName = paramName;
    row.required = required;
    closeInputFieldEditModal();
    renderBinglanSceneInputTable();
    showToast('更新成功', 'success');
  }

  function showInputFieldDeleteConfirm(index) {
    const row = BinglanSceneInputRows[index];
    if (!row) return;
    if (document.getElementById('bizInputFieldDeleteBackdrop')) return;

    const html = `
      <div class="biz-dialog-backdrop" id="bizInputFieldDeleteBackdrop" onclick="window.Pages['sys-scene'].closeInputFieldDeleteConfirm(event)">
        <div class="biz-dialog" onclick="event.stopPropagation()">
          <div class="biz-dialog-header">
            <span class="biz-dialog-title">删除确认</span>
            <span class="biz-dialog-close" onclick="window.Pages['sys-scene'].closeInputFieldDeleteConfirm()">&#x2715;</span>
          </div>
          <div class="biz-dialog-body">
            <div style="font-size:14px;color:#333;line-height:1.7;">确认删除字段「${row.fieldName}」吗？</div>
          </div>
          <div class="biz-dialog-footer">
            <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeInputFieldDeleteConfirm()" style="height:32px;padding:0 20px;">取消</button>
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].confirmInputFieldDelete(${index})" style="height:32px;padding:0 20px;">确认</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function closeInputFieldDeleteConfirm(e) {
    if (e && e.target !== e.currentTarget) return;
    const bd = document.getElementById('bizInputFieldDeleteBackdrop');
    if (bd) bd.remove();
  }

  function confirmInputFieldDelete(index) {
    if (index < 0 || index >= BinglanSceneInputRows.length) return;
    BinglanSceneInputRows.splice(index, 1);
    closeInputFieldDeleteConfirm();
    renderBinglanSceneInputTable();
    showToast('删除成功', 'success');
  }

  function updateSceneInputDefaultsByChannel(isBinglanChannel) {
    const inputTable = document.getElementById('bizInputTable');
    if (!inputTable) return;
    const theadRow = inputTable.querySelector('thead tr');
    const tbody = inputTable.querySelector('tbody');
    const addRow = document.getElementById('bizInputAddRow');
    if (!theadRow || !tbody) return;

    if (isBinglanChannel) {
      renderBinglanSceneInputTable();
      if (addRow) addRow.style.display = '';
      return;
    }

    theadRow.innerHTML = '<th>序号</th><th>字段名称</th><th>参数名</th><th>是否必填</th><th>操作</th>';
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="biz-empty-mini">
            <div class="biz-empty-icon">&#128230;</div>
            <div class="biz-empty-text">暂无数据</div>
          </div>
        </td>
      </tr>
    `;
    if (addRow) addRow.style.display = '';
  }

  function updateSceneTypeAvailability(platformValue) {
    const sceneTypeInputs = document.querySelectorAll('input[name="sceneType"]');
    if (!sceneTypeInputs.length) return;

    sceneTypeInputs.forEach((input) => {
      const label = input.closest('.biz-radio');
      const allowed = platformValue !== '冰兰' || input.value === '新线索' || input.value === '冷线索';
      input.disabled = !allowed;
      if (label) label.classList.toggle('disabled', !allowed);
      if (!allowed && input.checked) input.checked = false;
    });
  }

  /* 智能平台切换时控制一知账号行显隐 */
  function onPlatformChange() {
    const platform = document.querySelector('input[name="platform"]:checked');
    const importTypeRowBinglan = document.getElementById('importTypeRowBinglan');
    const importTypeRowDefault = document.getElementById('importTypeRowDefault');
    const callChannelRowBinglan = document.getElementById('callChannelRowBinglan');
    const binglanLineRow = document.getElementById('binglanLineRow');
    const priorityRowBinglan = document.getElementById('priorityRowBinglan');
    const binglanCallChannel = document.getElementById('binglanCallChannel');
    const panelBinglan = document.getElementById('platformPanelBinglan');
    const panelDefault = document.getElementById('platformPanelDefault');
    const modelTypeRow = document.getElementById('modelTypeRow');
    const yizhiAccountRow = document.getElementById('yizhiAccountRow');
    const yizhiAccount = document.getElementById('yizhiAccount');
    if (!platform || !importTypeRowBinglan || !importTypeRowDefault || !callChannelRowBinglan || !binglanLineRow || !priorityRowBinglan || !panelBinglan || !panelDefault || !modelTypeRow || !yizhiAccountRow || !yizhiAccount) return;

    updateSceneTypeAvailability(platform.value);

    if (platform.value === '冰兰') {
      importTypeRowBinglan.classList.remove('hidden');
      importTypeRowDefault.classList.add('hidden');
      callChannelRowBinglan.classList.remove('hidden');
      priorityRowBinglan.classList.remove('hidden');
      panelBinglan.classList.remove('hidden');
      panelDefault.classList.add('hidden');
      modelTypeRow.classList.add('hidden');
      yizhiAccountRow.classList.add('hidden');
      const checked = document.querySelector('input[name="modelType"]:checked');
      if (checked) checked.checked = false;
      yizhiAccount.innerHTML = '<option value="">请先选择模型类型</option>';
      if (binglanCallChannel) onBinglanCallChannelChange(binglanCallChannel);
      return;
    }

    importTypeRowBinglan.classList.add('hidden');
    importTypeRowDefault.classList.remove('hidden');
    callChannelRowBinglan.classList.add('hidden');
    binglanLineRow.classList.add('hidden');
    priorityRowBinglan.classList.remove('hidden');
    updateSceneInputDefaultsByChannel(false);
    panelBinglan.classList.add('hidden');
    panelDefault.classList.remove('hidden');

    if (platform.value === '一知科技') {
      // 选中一知科技 → 显示模型类型
      modelTypeRow.classList.remove('hidden');
    } else {
      // 切走一知科技 → 隐藏模型类型 + 一知账号，并清空已选
      modelTypeRow.classList.add('hidden');
      yizhiAccountRow.classList.add('hidden');
      // 清空模型类型和账号的选中状态
      const checked = document.querySelector('input[name="modelType"]:checked');
      if (checked) checked.checked = false;
      yizhiAccount.innerHTML = '<option value="">请先选择模型类型</option>';
    }
  }

  function onBinglanCallChannelChange(selectElem) {
    const priorityRowBinglan = document.getElementById('priorityRowBinglan');
    const binglanLineRow = document.getElementById('binglanLineRow');
    const robotIdInputWrap = document.getElementById('binglanRobotIdInputWrap');
    const robotIdSelectWrap = document.getElementById('binglanRobotIdSelectWrap');
    if (!priorityRowBinglan || !selectElem) return;
    const isBinglanChannel = selectElem.value === 'binglan_channel';
    document.querySelectorAll('.binglan-channel-hidden-row').forEach(row => {
      row.classList.toggle('hidden', isBinglanChannel);
    });
    if (isBinglanChannel) {
      priorityRowBinglan.classList.add('hidden');
      if (binglanLineRow) binglanLineRow.classList.remove('hidden');
      if (robotIdInputWrap) robotIdInputWrap.classList.add('hidden');
      if (robotIdSelectWrap) robotIdSelectWrap.classList.remove('hidden');
      updateSceneInputDefaultsByChannel(true);
    } else {
      priorityRowBinglan.classList.remove('hidden');
      if (binglanLineRow) binglanLineRow.classList.add('hidden');
      if (robotIdInputWrap) robotIdInputWrap.classList.remove('hidden');
      if (robotIdSelectWrap) robotIdSelectWrap.classList.add('hidden');
      updateSceneInputDefaultsByChannel(false);
    }
  }

  /* 一知科技下根据模型类型更新账号列表 */
  function updateYizhiAccounts() {
    const modelType = document.querySelector('input[name="modelType"]:checked');
    const yizhiAccount = document.getElementById('yizhiAccount');
    if (!yizhiAccount) return;

    yizhiAccount.innerHTML = '<option value="">请选择一知账号</option>';

    if (modelType && modelType.value === '大模型') {
      yizhiAccount.innerHTML += `
        <option value="accountA">账号 A</option>
        <option value="accountB">账号 B</option>`;
    } else if (modelType && modelType.value === '小模型') {
      yizhiAccount.innerHTML += `
        <option value="accountC">账号 C</option>
        <option value="accountD">账号 D</option>`;
    }
  }

  /* 模型类型切换时更新账号列表 */
  function onModelTypeChange() {
    const platform = document.querySelector('input[name="platform"]:checked');
    const modelType = document.querySelector('input[name="modelType"]:checked');
    const yizhiAccountRow = document.getElementById('yizhiAccountRow');

    if (platform && platform.value === '一知科技' && modelType) {
      yizhiAccountRow.classList.remove('hidden');
      updateYizhiAccounts();
    } else {
      yizhiAccountRow.classList.add('hidden');
    }
  }

  window.Pages = window.Pages || {};
  window.Pages['sys-scene'] = {
    render,
    init,
    showAddModal,
    showEditModal,
    closeAddModal,
    submitAddModal,
    showDeleteConfirm,
    closeDeleteConfirm,
    confirmDeleteScene,
    addTimeSlot,
    removeTimeSlot,
    updateCharCount,
    switchBizTab,
    showFieldModal,
    closeFieldModal,
    confirmAddField,
    showInputFieldEditModal,
    closeInputFieldEditModal,
    confirmInputFieldEdit,
    showInputFieldDeleteConfirm,
    closeInputFieldDeleteConfirm,
    confirmInputFieldDelete,
    onPlatformChange,
    onBinglanCallChannelChange,
    onModelTypeChange,
    updateYizhiAccounts
  };
})();
