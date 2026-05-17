"use client";

import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-[#020812] border-t border-[rgba(85,162,210,0.12)]">
      <div className="max-w-[900px] mx-auto text-center">
        <Reveal>
          <SectionLabel className="mb-8 justify-center">Partner with us</SectionLabel>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-white mb-6">
            Ready to run your next trial with regional precision?
          </h2>
          <p className="text-[1.05rem] text-[rgba(255,255,255,0.55)] leading-relaxed mb-10 max-w-xl mx-auto">
            Speak with our team about feasibility, regulatory strategy, or full-service execution across Latin America.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button href="/contact">Start a conversation</Button>
          <Button href={`mailto:${SITE.email}`} variant="secondary">
            {SITE.email}
          </Button>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)]">
            {SITE.name} · Clinical Research Organization
          </p>
        </Reveal>
      </div>
    </section>
  );
}
