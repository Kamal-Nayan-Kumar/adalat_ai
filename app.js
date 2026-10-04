/* Adalat AI — shared behaviour.
   Small and dependency-free: nav toggles, mobile shell, tabs, demo charts. */
(function () {
  'use strict';

  /* ---------- header nav ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      navToggle.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    });
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('use').setAttribute('href', '#i-menu');
      }
    });
  }

  /* ---------- mobile shell rail ---------- */
  var shellToggle = document.getElementById('shell-toggle');
  var shellRail = document.getElementById('shell-rail');
  if (shellToggle && shellRail) {
    shellToggle.addEventListener('click', function () {
      var open = shellRail.classList.toggle('is-open');
      shellToggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- tabs (courtroom on small screens) ---------- */
  var tabGroup = document.querySelector('[data-tabs]');
  if (tabGroup) {
    var host = tabGroup.closest('.court') || document.body;
    var buttons = tabGroup.querySelectorAll('[data-tab]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.setAttribute('aria-selected', String(b === btn));
        });
        host.setAttribute('data-show', btn.getAttribute('data-tab'));
      });
    });
  }

  /* ---------- case filters ---------- */
  var search = document.getElementById('case-search');
  var selects = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-case]'));
  var empty = document.getElementById('case-empty');
  var count = document.getElementById('case-count');

  function applyFilters() {
    var q = (search && search.value || '').trim().toLowerCase();
    var active = selects.filter(function (s) { return s.value; })
      .map(function (s) { return s.getAttribute('data-filter') + ':' + s.value; });
    var shown = 0;

    cards.forEach(function (card) {
      var text = card.getAttribute('data-case').toLowerCase();
      var meta = (card.getAttribute('data-meta') || '').split(' ');
      var okText = !q || text.indexOf(q) !== -1;
      var okMeta = active.every(function (a) {
        var parts = a.split(':');
        return meta.indexOf(parts[0] + '=' + parts[1]) !== -1;
      });
      var show = okText && okMeta;
      card.hidden = !show;
      if (show) shown++;
    });

    if (empty) empty.hidden = shown !== 0;
    if (count) count.textContent = shown + (shown === 1 ? ' case' : ' cases');
  }

  if (search) search.addEventListener('input', applyFilters);
  selects.forEach(function (s) { s.addEventListener('change', applyFilters); });
  if (cards.length) applyFilters();

  /* ---------- charts ----------
     Drawn as inline SVG from data in the markup, so they scale, print and
     respond to theme without a charting library. */

  var TREND = [
    { d: '2026-01-14', s: 6.2 }, { d: '2026-01-21', s: 6.8 }, { d: '2026-01-28', s: 6.5 },
    { d: '2026-02-04', s: 7.4 }, { d: '2026-02-11', s: 7.1 }, { d: '2026-02-18', s: 7.9 },
    { d: '2026-02-25', s: 8.3 }, { d: '2026-03-04', s: 8.0 }, { d: '2026-03-11', s: 8.7 }
  ];

  var SKILLS = [
    { n: 'Opening statement', v: 8.4 }, { n: 'Examination-in-chief', v: 7.6 },
    { n: 'Cross-examination', v: 6.9 }, { n: 'Objections', v: 8.1 },
    { n: 'Use of exhibits', v: 7.2 }, { n: 'Legal citations', v: 6.4 }
  ];

  var MONTHS = [
    { n: 'Oct', v: 4 }, { n: 'Nov', v: 9 }, { n: 'Dec', v: 6 },
    { n: 'Jan', v: 14 }, { n: 'Feb', v: 19 }, { n: 'Mar', v: 23 }
  ];

  function el(name, attrs, text) {
    var n = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }

  function drawTrend(svg) {
    var W = 640, H = 260, P = { t: 16, r: 16, b: 34, l: 34 };
    var iw = W - P.l - P.r, ih = H - P.t - P.b;
    var min = 5, max = 9;
    var x = function (i) { return P.l + (iw * i) / (TREND.length - 1); };
    var y = function (v) { return P.t + ih - ((v - min) / (max - min)) * ih; };

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var defs = el('defs');
    var grad = el('linearGradient', { id: 'adalatFade', x1: '0', y1: '0', x2: '0', y2: '1' });
    grad.appendChild(el('stop', { offset: '0%', 'stop-color': '#6E1217', 'stop-opacity': '.18' }));
    grad.appendChild(el('stop', { offset: '100%', 'stop-color': '#6E1217', 'stop-opacity': '0' }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    [5, 6, 7, 8, 9].forEach(function (v) {
      svg.appendChild(el('line', { class: 'grid-line', x1: P.l, y1: y(v), x2: W - P.r, y2: y(v) }));
      svg.appendChild(el('text', { class: 'lbl', x: P.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, v.toFixed(1)));
    });

    var dLine = TREND.map(function (p, i) {
      return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.s).toFixed(1);
    }).join(' ');
    svg.appendChild(el('path', {
      class: 'area',
      d: dLine + ' L' + x(TREND.length - 1).toFixed(1) + ' ' + (P.t + ih) + ' L' + P.l + ' ' + (P.t + ih) + ' Z',
    }));
    svg.appendChild(el('path', { class: 'line', d: dLine }));

    TREND.forEach(function (p, i) {
      svg.appendChild(el('circle', { class: 'dot', cx: x(i), cy: y(p.s), r: 3.6 }));
    });

    var last = TREND[TREND.length - 1];
    svg.appendChild(el('text', {
      class: 'val', x: x(TREND.length - 1), y: y(last.s) - 12, 'text-anchor': 'middle',
    }, last.s.toFixed(1)));

    TREND.forEach(function (p, i) {
      if (i % 2 === 0 || i === TREND.length - 1) {
        var label = p.d.slice(5).replace('-', '/');
        svg.appendChild(el('text', {
          class: 'lbl', x: x(i), y: H - 12, 'text-anchor': 'middle',
        }, label));
      }
    });
  }

  // radar axis labels, kept short enough to sit inside the viewBox
  var SHORT = {
    'Opening statement': ['Opening'],
    'Examination-in-chief': ['Examination'],
    'Cross-examination': ['Cross-exam'],
    'Objections': ['Objections'],
    'Use of exhibits': ['Exhibits'],
    'Legal citations': ['Citations'],
  };

  function drawRadar(svg) {
    // square canvas with room for the axis labels, so nothing is clipped
    var size = 380, c = size / 2, R = 95;
    var n = SKILLS.length;
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);

    [0.25, 0.5, 0.75, 1].forEach(function (ring) {
      var pts = SKILLS.map(function (_, i) {
        var a = -Math.PI / 2 + (2 * Math.PI * i) / n;
        return (c + Math.cos(a) * R * ring).toFixed(1) + ' ' + (c + Math.sin(a) * R * ring).toFixed(1);
      }).join(' ');
      svg.appendChild(el('polygon', {
        points: pts, fill: 'none', stroke: '#F1ECE4', 'stroke-width': '1',
      }));
    });

    SKILLS.forEach(function (_, i) {
      var a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      svg.appendChild(el('line', {
        x1: c, y1: c, x2: c + Math.cos(a) * R, y2: c + Math.sin(a) * R,
        stroke: '#F1ECE4', 'stroke-width': '1',
      }));
    });

    var pts = SKILLS.map(function (s, i) {
      var a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      var r = (s.v / 10) * R;
      return (c + Math.cos(a) * r).toFixed(1) + ' ' + (c + Math.sin(a) * r).toFixed(1);
    }).join(' ');
    svg.appendChild(el('polygon', {
      points: pts, fill: 'rgba(110,18,23,.16)', stroke: '#6E1217',
      'stroke-width': '2.25', 'stroke-linejoin': 'round',
    }));

    SKILLS.forEach(function (s, i) {
      var a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      var r = (s.v / 10) * R;
      svg.appendChild(el('circle', {
        cx: c + Math.cos(a) * r, cy: c + Math.sin(a) * r,
        r: 3.4, fill: '#fff', stroke: '#6E1217', 'stroke-width': '2.25',
      }));
      var lx = c + Math.cos(a) * (R + 24);
      var ly = c + Math.sin(a) * (R + 24);
      var anchor = Math.abs(Math.cos(a)) < 0.35 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
      // two-line labels: long skill names would otherwise run off the canvas
      var words = SHORT[s.n] || [s.n];
      words.forEach(function (w, li) {
        svg.appendChild(el('text', {
          class: 'lbl', x: lx, y: ly + 4 + li * 13, 'text-anchor': anchor,
        }, w));
      });
    });
  }

  function drawBars(svg) {
    var W = 640, H = 220, P = { t: 14, r: 12, b: 30, l: 32 };
    var iw = W - P.l - P.r, ih = H - P.t - P.b;
    var max = Math.max.apply(null, MONTHS.map(function (m) { return m.v; }));
    var step = iw / MONTHS.length;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    [0, 10, 20].forEach(function (v) {
      var y = P.t + ih - (v / 24) * ih;
      svg.appendChild(el('line', { class: 'grid-line', x1: P.l, y1: y, x2: W - P.r, y2: y }));
      svg.appendChild(el('text', { class: 'lbl', x: P.l - 8, y: y + 4, 'text-anchor': 'end' }, v));
    });

    MONTHS.forEach(function (m, i) {
      var h = (m.v / 24) * ih;
      var bw = step * 0.52;
      var x = P.l + step * i + (step - bw) / 2;
      var best = m.v === max;
      svg.appendChild(el('rect', {
        class: best ? 'bar-hi' : 'bar', x: x, y: P.t + ih - h,
        width: bw, height: h, rx: 4,
      }));
      svg.appendChild(el('text', {
        class: 'lbl', x: x + bw / 2, y: H - 10, 'text-anchor': 'middle',
      }, m.n));
    });
  }

  [['chart-trend', drawTrend], ['chart-radar', drawRadar], ['chart-bars', drawBars]]
    .forEach(function (pair) {
      var svg = document.getElementById(pair[0]);
      if (svg) pair[1](svg);
    });

  /* ---------- skill bars ---------- */
  document.querySelectorAll('[data-skill]').forEach(function (row) {
    var v = parseFloat(row.getAttribute('data-skill'));
    var fill = row.querySelector('.bar-fill');
    var out = row.querySelector('em');
    if (fill) fill.style.width = (v * 10) + '%';
    if (out) out.textContent = v.toFixed(1) + '/10';
  });

  /* ---------- activity heatmap ---------- */
  var heat = document.getElementById('heat');
  if (heat) {
    var html = '';
    // deterministic pseudo-random so the chart is stable between renders
    var seed = 7;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    for (var i = 0; i < 119; i++) {
      var r = rnd();
      var lvl = r > 0.93 ? 4 : r > 0.82 ? 3 : r > 0.68 ? 2 : r > 0.5 ? 1 : 0;
      html += '<i data-l="' + lvl + '" title="day ' + i + '"></i>';
    }
    heat.innerHTML = html;
  }

  /* ---------- courtroom demo ---------- */
  var stream = document.getElementById('chat-stream');
  var input = document.getElementById('composer-input');
  var send = document.getElementById('composer-send');
  var stageStatus = document.getElementById('stage-status');

  function scrollChat() {
    var col = document.getElementById('chat-col');
    if (col) col.scrollTop = col.scrollHeight;
  }

  function addMsg(who, icon, text, cls) {
    if (!stream) return;
    var m = document.createElement('div');
    m.className = 'msg' + (cls ? ' ' + cls : '');
    m.innerHTML =
      '<span class="ic-slot ic-slot--40"><svg class="ic is-sm"><use href="#' + icon + '"/></svg></span>' +
      '<div class="msg-bubble"><div class="msg-who"></div>' +
      '<div class="msg-text"></div><div class="msg-time"></div></div>';
    m.querySelector('.msg-who').textContent = who;
    m.querySelector('.msg-text').textContent = text;
    m.querySelector('.msg-time').textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit',
    });
    stream.appendChild(m);
    scrollChat();
  }

  function youSaid(text) {
    addMsg('You', 'i-user', text, 'is-you');
    setTimeout(function () {
      addMsg('Judge AI', 'i-judge',
        'Noted. Let the record reflect that. Counsel, you may proceed.', 'is-judge');
      if (stageStatus) stageStatus.textContent = 'Your turn';
    }, 700);
  }

  if (send && input) {
    send.addEventListener('click', function () {
      var v = input.value.trim();
      if (!v) return;
      youSaid(v);
      input.value = '';
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send.click();
      }
    });
    document.querySelectorAll('.chip-btn').forEach(function (c) {
      c.addEventListener('click', function () {
        youSaid(c.getAttribute('data-say') || c.textContent.trim());
      });
    });
  }

  /* ---------- verdict modal ---------- */
  var modal = document.getElementById('verdict');
  if (modal) {
    var openBtn = document.getElementById('open-verdict');
    if (openBtn) openBtn.addEventListener('click', function () { modal.hidden = false; });
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-close]')) modal.hidden = true;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) modal.hidden = true;
    });
  }
})();