class JoinForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="hero-signup">
        <div class="hero-signup-copy">See the shortlist. Weigh in. Get first access.</div>
        <form class="hero-inline-form">
          <input
            class="hero-field"
            type="email"
            name="email"
            placeholder="your email address"
            aria-label="Your email address"
            autocomplete="email"
            required
          >
          <button class="hero-submit" type="submit">Join Re:Read</button>
          <div class="hero-success" role="status" aria-live="polite">You’re on the founding list.</div>
        </form>
      </div>
    `;

    const form = this.querySelector("form");
    const button = this.querySelector("button");
    const success = this.querySelector(".hero-success");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const original = button.textContent;
      button.disabled = true;
      button.textContent = "joining…";
      success.classList.remove("is-visible");

      window.setTimeout(() => {
        form.reset();
        button.disabled = false;
        button.textContent = original;
        success.classList.add("is-visible");
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 260);
    });
  }
}

customElements.define("join-form", JoinForm);
