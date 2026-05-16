import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const TECH_COLOR: Record<string, string> = {
  "React":        "bg-cyan-500/10   border-cyan-500/30   text-cyan-700   dark:bg-cyan-500/10   dark:border-cyan-500/30   dark:text-cyan-400",
  "Node.js":      "bg-green-500/10  border-green-500/30  text-green-700  dark:bg-green-500/10  dark:border-green-500/30  dark:text-green-400",
  "NodeJS":       "bg-green-500/10  border-green-500/30  text-green-700  dark:bg-green-500/10  dark:border-green-500/30  dark:text-green-400",
  "express":      "bg-slate-400/10  border-slate-400/30  text-slate-600  dark:bg-white/5       dark:border-white/15      dark:text-slate-400",
  "Express":      "bg-slate-400/10  border-slate-400/30  text-slate-600  dark:bg-white/5       dark:border-white/15      dark:text-slate-400",
  "Tailwindcss":  "bg-sky-500/10    border-sky-500/30    text-sky-700    dark:bg-sky-500/10    dark:border-sky-500/30    dark:text-sky-400",
  "PostgresSql":  "bg-blue-600/10   border-blue-600/30   text-blue-700   dark:bg-blue-600/10   dark:border-blue-600/30   dark:text-blue-400",
  "AWS":          "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-400",
  "Azure":        "bg-blue-500/10   border-blue-500/30   text-blue-700   dark:bg-blue-500/10   dark:border-blue-500/30   dark:text-blue-400",
  "Next.js":      "bg-neutral-500/10 border-neutral-400/30 text-neutral-700 dark:bg-white/5    dark:border-white/15      dark:text-slate-300",
  "Angular":      "bg-red-500/10    border-red-500/30    text-red-700    dark:bg-red-500/10    dark:border-red-500/30    dark:text-red-400",
  "Bootstrap":    "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400",
  "MongoDB":      "bg-green-600/10  border-green-600/30  text-green-700  dark:bg-green-600/10  dark:border-green-600/30  dark:text-green-400",
  "TypeScript":   "bg-blue-500/10   border-blue-500/30   text-blue-700   dark:bg-blue-500/10   dark:border-blue-500/30   dark:text-blue-400",
};
const DEFAULT_TAG = "bg-slate-100 dark:bg-white/4 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-500";

interface Project {
  id: number;
  title: string;
  description: string[];
  tech: string[];
  href: string | null;
  class?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.transform = `rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateZ(6px)`;
    }

    function onLeave() {
      if (el) el.style.transform = "";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: project.id * 0.08 }}
    >
      <div
        ref={ref}
        className="h-full flex flex-col transform-gpu will-change-transform transition-all duration-300 rounded-xl p-5 border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-500/10 backdrop-blur-sm cursor-default"
      >
        {/* Title row */}
        <div className="mb-4">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-start gap-1.5 font-bold text-base text-slate-800 dark:text-slate-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors leading-snug"
            >
              {project.title}
              <ExternalLink
                size={13}
                className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-violet-400"
              />
            </a>
          ) : (
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 leading-snug">
              {project.title}
            </h3>
          )}
        </div>

        {/* Description bullets */}
        <ul className="flex-1 space-y-2 mb-5">
          {project.description.map((desc, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              <span className="text-violet-400/70 mt-[3px] shrink-0">▸</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-white/6">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-[10px] px-2.5 py-1 rounded-full border font-mono tracking-wide ${TECH_COLOR[t] ?? DEFAULT_TAG}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
