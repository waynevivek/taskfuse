import React, { useState } from 'react';
import { submitLead } from '../lib/leads';

interface LeadCaptureFormProps {
  source: string;
  tier?: string | null;
  className?: string;
  onSuccess?: () => void;
  compact?: boolean;
  dark?: boolean;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  tier = null,
  className = '',
  onSuccess,
  compact = false,
  dark = false,
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
      <div className={`p-4 rounded-xl border ${dark ? 'border-emerald-500/30 bg-emerald-950/40 text-white' : 'border-[#BBF7D0] bg-[#F0FDF4] text-[#0B0C0E]'} ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="space-y-1">
            <p className={`text-[14px] font-semibold ${dark ? 'text-white' : 'text-[#0B0C0E]'}`}>
              You're on the founding list.
            </p>
            <p className={`text-[13px] leading-relaxed max-w-[55ch] ${dark ? 'text-[#A1A6B0]' : 'text-[#4B5058]'}`}>
              We onboard in small weekly batches. You will receive an email with setup instructions (a one-line proxy base-URL change) when your slot opens, followed by your 7-day spend audit.
            </p>
            {tier && (
              <p className="text-[12px] font-mono text-[#D97706] pt-1">
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

        <div
          className={`rounded-2xl sm:rounded-full p-1.5 border flex flex-col sm:flex-row items-center gap-2 transition-all ${
            dark
              ? 'border-white/15 bg-[#12141A] focus-within:border-[#F59E0B]'
              : 'border-[#D6D6CE] bg-white shadow-[0_2px_10px_rgba(11,12,14,0.04)] focus-within:border-[#0B0C0E]'
          }`}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourcompany.com"
            required
            aria-label="Work email address"
            className={`w-full flex-1 px-4 py-2 sm:py-1.5 bg-transparent border-0 outline-none focus:ring-0 ${
              compact ? 'text-[14.5px]' : 'text-[15px]'
            } ${
              dark
                ? 'text-white placeholder-[#6E737D]'
                : 'text-[#0B0C0E] placeholder-[#9499A3]'
            }`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-[13.5px] font-semibold tracking-tight transition-colors disabled:opacity-60 shrink-0 cursor-pointer whitespace-nowrap min-h-[42px] ${
              dark
                ? 'bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0A0B0E]'
                : 'bg-[#0B0C0E] hover:bg-[#22252D] text-white'
            }`}
          >
            {isSubmitting ? 'Reserving spot...' : 'Get my free spend audit'}
          </button>
        </div>

        {errorMessage && (
          <p className="text-[12px] text-[#DC2626] font-medium pt-1" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
