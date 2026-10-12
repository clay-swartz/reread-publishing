import "./components/site-header.js";
import "./components/join-form.js";
import "./components/hero-section.js";
import "./components/about-reread.js";
import "./components/theme-ticker.js";
import "./components/cta-band.js";

class ReReadApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <site-header></site-header>
      <main>
        <hero-section></hero-section>
        <about-reread></about-reread>
        <theme-ticker></theme-ticker>
        <cta-band></cta-band>
      </main>
    `;
  }
}

customElements.define("reread-app", ReReadApp);
