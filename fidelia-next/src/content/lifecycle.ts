export type LifecyclePhase = {
  id: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
  sponsorOutcome: string;
};

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    id: "feasibility",
    label: "01",
    title: "Feasibility",
    description:
      "Site identification, investigator qualification, and enrollment thesis validation before protocol commitment.",
    deliverables: [
      "Country-specific feasibility assessments",
      "Investigator CV and site capability review",
      "Patient population and competition mapping",
    ],
    sponsorOutcome: "Go / no-go decisions grounded in operational reality, not brochure claims.",
  },
  {
    id: "regulatory",
    label: "02",
    title: "Regulatory",
    description:
      "Parallel ethics and health-authority submissions aligned to each jurisdiction's format, language, and review cadence.",
    deliverables: [
      "Authority dossiers (ANVISA, ANMAT, COFEPRIS, INVIMA, DIGEMID, ISP)",
      "Ethics committee packages and query responses",
      "Import and labeling strategy per country",
    ],
    sponsorOutcome: "Predictable approval timelines with fewer rework cycles at activation.",
  },
  {
    id: "startup",
    label: "03",
    title: "Start-Up",
    description:
      "Site activation, training, systems access, and supply readiness from a single operational baseline.",
    deliverables: [
      "Site contracts and budget execution",
      "GCP and protocol training",
      "EDC / IXRS access and pharmacy readiness",
    ],
    sponsorOutcome: "Sites activated on schedule with identical quality standards.",
  },
  {
    id: "activation",
    label: "04",
    title: "Activation",
    description:
      "First patient screened, enrollment tracked against projection, deviations managed in real time.",
    deliverables: [
      "Enrollment dashboards by country and site",
      "Screen failure and deviation logs",
      "Recruitment mitigation plans",
    ],
    sponsorOutcome: "Enrollment velocity visible early — corrective action before timelines slip.",
  },
  {
    id: "monitoring",
    label: "05",
    title: "Monitoring",
    description:
      "Risk-based on-site and centralized monitoring with defined query resolution windows.",
    deliverables: [
      "Monitoring visit reports and follow-up letters",
      "Centralized data review and query management",
      "CAPA tracking and inspection readiness files",
    ],
    sponsorOutcome: "Clean data packages and audit-ready documentation at every visit.",
  },
  {
    id: "closeout",
    label: "06",
    title: "Close-Out",
    description:
      "Systematic site closure, final reconciliation, and regulatory archiving.",
    deliverables: [
      "Close-out visit reports and outstanding query closure",
      "TMF completeness review",
      "Final authority notifications where required",
    ],
    sponsorOutcome: "Study closed with files that withstand sponsor and agency inspection.",
  },
];
