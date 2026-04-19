import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onProjectsClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroSection({ onProjectsClick, onContactClick }: HeroSectionProps) {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 sm:pb-28 sm:pt-32">
      <div className="hero-apple-blur hero-apple-blur--left" aria-hidden="true" />
      <div className="hero-apple-blur hero-apple-blur--right" aria-hidden="true" />

      <div className="hero-apple-grid">
        <div className="hero-apple-copy">
          <h1 className="hero-apple-title mt-8 text-balance">
            Anjula Amarakoon
          </h1>

          <p className="hero-apple-description mt-8 max-w-2xl text-pretty">
            I design and build thoughtful digital products with a focus on clean architecture,
            smooth user experience, and reliable full-stack performance.
          </p>

          <div className="hero-apple-actions mt-12">
            <a href="#projects" onClick={onProjectsClick}>
              <Button size="lg" className="hero-apple-btn-primary">
                View Work
              </Button>
            </a>
            <a href="#contact" onClick={onContactClick}>
              <Button size="lg" variant="outline" className="hero-apple-btn-secondary">
                Get In Touch
              </Button>
            </a>
          </div>
        </div>

        <div className="hero-apple-profile-wrap">
          <article aria-label="Profile">
            <div className="hero-apple-image-frame">
              <Image src="/DP.jpeg" alt="Anjula Amarakoon profile photo" width={360} height={360} priority />
            </div>
            <p className="hero-apple-caption text-center">IT Undergraduate</p>
          </article>
        </div>
      </div>
    </section>
  );
}
