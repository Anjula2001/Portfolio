"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { useRail } from "@/lib/useRail";
import type { ProjectItem } from "@/data/portfolioData";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const { canPrev, canNext, page, pageCount, scrollBy, scrollToPage, onKeyDown } =
    useRail(railRef, ".project-card--horizontal", projects.length);

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
          className="education-grid"
          role="list"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {projects.map((project, idx) => (
            <Card
              key={project.name}
              className="project-card project-card--horizontal"
              role="listitem"
            >
              <CardContent className="h-full p-0">
                <div className="project-card-shell">
                  <div className="project-preview">
                    {project.imageSrc ? (
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt ?? `${project.name} preview`}
                        fill
                        className="project-preview-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 42rem, 34rem"
                      />
                    ) : null}
                  </div>

                  <div className="project-card-content">
                    <p className={`kicker ${idx === 0 ? "kicker--featured" : ""}`}>
                      {idx === 0 ? "Featured" : "Project"}
                    </p>

                    <h3 className="project-title-row mt-1">
                      <span>{project.name}</span>
                      <span className="project-links">
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
                      </span>
                    </h3>

                    <p className="project-summary">{project.description}</p>
                    <p className="project-stack">{project.stack}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
