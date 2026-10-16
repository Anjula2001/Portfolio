"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDownToLine, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cvDownloads } from "@/data/cvDownloads";

export function CvDownload() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="cv-download"
      data-open={open}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={buttonVariants({ size: "lg", variant: "outline", className: "cv-trigger" })}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((previous) => !previous)}
      >
        Download CV
        <ChevronDown className="cv-chevron" size={14} aria-hidden="true" />
      </button>

      <div id={panelId} className="cv-panel" inert={!open} aria-hidden={!open}>
        <ul className="cv-options">
          {cvDownloads.map((cv) => {
            const content = (
              <>
                <span className="cv-option-title">{cv.title}</span>
                <ArrowDownToLine className="cv-option-download" size={14} aria-hidden="true" />
              </>
            );
            return (
              <li key={cv.id}>
                {cv.href ? (
                  <a
                    className="cv-option"
                    href={cv.href}
                    download={cv.filename}
                    onClick={() => {
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  <button type="button" className="cv-option" aria-disabled="true">
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
