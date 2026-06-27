"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import FloatingPetals from "@/components/decor/FloatingPetals";
import Sparkles from "@/components/decor/Sparkles";
import { wedding } from "@/data/wedding";

/**
 * Premium loading splash + music-consent gate. Animates the P ♡ A monogram,
 * then reveals the entry choices. Calls onEnter(withMusic) once the guest
 * chooses how to begin.
 */
export default function LoadingScreen({
  onEnter
}: {
  onEnter: (withMusic: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 2300);
    return () => clearTimeout(t);
  }, [reduce]);

  const letter = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.2 + i * 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-[110] grid place-items-center overflow-hidden bg-soft-cream px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(14px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <FloatingPetals count={12} />
      <Sparkles count={16} />

      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,251,244,0.7),transparent_55%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-7 font-cormorant text-lg tracking-[0.3em] text-roseGold sm:text-xl">
          OM GANESHAYA NAMAH
        </p>

        {/* Monogram P ♡ A */}
        <div className="flex items-center gap-3 sm:gap-5">
          <motion.span
            custom={0}
            variants={letter}
            initial="hidden"
            animate="visible"
            className="font-playfair text-7xl font-semibold text-rosewood sm:text-8xl"
          >
            P
          </motion.span>
          <motion.span
            custom={1}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-gold drop-shadow-[0_0_18px_rgba(212,175,55,0.5)]"
            >
              <Heart size={46} fill="currentColor" strokeWidth={1} />
            </motion.span>
          </motion.span>
          <motion.span
            custom={2}
            variants={letter}
            initial="hidden"
            animate="visible"
            className="font-playfair text-7xl font-semibold text-rosewood sm:text-8xl"
          >
            A
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-6 font-cormorant text-3xl text-roseGold sm:text-4xl"
        >
          {wedding.bride} <span className="text-champagneGold">&</span> {wedding.groom}
        </motion.p>

        {/* shimmer loading line until ready */}
        {!ready ? (
          <div className="mt-9 h-px w-44 overflow-hidden rounded-full bg-champagneGold/20">
            <motion.div
              className="h-full w-1/2 bg-gold-gradient"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <p className="mb-1 font-poppins text-[0.68rem] uppercase tracking-[0.3em] text-ink/60">
              You are invited
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onEnter(true)}
                className="min-h-[3.25rem] rounded-full border border-gold/60 bg-gold-gradient px-8 py-3 font-poppins text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-rosewood shadow-gold transition hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Open With Music
              </button>
              <button
                type="button"
                onClick={() => onEnter(false)}
                className="min-h-[3.25rem] rounded-full border border-roseGold/40 bg-ivory/70 px-8 py-3 font-poppins text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-rosewood backdrop-blur-md transition hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Enter Quietly
              </button>
            </div>
            <p className="mt-2 font-poppins text-[0.62rem] tracking-[0.16em] text-ink/45">
              Music begins only with your consent
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
