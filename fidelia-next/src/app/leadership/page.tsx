import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import Leadership from "@/components/sections/Leadership";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leadership",
  description: `Leadership team — ${SITE.name}.`,
};

export default function LeadershipPage() {
  return (
    <VideoPageShell video="leadership" objectPosition="center 25%">
      <MotionProviders>
        <div className="pt-20">
          <Leadership />
        </div>
      </MotionProviders>
    </VideoPageShell>
  );
}
