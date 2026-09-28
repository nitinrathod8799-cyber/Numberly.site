import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { TimeDurationCalculatorApp } from "@/components/calculator/apps/TimeDurationCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("time-duration-calculator")!;
const title = "Time Duration Calculator – Time Between Two Times";
const description =
  "Calculate the duration between a start time and an end time, in hours and minutes, with automatic next-day rollover.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/time-duration-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/time-duration-calculator") },
  twitter: { title, description },
};

export default function TimeDurationCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a start time and end time to see the exact duration between them, in hours and minutes."
    >
      <TimeDurationCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Time Duration Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter a start time.</li>
            <li>Enter an end time.</li>
            <li>See the duration instantly, in hours and minutes, total minutes, and decimal hours.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a time duration calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A time duration calculator works out how much time passes between a start time and an end
            time on a 24-hour clock, showing the result in hours and minutes, total minutes, and decimal
            hours (handy for timesheets).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Both times are converted to minutes since midnight, and the start is subtracted from the end.
            If the end time is earlier in the day than the start time (like a night shift from 22:00 to
            02:00), the calculator assumes the end time falls on the next day and adds 24 hours
            automatically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A shift from 09:00 to 17:30 lasts 8 hours 30 minutes (510 minutes, or 8.5 decimal hours).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Duration</strong> is shown in whole hours and minutes.</li>
            <li><strong className="text-ink">Total minutes</strong> is the same duration as a single number.</li>
            <li><strong className="text-ink">Decimal hours</strong> converts minutes into a fraction of an hour, useful for payroll or billing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this to calculate work shift lengths (including overnight shifts), time spent on a
            task, meeting durations, or any other time-of-day interval.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator works with times of day (not dates), on a 24-hour clock. For a duration spanning
            multiple calendar days, use the Date Difference Calculator instead.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a time duration calculator used for?",
              answer: "It's used to find how much time passes between two times of day — for shifts, tasks, meetings, or any time interval.",
            },
            {
              question: "How does it handle overnight shifts?",
              answer: "If the end time is earlier than the start time, the calculator assumes it falls on the next day and calculates the duration accordingly.",
            },
            {
              question: "What are decimal hours?",
              answer: "Decimal hours express minutes as a fraction of an hour — for example, 30 minutes is 0.5 decimal hours. This is commonly used for timesheets and billing.",
            },
            {
              question: "Can I use this for dates spanning more than 24 hours?",
              answer: "No, this calculator handles times of day within a single day-to-next-day span. For multi-day durations, use the Date Difference Calculator.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
