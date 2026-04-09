import Image from "next/image";

import { Card } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="about">
      <div className="grid gap-8 md:grid-cols-[1.45fr_1fr]">
        <Card className="project-card about-card reveal-item p-8 sm:p-12">
          <h2 className="section-title">About</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] text-justify">
            I’m Anjula Amarakoon, an Information Technology undergraduate at the University of Moratuwa. I enjoy building
            clean and reliable web applications, focusing on modern technologies, good design, and practical problem
            solving.
          </p>
        </Card>
        <Card className="project-card profile-card reveal-item mx-auto w-full max-w-[290px] aspect-square rounded-none flex flex-col items-center justify-center p-4 text-center sm:p-5">
          <div className="profile-shell">
            <div className="profile-image">
              <Image src="/DP.jpeg" alt="Anjula" width={148} height={148} priority />
            </div>
          </div>
          <p className="mt-3 text-sm text-[var(--text-muted)]">IT Undergraduate</p>
        </Card>
      </div>
    </section>
  );
}
