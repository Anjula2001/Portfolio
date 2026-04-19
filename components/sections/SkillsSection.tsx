import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SkillItem } from "@/data/portfolioData";

type SkillsSectionProps = {
  skills: SkillItem[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills: Array<{ title: SkillItem["category"]; items: SkillItem[] }> = [
    {
      title: "Web Development",
      items: skills.filter((skill) => skill.category === "Web Development"),
    },
    {
      title: "Database",
      items: skills.filter((skill) => skill.category === "Database"),
    },
    {
      title: "Programming Languages",
      items: skills.filter((skill) => skill.category === "Programming Languages"),
    },
    {
      title: "Other",
      items: skills.filter((skill) => skill.category === "Other"),
    },
  ];

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = groupedSkills[activeGroupIndex];

  const showNextGroup = () => {
    setActiveGroupIndex((current) => (current + 1) % groupedSkills.length);
  };

  const showPreviousGroup = () => {
    setActiveGroupIndex((current) => (current - 1 + groupedSkills.length) % groupedSkills.length);
  };

  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="skills">
      <div className="section-head reveal-item">
        <h2 className="section-title">Skills</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">Core technologies and tools that power my work.</p>
      </div>

      <div className="skill-slider reveal-item">
        <p className="skill-active-title" aria-live="polite">{activeGroup.title}</p>

        <div className="skill-slider-shell">
          <button
            type="button"
            className="skill-side-arrow skill-side-arrow--left"
            aria-label="Show previous skills category"
            onClick={showPreviousGroup}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="skill-dock skill-dock--flat skill-dock--section">
            {activeGroup.items.map((skill, idx) => (
            <div
              key={skill.name}
              className="skill-icon"
              style={{
                "--icon-delay": `${idx * 0.05}s`,
              } as CSSProperties}
            >
              <div className="skill-icon-inner" title={skill.name}>
                <Image
                  src={skill.logoSrc}
                  alt={skill.logoAlt}
                  width={32}
                  height={32}
                  className="skill-logo"
                />
              </div>
              <div className="skill-tooltip">{skill.name}</div>
            </div>
          ))}
          </div>

          <button
            type="button"
            className="skill-side-arrow skill-side-arrow--right"
            aria-label="Show next skills category"
            onClick={showNextGroup}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
