"use client";

import { STORY_PRINCIPLES, STORY_STATS } from "@/content/story";
import MetricCard from "@/components/ui/MetricCard";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#020812]" aria-labelledby="our-story-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-16 max-w-2xl">
          <SectionLabel>Our story</SectionLabel>
          <h2 id="our-story-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
            Built for sponsors who need Latin America to work.
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] leading-relaxed">
            Fidelia Trials — formerly Innova Trials — grew from regional investigators and regulatory specialists
            who saw too many global programs underperform in the countries they knew best.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STORY_STATS.map((stat) => (
            <RevealGroupItem key={stat.label}>
              <MetricCard value={stat.value} label={stat.label} detail={stat.detail} />
            </RevealGroupItem>
          ))}
        </RevealGroup>

        <RevealGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {STORY_PRINCIPLES.map((p) => (
              <RevealGroupItem key={p.id}>
                <article>
                  <h3 className="text-[17px] font-semibold text-white mb-1">{p.title}</h3>
                  <p className="text-[13px] text-[#55A2D2] mb-3 italic font-serif">{p.summary}</p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{p.detail}</p>
                </article>
              </RevealGroupItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
