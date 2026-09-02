import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onProjectsClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function HeroSection({ onProjectsClick, onContactClick }: HeroSectionProps) {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-6 pb-24 pt-24 sm:px-10 sm:pb-28 sm:pt-32"
    >
      <div className="hero-grid">
        <div>
          <h1 className="hero-title text-balance">Anjula Amarakoon</h1>

          <p className="hero-description mt-7 max-w-xl text-pretty">
            I design and build thoughtful digital products with a focus on clean
            architecture, smooth user experience, and reliable full-stack performance.
          </p>

          <div className="hero-actions mt-10">
            <a href="#projects" onClick={onProjectsClick}>
              <Button size="lg">View Work</Button>
            </a>
            <a href="#contact" onClick={onContactClick}>
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <figure className="hero-portrait">
            <div className="hero-portrait-frame">
              <Image
                src="/DP.jpeg"
                alt="Anjula Amarakoon"
                width={420}
                height={420}
                sizes="(max-width: 640px) 15rem, 19rem"
                priority
              />
            </div>
            <figcaption className="hero-caption">
              <span className="hero-caption-role">IT Undergraduate</span>
              <span className="hero-caption-org">University of Moratuwa</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
