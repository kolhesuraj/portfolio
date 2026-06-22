import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  TIMELINE_COLORS,
  TL_DATE_COL,
  TL_LINE_X,
  TL_ROW_PAD,
} from "../utils/constants";

export default function TimelineRow({
  date,
  endDate,
  color,
  index,
  anchorId,
  hideDot = false,
  children,
}: {
  date: string;
  endDate?: string;
  color: keyof typeof TIMELINE_COLORS;
  index: number;
  anchorId?: string;
  hideDot?: boolean;
  children: ReactNode;
}) {
  const { dot, date: dateColor } = TIMELINE_COLORS[color];
  return (
    <motion.div
      id={anchorId}
      className={`relative ${TL_ROW_PAD} pb-10 last:pb-2 scroll-mt-24`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      {/* Date label on the line (single line, with optional range) */}
      <span
        className={`absolute ${TL_DATE_COL} top-[18px] text-right whitespace-nowrap text-[10px] sm:text-[11px] font-mono font-semibold ${dateColor}`}>
        {endDate ? `${date} – ${endDate}` : date}
      </span>
      {/* Glowing node on the line */}
      {!hideDot && (
        <span
          className={`absolute ${TL_LINE_X} top-6 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-[#020817] ${dot}`}
        />
      )}
      {children}
    </motion.div>
  );
}
