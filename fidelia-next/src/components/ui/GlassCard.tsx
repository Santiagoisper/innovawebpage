import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] rounded-[2px] ${className}`}
    >
      {children}
    </div>
  );
}
