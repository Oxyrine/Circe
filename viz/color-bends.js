(function () {
  "use strict";

  // Ported from React Bits' <ColorBends /> (React + three.js). three.js was
  // only doing three things here: an orthographic camera, a full-screen
  // quad, and a ShaderMaterial -- i.e. exactly what a raw WebGL full-screen
  // triangle already does. Pulling in a ~600KB library for that would be a
  // much worse trade than the last two background ports, so this is raw
  // WebGL1, same fragment shader math, no dependency added.

  var canvas = document.getElementById("shader-bg");
  if (!canvas) return;
  var gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return;

  var VERT = "attribute vec2 a_position;\n" +
    "varying vec2 vUv;\n" +
    "void main() {\n" +
    "  vUv = a_position * 0.5 + 0.5;\n" +
    "  gl_Position = vec4(a_position, 0.0, 1.0);\n" +
    "}";

  var FRAG = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
    "precision highp float;\n" +
    "#else\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "#define MAX_COLORS 8\n" +
    "uniform vec2 uCanvas;\n" +
    "uniform float uTime;\n" +
    "uniform float uSpeed;\n" +
    "uniform vec2 uRot;\n" +
    "uniform int uColorCount;\n" +
    "uniform vec3 uColors[MAX_COLORS];\n" +
    "uniform float uScale;\n" +
    "uniform float uFrequency;\n" +
    "uniform float uWarpStrength;\n" +
    "uniform vec2 uPointer;\n" +
    "uniform float uMouseInfluence;\n" +
    "uniform float uParallax;\n" +
    "uniform float uNoise;\n" +
    "uniform int uIterations;\n" +
    "uniform float uIntensity;\n" +
    "uniform float uBandWidth;\n" +
    "varying vec2 vUv;\n" +
    "void main() {\n" +
    "  float t = uTime * uSpeed;\n" +
    "  vec2 p = vUv * 2.0 - 1.0;\n" +
    "  p += uPointer * uParallax * 0.1;\n" +
    "  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\n" +
    "  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\n" +
    "  q /= max(uScale, 0.0001);\n" +
    "  q /= 0.5 + 0.2 * dot(q, q);\n" +
    "  q += 0.2 * cos(t) - 7.56;\n" +
    "  vec2 toward = (uPointer - rp);\n" +
    "  q += toward * uMouseInfluence * 0.2;\n" +
    "  for (int j = 0; j < 5; j++) {\n" +
    "    if (j >= uIterations - 1) break;\n" +
    "    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));\n" +
    "    q += (rr - q) * 0.15;\n" +
    "  }\n" +
    "  vec3 col = vec3(0.0);\n" +
    "  if (uColorCount > 0) {\n" +
    "    vec2 s = q;\n" +
    "    vec3 sumCol = vec3(0.0);\n" +
    "    for (int i = 0; i < MAX_COLORS; ++i) {\n" +
    "      if (i >= uColorCount) break;\n" +
    "      s -= 0.01;\n" +
    "      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\n" +
    "      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\n" +
    "      float kBelow = clamp(uWarpStrength, 0.0, 1.0);\n" +
    "      float kMix = pow(kBelow, 0.3);\n" +
    "      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\n" +
    "      vec2 disp = (r - s) * kBelow;\n" +
    "      vec2 warped = s + disp * gain;\n" +
    "      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\n" +
    "      float m = mix(m0, m1, kMix);\n" +
    "      float w = 1.0 - exp(-uBandWidth / exp(min(uBandWidth * m, 80.0)));\n" +
    "      sumCol += uColors[i] * w;\n" +
    "    }\n" +
    "    col = clamp(sumCol, 0.0, 1.0);\n" +
    "  }\n" +
    "  col *= uIntensity;\n" +
    "  if (uNoise > 0.0001) {\n" +
    "    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\n" +
    "    col += (n - 0.5) * uNoise;\n" +
    "    col = clamp(col, 0.0, 1.0);\n" +
    "  }\n" +
    "  gl_FragColor = vec4(col, 1.0);\n" +
    "}";

  // Same navy/teal/mint/sand/amber family as the rest of the UI, so the
  // background reads as one palette instead of a re-skin bolted on top.
  var PALETTE = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00"];

  var CONFIG = {
    rotation: 90,
    autoRotate: 1.2,
    speed: 0.12,
    scale: 1.3,
    frequency: 0.9,
    warpStrength: 0.85,
    mouseInfluence: 0.35,
    parallax: 0.25,
    noise: 0.05,
    iterations: 2,
    intensity: 0.4,
    bandWidth: 1.8,
  };

  function hexToVec3(hex) {
    var h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  }

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("color-bends shader compile error:", gl.getShaderInfoLog(s));
    }
    return s;
  }
  var program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("color-bends program link error:", gl.getProgramInfoLog(program));
  }
  gl.useProgram(program);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var posLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  var uni = {
    canvas: gl.getUniformLocation(program, "uCanvas"),
    time: gl.getUniformLocation(program, "uTime"),
    speed: gl.getUniformLocation(program, "uSpeed"),
    rot: gl.getUniformLocation(program, "uRot"),
    colorCount: gl.getUniformLocation(program, "uColorCount"),
    colors: gl.getUniformLocation(program, "uColors"),
    scale: gl.getUniformLocation(program, "uScale"),
    frequency: gl.getUniformLocation(program, "uFrequency"),
    warpStrength: gl.getUniformLocation(program, "uWarpStrength"),
    pointer: gl.getUniformLocation(program, "uPointer"),
    mouseInfluence: gl.getUniformLocation(program, "uMouseInfluence"),
    parallax: gl.getUniformLocation(program, "uParallax"),
    noise: gl.getUniformLocation(program, "uNoise"),
    iterations: gl.getUniformLocation(program, "uIterations"),
    intensity: gl.getUniformLocation(program, "uIntensity"),
    bandWidth: gl.getUniformLocation(program, "uBandWidth"),
  };

  var colorFloats = new Float32Array(8 * 3);
  PALETTE.slice(0, 8).forEach(function (hex, i) {
    var v = hexToVec3(hex);
    colorFloats[i * 3] = v[0];
    colorFloats[i * 3 + 1] = v[1];
    colorFloats[i * 3 + 2] = v[2];
  });
  gl.uniform3fv(uni.colors, colorFloats);
  gl.uniform1i(uni.colorCount, PALETTE.length);
  gl.uniform1f(uni.speed, CONFIG.speed);
  gl.uniform1f(uni.scale, CONFIG.scale);
  gl.uniform1f(uni.frequency, CONFIG.frequency);
  gl.uniform1f(uni.warpStrength, CONFIG.warpStrength);
  gl.uniform1f(uni.mouseInfluence, CONFIG.mouseInfluence);
  gl.uniform1f(uni.parallax, CONFIG.parallax);
  gl.uniform1f(uni.noise, CONFIG.noise);
  gl.uniform1i(uni.iterations, CONFIG.iterations);
  gl.uniform1f(uni.intensity, CONFIG.intensity);
  gl.uniform1f(uni.bandWidth, CONFIG.bandWidth);

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) { CONFIG.speed = 0; CONFIG.autoRotate = 0; }

  var pointerTarget = [0, 0];
  var pointerCurrent = [0, 0];
  if (!reduceMotion) {
    window.addEventListener("pointermove", function (e) {
      pointerTarget[0] = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget[1] = -((e.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true });
  }

  var raf = 0;
  var visible = document.visibilityState === "visible";
  var inView = true;
  var start = performance.now();
  var lastNow = start;

  function resizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(window.innerWidth * dpr));
    var h = Math.max(1, Math.round(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  function requestRender() {
    if (visible && inView && raf === 0) raf = requestAnimationFrame(render);
  }

  function render(now) {
    raf = 0;
    if (!visible || !inView) return;
    var dt = Math.min((now - lastNow) / 1000, 0.1);
    lastNow = now;

    resizeCanvas();
    var elapsed = (now - start) / 1000;

    var deg = CONFIG.rotation + CONFIG.autoRotate * elapsed;
    var rad = (deg * Math.PI) / 180;
    gl.uniform2f(uni.rot, Math.cos(rad), Math.sin(rad));

    var amt = Math.min(1, dt * 8);
    pointerCurrent[0] += (pointerTarget[0] - pointerCurrent[0]) * amt;
    pointerCurrent[1] += (pointerTarget[1] - pointerCurrent[1]) * amt;

    gl.uniform2f(uni.canvas, canvas.width, canvas.height);
    gl.uniform1f(uni.time, elapsed);
    gl.uniform2f(uni.pointer, pointerCurrent[0], pointerCurrent[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (CONFIG.speed !== 0 || CONFIG.autoRotate !== 0 ||
        Math.abs(pointerTarget[0] - pointerCurrent[0]) > 0.001 ||
        Math.abs(pointerTarget[1] - pointerCurrent[1]) > 0.001) {
      requestRender();
    }
  }

  window.addEventListener("resize", requestRender);

  var resizeObserver = new ResizeObserver(requestRender);
  resizeObserver.observe(canvas);

  var intersectionObserver = new IntersectionObserver(function (entries) {
    inView = entries[0] ? entries[0].isIntersecting : true;
    if (inView) requestRender();
    else if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
  });
  intersectionObserver.observe(canvas);

  document.addEventListener("visibilitychange", function () {
    visible = document.visibilityState === "visible";
    if (visible) requestRender();
    else if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
  });

  requestRender();
})();
