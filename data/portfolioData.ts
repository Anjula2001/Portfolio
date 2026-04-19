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
  results?: string;
};

export type CertificateItem = {
  title: string;
  year: string;
  issuer: string;
  imageSrc: string;
  imageAlt: string;
  themeTint: string;
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
    description: "Currently pursuing a BSc (Hons) in Information Technology at the University of Moratuwa, Sri Lanka. Actively building a strong foundation in software engineering through coursework in data structures, algorithms, system design, and full-stack development. Passionate about creating scalable, user-focused applications while continuously exploring modern technologies and real-world problem solving.",
    logoSrc: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    logoAlt: "University of Moratuwa logo",
  },
  {
    institution: "R/ Elapatha Maha Vidyalaya",
    degree: "Advanced Level Studies",
    duration: "2018 – 2020",
    description: "Completed Advanced Level studies in Combined Mathematics, Physics, and Information Technology, developing strong analytical thinking and problem-solving skills. This phase strengthened my logical reasoning and technical foundation, preparing me for higher studies in the IT field.",
    logoSrc:"/elp.png",
    logoAlt:"Elapatha Maha Vidyalaya Logo",
    results: "Results - ABB",
  },
   {
    institution: "R/ Delwala Maha Vidyalaya",
    degree: "Ordinary Level Studies",
    duration: "2006 – 2018",
    description: "Completed Ordinary Level studies with a focus on Information and Communication Technology, building early interest in computing and digital systems. Developed a solid academic foundation alongside discipline and consistency in learning.",
    logoSrc:"/del.png",
    logoAlt:"Delwala Maha Vidyalaya Logo",
    results: "Results - A8C1",
  },

];

export const certificates: CertificateItem[] = [
  {
    title: "Introduction to HTML",
    year: "2025",
    issuer: "SoloLearn",
    imageSrc: "/Certificates/IntroductionToHtml.jpeg",
    imageAlt: "Introduction to HTML course certificate",
    themeTint: "rgba(223, 236, 248, 0.96)",
  },
  {
    title: "Python for Beginners",
    year: "2024",
    issuer: "University of Moratuwa - CODL",
    imageSrc: "/Certificates/PythonForBeginers.jpeg",
    imageAlt: "Python for Beginners certificate",
    themeTint: "rgba(245, 239, 228, 0.96)",
  },
  {
    title: "ML for Beginners",
    year: "2025",
    issuer: "SoloLearn",
    imageSrc: "/Certificates/MlForBeginers.jpeg",
    imageAlt: "ML for Beginners course certificate",
    themeTint: "rgba(223, 236, 248, 0.96)",
  },
  {
    title: "Web Design for Beginners",
    year: "2024",
    issuer: "University of Moratuwa - CODL",
    imageSrc: "/Certificates/WebDesignForBeginers.jpeg",
    imageAlt: "Web Design for Beginners certificate",
    themeTint: "rgba(246, 239, 227, 0.96)",
  },
  {
    title: "Responsive Web Design",
    year: "2025",
    issuer: "freeCodeCamp",
    imageSrc: "/Certificates/ResponsiveWebDesign.jpeg",
    imageAlt: "Responsive Web Design certificate",
    themeTint: "rgba(230, 235, 246, 0.96)",
  },
];
