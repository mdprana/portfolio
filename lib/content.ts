import type { StaticImageData } from "next/image";

// Every fact here traces back to the CV (docs/PRD.md §12). No invented awards,
// metrics, or stacks — see docs/design-audit.md finding "award & angka fiktif".

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  role: string;
  summary: string;
  stack: string[];
  cover: string;
  links?: { repo?: string; demo?: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "mentalys",
    title: "Mentalys",
    year: "2026",
    category: "Machine Learning",
    role: "Solo — thesis",
    summary:
      "On-device depression-risk screening app fusing PHQ-9, facial emotion, and voice emotion into one explainable score.",
    stack: ["Kotlin", "TensorFlow Lite", "PyTorch", "Node.js", "Cloud Run"],
    cover: "/covers/mentalys.svg",
    featured: true,
  },
  {
    slug: "siraja",
    title: "SIRAJA",
    year: "2025",
    category: "Deep Learning",
    role: "Solo",
    summary:
      "Heart-sound classifier for early cardiovascular screening using a CNN-LSTM architecture and MFCC features.",
    stack: ["Python", "TensorFlow", "Keras", "Librosa", "Hugging Face"],
    cover: "/covers/siraja.svg",
    featured: true,
  },
  {
    slug: "emotiscan",
    title: "EmotiScan",
    year: "2024",
    category: "Computer Vision",
    role: "Solo",
    summary:
      "Real-time facial emotion recognition from webcam input using GLCM texture features and an ANN classifier.",
    stack: ["Python", "OpenCV", "TensorFlow"],
    cover: "/covers/emotiscan.svg",
    featured: true,
  },
  {
    slug: "locus-hotel",
    title: "Locus Hotel",
    year: "2024",
    category: "Web Development",
    role: "Front end",
    summary:
      "Responsive hotel website built from Figma prototypes, integrated with a Laravel backend for routing and content.",
    stack: ["HTML5", "CSS3", "JavaScript", "Laravel"],
    cover: "/covers/locus.svg",
    featured: true,
  },
];

export const capabilities = [
  {
    name: "Machine Learning",
    description:
      "Model design, training, and evaluation — CNNs, LSTMs, and multi-modal fusion — shipped all the way to on-device inference.",
  },
  {
    name: "Data Science & Analytics",
    description:
      "Cleaning, preprocessing, statistical analysis, and visualisation on messy real-world data.",
  },
  {
    name: "NLP / Local Language",
    description:
      "Evaluating LLM output for Indonesian regional languages and documenting Balinese linguistic conventions.",
  },
  {
    name: "Computer Vision",
    description:
      "Image captioning, facial emotion analysis, and live video processing with VGG-16, attention models, and OpenCV.",
  },
  {
    name: "Web Development",
    description:
      "Front-end interfaces and data tools — Next.js and React on the modern side, Python pipelines behind them.",
  },
];

// Figma Home "The Toolkit" — CV-backed tools only, same 12 on both breakpoints.
// `group` replaces the Figma tile's "N yrs" label: experience years were never
// stated anywhere, and the audit flagged invented numbers as a credibility risk.
const tool = (name: string, slug: string, group: string) => ({ name, slug, group });

export const techStack = [
  tool("Python", "python", "Language"),
  tool("TensorFlow", "tensorflow", "Deep Learning"),
  tool("Keras", "keras", "Deep Learning"),
  tool("PyTorch", "pytorch", "Deep Learning"),
  tool("scikit-learn", "scikitlearn", "Machine Learning"),
  tool("Hugging Face", "huggingface", "Machine Learning"),
  tool("pandas", "pandas", "Data Science"),
  tool("NumPy", "numpy", "Data Science"),
  tool("Jupyter", "jupyter", "Data Science"),
  tool("OpenCV", "opencv", "Computer Vision"),
  tool("Next.js", "nextdotjs", "Web"),
  tool("React", "react", "Web"),
];

export const highlights = [
  { value: "3.84", label: "GPA, Computer Science — Universitas Udayana" },
  { value: "0.415", label: "BLEU score, first-author image-captioning paper" },
  { value: "Top 10%", label: "Bangkit Academy ML cohort, 1,500+ participants" },
  { value: "146", label: "Schools reached in Bali's province-wide rollout" },
];

export const awards = [
  {
    title: "Top 10 Participant — Blockchain Technology Apprentice",
    issuer: "Mandala Chain Foundation, award from the Governor of Bali at DTIKFest",
    year: "2025",
  },
  {
    title: "Graduated with Distinction — Machine Learning Cohort",
    issuer: "Bangkit Academy (Google, Tokopedia, Gojek & Traveloka)",
    year: "2025",
  },
  {
    title: "Dev Certification for Machine Learning with TensorFlow",
    issuer: "dev.cert — valid through May 2028",
    year: "2025",
  },
  {
    title: "Top 50 Team Recognition (of 644 teams)",
    issuer: "Bangkit Academy Batch 2",
    year: "2024",
  },
];

export const experience = [
  {
    role: "Local Language Specialist Intern",
    company: "PT GoTo Gojek Tokopedia Tbk",
    period: "Jul 2026 — Present",
    description:
      "Evaluating LLM responses for Indonesian regional languages, focused on Balinese. Redesigned the evaluation rubric and documented core linguistic conventions.",
  },
  {
    role: "Engineer On-Site / IT Support",
    company: "PT Metra-Net — Dinas Pendidikan Provinsi Bali",
    period: "May — Jul 2026",
    description:
      "Supported the SIAP SPMB Online rollout across 146 schools and 40,000+ admissions, and shipped Python automation as a Streamlit app.",
  },
  {
    role: "Junior Data Science Intern",
    company: "PT Vinix Seven Aurum",
    period: "Mar — Jun 2025",
    description:
      "Cleaned and preprocessed datasets for ML projects and built recommendation and visualisation features for the Insight-PTN dashboard.",
  },
  {
    role: "Blockchain Technology Apprentice",
    company: "Mandala Chain Foundation",
    period: "Feb — Mar 2025",
    description:
      "Deployed soulbound NFT contracts on the Niskala testnet and completed the Polkadot Developer Bootcamp.",
  },
  {
    role: "Machine Learning Cohort Participant",
    company: "Bangkit Academy",
    period: "Sep 2024 — Jan 2025",
    description:
      "Built and evaluated three AI models, graduated with distinction, and led a project team to Top 50 of 644 teams.",
  },
  {
    role: "Web Developer",
    company: "PT Econdelight",
    period: "Aug — Sep 2024",
    description:
      "Built a responsive hotel website front end from Figma prototypes against a Laravel backend.",
  },
];

export const aboutParagraphs = [
  "I'm Prana, a computer science graduate from Universitas Udayana who likes the part of machine learning where the model has to leave the notebook.",
  "I build systems end to end — on-device deep learning, multilingual data work, and the interfaces that make the output legible to someone who will never read the code.",
  "Most of my work sits where language, vision, and health data meet. I care more about whether a model survives contact with real users than about a leaderboard number.",
  "Right now I'm at GoTo's Data Science team, evaluating how well large language models handle Indonesian regional languages.",
];

export type { StaticImageData };
