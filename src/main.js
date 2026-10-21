import "./components/site-header.js";
import "./components/hero-section.js";
import "./components/about-reread.js";
import "./components/cta-band.js";

class ReReadApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <site-header></site-header>
      <main>
        <hero-section></hero-section>
        <about-reread></about-reread>
      </main>
      <cta-band></cta-band>
    `;
  }
}
customElements.define("reread-app", ReReadApp);
