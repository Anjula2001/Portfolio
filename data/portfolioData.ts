export type SkillItem = {
  name: string;
  category: "Web Development" | "Database" | "Programming Languages" | "Other";
  logoSrc: string;
  logoAlt: string;
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
  { name: "HTML", category: "Web Development", logoSrc: "/logos/html.webp", logoAlt: "HTML logo" },
  { name: "CSS", category: "Web Development", logoSrc: "/logos/css.webp", logoAlt: "CSS logo" },
  { name: "JavaScript", category: "Web Development", logoSrc: "/logos/js.webp", logoAlt: "JavaScript logo" },
  { name: "TypeScript", category: "Web Development", logoSrc: "/logos/ts.webp", logoAlt: "TypeScript logo" },
  { name: "React", category: "Web Development", logoSrc: "/logos/react.webp", logoAlt: "React logo" },
  { name: "Next.js", category: "Web Development", logoSrc: "/logos/next.webp", logoAlt: "Next.js logo" },
  { name: "Node.js", category: "Web Development", logoSrc: "/logos/node-js.webp", logoAlt: "Node.js logo" },
  { name: "Express", category: "Web Development", logoSrc: "/logos/express.webp", logoAlt: "Express logo" },
  { name: "Tailwind CSS", category: "Web Development", logoSrc: "/logos/tailwind.webp", logoAlt: "Tailwind CSS logo" },
  { name: "Spring Boot", category: "Web Development", logoSrc: "/logos/springboot.webp", logoAlt: "Spring Boot logo" },


  { name: "MySQL", category: "Database", logoSrc: "/logos/mysql.webp", logoAlt: "MySQL logo" },
  { name: "PostgreSQL", category: "Database", logoSrc: "/logos/postger.webp", logoAlt: "PostgreSQL logo" },
  { name: "MongoDB", category: "Database", logoSrc: "/logos/mongodb.webp", logoAlt: "MongoDB logo" },

  { name: "Python", category: "Programming Languages", logoSrc: "/logos/python.webp", logoAlt: "Python logo" },
  { name: "Java", category: "Programming Languages", logoSrc: "/logos/java.webp", logoAlt: "Java logo" },
  { name: "C", category: "Programming Languages", logoSrc: "/logos/c.webp", logoAlt: "C language logo" },
  { name: "C++", category: "Programming Languages", logoSrc: "/logos/c++.png", logoAlt: "C++ language logo" },

  { name: "Git", category: "Other", logoSrc: "/logos/git.webp", logoAlt: "Git logo" },
  { name: "Figma", category: "Other", logoSrc: "/logos/figma.webp", logoAlt: "Figma logo" },
  { name: "Postman", category: "Other", logoSrc: "/logos/postman.webp", logoAlt: "Postman logo" },
  { name: "Arduino", category: "Other", logoSrc: "/logos/arduino.webp", logoAlt: "Arduino logo" },
  { name: "Photoshop", category: "Other", logoSrc: "/logos/photoshop.png", logoAlt: "Photoshop logo" },
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
    stack: "Next.js · TypeScript · PostgreSQL · Java · Tailwind CSS",
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
