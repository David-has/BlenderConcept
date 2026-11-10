(function () {
  let counter = 0;
  const uid = () => 'a' + (++counter);

  const GRID = (() => {
    let o = '';
    for (let i = -9; i <= 9; i++) o += `<line x1="${320 + i * 26}" y1="196" x2="${320 + i * 100}" y2="344"/>`;
    [204, 214, 227, 245, 272, 312, 344].forEach(y => { o += `<line x1="12" y1="${y}" x2="628" y2="${y}"/>`; });
    return `<g stroke="#fff" stroke-opacity=".12" stroke-width="1">${o}</g>`;
  })();

  function defs(u) {
    return `<defs>
      <clipPath id="${u}v"><rect x="12" y="44" width="616" height="300" rx="10"/></clipPath>
      <linearGradient id="${u}vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b4d5b"/><stop offset="1" stop-color="#2d2e38"/></linearGradient>
      <linearGradient id="${u}rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2040"/><stop offset=".7" stop-color="#3a2b4a"/><stop offset="1" stop-color="#4a3040"/></linearGradient>
      <linearGradient id="${u}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f93cc"/><stop offset="1" stop-color="#f0d2a8"/></linearGradient>
      <radialGradient id="${u}gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <radialGradient id="${u}sp" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe6c7"/><stop offset=".35" stop-color="#ff9a3d"/><stop offset="1" stop-color="#8a3300"/></radialGradient>
      <radialGradient id="${u}sb" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d4eaff"/><stop offset=".4" stop-color="#4aa3ff"/><stop offset="1" stop-color="#0b2f66"/></radialGradient>
    </defs>`;
  }

  function frame(u, title, inner, keys, ph) {
    let t = '';
    for (let x = 30; x <= 610; x += 20) {
      t += `<line x1="${x}" y1="362" x2="${x}" y2="${x % 100 === 30 ? 374 : 369}"/>`;
    }
    const diamonds = (keys || []).map(k => `<path d="M${k} 374 l5 5 l-5 5 l-5 -5 Z" fill="#ff9a3d"/>`).join('');
    return `<svg class="art" viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
      ${defs(u)}
      <rect x=".5" y=".5" width="639" height="399" rx="18" style="fill:var(--a-bg);stroke:var(--a-line)"/>
      <path d="M1 34 V18 Q1 1 18 1 H622 Q639 1 639 18 V34 Z" style="fill:var(--a-panel)"/>
      <circle cx="22" cy="17" r="5" fill="#ff5f57"/><circle cx="40" cy="17" r="5" fill="#febc2e"/><circle cx="58" cy="17" r="5" fill="#28c840"/>
      <text x="80" y="21" font-size="11" font-family="Inter, sans-serif" style="fill:var(--a-mute)">${title}</text>
      <rect x="12" y="44" width="616" height="300" rx="10" fill="url(#${u}vg)"/>
      <g clip-path="url(#${u}v)">${inner}</g>
      <rect x="12" y="352" width="616" height="36" rx="10" style="fill:var(--a-panel)"/>
      <g style="stroke:var(--a-mute)" stroke-opacity=".6" stroke-width="1">${t}</g>
      ${diamonds}
      <line x1="${ph}" y1="356" x2="${ph}" y2="386" stroke="#ff9a3d" stroke-width="2"/>
      <path d="M${ph - 5} 354 h10 l-5 7 Z" fill="#ff9a3d"/>
    </svg>`;
  }

  function pill(x, y, w, text) {
    return `<rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="#000" fill-opacity=".55"/>
      <text x="${x + 12}" y="${y + 15}" font-size="11" font-family="Inter, sans-serif" fill="#fff">${text}</text>`;
  }

  function toolbar(active) {
    const items = [
      `<circle cx="37" cy="${76}" r="6"/>`,
      `<rect x="31" y="98" width="12" height="12" rx="2"/>`,
      `<path d="M31 142 L37 130 L43 142 Z"/>`,
      `<path d="M31 160 h12 v4 h-12 Z M31 168 h12 v4 h-12 Z"/>`,
      `<circle cx="37" cy="190" r="5" fill="none" stroke-width="2" stroke="#c8cadb"/>`
    ];
    return `<rect x="22" y="58" width="30" height="146" rx="8" fill="#1a1b22" fill-opacity=".85"/>
      <rect x="25" y="${68 + active * 28}" width="24" height="24" rx="6" fill="#ff9a3d" fill-opacity=".3"/>
      <g fill="#c8cadb">${items.join('')}</g>`;
  }

  function sceneInner(u) {
    return `
      <rect x="12" y="44" width="616" height="300" fill="url(#${u}rb)"/>
      <circle cx="520" cy="96" r="110" fill="url(#${u}gl)"/>
      <ellipse cx="320" cy="332" rx="300" ry="46" fill="#000" opacity=".25"/>
      <ellipse cx="250" cy="314" rx="100" ry="13" fill="#000" opacity=".4"/>
      <ellipse cx="250" cy="320" rx="92" ry="9" fill="#ff9a3d" opacity=".22"/>
      <circle cx="250" cy="214" r="92" fill="url(#${u}sp)"/>
      <ellipse cx="218" cy="170" rx="26" ry="14" fill="#fff" opacity=".4" transform="rotate(-30 218 170)"/>
      <ellipse cx="410" cy="318" rx="62" ry="9" fill="#000" opacity=".4"/>
      <circle cx="410" cy="262" r="58" fill="url(#${u}sb)"/>
      <ellipse cx="390" cy="232" rx="16" ry="9" fill="#fff" opacity=".45" transform="rotate(-30 390 232)"/>
      <polygon points="520,262 560,276 520,290 480,276" fill="#e8e8f0"/>
      <polygon points="480,276 520,290 520,330 480,316" fill="#b8b9c8"/>
      <polygon points="560,276 520,290 520,330 560,316" fill="#8f91a4"/>`;
  }

  function scene() {
    const u = uid();
    return `<svg class="art-scene" viewBox="0 0 616 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rendered 3D scene" preserveAspectRatio="xMidYMid slice">
      ${defs(u)}
      <g transform="translate(-12 -44)">${sceneInner(u)}</g>
    </svg>`;
  }

  function hero() {
    const u = uid();
    const rows = [0, 1, 2, 3].map(i => {
      const y = 76 + i * 24;
      const sel = i === 1;
      return `${sel ? `<rect x="480" y="${y - 12}" width="130" height="20" rx="5" fill="#ff9a3d" fill-opacity=".28"/>` : ''}
        <circle cx="494" cy="${y - 2}" r="4.5" fill="${i === 0 ? '#4aa3ff' : '#ff9a3d'}"/>
        <rect x="506" y="${y - 5}" width="${[70, 52, 62, 44][i]}" height="6" rx="3" style="fill:var(--a-mute)" fill-opacity=".8"/>`;
    }).join('');
    const inner = `
      ${GRID}
      <text x="70" y="70" font-size="10" font-family="Inter, sans-serif" fill="#fff" fill-opacity=".6">User Perspective</text>
      <text x="70" y="84" font-size="10" font-family="Inter, sans-serif" fill="#fff" fill-opacity=".4">(1) Collection | Sphere</text>
      <ellipse cx="300" cy="312" rx="110" ry="13" fill="#000" opacity=".35"/>
      <path d="M150 238 A150 34 0 0 1 450 238" fill="none" stroke="#4aa3ff" stroke-width="10" stroke-opacity=".85"/>
      <g class="float">
        <circle cx="300" cy="214" r="84" fill="url(#${u}sp)"/>
        <circle cx="300" cy="214" r="89" fill="none" stroke="#ffb066" stroke-width="2" stroke-dasharray="5 4"/>
        <ellipse cx="270" cy="172" rx="24" ry="13" fill="#fff" opacity=".4" transform="rotate(-30 270 172)"/>
      </g>
      <path d="M150 238 A150 34 0 0 0 450 238" fill="none" stroke="#4aa3ff" stroke-width="10"/>
      <g class="float slow">
        <polygon points="140,206 176,222 140,238 104,222" fill="#f3f3f8"/>
        <polygon points="104,222 140,238 140,282 104,266" fill="#b8b9c8"/>
        <polygon points="176,222 140,238 140,282 176,266" fill="#8f91a4"/>
        <polygon points="140,206 176,222 140,238 104,222" fill="none" stroke="#ff9a3d" stroke-width="2"/>
        <circle cx="140" cy="206" r="3.5" fill="#ff9a3d"/><circle cx="176" cy="222" r="3.5" fill="#ff9a3d"/>
        <circle cx="140" cy="238" r="3.5" fill="#ff9a3d"/><circle cx="104" cy="222" r="3.5" fill="#ff9a3d"/>
      </g>
      <g class="float fast"><circle cx="408" cy="276" r="26" fill="url(#${u}sb)"/><ellipse cx="400" cy="266" rx="8" ry="5" fill="#fff" opacity=".5"/></g>
      <g>
        <line x1="420" y1="104" x2="450" y2="112" stroke="#ff5d73" stroke-width="3"/>
        <line x1="420" y1="104" x2="420" y2="74" stroke="#52ff8a" stroke-width="3"/>
        <line x1="420" y1="104" x2="402" y2="124" stroke="#4aa3ff" stroke-width="3"/>
        <circle cx="450" cy="112" r="8" fill="#ff5d73"/><circle cx="420" cy="74" r="8" fill="#52ff8a"/><circle cx="402" cy="124" r="8" fill="#4aa3ff"/>
        <text x="446.5" y="115.5" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="#fff">X</text>
        <text x="416.5" y="77.5" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="#10210f">Y</text>
        <text x="398.5" y="127.5" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="#fff">Z</text>
      </g>
      ${toolbar(0)}
      <rect x="474" y="52" width="146" height="124" rx="10" style="fill:var(--a-panel)" fill-opacity=".96"/>
      <text x="486" y="66" font-size="9" font-weight="700" font-family="Inter, sans-serif" style="fill:var(--a-mute)">COLLECTION</text>
      ${rows}`;
    return frame(u, 'Layout — Scene', inner, [60, 140, 240, 380, 520], 260);
  }

  function wireSphere(cx, cy, r) {
    let o = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".65" stroke-width="1.2"/>`;
    [-60, -30, 0, 30, 60].forEach(a => {
      const rad = a * Math.PI / 180;
      const rx = r * Math.cos(rad);
      o += `<ellipse cx="${cx}" cy="${(cy + r * Math.sin(rad) * 0.95).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.26).toFixed(1)}" fill="none" stroke="#fff" stroke-opacity=".5"/>`;
    });
    [20, 50, 80, 110, 140, 170].forEach(a => {
      const rx = r * Math.sin(a * Math.PI / 180);
      o += `<ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${r}" fill="none" stroke="#fff" stroke-opacity=".4"/>`;
    });
    return o;
  }

  function featRender() {
    const u = uid();
    return frame(u, 'Cycles — Render', `
      ${sceneInner(u)}
      <rect x="150" y="78" width="344" height="246" fill="none" stroke="#ff9a3d" stroke-width="1.6" stroke-dasharray="7 5"/>
      ${pill(24, 314, 196, 'Cycles · 256 samples · Denoise')}`, [60, 200, 340], 340);
  }

  function featModel() {
    const u = uid();
    return frame(u, 'Modeling — Edit Mode', `
      ${GRID}
      ${wireSphere(320, 200, 100)}
      <polygon points="320,112 366,118 374,162 326,160" fill="#ff9a3d" fill-opacity=".55" stroke="#ffb066" stroke-width="1.6"/>
      <circle cx="320" cy="112" r="3.6" fill="#fff"/><circle cx="366" cy="118" r="3.6" fill="#fff"/>
      <circle cx="374" cy="162" r="3.6" fill="#fff"/><circle cx="326" cy="160" r="3.6" fill="#fff"/>
      <line x1="346" y1="140" x2="392" y2="148" stroke="#ff5d73" stroke-width="3"/>
      <line x1="346" y1="140" x2="342" y2="96" stroke="#52ff8a" stroke-width="3"/>
      <line x1="346" y1="140" x2="318" y2="170" stroke="#4aa3ff" stroke-width="3"/>
      ${toolbar(1)}
      ${pill(24, 314, 176, 'Edit mode · 1 face selected')}`, [90, 260], 260);
  }

  function featVfx() {
    const u = uid();
    const marks = [[110, 178], [190, 232], [290, 146], [392, 238], [470, 194], [560, 254], [250, 296], [430, 284]];
    const m = marks.map(([x, y]) => `
      <polyline points="${x - 16},${y + 6} ${x - 8},${y + 3} ${x},${y}" fill="none" stroke="#52ff8a" stroke-opacity=".6" stroke-width="1.4"/>
      <rect x="${x - 7}" y="${y - 7}" width="14" height="14" fill="none" stroke="#52ff8a" stroke-width="1.6"/>
      <line x1="${x - 3}" y1="${y}" x2="${x + 3}" y2="${y}" stroke="#52ff8a"/><line x1="${x}" y1="${y - 3}" x2="${x}" y2="${y + 3}" stroke="#52ff8a"/>`).join('');
    return frame(u, 'VFX — Motion Tracking', `
      <rect x="12" y="44" width="616" height="300" fill="url(#${u}sk)"/>
      <circle cx="500" cy="100" r="28" fill="#fff6d6" opacity=".95"/>
      <polygon points="12,262 110,172 190,230 290,140 390,235 470,190 560,252 628,214 628,344 12,344" fill="#3c4a5a"/>
      <polygon points="12,302 140,248 260,294 380,260 520,302 628,272 628,344 12,344" fill="#27323f"/>
      ${m}
      <path d="M40 332 C180 300 300 332 420 302 S560 284 610 304" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" stroke-dasharray="6 5"/>
      ${pill(24, 60, 136, 'Camera solved ✓')}`, [80, 180, 300, 440], 300);
  }

  function bone(x1, y1, x2, y2, c) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l = Math.hypot(dx, dy) || 1;
    const nx = -dy / l * 8;
    const ny = dx / l * 8;
    const mx = x1 + dx * 0.2;
    const my = y1 + dy * 0.2;
    return `<polygon points="${x1},${y1} ${(mx + nx).toFixed(1)},${(my + ny).toFixed(1)} ${x2},${y2} ${(mx - nx).toFixed(1)},${(my - ny).toFixed(1)}" fill="${c}" fill-opacity=".9" stroke="#fff" stroke-opacity=".55"/>`;
  }

  function featAnim() {
    const u = uid();
    const p = [[170, 304], [212, 232], [270, 176], [350, 150]];
    const joints = p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff" fill-opacity=".92" stroke="#1a1b22" stroke-width="1.5"/>`).join('');
    return frame(u, 'Animation — Posing', `
      ${GRID}
      <path d="M300 290 C330 210 370 150 400 150" fill="none" stroke="#52ff8a" stroke-width="1.6" stroke-dasharray="5 5"/>
      ${[[300, 290], [322, 230], [350, 186], [400, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#52ff8a"/>`).join('')}
      ${bone(p[0][0], p[0][1], p[1][0], p[1][1], '#4aa3ff')}
      ${bone(p[1][0], p[1][1], p[2][0], p[2][1], '#4aa3ff')}
      ${bone(p[2][0], p[2][1], p[3][0], p[3][1], '#ff9a3d')}
      ${joints}
      <rect x="410" y="190" width="206" height="144" rx="10" fill="#14151b" fill-opacity=".94"/>
      <text x="424" y="208" font-size="9" font-weight="700" font-family="Inter, sans-serif" style="fill:var(--a-mute)">GRAPH EDITOR</text>
      <path d="M424 312 C462 304 484 238 514 232 S574 248 604 222" fill="none" stroke="#ff5d73" stroke-width="2"/>
      <path d="M424 292 C462 312 494 256 534 268 S584 236 604 246" fill="none" stroke="#52ff8a" stroke-width="2"/>
      <path d="M424 302 C452 264 494 304 524 274 S574 284 604 262" fill="none" stroke="#4aa3ff" stroke-width="2"/>
      ${[[424, 312], [514, 232], [604, 222], [424, 292], [534, 268], [424, 302], [524, 274]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`).join('')}`, [70, 170, 260, 380, 500], 380);
  }

  function featDraw() {
    const u = uid();
    const stroke = 'M150 240 C190 140 270 130 310 200 S410 270 470 170';
    return frame(u, 'Grease Pencil — 2D Drawing in 3D', `
      ${GRID}
      <polygon points="150,100 490,100 546,306 96,306" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".3"/>
      <path d="${stroke}" transform="translate(-18 8)" fill="none" stroke="#52ff8a" stroke-opacity=".32" stroke-width="7" stroke-linecap="round"/>
      <path d="${stroke}" transform="translate(18 -8)" fill="none" stroke="#ff5d73" stroke-opacity=".32" stroke-width="7" stroke-linecap="round"/>
      <path d="${stroke}" fill="none" stroke="#ffb347" stroke-width="7" stroke-linecap="round"/>
      <path d="M180 284 C230 252 300 300 380 272 S470 252 504 232" fill="none" stroke="#4aa3ff" stroke-width="4" stroke-linecap="round"/>
      <path d="M470 124 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 l16 -6 z" fill="#fff" fill-opacity=".92"/>
      <path d="M392 140 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 z" fill="#ffb347"/>
      ${pill(24, 314, 128, 'Onion skin: on')}`, [70, 160, 250, 340], 250);
  }

  function featCustom() {
    const u = uid();
    const code = [
      ['', '<tspan fill="#ff79c6">import</tspan> <tspan fill="#8be9fd">bpy</tspan>', 0],
      ['', '', 0],
      ['', '<tspan fill="#ff79c6">for</tspan> o <tspan fill="#ff79c6">in</tspan> bpy.data.objects:', 0],
      ['', 'o.location.z <tspan fill="#ff79c6">+=</tspan> <tspan fill="#bd93f9">1.0</tspan>', 1],
      ['', 'o.scale <tspan fill="#ff79c6">*=</tspan> <tspan fill="#bd93f9">1.2</tspan>', 1],
      ['', '', 0],
      ['', 'bpy.ops.render.<tspan fill="#50fa7b">render</tspan>()', 0]
    ];
    const lines = code.map((l, i) =>
      `<text x="${58 + l[2] * 24}" y="${96 + i * 28}" font-size="13" font-family="ui-monospace, Menlo, Consolas, monospace" fill="#d8dae8">${l[1]}</text>
       <text x="42" y="${96 + i * 28}" font-size="11" font-family="ui-monospace, Menlo, Consolas, monospace" fill="#5a5d70">${i + 1}</text>`).join('');
    const rows = [['Import / Export', true], ['Modeling tools', true], ['Interface theme', false]].map(([t, on], i) => {
      const y = 98 + i * 76;
      return `<rect x="368" y="${y}" width="226" height="58" rx="10" fill="#2a2b36"/>
        <text x="382" y="${y + 24}" font-size="12" font-weight="600" font-family="Inter, sans-serif" fill="#f0f1f8">${t}</text>
        <rect x="382" y="${y + 34}" width="${[96, 122, 80][i]}" height="6" rx="3" fill="#5a5d70"/>
        <rect x="546" y="${y + 20}" width="34" height="18" rx="9" fill="${on ? '#ff9a3d' : '#464858'}"/>
        <circle cx="${on ? 571 : 555}" cy="${y + 29}" r="7" fill="#fff"/>`;
    }).join('');
    return frame(u, 'Scripting — Python', `
      <rect x="12" y="44" width="616" height="300" fill="#1d1e26"/>
      <rect x="30" y="62" width="312" height="264" rx="10" fill="#14151b"/>
      ${lines}
      <rect x="356" y="62" width="250" height="264" rx="10" fill="#20212a"/>
      <text x="368" y="84" font-size="12" font-weight="700" font-family="Inter, sans-serif" fill="#f0f1f8">Extensions</text>
      ${rows}`, [100, 300, 480], 300);
  }

  function small(inner) {
    return `<svg class="art-sm" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="320" height="200" rx="14" style="fill:var(--a-panel2)"/>${inner}</svg>`;
  }

  function resManual() {
    const left = [0, 1, 2, 3, 4].map(i => `<rect x="${74 + i * 1.2}" y="${78 + i * 14}" width="${[62, 50, 66, 40, 54][i]}" height="5" rx="2.5" style="fill:var(--a-line)"/>`).join('');
    const right = [0, 1, 2].map(i => `<rect x="176" y="${108 + i * 14}" width="${[66, 54, 60][i]}" height="5" rx="2.5" style="fill:var(--a-line)"/>`).join('');
    return small(`
      <polygon points="56,52 160,64 160,164 56,152" style="fill:var(--a-panel);stroke:var(--a-line)"/>
      <polygon points="160,64 264,52 264,152 160,164" style="fill:var(--a-panel);stroke:var(--a-line)"/>
      ${left}${right}
      <rect x="176" y="76" width="68" height="24" rx="4" fill="#ff9a3d" fill-opacity=".7"/>
      <path d="M222 52 v34 l8 -8 l8 8 v-36 z" fill="#ff9a3d"/>`);
  }

  function resStudio() {
    let holes = '';
    for (let x = 62; x < 262; x += 20) holes += `<rect x="${x}" y="46" width="10" height="6" rx="2"/><rect x="${x}" y="148" width="10" height="6" rx="2"/>`;
    return small(`
      <rect x="44" y="40" width="232" height="120" rx="10" fill="#1c1d25"/>
      <rect x="56" y="58" width="208" height="84" rx="6" fill="#2d2e3c"/>
      <path d="M56 142 L112 100 L156 126 L204 82 L264 130 V142 Z" fill="#3c4a5a"/>
      <g fill="#fff" fill-opacity=".18">${holes}</g>
      <circle cx="160" cy="100" r="26" fill="#ff9a3d"/>
      <path d="M152 88 L174 100 L152 112 Z" fill="#1a0d00"/>`);
  }

  function resDev() {
    return small(`
      <path d="M96 42 V160" stroke="#4aa3ff" stroke-width="4" fill="none"/>
      <path d="M96 78 C96 102 150 92 150 116 V132 C150 154 96 146 96 160" stroke="#ff9a3d" stroke-width="4" fill="none"/>
      <circle cx="96" cy="50" r="7" fill="#4aa3ff"/><circle cx="96" cy="78" r="7" fill="#4aa3ff"/><circle cx="96" cy="158" r="7" fill="#4aa3ff"/>
      <circle cx="150" cy="116" r="7" fill="#ff9a3d"/><circle cx="150" cy="134" r="7" fill="#ff9a3d"/>
      <text x="236" y="116" font-size="46" font-weight="700" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" fill="#ff9a3d">&lt;/&gt;</text>
      <rect x="196" y="132" width="80" height="6" rx="3" style="fill:var(--a-line)"/>
      <rect x="208" y="146" width="56" height="6" rx="3" style="fill:var(--a-line)"/>`);
  }

  function resCommunity() {
    const pts = [[160, 52], [238, 92], [214, 150], [106, 150], [82, 92]];
    const cols = ['#4aa3ff', '#52ff8a', '#ff5d73', '#ffb347', '#bd93f9'];
    const lines = pts.map(([x, y]) => `<line x1="160" y1="102" x2="${x}" y2="${y}" style="stroke:var(--a-line)" stroke-width="2"/>`).join('');
    const nodes = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="17" fill="${cols[i]}"/><circle cx="${x}" cy="${y - 4}" r="5" fill="#fff" fill-opacity=".85"/><path d="M${x - 9} ${y + 9} q9 -10 18 0 z" fill="#fff" fill-opacity=".85"/>`).join('');
    return small(`${lines}<circle cx="160" cy="102" r="26" fill="#ff9a3d"/><circle cx="160" cy="96" r="7" fill="#1a0d00"/><path d="M146 116 q14 -14 28 0 z" fill="#1a0d00"/>${nodes}`);
  }

  const FEATURES = { render: featRender, model: featModel, vfx: featVfx, anim: featAnim, draw: featDraw, custom: featCustom };
  const RESOURCES = { manual: resManual, studio: resStudio, dev: resDev, community: resCommunity };

  window.Art = {
    hero,
    scene,
    feature: id => (FEATURES[id] ? FEATURES[id]() : ''),
    resource: id => (RESOURCES[id] ? RESOURCES[id]() : '')
  };
})();