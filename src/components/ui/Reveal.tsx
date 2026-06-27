"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE, variantMap, variantDuration, type VariantName } from "@/lib/motion";

type RevealProps = {
  variant?: VariantName;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span" | "h2" | "p";
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "transition">;

/**
 * Scroll-triggered reveal wrapper. Picks a shared variant and gates motion
 * behind prefers-reduced-motion (renders content immediately, no transform).
 */
export default function Reveal({
  variant = "fadeUp",
  delay = 0,
  duration,
  amount = 0.3,
  once = true,
  as = "div",
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag {...rest}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration: duration ?? variantDuration[variant], delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
