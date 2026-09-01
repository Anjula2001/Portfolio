"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BackToTop } from "@/components/chrome/BackToTop";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import {
  certificates,
  education,
  navItems,
  projects,
  skills,
} from "@/data/portfolioData";

const SCROLL_OFFSET = 76;
const SCROLL_DURATION = 620;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [navScrolled, setNavScrolled] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const handleScrollState = () => {
      setNavScrolled(window.scrollY > 8);
    };

    handleScrollState();
    window.addEventListener("scroll", handleScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollState);
    };
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.65], rootMargin: "-38% 0px -48% 0px" },
    );

    sections.forEach((section) => {
      revealObserver.observe(section);
      activeObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [sectionIds]);

  const handleSmoothScroll =
    (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      const startY = window.scrollY;
      const targetY = target.getBoundingClientRect().top + startY - SCROLL_OFFSET;

      const finish = () => {
        window.history.replaceState(null, "", `#${sectionId}`);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, targetY);
        finish();
        return;
      }

      const distance = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);

        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          finish();
        }
      };

      window.requestAnimationFrame(step);
    };

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <main
        id="main"
        className="relative min-h-screen flex-1 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="ambient-bg pointer-events-none absolute inset-x-0 top-0 h-[520px]" />

        <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8">
          <div
            className={`top-nav-wrap mx-auto max-w-6xl ${navScrolled ? "top-nav-wrap--scrolled" : ""}`}
          >
            <div className="top-nav">
              <a
                href="#about"
                className="nav-brand"
                aria-label="Anjula Amarakoon, back to top"
                onClick={handleSmoothScroll("about")}
              >
                <Image
                  src="/Anju.png"
                  alt="Anju"
                  className="nav-logo"
                  width={150}
                  height={25}
                  priority
                />
              </a>

              <nav className="nav-links" aria-label="Sections">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                    aria-current={activeSection === item.id ? "true" : undefined}
                    onClick={handleSmoothScroll(item.id)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="nav-actions">
                <ThemeToggle />
                <a
                  href="#contact"
                  className={`nav-cta ${activeSection === "contact" ? "active" : ""}`}
                  onClick={handleSmoothScroll("contact")}
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>

            <div className="mobile-nav-bar">
              <a
                href="#about"
                className="nav-brand"
                aria-label="Anjula Amarakoon, back to top"
                onClick={handleSmoothScroll("about")}
              >
                <Image src="/Anju.png" alt="Anju" className="nav-logo" width={150} height={25} />
              </a>
              <ThemeToggle />
            </div>

            <nav className="mobile-nav" aria-label="Sections">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "active" : ""}
                  aria-current={activeSection === item.id ? "true" : undefined}
                  onClick={handleSmoothScroll(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <HeroSection
          onProjectsClick={handleSmoothScroll("projects")}
          onContactClick={handleSmoothScroll("contact")}
        />
        <EducationSection education={education} certificates={certificates} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ContactSection />
      </main>

      <SiteFooter />
      <BackToTop />
    </>
  );
}
