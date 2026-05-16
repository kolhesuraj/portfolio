import { SquareArrowOutUpRight } from "lucide-react";

// Experience card with tilt on hover
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
    <div className="group perspective border-b border-gray-300 dark:border-gray-800 py-4 mb-4 block">
      <div className="h-full flex flex-col ">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-lg">{experience.companyName}</h3>
            <a
              href={experience.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
              aria-label="Open company website">
              <SquareArrowOutUpRight size={16} />
            </a>
            <span className="text-sm text-gray-400">- {experience.role}</span>
          </div>
          <div className="text-sm text-gray-400">
            {experience.jointOn} - {experience.leftOn}
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          <ul className="list-disc list-inside pl-5 space-y-1">
            {experience.workDone.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
