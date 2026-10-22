"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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
  const nameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const name = nameRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!name || reducedMotion.matches) return;

    const title = name.querySelector<HTMLElement>(".hero-title");
    const role = name.querySelector<HTMLElement>(".hero-role");
    const letters = Array.from(name.querySelectorAll<HTMLElement>(".hero-first-name > span"));
    if (!title || !role || letters.length < 2) return;

    // Measure the final layout, then animate from the previous centered name.
    const bounds = title.getBoundingClientRect();
    const boxes = letters.map((letter) => letter.getBoundingClientRect());
    const totalWidth = boxes.reduce((sum, box) => sum + box.width, 0);
    const gap = (bounds.width * 0.77 - totalWidth) / (letters.length - 1);
    let startLeft = bounds.left + bounds.width * 0.115;
    const startTime = document.timeline.currentTime;
    const animations = letters.map((letter, index) => {
      const offset = startLeft - boxes[index].left;
      startLeft += boxes[index].width + gap;
      return letter.animate(
        [{ transform: `translateX(${offset}px)` }, { transform: "translateX(0)" }],
        { duration: 1100, delay: 250, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      );
    });
    animations.push(role.animate(
      [{ opacity: 0, transform: "translateX(8px)" }, { opacity: 1, transform: "translateX(0)" }],
      { duration: 450, delay: 1050, easing: "ease-out", fill: "backwards" },
    ));
    animations.forEach((animation) => { animation.startTime = startTime; });

    const finish = () => animations.forEach((animation) => animation.cancel());
    window.addEventListener("resize", finish);
    reducedMotion.addEventListener("change", finish);
    return () => {
      finish();
      window.removeEventListener("resize", finish);
      reducedMotion.removeEventListener("change", finish);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const grid = content?.parentElement;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!content || !grid || !desktop.matches || reducedMotion.matches) return;

    // Play once on mount. CSS owns the final layout, even if motion is cancelled.
    const opening = [".hero-copy", ".hero-portrait-wrap"];
    const startTime = document.timeline.currentTime;
    const animations = opening.flatMap((selector) => {
      const element = grid.querySelector<HTMLElement>(selector);
      if (!element) return [];
      const isPortrait = selector === ".hero-portrait-wrap";
      // Start each side in its own column, slightly nearer the portrait.
      const offset = selector === ".hero-copy" ? 24 : 0;
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
    const summary = summaryRef.current;
    if (!summary) return;

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

    // Start typing on mount, alongside the other hero animations.
    showSummary();

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
      className="hero-section relative mx-auto px-6 sm:px-10"
    >
      <div className="hero-grid">
        <header className="hero-intro">
          <div className="hero-actions" role="group" aria-label="Explore my work and get in touch">
            <div className="hero-actions-primary">
              <a className={buttonVariants({ size: "lg" })} href="#projects" onClick={onProjectsClick}>
                View Work
              </a>
              <a className={buttonVariants({ size: "lg", variant: "outline" })} href="#contact" onClick={onContactClick}>
                Get In Touch
              </a>
            </div>
            <CvDownload />
          </div>
          <div className="hero-heading">
            <p className="hero-greeting">Hey, I’m</p>
            <div ref={nameRef} className="hero-name-lockup">
              <h1 className="hero-title" aria-label="Anjula Amarakoon">
                <span className="hero-first-name" aria-hidden="true">
                  {Array.from("Anjula").map((letter, index) => (
                    <span key={index}>{letter}</span>
                  ))}
                </span>
                <span className="hero-last-name">Amarakoon</span>
              </h1>
              <p className="hero-role">
                <span className="sr-only">University of Moratuwa undergraduate</span>
                <span className="hero-role-university" aria-hidden="true">UOM</span>
                <span className="hero-role-status" aria-hidden="true">Undergraduate</span>
              </p>
            </div>
          </div>
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
