import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  logo: string;
  image?: string;
}

export default function CertificationCard({
  certification,
  index,
  onImageClick,
}: {
  certification: Certification;
  index: number;
  onImageClick: (src: string) => void;
}) {
  const c = certification;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex items-start gap-4 rounded-xl p-5 border border-cyan-300/60 dark:border-cyan-500/25 bg-cyan-50/40 dark:bg-cyan-500/5 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm transition-all duration-300">
      <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shrink-0">
        <c.icon className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
      </div>
      <div className="min-w-0">
        <div className="inline-flex items-center gap-1.5 mb-1">
          <BadgeCheck size={13} className="text-cyan-500 shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Certification
          </span>
        </div>
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-snug">
          {c.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {c.issuer} · {c.year}
        </p>
        {c.image && (
          <button
            type="button"
            onClick={() => onImageClick(c.image!)}
            className="block mt-3 w-full cursor-zoom-in">
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="rounded-lg border border-cyan-300/40 dark:border-cyan-500/20 h-44 w-full object-contain bg-slate-50 dark:bg-white/5 hover:opacity-90 transition-opacity"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}
