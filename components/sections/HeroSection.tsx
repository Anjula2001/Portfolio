"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      className="relative mx-auto max-w-6xl px-6 pb-24 pt-24 sm:px-10 sm:pb-28 sm:pt-32"
    >
      <div className="hero-grid">
        <div>
          <h1 className="hero-title text-balance">Anjula Amarakoon</h1>

          <p className="hero-description mt-7 max-w-xl text-pretty">
            I design and build thoughtful digital products with a focus on clean
            architecture, smooth user experience, and reliable full-stack performance.
          </p>

          <div className="hero-actions mt-10">
            <a href="#projects" onClick={onProjectsClick}>
              <Button size="lg">View Work</Button>
            </a>
            <a href="#contact" onClick={onContactClick}>
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <figure className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src="/DP.jpeg"
                alt="Anjula Amarakoon"
                width={420}
                height={420}
                sizes="(max-width: 640px) 15rem, 19rem"
                priority
              />
              <div ref={eyesRef} className="hero-eye-glow" aria-hidden="true">
                <span className="hero-eye-ring hero-eye-ring--left" />
                <span className="hero-eye-ring hero-eye-ring--right" />
              </div>
            </div>
            <figcaption className="hero-caption">
              <span className="hero-caption-role">IT Undergraduate</span>
              <span className="hero-caption-org">University of Moratuwa</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
