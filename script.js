// Mobile menu toggle
const burger = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open');
  });

  // Close on link click
  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });
}

// Smooth scroll for in-page links (simple, accessible)
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
