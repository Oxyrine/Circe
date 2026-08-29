(function () {
  "use strict";

  // Ported from a React canvas component (spring-mass-damping node grid with
  // mouse-shockwave repulsion). No React behavior was actually used by the
  // original — it's plain Canvas API + mousemove — so this is a 1:1 port,
  // retuned as a dim background behind content instead of a foreground
  // hero: wider spacing, lower baseline opacity, matrix-green palette
  // instead of cyan, and it sits still (single static frame) for anyone
  // with prefers-reduced-motion set.

  var canvas = document.getElementById("constellation-bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var width = 0, height = 0;
  var nodes = [];
  var mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, radius: 200 };

  var SPACING = 72;
  var MAX_CONN_DIST = 92;
  var MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;
  var SPRING_K = 18;
  var DAMPING = 0.82;

  var BG = "#010604";
  var NODE_RGB = "93, 255, 143";     // --ink
  var ACCENT_RGB = "57, 255, 140";   // --accent

  function initNodes() {
    nodes = [];
    var cols = Math.ceil(width / SPACING) + 1;
    var rows = Math.ceil(height / SPACING) + 1;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * SPACING, y = j * SPACING;
        nodes.push({
          x: x, y: y, vx: 0, vy: 0, baseX: x, baseY: y,
          radius: Math.random() * 1.1 + 1,
          label: (i * 7).toString(16).toUpperCase() + ":" + (j * 11).toString(16).toUpperCase(),
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  function handleResize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initNodes();
    if (reduceMotion) drawStatic();
  }

  function handleMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
  function handleMouseLeave() { mouse.x = -1000; mouse.y = -1000; }

  function drawStatic() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      ctx.fillStyle = "rgba(" + NODE_RGB + ", 0.22)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  var lastTime = performance.now();

  function render(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
    mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    var speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.pulse += dt * 3;

      var dx = mouse.x - n.x, dy = mouse.y - n.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 0) {
        var power = 1 - dist / mouse.radius;
        var force = power * (1200 + speed * 120);
        var angle = Math.atan2(dy, dx);
        n.vx -= Math.cos(angle) * force * dt;
        n.vy -= Math.sin(angle) * force * dt;
      }

      var homeDx = n.baseX - n.x, homeDy = n.baseY - n.y;
      n.vx += homeDx * SPRING_K * dt;
      n.vy += homeDy * SPRING_K * dt;
      n.vx *= DAMPING;
      n.vy *= DAMPING;
      n.x += n.vx * dt * 60;
      n.y += n.vy * dt * 60;
    }

    for (var a = 0; a < nodes.length; a++) {
      var na = nodes[a];
      for (var b = a + 1; b < nodes.length; b++) {
        var nb = nodes[b];
        var ndx = na.x - nb.x, ndy = na.y - nb.y;
        var distSq = ndx * ndx + ndy * ndy;
        if (distSq < MAX_CONN_DIST_SQ) {
          var nDist = Math.sqrt(distSq);
          var alpha = (1 - nDist / MAX_CONN_DIST) * 0.1;
          ctx.strokeStyle = "rgba(" + NODE_RGB + ", " + alpha + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var nk = nodes[k];
      var mdx = mouse.x - nk.x, mdy = mouse.y - nk.y;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      var isNear = mdist < mouse.radius;

      var baseAlpha = isNear ? 0.85 : 0.16 + Math.sin(nk.pulse) * 0.06;
      ctx.fillStyle = isNear
        ? "rgba(" + ACCENT_RGB + ", " + baseAlpha + ")"
        : "rgba(" + NODE_RGB + ", " + baseAlpha + ")";
      var r = isNear ? nk.radius * 2.1 : nk.radius + Math.sin(nk.pulse) * 0.25;
      ctx.beginPath();
      ctx.arc(nk.x, nk.y, Math.max(0.5, r), 0, Math.PI * 2);
      ctx.fill();

      if (mdist < 80) {
        var pulseRing = ((nk.pulse * 20) % 28) + 4;
        var ringAlpha = (1 - pulseRing / 32) * 0.35;
        ctx.strokeStyle = "rgba(" + ACCENT_RGB + ", " + ringAlpha + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nk.x, nk.y, pulseRing, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = "8px ui-monospace, SFMono-Regular, Consolas, monospace";
        ctx.fillStyle = "rgba(" + ACCENT_RGB + ", 0.8)";
        ctx.fillText(nk.label, nk.x + 9, nk.y - 9);
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", handleResize);
  if (!reduceMotion) {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
  }

  handleResize();
  if (!reduceMotion) requestAnimationFrame(render);
})();
