export type CompoundingFrequency = "annually" | "semi-annually" | "quarterly" | "monthly";

const PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
};

export interface CompoundInterestInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  frequency: CompoundingFrequency;
}

export interface CompoundInterestYearRow {
  year: number;
  openingBalance: number;
  interestEarned: number;
  closingBalance: number;
}

export interface CompoundInterestResult {
  principal: number;
  maturityAmount: number;
  interestEarned: number;
  yearly: CompoundInterestYearRow[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, annualRatePercent, years, frequency } = input;
  if (principal <= 0) throw new Error("Principal must be greater than zero.");
  if (annualRatePercent < 0) throw new Error("Interest rate cannot be negative.");
  if (years <= 0) throw new Error("Duration must be greater than zero.");

  const n = PERIODS_PER_YEAR[frequency];
  const ratePerPeriod = annualRatePercent / 100 / n;

  const yearly: CompoundInterestYearRow[] = [];
  let balance = principal;

  for (let year = 1; year <= Math.ceil(years); year++) {
    const opening = balance;
    // For a partial final year (e.g. 4.5 years), only compound the remaining fraction.
    const periodsThisYear = year <= Math.floor(years) ? n : Math.round((years - Math.floor(years)) * n);
    balance = opening * Math.pow(1 + ratePerPeriod, periodsThisYear);

    yearly.push({
      year,
      openingBalance: round2(opening),
      interestEarned: round2(balance - opening),
      closingBalance: round2(balance),
    });

    if (periodsThisYear === 0) break;
  }

  const maturityAmount = round2(balance);

  return {
    principal: round2(principal),
    maturityAmount,
    interestEarned: round2(maturityAmount - principal),
    yearly,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
