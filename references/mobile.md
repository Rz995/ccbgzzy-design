# 移动端阅读体验（受众：手机端领导）

> 汇报页（report）的主要读者常常是**用手机阅读的领导/高管**，移动端是优先级。
> 核心理念（综合 NNG / Smashing / 高管仪表盘实践）：**首屏给结论与少量 KPI，明细按需展开，长页要有导航与回顶。**

## 一、回到顶部浮标（自动，无需 markup）

`theme-config.js` 启动时自动注入 `CCBGZZY_initTotop()`：右下角圆钮，**滚过一屏才出现**，点按平滑回顶。触达 44px，`aria-label="回到顶部"`。长汇报页（尤其手机端）必备，无需在页面写任何东西。

## 二、章节锚点导航 / mini-TOC

report 首屏给一条章节跳转条，配合回到顶部，让领导快速定位。移动端 sticky + 横向滑动。

```html
<nav class="ccbgzzy-mini-toc" aria-label="章节导航">
  <a href="#kpi">关键指标</a>
  <a href="#trend">趋势</a>
  <a href="#risk">风险</a>
  <a href="#detail">明细</a>
</nav>
...
<section id="kpi">…</section>
```

- 各 `section` 给 `id`；`scroll-margin-top` 已配，跳转后不被吸顶 appbar 盖住。
- 纯锚点 + CSS `scroll-behavior:smooth`，无需 JS；无障碍加 `aria-label`。

## 三、明细表渐进披露

长明细表在手机端默认收起为「标题 + 关键指标」，点按展开。**这是治长页最有效的一刀**。
组件、属性、渐进增强见 [tables.md](tables.md)「移动端长表：渐进披露」。

## 四、首屏信息优先级

- 手机端首屏只放**结论 + 3–5 个核心 KPI**；其余 KPI 用 `data-mobile-hide` 下移/折叠。
- 明细一律后置：折叠、渐进披露或分页（每页 5–10 条），不一次性铺全量。
- 主标题移动端单行省略；副标题不进移动标题栏（base.css 已处理）。

## 五、触达与定位（已内置）

- 图标按钮 / 主题切换按钮移动端触达 ≥44px。
- 主题弹层在 ≤760px 变底部 sheet（贴边 + 安全区），配 scrim 遮罩。
- 全页零横向溢出（`overflow-x:clip` + 表格转卡片）。

## 自检

改动后跑 `node scripts/check-mobile.mjs your.html`（多宽度实测无横向滚动、标题单行、表格不溢出、headroom、WCAG 对比度）。
