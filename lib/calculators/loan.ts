import { calculateEmi, type EmiInput, type EmiResult } from "./emi";

export type LoanType = "personal" | "car" | "home" | "other";

export interface LoanInput extends EmiInput {
  loanType?: LoanType;
}

/**
 * A general-purpose loan calculator. Personal, car, home and other
 * instalment loans all use the same reducing-balance EMI formula, so this
 * is a thin, semantically-named wrapper over the EMI engine — the
 * loanType is accepted for UI/labelling purposes but doesn't change the
 * math.
 */
export function calculateLoan(input: LoanInput): EmiResult {
  return calculateEmi(input);
}
