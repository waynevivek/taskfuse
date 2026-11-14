import React from 'react';

export const Problem: React.FC = () => {
  const pains = [
    {
      num: '01.',
      title: 'The Silent 200-Call Loop',
      desc: 'An agent got stuck in a retry loop and made 200 API calls in four minutes. The dashboard just logged "usage."',
      tag: 'Uncapped Loop',
      dark: false,
    },
    {
      num: '02.',
      title: 'Unpredictable Overnight Runs',
      desc: 'The same overnight run cost $200 one night and $7 the next — for the same output. Nobody can say why.',
      tag: 'Variance',
      dark: true,
    },
    {
      num: '03.',
      title: 'Compounding Context Resend',
      desc: 'Agents burn 5–30x more tokens per task than a chatbot, because they loop, retry, and resend full context (Gartner).',
      tag: 'Token Bleed',
      dark: true,
    },
    {
      num: '04.',
      title: 'Tokens vs. Business Tasks',
      desc: 'Your CFO asks what one closed ticket costs. Your observability tool shows tokens per request. Those are different questions.',
      tag: 'Unit Economics',
      dark: false,
    },
  ];

  return (
    <>
      {/* Orynthiq-Inspired Obsidian Editorial Statement & Monumental Metric Band */}
      <section className="bg-[#0A0B0E] text-white py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-[12px] font-mono text-[#9499A3] tracking-wider uppercase">
                01. The Observability Gap
              </div>
              <h2 className="spec-h2 text-white">
                Your token dashboard is hiding the real bill.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[16px] text-[#A1A6B0] leading-relaxed max-w-[46ch]">
                Existing observability tools report raw token averages across disconnected requests. They cannot tell you what one completed business task actually cost—or halt a runaway retry loop before the invoice lands.
              </p>
            </div>
          </div>

          {/* 3-Column Monumental KPI Strip with Hairline Dividers (Orynthiq Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/10 pt-8 sm:pt-10 gap-8 sm:gap-0">
            <div className="sm:pr-8">
              <div className="text-[11.5px] font-mono uppercase tracking-wider text-[#9499A3]">
                Agent Token Multiplier (Gartner)
              </div>
              <div className="text-[40px] sm:text-[52px] font-bold font-mono tabular-nums tracking-tight text-white mt-2 leading-none">
                5–30x
              </div>
              <p className="text-[13.5px] text-[#9499A3] mt-3 leading-relaxed">
                More tokens burned per task than chat due to loops and full-context resends.
              </p>
            </div>

            <div className="sm:px-8 sm:border-l border-white/10">
              <div className="text-[11.5px] font-mono uppercase tracking-wider text-[#9499A3]">
                Teams Overrunning Budgets (IDC 2026)
              </div>
              <div className="text-[40px] sm:text-[52px] font-bold font-mono tabular-nums tracking-tight text-[#F59E0B] mt-2 leading-none">
                67%
              </div>
              <p className="text-[13.5px] text-[#9499A3] mt-3 leading-relaxed">
                Exceeded AI agent budgets by more than 10% from unmonitored execution variance.
              </p>
            </div>

            <div className="sm:pl-8 sm:border-l border-white/10">
              <div className="text-[11.5px] font-mono uppercase tracking-wider text-[#9499A3]">
                Hard Per-Task Ceiling
              </div>
              <div className="text-[40px] sm:text-[52px] font-bold font-mono tabular-nums tracking-tight text-white mt-2 leading-none">
                $4.00
              </div>
              <p className="text-[13.5px] text-[#9499A3] mt-3 leading-relaxed">
                Circuit-breaker limit stops runaway tasks at your price, not the provider’s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WizardZ-Inspired Alternating High-Contrast 2x2 Bento Grid */}
      <section className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2DC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-[680px] mb-10 sm:mb-14 space-y-2">
            <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
              Where Spend Disappears
            </div>
            <h2 className="spec-h2 text-[#0B0C0E]">
              Four failure modes token averages never surface
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {pains.map((pain, idx) => (
              <div
                key={idx}
                className={`rounded-[24px] p-7 sm:p-9 flex flex-col justify-between space-y-6 transition-colors ${
                  pain.dark
                    ? 'bg-[#111318] text-white border border-[#1E222B]'
                    : 'bg-[#FFFFFF] text-[#0B0C0E] border border-[#0B0C0E]/15 shadow-[0_2px_12px_rgba(11,12,14,0.03)]'
                }`}
              >
                <div className="flex items-center justify-between text-[12px] font-mono">
                  <span className={`font-bold tabular-nums ${pain.dark ? 'text-[#F59E0B]' : 'text-[#D97706]'}`}>
                    {pain.num}
                  </span>
                  <span className={pain.dark ? 'text-[#9499A3]' : 'text-[#6E737D]'}>
                    {pain.tag}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h3
                    className={`text-[20px] sm:text-[22px] font-bold tracking-tight ${
                      pain.dark ? 'text-white' : 'text-[#0B0C0E]'
                    }`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {pain.title}
                  </h3>
                  <p className={`text-[15.5px] leading-relaxed max-w-[54ch] ${pain.dark ? 'text-[#A1A6B0]' : 'text-[#4B5058]'}`}>
                    {pain.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
