# 原生动态组件

> 运行时：`assets/interactive.js`。底线：纯原生 JS、无依赖、渐进增强。组件样式在 `assets/base.css`。

## 使用原则

- 动态组件只用于提升查询、切换、筛选、排序、展开效率，不替代信息结构。
- 无 JS 时内容必须可读：Tab 面板默认全部在 HTML 中；筛选/排序失效时保留原始列表；手风琴使用原生 `details`。
- 页面仍必须先过信息密度和页面蓝图规则；交互不能用来掩盖首屏堆明细。
- 业务 CSS 继续只用 token 和语义字号；不要为组件另写硬编码颜色。

## 接入

package 页面按顺序引用：

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="effects.css">
<script src="theme-config.js"></script>
<script src="interactive.js" defer></script>
```

`build-single-file.mjs` 会自动内联所有外链 `.css` 和 `.js`。

## Tab 选项卡

```html
<div class="ccbgzzy-tabs" data-ccbgzzy-tabs>
  <div class="ccbgzzy-tablist" role="tablist" aria-label="视图切换">
    <button class="ccbgzzy-tab" role="tab" aria-selected="true" data-tab-target="#panel-a">总览</button>
    <button class="ccbgzzy-tab" role="tab" data-tab-target="#panel-b">明细</button>
  </div>
  <section class="ccbgzzy-tab-panel" id="panel-a" role="tabpanel">总览内容</section>
  <section class="ccbgzzy-tab-panel" id="panel-b" role="tabpanel">明细内容</section>
</div>
```

键盘：左右方向键切换，Home/End 跳到首尾。

## 筛选分段

```html
<div class="ccbgzzy-segmented" data-ccbgzzy-segmented data-filter-target="[data-demo-item]">
  <button class="ccbgzzy-segment is-active" data-filter="all">全部</button>
  <button class="ccbgzzy-segment" data-filter="todo">待处理</button>
</div>

<div data-demo-item data-filter-value="todo">待处理条目</div>
```

一个条目可写多个值：`data-filter-value="todo high"`。

## 可排序表格

```html
<table class="table" data-ccbgzzy-sortable>
  <thead>
    <tr>
      <th data-sort="string">名称</th>
      <th class="num" data-sort="number">数量</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

支持 `string`、`number`、`date`。移动端仍按 table-card 规则展示，`td` 继续补 `data-label`。

## 单开手风琴

```html
<div class="ccbgzzy-accordion" data-ccbgzzy-accordion>
  <details open>
    <summary>问题一</summary>
    <div class="ccbgzzy-accordion-body">内容</div>
  </details>
  <details>
    <summary>问题二</summary>
    <div class="ccbgzzy-accordion-body">内容</div>
  </details>
</div>
```

无 JS 时 `details` 仍可原生展开；有 JS 时同组只保留一个展开。

## 验收

- `node scripts/lint.mjs your-page.html` 必须 0 error。
- 使用动态组件的 package 页面必须引用 `interactive.js`；single-file 页面必须含 `CCBGZZY_initInteractive`。
- 关闭 JS 后，核心内容仍能阅读，不出现空白 Tab、空列表或丢失明细。
