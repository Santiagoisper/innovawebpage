import type { ReactNode } from "react";
import PageShell from "./PageShell";
import SectionVideoBackground from "@/components/ui/SectionVideoBackground";
import type { SectionVideoKey } from "@/lib/data/sectionVideos";
import { SECTION_VIDEOS } from "@/lib/data/sectionVideos";

type VideoPageShellProps = {
  video: SectionVideoKey;
  objectPosition?: string;
  overlay?: number;
  children: ReactNode;
};

/** Inner page with fixed video backdrop; content scrolls above. */
export default function VideoPageShell({
  video,
  objectPosition,
  overlay = 0.5,
  children,
}: VideoPageShellProps) {
  return (
    <PageShell>
      <SectionVideoBackground
        src={SECTION_VIDEOS[video]}
        objectPosition={objectPosition}
        overlay={overlay}
      />
      <div className="relative z-10 min-h-screen [&_section]:!bg-[rgba(2,8,18,0.28)] [&_section]:backdrop-blur-[1px]">
        {children}
      </div>
    </PageShell>
  );
}
