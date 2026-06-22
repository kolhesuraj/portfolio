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
    <div className="rounded-xl p-5 border border-cyan-300/60 dark:border-cyan-500/25 bg-cyan-50/40 dark:bg-cyan-500/5 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm transition-all duration-300 group">
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

          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 whitespace-nowrap shrink-0">
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
  );
}
