class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header" id="top">
        <div class="shell header-inner">
          <a class="wordmark" href="#top" aria-label="Re:Read home">Re:<span>Read</span></a>
          <nav aria-label="Main navigation"><a href="#season">Current season</a><a href="#notes">From the desk</a><a href="#press">About</a></nav>
          <span class="header-imprint">INDEPENDENT PRESS</span>
        </div>
      </header>`;
  }
}
customElements.define("site-header", SiteHeader);
