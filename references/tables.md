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
窄屏(≤760px)一律走"表格→卡片"(见下节)，**不横向滚动**；字段多就用 `data-mobile-hide` 收进详情。


## 移动端：表格 → 卡片（≤760px，强约束）

移动端**绝不允许表格横向拖拽**。base.css 在 `@media (max-width:760px)` 下把 `.table` 自动转成卡片（GOVUK table-card 模式）：
`thead` 视觉隐藏（保留语义），每个 `tr` 变纵向卡片，每个 `td` 变"字段名 + 值"两列。

**生成表格时必须给 td 标注列角色**（移动端卡片才有字段名、才好读）：
- `data-label="字段名"`：移动端在该值前显示字段名（如 `<td class="num" data-label="营收">512</td>`）。
- `data-mobile-title`：作为卡片标题列（通常是首列，加重、占整行、无字段名）。
- `data-mobile-hide`：移动端隐藏该列（次要字段，进详情）。
- `data-mobile-actions`：移动端置于卡片底部（按钮区）。
- 数字列保留 `.num`。

**铁律**：① 移动端不出现横向滚动/拖拽；② 字段超过 ~6 个时，把次要列 `data-mobile-hide` 收进"展开详情"（`<details>`）；③ 高密度 lookup 页移动端默认每页 5–10 条卡片 + 顶部筛选，不一次性渲染全量。

## 移动端长表：渐进披露（首选，受众多为手机端领导）

⚠️ 误区：在移动端靠 `.tall` 限高 + 内部滚动来"压短"长表——**`.tall` 在 ≤760px 已被 base.css 第 556 行有意关闭**（`overflow:visible; max-height:none`），因为卡片内二次滚动体验更差。移动端正确做法是**减少首屏信息量**，不是塞进小滚动框。

行数多（如 20–30+ 条明细）时，默认走**渐进披露**：每条收起为「标题 + 1 个关键指标」，点按才展开其余字段。这是 NNG/Smashing 推荐的下钻模式，能把手机端页面高度砍到约 1/3，领导扫一眼关键列即可定位。

```html
<div class="data-table">
  <table class="table mobile-accordion" data-ccbgzzy-mobile-accordion>
    <thead><tr><th>客户</th><th>客户经理</th><th>产品</th><th class="num">金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr>
        <td data-mobile-title>恒生制造</td>           <!-- 收起时的卡片标题 -->
        <td data-label="客户经理">张磊</td>
        <td data-label="产品">流动资金贷款</td>
        <td class="num" data-mobile-summary>¥120万</td> <!-- 收起时仍显示的关键指标 -->
        <td data-label="状态"><span class="badge is-warning">待回访</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

要点：

- 加 `data-ccbgzzy-mobile-accordion`（由 `interactive.js` 接管）+ 一个 `data-mobile-title` + 一个 `data-mobile-summary`。
- ≤760px 默认收起，点按标题展开；**键盘可达**（Enter/Space）+ `aria-expanded`；桌面端不变。
- **渐进增强**：无 JS 时全字段照常显示（CSS 折叠只在 `html.ccbgzzy-js` 下生效），内容不丢。
- 仍需 `data-mobile-hide` 砍掉永远不必看的次要列；二者可叠加。
- 用了本组件的页面必须引用/内联 `assets/interactive.js`（lint 会校验）。

## 首屏信息优先级（移动端）

手机端首屏只放**结论 + 3–5 个核心 KPI**；KPI 过多时，次要的用 `data-mobile-hide` 下移或折叠，不要在首屏堆满小卡。明细一律后置（折叠/渐进披露/分页）。详见 [information-density.md](information-density.md)。
