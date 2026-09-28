import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { GstCalculatorApp } from "@/components/calculator/apps/GstCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("gst-calculator")!;
const title = "GST Calculator – Add or Remove GST Online";
const description =
  "Add GST to a base amount or extract GST from a GST-inclusive price, at any slab rate (5%, 12%, 18%, 28% or custom). Includes a CGST/SGST breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/gst-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/gst-calculator") },
  twitter: { title, description },
};

export default function GstCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Add GST on top of a price, or work out the base price and GST hidden inside a GST-inclusive amount."
    >
      <GstCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the GST Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Choose <strong className="text-ink">Add GST</strong> if your amount excludes tax, or <strong className="text-ink">Remove GST</strong> if it already includes tax.</li>
            <li>Enter the amount.</li>
            <li>Enter the GST rate, or pick a common slab rate (5%, 12%, 18%, 28%).</li>
            <li>See the base amount, GST amount, total, and the CGST/SGST split instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a GST calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A GST calculator works out the Goods and Services Tax on a price, either by adding tax to a
            tax-free amount or by extracting the tax already built into a GST-inclusive price. It also
            splits that tax into CGST and SGST, matching how GST is typically shown on an Indian invoice
            for a sale within the same state.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Adding GST simply multiplies the base amount by the tax rate and adds it on top. Removing GST
            works backward: since the inclusive amount already equals the base plus tax, dividing it by
            (1 + rate) recovers the original base amount, and the difference between the two is the GST.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <ul className="mt-2 space-y-2 text-ink-soft">
            <li>
              <strong className="text-ink">Adding GST:</strong>{" "}
              <code className="tabular-nums">GST amount = Base × (rate ÷ 100)</code>
            </li>
            <li>
              <strong className="text-ink">Removing GST:</strong>{" "}
              <code className="tabular-nums">Base = Total / (1 + rate / 100)</code>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A product priced at ₹1,000 (before GST) at 18% GST costs ₹1,180 after tax — made
            up of ₹90 CGST and ₹90 SGST for an intra-state sale.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Base amount</strong> is the price before tax.</li>
            <li><strong className="text-ink">GST amount</strong> is the total tax charged.</li>
            <li><strong className="text-ink">CGST + SGST</strong> is the GST amount split equally, as shown on an intra-state invoice.</li>
            <li><strong className="text-ink">Total amount</strong> is what the customer actually pays.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends entirely on the GST rate that applies to the specific goods or service, and
            on whether the amount you enter already includes tax or not. Getting either of these wrong is
            the most common source of an incorrect result.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Small business owners use this to quickly quote GST-inclusive prices to customers, freelancers
            use it to work out GST on an invoice, and shoppers use it to check how much tax is included in
            a receipt or price tag.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator shows a standard CGST/SGST split, which applies to sales within the same
            state. For inter-state sales, the full amount is charged as IGST instead. Always confirm the
            applicable GST rate for your specific goods or services, as rates vary by category.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a GST calculator used for?",
              answer:
                "It's used to quickly add or remove Goods and Services Tax from a price, so you can quote GST-inclusive prices, check an invoice, or work out how much tax is embedded in a receipt.",
            },
            {
              question: "What GST rates are available?",
              answer: "Common slab rates of 5%, 12%, 18% and 28% are provided as quick presets, and you can enter any custom rate.",
            },
            {
              question: "What's the difference between CGST, SGST and IGST?",
              answer:
                "For sales within the same state, GST is split equally between CGST (central) and SGST (state). For sales between different states, the full amount is charged as IGST (integrated GST) instead.",
            },
            {
              question: "How do I know if my amount already includes GST?",
              answer:
                "If you're quoting a price to a customer and haven't added tax yet, use Add GST. If you have a final invoice or receipt total that already includes tax, use Remove GST to see the breakdown.",
            },
            {
              question: "Does this work for any product or service category?",
              answer:
                "Yes, as long as you know the correct GST rate for that category — the calculator itself works the same way regardless of what's being taxed.",
            },
            {
              question: "Is the CGST/SGST split always exactly equal?",
              answer: "Yes, for intra-state supply the total GST amount is always split 50/50 between CGST and SGST under the current GST structure.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
