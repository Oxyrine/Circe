(function () {
  "use strict";

  var SIGNALS = ["value", "product", "timing", "externality"];

  function fmtRupees(n) {
    return "₹" + (n / 10000000).toFixed(2) + "cr";
  }

  function buildRingSVG(ring) {
    var ns = "http://www.w3.org/2000/svg";
    var n = ring.entities.length;
    var size = 240;
    var cx = size / 2, cy = size / 2;
    var r = Math.min(90, 34 + n * 7);
    var nodeR = 17;

    var pos = {};
    ring.entities.forEach(function (id, i) {
      var angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      pos[id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", size);

    var markerId = "rh-arrow-" + ring.ring_id;
    var defs = document.createElementNS(ns, "defs");
    var marker = document.createElementNS(ns, "marker");
    marker.setAttribute("id", markerId);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");
    var markerPath = document.createElementNS(ns, "path");
    markerPath.setAttribute("d", "M2 1L8 5L2 9");
    markerPath.setAttribute("fill", "none");
    markerPath.setAttribute("stroke", "currentColor");
    markerPath.setAttribute("stroke-width", "1.5");
    marker.appendChild(markerPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    (ring.hops || []).forEach(function (hop) {
      var a = pos[hop.from], b = pos[hop.to];
      if (!a || !b) return;
      var dx = b.x - a.x, dy = b.y - a.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      var trim = nodeR + 4;

      var line = document.createElementNS(ns, "line");
      line.setAttribute("x1", a.x + ux * trim);
      line.setAttribute("y1", a.y + uy * trim);
      line.setAttribute("x2", b.x - ux * trim);
      line.setAttribute("y2", b.y - uy * trim);
      line.setAttribute("marker-end", "url(#" + markerId + ")");

      if (hop.hop_type === "corporate_bridge") {
        line.setAttribute("class", "hop-bridge");
        var ev = hop.bridge_evidence || {};
        var parts = Object.keys(ev).map(function (k) { return k + ": " + ev[k]; });
        var title = document.createElementNS(ns, "title");
        title.textContent = (hop.bridge_kind || "corporate bridge") +
          (parts.length ? " (" + parts.join(", ") + ")" : "");
        line.appendChild(title);
      } else {
        line.setAttribute("class", "hop-invoice");
      }
      svg.appendChild(line);
    });

    ring.entities.forEach(function (id) {
      var p = pos[id];
      var g = document.createElementNS(ns, "g");
      g.setAttribute("class", "node");
      var circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", p.x);
      circle.setAttribute("cy", p.y);
      circle.setAttribute("r", nodeR);
      var text = document.createElementNS(ns, "text");
      text.setAttribute("x", p.x);
      text.setAttribute("y", p.y);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "central");
      text.textContent = id;
      g.appendChild(circle);
      g.appendChild(text);
      svg.appendChild(g);
    });

    return svg;
  }

  function scoreRow(signal, score, abstained, evidence) {
    var row = document.createElement("div");
    row.className = "score-row" + (abstained ? " abstained" : "");

    var label = document.createElement("span");
    label.className = "score-label";
    label.textContent = signal;

    var track = document.createElement("div");
    track.className = "score-track";
    var fill = document.createElement("div");
    fill.className = "score-fill";
    fill.style.width = (abstained ? 0 : Math.round(score * 100)) + "%";
    track.appendChild(fill);

    var val = document.createElement("span");
    val.className = "score-val";
    val.textContent = abstained ? "abstained" : score.toFixed(2);

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(val);

    if (evidence) {
      var reason = document.createElement("p");
      reason.className = "score-reason";
      reason.textContent = evidence;
      row.appendChild(reason);
    }
    return row;
  }

  function buildCard(ring) {
    var card = document.createElement("article");
    card.className = "ring-card";

    var head = document.createElement("div");
    head.className = "ring-head";

    var idEl = document.createElement("span");
    idEl.className = "ring-id";
    idEl.textContent = ring.ring_id;

    var badge = document.createElement("span");
    badge.className = "ring-badge " + ring.closure_type;
    badge.textContent = ring.closure_type;

    var loss = document.createElement("span");
    loss.className = "ring-loss";
    loss.textContent = fmtRupees(ring.expected_loss);

    var agg = document.createElement("span");
    agg.className = "ring-agg";
    agg.textContent = "agg " + ring.aggregate.toFixed(2);

    head.appendChild(idEl);
    head.appendChild(badge);
    head.appendChild(loss);
    head.appendChild(agg);
    card.appendChild(head);

    var body = document.createElement("div");
    body.className = "ring-body";

    var graphWrap = document.createElement("div");
    graphWrap.className = "ring-graph";
    graphWrap.appendChild(buildRingSVG(ring));
    body.appendChild(graphWrap);

    var scores = document.createElement("div");
    scores.className = "ring-scores";
    var abstainedList = ring.abstained || [];
    SIGNALS.forEach(function (sig) {
      var isAbstained = abstainedList.indexOf(sig) !== -1;
      var score = ring.scores ? ring.scores[sig] : null;
      var evidence = ring.evidence ? ring.evidence[sig] : "";
      scores.appendChild(scoreRow(sig, score, isAbstained, evidence));
    });
    if (ring.evidence && ring.evidence.industry) {
      var note = document.createElement("p");
      note.className = "industry-note";
      note.textContent = ring.evidence.industry;
      scores.appendChild(note);
    }
    body.appendChild(scores);

    card.appendChild(body);
    return card;
  }

  function render() {
    var root = document.getElementById("queue");
    if (!root) return;
    if (typeof SCORED === "undefined" || !SCORED.rings || !SCORED.rings.length) {
      var note = document.createElement("p");
      note.className = "empty-note";
      note.textContent = "No scored rings loaded — run build_data.py against a scored_rings artifact.";
      root.appendChild(note);
      return;
    }
    var rings = SCORED.rings.slice().sort(function (a, b) {
      return b.expected_loss - a.expected_loss;
    });
    rings.forEach(function (ring) {
      root.appendChild(buildCard(ring));
    });
  }

  render();
})();
