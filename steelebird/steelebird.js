/* Steelebird wordmark: fixed book-cover letterforms, rotating ink colors only.
   Five subdued hues drawn from the botanical ivy/ivory visual system. */
(() => {
  const marks = Array.from(document.querySelectorAll('.sb-wordmark--collage'));
  if (!marks.length) return;
  const palette = ['#365c78','#4c6b60','#8c604e','#627487','#756d56'];
  const letterGroups = marks.map(mark => Array.from(mark.querySelectorAll('.sb-wordmark-letter')));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let step = 0;
  let timer = null;
  const paint = () => {
    if (document.hidden || reduced.matches) return;
    // Two staggered ink changes per tick: letters never change font or position.
    for (const i of [step % 10, (step + 5) % 10]) {
      const color = palette[(Math.floor(step / 2) + i * 2) % palette.length];
      letterGroups.forEach(group => { if (group[i]) group[i].style.color = color; });
    }
    step++;
  };
  const stop = () => { if (timer !== null) clearInterval(timer); timer = null; };
  const refresh = () => {
    stop();
    if (reduced.matches) {
      letterGroups.forEach(group => group.forEach(el => el.style.removeProperty('color')));
    } else {
      timer = window.setInterval(paint, 260);
    }
  };
  reduced.addEventListener?.('change', refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); else stop(); });
  refresh();
})();
