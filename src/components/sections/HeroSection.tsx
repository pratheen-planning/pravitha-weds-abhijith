"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import FloatingPetals from "@/components/decor/FloatingPetals";
import Sparkles from "@/components/decor/Sparkles";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToId } from "@/lib/useLenis";
import { wedding } from "@/data/wedding";
import { EASE } from "@/lib/motion";

export default function HeroSection({ entered }: { entered: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-24%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Drive entrance from `entered` so animations begin after the gate opens.
  const show = entered;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Mobile / tablet: full-bleed couple photo behind the text (kept fully
          visible with object-contain). Hidden on desktop, where a framed
          portrait is used instead. */}
      <motion.div className="absolute inset-0 lg:hidden" style={{ y: imgY, scale: imgScale }}>
        <motion.div
          className="absolute inset-0"
          animate={reduce || !show ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero-photo.jpg"
            alt={`${wedding.bride} and ${wedding.groom}`}
            fill
            priority
            sizes="100vw"
            className="object-contain object-center"
          />
        </motion.div>
      </motion.div>

      {/* legibility washes (only behind the mobile full-bleed photo) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/10 to-ivory/95 lg:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_30%,rgba(250,246,238,0.5))] lg:hidden" />

      <FloatingPetals count={14} />
      <Sparkles count={14} />

      {/* bokeh glows */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-blush/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[12%] top-[42%] h-52 w-52 rounded-full bg-champagne/30 blur-3xl" />

      {/* Content: centered overlay on mobile, split layout on desktop. */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-0 lg:pb-0">
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1, ease: EASE }}
            className="mb-5 font-poppins text-[0.7rem] font-medium uppercase tracking-[0.4em] text-roseGold"
          >
            Together with our families
          </motion.p>

          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
              animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: EASE }}
              className="font-playfair text-[3.2rem] font-semibold leading-[0.95] text-rosewood sm:text-7xl lg:text-6xl xl:text-7xl"
            >
              {wedding.bride}
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={show ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
              className="my-2 font-cormorant text-4xl text-gold sm:my-3 sm:text-5xl"
            >
              ♡
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
              animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.6, duration: 1.2, ease: EASE }}
              className="font-playfair text-[3.2rem] font-semibold leading-[0.95] text-rosewood sm:text-7xl lg:text-6xl xl:text-7xl"
            >
              {wedding.groom}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 1, ease: EASE }}
            className="mt-7 max-w-md font-cormorant text-xl leading-relaxed text-ink/75 sm:text-2xl"
          >
            we joyfully invite you to celebrate our wedding
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.25, duration: 1, ease: EASE }}
            className="mt-3 font-poppins text-sm font-medium uppercase tracking-[0.28em] text-champagneGold"
          >
            {wedding.weddingDate}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.45, duration: 1, ease: EASE }}
            className="mt-9"
          >
            <MagneticButton onClick={() => scrollToId("story")} ariaLabel="Open the invitation">
              Open Invitation
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Desktop framed portrait — the tall image shown in full, faces intact. */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.92, clipPath: "inset(6% 6% 6% 6% round 2rem)" }}
          animate={
            show
              ? { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }
              : {}
          }
          transition={{ delay: 0.5, duration: 1.3, ease: EASE }}
          style={{ y: copyY }}
        >
          <motion.div
            animate={reduce || !show ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-champagneGold/40 shadow-glow"
          >
            <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
              <Image
                src="/images/hero-photo.jpg"
                alt={`${wedding.bride} and ${wedding.groom}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[center_18%]"
              />
            </motion.div>
            {/* soft inner framing */}
            <span className="pointer-events-none absolute inset-0 rounded-[2rem] [box-shadow:inset_0_0_0_1px_rgba(255,251,244,0.5),inset_0_-60px_80px_-30px_rgba(95,49,50,0.35)]" />
            <span className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-ivory/30" />
          </motion.div>

          {/* decorative gold accents around the frame */}
          <span className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full bg-champagne/40 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-blush/40 blur-2xl" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId("story")}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-rosewood/60"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.button>
    </section>
  );
}
