import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { CagrCalculatorApp } from "@/components/calculator/apps/CagrCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("cagr-calculator")!;
const title = "CAGR Calculator – Compound Annual Growth Rate";
const description =
  "Calculate the Compound Annual Growth Rate (CAGR) between a beginning and ending value over a number of years.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/cagr-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/cagr-calculator") },
  twitter: { title, description },
};

export default function CagrCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a beginning value, ending value and number of years to find the annualised (CAGR) growth rate."
    >
      <CagrCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the CAGR Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the beginning value (what you started with).</li>
            <li>Enter the ending value (what it&rsquo;s worth now, or at the end of the period).</li>
            <li>Enter the number of years between the two.</li>
            <li>See the CAGR and total growth percentage instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a CAGR calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            CAGR (Compound Annual Growth Rate) calculates the single, steady annual growth rate that would
            take an investment from its beginning value to its ending value over a given period — even
            though the real year-to-year growth was almost certainly uneven. It&rsquo;s the standard way to
            compare investments fairly over different time periods.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            CAGR finds the constant annual rate that, if compounded every year for the full period, would
            turn the beginning value into the ending value — smoothing out the actual ups and downs
            into a single comparable number.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">
            CAGR = [(Ending value &divide; Beginning value)^(1 &divide; years) &minus; 1] &times; 100
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An investment that grows from ₹1,00,000 to ₹2,00,000 over 5 years has a CAGR of about 14.87%
            — even though actual year-to-year returns were likely uneven.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">CAGR</strong> is the smoothed, annualised growth rate — useful for comparing investments over different time periods.</li>
            <li><strong className="text-ink">Total growth</strong> is the simple overall percentage change from beginning to end, with no annualising.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            CAGR depends only on the beginning value, ending value and number of years — it deliberately
            ignores the path taken in between, which is both its strength (easy comparison) and its
            limitation (it hides volatility).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Investors use CAGR to compare the historical performance of different mutual funds, stocks or
            portfolios on a like-for-like annual basis, and to compare an investment&rsquo;s growth against
            a benchmark or inflation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            CAGR is a backward-looking, historical measure — it describes what happened, not what will
            happen next. It also smooths away volatility, so two investments with the same CAGR can have
            had very different, and very differently risky, journeys to get there.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is CAGR used for?",
              answer: "CAGR is used to express an investment's growth as a single, smoothed annual rate, making it easy to compare investments over different time periods.",
            },
            {
              question: "Is CAGR the same as the actual annual return each year?",
              answer: "No. CAGR is a smoothed average — actual year-to-year returns almost always vary, sometimes significantly, even when the CAGR looks steady.",
            },
            {
              question: "What's the difference between CAGR and total growth?",
              answer: "Total growth is the simple overall percentage change with no time-adjustment. CAGR annualises that growth, making it comparable across different holding periods.",
            },
            {
              question: "Can CAGR be negative?",
              answer: "Yes — if the ending value is lower than the beginning value, CAGR will be negative, representing an average annual decline.",
            },
            {
              question: "Does CAGR predict future returns?",
              answer: "No. CAGR is a historical, backward-looking calculation and does not predict or guarantee future performance.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
