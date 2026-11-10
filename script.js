const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const FEATURE_IMAGES = {};

const FEATURES = [
  {
    id: 'render', icon: '✨', tab: 'Cycles rendering', title: 'Cycles: photorealistic rendering',
    text: 'A render engine that simulates light physically, for believable images.',
    bullets: ['Physically based path tracer', 'Real-time preview', 'CPU and GPU rendering', 'PBR and HDR materials', 'Virtual reality (VR) support']
  },
  {
    id: 'model', icon: '🧊', tab: 'Modeling, sculpting, UV', title: 'Modeling, sculpting and UV',
    text: 'Tools for any shape, from simple objects to detailed characters.',
    bullets: ['N-gon support', 'Complete modeling tools', 'Sculpting with multires', '3D painting directly on the model', 'Python scripting']
  },
  {
    id: 'vfx', icon: '🎬', tab: 'VFX', title: 'VFX and motion tracking',
    text: 'Blend 3D elements into real footage, with camera reconstruction.',
    bullets: ['Automatic and manual tracking', 'Camera reconstruction', 'Planar tracking', 'Tripod camera solvers']
  },
  {
    id: 'anim', icon: '🦴', tab: 'Animation and rigging', title: 'Animation and rigging',
    text: 'Bring characters to life with bones, curves and sound sync.',
    bullets: ['Skinning', 'B-spline bones', 'Graph editor', 'Dope sheet', 'Sound sync']
  },
  {
    id: 'draw', icon: '✏️', tab: '2D drawing in 3D', title: '2D drawing in 3D space',
    text: 'Combine hand drawing with 3D scenes, for drawn stories with their own rhythm.',
    bullets: ['2D and 3D drawing combined', 'Onion skinning', 'Stroke layers', 'Fill layers']
  },
  {
    id: 'custom', icon: '🧩', tab: 'Make it your own', title: 'Make it your own',
    text: 'Adapt the program to the way you work, with Python and add-ons.',
    bullets: ['Python-controlled interface', 'Add-ons and extensions', 'Hi-DPI support', 'Custom tools']
  }
];

const root = document.documentElement;
const themeBtn = $('#themeToggle');

function paintTheme(t) {
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0c10' : '#f7f7fb');
}

paintTheme(root.getAttribute('data-theme') || 'dark');

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  paintTheme(next);
  try { localStorage.setItem('bl-theme', next); } catch (e) {}
});

$$('[data-art]').forEach(el => {
  const k = el.dataset.art;
  el.innerHTML = k === 'hero' ? Art.hero() : k === 'scene' ? Art.scene() : Art.resource(k);
});

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('a', navLinks).forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const linkMap = new Map($$('a[href^="#"]', navLinks).map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    linkMap.forEach(l => l.classList.remove('active'));
    const l = linkMap.get(e.target.id);
    if (l) l.classList.add('active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => spy.observe(s));

const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
$$('[data-reveal]').forEach(el => revealer.observe(el));

function detectOS() {
  const ua = navigator.userAgent || '';
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  const s = (platform + ' ' + ua).toLowerCase();
  if (/android|iphone|ipad|ipod/.test(s)) return null;
  if (/mac/.test(s)) return 'macOS';
  if (/win/.test(s)) return 'Windows';
  if (/linux|x11|cros/.test(s)) return 'Linux';
  return null;
}

const os = detectOS();
$$('[data-download]').forEach(a => {
  if (!os) return;
  if (a.classList.contains('nav-cta')) return;
  a.textContent = `Download for ${os}`;
});

const words = ['Modeling', 'Sculpting', 'Animation', 'Rigging', 'VFX', 'Rendering', '2D drawing', 'Simulations', 'Compositing', 'Python'];
const marqueeHtml = words.map(w => `<span>${w}</span><i>✦</i>`).join('');
$('#marqueeTrack').innerHTML = marqueeHtml + marqueeHtml;

const featTabs = $('#featTabs');
const featPanel = $('#featPanel');
let activeFeat = 0;

function renderTabs() {
  featTabs.innerHTML = FEATURES.map((f, i) => `
    <button class="tab" type="button" role="tab" id="tab-${f.id}" aria-selected="${i === activeFeat}" aria-controls="featPanel" tabindex="${i === activeFeat ? 0 : -1}" data-i="${i}">
      <span class="ico" aria-hidden="true">${f.icon}</span><span>${f.tab}</span>
    </button>`).join('');
}

function renderPanel() {
  const f = FEATURES[activeFeat];
  const img = FEATURE_IMAGES[f.id];
  const art = img ? `<img src="${img}" alt="${f.title}" loading="lazy">` : Art.feature(f.id);
  featPanel.setAttribute('aria-labelledby', `tab-${f.id}`);
  featPanel.innerHTML = `
    <div class="panel-art">${art}</div>
    <div class="panel-body">
      <h3>${f.title}</h3>
      <p>${f.text}</p>
      <ul class="bullets">${f.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>`;
}

function selectFeat(i, focus) {
  activeFeat = (i + FEATURES.length) % FEATURES.length;
  renderTabs();
  renderPanel();
  if (focus) $(`.tab[data-i="${activeFeat}"]`, featTabs).focus();
}

featTabs.addEventListener('click', e => {
  const b = e.target.closest('.tab');
  if (b) selectFeat(Number(b.dataset.i), false);
});
featTabs.addEventListener('keydown', e => {
  const next = ['ArrowDown', 'ArrowRight'];
  const prev = ['ArrowUp', 'ArrowLeft'];
  if (next.includes(e.key)) {
    e.preventDefault();
    selectFeat(activeFeat + 1, true);
  } else if (prev.includes(e.key)) {
    e.preventDefault();
    selectFeat(activeFeat - 1, true);
  }
});

renderTabs();
renderPanel();

const samples = $('#samples');
const sampleOut = $('#sampleOut');
const denoise = $('#denoise');
const noise = $('#noise');
const renderTag = $('#renderTag');

function paintRender() {
  const exp = Number(samples.value);
  const n = Math.pow(2, exp);
  let op = Math.max(0, 1 - exp / 9);
  if (denoise.checked) op *= 0.1;
  noise.style.opacity = op.toFixed(3);
  sampleOut.textContent = n.toLocaleString('en-US');
  renderTag.textContent = `${n.toLocaleString('en-US')} ${n === 1 ? 'sample' : 'samples'}${denoise.checked ? ' · denoise' : ''}`;
}

samples.addEventListener('input', paintRender);
denoise.addEventListener('change', paintRender);
paintRender();

const tiltEl = $('.tilt');
const canTilt = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tiltEl && canTilt) {
  const host = tiltEl.parentElement;
  host.addEventListener('mousemove', e => {
    const r = host.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltEl.style.transform = `perspective(1200px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
  });
  host.addEventListener('mouseleave', () => { tiltEl.style.transform = ''; });
}

$('#year').textContent = new Date().getFullYear();