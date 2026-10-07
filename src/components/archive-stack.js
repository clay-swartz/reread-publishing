const archiveItems = [
  {
    className: "item-newspaper",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wallstreetbombing1920-page-001.jpg",
    alt: "Historic newspaper front page",
  },
  {
    className: "item-allstory",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1913_All_Story_Magazine.jpg",
    alt: "1913 All-Story magazine cover",
  },
  {
    className: "item-adventure-old",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1920-10-18_cover.jpg",
    alt: "1920 Adventure magazine cover",
  },
  {
    className: "item-mask-nov",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28November%2C_1928%29_cover.jpg",
    alt: "1928 Black Mask magazine cover",
  },
  {
    className: "item-adventure",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1928-10-15_cover.png",
    alt: "1928 Adventure magazine cover",
  },
  {
    className: "item-mask-aug",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28August%2C_1928%29_cover.jpg",
    alt: "1928 Black Mask magazine cover",
  },
];

class ArchiveStack extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="archive-zone" aria-label="American Myths research material">
        <div class="archive-shadow" aria-hidden="true"></div>

        <div class="archive-paper archive-paper-back" aria-hidden="true">
          <span class="paper-kicker">clipping file / 1920s</span>
          <span class="paper-rule"></span>
          <span class="paper-line wide"></span>
          <span class="paper-line"></span>
          <span class="paper-line short"></span>
          <span class="paper-line"></span>
          <span class="paper-line wide"></span>
        </div>

        ${archiveItems.map((item) => `
          <div class="archive-item ${item.className}">
            <img src="${item.src}" alt="${item.alt}">
          </div>
        `).join("")}

        <div class="archive-paper archive-note" aria-hidden="true">
          <span class="note-title">LOOK AGAIN.</span>
          <span class="note-copy">adventurers / detectives / dreamers / renegades</span>
          <span class="note-mark">?</span>
        </div>

        <div class="archive-paper archive-card" aria-hidden="true">
          <span>possible</span>
          <strong>MYTH</strong>
          <span>keep digging</span>
        </div>

        <div class="research-label">
          <div class="label-top">
            <span>Re:Read research</span>
            <span>001</span>
          </div>
          <div class="label-name">American Myths</div>
          <div class="label-bottom">
            <div class="label-cell">status / searching</div>
            <div class="label-cell">members / invited</div>
          </div>
        </div>
      </div>
    `;

    const zone = this.querySelector(".archive-zone");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const onMove = (event) => {
      const rect = this.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      zone.style.setProperty("--tx", x.toFixed(1) + "px");
      zone.style.setProperty("--ty", y.toFixed(1) + "px");
    };

    const reset = () => {
      zone.style.setProperty("--tx", "0px");
      zone.style.setProperty("--ty", "0px");
    };

    this.addEventListener("pointermove", onMove);
    this.addEventListener("pointerleave", reset);
  }
}

customElements.define("archive-stack", ArchiveStack);
