// SIP (Systematic Investment Plan) calculation engine.
// All functions are pure and deterministic so they can be unit tested
// independently of any UI.

export type ContributionTiming = "start" | "end";
export type StepUpMode = "none" | "percent" | "fixed";

export interface SipInput {
  monthlyAmount: number;
  annualReturnPercent: number;
  years: number;
  /** Optional lump-sum invested on day one, grows for the full duration. */
  initialLumpSum?: number;
  stepUp?: {
    mode: StepUpMode;
    /** Percentage step-up per year (e.g. 10 for 10%) */
    percent?: number;
    /** Fixed rupee/currency increase applied each year */
    fixedAmount?: number;
  };
  timing?: ContributionTiming;
  inflationPercent?: number;
}

export interface YearRow {
  year: number;
  annualInvestment: number;
  cumulativeInvestment: number;
  yearEndValue: number;
  estimatedGrowth: number;
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  inflationAdjustedValue: number | null;
  yearly: YearRow[];
}

/** Converts an annual effective return into an equivalent monthly rate. */
export function annualToMonthlyRate(annualPercent: number): number {
  const annualRate = annualPercent / 100;
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

function monthlyContributionForYear(input: SipInput, year: number): number {
  const stepUp = input.stepUp;
  if (!stepUp || stepUp.mode === "none") return input.monthlyAmount;

  if (stepUp.mode === "percent") {
    const pct = stepUp.percent ?? 0;
    return input.monthlyAmount * Math.pow(1 + pct / 100, year - 1);
  }

  // fixed increase per year
  const fixed = stepUp.fixedAmount ?? 0;
  return input.monthlyAmount + fixed * (year - 1);
}

export function calculateSip(input: SipInput): SipResult {
  if (input.monthlyAmount < 0) throw new Error("Monthly amount cannot be negative.");
  if (input.years <= 0) throw new Error("Duration must be greater than zero.");
  if (input.annualReturnPercent < 0) throw new Error("Expected return cannot be negative.");

  const monthlyRate = annualToMonthlyRate(input.annualReturnPercent);
  const timing = input.timing ?? "end";
  const totalMonths = Math.round(input.years * 12);

  let balance = input.initialLumpSum ?? 0;
  let totalInvested = balance;

  const yearly: YearRow[] = [];
  let yearInvested = 0;
  let currentYear = 1;

  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / 12);
    const contribution = monthlyContributionForYear(input, year);

    if (timing === "start") {
      balance += contribution;
      balance *= 1 + monthlyRate;
    } else {
      balance *= 1 + monthlyRate;
      balance += contribution;
    }

    totalInvested += contribution;
    yearInvested += contribution;

    const isYearEnd = month % 12 === 0 || month === totalMonths;
    if (isYearEnd) {
      yearly.push({
        year: currentYear,
        annualInvestment: round2(yearInvested),
        cumulativeInvestment: round2(totalInvested),
        yearEndValue: round2(balance),
        estimatedGrowth: round2(balance - totalInvested),
      });
      yearInvested = 0;
      currentYear++;
    }
  }

  const futureValue = round2(balance);
  const estimatedReturns = round2(futureValue - totalInvested);

  let inflationAdjustedValue: number | null = null;
  if (input.inflationPercent && input.inflationPercent > 0) {
    inflationAdjustedValue = round2(
      futureValue / Math.pow(1 + input.inflationPercent / 100, input.years)
    );
  }

  return {
    totalInvested: round2(totalInvested),
    estimatedReturns,
    futureValue,
    inflationAdjustedValue,
    yearly,
  };
}

/** Approximates the monthly SIP required to reach a target corpus. */
export function calculateRequiredSip(params: {
  targetAmount: number;
  years: number;
  annualReturnPercent: number;
  timing?: ContributionTiming;
}): number {
  const { targetAmount, years, annualReturnPercent } = params;
  if (targetAmount <= 0) throw new Error("Target amount must be greater than zero.");
  if (years <= 0) throw new Error("Duration must be greater than zero.");

  const monthlyRate = annualToMonthlyRate(annualReturnPercent);
  const n = Math.round(years * 12);
  const timing = params.timing ?? "end";

  if (monthlyRate === 0) {
    return round2(targetAmount / n);
  }

  const factor =
    ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (timing === "start" ? 1 + monthlyRate : 1);

  return round2(targetAmount / factor);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
