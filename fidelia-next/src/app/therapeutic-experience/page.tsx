import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import TherapeuticExperience from "@/components/sections/TherapeuticExperience";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Therapeutic Experience",
  description: `Therapeutic area expertise — ${SITE.name}.`,
};

export default function TherapeuticExperiencePage() {
  return (
    <VideoPageShell video="therapeutic" objectPosition="center 40%">
      <MotionProviders>
        <div className="pt-20">
          <TherapeuticExperience />
        </div>
      </MotionProviders>
    </VideoPageShell>
  );
}
