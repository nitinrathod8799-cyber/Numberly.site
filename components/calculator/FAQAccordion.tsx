export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="text-lg font-semibold text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3.5 open:pb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-ink marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="shrink-0 text-lg text-ink-faint transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
