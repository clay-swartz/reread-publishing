class AboutReread extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="season-section" id="season" aria-labelledby="season-title">
        <div class="shell">
          <div class="season-heading">
            <div><p class="section-label">SEASON 01 · IN DEVELOPMENT</p><h2 id="season-title">American <em>Myths</em></h2></div>
            <p>Fortunes made and lost. Identities invented. The stories a country tells about itself.</p>
          </div>
          <div class="season-publications">
            <article class="publication">
              <div class="publication-index">01 / THE REDISCOVERY</div>
              <h3>A forgotten book.<br>A new audience.</h3>
              <p>One overlooked work of fiction or nonfiction, selected for the pleasure of reading it today—not its age or reputation.</p>
              <div class="publication-status">TITLE TO BE ANNOUNCED</div>
            </article>
            <article class="publication">
              <div class="publication-index">02 / THE WILDCARD</div>
              <h3>Something you<br>didn't see coming.</h3>
              <p>Original writing, a novella, a graphic work, an unexpected reissue. The second release takes the season somewhere new.</p>
              <div class="publication-status">REVEALED LATER IN THE SEASON</div>
            </article>
          </div>
          <p class="season-note">Two individual editions. One shared theme. The books will be announced as the season unfolds. No titles have been acquired or announced yet.</p>
        </div>
      </section>
      <section class="press-section" id="press" aria-labelledby="press-title">
        <div class="shell press-grid">
          <h2 id="press-title">A press built<br>on <em>discovery.</em></h2>
          <div>
            <p>Re:Read is a new independent publishing house acquiring overlooked writing from any decade and publishing original work alongside it.</p>
            <p>Four themed seasons shape the editorial calendar. Each has a rediscovery and a wildcard, presented as thoughtfully made, individually published books.</p>
            <p>Rights are researched and secured before an edition is announced. The first season is currently in acquisition and development.</p>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define("about-reread", AboutReread);
