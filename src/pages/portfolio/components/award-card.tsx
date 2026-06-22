import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface AwardItem {
  name: string;
  issuer: string;
  year: string;
  description?: string;
  image?: string;
}

export default function AwardCard({
  award,
  index,
  onImageClick,
}: {
  award: AwardItem;
  index: number;
  onImageClick: (src: string) => void;
}) {
  const a = award;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex items-start gap-4 rounded-xl p-5 border border-amber-300/60 dark:border-amber-500/25 bg-amber-50/40 dark:bg-amber-500/5 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-500/10 backdrop-blur-sm transition-all duration-300">
      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
        <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
      </div>
      <div className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          Award
        </span>
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-snug">
          {a.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {a.issuer} · {a.year}
        </p>
        {a.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {a.description}
          </p>
        )}
        {a.image && (
          <button
            type="button"
            onClick={() => onImageClick(a.image!)}
            className="block mt-3 w-full cursor-zoom-in">
            <img
              src={a.image}
              alt={a.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="rounded-lg border border-amber-300/40 dark:border-amber-500/20 h-44 w-full object-contain bg-slate-50 dark:bg-white/5 hover:opacity-90 transition-opacity"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}
