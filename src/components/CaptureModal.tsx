import React, { useEffect } from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';

interface CaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
  tier?: string | null;
}

export const CaptureModal: React.FC<CaptureModalProps> = ({
  isOpen,
  onClose,
  source,
  tier,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[28px] bg-[#FFFFFF] border border-[#E2E6ED] p-5 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F4F8] text-[#64748B] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[11px] font-mono text-[#D97706] font-semibold">
            {tier ? `Reserve ${tier} Tier` : 'Founding User Early Access'}
          </div>
          <h3 className="text-[22px] font-bold text-[#0F172A] tracking-tight leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
            Get your free 7-day Agent Spend Audit
          </h3>
          <p className="text-[14.5px] text-[#475569] leading-relaxed">
            Reserve early access plus a free seven-day Agent Spend Audit of one workflow at launch — a one-page report with your cost per completed task, retry-loop count, top three waste sources, and estimated monthly savings.
          </p>
        </div>

        <LeadCaptureForm
          source={source}
          tier={tier}
          compact
          onSuccess={() => {
            // Keep open so user can read confirmation note
          }}
        />
      </div>
    </div>
  );
};
