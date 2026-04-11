"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ProjectItem } from "@/data/portfolioData";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncScrollState = (
    rail: HTMLDivElement | null,
    setPrev: (value: boolean) => void,
    setNext: (value: boolean) => void,
  ) => {
    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const threshold = 2;
    setPrev(rail.scrollLeft > threshold);
    setNext(rail.scrollLeft < maxScroll - threshold);
  };

  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    syncScrollState(rail, setCanScrollPrev, setCanScrollNext);
    const onScroll = () => syncScrollState(rail, setCanScrollPrev, setCanScrollNext);
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length]);

  const scrollByCard = (direction: "prev" | "next") => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>(".project-card--horizontal");
    const cardWidth = firstCard?.offsetWidth ?? rail.clientWidth * 0.82;
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const distance = cardWidth + gap;
    const amount = direction === "next" ? distance : -distance;

    rail.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="projects">
      <div className="section-head reveal-item">
        <h2 className="section-title">Projects</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          Recent work where usability, architecture quality, and reliability align.
        </p>
      </div>

      <div className="education-carousel mt-10 reveal-item">
        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--left ${canScrollPrev ? "is-active" : "is-inactive"}`}
          aria-label="Scroll project cards left"
          onClick={() => scrollByCard("prev")}
          disabled={!canScrollPrev}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <div ref={scrollRef} className="education-grid" role="list" aria-label="Projects">
          {projects.map((project, idx) => (
            <Card key={project.name} className="project-card project-card--horizontal education-card education-card--horizontal" role="listitem">
              <CardContent className="p-0 h-full">
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="project-preview">
                    <span>{idx === 0 ? "Featured" : `Preview ${String(idx + 1).padStart(2, "0")}`}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="flex items-center justify-between text-xl font-semibold tracking-[-0.01em]">
                      {project.name}
                      <ArrowUpRight size={17} className="text-[var(--text-muted)]" />
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
                    <p className="mt-auto border-t border-[var(--line)] pt-4 text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                      {project.stack}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--right ${canScrollNext ? "is-active" : "is-inactive"}`}
          aria-label="Scroll project cards right"
          onClick={() => scrollByCard("next")}
          disabled={!canScrollNext}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
