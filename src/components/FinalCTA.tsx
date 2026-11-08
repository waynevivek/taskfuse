import React from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 md:py-28 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-[880px] mx-auto rounded-[24px] sm:rounded-[32px] bg-[#FFFFFF] border border-[#E2E6ED] p-5 sm:p-10 md:p-14 text-center space-y-5 sm:space-y-6 shadow-[0_12px_45px_-8px_rgba(15,23,42,0.08)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[11px] sm:text-[11.5px] font-mono text-[#D97706] font-semibold max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse shrink-0" />
            <span className="hidden sm:inline">FOUNDING ACCESS INVITATION</span>
            <span className="sm:hidden">FOUNDING ACCESS</span>
          </div>

          <h2 className="spec-h2 max-w-[680px] mx-auto">
            Know your cost per finished task before the next invoice teaches it to you.
          </h2>
          
          <p className="spec-body text-[15.5px] sm:text-[16.5px] text-[#475569] max-w-[580px] mx-auto">
            Founding users get a free seven-day Agent Spend Audit of one workflow — no card, no commitment, your real numbers first.
          </p>

          <div className="pt-2 sm:pt-3 max-w-[480px] mx-auto text-left">
            <LeadCaptureForm source="final_cta" />
          </div>
        </div>
      </div>
    </section>
  );
};
