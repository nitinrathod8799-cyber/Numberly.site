import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { EmiCalculatorApp } from "@/components/calculator/apps/EmiCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("emi-calculator")!;
const title = "EMI Calculator – Calculate Monthly Loan EMI";
const description =
  "Calculate monthly EMI, total interest and total repayment for a home, car or personal loan from the loan amount, interest rate and tenure, with a year-wise breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/emi-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/emi-calculator") },
  twitter: { title, description },
};

export default function EmiCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter your loan amount, interest rate and tenure to see the monthly EMI, total interest, and a year-by-year repayment schedule."
    >
      <EmiCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the EMI Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the loan amount you plan to borrow.</li>
            <li>Enter the annual interest rate your lender is offering.</li>
            <li>Set the loan tenure in years, or pick a preset.</li>
            <li>Your monthly EMI, total interest and total payment appear immediately, along with a chart and a year-wise repayment table.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is an EMI calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An EMI (Equated Monthly Instalment) calculator works out the fixed amount you&rsquo;d repay
            every month on a loan, given the amount borrowed, the interest rate, and how long you&rsquo;ll
            take to repay it. It&rsquo;s used for home loans, car loans and personal loans alike, since all
            of them typically use the same repayment structure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Every EMI payment covers that month&rsquo;s interest first, and whatever is left over reduces
            your loan balance. Because your outstanding balance keeps shrinking, the interest portion gets
            smaller and the principal portion gets bigger with each payment &mdash; but the total EMI you
            pay stays exactly the same every month, which is what makes it predictable. This is called
            amortization.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">
            EMI = [P &times; R &times; (1+R)^N] / [(1+R)^N &minus; 1]
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Where <strong className="text-ink">P</strong> is the loan amount, <strong className="text-ink">R</strong> is the
            monthly interest rate (annual rate &divide; 12 &divide; 100), and <strong className="text-ink">N</strong> is the
            total number of monthly payments.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A ₹10,00,000 loan at 8.5% annual interest over 10 years results in a monthly EMI of
            approximately ₹12,399, with total interest of about ₹4,87,828 over the loan term &mdash; a
            total repayment of roughly ₹14,87,828.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Monthly EMI</strong> is the fixed amount you&rsquo;d pay every month for the full tenure.</li>
            <li><strong className="text-ink">Total interest</strong> is the extra amount paid to the lender on top of what you borrowed.</li>
            <li><strong className="text-ink">Total payment</strong> is principal plus interest combined &mdash; the true cost of the loan.</li>
            <li>The <strong className="text-ink">year-wise table</strong> shows how the principal/interest split shifts as the loan matures.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect your EMI</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Interest rate</strong> has a direct effect on both the EMI amount and total interest paid.</li>
            <li><strong className="text-ink">Tenure</strong> works in opposite directions: a longer tenure lowers the EMI but raises total interest.</li>
            <li><strong className="text-ink">Loan amount</strong> scales the EMI roughly proportionally, all else being equal.</li>
            <li>A part-prepayment during the tenure (not modelled here) would reduce the outstanding balance and future interest.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Borrowers use this calculator to compare monthly affordability across different loan offers,
            decide between a shorter tenure (higher EMI, less total interest) and a longer one (lower EMI,
            more total interest), or estimate the impact of a rate change before applying for a home, car
            or personal loan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator assumes a fixed interest rate for the full tenure and does not include
            processing fees, insurance, prepayment charges or rate resets on floating-rate loans. Always
            confirm final figures with your bank before making a decision.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is an EMI calculator used for?",
              answer:
                "It estimates the fixed monthly payment on a loan — home, car or personal — so you can plan your budget and compare offers before borrowing.",
            },
            {
              question: "What information do I need to calculate EMI?",
              answer:
                "The loan amount, the annual interest rate your lender offers, and the loan tenure in years (or months) are all you need.",
            },
            {
              question: "Why does my EMI stay the same but the interest portion change?",
              answer:
                "Because interest is charged on your remaining balance each month. As you pay down the loan, the balance shrinks, so less of each fixed EMI goes to interest and more goes to principal over time.",
            },
            {
              question: "Does a longer tenure always cost more?",
              answer:
                "In total interest, usually yes — a longer tenure spreads the same loan over more months, which lowers the EMI but increases the total interest paid over the life of the loan.",
            },
            {
              question: "Does this include processing fees or other charges?",
              answer:
                "No, this shows only the principal and interest component of your EMI. Lenders may add processing fees, insurance or other charges separately.",
            },
            {
              question: "What if my loan has a floating interest rate?",
              answer:
                "This calculator assumes a fixed rate for simplicity. For a floating-rate loan, your actual EMI or tenure may change whenever the lender revises the interest rate.",
            },
            {
              question: "Can I use this for a car or personal loan, not just a home loan?",
              answer:
                "Yes — the same EMI formula applies to home, car, personal and most other instalment loans.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
