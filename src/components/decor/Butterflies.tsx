"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function Butterfly({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <g fill={color} opacity="0.85">
        <motion.path
          d="M32 32C26 16 8 12 6 24c-2 11 12 16 26 8Z"
          animate={{ scaleX: [1, 0.55, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "32px 32px" }}
        />
        <motion.path
          d="M32 32C38 16 56 12 58 24c2 11-12 16-26 8Z"
          animate={{ scaleX: [1, 0.55, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "32px 32px" }}
        />
      </g>
      <rect x="31" y="26" width="2" height="16" rx="1" fill="#5F3132" opacity="0.7" />
    </svg>
  );
}

type Flit = { id: number; top: number; size: number; duration: number; delay: number; color: string };

const COLORS = ["#B76E79", "#C9A24B", "#F4B8C3"];

/** A couple of butterflies that flit slowly across the section. */
export default function Butterflies({ count = 2 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [flits, setFlits] = useState<Flit[]>([]);

  useEffect(() => {
    if (reduce) return;
    setFlits(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 15 + Math.random() * 60,
        size: 26 + Math.random() * 16,
        duration: 18 + Math.random() * 12,
        delay: i * 6 + Math.random() * 4,
        color: COLORS[i % COLORS.length]
      }))
    );
  }, [count, reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flits.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ top: `${f.top}%`, width: f.size, height: f.size }}
          initial={{ left: "-8%", opacity: 0 }}
          animate={{
            left: ["-8%", "108%"],
            y: [0, -28, 18, -22, 0],
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Butterfly color={f.color} />
        </motion.div>
      ))}
    </div>
  );
}
