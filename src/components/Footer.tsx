import React from 'react';
import { BreakerLogo } from './BreakerLogo';

interface FooterProps {
  onOpenShareKit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShareKit }) => {
  return (
    <footer className="py-10 sm:py-12 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0">
              <BreakerLogo size={16} />
            </div>
            <span className="text-[16px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              TaskFuse
            </span>
          </div>
          <span className="text-[12.5px] sm:text-[13px] text-[#64748B]">
            Per-task cost tracking & budget caps for production AI agents.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] sm:text-[13.5px] font-medium text-[#475569]">
          <a href="#audit-console" className="hover:text-[#0F172A] transition-colors">
            Audit Console
          </a>
          <a href="#how-it-works" className="hover:text-[#0F172A] transition-colors">
            How it works
          </a>
          <a href="#calculator" className="hover:text-[#0F172A] transition-colors">
            Spend Estimator
          </a>
          <a href="#pricing" className="hover:text-[#0F172A] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#0F172A] transition-colors">
            FAQ
          </a>
          <button 
            onClick={onOpenShareKit}
            className="text-[#D97706] hover:underline cursor-pointer font-semibold"
          >
            Share Kit
          </button>
        </div>
      </div>
    </footer>
  );
};
