(function() {
    console.log("Ouroboros Map Module Initialized.");

    setTimeout(function() {
        if (!document.getElementById("universal-svg")) return;

        var NS = "http://www.w3.org/2000/svg";
        var svg = document.getElementById("universal-svg");
        var zoomGroup = document.getElementById("network-zoom-group");
        var lTrade = document.getElementById("map-layer-trade");
        var lCorp = document.getElementById("map-layer-corp");
        var lRings = document.getElementById("map-layer-rings");
        var lNodes = document.getElementById("map-layer-nodes");
        var lLabels = document.getElementById("map-layer-labels");

        // Pan and Zoom State
        var scale = 0.5; // Start zoomed out slightly
        var panX = 0;
        var panY = -150;
        var isDragging = false;
        var startX, startY;

        function updateTransform() {
            zoomGroup.setAttribute("transform", `translate(${panX}, ${panY}) scale(${scale})`);
            document.getElementById("zoom-level").textContent = Math.round(scale * 100) + "%";
        }

        svg.addEventListener("mousedown", function(e) {
            isDragging = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            svg.style.cursor = "grabbing";
        });
        window.addEventListener("mousemove", function(e) {
            if (!isDragging) return;
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            updateTransform();
        });
        window.addEventListener("mouseup", function() {
            isDragging = false;
            svg.style.cursor = "grab";
        });
        svg.addEventListener("wheel", function(e) {
            e.preventDefault();
            var zoomSpeed = 0.05;
            var oldScale = scale;
            if (e.deltaY < 0) scale *= (1 + zoomSpeed);
            else scale /= (1 + zoomSpeed);
            scale = Math.max(0.1, Math.min(scale, 5));
            
            // Zoom towards mouse
            var rect = svg.getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;
            
            panX = mouseX - (mouseX - panX) * (scale / oldScale);
            panY = mouseY - (mouseY - panY) * (scale / oldScale);
            updateTransform();
        });

        document.getElementById("zoom-in").addEventListener("click", function() { scale *= 1.2; updateTransform(); });
        document.getElementById("zoom-out").addEventListener("click", function() { scale /= 1.2; updateTransform(); });
        document.getElementById("zoom-reset").addEventListener("click", function() { scale = 0.6; panX = 100; panY = -50; updateTransform(); });

        // Draw Boundary Cards
        function drawBoundary(x, y, w, h, title) {
            var g = document.createElementNS(NS, "g");
            var rect = document.createElementNS(NS, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", w);
            rect.setAttribute("height", h);
            rect.setAttribute("fill", "none");
            rect.setAttribute("stroke", "var(--border-muted)");
            rect.setAttribute("stroke-width", "1");
            rect.setAttribute("stroke-dasharray", "4 4");
            rect.setAttribute("rx", "8");
            
            var text = document.createElementNS(NS, "text");
            text.setAttribute("x", x + 16);
            text.setAttribute("y", y + 24);
            text.setAttribute("fill", "var(--text-muted)");
            text.setAttribute("font-size", "12");
            text.setAttribute("font-weight", "600");
            text.setAttribute("letter-spacing", "2");
            text.textContent = title;
            
            g.appendChild(rect);
            g.appendChild(text);
            zoomGroup.insertBefore(g, zoomGroup.firstChild);
        }

        drawBoundary(50, 35, 1300, 1030, "PRIMARY INTERCONNECTED NETWORK · 50 ENTITIES");
        drawBoundary(1410, 0, 380, 500, "ISOLATED NETWORK A · 6 ENTITIES");
        drawBoundary(1410, 600, 380, 500, "ISOLATED NETWORK B · 4 ENTITIES");

        var nodeLookup = {};
        BACKDROP.nodes.forEach(function(n) { nodeLookup[n.id] = n; });
        var activeRingNodes = new Set();
        var selectedNode = null;

        // Render Graph
        function renderGraph() {
            lTrade.innerHTML = "";
            lCorp.innerHTML = "";
            lRings.innerHTML = "";
            lNodes.innerHTML = "";
            lLabels.innerHTML = "";

            var showTrade = document.getElementById("btn-trade").classList.contains("active");
            var showCorp = document.getElementById("btn-corp").classList.contains("active");
            var showFlagged = document.getElementById("btn-flagged").classList.contains("active");
            var indFilter = document.getElementById("filter-industry").value;
            var ringFilter = document.getElementById("filter-ring").value;

            // Compute focus sets
            activeRingNodes.clear();
            var ringEdges = [];
            if (ringFilter) {
                var r = SCORED.rings.find(x => x.ring_id === ringFilter);
                if (r) {
                    r.entities.forEach(eid => activeRingNodes.add(eid));
                    if(r.hops) ringEdges = r.hops;
                }
            } else if (showFlagged) {
                SCORED.rings.forEach(function(r) {
                    r.entities.forEach(eid => activeRingNodes.add(eid));
                });
            }

            // Draw Edges
            BACKDROP.edges.forEach(function(e) {
                var u = nodeLookup[e.from];
                var v = nodeLookup[e.to];
                if (!u || !v) return;
                
                var isFaded = (showFlagged || ringFilter) && (!activeRingNodes.has(u.id) || !activeRingNodes.has(v.id));

                if (e.type === "trade" && showTrade) {
                    var line = document.createElementNS(NS, "line");
                    line.setAttribute("x1", u.x); line.setAttribute("y1", u.y);
                    line.setAttribute("x2", v.x); line.setAttribute("y2", v.y);
                    line.setAttribute("stroke", isFaded ? "var(--border-muted)" : "rgba(106,115,138,0.3)");
                    line.setAttribute("stroke-width", "1.5");
                    lTrade.appendChild(line);
                } else if (e.type === "corporate" && showCorp) {
                    var line = document.createElementNS(NS, "line");
                    line.setAttribute("x1", u.x); line.setAttribute("y1", u.y);
                    line.setAttribute("x2", v.x); line.setAttribute("y2", v.y);
                    line.setAttribute("stroke", isFaded ? "rgba(216,92,92,0.1)" : "rgba(216,92,92,0.4)");
                    line.setAttribute("stroke-width", "2");
                    line.setAttribute("stroke-dasharray", "4 4");
                    lCorp.appendChild(line);
                }
            });

            // Draw Ring Edges (on top)
            if (ringFilter) {
                ringEdges.forEach(function(hop) {
                    var u = nodeLookup[hop.from];
                    var v = nodeLookup[hop.to];
                    if(!u || !v) return;
                    var line = document.createElementNS(NS, "line");
                    line.setAttribute("x1", u.x); line.setAttribute("y1", u.y);
                    line.setAttribute("x2", v.x); line.setAttribute("y2", v.y);
                    line.setAttribute("stroke", hop.hop_type === 'corporate_bridge' ? "var(--warn-amber)" : "var(--risk-coral)");
                    line.setAttribute("stroke-width", "3");
                    if (hop.hop_type === 'corporate_bridge') line.setAttribute("stroke-dasharray", "6 4");
                    lRings.appendChild(line);
                });
            }

            // Draw Nodes
            BACKDROP.nodes.forEach(function(n) {
                var isFaded = (showFlagged || ringFilter) && !activeRingNodes.has(n.id);
                if (indFilter && n.industry_class !== indFilter) isFaded = true;

                // Node Circle
                
                var ringCount = SCORED.rings.filter(function(r) { return (r.entities||[]).includes(n.id); }).length;
                var r = 6 + Math.min(ringCount, 8) * 0.5;
                
                var c = document.createElementNS(NS, "circle");
                c.setAttribute("cx", n.x);
                c.setAttribute("cy", n.y);
                c.setAttribute("r", r);
                c.setAttribute("class", "map-node" + (selectedNode === n.id ? " selected" : ""));
                
                var color = ringCount > 0 ? "var(--risk-coral)" : "var(--accent-teal)";
                if (isFaded) {
                    c.setAttribute("stroke", "var(--border-muted)");
                } else {
                    c.setAttribute("stroke", color);
                }
                
                c.addEventListener("click", function() { openRail(n.id); });
                lNodes.appendChild(c);


                // Label
                if (!isFaded || selectedNode === n.id) {
                    var txt = document.createElementNS(NS, "text");
                    txt.setAttribute("x", n.x + r + 4);
                    txt.setAttribute("y", n.y + 3);
                    txt.setAttribute("fill", "var(--text-main)");
                    txt.setAttribute("font-size", "14");
                    txt.setAttribute("font-weight", "500");
                    txt.setAttribute("paint-order", "stroke fill");
                    txt.setAttribute("stroke", "#0A0A0A"); // matches new background
                    txt.setAttribute("stroke-width", "3");
                    txt.style.pointerEvents = "none";
                    txt.textContent = n.id;
                    lLabels.appendChild(txt);
                }
            });
        }

        // Initialize Dropdowns
        var inds = new Set();
        BACKDROP.nodes.forEach(function(n) { if(n.industry_class) inds.add(n.industry_class); });
        inds.forEach(function(ind) {
            var opt = document.createElement("option");
            opt.value = ind; opt.textContent = ind.toUpperCase();
            document.getElementById("filter-industry").appendChild(opt);
        });

        SCORED.rings.forEach(function(r) {
            var opt = document.createElement("option");
            opt.value = r.ring_id; opt.textContent = r.ring_id;
            document.getElementById("filter-ring").appendChild(opt);
        });

        
        document.getElementById("btn-trade").addEventListener("click", function(e) { e.target.classList.toggle("active"); renderGraph(); });
        document.getElementById("btn-corp").addEventListener("click", function(e) { e.target.classList.toggle("active"); renderGraph(); });
        document.getElementById("btn-flagged").addEventListener("click", function(e) { e.target.classList.toggle("active"); renderGraph(); });

        document.getElementById("filter-industry").addEventListener("change", renderGraph);
        document.getElementById("filter-ring").addEventListener("change", renderGraph);

        // Rail Logic
        
        function openRail(id) {
            selectedNode = id;
            var e = ENTITIES[id];
            document.getElementById("map-rail-empty").style.display = "none";
            document.getElementById("map-rail").style.display = "flex";
            
            document.getElementById("rail-id").textContent = "(" + id + ")";
            document.getElementById("rail-name").textContent = e.name;
            var indStr = e.industry_class ? e.industry_class.toUpperCase() : "UNKNOWN";
            var nicStr = e.industry_code ? e.industry_code : "N/A";
            document.getElementById("rail-ind-nic").textContent = "INDUSTRY: " + indStr + " | NIC: " + nicStr;
            
            var rings = SCORED.rings.filter(function(r) { return (r.entities||[]).includes(id); });
            var exp = rings.reduce(function(a, b) { return a + (b.expected_loss||0); }, 0);
            var invCount = Object.values(INVOICES).filter(function(i) { return i.from === id || i.to === id; }).length;
            var avgAgg = rings.length > 0 ? (rings.reduce(function(a,b){return a + (b.aggregate_score||0);}, 0) / rings.length).toFixed(2) : "0.00";
            
            document.getElementById("rail-inv").textContent = invCount;
            document.getElementById("rail-rings").textContent = rings.length;
            document.getElementById("rail-exploss").textContent = "₹" + (exp/10000000).toFixed(2) + " Cr";
            document.getElementById("rail-avgagg").textContent = avgAgg;
            
            // Flagged Rings
            document.getElementById("rail-flags-count").textContent = rings.length;
            if (rings.length > 0) {
                document.getElementById("rail-flags-container").style.display = "block";
                document.getElementById("rail-flags-list").innerHTML = rings.map(function(r) {
                    return "<div style=\"background:var(--bg-panel); border:1px solid var(--border-muted); color:var(--text-main); font-size:10px; padding:4px 8px; border-radius:2px; cursor:pointer;\" onclick=\"window.viewRing('" + r.ring_id + "')\">" + r.ring_id + "</div>";
                }).join("");
            } else {
                document.getElementById("rail-flags-container").style.display = "none";
            }
            
            // Top Counterparties
            var cpMap = {};
            Object.values(INVOICES).filter(function(i) { return i.from === id || i.to === id; }).forEach(function(i) {
                var other = i.from === id ? i.to : i.from;
                cpMap[other] = (cpMap[other] || 0) + (i.value||0);
            });
            var topCp = Object.keys(cpMap).map(function(k) { return {id:k, val:cpMap[k]}; }).sort(function(a,b){return b.val-a.val;}).slice(0, 3);
            
            if (topCp.length > 0) {
                document.getElementById("rail-cp-container").style.display = "block";
                document.getElementById("rail-cp-list").innerHTML = topCp.map(function(c) {
                    var n = (ENTITIES[c.id]||{}).name||"";
                    return '<div class="rail-cp-item"><span>'+c.id+' '+n+'</span><span class="val">₹'+(c.val/10000000).toFixed(2)+' Cr</span></div>';
                }).join("");
            } else {
                document.getElementById("rail-cp-container").style.display = "none";
            }
            
            // Shared Directors
            var sharedHtml = "";
            var sharedSeen = new Set();
            Object.values(ENTITIES).forEach(function(other) {
                if (other.id === id) return;
                if (other.directors && e.directors) {
                    var overlap = other.directors.filter(function(d) { return e.directors.includes(d); });
                    if (overlap.length > 0) {
                        overlap.forEach(function(d) {
                            var key = d + "-" + other.id;
                            if(!sharedSeen.has(key)) {
                                sharedSeen.add(key);
                                sharedHtml += '<div style="font-size:10px; color:var(--text-muted); display:flex; align-items:center; gap:6px; margin-bottom:4px;"><span style="color:var(--warn-amber);">DIN '+d+'</span> '+other.id+' '+(other.name||"")+'</div>';
                            }
                        });
                    }
                }
            });
            
            if (sharedHtml) {
                document.getElementById("rail-dir-container").style.display = "block";
                document.getElementById("rail-dir-list").innerHTML = sharedHtml;
            } else {
                document.getElementById("rail-dir-container").style.display = "none";
            }
            
            document.getElementById("rail-full-detail").onclick = function() { window.openEntity(id); };
            renderGraph();
        }


        
        function closeRail() {
            selectedNode = null;
            document.getElementById("map-rail-empty").style.display = "flex";
            document.getElementById("map-rail").style.display = "none";
            renderGraph();
        }
        document.getElementById("rail-close").addEventListener("click", closeRail);
        if (document.getElementById("rail-close-btn")) document.getElementById("rail-close-btn").addEventListener("click", closeRail);


        // Initialize Map
        scale = 0.6; panX = 100; panY = -50; updateTransform();
        window.initializeMap = function() { renderGraph(); };
    }, 1000);
})();