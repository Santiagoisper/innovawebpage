import type { ReactNode } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

type InnerPageProps = {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function InnerPage({ label, title, description, children }: InnerPageProps) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        <SectionLabel className="mb-6">{label}</SectionLabel>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white mb-6">{title}</h1>
        <p className="text-[1.05rem] text-[rgba(255,255,255,0.55)] leading-relaxed mb-12">{description}</p>
        {children}
      </div>
    </div>
  );
}
