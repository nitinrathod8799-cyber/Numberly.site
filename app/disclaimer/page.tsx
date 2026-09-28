import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer – Numberly",
  description:
    "Read the Numberly disclaimer covering calculator estimates, financial information, health-related calculations, construction estimates and external information.",
  alternates: { canonical: absoluteUrl("/disclaimer") },
  robots: { index: true, follow: true },
};

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section id={`s${n}`}>
      <h2 className="text-lg font-semibold text-ink">
        {n}. {title}
      </h2>
      <div className="mt-2 space-y-2 leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function DisclaimerPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Disclaimer</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {siteConfig.legalLastUpdated}</p>

        <div className="mt-8 space-y-8">
          <Section n={1} title="General Disclaimer">
            <p>
              {siteConfig.name} provides free, informational calculator tools. While we aim to keep them
              useful and reasonably accurate, nothing on this site should be treated as professional
              advice, and we make no guarantee that any result is free of error.
            </p>
          </Section>

          <Section n={2} title="Calculator Results">
            <p>
              Every calculator on {siteConfig.name} produces an estimate based on the values you enter and
              the assumptions built into that calculator&rsquo;s formula. Small changes in input, rounding,
              or the underlying formula&rsquo;s assumptions can all affect the result. Verify important
              results independently.
            </p>
          </Section>

          <Section n={3} title="Financial Disclaimer">
            <p>
              Financial calculators (SIP, EMI, GST, Compound Interest, FD and similar) are for informational
              and educational purposes only. They are not financial, investment, tax or legal advice, and
              {" "}{siteConfig.name} does not guarantee any investment return or loan outcome. Consult a
              qualified financial advisor before making investment or borrowing decisions.
            </p>
          </Section>

          <Section n={4} title="Health Disclaimer">
            <p>
              Where {siteConfig.name} offers a health-related calculator, its output is informational only
              and is not a medical diagnosis or medical advice. Consult a qualified healthcare professional
              for guidance about your health.
            </p>
          </Section>

          <Section n={5} title="Construction Disclaimer">
            <p>
              Construction calculators (Tile, Concrete and similar) provide planning-level estimates. Actual
              material needs depend on measurements, wastage, material specifications, site conditions,
              workmanship and construction methods, and can differ from the estimate shown. Confirm
              quantities with a qualified professional before purchasing materials.
            </p>
          </Section>

          <Section n={6} title="Tax and Legal Information">
            <p>
              Any references to tax rates, GST slabs, or other regulatory figures reflect general
              information at the time a calculator was built and may not reflect current rates. This is not
              tax or legal advice — confirm current rates and rules with an official source or a
              qualified professional.
            </p>
          </Section>

          <Section n={7} title="External Links">
            <p>
              {siteConfig.name} may link to external websites. We don&rsquo;t control and aren&rsquo;t
              responsible for the accuracy or content of external sites, and linking to a site doesn&rsquo;t
              imply endorsement.
            </p>
          </Section>

          <Section n={8} title="Advertising and Affiliate Disclosure">
            <p>
              {siteConfig.name} does not currently display advertising or use affiliate links. Numberly may
              display advertisements or use affiliate links in the future; where that becomes applicable,
              such relationships will be disclosed on this page.
            </p>
          </Section>

          <Section n={9} title="No Guarantee of Accuracy">
            <p>
              We work to keep calculators and content accurate and up to date, but we don&rsquo;t claim that
              results are always 100% accurate or that content is free of errors or omissions.
            </p>
          </Section>

          <Section n={10} title="Limitation of Responsibility">
            <p>
              {siteConfig.name} is a free informational tool. To the extent permitted by law, we are not
              responsible for decisions made based on a calculator result, though we do aim to fix genuine
              calculation errors promptly once reported.
            </p>
          </Section>

          <Section n={11} title="Contact">
            <p>
              Questions about this Disclaimer, or a calculator result you believe is incorrect, can be sent
              via the <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">Contact page</Link>.
            </p>
          </Section>
        </div>
      </div>
    </Container>
  );
}
