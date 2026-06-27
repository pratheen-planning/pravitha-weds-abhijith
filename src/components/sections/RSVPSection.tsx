"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/data/wedding";

export default function RSVPSection() {
  const reduce = useReducedMotion();

  const cards = [
    {
      role: "Bride",
      name: wedding.bride,
      phone: wedding.rsvp.bride,
      href: wedding.rsvp.brideWhatsApp,
      side: "slideRight" as const
    },
    {
      role: "Groom",
      name: wedding.groom,
      phone: wedding.rsvp.groom,
      href: wedding.rsvp.groomWhatsApp,
      side: "slideLeft" as const
    }
  ];

  return (
    <section id="rsvp" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Bless Us With Your Presence" title="RSVP" />

        <Reveal variant="fadeUp" className="mx-auto mt-6 max-w-xl text-center">
          <p className="font-cormorant text-2xl text-ink/70">
            Share your blessings and let us know you&rsquo;ll be joining the celebration.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <Reveal key={card.role} variant={card.side}>
              <motion.a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                whileHover={reduce ? undefined : { y: -6 }}
                className="group flex h-full flex-col items-center rounded-3xl border border-champagneGold/30 bg-white/50 p-8 text-center shadow-soft backdrop-blur-xl transition-shadow duration-500 hover:shadow-glow"
              >
                <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#25D366]/15 text-[#1c8c46]">
                  <MessageCircle size={26} />
                </span>
                <p className="font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-roseGold">
                  {card.role}
                </p>
                <p className="mt-1 font-playfair text-2xl font-semibold text-rosewood">{card.name}</p>
                <p className="mt-2 inline-flex items-center gap-2 font-poppins text-sm text-ink/65">
                  <Phone size={14} /> {card.phone}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagneGold/40 bg-gold-gradient px-6 py-2.5 font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-rosewood transition group-hover:scale-[1.03]">
                  <MessageCircle size={15} /> WhatsApp
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
