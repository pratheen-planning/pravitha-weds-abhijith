"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "gold" | "outline";
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

/**
 * A magnetic button with a gold-shine sweep on hover. Magnetic pull is
 * disabled under prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  className,
  variant = "gold",
  ariaLabel,
  target,
  rel
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex min-h-[3.25rem] items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";
  const skin =
    variant === "gold"
      ? "border border-gold/60 bg-gold-gradient text-rosewood shadow-gold"
      : "border border-roseGold/40 bg-ivory/70 text-rosewood backdrop-blur-md";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {/* gold-shine sweep */}
      <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-rose-sheen transition-transform duration-700 ease-out group-hover:translate-x-full" />
    </>
  );

  const motionProps = {
    ref: ref as never,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.96 },
    className: cn(base, skin, className),
    "aria-label": ariaLabel
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
