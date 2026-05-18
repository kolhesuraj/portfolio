import { useEffect } from "react";
import { useRouter } from "@/routes/hooks";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    try {
      const dark = JSON.parse(localStorage.getItem("theme") || "true") ?? true;
      if (dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen page-bg text-slate-900 dark:text-slate-100 flex items-center justify-center text-center px-6 overflow-hidden">

      {/* Light mode background */}
      <div className="fixed inset-0 pointer-events-none z-0 dark:hidden">
        <div className="absolute inset-0 cyber-grid-light" />
        <div className="absolute top-[10%] left-[5%]   w-[500px] h-[500px] bg-cyan-300/30   rounded-full blur-[150px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-violet-300/25 rounded-full blur-[140px]" />
      </div>

      {/* Dark mode background */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
        <div className="absolute inset-0 cyber-grid opacity-75" />
        <div className="absolute top-[10%] left-[5%]   w-[500px] h-[500px] bg-cyan-500/5   rounded-full blur-[130px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="text-[9rem] font-black leading-none text-gradient">
          404
        </div>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mt-2 mb-3">
          Page not found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5"
          >
            Go back
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:-translate-y-0.5"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
