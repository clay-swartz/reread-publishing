/* Page behavior — accessible interactions; no invented signup backend. */
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
/* Color-only shuffle: Re:Read wordmark remains in one fixed Space Grotesk face. */
const mark=document.querySelector('.rr-wordmark');
if(mark){
  const face=mark.querySelector('.rr-wordmark__face');
  const colors=['#1b1b19','#f15a36','#244ddb','#293e52','#5984ff','#992c2b','#192c47','#b5762b','#3f4f63','#d94729'];
  let index=0;
  face.style.fontFamily='"Space Grotesk", Arial, sans-serif';
  face.style.fontWeight='700';
  face.style.fontStyle='normal';
  face.style.letterSpacing='-.082em';
  face.style.fontSize='1em';
  face.style.color=colors[0];
  const shuffle=()=>{
    if(prefersReducedMotion.matches||document.visibilityState!=='visible')return;
    index=(index+1)%colors.length;
    face.style.color=colors[index];
  };
  let interval=window.setInterval(shuffle,1050);
  mark.addEventListener('mouseenter',shuffle);
  mark.addEventListener('focusin',shuffle);
  prefersReducedMotion.addEventListener?.('change',()=>{
    if(prefersReducedMotion.matches){window.clearInterval(interval);index=0;face.style.color=colors[0];}
    else{window.clearInterval(interval);interval=window.setInterval(shuffle,1050);}
  });
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
