/* Page behavior — accessible interactions; no invented signup backend. */
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const mark=document.querySelector('.rr-wordmark');
if(mark){
  const morph=()=>{if(prefersReducedMotion.matches)return;mark.classList.remove('is-morphing');void mark.offsetWidth;mark.classList.add('is-morphing');const period=document.querySelector('.rr-hero__headline-punctuation');if(period){period.classList.remove('is-morphing');void period.offsetWidth;period.classList.add('is-morphing')}};
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
