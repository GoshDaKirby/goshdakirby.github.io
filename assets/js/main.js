/* ============================================================
   BEST SOLUTION ENTERPRISES — SHARED JS
   ============================================================ */

(function () {
  'use strict';

  // ── Active nav link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Mobile hamburger ────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  // ── Navbar scroll shadow ────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 32px rgba(0,0,0,0.6)'
        : '';
    }
  });

  // ── Scroll fade-up animations ───────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.05}s`;
      obs.observe(el);
    });
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── Counter animation ───────────────────────────────────
  function animateCount(el, target, suffix = '') {
    let start = 0;
    const dur = 1600;
    const step = 16;
    const inc = target / (dur / step);
    const timer = setInterval(() => {
      start = Math.min(start + inc, target);
      el.textContent = Math.floor(start) + suffix;
      if (start >= target) clearInterval(timer);
    }, step);
  }

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const sobs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCount(el, target, suffix);
          sobs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => sobs.observe(el));
  }

  // ── Contact form handler ─────────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      const btn = form.querySelector('button[type="submit"]');
      const firstName = form.querySelector('[name="firstName"]').value.trim();
      const lastName = form.querySelector('[name="lastName"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();

      if (!firstName || !lastName || !email) {
        msg.className = 'form-msg error';
        msg.textContent = 'Please fill in all required fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.className = 'form-msg error';
        msg.textContent = 'Please enter a valid email address.';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Simulate submission (replace with actual mailto/formspree endpoint)
      setTimeout(() => {
        msg.className = 'form-msg success';
        msg.textContent = 'Thank you! A representative will contact you shortly.';
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Submit Message';
      }, 1200);
    });
  }

})();
