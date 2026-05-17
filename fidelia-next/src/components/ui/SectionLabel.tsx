type SectionLabelProps = {
  children: string;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.35)] mb-4 ${className}`}
    >
      {children}
    </p>
  );
}
