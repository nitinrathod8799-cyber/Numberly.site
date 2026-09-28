import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { DiscountCalculatorApp } from "@/components/calculator/apps/DiscountCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("discount-calculator")!;
const title = "Discount Calculator – Find the Sale Price & Savings";
const description =
  "Calculate the final price and amount saved on a discounted item, including stacked (successive) discounts, from the original price and discount percentage.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/discount-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/discount-calculator") },
  twitter: { title, description },
};

export default function DiscountCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter the original price and a discount percentage to see the final price and how much you save — including stacked discounts."
    >
      <DiscountCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Discount Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the original price of the item.</li>
            <li>Enter the discount percentage, or pick a preset.</li>
            <li>
              If there&rsquo;s a second discount on top (like an extra coupon), check{" "}
              <strong className="text-ink">Add a second, stacked discount</strong> and enter it.
            </li>
            <li>See the final price, amount saved and effective discount instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a discount calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A discount calculator works out the sale price of an item after a percentage-off discount is
            applied, along with exactly how much money you save. It also handles stacked (successive)
            discounts — like &ldquo;30% off, then an extra 10% off&rdquo; — which don&rsquo;t simply
            add up to 40%.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The first discount is applied to the original price to get an intermediate price. If a second
            discount is added, it&rsquo;s applied to that already-discounted price, not the original —
            which is why two stacked discounts always add up to less than their sum (30% + 10% is a 37%
            effective discount, not 40%).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">
            Final price = Original price &times; (1 &minus; discount1/100) &times; (1 &minus; discount2/100)
          </p>
          <p className="mt-2 text-sm text-ink-soft">The second term is only applied when a second discount is entered.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A ₹1,000 item with 30% off costs ₹700. A further 10% off that ₹700 brings it to ₹630
            — an effective discount of 37%, not 40%.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Final price</strong> is what you&rsquo;d actually pay.</li>
            <li><strong className="text-ink">You save</strong> is the total rupee amount saved off the original price.</li>
            <li><strong className="text-ink">Effective discount</strong> is that saving expressed as a single percentage of the original price.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends only on the original price and the discount percentage(s) entered. Sales tax
            or shipping, if applicable, is typically calculated separately on top of the discounted price
            and isn&rsquo;t included here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Shoppers use this to quickly check the real price during a sale, compare deals across stores,
            or work out stacked discounts like a sale price plus a coupon code. Small business owners use it
            to plan promotional pricing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator doesn&rsquo;t include tax, shipping or other fees, which most retailers add
            after the discount. Discount percentages must be between 0 and 100%.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a discount calculator used for?",
              answer:
                "It's used to quickly find the sale price and total savings on a discounted item, including stacked discounts like a sale plus a coupon.",
            },
            {
              question: "How do I calculate 20% off a price?",
              answer: "Multiply the original price by 0.20 to find the discount amount, then subtract it from the original price. 20% off ₹50 saves ₹10, making the final price ₹40.",
            },
            {
              question: "Do two stacked discounts just add together?",
              answer:
                "No. A 30% discount followed by a 10% discount is not a 40% discount — the second discount applies to the already-reduced price, giving an effective discount of 37%.",
            },
            {
              question: "Does this include sales tax?",
              answer: "No, this calculator shows the discounted price only. Tax is usually applied separately, after the discount.",
            },
            {
              question: "What's the difference between a percentage discount and a fixed discount?",
              answer:
                "A percentage discount scales with the item's price (20% off a ₹2,000 item saves more than 20% off a ₹500 item). A fixed discount is a flat amount off, like ₹100 off, regardless of price.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
