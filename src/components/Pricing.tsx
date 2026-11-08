import React from 'react';

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const tiers = [
    {
      name: 'Starter',
      price: '$149',
      period: '/mo',
      tasks: 'Up to 100K completed tasks/month',
      features: [
        '3 workflows',
        'Cost-per-task dashboard + retry-loop detection',
        'Weekly audit report by email',
      ],
      bestFor: 'one production agent and a founder watching the bill.',
      cta: 'Reserve Starter pricing',
      isRecommended: false,
    },
    {
      name: 'Team',
      price: '$499',
      period: '/mo',
      tasks: 'Up to 500K completed tasks/month',
      features: [
        'Unlimited workflows',
        'Per-task budget caps with hard stops',
        '5 seats + priority support',
      ],
      bestFor: 'AI-native teams spending $5K–$50K a month on agents.',
      cta: 'Reserve Team pricing',
      isRecommended: true,
    },
    {
      name: 'Scale',
      price: '$1,499',
      period: '/mo',
      tasks: 'Up to 2M completed tasks/month',
      features: [
        '15 seats',
        '12-month history + CSV export',
        'Onboarding call + Slack support',
      ],
      bestFor: 'ops leads running agents across several teams.',
      cta: 'Reserve Scale pricing',
      isRecommended: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-[760px] mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[11px] sm:text-[12px] font-mono text-[#D97706] font-semibold mb-3">
            <span>TRANSPARENT SUBSCRIPTION</span>
          </div>
          <h2 className="spec-h2">
            Priced per completed task, not per token
          </h2>
          <p className="spec-body text-[16px] sm:text-[17px] text-[#475569] mt-2">
            No surprise overage fees. Lock in early founding pricing with a free 7-day spend audit.
          </p>
        </div>

        {/* 3 Bento Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-[24px] sm:rounded-[28px] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between transition-all ${
                tier.isRecommended
                  ? 'border-2 border-[#D97706] shadow-[0_12px_40px_-6px_rgba(217,119,6,0.12)]'
                  : 'border border-[#E2E6ED] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)] hover:border-[#CBD3DF]'
              }`}
            >
              {/* Amber Badge for Recommended tier */}
              {tier.isRecommended && (
                <div className="absolute -top-3.5 left-6 sm:left-8 px-3 py-0.5 rounded-full bg-[#D97706] text-[#FFFFFF] text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase font-mono shadow-sm">
                  Recommended Plan
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#EEF1F6] pb-5">
                  <h3 className="text-[20px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-bold text-[#0F172A] tabular-nums font-mono">
                      {tier.price}
                    </span>
                    <span className="text-[14px] text-[#64748B]">
                      {tier.period}
                    </span>
                  </div>
                </div>

                <div className="text-[13.5px] font-mono font-semibold text-[#D97706]">
                  {tier.tasks}
                </div>

                {/* Features list */}
                <div className="pt-2 border-t border-[#EEF1F6] space-y-3">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 text-[14.5px] text-[#0F172A]">
                      <span className="text-[#059669] font-bold shrink-0 text-[13px] mt-0.5">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Best for */}
                <div className="pt-4 border-t border-[#EEF1F6] text-[13px] text-[#64748B] leading-relaxed">
                  <span className="text-[#0F172A] font-semibold">Best for: </span>
                  {tier.bestFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-7">
                <button
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full cursor-pointer ${
                    tier.isRecommended ? 'btn-amber' : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
