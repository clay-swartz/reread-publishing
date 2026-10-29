/* Page behavior — accessible interactions; no invented signup backend. */
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const mark=document.querySelector('.rr-wordmark');
if(mark){
  const morph=()=>{if(prefersReducedMotion.matches)return;mark.classList.remove('is-morphing');void mark.offsetWidth;mark.classList.add('is-morphing')};
  mark.addEventListener('mouseenter',morph);
  mark.addEventListener('focus',morph);
  window.setInterval(()=>{if(document.visibilityState==='visible')morph()},9500);
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

/* Acquisition preview: validate locally; never collect or imply submission before backend approval. */
const bookIdeaForm=document.getElementById('bookIdeaForm');
if(bookIdeaForm){
  bookIdeaForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!bookIdeaForm.reportValidity())return;
    const status=bookIdeaForm.querySelector('[role="status"]');
    if(status)status.textContent="This form is a design preview. Your book idea wasn't submitted or saved.";
  });
}
