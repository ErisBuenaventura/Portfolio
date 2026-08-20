// Sticky navbar background on scroll
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });
  mobilePanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobilePanel.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link highlighting
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = ['about', 'services', 'skills', 'projects', 'experience', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = () => {
    let current = null;
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });

  // Scroll reveal
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }
