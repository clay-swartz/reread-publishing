class CtaBand extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-inner">
          <div><a class="footer-wordmark" href="#top">Re:Read</a><p>An independent press for the books you missed.</p></div>
          <p>First editions in development.<br>Acquisitions and publishing information coming soon.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define("cta-band", CtaBand);
