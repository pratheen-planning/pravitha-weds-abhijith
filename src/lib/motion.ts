import type { Variants, Transition } from "framer-motion";

// Shared cinematic easing used across the whole experience.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const baseTransition: Transition = { duration: 0.9, ease: EASE };

/**
 * Variants are intentionally transition-less so the consuming component owns
 * timing (duration + delay). This lets `Reveal` apply per-instance delays for
 * staggering without variant transitions silently overriding them.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" }
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(18px)", scale: 1.04 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1 }
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: { opacity: 1, scale: 1 }
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: { opacity: 1, clipPath: "inset(0 0 0% 0)" }
};

export const zoomReveal: Variants = {
  hidden: { opacity: 0, scale: 1.18 },
  visible: { opacity: 1, scale: 1 }
};

export const variantMap = {
  fadeUp,
  fadeDown,
  fadeIn,
  slideLeft,
  slideRight,
  blurReveal,
  scaleReveal,
  clipReveal,
  zoomReveal
} as const;

export type VariantName = keyof typeof variantMap;

// Per-variant default durations (seconds).
export const variantDuration: Record<VariantName, number> = {
  fadeUp: 0.9,
  fadeDown: 0.9,
  fadeIn: 1.1,
  slideLeft: 0.9,
  slideRight: 0.9,
  blurReveal: 1.2,
  scaleReveal: 0.9,
  clipReveal: 1.1,
  zoomReveal: 1.3
};

// Container that staggers its children (used with Reveal children or motion items).
export const staggerContainer = (stagger = 0.12, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren }
  }
});
