"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Spark = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

/** Soft twinkling gold sparkles scattered within a section. */
export default function Sparkles({ count = 18 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (reduce) return;
    setSparks(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 3 + Math.random() * 6,
        delay: Math.random() * 4,
        duration: 2.4 + Math.random() * 3
      }))
    );
  }, [count, reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-gold"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 8px rgba(212,175,55,0.8)"
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.6, 1.2, 0.6] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
