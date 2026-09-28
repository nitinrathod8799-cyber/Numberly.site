import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { AgeCalculatorApp } from "@/components/calculator/apps/AgeCalculatorApp";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("age-calculator")!;
const title = "Age Calculator – Calculate Your Exact Age";
const description =
  "Calculate your exact age in years, months and days from your date of birth, plus total days, weeks and months lived, and a countdown to your next birthday.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/age-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/age-calculator") },
  twitter: { title, description },
};

export default function AgeCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a date of birth to see the exact age in years, months and days — plus a countdown to the next birthday."
    >
      <AgeCalculatorApp />

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the Age Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Open the date picker and choose a date of birth.</li>
            <li>Select <strong className="text-ink">Calculate age</strong>.</li>
            <li>Your exact age appears in years, months and days, along with total days, weeks and months lived, and your next birthday.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is an age calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            An age calculator works out precisely how much time has passed between a date of birth and
            today &mdash; broken down into complete years, months and days, rather than just a single
            &ldquo;X years old&rdquo; figure. It also totals that time in different units and shows how many
            days remain until the next birthday.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The calculator counts every complete year from the date of birth to today, then counts complete
            months within the current year, then whatever days remain &mdash; correctly handling different
            month lengths (28 to 31 days) and leap years along the way, including birthdays that fall on
            February 29.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Years / months / days</strong> is your age broken down the way people normally say it out loud.</li>
            <li><strong className="text-ink">Total months / weeks / days</strong> express your whole age in a single unit, useful for babies or precise records.</li>
            <li><strong className="text-ink">Next birthday</strong> shows the date and how many days remain until it.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect the result</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The result depends only on the date of birth you enter and today&rsquo;s date on your device.
            Leap years can shift the exact day count slightly, and a birth date of February 29 is handled
            as a special case, celebrating on February 28 in non-leap years.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            This calculator is commonly used to check eligibility ages for school admission, jobs or
            government schemes, work out a baby&rsquo;s exact age in weeks for medical appointments, or
            simply settle an argument about exactly how old someone is today.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Dates are compared using your device&rsquo;s local date, and a date of birth in the future
            isn&rsquo;t accepted. Nothing you enter is stored or sent anywhere &mdash; the calculation
            happens entirely in your browser.
          </p>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is an age calculator used for?",
              answer:
                "It's used to work out someone's exact age in years, months and days, check eligibility criteria that depend on age, or find out how many days are left until a birthday.",
            },
            {
              question: "Does this account for leap years?",
              answer:
                "Yes. Leap years are handled automatically, including for people born on February 29.",
            },
            {
              question: "Is my date of birth stored anywhere?",
              answer: "No. The calculation happens entirely in your browser and nothing is saved or sent to a server.",
            },
            {
              question: "Why does my age in months look different from years × 12?",
              answer:
                "Total months counts every complete month you've lived, which can differ slightly from a simple multiplication once you account for the partial month at each end.",
            },
            {
              question: "What happens if I was born on February 29?",
              answer:
                "In years without a February 29, your next birthday is shown as February 28 instead, so the countdown still makes sense.",
            },
            {
              question: "Can I calculate age as of a future or past date instead of today?",
              answer:
                "This calculator always uses today's date for the calculation. For age as of a specific other date, a Date Difference calculator is the right tool.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
