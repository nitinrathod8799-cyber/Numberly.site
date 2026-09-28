import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { PercentageCalculatorApp } from "@/components/calculator/apps/PercentageCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("percentage-calculator")!;
const title = "Percentage Calculator – Calculate Percentages Online";
const description =
  "Find what X% of Y is, what percentage X is of Y, or the percentage increase/decrease between two numbers — three common percentage calculations in one free tool.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/percentage-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/percentage-calculator") },
  twitter: { title, description },
};

export default function PercentageCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Three of the most common percentage questions, answered instantly — no need to visit three different pages."
    >
      <PercentageCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Percentage Calculator</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Pick the card that matches your question. Type your numbers into the two fields in that card
            and the result updates instantly &mdash; there&rsquo;s no separate calculate button and no need
            to reload the page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a percentage calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A percentage calculator handles the three questions people ask about percentages most often:
            finding a percentage of a number, finding what percentage one number is of another, and finding
            how much a number has increased or decreased in percentage terms. This tool covers all three on
            a single page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How each calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Every percentage calculation ultimately reduces to a simple ratio. &ldquo;X% of Y&rdquo; scales Y
            down by X out of 100. &ldquo;X is what % of Y&rdquo; turns the ratio X/Y into a percentage.
            &ldquo;Percentage change&rdquo; compares the gap between two numbers to the original number, to
            express that gap as a percentage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formulas</h2>
          <ul className="mt-2 space-y-2 text-ink-soft">
            <li>
              <strong className="text-ink">X% of Y:</strong> <code className="tabular-nums">(X ÷ 100) × Y</code>
            </li>
            <li>
              <strong className="text-ink">X is what % of Y:</strong>{" "}
              <code className="tabular-nums">(X ÷ Y) × 100</code>
            </li>
            <li>
              <strong className="text-ink">Percentage change:</strong>{" "}
              <code className="tabular-nums">((New − Original) ÷ Original) × 100</code>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A product&rsquo;s price rises from ₹500 to ₹600. The change is{" "}
            <code className="tabular-nums">((600 − 500) ÷ 500) × 100 = 20%</code>, so the price
            increased by 20%.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A positive percentage change means the new value is higher than the original; a negative result
            means it&rsquo;s lower. For &ldquo;X% of Y&rdquo;, the result is a plain number in the same units
            as Y (for example, rupees of a price, or marks out of a total).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            These are pure arithmetic calculations, so the result depends only on the numbers you enter.
            The one thing to double-check is which number is the &ldquo;original&rdquo; and which is the
            &ldquo;new&rdquo; value in the increase/decrease card &mdash; swapping them flips the sign of
            the result.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this calculator for working out discounts and sale prices, checking exam or survey
            scores, comparing a salary hike or price rise year-on-year, splitting a bill with a tip
            percentage, or verifying a GST-style tax calculation by hand.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            All three calculators accept negative numbers where mathematically valid, and the &ldquo;of
            value&rdquo; in card two cannot be zero, since dividing by zero has no defined percentage.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a percentage calculator used for?",
              answer:
                "It's used for any quick percentage math — discounts, tax, score conversions, salary or price changes — without doing the arithmetic by hand.",
            },
            {
              question: "How do I calculate what X% of Y is?",
              answer: "Divide X by 100, then multiply by Y. For example, 25% of 500 is (25 ÷ 100) × 500 = 125.",
            },
            {
              question: "How do I find what percentage one number is of another?",
              answer: "Divide the first number by the second, then multiply by 100. For example, 50 out of 200 is (50 ÷ 200) × 100 = 25%.",
            },
            {
              question: "What's the difference between percentage and percentage points?",
              answer:
                "A percentage change is relative to the original value (e.g. 500 → 600 is a 20% increase). Percentage points are a simple difference between two percentages (e.g. 40% → 50% is a 10-point increase, but a 25% relative increase).",
            },
            {
              question: "Can I use negative numbers?",
              answer: "Yes, all three calculators accept negative values where mathematically valid.",
            },
            {
              question: "Why can't the 'of value' be zero?",
              answer: "Dividing by zero doesn't produce a defined result, so the second calculator needs a non-zero denominator to work.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
