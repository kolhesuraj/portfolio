import { motion } from "framer-motion";

// Floating decorative shapes
export default function FloatingShapes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 dark:-z-0 overflow-hidden">
      {/* ---------- LIGHT MODE SHAPES ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-10 top-20 w-56 h-56 rounded-full 
                   bg-gradient-to-tr from-blue-600 to-pink-600 
                   blur-3xl opacity-40 rotate-12 
                   dark:hidden"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-20 bottom-10 w-72 h-72 rounded-full 
                   bg-gradient-to-tr from-yellow-600 to-green-600 
                   blur-3xl opacity-35 -rotate-6 
                   dark:hidden"
      />

      {/* ---------- DARK MODE SHAPES ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-10 top-20 w-56 h-56 rounded-full 
                   bg-gradient-to-tr from-indigo-400/50 to-pink-400/50 
                   blur-3xl opacity-30 rotate-12 
                   hidden dark:block"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute right-20 bottom-10 w-72 h-72 rounded-full 
                   bg-gradient-to-tr from-green-300/50 to-blue-400/50 
                   blur-3xl opacity-25 -rotate-6 
                   hidden dark:block"
      />
    </div>
  );
}
