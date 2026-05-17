"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";
import { CRO_PROPOSITION } from "@/lib/constants";

const PILLARS = [
  {
    label: "Regional coordination",
    text: "Ethics committees, regulators, and sites across six jurisdictions — synchronized, not sequential guesswork.",
  },
  {
    label: "Regulatory awareness",
    text: "ANVISA, ANMAT, COFEPRIS, INVIMA, DIGEMID, ISP — each with distinct formats, languages, and review cadences.",
  },
  {
    label: "Reliable sites",
    text: "Enrollment success starts with investigator relationships maintained between studies, not cold activation lists.",
  },
  {
    label: "Operational discipline",
    text: "Deviations, data integrity, and inspection readiness are embedded from study start — not addressed at audit.",
  },
  {
    label: "Ethical execution",
    text: "Informed consent, participant protection, and GCP compliance are the baseline for every protocol we run.",
  },
];

export default function SponsorProblem() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-[#020812]" aria-labelledby="sponsor-problem-heading">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <Reveal>
          <SectionLabel className="mb-6">The challenge</SectionLabel>
          <h2
            id="sponsor-problem-heading"
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white mb-8"
          >
            Clinical trials in Latin America require more than a CRO.
          </h2>
          <p className="text-[15px] text-[#F8E8C7] leading-relaxed border-l-2 border-[#DDA632] pl-5 mb-8 max-w-lg">
            {CRO_PROPOSITION}
          </p>
          <p className="text-[1.05rem] text-[rgba(255,255,255,0.62)] leading-relaxed">
            The region offers diverse populations and competitive enrollment — but only when your partner
            understands how trials actually move through local systems, not how they move on paper.
          </p>
        </Reveal>

        <RevealGroup>
          <ul className="flex flex-col gap-6 list-none m-0 p-0">
            {PILLARS.map((p) => (
              <RevealGroupItem key={p.label}>
                <li className="border-l-2 border-[rgba(85,162,210,0.3)] pl-6 py-1 hover:border-[#55A2D2] transition-colors duration-300">
                  <h3 className="font-sans text-[15px] font-semibold text-white mb-1">{p.label}</h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{p.text}</p>
                </li>
              </RevealGroupItem>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
