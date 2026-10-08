const scenes = [
  {
    className: "scene-adventure",
    html: `
      <div class="scene-mat scene-mat-dark">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1928-10-15_cover.png"
          alt="1928 Adventure magazine cover"
        >
      </div>
    `,
  },
  {
    className: "scene-newspaper",
    html: `
      <div class="scene-mat scene-mat-paper">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Wallstreetbombing1920-page-001.jpg"
          alt="Historic newspaper front page"
        >
      </div>
    `,
  },
  {
    className: "scene-pair",
    html: `
      <div class="scene-pair-grid">
        <div class="pair-item pair-left">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/1913_All_Story_Magazine.jpg"
            alt="1913 All-Story magazine cover"
          >
        </div>
        <div class="pair-item pair-right">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28November%2C_1928%29_cover.jpg"
            alt="1928 Black Mask magazine cover"
          >
        </div>
      </div>
    `,
  },
  {
    className: "scene-mask",
    html: `
      <div class="scene-mat scene-mat-warm">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28August%2C_1928%29_cover.jpg"
          alt="1928 Black Mask magazine cover"
        >
      </div>
    `,
  },
  {
    className: "scene-adventure-old",
    html: `
      <div class="scene-mat scene-mat-paper">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1920-10-18_cover.jpg"
          alt="1920 Adventure magazine cover"
        >
      </div>
    `,
  },
];

class ArchiveStack extends HTMLElement {
  connectedCallback() {
    const renderedScenes = [...scenes, scenes[0]];

    this.innerHTML = `
      <div class="archive-visual" aria-label="A moving archive of forgotten American books and magazines">
        <div class="archive-sheet archive-sheet-one" aria-hidden="true"></div>
        <div class="archive-sheet archive-sheet-two" aria-hidden="true"></div>

        <div class="archive-frame">
          <div class="archive-reel">
            ${renderedScenes.map((scene) => `
              <figure class="archive-scene ${scene.className}">
                ${scene.html}
              </figure>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    const visual = this.querySelector(".archive-visual");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!visual || reduceMotion) return;

    const onMove = (event) => {
      const rect = visual.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -3.2;
      const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 4.2;
      visual.style.setProperty("--rx", rx.toFixed(2) + "deg");
      visual.style.setProperty("--ry", ry.toFixed(2) + "deg");
    };

    const reset = () => {
      visual.style.setProperty("--rx", "0deg");
      visual.style.setProperty("--ry", "0deg");
    };

    visual.addEventListener("pointermove", onMove);
    visual.addEventListener("pointerleave", reset);
  }
}

customElements.define("archive-stack", ArchiveStack);
