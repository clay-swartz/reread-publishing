class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-photograph" role="img" aria-label="An early twentieth-century photograph of the Library of Congress reading room"></div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="shell hero-inner">
          <div class="hero-meta"><span>THE LOST & FOUND OF BOOKS</span><span>VOL. 001 — AN INTRODUCTION</span></div>
          <h1 id="hero-title">The best books<br>are still out <em>there.</em></h1>
          <p>Re:Read is an independent press giving overlooked books another audience—and publishing unexpected new work along the way.</p>
          <a href="#season" class="hero-link">Discover the first season <span aria-hidden="true">↘</span></a>
        </div>
        <div class="hero-photo-credit">Library of Congress · Detroit Publishing Co., c. 1905</div>
      </section>`;
  }
}
customElements.define("hero-section", HeroSection);
