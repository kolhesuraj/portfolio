import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { education } from "../utils/constants";

export default function EducationCard({ education }: { education: education }) {
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
      transition={{ duration: 1, delay: education.id * 0.2 }}>
      <div
        ref={ref}
        className={cn(
          education.class ||
            "bg-gray-100 dark:bg-gray-800 border border-gray-150 dark:border-gray-700",
          "h-full flex flex-col transform-gpu will-change-transform transition-shadow duration-300 rounded-xl p-5 shadow-sm hover:shadow-lg",
        )}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-lg">
            <div className="group perspective flex gap-2 justify-center items-center">
              {education.degree}
              <div className="text-sm text-gray-400 gap-2 flex ">
                <span className="px-3 py-1 rounded-full text-xs border border-gray-700 font-medium text-gray-400">
                  grade {education.grade}
                </span>
                <span className="px-3 py-1 rounded-full text-xs border border-gray-700 font-medium text-gray-400">
                  {education.percentages}%
                </span>
              </div>
            </div>
          </h3>
          <div className="text-sm text-gray-400">
            {education.startDate} - {education.endDte}
          </div>
        </div>
        <div className="mt-4">
          <div>{education.university}</div>
          {education.collage}
        </div>
      </div>
    </motion.div>
  );
}
