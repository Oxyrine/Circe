(function () {
  'use strict';

  var NAV_ITEMS = [
    { key: 'queue', label: 'INVESTIGATION QUEUE', route: '#/queue' },
    { key: 'case', label: 'CASE DETAIL', route: '#/case/CR-0512' },
    { key: 'network', label: 'NETWORK INVESTIGATION', route: '#/network/CR-0512' },
    { key: 'graph', label: 'TRANSACTION GRAPH', route: '#/graph/CR-0512' },
    { key: 'log', label: 'INVESTIGATION LOG', route: '#/log/CR-0512' },
  ];

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function riskBadge(level) {
    return el('span', { class: 'risk-badge ' + level, text: level });
  }

  // ---------- Shared chrome ----------
  function buildNavRail(activeKey) {
    var rail = el('div', { class: 'nav-rail' });
    rail.appendChild(el('div', { class: 'nav-logo', text: 'CIRCE' }));
    rail.appendChild(el('div', { class: 'nav-divider' }));
    var list = el('div', { class: 'nav-list' });
    NAV_ITEMS.forEach(function (item) {
      var btn = el('button', {
        class: 'nav-item' + (item.key === activeKey ? ' active' : ''),
        text: item.label,
        onclick: function () { location.hash = item.route; },
      });
      list.appendChild(btn);
    });
    rail.appendChild(list);
    return rail;
  }

  function buildTopBar() {
    var bar = el('div', { class: 'top-bar' });
    var search = el('div', { class: 'search-box' }, [
      el('span', { class: 'glyph', text: 'Q' }),
      el('input', { type: 'text', placeholder: 'Search company, director, invoice ID, or case ID…' }),
    ]);
    bar.appendChild(search);
    bar.appendChild(el('div', { class: 'spacer' }));
    var identity = el('div', { class: 'identity' }, [
      el('span', { class: 'demo-tag', text: 'SIMULATED DATA' }),
      el('div', { class: 'avatar', text: INVESTIGATOR.initials }),
      el('span', { class: 'identity-name', text: INVESTIGATOR.name.toUpperCase() + ' · ' + INVESTIGATOR.role.toUpperCase() }),
    ]);
    bar.appendChild(identity);
    return bar;
  }

  function breadcrumb(label, route) {
    return el('div', { class: 'breadcrumb', text: '← ' + label, onclick: function () { location.hash = route; } });
  }

  // ---------- Contextual panels ----------
  function riskSignalsPanel(signals, agg) {
    var panel = el('div', { class: 'panel' });
    panel.appendChild(el('div', { class: 'panel-header' }, [
      el('span', { class: 'title', text: 'RISK SIGNALS' }),
      el('span', { class: 'meta', text: 'AGG ' + agg }),
    ]));
    signals.forEach(function (s) {
      var row = el('div', { class: 'signal-row' });
      row.appendChild(el('div', { class: 'top' }, [
        el('span', { class: 'name', text: s.name }),
        el('span', { class: 'score' + (s.score == null ? ' na' : ''), text: s.score == null ? 'N/A' : s.score.toFixed(2) }),
      ]));
      var track = el('div', { class: 'bar-track' });
      if (s.score != null) track.appendChild(el('div', { class: 'bar-fill', style: 'width:' + Math.round(s.score * 100) + '%' }));
      row.appendChild(track);
      row.appendChild(el('div', { class: 'caption', text: s.note }));
      panel.appendChild(row);
    });
    return panel;
  }

  function evidenceTrailPanel(trail) {
    var panel = el('div', { class: 'panel' });
    panel.appendChild(el('div', { class: 'panel-header' }, [
      el('span', { class: 'title', text: 'EVIDENCE TRAIL' }),
      el('span', { class: 'meta', text: trail.length + ' HOPS' }),
    ]));
    trail.forEach(function (h) {
      var row = el('div', { class: 'trail-row' + (h.bridge ? ' bridge' : '') });
      var top = el('div', { class: 'top' }, [el('span', { class: 'flow', text: h.flow })]);
      if (h.value) top.appendChild(el('span', { class: 'value', text: h.value }));
      row.appendChild(top);
      row.appendChild(el('div', { class: 'meta', text: h.meta }));
      panel.appendChild(row);
    });
    return panel;
  }

  function entityInfoPanel(entity) {
    var panel = el('div', { class: 'panel' });
    panel.appendChild(el('div', { class: 'panel-header' }, [el('span', { class: 'title', text: 'ENTITY' })]));
    panel.appendChild(el('div', { class: 'entity-name', text: entity.name }));
    var fields = [
      ['INDUSTRY', entity.industry],
      ['REGISTERED ADDRESS', entity.address],
      ['REGISTRATION DATE', entity.registrationDate],
      ['DIRECTORS', entity.directors],
      ['RELATED INVOICES', entity.relatedInvoices],
    ];
    fields.forEach(function (f) {
      panel.appendChild(el('div', { class: 'field' }, [
        el('div', { class: 'k', text: f[0] }),
        el('div', { class: 'v', text: f[1] }),
      ]));
    });
    panel.appendChild(el('div', { class: 'field', style: 'border-top:1px solid var(--border);padding-top:12px' }, [
      el('div', { class: 'k', text: 'FLAGGED IN ' + entity.flaggedNetworks + ' NETWORKS' }),
    ]));
    return panel;
  }

  function caseActionBar() {
    var bar = el('div', { class: 'action-bar' });
    bar.appendChild(el('span', { class: 'status-chip', text: 'STATUS: UNDER REVIEW' }));
    bar.appendChild(el('div', { class: 'spacer' }));
    ['Assign Investigator', 'Document Override', 'Dismiss'].forEach(function (label) {
      bar.appendChild(el('button', { class: 'btn', text: label }));
    });
    bar.appendChild(el('button', { class: 'btn primary', text: 'Escalate Case' }));
    return bar;
  }

  // ---------- Screens ----------
  function renderQueue(main) {
    main.appendChild(buildTopBar());
    main.appendChild(el('h1', { class: 'page-title', text: 'Investigation Queue' }));

    var stats = el('div', { class: 'stats-row' });
    [
      ['OPEN CASES', SUMMARY.openCases, null],
      ['TOTAL EXPOSURE', SUMMARY.totalExposure, null],
      ['CORPORATE-CLOSED', SUMMARY.corporateClosed, 'vs. transaction-closed'],
      ['AVG AGGREGATE', SUMMARY.avgAggregate, null],
      ['ESCALATED TODAY', SUMMARY.escalatedToday, null],
    ].forEach(function (s) {
      var tile = el('div', { class: 'stat-tile' }, [
        el('div', { class: 'stat-label', text: s[0] }),
        el('div', { class: 'stat-value', text: String(s[1]) }),
      ]);
      if (s[2]) tile.appendChild(el('div', { class: 'stat-sub', text: s[2] }));
      stats.appendChild(tile);
    });
    main.appendChild(stats);

    var filters = el('div', { class: 'filters-row' });
    ['STATUS: ALL', 'CLOSURE: ALL', 'RISK BAND: ALL', 'DATE: LAST 30 DAYS'].forEach(function (label) {
      filters.appendChild(el('div', { class: 'chip' }, [
        el('span', { text: label }), el('span', { class: 'caret', text: '▾' }),
      ]));
    });
    main.appendChild(filters);

    var table = el('div', { class: 'table-panel queue' });
    table.appendChild(el('div', { class: 'table-head' }, [
      'CASE ID', 'ENTITIES', 'RISK', 'AGG', 'EXPOSURE', 'STATUS', 'ASSIGNED', '',
    ].map(function (l) { return el('div', { text: l }); })));
    QUEUE.forEach(function (r) {
      var row = el('div', {
        class: 'table-row',
        onclick: function () { location.hash = '#/case/' + r.id; },
      }, [
        el('div', { class: 'cell-strong', text: r.id }),
        el('div', { class: 'cell-muted', text: r.entities + ' entities · ' + r.hops + ' hops' }),
        riskBadge(r.risk),
        el('div', { class: 'cell-strong', text: r.agg.toFixed(2) }),
        el('div', { text: r.exposure }),
        el('div', { class: 'cell-muted', text: r.status }),
        el('div', { class: 'cell-muted', text: r.assigned || '—' }),
        el('div', { class: 'chevron', text: '›' }),
      ]);
      table.appendChild(row);
    });
    main.appendChild(table);
  }

  function renderCase(main, id) {
    var row = QUEUE.filter(function (r) { return r.id === id; })[0] || QUEUE[0];
    var t = CASE_TEMPLATE;
    main.appendChild(buildTopBar());
    main.appendChild(breadcrumb('Investigation Queue', '#/queue'));

    var head = el('div', { style: 'display:flex;align-items:center;gap:12px' }, [
      el('h1', { class: 'page-title', text: row.id }),
      riskBadge(row.risk),
    ]);
    main.appendChild(head);
    main.appendChild(caseActionBar());

    var why = el('div', { class: 'why-box' });
    why.appendChild(el('div', { class: 'why-label', text: 'WHY FLAGGED' }));
    why.appendChild(el('p', { class: 'why-sentence', text: t.whyFlagged }));
    var chips = el('div', { class: 'signal-chips' });
    t.topSignals.forEach(function (s) {
      chips.appendChild(el('div', { class: 'signal-chip' }, [
        el('span', { class: 'name', text: s.name }), el('span', { class: 'val', text: s.score }),
      ]));
    });
    why.appendChild(chips);
    why.appendChild(el('hr', { style: 'border:none;border-top:1px solid var(--border);width:100%' }));
    var statsInline = el('div', { class: 'stats-inline' });
    [['AGGREGATE RISK SCORE', row.agg.toFixed(2)], ['EXPECTED EXPOSURE', row.exposure], ['CLOSURE TYPE', t.closureType]].forEach(function (s) {
      statsInline.appendChild(el('div', { class: 'mini-stat' }, [
        el('div', { class: 'label', text: s[0] }), el('div', { class: 'value', text: s[1] }),
      ]));
    });
    why.appendChild(statsInline);
    main.appendChild(why);

    var cols = el('div', { class: 'two-col' });
    var left = el('div', { class: 'col-left' });
    left.appendChild(el('div', { class: 'section-title', text: 'NETWORK OVERVIEW' }));
    var tags = el('div', { class: 'entity-tags' });
    t.entityTags.forEach(function (id2) { tags.appendChild(el('div', { class: 'entity-tag', text: id2 })); });
    left.appendChild(tags);
    left.appendChild(el('p', { class: 'page-sub', text: t.overview }));
    left.appendChild(el('hr', { style: 'border:none;border-top:1px solid var(--border);width:100%' }));
    var meta = el('div', { class: 'stats-inline' });
    [['FIRST DETECTED', t.firstDetected], ['LAST ACTIVITY', t.lastActivity], ['SIMILAR CASES', String(t.similarCases)]].forEach(function (s) {
      meta.appendChild(el('div', { class: 'mini-stat' }, [
        el('div', { class: 'label', text: s[0] }), el('div', { class: 'value', style: 'font-size:18px', text: s[1] }),
      ]));
    });
    left.appendChild(meta);
    left.appendChild(el('div', {
      class: 'cta-btn', onclick: function () { location.hash = '#/network/' + row.id; },
    }, [el('span', { text: 'View Network / Company Investigation' }), el('span', { class: 'arrow', text: '→' })]));
    left.appendChild(el('div', {
      class: 'cta-btn', onclick: function () { location.hash = '#/graph/' + row.id; },
    }, [el('span', { text: 'View Transaction Graph (evidence)' }), el('span', { class: 'arrow', text: '→' })]));
    cols.appendChild(left);

    var right = el('div', { class: 'col-right' });
    right.appendChild(riskSignalsPanel(t.signals, row.agg.toFixed(2)));
    right.appendChild(evidenceTrailPanel(t.trail));
    cols.appendChild(right);

    main.appendChild(cols);
  }

  function renderNetwork(main, id) {
    main.appendChild(buildTopBar());
    main.appendChild(breadcrumb(id, '#/case/' + id));
    main.appendChild(el('h1', { class: 'page-title', text: 'Network Investigation' }));
    main.appendChild(el('p', { class: 'page-sub', text: 'Pivot from any entity to see every network it appears in — not just the case you arrived from.' }));

    var cols = el('div', { class: 'two-col' });
    var left = el('div', { class: 'col-left' });

    left.appendChild(el('div', { class: 'section-title', text: 'RELATED ENTITIES' }));
    var table = el('div', { class: 'table-panel entity-table' });
    table.appendChild(el('div', { class: 'table-head' }, ['ENTITY', 'NAME', 'ROLE', 'NETWORKS'].map(function (l) { return el('div', { text: l }); })));
    RELATED_ENTITIES.forEach(function (e) {
      table.appendChild(el('div', { class: 'table-row' }, [
        el('div', { class: 'cell-strong', text: e.id }),
        el('div', { text: e.name }),
        el('div', { class: 'cell-muted', text: e.role }),
        el('div', { class: 'cell-muted', text: String(e.networks) }),
      ]));
    });
    left.appendChild(table);

    left.appendChild(el('div', { class: 'section-title', text: 'CORPORATE RELATIONSHIPS' }));
    left.appendChild(el('div', { class: 'section-note', text: 'Direct, pairwise evidence only — never chained through a third entity.' }));
    var bridgePanel = el('div', { class: 'bridge-panel' });
    CORPORATE_BRIDGES.forEach(function (b) {
      bridgePanel.appendChild(el('div', { class: 'bridge-row' }, [
        el('span', { class: 'pair', text: b.pair }),
        el('span', { class: 'bridge-tag', text: b.kind }),
        el('span', { class: 'evidence', text: b.evidence }),
      ]));
    });
    left.appendChild(bridgePanel);
    cols.appendChild(left);

    var right = el('div', { class: 'col-right' });
    right.appendChild(entityInfoPanel(ENTITY_DETAIL));
    cols.appendChild(right);

    main.appendChild(cols);
  }

  function renderGraph(main, id) {
    var t = CASE_TEMPLATE;
    main.appendChild(buildTopBar());
    main.appendChild(breadcrumb(id, '#/case/' + id));
    main.appendChild(el('h1', { class: 'page-title', text: 'Transaction Graph' }));
    main.appendChild(el('p', { class: 'page-sub', text: 'Supporting evidence for ' + id + ' — the ranked queue and risk signals are the primary investigative surface. This view visualizes what the signals already scored.' }));

    var cols = el('div', { class: 'two-col' });
    var left = el('div', { class: 'col-left' });

    var canvas = el('div', { class: 'graph-canvas' });
    var svgns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgns, 'svg');
    svg.setAttribute('width', '560'); svg.setAttribute('height', '480');
    svg.setAttribute('viewBox', '0 0 560 480');
    svg.style.position = 'absolute'; svg.style.top = '0'; svg.style.left = '0';

    GRAPH.backdrop.forEach(function (p) {
      var c = document.createElementNS(svgns, 'circle');
      c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('r', '3'); c.setAttribute('fill', '#d7d7d9');
      svg.appendChild(c);
    });
    var nodeMap = {};
    GRAPH.nodes.forEach(function (n) { nodeMap[n.id] = n; });
    GRAPH.edges.forEach(function (e) {
      var a = nodeMap[e.from], b = nodeMap[e.to];
      var line = document.createElementNS(svgns, 'line');
      line.setAttribute('x1', a.cx); line.setAttribute('y1', a.cy);
      line.setAttribute('x2', b.cx); line.setAttribute('y2', b.cy);
      if (e.kind === 'bridge') {
        line.setAttribute('stroke', '#997107'); line.setAttribute('stroke-width', '1.5'); line.setAttribute('stroke-dasharray', '5,4');
      } else {
        line.setAttribute('stroke', '#26262a'); line.setAttribute('stroke-width', '1.5');
      }
      svg.appendChild(line);
    });
    canvas.appendChild(svg);

    GRAPH.nodes.forEach(function (n) {
      var node = el('div', {
        style: 'position:absolute;left:' + (n.cx - 26) + 'px;top:' + (n.cy - 26) + 'px;width:52px;height:52px;border-radius:50%;'
          + 'display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;'
          + (n.dim ? 'background:#d9d9da;color:#6c6c73;' : 'background:#1c1c1f;color:#fff;'),
        text: n.id,
      });
      canvas.appendChild(node);
    });
    left.appendChild(canvas);

    var legend = el('div', { class: 'graph-legend' }, [
      el('div', { class: 'legend-item' }, [el('div', { class: 'legend-swatch' }), el('span', { text: 'Transaction hop' })]),
      el('div', { class: 'legend-item' }, [el('div', { class: 'legend-swatch bridge' }), el('span', { text: 'Corporate bridge (pairwise evidence, non-transitive)' })]),
      el('div', { class: 'legend-item' }, [el('div', { class: 'legend-dot' }), el('span', { text: 'Other platform activity — not part of this case' })]),
    ]);
    left.appendChild(legend);
    cols.appendChild(left);

    var right = el('div', { class: 'col-right' });
    right.appendChild(riskSignalsPanel(t.signals, '0.81'));
    right.appendChild(evidenceTrailPanel(t.trail));
    cols.appendChild(right);

    main.appendChild(cols);
  }

  function renderLog(main, id) {
    main.appendChild(buildTopBar());
    main.appendChild(breadcrumb(id, '#/case/' + id));
    main.appendChild(el('h1', { class: 'page-title', text: 'Investigation Log' }));
    main.appendChild(el('p', { class: 'page-sub', text: 'Every decision on this case, permanently recorded — escalations, overrides, and the reasoning behind them.' }));
    main.appendChild(caseActionBar());

    main.appendChild(el('div', { class: 'section-title', text: 'AUDIT TRAIL — ' + id }));
    var timeline = el('div', { class: 'timeline' });
    var tagClass = { FLAGGED: 'flagged', ESCALATED: 'escalated', 'OVERRIDE DOCUMENTED': 'override' };
    AUDIT_LOG.forEach(function (e) {
      var entry = el('div', { class: 'timeline-entry' });
      var top = el('div', { class: 'timeline-top' }, [
        el('span', { class: 'action-tag ' + tagClass[e.action], text: e.action }),
        el('span', { class: 'timeline-actor', text: e.actor + (e.role ? ' · ' + e.role : '') }),
        el('div', { class: 'spacer' }),
        el('span', { class: 'timeline-ts', text: e.ts }),
      ]);
      entry.appendChild(top);
      entry.appendChild(el('div', { class: 'timeline-agg', text: 'Aggregate at time of action: ' + e.agg }));
      if (e.note) entry.appendChild(el('div', { class: 'timeline-note', text: e.note }));
      timeline.appendChild(entry);
    });
    main.appendChild(timeline);

    main.appendChild(el('div', { class: 'section-title', text: 'RECORD DECISION' }));
    var form = el('div', { class: 'form-panel' });
    var formRow = el('div', { class: 'form-row' });
    formRow.appendChild(el('div', { class: 'field-group' }, [
      el('span', { class: 'flabel', text: 'ACTION TYPE' }),
      el('div', { class: 'select-box' }, [el('span', { text: 'Escalate Case' }), el('span', { class: 'caret', text: '▾' })]),
    ]));
    formRow.appendChild(el('div', { class: 'field-group' }, [
      el('span', { class: 'flabel', text: 'ACTOR ROLE' }),
      el('div', { class: 'select-box' }, [el('span', { text: 'Senior Investigator' }), el('span', { class: 'caret', text: '▾' })]),
    ]));
    form.appendChild(formRow);
    form.appendChild(el('div', { class: 'field-group' }, [
      el('span', { class: 'flabel', text: 'NOTE (REQUIRED FOR OVERRIDES)' }),
      el('textarea', { class: 'note-box', placeholder: 'Document the reasoning behind this decision…', rows: '2' }),
    ]));
    form.appendChild(el('button', { class: 'btn primary', text: 'Submit Decision', style: 'width:fit-content' }));
    main.appendChild(form);
  }

  // ---------- Router ----------
  function route() {
    var hash = location.hash || '#/queue';
    var parts = hash.replace('#/', '').split('/');
    var view = parts[0];
    var id = parts[1] || 'CR-0512';

    var app = document.getElementById('app');
    app.innerHTML = '';

    var activeKey = view === 'case' ? 'case' : view;
    app.appendChild(buildNavRail(activeKey));
    var main = el('div', { class: 'main' });
    app.appendChild(main);

    if (view === 'case') renderCase(main, id);
    else if (view === 'network') renderNetwork(main, id);
    else if (view === 'graph') renderGraph(main, id);
    else if (view === 'log') renderLog(main, id);
    else renderQueue(main);
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('DOMContentLoaded', route);
})();
