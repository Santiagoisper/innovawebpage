export type HistoryMilestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  category: "ethics" | "science" | "regulation" | "latam" | "operations";
  /** Links scientific/regulatory history to how Fidelia runs trials today */
  operationsLink: string;
  discipline: string;
};

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    id: "nuremberg-1947",
    year: "1947",
    title: "Nuremberg Code",
    description:
      "The first international standard for ethical human experimentation establishes informed consent as a non-negotiable principle.",
    category: "ethics",
    discipline: "Informed consent",
    operationsLink:
      "Every Fidelia site activation includes IRB-approved consent in local language, comprehension checks, and re-consent procedures for amendments.",
  },
  {
    id: "helsinki-1964",
    year: "1964",
    title: "Declaration of Helsinki",
    description:
      "The World Medical Association sets the foundation for participant protection in clinical research.",
    category: "ethics",
    discipline: "Participant protection",
    operationsLink:
      "Our monitoring plans prioritize participant safety signals and protocol deviations that affect welfare — not only data completeness.",
  },
  {
    id: "belmont-1979",
    year: "1979",
    title: "Belmont Report",
    description:
      "Respect for persons, beneficence, and justice become the three principles guiding ethical research.",
    category: "ethics",
    discipline: "Ethical framework",
    operationsLink:
      "Feasibility assessments evaluate whether enrollment targets respect community burden and whether inclusion criteria are scientifically justified.",
  },
  {
    id: "streptomycin-1948",
    year: "1948",
    title: "First Modern Randomized Trial",
    description:
      "The MRC streptomycin trial establishes random allocation as the scientific standard for comparing treatments.",
    category: "science",
    discipline: "Randomization",
    operationsLink:
      "We design allocation concealment and stratification plans that survive monitoring visits and data review — not just protocol text.",
  },
  {
    id: "ich-gcp-1996",
    year: "1996",
    title: "ICH E6 — GCP Guidelines",
    description:
      "International harmonization of Good Clinical Practice creates the global standard that governs every trial we run today.",
    category: "regulation",
    discipline: "GCP compliance",
    operationsLink:
      "CRAs are trained to ICH E6(R2) expectations; TMF structure and monitoring visit reports follow sponsor and agency inspection standards.",
  },
  {
    id: "latam-phase3-2001",
    year: "2001",
    title: "Latin America Enters Phase III",
    description:
      "MERCOSUR regulatory harmonization and ANVISA reform open Brazil as a major Phase III destination.",
    category: "latam",
    discipline: "Regional regulatory systems",
    operationsLink:
      "Our Brazil unit manages ANVISA and CONEP in parallel — the operational pattern sponsors still depend on for large global studies.",
  },
  {
    id: "alcoa-plus-2016",
    year: "2016",
    title: "ALCOA+ Data Integrity",
    description:
      "Attributable, legible, contemporaneous, original, and accurate data — plus complete, consistent, enduring, and available records.",
    category: "regulation",
    discipline: "Data integrity",
    operationsLink:
      "EDC reconciliation, source document verification, and TMF indexing follow ALCOA+ expectations before agencies ask.",
  },
  {
    id: "rbm-2012",
    year: "2012",
    title: "Risk-Based Monitoring Recognized",
    description:
      "FDA guidance formalizes risk-based monitoring, transforming how CROs protect data integrity.",
    category: "regulation",
    discipline: "Risk-based monitoring",
    operationsLink:
      "Monitoring frequency and central statistical monitoring are calibrated to protocol risk — efficient without compromising inspection readiness.",
  },
  {
    id: "precision-latam-2018",
    year: "2018",
    title: "Precision Medicine in LATAM",
    description:
      "Genomic diversity of Latin American populations becomes a scientific asset, not an afterthought.",
    category: "science",
    discipline: "Population science",
    operationsLink:
      "We advise sponsors on stratification and biospecimen logistics so LATAM cohorts contribute meaningfully to global datasets.",
  },
  {
    id: "fidelia-2024",
    year: "2024",
    title: "Fidelia Trials Regional Platform",
    description:
      "Six-country operating platform, 153+ active sites, and regional leadership built for demanding global trials.",
    category: "operations",
    discipline: "Regional execution",
    operationsLink:
      "This is where history meets your protocol: one partner coordinating ethics, regulators, sites, and data across Latin America.",
  },
];
