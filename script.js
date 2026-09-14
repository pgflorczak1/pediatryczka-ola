(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = document.querySelector('.top');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');

  // Pasek nawigacji
  const onScroll = () => top && top.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobilne
  if (burger && menu) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      top.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // Pojawianie się sekcji przy przewijaniu
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  // Delikatna paralaksa zdjęć pełnoekranowych
  const px = document.querySelectorAll('[data-parallax]');
  if (px.length && !reduce) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      px.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        el.style.transform = `translate3d(0, ${p * -6}%, 0) scale(1.12)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  // Aktywny link w menu
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.menu a[href^="#"]')];
  if (sections.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => so.observe(s));
  }

  // Lightbox dla obrazów
  const lb = document.getElementById('lightbox');
  if (lb) {
    const img = lb.querySelector('img');
    const cap = lb.querySelector('figcaption');
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; };
    document.querySelectorAll('.art__link').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        img.src = a.getAttribute('href');
        img.alt = a.dataset.title || '';
        cap.textContent = a.dataset.title || '';
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lightbox__close')) close(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) close(); });
  }

  // Przeciąganie paska zdjęć myszą
  const strip = document.querySelector('[data-drag]');
  if (strip) {
    let down = false, startX = 0, left = 0;
    strip.addEventListener('pointerdown', (e) => { down = true; startX = e.clientX; left = strip.scrollLeft; strip.classList.add('is-drag'); });
    window.addEventListener('pointerup', () => { down = false; strip.classList.remove('is-drag'); });
    strip.addEventListener('pointermove', (e) => { if (down) strip.scrollLeft = left - (e.clientX - startX); });
  }

  // Liczniki w sekcji „Książka”
  const nums = document.querySelectorAll('.facts__n');
  if (nums.length && !reduce && 'IntersectionObserver' in window) {
    const no = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; const target = parseInt(el.textContent, 10);
        if (isNaN(target)) { no.unobserve(el); return; }
        const t0 = performance.now(); const dur = 1200;
        const step = (t) => { const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(target * e); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step); no.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => no.observe(n));
  }
})();
