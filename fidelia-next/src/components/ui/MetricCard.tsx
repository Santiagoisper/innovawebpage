import GlassCard from "./GlassCard";

type MetricCardProps = {
  value: string;
  label: string;
  detail?: string;
};

export default function MetricCard({ value, label, detail }: MetricCardProps) {
  return (
    <GlassCard className="p-7">
      <p className="font-serif text-[2.5rem] leading-none text-white mb-2">{value}</p>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#55A2D2] mb-2">{label}</p>
      {detail ? (
        <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{detail}</p>
      ) : null}
    </GlassCard>
  );
}
