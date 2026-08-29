(function () {
  "use strict";

  var SIGNALS = ["value", "product", "timing", "externality"];
  var NS = "http://www.w3.org/2000/svg";

  function fmtRupees(n) {
    if (typeof n !== "number") return "—";
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
    return "₹" + n.toLocaleString("en-IN");
  }

  function hashId(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  // Deterministic scatter for the "rest of the platform" — same entity
  // always lands in the same spot, placed outside a keep-out disc reserved
  // for the ring's own clean layout.
  function backdropPosition(id, size, keepOutR) {
    var cx = size / 2, cy = size / 2;
    var angle = (hashId(id + "#a") % 3600) / 3600 * Math.PI * 2;
    var t = (hashId(id + "#r") % 1000) / 1000;
    var maxR = size / 2 - 10;
    var r = keepOutR + t * Math.max(maxR - keepOutR, 1);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) el.setAttribute(k, attrs[k]);
    }
    return el;
  }

  function buildRingSVG(ring, backdrop) {
    var n = ring.entities.length;
    var size = 320;
    var cx = size / 2, cy = size / 2;
    var ringR = Math.min(82, 28 + n * 6);
    var nodeR = 16;
    var keepOutR = ringR + nodeR + 12;

    var pos = {};
    ring.entities.forEach(function (id, i) {
      var angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      pos[id] = { x: cx + ringR * Math.cos(angle), y: cy + ringR * Math.sin(angle) };
    });

    var svg = svgEl("svg", {
      viewBox: "0 0 " + size + " " + size,
      width: "100%",
      height: size,
      role: "img",
      "aria-label": ring.ring_id + ", a " + n + "-entity " + ring.closure_type + " ring, shown against a dimmed sample of the wider platform",
    });

    var markerId = "rh-arrow-" + ring.ring_id;
    var defs = svgEl("defs", {});
    var marker = svgEl("marker", {
      id: markerId, viewBox: "0 0 10 10", refX: "8", refY: "5",
      markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse",
    });
    marker.appendChild(svgEl("path", {
      d: "M2 1L8 5L2 9", fill: "none", stroke: "currentColor", "stroke-width": "1.5",
    }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    // --- dimmed backdrop: the rest of the platform, for scale ---
    var backdropGroup = svgEl("g", { class: "backdrop" });
    if (backdrop && backdrop.nodes && backdrop.nodes.length) {
      var ringIds = {};
      ring.entities.forEach(function (id) { ringIds[id] = true; });
      var bpos = {};
      backdrop.nodes.forEach(function (node) {
        if (ringIds[node.id]) return;
        bpos[node.id] = backdropPosition(node.id, size, keepOutR);
      });
      var edgeCount = 0;
      (backdrop.edges || []).forEach(function (edge) {
        if (edgeCount >= 60) return;
        var a = bpos[edge.from], b = bpos[edge.to];
        if (!a || !b) return;
        edgeCount++;
        backdropGroup.appendChild(svgEl("line", {
          x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "backdrop-edge",
        }));
      });
      Object.keys(bpos).forEach(function (id) {
        backdropGroup.appendChild(svgEl("circle", {
          cx: bpos[id].x, cy: bpos[id].y, r: 2.25, class: "backdrop-node",
        }));
      });
    }
    svg.appendChild(backdropGroup);

    // --- the ring itself, full fidelity ---
    (ring.hops || []).forEach(function (hop) {
      var a = pos[hop.from], b = pos[hop.to];
      if (!a || !b) return;
      var dx = b.x - a.x, dy = b.y - a.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      var trim = nodeR + 4;

      var line = svgEl("line", {
        x1: a.x + ux * trim, y1: a.y + uy * trim,
        x2: b.x - ux * trim, y2: b.y - uy * trim,
        "marker-end": "url(#" + markerId + ")",
      });

      if (hop.hop_type === "corporate_bridge") {
        line.setAttribute("class", "hop-bridge");
        var ev = hop.bridge_evidence || {};
        var parts = Object.keys(ev).map(function (k) { return k + ": " + ev[k]; });
        var title = svgEl("title", {});
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
      var g = svgEl("g", { class: "node" });
      g.appendChild(svgEl("circle", { cx: p.x, cy: p.y, r: nodeR }));
      var text = svgEl("text", {
        x: p.x, y: p.y, "text-anchor": "middle", "dominant-baseline": "central",
      });
      text.textContent = id;
      g.appendChild(text);
      svg.appendChild(g);
    });

    return svg;
  }

  function scoreRow(signal, score, abstained, evidence) {
    var isNumber = typeof score === "number" && !isNaN(score);
    var display = abstained || !isNumber;

    var row = document.createElement("div");
    row.className = "score-row" + (display ? " abstained" : "");

    var label = document.createElement("span");
    label.className = "score-label";
    label.textContent = signal;

    var track = document.createElement("div");
    track.className = "score-track";
    var fill = document.createElement("div");
    fill.className = "score-fill";
    fill.style.setProperty("--fill", (display ? 0 : Math.round(score * 100)) + "%");
    track.appendChild(fill);

    var val = document.createElement("span");
    val.className = "score-val";
    val.textContent = display ? (abstained ? "abstained" : "—") : score.toFixed(2);

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

  function buildCard(ring, rank, backdrop) {
    var card = document.createElement("article");
    card.className = "ring-card";
    card.style.setProperty("--stagger", rank);

    var head = document.createElement("div");
    head.className = "ring-head";

    var idEl = document.createElement("span");
    idEl.className = "ring-id";
    idEl.textContent = ring.ring_id;

    var badge = document.createElement("span");
    badge.className = "ring-badge " + ring.closure_type;
    badge.innerHTML = '<i class="dot" aria-hidden="true"></i>';
    badge.appendChild(document.createTextNode(ring.closure_type));

    var spacer = document.createElement("span");
    spacer.className = "ring-spacer";

    var lossWrap = document.createElement("span");
    lossWrap.className = "ring-loss-wrap";
    var lossLabel = document.createElement("span");
    lossLabel.className = "ring-loss-label";
    lossLabel.textContent = "expected loss";
    var loss = document.createElement("span");
    loss.className = "ring-loss";
    loss.textContent = fmtRupees(ring.expected_loss);
    lossWrap.appendChild(lossLabel);
    lossWrap.appendChild(loss);

    var agg = document.createElement("span");
    agg.className = "ring-agg";
    agg.title = "aggregate score";
    agg.textContent = "agg " + (typeof ring.aggregate === "number" ? ring.aggregate.toFixed(2) : "—");

    head.appendChild(idEl);
    head.appendChild(badge);
    head.appendChild(spacer);
    head.appendChild(lossWrap);
    head.appendChild(agg);
    card.appendChild(head);

    var body = document.createElement("div");
    body.className = "ring-body";

    var rankTag = document.createElement("span");
    rankTag.className = "ring-rank";
    rankTag.textContent = "#" + rank;
    rankTag.setAttribute("aria-hidden", "true");
    body.appendChild(rankTag);

    var graphWrap = document.createElement("div");
    graphWrap.className = "ring-graph";
    graphWrap.appendChild(buildRingSVG(ring, backdrop));
    var caption = document.createElement("p");
    caption.className = "graph-caption";
    caption.textContent = ring.entities.length + " entities in the ring, dimmed against the wider platform";
    graphWrap.appendChild(caption);
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

  function buildStatsBar(rings) {
    var bar = document.createElement("div");
    bar.className = "stats-bar";

    var totalLoss = rings.reduce(function (sum, r) {
      return sum + (typeof r.expected_loss === "number" ? r.expected_loss : 0);
    }, 0);
    var aggs = rings.filter(function (r) { return typeof r.aggregate === "number"; });
    var avgAgg = aggs.length ? aggs.reduce(function (s, r) { return s + r.aggregate; }, 0) / aggs.length : null;
    var corporate = rings.filter(function (r) { return r.closure_type === "corporate"; }).length;

    var stats = [
      { label: "rings flagged", value: String(rings.length) },
      { label: "total expected loss", value: fmtRupees(totalLoss) },
      { label: "corporate-closed", value: corporate + " / " + rings.length },
      { label: "avg aggregate", value: avgAgg === null ? "—" : avgAgg.toFixed(2) },
    ];

    stats.forEach(function (s) {
      var stat = document.createElement("div");
      stat.className = "stat";
      var val = document.createElement("span");
      val.className = "stat-val";
      val.textContent = s.value;
      var label = document.createElement("span");
      label.className = "stat-label";
      label.textContent = s.label;
      stat.appendChild(val);
      stat.appendChild(label);
      bar.appendChild(stat);
    });

    return bar;
  }

  function render() {
    var statsRoot = document.getElementById("stats");
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
      return (b.expected_loss || 0) - (a.expected_loss || 0);
    });

    if (statsRoot) statsRoot.appendChild(buildStatsBar(rings));

    var backdrop = typeof BACKDROP !== "undefined" ? BACKDROP : null;
    rings.forEach(function (ring, i) {
      root.appendChild(buildCard(ring, i + 1, backdrop));
    });
  }

  render();
})();
