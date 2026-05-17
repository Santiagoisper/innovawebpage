"use client";

import Link from "next/link";
import { TEAM } from "@/content/team";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";

export default function Leadership() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A2342]" aria-labelledby="leadership-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Leadership</SectionLabel>
            <h2 id="leadership-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white">
              Regional expertise at the top.
            </h2>
          </div>
          <Link href="/leadership" className="text-[13px] text-[#55A2D2] hover:text-white transition-colors font-medium">
            Meet the team →
          </Link>
        </Reveal>

        <RevealGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.map((member) => (
              <RevealGroupItem key={member.id}>
                <article className="border-t border-[rgba(85,162,210,0.2)] pt-8 h-full">
                  <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
                  <p className="text-[13px] text-[#55A2D2] font-medium mb-1">{member.title}</p>
                  <p className="font-mono text-[10px] tracking-wide text-[rgba(255,255,255,0.35)] mb-4">{member.credentials}</p>
                  <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-relaxed mb-4">{member.bio}</p>
                  <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                    {member.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[rgba(85,162,210,0.25)] text-[rgba(255,255,255,0.5)]"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealGroupItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
