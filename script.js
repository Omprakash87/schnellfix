// ===== Mobile Menu =====
const burger = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id && id !== '#') {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ===== AOS-lite =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('[data-anim], .card, .feature, .step').forEach(el => io.observe(el));

// ===== Parallax Orbs =====
const orbs = document.querySelectorAll('.orb');
const onScroll = () => {
  const y = window.scrollY || 0;
  orbs.forEach((o, i) => {
    const speed = (i + 1) * 0.05;
    o.style.transform = `translateY(${y * speed}px)`;
  });
};
onScroll();
window.addEventListener('scroll', onScroll);

// ===== Active Link Highlight =====
const sections = document.querySelectorAll('section[id], header#home');
const links = document.querySelectorAll('.nav-link');
const setActive = () => {
  let cur = 'home';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY + 120 >= top) cur = sec.id || 'home';
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
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

// ===== Console note =====
console.log('%cSchnellFix — polished UI loaded', 'color:#a78bfa;font-weight:700');
