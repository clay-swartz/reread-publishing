class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero hero-patterned" id="top">
        <div class="hero-pattern" aria-hidden="true"></div>
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>Lost to time.<br><em>Back in print.</em></h1>
            <p class="hero-lede">
              Our first drop: <strong>American Myths.</strong>
              We’re digging through the stacks for lost adventurers, athletes,
              outlaws, detectives, entrepreneurs, dreamers, dealmakers, and renegades.
            </p>
            <p class="hero-proof-line"><strong>Founding members:</strong> see the shortlist · weigh in · get first access</p>
          </div>

          <join-form></join-form>
        </div>
      </section>
    `;
  }
}

customElements.define("hero-section", HeroSection);
