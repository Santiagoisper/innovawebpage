import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import PageShell from "@/components/layout/PageShell";
import FinalCTA from "@/components/sections/FinalCTA";
import CosmicIntro from "@/components/sections/CosmicIntro";
import FideliaLandingHero from "@/components/sections/FideliaLandingHero";
import HomeExplore from "@/components/sections/HomeExplore";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE.tagline,
  description: SITE.description,
};

export default function HomePage() {
  return (
    <PageShell>
      <MotionProviders>
        <CosmicIntro />
        <FideliaLandingHero />
        <HomeExplore />
        <FinalCTA />
      </MotionProviders>
    </PageShell>
  );
}
