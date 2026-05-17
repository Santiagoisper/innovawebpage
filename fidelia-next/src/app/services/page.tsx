import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import SponsorProblem from "@/components/sections/SponsorProblem";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TrialLifecycle from "@/components/sections/TrialLifecycle";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: `Clinical trial services across Latin America — ${SITE.name}.`,
};

export default function ServicesPage() {
  return (
    <VideoPageShell video="services" objectPosition="center 30%">
      <MotionProviders>
        <div className="pt-20">
          <SponsorProblem />
          <ServicesGrid />
          <TrialLifecycle />
        </div>
      </MotionProviders>
    </VideoPageShell>
  );
}
