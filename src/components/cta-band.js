class CtaBand extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="site-footer"><span>Re:Read</span><span>First season in development.</span></footer>`;
  }
}
customElements.define("cta-band", CtaBand);
