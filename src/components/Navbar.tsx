import React, { useState } from 'react';
import { BreakerLogo } from './BreakerLogo';

interface NavbarProps {
  onOpenAudit: (source: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-3 z-50 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="bg-[#0B0C0E]/95 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 shadow-[0_12px_32px_-8px_rgba(11,12,14,0.28)] flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-md"
        >
          <BreakerLogo size={20} />
          <span
            className="text-[16px] sm:text-[17px] font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            TaskFuse
          </span>
        </a>

        {/* Zone 2: Clean Typographic Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[13.5px] font-medium text-[#A1A6B0]">
          <a
            href="#audit-console"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Audit Console
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            How it works
          </a>
          <a
            href="#calculator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Estimator
          </a>
          <a
            href="#pricing"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenAudit('nav_button')}
            className="bg-white hover:bg-[#F59E0B] text-[#0B0C0E] font-semibold text-[13px] sm:text-[13.5px] px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[38px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
          >
            <span className="hidden sm:inline">Get free audit</span>
            <span className="sm:hidden">Free audit</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-3 bg-[#0B0C0E] border border-white/10 rounded-2xl shadow-2xl space-y-1 text-[14px]">
          <a
            href="#audit-console"
            onClick={handleNavClick}
            className="block px-3.5 py-2.5 rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
          >
            Audit Console
          </a>
          <a
            href="#how-it-works"
            onClick={handleNavClick}
            className="block px-3.5 py-2.5 rounded-xl text-[#A1A6B0] hover:text-white hover:bg-white/10 transition-colors"
          >
            How it works
          </a>
          <a
            href="#calculator"
            onClick={handleNavClick}
            className="block px-3.5 py-2.5 rounded-xl text-[#A1A6B0] hover:text-white hover:bg-white/10 transition-colors"
          >
            Estimator
          </a>
          <a
            href="#pricing"
            onClick={handleNavClick}
            className="block px-3.5 py-2.5 rounded-xl text-[#A1A6B0] hover:text-white hover:bg-white/10 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={handleNavClick}
            className="block px-3.5 py-2.5 rounded-xl text-[#A1A6B0] hover:text-white hover:bg-white/10 transition-colors"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
