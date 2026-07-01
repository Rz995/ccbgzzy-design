/**
 * ===================================================================
 * CCBGZZY_DESIGN · chart.js — 数据驱动图表组件
 * ===================================================================
 * 版本：v1.0.0-rc.12
 *
 * 核心：图表 = 「一份 spec（数据 + 类型分离）」 + 「一个渲染器」。
 *   - 换类型 = 改 spec.type 重渲染，spec.data 一字不动。
 *   - 颜色只从 CSS 变量取（--seq-* / --accent / --primary …），不硬编码，
 *     主题切换重绘即可——不破坏「禁止硬编码颜色」铁律。
 *   - 渐进增强：无 JS 时 <figure> 内的 <noscript> 降级（表格 / seq 条）仍可读。
 *
 * 页面写法：
 *   <figure class="ccbgzzy-chart" data-block-id="b7">
 *     <script type="application/json" class="ccbgzzy-chart-spec">
 *       {"type":"bar","title":"各区域营收",
 *        "data":{"labels":["华东","华南"],"series":[{"name":"营收","values":[120,90]}]},
 *        "options":{"accentIndex":0}}
 *     </script>
 *     <div class="ccbgzzy-chart-canvas" role="img" aria-label="各区域营收"></div>
 *     <noscript>…静态降级…</noscript>
 *   </figure>
 *
 * API（挂在 window）：
 *   CCBGZZY_renderChart(figureEl)      渲染单个图表
 *   CCBGZZY_renderAllCharts(root?)     渲染 root 下全部 .ccbgzzy-chart（默认 document）
 *   CCBGZZY_chartCompatTypes(spec)     该数据形状可切换的类型（纯函数，可单测）
 *   CCBGZZY_readChartSpec(figureEl)    读出 spec 对象
 *   CCBGZZY_writeChartSpec(figureEl,s) 写回 spec 并重渲染
 * ===================================================================
 */
(function () {
  'use strict';

  /* 类型兼容表：不是每种数据都能套每种图。换类型只给「和当前数据形状兼容」的。 */
  var COMPAT = {
    fewCat:  ['bar', 'pie', 'donut', 'rose'], // 单系列、类别少(≤5)
    manyCat: ['bar', 'line', 'area'],         // 单系列、类别多
    multi:   ['bar', 'line', 'area'],         // 多系列
  };
  function compatTypes(spec) {
    if (!spec || !spec.data) return ['bar'];
    var series = spec.data.series || [];
    if (series.length > 1) return COMPAT.multi.slice();
    return (spec.data.labels || []).length <= 5 ? COMPAT.fewCat.slice() : COMPAT.manyCat.slice();
  }
  var TYPE_LABEL = { bar: '柱状图', line: '折线图', area: '面积图', pie: '饼图', donut: '环形图', rose: '玫瑰图' };

  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function seqColors() { return [1, 2, 3, 4, 5].map(function (i) { return cssVar('--seq-' + i); }); }
  function colorFor(i, accentIdx) { return i === accentIdx ? cssVar('--accent') : seqColors()[i % 5]; }
  function svgEl(tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function readSpec(fig) {
    var s = fig.querySelector('.ccbgzzy-chart-spec');
    if (!s) return null;
    try { return JSON.parse(s.textContent); } catch (e) { return null; }
  }
  function writeSpec(fig, spec) {
    var s = fig.querySelector('.ccbgzzy-chart-spec');
    if (s) s.textContent = JSON.stringify(spec);
    renderChart(fig);
  }

  function renderChart(fig) {
    if (typeof document === 'undefined') return;
    var spec = readSpec(fig);
    var canvas = fig.querySelector('.ccbgzzy-chart-canvas');
    if (!spec || !canvas) return;
    canvas.innerHTML = '';
    var W = 620, H = 300, P = 40;
    var accentIdx = (spec.options || {}).accentIndex;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'ccbgzzy-chart-svg', role: 'img', 'aria-label': spec.title || '图表' });
    svg.setAttribute('width', '100%');
    var labels = (spec.data && spec.data.labels) || [];
    var series = (spec.data && spec.data.series) || [];
    var allVals = series.reduce(function (a, s) { return a.concat(s.values || []); }, []);
    var max = Math.max.apply(null, allVals.concat([1]));

    function txt(x, y, s) { var t = svgEl('text', { x: x, y: y, 'text-anchor': 'middle', 'font-size': 'var(--text-xs)', fill: cssVar('--fg-2') }); t.textContent = s; return t; }
    function baseline() { svg.appendChild(svgEl('line', { x1: P, y1: H - P, x2: W - P, y2: H - P, stroke: cssVar('--border-strong'), 'stroke-width': 1 })); }
    function arc(cx, cy, r, a0, a1, innerR) {
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      if (innerR > 0) {
        var xi0 = cx + innerR * Math.cos(a0), yi0 = cy + innerR * Math.sin(a0), xi1 = cx + innerR * Math.cos(a1), yi1 = cy + innerR * Math.sin(a1);
        return 'M' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1 + ' ' + y1 + ' L' + xi1 + ' ' + yi1 + ' A' + innerR + ' ' + innerR + ' 0 ' + large + ' 0 ' + xi0 + ' ' + yi0 + ' Z';
      }
      return 'M' + cx + ' ' + cy + ' L' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1 + ' ' + y1 + ' Z';
    }

    if (spec.type === 'bar') {
      var innerW = W - P * 2, innerH = H - P * 2, groupW = innerW / Math.max(labels.length, 1);
      var sn = series.length, bw = Math.min(46, groupW / (sn + 0.5));
      labels.forEach(function (lab, i) {
        series.forEach(function (s, si) {
          var v = s.values[i] || 0, h = (v / max) * innerH;
          var x = P + i * groupW + (groupW - bw * sn) / 2 + si * bw;
          var fill = sn > 1 ? seqColors()[(si + 1) % 5] : colorFor(i, accentIdx);
          svg.appendChild(svgEl('rect', { x: x, y: H - P - h, width: Math.max(bw - 4, 2), height: h, rx: 3, fill: fill }));
        });
        svg.appendChild(txt(P + i * groupW + groupW / 2, H - P + 16, lab));
      });
      baseline();
    } else if (spec.type === 'line' || spec.type === 'area') {
      var iW = W - P * 2, iH = H - P * 2, step = iW / Math.max(labels.length - 1, 1);
      series.forEach(function (s, si) {
        var pts = (s.values || []).map(function (v, i) { return [P + i * step, H - P - (v / max) * iH]; });
        var stroke = si === 0 ? cssVar('--primary') : seqColors()[(si + 2) % 5];
        if (spec.type === 'area') {
          var d = 'M' + P + ' ' + (H - P) + ' ' + pts.map(function (p) { return 'L' + p[0] + ' ' + p[1]; }).join(' ') + ' L' + (P + (labels.length - 1) * step) + ' ' + (H - P) + ' Z';
          svg.appendChild(svgEl('path', { d: d, fill: cssVar('--seq-2'), opacity: .55 }));
        }
        svg.appendChild(svgEl('polyline', { points: pts.map(function (p) { return p.join(','); }).join(' '), fill: 'none', stroke: stroke, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }));
        pts.forEach(function (p, i) { svg.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 3.5, fill: i === accentIdx ? cssVar('--accent') : stroke })); });
      });
      labels.forEach(function (lab, i) { svg.appendChild(txt(P + i * step, H - P + 16, lab)); });
      baseline();
    } else if (spec.type === 'pie' || spec.type === 'donut' || spec.type === 'rose') {
      var cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 30, inner = spec.type === 'donut' ? R * 0.55 : 0;
      var vals = (series[0] && series[0].values) || [], total = vals.reduce(function (a, b) { return a + b; }, 0) || 1;
      var a0 = -Math.PI / 2;
      vals.forEach(function (v, i) {
        var a1, r = R;
        if (spec.type === 'rose') { a1 = a0 + (2 * Math.PI / vals.length); r = R * Math.sqrt(v / max); } // 等角、半径∝值
        else { a1 = a0 + (v / total) * 2 * Math.PI; }
        svg.appendChild(svgEl('path', { d: arc(cx, cy, r, a0, a1, inner), fill: colorFor(i, accentIdx), stroke: cssVar('--surface'), 'stroke-width': 1.5 }));
        a0 = a1;
      });
    }
    canvas.appendChild(svg);
  }

  function renderAll(root) {
    if (typeof document === 'undefined') return;
    (root || document).querySelectorAll('.ccbgzzy-chart').forEach(renderChart);
  }

  /* 暴露 API（纯函数 compatTypes 即使无 document 也可调用，便于单测） */
  if (typeof window !== 'undefined') {
    window.CCBGZZY_chartCompatTypes = compatTypes;
    window.CCBGZZY_chartTypeLabel = function (t) { return TYPE_LABEL[t] || t; };
    window.CCBGZZY_readChartSpec = readSpec;
    window.CCBGZZY_writeChartSpec = writeSpec;
    window.CCBGZZY_renderChart = renderChart;
    window.CCBGZZY_renderAllCharts = renderAll;
  }

  /* 自动初始化（仅浏览器）。主题切换后由 theme-config 或页面再调 renderAllCharts 重绘。 */
  if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') renderAll();
    else document.addEventListener('DOMContentLoaded', function () { renderAll(); });
  }
})();
