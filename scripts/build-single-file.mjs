#!/usr/bin/env node
/**
 * CCBGZZY_DESIGN · build-single-file.mjs
 * 把 package 形态（外链 base.css/effects.css/theme-config.js）合并成 single-file HTML。
 * 用法：  node scripts/build-single-file.mjs input.html [output.html]
 * 不传 output 则写到  input.single.html
 *
 * 默认交付就是 single-file：CSS/JS 内联，复制即用、单文件可发。
 */
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
if (!input) { console.error('用法: node scripts/build-single-file.mjs input.html [output.html]'); process.exit(2); }
const output = process.argv[3] || input.replace(/\.html?$/i, '') + '.single.html';

const dir = path.dirname(input);
const assetsDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'assets');
const read = (name) => {
  for (const base of [dir, assetsDir]) {
    const p = path.join(base, name);
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  }
  throw new Error('找不到资源文件: ' + name);
};

let html = fs.readFileSync(input, 'utf8');

// 内联 <link rel="stylesheet" href="xxx.css">
html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi,
  (_, href) => `<style>\n${read(path.basename(href))}\n</style>`);

// 内联 <script src="xxx.js"></script>
html = html.replace(/<script[^>]*src=["']([^"']+\.js)["'][^>]*>\s*<\/script>/gi,
  (_, src) => `<script>\n${read(path.basename(src))}\n</script>`);

fs.writeFileSync(output, html, 'utf8');
console.log('✓ single-file 已生成: ' + output);
