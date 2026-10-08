"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Card, CardContent } from "@/components/ui/card";
import { useRail } from "@/lib/useRail";
import type { CertificateItem, EducationItem } from "@/data/portfolioData";
import styles from "./EducationSection.module.css";

type EducationSectionProps = {
  education: EducationItem[];
  certificates: CertificateItem[];
};

export function EducationSection({ education, certificates }: EducationSectionProps) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const certRail = useRail(certificateRef, ".certificate-card", certificates.length);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    // Return focus to the card that opened the lightbox.
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null) {
          return current;
        }
        return (current + delta + certificates.length) % certificates.length;
      });
    },
    [certificates.length],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : certificates[activeIndex];

  return (
    <section
      className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10"
      id="education"
    >
      <div className="section-head reveal-item">
        <h2 className="section-title">Education Journey</h2>
        <p className="section-lede">
          A concise view of the academic path behind my technical foundation.
        </p>
      </div>

      <div className={`${styles.journey} mt-10 reveal-item`} role="list" aria-label="Education journey">
        {education.map((item) => (
          <article
            key={`${item.institution}-${item.duration}`}
            className={`${styles.card} ${item.current ? styles.current : ""}`}
            role="listitem"
          >
            <div className={styles.visual}>
              <div className={styles.heading}>
                <p className={styles.eyebrow}>{item.level}</p>
                <h3 className={styles.headline}>{item.headline}</h3>
              </div>
              {item.logoSrc ? (
                <div className={styles.emblem} aria-hidden="true">
                  <Image
                    src={item.logoSrc}
                    alt=""
                    width={112}
                    height={112}
                    sizes="112px"
                    className={styles.logo}
                  />
                </div>
              ) : null}
            </div>

            <div className={styles.details}>
              <p className={styles.institution}>{item.institution}</p>
              <p className={styles.duration}>{item.duration}</p>
              <div className={styles.footer}>
                {item.results ? (
                  <p className={styles.result}>
                    <span className={styles.resultValue}>{item.results.value}</span>
                    <span className={styles.resultLabel}>{item.results.label}</span>
                  </p>
                ) : null}
                <span className={styles.status}>
                  {item.current ? "In progress" : "Completed"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="certificates-group reveal-item">
        <div className="certificates-head">
          <h3 className="certificates-title">Certificates</h3>
          <p className="section-lede">Select a certificate to view it full size.</p>
        </div>

        <div className="education-carousel mt-6">
          <button
            type="button"
            className={`education-scroll-btn education-scroll-btn--left ${certRail.canPrev ? "is-active" : "is-inactive"}`}
            aria-label="Previous certificates"
            onClick={() => certRail.scrollBy("prev")}
            disabled={!certRail.canPrev}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div
            ref={certificateRef}
            className={`education-grid ${certRail.isDragging ? "is-dragging" : ""}`}
            role="list"
            aria-label="Certificates"
            tabIndex={0}
            onKeyDown={certRail.onKeyDown}
            onPointerDown={certRail.onPointerDown}
            onPointerMove={certRail.onPointerMove}
            onPointerUp={certRail.onPointerUp}
            onPointerCancel={certRail.onPointerCancel}
            onClick={certRail.onClick}
            onDragStart={certRail.onDragStart}
          >
            {certificates.map((item, idx) => (
              <Card
                key={`${item.title}-${item.year}`}
                className="certificate-card education-card--horizontal certificate-preview-card"
                style={{ "--certificate-tint": item.themeTint } as CSSProperties}
                role="listitem"
              >
                <CardContent className="h-full p-0">
                  <button
                    type="button"
                    className="certificate-preview-button"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setActiveIndex(idx);
                    }}
                    aria-label={`View ${item.title} certificate`}
                  >
                    <span className="certificate-preview-media" aria-hidden="true">
                      <Image
                        src={item.imageSrc}
                        alt=""
                        fill
                        className="certificate-preview-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 42rem, 34rem"
                      />
                      <span className="certificate-preview-overlay" />
                    </span>
                    <span className="certificate-preview-content">
                      <span className="kicker block">Certificate</span>
                      <span className="certificate-title mt-1 block">{item.title}</span>
                      <span className="mt-1.5 block text-sm text-[var(--text-muted)]">
                        {item.issuer}
                      </span>
                      <span className="mt-4 block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {item.year}
                      </span>
                    </span>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <button
            type="button"
            className={`education-scroll-btn education-scroll-btn--right ${certRail.canNext ? "is-active" : "is-inactive"}`}
            aria-label="Next certificates"
            onClick={() => certRail.scrollBy("next")}
            disabled={!certRail.canNext}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {certRail.pageCount > 1 ? (
          <div className="rail-dots reveal-item" aria-label="Certificate pages">
            {Array.from({ length: certRail.pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-current={index === certRail.page}
                aria-label={`Go to certificate page ${index + 1}`}
                onClick={() => certRail.scrollToPage(index)}
              />
            ))}
          </div>
        ) : null}
      </div>

      {active && activeIndex !== null
        ? createPortal(
            <div
              className="certificate-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} certificate`}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  close();
                }
              }}
            >
              <div className="certificate-modal-shell">
                <div className="certificate-modal-bar">
                  <div className="certificate-modal-meta">
                    <p className="certificate-modal-title">{active.title}</p>
                    <p className="certificate-modal-sub">
                      {active.issuer} &middot; {active.year}
                    </p>
                  </div>

                  <div className="certificate-modal-controls">
                    <button
                      type="button"
                      className="modal-btn"
                      onClick={() => step(-1)}
                      aria-label="Previous certificate"
                      disabled={certificates.length < 2}
                    >
                      <ChevronLeft size={18} aria-hidden="true" />
                    </button>
                    <span className="modal-count">
                      {activeIndex + 1} / {certificates.length}
                    </span>
                    <button
                      type="button"
                      className="modal-btn"
                      onClick={() => step(1)}
                      aria-label="Next certificate"
                      disabled={certificates.length < 2}
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                    <button
                      ref={closeRef}
                      type="button"
                      className="modal-btn"
                      onClick={close}
                      aria-label="Close"
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="certificate-modal-stage">
                  <Image
                    src={active.imageSrc}
                    alt={active.imageAlt}
                    fill
                    className="certificate-modal-image"
                    sizes="94vw"
                    priority
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
