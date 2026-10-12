const discoveries = [
  {
    title: "The adventurer",
    body: "Restless, reckless, always headed somewhere else.",
    label: "Adventure / 1928",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Adventure_1928-10-15_cover.png",
    alt: "1928 Adventure magazine cover",
  },
  {
    title: "The outlaw",
    body: "Criminal, folk hero, antihero—or all three.",
    label: "Black Mask / 1928",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28November%2C_1928%29_cover.jpg",
    alt: "1928 Black Mask magazine cover",
  },
  {
    title: "The detective",
    body: "The person who sees what everyone else missed.",
    label: "Black Mask / 1928",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_Mask_%28August%2C_1928%29_cover.jpg",
    alt: "1928 Black Mask magazine cover",
  },
  {
    title: "The dreamer",
    body: "Ambition, reinvention and the price of wanting more.",
    label: "All-Story / 1913",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1913_All_Story_Magazine.jpg",
    alt: "1913 All-Story magazine cover",
  },
];

class DiscoverySwitch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section discovery-section" aria-labelledby="discovery-heading">
        <div class="shell">
          <div class="discovery-intro">
            <div class="eyebrow">American Myths</div>
            <h2 id="discovery-heading">Who did America invent?</h2>
            <p>We’re looking for unforgettable versions of the characters we think we already know.</p>
          </div>

          <div class="discovery-layout">
            <div class="discovery-steps" role="list" aria-label="American Myths archetypes">
              ${discoveries.map((item, index) => `
                <button
                  type="button"
                  class="discovery-step${index === 0 ? " active" : ""}"
                  data-discovery-index="${index}"
                  aria-pressed="${index === 0 ? "true" : "false"}"
                >
                  <span class="discovery-number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="discovery-copy">
                    <strong>${item.title}</strong>
                    <span>${item.body}</span>
                  </span>
                </button>
              `).join("")}
            </div>

            <div class="discovery-media" aria-live="polite">
              ${discoveries.map((item, index) => `
                <div class="discovery-photo-wrap${index === 0 ? " active" : ""}" data-discovery-photo="${index}">
                  <img
                    class="discovery-photo"
                    src="${item.src}"
                    alt="${item.alt}"
                    loading="${index === 0 ? "eager" : "lazy"}"
                    decoding="async"
                  >
                </div>
              `).join("")}
              <div class="discovery-media-label">${discoveries[0].label}</div>
            </div>
          </div>
        </div>
      </section>
    `;

    const buttons = [...this.querySelectorAll(".discovery-step")];
    const photos = [...this.querySelectorAll(".discovery-photo-wrap")];
    const label = this.querySelector(".discovery-media-label");

    const activate = (index) => {
      buttons.forEach((button, i) => {
        const active = i === index;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      photos.forEach((photo, i) => photo.classList.toggle("active", i === index));
      label.textContent = discoveries[index].label;
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => activate(index));
      button.addEventListener("focus", () => activate(index));
      button.addEventListener("mouseenter", () => activate(index));
    });
  }
}

customElements.define("discovery-switch", DiscoverySwitch);
