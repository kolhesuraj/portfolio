import { GraduationCap } from "lucide-react";
import { education } from "../utils/constants";

export default function EducationCard({ education }: { education: education }) {
  return (
    <div className="rounded-xl p-5 border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shrink-0">
            <GraduationCap size={17} className="text-violet-500 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-black text-xl text-gradient-alt leading-tight">
              {education.degree}
            </h3>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
              {education.startDate} — {education.endDte}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 items-end shrink-0">
          <span className="px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            Grade {education.grade}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
            {education.percentages}%
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="border-t border-slate-100 dark:border-white/6 pt-4 space-y-1.5 flex-1">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {education.university}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
          {education.collage}
        </div>
      </div>
    </div>
  );
}
