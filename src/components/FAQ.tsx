import React, { useState } from 'react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How hard is setup, honestly?',
      a: 'One line of config. You change your API base URL to our proxy and add a task-ID header. No SDK, no agent framework lock-in, no code rewrite. If you can set an environment variable, you can set this up.',
    },
    {
      q: 'We already use Langfuse / Helicone / Datadog. Why add this?',
      a: "Keep them — they're great at traces and tokens per request. They don't answer what one finished business task cost, with retries, model switches, and failed attempts rolled in, and they don't stop a task at a dollar limit. That's the whole product here.",
    },
    {
      q: "Won't a hard cap kill a valuable task mid-run?",
      a: 'Only if you turn caps on, and only at the limit you set. Everything starts observe-only. When you enable a cap, calls past it return a standard error your agent handles like any API failure — you decide the threshold per workflow, and you can route expensive tasks to a higher cap.',
    },
    {
      q: 'Is $499 a month worth it?',
      a: 'If you spend $5K a month on agents and retry loops eat even 15% of it — our sample audit found far more — Team pays for itself before the first week closes. The free audit tells you your real number before you pay anything.',
    },
    {
      q: 'Do you store my prompts?',
      a: 'Cost math only needs token counts, model names, and timing. Request bodies are not stored by default; you can opt in per workflow if you want loop diagnostics that quote the repeated calls.',
    },
    {
      q: 'Is this available yet?',
      a: "Not yet — we're onboarding founding users in small batches. Signing up reserves your spot and a free seven-day Agent Spend Audit of one workflow at launch. You'll see your real cost per finished task before you're asked to pay for anything.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2DC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
            06. Frequent Inquiries
          </div>
          <h2 className="spec-h2 text-[#0B0C0E]">
            Frequently answered questions
          </h2>
          <p className="spec-body text-[15.5px] text-[#4B5058] leading-relaxed">
            Everything you need to know about proxy integration, privacy, and the free seven-day audit.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-[20px] bg-[#FFFFFF] border border-[#E2E2DC] overflow-hidden transition-colors hover:border-[#C9C9C1]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0B0C0E] cursor-pointer group"
                >
                  <span
                    className="text-[16px] sm:text-[17.5px] font-bold text-[#0B0C0E] group-hover:text-[#D97706] transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform font-mono text-[18px] ${
                      isOpen ? 'bg-[#0B0C0E] text-white rotate-45' : 'bg-[#F5F5F3] text-[#4B5058]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 sm:px-6 pb-6 text-[15px] text-[#4B5058] leading-relaxed border-t border-[#ECECE8] pt-4"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
