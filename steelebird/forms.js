(()=>{"use strict";const endpoint="https://uymwsivcgtapckzjoywk.supabase.co/functions/v1/steelebird-intake";const forms=document.querySelectorAll('form[data-steelebird-form]');for(const form of forms){const button=form.querySelector('button[type="submit"]');const status=form.querySelector('[data-form-status]');const kind=form.dataset.steelebirdForm;const started=Date.now();form.addEventListener("submit",async event=>{event.preventDefault();if(!form.reportValidity())return;button.disabled=true;const old=button.textContent;button.textContent="Sending…";status.textContent="";status.dataset.state="";try{const payload=new FormData(form);payload.set("kind",kind);payload.set("started_at",String(started));const response=await fetch(endpoint,{method:"POST",body:payload,mode:"cors",credentials:"omit"});const result=await response.json().catch(()=>({}));if(!response.ok||!result.ok)throw new Error(result.error||"Unable to send right now. Please try again.");if(kind==="submission"){
  const card=form.closest(".sb-submit-card");
  if(card){
   const heading=document.createElement("h2");heading.textContent="Thanks for submitting!";
   const intro=document.createElement("p");intro.textContent="We know sending your work out into the world can be nerve-racking. So first, congratulations on getting this far. That's no small thing.";
   const next=document.createElement("h3");next.textContent="What happens next?";
   const details=document.createElement("p");
   details.append("We'll read your work and get back to you within 60 days. Feeling a little antsy in the meantime? You're always welcome to check in with us at ");
   const emailLink=document.createElement("a");emailLink.href="mailto:hello@steelebird.com";emailLink.textContent="hello@steelebird.com";
   details.append(emailLink,".");
   const closing=document.createElement("p");closing.textContent="Thanks for trusting Steelebird with your work. We're looking forward to reading it.";
   const confirmation=document.createElement("div");confirmation.className="sb-submission-confirmation";confirmation.setAttribute("role","status");confirmation.setAttribute("aria-live","polite");
   confirmation.append(heading,intro,next,details,closing);
   card.replaceChildren(confirmation);
   heading.setAttribute("tabindex","-1");heading.focus();
  }else{status.textContent=result.message||"Received. Thank you.";status.dataset.state="success";form.reset();}
 }else{status.textContent=result.message||"Received. Thank you.";status.dataset.state="success";form.reset();}}catch(error){status.textContent=error.message||"Could not send your request.";status.dataset.state="error";}finally{button.textContent=old;button.disabled=false;}});}})();
/* Accessible file-name feedback for the styled manuscript chooser. */
(()=>{
 const field=document.getElementById('sb-sub-file');
 const name=document.getElementById('sb-attachment-name');
 if(!field||!name)return;
 const initial=name.textContent;
 field.addEventListener('change',()=>{
   const file=field.files&&field.files[0];
   name.textContent=file?file.name:initial;
 });
 field.form?.addEventListener('reset',()=>{name.textContent=initial;});
})();
