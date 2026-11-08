import React from 'react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      title: 'One number for the CFO',
      text: 'Report the cost of one closed ticket, one enriched lead, one processed document — not a token count.',
      tag: 'Unit Economics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h5" />
        </svg>
      ),
    },
    {
      title: "Catch loops while they're cheap",
      text: 'Repeated near-identical calls get flagged with their wasted spend totaled, before the invoice does it for you.',
      tag: 'Loop Detection',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M21 21v-5h-5" />
          <circle cx="12" cy="12" r="1.5" fill="#0F172A" />
        </svg>
      ),
    },
    {
      title: 'A hard stop at your price',
      text: 'Set a dollar cap per task; past it, calls return a clean error your agent can handle.',
      tag: 'Budget Limits',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      title: 'No rewrite, no SDK',
      text: "A base-URL swap and a header. Your agent code doesn't know we exist.",
      tag: 'Zero Lock-in',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-5" />
          <path d="M9 8V2" />
          <path d="M15 2v6" />
          <path d="M18 8a6 6 0 0 1-12 0v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6V8z" />
        </svg>
      ),
    },
    {
      title: 'Margin per workflow',
      text: 'See which workflows make money at current model prices and which quietly don’t.',
      tag: 'Gross Margin',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-[760px] mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[11px] sm:text-[12px] font-mono text-[#D97706] font-semibold mb-3">
            <span>FINANCIAL CONTROLS</span>
          </div>
          <h2 className="spec-h2">
            Built for production agent economics
          </h2>
          <p className="spec-body text-[16px] sm:text-[17px] text-[#475569] mt-2">
            Every feature designed for the team footing the model bill at scale.
          </p>
        </div>

        {/* Clean Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-7 rounded-[20px] sm:rounded-[24px] bg-[#FFFFFF] border border-[#E2E6ED] flex flex-col justify-between space-y-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] hover:border-[#CBD3DF] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl border border-[#E2E6ED] flex items-center justify-center bg-[#F8FAFC]">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F1F4F8] border border-[#E2E6ED]">
                    {b.tag}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {b.title}
                </h3>
              </div>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
