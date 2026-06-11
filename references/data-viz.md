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
