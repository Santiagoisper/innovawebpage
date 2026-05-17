export type MedicineTimelineEntry = {
  id: string;
  image: string;
  alt: string;
  /** Show full photo without cropping (letterboxed on dark stage). */
  contain?: boolean;
  /** CSS object-position for focal point (e.g. "center 20%"). */
  imagePosition?: string;
  /** Ken Burns phase offset in seconds — varies motion across slides. */
  portraitDelay?: number;
  /** AI portrait clip (~3s loop). Default: /videos/timeline/{id}.mp4 */
  video?: string;
  era: string;
  name: string;
  prize: string;
  year: string;
  label: string;
  sub: string;
  story: string;
  argentine?: boolean;
};

/** Antiquity → Argentine laureates → landmark Nobel Medicine prizes (English labels). */
export const MEDICINE_TIMELINE: MedicineTimelineEntry[] = [
  {
    id: "hippocrates",
    image: "/hipocrates.jpg",
    alt: "Hippocrates",
    contain: true,
    portraitDelay: 0,
    era: "Antiquity · Heritage · Medicine",
    name: "Hippocrates",
    prize: "c. 460–370 BC · Father of Western medicine",
    year: "Antiquity",
    label: "Hippocrates",
    sub: "Heritage · Medicine",
    story:
      "Regarded as the father of Western medicine, Hippocrates established the ethical foundation of clinical practice through the Hippocratic Oath: treat the sick with rigor, confidentiality, and responsibility. His legacy links classical wisdom to the standards that still guide research today.",
  },
  {
    id: "pasteur",
    image: "/pasteur.jpg",
    alt: "Louis Pasteur",
    contain: true,
    portraitDelay: 1.5,
    era: "1870s · Pioneer · Science",
    name: "Louis Pasteur",
    prize: "1822–1895 · Germ theory & vaccines",
    year: "1870s",
    label: "Louis Pasteur",
    sub: "Pioneer · Science",
    story:
      "Pasteur showed that microorganisms cause disease, developed pasteurization, and created vaccines against rabies and anthrax. His work turned medicine into an experimental science and made controlled clinical research possible.",
  },
  {
    id: "houssay",
    image: "/houssay.jpg",
    alt: "Bernardo Houssay",
    contain: true,
    portraitDelay: 3,
    argentine: true,
    era: "Nobel — Medicine · 1947",
    name: "Bernardo Houssay",
    prize: "Argentina · Endocrine physiology",
    year: "1947",
    label: "Bernardo Houssay",
    sub: "Nobel — Medicine",
    story:
      "An Argentine physician and the first Latin American Nobel laureate in the sciences. Houssay revealed how pancreatic hormones regulate glucose metabolism — foundational knowledge for endocrinology, diabetes research, and modern pharmacology.",
  },
  {
    id: "leloir",
    image: "/loloir.jpg",
    alt: "Luis F. Leloir",
    contain: true,
    portraitDelay: 4.5,
    argentine: true,
    era: "Nobel — Chemistry · 1970",
    name: "Luis F. Leloir",
    prize: "Argentina · Carbohydrate metabolism",
    year: "1970",
    label: "Luis F. Leloir",
    sub: "Nobel — Chemistry",
    story:
      "Born in Paris and trained in Argentina, Leloir deciphered how cells store and use energy through carbohydrates. His discoveries on sugar nucleotides earned the Nobel Prize in Chemistry and opened paths to biochemistry applied to medicine.",
  },
  {
    id: "milstein",
    image: "/milstein.jpg",
    alt: "César Milstein",
    contain: true,
    portraitDelay: 6,
    argentine: true,
    era: "Nobel — Medicine · 1984",
    name: "César Milstein",
    prize: "Argentina · Monoclonal antibodies",
    year: "1984",
    label: "César Milstein",
    sub: "Nobel — Medicine",
    story:
      "Born in Bahía Blanca, Milstein co-developed the hybridoma technique to produce monoclonal antibodies — one of the most influential advances in diagnostics, oncology, and immunology. Argentina's third Nobel linked to medicine and the life sciences.",
  },
  {
    id: "marshall-2005",
    image: "/Barry J. Marshall y J. Robin Warren.jpg",
    alt: "Barry Marshall and J. Robin Warren",
    contain: true,
    portraitDelay: 7.5,
    era: "Nobel — Medicine · 2005",
    name: "Marshall & Warren",
    prize: "H. pylori · Ulcers & gastritis",
    year: "2005",
    label: "Marshall & Warren",
    sub: "Nobel — Medicine",
    story:
      "Barry Marshall and J. Robin Warren overturned medical dogma by proving that Helicobacter pylori causes peptic ulcers and gastritis — not stress or diet alone. Their persistence opened a new era of infectious-disease treatment in gastroenterology.",
  },
  {
    id: "edwards-2010",
    image: "/nobel/edwards.jpg",
    alt: "Robert Edwards",
    contain: true,
    portraitDelay: 9,
    era: "Nobel — Medicine · 2010",
    name: "Robert Edwards",
    prize: "In vitro fertilization (IVF)",
    year: "2010",
    label: "Robert Edwards",
    sub: "Nobel — Medicine",
    story:
      'Robert Edwards developed in vitro fertilization and made possible the first "test-tube baby." The Nobel committee honored work that brought new hope to millions facing infertility worldwide.',
  },
  {
    id: "ohsumi-2016",
    image: "/nobel/ohsumi-portrait.jpg",
    alt: "Yoshinori Ohsumi",
    contain: true,
    imagePosition: "center 12%",
    portraitDelay: 10.5,
    era: "Nobel — Medicine · 2016",
    name: "Yoshinori Ohsumi",
    prize: "Mechanisms of autophagy",
    year: "2016",
    label: "Yoshinori Ohsumi",
    sub: "Nobel — Medicine",
    story:
      "Yoshinori Ohsumi identified the genes and pathways behind autophagy — how cells recycle damaged components. The discovery explains fundamental processes in aging, infection, and cancer.",
  },
  {
    id: "allison-honjo-2018",
    image: "/nobel/allison-honjo-2018.jpg",
    alt: "James P. Allison and Tasuku Honjo",
    contain: true,
    portraitDelay: 12,
    era: "Nobel — Medicine · 2018",
    name: "Allison & Honjo",
    prize: "Cancer immunotherapy",
    year: "2018",
    label: "Allison & Honjo",
    sub: "Nobel — Medicine",
    story:
      "James Allison and Tasuku Honjo discovered how to release the immune system's brakes on tumor cells. Their work established checkpoint inhibition as a transformative principle in oncology.",
  },
  {
    id: "hep-c-2020",
    image: "/nobel/allison-honjo.jpg",
    alt: "Harvey Alter, Michael Houghton, and Charles Rice",
    contain: true,
    portraitDelay: 13,
    era: "Nobel — Medicine · 2020",
    name: "Alter, Houghton & Rice",
    prize: "Hepatitis C virus",
    year: "2020",
    label: "Hepatitis C discovery",
    sub: "Nobel — Medicine",
    story:
      "Harvey Alter, Michael Houghton, and Charles Rice identified the hepatitis C virus and tools to study it — enabling blood-screening programs and curative treatments that prevent cirrhosis and liver cancer.",
  },
  {
    id: "kariko-2023",
    image: "/nobel/kariko.jpg",
    alt: "Katalin Karikó and Drew Weissman",
    contain: true,
    portraitDelay: 13.5,
    era: "Nobel — Medicine · 2023",
    name: "Karikó & Weissman",
    prize: "mRNA vaccine science",
    year: "2023",
    label: "Karikó & Weissman",
    sub: "Nobel — Medicine",
    story:
      "Katalin Karikó and Drew Weissman showed how modified nucleosides let mRNA work safely in the body. Their discoveries underpinned the unprecedented speed of COVID-19 vaccines and a new class of therapeutics.",
  },
  {
    id: "microrna-2024",
    image: "/nobel/microrna-2024.jpg",
    alt: "Victor Ambros and Gary Ruvkun",
    contain: true,
    portraitDelay: 15,
    era: "Nobel — Medicine · 2024",
    name: "Ambros & Ruvkun",
    prize: "microRNA · Gene regulation",
    year: "2024",
    label: "Ambros & Ruvkun",
    sub: "Nobel — Medicine",
    story:
      "Victor Ambros and Gary Ruvkun discovered microRNA, small RNA molecules that fine-tune gene expression. The finding revealed a new layer of genetic control essential to development and linked to cancer, diabetes, and autoimmune disease.",
  },
];
