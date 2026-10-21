class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="top">
        <div class="shell hero-inner">
          <p class="issue-line">AN INDEPENDENT PUBLISHING HOUSE · EST. 2026</p>
          <h1>Lost to time.<br><em>Back in print.</em></h1>
          <div class="hero-footer">
            <p>Extraordinary books don't always find their audience the first time. Re:Read gives overlooked writing another chance—and makes room for unexpected new voices.</p>
            <a class="text-link" href="#season">Explore the first season <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define("hero-section", HeroSection);
