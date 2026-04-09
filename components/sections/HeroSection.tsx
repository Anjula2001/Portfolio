import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type HeroSectionProps = {
  onProjectsClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroSection({ onProjectsClick, onContactClick }: HeroSectionProps) {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:px-10 sm:pb-28 sm:pt-32">
      <p className="glass-badge mx-auto inline-flex items-center gap-2">
        <Sparkles size={14} />
        Full-Stack Developer
      </p>
      <h1 className="mt-8 text-balance text-5xl leading-[1.02] font-semibold tracking-[-0.02em] sm:text-6xl md:text-7xl">
        Designing and building thoughtful digital products
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-8 text-[var(--text-muted)] sm:text-lg">
        I’m Anjula, a full-stack developer creating scalable, clean, and user-focused digital solutions.
      </p>
      <div className="mt-12 flex justify-center gap-4">
        <a href="#projects" onClick={onProjectsClick}>
          <Button size="lg">View Work</Button>
        </a>
        <a href="#contact" onClick={onContactClick}>
          <Button size="lg" variant="outline">
            Get In Touch
          </Button>
        </a>
      </div>
    </section>
  );
}
