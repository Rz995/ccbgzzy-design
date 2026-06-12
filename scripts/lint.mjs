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
 *  5) 字号角色：业务 CSS 不随手写 font-size，正文/表格不低于 16px
 *  6) !important 不得大量使用
 *  7) 第一屏不得是裸表格（table 前必须有结论区）
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const mode = (args.find(a => a.startsWith('--mode=')) || '--mode=single').split('=')[1]; // single | package
const file = args.find(a => !a.startsWith('--'));
if (!file) { console.error('用法: node scripts/lint.mjs <file.html> [--mode=single|package]'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8');

/* 收集外链样式表内容：package 模式 CSS 在外链 base.css 里，质量门也要能看到它，
   否则会把"规则其实在 base.css"误判成缺规则。href 相对被检查文件目录解析。 */
const linkedCssHrefs = [...html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi)].map(m => m[1]);
const linkedCss = linkedCssHrefs.map(href => {
  if (/^https?:|^\/\//i.test(href)) return '';                 // 远程样式表不读
  try { return fs.readFileSync(path.resolve(path.dirname(file), href), 'utf8'); } catch { return ''; }
}).join('\n');
/* 规则可见范围 = 内联 HTML + 外链 CSS（single 模式 linkedCss 为空，行为不变） */
const cssScope = html + '\n' + linkedCss;
const markupNoAssets = html
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '');

const errors = [];
const warns = [];
const SMALL_OK = /(watermark|legend|footnote|footer|version|caption|badge|tag|cal-tag|cal-date|cal-more|kpi-label|kpi-sub|eyebrow|table-info|theme|appbar|drawer|popover|icon|角标|图例|脚注|水印|版本|标签|徽章|--text-xs|--text-meta|--text-tag|--text-footnote)/i;
const AUTH_FONT_VALUE = /var\(--text-(display|page-title|section-title|section-title-sm|card-title|body|table|meta|tag|footnote|hero|h1|h2|h3|h4|lead|sm|xs)\)|inherit|initial|unset|clamp\(/i;

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
if (cssColorWarn) errors.push(`<style> 中有 ${cssColorWarn} 行疑似硬编码颜色（业务 CSS 必须改用 token）`);

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

/* 5) 字号角色：小字号滥用 + 未授权 font-size */
const fontHits = [...html.matchAll(/font-size\s*:\s*([\d.]+)(px|rem)/gi)];
let smallBad = 0;
for (const m of fontHits) {
  const v = parseFloat(m[1]); const unit = m[2].toLowerCase();
  const px = unit === 'rem' ? v * 16 : v;            // 1rem≈16px（本系统基准）
  if (px < 15.5) {
    const ctx = html.slice(Math.max(0, m.index - 300), m.index + 60);
    if (!SMALL_OK.test(ctx)) smallBad++;
  }
}
if (smallBad) warns.push(`发现 ${smallBad} 处 <16px 字号且非(图例/脚注/水印/版本号)语境（正文/表格须 ≥16px）`);

/* 只审"业务 CSS"（页面作者写的 <style>），跳过内联进来的框架资源 base.css/effects.css——
   框架里 html{font-size:17px} / .kpi-value{3rem} 是系统定义，不该被业务字号闸误杀。 */
const FRAMEWORK_BLOCK = /·\s*base\.css|·\s*effects\.css|theme-config\.js|统一基底/i;
const businessStyleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  .map(m => m[1]).filter(b => !FRAMEWORK_BLOCK.test(b))
  .join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
const styleFontDecls = [...businessStyleBlocks.matchAll(/font-size\s*:\s*([^;}\n]+)/gi)];
let unauthFont = 0;
for (const m of styleFontDecls) {
  const value = m[1].trim();
  const ctx = businessStyleBlocks.slice(Math.max(0, m.index - 180), m.index + 120);
  if (AUTH_FONT_VALUE.test(value)) continue;
  if (/svg|chart|watermark|version|theme|icon|ccbgzzy-watermark/i.test(ctx)) continue;
  unauthFont++;
}
const inlineFontDecls = inlineStyles.filter(s => /font-size\s*:/i.test(s));
for (const s of inlineFontDecls) {
  const m = s.match(/font-size\s*:\s*([^;]+)/i);
  if (m && !AUTH_FONT_VALUE.test(m[1]) && !SMALL_OK.test(s)) unauthFont++;
}
if (unauthFont) warns.push(`发现 ${unauthFont} 处未授权 font-size（业务页面应使用 --text-* 语义字号变量或组件类）`);

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

/* 9.5) accent 使用预算：业务 HTML 中 accent 只能是少数焦点。
   组件图鉴/showcase 页（<body data-ccbgzzy-showcase>）会刻意演示多种 accent 用法，豁免本项。 */
const isShowcase = /data-ccbgzzy-showcase/i.test(html);
if (!isShowcase) {
  const accentHits =
    (markupNoAssets.match(/\bis-pop\b/g) || []).length +
    (markupNoAssets.match(/\bpop\b/g) || []).length +
    (markupNoAssets.match(/\bis-accent\b/g) || []).length +
    (markupNoAssets.match(/var\(--accent\)/g) || []).length;
  if (accentHits > 8) warns.push(`accent 使用 ${accentHits} 处，疑似超过"整页 1-2 个焦点"预算`);
}

/* 10) 防陈旧 reveal：[data-reveal] 的 opacity:0 必须挂在 html.ccbgzzy-js 作用域下，
      否则无 JS / 静态渲染时核心内容会空白（渐进增强失效，多为陈旧构建）。 */
const styleAll = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const revealHide = styleAll.match(/(^|[}\s,])\s*\[data-reveal\][^{]*\{[^}]*opacity\s*:\s*0/gi) || [];
const scopedOK = /html\.ccbgzzy-js\s+\[data-reveal\][^{]*\{[^}]*opacity\s*:\s*0/i.test(styleAll);
if (revealHide.length && !scopedOK) {
  errors.push('[data-reveal] 的隐藏(opacity:0)未挂在 html.ccbgzzy-js 作用域下——无 JS 时核心内容会空白（疑似陈旧构建，请用最新 assets 重建）');
}

/* 11) 移动端表格必须转卡片（防 ≤760px 横向拖拽）：有 <table> 就必须含 mobile table-card 规则
      规则可能在内联 <style> 或外链 base.css 里——两处都查（package 模式 CSS 在外链）。 */
if (/<table[\s>]/i.test(html)) {
  const hasMobileCard = /\.table tbody td\[data-label\]::before/i.test(cssScope);
  if (!hasMobileCard) errors.push('含 <table> 但缺移动端 table-card 规则（≤760px 会横向拖拽）——请用最新 base.css 重建');
  // 软检查：表格 td 是否有 data-label（移动端卡片字段名）
  const tdAll = (html.match(/<td(\s|>)/gi) || []).length;
  const tdLabeled = (html.match(/<td[^>]*\bdata-label=/gi) || []).length;
  const tdRole = (html.match(/<td[^>]*\bdata-mobile-(title|actions|hide)/gi) || []).length;
  if (tdAll > 0 && (tdLabeled + tdRole) < tdAll * 0.5) {
    warns.push('过半 <td> 缺 data-label / data-mobile-*（移动端卡片将没有字段名，建议补充）');
  }
}

/* 12) 移动端横向溢出保险：含 <table>/.data-table 的页面应含 overflow-x:clip 守卫（内联或外链 base.css 均可） */
if (/<table[\s>]/i.test(html) && !/overflow-x:\s*clip/i.test(cssScope)) {
  warns.push('未检测到 overflow-x:clip 横向溢出守卫（请用最新 base.css）');
}

function classesFromTag(raw) {
  const m = raw.match(/\bclass\s*=\s*["']([^"']*)["']/i);
  return m ? m[1].split(/\s+/).filter(Boolean) : [];
}
function hasAnyClass(classes, names) {
  return classes.some(c => names.includes(c));
}
function countCalGridWithoutReportAncestor(markup) {
  const stack = [];
  let bad = 0;
  const tagRe = /<\/?([a-zA-Z][\w:-]*)([^<>]*)>/g;
  let m;
  while ((m = tagRe.exec(markup))) {
    const raw = m[0];
    const tag = m[1].toLowerCase();
    if (raw.startsWith('</')) {
      for (let i = stack.length - 1; i >= 0; i--) {
        const item = stack.pop();
        if (item.tag === tag) break;
      }
      continue;
    }
    const classes = classesFromTag(raw);
    if (classes.includes('cal-grid')) {
      const inReport = hasAnyClass(classes, ['cal-report', 'calendar-report']) ||
        stack.some(item => hasAnyClass(item.classes, ['cal-report', 'calendar-report']));
      if (!inReport) bad++;
    }
    const selfClosing = /\/>$/.test(raw) || /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(tag);
    if (!selfClosing) stack.push({ tag, classes });
  }
  return bad;
}

/* 13) calendar-report 容量与换行契约 */
const hasCalGridMarkup = /\bcal-grid\b/.test(markupNoAssets);
const reportCalendarIntent = /calendar-report|汇报型日历|汇报版|领导|组长|运营负责人|关键节点|本月节奏|月度节奏/i.test(bodyText);
if (hasCalGridMarkup && reportCalendarIntent) {
  const badGrids = countCalGridWithoutReportAncestor(markupNoAssets);
  if (badGrids) errors.push(`汇报型日历中发现 ${badGrids} 个 .cal-grid 没有 .cal-report 祖先容器（CSS 写了规则但正文未挂载也不合格）`);
}

if (/\bcal-report\b/.test(markupNoAssets)) {
  const calReportWrapRule = /\.cal-report\s+\.cal-task[^{]*\{[^}]*flex-wrap\s*:\s*wrap/i.test(cssScope);
  if (calReportWrapRule) errors.push('calendar-report 中禁止 .cal-task { flex-wrap: wrap }');

  const hasTaskTitleRule = /\.cal-report\s+\.cal-task-title[^{]*\{[^}]*white-space\s*:\s*nowrap[^}]*overflow\s*:\s*hidden[^}]*text-overflow\s*:\s*ellipsis/is.test(cssScope);
  const hasLineClamp = /line-clamp|-webkit-line-clamp/i.test(cssScope);
  if (!hasTaskTitleRule && !hasLineClamp) warns.push('calendar-report 未检测到 .cal-task-title 的 nowrap + ellipsis / line-clamp 规则');

  const dayBlocks = [...html.matchAll(/<[^>]*class=["'][^"']*\bcal-day\b[^"']*["'][^>]*>[\s\S]*?(?=<[^>]*class=["'][^"']*\bcal-day\b|<\/(?:section|div|main|body)>)/gi)];
  let daysTooManyTags = 0, daysTooManyTasks = 0, daysLongText = 0, daysStateTags = 0;
  for (const m of dayBlocks) {
    const block = m[0];
    const tagCount = (block.match(/\bcal-tag\b/g) || []).length;
    const taskCount = (block.match(/\bcal-task\b/g) || []).length;
    if (tagCount > 1) daysTooManyTags++;
    if (taskCount > 1) daysTooManyTasks++;
    const text = block.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');
    if (/[\u4e00-\u9fff]{13,}/.test(text)) daysLongText++;
    if (/\b(is-success|is-warning|is-danger|is-info|tag-state)\b/.test(block)) daysStateTags++;
  }
  if (daysTooManyTags) warns.push(`calendar-report 中 ${daysTooManyTags} 个 .cal-day 内 .cal-tag 超过 1 个`);
  if (daysTooManyTasks) warns.push(`calendar-report 中 ${daysTooManyTasks} 个 .cal-day 内 .cal-task 超过 1 个`);
  if (daysLongText) warns.push(`calendar-report 中 ${daysLongText} 个 .cal-day 疑似含超过 12 个中文字的长文本`);
  if (daysStateTags > 3) warns.push(`calendar-report 中状态色/状态标签出现 ${daysStateTags} 个日期，疑似超过颜色预算`);

  if (/\b(data-ccbgzzy-theme-control|ccbgzzy-theme-control|ccbgzzy-switcher|ccbgzzy-themebar)\b/i.test(html)) {
    warns.push('汇报版 calendar-report 中出现主题切换器/主题工具层；汇报交付默认应隐藏');
  }
} else if (hasCalGridMarkup && reportCalendarIntent && /\b(data-ccbgzzy-theme-control|ccbgzzy-theme-control|ccbgzzy-switcher|ccbgzzy-themebar)\b/i.test(markupNoAssets)) {
  warns.push('汇报版日历中出现主题切换器/主题工具层；汇报交付默认应隐藏');
}

/* 输出 */
console.log(`\nCCBGZZY_DESIGN lint · ${file}`);
if (!errors.length && !warns.length) console.log('  ✓ 全部通过');
errors.forEach(e => console.log('  ✗ ERROR  ' + e));
warns.forEach(w => console.log('  ! WARN   ' + w));
console.log(`\n结果：${errors.length} error · ${warns.length} warning`);
process.exit(errors.length ? 1 : 0);
