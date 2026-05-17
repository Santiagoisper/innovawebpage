"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";
import { CRO_SUBHEADLINE } from "@/lib/constants";
import { useCurieHandoffOpacity, useIntroStickyReleased } from "@/hooks/useCurieHandoff";
import CuriePlate from "./CuriePlate";

/**
 * Main Fidelia landing â€” Marie Curie sepia hero (post cosmic intro).
 * Curie es fondo a pantalla completa; el copy va encima, no debajo.
 */
export default function FideliaLandingHero() {
  const handoffOpacity = useCurieHandoffOpacity();
  const stickyReleased = useIntroStickyReleased();
  const plateOpacity = stickyReleased ? 1 : 0;
  const copyOpacity = stickyReleased ? 1 : Math.max(0, (handoffOpacity - 0.35) / 0.65);

  return (
    <section
      id="fidelia-home"
      className="relative -mt-[100svh] min-h-[100svh] overflow-hidden bg-[#020812] text-white"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ opacity: plateOpacity }}
        aria-hidden
      >
        <CuriePlate imageClassName="img-sepia hero-ken-burns brightness-[0.58]" />
      </motion.div>

      <div className="hero-light-sweep pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,8,18,0.90) 0%, rgba(2,8,18,0.72) 35%, rgba(2,8,18,0.28) 65%, rgba(2,8,18,0.08) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-20 md:px-12 lg:px-[8vw]">
        <motion.div
          className="mx-auto w-full max-w-[1100px] text-center"
          style={{ opacity: copyOpacity }}
        >
          <Reveal variant="fade">
            <SectionLabel className="mb-8">Clinical Research Organization Â· Latin America</SectionLabel>
            <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-white mb-8">
              Science in action
              <br />
              <span className="text-[#55A2D2]">across Latin America.</span>
            </h1>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-[rgba(255,255,255,0.62)] max-w-2xl mx-auto leading-relaxed mb-12">
              {CRO_SUBHEADLINE}
            </p>
          </Reveal>

          <Reveal variant="fade" delay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
        </motion.div>
      </div>
    </section>
  );
}
