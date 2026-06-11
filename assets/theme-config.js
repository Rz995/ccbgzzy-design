/**
 * ===================================================================
 * CCBGZZY_DESIGN · 统一主题配置中心 (theme-config.js)
 * ===================================================================
 * 版本：v1.0.0-rc.6
 * 作用：集中管理全部主题与语义色 token。一处定义，全站统一。
 *
 * ★ v1.1 配色哲学：「同色阶 + 单点强调」（科研期刊式）
 *   - 一个主题只围绕"一种主色相"展开，层级靠**明度台阶**(seq-1..5)拉开，
 *     而不是靠多种花花绿绿的颜色。这就是"统一"。
 *   - 全局只保留**一个**暖色强调 --accent，用在最该被看到的那一处。这就是"重点"。
 *   - 统一中又有重点 = 同色阶撑结构 + 单点 accent 提焦点。
 *
 * 设计原则（务必遵守）：
 *   1. 内容里禁止硬编码颜色，一律引用 var(--token)。
 *   2. 文字最多三层：--title / --fg / --fg-2(--fg-muted)。
 *   3. 多类别/多系列数据用 --seq-1..5（同色阶台阶），不要用多种不同色相。
 *   4. --accent 是稀缺资源，整页用一两处；--success/--warning/--danger/--info 语义固定。
 *
 * Token 速查：
 *   --bg / --surface / --surface-2   背景三层（底/卡片/悬浮）
 *   --title / --fg / --fg-2 / --fg-muted   文字四层
 *   --primary / --primary-strong     主色（链接/主按钮/激活态）
 *   --accent / --accent-soft         唯一暖色强调（单点焦点）
 *   --seq-1..--seq-5                 同色阶台阶（浅→深），多类别/排序/分组用
 *   --border / --border-strong       边框
 *   --success / --warning / --danger / --info   状态色（语义固定）
 * ===================================================================
 */

window.CCBGZZY_THEMES = {

  /* ════════════════════════════════════════════════════════════
   * ★ 推荐默认主题 · 砂绿 Sage
   *   严格采用用户给定 6 色值：奶油底 + 鼠尾草绿(同色阶) + 标志橙(单点) + #1A1A1A 文字。
   *   规矩：圆角 14–16px · 留白≥20% · 关键词只换 1–2 处色 · 用 #1A1A1A 不用 #000。
   *   气质：organic / editorial · 可亲近的高级感。
   * ════════════════════════════════════════════════════════════ */
  'sage': {
    mode: 'light',
    '--bg':'#EFEAE0',         /* 主背景 */
    '--surface':'#E5DFD2',    /* 浅卡片 */
    '--surface-2':'#DBD4C5',  /* 次级/悬浮（同family推深一档）*/
    '--title':'#1A1A1A',      /* 强调黑（标题）*/
    '--fg':'#3A382F',         /* 正文（#1A1A1A 柔化一档）*/
    '--fg-2':'#6A685B',       /* 次要文字 */
    '--fg-muted':'#908D7E',   /* 辅助文字 */
    '--primary':'#6B8A6F',    /* 深鼠尾草（主色/结构）*/
    '--primary-strong':'#56745B',
    '--accent':'#CD6F47',     /* 标志橙（唯一单点强调）*/
    '--accent-soft':'rgba(205,111,71,0.14)',
    '--border':'rgba(26,26,26,0.10)', '--border-strong':'rgba(26,26,26,0.20)',
    '--success':'#5E8B5A', '--warning':'#C0883C', '--attention':'#9C8A63', '--danger':'#B5503C', '--info':'#5E7E86',
    /* 同色阶：浅鼠尾草 → 深鼠尾草（seq-5 最显著）*/
    '--seq-1':'#D7E1D7', '--seq-2':'#BDCEC0', '--seq-3':'#95B099', '--seq-4':'#6B8A6F', '--seq-5':'#4E6A52',
  },

  /* ★ 稳定主题 · 砂绿 sage-dark（深色版，与 sage 配对）
   *   暖炭底 + 鼠尾草 + 标志橙，文字暖白。深浅切换的另一半。 */
  'sage-dark': {
    mode: 'dark',
    '--bg':'#1B1A16', '--surface':'#26241E', '--surface-2':'#322F27',
    '--title':'#F0EBE0', '--fg':'#D8D2C4', '--fg-2':'#A7A192', '--fg-muted':'#7C7768',
    '--primary':'#8FAE93', '--primary-strong':'#A9C2AC',
    '--accent':'#DD8359', '--accent-soft':'rgba(221,131,89,0.18)',
    '--border':'rgba(240,235,224,0.12)', '--border-strong':'rgba(240,235,224,0.24)',
    '--success':'#6FA873', '--warning':'#C99A4A', '--attention':'#C9B27A', '--danger':'#C56B54', '--info':'#6E97A0',
    /* 深色版：seq-5 最浅=最显著（在暗底上更亮更突出）*/
    '--seq-1':'#3E5142', '--seq-2':'#4E6A52', '--seq-3':'#6B8A6F', '--seq-4':'#8FAE93', '--seq-5':'#B6CDB9',
  },

  /* ───────── 开放主题 · 墨金 Obsidian Gold ─────────
   * 近黑底 + 暖金主色，蓝为单点强调。权威·金融质感。 */
  'obsidian-gold': {
    mode: 'dark',
    '--bg':'#0A0A0F', '--surface':'#15151D', '--surface-2':'#20202C',
    '--title':'#FBF7EC', '--fg':'#E2DCCC', '--fg-2':'#B0A892', '--fg-muted':'#7C745F',
    '--primary':'#C2A458', '--primary-strong':'#DCC07E',
    '--accent':'#6F94AD', '--accent-soft':'rgba(111,148,173,0.16)',
    '--border':'rgba(201,168,76,0.16)', '--border-strong':'rgba(201,168,76,0.34)',
    '--success':'#5FB87A', '--warning':'#E0A33E', '--danger':'#DC6B62', '--info':'#6FA8D0',
    '--seq-1':'#E8D6A6', '--seq-2':'#D6BC72', '--seq-3':'#C9A84C', '--seq-4':'#9A7F33', '--seq-5':'#6E5A22',
  },

  /* ───────── 开放主题 · 深海 Deep Ocean ─────────
   * 取自 Maastricht/Columbia/Pale Cerulean/Blue Yonder 同色蓝阶，暖砂为单点强调。 */
  'deep-ocean': {
    mode: 'dark',
    '--bg':'#04233F', '--surface':'#0A3454', '--surface-2':'#134267',
    '--title':'#F2F7FC', '--fg':'#D4E2F0', '--fg-2':'#A9C4E0', '--fg-muted':'#88A2BE',
    '--primary':'#93BEE2', '--primary-strong':'#B6D6EE',
    '--accent':'#CC9D6E', '--accent-soft':'rgba(204,157,110,0.18)',
    '--border':'rgba(154,188,224,0.16)', '--border-strong':'rgba(154,188,224,0.32)',
    '--success':'#5BB98C', '--warning':'#E6B566', '--danger':'#E0707A', '--info':'#79B0E0',
    '--seq-1':'#C4D4E6', '--seq-2':'#9ABCE0', '--seq-3':'#6F9FCC', '--seq-4':'#4474A3', '--seq-5':'#2A537E',
  },

  /* ───────── 开放主题 · 月白 Platinum Blue ─────────
   * 取自 Platinum/Yankees/Dark Sky/B'dazzled/Charcoal 冷调蓝灰，陶土为单点强调。 */
  'platinum-blue': {
    mode: 'light',
    '--bg':'#F4F5F6', '--surface':'#FFFFFF', '--surface-2':'#E8EBEF',
    '--title':'#22303F', '--fg':'#394A56', '--fg-2':'#5E7081', '--fg-muted':'#8A98A4',
    '--primary':'#3D6B89', '--primary-strong':'#2A506B',
    '--accent':'#B27355', '--accent-soft':'rgba(178,115,85,0.14)',
    '--border':'rgba(34,48,63,0.12)', '--border-strong':'rgba(34,48,63,0.24)',
    '--success':'#2E8B6A', '--warning':'#B07A20', '--danger':'#BE4F49', '--info':'#2C6485',
    '--seq-1':'#C9DCEA', '--seq-2':'#8FBFDA', '--seq-3':'#5E92B5', '--seq-4':'#2C6485', '--seq-5':'#1B3D54',
  },

  /* ───────── 开放主题 · 暖砂 Warm Sand ─────────
   * 取自 Studio Vaia「Cold Sky」暖中性(羊毛/焦糖)+冷蓝，冷蓝为单点强调。 */
  'warm-sand': {
    mode: 'light',
    '--bg':'#F4EFE8', '--surface':'#FBF8F3', '--surface-2':'#EAE1D5',
    '--title':'#2E3A45', '--fg':'#574F45', '--fg-2':'#837868', '--fg-muted':'#A89C8B',
    '--primary':'#4E7C93', '--primary-strong':'#3A6173',
    '--accent':'#B56B7A', '--accent-soft':'rgba(181,107,122,0.12)',
    '--border':'rgba(46,58,69,0.12)', '--border-strong':'rgba(46,58,69,0.22)',
    '--success':'#5E8B5A', '--warning':'#C28A3E', '--danger':'#B5604A', '--info':'#4E7C93',
    '--seq-1':'#CBD9DE', '--seq-2':'#9DBAC4', '--seq-3':'#6E97A5', '--seq-4':'#4E7C93', '--seq-5':'#355A68',
  },

  /* ═══════ 开放候选主题 · 4 套 × light/dark ═══════
   * 规则：文字只用中性 title/fg/fg-2/fg-muted（不用色卡高饱和色）；
   *       primary=主色、accent=唯一强调(每页1–2处)、seq=图表色阶；
   *       danger 仅严重异常；全程无渐变。 */

  /* A · 海洋清风 ocean-breeze（蓝绿主色 + 橙强调）*/
  'ocean-breeze': {
    mode:'light',
    '--bg':'#F2F7FB','--surface':'#FFFFFF','--surface-2':'#E4EEF5',
    '--title':'#16323A','--fg':'#33474E','--fg-2':'#5E737A','--fg-muted':'#8A9AA0',
    '--primary':'#3E8C97','--primary-strong':'#2C6A74',
    '--accent':'#E58A4A','--accent-soft':'rgba(229,138,74,0.14)',
    '--border':'rgba(22,50,58,0.12)','--border-strong':'rgba(22,50,58,0.22)',
    '--success':'#4F9E86','--warning':'#E0A23E','--attention':'#C7A86A','--danger':'#C8534A','--info':'#4198AC',
    '--seq-1':'#BFDDF2','--seq-2':'#7BC0CD','--seq-3':'#51999F','--seq-4':'#3E8C97','--seq-5':'#2C6A74',
  },
  'ocean-breeze-dark': {
    mode:'dark',
    '--bg':'#0E2027','--surface':'#163039','--surface-2':'#1F404A',
    '--title':'#EAF3F5','--fg':'#C9DCE0','--fg-2':'#9DB6BC','--fg-muted':'#748A90',
    '--primary':'#6FB9C4','--primary-strong':'#8FCDD6',
    '--accent':'#EE9E62','--accent-soft':'rgba(238,158,98,0.18)',
    '--border':'rgba(234,243,245,0.12)','--border-strong':'rgba(234,243,245,0.24)',
    '--success':'#6FBFA0','--warning':'#E6B566','--attention':'#CDB682','--danger':'#D77468','--info':'#6FB9C4',
    '--seq-1':'#234A53','--seq-2':'#347078','--seq-3':'#4198AC','--seq-4':'#7BC0CD','--seq-5':'#BFDDF2',
  },

  /* B · 蓝天绿地 sky-field（蓝主色 + 珊瑚强调，深红仅严重异常）*/
  'sky-field': {
    mode:'light',
    '--bg':'#F3F9FC','--surface':'#FFFFFF','--surface-2':'#E1F3FA',
    '--title':'#1E2E3C','--fg':'#38485A','--fg-2':'#647686','--fg-muted':'#93A0AB',
    '--primary':'#377EB8','--primary-strong':'#2A608E',
    '--accent':'#DC7369','--accent-soft':'rgba(220,115,105,0.14)',
    '--border':'rgba(30,46,60,0.12)','--border-strong':'rgba(30,46,60,0.22)',
    '--success':'#5A9A55','--warning':'#C99A2E','--attention':'#B6A86A','--danger':'#B23648','--info':'#377EB8',
    '--seq-1':'#E1F3FA','--seq-2':'#A9D2EA','--seq-3':'#6FA9D0','--seq-4':'#377EB8','--seq-5':'#285C86',
  },
  'sky-field-dark': {
    mode:'dark',
    '--bg':'#101E2A','--surface':'#1A2D3D','--surface-2':'#233A4D',
    '--title':'#EAF2F8','--fg':'#C6D6E2','--fg-2':'#9AAEBE','--fg-muted':'#6F8294',
    '--primary':'#5E9FD0','--primary-strong':'#7FB6E0',
    '--accent':'#E08A80','--accent-soft':'rgba(224,138,128,0.18)',
    '--border':'rgba(234,242,248,0.12)','--border-strong':'rgba(234,242,248,0.24)',
    '--success':'#6FB46A','--warning':'#D8AE55','--attention':'#C2B488','--danger':'#C9505F','--info':'#5E9FD0',
    '--seq-1':'#21425E','--seq-2':'#2F6491','--seq-3':'#377EB8','--seq-4':'#6FA9D0','--seq-5':'#A9D2EA',
  },

  /* C · 夏日海滩 summer-coast（蓝绿主色 + 珊瑚强调，活动/活泼）*/
  'summer-coast': {
    mode:'light',
    '--bg':'#FBF7F0','--surface':'#FFFFFF','--surface-2':'#F1EAE0',
    '--title':'#2A2622','--fg':'#4A443D','--fg-2':'#756D63','--fg-muted':'#A39A8E',
    '--primary':'#3C9BC9','--primary-strong':'#2C77A0',
    '--accent':'#F4775A','--accent-soft':'rgba(244,119,90,0.14)',
    '--border':'rgba(42,38,34,0.12)','--border-strong':'rgba(42,38,34,0.22)',
    '--success':'#6FAE63','--warning':'#E6A23C','--attention':'#E2B96A','--danger':'#D8504F','--info':'#3C9BC9',
    '--seq-1':'#CDEBEA','--seq-2':'#8FD0CD','--seq-3':'#65BDBA','--seq-4':'#3C9BC9','--seq-5':'#2C77A0',
  },
  'summer-coast-dark': {
    mode:'dark',
    '--bg':'#1A1714','--surface':'#262019','--surface-2':'#322A20',
    '--title':'#F4ECE0','--fg':'#DAD0C2','--fg-2':'#ABA08F','--fg-muted':'#7E7464',
    '--primary':'#5BB6D4','--primary-strong':'#7FCBE2',
    '--accent':'#FB8E70','--accent-soft':'rgba(251,142,112,0.18)',
    '--border':'rgba(244,236,224,0.12)','--border-strong':'rgba(244,236,224,0.24)',
    '--success':'#79B86C','--warning':'#E6B466','--attention':'#E8C57E','--danger':'#E06B66','--info':'#5BB6D4',
    '--seq-1':'#1F5A78','--seq-2':'#2C77A0','--seq-3':'#3C9BC9','--seq-4':'#65BDBA','--seq-5':'#A7DAD7',
  },

  /* D · 清新假日 fresh-holiday（薄荷绿主色 + 珊瑚强调，轻量）*/
  'fresh-holiday': {
    mode:'light',
    '--bg':'#F4F8F6','--surface':'#FFFFFF','--surface-2':'#E7EFEA',
    '--title':'#1E2B27','--fg':'#3A4742','--fg-2':'#647069','--fg-muted':'#929EAB',
    '--primary':'#38A87E','--primary-strong':'#2A8463',
    '--accent':'#F58A6E','--accent-soft':'rgba(245,138,110,0.14)',
    '--border':'rgba(30,43,39,0.12)','--border-strong':'rgba(30,43,39,0.22)',
    '--success':'#4E9E63','--warning':'#D9A23A','--attention':'#C9A86A','--danger':'#D45F4F','--info':'#5A97C4',
    '--seq-1':'#BFE8D5','--seq-2':'#8FD9BB','--seq-3':'#6AD1A3','--seq-4':'#3FA882','--seq-5':'#2C7D62',
  },
  'fresh-holiday-dark': {
    mode:'dark',
    '--bg':'#131A17','--surface':'#1D2723','--surface-2':'#27332E',
    '--title':'#ECF3EF','--fg':'#CCDAD2','--fg-2':'#9DACA4','--fg-muted':'#748079',
    '--primary':'#5FC79A','--primary-strong':'#7FD6B0',
    '--accent':'#FF9E84','--accent-soft':'rgba(255,158,132,0.18)',
    '--border':'rgba(236,243,239,0.12)','--border-strong':'rgba(236,243,239,0.24)',
    '--success':'#5FB87F','--warning':'#E0B45A','--attention':'#C9B27A','--danger':'#DE6E5E','--info':'#7FB5DC',
    '--seq-1':'#235543','--seq-2':'#2C7D62','--seq-3':'#3FA882','--seq-4':'#6AD1A3','--seq-5':'#A7E3CC',
  },

};

/* 主题展示顺序（切换器 UI）。当前试用阶段：14 个 theme key 全部开放可切换。 */
window.CCBGZZY_THEME_ORDER = [
  'sage', 'sage-dark',
  'ocean-breeze', 'ocean-breeze-dark',
  'sky-field', 'sky-field-dark',
  'summer-coast', 'summer-coast-dark',
  'fresh-holiday', 'fresh-holiday-dark',
  'warm-sand', 'obsidian-gold',
  'platinum-blue', 'deep-ocean',
];

/* 主题元信息（切换器 UI）。
   family 用于分组/下拉展示；label 用于可见标签；swatch* 用于色卡。 */
window.CCBGZZY_THEME_META = {
  'sage':              { family:'推荐默认', label:'砂绿',     mode:'light', swatchBg:'#EFEAE0', swatchAccent:'#CD6F47' },
  'sage-dark':         { family:'推荐默认', label:'砂绿·夜',   mode:'dark',  swatchBg:'#1B1A16', swatchAccent:'#DD8359' },
  'ocean-breeze':      { family:'业务冷静', label:'海洋清风',  mode:'light', swatchBg:'#F2F7FB', swatchAccent:'#E58A4A' },
  'ocean-breeze-dark': { family:'业务冷静', label:'海洋·夜',   mode:'dark',  swatchBg:'#0E2027', swatchAccent:'#EE9E62' },
  'sky-field':         { family:'复盘风险', label:'蓝天绿地',  mode:'light', swatchBg:'#F3F9FC', swatchAccent:'#DC7369' },
  'sky-field-dark':    { family:'复盘风险', label:'蓝天·夜',   mode:'dark',  swatchBg:'#101E2A', swatchAccent:'#E08A80' },
  'summer-coast':      { family:'活动指引', label:'夏日海滩',  mode:'light', swatchBg:'#FBF7F0', swatchAccent:'#F4775A' },
  'summer-coast-dark': { family:'活动指引', label:'夏日·夜',   mode:'dark',  swatchBg:'#1A1714', swatchAccent:'#FB8E70' },
  'fresh-holiday':     { family:'轻量友好', label:'清新假日',  mode:'light', swatchBg:'#F4F8F6', swatchAccent:'#F58A6E' },
  'fresh-holiday-dark':{ family:'轻量友好', label:'清新·夜',   mode:'dark',  swatchBg:'#131A17', swatchAccent:'#FF9E84' },
  'warm-sand':         { family:'暖中性',   label:'暖砂',     mode:'light', swatchBg:'#F4EFE8', swatchAccent:'#B56B7A' },
  'obsidian-gold':     { family:'暖中性',   label:'墨金',     mode:'dark',  swatchBg:'#0A0A0F', swatchAccent:'#C2A458' },
  'platinum-blue':     { family:'冷蓝灰',   label:'月白',     mode:'light', swatchBg:'#F4F5F6', swatchAccent:'#B27355' },
  'deep-ocean':        { family:'冷蓝灰',   label:'深海',     mode:'dark',  swatchBg:'#04233F', swatchAccent:'#93BEE2' },
};
window.CCBGZZY_EXPERIMENTAL = [];  /* 试用阶段全部进 META；正式可在此回收非推荐主题 */

window.CCBGZZY_DEFAULT_THEME = 'sage';
window.CCBGZZY_VERSION = 'v1.0.0-rc.6';

/* 给模板/外部页面统一取主题列表，避免手写固定主题导致"隐藏主题"再次出现。 */
window.CCBGZZY_getThemeOptions = function () {
  var themes = window.CCBGZZY_THEMES || {};
  var meta = window.CCBGZZY_THEME_META || {};
  var order = window.CCBGZZY_THEME_ORDER || Object.keys(meta);
  return order.filter(function (key) { return themes[key] && meta[key]; }).map(function (key) {
    var m = meta[key];
    return {
      key: key,
      family: m.family || '',
      label: m.label || key,
      mode: m.mode || (themes[key] && themes[key].mode) || 'light',
      swatchBg: m.swatchBg || themes[key]['--bg'],
      swatchAccent: m.swatchAccent || themes[key]['--accent'],
    };
  });
};

/* 应用主题 */
window.CCBGZZY_applyTheme = function (themeName) {
  var themes = window.CCBGZZY_THEMES;
  var name = themes[themeName] ? themeName : window.CCBGZZY_DEFAULT_THEME;
  var theme = themes[name];
  var root = document.documentElement;
  Object.keys(theme).forEach(function (key) { if (key !== 'mode') root.style.setProperty(key, theme[key]); });
  root.setAttribute('data-theme', name);
  root.setAttribute('data-mode', theme.mode);
  try { localStorage.setItem('ccbgzzy-theme', name); } catch (e) {}
  try {
    document.querySelectorAll('iframe').forEach(function (f) {
      try { f.contentWindow.postMessage({ type:'ccbgzzyTheme', theme:name }, '*'); } catch (e) {}
    });
  } catch (e) {}
};

/* 同色相一键深↔浅（冷配冷、暖配暖） */
window.CCBGZZY_toggleMode = function () {
  var root = document.documentElement;
  var cur = root.getAttribute('data-theme') || window.CCBGZZY_DEFAULT_THEME;
  var pair = { 'sage':'sage-dark', 'sage-dark':'sage',
               'ocean-breeze':'ocean-breeze-dark', 'ocean-breeze-dark':'ocean-breeze',
               'sky-field':'sky-field-dark', 'sky-field-dark':'sky-field',
               'summer-coast':'summer-coast-dark', 'summer-coast-dark':'summer-coast',
               'fresh-holiday':'fresh-holiday-dark', 'fresh-holiday-dark':'fresh-holiday',
               'obsidian-gold':'warm-sand', 'warm-sand':'obsidian-gold',
               'deep-ocean':'platinum-blue', 'platinum-blue':'deep-ocean' };
  var next = pair[cur] || window.CCBGZZY_DEFAULT_THEME;
  window.CCBGZZY_applyTheme(next);
  if (typeof window.CCBGZZY_syncSwitcher === 'function') window.CCBGZZY_syncSwitcher(next);
};

/* 三层水印（meta 署名 + 注释签名 + 可见角标） */
window.CCBGZZY_initWatermark = function (opts) {
  opts = opts || {};
  var sig = 'CCBGZZY_DESIGN ' + window.CCBGZZY_VERSION;
  if (!document.querySelector('meta[name="generator"][content^="CCBGZZY_DESIGN"]')) {
    var m = document.createElement('meta');
    m.setAttribute('name','generator'); m.setAttribute('content', sig);
    document.head.appendChild(m);
  }
  document.head.appendChild(document.createComment(' Generated with ' + sig + ' · Unified Design System · CCBGZZY '));
  if (opts.badge !== false && !document.getElementById('ccbgzzy-watermark')) {
    var b = document.createElement('div');
    b.id = 'ccbgzzy-watermark'; b.textContent = 'CCBGZZY_DESIGN'; b.title = sig;
    b.setAttribute('aria-hidden','true');
    b.style.cssText = ['position:fixed','right:10px','bottom:8px','z-index:2147483600',
      'font-size:11px','letter-spacing:1px','font-family:inherit','color:var(--fg-muted)',
      'opacity:.45','user-select:none','transition:opacity .25s'].join(';');
    b.addEventListener('mouseenter', function(){ b.style.opacity='.85'; });
    b.addEventListener('mouseleave', function(){ b.style.opacity='.45'; });
    document.body.appendChild(b);
  }
};

/* 启动 */
(function () {
  /* 渐进增强标记：JS 在场才启用 [data-reveal] 隐藏动画；
     theme-config.js 在 <head> 同步执行，此类在 body 渲染前注入，无内容闪烁。
     若无 JS，base.css 不隐藏 [data-reveal]，核心内容默认可见。 */
  try { document.documentElement.classList.add('ccbgzzy-js'); } catch (e) {}
  if (window !== window.top) {
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'ccbgzzyTheme') window.CCBGZZY_applyTheme(e.data.theme);
    });
  }
  var saved = window.CCBGZZY_DEFAULT_THEME;
  try { saved = localStorage.getItem('ccbgzzy-theme') || saved; } catch (e) {}
  window.CCBGZZY_applyTheme(saved);
})();
