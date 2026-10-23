class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="opening" id="top" aria-labelledby="cover-heading">
      <div class="opening-inner">
        <div class="topline"><span>First season in development</span><span>Re:Read / 01</span></div>
        <div class="cover" data-side="front">
          <div class="cover-face front">
            <h1 id="cover-heading">American<br><em>Myths.</em></h1>
            <p>Lost adventurers, athletes, outlaws, detectives, entrepreneurs, dreamers, dealmakers, and renegades.</p>
            <button type="button" class="turn" aria-expanded="false" aria-controls="inside-season">Turn the page <span aria-hidden="true">→</span></button>
          </div>
          <div class="cover-face inside" id="inside-season" hidden>
            <h2>Two books.<br>One season.</h2>
            <p>One overlooked book brought back into print. One wildcard: a new voice, a short story, a novella, or something unexpected.</p>
            <p>The titles will be revealed as the season unfolds.</p>
            <button type="button" class="turn back" aria-label="Return to season cover">← Back</button>
          </div>
        </div>
        <div class="bottomline"><span>A new independent press for books worth another audience.</span><span>Titles to be announced</span></div>
      </div>
    </section>`;
    const cover = this.querySelector(".cover");
    const front = this.querySelector(".front");
    const inside = this.querySelector(".inside");
    const show = (page) => {
      const isInside = page === "inside";
      cover.dataset.side = isInside ? "inside" : "front";
      front.hidden = isInside;
      inside.hidden = !isInside;
      const trigger = front.querySelector(".turn");
      trigger.setAttribute("aria-expanded", String(isInside));
      (isInside ? inside : front).querySelector(".turn").focus();
    };
    front.querySelector(".turn").addEventListener("click", () => show("inside"));
    inside.querySelector(".turn").addEventListener("click", () => show("front"));
  }
}
customElements.define("hero-section", HeroSection);
