#!/usr/bin/env node
/**
 * CCBGZZY_DESIGN · test.mjs — 最小 JS 测试（无需浏览器）
 * 用法：  node scripts/test.mjs
 * 在 node:vm 沙箱里加载真实源码（chart.js / edit-layer.js）的纯逻辑，断言行为。
 * 覆盖：补丁不冲掉手改、拒整页文档、拒格式错、缺 id、类型兼容表。
 * 退出码：有失败 → 1；全过 → 0。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, '..', 'assets');

/* 沙箱：给 window，不给 document（源码中 DOM 部分会自行跳过，仅暴露纯函数） */
function loadInto(win, file) {
  const code = fs.readFileSync(path.join(assets, file), 'utf8');
  vm.runInNewContext(code, { window: win, console });
}
const win = {};
loadInto(win, 'chart.js');
loadInto(win, 'edit-layer.js');

let pass = 0, fail = 0;
function ok(name, cond) { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ ' + name); } }
function eq(name, a, b) { ok(name + ' (得到 ' + JSON.stringify(a) + ')', JSON.stringify(a) === JSON.stringify(b)); }

console.log('\nCCBGZZY_DESIGN · JS 测试');

/* --- 核心：补丁不冲掉手改 --- */
const model = { version: '1.0', blocks: [
  { id: 'b2', type: 'prose', text: '原始文字' },
  { id: 'b7', type: 'chart', spec: { type: 'bar', title: '营收', data: { labels: ['a'], series: [{ values: [1] }] } } },
] };
model.blocks[0].text = '我手改过的文字';                                  // 用户先改字
const r = win.CCBGZZY_mergePatch(model, { blockId: 'b7', patch: { spec: { type: 'rose', title: '营收（玫瑰）' } } });
ok('补丁 b7 成功', r.ok && r.blockId === 'b7');
eq('b2 手改文字保留', model.blocks[0].text, '我手改过的文字');
eq('b7 类型变 rose', model.blocks[1].spec.type, 'rose');
eq('b7 数据未动', model.blocks[1].spec.data.labels, ['a']);

/* --- 护栏：各种非法补丁应被拒 --- */
ok('拒整页文档(blocks)', !win.CCBGZZY_validatePatch({ blocks: [] }).ok);
ok('拒数组', !win.CCBGZZY_validatePatch([]).ok);
ok('拒缺字段', !win.CCBGZZY_validatePatch({ foo: 1 }).ok);
ok('拒数组 patch', !win.CCBGZZY_validatePatch({ blockId: 'x', patch: [] }).ok);
ok('拒非对象', !win.CCBGZZY_validatePatch(null).ok);
ok('合法补丁通过', win.CCBGZZY_validatePatch({ blockId: 'x', patch: { text: 'y' } }).ok);
eq('找不到 id 时报错', win.CCBGZZY_mergePatch(model, { blockId: 'nope', patch: { text: 'z' } }).reason, 'no-id:nope');

/* --- deepMerge 只覆盖给定字段 --- */
const o = { a: 1, nested: { x: 1, y: 2 } };
win.CCBGZZY_deepMerge(o, { nested: { y: 9 } });
eq('deepMerge 保留未提及字段', o, { a: 1, nested: { x: 1, y: 9 } });
win.CCBGZZY_deepMerge(o, { __proto__: { polluted: true }, constructor: { bad: true } });
ok('deepMerge 跳过原型污染键', !({}).polluted && !o.constructor.bad);

/* --- 图表类型兼容表 --- */
eq('单系列少类别→饼/环/玫瑰可选', win.CCBGZZY_chartCompatTypes({ data: { labels: ['a', 'b', 'c'], series: [{ values: [1, 2, 3] }] } }), ['bar', 'pie', 'donut', 'rose']);
eq('单系列多类别→不给饼', win.CCBGZZY_chartCompatTypes({ data: { labels: [1, 2, 3, 4, 5, 6], series: [{ values: [1, 2, 3, 4, 5, 6] }] } }), ['bar', 'line', 'area']);
eq('多系列→不给饼', win.CCBGZZY_chartCompatTypes({ data: { labels: ['a', 'b'], series: [{ values: [1, 2] }, { values: [3, 4] }] } }), ['bar', 'line', 'area']);

console.log('\n结果：' + pass + ' 通过 · ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
