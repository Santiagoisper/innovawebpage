export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    id: "feasibility",
    title: "Feasibility & Site Selection",
    tagline: "Right sites. Right patients. Right speed.",
    description:
      "Regional intelligence on investigator networks, patient pool depth, and regulatory readiness across Latin America. We identify sites with proven enrollment track records and ICH-GCP compliance.",
    icon: "⬡",
  },
  {
    id: "regulatory",
    title: "Regulatory Affairs",
    tagline: "Navigating 14 regulatory frameworks.",
    description:
      "Expert submission management for ANVISA, COFEPRIS, ANMAT, INVIMA, DIGEMID, and regional authorities. We translate global protocols into locally compliant submissions.",
    icon: "⬡",
  },
  {
    id: "startup",
    title: "Study Start-Up",
    tagline: "Site activation with zero surprises.",
    description:
      "Accelerated ethics committee submissions, contract execution, and site qualification. Our start-up timelines are benchmarked against industry standards.",
    icon: "⬡",
  },
  {
    id: "monitoring",
    title: "Clinical Monitoring",
    tagline: "Eyes on data. Boots on ground.",
    description:
      "Risk-based monitoring programs combining on-site visits with centralized data review. Our monitors are regionally embedded, not fly-in consultants.",
    icon: "⬡",
  },
  {
    id: "vendors",
    title: "Vendor Management",
    tagline: "One point of accountability.",
    description:
      "Coordinated oversight of central labs, imaging, ePRO, and specialty vendors. We manage the supply chain so sponsors can focus on science.",
    icon: "⬡",
  },
  {
    id: "closeout",
    title: "Close-Out & Inspection Readiness",
    tagline: "Trial close is part of the plan from day one.",
    description:
      "Systematic site closeout, data lock support, and inspection readiness programs. We treat regulatory agency readiness as an ongoing discipline, not a last-minute sprint.",
    icon: "⬡",
  },
];
