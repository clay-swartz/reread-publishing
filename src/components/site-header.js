class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <nav class="nav" aria-label="Primary">
          <a class="brand" href="#top" aria-label="Re:Read home"><span>Re:</span>Read</a>
        </nav>
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);
