/* =============================================
   TOURISM GUIDANCE — MAIN JS
   ============================================= */

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNavLink();
});

/* ===== MOBILE MENU ===== */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const navSections = document.querySelectorAll('section[id]');
function highlightNavLink() {
  let current = '';
  navSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ===== PARALLAX HERO ===== */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
});

/* ===== DARK / LIGHT TOGGLE ===== */
const themeBtn = document.getElementById('themeToggle');
let isDark = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

/* ===== STATS COUNTER ===== */
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function animateCounters() {
  if (counted) return;
  const statsEl = document.querySelector('.stats-section');
  if (!statsEl) return;
  const rect = statsEl.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    counted = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ===== SITES TABS ===== */
function showSite(siteId, btn) {
  document.querySelectorAll('.site-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('site-' + siteId);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ===== SITE SEARCH ===== */
function filterSites(val) {
  const q = val.trim().toLowerCase();
  const tabs = document.getElementById('sitesTabs');

  if (!q) {
    // Reset: show all tabs, activate giza
    document.querySelectorAll('.tab-btn').forEach(b => b.style.display = '');
    showSite('giza', document.querySelector('.tab-btn[data-site="giza"]'));
    return;
  }

  let firstMatch = null;
  document.querySelectorAll('.site-panel').forEach(panel => {
    const name = (panel.dataset.name || '') + panel.querySelector('h3').textContent;
    const match = name.toLowerCase().includes(q);
    const siteId = panel.id.replace('site-', '');
    const tabBtn = document.querySelector(`.tab-btn[data-site="${siteId}"]`);
    if (tabBtn) tabBtn.style.display = match ? '' : 'none';
    if (match && !firstMatch) firstMatch = { siteId, tabBtn };
  });

  if (firstMatch) showSite(firstMatch.siteId, firstMatch.tabBtn);
}

/* ===== SCROLL TO NEW STUDENTS ON LOAD ===== */
window.addEventListener('load', () => {
  // Small delay to let page render
  setTimeout(() => {
    const target = document.getElementById('new-students');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 400);
});
