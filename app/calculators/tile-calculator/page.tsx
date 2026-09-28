import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { TileCalculatorApp } from "@/components/calculator/apps/TileCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("tile-calculator")!;
const title = "Tile Calculator – How Many Tiles Do I Need?";
const description =
  "Estimate the number of floor or wall tiles you need for a room, from room size and tile size, including a wastage allowance for cuts and breakage.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/tile-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/tile-calculator") },
  twitter: { title, description },
};

export default function TileCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter your room and tile dimensions to estimate how many tiles to buy, including a wastage allowance for cuts."
    >
      <TileCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Tile Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter your room&rsquo;s length and width in feet.</li>
            <li>Enter your tile&rsquo;s length and width in centimetres, or pick a common size preset.</li>
            <li>Set a wastage allowance for cuts and breakage (10% is a common default).</li>
            <li>See the room area, tile area and total tiles to buy instantly.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a tile calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A tile calculator estimates how many floor or wall tiles you need to cover a room, based on the
            room&rsquo;s area, the size of each tile, and an allowance for tiles lost to cutting around
            edges, corners and breakage during installation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The calculator divides your room&rsquo;s area by a single tile&rsquo;s area to get the exact
            number of tiles needed, then adds your wastage percentage to cover cuts, breakage and pattern
            matching, rounding up to a whole number of tiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A 12 × 10 ft room (120 sq ft) tiled with 60 × 60 cm tiles (about 3.87 sq ft each) needs
            roughly 31 tiles exactly — with a 10% wastage allowance, buy about 35 tiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Room area</strong> is your room&rsquo;s floor area in square feet.</li>
            <li><strong className="text-ink">Tile area</strong> is the coverage of one single tile.</li>
            <li><strong className="text-ink">Tiles to buy</strong> already includes your wastage allowance and is rounded up to a whole number.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Tile size</strong> — larger tiles need fewer pieces but often more wastage on cuts.</li>
            <li><strong className="text-ink">Layout pattern</strong> — diagonal or herringbone patterns need a higher wastage allowance than straight-lay.</li>
            <li><strong className="text-ink">Room shape</strong> — irregular rooms, alcoves and door openings aren&rsquo;t modelled and may need extra tiles.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Homeowners and contractors use this calculator to budget a flooring or wall-tiling project,
            compare material cost across different tile sizes, or double-check a supplier&rsquo;s quantity
            estimate before ordering.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Diagonal layouts, large-format tiles, or intricate patterns typically need a higher wastage
            allowance (15–20%). This calculator doesn&rsquo;t account for door openings, alcoves or
            irregular room shapes — always double-check with your tile supplier before ordering.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a tile calculator used for?",
              answer:
                "It's used to estimate how many tiles to buy for a flooring or wall-tiling project, so you can budget accurately and avoid running short mid-installation.",
            },
            {
              question: "How much wastage should I allow?",
              answer: "10% is a reasonable default for a simple straight-lay pattern. Diagonal or herringbone layouts often need 15–20%.",
            },
            {
              question: "Does this account for grout lines?",
              answer: "No, grout line width is small enough to ignore for a quantity estimate, but it's worth a small buffer on top of the suggested wastage for larger rooms.",
            },
            {
              question: "What tile sizes are supported?",
              answer:
                "Any size — enter your tile's exact length and width in centimetres, or use one of the common presets (30×30, 60×60, 60×120, 80×80 cm).",
            },
            {
              question: "Does room shape affect the estimate?",
              answer:
                "This calculator assumes a simple rectangular room. For L-shaped rooms or rooms with alcoves, calculate each rectangular section separately and add the results together.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
