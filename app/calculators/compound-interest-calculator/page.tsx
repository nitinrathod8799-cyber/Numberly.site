import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { CompoundInterestCalculatorApp } from "@/components/calculator/apps/CompoundInterestCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("compound-interest-calculator")!;
const title = "Compound Interest Calculator – See Your Money Grow";
const description =
  "Calculate compound interest on a lump-sum investment with annual, semi-annual, quarterly or monthly compounding, plus maturity amount and a year-wise growth breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/compound-interest-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/compound-interest-calculator") },
  twitter: { title, description },
};

export default function CompoundInterestCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="See how a lump-sum investment grows over time as interest compounds — choose how often it compounds."
    >
      <CompoundInterestCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Compound Interest Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the principal amount you&rsquo;re starting with.</li>
            <li>Enter the annual interest rate.</li>
            <li>Enter the time period in years.</li>
            <li>Choose how often interest compounds: annually, semi-annually, quarterly, or monthly.</li>
            <li>See the maturity amount, principal and interest earned instantly, plus a year-wise breakdown.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a compound interest calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A compound interest calculator projects how a one-time (lump-sum) investment grows when
            interest is added back to the balance at regular intervals, rather than paid out separately.
            Because each round of interest is calculated on a growing balance, the growth curve gets
            steeper the longer the money stays invested.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How compounding grows your money</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Each time interest is added, it becomes part of your balance &mdash; so the next round of
            interest is calculated on a slightly bigger amount. That&rsquo;s why compounding more often
            (say, monthly instead of yearly) adds up to a little more over time, even at the same interest
            rate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">A = P (1 + r/n)^(n×t)</p>
          <p className="mt-2 text-sm text-ink-soft">
            Where <strong className="text-ink">P</strong> is the amount you start with, <strong className="text-ink">r</strong> is
            the annual interest rate, <strong className="text-ink">n</strong> is how many times a year interest is added, and{" "}
            <strong className="text-ink">t</strong> is the number of years.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            ₹1,00,000 invested at 10% annual interest, compounded annually for 2 years, grows to
            ₹1,21,000 — ₹21,000 in interest.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Maturity amount</strong> is your principal plus all compounded interest combined.</li>
            <li><strong className="text-ink">Interest earned</strong> is the growth on top of your original investment.</li>
            <li>The <strong className="text-ink">year-wise table</strong> shows the opening balance, interest earned and closing balance for each year.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Interest rate</strong> directly scales how fast your money grows.</li>
            <li><strong className="text-ink">Time</strong> has an outsized effect since compounding accelerates the longer money stays invested.</li>
            <li><strong className="text-ink">Compounding frequency</strong> has a smaller but real effect — more frequent compounding means slightly higher returns.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator is used to compare how different compounding frequencies affect the same
            investment, estimate the growth of savings or a lump-sum bonus, or double-check figures from a
            bank or investment product before committing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This is a mathematical projection based on a fixed rate you enter. It doesn&rsquo;t account for
            taxes on interest, fees, or the fact that real investment returns (other than bank deposits)
            typically vary year to year rather than staying constant.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a compound interest calculator used for?",
              answer:
                "It's used to project how a lump-sum investment or savings amount will grow over time as interest compounds, and to compare different rates, durations or compounding frequencies.",
            },
            {
              question: "What's the difference between this and the FD Calculator?",
              answer:
                "This calculator is general-purpose compound interest math. The FD Calculator uses the same engine with fixed-deposit-typical defaults (like quarterly compounding).",
            },
            {
              question: "Does compounding frequency matter much?",
              answer:
                "It has a modest effect — more frequent compounding slightly increases returns for the same annual rate, more noticeably at higher rates or over longer periods.",
            },
            {
              question: "What's the difference between simple interest and compound interest?",
              answer:
                "Simple interest is calculated only on the original principal every period. Compound interest is calculated on the principal plus any interest already earned, so it grows faster over time.",
            },
            {
              question: "Can I use this for a recurring investment instead of a lump sum?",
              answer:
                "No — this calculator assumes a single upfront amount. For regular monthly contributions, the SIP Calculator is the right tool.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
