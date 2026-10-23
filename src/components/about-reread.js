class AboutReread extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="below" aria-label="About Re:Read and submissions">
      <div><strong>Re:Read</strong> finds overlooked writing from any decade and publishes original work alongside it. Each of four planned seasons brings two distinct books together under one theme.</div>
      <div id="submissions"><strong>Have something for American Myths?</strong> Original fiction, nonfiction, short work, and previously published books with available rights may fit. Submission details will be posted here when the reading window opens. No reading fee.</div>
    </section>`;
  }
}
customElements.define("about-reread", AboutReread);
