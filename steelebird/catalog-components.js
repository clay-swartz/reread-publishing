/* Shared Steelebird shelf controller. One instance per collection. */
class CatalogShelf {
  constructor(track, index) {
    this.track = track;
    this.cards = Array.from(track.children).filter(card => card.classList.contains('catalog-item'));
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    const group = track.closest('.catalog-group');
    const header = group.querySelector('.catalog-group-header');
    const featured = group.classList.contains('catalog-group--featured');
    track.id ||= 'book-shelf-' + (index + 1);
    track.tabIndex = 0;
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Books in ' + header.querySelector('h3').textContent);
    this.controls = document.createElement('div');
    this.controls.className = 'shelf-controls';
    this.controls.hidden = true;
    this.controls.innerHTML = '<span class="shelf-counter" aria-live="polite"></span>' +
      '<button type="button" class="shelf-control" aria-label="Previous books"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button type="button" class="shelf-control" aria-label="Next books"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>';
    if(featured){
      this.controls.innerHTML='<span class="shelf-counter" aria-live="polite"></span><div class="shelf-actions"><button type="button" class="shelf-control" aria-label="Previous titles"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Previous</button><button type="button" class="shelf-control shelf-control--next" aria-label="Next titles">Next titles<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>';
      track.before(this.controls);
    }else{header.append(this.controls);}
    track.dataset.enhanced='true';
    this.counter = this.controls.querySelector('.shelf-counter');
    [this.previous, this.next] = this.controls.querySelectorAll('button');
    [this.previous, this.next].forEach(button => button.setAttribute('aria-controls', track.id));
    this.previous.addEventListener('click', () => this.move(-1));
    this.next.addEventListener('click', () => this.move(1));
    track.addEventListener('scroll', () => this.update(), {passive:true});
    track.addEventListener('keydown', event => {
      if (event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault(); this.move(event.key === 'ArrowRight' ? 1 : -1);
    });
    this.observer = new ResizeObserver(() => this.update());
    this.observer.observe(track);
    this.update();
  }
  move(direction) {
    const step = this.cards[0]?.getBoundingClientRect().width || this.track.clientWidth;
    this.track.scrollBy({left:direction * step, behavior:this.motion.matches?'auto':'smooth'});
  }
  update() {
    const track = this.track;
    const width = track.clientWidth;
    if (!width || !this.cards.length) return;
    const max = Math.max(0,track.scrollWidth-width);
    this.controls.hidden = max < 3;
    this.previous.disabled = track.scrollLeft < 3;
    this.next.disabled = track.scrollLeft >= max-3;
    const step = this.cards[0].getBoundingClientRect().width;
    if (!step) return;
    const first = Math.min(this.cards.length-1, Math.max(0, Math.round(track.scrollLeft/step)));
    const last = Math.min(this.cards.length-1, first+Math.max(1,Math.round(width/step))-1);
    const label = 'Showing '+(first===last?String(first+1):(first+1)+'–'+(last+1))+' of '+this.cards.length+' titles';
    if(this.counter.textContent!==label) this.counter.textContent=label;
  }
}
document.querySelectorAll('.sb-catalog .catalog-items').forEach((track,index)=>{if(!track.closest('.sb-catalog--grid'))new CatalogShelf(track,index);});

/* Use the same endpaper frame when an externally hosted cover cannot load. */
document.querySelectorAll('.sb-catalog .catalog-cover img').forEach(img=>{
  const fallback=()=>{img.hidden=true;img.closest('.catalog-cover').classList.add('catalog-cover--notavailable');};
  img.addEventListener('error',fallback,{once:true});
  if(img.complete&&!img.naturalWidth)fallback();
});
