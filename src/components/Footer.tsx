import React from 'react';
import { BreakerLogo } from './BreakerLogo';

interface FooterProps {
  onOpenShareKit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShareKit }) => {
  return (
    <footer className="bg-[#0A0B0E] text-white py-12 sm:py-14 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2.5">
            <BreakerLogo size={20} />
            <span className="text-[16px] font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              TaskFuse
            </span>
          </div>
          <span className="hidden sm:inline text-[#6E737D]" aria-hidden="true">·</span>
          <span className="text-[13.5px] text-[#9499A3]">
            Per-task cost tracking & budget caps for production AI agents.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-[#9499A3]">
          <a href="#audit-console" className="hover:text-white transition-colors">
            Audit Console
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            Estimator
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <button
            type="button"
            onClick={onOpenShareKit}
            className="text-[#F59E0B] hover:text-[#FBBF24] cursor-pointer font-semibold transition-colors"
          >
            Share Kit
          </button>
        </div>
      </div>
    </footer>
  );
};
