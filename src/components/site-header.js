class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="wordmark" href="#top" aria-label="Re:Read home">Re:<span>Read</span></a>
          <div class="header-meta" aria-label="Current Re:Read release">
            <span>First drop</span>
            <strong>American Myths</strong>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);
