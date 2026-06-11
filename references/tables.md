# 表格设计规范（依据头部产品/期刊实践）

> 一句话：**靠对齐、留白、分组建立秩序，而不是靠边框和填充。** 表格是看板里最难做好、
> 也最容易显丑的组件。下面规则综合了 Cloudscape、shadcn data-table、A List Apart 排版实践。
> 直接用 base.css 的 `.table`，已内置全部规则。

## 一、结构
```html
<div class="data-table">
  <table class="table">
    <thead><tr>
      <th>名称</th><th class="num">数量</th><th class="num">占比</th><th>状态</th>
    </tr></thead>
    <tbody>
      <tr><td>条目一</td><td class="num">128</td><td class="num">86%</td><td><span class="badge is-success">正常</span></td></tr>
    </tbody>
  </table>
</div>
```
- 外层 `.data-table` 提供横向滚动，窄屏不破版。

## 二、铁律

1. **数字右对齐 + 等宽数字。** 数字列加 `class="num"`（已配 `text-align:right` + `tabular-nums`）。
   小数按小数点对齐、补齐到同精度。文字列左对齐。
2. **留白 > 边框。** 行内边距 ≥ 14px，行高舒展；**不要竖向网格线**；行与行用 1px 浅分隔即可。
3. **首列是主标识。** 首列自动用 `--title` 加重，让人一眼锚定是哪一行。
4. **表头要能读。** 表头 ≥16px、`--fg-muted`、加重；**不要**用 11–12px 全大写挤成一团。表头下用 2px 实线。
5. **颜色只落在状态点。** 状态/达标与否用 `.badge`（小圆点+文字），**不要整格染色**。
   多类别对比用同色阶 `--seq-*`，不用多色相。
6. **斑马纹按需。** 默认不开；只有"行很多、需要横向扫读"时加 `.table.zebra`（低饱和中性，不刺眼）。
7. **悬浮反馈。** 行 hover 用 `--surface-2` 轻微提示，不要大色块。
8. **强调克制。** 整张表最多让"一个最关键的数字"用 `.pop`（=`--accent`）点亮，其余靠加重/对齐。

## 三、进度 / 占比单元
表格里表达比率，用细进度条 + 右侧百分数（等宽数字）：
```html
<td>
  <div style="display:flex;align-items:center;gap:10px;min-width:160px;">
    <div class="progress" style="flex:1;"><span style="width:86%"></span></div>
    <span class="num" style="min-width:48px;text-align:right;">86%</span>
  </div>
</td>
```
进度条统一用 `--primary`；只有"全场最关键的那条"可用 `.progress.is-accent`。

## 四、分组
需要小标题分组时用整行 `tr.group-row`（已配次级底色 + 加重），把同组数据归拢，比加更多颜色更有效。

## 五、长表（Excel 式明细）必须表头吸顶

行很多、需要上下滚动查找的明细表，**表头必须吸顶**，否则滚下去就不知道每列是什么。
做法：给外层 `.data-table` 加 `.tall`：
```html
<div class="data-table tall"> <table class="table table-compact"> … </table> </div>
```
`.tall` 给容器限高(70vh)+容器内滚动，`thead th` 的 `position:sticky` 才会真正吸附。
⚠️ 只给 `thead th` 写 sticky 但外层没有"自身滚动容器"时，吸顶**不会生效**——长表一律用 `.tall`。

## 六、响应式
窄屏优先保留"主标识列 + 1–2 个关键列"，次要列可在小断点隐藏；或让 `.data-table` 横向滚动。不要硬塞导致字被压小。
