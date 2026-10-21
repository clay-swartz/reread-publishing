class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="shell header-inner">
          <a class="wordmark" href="#top" aria-label="Re:Read home">Re:<span>Read</span></a>
          <nav aria-label="Main navigation">
            <a href="#season">The first season</a>
            <a href="#press">The press</a>
          </nav>
        </div>
      </header>
    `;
  }
}
customElements.define("site-header", SiteHeader);
