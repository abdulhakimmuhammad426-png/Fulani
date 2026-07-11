'use strict';

  /* ── Navbar scroll ─────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Active nav link ───────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }, { passive: true });

  /* ── Hamburger ─────────────────────────── */
  const ham      = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  ham.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Smooth scroll ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - navbar.offsetHeight - 8, behavior: 'smooth' });
    });
  });

  /* ── Reveal animation ──────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => ro.observe(el));

  /* ── Contact form ──────────────────────── */
  document.getElementById('cfSubmit').addEventListener('click', () => {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-msg').value.trim();
    const msgEl = document.getElementById('cfMsg');

    if (!name || !email || !msg) {
      msgEl.className = 'form-msg error';
      msgEl.style.display = 'flex';
      msgEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all required fields.';
      return;
    }

    const btn = document.getElementById('cfSubmit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      msgEl.className = 'form-msg success';
      msgEl.style.display = 'flex';
      msgEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
      document.getElementById('cf-name').value = '';
      document.getElementById('cf-email').value = '';
      document.getElementById('cf-subject').value = '';
      document.getElementById('cf-msg').value = '';
      setTimeout(() => { msgEl.style.display = 'none'; }, 6000);
    }, 1400);
  });

  /* ── Footer year ───────────────────────── */
  document.getElementById('yr').textContent = new Date().getFullYear();