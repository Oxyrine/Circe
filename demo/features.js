(function() {
    console.log("Ouroboros Features Module Initialized.");

    var NS = "http://www.w3.org/2000/svg";

    // --- UTILS ---
    function fmtRupees(n) {
        if (!n) return "0";
        var x = n.toString();
        var afterPoint = '';
        if(x.indexOf('.') > 0) {
           afterPoint = x.substring(x.indexOf('.'), x.length);
           x = x.substring(0, x.indexOf('.'));
        }
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0, x.length-3);
        if(otherNumbers != '') lastThree = ',' + lastThree;
        return '₹' + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    }

    // --- FEATURE 1: OVERRIDE ENTITY MODAL ---
    // Wait for app.js to initialize window.openEntity, then override it
    setTimeout(function() {
        var origOpenEntity = window.openEntity;
        window.openEntity = function(entityId) {
            var e = typeof ENTITIES !== 'undefined' ? ENTITIES[entityId] : null;
            if (!e) return;
            
            document.getElementById("entity-modal-title").innerHTML = "ENTITY <span class='mono' style='color:var(--text-main); margin-left:8px;'>" + entityId + "</span>";
            
            // Risk Rollup
            var rings = typeof SCORED !== "undefined" && SCORED.rings ? SCORED.rings.filter(function(r) {
                return (r.entities || []).indexOf(entityId) !== -1;
            }) : [];
            
            var totalExposure = rings.reduce((acc, r) => acc + (r.expected_loss || 0), 0);
            var avgScore = rings.length > 0 ? (rings.reduce((acc, r) => acc + (r.aggregate_score || 0), 0) / rings.length).toFixed(1) : "0.0";
            
            // Co-Linked Discovery
            var coLinked = [];
            if (e.directors && e.directors.length > 0) {
                Object.values(ENTITIES).forEach(function(other) {
                    if (other.id === entityId) return;
                    if (other.directors) {
                        var shared = other.directors.filter(d => e.directors.includes(d));
                        if (shared.length > 0) {
                            coLinked.push({ id: other.id, name: other.name, shared: shared });
                        }
                    }
                });
            }

            var html = "<div class='detail-header'>";
            html += "<div class='detail-title'>" + e.name + "</div>";
            if (e.industry_class) html += "<div class='detail-subtitle'>INDUSTRY CLASS: " + e.industry_class.toUpperCase() + "</div>";
            html += "</div>";
            
            html += "<div class='trail-header' style='margin-bottom:24px;'>";
            html += "<div class='trail-stat-group'>";
            html += "<div class='trail-stat'><span class='ts-label'>RINGS FLAGGED</span><span class='ts-val mono risk'>" + rings.length + "</span></div>";
            html += "<div class='trail-stat'><span class='ts-label'>AVG RING SCORE</span><span class='ts-val mono risk'>" + avgScore + "</span></div>";
            html += "<div class='trail-stat'><span class='ts-label'>EXPECTED LOSS</span><span class='ts-val mono'>₹" + (totalExposure/10000000).toFixed(2) + " Cr</span></div>";
            html += "</div></div>";

            html += "<div class='detail-grid'>";
            html += "<div class='detail-section'><h3>REGISTRATION & DETAILS</h3>";
            html += "<div class='detail-row'><span class='detail-label'>INDUSTRY CODE</span><span class='detail-value'>" + (e.industry_code || "N/A") + "</span></div>";
            html += "<div class='detail-row'><span class='detail-label'>REGISTRATION</span><span class='detail-value'>" + (e.registration_date || "N/A") + "</span></div>";
            if (e.address) {
                html += "<div style='margin-top:12px; font-size:10px; color:var(--text-muted);'>" + e.address.toUpperCase() + "</div>";
            }
            html += "</div>";

            html += "<div class='detail-section'><h3>DIRECTORS</h3>";
            if (e.directors && e.directors.length > 0) {
                e.directors.forEach(function(d) {
                    html += "<div class='detail-row'><span class='detail-label'>DIN</span><span class='detail-value'>" + d + "</span></div>";
                });
            } else {
                html += "<div class='detail-row'><span class='detail-label'>DIRECTORS</span><span class='detail-value'>N/A</span></div>";
            }
            html += "</div></div>";
            
            // Co-Linked Discovery Section
            if (coLinked.length > 0) {
                html += "<div class='detail-section' style='margin-bottom:24px;'><h3>CO-LINKED ENTITIES (SHARED DIRECTORS)</h3>";
                html += "<div style='display:flex; flex-direction:column; gap:8px;'>";
                coLinked.forEach(function(cl) {
                    html += `<div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border:1px solid var(--border-muted); border-radius:4px; cursor:pointer;" onclick="window.openEntity('${cl.id}')">`;
                    html += `<div><div class="mono" style="color:var(--text-main); font-size:12px;">${cl.id}</div><div style="color:var(--text-muted); font-size:10px;">${cl.name}</div></div>`;
                    html += `<div style="color:var(--warn-amber); font-size:10px;">SHARED: ${cl.shared.join(', ')}</div>`;
                    html += `</div>`;
                });
                html += "</div></div>";
            }

            // Flagged in Rings Jump Buttons
            if (rings.length > 0) {
                html += "<div class='detail-section' style='margin-bottom:24px;'><h3>FLAGGED IN RINGS</h3>";
                html += "<div style='display:flex; flex-wrap:wrap; gap:8px;'>";
                rings.forEach(function(r) {
                    html += `<button class="btn" style="border:1px solid var(--risk-coral); color:var(--risk-coral);" onclick="window.viewRing('${r.ring_id}')">${r.ring_id}</button>`;
                });
                html += "</div></div>";
            }

            document.getElementById("entity-modal-body").innerHTML = html;
            document.getElementById("invoice-modal").classList.add("hidden");
            document.getElementById("entity-modal").classList.remove("hidden");
        };
    }, 500);

    // --- FEATURE 3: ENTITY DIRECTORY ---
    function renderDirectory() {
        var tbody = document.getElementById("directory-tbody");
        if(!tbody) return;
        
        var query = (document.getElementById("dir-search")?.value || "").toLowerCase();
        
        var rows = Object.values(ENTITIES).map(function(e) {
            var invCount = Object.values(INVOICES).filter(i => i.from === e.id || i.to === e.id).length;
            var ringCount = SCORED.rings.filter(r => (r.entities||[]).includes(e.id)).length;
            var exp = SCORED.rings.filter(r => (r.entities||[]).includes(e.id)).reduce((acc, r) => acc + (r.expected_loss||0), 0);
            return {
                e: e,
                invCount: invCount,
                ringCount: ringCount,
                exp: exp,
                expStr: "₹" + (exp/10000000).toFixed(2) + " Cr",
                matchStr: (e.id + " " + e.name + " " + (e.directors||[]).join(" ")).toLowerCase()
            };
        });

        if (query) {
            rows = rows.filter(r => r.matchStr.includes(query));
        }

        // Default sort by Exposure DESC
        rows.sort((a,b) => b.exp - a.exp);

        var html = "";
        rows.forEach(function(r) {
            html += `<tr style="cursor:pointer;" onclick="window.openEntity('${r.e.id}')">
                <td class="mono" style="color:var(--text-main);">${r.e.id}</td>
                <td>${r.e.name}</td>
                <td style="color:var(--text-muted); text-transform:uppercase; font-size:10px;">${r.e.industry_class||'N/A'}</td>
                <td class="mono" style="font-size:10px;">${(r.e.directors||[]).join(', ')}</td>
                <td class="mono" style="text-align:right;">${r.invCount}</td>
                <td class="mono risk" style="text-align:right;">${r.ringCount}</td>
                <td class="mono" style="text-align:right;">${r.expStr}</td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }
    
    setTimeout(function() {
        var searchEl = document.getElementById("dir-search");
        if(searchEl) searchEl.addEventListener("input", renderDirectory);
        renderDirectory();
    }, 500);

    // --- FEATURE 4: LEDGER ANALYTICS STRIP ---
    // Monkey patch renderLedger to also update analytics
    setTimeout(function() {
        if(typeof window.renderLedger === 'function') {
            var origRender = window.renderLedger;
            window.renderLedger = function() {
                origRender();
                updateAnalytics();
            }
        }
    }, 500);

    function updateAnalytics() {
        // Need to grab the currently filtered invoices. 
        // We'll mimic the logic in renderLedger to get the filtered set.
        var q = document.getElementById("ledger-search") ? document.getElementById("ledger-search").value.trim().toLowerCase() : "";
        var minA = parseFloat(document.getElementById("filter-min-amount") ? document.getElementById("filter-min-amount").value : 0) || 0;
        
        var allInv = typeof getAllInvoices === "function" ? getAllInvoices() : INVOICES;
        var filtered = Object.values(allInv).filter(function(i) {
            if (minA > 0 && i.value < minA) return false;
            if (q) {
                var sellerName = (ENTITIES[i.from]||{}).name||""; var buyerName = (ENTITIES[i.to]||{}).name||""; var s = (i.invoice_id + " " + i.from + " " + sellerName + " " + i.to + " " + buyerName + " " + (i.hs_code||"")).toLowerCase();
                if (s.indexOf(q) === -1) return false;
            }
            return true;
        });

        // 1. Value by Industry
        var indMap = {};
        filtered.forEach(function(i) {
            var e = ENTITIES[i.from];
            if(e && e.industry_class) {
                indMap[e.industry_class] = (indMap[e.industry_class] || 0) + (i.value||0);
            }
        });
        var indList = Object.keys(indMap).map(k => ({k:k, v:indMap[k]})).sort((a,b)=>b.v-a.v).slice(0,4);
        var indHtml = "";
        var maxInd = indList.length > 0 ? indList[0].v : 1;
        indList.forEach(function(item) {
            var pct = (item.v / maxInd) * 100;
            indHtml += `<div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-main); text-transform:uppercase;"><span>${item.k}</span><span class="mono">₹${(item.v/10000000).toFixed(1)}Cr</span></div>
                        <div style="width:100%; height:4px; background:var(--border-muted); margin-bottom:4px; border-radius:2px;"><div style="width:${pct}%; height:100%; background:var(--accent-teal); border-radius:2px;"></div></div>`;
        });
        document.getElementById("analytics-industry").innerHTML = indHtml || "<span style='color:var(--text-muted); font-size:10px;'>No data</span>";

        // 2. Top HS Codes
        var hsMap = {};
        filtered.forEach(function(i) {
            if(i.hs_code) hsMap[i.hs_code] = (hsMap[i.hs_code] || 0) + (i.value||0);
        });
        var hsList = Object.keys(hsMap).map(k => ({k:k, v:hsMap[k]})).sort((a,b)=>b.v-a.v).slice(0,4);
        var hsHtml = hsList.map(item => `<div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-main); border-bottom:1px solid var(--border-muted); padding-bottom:4px;"><span>HS-${item.k}</span><span class="mono">₹${(item.v/10000000).toFixed(1)}Cr</span></div>`).join('');
        document.getElementById("analytics-hs").innerHTML = hsHtml || "<span style='color:var(--text-muted); font-size:10px;'>No data</span>";

        // 3. Financing Lag
        var lagMap = {"0-7d":0, "8-14d":0, "15-30d":0, "30d+":0};
        filtered.forEach(function(i) {
            if(i.invoice_date && i.financing_date) {
                var d1 = new Date(i.invoice_date);
                var d2 = new Date(i.financing_date);
                var diff = Math.floor((d2-d1)/(1000*60*60*24));
                if(diff <= 7) lagMap["0-7d"]++;
                else if(diff <= 14) lagMap["8-14d"]++;
                else if(diff <= 30) lagMap["15-30d"]++;
                else lagMap["30d+"]++;
            }
        });
        var maxLag = Math.max(...Object.values(lagMap), 1);
        var lagHtml = "";
        Object.keys(lagMap).forEach(function(k) {
            var pct = (lagMap[k] / maxLag) * 100;
            lagHtml += `<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <div style="width:40px; font-size:9px; color:var(--text-muted);">${k}</div>
                <div style="flex:1; height:6px; background:var(--border-muted); border-radius:2px;"><div style="width:${pct}%; height:100%; background:var(--warn-amber); border-radius:2px;"></div></div>
                <div class="mono" style="font-size:10px; width:20px; text-align:right;">${lagMap[k]}</div>
            </div>`;
        });
        document.getElementById("analytics-lag").innerHTML = lagHtml;
    }

})();
