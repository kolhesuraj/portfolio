import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Project card with tilt on hover
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      el.style.transform = `rotateX(${-dy * 6}deg) rotateY(${
        dx * 6
      }deg) translateZ(6px)`;
    }
    function onLeave() {
      if (el) {
        el.style.transform = "";
      }
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
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: -25, opacity: 1 }}
      transition={{ duration: 1, delay: project.id * 0.2 }}>
      <div
        ref={ref}
        className={cn(
          project.class ||
            "bg-gray-100 dark:bg-gray-800 border border-gray-150 dark:border-gray-700",
          "h-full flex flex-col transform-gpu will-change-transform transition-shadow duration-300 rounded-xl p-5 shadow-sm hover:shadow-lg",
        )}>
        <div className="flex items-center justify-between">
          <h3
            className={cn(
              "font-semibold text-lg",
              project.href
                ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                : "",
            )}>
            <a
              href={project.href || "#"}
              target="_blank"
              rel="noreferrer"
              className="group perspective">
              {project.title}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            {project.tech.slice(0, 2).join(" • ")}
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 mb-2">
          <ul className="list-disc list-outside pl-6 space-y-1">
            {project.description.map((desc, index) => (
              <li key={index} className="leading-relaxed">
                {desc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 border rounded-full text-gray-500 dark:text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
