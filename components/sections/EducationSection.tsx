"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CertificateItem, EducationItem } from "@/data/portfolioData";

type EducationSectionProps = {
  education: EducationItem[];
  certificates: CertificateItem[];
};

export function EducationSection({ education, certificates }: EducationSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncScrollState = () => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const threshold = 2;
    setCanScrollPrev(rail.scrollLeft > threshold);
    setCanScrollNext(rail.scrollLeft < maxScroll - threshold);
  };

  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    syncScrollState();
    const onScroll = () => syncScrollState();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [education.length]);

  const scrollByCard = (direction: "prev" | "next") => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>(".education-card--horizontal");
    const cardWidth = firstCard?.offsetWidth ?? rail.clientWidth * 0.82;
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const distance = cardWidth + gap;
    const amount = direction === "next" ? distance : -distance;

    rail.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="education">
      <div className="section-head reveal-item">
        <h2 className="section-title">Education Journey</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          A concise view of the academic path behind my technical foundation.
        </p>
      </div>

      <div className="education-carousel mt-10 reveal-item">
        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--left ${canScrollPrev ? "is-active" : "is-inactive"}`}
          aria-label="Scroll education cards left"
          onClick={() => scrollByCard("prev")}
          disabled={!canScrollPrev}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <div ref={scrollRef} className="education-grid" role="list" aria-label="Education Journey">
          {education.map((item, index) => (
            <Card
              key={`${item.institution}-${item.duration}-${index}`}
              className="education-card education-card--horizontal"
              role="listitem"
            >
              <CardContent className="p-0">
                <div className="education-card-body p-6 sm:p-7">
                  <div className="education-card-head">
                    <div>
                      <div className="education-institution-row">
                        {item.logoSrc && (
                          <span className="education-logo-shell" aria-hidden="true">
                            <Image
                              src={item.logoSrc}
                              alt={item.logoAlt ?? `${item.institution} logo`}
                              width={24}
                              height={24}
                              className="education-logo-image"
                            />
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold tracking-[-0.015em] text-[var(--foreground)] sm:text-xl">
                            {item.institution}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[var(--text-muted)] sm:text-[0.98rem]">{item.degree}</p>
                        </div>
                      </div>
                    </div>
                    <div className="education-meta-right">
                      <p className="education-duration text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {item.duration}
                      </p>
                      {item.results && (
                        <p className="mt-2 text-xs tracking-[0.14em] text-[var(--text-muted)]">
                          {item.results}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[var(--line)] pt-4">
                    <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--right ${canScrollNext ? "is-active" : "is-inactive"}`}
          aria-label="Scroll education cards right"
          onClick={() => scrollByCard("next")}
          disabled={!canScrollNext}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="certificates-group reveal-item">
        <div className="certificates-divider" aria-hidden="true" />
        <div className="certificates-head">
          <h3 className="certificates-title">Certificates</h3>
        </div>

        <div className="certificates-scroll" role="list" aria-label="Certificates">
          {certificates.map((item) => (
            <Card key={`${item.title}-${item.year}`} className="education-card certificate-card" role="listitem">
              <CardContent className="p-0">
                <div className="certificate-body">
                  <p className="certificate-year">{item.year}</p>
                  <h4 className="certificate-title">{item.title}</h4>
                  <p className="certificate-issuer">{item.issuer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
