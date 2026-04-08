import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Code,
  Zap,
  FileCode,
  Server,
  Database,
  GitBranch,
  Layers,
} from "lucide-react";

export type SkillItem = {
  name: string;
  Icon: LucideIcon;
  color: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  stack: string;
};

export type EducationItem = {
  institution: string;
  degree: string;
  duration: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
};

export type NavItem = {
  id: string;
  label: string;
};

export const skills: SkillItem[] = [
  { name: "Python", Icon: Code2, color: "#3776ab" },
  { name: "JavaScript", Icon: Code, color: "#f1e05a" },
  { name: "React", Icon: Zap, color: "#61dafb" },
  { name: "TypeScript", Icon: FileCode, color: "#3178c6" },
  { name: "Node.js", Icon: Server, color: "#68a063" },
  { name: "PostgreSQL", Icon: Database, color: "#336791" },
  { name: "Git", Icon: GitBranch, color: "#f1502f" },
  { name: "System Design", Icon: Layers, color: "#8b5cf6" },
];

export const projects: ProjectItem[] = [
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

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const education: EducationItem[] = [
  {
    institution: "University of Moratuwa",
    degree: "BSc (Hons) in Information Technology",
    duration: "2024 – Present",
    description: "A second-year BSc (Hons) Information Technology undergraduate at the University of Moratuwa, focusing on software engineering and full-stack development, with a developing interest in artificial intelligence and machine learning.",
    logoSrc: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    logoAlt: "University of Moratuwa logo",
  },
  {
    institution: "R/Elapatha Maha Vidyalaya",
    degree: "Advanced Level Studies",
    duration: "2018 – 2020",
    description: "Built a stronger base in modern web development, databases, and clean architecture.",
    logoSrc:"",
    logoAlt:"Elapatha Maha Vidyalaya Logo",
  },
  
];

export const certificates: CertificateItem[] = [
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
