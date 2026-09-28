import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { DateDifferenceCalculatorApp } from "@/components/calculator/apps/DateDifferenceCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("date-difference-calculator")!;
const title = "Date Difference Calculator – Time Between Two Dates";
const description =
  "Calculate the exact time between any two dates in years, months and days, plus total days, weeks and months.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/date-difference-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/date-difference-calculator") },
  twitter: { title, description },
};

export default function DateDifferenceCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Pick any two dates to see the exact time between them in years, months and days."
    >
      <DateDifferenceCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Date Difference Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Choose your first date.</li>
            <li>Choose your second date — in either order, it doesn&rsquo;t matter.</li>
            <li>Select <strong className="text-ink">Calculate</strong> to see the difference.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a date difference calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A date difference calculator works out exactly how much time separates any two dates —
            past, present or future — broken down into complete years, months and days, plus useful
            totals like total days and weeks.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The calculator counts complete years between the two dates, then complete months within the
            current year, then whatever days remain — correctly handling different month lengths and
            leap years. If you enter the dates in reverse order, it automatically works from the earlier
            date to the later one.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            From 1 January 2020 to 15 June 2023 is exactly 3 years, 5 months and 14 days — or 1,261
            days in total.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Years / months / days</strong> is the difference broken down the way people normally describe a duration.</li>
            <li><strong className="text-ink">Total days / weeks / months</strong> express the whole gap in a single unit.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends only on the two dates entered. Leap years are handled automatically and can
            shift day counts by one in years that include February 29.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this to count down to or up from an event, work out someone&rsquo;s age as of a
            specific (non-today) date, calculate a project or contract duration, or settle how long ago
            something happened.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Unlike the Age Calculator, this tool works between any two dates — not just from a date of
            birth to today — so it also accepts future dates on both sides.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a date difference calculator used for?",
              answer: "It's used to find the exact time between any two dates — for events, deadlines, contracts, or general curiosity.",
            },
            {
              question: "Does the order of the two dates matter?",
              answer: "No — enter them in either order and the calculator will show the difference from the earlier date to the later one.",
            },
            {
              question: "How is this different from the Age Calculator?",
              answer: "The Age Calculator always measures from a date of birth to today. This calculator works between any two arbitrary dates, past or future.",
            },
            {
              question: "Does it handle leap years correctly?",
              answer: "Yes, leap years are accounted for automatically in the day and month calculations.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
