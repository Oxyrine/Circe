(function () {
  "use strict";

  var SIGNALS = ["value", "product", "timing", "externality"];

// --- PHASE 6 ADDITIONS ---
window.INVESTIGATOR_INVOICES = {};
try {
  var stored = localStorage.getItem('ouroboros_investigator_invoices');
  if (stored) {
    window.INVESTIGATOR_INVOICES = JSON.parse(stored);
  }
} catch(e) {}

function getAllInvoices() {
  return Object.assign({}, typeof INVOICES !== "undefined" ? INVOICES : {}, window.INVESTIGATOR_INVOICES);
}

document.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("add-invoice-btn");
  if (btn) btn.onclick = function() {
    document.getElementById("add-inv-error").style.display = "none";
    document.getElementById("add-inv-id").value = "";
    document.getElementById("add-inv-seller").value = "";
    document.getElementById("add-inv-buyer").value = "";
    document.getElementById("add-inv-val").value = "";
    document.getElementById("add-inv-date").value = "";
    document.getElementById("add-inv-hs").value = "";
    document.getElementById("add-inv-discounting").value = "";
    document.getElementById("add-invoice-modal").classList.remove("hidden");
  };

  var clearBtn = document.getElementById("clear-investigator-btn");
  if (clearBtn) {
    if (Object.keys(window.INVESTIGATOR_INVOICES).length > 0) clearBtn.style.display = "inline-block";
    clearBtn.onclick = function() {
      if (confirm("Are you sure you want to clear all investigator-added data?")) {
        localStorage.removeItem("ouroboros_investigator_invoices");
        window.INVESTIGATOR_INVOICES = {};
        clearBtn.style.display = "none";
        if (typeof renderLedger === "function") renderLedger();
      }
    };
  }
});

window.submitAddInvoice = function() {
  var err = document.getElementById("add-inv-error");
  err.style.display = "none";

  var id = document.getElementById("add-inv-id").value.trim();
  var seller = document.getElementById("add-inv-seller").value.trim();
  var buyer = document.getElementById("add-inv-buyer").value.trim();
  var val = parseFloat(document.getElementById("add-inv-val").value);
  var date = document.getElementById("add-inv-date").value;
  var hs = document.getElementById("add-inv-hs").value.trim();
  var disc = document.getElementById("add-inv-discounting").value;

  if (!id || !seller || !buyer || isNaN(val) || !date) {
    err.textContent = "Please fill in all required fields.";
    err.style.display = "block";
    return;
  }
  if (typeof INVOICES !== "undefined" && INVOICES[id]) {
    err.textContent = "Duplicate ID: Exists in original dataset.";
    err.style.display = "block";
    return;
  }
  if (window.INVESTIGATOR_INVOICES[id]) {
    err.textContent = "Duplicate ID: Exists in investigator data.";
    err.style.display = "block";
    return;
  }
  if (typeof ENTITIES !== "undefined") {
    if (!ENTITIES[seller]) {
      err.textContent = "Seller ID does not exist in dataset.";
      err.style.display = "block";
      return;
    }
    if (!ENTITIES[buyer]) {
      err.textContent = "Buyer ID does not exist in dataset.";
      err.style.display = "block";
      return;
    }
  }
  if (val < 0) {
    err.textContent = "Value must be >= 0.";
    err.style.display = "block";
    return;
  }

  var inv = {
    invoice_id: id,
    from: seller,
    to: buyer,
    value: val,
    invoice_date: date,
    hs_code: hs || undefined,
    discounting_date: disc || undefined,
    _source: "investigator"
  };

  window.INVESTIGATOR_INVOICES[id] = inv;
  localStorage.setItem("ouroboros_investigator_invoices", JSON.stringify(window.INVESTIGATOR_INVOICES));
  
  document.getElementById("add-invoice-modal").classList.add("hidden");
  
  var clearBtn = document.getElementById("clear-investigator-btn");
  if (clearBtn) clearBtn.style.display = "inline-block";

  if (typeof renderLedger === "function") renderLedger();
  
  // Show the invoice detail immediately
  document.getElementById("entity-modal").classList.add("hidden");
  openInvoiceModal(id);
  document.getElementById("invoice-modal").classList.remove("hidden");
};

window.removeInvestigatorInvoice = function(id) {
  if (confirm("Remove this investigator-added invoice?")) {
    delete window.INVESTIGATOR_INVOICES[id];
    localStorage.setItem("ouroboros_investigator_invoices", JSON.stringify(window.INVESTIGATOR_INVOICES));
    document.getElementById("invoice-modal").classList.add("hidden");
    if (Object.keys(window.INVESTIGATOR_INVOICES).length === 0) {
      var clearBtn = document.getElementById("clear-investigator-btn");
      if (clearBtn) clearBtn.style.display = "none";
    }
    if (typeof renderLedger === "function") renderLedger();
  }
};

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
    var wrapper = document.createElement("div");
    wrapper.className = "graph-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.height = "320px";

    var n = ring.entities.length;
    var size = 320;
    var cx = size / 2, cy = size / 2;
    var ringR = Math.min(82, 28 + n * 6);
    var nodeR = 18; // slightly larger than old 16
    var keepOutR = ringR + nodeR + 12;

    var pos = {};
    ring.entities.forEach(function (id, i) {
      var angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      pos[id] = { x: cx + ringR * Math.cos(angle), y: cy + ringR * Math.sin(angle), idx: i };
    });

    var svg = svgEl("svg", {
      viewBox: "0 0 " + size + " " + size,
      width: "100%",
      height: "100%",
      role: "img",
      class: "ring-graph-svg",
      "aria-label": ring.ring_id + ", a " + n + "-entity " + ring.closure_type + " ring, shown against a dimmed sample of the wider platform",
    });

    var markerId = "rh-arrow-" + ring.ring_id;
    var defs = svgEl("defs", {});
    var marker = svgEl("marker", {
      id: markerId, viewBox: "0 0 10 10", refX: "6", refY: "5",
      markerWidth: "5", markerHeight: "5", orient: "auto-start-reverse",
    });
    marker.appendChild(svgEl("path", {
      d: "M1 1L9 5L1 9", fill: "var(--accent-coral)", stroke: "none",
    }));
    defs.appendChild(marker);
    
    // Drop shadow filter for ring nodes
    var filter = svgEl("filter", { id: "node-shadow-" + ring.ring_id, x: "-20%", y: "-20%", width: "140%", height: "140%" });
    filter.appendChild(svgEl("feDropShadow", { dx: "0", dy: "2", stdDeviation: "3", "flood-color": "#000", "flood-opacity": "0.6" }));
    defs.appendChild(filter);
    
    svg.appendChild(defs);

    // --- dimmed backdrop ---
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
          cx: bpos[id].x, cy: bpos[id].y, r: 2, class: "backdrop-node",
        }));
      });
    }
    svg.appendChild(backdropGroup);

    // --- the ring edges ---
    var edgesGroup = svgEl("g", { class: "ring-edges" });
    var bridgeIdx = ring.hops ? ring.hops.length : 0;
    (ring.hops || []).forEach(function (hop, i) {
      var a = pos[hop.from], b = pos[hop.to];
      if (!a || !b) return;
      var dx = b.x - a.x, dy = b.y - a.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      var trim = nodeR + 5; // leave space for arrow
      var actualLen = len - trim * 2;

      var line = svgEl("line", {
        x1: a.x + ux * trim, y1: a.y + uy * trim,
        x2: b.x - ux * trim, y2: b.y - uy * trim,
      });

      // Pass animation timing vars
      line.style.setProperty("--edge-idx", i);
      line.style.setProperty("--dash-len", actualLen.toFixed(1));

      var title = svgEl("title", {});

      if (hop.hop_type === "corporate_bridge") {
        line.setAttribute("class", "hop-bridge");
        line.style.setProperty("--edge-idx", bridgeIdx); // Animate last
        var ev = hop.bridge_evidence || {};
        var parts = Object.keys(ev).map(function (k) { return k + ": " + ev[k]; });
        title.textContent = "CORPORATE BRIDGE" + (parts.length ? " (" + parts.join(", ") + ")" : "");
      } else {
        line.setAttribute("class", "hop-invoice");
        line.setAttribute("marker-end", "url(#" + markerId + ")");
        title.textContent = "INVOICE: ₹" + ((hop.value||0)/10000000).toFixed(2) + " Cr";
      }
      line.appendChild(title);
      edgesGroup.appendChild(line);
    });
    svg.appendChild(edgesGroup);

    // --- the ring nodes ---
    var nodesGroup = svgEl("g", { class: "ring-nodes" });
    ring.entities.forEach(function (id, i) {
      var p = pos[id];
      var g = svgEl("g", { 
        class: "ring-node clickable", 
        onclick: "window.openEntity('" + id + "')",
        "data-id": id
      });
      g.style.setProperty("--node-idx", i);
      
      var c = svgEl("circle", { 
        cx: p.x, cy: p.y, r: nodeR, 
        class: "node-circle",
        filter: "url(#node-shadow-" + ring.ring_id + ")"
      });
      g.appendChild(c);
      
      var text = svgEl("text", {
        x: p.x, y: p.y, 
        "text-anchor": "middle", 
        "dominant-baseline": "central",
        class: "node-label mono"
      });
      text.textContent = id;
      g.appendChild(text);
      
      // Node interaction handling
      g.addEventListener("mouseenter", function() {
        wrapper.classList.add("hover-active");
        g.classList.add("hovered");
        
        // Highlight connected edges
        var edges = edgesGroup.childNodes;
        for (var j = 0; j < edges.length; j++) {
          var e = edges[j];
          var title = e.querySelector("title");
          if (!title) continue;
          var tStr = title.textContent;
          // In a real impl we'd use data attributes for connections, but this is simple enough
          // We can check if hop.from or hop.to match this id by traversing ring.hops
        }
        
        // We'll actually do this more cleanly by adding data-from and data-to to edges
      });
      
      g.addEventListener("mouseleave", function() {
        wrapper.classList.remove("hover-active");
        g.classList.remove("hovered");
      });
      
      nodesGroup.appendChild(g);
    });
    svg.appendChild(nodesGroup);

    wrapper.appendChild(svg);
    
    // Add legend
    var legend = document.createElement("div");
    legend.className = "graph-legend mono";
    legend.innerHTML = `
      <div class="gl-item"><span class="gl-node"></span> ENTITY</div>
      <div class="gl-item"><span class="gl-edge inv"></span> TRANSACTION</div>
      <div class="gl-item"><span class="gl-edge corp"></span> BRIDGE</div>
      <div class="gl-item"><span class="gl-back"></span> BACKDROP</div>
    `;
    wrapper.appendChild(legend);

    // After we attach edges, let's add data attributes so CSS can highlight connections
    (ring.hops || []).forEach(function (hop, i) {
       var line = edgesGroup.childNodes[i];
       if (line) {
         line.setAttribute("data-from", hop.from);
         line.setAttribute("data-to", hop.to);
       }
    });

    // Add mouseenter/leave to wrapper to manage dimming using pure CSS
    wrapper.addEventListener("mouseover", function(e) {
      var target = e.target;
      var g = target.closest(".ring-node");
      if (g) {
        var id = g.getAttribute("data-id");
        var edges = edgesGroup.querySelectorAll("line");
        edges.forEach(function(edge) {
          if (edge.getAttribute("data-from") === id || edge.getAttribute("data-to") === id) {
            edge.classList.add("edge-connected");
          } else {
            edge.classList.add("edge-dimmed");
          }
        });
        var nodes = nodesGroup.querySelectorAll(".ring-node");
        nodes.forEach(function(node) {
          if (node !== g) node.classList.add("node-dimmed");
        });
      }
    });
    
    wrapper.addEventListener("mouseout", function(e) {
      var target = e.target;
      var g = target.closest(".ring-node");
      if (g) {
        var edges = edgesGroup.querySelectorAll("line");
        edges.forEach(function(edge) {
          edge.classList.remove("edge-connected");
          edge.classList.remove("edge-dimmed");
        });
        var nodes = nodesGroup.querySelectorAll(".ring-node");
        nodes.forEach(function(node) {
          node.classList.remove("node-dimmed");
        });
      }
    });

    return wrapper;
  }

  function scoreRow(sig, score, isAbstained, evidence) {
    var wrapper = document.createElement("div");
    wrapper.className = "score-row";
    if (isAbstained) {
      wrapper.innerHTML = "<div class='sig-name'>" + sig.toUpperCase() + "</div><div class='sig-bar-wrap mono'>N/A</div><div class='sig-val mono'>-</div>";
      return wrapper;
    }
    var fullBlocks = Math.round((score || 0) * 10);
    var bar = "";
    for (var i = 0; i < 10; i++) {
      bar += (i < fullBlocks) ? "█" : "░";
    }
    var valClass = (score > 0.8) ? "sig-val risk mono" : "sig-val mono";
    wrapper.innerHTML = "<div class='sig-name'>" + sig.toUpperCase() + "</div>" +
                        "<div class='sig-bar-wrap mono'>" + bar + "</div>" +
                        "<div class='" + valClass + "'>" + score.toFixed(2) + "</div>";
    
    if (evidence) {
      var evDiv = document.createElement("div");
      evDiv.style.gridColumn = "1 / -1";
      evDiv.style.fontSize = "9px";
      evDiv.style.color = "var(--text-muted)";
      evDiv.style.marginTop = "-8px";
      evDiv.style.marginBottom = "4px";
      evDiv.textContent = evidence;
      wrapper.appendChild(evDiv);
    }
    return wrapper;
  }

  function buildCard(ring, rank, backdrop) {
    var card = document.createElement("div");
    card.className = "ring-card";
    card.id = ring.ring_id;
    
    var expLoss = (typeof ring.expected_loss === "number" ? ring.expected_loss : (ring.expected_loss_inr || 0));
    var expLossCr = expLoss / 10000000;
    
    card.innerHTML = "<div class='ring-header'>" +
      "<div class='rh-title'>" +
        "<span class='rh-rank'>#" + (rank<10?"0"+rank:rank) + "</span>" +
        "<span class='rh-id'>" + ring.ring_id + "</span>" +
        "<span class='rh-type'>" + ring.closure_type.toUpperCase() + " CLOSED</span>" +
      "</div>" +
      "<div class='rh-metrics'>" +
        "<div class='metric-group'>" +
          "<span class='metric-label'>Expected Loss</span>" +
          "<span class='metric-val risk mono'>₹" + expLossCr.toFixed(2) + " Cr</span>" +
        "</div>" +
        "<div class='metric-group'>" +
          "<span class='metric-label'>Aggregate</span>" +
          "<span class='metric-val mono'>" + (ring.aggregate || ring.aggregate_score || 0).toFixed(2) + "</span>" +
        "</div>" +
      "</div>" +
    "</div>";
    
    var body = document.createElement("div");
    body.className = "ring-body";
    
    var vizWrap = document.createElement("div");
    vizWrap.className = "ring-viz";
    vizWrap.appendChild(buildRingSVG(ring, backdrop));
    body.appendChild(vizWrap);
    
    var scores = document.createElement("div");
    scores.className = "ring-scores";
    
    var sTitle = document.createElement("div");
    sTitle.className = "entity-section-title";
    sTitle.style.marginTop = "0";
    sTitle.textContent = "MODEL SCORES";
    scores.appendChild(sTitle);
    
    var sigs = ["value", "product", "timing", "externality"];
    var abstainedList = ring.abstained || [];
    sigs.forEach(function(sig) {
      var isAbstained = abstainedList.indexOf(sig) !== -1;
      var score = ring.scores ? ring.scores[sig] : null;
      var evidence = ring.evidence ? ring.evidence[sig] : "";
      scores.appendChild(scoreRow(sig, score, isAbstained, evidence));
    });
    
    if (ring.evidence && ring.evidence.industry) {
      var note = document.createElement("p");
      note.className = "industry-note mono";
      note.textContent = "INDUSTRY: " + ring.evidence.industry.toUpperCase();
      scores.appendChild(note);
    }
    body.appendChild(scores);
    card.appendChild(body);
    
    var contextStrip = document.createElement("div");
    contextStrip.className = "trail-header";
    contextStrip.style.margin = "0";
    contextStrip.style.borderTop = "0";
    contextStrip.style.borderRadius = "0";
    contextStrip.style.backgroundColor = "var(--bg-panel)";
    
    var invoiceCount = 0;
    var totalValue = 0;
    (ring.hops || []).forEach(function(h) {
      if (h.hop_type === "invoice") {
        invoiceCount++;
        totalValue += (h.value || 0);
      }
    });
    
    var h1 = "<div class='trail-stat-group'>";
    h1 += "<div class='trail-stat'><span class='ts-label'>ENTITIES</span><span class='ts-val mono'>" + (ring.entities || []).length + "</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>INVOICES</span><span class='ts-val mono'>" + invoiceCount + "</span></div>";
    if (invoiceCount > 0) {
      h1 += "<div class='trail-stat'><span class='ts-label'>OBSERVED VALUE</span><span class='ts-val mono'>₹" + (totalValue/10000000).toFixed(2) + " Cr</span></div>";
    }
    h1 += "</div>";
    contextStrip.innerHTML = h1;
    card.appendChild(contextStrip);
    
    var actionsWrap = document.createElement("div");
    actionsWrap.className = "trail-btn-wrap";
    actionsWrap.style.padding = "16px";
    actionsWrap.style.borderTop = "1px solid var(--border-muted)";
    
    var trailBtn = document.createElement("button");
    trailBtn.className = "btn";
    trailBtn.textContent = "VIEW TRANSACTION TRAIL";
    actionsWrap.appendChild(trailBtn);
    
    var timelineBtn = document.createElement("button");
    timelineBtn.className = "btn";
    timelineBtn.textContent = "VIEW INVESTIGATION TIMELINE";
    actionsWrap.appendChild(timelineBtn);
    
    card.appendChild(actionsWrap);
    
    var trailContainer = document.createElement("div");
    trailContainer.className = "trail-container hidden";
    trailContainer.style.padding = "0 16px 16px 16px";
    card.appendChild(trailContainer);
    
    var timelineContainer = document.createElement("div");
    timelineContainer.className = "timeline-container hidden";
    timelineContainer.style.padding = "0 16px 16px 16px";
    card.appendChild(timelineContainer);
    
    trailBtn.addEventListener("click", function() {
      if (trailContainer.classList.contains("hidden")) {
        if (!trailContainer.hasChildNodes()) {
          trailContainer.appendChild(buildTransactionTrail(ring));
        }
        trailContainer.classList.remove("hidden");
        trailBtn.textContent = "HIDE TRANSACTION TRAIL";
        trailBtn.style.backgroundColor = "var(--bg-panel-hover)";
        timelineContainer.classList.add("hidden");
        timelineBtn.textContent = "VIEW INVESTIGATION TIMELINE";
        timelineBtn.style.backgroundColor = "";
      } else {
        trailContainer.classList.add("hidden");
        trailBtn.textContent = "VIEW TRANSACTION TRAIL";
        trailBtn.style.backgroundColor = "";
      }
    });
    
    timelineBtn.addEventListener("click", function() {
      if (timelineContainer.classList.contains("hidden")) {
        if (!timelineContainer.hasChildNodes()) {
          timelineContainer.appendChild(buildInvestigationTimeline(ring));
        }
        timelineContainer.classList.remove("hidden");
        timelineBtn.textContent = "HIDE INVESTIGATION TIMELINE";
        timelineBtn.style.backgroundColor = "var(--bg-panel-hover)";
        trailContainer.classList.add("hidden");
        trailBtn.textContent = "VIEW TRANSACTION TRAIL";
        trailBtn.style.backgroundColor = "";
      } else {
        timelineContainer.classList.add("hidden");
        timelineBtn.textContent = "VIEW INVESTIGATION TIMELINE";
        timelineBtn.style.backgroundColor = "";
      }
    });
    
    return card;
  }

  function buildStatsBar(rings) {
    var count = rings.length;
    var totalLoss = rings.reduce(function(sum, r) { return sum + (typeof r.expected_loss === "number" ? r.expected_loss : (r.expected_loss_inr||0)); }, 0);
    var crCount = totalLoss / 10000000;
    var corpCount = rings.filter(function (r) { return r.closure_type === "corporate"; }).length;
    var transCount = rings.filter(function (r) { return r.closure_type === "transaction"; }).length;
    var aggs = rings.filter(function (r) { return typeof r.aggregate === "number" || typeof r.aggregate_score === "number"; });
    var avgAgg = aggs.length ? aggs.reduce(function (s, r) { return s + (r.aggregate || r.aggregate_score || 0); }, 0) / aggs.length : 0;
    
    var s = "<div style='display:flex; gap:24px;'>";
    s += "<div class='metric-group'><span class='metric-label'>FLAGGED</span> <span class='metric-val mono' style='color:var(--accent-teal)'>" + count + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>EXPECTED LOSS</span> <span class='metric-val risk mono'>₹" + crCount.toFixed(2) + " Cr</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>CORPORATE CLOSED</span> <span class='metric-val mono'>" + corpCount + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>TRANSACTION CLOSED</span> <span class='metric-val mono'>" + transCount + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>AVG AGGREGATE</span> <span class='metric-val mono'>" + avgAgg.toFixed(2) + "</span></div>";
    s += "</div>";
    
    var div = document.createElement("div");
    div.innerHTML = s;
    return div;
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

  // --- PHASE 5 ADDITIONS ---
  function buildInvestigationTimeline(ring) {
    var wrapper = document.createElement("div");
    wrapper.className = "trail-content timeline-mode";

    var invoiceHops = [];
    var corpBridges = [];

    (ring.hops || []).forEach(function(h) {
      if (h.hop_type === "invoice") {
        var inv = typeof INVOICES !== "undefined" ? INVOICES[h.invoice_id] : null;
        if (inv) {
          invoiceHops.push({
            hop: h,
            inv: inv,
            date: inv.invoice_date ? new Date(inv.invoice_date) : null,
            dateStr: inv.invoice_date || "Not available"
          });
        }
      } else if (h.hop_type === "corporate_bridge") {
        corpBridges.push(h);
      }
    });

    invoiceHops.sort(function(a, b) {
      if (a.date && b.date) {
        if (a.date.getTime() !== b.date.getTime()) {
          return a.date.getTime() - b.date.getTime();
        }
      }
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return a.inv.invoice_id.localeCompare(b.inv.invoice_id);
    });

    var totalVal = 0, minVal = Infinity, maxVal = -Infinity;
    var dates = [];
    var gaps = [];
    var hsCounts = {};
    var discountCount = 0;
    var discountDates = [];

    invoiceHops.forEach(function(item, idx) {
      var val = item.inv.value || 0;
      totalVal += val;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
      if (item.date) dates.push(item.date);
      
      var hs = item.inv.hs_code;
      if (hs) {
        hsCounts[hs] = (hsCounts[hs] || 0) + 1;
      }

      if (item.inv.discounting_date) {
        discountCount++;
        discountDates.push(new Date(item.inv.discounting_date));
      }

      if (idx > 0 && invoiceHops[idx-1].date && item.date) {
        var diffTime = Math.abs(item.date - invoiceHops[idx-1].date);
        var diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        gaps.push(diffDays);
        item.gapDays = diffDays;
      }
    });

    if (minVal === Infinity) { minVal = 0; maxVal = 0; }

    var medianGap = "Not available";
    if (gaps.length > 0) {
      gaps.sort(function(a,b){return a-b;});
      var mid = Math.floor(gaps.length / 2);
      medianGap = (gaps.length % 2 !== 0) ? gaps[mid] : ((gaps[mid - 1] + gaps[mid]) / 2);
      medianGap = medianGap + " days";
    }

    var commonHs = "Not available";
    var maxHsCount = 0;
    for (var k in hsCounts) {
      if (hsCounts[k] > maxHsCount) {
        maxHsCount = hsCounts[k];
        commonHs = k;
      }
    }

    var dateRange = "Not available";
    if (dates.length > 0) {
      dates.sort(function(a,b){return a-b;});
      dateRange = dates[0].toISOString().split('T')[0] + " → " + dates[dates.length-1].toISOString().split('T')[0];
    }

    var discountRange = "Not available";
    if (discountDates.length > 0) {
      discountDates.sort(function(a,b){return a-b;});
      discountRange = discountDates[0].toISOString().split('T')[0] + " → " + discountDates[discountDates.length-1].toISOString().split('T')[0];
    }

    var valRange = invoiceHops.length > 0 ? "₹" + minVal.toLocaleString() + " — ₹" + maxVal.toLocaleString() : "Not available";
    var avgVal = invoiceHops.length > 0 ? "₹" + Math.round(totalVal / invoiceHops.length).toLocaleString() : "Not available";

    var ctxHtml = "";
    ctxHtml += "<div class='trail-header timeline-ctx'>";
    ctxHtml += "<div class='entity-section-title' style='margin-top:0;'>FINANCIAL CONTEXT PANEL</div>";
    
    ctxHtml += "<div class='trail-stat-group'>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>OBSERVED INVOICE VALUE</span><span class='ts-val mono'>₹" + totalVal.toLocaleString() + "</span></div>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>INVOICES</span><span class='ts-val'>" + invoiceHops.length + "</span></div>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>AVG INVOICE VALUE</span><span class='ts-val mono'>" + avgVal + "</span></div>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>VALUE RANGE</span><span class='ts-val mono'>" + valRange + "</span></div>";
    ctxHtml += "</div>";

    ctxHtml += "<div class='trail-stat-group'>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>OBSERVED DATE RANGE</span><span class='ts-val mono'>" + dateRange + "</span></div>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>MEDIAN INTER-INVOICE GAP</span><span class='ts-val mono'>" + medianGap + "</span></div>";
    ctxHtml += "<div class='trail-stat'><span class='ts-label'>COMMON HS CODE</span><span class='ts-val mono'>" + commonHs + "</span></div>";
    ctxHtml += "</div>";

    if (discountCount > 0) {
      ctxHtml += "<div class='trail-stat-group'>";
      ctxHtml += "<div class='trail-stat'><span class='ts-label'>DISCOUNTED INVOICES</span><span class='ts-val'>" + discountCount + "</span></div>";
      ctxHtml += "<div class='trail-stat'><span class='ts-label'>DISCOUNTING DATE RANGE</span><span class='ts-val mono'>" + discountRange + "</span></div>";
      ctxHtml += "</div>";
    }

    ctxHtml += "<div class='entity-section-title'>OBSERVED PATTERN</div>";
    ctxHtml += "<ul class='pattern-list'>";
    ctxHtml += "<li>" + invoiceHops.length + " invoices observed.</li>";
    if (gaps.length > 0) ctxHtml += "<li>Median gap between invoices: " + medianGap + ".</li>";
    if (maxHsCount > 0) ctxHtml += "<li>Same HS code observed across " + maxHsCount + "/" + invoiceHops.length + " invoices.</li>";
    if (maxVal > 0 && minVal > 0) {
      var variation = ((maxVal - minVal) / minVal * 100).toFixed(1);
      ctxHtml += "<li>Observed value variation: " + variation + "%.</li>";
    }
    ctxHtml += "</ul>";
    ctxHtml += "</div>";

    var headerEl = document.createElement("div");
    headerEl.innerHTML = ctxHtml;
    wrapper.appendChild(headerEl);

    var list = document.createElement("div");
    list.className = "trail-list timeline-list";
    
    if (invoiceHops.length > 0) {
      var tTitle = document.createElement("div");
      tTitle.className = "entity-section-title";
      tTitle.textContent = "TRANSACTION TIMELINE";
      list.appendChild(tTitle);
    }

    invoiceHops.forEach(function(item, idx) {
      if (item.gapDays !== undefined) {
        var gapEl = document.createElement("div");
        gapEl.className = "timeline-gap";
        gapEl.innerHTML = "↓<br>" + item.gapDays + " DAYS<br>↓";
        list.appendChild(gapEl);
      }

      var h = item.hop;
      var inv = item.inv;
      var sE = typeof ENTITIES !== "undefined" ? ENTITIES[h.from] : null;
      var bE = typeof ENTITIES !== "undefined" ? ENTITIES[h.to] : null;
      var sName = sE ? sE.name : "Entity information unavailable";
      var bName = bE ? bE.name : "Entity information unavailable";
      
      var inner = "";
      inner += "<div class='ti-date'>" + item.dateStr + "</div>";
      inner += "<div class='ti-badge'>INVOICE <span class='mono'>" + inv.invoice_id + "</span></div>";
      inner += "<div class='ti-flow'>";
      inner += "  <div class='ti-party seller clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.from + "\")'><span class='mono'>" + h.from + "</span> " + sName + "</div>";
      inner += "  <div class='ti-arrow'>→<br><span class='mono val'>₹" + (inv.value||0).toLocaleString() + "</span><br>→</div>";
      inner += "  <div class='ti-party buyer clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.to + "\")'><span class='mono'>" + h.to + "</span> " + bName + "</div>";
      inner += "</div>";
      
      inner += "<div class='ti-meta'>";
      inner += "  <div><span class='ti-meta-label'>HS</span> <span class='mono'>" + (inv.hs_code || "Not available") + "</span></div>";
      if (inv.discounting_date) {
        inner += "  <div><span class='ti-meta-label'>DISCOUNTING DATE OBSERVED</span> <span class='mono'>" + inv.discounting_date + "</span></div>";
      }
      inner += "</div>";

      var domItem = document.createElement("div");
      domItem.className = "trail-item invoice";
      domItem.onclick = function() { window.openInvoice(h.invoice_id); };
      domItem.innerHTML = inner;
      list.appendChild(domItem);
    });

    if (corpBridges.length > 0) {
      var cTitle = document.createElement("div");
      cTitle.className = "entity-section-title";
      cTitle.style.marginTop = "32px";
      cTitle.textContent = "CORPORATE CLOSURE / RELATIONSHIP";
      list.appendChild(cTitle);

      corpBridges.forEach(function(h) {
        var sE = typeof ENTITIES !== "undefined" ? ENTITIES[h.from] : null;
        var bE = typeof ENTITIES !== "undefined" ? ENTITIES[h.to] : null;
        var sName = sE ? sE.name : "Entity information unavailable";
        var bName = bE ? bE.name : "Entity information unavailable";
        var bKind = h.bridge_kind || "Unknown bridge";
        var bEv = "";
        if (h.bridge_evidence) {
          if (h.bridge_kind === "shared_director" && h.bridge_evidence.director_id) {
            bEv = h.bridge_evidence.director_id;
          } else if (h.bridge_kind === "shared_address" && h.bridge_evidence.address) {
            bEv = h.bridge_evidence.address;
          } else {
            var parts = [];
            for (var k in h.bridge_evidence) {
              parts.push(k.replace(/_/g, " ") + ": " + h.bridge_evidence[k]);
            }
            bEv = parts.join(" | ");
          }
        }

        var inner = "";
        inner += "<div class='ti-badge corp'>CORPORATE CLOSURE</div>";
        inner += "<div class='ti-flow corp'>";
        inner += "  <div class='ti-party clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.from + "\")'><span class='mono'>" + h.from + "</span> " + sName + "</div>";
        inner += "  <div class='ti-arrow corp'>- - -</div>";
        inner += "  <div class='ti-party clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.to + "\")'><span class='mono'>" + h.to + "</span> " + bName + "</div>";
        inner += "</div>";
        inner += "<div class='ti-meta corp'>";
        inner += "  <div><span class='ti-meta-label'>" + bKind.replace(/_/g, ' ') + "</span> <span class='mono'>" + bEv + "</span></div>";
        inner += "</div>";

        var domItem = document.createElement("div");
        domItem.className = "trail-item corporate_bridge";
        domItem.innerHTML = inner;
        list.appendChild(domItem);
      });
    }

    wrapper.appendChild(list);
    return wrapper;
  }


  // --- PHASE 3 ADDITIONS ---
  function buildTransactionTrail(ring) {
    // Phase 6 Check
    var overlapInvoices = [];
    if (window.INVESTIGATOR_INVOICES) {
      var rEnt = {};
      ring.entities.forEach(function(e) { rEnt[e] = true; });
      Object.values(window.INVESTIGATOR_INVOICES).forEach(function(inv) {
        if (rEnt[inv.from] && rEnt[inv.to]) {
          overlapInvoices.push(inv);
        }
      });
    }

    var wrapper = document.createElement("div");
    wrapper.className = "trail-content";

    var invoiceCount = 0;
    var bridgeCount = 0;
    var totalValue = 0;
    (ring.hops || []).forEach(function(h) {
      if (h.hop_type === "invoice") {
        invoiceCount++;
        totalValue += (h.value || 0);
      } else if (h.hop_type === "corporate_bridge") {
        bridgeCount++;
      }
    });

    var header = document.createElement("div");
    header.className = "trail-header";
    
    var h1 = "<div class='trail-stat-group'>";
    h1 += "<div class='trail-stat'><span class='ts-label'>RING ID</span><span class='ts-val mono'>" + ring.ring_id + "</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>CLOSURE TYPE</span><span class='ts-val'>" + ring.closure_type.toUpperCase() + " CLOSED</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>ENTITIES</span><span class='ts-val'>" + (ring.entities || []).length + "</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>INVOICES</span><span class='ts-val'>" + invoiceCount + "</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>CORP BRIDGES</span><span class='ts-val'>" + bridgeCount + "</span></div>";
    h1 += "</div>";

    var h2 = "<div class='trail-stat-group'>";
    if (invoiceCount > 0) {
      h2 += "<div class='trail-stat'><span class='ts-label'>TOTAL OBSERVED INVOICE VALUE</span><span class='ts-val mono'>₹" + totalValue.toLocaleString() + "</span></div>";
      h2 += "<div class='trail-stat'><span class='ts-label'>AVG INVOICE VALUE</span><span class='ts-val mono'>₹" + Math.round(totalValue / invoiceCount).toLocaleString() + "</span></div>";
    } else {
      h2 += "<div class='trail-stat'><span class='ts-val'>No invoice transactions available.</span></div>";
    }
    h2 += "</div>";

    header.innerHTML = h1 + h2;
    wrapper.appendChild(header);

    var list = document.createElement("div");
    list.className = "trail-list";
    (ring.hops || []).forEach(function(h, idx) {
      var item = document.createElement("div");
      item.className = "trail-item " + h.hop_type;
      
      var inner = "";
      if (h.hop_type === "invoice") {
        var inv = typeof INVOICES !== "undefined" ? INVOICES[h.invoice_id] : null;
        var sE = typeof ENTITIES !== "undefined" ? ENTITIES[h.from] : null;
        var bE = typeof ENTITIES !== "undefined" ? ENTITIES[h.to] : null;
        var sName = sE ? sE.name : "Entity information unavailable";
        var bName = bE ? bE.name : "Entity information unavailable";
        var valStr = inv && inv.value ? "₹" + inv.value.toLocaleString() : (h.value ? "₹" + h.value.toLocaleString() : "Not available");
        var hsStr = inv && inv.hs_code ? inv.hs_code : (h.hs_code || "Not available");
        var dateStr = inv && inv.invoice_date ? inv.invoice_date : (h.invoice_date || "Not available");

        inner += "<div class='ti-badge'>TRANSACTION</div>";
        inner += "<div class='ti-invoice'>INVOICE <span class='mono'>" + h.invoice_id + "</span></div>";
        inner += "<div class='ti-flow'>";
        inner += "  <div class='ti-party seller clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.from + "\")'><span class='mono'>" + h.from + "</span> " + sName + "</div>";
        inner += "  <div class='ti-arrow'>↓<br><span class='mono val'>" + valStr + "</span><br>↓</div>";
        inner += "  <div class='ti-party buyer clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.to + "\")'><span class='mono'>" + h.to + "</span> " + bName + "</div>";
        inner += "</div>";
        inner += "<div class='ti-meta'>";
        inner += "  <div><span class='ti-meta-label'>HS</span> <span class='mono'>" + hsStr + "</span></div>";
        inner += "  <div><span class='ti-meta-label'>DATE</span> <span class='mono'>" + dateStr + "</span></div>";
        if (inv && inv.discounting_date) {
            inner += "  <div><span class='ti-meta-label'>DISCOUNTED</span> <span class='mono'>" + inv.discounting_date + "</span></div>";
        }
        inner += "</div>";
        
        item.onclick = function() { window.openInvoice(h.invoice_id); };
      } else if (h.hop_type === "corporate_bridge") {
        var sE = typeof ENTITIES !== "undefined" ? ENTITIES[h.from] : null;
        var bE = typeof ENTITIES !== "undefined" ? ENTITIES[h.to] : null;
        var sName = sE ? sE.name : "Entity information unavailable";
        var bName = bE ? bE.name : "Entity information unavailable";
        var bKind = h.bridge_kind || "Unknown bridge";
        var bEv = "";
        if (h.bridge_evidence) {
          if (h.bridge_kind === "shared_director" && h.bridge_evidence.director_id) {
            bEv = h.bridge_evidence.director_id;
          } else if (h.bridge_kind === "shared_address" && h.bridge_evidence.address) {
            bEv = h.bridge_evidence.address;
          } else {
            var parts = [];
            for (var k in h.bridge_evidence) {
              parts.push(k.replace(/_/g, " ") + ": " + h.bridge_evidence[k]);
            }
            bEv = parts.join(" | ");
          }
        }

        inner += "<div class='ti-badge corp'>CORPORATE CLOSURE</div>";
        inner += "<div class='ti-flow corp'>";
        inner += "  <div class='ti-party clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.from + "\")'><span class='mono'>" + h.from + "</span> " + sName + "</div>";
        inner += "  <div class='ti-arrow corp'>- - -</div>";
        inner += "  <div class='ti-party clickable' onclick='event.stopPropagation(); window.openEntity(\"" + h.to + "\")'><span class='mono'>" + h.to + "</span> " + bName + "</div>";
        inner += "</div>";
        inner += "<div class='ti-meta corp'>";
        inner += "  <div><span class='ti-meta-label'>" + bKind.replace(/_/g, ' ') + "</span> <span class='mono'>" + bEv + "</span></div>";
        inner += "</div>";
      }
      
      item.innerHTML = inner;
      list.appendChild(item);

      if (idx < ring.hops.length - 1) {
        var connector = document.createElement("div");
        connector.className = "trail-connector";
        connector.innerHTML = "↓";
        list.appendChild(connector);
      }
    });

    wrapper.appendChild(list);

    if (overlapInvoices.length > 0) {
      var overlapList = document.createElement("div");
      overlapList.className = "trail-list timeline-list";
      overlapList.style.marginTop = "32px";
      overlapList.style.borderTop = "2px dashed var(--rule)";
      overlapList.style.paddingTop = "24px";
      
      var cTitle = document.createElement("div");
      cTitle.className = "entity-section-title";
      cTitle.style.marginTop = "0";
      cTitle.textContent = "INVESTIGATOR-ADDED DATA (POTENTIAL STRUCTURAL CONNECTION)";
      overlapList.appendChild(cTitle);

      overlapInvoices.forEach(function(inv) {
        var sE = typeof ENTITIES !== "undefined" ? ENTITIES[inv.from] : null;
        var bE = typeof ENTITIES !== "undefined" ? ENTITIES[inv.to] : null;
        var sName = sE ? sE.name : "Entity information unavailable";
        var bName = bE ? bE.name : "Entity information unavailable";

        var domItem = document.createElement("div");
        domItem.className = "trail-item invoice";
        domItem.onclick = function() { window.openInvoice(inv.invoice_id); };
        
        var inner = "";
        inner += "<div class='ti-badge' style='background:var(--surface-2); border-color:var(--ink-soft);'>INVESTIGATOR ADDED <span class='mono'>" + inv.invoice_id + "</span></div>";
        inner += "<div class='ti-flow'>";
        inner += "  <div class='ti-party seller clickable' onclick='event.stopPropagation(); window.openEntity(\"" + inv.from + "\")'><span class='mono'>" + inv.from + "</span> " + sName + "</div>";
        inner += "  <div class='ti-arrow'>→<br><span class='mono val'>₹" + (inv.value||0).toLocaleString() + "</span><br>→</div>";
        inner += "  <div class='ti-party buyer clickable' onclick='event.stopPropagation(); window.openEntity(\"" + inv.to + "\")'><span class='mono'>" + inv.to + "</span> " + bName + "</div>";
        inner += "</div>";
        
        inner += "<div class='ti-meta'>";
        inner += "  <div><span class='ti-meta-label'>HS</span> <span class='mono'>" + (inv.hs_code || "Not available") + "</span></div>";
        inner += "  <div><span class='ti-meta-label'>DATE</span> <span class='mono'>" + (inv.invoice_date || "Not available") + "</span></div>";
        inner += "</div>";

        domItem.innerHTML = inner;
        overlapList.appendChild(domItem);
      });
      wrapper.appendChild(overlapList);
    }

    return wrapper;
  }

  // --- PHASE 2 ADDITIONS ---
  function setupTabs() {
    var tabs = document.querySelectorAll(".tab-btn");
    var sections = document.querySelectorAll(".view-section");
    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        tabs.forEach(function(t) { t.classList.remove("active"); });
        sections.forEach(function(s) { s.classList.remove("active"); });
        tab.classList.add("active");
        document.getElementById(tab.getAttribute("data-target")).classList.add("active");
      });
    });
  }

  function renderLedger() {
    var tbody = document.getElementById("ledger-body");
    var searchInput = document.getElementById("ledger-search");
    var sortSelect = document.getElementById("ledger-sort");
    var filterSelect = document.getElementById("ledger-filter");
    if (!tbody || typeof INVOICES === "undefined" || typeof ENTITIES === "undefined") return;

    var allInvoices = typeof getAllInvoices === "function" ? getAllInvoices() : INVOICES;
    var invoicesArray = Object.values(allInvoices);

    function formatEntity(id) {
      var e = ENTITIES[id];
      if (!e) return "Entity information unavailable";
      return "<div class='mono'>" + id + "</div><div>" + e.name + "</div>";
    }

    function update() {
      var query = searchInput.value.toLowerCase();
      var sort = sortSelect.value;
      var filter = filterSelect.value;

      var filtered = invoicesArray.filter(function(inv) {
        var seller = ENTITIES[inv.from] || {};
        var buyer = ENTITIES[inv.to] || {};
        
        var matchesSearch = true;
        if (query) {
          var text = [
            inv.invoice_id, inv.from, seller.name || "", 
            inv.to, buyer.name || "", inv.hs_code || ""
          ].join(" ").toLowerCase();
          matchesSearch = text.indexOf(query) !== -1;
        }

        var isCustom = window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[inv.invoice_id];
        
        var matchesFilter = true;
        if (filter === "has-hs") matchesFilter = !!inv.hs_code;
        else if (filter === "missing-hs") matchesFilter = !inv.hs_code;
        else if (filter === "discounted") matchesFilter = !!inv.discounting_date;
        else if (filter === "not-discounted") matchesFilter = !inv.discounting_date;
        else if (filter === "dataset") matchesFilter = !isCustom;
        else if (filter === "investigator") matchesFilter = isCustom;

        return matchesSearch && matchesFilter;
      });

      filtered.sort(function(a, b) {
        if (sort === "date-new") return (b.invoice_date || "").localeCompare(a.invoice_date || "");
        if (sort === "date-old") return (a.invoice_date || "").localeCompare(b.invoice_date || "");
        if (sort === "amount-high") return (b.value || 0) - (a.value || 0);
        if (sort === "amount-low") return (a.value || 0) - (b.value || 0);
        if (sort === "id") return a.invoice_id.localeCompare(b.invoice_id);
        return 0;
      });

      tbody.innerHTML = "";
      filtered.forEach(function(inv) {
        var tr = document.createElement("tr");
        tr.onclick = function() { window.openInvoice(inv.invoice_id); };
        tr.style.cursor = "pointer";
        
        var isCustom = window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[inv.invoice_id];
        var tdSrc = document.createElement("td");
        tdSrc.innerHTML = isCustom ? "<span class='src-badge investigator'>INVESTIGATOR ADDED</span>" : "<span class='src-badge'>DATASET</span>";
        
        var tdInv = document.createElement("td");
        tdInv.className = "mono";
        tdInv.textContent = inv.invoice_id;
        
        var tdDate = document.createElement("td");
        tdDate.className = "mono";
        tdDate.textContent = inv.invoice_date || "N/A";
        
        var tdSeller = document.createElement("td");
        tdSeller.innerHTML = formatEntity(inv.from);
        
        var tdBuyer = document.createElement("td");
        tdBuyer.innerHTML = formatEntity(inv.to);
        
        var tdAmt = document.createElement("td");
        tdAmt.className = "mono val-col";
        tdAmt.textContent = "₹" + (inv.value ? inv.value.toLocaleString() : "0");
        
        var tdHs = document.createElement("td");
        tdHs.className = "mono";
        tdHs.textContent = inv.hs_code || "N/A";
        
        var tdDisc = document.createElement("td");
        tdDisc.className = "mono";
        tdDisc.textContent = inv.discounting_date || "N/A";
        
        tr.appendChild(tdSrc);
        tr.appendChild(tdInv);
        tr.appendChild(tdDate);
        tr.appendChild(tdSeller);
        tr.appendChild(tdBuyer);
        tr.appendChild(tdAmt);
        tr.appendChild(tdHs);
        tr.appendChild(tdDisc);
        tbody.appendChild(tr);
      });
      
      var statsBar = document.getElementById("ledger-stats");
      if (statsBar) {
        var totalVal = filtered.reduce(function(acc, i) { return acc + (i.value || 0); }, 0);
        statsBar.innerHTML = "SHOWING <span class='mono' style='color:var(--text-main)'>" + filtered.length + "</span> INVOICES &nbsp;|&nbsp; TOTAL VALUE <span class='mono' style='color:var(--text-main)'>₹" + totalVal.toLocaleString() + "</span>";
      }
    }

    searchInput.addEventListener("input", update);
    sortSelect.addEventListener("change", update);
    filterSelect.addEventListener("change", update);
    
    update();
  }

  function getRelatedRings(invoiceId) {
    if (typeof SCORED === "undefined" || !SCORED.rings) return [];
    var related = [];
    SCORED.rings.forEach(function(ring) {
      if (ring.hops) {
        for (var i = 0; i < ring.hops.length; i++) {
          if (ring.hops[i].hop_type === "invoice" && ring.hops[i].invoice_id === invoiceId) {
            related.push({ ring: ring, idx: i });
            break;
          }
        }
      }
    });
    return related;
  }

  function openInvoiceModal(invoiceId) {
    var allInv = typeof getAllInvoices === "function" ? getAllInvoices() : INVOICES;
    var inv = allInv[invoiceId];
    if (!inv) return;
    
    var isCustom = window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[invoiceId];
    
    document.getElementById("modal-title").innerHTML = "INVOICE <span class='mono' style='color:var(--text-main); margin-left:8px;'>" + invoiceId + "</span>" +
      (isCustom ? "<span class='src-badge investigator' style='margin-left:12px;'>INVESTIGATOR ADDED</span>" : "<span class='src-badge' style='margin-left:12px;'>DATASET</span>");
      
    var sE = ENTITIES[inv.from];
    var bE = ENTITIES[inv.to];
    var sName = sE ? sE.name : "Unknown";
    var bName = bE ? bE.name : "Unknown";

    var html = "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>ISSUER / SELLER <button class='view-entity-btn' onclick='window.openEntity(\"" + inv.from + "\")'>VIEW ENTITY</button></h3>";
    html += "<div class='detail-row'><span class='detail-value' style='font-size:14px;'>" + inv.from + "</span></div>";
    html += "<div class='detail-row'><span class='detail-value' style='color:var(--text-muted);'>" + sName + "</span></div>";
    html += "</div>";
    html += "<div class='detail-section'><h3>RECEIVER / BUYER <button class='view-entity-btn' onclick='window.openEntity(\"" + inv.to + "\")'>VIEW ENTITY</button></h3>";
    html += "<div class='detail-row'><span class='detail-value' style='font-size:14px;'>" + inv.to + "</span></div>";
    html += "<div class='detail-row'><span class='detail-value' style='color:var(--text-muted);'>" + bName + "</span></div>";
    html += "</div>";
    html += "</div>";

    html += "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>TRANSACTION METADATA</h3>";
    html += "<div class='detail-row'><span class='detail-label'>VALUE</span><span class='detail-value risk' style='font-size:14px;'>₹" + (inv.value ? inv.value.toLocaleString() : "0") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>HS CODE</span><span class='detail-value'>" + (inv.hs_code || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>INVOICE DATE</span><span class='detail-value'>" + (inv.invoice_date || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>DISCOUNTING DATE</span><span class='detail-value'>" + (inv.discounting_date || "N/A") + "</span></div>";
    html += "</div>";

    html += "<div class='detail-section'><h3>RING CONTEXT</h3>";
    var related = getRelatedRings(invoiceId);
    if (related.length === 0) {
      html += "<div class='detail-row'><span class='detail-label'>RINGS</span><span class='detail-value'>No related rings</span></div>";
    } else {
      related.forEach(function(r) {
        html += "<div class='detail-row' style='margin-bottom:12px;'><span class='detail-label'>RING ID</span><span class='detail-value'>" + r.ring.ring_id + " <button class='view-entity-btn' onclick='window.viewRing(\"" + r.ring.ring_id + "\")'>VIEW RING</button></span></div>";
        var hops = r.ring.hops || [];
        var prev = r.idx > 0 ? hops[r.idx - 1] : null;
        var next = r.idx < hops.length - 1 ? hops[r.idx + 1] : null;
        
        if (prev) {
          var pTxt = prev.hop_type === "invoice" ? prev.invoice_id : "Corporate Bridge";
          html += "<div class='detail-row'><span class='detail-label'>PREV HOP</span><span class='detail-value'>" + pTxt + "</span></div>";
        }
        if (next) {
          var nTxt = next.hop_type === "invoice" ? next.invoice_id : "Corporate Bridge";
          html += "<div class='detail-row'><span class='detail-label'>NEXT HOP</span><span class='detail-value'>" + nTxt + "</span></div>";
        }
      });
    }
    html += "</div></div>";
    
    if (isCustom) {
      html += "<div style='margin-top: 24px; display: flex; justify-content: flex-end;'>";
      html += "<button class='btn danger-action' onclick='window.removeInvestigatorInvoice(\"" + invoiceId + "\")'>REMOVE INVOICE</button>";
      html += "</div>";
    }

    var mBody = document.getElementById("modal-body");
    mBody.innerHTML = html;
  }

  // Expose methods for inline onclick handlers
  window.openEntity = function(entityId) {
    try {
      openEntity(entityId);
    } catch (e) {
      console.error("Error opening entity:", e);
      alert("Error opening entity: " + e.message);
    }
  };
  function openEntity(entityId) {
    var e = typeof ENTITIES !== 'undefined' ? ENTITIES[entityId] : null;
    if (!e) return;
    
    document.getElementById("entity-modal-title").innerHTML = "ENTITY <span class='mono' style='color:var(--text-main); margin-left:8px;'>" + entityId + "</span>";

    var allInv = typeof getAllInvoices === "function" ? getAllInvoices() : INVOICES;
    var invs = Object.values(allInv).filter(function(i) {
      return i.from === entityId || i.to === entityId;
    });
    
    var datasetInvs = invs.filter(function(i) { return !window.INVESTIGATOR_INVOICES || !window.INVESTIGATOR_INVOICES[i.invoice_id]; });
    var customInvs = invs.filter(function(i) { return window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[i.invoice_id]; });
    
    var totalVal = invs.reduce(function(acc, i) { return acc + (i.value || 0); }, 0);
    
    var rings = typeof SCORED !== "undefined" && SCORED.rings ? SCORED.rings.filter(function(r) {
      return (r.entities || []).indexOf(entityId) !== -1;
    }) : [];

    var html = "<div class='detail-header'>";
    html += "<div class='detail-title'>" + e.name + "</div>";
    if (e.industry) html += "<div class='detail-subtitle'>INDUSTRY: " + e.industry.toUpperCase() + "</div>";
    html += "</div>";

    html += "<div class='trail-header' style='margin-bottom:24px;'>";
    html += "<div class='trail-stat-group'>";
    html += "<div class='trail-stat'><span class='ts-label'>DATASET INVOICES</span><span class='ts-val mono'>" + datasetInvs.length + "</span></div>";
    if (customInvs.length > 0) {
      html += "<div class='trail-stat'><span class='ts-label'>INVESTIGATOR ADDED</span><span class='ts-val mono' style='color:var(--accent-teal);'>" + customInvs.length + "</span></div>";
    }
    html += "<div class='trail-stat'><span class='ts-label'>OBSERVED VALUE</span><span class='ts-val mono'>₹" + (totalVal/10000000).toFixed(2) + " Cr</span></div>";
    html += "<div class='trail-stat'><span class='ts-label'>RINGS</span><span class='ts-val mono'>" + rings.length + "</span></div>";
    html += "</div></div>";

    html += "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>REGISTRATION & ADDRESS</h3>";
    html += "<div class='detail-row'><span class='detail-label'>CIN</span><span class='detail-value'>" + (e.cin || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>REGISTRATION</span><span class='detail-value'>" + (e.registration_date || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>STATUS</span><span class='detail-value'>" + (e.status || "N/A").toUpperCase() + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>STATE</span><span class='detail-value'>" + (e.state || "N/A").toUpperCase() + "</span></div>";
    if (e.address) {
      html += "<div style='margin-top:12px; font-size:10px; color:var(--text-muted);'>" + e.address.toUpperCase() + "</div>";
    }
    html += "</div>";

    html += "<div class='detail-section'><h3>DIRECTORS</h3>";
    if (e.directors && e.directors.length > 0) {
      e.directors.forEach(function(d) {
        html += "<div class='detail-row'><span class='detail-label'>" + d.din + "</span><span class='detail-value'>" + d.name + "</span></div>";
      });
    } else {
      html += "<div class='detail-row'><span class='detail-label'>DIRECTORS</span><span class='detail-value'>N/A</span></div>";
    }
    html += "</div></div>";
    
    html += "<div class='detail-section' style='margin-bottom:24px;'><h3>RELATED INVOICES</h3>";
    html += "<div style='display:flex; flex-direction:column; gap:8px;'>";
    invs.forEach(function(i) {
      var isSeller = i.from === entityId;
      var role = isSeller ? "<span style='color:var(--risk-coral)'>SELLER</span>" : "<span style='color:var(--accent-teal)'>BUYER</span>";
      var otherE = isSeller ? i.to : i.from;
      var otherEName = ENTITIES[otherE] ? ENTITIES[otherE].name : "Unknown";
      var isC = window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[i.invoice_id] ? " <span class='src-badge investigator'>INVESTIGATOR ADDED</span>" : "";
      
      html += "<div style='display:flex; justify-content:space-between; border-bottom:1px solid var(--border-muted); padding-bottom:4px; font-size:11px; font-family:var(--font-mono); align-items:center;'>";
      html += "<span>" + i.invoice_id + isC + " | " + role + " | ₹" + (i.value/10000000).toFixed(2) + " Cr</span>";
      html += "<span>" + otherE + " " + otherEName + " <button class='view-entity-btn' onclick='window.openInvoice(\"" + i.invoice_id + "\")'>VIEW</button></span>";
      html += "</div>";
    });
    html += "</div></div>";
    
    document.getElementById("entity-modal-body").innerHTML = html;
    
    document.getElementById("invoice-modal").classList.add("hidden");
    document.getElementById("entity-modal").classList.remove("hidden");
  }
  window.openEntity = openEntity;
  window.openInvoice = function(invoiceId) {
    try {
      var eModal = document.getElementById("entity-modal");
      if (eModal) eModal.classList.add("hidden");
      
      openInvoiceModal(invoiceId);
      
      var iModal = document.getElementById("invoice-modal");
      if (iModal) iModal.classList.remove("hidden");
    } catch (e) {
      console.error("Error opening invoice:", e);
      alert("Error opening invoice: " + e.message);
    }
  };
  window.viewRing = function(ringId) {
    document.getElementById("invoice-modal").classList.add("hidden");
    document.getElementById("entity-modal").classList.add("hidden");
    document.querySelector(".tab-btn[data-target='view-queue']").click();
    var el = document.getElementById(ringId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  var invClose = document.getElementById("modal-close");
  if (invClose) {
    invClose.addEventListener("click", function() {
      var m = document.getElementById("invoice-modal");
      if (m) m.classList.add("hidden");
    });
  }
  
  var entityClose = document.getElementById("entity-modal-close");
  if (entityClose) {
    entityClose.addEventListener("click", function() {
      var m = document.getElementById("entity-modal");
      if (m) m.classList.add("hidden");
    });
  }

  setupTabs();
  renderLedger();
  render();

document.addEventListener("click", function(e) {
  var imodal = document.getElementById("invoice-modal");
  if (imodal && !imodal.classList.contains("hidden") && e.target === imodal) {
    imodal.classList.add("hidden");
  }
  var emodal = document.getElementById("entity-modal");
  if (emodal && !emodal.classList.contains("hidden") && e.target === emodal) {
    emodal.classList.add("hidden");
  }
  var amodal = document.getElementById("add-invoice-modal");
  if (amodal && !amodal.classList.contains("hidden") && e.target === amodal) {
    amodal.classList.add("hidden");
  }
});

})();
