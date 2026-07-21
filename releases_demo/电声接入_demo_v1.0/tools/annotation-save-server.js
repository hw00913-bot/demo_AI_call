/**
 * tools/annotation-save-server.js — 标注数据本地写回服务
 *
 * 用法：node tools/annotation-save-server.js [--port=3457]
 * 默认监听 127.0.0.1:3457，仅接受本地请求。
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PORT = process.argv.find(a => a.startsWith('--port='))
  ? parseInt(process.argv.find(a => a.startsWith('--port=')).split('=')[1], 10)
  : 3457;

const ANNOTATIONS_FILE = path.resolve(__dirname, '..', 'annotations', 'annotations.js');

function readAnnotationsData() {
  try {
    const src = fs.readFileSync(ANNOTATIONS_FILE, 'utf8');
    // 提取 window.AnnotationData = { ... } 中的对象
    const match = src.match(/window\.AnnotationData\s*=\s*(\{[\s\S]*?\n\});?\s*$/m);
    if (!match) {
      console.error('[save-server] 无法解析 annotations.js: 找不到 AnnotationData');
      return null;
    }
    const sandbox = { result: null };
    vm.createContext(sandbox);
    vm.runInContext('result = (' + match[1] + ')', sandbox);
    return sandbox.result;
  } catch (err) {
    console.error('[save-server] 读取/解析 annotations.js 失败:', err.message);
    return null;
  }
}

function writeAnnotationsData(data) {
  const json = JSON.stringify(data, null, 2);
  // 将 JSON 的 "key" 转为 key（去掉键名的引号）
  const content = formatAsJS(json);
  const output = 'window.AnnotationData = ' + content + ';\n';
  fs.writeFileSync(ANNOTATIONS_FILE, output, 'utf8');
  console.log('[save-server] 已写入 annotations/annotations.js');
}

function formatAsJS(json) {
  // 把 JSON.stringify 生成的 "key": 改为 key: （不加引号）
  // 只替换作为对象键的引号，不替换字符串值中的引号
  return json.replace(/^(\s*)"([a-zA-Z_]\w*)":/gm, '$1$2:');
}

function saveItems(items) {
  const data = readAnnotationsData();
  if (!data) return false;

  items.forEach(function (item) {
    if (!item || !item.page || item.id == null) return;
    const page = item.page;
    if (!Array.isArray(data[page])) {
      data[page] = [];
    }
    const idx = data[page].findIndex(function (a) { return String(a.id) === String(item.id); });
    // 清理传入数据
    const entry = {
      id: String(item.id),
      page: item.page,
      target: item.target || '',
      position: {
        placement: (item.position && item.position.placement) || 'top-right',
        offsetX: (item.position && item.position.offsetX) || 0,
        offsetY: (item.position && item.position.offsetY) || 0
      },
      title: item.title || '',
      sections: item.sections || {},
      desc: item.desc || ''
    };
    if (idx >= 0) {
      data[page][idx] = entry;
    } else {
      data[page].push(entry);
    }
  });

  writeAnnotationsData(data);
  return true;
}

// CORS 支持
const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/__annotations/save') {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let body = '';
  req.on('data', function (chunk) { body += chunk; });
  req.on('end', function () {
    try {
      const payload = JSON.parse(body);
      const items = payload.items || (Array.isArray(payload) ? payload : [payload]);
      const ok = saveItems(items);
      res.writeHead(ok ? 200 : 500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: ok }));
    } catch (err) {
      console.error('[save-server] 请求处理失败:', err.message);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
});

server.listen(PORT, '127.0.0.1', function () {
  console.log('[save-server] 标注写回服务已启动: http://127.0.0.1:' + PORT + '/__annotations/save');
  console.log('[save-server] 目标文件: ' + ANNOTATIONS_FILE);
  console.log('[save-server] 按 Ctrl+C 停止');
});
