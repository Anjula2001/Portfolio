"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SkillItem } from "@/data/portfolioData";

type SkillsSectionProps = {
  skills: SkillItem[];
};

const CATEGORY_ORDER: SkillItem["category"][] = [
  "Web Development",
  "Database",
  "Programming Languages",
  "Other",
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((title) => ({
        title,
        items: skills.filter((skill) => skill.category === title),
      })).filter((group) => group.items.length > 0),
    [skills],
  );

  const [index, setIndex] = useState(0);
  const active = groups[index];

  const move = (delta: number) =>
    setIndex((current) => (current + delta + groups.length) % groups.length);

  return (
    <section
      className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10"
      id="skills"
    >
      <div className="section-head reveal-item">
        <h2 className="section-title">Skills</h2>
        <p className="section-lede">Core technologies and tools that power my work.</p>
      </div>

      <div className="skill-slider reveal-item">
        <p className="skill-active-title" aria-live="polite">
          {active.title}
        </p>

        <div className="skill-slider-shell">
          <button
            type="button"
            className="skill-side-arrow"
            aria-label="Previous skill category"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <ul className="skill-dock" aria-label={`${active.title} skills`}>
            {active.items.map((skill) => (
              <li key={skill.name} className="skill-icon">
                <span className="skill-icon-inner">
                  <Image
                    src={skill.logoSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="skill-logo"
                  />
                </span>
                <span className="skill-tooltip" aria-hidden="true">
                  {skill.name}
                </span>
                <span className="sr-only">{skill.name}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="skill-side-arrow"
            aria-label="Next skill category"
            onClick={() => move(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
