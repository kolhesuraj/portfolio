import { GraduationCap } from "lucide-react";
import { education } from "../utils/constants";

export default function EducationCard({ education }: { education: education }) {
  return (
    <div className="rounded-xl p-5 border border-blue-300/60 dark:border-blue-500/25 bg-blue-50/40 dark:bg-blue-500/5 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
            <GraduationCap
              size={17}
              className="text-blue-500 dark:text-blue-400"
            />
          </div>
          <div>
            <h3 className="font-black text-xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
              {education.degree}
            </h3>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
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
      <div className="flex-1">
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
