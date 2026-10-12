class JoinForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form class="signup-card" id="join" novalidate>
        <h2>Join the first drop.</h2>
        <p class="signup-sub">See the shortlist. Weigh in. Get first access.</p>

        <div class="form-stack">
          <input
            class="field"
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            autocomplete="email"
            required
          >
          <button class="button" type="submit">Join Re:Read</button>
        </div>

        <div class="form-note">Founding members help decide what comes back.</div>
        <div class="success" role="status" aria-live="polite">You’re on the founding list.</div>
        <div class="form-error" role="alert" aria-live="assertive">Please enter a valid email address.</div>
      </form>
    `;

    const form = this.querySelector("form");
    const button = this.querySelector("button");
    const success = this.querySelector(".success");
    const error = this.querySelector(".form-error");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        error.style.display = "block";
        success.style.display = "none";
        form.reportValidity();
        return;
      }

      error.style.display = "none";
      success.style.display = "none";

      const original = button.textContent;
      button.disabled = true;
      button.textContent = "Joining…";

      window.setTimeout(() => {
        form.reset();
        button.disabled = false;
        button.textContent = original;
        success.style.display = "block";
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 240);
    });
  }
}

customElements.define("join-form", JoinForm);
