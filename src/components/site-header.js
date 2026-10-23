class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header class="masthead">
      <a class="wordmark" href="#top" aria-label="Re:Read home">Re:<span>Read</span></a>
      <span>Independent publishing house</span>
    </header>`;
  }
}
customElements.define("site-header", SiteHeader);
