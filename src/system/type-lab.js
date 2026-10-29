/* Review-only typography switcher; only the headline changes. */
const fontOptions={
  space:{family:'"Space Grotesk",sans-serif',weight:'700',tracking:'-.079em',description:'Space Grotesk — our current reference.'},
  bricolage:{family:'"Bricolage Grotesque",sans-serif',weight:'800',tracking:'-.068em',description:'Bricolage Grotesque — bold, lively, with subtle eccentricity.'},
  archivo:{family:'"Archivo Black",sans-serif',weight:'400',tracking:'-.075em',description:'Archivo Black — dense, direct, unapologetically heavy.'},
  syne:{family:'"Syne",sans-serif',weight:'800',tracking:'-.065em',description:'Syne — graphic and unconventional without losing clarity.'},
  fraunces:{family:'"Fraunces",serif',weight:'900',tracking:'-.066em',description:'Fraunces — a dramatic, literary alternative to sans-serif.'}
};
const choiceButtons=[...document.querySelectorAll('[data-type]')];
const description=document.getElementById('typeDescription');
function chooseFont(name){
 const option=fontOptions[name];if(!option)return;
 document.documentElement.style.setProperty('--rr-display-font',option.family);
 document.documentElement.style.setProperty('--rr-display-weight',option.weight);
 document.documentElement.style.setProperty('--rr-display-tracking',option.tracking);
 for(const button of choiceButtons){const selected=button.dataset.type===name;button.classList.toggle('is-selected',selected);button.setAttribute('aria-pressed',String(selected));}
 if(description)description.textContent=option.description;
 const url=new URL(window.location.href);url.searchParams.set('font',name);history.replaceState(null,'',url);
}
for(const button of choiceButtons){button.addEventListener('click',()=>chooseFont(button.dataset.type));}
const slider=document.getElementById('typeScale'),output=document.getElementById('typeScaleValue');
slider?.addEventListener('input',()=>{document.documentElement.style.setProperty('--rr-type-scale',String(Number(slider.value)/100));if(output)output.textContent=slider.value+'%';});
const initial=new URL(window.location.href).searchParams.get('font');
if(initial&&fontOptions[initial])chooseFont(initial);
