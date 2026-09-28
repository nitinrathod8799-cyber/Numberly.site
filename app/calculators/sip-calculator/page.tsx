import type { Metadata } from "next";
import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { FAQAccordion } from "@/components/calculator/FAQAccordion";
import { SipCalculatorApp } from "@/components/calculator/apps/SipCalculatorApp";
import { SipGoalMode } from "@/components/calculator/apps/SipGoalMode";
import { SipScenarioComparison } from "@/components/calculator/apps/SipScenarioComparison";
import { getCalculatorBySlug } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

const calc = getCalculatorBySlug("sip-calculator")!;
const title = "SIP Calculator – Estimate Investment Growth";
const description =
  "Calculate estimated SIP growth from monthly investment, expected annual return and duration. See invested amount, estimated returns and future value, with step-up and inflation options.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/calculators/sip-calculator") },
  openGraph: { title, description, url: absoluteUrl("/calculators/sip-calculator") },
  twitter: { title, description },
};

export default function SipCalculatorPage() {
  return (
    <CalculatorPageShell
      calc={calc}
      intro="Enter a monthly amount, expected return and duration to see your projected SIP value — with optional step-up and inflation adjustment."
    >
      <SipCalculatorApp />

      <div className="mt-10 space-y-6">
        <SipGoalMode />
        <SipScenarioComparison />
      </div>

      <div className="mt-14 max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">How to use the SIP Calculator</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-soft">
            <li>Enter how much you plan to invest every month, or pick a preset amount.</li>
            <li>Enter an expected annual return — this is your own assumption, not a promised rate.</li>
            <li>Set how many years you plan to stay invested.</li>
            <li>
              Optionally open <strong className="text-ink">Advanced options</strong> to add a yearly
              step-up, adjust for inflation, include a starting lump sum, or change contribution timing.
            </li>
            <li>Your future value, total invested and estimated returns update instantly as you type.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What is a SIP calculator?</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            A SIP (Systematic Investment Plan) calculator projects what a series of fixed monthly
            investments into a mutual fund could grow to over time, based on an assumed rate of return.
            Instead of manually working out compounding across hundreds of months, the calculator does it
            instantly and shows how much of the final amount is your own money versus estimated growth.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the calculation works</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Each month, your contribution is added to your running total, and the whole balance then grows
            by that month&rsquo;s share of your expected annual return. Because growth is applied every
            single month, money invested earlier has more time to compound than money invested later —
            which is why the growth curve accelerates in later years rather than rising in a straight line.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Formula</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            The yearly return rate you enter is converted into an equivalent monthly rate, so that twelve
            months of compounding add up to exactly that yearly return:
          </p>
          <p className="mt-2 rounded-lg bg-paper p-3 font-mono text-sm text-ink">
            Monthly rate = (1 + annual rate)^(1/12) &minus; 1
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            This is slightly different — and more accurate — than simply dividing the annual rate
            by 12. If step-up is enabled, the monthly contribution itself increases at the start of each
            new year, by either a percentage or a fixed rupee amount.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Worked example</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Investing ₹10,000 every month for 20 years at an assumed 12% annual return results in a
            total investment of ₹24,00,000 and an estimated future value of roughly ₹91.1 lakh
            &mdash; of which about ₹67.1 lakh is estimated growth. Actual results will vary with real
            market returns.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Understanding your result</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li>
              <strong className="text-ink">Total invested</strong> is simply the sum of every contribution
              you made, with no growth included.
            </li>
            <li>
              <strong className="text-ink">Estimated returns</strong> is the gap between your future value
              and total invested — the portion driven by compounding at your chosen return rate.
            </li>
            <li>
              <strong className="text-ink">Future value</strong> is total invested plus estimated returns
              combined, shown both in compact form (like ₹91.12 L) and in full.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Factors that affect your SIP growth</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li><strong className="text-ink">Duration</strong> matters more than almost anything else — compounding needs time to work.</li>
            <li><strong className="text-ink">Return rate</strong> has a large effect, especially over long periods; small differences compound significantly.</li>
            <li><strong className="text-ink">Step-up contributions</strong> can meaningfully increase your final corpus without a large early monthly commitment.</li>
            <li><strong className="text-ink">Contribution timing</strong> (start vs. end of month) has a small but real effect on the total.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Common uses</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            People use this calculator to plan retirement savings, estimate progress toward a house
            down-payment, compare a flat SIP against a step-up SIP, or work backward from a target amount
            (like a child&rsquo;s education fund) to find the monthly SIP needed using{" "}
            <strong className="text-ink">Plan for a goal</strong> above.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Important notes &amp; limitations</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-soft">
            <li>Return assumptions are inputs you control, never a promise of what a fund will deliver.</li>
            <li>Inflation-adjusted figures estimate purchasing power, not a separate investment.</li>
            <li>Step-up SIP assumes you can and will increase contributions every year as planned.</li>
            <li>The calculator does not account for fund expense ratios, exit loads or taxes on redemption.</li>
          </ul>
        </section>

        <FAQAccordion
          items={[
            {
              question: "What is a SIP calculator?",
              answer:
                "A tool that projects the future value of regular monthly investments into a mutual fund, based on a return rate you choose, so you can see invested amount, estimated growth and total value before you commit real money.",
            },
            {
              question: "How is SIP return calculated?",
              answer:
                "Your monthly contribution is added each month and the running balance grows at a monthly rate derived from your expected annual return, compounding every month for the full duration you enter.",
            },
            {
              question: "What information do I need to use this calculator?",
              answer:
                "Just three numbers: how much you plan to invest each month, an expected annual return, and how many years you'll stay invested. Step-up, inflation and lump-sum are optional extras.",
            },
            {
              question: "Does a SIP calculator guarantee returns?",
              answer:
                "No. Mutual fund and market-linked returns are never guaranteed. The return rate here is an assumption you enter for planning purposes, not a prediction or promise.",
            },
            {
              question: "How does investment duration affect the result?",
              answer:
                "Duration is one of the biggest drivers of SIP growth — the longer your money stays invested, the more time each contribution has to compound, so even a few extra years can make a large difference.",
            },
            {
              question: "What's the difference between invested amount and total value?",
              answer:
                "Invested amount is only the money you put in, month by month. Total value (future value) is that invested amount plus all the estimated growth on top of it.",
            },
            {
              question: "What is a step-up SIP?",
              answer:
                "A step-up (or top-up) SIP automatically increases your monthly contribution each year, by either a fixed percentage or a fixed amount, to help your investments keep pace with rising income.",
            },
            {
              question: "How is the inflation-adjusted value calculated?",
              answer:
                "The projected future value is discounted back using your chosen inflation rate, showing roughly what that future amount would be worth in today's purchasing power.",
            },
          ]}
        />
      </div>
    </CalculatorPageShell>
  );
}
