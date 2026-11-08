import React from 'react';

export const Problem: React.FC = () => {
  const pains = [
    {
      num: '01',
      title: 'The Silent 200-Call Loop',
      desc: 'An agent got stuck in a retry loop and made 200 API calls in four minutes. The dashboard just logged "usage."',
      badge: 'Uncapped Loop',
    },
    {
      num: '02',
      title: 'Unpredictable Overnight Runs',
      desc: 'The same overnight run cost $200 one night and $7 the next — for the same output. Nobody can say why.',
      badge: 'Variance',
    },
    {
      num: '03',
      title: 'Compounding Context Resend',
      desc: 'Agents burn 5–30x more tokens per task than a chatbot, because they loop, retry, and resend full context (Gartner).',
      badge: 'Token Bleed',
    },
    {
      num: '04',
      title: 'Tokens vs. Business Tasks',
      desc: 'Your CFO asks what one closed ticket costs. Your observability tool shows tokens per request. Those are different questions.',
      badge: 'Unit Economics',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-[760px] mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[11px] sm:text-[12px] font-mono text-[#D97706] font-semibold mb-3">
            <span>THE OBSERVABILITY GAP</span>
          </div>
          <h2 className="spec-h2">
            Your token dashboard is hiding the real bill
          </h2>
          <p className="spec-body text-[16px] sm:text-[17px] text-[#475569] mt-2">
            Existing tools report raw token averages across disconnected calls. They cannot tell you what one completed business task actually cost.
          </p>
        </div>

        {/* 4 Pains as Modern Bento Cards with Refined Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {pains.map((pain, idx) => (
            <div 
              key={idx} 
              className="rounded-[20px] sm:rounded-[22px] bg-[#FFFFFF] border border-[#E2E6ED] p-5 sm:p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] hover:border-[#CBD3DF] transition-all flex flex-col justify-between space-y-3.5 sm:space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono tabular-nums text-[13px] font-bold text-[#D97706] px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A]">
                  {pain.num}
                </span>
                <span className="text-[11px] font-mono text-[#64748B] px-2.5 py-0.5 rounded-full bg-[#F1F4F8] border border-[#E2E6ED]">
                  {pain.badge}
                </span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#0F172A] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  {pain.title}
                </h3>
                <p className="text-[15px] text-[#475569] leading-relaxed">
                  {pain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
