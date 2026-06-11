#!/usr/bin/env node
/**
 * CCBGZZY_DESIGN · init.mjs
 * 在目标目录里初始化一个新页面工程（package 形态）。
 * 用法：  node scripts/init.mjs <target-dir>
 * 会复制三件套 + 起手模板为 index.html。随后改 index.html 填内容即可。
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
if (!target) { console.error('用法: node scripts/init.mjs <target-dir>'); process.exit(2); }
const assetsDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'assets');
fs.mkdirSync(target, { recursive: true });

for (const f of ['base.css', 'effects.css', 'theme-config.js']) {
  fs.copyFileSync(path.join(assetsDir, f), path.join(target, f));
}
fs.copyFileSync(path.join(assetsDir, 'template.html'), path.join(target, 'index.html'));

console.log('✓ 已初始化: ' + target);
console.log('  · 改 index.html 填内容');
console.log('  · 合并单文件: node scripts/build-single-file.mjs ' + path.join(target, 'index.html'));
console.log('  · 交付自检:   node scripts/lint.mjs ' + path.join(target, 'index.html'));
