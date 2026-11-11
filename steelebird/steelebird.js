/* Rotating book-jacket wordmark: a succession of recognizable publishing styles.
   Based on the earlier Re:Read color shuffle, expanded to typeface and format.
   All variants preserve the accessible brand name and link destination. */
(() => {
  const marks = [...document.querySelectorAll('.sb-wordmark')];
  if (!marks.length) return;

  const covers = [
    'modern', 'literary', 'paperback', 'modernist', 'typewriter',
    'classic', 'experimental', 'edition', 'romance'
  ];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer = null;
  let paused = false;

  const show = () => {
    marks.forEach(mark => {
      mark.dataset.cover = covers[index];
      mark.classList.remove('is-cover-switching');
    });
  };

  const advance = () => {
    if (reduced.matches || document.hidden || paused) return;
    index = (index + 1) % covers.length;
    show();
  };

  const start = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
    if (!reduced.matches) timer = window.setInterval(advance, 1700);
  };

  marks.forEach(mark => {
    mark.addEventListener('mouseenter', () => { paused = true; });
    mark.addEventListener('mouseleave', () => { paused = false; });
    mark.addEventListener('focusin', () => { paused = true; });
    mark.addEventListener('focusout', () => { paused = false; });
  });

  reduced.addEventListener?.('change', () => {
    if (reduced.matches) index = 0;
    show();
    start();
  });

  show();
  start();
})();
