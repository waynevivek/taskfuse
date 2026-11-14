import React from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-[28px] bg-[#FFFFFF] border border-[#E2E2DC] p-7 sm:p-14 text-center space-y-6 shadow-[0_12px_40px_-14px_rgba(11,12,14,0.06)]">
          <div className="text-[12px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
            Founding Access Invitation
          </div>

          <h2 className="spec-h2 text-[#0B0C0E] max-w-[660px] mx-auto">
            Know your cost per finished task before the next invoice teaches it to you.
          </h2>

          <p className="spec-body text-[16px] sm:text-[17px] text-[#4B5058] max-w-[560px] mx-auto">
            Founding users get a free seven-day Agent Spend Audit of one workflow — no card, no commitment, your real numbers first.
          </p>

          <div className="pt-2 max-w-[500px] mx-auto text-left">
            <LeadCaptureForm source="final_cta" />
          </div>
        </div>
      </div>
    </section>
  );
};
