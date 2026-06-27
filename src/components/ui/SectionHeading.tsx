"use client";

import Reveal from "@/components/ui/Reveal";
import FloralDivider from "@/components/decor/FloralDivider";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  className,
  divider = true
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  divider?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <Reveal variant="fadeDown">
          <p className="mb-3 font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-roseGold">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal variant="fadeUp">
        <h2 className="font-playfair text-[2.6rem] font-semibold leading-[1.02] text-rosewood sm:text-6xl">
          {title}
        </h2>
      </Reveal>
      {divider ? <FloralDivider className="mt-6" /> : null}
    </div>
  );
}
