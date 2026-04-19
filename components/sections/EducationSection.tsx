"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Card, CardContent } from "@/components/ui/card";
import type { CertificateItem, EducationItem } from "@/data/portfolioData";

type EducationSectionProps = {
  education: EducationItem[];
  certificates: CertificateItem[];
};

export function EducationSection({ education, certificates }: EducationSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const certificateScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canCertificateScrollPrev, setCanCertificateScrollPrev] = useState(false);
  const [canCertificateScrollNext, setCanCertificateScrollNext] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const syncScrollState = (
    rail: HTMLDivElement | null,
    setPrev: (value: boolean) => void,
    setNext: (value: boolean) => void,
  ) => {
    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const threshold = 2;
    setPrev(rail.scrollLeft > threshold);
    setNext(rail.scrollLeft < maxScroll - threshold);
  };

  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) {
      return;
    }

    syncScrollState(rail, setCanScrollPrev, setCanScrollNext);
    const onScroll = () => syncScrollState(rail, setCanScrollPrev, setCanScrollNext);
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [education.length]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const rail = certificateScrollRef.current;
    if (!rail) {
      return;
    }

    syncScrollState(rail, setCanCertificateScrollPrev, setCanCertificateScrollNext);
    const onScroll = () => syncScrollState(rail, setCanCertificateScrollPrev, setCanCertificateScrollNext);
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [certificates.length]);

  useEffect(() => {
    if (!activeCertificate) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCertificate(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCertificate]);

  const scrollByCard = (
    rail: HTMLDivElement | null,
    selector: string,
    direction: "prev" | "next",
  ) => {
    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>(selector);
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
          onClick={() => scrollByCard(scrollRef.current, ".education-card--horizontal", "prev")}
          disabled={!canScrollPrev}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <div ref={scrollRef} className="education-grid education-grid--journey" role="list" aria-label="Education Journey">
          {education.map((item, index) => {
            const isMoratuwaCard = item.institution === "University of Moratuwa";
            const isElapathaCard = item.institution === "R/ Elapatha Maha Vidyalaya";
            const isDelwalaCard = item.institution === "R/ Delwala Maha Vidyalaya";
            const hasBottomResultMeta = isElapathaCard || isDelwalaCard;
            const useBottomMeta = isMoratuwaCard || hasBottomResultMeta;

            return (
              <Card
                key={`${item.institution}-${item.duration}-${index}`}
                className="education-card education-card--horizontal"
                role="listitem"
              >
                <CardContent className="h-full p-0">
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
                        {!useBottomMeta && (
                          <p className="education-duration text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            {item.duration}
                          </p>
                        )}
                        {!hasBottomResultMeta && item.results && (
                          <p className="mt-2 text-xs tracking-[0.14em] text-[var(--text-muted)]">
                            {item.results}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-1 flex-col border-t border-[var(--line)] pt-4">
                      <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                        {item.description}
                      </p>
                      {useBottomMeta && (
                        <div className="mt-auto pt-3">
                          {hasBottomResultMeta && item.results ? (
                            <div className="flex items-center justify-between gap-3 text-xs tracking-[0.14em] text-[var(--text-muted)]">
                              <span className="education-duration uppercase">{item.duration}</span>
                              <span className="text-right">{item.results}</span>
                            </div>
                          ) : (
                            <p className="education-duration text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                              {item.duration}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <button
          type="button"
          className={`education-scroll-btn education-scroll-btn--right ${canScrollNext ? "is-active" : "is-inactive"}`}
          aria-label="Scroll education cards right"
          onClick={() => scrollByCard(scrollRef.current, ".education-card--horizontal", "next")}
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

        <div className="education-carousel mt-6">
          <button
            type="button"
            className={`education-scroll-btn education-scroll-btn--left ${canCertificateScrollPrev ? "is-active" : "is-inactive"}`}
            aria-label="Scroll certificate cards left"
            onClick={() => scrollByCard(certificateScrollRef.current, ".certificate-card--horizontal", "prev")}
            disabled={!canCertificateScrollPrev}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <div ref={certificateScrollRef} className="education-grid" role="list" aria-label="Certificates">
            {certificates.map((item) => (
              <Card
                key={`${item.title}-${item.year}`}
                className="education-card education-card--horizontal certificate-card certificate-card--horizontal certificate-preview-card"
                style={{ "--certificate-tint": item.themeTint } as CSSProperties}
                role="listitem"
              >
                <CardContent className="h-full p-0">
                  <button
                    type="button"
                    className="certificate-preview-button"
                    onClick={() => setActiveCertificate(item)}
                    aria-label={`Open ${item.title} certificate`}
                  >
                    <div className="certificate-preview-media" aria-hidden="true">
                      <Image
                        src={item.imageSrc}
                        alt=""
                        fill
                        className="certificate-preview-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 42rem, 34rem"
                      />
                      <div className="certificate-preview-overlay" aria-hidden="true" />
                    </div>
                    <div className="certificate-preview-content">
                      <p className="certificate-preview-kicker">Certificate</p>
                      <h4 className="certificate-title text-lg font-semibold tracking-[-0.015em] text-[var(--foreground)] sm:text-xl">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm font-medium text-[var(--text-muted)] sm:text-[0.98rem]">{item.issuer}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.year}</p>
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <button
            type="button"
            className={`education-scroll-btn education-scroll-btn--right ${canCertificateScrollNext ? "is-active" : "is-inactive"}`}
            aria-label="Scroll certificate cards right"
            onClick={() => scrollByCard(certificateScrollRef.current, ".certificate-card--horizontal", "next")}
            disabled={!canCertificateScrollNext}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      {hasMounted && activeCertificate && createPortal(
        <div
          className="certificate-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCertificate.title} certificate preview`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveCertificate(null);
            }
          }}
        >
          <div className="certificate-modal-shell">
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setActiveCertificate(null)}
              aria-label="Close certificate preview"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="certificate-modal-image-wrap">
              <Image
                src={activeCertificate.imageSrc}
                alt={activeCertificate.imageAlt}
                fill
                className="certificate-modal-image"
                sizes="92vw"
                priority
              />
            </div>
          </div>
        </div>
      , document.body)}
    </section>
  );
}
