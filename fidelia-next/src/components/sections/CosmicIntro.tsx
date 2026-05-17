"use client";

import { useRef } from "react";
import { HeroScrollProvider } from "@/components/scene/HeroScrollContext";
import WebGLHero from "@/components/scene/WebGLHero";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import CosmicGalaxyBackground from "./CosmicGalaxyBackground";
import CosmicIntroOverlay from "./CosmicIntroOverlay";
import CurieEmergenceLayer from "./CurieEmergenceLayer";

/**
 * Scroll-pinned galactic passage: starfield + DNA on axis → tunnel into the helix.
 * Dissolves into FideliaLandingHero (Marie Curie) below.
 */
export default function CosmicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[min(260vh,2800px)]"
      aria-label="Introducción — del cosmos al ADN"
    >
      <HeroScrollProvider targetRef={sectionRef}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020812]">
          <CosmicGalaxyBackground />
          <CurieEmergenceLayer />
          <WebGLHero />
          <CosmicIntroOverlay />
        </div>
      </HeroScrollProvider>
    </section>
  );
}
