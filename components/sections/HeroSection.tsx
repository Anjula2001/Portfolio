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
        <div className="hero-intro">
          <p className="hero-eyebrow">
            <span>IT Undergraduate</span>
            <span className="hero-eyebrow-dot" aria-hidden="true">·</span>
            <span>University of Moratuwa</span>
          </p>
          <h1 className="hero-title">
            <span>Anjula</span>{" "}<span>Amarakoon</span>
          </h1>

          <p className="hero-description">
            Thoughtful design. Reliable code.
          </p>

          <div className="hero-actions">
            <a className={buttonVariants({ size: "lg" })} href="#projects" onClick={onProjectsClick}>
              View Work
            </a>
            <a className={buttonVariants({ size: "lg", variant: "outline" })} href="#contact" onClick={onContactClick}>
              Get In Touch
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src="/DP-transparent.png"
                alt="Anjula Amarakoon"
                width={420}
                height={420}
                sizes="(max-width: 640px) min(78vw, 20rem), 22rem"
                preload
              />
              <div ref={eyesRef} className="hero-eye-glow" aria-hidden="true">
                <span className="hero-eye-ring hero-eye-ring--left" />
                <span className="hero-eye-ring hero-eye-ring--right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
