export type TherapeuticArea = {
  id: string;
  name: string;
  description: string;
  trials: number;
  latamStrength: string;
  sponsorValue: string;
  capabilities: string[];
};

export const THERAPEUTIC_AREAS: TherapeuticArea[] = [
  {
    id: "oncology",
    name: "Oncology",
    description: "Solid tumors, hematologic malignancies, immunotherapy",
    trials: 28,
    latamStrength:
      "High enrollment velocity in Brazil and Mexico; experienced academic oncology centers in Argentina and Chile",
    sponsorValue: "Faster cohort completion for global pivotal studies without sacrificing GCP rigor",
    capabilities: ["Tumor response adjudication", "Biomarker collection logistics", "I/O safety monitoring"],
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular",
    description: "Heart failure, atherosclerosis, hypertension",
    trials: 19,
    latamStrength: "Large treatment-naïve populations and strong cardiology networks in urban centers",
    sponsorValue: "Event-driven trials benefit from diverse cardiovascular risk profiles across countries",
    capabilities: ["ECG central reading coordination", "Hospitalization endpoint capture", "Device + drug hybrids"],
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Neurodegeneration, epilepsy, rare CNS disorders",
    trials: 14,
    latamStrength: "Specialty sites with long-term follow-up culture in Chile and Argentina",
    sponsorValue: "Retention-focused operations for studies requiring multi-year visits",
    capabilities: ["Cognitive scale training", "MRI scheduling across sites", "Caregiver-reported outcomes"],
  },
  {
    id: "infectious",
    name: "Infectious Disease",
    description: "Viral, bacterial, tropical and neglected diseases",
    trials: 22,
    latamStrength: "Colombia and Peru public-sector participation; Brazil high-incidence cohorts",
    sponsorValue: "Regulatory familiarity with outbreak-response and vaccine trial pathways",
    capabilities: ["Cold-chain IMP", "Rapid ethics for public health studies", "Community engagement"],
  },
  {
    id: "metabolic",
    name: "Metabolic & Endocrine",
    description: "Diabetes, obesity, dyslipidemia",
    trials: 17,
    latamStrength: "Mexico and Brazil primary-care and specialist networks with high prevalence",
    sponsorValue: "Recruitment aligned to real-world comorbidity patterns sponsors need in global labels",
    capabilities: ["HbA1c central lab coordination", "Lifestyle intervention adherence", "Cardiometabolic composites"],
  },
  {
    id: "rare",
    name: "Rare & Orphan",
    description: "Ultra-rare conditions, gene therapy, biologics",
    trials: 11,
    latamStrength: "Patient advocacy relationships and referral center mapping across Southern Cone",
    sponsorValue: "Country-specific regulatory pathways for orphan designations and small-n studies",
    capabilities: ["Natural history sub-studies", "Compassionate use coordination", "Specialized import permits"],
  },
  {
    id: "respiratory",
    name: "Respiratory",
    description: "COPD, asthma, pulmonary fibrosis",
    trials: 13,
    latamStrength: "Pulmonology departments with spirometry capacity in all six countries",
    sponsorValue: "Standardized pulmonary function training reduces monitor findings at close-out",
    capabilities: ["Spirometry certification", "Exacerbation capture", "Inhaled device training"],
  },
  {
    id: "immunology",
    name: "Immunology & Rheumatology",
    description: "Autoimmune disorders, biologics, JAK inhibitors",
    trials: 16,
    latamStrength: "Biologics-experienced sites with infusion suites in Brazil and Mexico",
    sponsorValue: "Infusion scheduling and immunogenicity sample handling built into site SOPs",
    capabilities: ["Infusion chair capacity planning", "TB screening workflows", "DAS28 / CDAI consistency"],
  },
];
