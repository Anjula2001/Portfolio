"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Sparkles, Code2, Code, Zap, FileCode, Server, Database, GitBranch, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "Python", Icon: Code2, color: "#3776ab" },
  { name: "JavaScript", Icon: Code, color: "#f1e05a" },
  { name: "React", Icon: Zap, color: "#61dafb" },
  { name: "TypeScript", Icon: FileCode, color: "#3178c6" },
  { name: "Node.js", Icon: Server, color: "#68a063" },
  { name: "PostgreSQL", Icon: Database, color: "#336791" },
  { name: "Git", Icon: GitBranch, color: "#f1502f" },
  { name: "System Design", Icon: Layers, color: "#8b5cf6" },
];

const projects = [
  {
    name: "Vision Assist",
    description: "Real-time scene guidance tool with concise spoken outputs.",
    stack: "Next.js · Python · OpenCV",
  },
  {
    name: "Career Atlas",
    description: "Portfolio intelligence app for growth plans and interview preparation.",
    stack: "React · FastAPI · PostgreSQL",
  },
  {
    name: "Signalboard",
    description: "Collaboration dashboard with low-latency updates and role-aware workspaces.",
    stack: "TypeScript · Node.js · WebSockets",
  },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const education = [
  {
    institution: "University of Moratuwa",
    degree: "BSc in Information Technology",
    duration: "2024 – Present",
    description: "Focused on software engineering, systems thinking, and practical product development.",
  },
  {
    institution: "Institute of Java and Software Engineering",
    degree: "Foundation in Full-Stack Development",
    duration: "2023 – 2024",
    description: "Built a stronger base in modern web development, databases, and clean architecture.",
  },
];

const certificates = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta via Coursera",
    year: "2025",
  },
  {
    title: "Google UX Design",
    issuer: "Google via Coursera",
    year: "2025",
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2024",
  },
];

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
      const distance = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      };

      window.requestAnimationFrame(step);
    };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="ambient-bg pointer-events-none absolute inset-0" />
      <div className="hero-orb pointer-events-none absolute left-[-140px] top-[-90px]" />
      <div className="hero-orb hero-orb-alt pointer-events-none absolute right-[-140px] top-28" />

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8">
        <div className={`top-nav-wrap mx-auto max-w-6xl ${navScrolled ? "top-nav-wrap--scrolled" : ""}`}>
          <div className="top-nav hidden md:flex">
            <a href="#about" className="nav-brand" aria-label="Anju" onClick={handleSmoothScroll("about")}>
              <Image src="/Anju.png" alt="Anju" className="nav-logo" width={160} height={27} priority />
            </a>
            <nav className="flex items-center gap-8 text-sm text-[var(--text-muted)]">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  onClick={handleSmoothScroll(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className={`nav-cta ${activeSection === "contact" ? "active" : ""}`}
              onClick={handleSmoothScroll("contact")}
            >
              Let&apos;s Talk
            </a>
          </div>
          <div className="mobile-nav md:hidden">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={handleSmoothScroll(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

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
          <a href="#projects" onClick={handleSmoothScroll("projects")}>
            <Button size="lg">View Work</Button>
          </a>
          <a href="#contact" onClick={handleSmoothScroll("contact")}>
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </a>
        </div>
      </section>

      <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="about">
        <div className="grid gap-8 md:grid-cols-[1.45fr_1fr]">
          <Card className="project-card about-card reveal-item p-8 sm:p-12">
            <h2 className="section-title">About</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] text-justify">
  I’m Anjula Amarakoon, an Information Technology undergraduate at the University of Moratuwa. I enjoy building clean and reliable web applications, focusing on modern technologies, good design, and practical problem solving.
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

      <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="education">
        <div className="section-head reveal-item">
          <h2 className="section-title">Education Journey</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            A concise view of the academic path behind my technical foundation.
          </p>
        </div>

        <div className="education-grid mt-10 reveal-item" role="list" aria-label="Education Journey">
          {education.map((item) => (
            <Card key={`${item.institution}-${item.duration}`} className="education-card education-card--horizontal h-full" role="listitem">
              <CardContent className="p-0">
                <div className="education-card-body p-6 sm:p-7">
                  <div className="education-card-head">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.015em] text-[var(--foreground)] sm:text-xl">
                        {item.institution}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-[var(--text-muted)] sm:text-[0.98rem]">
                        {item.degree}
                      </p>
                    </div>
                    <p className="education-duration text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {item.duration}
                    </p>
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

      <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="projects">
        <div className="section-head reveal-item">
          <h2 className="section-title">Projects</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Recent work where usability, architecture quality, and reliability align.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-6 reveal-item">
          {projects.map((project, idx) => (
            <Card
              key={project.name}
              className={`project-card h-full ${idx === 0 ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2"}`}
            >
              <CardContent className="p-0">
                <div className="project-preview">
                  <span>{idx === 0 ? "Featured" : `Preview ${String(idx + 1).padStart(2, "0")}`}</span>
                </div>
                <div className="p-7">
                  <h3 className="flex items-center justify-between text-xl font-semibold tracking-[-0.01em]">
                    {project.name}
                    <ArrowUpRight size={17} className="text-[var(--text-muted)]" />
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    {project.description}
                  </p>
                  <p className="mt-5 border-t border-[var(--line)] pt-4 text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">
                    {project.stack}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-block reveal-on-scroll mx-auto max-w-6xl px-6 sm:px-10" id="skills">
        <div className="section-head reveal-item">
          <h2 className="section-title">Skills</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Core technologies and tools that power my work.
          </p>
        </div>

        <div className="mt-16 flex justify-center reveal-item">
          <div className="skill-dock">
            {skills.map((skill, idx) => {
              const IconComponent = skill.Icon;
              return (
                <div
                  key={skill.name}
                  className="skill-icon"
                  style={{
                    "--icon-delay": `${idx * 0.05}s`,
                  } as React.CSSProperties}
                >
                  <div className="skill-icon-inner" title={skill.name} style={{ '--icon-color': skill.color } as React.CSSProperties}>
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <div className="skill-tooltip">{skill.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 reveal-on-scroll" id="contact">
        <Card className="p-8 sm:p-12 reveal-item">
          <h2 className="section-title">Contact</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Share a brief about your project, role, or collaboration idea.
          </p>

          <form className="mt-10 grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Your name" className="glass-input" />
            <input type="email" placeholder="Email" className="glass-input" />
            <textarea
              placeholder="Message"
              rows={5}
              className="glass-input sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button size="lg" className="inline-flex items-center">
                <Mail size={16} />
                Send Message
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}