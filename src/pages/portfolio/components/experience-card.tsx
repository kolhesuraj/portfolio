import { SquareArrowOutUpRight } from "lucide-react";

interface Experience {
  id: number;
  companyName: string;
  icon: string;
  logo: string;
  companyWebsite: string;
  jointOn: string;
  leftOn: string;
  role: string;
  workDone: string[];
}

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="relative pb-10 last:pb-2">
      {/* Glowing timeline node */}
      <div className="absolute left-[-36px] top-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white dark:border-[#020817] shadow-[0_0_0_3px_rgba(6,182,212,0.2),0_0_16px_rgba(6,182,212,0.45)]" />

      {/* Card */}
      <div className="rounded-xl p-5 border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm transition-all duration-300 group">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                {experience.companyName}
              </h3>
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 hover:text-cyan-400 transition-colors opacity-50 group-hover:opacity-100"
                aria-label="Open company website"
              >
                <SquareArrowOutUpRight size={13} />
              </a>
            </div>
            <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
              {experience.role}
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 whitespace-nowrap shrink-0">
            {experience.jointOn} — {experience.leftOn}
          </div>
        </div>

        {/* Work done list */}
        <ul className="space-y-2.5">
          {experience.workDone.map((desc, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <span className="text-cyan-500/70 mt-[3px] shrink-0 text-xs">▸</span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
