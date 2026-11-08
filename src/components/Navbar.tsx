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
    <header className="sticky top-3 z-50 w-full max-w-[1240px] mx-auto px-3 sm:px-6 mb-2">
      <div className="bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E2E6ED] rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] flex items-center justify-between gap-2 sm:gap-4 transition-all">
        {/* Brand Zone */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-[#0F172A] hover:opacity-85 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0">
            <BreakerLogo size={18} />
          </div>
          <span 
            className="text-[16px] sm:text-[17px] font-bold tracking-tight text-[#0F172A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            TaskFuse
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Proxy &lt;5ms
          </span>
        </a>

        {/* Center Pill Navigation (Desktop) */}
        <nav className="hidden md:flex items-center bg-[#F1F4F8] p-1 rounded-full text-[13.5px] font-medium text-[#475569]">
          <a 
            href="#audit-console" 
            className="bg-[#0F172A] text-[#FFFFFF] shadow-sm px-4 py-1.5 rounded-full transition-all"
          >
            Live Audit Console
          </a>
          <a 
            href="#how-it-works" 
            className="px-3.5 py-1.5 rounded-full hover:text-[#0F172A] transition-colors"
          >
            How it works
          </a>
          <a 
            href="#calculator" 
            className="px-3.5 py-1.5 rounded-full hover:text-[#0F172A] transition-colors"
          >
            Spend Estimator
          </a>
          <a 
            href="#pricing" 
            className="px-3.5 py-1.5 rounded-full hover:text-[#0F172A] transition-colors"
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            className="px-3.5 py-1.5 rounded-full hover:text-[#0F172A] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenAudit('nav_button')}
            className="btn-primary-sm cursor-pointer whitespace-nowrap shrink-0 text-[12.5px] sm:text-[13.5px] px-3.5 sm:px-4 py-1.5 sm:py-2"
          >
            <span className="hidden sm:inline">Get my free spend audit</span>
            <span className="sm:hidden">Free Audit</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-[#F1F4F8] border border-[#E2E6ED] text-[#475569] flex items-center justify-center cursor-pointer hover:text-[#0F172A] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-3 bg-[#FFFFFF] border border-[#E2E6ED] rounded-2xl shadow-xl space-y-1">
          <a
            href="#audit-console"
            onClick={handleNavClick}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0F172A] text-[#FFFFFF] text-[13.5px] font-semibold"
          >
            <span>Live Audit Console</span>
            <span className="text-[11px] font-mono text-[#FCD34D]">Sample</span>
          </a>
          <a
            href="#how-it-works"
            onClick={handleNavClick}
            className="block px-3.5 py-2 rounded-xl text-[#475569] hover:bg-[#F1F4F8] text-[13.5px] font-medium transition-colors"
          >
            How it works
          </a>
          <a
            href="#calculator"
            onClick={handleNavClick}
            className="block px-3.5 py-2 rounded-xl text-[#475569] hover:bg-[#F1F4F8] text-[13.5px] font-medium transition-colors"
          >
            Spend Estimator
          </a>
          <a
            href="#pricing"
            onClick={handleNavClick}
            className="block px-3.5 py-2 rounded-xl text-[#475569] hover:bg-[#F1F4F8] text-[13.5px] font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={handleNavClick}
            className="block px-3.5 py-2 rounded-xl text-[#475569] hover:bg-[#F1F4F8] text-[13.5px] font-medium transition-colors"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
