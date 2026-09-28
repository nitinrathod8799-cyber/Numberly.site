import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use – Numberly",
  description:
    "Read the Numberly Terms of Use covering calculator usage, website content, accuracy, intellectual property, external links and limitations of liability.",
  alternates: { canonical: absoluteUrl("/terms") },
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

export default function TermsPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Terms of Use</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {siteConfig.legalLastUpdated}</p>

        <div className="mt-8 space-y-8">
          <Section n={1} title="Acceptance of Terms">
            <p>
              By using {siteConfig.name} ({siteConfig.url}), you agree to these Terms of Use. If you do not
              agree, please don&rsquo;t use the site.
            </p>
          </Section>

          <Section n={2} title="Use of Numberly">
            <p>
              {siteConfig.name} provides free online calculators for personal and informational use. No
              account is required to use any calculator. You may use the site as often as you like within
              the bounds of fair, non-abusive use.
            </p>
          </Section>

          <Section n={3} title="Calculator Results">
            <p>
              Calculator results are generated based on the values you enter and the formulas described on
              each calculator&rsquo;s page. Results are estimates intended to help with planning and
              understanding, not guaranteed outcomes.
            </p>
          </Section>

          <Section n={4} title="Accuracy and Limitations">
            <p>Results can depend on a number of factors, including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>the values you enter</li>
              <li>assumptions built into a calculator (such as a chosen return rate or mix ratio)</li>
              <li>rounding</li>
              <li>the specific formula used</li>
              <li>applicable rates that may change over time (such as tax or interest rates)</li>
              <li>dates and time-dependent factors</li>
              <li>external, real-world conditions the calculator cannot know about</li>
            </ul>
            <p>
              Results should be independently verified, especially before making an important financial,
              health or construction decision.
            </p>
          </Section>

          <Section n={5} title="No Professional Advice">
            <p>
              Nothing on {siteConfig.name} is professional advice of any kind — financial, investment,
              tax, legal, medical or otherwise. Calculators are informational tools, not a substitute for
              advice from a qualified professional who understands your specific situation.
            </p>
          </Section>

          <Section n={6} title="Financial Calculator Disclaimer">
            <p>
              Financial calculators (including SIP, EMI, GST, Compound Interest and FD) provide estimates
              for informational purposes only and do not constitute financial, investment, tax or legal
              advice. Numberly does not guarantee any investment return, loan approval, or financial
              outcome, and does not recommend specific financial products.
            </p>
          </Section>

          <Section n={7} title="Construction Calculator Disclaimer">
            <p>
              Construction calculators (including Tile and Concrete) provide estimates only. Actual
              material requirements can vary due to measurements, wastage, material specifications, site
              conditions, workmanship and construction methods. Verify quantities with a qualified
              professional before purchasing materials or beginning construction work.
            </p>
          </Section>

          <Section n={8} title="Health-Related Calculator Disclaimer">
            <p>
              Where Numberly offers a health-related calculator, its result is informational only and
              should not be treated as medical diagnosis, medical advice, or a substitute for consulting a
              qualified healthcare professional.
            </p>
          </Section>

          <Section n={9} title="Acceptable Use">
            <p>
              Please don&rsquo;t attempt to disrupt {siteConfig.name}, scrape it at abusive volume, interfere
              with other users&rsquo; access, or use the site for any unlawful purpose.
            </p>
          </Section>

          <Section n={10} title="Intellectual Property">
            <p>
              {siteConfig.name}&rsquo;s original website design, original written content, original
              calculator interfaces and original graphics may be protected by applicable intellectual
              property laws. You may use the site for personal, non-commercial purposes, but shouldn&rsquo;t
              reproduce substantial original content without permission where permission is required.
              Numberly does not claim ownership over third-party material it does not own.
            </p>
          </Section>

          <Section n={11} title="Third-Party Links">
            <p>
              {siteConfig.name} may link to external websites for reference or convenience. We do not
              control, and are not responsible for, the content, accuracy or policies of those external
              sites. Review the external site&rsquo;s own terms and privacy policy before using it.
            </p>
          </Section>

          <Section n={12} title="Availability and Changes">
            <p>
              We aim to keep {siteConfig.name} available and working correctly, but we don&rsquo;t guarantee
              uninterrupted access. Calculators, content and features may be added, changed or removed at
              any time.
            </p>
          </Section>

          <Section n={13} title="Disclaimer of Warranties">
            <p>
              {siteConfig.name} is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
              warranties of any kind, whether express or implied, including implied warranties of accuracy,
              merchantability or fitness for a particular purpose.
            </p>
          </Section>

          <Section n={14} title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, {siteConfig.name} and its operators are not liable
              for any indirect, incidental or consequential loss arising from your use of, or inability to
              use, the site or its calculators, including decisions made based on a calculator result.
            </p>
          </Section>

          <Section n={15} title="Indemnity">
            <p>
              Where legally appropriate, you agree to be responsible for your own use of {siteConfig.name}
              and for any loss you cause to us through misuse of the site or violation of these Terms.
            </p>
          </Section>

          <Section n={16} title="Governing Law and Jurisdiction">
            <p>
              These Terms are governed by the laws of{" "}
              <code className="rounded bg-paper px-1.5 py-0.5 text-sm">[GOVERNING LAW / JURISDICTION]</code>.
              This placeholder should be replaced with the appropriate governing law and jurisdiction after
              legal review, before this policy is relied upon in production.
            </p>
          </Section>

          <Section n={17} title="Changes to Terms">
            <p>
              We may update these Terms as {siteConfig.name} evolves. The &ldquo;Last updated&rdquo; date at
              the top of this page reflects the most recent change. Continued use of the site after an
              update means you accept the revised Terms.
            </p>
          </Section>

          <Section n={18} title="Contact">
            <p>
              Questions about these Terms can be sent via the{" "}
              <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">Contact page</Link>.
            </p>
          </Section>
        </div>
      </div>
    </Container>
  );
}
