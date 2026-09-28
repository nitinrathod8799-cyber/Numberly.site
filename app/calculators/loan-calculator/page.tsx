import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { LoanCalculatorApp } from "@/components/calculator/apps/LoanCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("loan-calculator")!;
const title = "Loan Calculator – Monthly Payment for Any Loan";
const description =
  "Calculate the monthly payment, total interest and total repayment for a personal, car, home or other instalment loan, with a year-wise breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/loan-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/loan-calculator") },
  twitter: { title, description },
};

export default function LoanCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a loan amount, interest rate and tenure to see the monthly payment, total interest and total repayment — for any type of instalment loan."
    >
      <LoanCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Loan Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Choose the loan type that best matches yours — this only affects labelling, not the math.</li>
            <li>Enter the loan amount, interest rate and tenure.</li>
            <li>See the monthly payment, total interest and total repayment instantly, with a year-wise schedule.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a loan calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A loan calculator works out the fixed monthly payment on an instalment loan — personal,
            car, home or otherwise — based on the amount borrowed, the interest rate, and the
            repayment period. Most instalment loans use the same underlying repayment structure, so one
            calculator can handle all of them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Each monthly payment covers that month&rsquo;s interest first, and the remainder reduces your
            outstanding balance. As the balance shrinks, less of each future payment goes to interest and
            more goes to principal — while the payment amount itself stays fixed for the full tenure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">
            Payment = [P &times; R &times; (1+R)^N] / [(1+R)^N &minus; 1]
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Where <strong className="text-ink">P</strong> is the loan amount, <strong className="text-ink">R</strong> is the
            monthly interest rate, and <strong className="text-ink">N</strong> is the number of monthly payments — the
            same formula used by the EMI Calculator.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A ₹3,00,000 personal loan at 11% annual interest over 5 years results in a monthly payment of
            roughly ₹6,523, with total interest of about ₹91,364 over the loan term.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Monthly payment</strong> is the fixed instalment you&rsquo;d pay every month.</li>
            <li><strong className="text-ink">Total interest</strong> is the extra cost of borrowing, on top of the principal.</li>
            <li><strong className="text-ink">Total payment</strong> is the true all-in cost of the loan.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Interest rate</strong> — personal loans typically carry higher rates than secured loans like home or car loans.</li>
            <li><strong className="text-ink">Tenure</strong> — longer tenures lower the monthly payment but increase total interest.</li>
            <li><strong className="text-ink">Loan amount</strong> scales the payment roughly proportionally.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Borrowers use this calculator to compare monthly affordability across personal, car and other
            loan offers, and to see how tenure trades off against total interest before committing to a
            loan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator assumes a fixed interest rate for the full tenure and doesn&rsquo;t include
            processing fees or other charges. For a home loan specifically, larger amounts and longer
            tenures are common — always confirm final terms with your lender.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a loan calculator used for?",
              answer:
                "It's used to estimate the monthly payment, total interest and total cost of any instalment loan — personal, car, home or otherwise — before you borrow.",
            },
            {
              question: "Is this the same as the EMI Calculator?",
              answer:
                "Yes, they use the identical formula. This calculator is framed more generally for any loan type, with a loan-type selector for clarity.",
            },
            {
              question: "Why do personal loans have higher interest rates than home loans?",
              answer:
                "Personal loans are usually unsecured (no collateral), so lenders charge a higher rate to offset their added risk compared to a secured loan like a home or car loan.",
            },
            {
              question: "Does a shorter tenure always save money?",
              answer:
                "In total interest, yes — a shorter tenure means less time for interest to accrue, though it also means a higher monthly payment.",
            },
            {
              question: "What information do I need to use this calculator?",
              answer: "Just the loan amount, the annual interest rate, and the tenure in years.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
