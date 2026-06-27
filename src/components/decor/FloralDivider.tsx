"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** An ornamental gold floral divider used between sections. */
export default function FloralDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn("mx-auto flex w-full max-w-md items-center justify-center gap-3 px-6", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-champagneGold/60" />
      <motion.svg
        viewBox="0 0 120 40"
        width="120"
        height="40"
        initial={reduce ? undefined : { opacity: 0, scale: 0.8 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0"
      >
        <g fill="none" stroke="#C9A24B" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 20c14-12 28-12 38 0M112 20c-14-12-28-12-38 0" />
          <path d="M48 20c4-6 8-6 12 0 4-6 8-6 12 0" />
        </g>
        <g fill="#B76E79">
          <circle cx="60" cy="20" r="3.4" />
          <circle cx="60" cy="13" r="2" opacity="0.8" />
          <circle cx="60" cy="27" r="2" opacity="0.8" />
        </g>
        <g fill="#C9A24B">
          <circle cx="10" cy="20" r="2" />
          <circle cx="112" cy="20" r="2" />
        </g>
      </motion.svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-champagneGold/60" />
    </div>
  );
}
