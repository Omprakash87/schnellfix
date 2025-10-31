// ===== Mobile Nav =====
const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });
}

// ===== Smooth Anchor Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== AOS-lite (Intersection Observer) =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('aos-animate');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('[data-aos], .card, .feature, .step').forEach(el => io.observe(el));

// ===== Stat Counter =====
const counters = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count || 0;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target + '+'; return; }
      el.textContent = cur + '+';
      requestAnimationFrame(tick);
    };
    tick();
    obs.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => statObserver.observe(el));

// ===== Parallax Hero Orbs =====
const orbs = document.querySelectorAll('.orb');
window.addEventListener('scroll', () => {
  const y = window.scrollY || 0;
  orbs.forEach((o, i) => {
    const speed = (i + 1) * 0.06;
    o.style.transform = `translateY(${y * speed}px)`;
  });
});

// ===== Active Link Highlight on Scroll =====
const sections = document.querySelectorAll('section[id], header#home');
const links = document.querySelectorAll('.nav-link');

const setActive = () => {
  let cur = 'home';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY + 120 >= top) cur = sec.id || 'home';
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
  });
};
setActive();
window.addEventListener('scroll', setActive);

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item').forEach(btn => {
  const panel = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.style.display = open ? 'none' : 'block';
  });
});

// ===== Console Greeting =====
console.log('%cSchnellFix loaded ✨', 'color:#a78bfa;font-weight:700;font-size:14px');
