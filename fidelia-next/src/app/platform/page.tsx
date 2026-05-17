import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import LatamPlatform from "@/components/sections/LatamPlatform";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Latin America Platform",
  description: `Regional operating platform — ${SITE.name}.`,
};

export default function PlatformPage() {
  return (
    <VideoPageShell video="platform" objectPosition="center 40%" overlay={0.48}>
      <MotionProviders>
        <div className="pt-28 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          <LatamPlatform embedded />
        </div>
      </MotionProviders>
    </VideoPageShell>
  );
}
