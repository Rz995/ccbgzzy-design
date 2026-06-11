#!/usr/bin/env node
/**
 * CCBGZZY_DESIGN · lint.mjs
 * 交付前自检。用法：  node scripts/lint.mjs path/to/page.html
 * 退出码：有 error → 1；仅 warning / 通过 → 0
 *
 * 检查项（对应 SKILL.md 第十节）：
 *  1) 禁止任何 gradient
 *  2) 页面内容禁止硬编码颜色（重点查 style="" 内联）
 *  3) 必须含 CCBGZZY_DESIGN 水印
 *  4) 必须含版本号
 *  5) 小字号不得滥用（<16px 仅限 图例/脚注/水印/版本号 语境）
 *  6) !important 不得大量使用
 *  7) 第一屏不得是裸表格（table 前必须有结论区）
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const mode = (args.find(a => a.startsWith('--mode=')) || '--mode=single').split('=')[1]; // single | package
const file = args.find(a => !a.startsWith('--'));
if (!file) { console.error('用法: node scripts/lint.mjs <file.html> [--mode=single|package]'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8');

const errors = [];
const warns = [];
const SMALL_OK = /(watermark|legend|footnote|footer|version|caption|图例|脚注|水印|版本|--text-xs)/i;

/* 1) gradient */
const grad = [...html.matchAll(/(linear|radial|conic)-gradient/gi)];
if (grad.length) errors.push(`发现 ${grad.length} 处 gradient（全站必须纯色，禁止任何渐变）`);

/* 2) 硬编码颜色：聚焦内联 style="" 属性里的颜色 */
const inlineStyles = [...html.matchAll(/style\s*=\s*"([^"]*)"/gi)].map(m => m[1]);
let inlineColorHits = 0;
for (const s of inlineStyles) {
  if (/#[0-9a-fA-F]{3,8}\b/.test(s) || /\b(rgb|rgba|hsl|hsla)\s*\(/.test(s)) {
    if (!/var\(--/.test(s) || /#[0-9a-fA-F]{3,8}|\b(rgb|hsl)/.test(s.replace(/var\([^)]*\)/g, ''))) {
      inlineColorHits++;
    }
  }
}
if (inlineColorHits) errors.push(`发现 ${inlineColorHits} 处内联 style 里硬编码颜色（内容里只能用 var(--token)）`);

/* <style> 块里非 token 定义行的硬编码颜色（warning），先剥掉 CSS 注释避免误报 */
const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  .map(m => m[1]).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
let cssColorWarn = 0;
for (const line of styleBlocks.split('\n')) {
  const isTokenDef = /--[a-z0-9-]+\s*:/.test(line);          // --x: #hex  允许
  const usesVar = /var\(--/.test(line);
  const hasHardColor = /#[0-9a-fA-F]{3,8}\b/.test(line) || /\b(rgb|rgba|hsl|hsla)\s*\(/.test(line);
  if (hasHardColor && !isTokenDef && !usesVar && !/gradient/.test(line)) cssColorWarn++;
}
if (cssColorWarn) warns.push(`<style> 中有 ${cssColorWarn} 行疑似硬编码颜色（建议改用 token）`);

/* 3) 水印 */
if (!/CCBGZZY_DESIGN/.test(html)) errors.push('缺少 CCBGZZY_DESIGN 水印');
else {
  const hasMeta = /name=["']generator["'][^>]*CCBGZZY_DESIGN/i.test(html) || /CCBGZZY_initWatermark\s*\(/.test(html);
  if (!hasMeta) warns.push('未检测到 meta/initWatermark 水印注入（建议调用 CCBGZZY_initWatermark()）');
}

/* 4) 版本号（package 模式：版本号在外链 theme-config.js 里，静态扫不到，跳过此项） */
if (mode !== 'package') {
  if (!/CCBGZZY_DESIGN\s*v?\d/i.test(html) && !/CCBGZZY_VERSION/.test(html))
    errors.push('缺少版本号（应含 "CCBGZZY_DESIGN vX" 或 CCBGZZY_VERSION）');
} else if (!/theme-config\.js/.test(html)) {
  warns.push('package 模式但未引用 theme-config.js（版本号无来源）');
}

/* 5) 小字号滥用 */
const fontHits = [...html.matchAll(/font-size\s*:\s*([\d.]+)(px|rem)/gi)];
let smallBad = 0;
for (const m of fontHits) {
  const v = parseFloat(m[1]); const unit = m[2].toLowerCase();
  const px = unit === 'rem' ? v * 17 : v;            // 1rem≈17px（本系统基准）
  if (px < 15.5) {
    const ctx = html.slice(Math.max(0, m.index - 300), m.index + 60);
    if (!SMALL_OK.test(ctx)) smallBad++;
  }
}
if (smallBad) warns.push(`发现 ${smallBad} 处 <16px 字号且非(图例/脚注/水印/版本号)语境（正文/表格须 ≥16px）`);

/* 6) !important 滥用 */
const bang = (html.match(/!important/g) || []).length;
if (bang > 20) warns.push(`!important 使用 ${bang} 次（过多，建议重构样式优先级）`);

/* 7) 第一屏裸表格：table 前需有结论区 */
const tIdx = html.search(/<table[\s>]/i);
if (tIdx !== -1) {
  const before = html.slice(0, tIdx);
  const hasConclusion = /(class=["'][^"']*(kpi|eyebrow|summary|notice|section-title|hero)[^"']*["'])|结论|摘要|概览/i.test(before);
  if (!hasConclusion) errors.push('第一个 <table> 之前没有结论区（KPI/Summary/Notice）——表格不能当第一屏主角');
}

/* 8) 禁止内部设计/过程话术泄漏进成品 */
const bodyText = html
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');
const BANNED = ['同色阶', '单点强调', '横条看强弱', '弱组一眼', '明细靠后', '信息密度',
  '莫兰迪', '叙事顺序', '可亲近高级感', '定调子', '自动分诊'];
const leaked = BANNED.filter(t => bodyText.includes(t));
if (leaked.length) errors.push('成品里出现内部设计/过程话术（只能进 references，不能进页面）：' + leaked.join('、'));

/* 9) 首屏应有结论/关键指标区（叙事顺序：先结论） */
const firstChunk = bodyText.slice(0, 2200);
const hasLead = /(class=["'][^"']*(kpi|summary|eyebrow|section-title|hero|notice)[^"']*["'])|结论|摘要|概览|关键指标/i.test(firstChunk);
if (bodyText.replace(/\s/g, '').length > 400 && !hasLead) {
  warns.push('首屏未见结论 / 关键指标区（应先给结论或 KPI，再放明细）');
}

/* 10) 防陈旧 reveal：[data-reveal] 的 opacity:0 必须挂在 html.ccbgzzy-js 作用域下，
      否则无 JS / 静态渲染时核心内容会空白（渐进增强失效，多为陈旧构建）。 */
const styleAll = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const revealHide = styleAll.match(/(^|[}\s,])\s*\[data-reveal\][^{]*\{[^}]*opacity\s*:\s*0/gi) || [];
const scopedOK = /html\.ccbgzzy-js\s+\[data-reveal\][^{]*\{[^}]*opacity\s*:\s*0/i.test(styleAll);
if (revealHide.length && !scopedOK) {
  errors.push('[data-reveal] 的隐藏(opacity:0)未挂在 html.ccbgzzy-js 作用域下——无 JS 时核心内容会空白（疑似陈旧构建，请用最新 assets 重建）');
}

/* 输出 */
console.log(`\nCCBGZZY_DESIGN lint · ${file}`);
if (!errors.length && !warns.length) console.log('  ✓ 全部通过');
errors.forEach(e => console.log('  ✗ ERROR  ' + e));
warns.forEach(w => console.log('  ! WARN   ' + w));
console.log(`\n结果：${errors.length} error · ${warns.length} warning`);
process.exit(errors.length ? 1 : 0);
