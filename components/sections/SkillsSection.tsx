import type { CSSProperties } from "react";

import type { SkillItem } from "@/data/portfolioData";

type SkillsSectionProps = {
  skills: SkillItem[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="skills">
      <div className="section-head reveal-item">
        <h2 className="section-title">Skills</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">Core technologies and tools that power my work.</p>
      </div>

      <div className="mt-16 flex justify-center reveal-item">
        <div className="skill-dock">
          {skills.map((skill, idx) => {
            const IconComponent = skill.Icon;
            return (
              <div
                key={skill.name}
                className="skill-icon"
                style={{
                  "--icon-delay": `${idx * 0.05}s`,
                } as CSSProperties}
              >
                <div className="skill-icon-inner" title={skill.name} style={{ "--icon-color": skill.color } as CSSProperties}>
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <div className="skill-tooltip">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
