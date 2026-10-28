const root=document.getElementById('experience');
const controls=[...document.querySelectorAll('[data-option]')];
const layouts={a:'layout-a',b:'layout-b',c:'layout-c'};
function setOption(option){if(!layouts[option])return;root.className=layouts[option];controls.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.option===option)));history.replaceState(null,'','#'+option)}
controls.forEach(b=>b.addEventListener('click',()=>setOption(b.dataset.option)));
if(layouts[location.hash.slice(1)])setOption(location.hash.slice(1));
const paperNames=['01-french-blue.webp','03-ebony-marble.webp','04-block-print-floral.webp','05-crimson-peacock.webp','06-acanthus-leaf.webp','07-classic-speckle.webp','08-botanical-ivy.webp','09-lapis-pebble.webp','10-terracotta-fan.webp','12-ink-petal.webp','13-soft-confetti.webp','21-saffron-tesserae.webp','22-lilac-stencil.webp'];
const paper=document.getElementById('paper');let index=Math.floor(Math.random()*paperNames.length);
function changePaper(n){const image=new Image();image.onload=()=>{paper.style.backgroundImage='url("'+image.src+'")';index=n};image.src='/endpapers/collection/'+paperNames[n]}
changePaper(index);document.querySelector('.hero').addEventListener('click',e=>{if(e.target===paper||e.target===document.querySelector('.hero'))changePaper((index+1+Math.floor(Math.random()*(paperNames.length-1)))%paperNames.length)});
const about=document.getElementById('aboutDialog'),submission=document.getElementById('submissionDialog');
document.getElementById('aboutButton').onclick=()=>about.showModal();document.getElementById('submissions').onclick=()=>submission.showModal();
for(const d of [about,submission]){d.querySelector('[data-close]').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()}}
const mark=document.querySelector('.wordmark');if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const pulse=()=>{mark.classList.remove('shift');void mark.offsetWidth;mark.classList.add('shift')};mark.addEventListener('mouseenter',pulse);mark.addEventListener('focus',pulse);setInterval(pulse,9500)}
