class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="top">
        <div class="hero-inner">
          <div class="copy">
            <h1>
              Bringing stories
              <em>lost to time</em>
              back to print.
            </h1>

            <p class="hero-body">
              Our first drop: <strong>American Myths.</strong>
              We’re digging through the stacks for lost adventurers, athletes,
              outlaws, detectives, entrepreneurs, dreamers, dealmakers, and renegades.
            </p>

            <join-form></join-form>
          </div>

          <archive-stack></archive-stack>
        </div>
      </section>
    `;
  }
}

customElements.define("hero-section", HeroSection);
