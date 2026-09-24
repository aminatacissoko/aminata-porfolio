/* ============================================================
   main.js — Interactions JavaScript du portfolio
   Phase 3 : menu mobile, nav active au scroll, animations
   ============================================================ */

/* ----------------------------------------------------------
   1. MENU HAMBURGER (mobile)
   ---------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');

  if (isOpen) {
    mobileMenu.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
  } else {
    mobileMenu.classList.remove('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
  }
});

// Fermer le menu quand on clique un lien
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ----------------------------------------------------------
   2. NAV ACTIVE AU SCROLL
   Highlight le lien correspondant à la section visible
   ---------------------------------------------------------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        link.classList.remove('text-accent');
        link.classList.add('text-muted');
      });

      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.remove('text-muted');
        activeLink.classList.add('text-accent');
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ----------------------------------------------------------
   3. ANIMATION D'APPARITION DES SECTIONS (fade-in au scroll)
   ---------------------------------------------------------- */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-6');
      fadeObserver.unobserve(entry.target); // une seule fois
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));
