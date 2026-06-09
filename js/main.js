/* ── STICKY HEADER ── */
const hero = document.getElementById('hero');
const hdr  = document.getElementById('site-header');

function updateHeader() {
  const scrolledPastHero = window.scrollY >= hero.offsetHeight - hdr.offsetHeight;
  hdr.classList.toggle('stuck', scrolledPastHero);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ── HAMBURGER / MOBILE NAV ── */
const btn       = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function toggleMenu(open) {
  btn.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  btn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

btn.addEventListener('click', () => toggleMenu(!btn.classList.contains('open')));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

/* ── HERO VIDEO ── */
const vid      = document.getElementById('hero-video');
const fallback = document.getElementById('hero-fallback');

if (vid) {
  vid.muted = true;
  vid.play().catch(() => {});
  vid.addEventListener('canplay', () => { fallback.style.opacity = '0'; });
  document.addEventListener('click', () => { vid.muted = true; vid.play().catch(() => {}); }, { once: true });
}

/* ── WHAT WE DO ACCORDION PANELS ── */
document.querySelectorAll('.step-panel').forEach(panel => {
  panel.addEventListener('click', () => {
    if (panel.classList.contains('open')) return;
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('open'));
    panel.classList.add('open');
  });
});

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── RUBBER TENNIS BALL CURSOR ── */
(function () {
  /* Skip on touch-only devices */
  if (window.matchMedia('(hover: none)').matches) return;

  const BALL_R  = 14;
  const SPRING  = 0.13;
  const DAMPING = 0.70;
  const TRAIL   = 14;

  /* Colours — neon for hero, navy for all other sections */
  const COLOR_NEON  = { string: '#dbe64c', trail: '#cdd600' };
  const COLOR_NAVY  = { string: '#1e488f', trail: '#1e3a5f' };

  const canvas = document.createElement('canvas');
  canvas.style.cssText = [
    'position:fixed', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:99999'
  ].join(';');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.body.classList.add('rubber-cursor');

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ball  = { x: mouse.x, y: mouse.y, vx: 0, vy: 0 };
  const trail = [];

  /* Track hero bottom edge so we know which colour zone we're in */
  const heroEl = document.getElementById('hero');
  let heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;

  window.addEventListener('scroll', () => {
    if (heroEl) heroBottom = heroEl.getBoundingClientRect().bottom;
  });
  window.addEventListener('resize', () => {
    if (heroEl) heroBottom = heroEl.getBoundingClientRect().bottom;
  });

  function getColors() {
    return mouse.y < heroBottom ? COLOR_NEON : COLOR_NAVY;
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawBall(x, y, r, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.05, x, y, r);
    g.addColorStop(0,   '#f0f060');
    g.addColorStop(0.5, '#cdd600');
    g.addColorStop(1,   '#7a8a00');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = Math.max(1, r * 0.1);
    ctx.beginPath();
    ctx.arc(x + r * 0.05, y, r * 0.8, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r * 0.05, y, r * 0.8, Math.PI + 0.15, -0.15);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.beginPath();
    ctx.ellipse(x - r * 0.28, y - r * 0.3, r * 0.22, r * 0.13, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawString(bx, by, mx, my, color) {
    const dist = Math.hypot(mx - bx, my - by);
    if (dist < 4) return;
    const dx = mx - bx, dy = my - by;
    const midX = (bx + mx) / 2 + dy * 0.1;
    const midY = (by + my) / 2 - dx * 0.1;
    const tension = Math.min(1, dist / 80);
    ctx.save();
    ctx.globalAlpha = tension * 0.5;
    ctx.strokeStyle = color;
    ctx.lineWidth   = Math.max(0.8, 2.5 - dist / 60);
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(midX, midY, mx, my);
    ctx.stroke();
    ctx.globalAlpha = tension * 0.7;
    ctx.fillStyle   = color;
    ctx.beginPath();
    ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.vx = (ball.vx + (mouse.x - ball.x) * SPRING) * DAMPING;
    ball.vy = (ball.vy + (mouse.y - ball.y) * SPRING) * DAMPING;
    ball.x += ball.vx;
    ball.y += ball.vy;

    trail.push({ x: ball.x, y: ball.y });
    if (trail.length > TRAIL) trail.shift();

    const c = getColors();

    for (let i = 1; i < trail.length; i++) {
      const t = i / trail.length;
      ctx.save();
      ctx.globalAlpha = t * 0.18;
      ctx.fillStyle = c.trail;
      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y, BALL_R * t * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawString(ball.x, ball.y, mouse.x, mouse.y, c.string);
    drawBall(ball.x, ball.y, BALL_R, 1);
  }

  loop();
})();