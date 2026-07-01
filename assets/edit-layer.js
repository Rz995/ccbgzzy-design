/**
 * ===================================================================
 * CCBGZZY_DESIGN · edit-layer.js — 可选编辑层（默认不进交付版）
 * ===================================================================
 * 版本：v1.0.0-rc.12
 *
 * 作用：让生成好的页面可「行内改字 + 换图表类型」，并支持 AI「块级重生成」
 *       而不冲掉用户已做的手改。锁定交付前移除本层即得不可编辑版。
 *
 * 设计铁律（与设计方案一致）：
 *   页面的「真相」可随时从带 data-block-id 的节点派生为 blocks 模型；
 *   用户手改 + AI 重生成都是对模型的「补丁」，**补丁只带一个 blockId，
 *   只动那一块**，永远不是整页重写。这是「重生成不冲掉手改」的根本。
 *
 * 页面约定：
 *   - 可编辑文本节点：加 data-ccbgzzy-edit（如 <p data-block-id="b2" data-ccbgzzy-edit>…</p>）。
 *   - 图表：用 chart.js 的 <figure class="ccbgzzy-chart" data-block-id="b7">（含 spec）。
 *
 * API（挂 window）：
 *   CCBGZZY_validatePatch(p)            纯函数：补丁是否合法（拒整页/拒格式错）
 *   CCBGZZY_mergePatch(model, p)        纯函数：把补丁并进 model（只动一块），可单测
 *   CCBGZZY_enableEdit(on)              开/关编辑态
 *   CCBGZZY_collectModel()              从 DOM 派生当前 blocks 模型
 *   CCBGZZY_applyPatch(patchObj)        把块级补丁应用到实时 DOM（自带快照供撤销）
 *   CCBGZZY_undo()                      撤销上一次补丁
 *   CCBGZZY_buildRegenRequest(id, ins)  生成「作用域=单块」的重生成请求对象
 *   CCBGZZY_exportLocked()              返回去掉编辑层的锁定 HTML 字符串
 * ===================================================================
 */
(function () {
  'use strict';

  /* ---------- 纯逻辑（无 DOM 依赖，可在 node 里单测） ---------- */
  function deepMerge(t, s) {
    for (var k in s) {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
      if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])) { t[k] = t[k] || {}; deepMerge(t[k], s[k]); }
      else t[k] = s[k];
    }
    return t;
  }
  function validatePatch(p) {
    if (!p || typeof p !== 'object') return { ok: false, reason: 'not-object' };
    if (p.blocks || Array.isArray(p)) return { ok: false, reason: 'full-doc-rejected' }; // 整页文档一律拒
    if (!p.blockId || !p.patch || typeof p.patch !== 'object' || Array.isArray(p.patch)) return { ok: false, reason: 'bad-format' };
    return { ok: true };
  }
  function mergePatch(model, p) {
    var v = validatePatch(p); if (!v.ok) return v;
    if (!model || !Array.isArray(model.blocks)) return { ok: false, reason: 'no-model' };
    var b = null;
    for (var i = 0; i < model.blocks.length; i++) if (model.blocks[i].id === p.blockId) { b = model.blocks[i]; break; }
    if (!b) return { ok: false, reason: 'no-id:' + p.blockId };
    deepMerge(b, p.patch);          // 只动这一块
    return { ok: true, blockId: p.blockId };
  }

  if (typeof window !== 'undefined') {
    window.CCBGZZY_deepMerge = deepMerge;
    window.CCBGZZY_validatePatch = validatePatch;
    window.CCBGZZY_mergePatch = mergePatch;
  }

  /* ---------- 以下为 DOM 胶水，仅浏览器 ---------- */
  if (typeof document === 'undefined') return;

  var editing = false;
  var snapshots = []; // 撤销栈：每项 {blockId, html}

  function toast(msg) {
    var t = document.getElementById('ccbgzzy-edit-toast');
    if (!t) { t = document.createElement('div'); t.id = 'ccbgzzy-edit-toast'; t.setAttribute('aria-live', 'polite');
      t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:var(--title);color:var(--bg);padding:10px 18px;border-radius:10px;font-size:var(--text-sm);z-index:2147483600;transition:opacity .25s;opacity:0';
      document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = '1'; clearTimeout(t._t); t._t = setTimeout(function () { t.style.opacity = '0'; }, 1800);
  }
  function blockEl(id) { return document.querySelector('[data-block-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]'); }
  function isChart(el) { return el && el.classList.contains('ccbgzzy-chart'); }

  /* 从 DOM 派生模型：每个带 data-block-id 的节点 → 一个 block */
  function collectModel() {
    var blocks = [];
    document.querySelectorAll('[data-block-id]').forEach(function (el) {
      if (isChart(el) && window.CCBGZZY_readChartSpec) {
        blocks.push({ id: el.dataset.blockId, type: 'chart', spec: window.CCBGZZY_readChartSpec(el) });
      } else {
        var t = el.querySelector('[data-ccbgzzy-edit]') || el;
        blocks.push({ id: el.dataset.blockId, type: el.dataset.blockType || 'text', text: t.textContent.trim() });
      }
    });
    return { version: '1.0', blocks: blocks };
  }

  /* 应用块级补丁到实时 DOM —— 只动 patchObj.blockId 那一块 */
  function applyPatch(patchObj) {
    var v = validatePatch(patchObj);
    if (!v.ok) { toast('✗ 拒绝补丁：' + v.reason); return false; }
    var el = blockEl(patchObj.blockId);
    if (!el) { toast('✗ 找不到 blockId：' + patchObj.blockId); return false; }
    snapshots.push({ blockId: patchObj.blockId, html: el.outerHTML }); // 快照供撤销

    if (isChart(el) && patchObj.patch.spec && window.CCBGZZY_readChartSpec) {
      var spec = window.CCBGZZY_readChartSpec(el) || {};
      deepMerge(spec, patchObj.patch.spec);
      window.CCBGZZY_writeChartSpec(el, spec); // 写回 + 只重画这张图
    } else if (typeof patchObj.patch.text === 'string') {
      var t = el.querySelector('[data-ccbgzzy-edit]') || el;
      t.textContent = patchObj.patch.text;
    } else {
      toast('✗ 补丁无可应用字段（spec/text）'); snapshots.pop(); return false;
    }
    toast('✓ 已对 ' + patchObj.blockId + ' 打补丁，其它块未动');
    return true;
  }
  function undo() {
    var s = snapshots.pop(); if (!s) { toast('无可撤销'); return; }
    var el = blockEl(s.blockId); if (!el) return;
    el.outerHTML = s.html;
    if (window.CCBGZZY_renderChart) { var f = blockEl(s.blockId); if (isChart(f)) window.CCBGZZY_renderChart(f); }
    bindEditing(); toast('已撤销');
  }

  /* 生成「作用域=单块」的重生成请求（贴回对话给 Claude；Claude 只回该块补丁） */
  function buildRegenRequest(blockId, instruction) {
    var el = blockEl(blockId); if (!el) return null;
    var current = isChart(el) && window.CCBGZZY_readChartSpec ? { spec: window.CCBGZZY_readChartSpec(el) } : { text: (el.querySelector('[data-ccbgzzy-edit]') || el).textContent.trim() };
    return {
      action: 'regenerate', blockId: blockId,
      instruction: instruction || '（描述如何修改这一块；只返回该 blockId 的补丁，禁止重发整页）',
      current: current,
    };
  }

  /* 编辑态：行内改字 + 图表类型下拉 */
  function bindEditing() {
    document.querySelectorAll('[data-ccbgzzy-edit]').forEach(function (el) {
      el.contentEditable = editing ? 'true' : 'false';
      if (editing && !el._ccEditBound) {
        el._ccEditBound = true;
        el.addEventListener('paste', function (e) { // 护栏：只粘纯文本，杜绝外来颜色/字号
          e.preventDefault();
          var txt = (e.clipboardData || window.clipboardData).getData('text');
          document.execCommand('insertText', false, txt);
        });
      }
    });
    document.querySelectorAll('.ccbgzzy-chart[data-block-id]').forEach(function (fig) {
      var existing = fig.querySelector('.ccbgzzy-chart-tools');
      if (!editing) { if (existing) existing.remove(); return; }
      if (existing || !window.CCBGZZY_chartCompatTypes) return;
      var spec = window.CCBGZZY_readChartSpec(fig); if (!spec) return;
      var tools = document.createElement('div'); tools.className = 'ccbgzzy-chart-tools';
      tools.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:10px;font-size:var(--text-sm);color:var(--fg-2)';
      var lab = document.createElement('span'); lab.textContent = '图表类型：';
      var sel = document.createElement('select');
      sel.style.cssText = 'font:inherit;padding:6px 10px;border-radius:8px;border:1px solid var(--border-strong);background:var(--surface);color:var(--fg)';
      window.CCBGZZY_chartCompatTypes(spec).forEach(function (t) {
        var o = document.createElement('option'); o.value = t; o.textContent = window.CCBGZZY_chartTypeLabel(t);
        if (t === spec.type) o.selected = true; sel.appendChild(o);
      });
      sel.addEventListener('change', function () {
        snapshots.push({ blockId: fig.dataset.blockId, html: fig.outerHTML });
        var s = window.CCBGZZY_readChartSpec(fig); s.type = sel.value;
        window.CCBGZZY_writeChartSpec(fig, s);
        toast('已换图表类型 · 数据未动');
      });
      tools.appendChild(lab); tools.appendChild(sel);
      fig.insertBefore(tools, fig.firstChild);
    });
    document.documentElement.classList.toggle('ccbgzzy-editing', editing);
  }
  function enableEdit(on) { editing = on === undefined ? !editing : !!on; bindEditing(); return editing; }

  /* 导出锁定 HTML：克隆全文，去掉编辑层脚本/工具/contenteditable */
  function exportLocked() {
    var doc = document.documentElement.cloneNode(true);
    doc.classList.remove('ccbgzzy-editing');
    doc.querySelectorAll('.ccbgzzy-chart-tools, #ccbgzzy-edit-toast, [data-ccbgzzy-edit-ui]').forEach(function (n) { n.remove(); });
    doc.querySelectorAll('script[src*="edit-layer"]').forEach(function (n) { n.remove(); });
    doc.querySelectorAll('[contenteditable]').forEach(function (n) { n.removeAttribute('contenteditable'); });
    doc.querySelectorAll('[data-ccbgzzy-edit]').forEach(function (n) { n.removeAttribute('data-ccbgzzy-edit'); });
    return '<!DOCTYPE html>\n' + doc.outerHTML;
  }

  window.CCBGZZY_collectModel = collectModel;
  window.CCBGZZY_applyPatch = applyPatch;
  window.CCBGZZY_undo = undo;
  window.CCBGZZY_buildRegenRequest = buildRegenRequest;
  window.CCBGZZY_enableEdit = enableEdit;
  window.CCBGZZY_exportLocked = exportLocked;
})();
