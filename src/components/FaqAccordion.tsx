import React from 'react';

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Server-renderable FAQ block using native <details>/<summary> — the full
 * question + answer text is always present in the HTML (no client-side
 * conditional rendering hiding the answer), so it stays crawlable and
 * matches whatever FAQPage schema is injected alongside it on the same
 * page, per the SEO brief's "only add FAQ schema where the FAQ is visibly
 * rendered" rule. No framer-motion / client component needed.
 */
export default function FaqAccordion({ faqs, title = 'Frequently Asked Questions' }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm open:shadow-md transition-shadow duration-200 px-6 py-5"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-navy marker:content-none">
              <span>{faq.question}</span>
              <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center shrink-0 text-navy-light transition-transform duration-300 group-open:rotate-180 group-open:text-primary group-open:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 pt-3 text-xs sm:text-sm text-navy-light leading-relaxed border-t border-navy-light/5">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
