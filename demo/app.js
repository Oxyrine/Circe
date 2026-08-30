(function () {
  "use strict";

  var SIGNALS = ["value", "product", "timing", "externality"];

// --- PHASE 6 ADDITIONS ---
window.INVESTIGATOR_INVOICES = {};
try {
  var stored = localStorage.getItem('circe_investigator_invoices');
  if (stored) {
    window.INVESTIGATOR_INVOICES = JSON.parse(stored);
  }
} catch(e) {}

function getAllInvoices() {
  return Object.assign({}, typeof INVOICES !== "undefined" ? INVOICES : {}, window.INVESTIGATOR_INVOICES);
}

// HS codes are transcribed from real invoices, not fabricated: there is no NIC<->HS
// concordance table anywhere in this codebase (scoring.py's evidence() abstains on
// exactly this comparison), so this only ever surfaces codes that already appear on
// invoices from entities of the same industry_class -- a dataset-derived autocomplete
// convenience, never a "correct code" or a consistency check.
function hsCodesForIndustry(industryClass) {
  var counts = {};
  Object.values(getAllInvoices()).forEach(function(inv) {
    if (!inv.hs_code) return;
    var seller = ENTITIES[inv.from];
    if (seller && seller.industry_class === industryClass) {
      counts[inv.hs_code] = (counts[inv.hs_code] || 0) + 1;
    }
  });
  return Object.keys(counts).sort(function(a, b) { return counts[b] - counts[a]; });
}

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function updateHsSuggestions() {
  var sellerInput = document.getElementById("add-inv-seller");
  var datalist = document.getElementById("hs-datalist");
  var hint = document.getElementById("add-inv-hs-hint");
  if (!sellerInput || !datalist || typeof ENTITIES === "undefined") return;
  var seller = ENTITIES[sellerInput.value.trim()];
  clearChildren(datalist);
  if (!seller) {
    if (hint) hint.textContent = "";
    return;
  }
  var codes = hsCodesForIndustry(seller.industry_class);
  codes.forEach(function(code) {
    var opt = document.createElement("option");
    opt.value = code;
    datalist.appendChild(opt);
  });
  if (hint) {
    hint.textContent = codes.length
      ? "Commonly used for " + seller.industry_class.toUpperCase() + " in this dataset — not a correctness check."
      : "No prior " + seller.industry_class.toUpperCase() + " invoices in this dataset to suggest from.";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var entityDatalist = document.getElementById("entity-ids");
  if (entityDatalist && typeof ENTITIES !== "undefined") {
    Object.keys(ENTITIES).sort().forEach(function(id) {
      var opt = document.createElement("option");
      opt.value = id;
      opt.label = ENTITIES[id].name;
      entityDatalist.appendChild(opt);
    });
  }

  var sellerInput = document.getElementById("add-inv-seller");
  if (sellerInput) sellerInput.addEventListener("input", updateHsSuggestions);

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
    updateHsSuggestions();
    document.getElementById("add-invoice-modal").classList.remove("hidden");
  };

  var clearBtn = document.getElementById("clear-investigator-btn");
  if (clearBtn) {
    if (Object.keys(window.INVESTIGATOR_INVOICES).length > 0) clearBtn.style.display = "inline-block";
    clearBtn.onclick = function() {
      if (confirm("Are you sure you want to clear all investigator-added data?")) {
        localStorage.removeItem("circe_investigator_invoices");
        window.INVESTIGATOR_INVOICES = {};
        clearBtn.style.display = "none";
        if (typeof renderLedger === "function") renderLedger();
        if (typeof updateDirectory === "function") updateDirectory();
        if (typeof renderNetwork === "function") renderNetwork();
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

  if (!id || !seller || !buyer || isNaN(val) || !date || !hs) {
    err.textContent = "Please fill in all required fields.";
    err.style.display = "block";
    return;
  }
  if (!/^\d{6,8}$/.test(hs)) {
    err.textContent = "HS code must be 6-8 digits.";
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
    hs_code: hs,
    discounting_date: disc || undefined,
    _source: "investigator"
  };

  window.INVESTIGATOR_INVOICES[id] = inv;
  localStorage.setItem("circe_investigator_invoices", JSON.stringify(window.INVESTIGATOR_INVOICES));
  
  document.getElementById("add-invoice-modal").classList.add("hidden");
  
  var clearBtn = document.getElementById("clear-investigator-btn");
  if (clearBtn) clearBtn.style.display = "inline-block";

  if (typeof renderLedger === "function") renderLedger();
  if (typeof updateDirectory === "function") updateDirectory();
  if (typeof renderNetwork === "function") renderNetwork();
  
  // Show the invoice detail immediately
  closeModal("entity-modal");
  closeModal("add-invoice-modal");
  openInvoiceModal(id);
  openModal("invoice-modal");
};

window.removeInvestigatorInvoice = function(id) {
  if (confirm("Remove this investigator-added invoice?")) {
    delete window.INVESTIGATOR_INVOICES[id];
    localStorage.setItem("circe_investigator_invoices", JSON.stringify(window.INVESTIGATOR_INVOICES));
    closeModal("invoice-modal");
    if (Object.keys(window.INVESTIGATOR_INVOICES).length === 0) {
      var clearBtn = document.getElementById("clear-investigator-btn");
      if (clearBtn) clearBtn.style.display = "none";
    }
    if (typeof renderLedger === "function") renderLedger();
    if (typeof updateDirectory === "function") updateDirectory();
    if (typeof renderNetwork === "function") renderNetwork();
  }
};

  var NS = "http://www.w3.org/2000/svg";

  function fmtRupees(n, html) {
    if (typeof n !== "number" || isNaN(n)) return "—";
    var isNeg = n < 0;
    var absN = Math.abs(n);
    var numStr = "";
    var unit = "";
    if (absN >= 10000000) {
      numStr = (absN / 10000000).toFixed(2);
      unit = " Cr";
    } else if (absN >= 100000) {
      numStr = (absN / 100000).toFixed(2);
      unit = " L";
    } else {
      numStr = absN.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      unit = "";
    }
    var prefix = isNeg ? "-₹" : "₹";
    if (html) {
      return (isNeg ? "-" : "") + "<span class='curr-sym'>₹</span><span class='num'>" + numStr + "</span><span class='curr-unit'>" + unit + "</span>";
    }
    return prefix + numStr + unit;
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
  // for the ring's own clean layout, strictly bounded within the safe inner viewBox.
  function backdropPosition(id, cx, cy, keepOutR) {
    var angle = (hashId(id + "#a") % 3600) / 3600 * Math.PI * 2;
    var t = (hashId(id + "#r") % 1000) / 1000;
    var maxR = Math.min(cx - 35, cy - 35);
    var r = keepOutR + t * Math.max(maxR - keepOutR, 0);
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
    var cx = size / 2, cy = (size / 2) - 15;
    var ringR = Math.min(68, 22 + n * 5.5);
    var nodeR = 15;
    var keepOutR = ringR + nodeR + 14;

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
      d: "M1 1L9 5L1 9", fill: "var(--blood)", stroke: "none",
    }));
    defs.appendChild(marker);
    
    // Drop shadow filter for ring nodes
    var filter = svgEl("filter", { id: "node-shadow-" + ring.ring_id, x: "-20%", y: "-20%", width: "140%", height: "140%" });
    filter.appendChild(svgEl("feDropShadow", { dx: "0", dy: "2", stdDeviation: "3", "flood-color": "#000", "flood-opacity": "0.6" }));
    defs.appendChild(filter);

    // Clip path for backdrop to strictly prevent any element from bleeding outside box or over legend
    var clip = svgEl("clipPath", { id: "backdrop-clip-" + ring.ring_id });
    clip.appendChild(svgEl("rect", {
      x: "16", y: "16", width: "288", height: "250", rx: "4"
    }));
    defs.appendChild(clip);
    
    svg.appendChild(defs);

    // --- dimmed backdrop ---
    var backdropGroup = svgEl("g", { class: "backdrop", "clip-path": "url(#backdrop-clip-" + ring.ring_id + ")" });
    if (backdrop && backdrop.nodes && backdrop.nodes.length) {
      var ringIds = {};
      ring.entities.forEach(function (id) { ringIds[id] = true; });
      var bpos = {};
      backdrop.nodes.forEach(function (node) {
        if (ringIds[node.id]) return;
        bpos[node.id] = backdropPosition(node.id, cx, cy, keepOutR);
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
        title.textContent = "INVOICE: " + fmtRupees(hop.value, false);
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
      });
      
      g.addEventListener("mouseleave", function() {
        wrapper.classList.remove("hover-active");
        g.classList.remove("hovered");
      });
      
      nodesGroup.appendChild(g);
    });
    svg.appendChild(nodesGroup);

    wrapper.appendChild(svg);
    
    // Add legend as horizontal strip at bottom
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
    if (isAbstained || score === null || typeof score === "undefined") {
      wrapper.innerHTML = "<div class='sig-name'>" + sig.toUpperCase() + "</div>" +
                          "<div class='sig-bar-wrap' title='Signal abstained: Insufficient data across hops'>" +
                            "<div class='sig-bar-track abstained'></div>" +
                          "</div>" +
                          "<div class='sig-val abstained mono'>ABSTAINED</div>";
    } else {
      var pct = Math.max(0, Math.min(100, Math.round(score * 100)));
      var isRisk = (score >= 0.70);
      var barClass = isRisk ? "sig-bar-fill risk" : "sig-bar-fill";
      var valClass = isRisk ? "sig-val risk mono num" : "sig-val mono num";
      wrapper.innerHTML = "<div class='sig-name'>" + sig.toUpperCase() + "</div>" +
                          "<div class='sig-bar-wrap'><div class='sig-bar-track'><div class='" + barClass + "' style='width:" + pct + "%'></div></div></div>" +
                          "<div class='" + valClass + "'>" + score.toFixed(2) + "</div>";
    }
    
    if (evidence) {
      var evDiv = document.createElement("div");
      evDiv.style.gridColumn = "1 / -1";
      evDiv.style.fontSize = "var(--fs-micro)";
      evDiv.style.color = "var(--paper-muted)";
      evDiv.style.marginTop = "-4px";
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

    var score = (ring.aggregate || ring.aggregate_score || 0);
    var statusPill = score >= 0.70
      ? "<span class='status-pill risk'>FLAGGED FRAUD</span>"
      : "<span class='status-pill benign'>BENIGN LOOP</span>";

    // Compute summary stats — reuse values buildCard already has
    var invoiceCount = 0;
    var totalValue = 0;
    var invoiceDates = [];
    (ring.hops || []).forEach(function(h) {
      if (h.hop_type === "invoice") {
        invoiceCount++;
        totalValue += (h.value || 0);
        if (h.invoice_date) invoiceDates.push(new Date(h.invoice_date));
      }
    });
    var daySpan = 0;
    if (invoiceDates.length >= 2) {
      var minD = Math.min.apply(null, invoiceDates.map(function(d) { return d.getTime(); }));
      var maxD = Math.max.apply(null, invoiceDates.map(function(d) { return d.getTime(); }));
      daySpan = Math.round((maxD - minD) / 86400000);
    }
    var entityCount = (ring.entities || []).length;
    var totalValueFormatted = fmtRupees(totalValue, false);
    var isCorp = ring.closure_type === "corporate";

    var summaryLine, sentenceLine;
    if (isCorp) {
      summaryLine = entityCount + " companies form a circle that closes through a shared director";
      sentenceLine = totalValueFormatted + " moved across " + invoiceCount + " invoices.";
    } else {
      summaryLine = entityCount + " companies billed each other in a closed circle";
      sentenceLine = daySpan > 0
        ? totalValueFormatted + " moved in " + daySpan + " days and ended up back where it started."
        : totalValueFormatted + " moved across " + invoiceCount + " invoices and ended up back where it started.";
    }

    // Collapsed header — full-width button, chevron, summary sentence, expected-loss number
    var hdr = document.createElement("button");
    hdr.className = "ring-card-header";
    hdr.setAttribute("aria-expanded", "false");
    hdr.innerHTML =
      "<span class='rh-chevron' aria-hidden='true'>▸</span>" +
      "<span class='rh-rank'>#" + (rank < 10 ? "0" + rank : rank) + "</span>" +
      "<span class='rh-summary'>" +
        "<span class='rh-primary'>" + summaryLine + ".</span>" +
        "<span class='rh-sentence'>" + sentenceLine + "</span>" +
      "</span>" +
      statusPill +
      "<span class='rh-loss-block'>" +
        "<span class='rh-loss-val'>" + fmtRupees(expLoss, true) + "</span>" +
        "<span class='rh-loss-label'><span class='gloss' tabindex='0' data-gloss='Rupees at risk if this ring is real.'>at risk</span></span>" +
      "</span>" +
      "<span class='rh-ring-id'>" + ring.ring_id + "</span>";

    card.appendChild(hdr);

    // Expanded body — hidden by default
    var body = document.createElement("div");
    body.className = "ring-card-body";

    var bodyInner = document.createElement("div");
    bodyInner.className = "ring-body";

    var vizWrap = document.createElement("div");
    vizWrap.className = "ring-viz";
    vizWrap.appendChild(buildRingSVG(ring, backdrop));
    bodyInner.appendChild(vizWrap);

    var scores = document.createElement("div");
    scores.className = "ring-scores";

    var sTitle = document.createElement("div");
    sTitle.className = "entity-section-title";
    sTitle.style.marginTop = "0";
    sTitle.textContent = "MODEL SCORES";
    scores.appendChild(sTitle);

    // Aggregate display with chip
    var aggRow = document.createElement("div");
    aggRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:var(--fs-micro);";
    aggRow.innerHTML =
      "<span class='gloss' tabindex='0' data-gloss='Overall suspicion score 0–1 combining the four signals. Rings here run 0.20–0.89.'>Aggregate</span>" +
      "<div style='display:flex; align-items:center; gap:8px;'>" +
        "<span class='mono num' style='color:var(--paper);font-weight:700;font-size:var(--fs-emphasis);'>" + score.toFixed(2) + "</span>" +
        statusPill +
      "</div>";
    scores.appendChild(aggRow);

    var closureRow = document.createElement("div");
    closureRow.style.cssText = "font-size:var(--fs-micro);color:var(--paper-muted);margin-bottom:10px;";
    var closureGloss = isCorp
      ? "class='gloss' tabindex='0' data-gloss='The circle closes through a shared director rather than a final invoice.'"
      : "class='gloss' tabindex='0' data-gloss='The circle closes through invoices alone.'";
    closureRow.innerHTML = "<span " + closureGloss + ">" +
      (isCorp ? "Corporate closed" : "Transaction closed") + "</span>";
    scores.appendChild(closureRow);

    var sigs = ["value", "product", "timing", "externality"];
    var abstainedList = ring.abstained || [];
    var glossMap = {
      "value": "Money comes back around — each company passes on nearly what it received instead of actually buying something.",
      "product": "The goods never change — the same commodity code is passed along unchanged.",
      "timing": "The invoices are unnaturally evenly spaced and fast.",
      "externality": "These companies trade almost only with each other, not the wider market. 1.00 = entirely internal."
    };
    sigs.forEach(function(sig) {
      var isAbstained = abstainedList.indexOf(sig) !== -1;
      var sigScore = ring.scores ? ring.scores[sig] : null;
      var ev = ring.evidence ? ring.evidence[sig] : "";
      var row = scoreRow(sig, sigScore, isAbstained, ev);
      // Wrap signal name in gloss span
      var nameEl = row.querySelector(".sig-name");
      if (nameEl) {
        var gloss = glossMap[sig];
        if (gloss) {
          nameEl.innerHTML = "<span class='gloss' tabindex='0' data-gloss='" + gloss.replace(/'/g, "&#39;") + "'>" + sig.toUpperCase() + "</span>";
        }
      }
      scores.appendChild(row);
    });

    if (ring.evidence && ring.evidence.industry) {
      var note = document.createElement("p");
      var isFlagged = ring.evidence.industry.indexOf("Flagged Mismatch") !== -1;
      note.className = isFlagged ? "industry-note flagged mono" : "industry-note mono";
      note.innerHTML = "<strong style='letter-spacing:0.5px;'>INDUSTRY:</strong> " + ring.evidence.industry;
      scores.appendChild(note);
    }
    bodyInner.appendChild(scores);
    body.appendChild(bodyInner);

    var contextStrip = document.createElement("div");
    contextStrip.className = "trail-header";
    contextStrip.style.margin = "0";
    contextStrip.style.borderTop = "0";
    contextStrip.style.borderRadius = "0";
    contextStrip.style.backgroundColor = "var(--ink-panel)";

    var h1 = "<div class='trail-stat-group'>";
    h1 += "<div class='trail-stat'><span class='ts-label'>ENTITIES</span><span class='ts-val mono num'>" + (ring.entities || []).length + "</span></div>";
    h1 += "<div class='trail-stat'><span class='ts-label'>INVOICES</span><span class='ts-val mono num'>" + invoiceCount + "</span></div>";
    if (invoiceCount > 0) {
      h1 += "<div class='trail-stat'><span class='ts-label'>OBSERVED VALUE</span><span class='ts-val mono num'>" + fmtRupees(totalValue, true) + "</span></div>";
    }
    h1 += "</div>";
    contextStrip.innerHTML = h1;
    body.appendChild(contextStrip);

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

    body.appendChild(actionsWrap);

    var trailContainer = document.createElement("div");
    trailContainer.className = "trail-container hidden";
    trailContainer.style.padding = "0 16px 16px 16px";
    body.appendChild(trailContainer);

    var timelineContainer = document.createElement("div");
    timelineContainer.className = "timeline-container hidden";
    timelineContainer.style.padding = "0 16px 16px 16px";
    body.appendChild(timelineContainer);

    trailBtn.addEventListener("click", function() {
      if (trailContainer.classList.contains("hidden")) {
        if (!trailContainer.hasChildNodes()) {
          trailContainer.appendChild(buildTransactionTrail(ring));
        }
        trailContainer.classList.remove("hidden");
        trailBtn.textContent = "HIDE TRANSACTION TRAIL";
        trailBtn.style.backgroundColor = "var(--ink-panel-hover)";
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
        timelineBtn.style.backgroundColor = "var(--ink-panel-hover)";
        trailContainer.classList.add("hidden");
        trailBtn.textContent = "VIEW TRANSACTION TRAIL";
        trailBtn.style.backgroundColor = "";
      } else {
        timelineContainer.classList.add("hidden");
        timelineBtn.textContent = "VIEW INVESTIGATION TIMELINE";
        timelineBtn.style.backgroundColor = "";
      }
    });

    card.appendChild(body);

    // Toggle handler — persists open state per ring in localStorage
    hdr.addEventListener("click", function() {
      var isExpanded = hdr.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        body.classList.remove("expanded");
        hdr.setAttribute("aria-expanded", "false");
        try {
          var stored = JSON.parse(localStorage.getItem("circe_expanded_rings") || "{}");
          delete stored[ring.ring_id];
          localStorage.setItem("circe_expanded_rings", JSON.stringify(stored));
        } catch(e) {}
      } else {
        body.classList.add("expanded");
        hdr.setAttribute("aria-expanded", "true");
        try {
          var stored = JSON.parse(localStorage.getItem("circe_expanded_rings") || "{}");
          stored[ring.ring_id] = 1;
          localStorage.setItem("circe_expanded_rings", JSON.stringify(stored));
        } catch(e) {}
      }
    });

    return card;
  }

  function buildStatsBar(rings) {
    var totalCandidates = (typeof SCORED !== "undefined" && SCORED.total_candidate_count) ? SCORED.total_candidate_count : 5542;
    var highRiskRings = rings.filter(function(r) { return (r.aggregate || r.aggregate_score || 0) >= 0.70; });
    var clearedRings = rings.filter(function(r) { return (r.aggregate || r.aggregate_score || 0) < 0.70; });
    
    var flaggedCount = highRiskRings.length;
    var flaggedLoss = highRiskRings.reduce(function(sum, r) { return sum + (r.expected_loss || 0); }, 0);
    
    var corpCount = rings.filter(function (r) { return r.closure_type === "corporate"; }).length;
    var transCount = rings.filter(function (r) { return r.closure_type === "transaction"; }).length;
    var aggs = rings.filter(function (r) { return typeof r.aggregate === "number" || typeof r.aggregate_score === "number"; });
    var avgAgg = aggs.length ? aggs.reduce(function (s, r) { return s + (r.aggregate || r.aggregate_score || 0); }, 0) / aggs.length : 0;
    
    var s = "<div style='display:flex; flex-wrap:wrap; gap:20px; align-items:center;'>";
    s += "<div class='metric-group'><span class='metric-label'>FLAGGED FRAUD</span> <span class='metric-val risk mono num'>" + flaggedCount + " RINGS</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>FLAGGED AT-RISK LOSS</span> <span class='metric-val risk mono num'>" + fmtRupees(flaggedLoss, true) + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>BENIGN / CLEARED</span> <span class='metric-val mono num' style='color:var(--paper-muted);'>" + clearedRings.length + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>DISCOVERED CANDIDATE LOOPS</span> <span class='metric-val mono num' style='color:var(--seal);'>" + totalCandidates.toLocaleString() + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>CORPORATE CLOSED</span> <span class='metric-val mono num'>" + corpCount + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>TRANSACTION CLOSED</span> <span class='metric-val mono num'>" + transCount + "</span></div>";
    s += "<div class='metric-group'><span class='metric-label'>QUEUE AVG SCORE</span> <span class='metric-val mono num'>" + avgAgg.toFixed(2) + "</span></div>";
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

    if (statsRoot) {
      statsRoot.innerHTML = "";
      statsRoot.appendChild(buildStatsBar(rings));
    }

    root.innerHTML = "";

    var backdrop = typeof BACKDROP !== "undefined" ? BACKDROP : null;
    
    var flaggedRings = rings.filter(function(r) { return (r.aggregate || r.aggregate_score || 0) >= 0.70; });
    var clearedRings = rings.filter(function(r) { return (r.aggregate || r.aggregate_score || 0) < 0.70; });

    // Render flagged rings first (5 rings)
    flaggedRings.forEach(function(ring, i) {
      root.appendChild(buildCard(ring, i + 1, backdrop));
    });

    // If there are cleared rings, render the divider and collapsible container (B1 Queue Triage)
    if (clearedRings.length > 0) {
      var divider = document.createElement("div");
      divider.className = "cleared-divider-wrap";
      divider.innerHTML =
        "<button id='toggle-cleared-rings-btn' class='cleared-divider-btn' aria-expanded='false'>" +
          "<span class='cd-count'>" + clearedRings.length + " cleared loops</span>" +
          "<span class='cd-dot'>·</span>" +
          "<span class='cd-action'>show</span>" +
        "</button>";
      root.appendChild(divider);

      var clearedContainer = document.createElement("div");
      clearedContainer.id = "cleared-rings-container";
      clearedContainer.className = "cleared-rings-container hidden";
      clearedRings.forEach(function(ring, i) {
        clearedContainer.appendChild(buildCard(ring, flaggedRings.length + i + 1, backdrop));
      });
      root.appendChild(clearedContainer);

      var btn = divider.querySelector("#toggle-cleared-rings-btn");
      btn.addEventListener("click", function() {
        var isHidden = clearedContainer.classList.contains("hidden");
        if (isHidden) {
          clearedContainer.classList.remove("hidden");
          btn.setAttribute("aria-expanded", "true");
          btn.querySelector(".cd-action").textContent = "hide";
        } else {
          clearedContainer.classList.add("hidden");
          btn.setAttribute("aria-expanded", "false");
          btn.querySelector(".cd-action").textContent = "show";
        }
      });
    }

    // Restore per-ring expanded state from localStorage; first card always expanded
    try {
      var expandedMap = JSON.parse(localStorage.getItem("circe_expanded_rings") || "{}");
      rings.forEach(function(ring, i) {
        var card = document.getElementById(ring.ring_id);
        if (!card) return;
        var hdr = card.querySelector(".ring-card-header");
        var body = card.querySelector(".ring-card-body");
        if (!hdr || !body) return;
        if (i === 0 || expandedMap[ring.ring_id]) {
          body.classList.add("expanded");
          hdr.setAttribute("aria-expanded", "true");
        }
      });
    } catch(e) {}
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
        tabs.forEach(function(t) {
          t.classList.remove("active");
          t.removeAttribute("aria-current");
        });
        sections.forEach(function(s) { s.classList.remove("active"); });
        tab.classList.add("active");
        tab.setAttribute("aria-current", "step");
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
      return "<div class='mono' style='font-size:var(--fs-micro); color:var(--paper-muted);'>" + id + "</div><div style='font-size:var(--fs-body);'>" + e.name + "</div>";
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
      var currentDate = null;
      filtered.forEach(function(inv) {
        var invDate = inv.invoice_date || "UNDATED";
        // Sticky date subhead (B4)
        if (invDate !== currentDate) {
          var trDate = document.createElement("tr");
          trDate.className = "ledger-date-subhead";
          var tdDateGroup = document.createElement("td");
          tdDateGroup.colSpan = 8;
          tdDateGroup.innerHTML = "<span class='date-badge mono'>" + invDate + "</span>";
          trDate.appendChild(tdDateGroup);
          tbody.appendChild(trDate);
          currentDate = invDate;
        }

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
        
        // VALUE is dominant column (B4: --fs-emphasis, tabular, right-aligned)
        var tdAmt = document.createElement("td");
        tdAmt.className = "mono val-col num";
        tdAmt.innerHTML = fmtRupees(inv.value, true);
        
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
        
        // 1. VALUE BY INDUSTRY
        var indSums = { distribution: 0, manufacturing: 0, trading: 0, services: 0 };
        filtered.forEach(function(inv) {
          var s = ENTITIES[inv.from];
          var ic = s && s.industry_class ? s.industry_class : "services";
          if (indSums[ic] !== undefined) indSums[ic] += (inv.value || 0);
          else indSums[ic] = (indSums[ic] || 0) + (inv.value || 0);
        });
        var maxIndVal = Math.max.apply(null, Object.values(indSums).concat([1]));
        var indHtml = "<div class='ls-panel'><h4>Value by Seller Industry</h4>";
        Object.keys(indSums).forEach(function(k) {
          var v = indSums[k];
          var pct = ((v / (maxIndVal || 1)) * 100).toFixed(0);
          indHtml += "<div class='ls-row'>" +
            "<span class='ls-label'>" + k.toUpperCase() + "</span>" +
            "<div class='ls-bar-track'><div class='ls-bar-fill' style='width:" + pct + "%'></div></div>" +
            "<span class='ls-val mono num'>" + fmtRupees(v, true) + "</span>" +
            "</div>";
        });
        indHtml += "</div>";

        // 2. TOP HS CODES
        var hsSums = {};
        var noHsSum = 0;
        var noHsCount = 0;
        filtered.forEach(function(inv) {
          if (inv.hs_code) {
            hsSums[inv.hs_code] = (hsSums[inv.hs_code] || 0) + (inv.value || 0);
          } else {
            noHsSum += (inv.value || 0);
            noHsCount++;
          }
        });
        var sortedHs = Object.keys(hsSums).sort(function(a, b) { return hsSums[b] - hsSums[a]; }).slice(0, 5);
        var maxHsVal = Math.max.apply(null, sortedHs.map(function(k) { return hsSums[k]; }).concat([noHsSum, 1]));
        var hsHtml = "<div class='ls-panel'><h4>Top Commodity HS Codes</h4>";
        sortedHs.forEach(function(hs) {
          var v = hsSums[hs];
          var pct = ((v / (maxHsVal || 1)) * 100).toFixed(0);
          hsHtml += "<div class='ls-row'>" +
            "<span class='ls-label'>" + hs + "</span>" +
            "<div class='ls-bar-track'><div class='ls-bar-fill' style='width:" + pct + "%'></div></div>" +
            "<span class='ls-val mono num'>" + fmtRupees(v, true) + "</span>" +
            "</div>";
        });
        if (noHsSum > 0 || sortedHs.length === 0) {
          var noHsPct = ((noHsSum / (maxHsVal || 1)) * 100).toFixed(0);
          hsHtml += "<div class='ls-row'>" +
            "<span class='ls-label' style='color:var(--amber);'>NO HS CODE (" + noHsCount + ")</span>" +
            "<div class='ls-bar-track'><div class='ls-bar-fill' style='width:" + noHsPct + "%; background-color:var(--amber);'></div></div>" +
            "<span class='ls-val mono num'>" + fmtRupees(noHsSum, true) + "</span>" +
            "</div>";
        }
        hsHtml += "</div>";

        // 3. DISCOUNTING LAG
        var lags = [];
        filtered.forEach(function(inv) {
          if (inv.invoice_date && inv.discounting_date) {
            var d1 = new Date(inv.invoice_date);
            var d2 = new Date(inv.discounting_date);
            var diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
            if (!isNaN(diffDays) && diffDays >= 0) lags.push(diffDays);
          }
        });
        var buckets = { "0–3 DAYS": 0, "4–7 DAYS": 0, "8–14 DAYS": 0, "15+ DAYS": 0 };
        lags.forEach(function(d) {
          if (d <= 3) buckets["0–3 DAYS"]++;
          else if (d <= 7) buckets["4–7 DAYS"]++;
          else if (d <= 14) buckets["8–14 DAYS"]++;
          else buckets["15+ DAYS"]++;
        });
        var avgLag = lags.length > 0 ? (lags.reduce(function(a, b) { return a + b; }, 0) / lags.length).toFixed(1) : "—";
        var maxBucketCount = Math.max.apply(null, Object.values(buckets).concat([1]));
        var lagHtml = "<div class='ls-panel'><h4>Financing Lag (" + (avgLag !== "—" ? avgLag + "d avg" : "N/A") + ")</h4>";
        Object.keys(buckets).forEach(function(bKey) {
          var c = buckets[bKey];
          var pct = ((c / (maxBucketCount || 1)) * 100).toFixed(0);
          lagHtml += "<div class='ls-row'>" +
            "<span class='ls-label'>" + bKey + "</span>" +
            "<div class='ls-bar-track'><div class='ls-bar-fill' style='width:" + pct + "%'></div></div>" +
            "<span class='ls-val mono num'>" + c + " inv</span>" +
            "</div>";
        });
        lagHtml += "</div>";

        statsBar.innerHTML = 
          "<div class='ls-summary'>SHOWING <span class='mono num' style='color:var(--paper); font-weight:600;'>" + filtered.length + "</span> INVOICES &nbsp;|&nbsp; TOTAL OBSERVED VALUE <span class='mono' style='color:var(--paper); font-weight:600;'>" + fmtRupees(totalVal, true) + "</span></div>" +
          "<div class='ls-panels'>" + indHtml + hsHtml + lagHtml + "</div>";
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
    
    document.getElementById("modal-title").innerHTML = "INVOICE <span class='mono' style='color:var(--paper); margin-left:8px;'>" + invoiceId + "</span>" +
      (isCustom ? "<span class='src-badge investigator' style='margin-left:12px;'>INVESTIGATOR ADDED</span>" : "<span class='src-badge' style='margin-left:12px;'>DATASET</span>");
      
    var sE = ENTITIES[inv.from];
    var bE = ENTITIES[inv.to];
    var sName = sE ? sE.name : "Unknown";
    var bName = bE ? bE.name : "Unknown";

    var html = "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>ISSUER / SELLER <button class='view-entity-btn' onclick='window.openEntity(\"" + inv.from + "\")'>VIEW ENTITY</button></h3>";
    html += "<div class='detail-row'><span class='detail-value mono' style='font-size:var(--fs-emphasis); font-weight:600;'>" + inv.from + "</span></div>";
    html += "<div class='detail-row'><span class='detail-value' style='color:var(--paper-muted);'>" + sName + "</span></div>";
    html += "</div>";
    html += "<div class='detail-section'><h3>RECEIVER / BUYER <button class='view-entity-btn' onclick='window.openEntity(\"" + inv.to + "\")'>VIEW ENTITY</button></h3>";
    html += "<div class='detail-row'><span class='detail-value mono' style='font-size:var(--fs-emphasis); font-weight:600;'>" + inv.to + "</span></div>";
    html += "<div class='detail-row'><span class='detail-value' style='color:var(--paper-muted);'>" + bName + "</span></div>";
    html += "</div>";
    html += "</div>";

    html += "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>TRANSACTION METADATA</h3>";
    html += "<div class='detail-row'><span class='detail-label'>VALUE</span><span class='detail-value risk mono num' style='font-size:var(--fs-emphasis); font-weight:600;'>" + fmtRupees(inv.value, true) + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>HS CODE</span><span class='detail-value mono'>" + (inv.hs_code || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>INVOICE DATE</span><span class='detail-value mono'>" + (inv.invoice_date || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>DISCOUNTING DATE</span><span class='detail-value mono'>" + (inv.discounting_date || "N/A") + "</span></div>";
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
    
    document.getElementById("entity-modal-title").innerHTML = "ENTITY <span class='mono' style='color:var(--paper); margin-left:8px;'>" + entityId + "</span>";

    var allInv = typeof getAllInvoices === "function" ? getAllInvoices() : INVOICES;
    var invs = Object.values(allInv).filter(function(i) {
      return i.from === entityId || i.to === entityId;
    });
    
    var datasetInvs = invs.filter(function(i) { return !window.INVESTIGATOR_INVOICES || !window.INVESTIGATOR_INVOICES[i.invoice_id]; });
    var customInvs = invs.filter(function(i) { return window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[i.invoice_id]; });
    var totalVal = invs.reduce(function(acc, i) { return acc + (i.value || 0); }, 0);
    
    var entityIdx = buildEntityIndex();
    var st = entityIdx[entityId] || { rings: [], expectedLoss: 0, aggSum: 0 };
    var avgAgg = st.rings.length > 0 ? (st.aggSum / st.rings.length).toFixed(2) : "—";

    var html = "<div class='detail-header'>";
    html += "<div class='detail-title'>" + e.name + "</div>";
    if (e.industry_class) html += "<div class='detail-subtitle'>INDUSTRY: " + e.industry_class.toUpperCase() + " | NIC: " + (e.industry_code || "N/A") + "</div>";
    html += "</div>";

    html += "<div class='trail-header' style='margin-bottom:24px;'>";
    html += "<div class='trail-stat-group'>";
    html += "<div class='trail-stat'><span class='ts-label'>DATASET INVOICES</span><span class='ts-val mono num'>" + datasetInvs.length + "</span></div>";
    if (customInvs.length > 0) {
      html += "<div class='trail-stat'><span class='ts-label'>INVESTIGATOR ADDED</span><span class='ts-val mono num' style='color:var(--seal);'>" + customInvs.length + "</span></div>";
    }
    html += "<div class='trail-stat'><span class='ts-label'>OBSERVED VALUE</span><span class='ts-val mono num'>" + fmtRupees(totalVal, true) + "</span></div>";
    html += "<div class='trail-stat'><span class='ts-label'>RINGS</span><span class='ts-val mono num' style='" + (st.rings.length > 0 ? "color:var(--blood); font-weight:700;" : "") + "'>" + st.rings.length + "</span></div>";
    html += "<div class='trail-stat'><span class='ts-label'>EXPECTED LOSS</span><span class='ts-val risk mono num'>" + fmtRupees(st.expectedLoss, true) + "</span></div>";
    html += "<div class='trail-stat'><span class='ts-label'>AVG AGGREGATE</span><span class='ts-val mono num'>" + avgAgg + "</span></div>";
    html += "</div></div>";

    if (st.rings.length > 0) {
      html += "<div class='detail-section' style='margin-bottom:24px;'><h3>FLAGGED IN RINGS (" + st.rings.length + ")</h3>";
      html += "<div style='display:flex; flex-wrap:wrap; gap:8px;'>";
      st.rings.forEach(function(rId) {
        html += "<button class='btn' onclick='window.viewRing(\"" + rId + "\")'>" + rId + "</button>";
      });
      html += "</div></div>";
    }

    html += "<div class='detail-grid'>";
    html += "<div class='detail-section'><h3>REGISTRATION & ADDRESS</h3>";
    html += "<div class='detail-row'><span class='detail-label'>INDUSTRY</span><span class='detail-value'>" + (e.industry_class || "N/A").toUpperCase() + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>NIC CODE</span><span class='detail-value'>" + (e.industry_code || "N/A") + "</span></div>";
    html += "<div class='detail-row'><span class='detail-label'>REGISTERED</span><span class='detail-value'>" + (e.registration_date || "N/A") + "</span></div>";
    if (e.address) {
      html += "<div style='margin-top:12px; font-size:var(--fs-micro); color:var(--paper-muted);'>" + e.address.toUpperCase() + "</div>";
    }
    html += "</div>";

    html += "<div class='detail-section'><h3>DIRECTORS & CORPORATE LINKS</h3>";
    if (e.directors && e.directors.length > 0) {
      e.directors.forEach(function(din) {
        var coLinked = Object.values(ENTITIES).filter(function(other) {
          return other.id !== entityId && other.directors && other.directors.indexOf(din) !== -1;
        });
        var coHtml = "";
        if (coLinked.length > 0) {
          coLinked.forEach(function(co) {
            coHtml += "<span class='co-director-link' onclick='window.openEntity(\"" + co.id + "\")'>" + co.id + " " + co.name + "</span>";
          });
        }
        html += "<div class='detail-row'><span class='detail-label'>DIRECTOR</span><span class='detail-value'>" + din + coHtml + "</span></div>";
      });
    } else {
      html += "<div class='detail-row'><span class='detail-label'>DIRECTORS</span><span class='detail-value'>None listed</span></div>";
    }
    html += "</div></div>";
    
    html += "<div class='detail-section' style='margin-bottom:24px;'><h3>RELATED INVOICES</h3>";
    html += "<div style='display:flex; flex-direction:column; gap:8px;'>";
    invs.forEach(function(i) {
      var isSeller = i.from === entityId;
      var role = isSeller ? "<span style='color:var(--blood)'>SELLER</span>" : "<span style='color:var(--seal)'>BUYER</span>";
      var otherE = isSeller ? i.to : i.from;
      var otherEName = ENTITIES[otherE] ? ENTITIES[otherE].name : "Unknown";
      var isC = window.INVESTIGATOR_INVOICES && !!window.INVESTIGATOR_INVOICES[i.invoice_id] ? " <span class='src-badge investigator'>INVESTIGATOR ADDED</span>" : "";
      
      html += "<div style='display:flex; justify-content:space-between; border-bottom:1px solid var(--border-muted); padding-bottom:4px; font-size:var(--fs-micro); font-family:var(--font-mono); align-items:center;'>";
      html += "<span>" + i.invoice_id + isC + " | " + role + " | " + fmtRupees(i.value, false) + "</span>";
      html += "<span>" + otherE + " " + otherEName + " <button class='view-entity-btn' onclick='window.openInvoice(\"" + i.invoice_id + "\")'>VIEW</button></span>";
      html += "</div>";
    });
    html += "</div></div>";
    
    document.getElementById("entity-modal-body").innerHTML = html;
    
    closeModal("invoice-modal");
    openModal("entity-modal");
  }
  window.openEntity = openEntity;

  window.openInvoice = function(invoiceId) {
    try {
      closeModal("entity-modal");
      openInvoiceModal(invoiceId);
      openModal("invoice-modal");
    } catch (e) {
      console.error("Error opening invoice:", e);
      alert("Error opening invoice: " + e.message);
    }
  };

  window.viewRing = function(ringId) {
    closeAllModals();
    document.querySelector(".tab-btn[data-target='view-queue']").click();
    var clearedContainer = document.getElementById("cleared-rings-container");
    var el = document.getElementById(ringId);
    if (clearedContainer && el && clearedContainer.contains(el) && clearedContainer.classList.contains("hidden")) {
      var btn = document.getElementById("toggle-cleared-rings-btn");
      if (btn) btn.click();
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Also expand the card so the analyst sees the details
      var hdr = el.querySelector(".ring-card-header");
      var body = el.querySelector(".ring-card-body");
      if (hdr && body && hdr.getAttribute("aria-expanded") !== "true") {
        body.classList.add("expanded");
        hdr.setAttribute("aria-expanded", "true");
        try {
          var stored = JSON.parse(localStorage.getItem("circe_expanded_rings") || "{}");
          stored[ringId] = 1;
          localStorage.setItem("circe_expanded_rings", JSON.stringify(stored));
        } catch(e) {}
      }
    }
  };

  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("hidden");
    m.classList.add("open");
  }
  window.openModal = openModal;

  function closeModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("open");
  }
  window.closeModal = closeModal;

  function closeAllModals() {
    var modals = document.querySelectorAll(".modal-overlay");
    modals.forEach(function(m) {
      m.classList.remove("open");
    });
  }
  window.closeAllModals = closeAllModals;

  var invClose = document.getElementById("modal-close");
  if (invClose) {
    invClose.addEventListener("click", function() {
      closeModal("invoice-modal");
    });
  }
  
  var entityClose = document.getElementById("entity-modal-close");
  if (entityClose) {
    entityClose.addEventListener("click", function() {
      closeModal("entity-modal");
    });
  }

  var addInvClose = document.getElementById("add-invoice-close");
  if (addInvClose) {
    addInvClose.addEventListener("click", function() {
      closeModal("add-invoice-modal");
    });
  }

  var addInvBtn = document.getElementById("add-invoice-btn");
  if (addInvBtn) {
    addInvBtn.addEventListener("click", function() {
      openModal("add-invoice-modal");
    });
  }

  // Close modals when clicking the backdrop
  document.addEventListener("click", function(e) {
    if (e.target && e.target.classList && e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("open");
    }
  });

  // Close modals on Escape key, or clear network focus if no modals are open
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      var openModals = document.querySelectorAll(".modal-overlay.open");
      if (openModals.length > 0) {
        closeAllModals();
      } else if (typeof resetNetworkFocus === "function") {
        resetNetworkFocus();
      }
    }
  });

  // --- PHASE 6 ADDITIONS: INTERCONNECTION MAP & ENTITY DIRECTORY ---

  function buildEntityIndex() {
    var idx = {};
    if (typeof ENTITIES === "undefined") return idx;
    Object.keys(ENTITIES).forEach(function (id) {
      idx[id] = { invoiceCount: 0, invoiceValue: 0, rings: [], expectedLoss: 0, aggSum: 0 };
    });
    var allInvs = typeof getAllInvoices === "function" ? getAllInvoices() : (typeof INVOICES !== "undefined" ? INVOICES : {});
    Object.values(allInvs).forEach(function (inv) {
      [inv.from, inv.to].forEach(function (id) {
        if (!idx[id]) return;
        idx[id].invoiceCount++;
        idx[id].invoiceValue += (inv.value || 0);
      });
    });
    var ringsList = typeof SCORED !== "undefined" && SCORED.rings ? SCORED.rings : [];
    ringsList.forEach(function (r) {
      (r.entities || []).forEach(function (id) {
        if (!idx[id]) return;
        idx[id].rings.push(r.ring_id);
        idx[id].expectedLoss += (typeof r.expected_loss === "number" ? r.expected_loss : (r.expected_loss_inr || 0));
        idx[id].aggSum += (typeof r.aggregate === "number" ? r.aggregate : (r.aggregate_score || 0));
      });
    });
    return idx;
  }

  function renderDirectory() {
    var searchInput = document.getElementById("dir-search");
    var sortSelect = document.getElementById("dir-sort");
    var filterSelect = document.getElementById("dir-filter-industry");
    if (!searchInput || !sortSelect || !filterSelect) return;

    searchInput.addEventListener("input", updateDirectory);
    sortSelect.addEventListener("change", updateDirectory);
    filterSelect.addEventListener("change", updateDirectory);

    updateDirectory();
  }

  function updateDirectory() {
    var tbody = document.getElementById("directory-body");
    var statsEl = document.getElementById("dir-stats");
    var searchInput = document.getElementById("dir-search");
    var sortSelect = document.getElementById("dir-sort");
    var filterSelect = document.getElementById("dir-filter-industry");
    if (!tbody || typeof ENTITIES === "undefined") return;

    var entityIndex = buildEntityIndex();
    var entitiesList = Object.values(ENTITIES);

    var query = (searchInput ? searchInput.value : "").toLowerCase().trim();
    var sort = sortSelect ? sortSelect.value : "rings-desc";
    var indFilter = filterSelect ? filterSelect.value : "all";

    var filtered = entitiesList.filter(function(e) {
      var matchesInd = (indFilter === "all") || (e.industry_class === indFilter);
      var matchesSearch = true;
      if (query) {
        var text = [e.id, e.name, e.industry_class, e.industry_code || "", e.address || ""].join(" ").toLowerCase();
        matchesSearch = text.indexOf(query) !== -1;
      }
      return matchesInd && matchesSearch;
    });

    filtered.sort(function(a, b) {
      var stA = entityIndex[a.id] || { rings: [], expectedLoss: 0, invoiceCount: 0 };
      var stB = entityIndex[b.id] || { rings: [], expectedLoss: 0, invoiceCount: 0 };

      if (sort === "rings-desc") {
        if (stB.rings.length !== stA.rings.length) return stB.rings.length - stA.rings.length;
        return stB.expectedLoss - stA.expectedLoss;
      }
      if (sort === "loss-desc") return stB.expectedLoss - stA.expectedLoss;
      if (sort === "invoices-desc") return stB.invoiceCount - stA.invoiceCount;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "date-new") return (b.registration_date || "").localeCompare(a.registration_date || "");
      if (sort === "id-asc") return a.id.localeCompare(b.id);
      return 0;
    });

    tbody.innerHTML = "";
    filtered.forEach(function(e) {
      var st = entityIndex[e.id] || { rings: [], expectedLoss: 0, invoiceCount: 0 };
      var tr = document.createElement("tr");
      tr.style.cursor = "pointer";
      tr.onclick = function() { window.openEntity(e.id); };

      // Zero ring entities rendered muted (B3)
      if (st.rings.length === 0) {
        tr.classList.add("zero-rings-row");
      }

      // ENTITY column (B3: name at --fs-emphasis, ID below at --fs-micro muted)
      var tdEntity = document.createElement("td");
      tdEntity.innerHTML = "<div class='dir-entity-name'>" + e.name + "</div><div class='dir-entity-id mono'>" + e.id + "</div>";

      var tdInd = document.createElement("td");
      tdInd.innerHTML = "<span class='ti-badge'>" + (e.industry_class || "N/A").toUpperCase() + "</span>";

      var tdNic = document.createElement("td");
      tdNic.className = "mono";
      tdNic.textContent = e.industry_code || "N/A";

      var tdDate = document.createElement("td");
      tdDate.className = "mono";
      tdDate.textContent = e.registration_date || "N/A";

      // Numeric columns right-aligned with .num (B3)
      var tdInvs = document.createElement("td");
      tdInvs.className = "mono num";
      tdInvs.textContent = st.invoiceCount;

      var tdRings = document.createElement("td");
      tdRings.className = "mono num";
      if (st.rings.length > 0) {
        tdRings.innerHTML = "<span style='color:var(--blood); font-weight:700;'>" + st.rings.length + " RINGS</span>";
      } else {
        tdRings.innerHTML = "<span style='color:var(--paper-muted);'>0</span>";
      }

      var tdLoss = document.createElement("td");
      tdLoss.className = "mono val-col num" + (st.expectedLoss > 0 ? " risk" : "");
      tdLoss.innerHTML = fmtRupees(st.expectedLoss, true);

      tr.appendChild(tdEntity);
      tr.appendChild(tdInd);
      tr.appendChild(tdNic);
      tr.appendChild(tdDate);
      tr.appendChild(tdInvs);
      tr.appendChild(tdRings);
      tr.appendChild(tdLoss);
      tbody.appendChild(tr);
    });

    if (statsEl) {
      statsEl.innerHTML = "SHOWING <span style='color:var(--paper); font-weight:600;'>" + filtered.length + "</span> / " + entitiesList.length + " ENTITIES";
    }
  }

  function renderNetwork() {
    var svg = document.getElementById("network-svg");
    var rail = document.getElementById("network-rail");
    var ringSelect = document.getElementById("net-ring-select");
    var indSelect = document.getElementById("net-industry-filter");
    var btnTrade = document.getElementById("net-toggle-trade");
    var btnCorp = document.getElementById("net-toggle-corp");
    var btnFlagged = document.getElementById("net-toggle-flagged");
    var btnReset = document.getElementById("net-reset-btn");
    if (!svg || typeof BACKDROP === "undefined" || !BACKDROP || !BACKDROP.nodes) return;

    var entityIndex = buildEntityIndex();
    var allInvoices = typeof getAllInvoices === "function" ? getAllInvoices() : (typeof INVOICES !== "undefined" ? INVOICES : {});

    // Populate ring dropdown once
    if (ringSelect && ringSelect.options.length <= 1 && typeof SCORED !== "undefined" && SCORED.rings) {
      var sortedRings = SCORED.rings.slice().sort(function(a, b) {
        return (b.expected_loss || 0) - (a.expected_loss || 0);
      });
      sortedRings.forEach(function(r) {
        var opt = document.createElement("option");
        opt.value = r.ring_id;
        opt.textContent = r.ring_id + " · " + (r.aggregate || 0).toFixed(2) + " · " + fmtRupees(r.expected_loss, false) + " (" + (r.closure_type || "").toUpperCase() + ")";
        ringSelect.appendChild(opt);
      });
    }

    // Node coordinate lookup
    var nodePos = {};
    BACKDROP.nodes.forEach(function(n) {
      nodePos[n.id] = { x: n.x, y: n.y, industry_class: n.industry_class };
    });

    // Pair value lookup
    var pairValues = {};
    Object.values(allInvoices).forEach(function(inv) {
      var k1 = inv.from + "->" + inv.to;
      var k2 = inv.to + "->" + inv.from;
      pairValues[k1] = (pairValues[k1] || 0) + (inv.value || 0);
      pairValues[k2] = (pairValues[k2] || 0) + (inv.value || 0);
    });

    // Ring hops lookup
    var ringHopsMap = {};
    var ringEntitiesMap = {};
    (typeof SCORED !== "undefined" && SCORED.rings ? SCORED.rings : []).forEach(function(r) {
      (r.entities || []).forEach(function(e) {
        ringEntitiesMap[e] = true;
      });
      (r.hops || []).forEach(function(h) {
        var k = h.from + "->" + h.to;
        ringHopsMap[k] = h;
      });
    });

    // SVG building
    svg.innerHTML = "";

    var gZoomGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gZoomGroup.setAttribute("id", "network-zoom-group");
    svg.appendChild(gZoomGroup);

    // 0. Cluster background zones
    var gClusters = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gClusters.setAttribute("class", "layer-clusters");
    
    // Cluster 1 (Main Network - 50 entities)
    var c1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    c1.setAttribute("x", "40");
    c1.setAttribute("y", "35");
    c1.setAttribute("width", "1300");
    c1.setAttribute("height", "1030");
    c1.setAttribute("rx", "8");
    c1.setAttribute("class", "cluster-bg");
    gClusters.appendChild(c1);

    var c1Title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    c1Title.setAttribute("x", "65");
    c1Title.setAttribute("y", "68");
    c1Title.setAttribute("class", "cluster-title");
    c1Title.textContent = "PRIMARY INTERCONNECTED NETWORK · 50 ENTITIES";
    gClusters.appendChild(c1Title);

    // Cluster 2 (Sub-network A: E040-E045)
    var c2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    c2.setAttribute("x", "1380");
    c2.setAttribute("y", "35");
    c2.setAttribute("width", "380");
    c2.setAttribute("height", "490");
    c2.setAttribute("rx", "8");
    c2.setAttribute("class", "cluster-bg");
    gClusters.appendChild(c2);

    var c2Title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    c2Title.setAttribute("x", "1405");
    c2Title.setAttribute("y", "68");
    c2Title.setAttribute("class", "cluster-title");
    c2Title.textContent = "ISOLATED NETWORK A · 6 ENTITIES";
    gClusters.appendChild(c2Title);

    // Cluster 3 (Sub-network B: E057-E060)
    var c3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    c3.setAttribute("x", "1380");
    c3.setAttribute("y", "560");
    c3.setAttribute("width", "380");
    c3.setAttribute("height", "505");
    c3.setAttribute("rx", "8");
    c3.setAttribute("class", "cluster-bg");
    gClusters.appendChild(c3);

    var c3Title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    c3Title.setAttribute("x", "1405");
    c3Title.setAttribute("y", "593");
    c3Title.setAttribute("class", "cluster-title");
    c3Title.textContent = "ISOLATED NETWORK B · 4 ENTITIES";
    gClusters.appendChild(c3Title);

    gZoomGroup.appendChild(gClusters);

    var gEdges = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gEdges.setAttribute("class", "layer-edges");
    gZoomGroup.appendChild(gEdges);

    var gNodes = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gNodes.setAttribute("class", "layer-nodes");
    gZoomGroup.appendChild(gNodes);

    // 1. Trade edges (162)
    (BACKDROP.edges || []).forEach(function(e) {
      var p1 = nodePos[e.from];
      var p2 = nodePos[e.to];
      if (!p1 || !p2) return;

      var val = pairValues[e.from + "->" + e.to] || 0;
      var sw = val > 50000000 ? 2.2 : (val > 10000000 ? 1.4 : 0.7);

      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("stroke-width", sw);
      line.setAttribute("class", "backdrop-edge trade-edge");
      line.setAttribute("data-from", e.from);
      line.setAttribute("data-to", e.to);
      line.setAttribute("data-pair", e.from + "->" + e.to);
      gEdges.appendChild(line);
    });

    // 2. Ring edges (68 distinct hops)
    Object.keys(ringHopsMap).forEach(function(k) {
      var h = ringHopsMap[k];
      var p1 = nodePos[h.from];
      var p2 = nodePos[h.to];
      if (!p1 || !p2) return;

      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("class", h.hop_type === "corporate_bridge" ? "hop-bridge ring-edge" : "ring-edge");
      line.setAttribute("data-from", h.from);
      line.setAttribute("data-to", h.to);
      line.setAttribute("data-pair", h.from + "->" + h.to);
      gEdges.appendChild(line);
    });

    // 3. Director edges (6)
    (BACKDROP.director_edges || []).forEach(function(de) {
      var p1 = nodePos[de.from];
      var p2 = nodePos[de.to];
      if (!p1 || !p2) return;

      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("class", "director-edge");
      line.setAttribute("data-from", de.from);
      line.setAttribute("data-to", de.to);
      line.setAttribute("data-din", de.din);
      gEdges.appendChild(line);
    });

    // 4. Nodes (60)
    var indColors = {
      distribution: "#b6a172",
      manufacturing: "#c17a35",
      trading: "#b5555f",
      services: "#8b93a3"
    };

    BACKDROP.nodes.forEach(function(n) {
      var e = typeof ENTITIES !== "undefined" ? ENTITIES[n.id] : null;
      var st = entityIndex[n.id] || { rings: [], expectedLoss: 0, invoiceValue: 0, invoiceCount: 0 };
      var rCount = st.rings.length;
      var r = Math.max(5.0, Math.min(17.0, 4.5 + Math.sqrt(rCount) * 2.2));
      var fill = indColors[n.industry_class] || "#8b93a3";

      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "ring-node network-node" + (rCount > 0 ? " has-rings" : ""));
      g.setAttribute("data-id", n.id);
      g.setAttribute("data-industry", n.industry_class);

      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", n.x);
      circle.setAttribute("cy", n.y);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", fill);
      if (rCount > 0) {
        circle.setAttribute("class", "node-circle");
      } else {
        circle.setAttribute("class", "backdrop-node");
        circle.setAttribute("stroke", "rgba(255,255,255,0.18)");
        circle.setAttribute("stroke-width", "1");
      }
      g.appendChild(circle);

      var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = (e ? e.name : n.id) + " (" + n.id + ")\n" +
        "Industry: " + n.industry_class.toUpperCase() + "\n" +
        "Flagged Rings: " + rCount + "\n" +
        "Expected Loss: " + fmtRupees(st.expectedLoss, false) + "\n" +
        "Observed Volume: " + fmtRupees(st.invoiceValue, false);
      g.appendChild(title);

      // Render crisp entity ID label for hub nodes only (ringCount >= 5) (B2)
      if (rCount >= 5) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", n.x);
        text.setAttribute("y", n.y - r - 4);
        text.setAttribute("class", "node-label");
        text.setAttribute("text-anchor", "middle");
        text.textContent = n.id;
        g.appendChild(text);
      }

      gNodes.appendChild(g);
    });

    // --- INTERACTIVE PAN & ZOOM ---
    var zoomLevel = 1.0;
    var panX = 0;
    var panY = 0;
    var isPanning = false;
    var startMouseX = 0;
    var startMouseY = 0;
    var startPanX = 0;
    var startPanY = 0;

    function applyTransform() {
      if (gZoomGroup) {
        gZoomGroup.setAttribute("transform", "translate(" + panX.toFixed(1) + "," + panY.toFixed(1) + ") scale(" + zoomLevel.toFixed(3) + ")");
      }
      var valEl = document.getElementById("net-zoom-val");
      if (valEl) {
        valEl.textContent = Math.round(zoomLevel * 100) + "%";
      }
    }

    function setZoom(newZoom, originX, originY) {
      var clamped = Math.max(0.4, Math.min(3.5, newZoom));
      if (originX !== undefined && originY !== undefined) {
        var scaleRatio = clamped / zoomLevel;
        panX = originX - (originX - panX) * scaleRatio;
        panY = originY - (originY - panY) * scaleRatio;
      }
      zoomLevel = clamped;
      applyTransform();
    }

    var btnZoomIn = document.getElementById("net-zoom-in");
    if (btnZoomIn) btnZoomIn.onclick = function() { setZoom(zoomLevel * 1.25, 900, 550); };

    var btnZoomOut = document.getElementById("net-zoom-out");
    if (btnZoomOut) btnZoomOut.onclick = function() { setZoom(zoomLevel / 1.25, 900, 550); };

    var btnZoomReset = document.getElementById("net-zoom-reset");
    if (btnZoomReset) btnZoomReset.onclick = function() {
      zoomLevel = 1.0;
      panX = 0;
      panY = 0;
      applyTransform();
    };

    svg.onwheel = function(e) {
      e.preventDefault();
      var rect = svg.getBoundingClientRect();
      var mouseSvgX = ((e.clientX - rect.left) / rect.width) * 1800;
      var mouseSvgY = ((e.clientY - rect.top) / rect.height) * 1100;
      var factor = e.deltaY < 0 ? 1.15 : 0.87;
      setZoom(zoomLevel * factor, mouseSvgX, mouseSvgY);
    };

    svg.onmousedown = function(e) {
      if (e.target.closest && e.target.closest(".network-node")) return;
      isPanning = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startPanX = panX;
      startPanY = panY;
      svg.style.cursor = "grabbing";
    };

    window.addEventListener("mousemove", function(e) {
      if (!isPanning) return;
      var rect = svg.getBoundingClientRect();
      var scaleX = 1800 / (rect.width || 1800);
      var scaleY = 1100 / (rect.height || 1100);
      panX = startPanX + (e.clientX - startMouseX) * scaleX;
      panY = startPanY + (e.clientY - startMouseY) * scaleY;
      applyTransform();
    });

    window.addEventListener("mouseup", function() {
      if (isPanning) {
        isPanning = false;
        svg.style.cursor = "default";
      }
    });

    // Interaction functions
    var activeFocusNode = null;

    function resetFocus() {
      activeFocusNode = null;
      svg.querySelectorAll(".network-node").forEach(function(el) {
        el.classList.remove("selected", "node-dimmed");
      });
      svg.querySelectorAll("line").forEach(function(el) {
        el.classList.remove("edge-dimmed", "edge-connected");
      });
      if (rail) {
        rail.classList.add("hidden");
        rail.innerHTML = "";
      }
      if (ringSelect) ringSelect.value = "";
    }
    window.resetNetworkFocus = resetFocus;

    function highlightNode(entityId) {
      activeFocusNode = entityId;
      var e = typeof ENTITIES !== "undefined" ? ENTITIES[entityId] : null;
      if (!e) return;
      var st = entityIndex[entityId] || { rings: [], expectedLoss: 0, invoiceValue: 0, invoiceCount: 0, aggSum: 0 };

      // Find neighbors
      var neighbors = {};
      neighbors[entityId] = true;
      svg.querySelectorAll("line").forEach(function(line) {
        var from = line.getAttribute("data-from");
        var to = line.getAttribute("data-to");
        if (from === entityId) {
          neighbors[to] = true;
          line.classList.remove("edge-dimmed");
          line.classList.add("edge-connected");
        } else if (to === entityId) {
          neighbors[from] = true;
          line.classList.remove("edge-dimmed");
          line.classList.add("edge-connected");
        } else {
          line.classList.add("edge-dimmed");
          line.classList.remove("edge-connected");
        }
      });

      svg.querySelectorAll(".network-node").forEach(function(nodeEl) {
        var id = nodeEl.getAttribute("data-id");
        if (id === entityId) {
          nodeEl.classList.add("selected");
          nodeEl.classList.remove("node-dimmed");
        } else if (neighbors[id]) {
          nodeEl.classList.remove("node-dimmed", "selected");
        } else {
          nodeEl.classList.add("node-dimmed");
          nodeEl.classList.remove("selected");
        }
      });

      // Populate Rail
      if (rail) {
        rail.classList.remove("hidden");
        var avgAgg = st.rings.length > 0 ? (st.aggSum / st.rings.length).toFixed(2) : "—";
        var rHtml = "";
        rHtml += "<div class='detail-header'>";
        rHtml += "<div class='detail-title'>" + e.name + " <span class='mono' style='font-size:var(--fs-micro); color:var(--paper-muted);'>(" + entityId + ")</span></div>";
        rHtml += "<div class='detail-subtitle'>INDUSTRY: " + (e.industry_class || "").toUpperCase() + " | NIC: " + (e.industry_code || "N/A") + "</div>";
        rHtml += "</div>";

        rHtml += "<div class='trail-stat-group' style='margin-bottom:12px;'>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>INVOICES</span><span class='ts-val mono num'>" + st.invoiceCount + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>RINGS</span><span class='ts-val mono num' style='" + (st.rings.length > 0 ? "color:var(--blood); font-weight:700;" : "") + "'>" + st.rings.length + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>EXP LOSS</span><span class='ts-val risk mono num'>" + fmtRupees(st.expectedLoss, true) + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>AVG AGG</span><span class='ts-val mono num'>" + avgAgg + "</span></div>";
        rHtml += "</div>";

        if (st.rings.length > 0) {
          rHtml += "<div class='rail-section'><h4>Flagged Rings (" + st.rings.length + ")</h4><div style='display:flex; flex-wrap:wrap; gap:6px;'>";
          st.rings.forEach(function(rId) {
            rHtml += "<button class='btn' onclick='window.viewRing(\"" + rId + "\")'>" + rId + "</button>";
          });
          rHtml += "</div></div>";
        }

        // Top 5 counterparties
        var cpMap = {};
        Object.values(allInvoices).forEach(function(inv) {
          if (inv.from === entityId) cpMap[inv.to] = (cpMap[inv.to] || 0) + (inv.value || 0);
          if (inv.to === entityId) cpMap[inv.from] = (cpMap[inv.from] || 0) + (inv.value || 0);
        });
        var sortedCps = Object.keys(cpMap).sort(function(a, b) { return cpMap[b] - cpMap[a]; }).slice(0, 5);
        if (sortedCps.length > 0) {
          rHtml += "<div class='rail-section'><h4>Top Trade Counterparties</h4><div style='display:flex; flex-direction:column; gap:6px;'>";
          sortedCps.forEach(function(cpId) {
            var cpE = ENTITIES[cpId];
            var cpName = cpE ? cpE.name : "Unknown";
            rHtml += "<div style='display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:var(--fs-micro);'>" +
              "<span class='clickable' onclick='window.highlightNetworkNode(\"" + cpId + "\")' style='color:var(--seal);'>" + cpId + " " + cpName + "</span>" +
              "<span class='mono num'>" + fmtRupees(cpMap[cpId], true) + "</span>" +
              "</div>";
          });
          rHtml += "</div></div>";
        }

        // Corporate director links
        var coLinks = [];
        if (e.directors) {
          e.directors.forEach(function(d) {
            Object.values(ENTITIES).forEach(function(other) {
              if (other.id !== entityId && other.directors && other.directors.indexOf(d) !== -1) {
                coLinks.push({ din: d, otherId: other.id, otherName: other.name });
              }
            });
          });
        }
        if (coLinks.length > 0) {
          rHtml += "<div class='rail-section'><h4>Shared Director Relationships</h4><div style='display:flex; flex-direction:column; gap:6px;'>";
          coLinks.forEach(function(cl) {
            rHtml += "<div style='font-size:var(--fs-micro); font-family:var(--font-mono);'>" +
              "<span class='ti-badge corp' style='margin-right:6px;'>DIN " + cl.din + "</span>" +
              "<span class='clickable' onclick='window.highlightNetworkNode(\"" + cl.otherId + "\")' style='color:var(--amber);'>" + cl.otherId + " " + cl.otherName + "</span>" +
              "</div>";
          });
          rHtml += "</div></div>";
        }

        rHtml += "<div style='margin-top:12px; display:flex; gap:8px;'>";
        rHtml += "<button class='btn primary-action' style='flex:1;' onclick='window.openEntity(\"" + entityId + "\")'>VIEW FULL DETAIL</button>";
        rHtml += "<button class='btn' onclick='window.resetNetworkFocus()'>CLOSE RAIL</button>";
        rHtml += "</div>";

        rail.innerHTML = rHtml;
      }
    }
    window.highlightNetworkNode = highlightNode;

    function highlightRing(ringId) {
      if (!ringId) {
        resetFocus();
        return;
      }
      var ring = (SCORED.rings || []).find(function(r) { return r.ring_id === ringId; });
      if (!ring) return;

      var ringEnts = {};
      (ring.entities || []).forEach(function(id) { ringEnts[id] = true; });

      var ringHopPairs = {};
      (ring.hops || []).forEach(function(h) {
        ringHopPairs[h.from + "->" + h.to] = true;
      });

      svg.querySelectorAll(".network-node").forEach(function(nodeEl) {
        var id = nodeEl.getAttribute("data-id");
        if (ringEnts[id]) {
          nodeEl.classList.remove("node-dimmed");
          nodeEl.classList.add("selected");
        } else {
          nodeEl.classList.add("node-dimmed");
          nodeEl.classList.remove("selected");
        }
      });

      svg.querySelectorAll("line").forEach(function(line) {
        var from = line.getAttribute("data-from");
        var to = line.getAttribute("data-to");
        if (ringHopPairs[from + "->" + to]) {
          line.classList.remove("edge-dimmed");
          line.classList.add("edge-connected");
        } else {
          line.classList.add("edge-dimmed");
          line.classList.remove("edge-connected");
        }
      });

      if (rail) {
        rail.classList.remove("hidden");
        var rHtml = "<div class='detail-header'>";
        rHtml += "<div class='detail-title'>" + ring.ring_id + " <span class='rh-type' style='font-size:var(--fs-micro); margin-left:6px;'>" + ring.closure_type.toUpperCase() + "</span></div>";
        rHtml += "<div class='detail-subtitle'>CANONICAL: " + (ring.canonical_key || "") + "</div>";
        rHtml += "</div>";

        rHtml += "<div class='trail-stat-group' style='margin-bottom:12px;'>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>EXPECTED LOSS</span><span class='ts-val risk mono num'>" + fmtRupees(ring.expected_loss, true) + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>AGGREGATE</span><span class='ts-val mono num'>" + (ring.aggregate||0).toFixed(2) + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>ENTITIES</span><span class='ts-val mono num'>" + (ring.entities||[]).length + "</span></div>";
        rHtml += "<div class='trail-stat'><span class='ts-label'>HOPS</span><span class='ts-val mono num'>" + (ring.hops||[]).length + "</span></div>";
        rHtml += "</div>";

        rHtml += "<div class='rail-section'><h4>Component Signals</h4>";
        var sc = ring.scores || {};
        SIGNALS.forEach(function(sig) {
          var val = sc[sig];
          var valStr = val !== null && val !== undefined ? val.toFixed(2) : "Abstained";
          rHtml += "<div class='score-row' style='margin-bottom:4px;'><span class='sig-name' style='text-transform:uppercase;'>" + sig + "</span><span class='mono num' style='text-align:right; font-weight:600;'>" + valStr + "</span></div>";
        });
        rHtml += "</div>";

        if (ring.evidence) {
          rHtml += "<div class='rail-section'><h4>Forensic Evidence Strings</h4><div style='display:flex; flex-direction:column; gap:6px; font-size:var(--fs-micro);'>";
          for (var evKey in ring.evidence) {
            rHtml += "<div><span class='mono' style='color:var(--paper-muted); font-weight:600; text-transform:uppercase;'>" + evKey + ":</span> " + ring.evidence[evKey] + "</div>";
          }
          rHtml += "</div></div>";
        }

        rHtml += "<div style='margin-top:12px; display:flex; gap:8px;'>";
        rHtml += "<button class='btn primary-action' style='flex:1;' onclick='window.viewRing(\"" + ring.ring_id + "\")'>VIEW IN QUEUE</button>";
        rHtml += "<button class='btn' onclick='window.resetNetworkFocus()'>RESET VIEW</button>";
        rHtml += "</div>";

        rail.innerHTML = rHtml;
      }
    }

    // Node hover & click listeners
    svg.querySelectorAll(".network-node").forEach(function(nodeEl) {
      var id = nodeEl.getAttribute("data-id");
      nodeEl.addEventListener("mouseenter", function() {
        if (activeFocusNode || (ringSelect && ringSelect.value)) return;
        svg.querySelectorAll("line").forEach(function(line) {
          var from = line.getAttribute("data-from");
          var to = line.getAttribute("data-to");
          if (from === id || to === id) {
            line.classList.remove("edge-dimmed");
            line.classList.add("edge-connected");
          } else {
            line.classList.add("edge-dimmed");
          }
        });
      });
      nodeEl.addEventListener("mouseleave", function() {
        if (activeFocusNode || (ringSelect && ringSelect.value)) return;
        svg.querySelectorAll("line").forEach(function(line) {
          line.classList.remove("edge-dimmed", "edge-connected");
        });
      });
      nodeEl.addEventListener("click", function(ev) {
        ev.stopPropagation();
        highlightNode(id);
      });
    });

    // Control bar listeners
    if (ringSelect) {
      ringSelect.onchange = function() {
        highlightRing(ringSelect.value);
      };
    }

    if (indSelect) {
      indSelect.onchange = function() {
        var ind = indSelect.value;
        svg.querySelectorAll(".network-node").forEach(function(nodeEl) {
          var nodeInd = nodeEl.getAttribute("data-industry");
          if (ind === "all" || nodeInd === ind) {
            nodeEl.classList.remove("node-dimmed");
          } else {
            nodeEl.classList.add("node-dimmed");
          }
        });
      };
    }

    if (btnTrade) {
      btnTrade.onclick = function() {
        var isPressed = btnTrade.getAttribute("aria-pressed") === "true";
        btnTrade.setAttribute("aria-pressed", !isPressed ? "true" : "false");
        btnTrade.classList.toggle("active", !isPressed);
        svg.classList.toggle("hide-trade", isPressed);
      };
    }

    if (btnCorp) {
      btnCorp.onclick = function() {
        var isPressed = btnCorp.getAttribute("aria-pressed") === "true";
        btnCorp.setAttribute("aria-pressed", !isPressed ? "true" : "false");
        btnCorp.classList.toggle("active", !isPressed);
        svg.classList.toggle("hide-corporate", isPressed);
      };
    }

    if (btnFlagged) {
      btnFlagged.onclick = function() {
        var isPressed = btnFlagged.getAttribute("aria-pressed") === "true";
        btnFlagged.setAttribute("aria-pressed", !isPressed ? "true" : "false");
        btnFlagged.classList.toggle("active", !isPressed);
        svg.classList.toggle("flagged-only", !isPressed);
      };
    }

    if (btnReset) {
      btnReset.onclick = function() {
        resetFocus();
        if (indSelect) indSelect.value = "all";
        svg.classList.remove("hide-trade", "hide-corporate", "flagged-only");
        if (btnTrade) { btnTrade.setAttribute("aria-pressed", "true"); btnTrade.classList.add("active"); }
        if (btnCorp) { btnCorp.setAttribute("aria-pressed", "true"); btnCorp.classList.add("active"); }
        if (btnFlagged) { btnFlagged.setAttribute("aria-pressed", "false"); btnFlagged.classList.remove("active"); }
        svg.querySelectorAll(".network-node").forEach(function(el) { el.classList.remove("node-dimmed", "selected"); });
      };
    }
  }

  setupTabs();
  renderLedger();
  renderDirectory();
  renderNetwork();
  render();

  // --- PHASE 7 ADDITIONS ---

  // B2 — Guide Me tour: six-step walkthrough with spotlight + coach card
  function setupTour() {
    var overlay = document.getElementById("tour-overlay");
    var spotlight = document.getElementById("tour-spotlight");
    var card = document.getElementById("tour-card");
    var counterEl = document.getElementById("tour-counter");
    var titleEl = document.getElementById("tour-title");
    var bodyEl = document.getElementById("tour-body");
    var backBtn = document.getElementById("tour-back");
    var nextBtn = document.getElementById("tour-next");
    var skipBtn = document.getElementById("tour-skip");
    var guideBtn = document.getElementById("guide-me-btn");
    if (!overlay || !card) return;

    // Derive top ring from the sorted queue (first card)
    function topRingId() {
      if (typeof SCORED === "undefined" || !SCORED.rings || !SCORED.rings.length) return null;
      var sorted = SCORED.rings.slice().sort(function(a, b) {
        return (b.expected_loss || 0) - (a.expected_loss || 0);
      });
      return sorted[0].ring_id;
    }

    var STEPS = [
      {
        stage: null,
        targetSelector: null,
        title: "Welcome to Circe",
        body: "Circe helps financial investigators detect <strong>circular invoice fraud</strong> — where businesses pass the same money in circles to artificially inflate credit.<br><br>The top navigation bar organizes your investigation into <strong>4 connected modules</strong>: Review, Explore, Entities, and Verify."
      },
      {
        stage: "view-queue",
        targetSelector: null, // set dynamically to the top ring card
        title: "01 · Ring Review (Triage Queue)",
        body: "Your prioritized action inbox. The <strong>5 critical fraud rings</strong> appear right here, ranked by total financial risk.<br><br><strong>What to do:</strong> Click any card to expand it. You can inspect the loop graph, 4 score breakdown bars, and invoice-by-invoice transaction trail."
      },
      {
        stage: "view-network",
        targetSelector: "#net-ring-select",
        title: "02 · Interconnection Map",
        body: "A visual bird's-eye view of all 60 companies.<br><br>• <strong>Scroll to zoom</strong> and <strong>drag to pan</strong>.<br>• <strong>Red lines</strong> show circular fraud; <strong>dashed gold lines</strong> show shared directors.<br>• <strong>Click any node</strong> to see its counterparty exposure in the right rail."
      },
      {
        stage: "view-directory",
        targetSelector: "#directory-body",
        title: "03 · Entity Directory",
        body: "A directory of every business in the dataset.<br><br>Companies with high <strong>RINGS</strong> count are key hub orchestrators.<br><br><strong>What to do:</strong> Click any company name to open its complete corporate dossier, GSTIN details, and full trade network."
      },
      {
        stage: "view-ledger",
        targetSelector: ".ledger-header-strip",
        title: "04 · Invoice Ledger & Testing",
        body: "Audit raw invoice records and test new intelligence.<br><br>Search or filter invoices by seller, buyer, or HS commodity code. Click <strong>+ ADD INVOICE</strong> to input a new document — the backend will instantly <strong>re-run detection</strong> across the platform!"
      },
      {
        stage: null,
        targetSelector: null,
        title: "Quick Tips for Navigating",
        body: "• <strong>Glossary:</strong> Hover over any underlined term for an instant explanation.<br>• <strong>Return to Intro:</strong> Click the animated <strong>Circe</strong> logo in the top-left anytime to return to the constellation screen.<br>• <strong>Reopen Guide:</strong> Click <strong>GUIDE ME</strong> anytime to review these steps."
      }
    ];

    var currentStep = 0;
    var resizeTimer;

    function measureTarget(sel) {
      if (!sel) return null;
      var el = document.querySelector(sel);
      if (!el) return null;
      el.scrollIntoView({ block: "center" });
      return el.getBoundingClientRect();
    }

    function positionSpotlight(rect) {
      var pad = 6;
      if (!rect) {
        // No target — hide spotlight, centre card
        spotlight.style.display = "none";
        card.classList.add("center");
        return;
      }
      card.classList.remove("center");
      spotlight.style.display = "block";
      spotlight.style.top = (rect.top - pad) + "px";
      spotlight.style.left = (rect.left - pad) + "px";
      spotlight.style.width = (rect.width + pad * 2) + "px";
      spotlight.style.height = (rect.height + pad * 2) + "px";
    }

    function showStep(n) {
      var step = STEPS[n];
      counterEl.textContent = (n + 1) + " / " + STEPS.length;
      titleEl.textContent = step.title;
      bodyEl.innerHTML = step.body;
      backBtn.disabled = (n === 0);
      nextBtn.textContent = (n === STEPS.length - 1) ? "FINISH" : "NEXT";

      // Switch stage
      if (step.stage) {
        var tabBtn = document.querySelector(".tab-btn[data-target='" + step.stage + "']");
        if (tabBtn) tabBtn.click();
      }

      // Step 1: expand top ring card
      var sel = step.targetSelector;
      if (n === 1) {
        var tid = topRingId();
        if (tid) {
          sel = "#" + tid;
          window.viewRing(tid);
        }
      }
      // Step 2: set network ring selector
      if (n === 2) {
        var tid = topRingId();
        var rs = document.getElementById("net-ring-select");
        if (rs && tid) {
          rs.value = tid;
          rs.dispatchEvent(new Event("change"));
        }
      }

      // Wait one frame for DOM changes then measure
      setTimeout(function() {
        var rect = measureTarget(sel);
        positionSpotlight(rect);
      }, 100);
    }

    function tourStart() {
      currentStep = 0;
      overlay.classList.remove("hidden");
      overlay.classList.add("active");
      showStep(0);
    }

    function tourEnd(markSeen) {
      overlay.classList.add("hidden");
      overlay.classList.remove("active");
      spotlight.style.display = "none";
      if (markSeen) {
        try { localStorage.setItem("circe_guide_seen", "1"); } catch(e) {}
      }
    }

    nextBtn.addEventListener("click", function() {
      if (currentStep >= STEPS.length - 1) {
        tourEnd(true);
        return;
      }
      currentStep++;
      showStep(currentStep);
    });

    backBtn.addEventListener("click", function() {
      if (currentStep <= 0) return;
      currentStep--;
      showStep(currentStep);
    });

    skipBtn.addEventListener("click", function() { tourEnd(true); });

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
        tourEnd(true);
      }
    });

    window.addEventListener("resize", function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (!overlay.classList.contains("hidden")) showStep(currentStep);
      }, 150);
    });

    if (guideBtn) guideBtn.addEventListener("click", tourStart);

    // window.initializeCirce — already wired in constellation.js:103; auto-start tour on first visit
    window.initializeCirce = function() {
      try {
        if (!localStorage.getItem("circe_guide_seen")) {
          setTimeout(tourStart, 400);
        }
      } catch(e) {}
    };
  }

  // C2 — Live rescore API: progressive enhancement, no-ops gracefully when server absent
  function setupRescore() {
    var HEALTH_URL = "/api/health";
    var RESCORE_URL = "/api/rescore";
    var banner = document.getElementById("rescore-banner");
    var addInvForm = document.querySelector(".form-scope-note");

    // Probe health — short timeout so file:// fails fast
    var ctrl = new (window.AbortController || function() {
      var c = {}; c.signal = {}; c.abort = function() {};  return c;
    })();
    var tid = setTimeout(function() { try { ctrl.abort(); } catch(e) {} }, 2000);

    fetch(HEALTH_URL, { signal: ctrl.signal })
      .then(function(r) {
        clearTimeout(tid);
        if (!r.ok) throw new Error("unhealthy");
        return r.json();
      })
      .then(function() {
        // Server is live — wire up the rescore button
        if (addInvForm) {
          addInvForm.innerHTML =
            "Adding an invoice updates the ledger and entity views. " +
            "<button id='rescore-btn' class='btn primary-action' style='margin-left:8px;font-size:var(--fs-micro);'>RE-RUN DETECTION</button>";
          document.getElementById("rescore-btn").addEventListener("click", doRescore);
        }
      })
      .catch(function() {
        // file:// or server absent — keep static fallback, hide rescore affordance entirely
      });

    function doRescore() {
      var btn = document.getElementById("rescore-btn");
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "<span id='rescore-spinner'></span> SCORING…";
      }

      var investigatorInvoices = Object.values(window.INVESTIGATOR_INVOICES || {}).map(function(inv) {
        return {
          invoice_id: inv.invoice_id,
          from: inv.from,
          to: inv.to,
          value: Math.round(inv.value),
          hs_code: inv.hs_code || null,
          invoice_date: inv.invoice_date,
          discounting_date: inv.discounting_date || inv.invoice_date
        };
      });

      fetch(RESCORE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investigator_invoices: investigatorInvoices })
      })
      .then(function(r) {
        return r.json().then(function(data) {
          if (!r.ok) throw new Error(JSON.stringify(data));
          return data;
        });
      })
      .then(function(data) {
        // Re-render with new scores
        window.SCORED = data;
        var root = document.getElementById("queue");
        var statsRoot = document.getElementById("stats");
        if (root) root.innerHTML = "";
        if (statsRoot) statsRoot.innerHTML = "";
        render();
        // Show banner
        if (banner) {
          var n = investigatorInvoices.length;
          banner.style.display = "block";
          banner.textContent = "Results now include " + n + " investigator invoice" + (n !== 1 ? "s" : "") + ".";
        }
        if (btn) { btn.disabled = false; btn.innerHTML = "RE-RUN DETECTION"; }
        // Close modal
        var modal = document.getElementById("add-invoice-modal");
        if (modal) modal.classList.remove("open");
      })
      .catch(function(err) {
        if (btn) { btn.disabled = false; btn.innerHTML = "RE-RUN DETECTION"; }
        alert("Rescore failed: " + err.message);
      });
    }
  }

  var brandHomeBtn = document.getElementById("brand-home-btn");
  if (brandHomeBtn) {
    brandHomeBtn.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (window.returnToLanding) window.returnToLanding();
      }
    });
  }

  setupTour();
  setupRescore();

})();

