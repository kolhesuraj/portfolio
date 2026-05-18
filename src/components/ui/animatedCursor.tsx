import { useEffect, useRef } from "react";

export default // Animated cursor (subtle) — small dot that follows the mouse
function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 8}px, ${
        e.clientY - 8
      }px, 0)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none fixed z-[1000] w-4 h-4 rounded-full 
        transition-transform duration-75 
        bg-cyan-500/70 border border-cyan-400/60 shadow-sm shadow-cyan-500/30
        dark:bg-cyan-400 dark:border-cyan-300 dark:shadow-[0_0_10px_rgba(6,182,212,0.7)] hidden md:block
      "
    />
  );
}
