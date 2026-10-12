class AboutReread extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="about-section" aria-labelledby="about-heading">
        <div class="shell">
          <div class="about-intro">
            <h2 id="about-heading">What is Re:Read?</h2>
            <p>
              Re:Read is a publishing house for books that disappeared from the culture
              but still have something to say. Each drop starts with a theme, a deep search,
              and a shortlist of books worth bringing back.
            </p>
          </div>

          <div class="how-block">
            <div class="how-title">How it works</div>

            <div class="how-steps" role="list">
              <div class="how-step" role="listitem">
                <span class="how-number">01</span>
                <div>
                  <strong>We dig.</strong>
                  <p>We hunt through old catalogs, archives, shelves, and forgotten corners of publishing.</p>
                </div>
              </div>

              <div class="how-step" role="listitem">
                <span class="how-number">02</span>
                <div>
                  <strong>You weigh in.</strong>
                  <p>Members see the shortlist and help shape what returns—and how the edition is made.</p>
                </div>
              </div>

              <div class="how-step" role="listitem">
                <span class="how-number">03</span>
                <div>
                  <strong>We bring it back.</strong>
                  <p>The strongest finds return as thoughtfully edited, designed, and printed Re:Read editions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("about-reread", AboutReread);
