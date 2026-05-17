"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { HeroScrollProvider } from "@/components/scene/HeroScrollContext";
import WebGLHero from "@/components/scene/WebGLHero";
import HeroScrollContent from "@/components/sections/HeroScrollContent";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";
import { CRO_SUBHEADLINE } from "@/lib/constants";

export default function HeroSignature() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-[#020812] via-[#020812]/80 to-transparent"
        aria-hidden
      />
      <HeroScrollProvider targetRef={sectionRef}>
        <ParallaxLayer className="absolute inset-0" offset={32} targetRef={sectionRef}>
          <WebGLHero />
        </ParallaxLayer>

        <HeroScrollContent className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <SectionLabel className="mb-8">Clinical Research Organization · Latin America</SectionLabel>
          <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-white mb-8">
            Science in action
            <br />
            <span className="text-[#55A2D2]">across Latin America.</span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[rgba(255,255,255,0.62)] max-w-2xl mx-auto leading-relaxed mb-12">
            {CRO_SUBHEADLINE}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button href="/contact">Discuss your next trial</Button>
          <Button href="/services" variant="secondary">
            Our services
          </Button>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <RevealGroupItem>
            <MetricCard value="153+" label="Active sites" detail="Maintained between studies" />
          </RevealGroupItem>
          <RevealGroupItem>
            <MetricCard value="6" label="Countries" detail="Unified operating platform" />
          </RevealGroupItem>
          <RevealGroupItem>
            <MetricCard value="14" label="Regulatory frameworks" detail="Ethics + authority mastery" />
          </RevealGroupItem>
        </RevealGroup>
        </HeroScrollContent>
      </HeroScrollProvider>
    </section>
  );
}
