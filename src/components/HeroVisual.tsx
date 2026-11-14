import React, { useState } from 'react';

export const HeroVisual: React.FC = () => {
  const [isCapped, setIsCapped] = useState<boolean>(true);

  // Smoothly morphing 14-point SVG trajectories
  const cappedPath = "M 65 192 L 100 180 L 115 182 L 135 155 L 155 150 L 175 128 L 190 131 L 210 95 L 230 92 L 250 62 L 275 35 L 330 35 L 380 35 L 440 35";
  const uncappedPath = "M 65 192 L 100 180 L 115 182 L 135 155 L 155 150 L 175 128 L 190 131 L 210 95 L 230 92 L 250 62 L 275 35 L 320 20 L 370 2 L 440 -16";

  return (
    <div className="w-full max-w-[980px] mx-auto">
      {/* Orynthiq + Quantix Inspired Dark Command Center Frame */}
      <div className="rounded-[24px] sm:rounded-[28px] border border-white/12 bg-[#111318] p-4 sm:p-7 shadow-[0_28px_80px_-16px_rgba(0,0,0,0.65)] relative overflow-hidden">
        {/* Subtle Warm Amber Atmospheric Edge Glow (Orynthiq Needs Attention Glow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{
            background: isCapped
              ? 'radial-gradient(circle, rgba(245,158,11,0.75) 0%, rgba(17,19,24,0) 70%)'
              : 'radial-gradient(circle, rgba(239,68,68,0.85) 0%, rgba(17,19,24,0) 70%)',
          }}
        />

        {/* Command Center Header Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-3 text-[12px] font-mono text-[#9499A3]">
            <span className="text-white font-semibold">TaskFuse Monitor</span>
            <span aria-hidden="true">/</span>
            <span>Sample workflow trace</span>
          </div>

          {/* Interactive Simulation Switch */}
          <div className="flex items-center bg-[#0A0B0E] p-1 rounded-full border border-white/10 text-[12px] font-mono self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsCapped(true)}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer font-medium whitespace-nowrap ${
                isCapped
                  ? 'bg-[#F59E0B] text-[#0A0B0E] font-bold'
                  : 'text-[#9499A3] hover:text-white'
              }`}
            >
              $4.00 Cap Active
            </button>
            <button
              type="button"
              onClick={() => setIsCapped(false)}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer font-medium whitespace-nowrap ${
                !isCapped
                  ? 'bg-[#DC2626] text-white font-bold'
                  : 'text-[#9499A3] hover:text-white'
              }`}
            >
              Uncapped Loop
            </button>
          </div>
        </div>

        {/* Main Command Center Grid: Chart Left + Warm Amber Status Spotlight Right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Cost Trajectory Graph */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            {/* Compact Tabular Header Metrics */}
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono text-[#9499A3] uppercase tracking-wider">Task ID</div>
                <div className="text-[13px] sm:text-[15px] text-white font-mono font-semibold mt-0.5 truncate tabular-nums">
                  triage_8842
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#9499A3] uppercase tracking-wider">Cap Limit</div>
                <div className={`text-[13px] sm:text-[15px] font-mono font-semibold mt-0.5 tabular-nums ${isCapped ? 'text-[#F59E0B]' : 'text-[#9499A3]'}`}>
                  {isCapped ? '$4.00 hard stop' : 'None (Open)'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#9499A3] uppercase tracking-wider">Outcome</div>
                <div className={`text-[13px] sm:text-[15px] font-mono font-semibold mt-0.5 tabular-nums ${isCapped ? 'text-[#10B981]' : 'text-[#F87171]'}`}>
                  {isCapped ? 'Saved $38.00' : 'Billed $42.00'}
                </div>
              </div>
            </div>

            {/* SVG Graph Container */}
            <div className="relative h-[230px] w-full rounded-2xl bg-[#0A0B0E] border border-white/10 overflow-hidden p-3">
              {/* Architectural Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-35"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Y-Axis Labels */}
              <div className="absolute left-3 top-3 bottom-7 flex flex-col justify-between text-[10px] font-mono text-[#9499A3] z-10 pointer-events-none tabular-nums">
                <span className={`font-bold ${isCapped ? 'text-[#F59E0B]' : 'text-[#F87171]'}`}>
                  {isCapped ? '$4.00 CAP' : '$42.00 PEAK'}
                </span>
                <span>$3.00</span>
                <span>$2.00</span>
                <span>$1.00</span>
                <span>$0.00</span>
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 460 210" fill="none">
                <line x1="60" y1="35" x2="445" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="75" x2="445" y2="75" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="115" x2="445" y2="115" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="155" x2="445" y2="155" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="195" x2="445" y2="195" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />

                {/* Threshold Line */}
                <line
                  x1="60"
                  y1="35"
                  x2="445"
                  y2="35"
                  stroke={isCapped ? '#F59E0B' : '#EF4444'}
                  strokeWidth={isCapped ? '2' : '1.5'}
                  strokeDasharray={isCapped ? 'none' : '4 4'}
                  opacity={isCapped ? 1 : 0.65}
                  className="transition-all duration-300"
                />

                {/* Morphing Trajectory Curve */}
                <path
                  d={isCapped ? cappedPath : uncappedPath}
                  stroke={isCapped ? '#FFFFFF' : '#F87171'}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />

                {/* Breaker Cut-off Node */}
                <circle
                  cx={isCapped ? 275 : 370}
                  cy={isCapped ? 35 : 2}
                  r="5.5"
                  fill={isCapped ? '#F59E0B' : '#EF4444'}
                  className="transition-all duration-300 ease-out"
                />
                <circle
                  cx={isCapped ? 275 : 370}
                  cy={isCapped ? 35 : 2}
                  r="10"
                  stroke={isCapped ? '#F59E0B' : '#EF4444'}
                  strokeWidth="1.5"
                  opacity="0.45"
                  className="transition-all duration-300 ease-out"
                />

                {/* Callout Card */}
                <g
                  transform={isCapped ? 'translate(222, 50)' : 'translate(202, 46)'}
                  className="transition-transform duration-300 ease-out"
                >
                  <rect
                    x="0"
                    y="0"
                    width={isCapped ? 206 : 224}
                    height="44"
                    rx="10"
                    fill="#161922"
                    stroke={isCapped ? 'rgba(245,158,11,0.55)' : 'rgba(239,68,68,0.55)'}
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="17"
                    fill={isCapped ? '#FBBF24' : '#FCA5A5'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    {isCapped ? 'HTTP 402 · CAP ENFORCED' : 'RUNAWAY RETRY LOOP'}
                  </text>
                  <text
                    x="12"
                    y="33"
                    fill="#CBD5E1"
                    fontSize="9.5"
                    fontFamily="monospace"
                  >
                    {isCapped ? 'Call #41 halted at $4.00' : '200 calls in 4 min · $42.00'}
                  </text>
                </g>
              </svg>

              <div className="absolute right-4 bottom-2 text-[10px] font-mono text-[#9499A3] tabular-nums">
                {isCapped ? '00:00:48 elapsed' : '00:04:12 elapsed'}
              </div>
            </div>
          </div>

          {/* Right: Orynthiq-Inspired Warm Amber Spotlight Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl p-5 border border-white/12 relative overflow-hidden"
            style={{
              background: isCapped
                ? 'linear-gradient(155deg, rgba(217,119,6,0.34) 0%, rgba(17,19,24,0.96) 65%)'
                : 'linear-gradient(155deg, rgba(220,38,38,0.34) 0%, rgba(17,19,24,0.96) 65%)',
            }}
          >
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#FCD34D]">
                {isCapped ? 'Circuit Breaker Triggered' : 'Unmonitored Exposure'}
              </div>

              <div className="text-[30px] sm:text-[34px] font-bold text-white font-mono tabular-nums leading-none">
                {isCapped ? '$4.00' : '$42.00'}
              </div>

              <p className="text-[13.5px] text-[#D1D5DB] leading-relaxed">
                {isCapped
                  ? 'Retry loop repeated a 38.4K token context payload at call #41. TaskFuse returned HTTP 402 before provider billing escalated.'
                  : 'Without a per-task ceiling, the agent resent its full context 200 times over 4 minutes before timing out.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 space-y-2 text-[12px] font-mono text-[#9499A3]">
              <div className="flex justify-between">
                <span>Clean baseline</span>
                <span className="text-white tabular-nums">$0.06</span>
              </div>
              <div className="flex justify-between">
                <span>Retry overhead</span>
                <span className="text-[#F59E0B] tabular-nums">{isCapped ? '$3.94' : '$41.94'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
