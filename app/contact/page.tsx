import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Numberly",
  description:
    "Contact Numberly for questions, feedback, calculator issues, corrections or website-related enquiries.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="mt-4 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Contact Numberly</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Numberly is run as a small, browser-based calculator site. If you have a general question,
          spot a calculator error, want to request a correction, or have privacy-related feedback, you can
          reach out below.
        </p>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>General enquiries about the site or a calculator</li>
          <li>Reporting a calculator error or an incorrect result</li>
          <li>Requesting a content correction</li>
          <li>General feedback or a calculator suggestion</li>
          <li>Privacy-related questions</li>
        </ul>

        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="mt-6 flex w-fit items-center gap-2.5 rounded-lg border border-line-strong bg-surface px-4 py-3 font-medium text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <Mail className="h-4.5 w-4.5" aria-hidden />
          {siteConfig.contactEmail}
        </a>

        <p className="mt-6 text-sm text-ink-faint">
          We read every message but can&rsquo;t always reply individually. For calculator requests, please
          include which calculation you need and, if possible, a worked example.
        </p>
      </div>
    </Container>
  );
}
