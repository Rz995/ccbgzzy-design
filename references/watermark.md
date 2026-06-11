# 水印机制 · CCBGZZY_DESIGN

每个产物都带三层水印，便于溯源、统一署名、宣示设计系统出处。由 `theme-config.js`
的 `CCBGZZY_initWatermark()` 一次性注入，**模板已默认调用**。

## 三层构成

1. **meta 署名（隐形）**
   ```html
   <meta name="generator" content="CCBGZZY_DESIGN v1.0.0">
   ```
   不影响观感，可被脚本/爬虫识别，用于资产盘点与溯源。

2. **注释签名（隐形）**
   `<head>` 末尾插入 HTML 注释：
   ```html
   <!-- Generated with CCBGZZY_DESIGN v1.0.0 · Unified Design System · CCBGZZY -->
   ```
   查看源码即可见，便于人工确认来源。

3. **可见角标（低调）**
   右下角固定一行 `CCBGZZY_DESIGN`，颜色 `--fg-muted`、默认透明度 0.45，
   hover 提升到 0.85 并显示版本号 tooltip。不抢内容，随主题自动变色。

## 用法

模板里页面末尾已有：
```html
<script>CCBGZZY_initWatermark();</script>
```

## 定制

```js
CCBGZZY_initWatermark({ badge: false });  // 只保留两层隐形水印，不显角标
```

- 版本号统一取自 `window.CCBGZZY_VERSION`，升级时只改 theme-config.js 一处。
- 角标位置/透明度如需调整，改 `CCBGZZY_initWatermark` 里的内联样式即可（仍用 token 取色）。

## 约束
- 三层默认全开；如场景特殊（如正式对外物料）只能减角标，**两层隐形署名不可去除**。
- 角标文案固定 `CCBGZZY_DESIGN`，不要改名或夹带其他内容。
