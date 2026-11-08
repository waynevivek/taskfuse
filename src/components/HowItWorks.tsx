import React from 'react';
import { CodePassthrough } from './CodePassthrough';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: 'STEP 01',
      title: 'Swap your base URL.',
      text: "Point your agent's API calls at the TaskFuse proxy — one line of config, no SDK, works with any OpenAI-compatible endpoint.",
    },
    {
      num: 'STEP 02',
      title: 'Tag the task.',
      text: 'Add one header with a task ID. Every call, retry, model switch, and failure gets attributed to the business task it belongs to.',
    },
    {
      num: 'STEP 03',
      title: 'Read the number.',
      text: 'Each finished task shows its real dollar cost — and you can cap any task so a runaway loop stops at your price, not the provider’s.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-24 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        <div className="max-w-[760px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[11px] sm:text-[12px] font-mono text-[#D97706] font-semibold mb-3">
            <span>INTEGRATION PROTOCOL</span>
          </div>
          <h2 className="spec-h2">
            One config change. One header. One number.
          </h2>
          <p className="spec-body text-[16px] sm:text-[17px] text-[#475569] mt-2">
            Zero SDK installation. Zero proprietary dependencies. Sub-5ms proxy overhead in production.
          </p>
        </div>

        {/* 3 Step Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="p-5 sm:p-7 rounded-[20px] sm:rounded-[24px] bg-[#FFFFFF] border border-[#E2E6ED] space-y-3 sm:space-y-3.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] hover:border-[#CBD3DF] transition-all"
            >
              <div className="inline-block font-mono tabular-nums text-[12px] font-bold text-[#D97706] px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A]">
                {step.num}
              </div>
              <h3 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
                {step.title}
              </h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Code Passthrough */}
        <div className="max-w-[960px] mx-auto">
          <CodePassthrough />
        </div>
      </div>
    </section>
  );
};
