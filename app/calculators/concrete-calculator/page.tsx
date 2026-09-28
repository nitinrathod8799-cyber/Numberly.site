import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { ConcreteCalculatorApp } from "@/components/calculator/apps/ConcreteCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("concrete-calculator")!;
const title = "Concrete Calculator – Volume & Cement Bags Needed";
const description =
  "Calculate concrete volume for slabs and footings from length, width and depth, plus estimated cement bags, sand and aggregate for M15, M20 or M25 mixes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/concrete-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/concrete-calculator") },
  twitter: { title, description },
};

export default function ConcreteCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter slab dimensions and a mix grade to estimate concrete volume, cement bags, sand and aggregate needed."
    >
      <ConcreteCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Concrete Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter the length, width and depth of your slab in feet.</li>
            <li>Choose a mix grade (M15, M20 or M25) based on your structural requirement.</li>
            <li>See the wet volume, and estimated cement bags, sand and aggregate needed.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a concrete calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A concrete calculator estimates the volume of concrete needed for a slab, footing or similar
            structure, and breaks that volume down into the raw materials — cement, sand and
            aggregate (stone) — required to mix it, based on a standard mix ratio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How it works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            First, we work out the space your slab will fill: length &times; width &times; depth. Cement,
            sand and stone (aggregate) take up more room as loose, dry materials than they do once mixed
            and set, so we scale that number up by 54% to estimate how much raw material to buy. That
            total is then split between cement, sand and aggregate using the ratio for your chosen mix
            grade.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Wet volume = length &times; width &times; depth. Dry volume = wet volume &times; 1.54. Each
            material&rsquo;s volume = dry volume &times; (its ratio number &divide; sum of all ratio
            numbers). Cement bags = cement volume &times; 1440 kg/m&#179; &divide; 50 kg per bag.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A 10 &times; 10 ft slab, 4 inches (0.33 ft) deep, using an M20 mix (1:1.5:3), needs roughly 33
            cubic feet of wet concrete, about 8 cement bags, plus proportional sand and aggregate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Wet volume</strong> is the actual space your finished, set concrete will occupy.</li>
            <li><strong className="text-ink">Cement bags</strong> assumes standard 50 kg bags at typical cement density.</li>
            <li><strong className="text-ink">Sand and aggregate</strong> are shown in cubic metres, ready to relay to your supplier.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Which mix grade should I choose?</h2>
          <ul className="mt-2 space-y-1.5 text-ink-soft">
            <li><strong className="text-ink">M15</strong> &mdash; a leaner mix, fine for non-load-bearing work like flooring base or footpaths.</li>
            <li><strong className="text-ink">M20</strong> &mdash; the most common choice for house slabs, beams and columns.</li>
            <li><strong className="text-ink">M25</strong> &mdash; a stronger mix for heavier structural work.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator helps homeowners and site supervisors budget material quantities for a slab,
            footing or driveway pour before placing an order with a supplier, and compare material cost
            across different mix grades.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This is a planning-level estimate using standard ratios and a fixed cement density. Real-world
            material needs vary with aggregate size, moisture content and site conditions — always
            confirm final quantities with a structural engineer or contractor for load-bearing work.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a concrete calculator used for?",
              answer:
                "It's used to estimate how much concrete — and how many bags of cement, plus sand and aggregate — you'll need for a slab, footing or similar pour before ordering materials.",
            },
            {
              question: "Why is the dry volume more than the wet volume?",
              answer:
                "Dry materials like sand and aggregate have air gaps between particles before mixing, so they take up roughly 54% more volume than the final compacted wet concrete — hence the 1.54× factor.",
            },
            {
              question: "Which mix grade should I use?",
              answer:
                "This depends on the structural requirement of your project. For load-bearing structural work, consult a structural engineer rather than relying solely on this calculator.",
            },
            {
              question: "How many kg is one bag of cement?",
              answer: "This calculator assumes the standard 50 kg cement bag used across India.",
            },
            {
              question: "Does this calculator account for reinforcement (steel)?",
              answer:
                "No, this estimates concrete materials only — cement, sand and aggregate. Steel reinforcement quantities need a separate calculation based on your structural design.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
