import {CoverStream} from './cover-stream.js';
const [content,covers]=await Promise.all([
 fetch('/src/content/hero-v2.json').then(r=>{if(!r.ok)throw Error('Hero data unavailable');return r.json()}),
 fetch('/src/content/cover-stream.json').then(r=>{if(!r.ok)throw Error('Cover data unavailable');return r.json()})
]);
const el=document.querySelector('[data-hero]');
el.querySelector('[data-headline]').textContent=content.headline;
el.querySelector('[data-description]').textContent=content.description;
el.querySelector('[data-primary]').textContent=content.primaryLabel;
el.querySelector('[data-secondary]').textContent=content.secondaryLabel;
el.querySelector('[data-collection-title]').textContent=content.collectionTitle;
el.querySelector('[data-collection-body]').textContent=content.collectionBody;
document.querySelector('[data-submission-body]').textContent=content.submissionBody;
const coverImage=el.querySelector('[data-cover-image]');
const playable=[];
for(const cover of covers){playable.push(cover);}
coverImage.src=playable[0].src;
coverImage.alt=playable[0].alt;
new CoverStream(el.querySelector('[data-cover-stream]'),playable);
const paperNames=['01-french-blue.webp','03-ebony-marble.webp','04-block-print-floral.webp','05-crimson-peacock.webp','06-acanthus-leaf.webp','07-classic-speckle.webp','08-botanical-ivy.webp','09-lapis-pebble.webp','10-terracotta-fan.webp','12-ink-petal.webp','13-soft-confetti.webp','21-saffron-tesserae.webp','22-lilac-stencil.webp'];
const stage=document.querySelector('.hero-surround'),paper=document.querySelector('.hero-endpaper');
let current=Math.floor(Math.random()*paperNames.length);
async function choosePaper(index){
 const src='/endpapers/collection/'+paperNames[index];
 const test=new Image();
 await new Promise(resolve=>{test.onload=resolve;test.onerror=resolve;test.src=src});
 if(test.naturalWidth){paper.style.backgroundImage='url("'+src+'")';current=index;}
}
choosePaper(current);
stage.addEventListener('click',e=>{if(e.target!==stage&&e.target!==paper)return;choosePaper((current+1+Math.floor(Math.random()*(paperNames.length-1)))%paperNames.length)});
const about=document.getElementById('aboutDialog');
const submission=document.getElementById('submitDialog');
document.querySelector('[data-about]').addEventListener('click',()=>about.showModal());
document.querySelector('[data-secondary]').addEventListener('click',()=>submission.showModal());
for(const dialog of [about,submission]){
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
const brand=document.querySelector('.wordmark');
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 const pulse=()=>{brand.classList.remove('shift');void brand.offsetWidth;brand.classList.add('shift')};
 brand.addEventListener('mouseenter',pulse);brand.addEventListener('focus',pulse);
 setInterval(pulse,9500);
}
