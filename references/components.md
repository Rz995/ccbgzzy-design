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

## 主题切换器
- `.ccbgzzy-themebar` 容器 + `.ccbgzzy-theme-select` 下拉 + `.ccbgzzy-switcher` 色卡区。
- JS 必须按 `CCBGZZY_getThemeOptions()` 渲染全部主题，见 template.html；不要手写固定主题列表。
- 配「深/浅切换」按钮调 `CCBGZZY_toggleMode()`。

## 扩展原则
需要新组件时：用现有 token 拼，遵守语义角色；优先组合已有类而不是新写样式。
若多页复用，沉淀进 base.css 而不是散落在各 HTML 内联里。
