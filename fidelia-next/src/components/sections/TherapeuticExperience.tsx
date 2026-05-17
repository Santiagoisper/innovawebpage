"use client";

import Link from "next/link";
import { THERAPEUTIC_AREAS } from "@/content/therapeuticAreas";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";

export default function TherapeuticExperience() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#020812]" aria-labelledby="therapeutic-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Therapeutic experience</SectionLabel>
            <h2 id="therapeutic-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white">
              Depth where Latin America enrolls best.
            </h2>
          </div>
          <Link
            href="/therapeutic-experience"
            className="text-[13px] text-[#55A2D2] hover:text-white transition-colors font-medium"
          >
            Full therapeutic map →
          </Link>
        </Reveal>

        <RevealGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {THERAPEUTIC_AREAS.map((area) => (
              <RevealGroupItem key={area.id}>
                <article className="border border-[rgba(85,162,210,0.1)] p-7 h-full hover:border-[rgba(85,162,210,0.35)] transition-colors duration-300">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="font-serif text-xl text-white">{area.name}</h3>
                    <span className="font-mono text-[10px] text-[#DDA632]">{area.trials} trials</span>
                  </div>
                  <p className="text-[12px] text-[#55A2D2] mb-4">{area.description}</p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed mb-4">{area.latamStrength}</p>
                  <p className="text-[13px] text-[#F8E8C7] leading-relaxed border-l border-[rgba(221,166,50,0.4)] pl-3">
                    {area.sponsorValue}
                  </p>
                </article>
              </RevealGroupItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
