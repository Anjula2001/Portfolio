import { ArrowUpRight, BrainCircuit, Code2, Database, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { label: "Next.js", level: 90, icon: Code2 },
  { label: "TypeScript", level: 88, icon: Code2 },
  { label: "Node.js", level: 84, icon: Database },
  { label: "AI Integration", level: 82, icon: BrainCircuit },
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

      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/62 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <p className="text-sm font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
            Anjula Portfolio
          </p>
          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] sm:flex">
            <a href="#about" className="transition-colors hover:text-[var(--foreground)]">
              About
            </a>
            <a href="#projects" className="transition-colors hover:text-[var(--foreground)]">
              Projects
            </a>
            <a href="#skills" className="transition-colors hover:text-[var(--foreground)]">
              Skills
            </a>
            <a href="#contact" className="transition-colors hover:text-[var(--foreground)]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:px-10 sm:pb-24 sm:pt-28">
        <p className="glass-badge mx-auto inline-flex items-center gap-2">
          <Sparkles size={14} />
          Product Engineer
        </p>
        <h1 className="mt-7 text-balance text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl md:text-7xl">
          Crafting calm, precise digital products
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          I am Anjula, a full-stack developer building thoughtful web experiences with
          modern frontend systems, dependable backend architecture, and practical AI.
        </p>
        <div className="mt-10 flex justify-center gap-4">
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

      <section className="mx-auto max-w-6xl px-6 pb-18 sm:px-10" id="about">
        <div className="grid gap-8 md:grid-cols-[1.35fr_1fr]">
          <Card className="p-8 sm:p-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--text-muted)]">
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

      <section className="mx-auto max-w-6xl px-6 pb-18 sm:px-10" id="projects">
        <div className="section-head">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Recent work where usability, architecture quality, and reliability align.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project, idx) => (
            <Card key={project.name} className="project-card h-full">
              <CardContent className="p-0">
                <div className="project-preview">
                  <span>Preview {String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between text-lg font-semibold">
                    {project.name}
                    <ArrowUpRight size={17} className="text-[var(--text-muted)]" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
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

      <section className="mx-auto max-w-6xl px-6 pb-18 sm:px-10" id="skills">
        <div className="section-head">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Technical strengths represented with a minimal, structured signal.
          </p>
        </div>

        <Card className="mt-8 p-6 sm:p-8">
          <div className="space-y-5">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.label} className="skill-row">
                  <div className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)]">
                    <Icon size={16} className="text-[var(--text-muted)]" />
                    {skill.label}
                  </div>
                  <div className="skill-track">
                    <span className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10" id="contact">
        <Card className="p-7 sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
            Share a brief about your project, role, or collaboration idea.
          </p>

          <form className="mt-8 grid gap-4 sm:grid-cols-2">
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