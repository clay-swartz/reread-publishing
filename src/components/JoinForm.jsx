import { useState } from "react";

export default function JoinForm() {
  const [state, setState] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setState("joining");

    window.setTimeout(() => {
      form.reset();
      setState("success");
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 260);
  }

  return (
    <div className="hero-signup">
      <div className="hero-signup-copy">
        See the shortlist. Weigh in. Get first access.
      </div>

      <form className="hero-inline-form" onSubmit={handleSubmit}>
        <input
          className="hero-field"
          type="email"
          name="email"
          placeholder="your email address"
          aria-label="Your email address"
          autoComplete="email"
          required
        />
        <button
          className="hero-submit"
          type="submit"
          disabled={state === "joining"}
        >
          {state === "joining" ? "joining…" : "Join Re:Read"}
        </button>

        <div
          className={"hero-success" + (state === "success" ? " is-visible" : "")}
          role="status"
          aria-live="polite"
        >
          You’re on the founding list.
        </div>
      </form>
    </div>
  );
}
