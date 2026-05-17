import { HISTORY_MILESTONES, type HistoryMilestone } from "./history";

export type HistoryLensId =
  | "ethics"
  | "randomization"
  | "regulation"
  | "ich-gcp"
  | "precision"
  | "data-integrity";

export type HistoryLens = {
  id: HistoryLensId;
  label: string;
  headline: string;
  narrative: string;
  operationsToday: string;
  milestoneIds: string[];
};

export const HISTORY_LENSES: HistoryLens[] = [
  {
    id: "ethics",
    label: "Ethics",
    headline: "Protection before protocol",
    narrative:
      "Ethical research moved from post-war codes to enforceable standards for consent, welfare, and justice.",
    operationsToday:
      "Every activation includes IRB-approved consent in local language, comprehension checks, and safety-first monitoring.",
    milestoneIds: ["nuremberg-1947", "helsinki-1964", "belmont-1979"],
  },
  {
    id: "randomization",
    label: "Randomization",
    headline: "Evidence, not anecdote",
    narrative:
      "Random allocation transformed medicine from opinion into measurable comparison — the backbone of pivotal trials.",
    operationsToday:
      "Allocation concealment, stratification, and blinded review are operationalized in study start-up and monitored through close-out.",
    milestoneIds: ["streptomycin-1948", "precision-latam-2018"],
  },
  {
    id: "regulation",
    label: "Regulation",
    headline: "Harmonized oversight",
    narrative:
      "National authorities and ethics committees created predictable pathways — when sponsors respect local format and cadence.",
    operationsToday:
      "Parallel ethics and authority submissions across six countries, with query response SLAs sponsors can track.",
    milestoneIds: ["latam-phase3-2001", "rbm-2012"],
  },
  {
    id: "ich-gcp",
    label: "ICH-GCP",
    headline: "One global conduct standard",
    narrative:
      "ICH E6 harmonized how trials are designed, monitored, and documented — the language of inspection-ready research.",
    operationsToday:
      "CRA training, TMF structure, and monitoring reports align to ICH E6(R2) expectations on every study we run.",
    milestoneIds: ["ich-gcp-1996", "fidelia-2024"],
  },
  {
    id: "precision",
    label: "Precision medicine",
    headline: "Population science as asset",
    narrative:
      "Genomic diversity in Latin America became scientifically valuable — when logistics and ethics keep pace with science.",
    operationsToday:
      "Biospecimen chains, stratification advice, and site capability mapping so LATAM cohorts strengthen global datasets.",
    milestoneIds: ["precision-latam-2018", "streptomycin-1948"],
  },
  {
    id: "data-integrity",
    label: "Data integrity",
    headline: "Trustworthy records",
    narrative:
      "Regulators and sponsors now judge trials by whether data can be reconstructed, attributed, and defended under audit.",
    operationsToday:
      "Source verification, query resolution windows, and TMF completeness are KPIs — not post-hoc cleanup tasks.",
    milestoneIds: ["alcoa-plus-2016", "rbm-2012", "ich-gcp-1996"],
  },
];

export function milestonesForLens(lensId: HistoryLensId): HistoryMilestone[] {
  const lens = HISTORY_LENSES.find((l) => l.id === lensId);
  if (!lens) return [];
  return lens.milestoneIds
    .map((id) => HISTORY_MILESTONES.find((m) => m.id === id))
    .filter((m): m is HistoryMilestone => Boolean(m));
}
