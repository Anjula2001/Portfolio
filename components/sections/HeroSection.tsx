"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { CvDownload } from "@/components/sections/CvDownload";

type HeroSectionProps = {
  onProjectsClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const summaryParts = [
  { text: "I’m an ", emphasis: false },
  { text: "IT undergraduate", emphasis: true },
  { text: " at the ", emphasis: false },
  { text: "University of Moratuwa", emphasis: true },
  { text: ", turning what I learn into thoughtful digital experiences.", emphasis: false },
];

export function HeroSection({ onProjectsClick, onContactClick }: HeroSectionProps) {
  const eyesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const grid = content?.parentElement;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!content || !grid || !desktop.matches || reducedMotion.matches) return;

    // Play once on mount. CSS owns the final layout, even if motion is cancelled.
    const opening = [".hero-intro", ".hero-copy", ".hero-actions", ".hero-portrait-wrap"];
    const startTime = document.timeline.currentTime;
    const animations = opening.flatMap((selector) => {
      const element = grid.querySelector<HTMLElement>(selector);
      if (!element) return [];
      const isPortrait = selector === ".hero-portrait-wrap";
      // Start each side in its own column, slightly nearer the portrait.
      const offset = selector === ".hero-copy" ? 24 : selector === ".hero-actions" ? -24 : 0;
      const scale = isPortrait ? 0.9 : 1;
      const transform = `translateX(${offset}px) scale(${scale})`;
      const animation = element.animate(
        [
          { transform, opacity: isPortrait ? 1 : 0.12 },
          { transform: getComputedStyle(element).transform, opacity: 1 },
        ],
        {
          duration: 850,
          delay: 100,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "backwards",
        },
      );
      animation.startTime = startTime;
      return [animation];
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
    const content = contentRef.current;
    const summary = summaryRef.current;
    if (!content || !summary) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let typingTimer: number | undefined;
    let index = 0;
    const characters = Array.from(
      summary.querySelectorAll<HTMLElement>(".hero-summary-char"),
    );
    summary.dataset.reveal = "pending";
    characters.forEach((character) => {
      delete character.dataset.typed;
      delete character.dataset.cursor;
    });

    const finishTyping = () => {
      window.clearTimeout(typingTimer);
      summary.dataset.reveal = "visible";
      characters.forEach((character) => delete character.dataset.cursor);
    };

    const typeCharacter = () => {
      if (!active) return;
      if (index > 0) delete characters[index - 1].dataset.cursor;
      const character = characters[index++];
      if (!character) {
        finishTyping();
        return;
      }
      character.dataset.typed = "true";
      character.dataset.cursor = "true";
      const letter = character.textContent ?? "";
      const delay = /[,.]/.test(letter) ? 120 : letter === " " ? 18 : 28;
      typingTimer = window.setTimeout(typeCharacter, delay);
    };

    const showSummary = () => {
      if (!active || summary.dataset.reveal !== "pending") return;
      if (reducedMotion.matches) {
        finishTyping();
        return;
      }
      summary.dataset.reveal = "typing";
      typeCharacter();
    };

    // The opening effect above has started the portrait animation. Wait for
    // it and the content fade to finish, including when either is cancelled.
    const opening = content.getAnimations({ subtree: true });
    if (reducedMotion.matches) showSummary();
    else void Promise.allSettled(opening.map((animation) => animation.finished))
      .then(showSummary);

    const handleMotionChange = () => {
      if (!reducedMotion.matches) return;
      finishTyping();
    };
    reducedMotion.addEventListener("change", handleMotionChange);
    return () => {
      active = false;
      window.clearTimeout(typingTimer);
      reducedMotion.removeEventListener("change", handleMotionChange);
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
              I build full-stack experiences with clean interfaces and reliable code.
            </p>
          </div>

          <div className="hero-actions">
            <a className={buttonVariants({ size: "lg" })} href="#projects" onClick={onProjectsClick}>
              View Work
            </a>
            <a className={buttonVariants({ size: "lg", variant: "outline" })} href="#contact" onClick={onContactClick}>
              Get In Touch
            </a>
            <CvDownload />
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

        <p ref={summaryRef} className="hero-summary" data-reveal="pending">
          <span className="sr-only">{summaryParts.map((part) => part.text).join("")}</span>
          <span aria-hidden="true">
            {summaryParts.map((part, partIndex) => (
              <span key={partIndex} className={part.emphasis ? "hero-summary-emphasis" : undefined}>
                {Array.from(part.text).map((character, characterIndex) => (
                  <span key={characterIndex} className="hero-summary-char">{character}</span>
                ))}
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
