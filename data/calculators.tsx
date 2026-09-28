import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  TrendingUp,
  Percent,
  Cake,
  Landmark,
  Receipt,
  PiggyBank,
  Wallet,
  Ruler,
  HardHat,
  HeartPulse,
  Coins,
  Paintbrush,
  GraduationCap,
} from "lucide-react";

export type CalculatorCategory = "math" | "finance" | "everyday" | "construction";

export interface CalculatorMeta {
  name: string;
  slug: string;
  category: CalculatorCategory;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  /** Short label shown on compact chips/badges. */
  shortLabel?: string;
  /** Not yet built — shown in listings for architecture/roadmap purposes, not linked. */
  comingSoon?: boolean;
}

export const categoryLabels: Record<CalculatorCategory, string> = {
  math: "Math",
  finance: "Finance",
  everyday: "Everyday",
  construction: "Construction",
};

export const categoryDescriptions: Record<CalculatorCategory, string> = {
  math: "Core arithmetic and percentage tools for quick, everyday math.",
  finance: "Plan investments, loans and repayments with India-first defaults.",
  everyday: "Dates, ages and other calculations you reach for often.",
  construction: "Material and cost estimators for home and building projects.",
};

export const calculators: CalculatorMeta[] = [
  {
    name: "Normal Calculator",
    slug: "normal-calculator",
    category: "math",
    description: "A fast, full-screen basic calculator with keyboard support and local history.",
    keywords: ["normal", "basic", "simple calculator", "math", "addition", "subtraction", "multiply", "divide"],
    icon: Calculator,
  },
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    category: "finance",
    description: "Project SIP growth with step-up, inflation adjustment and goal planning.",
    keywords: ["sip", "investment", "mutual fund", "sip return", "monthly investment", "step up sip", "lumpsum"],
    icon: TrendingUp,
    shortLabel: "SIP",
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "math",
    description: "Find X% of Y, what percentage X is of Y, and percentage change.",
    keywords: ["percentage", "percent", "%", "increase", "decrease", "percent of"],
    icon: Percent,
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    category: "everyday",
    description: "Calculate exact age in years, months and days from a date of birth.",
    keywords: ["age", "birthday", "date of birth", "dob", "how old am i"],
    icon: Cake,
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "finance",
    description: "Work out monthly loan EMI, total interest and a year-wise repayment schedule.",
    keywords: ["emi", "loan", "monthly payment", "home loan", "car loan", "interest"],
    icon: Landmark,
    shortLabel: "EMI",
  },
  // -- Roadmap: architecture supports adding these with one object each. --
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    category: "finance",
    description: "Add or remove GST from an amount at standard Indian slab rates.",
    keywords: ["gst", "tax", "gst calculator", "add gst", "remove gst"],
    icon: Receipt,
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "finance",
    description: "See how an investment grows with compounding over time.",
    keywords: ["compound interest", "ci calculator", "interest growth"],
    icon: PiggyBank,
  },
  {
    name: "FD Calculator",
    slug: "fd-calculator",
    category: "finance",
    description: "Estimate fixed deposit maturity value and interest earned.",
    keywords: ["fd", "fixed deposit", "fd calculator", "maturity amount"],
    icon: Wallet,
  },
  {
    name: "Tile Calculator",
    slug: "tile-calculator",
    category: "construction",
    description: "Estimate the number of tiles needed for a room, with wastage.",
    keywords: ["tile calculator", "flooring", "how many tiles"],
    icon: Ruler,
  },
  {
    name: "Concrete Calculator",
    slug: "concrete-calculator",
    category: "construction",
    description: "Calculate concrete volume needed for slabs, footings and columns.",
    keywords: ["concrete calculator", "cement calculator", "slab volume"],
    icon: HardHat,
  },
  // -- Next up on the roadmap — shown as "Coming soon" cards. --
  {
    name: "Lumpsum Calculator",
    slug: "lumpsum-calculator",
    category: "finance",
    description: "Project the future value of a one-time lump-sum investment.",
    keywords: ["lumpsum", "lump sum calculator", "one time investment"],
    icon: PiggyBank,
  },
  {
    name: "Loan Calculator",
    slug: "loan-calculator",
    category: "finance",
    description: "A general-purpose loan calculator for personal, auto and other loans.",
    keywords: ["loan calculator", "personal loan", "car loan"],
    icon: Landmark,
  },
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "everyday",
    description: "Calculate Body Mass Index from height and weight.",
    keywords: ["bmi", "body mass index", "bmi calculator", "height weight"],
    icon: HeartPulse,
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    category: "math",
    description: "Work out the sale price and amount saved on a discounted item.",
    keywords: ["discount calculator", "sale price", "percent off"],
    icon: Percent,
  },
  {
    name: "Profit & Loss Calculator",
    slug: "profit-loss-calculator",
    category: "math",
    description: "Calculate profit or loss amount and percentage from cost and selling price.",
    keywords: ["profit loss calculator", "cost price", "selling price", "margin"],
    icon: TrendingUp,
  },
  {
    name: "Ratio Calculator",
    slug: "ratio-calculator",
    category: "math",
    description: "Simplify ratios or scale them up and down proportionally.",
    keywords: ["ratio calculator", "simplify ratio", "proportion"],
    icon: Calculator,
  },
  {
    name: "Average Calculator",
    slug: "average-calculator",
    category: "math",
    description: "Find the mean, median and mode of a set of numbers.",
    keywords: ["average calculator", "mean median mode"],
    icon: Calculator,
  },
  {
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    category: "everyday",
    description: "Find the exact time between two dates in years, months and days.",
    keywords: ["date difference", "time between dates", "date calculator"],
    icon: Cake,
  },
  {
    name: "Days Between Dates",
    slug: "days-between-dates-calculator",
    category: "everyday",
    description: "Count the exact number of days between two calendar dates.",
    keywords: ["days between dates", "day counter"],
    icon: Cake,
  },
  {
    name: "Time Duration Calculator",
    slug: "time-duration-calculator",
    category: "everyday",
    description: "Calculate the duration between two times, or add/subtract time.",
    keywords: ["time duration calculator", "time difference", "add subtract time"],
    icon: Cake,
  },
  {
    name: "CAGR Calculator",
    slug: "cagr-calculator",
    category: "finance",
    description: "Calculate the compound annual growth rate between a starting and ending value.",
    keywords: ["cagr calculator", "compound annual growth rate", "investment growth rate"],
    icon: TrendingUp,
  },
  // -- Next research-validated batch (see chat for demand notes) --
  {
    name: "RD Calculator",
    slug: "rd-calculator",
    category: "finance",
    description: "Calculate recurring deposit maturity value from monthly deposit, rate and tenure.",
    keywords: ["rd calculator", "recurring deposit calculator", "rd maturity"],
    icon: Coins,
    comingSoon: true,
  },
  {
    name: "Simple Interest Calculator",
    slug: "simple-interest-calculator",
    category: "finance",
    description: "Calculate simple interest on a loan or deposit, without compounding.",
    keywords: ["simple interest calculator", "si calculator", "interest on principal"],
    icon: Percent,
    comingSoon: true,
  },
  {
    name: "Paint Calculator",
    slug: "paint-calculator",
    category: "construction",
    description: "Estimate how much paint you need for a room based on wall area and coats.",
    keywords: ["paint calculator", "how much paint do i need", "wall paint estimator"],
    icon: Paintbrush,
    comingSoon: true,
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    category: "math",
    description: "Calculate your GPA from course grades and credit hours.",
    keywords: ["gpa calculator", "grade point average", "college gpa"],
    icon: GraduationCap,
    comingSoon: true,
  },
];

export const liveCalculators = calculators.filter((c) => !c.comingSoon);

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorMeta[] {
  return calculators.filter((c) => c.category === category);
}

/** Related calculators for a given slug — small, curated map so links stay meaningful. */
const RELATED: Record<string, string[]> = {
  "sip-calculator": ["lumpsum-calculator", "compound-interest-calculator", "fd-calculator", "emi-calculator", "cagr-calculator"],
  "emi-calculator": ["loan-calculator", "sip-calculator", "compound-interest-calculator", "fd-calculator", "lumpsum-calculator"],
  "percentage-calculator": ["discount-calculator", "profit-loss-calculator", "gst-calculator", "ratio-calculator", "average-calculator"],
  "age-calculator": ["date-difference-calculator", "days-between-dates-calculator", "time-duration-calculator", "bmi-calculator", "percentage-calculator"],
  "normal-calculator": ["percentage-calculator", "average-calculator", "age-calculator"],
  "gst-calculator": ["percentage-calculator", "discount-calculator", "profit-loss-calculator", "emi-calculator"],
  "compound-interest-calculator": ["fd-calculator", "sip-calculator", "lumpsum-calculator", "simple-interest-calculator"],
  "fd-calculator": ["rd-calculator", "compound-interest-calculator", "sip-calculator", "lumpsum-calculator"],
  "tile-calculator": ["concrete-calculator", "paint-calculator"],
  "concrete-calculator": ["tile-calculator", "paint-calculator"],
  "lumpsum-calculator": ["sip-calculator", "compound-interest-calculator", "fd-calculator", "cagr-calculator"],
  "loan-calculator": ["emi-calculator", "sip-calculator", "compound-interest-calculator", "fd-calculator"],
  "discount-calculator": ["percentage-calculator", "profit-loss-calculator", "gst-calculator", "average-calculator"],
  "average-calculator": ["percentage-calculator", "ratio-calculator", "gpa-calculator", "normal-calculator"],
  "bmi-calculator": ["age-calculator", "date-difference-calculator", "percentage-calculator"],
  "profit-loss-calculator": ["percentage-calculator", "discount-calculator", "gst-calculator", "ratio-calculator"],
  "ratio-calculator": ["percentage-calculator", "average-calculator", "profit-loss-calculator"],
  "date-difference-calculator": ["age-calculator", "days-between-dates-calculator", "time-duration-calculator"],
  "days-between-dates-calculator": ["date-difference-calculator", "age-calculator", "time-duration-calculator"],
  "time-duration-calculator": ["date-difference-calculator", "days-between-dates-calculator", "age-calculator"],
  "cagr-calculator": ["sip-calculator", "lumpsum-calculator", "compound-interest-calculator", "fd-calculator"],
};

export function getRelatedCalculators(slug: string): CalculatorMeta[] {
  const slugs = RELATED[slug] ?? [];
  return slugs
    .map((s) => getCalculatorBySlug(s))
    .filter((c): c is CalculatorMeta => Boolean(c));
}

/** Very small, dependency-free fuzzy-ish search over name/keywords/description. */
export function searchCalculators(query: string): CalculatorMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return calculators
    .map((calc) => ({ calc, score: scoreMatch(calc, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.calc);
}

function scoreMatch(calc: CalculatorMeta, q: string): number {
  const name = calc.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;

  for (const kw of calc.keywords) {
    const k = kw.toLowerCase();
    if (k === q) return 55;
    if (k.startsWith(q)) return 45;
    if (k.includes(q)) return 30;
  }

  if (calc.description.toLowerCase().includes(q)) return 10;
  return 0;
}
