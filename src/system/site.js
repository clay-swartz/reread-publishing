/* Page behavior — accessible interactions; no invented signup backend. */
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
/* Re:Read cover-history shuffle: ten distinct typographic idioms, not random loading effects.
   One word at a time, Re: remains fixed. Pause on each cover-language reading. */
const mark=document.querySelector('.rr-wordmark');
if(mark){
  const face=mark.querySelector('.rr-wordmark__face');
  const variants=[
    {font:'"Space Grotesk", sans-serif',color:'#1b1b19',weight:'700',style:'normal',spacing:'-.082em',size:'1em'},
    {font:'"UnifrakturCook", serif',color:'#992c2b',weight:'700',style:'normal',spacing:'-.035em',size:'1.04em'},
    {font:'"Abril Fatface", serif',color:'#244ddb',weight:'400',style:'normal',spacing:'-.07em',size:'1.02em'},
    {font:'"Bebas Neue", sans-serif',color:'#f15a36',weight:'400',style:'normal',spacing:'.018em',size:'1.12em'},
    {font:'"Cinzel Decorative", serif',color:'#293e52',weight:'700',style:'normal',spacing:'-.045em',size:'.94em'},
    {font:'"Bangers", cursive',color:'#244ddb',weight:'400',style:'normal',spacing:'.025em',size:'1.08em'},
    {font:'"Bodoni Moda", serif',color:'#a12d24',weight:'700',style:'italic',spacing:'-.075em',size:'1.02em'},
    {font:'"Special Elite", monospace',color:'#26374a',weight:'400',style:'normal',spacing:'-.095em',size:'.95em'},
    {font:'"Ultra", serif',color:'#f15a36',weight:'400',style:'normal',spacing:'-.065em',size:'.89em'},
    {font:'"Josefin Sans", sans-serif',color:'#244ddb',weight:'700',style:'normal',spacing:'-.075em',size:'1.06em'},
    {font:'"Permanent Marker", cursive',color:'#1b1b19',weight:'400',style:'normal',spacing:'-.08em',size:'.94em'},
    {font:'"Anton", sans-serif',color:'#cb432b',weight:'400',style:'normal',spacing:'-.035em',size:'1.05em'}
  ];
  let index=0,changing=false;
  const paint=()=>{const v=variants[index];face.style.fontFamily=v.font;face.style.color=v.color;face.style.fontWeight=v.weight;face.style.fontStyle=v.style;face.style.letterSpacing=v.spacing;face.style.fontSize=v.size;};
  paint();
  const shuffle=()=>{
    if(prefersReducedMotion.matches||document.visibilityState!=='visible'||changing)return;
    changing=true;face.classList.add('is-changing');
    window.setTimeout(()=>{index=(index+1)%variants.length;paint();face.classList.remove('is-changing');changing=false;},230);
  };
  let interval=window.setInterval(shuffle,2350);
  mark.addEventListener('mouseenter',shuffle);
  mark.addEventListener('focusin',shuffle);
  prefersReducedMotion.addEventListener?.('change',()=>{if(prefersReducedMotion.matches){window.clearInterval(interval);face.classList.remove('is-changing');index=0;paint();}else{window.clearInterval(interval);interval=window.setInterval(shuffle,2350)}});
}
document.querySelectorAll('[data-dialog-open]').forEach(button=>{
  button.addEventListener('click',()=>{
    const dialog=document.getElementById(button.dataset.dialogOpen);
    if(dialog?.showModal)dialog.showModal();
  });
});
document.querySelectorAll('dialog.rr-dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
  dialog.querySelectorAll('[data-close-on-nav]').forEach(link=>link.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
});
const form=document.getElementById('newsletterForm');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    form.querySelector('[role="status"]').textContent="This is a design preview. Your email wasn't saved.";
  });
}

/* Attachment picker is functional in the review, but no submission receiver is connected. */
const bookIdeaForm=document.getElementById('bookIdeaForm');
if(bookIdeaForm){
  const fileInput=bookIdeaForm.querySelector('#bookAttachment');
  const fileName=bookIdeaForm.querySelector('#bookFileName');
  const status=bookIdeaForm.querySelector('[role="status"]');
  const maxSize=10*1024*1024;
  const validExtension=/\.(pdf|doc|docx)$/i;
  fileInput?.addEventListener('change',()=>{
    if(status)status.textContent='';
    const file=fileInput.files?.[0];
    if(!file){if(fileName)fileName.textContent='';return;}
    if(!validExtension.test(file.name)){
      fileInput.value='';
      if(fileName)fileName.textContent='';
      if(status)status.textContent='Please attach a PDF or Word document.';
      return;
    }
    if(file.size>maxSize){
      fileInput.value='';
      if(fileName)fileName.textContent='';
      if(status)status.textContent='This file is larger than 10 MB. Please choose a smaller file.';
      return;
    }
    if(fileName)fileName.textContent=file.name;
  });
  bookIdeaForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!bookIdeaForm.reportValidity())return;
    if(status)status.textContent="Submissions aren't being received yet. Your information and attachment have not been sent or saved.";
  });
}

/* On narrow viewports keep the collection invitation visible, but reveal
   fields on demand. Preserve user's expanded state during desktop changes. */
const intakeDetails=document.querySelector('.rr-book-idea__details');
if(intakeDetails){
  const smallScreen=window.matchMedia('(max-width:700px)');
  const onBreakpoint=(query)=>{intakeDetails.open=!query.matches;};
  onBreakpoint(smallScreen);
  smallScreen.addEventListener?.('change',onBreakpoint);
  document.querySelectorAll('a[href="#book-ideas"]').forEach(link=>{
    link.addEventListener('click',()=>{intakeDetails.open=true;});
  });
}
