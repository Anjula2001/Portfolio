"use client";

import {
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

import type { SkillItem } from "@/data/portfolioData";

type SkillsSectionProps = {
  skills: SkillItem[];
};

const CATEGORY_ORDER: SkillItem["category"][] = [
  "Web Development",
  "Database",
  "Programming Languages",
  "Other",
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((title) => ({
        title,
        items: skills.filter((skill) => skill.category === title),
      })).filter((group) => group.items.length > 0),
    [skills],
  );

  const [index, setIndex] = useState(0);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"next" | "previous">("next");
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const active = groups[index];

  const move = (delta: number) => {
    setAnimationDirection(delta > 0 ? "next" : "previous");
    setIndex((current) => (current + delta + groups.length) % groups.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const dock = dockRef.current;
    if (!dock) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: dock.scrollLeft,
      moved: false,
    };
    setHoveredSkill(null);
    dock.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const dock = dockRef.current;
    if (!drag || !dock || drag.pointerId !== event.pointerId) {
      return;
    }

    const verticalDistance = event.clientY - drag.startY;
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(verticalDistance) > Math.abs(distance)) {
      return;
    }
    if (Math.abs(distance) < 3 && !drag.moved) {
      return;
    }

    drag.moved = true;
    suppressClickRef.current = true;
    setIsDragging(true);
    dock.scrollLeft = drag.startScrollLeft - distance;
    event.preventDefault();
  };

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const dock = dockRef.current;
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (dock?.hasPointerCapture(event.pointerId)) {
      dock.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleDockClick = (event: MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  const showSkillLabel = (name: string, event: PointerEvent<HTMLLIElement>) => {
    setHoveredSkill({
      name,
      x: event.clientX,
      y: event.clientY + 20,
    });
  };

  return (
    <section
      className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10"
      id="skills"
    >
      <div className="section-head reveal-item">
        <h2 className="section-title">Skills</h2>
        <p className="section-lede">Core technologies and tools that power my work.</p>
      </div>

      <div className="skill-slider reveal-item">
        <p className="skill-active-title" aria-live="polite">
          {active.title}
        </p>

        <div className="skill-slider-shell">
          <button
            type="button"
            className="skill-side-arrow"
            aria-label="Previous skill category"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div
            ref={dockRef}
            className={`skill-dock ${isDragging ? "is-dragging" : ""}`}
            aria-label={`${active.title} skills`}
            role="list"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
            onClick={handleDockClick}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                dockRef.current?.scrollBy({ left: -180, behavior: "smooth" });
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                dockRef.current?.scrollBy({ left: 180, behavior: "smooth" });
              }
            }}
          >
            <ul
              key={active.title}
              className={`skill-dock-content skill-dock-content--${animationDirection}`}
            >
              {active.items.map((skill) => (
                <li
                  key={skill.name}
                  className="skill-icon"
                  title={skill.name}
                  onPointerEnter={(event) => showSkillLabel(skill.name, event)}
                  onPointerMove={(event) => showSkillLabel(skill.name, event)}
                  onPointerLeave={() => setHoveredSkill(null)}
                >
                  <span className="skill-icon-inner">
                    <Image
                      src={skill.logoSrc}
                      alt=""
                      width={32}
                      height={32}
                      className="skill-logo"
                      draggable={false}
                    />
                  </span>
                  <span className="sr-only">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="skill-side-arrow"
            aria-label="Next skill category"
            onClick={() => move(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      {hoveredSkill && !isDragging
        ? createPortal(
            <span
              className="skill-cursor-label"
              style={{ left: hoveredSkill.x, top: hoveredSkill.y }}
              role="status"
            >
              {hoveredSkill.name}
            </span>,
            document.body,
          )
        : null}

    </section>
  );
}
