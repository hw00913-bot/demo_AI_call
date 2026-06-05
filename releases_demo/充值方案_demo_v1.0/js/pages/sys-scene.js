/**
 * js/pages/sys-scene.js — 业务场景管理页
 */

(function () {
  /* 业务场景 mock 数据 */
  const MockSceneRows = [
    { id: 1, name: '燃油车新线索-一知', sceneId: '2021498427234983938', code: 'AI-XXY', category: '新线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 2, name: 'NEV-留资未满-N6推荐', sceneId: '2048744508251602945', code: 'NEV-LZWM-N6', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 3, name: 'NEV-冷线索-天籁推荐-0410版', sceneId: '2046521635889888801', code: 'TL-LXY', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 4, name: 'NEV-留资未满-N7推荐', sceneId: '2048741810617876481', code: 'NEV-LZWM-N7', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 5, name: 'NEV-留资未满-天籁推荐', sceneId: '2048742457857703938', code: 'NEV-LZWM-TL', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 6, name: 'NEV-留资未满-NX8推荐', sceneId: '2048743349159886849', code: 'NEV-LZWM-NX8', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
    { id: 7, name: 'DCC-一知-N7冷线索', sceneId: '2027729970601218049', code: 'DCC-YZ-N7-LXS', category: '冷线索', tenant: '东风日产-燃油车', updater: '-', updateTime: '2026-05-19 08:30:10' },
  ];

  function render() {
    const tableRows = MockSceneRows.map(row => `
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
          <a href="#" class="biz-action-edit" onclick="event.preventDefault();showToast('编辑功能开发中','info')">编辑</a>
          <a href="#" class="biz-action-delete" onclick="event.preventDefault();showToast('删除功能开发中','info')">删除</a>
        </td>
      </tr>
    `).join('');

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
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /* ===== 新建业务场景抽屉 ===== */
  function showAddModal() {
    const html = `
      <div class="biz-drawer-backdrop" id="bizAddSceneBackdrop" onclick="window.Pages['sys-scene'].closeAddModal(event)">
        <div class="biz-drawer" id="bizAddSceneDrawer" onclick="event.stopPropagation()" data-current-step="1">
          <div class="biz-drawer-header">
            <span class="biz-drawer-title">新建业务场景</span>
            <span class="biz-drawer-close" onclick="window.Pages['sys-scene'].closeAddModal()">&#x2715;</span>
          </div>

          <div class="biz-drawer-body">
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
                  <label class="biz-form-label required">场景类型</label>
                  <div class="biz-form-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="sceneType" value="首访"><span>首访</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="服务"><span>服务</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="回访"><span>回访</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="新线索"><span>新线索</span></label>
                      <label class="biz-radio"><input type="radio" name="sceneType" value="冷线索"><span>冷线索</span></label>
                    </div>
                    <span class="biz-help-icon" title="场景类型说明" onclick="showToast('场景类型说明开发中','info')">&#9432;</span>
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
                  <label class="biz-form-label">场景描述</label>
                  <div class="biz-form-field">
                    <textarea class="biz-form-textarea" placeholder="请输入场景简要描述" rows="3"></textarea>
                  </div>
                </div>

                <div class="biz-form-row" style="align-items:flex-start;">
                  <label class="biz-form-label required">业务信息</label>
                  <div class="biz-form-field" style="flex-direction:column;align-items:flex-start;gap:0;">
                    <div class="biz-inner-tabs">
                      <div class="biz-inner-tab active" onclick="window.Pages['sys-scene'].switchBizTab(this,'input')">场景传入信息</div>
                      <div class="biz-inner-tab" onclick="window.Pages['sys-scene'].switchBizTab(this,'extract')">场景提取信息</div>
                    </div>
                    <div class="biz-inner-panel" id="bizPanel-input">
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
            <div id="stepContent2" class="step-content" style="display:none;">
              <div class="biz-form">
                <div class="biz-form-row">
                  <label class="biz-form-label required">智能平台</label>
                  <div class="biz-form-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="platform" value="冰兰" onchange="window.Pages['sys-scene'].onPlatformChange()"><span>冰兰</span></label>
                      <label class="biz-radio"><input type="radio" name="platform" value="科大讯飞" onchange="window.Pages['sys-scene'].onPlatformChange()"><span>科大讯飞</span></label>
                      <label class="biz-radio"><input type="radio" name="platform" value="一知科技" checked onchange="window.Pages['sys-scene'].onPlatformChange()"><span>一知科技</span></label>
                    </div>
                    <span class="biz-help-icon" title="智能平台说明" onclick="showToast('智能平台说明开发中','info')">&#9432;</span>
                  </div>
                </div>

                <div class="biz-form-row">
                  <label class="biz-form-label required">数据导入方式</label>
                  <div class="biz-form-field">
                    <div class="biz-radio-group">
                      <label class="biz-radio"><input type="radio" name="importType" value="手动导入"><span>手动导入</span></label>
                      <label class="biz-radio"><input type="radio" name="importType" value="自动传入"><span>自动传入</span></label>
                    </div>
                  </div>
                </div>

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
            <button class="btn btn-primary" onclick="window.Pages['sys-scene'].nextStep()" style="height:32px;padding:0 20px;">确定</button>
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
    // 初始化平台状态（处理一知科技默认选中的情况，change 事件不会自动触发）
    onPlatformChange();
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

  /* ===== 步骤切换 ===== */
  function nextStep() {
    const drawer = document.querySelector('.biz-drawer');
    if (!drawer) return;
    let step = parseInt(drawer.dataset.currentStep || '1');
    if (step >= 3) return;
    goToStep(step + 1);
  }

  function prevStep() {
    const drawer = document.querySelector('.biz-drawer');
    if (!drawer) return;
    let step = parseInt(drawer.dataset.currentStep || '1');
    if (step <= 1) return;
    goToStep(step - 1);
  }

  function goToStep(step) {
    const drawer = document.querySelector('.biz-drawer');
    if (!drawer) return;
    drawer.dataset.currentStep = step;

    // 更新步骤条
    const s1 = document.getElementById('bizStep1');
    const s2 = document.getElementById('bizStep2');
    const s3 = document.getElementById('bizStep3');
    const l1 = document.getElementById('bizLine1');
    const l2 = document.getElementById('bizLine2');

    if (s1) { s1.classList.remove('active','completed'); if (step > 1) s1.classList.add('completed'); else if (step === 1) s1.classList.add('active'); }
    if (s2) { s2.classList.remove('active','completed'); if (step > 2) s2.classList.add('completed'); else if (step === 2) s2.classList.add('active'); }
    if (s3) { s3.classList.remove('active','completed'); if (step === 3) s3.classList.add('active'); }
    if (l1) { l1.classList.toggle('active', step > 1); }
    if (l2) { l2.classList.toggle('active', step > 2); }

    // 切换内容（纯内联样式控制）
    const panels = drawer.querySelectorAll('.step-content');
    panels.forEach(p => { p.style.display = 'none'; });
    const activePanel = drawer.querySelector('#stepContent' + step);
    if (activePanel) { activePanel.style.display = 'block'; }

    // Step 2 进入时初始化平台状态（Step 2 包含智能平台 + 一知账号行）
    if (step === 2) { onPlatformChange(); }

    // 更新底部按钮
    const footer = document.getElementById('bizModalFooter');
    if (!footer) return;
    if (step === 1) {
      footer.innerHTML = `
        <button class="btn btn-default" onclick="window.Pages['sys-scene'].closeAddModal()" style="height:32px;padding:0 20px;">取消</button>
        <button class="btn btn-primary" onclick="window.Pages['sys-scene'].nextStep()" style="height:32px;padding:0 20px;">确定</button>
      `;
    } else if (step === 2) {
      footer.innerHTML = `
        <button class="btn btn-default" onclick="window.Pages['sys-scene'].prevStep()" style="height:32px;padding:0 20px;">上一步</button>
        <button class="btn btn-primary" onclick="window.Pages['sys-scene'].nextStep()" style="height:32px;padding:0 20px;">确定</button>
      `;
    } else if (step === 3) {
      footer.innerHTML = `
        <button class="btn btn-primary" onclick="window.Pages['sys-scene'].closeAddModal()" style="height:32px;padding:0 20px;">完成</button>
      `;
    }
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
    // 兼容 style="display:none" 和 style="display: none" 两种写法
    const activePanel = document.querySelector('.biz-inner-panel:not([style*="display:none"]):not([style*="display: none"])') || document.getElementById('bizPanel-input');
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

  /* 智能平台切换时控制一知账号行显隐 */
  function onPlatformChange() {
    const platform = document.querySelector('input[name="platform"]:checked');
    const modelTypeRow = document.getElementById('modelTypeRow');
    const yizhiAccountRow = document.getElementById('yizhiAccountRow');
    const yizhiAccount = document.getElementById('yizhiAccount');
    if (!modelTypeRow || !yizhiAccountRow || !yizhiAccount) return;

    if (platform && platform.value === '一知科技') {
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
  window.Pages['sys-scene'] = { render, init, showAddModal, closeAddModal, updateCharCount, switchBizTab, nextStep, prevStep, goToStep, showFieldModal, closeFieldModal, confirmAddField, onPlatformChange, onModelTypeChange, updateYizhiAccounts };
})();
