import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import {
  FiMoon,
  FiSun,
  FiMail,
  FiDownload,
  FiPhone,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { calculateExperience } from "@/utils/date";

import ExperienceCard from "./components/experience-card";
import ProjectCard from "./components/project-cards";
import EducationCard from "./components/education-cards";
import CertificationCard from "./components/certification-card";
import AwardCard from "./components/award-card";

import {
  ABOUT,
  AWARDS,
  BIO,
  CERTIFICATIONS,
  CREDLY_URL,
  CONTACT,
  EDUCATION,
  EXPERIENCES,
  PROJECTS,
  RESUME_LINK,
  RESUME_DOWNLOAD,
  SKILLS,
  SOCIALS,
  START_OF_CAREER,
  YOUR_NAME,
  TL_LINE_X,
  TL_ROW_PAD,
  TL_DATE_COL,
  MONTHS,
  ROLES,
  NAV_LINKS,
  fadeUp,
} from "./utils/constants";
import TimelineRow from "./components/time-line";
import useTypewriter from "./utils/type-writer";
import Divider from "./components/diider";

const MONTH_ABBR = Object.values(MONTHS);

// "July 2022" -> "Jul-2022"; "Present" stays "Present"
function fmtMonthYear(value: string) {
  const parts = value.trim().split(/\s+/);
  if (parts.length < 2) return value;
  const [month, year] = parts;
  return `${MONTHS[month.toLowerCase()] ?? month.slice(0, 3)}-${year}`;
}

// Current month/year, e.g. "Jun-2026"
function todayMonthYear() {
  const now = new Date();
  return `${MONTH_ABBR[now.getMonth()]}-${now.getFullYear()}`;
}

// ─── Main ─────────────────────────────────────────────────────
export default function PortFolio() {
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("theme") || "true") ?? true;
    } catch {
      return true;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const roleText = useTypewriter(ROLES);
  const exp = calculateExperience(START_OF_CAREER, new Date());
  const yoe =
    exp && typeof exp === "object" && "years" in exp
      ? `${exp.years}.${exp.months}+`
      : "3+";

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the image lightbox on Escape; lock scroll while open
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="min-h-screen page-bg text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300">
      {/* ── Animated background – light mode ── */}
      <div className="fixed inset-0 pointer-events-none z-0 dark:hidden">
        <div className="absolute inset-0 cyber-grid-light" />
        <div className="absolute top-[10%] left-[5%]   w-[600px] h-[600px] bg-cyan-300/30    rounded-full blur-[150px] animate-float" />
        <div className="absolute top-[50%] right-[3%]  w-[500px] h-[500px] bg-violet-300/25  rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-[5%] left-[35%] w-[450px] h-[450px] bg-emerald-300/20 rounded-full blur-[120px] animate-float-slower" />
      </div>

      {/* ── Animated background – dark mode ── */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
        <div className="absolute inset-0 cyber-grid" />
        <div className="absolute top-[12%] left-[8%]  w-[520px] h-[520px] bg-cyan-500/5   rounded-full blur-[130px] animate-float" />
        <div className="absolute top-[55%] right-[4%] w-[420px] h-[420px] bg-violet-500/5  rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[8%] left-[38%] w-[320px] h-[320px] bg-emerald-500/4 rounded-full blur-[100px] animate-float-slower" />
      </div>

      {/* ── Sticky nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#020817]/90 backdrop-blur-md shadow-sm"
            : "border-transparent bg-transparent"
        }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-cyan-500/20">
              {YOUR_NAME.split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <span className="font-bold text-sm tracking-wider hidden sm:block text-slate-800 dark:text-slate-200">
              {YOUR_NAME}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d: boolean) => !d)}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-cyan-500/50 transition-all text-slate-500 dark:text-slate-400 hover:text-cyan-500"
              aria-label="Toggle theme">
              {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
            <a
              href={RESUME_DOWNLOAD}
              download
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-600 dark:text-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              aria-label="Download resume">
              <FiDownload size={13} /> Resume
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400"
              aria-label="Open menu">
              {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-white/8 bg-white/95 dark:bg-[#020817]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_DOWNLOAD}
              download
              className="inline-flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-medium"
              aria-label="Download resume">
              <FiDownload size={14} /> Download Resume
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* ════════ HERO ════════ */}
        <section
          id="hero"
          className="min-h-screen flex items-center pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-7 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for opportunities
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-5">
                <span className="text-gradient">{YOUR_NAME}</span>
              </h1>

              <div className="flex items-center gap-2 font-mono text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-6 h-8">
                <span className="text-cyan-500 select-none">$</span>
                <span>{roleText}</span>
                <span className="animate-blink text-cyan-500 dark:text-cyan-400 font-bold">
                  ▋
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl text-sm md:text-base mb-8">
                {BIO}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
                  <FiMail size={15} /> Get in Touch
                </a>
                <a
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:-translate-y-0.5">
                  <FiDownload size={15} /> View CV
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-cyan-500/50 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/10"
                    aria-label={s.name}>
                    <s.icon className="w-[15px] h-[15px]" />
                    <span className="text-xs font-medium">{s.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right – stats card */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 shadow-xl dark:shadow-none backdrop-blur-sm dark:glow-cyan">
                {/* Stat cells */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl p-4 border border-cyan-100 dark:border-white/8 bg-gradient-to-br from-cyan-50/80 to-sky-50/60 dark:from-transparent dark:to-transparent dark:bg-slate-800/60">
                    <div className="text-3xl font-black text-gradient">
                      {yoe}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-tight">
                      Years Experience
                    </div>
                  </div>
                  <div className="rounded-xl p-4 border border-violet-100 dark:border-white/8 bg-gradient-to-br from-violet-50/80 to-purple-50/60 dark:from-transparent dark:to-transparent dark:bg-slate-800/60">
                    <div className="text-3xl font-black text-gradient">
                      {PROJECTS.length}+
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-tight">
                      Projects Shipped
                    </div>
                  </div>
                </div>

                {/* Contact rows */}
                <div className="border-t border-slate-100 dark:border-white/8 pt-4 space-y-2.5">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors shrink-0">
                      <FiMail size={13} className="text-cyan-500" />
                    </div>
                    <span className="truncate text-xs">{CONTACT.email}</span>
                  </a>
                  <a
                    href={`mailto:${CONTACT.email2}`}
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors shrink-0">
                      <FiMail size={13} className="text-cyan-500" />
                    </div>
                    <span className="truncate text-xs">{CONTACT.email2}</span>
                  </a>
                  <a
                    href={`tel:${CONTACT.mobile}`}
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group">
                    <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 group-hover:border-violet-500/50 transition-colors shrink-0">
                      <FiPhone size={13} className="text-violet-500" />
                    </div>
                    <span className="text-xs">{CONTACT.mobile}</span>
                  </a>
                </div>

                {/* Socials */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/8">
                  <div className="flex flex-wrap gap-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-sky-50/60 dark:bg-slate-800/50 hover:border-cyan-500/50 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all text-xs font-medium"
                        aria-label={s.name}>
                        <s.icon className="w-[13px] h-[13px]" />
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider color="cyan" />

        {/* ════════ EXPERIENCE & EDUCATION ════════ */}
        <section id="experience" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative">
              {/* Continuous timeline line (cyan → blue) */}
              <div
                className={`absolute ${TL_LINE_X} top-3 bottom-2 w-px bg-gradient-to-b from-cyan-500/60 via-blue-500/40 to-blue-500/10`}
              />

              {/* Today marker at the top of the line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`relative ${TL_ROW_PAD} pb-8`}>
                <span
                  className={`absolute ${TL_DATE_COL} top-0 text-right whitespace-nowrap text-[10px] sm:text-[11px] font-mono font-semibold text-cyan-600 dark:text-cyan-400`}>
                  {todayMonthYear()}
                </span>
                <span
                  className={`absolute ${TL_LINE_X} top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/25 animate-pulse`}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                  Present
                </span>
              </motion.div>

              {/* Experience heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`${TL_ROW_PAD} pb-7 scroll-mt-24`}>
                <h3 className="text-2xl md:text-3xl font-black text-gradient">
                  Experience
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Professional journey and key contributions.
                </p>
              </motion.div>

              {EXPERIENCES.map((exp, i) => (
                <TimelineRow
                  key={`exp-${exp.id}`}
                  date={fmtMonthYear(exp.jointOn)}
                  endDate="Present"
                  color="cyan"
                  index={i}>
                  <ExperienceCard experience={exp} />
                </TimelineRow>
              ))}

              {/* Education heading (blue, matching the education cards) */}
              <motion.div
                id="education"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`${TL_ROW_PAD} pt-2 pb-7 scroll-mt-24`}>
                <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Education
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Academic foundations.
                </p>
              </motion.div>

              {EDUCATION.map((e, i) => (
                <TimelineRow
                  key={`edu-${e.id}-${i}`}
                  date={fmtMonthYear(e.startDate)}
                  endDate={fmtMonthYear(e.endDte)}
                  color="blue"
                  index={i}>
                  <EducationCard education={e} />
                </TimelineRow>
              ))}
            </div>
          </div>
        </section>

        <Divider color="violet" />

        {/* ════════ PROJECTS ════════ */}
        <section id="projects" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gradient-alt mb-2">
                Projects
              </h2>
              <p className="text-slate-500 text-sm">
                Highlights of what I've designed and shipped.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        <Divider color="emerald" />

        {/* ════════ SKILLS ════════ */}
        <section id="skills" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gradient-emerald mb-2">
                Skills
              </h2>
              <p className="text-slate-500 text-sm">
                Technologies I work with regularly.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {SKILLS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}>
                  <div
                    className="skill-pill text-slate-700 dark:text-slate-300"
                    style={
                      {
                        "--s-b": s.color + "35",
                        "--s-bd": s.color + "28",
                        "--s-bh": s.color + "99",
                        "--s-g": s.color + "30",
                      } as React.CSSProperties
                    }>
                    <s.icon
                      className="w-[15px] h-[15px]"
                      style={{ color: s.color }}
                    />
                    <span>{s.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-16">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl text-sm md:text-base">
                {ABOUT}
              </p>
            </motion.div>
          </div>
        </section>

        <Divider color="cyan" />

        {/* ════════ CERTIFICATIONS & AWARDS ════════ */}
        <section id="achievements" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent mb-2">
                Certifications &amp; Awards
              </h2>
              <p className="text-slate-500 text-sm">
                Credentials earned and recognition received.
              </p>
              <a
                href={CREDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:border-amber-500/60 transition-all">
                <BadgeCheck size={14} /> View verified badges on Credly
                <ExternalLink size={12} />
              </a>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((c, i) => (
                <CertificationCard
                  key={`cert-${c.name}`}
                  certification={c}
                  index={i}
                  onImageClick={setLightbox}
                />
              ))}

              {AWARDS.map((a, i) => (
                <AwardCard
                  key={`award-${a.name}`}
                  award={a}
                  index={CERTIFICATIONS.length + i}
                  onImageClick={setLightbox}
                />
              ))}
            </div>
          </div>
        </section>

        <Divider color="violet" />

        {/* ════════ CONTACT ════════ */}
        <section id="contact" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-gradient mb-5">
                Get in Touch
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
                Open to full-time roles, freelance projects, and interesting
                collaborations. If you have something in mind — reach out, I'd
                love to chat.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
                  <FiMail size={16} /> Gmail
                </a>
                <a
                  href={`mailto:${CONTACT.email2}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 hover:border-cyan-500/70 text-cyan-700 dark:text-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5">
                  <FiMail size={16} /> Zoho Mail
                </a>
                <a
                  href={`tel:${CONTACT.mobile}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:border-violet-500/50 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-all hover:-translate-y-0.5">
                  <FiPhone size={16} /> Call Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer className="py-8 border-t border-slate-200 dark:border-white/8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()}&nbsp;{YOUR_NAME}. Built with React +
              Vite + TypeScript.
            </div>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                  aria-label={s.name}>
                  <s.icon className="w-[15px] h-[15px]" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Image lightbox modal */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <FiX size={20} />
          </button>
          <motion.img
            key={lightbox}
            src={lightbox}
            alt="Preview"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[88vh] rounded-lg shadow-2xl object-contain cursor-default"
          />
        </motion.div>
      )}
    </div>
  );
}
