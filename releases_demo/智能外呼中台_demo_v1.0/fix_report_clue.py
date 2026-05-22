import re

with open('js/pages/report-clue.js', 'r') as f:
    content = f.read()

# Fix table headers
content = content.replace('<th>A (高意向)</th><th>B (潜在)</th><th>C (一般)</th><th>D (忙碌/敷衍)</th><th>E (拒绝/无效)</th>',
                          '<th>A (高意向)客户数</th><th>B (潜在)客户数</th><th>C (一般)客户数</th><th>D (忙碌/敷衍)客户数</th><th>E (拒绝/无效)客户数</th>')

# Fix UI for tabs
old_manual_tab = '''          <!-- 外呼线索统计 -->
          <div id="tab-manual" class="tab-panel" style="display:flex;">
            <div class="sub-tab-bar"><div class="sub-tab-bar-inner">
              <div class="sub-tab-item active" onclick="switchSubTab(this,'manual-nev')">NEV 线索</div>
              <div class="sub-tab-item" onclick="switchSubTab(this,'manual-ice')">ICE 线索</div>
            </div></div>'''

new_manual_tab = '''          <!-- 外呼线索统计 -->
          <div id="tab-manual" class="tab-panel" style="display:flex; padding: 16px;">
            <div style="background: #fff; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; flex: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
              <div class="sub-tab-bar" style="border-bottom: none; padding: 0 0 16px 0; background: transparent;">
                <div class="sub-tab-bar-inner" style="gap: 12px;">
                  <div class="sub-tab-item active" style="border-radius: 16px; padding: 6px 16px; border: none; background: #1677ff; color: #fff; min-width: 80px; text-align: center;" onclick="switchSubTab(this,'manual-nev')">NEV 线索</div>
                  <div class="sub-tab-item" style="border-radius: 16px; padding: 6px 16px; border: none; background: #f0f2f5; color: #666; min-width: 80px; text-align: center;" onclick="switchSubTab(this,'manual-ice')">ICE 线索</div>
                </div>
              </div>'''
content = content.replace(old_manual_tab, new_manual_tab)

old_ai_tab = '''          <!-- 外呼线索明细 -->
          <div id="tab-ai" class="tab-panel" style="display:none;">
            <div class="sub-tab-bar"><div class="sub-tab-bar-inner">
              <div class="sub-tab-item active" onclick="switchSubTab(this,'ai-nev')">NEV 线索</div>
              <div class="sub-tab-item" onclick="switchSubTab(this,'ai-ice')">ICE 线索</div>
            </div></div>'''

new_ai_tab = '''          <!-- 外呼线索明细 -->
          <div id="tab-ai" class="tab-panel" style="display:none; padding: 16px;">
            <div style="background: #fff; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; flex: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
              <div class="sub-tab-bar" style="border-bottom: none; padding: 0 0 16px 0; background: transparent;">
                <div class="sub-tab-bar-inner" style="gap: 12px;">
                  <div class="sub-tab-item active" style="border-radius: 16px; padding: 6px 16px; border: none; background: #1677ff; color: #fff; min-width: 80px; text-align: center;" onclick="switchSubTab(this,'ai-nev')">NEV 线索</div>
                  <div class="sub-tab-item" style="border-radius: 16px; padding: 6px 16px; border: none; background: #f0f2f5; color: #666; min-width: 80px; text-align: center;" onclick="switchSubTab(this,'ai-ice')">ICE 线索</div>
                </div>
              </div>'''
content = content.replace(old_ai_tab, new_ai_tab)

old_return_tab = '''          <!-- 线索回流统计 -->
          <div id="tab-return" class="tab-panel" style="display:none;padding:16px;flex-direction:column;box-sizing:border-box;">'''

new_return_tab = '''          <!-- 线索回流统计 -->
          <div id="tab-return" class="tab-panel" style="display:none; padding: 16px;">
            <div style="background: #fff; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; flex: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">'''
content = content.replace(old_return_tab, new_return_tab)

# Find the ends of the tab panels and inject </div>
# The tab panels end before "<!-- 外呼线索明细 -->", "<!-- 线索回流统计 -->", and the final closing divs.
content = content.replace('          </div>\n\n          <!-- 外呼线索明细 -->', '            </div>\n          </div>\n\n          <!-- 外呼线索明细 -->')
content = content.replace('          </div>\n\n          <!-- 线索回流统计 -->', '            </div>\n          </div>\n\n          <!-- 线索回流统计 -->')

# The last tab-panel (tab-return) closing
content = re.sub(r'              \$\{renderPagination\(\)\}\n            </div>\n          </div>\n        </div>\n      </div>', 
                 '              ${renderPagination()}\n            </div>\n            </div>\n          </div>\n        </div>\n      </div>', content)


with open('js/pages/report-clue.js', 'w') as f:
    f.write(content)
