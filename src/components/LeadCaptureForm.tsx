import React, { useState } from 'react';
import { submitLead } from '../lib/leads';

interface LeadCaptureFormProps {
  source: string;
  tier?: string | null;
  className?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  tier = null,
  className = '',
  onSuccess,
  compact = false,
}) => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid work email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        email,
        source,
        tier,
        honeypot,
      });

      if (res.success) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setErrorMessage('Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-4 rounded-[6px] border border-[#BBF7D0] bg-[#F0FDF4] ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#15803D]/10 text-[#15803D] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-[14px] font-semibold text-[#111315]">
              You're on the founding list.
            </p>
            <p className="text-[13px] text-[#4D5156] leading-relaxed max-w-[55ch]">
              We onboard in small weekly batches. You will receive an email with setup instructions (a one-line proxy base-URL change) when your slot opens, followed by your 7-day spend audit.
            </p>
            {tier && (
              <p className="text-[12px] font-mono text-[#C26700] pt-1">
                Reserved Tier: {tier}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Honeypot field for bot prevention */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor={`hp-${source}`}>Leave blank</label>
          <input
            id={`hp-${source}`}
            type="text"
            name="hp_field"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {compact ? (
          /* Compact Modal Layout */
          <div className="rounded-2xl sm:rounded-full p-1.5 border border-[#E2E6ED] bg-white flex flex-col sm:flex-row items-center gap-2 shadow-xs focus-within:border-[#CBD3DF] transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              required
              aria-label="Work email address"
              className="w-full flex-1 px-4 py-2 sm:py-1.5 bg-transparent border-0 outline-none text-[#0F172A] placeholder-[#94A3B8] text-[14.5px] focus:ring-0"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2.5 rounded-full text-[13.5px] font-semibold tracking-tight transition-all disabled:opacity-60 shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              {isSubmitting ? 'Reserving spot...' : 'Get my free spend audit'}
            </button>
          </div>
        ) : (
          /* Single white pill bar on sm: screens and wider */
          <div className="rounded-2xl sm:rounded-full p-1.5 border border-[#E2E6ED] bg-white flex flex-col sm:flex-row items-center gap-2 shadow-xs focus-within:border-[#CBD3DF] transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              required
              aria-label="Work email address"
              className="w-full flex-1 px-4 py-2 sm:py-1.5 bg-transparent border-0 outline-none text-[#0F172A] placeholder-[#94A3B8] text-[15px] focus:ring-0"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2.5 rounded-full text-[13.5px] font-semibold tracking-tight transition-all disabled:opacity-60 shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              {isSubmitting ? 'Reserving spot...' : 'Get my free spend audit'}
            </button>
          </div>
        )}

        {errorMessage && (
          <p className="text-[12px] text-[#B91C1C] font-medium pt-1" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
