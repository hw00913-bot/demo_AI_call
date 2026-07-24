/**
 * 全局公共函数 - app.js
 */
(function() {
  'use strict';

  /* ===== 公共工具函数 ===== */
  function formatNumber(num) {
    return num ? num.toLocaleString() : '0';
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  window.formatNumber = formatNumber;
  window.formatDate = formatDate;

})();
