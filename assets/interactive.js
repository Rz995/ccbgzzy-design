/**
 * ===================================================================
 * CCBGZZY_DESIGN · interactive.js
 * ===================================================================
 * Native progressive interactions: tabs, segmented filters, sortable
 * tables, and single-open accordions. No dependencies.
 * ===================================================================
 */
(function () {
  'use strict';

  function $all(root, selector) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function activateTab(root, tab, focus) {
    var tabs = $all(root, '[role="tab"]');
    tabs.forEach(function (t) {
      var active = t === tab;
      var panel = document.getElementById(t.getAttribute('aria-controls') || '');
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
      if (panel) panel.hidden = !active;
    });
    if (focus) tab.focus();
  }

  function initTabs(root) {
    $all(root, '[data-ccbgzzy-tabs]').forEach(function (group) {
      var tabs = $all(group, '[role="tab"]');
      if (!tabs.length) return;
      tabs.forEach(function (tab, i) {
        var target = tab.getAttribute('data-tab-target') || tab.getAttribute('aria-controls');
        if (target && target.charAt(0) === '#') target = target.slice(1);
        if (!target) {
          var panel = $all(group, '[role="tabpanel"]')[i];
          if (panel && panel.id) target = panel.id;
        }
        if (!target) return;
        tab.setAttribute('aria-controls', target);
        tab.addEventListener('click', function () { activateTab(group, tab, false); });
        tab.addEventListener('keydown', function (event) {
          var idx = tabs.indexOf(tab);
          var next = null;
          if (event.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
          if (event.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
          if (event.key === 'Home') next = tabs[0];
          if (event.key === 'End') next = tabs[tabs.length - 1];
          if (next) {
            event.preventDefault();
            activateTab(group, next, true);
          }
        });
      });
      var selected = tabs.find(function (t) { return t.getAttribute('aria-selected') === 'true'; }) || tabs[0];
      activateTab(group, selected, false);
    });
  }

  function initSegmented(root) {
    $all(root, '[data-ccbgzzy-segmented]').forEach(function (seg) {
      var targetSelector = seg.getAttribute('data-filter-target');
      if (!targetSelector) return;
      var buttons = $all(seg, '[data-filter]');
      var items = $all(document, targetSelector);
      function apply(value, activeButton) {
        buttons.forEach(function (b) {
          var active = b === activeButton;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        items.forEach(function (item) {
          var raw = item.getAttribute('data-filter-value') || '';
          var values = raw.split(/\s+/);
          item.hidden = !(value === 'all' || values.indexOf(value) !== -1);
        });
      }
      buttons.forEach(function (button) {
        button.addEventListener('click', function () { apply(button.getAttribute('data-filter'), button); });
      });
      var initial = buttons.find(function (b) { return b.classList.contains('is-active'); }) || buttons[0];
      if (initial) apply(initial.getAttribute('data-filter'), initial);
    });
  }

  function cellValue(row, index, type) {
    var cell = row.children[index];
    var text = cell ? cell.textContent.trim() : '';
    if (type === 'number') {
      var num = Number(text.replace(/[^0-9.-]/g, ''));
      return Number.isNaN(num) ? -Infinity : num;
    }
    if (type === 'date') {
      var time = Date.parse(text.replace(/\./g, '-').replace(/\//g, '-'));
      return Number.isNaN(time) ? 0 : time;
    }
    return text;
  }

  function initSortableTables(root) {
    $all(root, 'table[data-ccbgzzy-sortable]').forEach(function (table) {
      var headers = $all(table, 'thead th');
      headers.forEach(function (th, index) {
        var type = th.getAttribute('data-sort');
        if (!type) return;
        th.tabIndex = 0;
        th.classList.add('is-sortable');
        th.setAttribute('aria-sort', 'none');
        if (!th.querySelector('.sort-indicator')) {
          var indicator = document.createElement('span');
          indicator.className = 'sort-indicator';
          indicator.setAttribute('aria-hidden', 'true');
          indicator.textContent = '↕';
          th.appendChild(indicator);
        }
        function sort() {
          var tbody = table.tBodies[0];
          if (!tbody) return;
          var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
          headers.forEach(function (h) { h.setAttribute('aria-sort', 'none'); });
          th.setAttribute('aria-sort', dir);
          var rows = $all(tbody, 'tr');
          rows.sort(function (a, b) {
            var av = cellValue(a, index, type);
            var bv = cellValue(b, index, type);
            var cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'zh-Hans-CN');
            return dir === 'ascending' ? cmp : -cmp;
          });
          rows.forEach(function (row) { tbody.appendChild(row); });
        }
        th.addEventListener('click', sort);
        th.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            sort();
          }
        });
      });
    });
  }

  function initAccordions(root) {
    $all(root, '[data-ccbgzzy-accordion]').forEach(function (acc) {
      var items = $all(acc, 'details');
      items.forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        });
      });
    });
  }

  window.CCBGZZY_initInteractive = function (root) {
    root = root || document;
    initTabs(root);
    initSegmented(root);
    initSortableTables(root);
    initAccordions(root);
  };

  onReady(function () {
    window.CCBGZZY_initInteractive(document);
  });
})();
