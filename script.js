(function () {
  const top = document.querySelector('.top');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');

  // Pasek nawigacji: przezroczysty nad zdjęciem, „szklany” po przewinięciu.
  const onScroll = () => {
    if (!top) return;
    top.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobilne.
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
})();
