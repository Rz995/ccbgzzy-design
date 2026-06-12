# 标准组件清单

全部组件样式在 `assets/base.css`，只需套类名，颜色自动随主题。**不要为组件另写颜色。**

## 布局
- `.container` 居中容器（max 1280）。`.section` 区块（带下边框 + 纵向留白）。
- `.grid .grid-2/3/4` 响应式网格；`.stack` 子元素纵向等距。

## 文字
- `h1–h4` 自动用 `--title` + display 字体 + 对应字号。
- `.lead` 前言；`.text-muted`/`.text-2` 辅助/次要；`.em`/`.accent` 重点（=`--primary`）。
- `.num` 等宽数字对齐。

## 区块头
- `.eyebrow` 小标签（带圆点，常配 `.fx-pulse`）。
- `.section-title` 模块标题（左侧竖条强调）。`.section-desc` 模块说明。

## 卡片
- `.card` 基础卡片（hover 浮起）。
- `.card.accent-top` 顶部强调条。
- `.card.fx-spotlight` 光标跟随高光（需 JS 设 `--mx/--my`，模板已含）。
- `.card-title` / `.card-desc`。

## 指标
- `.kpi` 容器；`.kpi-label` / `.kpi-value`（≥44px，加 `.is-primary` 用主色、`.is-pop` 用唯一暖色强调）/ `.kpi-sub`。
- 多个 KPI 区分类别用 `data-seq="1..5"`（顶部同色阶台阶），**不要**每个一种花色。

## 状态
- `.badge` + `.is-success/.is-warning/.is-danger/.is-info`（自带状态圆点）。语义固定，别用作分类。

## 按钮
- `.btn.btn-primary` 主操作；`.btn.btn-ghost` 次操作。点击区 ≥44px。

## 数据（详见 tables.md / data-viz.md）
- `.data-table > .table`：数字列加 `class="num"`（右对齐+等宽）；首列自动加重；留白>边框。大表可加 `.table.zebra`。
- `.progress > span`（`style="width:xx%"`）；全场最关键的一条用 `.progress.is-accent`。
- 多类别图例 `.seq-legend` + `.seq-1..5`（同色阶台阶）。

## 强调
- `.em`（=`--primary` 重点词，可多处）；`.pop`（=`--accent` 唯一暖色焦点，整页 1–2 处）。

## 工具层（appbar / 主题控件 / 侧栏 / drawer）

> **铁律：标题栏、主题切换、侧边栏、工具按钮全部属于「工具层」，绝不参与正文排版流。**
> 移动端阅读正文时它们必须让位（headroom 收缩），不许横铺、不许挤占正文、不许撑出横向滚动。

### App Bar（标题栏，PC/移动统一）
```html
<header class="ccbgzzy-appbar">
  <div class="ccbgzzy-appbar-inner">
    <div class="ccbgzzy-appbar-lead">
      <button class="ccbgzzy-iconbtn ccbgzzy-menu-btn" data-ccbgzzy-drawer="#nav-drawer" aria-label="打开菜单">☰</button>
      <div class="ccbgzzy-title-oneline" data-mobile-title="短标题">完整标题<span class="sub">副标题</span></div>
    </div>
    <div class="ccbgzzy-appbar-tools"><div data-ccbgzzy-theme-control></div></div>
  </div>
</header>
```
- `.ccbgzzy-appbar` 全宽 sticky；`.ccbgzzy-appbar-inner` 居中限宽（与 `.container` 对齐）。
- `.ccbgzzy-title-oneline` **强制单行**：`white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0`。长标题用 `data-mobile-title` 给短标题，完整标题自动进 `title`/`aria-label`。`.sub` 副标题在移动端/滚动后自动隐藏。
- 左侧 `.ccbgzzy-menu-btn`（仅移动端显示）打开 drawer；右侧只放 1–2 个工具（主题控件 / 深浅）。
- 高度：PC 64px、移动 48px；滚动 >80px 进入 compact（PC 48 / 移动 38px，标题字号下调、阴影变轻）——由 `html.ccbgzzy-scrolled` 驱动，theme-config.js 自动加。

### 紧凑主题控件（替代旧的横排色卡）
- 在 appbar 工具区放一个挂载点：`<div data-ccbgzzy-theme-control></div>`，theme-config.js 自动构建：
  - 收起态 = `.ccbgzzy-tool-pill.ccbgzzy-theme-trigger`（PC ≤220px pill，显示当前主题**色环** + “主题 · 名称” + ▾；移动端收成 ~40px 图标）。
  - 展开态 = `.ccbgzzy-theme-popover`（PC 右上 dropdown；移动端底部 bottom-sheet + scrim），列出默认开放的稳定主题，含色点 + 当前 ✓，底部「深/浅切换」。
- 主题列表必须来自 `CCBGZZY_getThemeOptions()`；**禁止**手写固定主题、**禁止**在正文上方横排主题按钮。
- 色环/色点由 JS 用 `.style` 注入（避免成品出现硬编码颜色）；控件只用 `--surface/--title/--fg-2/--border/--primary/--accent`，无渐变。

### 侧栏 rail + 移动 drawer
- PC 窄 rail：`.ccbgzzy-shell > (.ccbgzzy-sidebar-rail + .ccbgzzy-shell-main)`；rail 48–64px、`.ccbgzzy-rail-item` 纯图标，需要时再展开。
- 移动 drawer：`.ccbgzzy-mobile-drawer`（默认 `translateX(-100%)` 隐藏，菜单按钮打开 `.is-open`，`.ccbgzzy-scrim` 遮罩，关闭后完全不占正文宽度）。`.ccbgzzy-drawer-link` 做页内导航。
- API：`CCBGZZY_toggleDrawer('#id')` / `CCBGZZY_closeAllOverlays()`；点 scrim、按 ESC、点 drawer 内链接都会自动关闭。

### headroom 让位（阅读优先）
- theme-config.js 自动监听 scroll：>80px 向下滚 → `html.ccbgzzy-scrolled`（appbar 收缩、主题控件收 icon-only）；向上滚或点工具按钮 → 展开。无需页面写 JS。

## 扩展原则
需要新组件时：用现有 token 拼，遵守语义角色；优先组合已有类而不是新写样式。
若多页复用，沉淀进 base.css 而不是散落在各 HTML 内联里。
