"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Sparkles from "@/components/decor/Sparkles";
import { wedding } from "@/data/wedding";

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function getCountdown(): Countdown {
  const target = new Date(wedding.countdownTarget).getTime();
  const distance = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

function Unit({
  value,
  label,
  fraction
}: {
  value: number;
  label: string;
  fraction: number;
}) {
  const reduce = useReducedMotion();
  const size = 132;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const display = String(value).padStart(2, "0");

  return (
    <div className="relative grid h-[132px] w-[132px] place-items-center rounded-full border border-champagneGold/25 bg-white/45 shadow-soft backdrop-blur-xl sm:h-[150px] sm:w-[150px]">
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(201,162,75,0.15)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#countGold)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: circ - circ * fraction }}
          transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="countGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8D8B8" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B76E79" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col items-center">
        <div className="relative h-[3.2rem] w-[4.4rem] overflow-hidden sm:h-[3.8rem]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={reduce ? false : { y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid place-items-center font-playfair text-5xl font-semibold text-rosewood sm:text-6xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mt-1 font-poppins text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-roseGold">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function CountdownTimer() {
  const [c, setC] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setC(getCountdown());
    const t = setInterval(() => setC(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  const units = [
    { label: "Days", value: c.days, fraction: Math.min(c.days, 365) / 365 },
    { label: "Hours", value: c.hours, fraction: c.hours / 24 },
    { label: "Minutes", value: c.minutes, fraction: c.minutes / 60 },
    { label: "Seconds", value: c.seconds, fraction: c.seconds / 60 }
  ];

  return (
    <section id="countdown" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <Sparkles count={16} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading eyebrow={`Until ${wedding.weddingTime.split(" ")[0]} AM`} title="Counting the Moments" />
        <Reveal variant="scaleReveal" className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {units.map((u) => (
              <Unit key={u.label} value={u.value} label={u.label} fraction={u.fraction} />
            ))}
          </div>
        </Reveal>
        <Reveal variant="fadeUp" className="mt-10 text-center">
          <p className="font-cormorant text-2xl text-ink/70">
            until we say <span className="text-roseGold">&ldquo;forever&rdquo;</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
