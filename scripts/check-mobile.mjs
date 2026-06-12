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
}
await browser.close();

/* 输出 */
console.log('\nCCBGZZY_DESIGN · 移动端验收（Playwright）');
for (const row of rows) {
  console.log(`\n■ ${row.file} @ ${row.width}px  ${row.allPass ? '✓ PASS' : '✗ FAIL'}`);
  for (const c of row.checks) console.log(`    ${c.pass ? '✓' : '✗'} ${c.name} — ${c.detail}`);
}
console.log(`\n结果：${rows.length} 组用例，${failures} 组存在失败`);
process.exit(failures ? 1 : 0);
