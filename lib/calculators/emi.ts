export interface EmiInput {
  principal: number;
  annualRatePercent: number;
  tenureYears: number;
  tenureMonthsExtra?: number; // additional months beyond full years, 0-11
}

export interface EmiYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalPrincipal: number;
  totalInterest: number;
  totalPayment: number;
  yearly: EmiYearRow[];
}

export function calculateEmi(input: EmiInput): EmiResult {
  const { principal, annualRatePercent, tenureYears } = input;
  const extraMonths = input.tenureMonthsExtra ?? 0;

  if (principal <= 0) throw new Error("Loan amount must be greater than zero.");
  if (annualRatePercent < 0) throw new Error("Interest rate cannot be negative.");
  if (tenureYears <= 0 && extraMonths <= 0) throw new Error("Tenure must be greater than zero.");

  const totalMonths = Math.round(tenureYears * 12) + extraMonths;
  const monthlyRate = annualRatePercent / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }
  emi = round2(emi);

  let balance = principal;
  const yearly: EmiYearRow[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;
  let totalInterestPaid = 0;

  for (let month = 1; month <= totalMonths; month++) {
    const interestForMonth = balance * monthlyRate;
    let principalForMonth = emi - interestForMonth;

    // Last installment: settle any rounding drift against the exact balance.
    if (month === totalMonths) {
      principalForMonth = balance;
    }

    balance = Math.max(0, balance - principalForMonth);
    yearPrincipal += principalForMonth;
    yearInterest += interestForMonth;
    totalInterestPaid += interestForMonth;

    if (month % 12 === 0 || month === totalMonths) {
      yearly.push({
        year: currentYear,
        principalPaid: round2(yearPrincipal),
        interestPaid: round2(yearInterest),
        balance: round2(balance),
      });
      yearPrincipal = 0;
      yearInterest = 0;
      currentYear++;
    }
  }

  const totalPayment = round2(principal + totalInterestPaid);

  return {
    monthlyEmi: emi,
    totalPrincipal: round2(principal),
    totalInterest: round2(totalInterestPaid),
    totalPayment,
    yearly,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
