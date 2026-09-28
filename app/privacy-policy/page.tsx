import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy – Numberly",
  description:
    "Read the Numberly Privacy Policy to understand how information, cookies, analytics and other data may be handled when using Numberly calculators and website services.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
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

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: {siteConfig.legalLastUpdated}</p>
        <p className="mt-4 text-sm text-ink-soft">
          This policy explains, as plainly as possible, what happens to information when you use{" "}
          {siteConfig.name}. It is not a substitute for legal advice, and it describes {siteConfig.name} as
          it actually works today rather than as a generic template.
        </p>

        <div className="mt-8 space-y-8">
          <Section n={1} title="Introduction">
            <p>
              {siteConfig.name} ({siteConfig.url}) is a free website offering online calculators for math,
              finance, construction and everyday use. This Privacy Policy applies to your use of the{" "}
              {siteConfig.name} website.
            </p>
          </Section>

          <Section n={2} title="Information We May Collect">
            <p>
              {siteConfig.name} is designed to need as little information from you as possible. Depending
              on how a page or feature is built, we may handle: information you choose to provide (for
              example, if you contact us), calculator inputs, and information collected automatically by
              standard web hosting infrastructure (see sections 3–6 below).
            </p>
          </Section>

          <Section n={3} title="Information You Provide">
            <p>
              If you contact us (see <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">Contact</Link>),
              we receive whatever information you choose to include in that message, such as your email
              address and the content of your message. We use this only to respond to you and to improve
              {" "}{siteConfig.name}.
            </p>
          </Section>

          <Section n={4} title="Calculator Inputs">
            <p>
              {siteConfig.name}&rsquo;s calculators currently run entirely in your browser. Values you type
              into a calculator — a loan amount, a date of birth, an investment figure, a room
              dimension, and so on — are processed locally on your device to produce a result, and are{" "}
              <strong className="text-ink">not transmitted to a {siteConfig.name} server</strong>.
            </p>
            <p>
              One exception: the Normal Calculator can keep a short history of recent calculations using
              your browser&rsquo;s local storage, purely so it&rsquo;s there if you revisit the page. This
              history is stored only on your own device, is never sent to us, and you can clear it at any
              time from within the calculator.
            </p>
            <p>
              If a calculator on {siteConfig.name} is ever built to require a server-side calculation, this
              policy will be updated to explain exactly what is sent and why, before that calculator is
              published.
            </p>
          </Section>

          <Section n={5} title="Automatically Collected Information">
            <p>
              Like most websites, the server or hosting platform that serves {siteConfig.name} may
              automatically log basic technical information for every request — such as an IP address,
              browser type, device type, referring page and timestamp — as part of standard web server
              operation. We do not currently use this information for anything beyond basic hosting,
              security and troubleshooting.
            </p>
          </Section>

          <Section n={6} title="Cookies and Similar Technologies">
            <p>{siteConfig.name} distinguishes between a few different purposes for cookies and local storage:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="text-ink">Essential functionality:</strong> Numberly does not currently require cookies for the site to function. Calculator history uses browser local storage, not cookies.</li>
              <li><strong className="text-ink">Analytics cookies:</strong> Numberly does not currently use analytics cookies. If analytics is added in future, this section will be updated to name the provider and explain what it collects.</li>
              <li><strong className="text-ink">Advertising cookies:</strong> Numberly does not currently display advertising and does not use advertising cookies.</li>
              <li><strong className="text-ink">Third-party cookies:</strong> Numberly does not currently embed third-party services that would set their own cookies.</li>
            </ul>
          </Section>

          <Section n={7} title="Analytics">
            <p>
              Numberly does not currently use a web analytics service. If Numberly uses analytics services
              in the future (for example, to understand which calculators are useful, in aggregate), this
              section will be updated to name the specific provider(s) and describe what is collected.
            </p>
          </Section>

          <Section n={8} title="Advertising">
            <p>
              Numberly does not currently display advertising. If advertising is displayed on Numberly in
              the future, this section will be updated to describe the advertising provider(s) and any
              related data practices, including any advertising cookies used.
            </p>
          </Section>

          <Section n={9} title="Third-Party Services">
            <p>
              Running a website generally requires some third-party infrastructure, such as a hosting
              provider. Beyond hosting, Numberly does not currently integrate third-party analytics,
              advertising or security services. If that changes — for example, if Numberly begins using
              an analytics provider, an advertising network, or a security/anti-abuse service — this
              section will be updated to name that provider and explain its role.
            </p>
          </Section>

          <Section n={10} title="How Information May Be Used">
            <p>
              Any information we do receive (such as a message you send us) is used only to operate,
              maintain and improve {siteConfig.name}, to respond to you, and to keep the site secure. We do
              not sell personal information.
            </p>
          </Section>

          <Section n={11} title="Data Retention">
            <p>
              Calculator inputs are not retained by us at all, since they never leave your browser.
              Calculation history is retained only in your own browser&rsquo;s local storage until you clear
              it or clear your browser data. Messages sent via the Contact page are kept only as long as
              reasonably needed to address your enquiry.
            </p>
          </Section>

          <Section n={12} title="Data Security">
            <p>
              We take reasonable steps to protect the information we do handle, such as messages sent
              through the Contact page. However, no method of transmission or storage is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section n={13} title="Data Sharing">
            <p>
              We do not sell or rent personal information. We may share information with service providers
              who help us run {siteConfig.name} (such as a hosting provider), only to the extent necessary
              for them to provide that service, or where required by law.
            </p>
          </Section>

          <Section n={14} title="Your Privacy Rights">
            <p>
              Depending on where you are located, you may have rights to access, correct or delete personal
              information we hold about you, or to object to certain processing. Since Numberly currently
              collects very little personal information (mainly what you choose to send via Contact), most
              requests can be resolved simply by asking us to delete a message. You can reach us via the{" "}
              <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">Contact page</Link>.
            </p>
          </Section>

          <Section n={15} title="Children's Privacy">
            <p>
              {siteConfig.name} is not directed at children, and we do not knowingly or intentionally
              collect personal information from children. If you are a parent or guardian and believe a
              child has provided us with personal information (for example, through the Contact page),
              please contact us so we can remove it. We&rsquo;d also ask that nobody include unnecessary
              personal information — for themselves or anyone else — when contacting us.
            </p>
          </Section>

          <Section n={16} title="External Links">
            <p>
              Some pages on {siteConfig.name} may link to external websites. We do not control those sites
              and are not responsible for their content or privacy practices. We encourage you to review
              the privacy policy of any external site you visit.
            </p>
          </Section>

          <Section n={17} title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time, for example as new calculators or
              features are added. The &ldquo;Last updated&rdquo; date at the top of this page will reflect
              the most recent change. Continued use of {siteConfig.name} after an update means you accept
              the revised policy.
            </p>
          </Section>

          <Section n={18} title="Contact Us">
            <p>
              Questions about this Privacy Policy can be sent via the{" "}
              <Link href="/contact" className="font-medium text-brand hover:text-brand-dark">Contact page</Link>.
            </p>
          </Section>
        </div>
      </div>
    </Container>
  );
}
