"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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

function Section({
  id,
  eyebrow,
  title,
  children,
  className
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-shell", className)}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
      >
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}

function WatercolorFlorals({ className }: { className?: string }) {
  return (
    <div className={cn("watercolor-florals", className)} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function WeddingInvitation() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [blessings, setBlessings] = useState(() =>
    wedding.blessingOptions.map((label, index) => ({
      label,
      count: [108, 92, 87, 76, 64][index]
    }))
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const countdownItems = useMemo(
    () => [
      { label: "Days", value: countdown.days },
      { label: "Hours", value: countdown.hours },
      { label: "Minutes", value: countdown.minutes },
      { label: "Seconds", value: countdown.seconds }
    ],
    [countdown]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.volume = 0.44;
      audio.play().catch(() => setMusicOn(false));
    } else {
      audio.pause();
    }
  }, [musicOn]);

  useEffect(() => {
    document.body.style.overflow = !isOpen || invitationOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, invitationOpen]);

  function openInvitation(playMusic: boolean) {
    setIsOpen(true);
    setMusicOn(playMusic);
  }

  function addBlessing(index: number) {
    setBlessings((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-ivory text-ink">
      <audio ref={audioRef} src="/audio/wedding-theme.mp3" loop preload="metadata" />

      <AnimatePresence>
        {!isOpen ? (
          <motion.section
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-ivory px-5 text-center text-ink"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.035, filter: "blur(12px)" }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { scale: [1.03, 1.1] }}
              transition={{ duration: 16, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            >
              <Image
                src="/images/hero-photo.jpg"
                alt="Pravitha P V and Abhijith Roy"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/20 via-ivory/42 to-rosewood/78" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,249,241,0.65),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(244,184,195,0.35),transparent_32%)]" />
            <WatercolorFlorals className="left-[-4rem] top-[-2rem] opacity-60" />
            <WatercolorFlorals className="bottom-[-3rem] right-[-4rem] rotate-180 opacity-55" />

            <motion.div
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="intro-copy relative z-10 mx-auto max-w-2xl"
            >
              <p className="mb-6 font-display text-2xl tracking-[0.18em] text-rosewood">
                Om Ganeshaya Namah
              </p>
              <h1 className="font-display text-5xl font-semibold leading-none text-rosewood sm:text-7xl">
                Pravitha P V
                <span className="block py-2 text-3xl text-roseGold sm:text-5xl">&</span>
                Abhijith Roy
              </h1>
              <p className="mx-auto mt-6 max-w-sm text-xs font-bold uppercase tracking-[0.34em] text-ink/70">
                Tap to Open Invitation
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openInvitation(true)}
                  className="primary-button"
                  aria-label="Tap to open invitation with music"
                >
                  Open With Music
                </button>
                <button
                  type="button"
                  onClick={() => openInvitation(false)}
                  className="secondary-button"
                >
                  Open Quietly
                </button>
              </div>
              <p className="mt-5 text-xs tracking-[0.18em] text-ivory/90">
                Music begins only with your consent
              </p>
            </motion.div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {isOpen ? (
        <button
          type="button"
          onClick={() => setMusicOn((value) => !value)}
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-champagneGold/60 bg-rosewood text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ivory shadow-glow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-champagneGold"
          aria-label={musicOn ? "Pause background music" : "Play background music"}
        >
          {musicOn ? "On" : "Off"}
        </button>
      ) : null}

      <section className="hero-film relative min-h-screen overflow-hidden bg-ivory text-rosewood">
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { scale: [1, 1.085] }}
          transition={{ duration: 20, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/hero-photo.jpg"
            alt="Pravitha P V and Abhijith Roy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/5 via-ivory/20 to-ivory/95" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,249,241,0.75),transparent_45%,rgba(95,49,50,0.05))]" />
        <div className="film-grain" aria-hidden="true" />
        <WatercolorFlorals className="right-[-5rem] top-[-2rem] z-10 opacity-60" />

        <div className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-28 sm:px-10 lg:items-center lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 38, filter: "blur(12px)" }}
            animate={isOpen ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-roseGold">
              A Wedding Film Invitation
            </p>
            <h1 className="hero-title font-display font-semibold leading-none text-rosewood">
              Pravitha P V
              <span className="block py-2 text-champagneGold">&</span>
              Abhijith Roy
            </h1>
            <p className="mt-6 max-w-md font-display text-3xl text-roseGold sm:text-4xl">
              {wedding.weddingDate}
            </p>
            <p className="mt-4 max-w-md text-base leading-8 text-ink/72">
              A blush-toned celebration of love, family, and the beautiful beginning of forever.
            </p>
          </motion.div>
        </div>
      </section>

      <Section title="The Sacred Countdown" eyebrow="Until 11:47 AM">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {countdownItems.map(({ label, value }) => (
            <motion.div
              key={label}
              layout
              className="countdown-card"
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <span className="font-display text-5xl font-semibold text-rosewood">
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.28em] text-ink/50">{label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Wedding Details" eyebrow="Save the Date" className="bg-blushSoft/35">
        <div className="details-grid">
          <article>
            <span>Date</span>
            <strong>{wedding.weddingDate}</strong>
          </article>
          <article>
            <span>Muhurtham</span>
            <strong>{wedding.weddingTime}</strong>
          </article>
          <article>
            <span>Venue</span>
            <strong>{wedding.venueName}</strong>
            <p>{wedding.venueLines.join(", ")}</p>
          </article>
        </div>
      </Section>

      <Section title="Our Story" eyebrow="Two Paths, One Promise">
        <div className="story-cinema">
          <motion.div
            className="story-photo"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/story-photo.jpg"
              alt="Portrait of Pravitha P V and Abhijith Roy"
              fill
              sizes="(max-width: 900px) 90vw, 42vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="story-panel">
            {wedding.story.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </Section>

      <Section title="The Proposal" eyebrow="22 June 2021" className="proposal-section">
        <div className="proposal-film">
          <Image
            src="/images/proposal-photo.jpg"
            alt="A cinematic proposal moment of Pravitha P V and Abhijith Roy"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="proposal-overlay" />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="proposal-copy"
          >
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-champagneGold">
              A New Chapter
            </p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-none text-ivory sm:text-6xl">
              A heartfelt yes to forever.
            </h3>
            <p className="mt-5 max-w-lg text-base leading-8 text-ivory/82">
              On 22 June 2021, love moved from a beautiful friendship into a promise that
              would carry them toward this wedding day.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section title="Timeline" eyebrow="Milestones">
        <div className="timeline-cinema">
          <div className="timeline-photo">
            <Image
              src="/images/proposal-photo.jpg"
              alt="Proposal photo used as the timeline visual"
              fill
              sizes="(max-width: 900px) 90vw, 35vw"
              className="object-cover object-center"
            />
          </div>
          <div className="timeline">
            {wedding.timeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -22 : 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn("timeline-item", item.title === "Proposal" && "timeline-item-featured")}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section title="The Invitation" eyebrow="With Blessings">
        <motion.button
          type="button"
          onClick={() => setInvitationOpen(true)}
          className="invitation-frame"
          whileHover={{ y: -8, rotate: -0.4 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Open invitation card preview"
        >
          <Image
            src="/images/invitation-card.jpg"
            alt="Wedding invitation card for Pravitha P V and Abhijith Roy"
            width={508}
            height={715}
            className="h-auto w-full"
            sizes="(max-width: 640px) 88vw, 420px"
          />
        </motion.button>
        <p className="mt-5 text-center text-sm uppercase tracking-[0.24em] text-ink/45">
          Tap to enlarge
        </p>
      </Section>

      <Section id="venue" title="Venue" eyebrow="Join Us Here" className="venue-section">
        <div className="venue-panel">
          <p className="font-display text-4xl text-rosewood">{wedding.venueName}</p>
          <p className="mt-4 text-lg leading-8 text-ink/70">
            Mundankavu, Kallissery
            <br />
            Chengannur, Kerala
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a className="primary-button text-center" href={wedding.mapUrl} target="_blank" rel="noreferrer">
              View Location
            </a>
            <a className="secondary-button text-center" href={wedding.mapUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </Section>

      <Section title="RSVP" eyebrow="Bless Us With Your Presence">
        <div className="grid gap-4 sm:grid-cols-2">
          <a className="rsvp-card" href={wedding.rsvp.brideWhatsApp} target="_blank" rel="noreferrer">
            <span>Bride</span>
            <strong>{wedding.rsvp.bride}</strong>
            <em>WhatsApp Bride</em>
          </a>
          <a className="rsvp-card" href={wedding.rsvp.groomWhatsApp} target="_blank" rel="noreferrer">
            <span>Groom</span>
            <strong>{wedding.rsvp.groom}</strong>
            <em>WhatsApp Groom</em>
          </a>
        </div>
      </Section>

      <Section title="Guest Blessings" eyebrow="One Tap Wishes" className="bg-blushSoft/35">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {blessings.map((item, index) => (
            <motion.button
              key={item.label}
              type="button"
              onClick={() => addBlessing(index)}
              className="blessing-button"
              whileTap={{ scale: 0.96 }}
            >
              <span>{item.label}</span>
              <motion.strong
                key={item.count}
                initial={{ scale: 0.72, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                {item.count}
              </motion.strong>
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Wedding Memories" eyebrow="Coming Soon">
        <div className="memories-panel">
          <WatercolorFlorals className="left-[-3rem] top-[-3rem] opacity-30" />
          <p>Wedding Memories Coming Soon</p>
        </div>
      </Section>

      <footer className="footer-film relative overflow-hidden px-5 py-16 text-center">
        <WatercolorFlorals className="bottom-[-3rem] left-[-3rem] opacity-35" />
        <p className="relative z-10 font-display text-3xl leading-tight text-rosewood">
          With Love and Gratitude,
          <br />
          Pravitha P V & Abhijith Roy
        </p>
      </footer>

      <AnimatePresence>
        {invitationOpen ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-rosewood/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Invitation card enlarged preview"
            onClick={() => setInvitationOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-h-[88vh] w-full max-w-md"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setInvitationOpen(false)}
                className="absolute -right-2 -top-12 rounded-full border border-champagneGold/50 bg-ivory px-4 py-2 text-sm font-semibold text-rosewood"
              >
                Close
              </button>
              <Image
                src="/images/invitation-card.jpg"
                alt="Enlarged invitation card"
                width={508}
                height={715}
                className="max-h-[88vh] w-full rounded-sm object-contain shadow-glow"
                sizes="92vw"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
