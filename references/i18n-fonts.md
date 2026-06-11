# 多语言字体方案（简 / 繁 / 日 / 韩 / 英 / 法）

## 一、为什么用 Noto

Noto（"no tofu"，消灭豆腐块□）是 Google 的全语种字族，**一套设计语言覆盖
简体中文、繁体中文、日文、韩文**，并与拉丁字形和谐共处，能正确表达各语种的地区字形偏好。
英文/法文（含 é è ê ç à 等重音）由 Latin 子集覆盖。这是目前 Web 上覆盖最全、最稳妥的选择。

## 二、字体栈如何工作（base.css 已配好）

```css
--font-body: 'Noto Sans SC','Noto Sans TC','Noto Sans JP','Noto Sans KR',
             'PingFang SC','Microsoft YaHei','Hiragino Sans GB','Malgun Gothic',
             system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
```

浏览器按字符逐一回退：每个字符用栈中第一个**含该字形**的字体渲染。
所以一个混排页面里，中文走 Noto Sans SC、日文假名走 Noto Sans JP、韩文谚文走
Noto Sans KR、拉丁走 Noto 自带 Latin——自动各取所需。

## 三、地区字形：务必标 lang

简、繁、日 部分汉字字形不同（例：「骨」「直」「次」）。Pan-CJK 字体靠 `lang` 属性
决定显示哪套地区字形：

```html
<html lang="zh-CN">              <!-- 简体 -->
<section lang="zh-Hant">繁體段落</section>
<blockquote lang="ja">日本語</blockquote>
<p lang="ko">한국어</p>
<p lang="fr">Français — é è ê ç</p>
```

整页主语种放在 `<html lang>`，局部异种语言用就近的 `lang` 覆盖。

## 四、离线 / 内网回退

`base.css` 通过 `@import` 从 Google Fonts 拉 Noto。若用户环境**无外网**：
- 字体栈里的系统字体（PingFang SC / 微软雅黑 / Hiragino / Malgun Gothic）会自动兜底，
  页面仍可读，只是标题少了 Sora 的辨识度。
- 需要完全离线一致，可把 Noto 子集 woff2 下载到 `assets/fonts/` 并改用 `@font-face`
  本地引用（建议做按字形子集化以控体积）。这是 v1.1 的可选增强项。

## 五、各语种小贴士

- **法文**：注意 « » 书名号与 `&nbsp;` 窄空格；Noto 已含全部带重音字母。
- **日文**：长音「ー」、促音「っ」正常；标题避免超细字重。
- **韩文**：谚文在小字号下需足够行高（≥1.6）防止笔画粘连。
- **繁体**：标点偏向全角，正文行高同简体。
