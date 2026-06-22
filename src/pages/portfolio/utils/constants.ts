import { FiGithub, FiLinkedin } from "react-icons/fi";
import {
  SiAmazonwebservices,
  SiDocker,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiSpring,
  SiMongodb,
  SiAngular,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa";

export const YOUR_NAME = "SURAJ KOLHE";
export const TAGLINE = "Full-Stack Developer • Node.js • React • Angular ";
export const BIO = `Full-stack developer building scalable web and cloud applications with Node.js, React, Java, Spring Boot, MongoDB, PostgreSQL, AWS, and Azure.`;
export const ABOUT =
  "Full-stack developer specializing in JavaScript, TypeScript, Node.js, React, Java, and Spring Boot, with hands-on experience in designing REST APIs, database design with PostgreSQL and MongoDB, implementing RBAC, and building cloud-integrated applications on AWS and Azure. Strong focus on backend architecture, performance optimization, and scalable system design.";
export const START_OF_CAREER = new Date("06/20/2022");
export const RESUME_LINK = "/cv.html";
export const RESUME_DOWNLOAD = "/Suraj-Kolhe-Resume.pdf";
export const SOCIALS: Array<{
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  {
    name: "GitHub",
    href: "https://github.com/kolhesuraj",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/in/suraj-kolhe",
    icon: FiLinkedin,
  },
];

export const colorFullCardTheme = [
  // Blue theme
  "bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-700",
  // Green theme
  "bg-gradient-to-br from-green-100 to-emerald-100 border border-green-300 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700",
  // Purple/Pink theme
  "bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-300 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700",
  // Amber/Orange theme
  "bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700",
  // default white/dark theme
  "bg-gray-100 dark:bg-gray-800 border border-gray-150 dark:border-gray-700",
];

export const PROJECTS: Array<{
  id: number;
  title: string;
  description: string[];
  tech: string[];
  href: string | null;
  class?: string;
}> = [
  {
    id: 1,
    title: "Clipboard Manager (Linux clipboard history app)",
    description: [
      "Built a keyboard-driven clipboard history manager for Linux (GNOME/Wayland) as an Electron desktop app with a React (TypeScript) UI — press Super+Shift+V from any app to browse and paste anything instantly.",
      "A lightweight background watcher captures clipboard content into a local SQLite database, keeping the last 100 entries with automatic deduplication, pinned items that are never evicted, and fuzzy full-history search.",
      "Registers a GNOME custom keybinding at startup and simulates the paste keystroke via wtype (Wayland), xdotool (XWayland), or Mutter RemoteDesktop D-Bus as fallback; fully local with no cloud sync, accounts, or telemetry.",
    ],
    tech: [
      "Electron",
      "React",
      "TypeScript",
      "Node.js",
      "SQLite",
      "Tailwindcss",
    ],
    href: "https://clipboardmanager.surajkolhe.com",
  },
  {
    id: 2,
    title: "Moneta (Cloud monitoring and billing system)",
    description: [
      "Built a cloud cost optimization platform using Node.js, AWS SDK v3, and Azure APIs to process billing and usage data across multi-account, multi-region environments.",
      "Implemented automated scanners for unused and abandoned resources using cross-account IAM roles, parallel execution, and region-aware discovery.",
      "Developed React (TypeScript) dashboards and reports with secure RBAC, data aggregation pipelines, and performance-optimized APIs.",
    ],
    tech: [
      "React",
      "Node.js",
      "express",
      "Tailwindcss",
      "PostgresSql",
      "AWS",
      "Azure",
    ],
    href: "https://monetacloud.com",
  },
  {
    id: 3,
    title: "Parental Control",
    description: [
      "Developed a parental control application using React / React Native and Node.js, enabling secure parent–child account linking and supervised access.",
      "Implemented JWT-based authentication, role separation, and API-level authorization to manage screen time, app access, and activity tracking.",
      "Built real-time usage reports, configurable restrictions, and notification workflows backed by a relational database (PostgreSQL) and scheduled background jobs.",
    ],
    tech: ["Next.js", "NodeJS", "Express", "PostgresSql"],
    href: null,
  },
  {
    id: 4,
    title: "AM Books",
    description: [
      "Built a full-stack enterprise management system using React (TypeScript) for the frontend and Node.js (Express) for REST APIs, with PostgreSQL + Sequelize for data modeling and persistence.",
      "Implemented role-based access control (RBAC) using JWT authentication, middleware-level authorization, and admin-managed permission mapping across modules.",
      "Developed invoice and quotation generation, automated email notifications via scheduled jobs for expiring contracts, and interactive dashboards with real-time insights into bench employees and employee status.",
    ],
    tech: ["Angular", "NodeJs", "Bootstrap", "Express", "MongoDB"],
    href: "https://books.angularminds.com",
  },
];

export const SKILLS: Array<{
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  logo: string;
  color: string;
}> = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    logo: "src/assets/javascript.svg",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    logo: "src/assets/typescript.svg",
    color: "#3178C6",
  },
  {
    name: "React",
    icon: SiReact,
    logo: "src/assets/react.svg",
    color: "#00D8FF",
  },
  { name: "Angular", icon: SiAngular, logo: "", color: "#DD0031" },
  { name: "Next.js", icon: SiNextdotjs, logo: "", color: "#94A3B8" },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    logo: "src/assets/nodejs.svg",
    color: "#68A063",
  },
  { name: "Express", icon: SiExpress, logo: "", color: "#94A3B8" },
  { name: "Java", icon: FaJava, logo: "", color: "#007396" },
  { name: "Spring Boot", icon: SiSpring, logo: "", color: "#6DB33F" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    logo: "src/assets/postgresql.svg",
    color: "#336791",
  },
  { name: "MongoDB", icon: SiMongodb, logo: "", color: "#47A248" },
  {
    name: "AWS ★",
    icon: SiAmazonwebservices,
    logo: "src/assets/amazonwebservices.svg",
    color: "#E8831A",
  },
  { name: "Azure", icon: FaMicrosoft, logo: "", color: "#0078D4" },
  { name: "Tailwind CSS", icon: SiTailwindcss, logo: "", color: "#06B6D4" },
  {
    name: "Docker",
    icon: SiDocker,
    logo: "src/assets/docker.svg",
    color: "#2496ED",
  },
  { name: "Git", icon: SiGit, logo: "", color: "#F05032" },
];

export const CREDLY_URL =
  "https://www.credly.com/users/suraj-kolhe.0894773c/badges";

export const CERTIFICATIONS: Array<{
  name: string;
  issuer: string;
  year: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  logo: string;
  // Put files in /public/certifications/ and reference as "/certifications/<file>.jpg"
  image?: string;
}> = [
  {
    name: "AWS Academy Graduate – Introduction to Cloud (Semester 1)",
    issuer: "AWS Academy",
    year: "Mar 2022",
    icon: SiAmazonwebservices,
    logo: "",
    image: "/certifications/aws-academy-graduate.jpg",
  },
];

export const AWARDS: Array<{
  name: string;
  issuer: string;
  year: string;
  description?: string;
  // Put files in /public/awards/ and reference as "/awards/<file>.jpg"
  image?: string;
}> = [
  {
    name: "Best Performer",
    issuer: "Angular Minds",
    year: "Mar 2025",
    description:
      "Recognized for outstanding individual performance and consistent, high-quality delivery across projects.",
    image: "/awards/best-performer.jpeg",
  },
  {
    name: "Best Team",
    issuer: "Angular Minds",
    year: "Mar 2025",
    description:
      "Awarded as part of a high-performing team for strong collaboration and on-time delivery.",
    image: "/awards/best-team.jpeg",
  },
  {
    name: "Key Contributor",
    issuer: "Angular Minds",
    year: "Mar 2024",
    description:
      "Acknowledged for significant technical contributions to team and project success.",
    image: "/awards/key-contributer.jpeg",
  },
];

export const EXPERIENCES: Array<{
  id: number;
  companyName: string;
  icon: string;
  logo: string;
  jointOn: string;
  leftOn: string;
  role: string;
  companyWebsite: string;
  workDone: string[];
}> = [
  {
    id: 1,
    companyName: "Angular Minds Pvt Ltd",
    icon: "src/assets/angular-minds-logo.png",
    logo: "src/assets/angular-minds-full.png",
    jointOn: "July 2022",
    leftOn: "Present",
    role: "Full-Stack Developer",
    companyWebsite: "https://www.angularminds.com/",
    workDone: [
      "Developed and maintained web applications using React, Angular and Node.js.",
      "Collaborated with cross-functional teams to define, design, and ship new features.",
      "Optimized applications for maximum speed and scalability.",
      "Implemented responsive design principles to ensure applications work on various devices.",
      "Participated in code reviews and provided export constructive feedback to team members.",
    ],
  },
];

export type education = {
  id: number;
  degree: string;
  collage: string;
  university: string;
  grade: string;
  percentages: string;
  startDate: string;
  endDte: string;
  class?: string;
};

export const EDUCATION: Array<education> = [
  {
    id: 1,
    degree: "MCA",
    collage:
      "PES Modern College of Arts, Science and Commerce , Ganeshkhind, Pune",
    university: "Savitribai Phule Pune University",
    grade: "A",
    percentages: "70.46",
    startDate: "June 2022",
    endDte: "March 2024",
  },
  {
    id: 1,
    degree: "BCA",
    collage:
      "PES Modern College of Arts, Science and Commerce , Ganeshkhind, Pune",
    university: "Savitribai Phule Pune University",
    grade: "A",
    percentages: "70.46",
    startDate: "June 2019",
    endDte: "March 2022",
  },
];

export const CONTACT: {
  email: string;
  email2: string;
  mobile: string;
} = {
  email: "surajkolhe214@gmail.com",
  email2: "suraj.r.kolhe@zohomail.com",
  mobile: "+91 7219550690",
};

export const TIMELINE_COLORS = {
  cyan: {
    dot: "bg-cyan-500 shadow-[0_0_0_3px_rgba(6,182,212,0.2),0_0_16px_rgba(6,182,212,0.45)]",
    date: "text-cyan-600 dark:text-cyan-400",
  },
  blue: {
    dot: "bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2),0_0_16px_rgba(59,130,246,0.45)]",
    date: "text-blue-600 dark:text-blue-400",
  },
};

// Shared timeline geometry — keep line, dots, dates and headings aligned
export const TL_ROW_PAD = "pl-32 sm:pl-44"; // content left padding
export const TL_LINE_X = "left-[116px] sm:left-[160px]"; // vertical line / dot x
export const TL_DATE_COL = "left-0 w-[100px] sm:w-[140px]"; // date label gutter

// ─── Typewriter hook ───────────────────────────────────────────
export const ROLES = [
  "Backend Engineer",
  "JAVA Developer",
  "Full-Stack Developer",
  "Node.js Engineer",
  "React Specialist",
  "Cloud Solutions Architect",
];

// ─── Shared variants ──────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Awards", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ─── Timeline helpers ─────────────────────────────────────────
export const MONTHS: Record<string, string> = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
};
