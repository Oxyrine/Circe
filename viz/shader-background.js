(function () {
  "use strict";

  // Ported from a React WebGL shader component ("Mesh drift"). The React
  // parts were only useEffect/useRef for canvas lifecycle -- the actual work
  // is a WebGL1 fragment shader + a handful of DOM observers, none of which
  // need a framework. Cursor interaction is ported but left off (matches
  // the source's own cursorEnabled: false) since this runs behind a
  // data-dense dashboard, not a hero section.

  var canvas = document.getElementById("shader-bg");
  if (!canvas) return;
  var gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) return;

  var VERT = "attribute vec2 a_position;\n" +
    "void main() {\n" +
    "  gl_Position = vec4(a_position, 0.0, 1.0);\n" +
    "}";

  var FRAG = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
    "precision highp float;\n" +
    "#else\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "uniform vec3 u_colors[8];\n" +
    "uniform vec4 u_scene;\n" +
    "uniform vec4 u_shape;\n" +
    "uniform vec4 u_surface;\n" +
    "uniform vec4 u_finish;\n" +
    "uniform vec4 u_transform;\n" +
    "uniform vec4 u_space;\n" +
    "uniform vec4 u_cursor;\n" +
    "#define u_resolution u_scene.xy\n" +
    "#define u_time u_scene.z\n" +
    "#define u_colorCount u_scene.w\n" +
    "#define u_scale u_shape.x\n" +
    "#define u_intensity u_shape.y\n" +
    "#define u_warp u_shape.w\n" +
    "#define u_detail u_surface.x\n" +
    "#define u_contrast u_surface.y\n" +
    "#define u_brightness u_surface.z\n" +
    "#define u_saturation u_surface.w\n" +
    "#define u_hue u_finish.x\n" +
    "#define u_vignette u_finish.y\n" +
    "#define u_blur u_finish.z\n" +
    "#define u_grain u_finish.w\n" +
    "#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
    "#define u_seed u_transform.x\n" +
    "#else\n" +
    "#define u_seed mod(u_transform.x, 31.0)\n" +
    "#endif\n" +
    "#define u_rotate u_transform.y\n" +
    "#define u_drift u_transform.z\n" +
    "#define u_oklab u_transform.w\n" +
    "#define u_offset u_space.xy\n" +
    "#define u_mouse u_space.zw\n" +
    "#define u_cursorPresence u_cursor.x\n" +
    "#define u_cursorEffect u_cursor.y\n" +
    "#define u_cursorStrength u_cursor.z\n" +
    "#define u_cursorRadius u_cursor.w\n" +
    "float hash21(vec2 p) {\n" +
    "#ifndef GL_FRAGMENT_PRECISION_HIGH\n" +
    "  p = mod(p, 31.0);\n" +
    "#endif\n" +
    "  p = fract(p * vec2(234.34, 435.345));\n" +
    "  p += dot(p, p + 34.23);\n" +
    "  return fract(p.x * p.y);\n" +
    "}\n" +
    "float grainHash(vec2 p) {\n" +
    "  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\n" +
    "  p3 += dot(p3, p3.yzx + 33.33);\n" +
    "  return fract((p3.x + p3.y) * p3.z);\n" +
    "}\n" +
    "float noise(vec2 p) {\n" +
    "  vec2 i = floor(p);\n" +
    "  vec2 f = fract(p);\n" +
    "  vec2 u = f * f * (3.0 - 2.0 * f);\n" +
    "  return mix(\n" +
    "    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),\n" +
    "    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),\n" +
    "    u.y);\n" +
    "}\n" +
    "float fbm(vec2 p) {\n" +
    "  float v = 0.0;\n" +
    "  float a = 0.5;\n" +
    "  for (int i = 0; i < 5; i++) {\n" +
    "    v += a * noise(p);\n" +
    "    p = p * 2.03 + vec2(17.0, 9.2);\n" +
    "    a *= 0.5;\n" +
    "  }\n" +
    "  return v;\n" +
    "}\n" +
    "vec3 srgbToLinear(vec3 c) {\n" +
    "  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));\n" +
    "}\n" +
    "vec3 linearToSrgb(vec3 c) {\n" +
    "  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));\n" +
    "}\n" +
    "vec3 linToOklab(vec3 c) {\n" +
    "  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;\n" +
    "  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;\n" +
    "  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;\n" +
    "  l = pow(max(l, 0.0), 1.0 / 3.0);\n" +
    "  m = pow(max(m, 0.0), 1.0 / 3.0);\n" +
    "  s = pow(max(s, 0.0), 1.0 / 3.0);\n" +
    "  return vec3(\n" +
    "    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,\n" +
    "    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,\n" +
    "    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);\n" +
    "}\n" +
    "vec3 oklabToLin(vec3 c) {\n" +
    "  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;\n" +
    "  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;\n" +
    "  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;\n" +
    "  l = l * l * l; m = m * m * m; s = s * s * s;\n" +
    "  return vec3(\n" +
    "    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,\n" +
    "    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,\n" +
    "    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);\n" +
    "}\n" +
    "vec3 mixColour(vec3 a, vec3 b, float t) {\n" +
    "  if (u_oklab > 0.5) {\n" +
    "    vec3 la = linToOklab(srgbToLinear(a));\n" +
    "    vec3 lb = linToOklab(srgbToLinear(b));\n" +
    "    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);\n" +
    "  }\n" +
    "  return mix(a, b, t);\n" +
    "}\n" +
    "vec3 palette(float x) {\n" +
    "  float n = max(u_colorCount - 1.0, 1.0);\n" +
    "  float f = clamp(x, 0.0, 1.0) * n;\n" +
    "  vec3 col = u_colors[0];\n" +
    "  for (int i = 0; i < 7; i++) {\n" +
    "    if (float(i) < n)\n" +
    "      col = mixColour(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));\n" +
    "  }\n" +
    "  return col;\n" +
    "}\n" +
    "vec3 hueRotate(vec3 col, float a) {\n" +
    "  const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);\n" +
    "  const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);\n" +
    "  vec3 yiq = toYIQ * col;\n" +
    "  float ca = cos(a), sa = sin(a);\n" +
    "  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);\n" +
    "  return toRGB * yiq;\n" +
    "}\n" +
    "vec3 shade(vec2 uv, vec2 p, float t) {\n" +
    "  vec3 acc = u_colors[0] * 0.15;\n" +
    "  float total = 0.15;\n" +
    "  for (int i = 0; i < 8; i++) {\n" +
    "    if (float(i) >= u_colorCount) break;\n" +
    "    float fi = float(i);\n" +
    "    vec2 c = vec2(\n" +
    "      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),\n" +
    "      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);\n" +
    "    float w = exp(-dot(p - c, p - c) * 6.0);\n" +
    "    acc += u_colors[i] * w;\n" +
    "    total += w;\n" +
    "  }\n" +
    "  return acc / total;\n" +
    "}\n" +
    "void main() {\n" +
    "  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n" +
    "  vec2 screenUv = uv;\n" +
    "  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);\n" +
    "  float cursorMask = 0.0;\n" +
    "  if (u_cursorPresence > 0.001) {\n" +
    "    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);\n" +
    "    vec2 cursorDelta = p - cursor;\n" +
    "    if (u_cursorEffect < 0.5) {\n" +
    "      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;\n" +
    "    } else {\n" +
    "      float cursorDistance = length(cursorDelta);\n" +
    "      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);\n" +
    "      cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));\n" +
    "      if (u_cursorEffect < 1.5) {\n" +
    "        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;\n" +
    "      } else if (u_cursorEffect < 2.5) {\n" +
    "        float cursorAngle = cursorMask * u_cursorStrength * 2.2;\n" +
    "        float cc = cos(cursorAngle), cs = sin(cursorAngle);\n" +
    "        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;\n" +
    "      } else if (u_cursorEffect < 3.5) {\n" +
    "        float ripple = sin(cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);\n" +
    "        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;\n" +
    "      }\n" +
    "    }\n" +
    "  }\n" +
    "  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;\n" +
    "  p *= u_scale;\n" +
    "  if (abs(u_rotate) > 0.0001) {\n" +
    "    float cr = cos(u_rotate), sr = sin(u_rotate);\n" +
    "    p = mat2(cr, -sr, sr, cr) * p;\n" +
    "  }\n" +
    "  p += u_offset;\n" +
    "  if (u_drift > 0.0001)\n" +
    "    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));\n" +
    "  if (u_warp > 0.0) {\n" +
    "    p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);\n" +
    "  }\n" +
    "  vec3 col;\n" +
    "  if (u_blur > 0.0) {\n" +
    "    float e = u_blur;\n" +
    "    float pe = e * u_scale;\n" +
    "    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;\n" +
    "    col  = shade(uv, p, u_time) * 0.36;\n" +
    "    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;\n" +
    "    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;\n" +
    "    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;\n" +
    "    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;\n" +
    "  } else {\n" +
    "    col = shade(uv, p, u_time);\n" +
    "  }\n" +
    "  if (abs(u_contrast - 1.0) > 0.0001)\n" +
    "    col = (col - 0.5) * u_contrast + 0.5;\n" +
    "  if (abs(u_saturation - 1.0) > 0.0001) {\n" +
    "    float luma = dot(col, vec3(0.299, 0.587, 0.114));\n" +
    "    col = mix(vec3(luma), col, u_saturation);\n" +
    "  }\n" +
    "  if (abs(u_hue) > 0.0001)\n" +
    "    col = hueRotate(col, u_hue);\n" +
    "  if (abs(u_brightness) > 0.0001)\n" +
    "    col += u_brightness;\n" +
    "  if (u_vignette > 0.0001) {\n" +
    "    float vd = length(screenUv - 0.5) * 1.41421356;\n" +
    "    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);\n" +
    "  }\n" +
    "  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)\n" +
    "    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;\n" +
    "  if (u_grain > 0.0001)\n" +
    "    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;\n" +
    "  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n" +
    "}";

  // Navy -> teal -> mint -> sand. Only the first 4 are used (colorCount: 4);
  // 5-8 are padding so the vec3[8] uniform upload always has 8 entries.
  var UNIFORMS = {
    colors: [
      [0, 0.070588, 0.098039],
      [0, 0.372549, 0.450980],
      [0.580392, 0.823529, 0.741176],
      [0.913725, 0.847059, 0.650980],
      [0.913725, 0.847059, 0.650980],
      [0.913725, 0.847059, 0.650980],
      [0.913725, 0.847059, 0.650980],
      [0.913725, 0.847059, 0.650980],
    ],
    colorCount: 4,
    scale: 2.0,
    intensity: 0.54,
    warp: 0.042,
    detail: 1.536,
    contrast: 1.158,
    brightness: -0.06,
    saturation: 0.92,
    hue: 0,
    vignette: 0.32,
    blur: 0.002,
    grain: 0.06,
    seed: 4012,
    rotate: 5.6549,
    offsetX: 0.11,
    offsetY: -0.19,
    drift: 0.116,
    cursorEnabled: false,
    cursorEffect: 2,
    cursorStrength: 0.65,
    cursorRadius: 0.46,
    oklab: 0,
    timeScale: -0.35,
  };

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  var program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  gl.useProgram(program);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uni = {
    colors: gl.getUniformLocation(program, "u_colors"),
    scene: gl.getUniformLocation(program, "u_scene"),
    shape: gl.getUniformLocation(program, "u_shape"),
    surface: gl.getUniformLocation(program, "u_surface"),
    finish: gl.getUniformLocation(program, "u_finish"),
    transform: gl.getUniformLocation(program, "u_transform"),
    space: gl.getUniformLocation(program, "u_space"),
    cursor: gl.getUniformLocation(program, "u_cursor"),
  };
  gl.uniform3fv(uni.colors, new Float32Array([].concat.apply([], UNIFORMS.colors)));
  gl.uniform4f(uni.shape, UNIFORMS.scale, UNIFORMS.intensity, 0, UNIFORMS.warp);
  gl.uniform4f(uni.surface, UNIFORMS.detail, UNIFORMS.contrast, UNIFORMS.brightness, UNIFORMS.saturation);
  gl.uniform4f(uni.finish, UNIFORMS.hue, UNIFORMS.vignette, UNIFORMS.blur, UNIFORMS.grain);
  gl.uniform4f(uni.transform, UNIFORMS.seed, UNIFORMS.rotate, UNIFORMS.drift, UNIFORMS.oklab);
  gl.uniform4f(uni.cursor, 0, UNIFORMS.cursorEffect, UNIFORMS.cursorStrength, UNIFORMS.cursorRadius);

  var raf = 0;
  var visible = document.visibilityState === "visible";
  var inView = true;
  var start = performance.now();

  function resizeCanvas() {
    var bounds = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rawWidth = Math.max(1, Math.round(bounds.width * dpr));
    var rawHeight = Math.max(1, Math.round(bounds.height * dpr));
    var pixelScale = Math.min(1, Math.sqrt(2000000 / Math.max(1, rawWidth * rawHeight)));
    var width = Math.max(1, Math.round(rawWidth * pixelScale));
    var height = Math.max(1, Math.round(rawHeight * pixelScale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function requestRender() {
    if (visible && inView && raf === 0) raf = requestAnimationFrame(render);
  }

  function render(now) {
    raf = 0;
    if (!visible || !inView) return;
    resizeCanvas();
    gl.uniform4f(uni.scene, canvas.width, canvas.height, ((now - start) / 1000) * UNIFORMS.timeScale, UNIFORMS.colorCount);
    gl.uniform4f(uni.space, UNIFORMS.offsetX, UNIFORMS.offsetY, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestRender();
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

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    UNIFORMS.timeScale = 0;
    UNIFORMS.drift = 0;
  }

  requestRender();
})();
