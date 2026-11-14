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
    <section id="pricing" className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2DC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-[740px] mb-10 sm:mb-14 space-y-2.5">
          <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
            05. Transparent Subscription
          </div>
          <h2 className="spec-h2 text-[#0B0C0E]">
            Priced per completed task, not per token
          </h2>
          <p className="spec-body text-[16.5px] text-[#4B5058] max-w-[56ch]">
            No surprise overage fees. Lock in founding pricing with a free 7-day spend audit.
          </p>
        </div>

        {/* Curely-Inspired 3-Tier Comparison with Obsidian Elevated Center Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[24px] p-7 sm:p-8 flex flex-col justify-between transition-colors ${
                tier.isRecommended
                  ? 'bg-[#111318] text-white border border-[#F59E0B]/60 shadow-[0_24px_60px_-15px_rgba(11,12,14,0.35)]'
                  : 'bg-[#FFFFFF] text-[#0B0C0E] border border-[#E2E2DC] shadow-[0_2px_12px_rgba(11,12,14,0.03)]'
              }`}
            >
              <div className="space-y-6">
                <div className={`flex items-baseline justify-between pb-5 border-b ${tier.isRecommended ? 'border-white/10' : 'border-[#ECECE8]'}`}>
                  <div>
                    <h3
                      className={`text-[20px] font-bold ${tier.isRecommended ? 'text-white' : 'text-[#0B0C0E]'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {tier.name}
                    </h3>
                    {tier.isRecommended && (
                      <div className="text-[11px] font-mono text-[#F59E0B] uppercase tracking-wider mt-1">
                        Recommended Plan
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[36px] font-bold tabular-nums font-mono ${tier.isRecommended ? 'text-white' : 'text-[#0B0C0E]'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-[14px] ${tier.isRecommended ? 'text-[#9499A3]' : 'text-[#6E737D]'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                <div className={`text-[13.5px] font-mono font-semibold tabular-nums ${tier.isRecommended ? 'text-[#F59E0B]' : 'text-[#D97706]'}`}>
                  {tier.tasks}
                </div>

                {/* Features list */}
                <div className={`pt-4 border-t space-y-3 ${tier.isRecommended ? 'border-white/10' : 'border-[#ECECE8]'}`}>
                  {tier.features.map((f, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 text-[14.5px] ${tier.isRecommended ? 'text-[#E5E7EB]' : 'text-[#0B0C0E]'}`}
                    >
                      <span className={`font-bold shrink-0 text-[13px] mt-0.5 ${tier.isRecommended ? 'text-[#F59E0B]' : 'text-[#059669]'}`}>
                        ✓
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Best for */}
                <div className={`pt-4 border-t text-[13px] leading-relaxed ${tier.isRecommended ? 'border-white/10 text-[#9499A3]' : 'border-[#ECECE8] text-[#6E737D]'}`}>
                  <span className={`font-semibold ${tier.isRecommended ? 'text-white' : 'text-[#0B0C0E]'}`}>
                    Best for:{' '}
                  </span>
                  {tier.bestFor}
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full ${
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
