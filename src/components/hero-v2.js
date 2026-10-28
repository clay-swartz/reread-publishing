const paperNames=['01-french-blue.webp','03-ebony-marble.webp','04-block-print-floral.webp','05-crimson-peacock.webp','06-acanthus-leaf.webp','07-classic-speckle.webp','08-botanical-ivy.webp','09-lapis-pebble.webp','10-terracotta-fan.webp','12-ink-petal.webp','13-soft-confetti.webp','21-saffron-tesserae.webp','22-lilac-stencil.webp'];
const paper=document.getElementById('paper');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let index=paperNames.indexOf('08-botanical-ivy.webp');let pending=false;
function showPaper(n){if(pending)return;pending=true;const image=new Image();image.onload=()=>{paper.style.backgroundImage='url("'+image.src+'")';index=n;pending=false};image.onerror=()=>{pending=false};image.src='/endpapers/collection/'+paperNames[n]}
showPaper(index);
const about=document.getElementById('aboutDialog'),submission=document.getElementById('submissionDialog');
document.getElementById('aboutButton').onclick=()=>about.showModal();document.getElementById('submissions').onclick=()=>submission.showModal();
for(const d of [about,submission]){d.querySelector('[data-close]').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()}}
const mark=document.querySelector('.wordmark');if(!reduce.matches){const pulse=()=>{if(reduce.matches)return;mark.classList.remove('shift');void mark.offsetWidth;mark.classList.add('shift')};mark.addEventListener('mouseenter',pulse);mark.addEventListener('focus',pulse);setInterval(pulse,9500)}
