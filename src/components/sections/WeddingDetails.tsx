"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin, UtensilsCrossed, Shirt, Navigation } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/data/wedding";

type Detail = { icon: LucideIcon; label: string; value: string; sub?: string };

export default function WeddingDetails() {
  const reduce = useReducedMotion();

  const details: Detail[] = [
    { icon: Calendar, label: "Wedding Date", value: wedding.weddingDate },
    { icon: Clock, label: "Muhurtham", value: wedding.weddingTime },
    {
      icon: MapPin,
      label: "Venue",
      value: wedding.venueName,
      sub: wedding.venueLines.join(", ")
    },
    { icon: UtensilsCrossed, label: "Reception", value: wedding.reception },
    { icon: Shirt, label: "Dress Code", value: wedding.dressCode }
  ];

  return (
    <section id="details" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Save the Date" title="Wedding Details" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.label} variant="fadeUp" delay={i * 0.08}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -6 }}
                  className="group flex h-full flex-col items-center rounded-3xl border border-white/60 bg-white/45 p-7 text-center shadow-soft backdrop-blur-xl transition-shadow duration-500 hover:shadow-glow"
                >
                  <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-champagneGold/40 bg-gold-gradient text-rosewood shadow-gold">
                    <motion.span
                      animate={reduce ? undefined : { y: [0, -3, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    >
                      <Icon size={24} />
                    </motion.span>
                  </span>
                  <p className="font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-roseGold">
                    {d.label}
                  </p>
                  <p className="mt-2 font-cormorant text-2xl font-medium text-rosewood">{d.value}</p>
                  {d.sub ? <p className="mt-1 font-poppins text-sm text-ink/60">{d.sub}</p> : null}
                </motion.article>
              </Reveal>
            );
          })}

          {/* Map CTA card */}
          <Reveal variant="fadeUp" delay={0.4}>
            <a
              href={wedding.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col items-center justify-center rounded-3xl border border-gold/40 bg-gold-gradient p-7 text-center text-rosewood shadow-gold transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl border border-rosewood/20 bg-ivory/70">
                <Navigation size={24} />
              </span>
              <p className="font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.26em]">
                Find Us
              </p>
              <p className="mt-2 font-cormorant text-2xl font-medium">Open in Google Maps</p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
