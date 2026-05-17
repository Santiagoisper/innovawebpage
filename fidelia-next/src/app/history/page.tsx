import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import MedicineTimelineCarousel from "@/components/sections/MedicineTimelineCarousel";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "History & Evolution",
  description: `From Hippocrates to Nobel laureates — the arc of medicine at ${SITE.name}.`,
};

export default function HistoryPage() {
  return (
    <VideoPageShell video="history" objectPosition="center center">
      <MotionProviders>
        <div className="pt-16">
          <MedicineTimelineCarousel />
        </div>
      </MotionProviders>
    </VideoPageShell>
  );
}
