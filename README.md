# CCBGZZY_DESIGN · 通用 HTML 设计系统（Skill）

## 怎么用

> 把你的内容、数据、表格、截图或说明发给 Agent，说一句：**"用 CCBGZZY_DESIGN 做成 HTML"** 即可。

其余都交给 Agent 自动处理——它会自动判断该做成什么样、怎么排、放哪些重点，不用你选页面类型、不用配置。

---

当前版本：**v1.0.0-rc.8**（以下面向维护者）

让 HTML **风格统一、展示逻辑正确**。
内核逻辑链：**内容 → 信息密度 → 页面类型(Agent 内部判断) → 展示结构 → 组件 → 颜色语义 → 交付格式**。
通用型——不绑定任何业务字段；默认主题 `gov-finance-blue`（政金蓝）；默认 UI 只开放 3 套稳定主题，产物自带 `CCBGZZY_DESIGN` 三层水印。

## 仓库结构
```
ccbgzzy-design/
├── SKILL.md                 # 入口·硬规则：密度决策树/页面类型/叙事顺序/颜色边界/字号/输出模式/lint
├── references/              # 解释·例子·细节（按需加载）
│   ├── information-density.md  # 信息密度→展示形式
│   ├── aesthetic.md            # 审美定调（莫兰迪/卡片/可亲近高级感）
│   ├── color-system.md         # 配色角色与边界
│   ├── typography.md           # 字号/字体
│   ├── tables.md  data-viz.md  i18n-fonts.md  components.md  motion.md  watermark.md
├── assets/
│   ├── theme-config.js      # 默认主题 + 稳定/实验主题 + 切换 + 水印
│   ├── base.css             # reset + token + 语义字号角色 + 组件
│   ├── effects.css          # 精选动效（纯色·无渐变）
│   └── template.html        # 起手模板
├── scripts/
│   ├── init.mjs             # 初始化新页面工程
│   ├── build-single-file.mjs # 合并成 single-file HTML
│   └── lint.mjs             # 交付自检
├── examples/                # 通用示例（single-file，lint 通过）
├── LICENSE                  # 内部许可
├── CHANGELOG.md
└── README.md
```

## 安装（一句话）
把 `ccbgzzy-design.skill` 发给用户，在支持 skill 的客户端点 **"保存 skill"** 即装。
对 Claude 说"用 CCBGZZY 规范做个 X"即自动套用。也可手动把 `ccbgzzy-design/` 放进客户端 skills 目录。

GitHub 方式（团队复用）：
```bash
git clone <你们的仓库>/ccbgzzy-design.git
```

## 命令清单（工程闭环）
```bash
# 初始化一个新页面工程（复制三件套 + index.html）
node scripts/init.mjs my-page

# 生成示例（用起手模板产出一个 single-file 示例）
node scripts/build-single-file.mjs assets/template.html example.html

# 构建 single-file（把外链 css/js 内联进一个 html，复制即用）
node scripts/build-single-file.mjs my-page/index.html my-page.single.html

# 交付前自检（gradient/硬编码色/水印/版本/字号角色/!important/首屏裸表格/calendar-report/移动 table-card）
# package 模式会连外链 base.css 一起查，不再误杀
node scripts/lint.mjs my-page.single.html
node scripts/lint.mjs my-page/index.html --mode=package

# 移动端真·验收（Playwright 四宽实测：无横向滚动/标题单行/表格不横滚/headroom）
#   首次：npm i -D playwright && npx playwright install chromium
node scripts/check-mobile.mjs            # 默认测 package template + examples + single-file template
```

## 输出模式
- **single-file（默认）**：CSS/JS 内联在一个 .html，复制即用、单文件可发。用户没特别说明就产出这个。
- **package**：HTML 外链 `assets/base.css`、`effects.css`、`theme-config.js`，适合多页共享/统一升级。

## 主题
默认主题：`gov-finance-blue`（政金蓝）。

默认 UI 只开放 3 套稳定主题：`gov-finance-blue` / `sage` / `warm-sand`。

保留但不进默认 UI 的 experimental 主题：`gov-finance-blue-dark` / `sky-field` / `sky-field-dark` / `summer-coast`。

模板通过 `CCBGZZY_getThemeOptions()` 渲染默认主题列表；增删/换主题只改 `theme-config.js` 一处（见 references/experimental-themes.md）。底层 token 可以多，但对用户和 Agent 暴露的选择必须少。

## 字号
业务页面只使用固定语义字号角色：Display/KPI 44px、Page Title 32px、Section Title 24/28px、Card Title 20px、Body/Table 16px、Meta/Tag/Footnote 13/14px。页面局部不要随手写 `font-size`，优先使用变量或组件类。

## 版本
v1.0.0-rc.8，详见 CHANGELOG.md。
