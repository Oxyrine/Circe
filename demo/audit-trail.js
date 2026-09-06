/*
 * Real Exasol-backed Audit Trail tab.
 *
 * Local-only by design: talks to /api/audit on this same server.py — an
 * endpoint that only exists locally (see exasol/README.md for why). If
 * Exasol isn't running or pyexasol isn't installed, the API returns a
 * clear 503 and this tab says so honestly rather than showing fake rows.
 *
 * Loaded as a sibling script to app.js/constellation.js — does not modify
 * either, so it carries none of their risk.
 */
(function () {
  'use strict';

  function ringLabel(ring) {
    var loss = (ring.expected_loss / 1e7).toFixed(2);
    var agg = ring.aggregate != null ? ring.aggregate.toFixed(2) : '—';
    return ring.ring_id + '  —  ₹' + loss + ' Cr  —  agg ' + agg;
  }

  function getRings() {
    if (typeof SCORED === 'undefined' || !SCORED.rings) return [];
    return SCORED.rings.slice().sort(function (a, b) { return b.expected_loss - a.expected_loss; });
  }

  function findRing(ringId) {
    return getRings().filter(function (r) { return r.ring_id === ringId; })[0] || null;
  }

  function fmtDate(iso) {
    if (!iso) return '—';
    return String(iso).replace('T', ' ').replace(/\.\d+$/, '');
  }

  function setStatus(el, ok, text) {
    el.textContent = '● ' + text;
    el.className = 'audit-status' + (ok ? ' ok' : ' down');
  }

  function renderEntries(container, rows) {
    container.innerHTML = '';
    if (!rows.length) {
      container.innerHTML = '<div class="audit-empty">No audit entries yet for this ring.</div>';
      return;
    }
    rows.forEach(function (row) {
      var actionClass = row.ACTION_TYPE === 'flagged' ? 'flagged'
        : row.ACTION_TYPE === 'escalated' ? 'escalated' : 'override';
      var entry = document.createElement('div');
      entry.className = 'ring-card audit-entry';
      entry.innerHTML =
        '<div class="ring-header">'
        + '<span class="audit-action-tag ' + actionClass + '">' + row.ACTION_TYPE.toUpperCase().replace('_', ' ') + '</span>'
        + '<span class="audit-actor">' + row.ACTOR + (row.ACTOR_ROLE ? ' · ' + row.ACTOR_ROLE : '') + '</span>'
        + '<span class="audit-ts mono">' + fmtDate(row.CREATED_AT) + '</span>'
        + '</div>'
        + '<div class="audit-body">'
        + '<div class="audit-meta">Aggregate at time: ' + (row.AGGREGATE_AT_TIME != null ? row.AGGREGATE_AT_TIME : '—')
        + ' · Closure: ' + (row.CLOSURE_TYPE_AT_TIME || '—') + '</div>'
        + (row.NOTE ? '<div class="audit-note">' + row.NOTE + '</div>' : '')
        + '</div>';
      container.appendChild(entry);
    });
  }

  function loadEntries(ringId, listEl, statusEl) {
    listEl.innerHTML = '<div class="audit-empty">Loading from Exasol…</div>';
    fetch('/api/audit?ring_id=' + encodeURIComponent(ringId))
      .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
      .then(function (res) {
        if (!res.ok || res.data.available === false) {
          setStatus(statusEl, false, (res.data && res.data.error) || 'Exasol unavailable');
          listEl.innerHTML = '<div class="audit-empty">' + ((res.data && res.data.error) || 'Could not reach the local Exasol bridge.') + '</div>';
          return;
        }
        setStatus(statusEl, true, 'CONNECTED — local Exasol (server.py /api/audit)');
        renderEntries(listEl, res.data.rows || []);
      })
      .catch(function (err) {
        setStatus(statusEl, false, 'Request failed — is server.py running? (' + err.message + ')');
        listEl.innerHTML = '<div class="audit-empty">Could not reach /api/audit.</div>';
      });
  }

  function buildView() {
    var section = document.createElement('div');
    section.id = 'view-audit';
    section.className = 'view-section';

    var headerStrip = document.createElement('div');
    headerStrip.className = 'ledger-header-strip';
    var controls = document.createElement('div');
    controls.className = 'ledger-controls';

    var select = document.createElement('select');
    select.className = 'control-select';
    getRings().forEach(function (ring) {
      var opt = document.createElement('option');
      opt.value = ring.ring_id;
      opt.textContent = ringLabel(ring);
      select.appendChild(opt);
    });
    controls.appendChild(select);
    headerStrip.appendChild(controls);

    var status = document.createElement('span');
    status.className = 'audit-status';
    status.textContent = '● checking…';
    headerStrip.appendChild(status);
    section.appendChild(headerStrip);

    var body = document.createElement('div');
    body.className = 'audit-view-body';

    var list = document.createElement('div');
    list.className = 'audit-list';
    body.appendChild(list);

    var form = document.createElement('div');
    form.className = 'ring-card audit-form';
    form.innerHTML =
      '<div class="ring-header"><span>RECORD ACTION</span></div>'
      + '<div class="audit-body">'
      + '  <div class="ledger-controls" style="margin-bottom:8px;">'
      + '    <select id="audit-action-type" class="control-select">'
      + '      <option value="flagged">Flagged</option>'
      + '      <option value="escalated" selected>Escalated</option>'
      + '      <option value="override_documented">Override Documented</option>'
      + '    </select>'
      + '    <input type="text" id="audit-actor" class="control-input" placeholder="Actor name (required)" />'
      + '    <input type="text" id="audit-actor-role" class="control-input" placeholder="Role (optional)" />'
      + '  </div>'
      + '  <textarea id="audit-note" class="control-input" placeholder="Note (required for overrides)" rows="2" style="width:100%;"></textarea>'
      + '  <div style="margin-top:10px;display:flex;align-items:center;gap:10px;">'
      + '    <button id="audit-submit" class="btn primary-action">SUBMIT</button>'
      + '    <span id="audit-form-msg" class="audit-form-msg"></span>'
      + '  </div>'
      + '</div>';
    body.appendChild(form);
    section.appendChild(body);

    var selectedRingId = null;
    function refresh() {
      selectedRingId = select.value;
      loadEntries(selectedRingId, list, status);
    }
    select.addEventListener('change', refresh);

    setTimeout(function () {
      var submitBtn = document.getElementById('audit-submit');
      var msg = document.getElementById('audit-form-msg');
      submitBtn.addEventListener('click', function () {
        var ring = findRing(selectedRingId);
        var actionType = document.getElementById('audit-action-type').value;
        var actor = document.getElementById('audit-actor').value.trim();
        var actorRole = document.getElementById('audit-actor-role').value.trim();
        var note = document.getElementById('audit-note').value.trim();

        if (!actor) { msg.textContent = 'Actor is required.'; msg.className = 'audit-form-msg err'; return; }
        if (actionType === 'override_documented' && !note) {
          msg.textContent = 'A note is required when documenting an override.';
          msg.className = 'audit-form-msg err';
          return;
        }
        msg.textContent = 'Submitting…'; msg.className = 'audit-form-msg';
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ring_id: selectedRingId, action_type: actionType, actor: actor,
            actor_role: actorRole || null, note: note || null,
            aggregate_at_time: ring ? ring.aggregate : null,
            closure_type_at_time: ring ? ring.closure_type : null,
          }),
        })
          .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
          .then(function (res) {
            if (!res.ok) throw new Error(res.data.error || 'request failed');
            msg.textContent = 'Recorded.'; msg.className = 'audit-form-msg ok';
            document.getElementById('audit-note').value = '';
            document.getElementById('audit-actor').value = '';
            loadEntries(selectedRingId, list, status);
          })
          .catch(function (err) {
            msg.textContent = 'Failed: ' + err.message; msg.className = 'audit-form-msg err';
          });
      });
      refresh();
    }, 0);

    return section;
  }

  function injectStyles() {
    var css = document.createElement('style');
    css.textContent =
      '.audit-status{font-size:11px;letter-spacing:.4px;padding:6px 10px;color:var(--text-muted);white-space:nowrap;}'
      + '.audit-status.ok{color:#7fd88f;}'
      + '.audit-status.down{color:var(--risk-coral);}'
      + '.audit-view-body{display:flex;flex-direction:column;gap:16px;padding:16px 0;}'
      + '.audit-list{display:flex;flex-direction:column;gap:10px;}'
      + '.audit-entry .ring-header{gap:12px;}'
      + '.audit-action-tag{font-size:9.5px;font-weight:600;letter-spacing:.4px;padding:3px 8px;border-radius:2px;}'
      + '.audit-action-tag.flagged{background:rgba(255,255,255,.08);color:var(--text-muted);}'
      + '.audit-action-tag.escalated{background:rgba(224,164,90,.15);color:var(--warn-amber);}'
      + '.audit-action-tag.override{background:rgba(224,133,133,.15);color:var(--risk-coral);}'
      + '.audit-actor{font-size:12.5px;font-weight:600;flex:1;}'
      + '.audit-ts{font-size:11px;color:var(--text-muted);}'
      + '.audit-body{padding:12px 16px;}'
      + '.audit-meta{font-size:10.5px;color:var(--text-muted);margin-bottom:4px;}'
      + '.audit-note{font-size:12px;line-height:1.5;}'
      + '.audit-empty{padding:20px;font-size:12px;color:var(--text-muted);text-align:center;}'
      + '.audit-form-msg{font-size:11px;color:var(--text-muted);}'
      + '.audit-form-msg.ok{color:#7fd88f;}'
      + '.audit-form-msg.err{color:var(--risk-coral);}';
    document.head.appendChild(css);
  }

  function init() {
    injectStyles();
    var nav = document.querySelector('.nav-container');
    var content = document.querySelector('.content-area');
    if (!nav || !content) return;

    var btn = document.createElement('button');
    btn.className = 'tab-btn stepper-item';
    btn.setAttribute('data-target', 'view-audit');
    btn.textContent = 'AUDIT TRAIL';
    nav.appendChild(btn);

    var view = buildView();
    content.appendChild(view);

    // app.js's own setupTabs() captured its tab/section querySelectorAll
    // results BEFORE this button and section existed, so its click handlers
    // on the original four tabs can never deactivate view-audit (and vice
    // versa) — each just clears the stale list it closed over. Attach a
    // second, always-freshly-queried handler to every tab button, including
    // the original four, so whichever tab is clicked ends in the correct
    // state regardless of what ran first.
    document.querySelectorAll('.tab-btn').forEach(function (tabBtn) {
      tabBtn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.view-section').forEach(function (s) { s.classList.remove('active'); });
        tabBtn.classList.add('active');
        var target = document.getElementById(tabBtn.getAttribute('data-target'));
        if (target) target.classList.add('active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
