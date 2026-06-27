"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import SmoothScroll from "@/components/providers/SmoothScroll";
import LightboxProvider from "@/components/providers/LightboxProvider";
import AnimatedBackground from "@/components/decor/AnimatedBackground";
import Butterflies from "@/components/decor/Butterflies";
import Navbar from "@/components/chrome/Navbar";
import MusicToggle from "@/components/chrome/MusicToggle";

import LoadingScreen from "@/components/sections/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import LoveStoryTimeline from "@/components/sections/LoveStoryTimeline";
import CoupleSection from "@/components/sections/CoupleSection";
import QuoteSection from "@/components/sections/QuoteSection";
import WeddingDetails from "@/components/sections/WeddingDetails";
import CountdownTimer from "@/components/sections/CountdownTimer";
import Gallery from "@/components/sections/Gallery";
import InvitationCard from "@/components/sections/InvitationCard";
import RSVPSection from "@/components/sections/RSVPSection";
import FinalInvitation from "@/components/sections/FinalInvitation";
import Footer from "@/components/sections/Footer";

export default function WeddingExperience() {
  const [entered, setEntered] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock scroll until the guest opens the invitation.
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  // Drive the audio element from musicOn state.
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

  function handleEnter(withMusic: boolean) {
    setEntered(true);
    setMusicOn(withMusic);
    // Bring the page back to the top behind the gate.
    window.scrollTo({ top: 0 });
  }

  return (
    <LightboxProvider>
      <SmoothScroll>
        <audio ref={audioRef} src="/audio/wedding-theme.mp3" loop preload="auto" />

        <AnimatedBackground />

        <AnimatePresence>
          {!entered ? <LoadingScreen key="gate" onEnter={handleEnter} /> : null}
        </AnimatePresence>

        {entered ? (
          <>
            <Navbar />
            <MusicToggle musicOn={musicOn} onToggle={() => setMusicOn((v) => !v)} />
          </>
        ) : null}

        <main className="relative overflow-x-hidden text-ink">
          <HeroSection entered={entered} />

          <div className="relative">
            {/* occasional butterflies drifting over the mid-page */}
            <Butterflies count={2} />
            <LoveStoryTimeline />
            <CoupleSection />
            <QuoteSection />
            <WeddingDetails />
            <CountdownTimer />
            <Gallery />
            <InvitationCard />
            <RSVPSection />
            <FinalInvitation />
          </div>

          <Footer />
        </main>
      </SmoothScroll>
    </LightboxProvider>
  );
}
