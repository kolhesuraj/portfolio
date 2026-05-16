import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Parallax wrapper: moves children slightly based on mouse position
export default function Parallax({
  strength = 8,
  children,
}: {
  strength?: number;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 80 }}>
      {children}
    </motion.div>
  );
}
