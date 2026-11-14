import React, { useState } from 'react';

interface SpendCalculatorProps {
  onOpenAudit: (source: string) => void;
}

export const SpendCalculator: React.FC<SpendCalculatorProps> = ({ onOpenAudit }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(18000);
  const [retryRate, setRetryRate] = useState<number>(16);

  const totalWastedPercent = (retryRate * 1.5) / 100;
  const estimatedWaste = Math.round(monthlySpend * Math.min(totalWastedPercent, 0.45));
  const estimatedRecoverable = Math.round(estimatedWaste * 0.88);
  const netRoiMultiplier = (estimatedRecoverable / 499).toFixed(1);

  return (
    <div className="rounded-[24px] sm:rounded-[28px] border border-[#E2E2DC] bg-[#FFFFFF] p-6 sm:p-9 space-y-8 shadow-[0_4px_20px_-4px_rgba(11,12,14,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 border-b border-[#ECECE8]">
        <div className="space-y-1">
          <div className="text-[11.5px] font-mono text-[#6E737D] uppercase tracking-wider">
            Runaway Spend Estimator · Sample Model
          </div>
          <h3 className="text-[20px] sm:text-[24px] font-bold text-[#0B0C0E]" style={{ fontFamily: 'var(--font-heading)' }}>
            Estimate your monthly recoverable spend
          </h3>
        </div>
        <div className="text-[12px] font-mono text-[#6E737D]">
          Adjust spend & loop frequency
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-7">
          <div className="space-y-3">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <label htmlFor="monthly-spend-slider" className="text-[14.5px] font-medium text-[#4B5058]">
                Monthly AI Agent Model Spend
              </label>
              <span className="text-[20px] font-mono font-bold text-[#0B0C0E] tabular-nums">
                ${monthlySpend.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="monthly-spend-slider"
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#0B0C0E]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#6E737D] tabular-nums">
              <span>$5,000</span>
              <span>$25,000</span>
              <span>$50,000</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <label htmlFor="retry-rate-slider" className="text-[14.5px] font-medium text-[#4B5058]">
                Estimated Retry / Loop Frequency
              </label>
              <span className="text-[20px] font-mono font-bold text-[#D97706] tabular-nums">
                {retryRate}% of runs
              </span>
            </div>
            <input
              id="retry-rate-slider"
              type="range"
              min="5"
              max="35"
              step="1"
              value={retryRate}
              onChange={(e) => setRetryRate(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#D97706]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#6E737D]">
              <span>5% (Light)</span>
              <span>15% (Typical agent)</span>
              <span>35% (High loop)</span>
            </div>
          </div>
        </div>

        {/* Results Column separated cleanly by hairline */}
        <div className="lg:col-span-5 lg:pl-8 lg:border-l border-[#ECECE8] space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-[#6E737D]">Unmonitored loop waste:</span>
              <span className="font-mono text-[#DC2626] font-bold tabular-nums">
                ~${estimatedWaste.toLocaleString()}/mo
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2 pt-3 border-t border-[#ECECE8]">
              <span className="text-[14px] text-[#0B0C0E] font-medium">Recoverable with caps:</span>
              <span className="font-mono text-[#D97706] text-[24px] font-bold tabular-nums">
                ~${estimatedRecoverable.toLocaleString()}/mo
              </span>
            </div>

            <div className="text-[12.5px] font-mono text-[#059669] font-medium pt-1 tabular-nums">
              ✓ Team plan payoff: {netRoiMultiplier}x monthly return
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenAudit('spend_calculator')}
            className="w-full btn-primary text-[14px] py-2.5"
          >
            Audit my real numbers for free
          </button>
        </div>
      </div>

      <div className="pt-4 text-[12px] text-[#6E737D] font-mono border-t border-[#ECECE8]">
        Note: Calculation estimates loop frequency waste based on IDC (July 2026) enterprise survey findings. Individual results vary with workload retry logic and payload size.
      </div>
    </div>
  );
};
