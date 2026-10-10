export type SkillItem = {
  name: string;
  category: "Web Development" | "Database" | "Programming Languages" | "Other";
  logoSrc: string;
  logoAlt: string;
  tint: string;
  highlight?: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  stack: string;
  linkedinUrl?: string;
  githubUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type EducationItem = {
  institution: string;
  headline: string;
  level: string;
  degree: string;
  duration: string;
  description: string;
  focus?: string;
  logoSrc?: string;
  logoAlt?: string;
  results?: { value: string; label: string };
  current?: boolean;
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

export type ContactLink = {
  label: string;
  href: string;
};

export const skills: SkillItem[] = [
  { name: "HTML", category: "Web Development", logoSrc: "/logos/html.webp", logoAlt: "HTML logo", tint: "#e44d26", highlight: "#f16529" },
  { name: "CSS", category: "Web Development", logoSrc: "/logos/css.webp", logoAlt: "CSS logo", tint: "#1572b6", highlight: "#33a9dc" },
  { name: "JavaScript", category: "Web Development", logoSrc: "/logos/js.webp", logoAlt: "JavaScript logo", tint: "#e5c522" },
  { name: "TypeScript", category: "Web Development", logoSrc: "/logos/ts.webp", logoAlt: "TypeScript logo", tint: "#3178c6" },
  { name: "React", category: "Web Development", logoSrc: "/logos/react.webp", logoAlt: "React logo", tint: "#36b9db", highlight: "#61dafb" },
  { name: "Next.js", category: "Web Development", logoSrc: "/logos/next.webp", logoAlt: "Next.js logo", tint: "#64748b", highlight: "#94a3b8" },
  { name: "Node.js", category: "Web Development", logoSrc: "/logos/node-js.webp", logoAlt: "Node.js logo", tint: "#539e43", highlight: "#83cd29" },
  { name: "Express", category: "Web Development", logoSrc: "/logos/express.webp", logoAlt: "Express logo", tint: "#6b706b", highlight: "#a2aaa2" },
  { name: "Tailwind CSS", category: "Web Development", logoSrc: "/logos/tailwind.webp", logoAlt: "Tailwind CSS logo", tint: "#06b6d4", highlight: "#38bdf8" },
  { name: "Spring Boot", category: "Web Development", logoSrc: "/logos/springboot.webp", logoAlt: "Spring Boot logo", tint: "#6db33f" },


  { name: "MySQL", category: "Database", logoSrc: "/logos/mysql.webp", logoAlt: "MySQL logo", tint: "#006078", highlight: "#3a91a0" },
  { name: "PostgreSQL", category: "Database", logoSrc: "/logos/postger.webp", logoAlt: "PostgreSQL logo", tint: "#336791", highlight: "#6c9bbc" },
  { name: "MongoDB", category: "Database", logoSrc: "/logos/mongodb.webp", logoAlt: "MongoDB logo", tint: "#479c45", highlight: "#82bd69" },

  { name: "Python", category: "Programming Languages", logoSrc: "/logos/python.webp", logoAlt: "Python logo", tint: "#3776ab", highlight: "#ffd343" },
  { name: "Java", category: "Programming Languages", logoSrc: "/logos/java.webp", logoAlt: "Java logo", tint: "#d73532", highlight: "#5382a1" },
  { name: "C", category: "Programming Languages", logoSrc: "/logos/c.webp", logoAlt: "C language logo", tint: "#3779af", highlight: "#659ad2" },
  { name: "C++", category: "Programming Languages", logoSrc: "/logos/c++.png", logoAlt: "C++ language logo", tint: "#00599c", highlight: "#659ad2" },

  { name: "Git", category: "Other", logoSrc: "/logos/git.webp", logoAlt: "Git logo", tint: "#f05032" },
  { name: "Figma", category: "Other", logoSrc: "/logos/figma.webp", logoAlt: "Figma logo", tint: "#a259ff", highlight: "#1abc9c" },
  { name: "Postman", category: "Other", logoSrc: "/logos/postman.webp", logoAlt: "Postman logo", tint: "#ff6c37" },
  { name: "Arduino", category: "Other", logoSrc: "/logos/arduino.webp", logoAlt: "Arduino logo", tint: "#00979d", highlight: "#45b8bc" },
  { name: "Photoshop", category: "Other", logoSrc: "/logos/photoshop.png", logoAlt: "Photoshop logo", tint: "#008fd7", highlight: "#31a8ff" },
];

export const projects: ProjectItem[] = [
  {
    name: "ChessWiz",
    description: "ChessWiz is an intelligent automated chess system that connects a physical chessboard with a real-time web interface and smart move validation.",
    stack: "React.js · Stockfish · Node.js · Socket.IO · C++ · Express.js · PhotoShop",
    linkedinUrl: "https://www.linkedin.com/in/anjulaamarakoon/details/projects/",
    githubUrl: "https://github.com/Anjula2001/ChessWiz.git",
    imageSrc: "/Projects/ChessWiz.jpeg",
    imageAlt: "ChessWiz automated chess board with monitor interface",
  },
  {
    name: "Todo Application",
    description: "A simple and efficient todo application with a clean and intuitive user interface.",
    stack: "Next.js · TypeScript · Spring Boot · PostgreSQL · Java · Tailwind CSS",
    linkedinUrl: "https://www.linkedin.com/in/anjulaamarakoon/details/projects/",
    githubUrl: "https://github.com/Anjula2001/TodoNew.git",
    imageSrc: "/Projects/Todo.jpeg",
    imageAlt: "Todo Application interface",
  },
  {
    name: "Grand Restaurant",
    description: "A modern restaurant management system with real-time order processing and inventory control.",
    stack: "PHP · MySQL · JavaScript · HTML · CSS · Rest API",
    linkedinUrl: "https://www.linkedin.com/in/anjulaamarakoon/details/projects/",
    githubUrl: "https://github.com/Anjula2001/restuarent.git",
    imageSrc: "/Projects/GrandRestaurant.jpeg",
    imageAlt: "Grand Restaurant management system interface",
  },
  {
    name: "Portfolio",
    description: "A clean, responsive portfolio to showcase my projects, skills, and achievements.",
    stack: "Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Lenis · Lucide",
    linkedinUrl: "https://www.linkedin.com/in/anjulaamarakoon/details/projects/",
    githubUrl: "https://github.com/Anjula2001/Portfolio.git",
    imageSrc: "/Projects/Portfolio.png",
    imageAlt: "Portfolio interface",
  },
];

export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/Anjula2001" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anjulaamarakoon/" },
  { label: "Kaggle", href: "https://www.kaggle.com/anjulaprasad" },
  { label: "Email", href: "mailto:prasadanjula1@gmail.com" },
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
    headline: "Information Technology",
    level: "BSc (Hons)",
    degree: "BSc (Hons) in Information Technology",
    duration: "2024 – Present",
    description: "Building a foundation in software engineering, algorithms, and full-stack development.",
    focus: "Software engineering, algorithms & full-stack development.",
    logoSrc: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    logoAlt: "University of Moratuwa logo",
    results: { value: "3.6", label: "CGPA" },
    current: true,
  },
  {
    institution: "R/ Elapatha Maha Vidyalaya",
    headline: "Advanced Level",
    level: "Secondary education",
    degree: "Advanced Level Studies",
    duration: "2018 – 2020",
    description: "Combined Mathematics, Physics, and Information Technology, with a focus on analytical thinking.",
    logoSrc:"/elp.png",
    logoAlt:"Elapatha Maha Vidyalaya Logo",
    results: { value: "ABB", label: "A/L Results" },
  },
   {
    institution: "R/ Delwala Maha Vidyalaya",
    headline: "Ordinary Level",
    level: "Secondary education",
    degree: "Ordinary Level Studies",
    duration: "2006 – 2018",
    description: "A broad academic foundation, with an early interest in ICT, computing, and digital systems.",
    logoSrc:"/del.png",
    logoAlt:"Delwala Maha Vidyalaya Logo",
    results: { value: "8A · 1C", label: "O/L Results" },
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
