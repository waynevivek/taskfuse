import React, { useState } from 'react';

interface SpendCalculatorProps {
  onOpenAudit: (source: string) => void;
}

export const SpendCalculator: React.FC<SpendCalculatorProps> = ({ onOpenAudit }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(18000);
  const [retryRate, setRetryRate] = useState<number>(16);

  // Exact preserved calculation formulas:
  // Retry loop waste represents ~65% of runaway spend
  // Context resend overhead accounts for ~25%
  // Failed unfinished tasks ~10%
  const totalWastedPercent = (retryRate * 1.5) / 100;
  const estimatedWaste = Math.round(monthlySpend * Math.min(totalWastedPercent, 0.45));
  const estimatedRecoverable = Math.round(estimatedWaste * 0.88);
  const netRoiMultiplier = (estimatedRecoverable / 499).toFixed(1);

  return (
    <div className="rounded-[24px] sm:rounded-[28px] border border-[#E2E6ED] bg-[#FFFFFF] p-4 sm:p-9 space-y-6 sm:space-y-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#EEF1F6]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[10.5px] sm:text-[11px] font-mono text-[#D97706] font-semibold">
            <span className="hidden sm:inline">FINOPS RUNAWAY SPEND ESTIMATOR</span>
            <span className="sm:hidden">RUNAWAY SPEND ESTIMATOR</span>
          </div>
          <h3 className="text-[19px] sm:text-[22px] font-bold text-[#0F172A] mt-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
            Estimate your monthly recoverable spend
          </h3>
        </div>
        <div className="text-[11px] sm:text-[12px] font-mono text-[#64748B] px-3 py-1 rounded-full bg-[#F1F4F8] border border-[#E2E6ED] self-start sm:self-auto">
          Sample Estimation Model
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          {/* Monthly Spend Slider */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <label htmlFor="monthly-spend-slider" className="text-[13.5px] sm:text-[14.5px] font-medium text-[#475569]">
                Monthly AI Agent Model Spend
              </label>
              <span className="text-[18px] sm:text-[20px] font-mono font-bold text-[#0F172A] tabular-nums">
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
              className="w-full cursor-pointer accent-[#0F172A]"
            />
            <div className="flex justify-between text-[10.5px] sm:text-[11px] font-mono text-[#64748B] tabular-nums">
              <span>$5,000</span>
              <span>$25,000</span>
              <span>$50,000</span>
            </div>
          </div>

          {/* Retry Rate Slider */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <label htmlFor="retry-rate-slider" className="text-[13.5px] sm:text-[14.5px] font-medium text-[#475569]">
                Estimated Retry / Loop Frequency
              </label>
              <span className="text-[18px] sm:text-[20px] font-mono font-bold text-[#D97706] tabular-nums">
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
            <div className="flex justify-between text-[10.5px] sm:text-[11px] font-mono text-[#64748B]">
              <span>5% (Light)</span>
              <span>15% <span className="hidden sm:inline">(Typical agent)</span></span>
              <span>35% <span className="hidden sm:inline">(High loop)</span></span>
            </div>
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="lg:col-span-5 rounded-[20px] sm:rounded-[22px] bg-[#F8FAFC] border border-[#E2E6ED] p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[13.5px] sm:text-[14px]">
              <span className="text-[#64748B]">Unmonitored loop waste:</span>
              <span className="font-mono text-[#DC2626] font-bold tabular-nums">
                ~${estimatedWaste.toLocaleString()}/mo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13.5px] sm:text-[14px] pt-3 border-t border-[#E2E6ED]">
              <span className="text-[#475569] font-medium">Recoverable with per-task caps:</span>
              <span className="font-mono text-[#D97706] text-[20px] sm:text-[22px] font-extrabold tabular-nums">
                ~${estimatedRecoverable.toLocaleString()}/mo
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] sm:text-[12px] font-mono text-[#059669] font-semibold max-w-full">
              <span>✓</span>
              <span className="truncate">Team plan payoff: {netRoiMultiplier}x monthly return</span>
            </div>
          </div>

          <button
            onClick={() => onOpenAudit('spend_calculator')}
            className="w-full btn-primary text-[14px] py-2.5 cursor-pointer shadow-sm"
          >
            Audit my real numbers for free
          </button>
        </div>
      </div>

      {/* Flagged Assumption Note */}
      <div className="pt-3 text-[12px] text-[#64748B] font-mono border-t border-[#EEF1F6]">
        Note: Calculation estimates loop frequency waste based on IDC (July 2026) enterprise survey findings. Individual results vary with workload retry logic and token payload size.
      </div>
    </div>
  );
};
