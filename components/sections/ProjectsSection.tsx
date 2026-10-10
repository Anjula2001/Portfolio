"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { useRail } from "@/lib/useRail";
import type { ProjectItem } from "@/data/portfolioData";
import styles from "./PortfolioCards.module.css";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const {
    canPrev,
    canNext,
    page,
    pageCount,
    scrollBy,
    scrollToPage,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClick,
    onDragStart,
    isDragging,
  } = useRail(railRef, ".project-card--horizontal", projects.length);

  return (
    <section
      className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10"
      id="projects"
    >
      <div className="section-head reveal-item">
        <h2 className="section-title">Projects</h2>
        <p className="section-lede">
          Recent work where usability, architecture quality, and reliability align.
        </p>
      </div>

      <div className="education-carousel mt-10 reveal-item">
        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--left ${canPrev ? "is-active" : "is-inactive"}`}
          aria-label="Previous projects"
          onClick={() => scrollBy("prev")}
          disabled={!canPrev}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <div
          ref={railRef}
          className={`education-grid ${isDragging ? "is-dragging" : ""}`}
          role="list"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onClickCapture={onClick}
          onDragStart={onDragStart}
        >
          {projects.map((project, idx) => (
            <article
              key={project.name}
              className={`${styles.card} ${styles.projectCard} ${styles.railItem} project-card--horizontal`}
              role="listitem"
            >
              {project.imageSrc ? (
                <div className={`${styles.imageMedia} ${styles.projectMedia}`}>
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt ?? `${project.name} preview`}
                    fill
                    className={styles.previewImage}
                    sizes="(max-width: 540px) calc(100vw - 48px), (max-width: 959px) 50vw, 344px"
                  />
                </div>
              ) : null}
              <div className={`${styles.details} ${styles.imageDetails}`}>
                <p className={styles.eyebrow}>{idx === 0 ? "Featured" : "Project"}</p>
                <h3 className={styles.headline}>{project.name}</h3>
                <p className={styles.summary}>{project.description}</p>
                <div className={`${styles.footer} ${styles.projectFooter}`}>
                  <p className={styles.stack}>{project.stack}</p>
                  <div className="project-links">
                    {project.linkedinUrl ? (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} on LinkedIn`}
                        className="project-link"
                      >
                        <LinkedInIcon className="h-[17px] w-[17px]" />
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} source on GitHub`}
                        className="project-link"
                      >
                        <GitHubIcon className="h-[17px] w-[17px]" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--right ${canNext ? "is-active" : "is-inactive"}`}
          aria-label="Next projects"
          onClick={() => scrollBy("next")}
          disabled={!canNext}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {pageCount > 1 ? (
        <div className="rail-dots reveal-item">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === page}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => scrollToPage(i)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
