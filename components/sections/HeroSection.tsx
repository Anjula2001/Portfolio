"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

type HeroSectionProps = {
  onProjectsClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroSection({ onProjectsClick, onContactClick }: HeroSectionProps) {
  const eyesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!content || !desktop.matches || reducedMotion.matches) return;

    // Play once on mount. CSS owns the final layout, even if motion is cancelled.
    const opening: [string, string][] = [
      [".hero-copy", "translateX(-50%)"],
      [".hero-actions", "translateX(-50%)"],
      [".hero-portrait-wrap", "translateX(-50%) scale(0.36)"],
    ];
    const animations = opening.flatMap(([selector, transform]) => {
      const element = content.querySelector<HTMLElement>(selector);
      if (!element) return [];
      return [element.animate(
        [{ transform }, { transform: getComputedStyle(element).transform }],
        {
          duration: 650,
          delay: 450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      )];
    });
    const finishOpening = () => animations.forEach((animation) => animation.cancel());
    window.addEventListener("resize", finishOpening);
    reducedMotion.addEventListener("change", finishOpening);
    content.addEventListener("focusin", finishOpening);
    return () => {
      finishOpening();
      window.removeEventListener("resize", finishOpening);
      reducedMotion.removeEventListener("change", finishOpening);
      content.removeEventListener("focusin", finishOpening);
    };
  }, []);

  useEffect(() => {
    let glow: Animation | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const flashEyes = () => {
      glow?.cancel();
      if (reducedMotion.matches || !eyesRef.current) return;

      // A single quick ignition, brief hold, then fade; never runs on mount.
      glow = eyesRef.current.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: 1, offset: 0.08 },
          { opacity: 0.95, offset: 0.35 },
          { opacity: 0.55, offset: 0.65 },
          { opacity: 0, offset: 1 },
        ],
        { duration: 950, easing: "ease-out" },
      );
    };

    window.addEventListener("themechange", flashEyes);
    return () => {
      window.removeEventListener("themechange", flashEyes);
      glow?.cancel();
    };
  }, []);

  return (
    <section
      id="about"
      className="hero-section relative mx-auto max-w-6xl px-6 sm:px-10"
    >
      <div className="hero-grid">
        <header className="hero-intro">
          <h1 className="hero-title">
            <span>Anjula</span>{" "}<span>Amarakoon</span>
          </h1>
        </header>

        <div ref={contentRef} className="hero-content">
          <div className="hero-copy">
            <p className="hero-statement">
              Thoughtful design.<br />Reliable code.
            </p>
            <p className="hero-description">
              I build thoughtful full-stack experiences, from clean interfaces
              to reliable code.
            </p>
          </div>

          <div className="hero-actions">
            <a className={buttonVariants({ size: "lg" })} href="#projects" onClick={onProjectsClick}>
              View Work
            </a>
            <a className={buttonVariants({ size: "lg", variant: "outline" })} href="#contact" onClick={onContactClick}>
              Get In Touch
            </a>
          </div>

          <div className="hero-portrait-wrap">
            <figure className="hero-portrait">
              <div className="hero-portrait-frame">
                <Image
                  src="/DP-transparent.png"
                  alt="Anjula Amarakoon"
                  width={420}
                  height={420}
                  sizes="(max-width: 700px) min(72vw, 18rem), 20rem"
                  preload
                />
                <div ref={eyesRef} className="hero-eye-glow" aria-hidden="true">
                  <span className="hero-eye-ring hero-eye-ring--left" />
                  <span className="hero-eye-ring hero-eye-ring--right" />
                </div>
              </div>
            </figure>
          </div>
        </div>

        <p className="hero-summary">
          I’m an <span>IT undergraduate</span> at the{" "}
          <span>University of Moratuwa</span>, turning what I learn into thoughtful
          digital experiences.
        </p>
      </div>
    </section>
  );
}
