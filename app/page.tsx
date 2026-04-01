import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "System Design",
  "API Engineering",
  "AI Integration",
  "Performance Optimization",
  "Cloud Deployment",
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

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="ambient-bg pointer-events-none absolute inset-0" />
      <div className="hero-orb pointer-events-none absolute left-[-140px] top-[-90px]" />
      <div className="hero-orb hero-orb-alt pointer-events-none absolute right-[-140px] top-28" />

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8">
        <div className="top-nav-wrap mx-auto max-w-6xl">
          <div className="top-nav hidden md:flex">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--text-muted)] uppercase sm:text-sm">
            Anjula Portfolio
            </p>
            <nav className="flex items-center gap-8 text-sm text-[var(--text-muted)]">
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#projects" className="nav-link">
                Projects
              </a>
              <a href="#skills" className="nav-link">
                Skills
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
            <a href="#contact" className="nav-cta">
              Let&apos;s Talk
            </a>
          </div>
          <div className="mobile-nav md:hidden">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:px-10 sm:pb-28 sm:pt-32">
        <p className="glass-badge mx-auto inline-flex items-center gap-2">
          <Sparkles size={14} />
          Product Engineer
        </p>
        <h1 className="mt-8 text-balance text-5xl leading-[1.02] font-semibold tracking-[-0.02em] sm:text-6xl md:text-7xl">
          Crafting calm, precise digital products
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          I am Anjula, a full-stack developer building thoughtful web experiences with
          modern frontend systems, dependable backend architecture, and practical AI.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <a href="#projects">
            <Button size="lg">View Work</Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </a>
        </div>
      </section>

      <section className="section-block mx-auto max-w-6xl px-6 sm:px-10" id="about">
        <div className="grid gap-8 md:grid-cols-[1.45fr_1fr]">
          <Card className="p-8 sm:p-12">
            <h2 className="section-title">About</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)]">
              I focus on product experiences that feel effortless while staying robust in
              production. My work combines clean interface systems, API-driven development,
              and performance-conscious engineering to deliver clear user value.
            </p>
          </Card>
          <Card className="p-6 sm:p-8">
            <div className="profile-shell">
              <div className="profile-image">A</div>
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">Full-Stack Developer</p>
          </Card>
        </div>
      </section>

      <section className="section-block mx-auto max-w-6xl px-6 sm:px-10" id="projects">
        <div className="section-head">
          <h2 className="section-title">Projects</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Recent work where usability, architecture quality, and reliability align.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-6">
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

      <section className="section-block mx-auto max-w-6xl px-6 sm:px-10" id="skills">
        <div className="section-head">
          <h2 className="section-title">Skills</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Technical strengths represented with a minimal, structured signal.
          </p>
        </div>

        <Card className="mt-10 p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10" id="contact">
        <Card className="p-8 sm:p-12">
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