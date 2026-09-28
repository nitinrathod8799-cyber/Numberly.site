import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { ProfitLossCalculatorApp } from "@/components/calculator/apps/ProfitLossCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("profit-loss-calculator")!;
const title = "Profit & Loss Calculator – Find Profit or Loss %";
const description =
  "Calculate profit or loss amount and percentage from a cost price and selling price — instantly, with a clear breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/profit-loss-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/profit-loss-calculator") },
  twitter: { title, description },
};

export default function ProfitLossCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a cost price and selling price to see whether it's a profit or a loss, and by how much."
    >
      <ProfitLossCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Profit & Loss Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the cost price (what the item cost you).</li>
            <li>Enter the selling price (what it sold for).</li>
            <li>See instantly whether it&rsquo;s a profit or a loss, the amount, and the percentage.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a profit & loss calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A profit and loss calculator compares what something cost against what it sold for, to show
            whether the sale made money or lost money, both as a rupee amount and as a percentage of the
            cost price.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            If the selling price is higher than the cost price, the difference is profit. If it&rsquo;s
            lower, the difference is a loss. Either way, that difference is then expressed as a percentage
            of the original cost price, so results are comparable across items of different prices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <ul className="mt-2 space-y-2 text-ink-soft">
            <li><strong className="text-ink">Profit/Loss amount:</strong> <code className="tabular-nums">Selling price &minus; Cost price</code></li>
            <li><strong className="text-ink">Profit/Loss %:</strong> <code className="tabular-nums">(Amount &divide; Cost price) &times; 100</code></li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An item bought for ₹500 and sold for ₹650 makes a profit of ₹150, which is a 30% profit on
            cost.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The percentage shown is always relative to the cost price, not the selling price — this is
            the standard convention for profit/loss percentage in business and trade.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends only on the two prices entered. It doesn&rsquo;t include other costs like
            shipping, marketplace fees or taxes — for a true net profit, subtract those from the
            selling price first.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Resellers and small business owners use this to check margins on individual sales, students use
            it for commercial maths problems, and shoppers use it to understand markup on resale items.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator shows gross profit/loss on a single item only, before accounting for overheads,
            taxes or other business expenses.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a profit and loss calculator used for?",
              answer: "It's used to quickly find how much profit or loss was made on a sale, and what percentage that represents of the original cost.",
            },
            {
              question: "Is profit percentage calculated on cost price or selling price?",
              answer: "By standard convention, profit and loss percentage is calculated on the cost price, not the selling price.",
            },
            {
              question: "What does it mean if cost price equals selling price?",
              answer: "That's a break-even sale — no profit, no loss.",
            },
            {
              question: "Does this include taxes or fees?",
              answer: "No, this calculates gross profit/loss on the two prices entered only. Subtract any additional costs from the selling price first for a net figure.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
