"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { wedding } from "@/data/wedding";

type Person = { name: string; role: string; photo: string; note: string };

function CoupleCard({ person, side }: { person: Person; side: "left" | "right" }) {
  return (
    <Reveal variant={side === "left" ? "slideRight" : "slideLeft"} className="w-full">
      <TiltCard className="group relative">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-champagneGold/30 bg-pearl p-3 shadow-soft transition-shadow duration-500 group-hover:shadow-glow">
          {/* animated gold border glow */}
          <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:0_0_0_1px_rgba(212,175,55,0.6),0_24px_70px_rgba(201,162,75,0.28)]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="(max-width: 768px) 90vw, 38vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rosewood/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-center">
              <p className="font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-ivory/80">
                {person.role}
              </p>
              <h3 className="mt-1 font-playfair text-3xl font-semibold text-ivory sm:text-4xl">
                {person.name}
              </h3>
            </div>
          </div>
          <p className="px-3 py-5 text-center font-cormorant text-xl text-ink/75">
            {person.note}
          </p>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function CoupleSection() {
  return (
    <section id="couple" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Meet the Couple" title="Two Hearts, One Soul" />

        <div className="relative mt-14 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <CoupleCard person={wedding.couple.bride} side="left" />

          <Reveal variant="scaleReveal" className="mx-auto hidden md:block">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-pearl text-gold shadow-gold">
              <Heart size={26} fill="currentColor" strokeWidth={1} />
            </span>
          </Reveal>

          <CoupleCard person={wedding.couple.groom} side="right" />
        </div>
      </div>
    </section>
  );
}
