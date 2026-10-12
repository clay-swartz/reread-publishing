class CtaBand extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="final-cta">
        <div class="shell final-cta-inner">
          <h2>Help decide what comes back.</h2>
          <a class="button cta-button" href="#join">Join Re:Read</a>
        </div>
      </section>
    `;
  }
}

customElements.define("cta-band", CtaBand);
