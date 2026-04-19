"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ProjectItem } from "@/data/portfolioData";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.66 7.66 0 0 1 8 4.74c.68 0 1.36.09 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

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
            <Card key={`${project.name}-${idx}`} className="project-card project-card--horizontal education-card education-card--horizontal" role="listitem">
              <CardContent className="p-0 h-full">
                <div className="project-card-shell">
                  <div className="project-preview project-card-media">
                    {project.imageSrc ? (
                      <>
                        <Image
                          src={project.imageSrc}
                          alt={project.imageAlt ?? `${project.name} project preview`}
                          fill
                          className="project-preview-image"
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 42rem, 34rem"
                        />
                        <span className="project-preview-badge">{idx === 0 ? "Featured" : `Preview ${String(idx + 1).padStart(2, "0")}`}</span>
                      </>
                    ) : (
                      <span>{idx === 0 ? "Featured" : `Preview ${String(idx + 1).padStart(2, "0")}`}</span>
                    )}
                  </div>
                  <div className="project-card-content">
                    <h3 className="flex items-center justify-between text-xl font-semibold tracking-[-0.01em]">
                      <span>{project.name}</span>
                      {project.linkedinUrl || project.githubUrl ? (
                        <div className="flex items-center gap-3">
                          {project.linkedinUrl ? (
                            <a
                              href={project.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${project.name} LinkedIn project link`}
                              className="inline-flex"
                            >
                              <LinkedInIcon className="h-[17px] w-[17px] text-[var(--text-muted)] transition-transform duration-200 hover:scale-105" />
                            </a>
                          ) : null}
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${project.name} GitHub repository`}
                              className="inline-flex"
                            >
                              <GitHubIcon className="h-[17px] w-[17px] text-[var(--text-muted)] transition-transform duration-200 hover:scale-105" />
                            </a>
                          ) : null}
                        </div>
                      ) : (
                        <ArrowUpRight size={17} className="text-[var(--text-muted)]" />
                      )}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
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
