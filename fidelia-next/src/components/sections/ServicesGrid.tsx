"use client";

import Link from "next/link";
import { SERVICES } from "@/content/services";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";

export default function ServicesGrid() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A2342]" aria-labelledby="services-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Service pillars</SectionLabel>
            <h2 id="services-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white">
              End-to-end trial execution.
            </h2>
          </div>
          <Link href="/services" className="text-[13px] text-[#55A2D2] hover:text-white transition-colors font-medium self-end">
            All services →
          </Link>
        </Reveal>

        <RevealGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(85,162,210,0.08)]">
            {SERVICES.map((service, i) => (
              <RevealGroupItem key={service.id}>
                <article className="bg-[#0A2342] p-8 h-full hover:bg-[rgba(85,162,210,0.05)] transition-colors duration-300">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[rgba(255,255,255,0.25)] mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[18px] font-semibold text-white mb-2">{service.title}</h3>
                  <p className="font-serif text-[13px] text-[#55A2D2] mb-4 italic">{service.tagline}</p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{service.description}</p>
                </article>
              </RevealGroupItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
