import React from 'react';
import { CodePassthrough } from './CodePassthrough';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01.',
      title: 'Swap your base URL.',
      text: "Point your agent's API calls at the TaskFuse proxy — one line of config, no SDK, works with any OpenAI-compatible endpoint.",
      featured: false,
    },
    {
      num: '02.',
      title: 'Tag the task.',
      text: 'Add one header with a task ID. Every call, retry, model switch, and failure gets attributed to the business task it belongs to.',
      featured: true,
    },
    {
      num: '03.',
      title: 'Read the number.',
      text: 'Each finished task shows its real dollar cost — and you can cap any task so a runaway loop stops at your price, not the provider’s.',
      featured: false,
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#0A0B0E] bg-architectural-grid-dark text-white py-16 sm:py-24 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7 space-y-2.5">
            <div className="text-[12px] font-mono text-[#9499A3] uppercase tracking-wider">
              03. Integration Protocol
            </div>
            <h2 className="spec-h2 text-white">
              One config change. One header. One number.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15.5px] text-[#A1A6B0] leading-relaxed max-w-[44ch]">
              Zero SDK installation. Zero proprietary dependencies. Works with any OpenAI-compatible client library.
            </p>
          </div>
        </div>

        {/* Crypto-Inspired Staggered 3-Card Row with Elevated Amber Center Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`rounded-[24px] p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-transform ${
                step.featured
                  ? 'bg-[#F59E0B] text-[#0A0B0E] md:-translate-y-3 shadow-[0_24px_48px_-12px_rgba(245,158,11,0.28)]'
                  : 'bg-[#12141A] text-white border border-white/10'
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`text-[15px] font-mono font-bold tabular-nums ${
                    step.featured ? 'text-[#0A0B0E]' : 'text-[#F59E0B]'
                  }`}
                >
                  {step.num}
                </div>
                <h3
                  className={`text-[21px] font-bold tracking-tight ${
                    step.featured ? 'text-[#0A0B0E]' : 'text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.title}
                </h3>
              </div>

              <p
                className={`text-[15px] leading-relaxed ${
                  step.featured ? 'text-[#0A0B0E]/85 font-medium' : 'text-[#A1A6B0]'
                }`}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Code Passthrough */}
        <div className="max-w-[960px] mx-auto pt-2">
          <CodePassthrough />
        </div>
      </div>
    </section>
  );
};
