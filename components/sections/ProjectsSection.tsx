import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ProjectItem } from "@/data/portfolioData";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="projects">
      <div className="section-head reveal-item">
        <h2 className="section-title">Projects</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          Recent work where usability, architecture quality, and reliability align.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-6 reveal-item">
        {projects.map((project, idx) => (
          <Card
            key={project.name}
            className={`project-card h-full ${idx === 0 ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2"}`}
          >
            <CardContent className="p-0">
              <div className="project-preview">
                <span>{idx === 0 ? "Featured" : `Preview ${String(idx + 1).padStart(2, "0")}`}</span>
              </div>
              <div className="p-7">
                <h3 className="flex items-center justify-between text-xl font-semibold tracking-[-0.01em]">
                  {project.name}
                  <ArrowUpRight size={17} className="text-[var(--text-muted)]" />
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
                <p className="mt-5 border-t border-[var(--line)] pt-4 text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">
                  {project.stack}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
