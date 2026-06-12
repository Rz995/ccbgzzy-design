# CCBGZZY_DESIGN · 通用 HTML 设计系统（Skill）

## 怎么用

> 把你的内容、数据、表格、截图或说明发给 Agent，说一句：**"用 CCBGZZY_DESIGN 做成 HTML"** 即可。

其余都交给 Agent 自动处理——它会自动判断该做成什么样、怎么排、放哪些重点，不用你选页面类型、不用配置。

---

当前版本：**v1.0.0-rc.7**（以下面向维护者）

让 HTML **风格统一、展示逻辑正确**。
内核逻辑链：**内容 → 信息密度 → 页面类型(Agent 内部判断) → 展示结构 → 组件 → 颜色语义 → 交付格式**。
通用型——不绑定任何业务字段；默认主题 `sage`（共 7 套配色，含政金蓝）；产物自带 `CCBGZZY_DESIGN` 三层水印。

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
│   ├── theme-config.js      # 7 个主题 + 切换 + 水印
│   ├── base.css             # reset + token + 字号 + 组件
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

# 交付前自检（gradient/硬编码色/水印/版本/小字/!important/首屏裸表格/移动 table-card）
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
当前共有 **7 个 theme key**，全部进 `CCBGZZY_THEME_META`、默认 UI 可切换；默认 `sage`。
完整名单：`sage`（默认）/ `gov-finance-blue` / `gov-finance-blue-dark` / `sky-field` / `sky-field-dark` / `summer-coast` / `warm-sand`。
配对深浅（`CCBGZZY_toggleMode()` 有效）的是 `gov-finance-blue` 与 `sky-field`；`sage`/`summer-coast`/`warm-sand` 仅 light。
推荐稳定：`sage`（奶油底 + 鼠尾草同色阶 + 标志橙强调 + #1A1A1A）。
模板通过 `CCBGZZY_getThemeOptions()` 渲染完整主题列表；增删/换主题只改 `theme-config.js` 一处（见 references/experimental-themes.md）。

## 版本
v1.0.0-rc.7，详见 CHANGELOG.md。
