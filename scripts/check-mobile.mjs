#!/usr/bin/env node
/**
 * CCBGZZY_DESIGN · check-mobile.mjs
 * 真·移动端验收：用无头浏览器在多宽度实测，而不是只靠静态 lint。
 *
 * 用法：
 *   node scripts/check-mobile.mjs [file1.html file2.html ...]
 *   不传文件 → 默认测 assets/template.html、examples/example-report.html、
 *             examples/example-gallery.html、examples/interactive-demo.html，
 *             以及用 assets/template.html 现场构建的 single-file。
 *
 * 验收项（对应 SKILL.md「五·补」第 6 条）：
 *   ① 零横向滚动：document.documentElement.scrollWidth ≤ window.innerWidth
 *   ② 标题单行：.ccbgzzy-title-oneline 只占一行（getClientRects().length === 1）且未溢出（省略号生效）
 *   ③ 表格不横向滚动：每个 .data-table scrollWidth ≤ clientWidth
 *   ④ headroom：滚动 200px 后 <html> 带 .ccbgzzy-scrolled 且 appbar 变矮
 *   ⑤ 对比度（WCAG 2.1，对应 color-system.md 第 7 条）：正文/标题对其有效背景
 *      ≥4.5:1，大字(≥24px 或 ≥18.66px 粗体)≥3:1。每个文件在桌面宽度跑一次，
 *      失败计入退出码并打印最差几例。
 * 宽度：390 / 430 / 768 / 1280（手机竖屏 / 大手机 / 平板 / 桌面）。
 *
 * 依赖 Playwright（仓库未内置，避免给 skill 加重依赖）。本机首次运行：
 *   npm i -D playwright && npx playwright install chromium
 * 退出码：有失败 → 1；缺 Playwright → 2；全过 → 0。
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const WIDTHS = [390, 430, 768, 1280];
const MOBILE_MAX = 760; // 与 base.css 断点一致

let chromium;
try { ({ chromium } = await import('playwright')); }
catch {
  console.error('✗ 未找到 Playwright。请先在本机安装：\n    npm i -D playwright && npx playwright install chromium\n  （Playwright 不内置进 skill，避免给安装包加重依赖）');
  process.exit(2);
}

/* 收集待测文件 */
let files = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!files.length) {
  files = [
    path.join(repo, 'assets/template.html'),
    path.join(repo, 'examples/example-report.html'),
    path.join(repo, 'examples/example-gallery.html'),
    path.join(repo, 'examples/interactive-demo.html'),
  ].filter(fs.existsSync);
  // 现场用 template 构建一个 single-file 一并测
  try {
    const { execSync } = await import('node:child_process');
    const tmp = path.join(os.tmpdir(), 'ccbgzzy-template.single.html');
    execSync(`node ${path.join(here, 'build-single-file.mjs')} ${path.join(repo, 'assets/template.html')} ${tmp}`, { stdio: 'ignore' });
    if (fs.existsSync(tmp)) files.push(tmp);
  } catch {}
}
files = files.map(f => path.resolve(f));

const browser = await chromium.launch();
let failures = 0;
const rows = [];

for (const file of files) {
  if (!fs.existsSync(file)) { console.error('跳过（不存在）：' + file); continue; }
  const url = pathToFileURL(file).href;
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url));
    await page.waitForTimeout(350); // 等 theme-config.js 构建 appbar / mobile-title

    const r = await page.evaluate((MOBILE_MAX) => {
      const out = { checks: [] };
      const de = document.documentElement;
      // ① 零横向滚动
      out.checks.push({ name: '无横向滚动', pass: de.scrollWidth <= window.innerWidth + 1,
        detail: `scrollWidth ${de.scrollWidth} ≤ innerWidth ${window.innerWidth}` });
      // ② 标题单行（仅当存在 appbar 标题时）
      const title = document.querySelector('.ccbgzzy-title-oneline');
      if (title) {
        const lines = title.getClientRects().length;
        const noOverflow = title.scrollWidth <= title.clientWidth + 1;
        out.checks.push({ name: '标题单行', pass: lines === 1 && noOverflow,
          detail: `rects=${lines}, scrollW ${title.scrollWidth} ≤ clientW ${title.clientWidth}` });
      }
      // ③ 表格不横向滚动
      const tables = [...document.querySelectorAll('.data-table')];
      let tbad = 0, worst = '';
      tables.forEach(t => { if (t.scrollWidth > t.clientWidth + 1) { tbad++; worst = `${t.scrollWidth}>${t.clientWidth}`; } });
      if (tables.length) out.checks.push({ name: '表格不横向滚动', pass: tbad === 0,
        detail: tbad ? `${tbad}/${tables.length} 处溢出 (${worst})` : `${tables.length} 个表格均不溢出` });
      out.isMobile = window.innerWidth <= MOBILE_MAX;
      out.hasAppbar = !!document.querySelector('.ccbgzzy-appbar-inner');
      return out;
    }, MOBILE_MAX);

    // ④ headroom：滚动后 appbar 变矮
    if (r.hasAppbar) {
      const h0 = await page.evaluate(() => document.querySelector('.ccbgzzy-appbar-inner').offsetHeight);
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(250);
      const after = await page.evaluate(() => ({
        scrolled: document.documentElement.classList.contains('ccbgzzy-scrolled'),
        h: document.querySelector('.ccbgzzy-appbar-inner').offsetHeight,
      }));
      r.checks.push({ name: 'headroom 收缩', pass: after.scrolled && after.h < h0,
        detail: `scrolled=${after.scrolled}, 高 ${h0}→${after.h}` });
    }

    const allPass = r.checks.every(c => c.pass);
    if (!allPass) failures++;
    rows.push({ file: path.basename(file), width, allPass, checks: r.checks });
    await page.close();
  }

  /* ⑤ 对比度（WCAG）：与视口宽度无关，每个文件在桌面宽度跑一次即可 */
  const cpage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await cpage.goto(url, { waitUntil: 'networkidle' }).catch(() => cpage.goto(url));
  await cpage.waitForTimeout(350);
  const cr = await cpage.evaluate(() => {
    function parse(s) {
      if (!s) return null;
      const m = s.match(/rgba?\(([^)]+)\)/i);
      if (!m) return null;
      const p = m[1].split(',').map(x => x.trim());
      const r = parseFloat(p[0]), g = parseFloat(p[1]), b = parseFloat(p[2]);
      const a = p[3] === undefined ? 1 : parseFloat(p[3]);
      if ([r, g, b].some(Number.isNaN)) return null;
      return { r, g, b, a: Number.isNaN(a) ? 1 : a };
    }
    function over(fg, bg) { // alpha 合成 fg over 不透明 bg
      const a = fg.a;
      return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) };
    }
    function effectiveBg(el) {
      const layers = [];
      let node = el;
      while (node) {
        const c = parse(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0) layers.push(c);
        node = node.parentElement;
      }
      let base = { r: 255, g: 255, b: 255 }; // 兜底白底
      for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
      return base;
    }
    function lum({ r, g, b }) {
      const a = [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    function ratio(c1, c2) { const l1 = lum(c1), l2 = lum(c2); const hi = Math.max(l1, l2), lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); }
    function hasOwnText(el) {
      for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim().length) return true;
      return false;
    }
    const fails = [];
    let checked = 0;
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('[aria-hidden="true"], script, style, svg, #ccbgzzy-watermark')) return;
      if (!hasOwnText(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.1) return;
      const fg = parse(cs.color); if (!fg) return;
      const bg = effectiveBg(el);
      const fgC = fg.a < 1 ? over(fg, bg) : fg;
      const size = parseFloat(cs.fontSize) || 16;
      const weight = parseInt(cs.fontWeight, 10) || 400;
      const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = isLarge ? 3 : 4.5;
      const cratio = ratio(fgC, bg);
      checked++;
      if (cratio + 0.05 < need) {
        const txt = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24);
        fails.push({ ratio: +cratio.toFixed(2), need, size: Math.round(size), tag: el.tagName.toLowerCase(), cls: (el.className && el.className.toString) ? el.className.toString().slice(0, 30) : '', txt });
      }
    });
    fails.sort((a, b) => a.ratio - b.ratio);
    return { checked, fails: fails.slice(0, 6), total: fails.length };
  });
  await cpage.close();
  const cPass = cr.total === 0;
  if (!cPass) failures++;
  rows.push({
    file: path.basename(file), width: '对比度', allPass: cPass,
    checks: [{
      name: 'WCAG 对比度', pass: cPass,
      detail: cPass ? `${cr.checked} 个文本节点均达标`
        : `${cr.total}/${cr.checked} 处不达标，最差：` + cr.fails.map(f => `${f.ratio}:1(需${f.need},${f.size}px,<${f.tag}${f.cls ? '.' + f.cls.split(' ')[0] : ''}>"${f.txt}")`).join('；'),
    }],
  });
}
await browser.close();

/* 输出 */
console.log('\nCCBGZZY_DESIGN · 移动端验收（Playwright）');
for (const row of rows) {
  const w = typeof row.width === 'number' ? `${row.width}px` : row.width;
  console.log(`\n■ ${row.file} @ ${w}  ${row.allPass ? '✓ PASS' : '✗ FAIL'}`);
  for (const c of row.checks) console.log(`    ${c.pass ? '✓' : '✗'} ${c.name} — ${c.detail}`);
}
console.log(`\n结果：${rows.length} 组用例，${failures} 组存在失败`);
process.exit(failures ? 1 : 0);
