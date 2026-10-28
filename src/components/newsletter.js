/** Newsletter UI component. Presentation-only until an authenticated signup API is configured. */
export function mountNewsletter(form,{onSubmit}={}){
  if(!form)return;
  const status=form.querySelector('[role="status"]');
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    // Do not collect/store addresses in the preview; never claim success.
    if(!onSubmit){status.textContent="This signup is a design preview. Your email wasn't saved.";return;}
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true;status.textContent='';
    try{await onSubmit({email:form.elements.email.value.trim()});status.textContent="You're on the list.";form.reset()}
    catch(error){status.textContent="We couldn't save your email. Please try again."}
    finally{button.disabled=false}
  });
}
mountNewsletter(document.getElementById('newsletterForm'));
