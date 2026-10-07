import { useEffect, useRef } from "react";
import ArchiveStack from "./ArchiveStack";
import JoinForm from "./JoinForm";

export default function Hero() {
  const heroRef = useRef(null);
  const archiveRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const archive = archiveRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hero || !archive || reduceMotion) return undefined;

    function handlePointerMove(event) {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
      archive.style.setProperty("--tx", x.toFixed(1) + "px");
      archive.style.setProperty("--ty", y.toFixed(1) + "px");
    }

    function reset() {
      archive.style.setProperty("--tx", "0px");
      archive.style.setProperty("--ty", "0px");
    }

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", reset);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-inner" ref={heroRef}>
        <div className="copy">
          <h1>We find forgotten books</h1>

          <p className="hero-body">
            <strong>Our first drop: American Myths.</strong>{" "}
            We’re digging through the stacks for lost adventurers, athletes,
            outlaws, detectives, entrepreneurs, dreamers, dealmakers, and
            renegades.
          </p>

          <JoinForm />
        </div>

        <ArchiveStack archiveRef={archiveRef} />
      </div>
    </section>
  );
}
