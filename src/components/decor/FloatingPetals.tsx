"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  hue: string;
};

const HUES = ["#F4B8C3", "#FBE1E6", "#E8D8B8", "#B76E79", "#F6D8C0"];

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path
        d="M12 2C8 6 4 9 4 14a8 8 0 0 0 16 0c0-5-4-8-8-12Z"
        fill={color}
        opacity="0.85"
      />
      <path d="M12 4c-2 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2-6-4-9Z" fill="#fff" opacity="0.18" />
    </svg>
  );
}

/** Slow-falling flower petals drifting across the viewport. */
export default function FloatingPetals({ count = 14 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (reduce) return;
    const next: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 20,
      delay: Math.random() * 12,
      duration: 12 + Math.random() * 12,
      drift: (Math.random() - 0.5) * 160,
      rotate: 180 + Math.random() * 360,
      hue: HUES[i % HUES.length]
    }));
    setPetals(next);
  }, [count, reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-10"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-6vh", "108vh"],
            x: [0, p.drift, 0],
            rotate: [0, p.rotate],
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <PetalShape color={p.hue} />
        </motion.div>
      ))}
    </div>
  );
}
