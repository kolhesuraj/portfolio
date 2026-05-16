import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun, FiMail, FiDownload, FiPhone } from "react-icons/fi";

import { calculateExperience } from "@/utils/date";

import AnimatedCursor from "@/components/ui/animatedCursor";
// import FloatingShapes from "@/components/ui/floating-shape";
import IconButton from "@/components/ui/icon-button";

import ExperienceCard from "./components/experience-card";
import ProjectCard from "./components/project-cards";

// ----------------- PLACEHOLDERS (fill later) -----------------
import {
  ABOUT,
  BIO,
  colorFullCardTheme,
  CONTACT,
  EDUCATION,
  EXPERIENCES,
  PROJECTS,
  RESUME_LINK,
  SKILLS,
  SOCIALS,
  START_OF_CAREER,
  TAGLINE,
  YOUR_NAME,
} from "./utils/constants";
import EducationCard from "./components/education-cards";

// ------------------------------------------------------------

export default function PortFolio() {
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("theme") || "true") ?? true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const calculatedExperience = calculateExperience(START_OF_CAREER, new Date());

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased">
      {/* <FloatingShapes /> */}
      <AnimatedCursor />

      <header className="mx-auto flex gap-x-2 items-center justify-between bg-gray-50/50 dark:bg-gray-800/20 border border-gray-150 dark:border-gray-800 px-3 py-2">
        <div className="flex items-center gap-4 bg-gray-100 border border-gray-150 dark:border-gray-800 dark:bg-gray-800 px-3 py-2 rounded-md shadow-sm">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {YOUR_NAME.split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="font-semibold">{YOUR_NAME}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {TAGLINE}
            </div>
          </div>
        </div>

        <div className="md:flex block items-center gap-3">
          <IconButton
            className="inline-flex items-center px-3 border border-gray-150 dark:border-gray-800 rounded-md shadow-sm"
            onClick={() => setDark((d: boolean) => !d)}
            ariaLabel="Toggle theme">
            <div>{dark ? <FiMoon /> : <FiSun />}</div>
          </IconButton>

          <a
            href={RESUME_LINK}
            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-150 dark:border-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition md:mt-0 mt-2"
            aria-label="Download resume">
            <FiDownload />{" "}
            <span className="text-sm md:block hidden">Resume</span>
          </a>
        </div>
      </header>

      <main className="mx-auto px-6 bg-gray-100/50 dark:bg-gray-800/20">
        {/* <Parallax> */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            className="md:col-span-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {YOUR_NAME}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-7xl whitespace-pre-line">
              {BIO}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  {<s.icon />} <span className="text-sm">{s.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 mt-3 border border-gray-150 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Contact
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:opacity-95 whitespace-nowrap">
                <FiMail /> <span>{CONTACT.email}</span>
              </a>

              <a
                href={`tel:${CONTACT.mobile}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary-600 border dark:border-gray-700 border-gray-300 dark:text-white rounded-md shadow-sm hover:opacity-95 whitespace-nowrap">
                <FiPhone /> <span>{CONTACT.mobile}</span>
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Quick stats
            </div>
            <div className="mt-2 flex gap-3">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">YOE</div>
                <div className="font-semibold">
                  {typeof calculatedExperience === "object" &&
                  calculatedExperience &&
                  "years" in calculatedExperience
                    ? `${calculatedExperience.years}.${calculatedExperience.months}+`
                    : "N/A"}
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Projects</div>
                <div className="font-semibold">{`${PROJECTS.length}+`}</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            A few highlights — click to view (replace links with live demos or
            repos).
          </p>

          <div className="mt-6 ms-8">
            {EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>

        <section className="mt-16 border-b border-gray-300 dark:border-gray-800 pb-10">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Some few latest projects
          </p>

          <div className="mt-6 ms-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={{ class: colorFullCardTheme[i], ...p }}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 border-b border-gray-300 dark:border-gray-800 pb-10">
          <h2 className="text-2xl font-semibold">Education</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"></p>

          <div className="mt-6 ms-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {EDUCATION.map((e) => (
              <EducationCard key={e.id} education={e} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{ABOUT}</p>

            <div className="mt-6">
              <h3 className="font-medium">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-2 px-3 py-2 border rounded-md border-gray-150 dark:border-gray-800 text-sm">
                    {s.logo ? (
                      <img
                        src={s.logo}
                        alt={`${s.name} logo`}
                        className="w-5 h-5 text-[#252f3e] dark:text-white transition-colors duration-300"
                      />
                    ) : (
                      <s.icon />
                    )}
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-100/30 dark:bg-gray-800 border border-gray-150 dark:border-gray-800 rounded-md p-6">
            <h3 className="font-medium">Contact & Availability</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              I’m available for freelance and full-time roles. Open to remote
              and on-site opportunities.
            </p>

            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm">
              <FiMail /> <span>Email me</span>
            </a>

            <div className="mt-5 text-xs text-gray-500">
              Or reach me on socials
            </div>
            <div className="mt-2 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  {<s.icon />}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-10 py-6 border-t border-gray-300 dark:border-gray-800 text-center text-sm text-gray-500 bg-secondary-100 dark:bg-secondary">
          Built with ❤️ • {YOUR_NAME} • {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
