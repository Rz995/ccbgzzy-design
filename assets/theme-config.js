/**
 * ===================================================================
 * CCBGZZY_DESIGN · 统一主题配置中心 (theme-config.js)
 * ===================================================================
 * 版本：v1.0.0-rc.7
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

  'sage': { mode:'light', '--bg':'#EFEAE0', '--surface':'#E5DFD2', '--surface-2':'#DBD4C5', '--title':'#1A1A1A', '--fg':'#3A382F', '--fg-2':'#6A685B', '--fg-muted':'#908D7E', '--primary':'#6B8A6F', '--primary-strong':'#56745B', '--accent':'#CD6F47', '--accent-soft':'rgba(205,111,71,0.14)', '--border':'rgba(26,26,26,0.10)', '--border-strong':'rgba(26,26,26,0.20)', '--success':'#5E8B5A', '--warning':'#C0883C', '--attention':'#9C8A63', '--danger':'#B5503C', '--info':'#5E7E86', '--seq-1':'#D7E1D7', '--seq-2':'#BDCEC0', '--seq-3':'#95B099', '--seq-4':'#6B8A6F', '--seq-5':'#4E6A52' },

  'gov-finance-blue': { mode:'light', '--bg':'#EEF3F8', '--surface':'#FFFFFF', '--surface-2':'#F6F8FB', '--title':'#183153', '--fg':'#4B5D73', '--fg-2':'#718094', '--fg-muted':'#98A4B3', '--primary':'#2F73B8', '--primary-strong':'#1F5E9D', '--accent':'#D6A63A', '--accent-soft':'rgba(214,166,58,0.14)', '--border':'rgba(24,49,83,0.12)', '--border-strong':'rgba(24,49,83,0.24)', '--success':'#4FA66A', '--warning':'#D0882E', '--attention':'#C9B27A', '--danger':'#D45B4F', '--info':'#4A91C9', '--seq-1':'#2F73B8', '--seq-2':'#4A91C9', '--seq-3':'#62AFC0', '--seq-4':'#6BAE75', '--seq-5':'#D6A63A' },

  'gov-finance-blue-dark': { mode:'dark', '--bg':'#0F2036', '--surface':'#16304F', '--surface-2':'#1E3C61', '--title':'#EAF1F8', '--fg':'#C6D3E2', '--fg-2':'#9DB0C6', '--fg-muted':'#74879E', '--primary':'#5C9BD6', '--primary-strong':'#7FB4E2', '--accent':'#E0B452', '--accent-soft':'rgba(224,180,82,0.18)', '--border':'rgba(234,241,248,0.12)', '--border-strong':'rgba(234,241,248,0.24)', '--success':'#5FB87C', '--warning':'#DDA445', '--attention':'#C9B27A', '--danger':'#DD6E62', '--info':'#6BA8DE', '--seq-1':'#2F73B8', '--seq-2':'#4A91C9', '--seq-3':'#62AFC0', '--seq-4':'#6BAE75', '--seq-5':'#E0B452' },

  'sky-field': { mode:'light', '--bg':'#F3F9FC', '--surface':'#FFFFFF', '--surface-2':'#E1F3FA', '--title':'#1E2E3C', '--fg':'#38485A', '--fg-2':'#647686', '--fg-muted':'#93A0AB', '--primary':'#377EB8', '--primary-strong':'#2A608E', '--accent':'#DC7369', '--accent-soft':'rgba(220,115,105,0.14)', '--border':'rgba(30,46,60,0.12)', '--border-strong':'rgba(30,46,60,0.22)', '--success':'#5A9A55', '--warning':'#C99A2E', '--attention':'#B6A86A', '--danger':'#B23648', '--info':'#377EB8', '--seq-1':'#E1F3FA', '--seq-2':'#A9D2EA', '--seq-3':'#6FA9D0', '--seq-4':'#377EB8', '--seq-5':'#285C86' },

  'sky-field-dark': { mode:'dark', '--bg':'#101E2A', '--surface':'#1A2D3D', '--surface-2':'#233A4D', '--title':'#EAF2F8', '--fg':'#C6D6E2', '--fg-2':'#9AAEBE', '--fg-muted':'#6F8294', '--primary':'#5E9FD0', '--primary-strong':'#7FB6E0', '--accent':'#E08A80', '--accent-soft':'rgba(224,138,128,0.18)', '--border':'rgba(234,242,248,0.12)', '--border-strong':'rgba(234,242,248,0.24)', '--success':'#6FB46A', '--warning':'#D8AE55', '--attention':'#C2B488', '--danger':'#C9505F', '--info':'#5E9FD0', '--seq-1':'#21425E', '--seq-2':'#2F6491', '--seq-3':'#377EB8', '--seq-4':'#6FA9D0', '--seq-5':'#A9D2EA' },

  'summer-coast': { mode:'light', '--bg':'#FBF7F0', '--surface':'#FFFFFF', '--surface-2':'#F1EAE0', '--title':'#2A2622', '--fg':'#4A443D', '--fg-2':'#756D63', '--fg-muted':'#A39A8E', '--primary':'#3C9BC9', '--primary-strong':'#2C77A0', '--accent':'#F4775A', '--accent-soft':'rgba(244,119,90,0.14)', '--border':'rgba(42,38,34,0.12)', '--border-strong':'rgba(42,38,34,0.22)', '--success':'#6FAE63', '--warning':'#E6A23C', '--attention':'#E2B96A', '--danger':'#D8504F', '--info':'#3C9BC9', '--seq-1':'#CDEBEA', '--seq-2':'#8FD0CD', '--seq-3':'#65BDBA', '--seq-4':'#3C9BC9', '--seq-5':'#2C77A0' },

  'warm-sand': { mode:'light', '--bg':'#F4EFE8', '--surface':'#FBF8F3', '--surface-2':'#EAE1D5', '--title':'#2E3A45', '--fg':'#574F45', '--fg-2':'#837868', '--fg-muted':'#A89C8B', '--primary':'#4E7C93', '--primary-strong':'#3A6173', '--accent':'#B56B7A', '--accent-soft':'rgba(181,107,122,0.12)', '--border':'rgba(46,58,69,0.12)', '--border-strong':'rgba(46,58,69,0.22)', '--success':'#5E8B5A', '--warning':'#C28A3E', '--attention':'#A8916A', '--danger':'#B5604A', '--info':'#4E7C93', '--seq-1':'#CBD9DE', '--seq-2':'#9DBAC4', '--seq-3':'#6E97A5', '--seq-4':'#4E7C93', '--seq-5':'#355A68' },

};

/* 主题展示顺序（切换器 UI）。当前试用阶段：14 个 theme key 全部开放可切换。 */
window.CCBGZZY_THEME_ORDER = [
  'sage', 'gov-finance-blue', 'gov-finance-blue-dark', 'sky-field', 'sky-field-dark', 'summer-coast', 'warm-sand',
];

/* 主题元信息（切换器 UI）。
   family 用于分组/下拉展示；label 用于可见标签；swatch* 用于色卡。 */
window.CCBGZZY_THEME_META = {
  'sage': { family:'推荐默认', label:'砂绿', mode:'light', swatchBg:'#EFEAE0', swatchAccent:'#CD6F47' },
  'gov-finance-blue': { family:'政务金融', label:'政金蓝', mode:'light', swatchBg:'#EEF3F8', swatchAccent:'#D6A63A' },
  'gov-finance-blue-dark': { family:'政务金融', label:'政金·夜', mode:'dark', swatchBg:'#0F2036', swatchAccent:'#E0B452' },
  'sky-field': { family:'复盘风险', label:'蓝天绿地', mode:'light', swatchBg:'#F3F9FC', swatchAccent:'#DC7369' },
  'sky-field-dark': { family:'复盘风险', label:'蓝天·夜', mode:'dark', swatchBg:'#101E2A', swatchAccent:'#E08A80' },
  'summer-coast': { family:'活动指引', label:'夏日海滩', mode:'light', swatchBg:'#FBF7F0', swatchAccent:'#F4775A' },
  'warm-sand': { family:'暖中性', label:'暖砂', mode:'light', swatchBg:'#F4EFE8', swatchAccent:'#B56B7A' },
};
window.CCBGZZY_EXPERIMENTAL = [];  /* 试用阶段全部进 META；正式可在此回收非推荐主题 */

window.CCBGZZY_DEFAULT_THEME = 'sage';
window.CCBGZZY_VERSION = 'v1.0.0-rc.7';

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
  var pair = { 'gov-finance-blue':'gov-finance-blue-dark', 'gov-finance-blue-dark':'gov-finance-blue',
               'sky-field':'sky-field-dark', 'sky-field-dark':'sky-field' };
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

/* ===================================================================
 * 工具层运行时：紧凑主题控件 + 共享 scrim + 移动 drawer + headroom 滚动
 * 设计：控件由 JS 构建（色值用 .style 注入，避免成品里出现硬编码颜色）。
 *       页面只需放挂载点 <div data-ccbgzzy-theme-control></div>，自动填充。
 * =================================================================== */
window.__ccbgzzyThemeControls = window.__ccbgzzyThemeControls || [];

/* 共享遮罩：drawer 与移动端主题 sheet 共用一块 */
window.CCBGZZY_getScrim = function () {
  var s = document.getElementById('ccbgzzy-scrim');
  if (!s) {
    s = document.createElement('button');
    s.id = 'ccbgzzy-scrim'; s.className = 'ccbgzzy-scrim'; s.type = 'button';
    s.setAttribute('aria-label', '关闭'); s.hidden = true;
    s.addEventListener('click', function () { window.CCBGZZY_closeAllOverlays(); });
    document.body.appendChild(s);
  }
  return s;
};
window.CCBGZZY_showScrim = function () { var s = window.CCBGZZY_getScrim(); s.hidden = false; };
window.CCBGZZY_hideScrim = function () { var s = document.getElementById('ccbgzzy-scrim'); if (s) s.hidden = true; };

window.CCBGZZY_closeAllOverlays = function () {
  window.__ccbgzzyThemeControls.forEach(function (c) { c.close && c.close(); });
  document.querySelectorAll('.ccbgzzy-mobile-drawer.is-open').forEach(function (d) { d.classList.remove('is-open'); });
  window.CCBGZZY_hideScrim();
};

/* 构建一个紧凑主题控件（trigger pill + popover/bottom-sheet） */
window.CCBGZZY_mountThemeControl = function (host) {
  if (!host || host.__ccbgzzyMounted) return; host.__ccbgzzyMounted = true;
  host.classList.add('ccbgzzy-theme-control');
  var options = (typeof CCBGZZY_getThemeOptions === 'function') ? CCBGZZY_getThemeOptions() : [];
  var metaOf = {}; options.forEach(function (o) { metaOf[o.key] = o; });

  var trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'ccbgzzy-tool-pill ccbgzzy-theme-trigger';
  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  var ring = document.createElement('span'); ring.className = 'ccbgzzy-theme-ring';
  var txt = document.createElement('span'); txt.className = 'ccbgzzy-theme-trigger-text'; txt.textContent = '主题';
  var caret = document.createElement('span'); caret.className = 'ccbgzzy-theme-caret'; caret.textContent = '▾';
  trigger.appendChild(ring); trigger.appendChild(txt); trigger.appendChild(caret);

  var pop = document.createElement('div');
  pop.className = 'ccbgzzy-theme-popover'; pop.setAttribute('role', 'menu'); pop.hidden = true;
  var ttl = document.createElement('div'); ttl.className = 'ccbgzzy-theme-popover-title'; ttl.textContent = '选择主题';
  var list = document.createElement('ul'); list.className = 'ccbgzzy-theme-list';
  var items = {};
  options.forEach(function (o) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ccbgzzy-theme-item'; b.setAttribute('role', 'menuitemradio'); b.dataset.theme = o.key;
    var dot = document.createElement('span'); dot.className = 'ccbgzzy-theme-dot';
    dot.style.background = o.swatchAccent; dot.style.borderColor = o.swatchBg;
    var lab = document.createElement('span'); lab.className = 'ccbgzzy-theme-item-label'; lab.textContent = o.label;
    var fam = document.createElement('span'); fam.className = 'ccbgzzy-theme-item-family';
    fam.textContent = (o.family ? o.family + ' · ' : '') + (o.mode === 'dark' ? '深' : '浅');
    var chk = document.createElement('span'); chk.className = 'ccbgzzy-theme-check'; chk.textContent = '✓'; chk.setAttribute('aria-hidden', 'true');
    b.appendChild(dot); b.appendChild(lab); b.appendChild(fam); b.appendChild(chk);
    b.onclick = function () { CCBGZZY_applyTheme(o.key); CCBGZZY_syncSwitcher(o.key); control.close(); };
    items[o.key] = b; li.appendChild(b); list.appendChild(li);
  });
  var modeBtn = document.createElement('button');
  modeBtn.type = 'button'; modeBtn.className = 'ccbgzzy-theme-mode'; modeBtn.textContent = '🌙 深 / 浅切换';
  modeBtn.onclick = function () { CCBGZZY_toggleMode(); };
  pop.appendChild(ttl); pop.appendChild(list); pop.appendChild(modeBtn);

  host.appendChild(trigger); host.appendChild(pop);

  function isMobile() { return window.matchMedia && window.matchMedia('(max-width:760px)').matches; }
  var control = {
    open: function () {
      window.CCBGZZY_closeAllOverlays();
      pop.hidden = false; trigger.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.remove('ccbgzzy-scrolled'); /* 点工具→展开让位 */
      if (isMobile()) window.CCBGZZY_showScrim();
    },
    close: function () { pop.hidden = true; trigger.setAttribute('aria-expanded', 'false'); },
    sync: function (active) {
      var m = metaOf[active];
      if (m) { ring.style.background = m.swatchAccent; ring.style.borderColor = m.swatchBg; txt.textContent = '主题 · ' + m.label; trigger.title = '主题：' + m.label; }
      Object.keys(items).forEach(function (k) { items[k].classList.toggle('active', k === active); items[k].setAttribute('aria-checked', k === active ? 'true' : 'false'); });
    }
  };
  trigger.onclick = function (e) { e.stopPropagation(); if (pop.hidden) control.open(); else control.close(); };
  pop.addEventListener('click', function (e) { e.stopPropagation(); });
  window.__ccbgzzyThemeControls.push(control);
  control.sync(document.documentElement.getAttribute('data-theme') || window.CCBGZZY_DEFAULT_THEME);
  return control;
};

/* 统一同步：主题切换时刷新所有控件 + 兼容旧 switcher/select */
(function () {
  var legacy = window.CCBGZZY_syncSwitcher;
  window.CCBGZZY_syncSwitcher = function (active) {
    window.__ccbgzzyThemeControls.forEach(function (c) { c.sync && c.sync(active); });
    try {
      document.querySelectorAll('.ccbgzzy-swatch').forEach(function (el) { el.classList.toggle('active', el.dataset.theme === active); });
      document.querySelectorAll('select.ccbgzzy-theme-select, #theme-select').forEach(function (s) { s.value = active; });
    } catch (e) {}
    if (typeof legacy === 'function') { try { legacy(active); } catch (e) {} }
  };
})();

/* 移动 drawer：菜单按钮 [data-ccbgzzy-drawer="#id"] 打开；scrim/ESC 关闭 */
window.CCBGZZY_toggleDrawer = function (sel) {
  var d = typeof sel === 'string' ? document.querySelector(sel) : sel; if (!d) return;
  var open = d.classList.contains('is-open');
  window.CCBGZZY_closeAllOverlays();
  if (!open) { d.classList.add('is-open'); window.CCBGZZY_showScrim(); }
};

/* headroom：阅读正文时工具层让位（>80px compact，向上滚展开） */
window.CCBGZZY_initHeadroom = function () {
  var root = document.documentElement, lastY = 0, ticking = false;
  var COMPACT = 80, TOP = 8;
  function update() {
    var y = window.pageYOffset || root.scrollTop || 0;
    if (y <= TOP) root.classList.remove('ccbgzzy-scrolled');
    else if (y > COMPACT) {
      if (y > lastY + 4) root.classList.add('ccbgzzy-scrolled');     /* 向下→收缩 */
      else if (y < lastY - 4) root.classList.remove('ccbgzzy-scrolled'); /* 向上→展开 */
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }, { passive: true });
  update();
};

/* 启动 */
(function () {
  /* 渐进增强标记：JS 在场才启用 [data-reveal] 隐藏动画；
     theme-config.js 在 <head> 同步执行，此类在 body 渲染前注入，无内容闪烁。
     若无 JS，base.css 不隐藏 [data-reveal]，核心内容默认可见。 */
  try { document.documentElement.classList.add('ccbgzzy-js'); } catch (e) {}
  window.CCBGZZY_initMobileTitles = function () {
    try {
      if (!(window.matchMedia && window.matchMedia('(max-width:760px)').matches)) return;
      document.querySelectorAll('[data-mobile-title]').forEach(function (el) {
        if (el.tagName === 'TD' || el.tagName === 'TH') return;
        var short = el.getAttribute('data-mobile-title'); if (!short) return;
        var full = (el.getAttribute('aria-label') || el.textContent || '').trim();
        if (!el.getAttribute('title')) el.setAttribute('title', full);
        if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', full);
        el.textContent = short;
      });
    } catch (e) {}
  };
  function CCBGZZY_initToolLayer() {
    try {
      window.CCBGZZY_initMobileTitles();
      /* 自动挂载所有紧凑主题控件 */
      document.querySelectorAll('[data-ccbgzzy-theme-control]').forEach(function (h) { window.CCBGZZY_mountThemeControl(h); });
      /* 绑定移动菜单按钮 → drawer */
      document.querySelectorAll('[data-ccbgzzy-drawer]').forEach(function (btn) {
        btn.addEventListener('click', function (e) { e.preventDefault(); window.CCBGZZY_toggleDrawer(btn.getAttribute('data-ccbgzzy-drawer')); });
      });
      /* drawer 内链接点击后自动关闭 */
      document.querySelectorAll('.ccbgzzy-mobile-drawer a').forEach(function (a) {
        a.addEventListener('click', function () { window.CCBGZZY_closeAllOverlays(); });
      });
      /* 点击空白 / ESC 关闭浮层 */
      document.addEventListener('click', function () { window.CCBGZZY_closeAllOverlays(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.CCBGZZY_closeAllOverlays(); });
      window.CCBGZZY_initHeadroom();
    } catch (e) {}
  }
  try { if (document.readyState !== 'loading') CCBGZZY_initToolLayer(); else document.addEventListener('DOMContentLoaded', CCBGZZY_initToolLayer); } catch (e) {}
  if (window !== window.top) {
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'ccbgzzyTheme') window.CCBGZZY_applyTheme(e.data.theme);
    });
  }
  var saved = window.CCBGZZY_DEFAULT_THEME;
  try { saved = localStorage.getItem('ccbgzzy-theme') || saved; } catch (e) {}
  window.CCBGZZY_applyTheme(saved);
})();
