# 数据可视化配色（同色阶优先）

> 依据 Cloudscape 数据可视化规范 + 科研期刊实践。核心：**最少的颜色，最大的清晰。**

## 一、用同色阶，不用彩虹
- 多类别 / 多系列 / 分级数据：用 `--seq-1…5`（同一色相的明度台阶，浅→深）。
- 取值拉开间隔（如 3 类用 seq-2/seq-3/seq-4 或 seq-1/seq-3/seq-5），相邻台阶对比太弱。
- **深值=更重要/更大的量**：把最重要或数值最大的系列放在 `--seq-5`（最深）。
- 一张图序列别超过：折线/柱状 ≤ 8 条，饼/环 ≤ 5 块；多了就聚合。

## 二、单点强调
- 想让某一条/某一块"跳出来"——只给它上 `--accent`，其余全用 `--seq-*`。一图一焦点。
- 阈值线 / 参考线用 `--fg-muted` 虚线，不抢数据。

## 三、不要做的事
- 不要给同一数据系列的不同属性各上一色（如一年里每个月一种颜色）——整组用一个色阶。
- 不要为了"好看"加色；颜色必须服务于层级和信息。
- 不要只靠颜色区分：配合标签、图例、直接标注（色盲友好）。

## 四、图例
用 `.seq-legend` + `.seq-1..5` 小方块，文字 ≥16px：
```html
<div class="seq-legend">
  <span><i class="seq-2"></i>类别一</span><span><i class="seq-3"></i>类别二</span><span><i class="seq-4"></i>类别三</span>
</div>
```

## 五、和 Chart.js 等库配合
Canvas 取不到 CSS 变量，需把当前主题的 `--seq-*` 读出来传给图表库：
```js
const cs = getComputedStyle(document.documentElement);
const seq = [1,2,3,4,5].map(i => cs.getPropertyValue('--seq-'+i).trim());
// 把 seq 按需切片传给 datasets 的 backgroundColor
```
深浅主题切换时重新读取并重绘即可。

## 六、数据驱动图表组件（assets/chart.js，推荐）

需要「可换图表类型 / 可被块级重生成」时，用 `assets/chart.js`：图表 = **一份 spec（数据+类型分离）+ 一个渲染器**。

```html
<figure class="ccbgzzy-chart" data-block-id="b7">
  <script type="application/json" class="ccbgzzy-chart-spec">
    {"type":"bar","title":"各区域营收",
     "data":{"labels":["华东","华南","华北"],"series":[{"name":"营收","values":[120,90,45]}]},
     "options":{"accentIndex":0}}
  </script>
  <div class="ccbgzzy-chart-canvas" role="img" aria-label="各区域营收"></div>
  <noscript><!-- 静态降级：seq 条 / 表格，保证无 JS 可读 --></noscript>
</figure>
```

要点：

- **数据与类型分离。** 换类型 = 改 `spec.type` 重渲染，`spec.data` 不动。
- **颜色只读 CSS 变量**（`--seq-*` / `--accent` / `--primary`），不硬编码；`theme-config.js` 切换主题时会触发 `CCBGZZY_renderAllCharts()` 重绘。
- 内置类型：`bar / line / area / pie / donut / rose`；可切换范围由 `CCBGZZY_chartCompatTypes(spec)` 按数据形状给出（单系列少类别才给饼/环/玫瑰）。
- **渐进增强**：`<noscript>` 放静态降级，无 JS 也能看（守 skill 铁律）。
- `accentIndex` 指定唯一焦点项上 `--accent`，其余走 seq 台阶——延续「同色阶 + 单点强调」。
- API：`CCBGZZY_renderChart(fig)` / `CCBGZZY_renderAllCharts(root?)` / `CCBGZZY_readChartSpec(fig)` / `CCBGZZY_writeChartSpec(fig, spec)`。
