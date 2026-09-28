import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { LumpsumCalculatorApp } from "@/components/calculator/apps/LumpsumCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("lumpsum-calculator")!;
const title = "Lumpsum Calculator – Estimate Investment Growth";
const description =
  "Project the future value of a one-time lump-sum investment from the amount, expected annual return and duration, with a year-wise growth breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/lumpsum-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/lumpsum-calculator") },
  twitter: { title, description },
};

export default function LumpsumCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a one-time investment amount, expected return and duration to see its projected future value."
    >
      <LumpsumCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Lumpsum Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the amount you plan to invest in one go.</li>
            <li>Enter an expected annual return — your own assumption, not a promised rate.</li>
            <li>Set how many years the money will stay invested.</li>
            <li>See the maturity value, invested amount and estimated returns instantly, with a year-wise breakdown.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a lumpsum calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A lumpsum calculator projects how a single, upfront investment — rather than a series of
            monthly contributions — could grow over time at an assumed rate of return. It&rsquo;s the
            natural counterpart to a SIP calculator: SIP spreads investment out over time, while lumpsum
            puts it all in on day one.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Because there&rsquo;s only one contribution, the whole amount compounds from day one at your
            expected annual return, for the full duration you enter. Each year&rsquo;s growth is added back
            to the balance before the next year&rsquo;s growth is calculated.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">FV = P × (1 + r)^t</p>
          <p className="mt-2 text-sm text-ink-soft">
            Where <strong className="text-ink">P</strong> is your lumpsum investment, <strong className="text-ink">r</strong> is
            the annual return rate, and <strong className="text-ink">t</strong> is the number of years invested.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            ₹1,00,000 invested as a lumpsum at an assumed 12% annual return for 10 years grows to
            approximately ₹3,10,585 — about ₹2,10,585 of that is estimated growth.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Invested amount</strong> is simply the lumpsum you put in.</li>
            <li><strong className="text-ink">Estimated returns</strong> is the growth on top of that, driven by compounding.</li>
            <li><strong className="text-ink">Maturity value</strong> is both combined — what your investment could be worth at the end of the period.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Duration</strong> has an outsized effect — compounding needs time to work.</li>
            <li><strong className="text-ink">Return rate</strong> directly scales the outcome, especially over longer periods.</li>
            <li>Unlike a SIP, there&rsquo;s no rupee-cost averaging — the full amount is exposed to the market from day one.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this calculator to project the growth of a bonus, inheritance, maturity payout from
            another investment, or any other one-time sum, and to compare a lumpsum strategy against a SIP
            for the same total amount.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Return assumptions are inputs you control, never a promise of what an investment will deliver.
            Real markets don&rsquo;t grow at a smooth, constant rate every year — this calculator shows
            a simplified projection for planning purposes, not a forecast.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a lumpsum calculator used for?",
              answer:
                "It's used to project how a one-time investment could grow over time, so you can plan around a bonus, inheritance or other lump sum before investing it.",
            },
            {
              question: "What's the difference between SIP and lumpsum investing?",
              answer:
                "SIP spreads your investment across regular monthly contributions, which averages out market ups and downs. Lumpsum invests everything at once, so the entire amount is exposed to the market from day one.",
            },
            {
              question: "Are lumpsum returns guaranteed?",
              answer:
                "No. The return rate you enter is an assumption for planning purposes, not a guarantee. Actual market-linked returns vary and are never certain.",
            },
            {
              question: "Which is better — SIP or lumpsum?",
              answer:
                "It depends on your situation. Lumpsum can work well when you have a large sum and markets are reasonably valued; SIP is often considered steadier for ongoing income and uncertain markets. Neither is universally better.",
            },
            {
              question: "Does this account for taxes on investment gains?",
              answer: "No, this calculator shows only the pre-tax projected growth. Actual take-home returns depend on applicable capital gains tax rules.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
