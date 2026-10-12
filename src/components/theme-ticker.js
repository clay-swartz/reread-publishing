const archetypes = [
  "Adventurers",
  "Athletes",
  "Outlaws",
  "Detectives",
  "Entrepreneurs",
  "Dreamers",
  "Dealmakers",
  "Renegades",
];

function tickerSet(hidden = false) {
  return `
    <div class="theme-ticker-set" ${hidden ? 'aria-hidden="true"' : 'role="list"'}>
      ${archetypes.map((label) => `
        <div class="theme-ticker-item" ${hidden ? "" : 'role="listitem"'}>
          <span class="theme-ticker-dot" aria-hidden="true"></span>
          <span>${label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

class ThemeTicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="theme-ticker-wrap" aria-label="American Myths archetypes">
        <div class="shell">
          <div class="theme-ticker">
            <div class="theme-ticker-viewport" tabindex="0" aria-label="American Myths archetypes. Hover or focus to pause.">
              <div class="theme-ticker-track">
                ${tickerSet(false)}
                ${tickerSet(true)}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("theme-ticker", ThemeTicker);
