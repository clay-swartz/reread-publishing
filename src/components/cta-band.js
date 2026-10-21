class CtaBand extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="site-footer"><div class="shell footer-inner"><a href="#top" class="footer-wordmark">Re:Read</a><p>An independent publishing house. First season in development.</p><a href="#top" class="back-top">Back to top ↑</a></div></footer>`;
  }
}
customElements.define("cta-band", CtaBand);
