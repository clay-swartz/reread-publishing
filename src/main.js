import "./components/site-header.js";
import "./components/join-form.js";
import "./components/archive-stack.js";
import "./components/hero-section.js";

class ReReadApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <site-header></site-header>
      <main>
        <hero-section></hero-section>
      </main>
    `;
  }
}

customElements.define("reread-app", ReReadApp);
