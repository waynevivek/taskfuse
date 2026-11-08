import React, { useState } from 'react';

export const HeroVisual: React.FC = () => {
  const [isCapped, setIsCapped] = useState<boolean>(true);

  // Exact matching 14-point SVG paths for smooth SVG morphing transition
  const cappedPath = "M 65 192 L 100 180 L 115 182 L 135 155 L 155 150 L 175 128 L 190 131 L 210 95 L 230 92 L 250 62 L 275 35 L 330 35 L 380 35 L 440 35";
  const uncappedPath = "M 65 192 L 100 180 L 115 182 L 135 155 L 155 150 L 175 128 L 190 131 L 210 95 L 230 92 L 250 62 L 275 35 L 320 20 L 370 2 L 440 -20";

  return (
    <div className="w-full max-w-[560px] mx-auto">
      {/* Modern High-Craft Bento Frame */}
      <div className="rounded-[24px] border border-[#E2E6ED] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_12px_40px_-6px_rgba(15,23,42,0.08)] transition-all">
        {/* Terminal Header Bar with Pill Controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pb-3.5 mb-4 border-b border-[#EEF1F6]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#E2E6ED]" />
            <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#E2E6ED]" />
            <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#E2E6ED]" />
            <div className="flex items-center gap-1.5 bg-[#F1F4F8] px-2.5 py-0.5 rounded-full">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="font-mono text-[10.5px] sm:text-[11px] text-[#475569] font-medium tracking-tight">
                <span className="hidden sm:inline">proxy / </span>live-task-stream
              </span>
            </div>
          </div>

          {/* Interactive Simulation Switch as Pill Segmented Control */}
          <div className="flex items-center bg-[#F1F4F8] p-0.5 sm:p-1 rounded-full text-[11px] sm:text-[11.5px] font-mono">
            <button
              type="button"
              onClick={() => setIsCapped(true)}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
                isCapped 
                  ? 'bg-[#0F172A] text-[#FFFFFF] shadow-sm' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              $4.00 Cap
            </button>
            <button
              type="button"
              onClick={() => setIsCapped(false)}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
                !isCapped 
                  ? 'bg-[#DC2626] text-[#FFFFFF] shadow-sm' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Uncapped Loop
            </button>
          </div>
        </div>

        {/* Task Metric Mini-Cards */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-4">
          <div className="p-2 sm:p-3 rounded-[14px] sm:rounded-[16px] bg-[#F8FAFC] border border-[#EEF1F6]">
            <div className="text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-wider font-mono font-semibold">Task ID</div>
            <div className="text-[10.5px] sm:text-[12px] text-[#0F172A] font-mono font-bold truncate mt-0.5">triage_8842</div>
          </div>
          <div className="p-2 sm:p-3 rounded-[14px] sm:rounded-[16px] bg-[#F8FAFC] border border-[#EEF1F6]">
            <div className="text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-wider font-mono font-semibold">Cap Setting</div>
            <div className={`text-[10.5px] sm:text-[12px] font-mono font-bold mt-0.5 truncate transition-colors duration-200 ${isCapped ? 'text-[#D97706]' : 'text-[#64748B]'}`}>
              {isCapped ? '$4.00 hard limit' : 'None (No Cap)'}
            </div>
          </div>
          <div className="p-2 sm:p-3 rounded-[14px] sm:rounded-[16px] bg-[#F8FAFC] border border-[#EEF1F6]">
            <div className="text-[9px] sm:text-[10px] text-[#64748B] uppercase tracking-wider font-mono font-semibold">Status</div>
            <div className={`text-[10.5px] sm:text-[12px] font-mono font-bold mt-0.5 truncate transition-colors duration-200 ${isCapped ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
              {isCapped ? 'Halted (Saved $38)' : 'Bleeding ($42)'}
            </div>
          </div>
        </div>

        {/* The Visual Monitor Screen: Graph with grid & morphing cost curve */}
        <div className="relative h-[225px] w-full rounded-[18px] bg-[#FAFBFD] border border-[#E2E6ED] overflow-hidden p-3">
          {/* Subtle graph coordinates grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'linear-gradient(to right, #E2E6ED 1px, transparent 1px), linear-gradient(to bottom, #E2E6ED 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />

          {/* Graph Coordinate Labels */}
          <div className="absolute left-3 top-3 bottom-7 flex flex-col justify-between text-[10px] font-mono text-[#64748B] z-10 pointer-events-none tabular-nums font-medium">
            <span className={`transition-colors duration-200 font-bold ${isCapped ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
              {isCapped ? '$4.00 CAP' : '$42.00 PEAK'}
            </span>
            <span>$3.00</span>
            <span>$2.00</span>
            <span>$1.00</span>
            <span>$0.00</span>
          </div>

          {/* SVG Graph Area with Native Interpolated Morphing */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 460 210" fill="none">
            {/* Horizontal Grid lines */}
            <line x1="60" y1="35" x2="445" y2="35" stroke="#CBD3DF" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
            <line x1="60" y1="75" x2="445" y2="75" stroke="#E2E6ED" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="60" y1="115" x2="445" y2="115" stroke="#E2E6ED" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="60" y1="155" x2="445" y2="155" stroke="#E2E6ED" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="60" y1="195" x2="445" y2="195" stroke="#CBD3DF" strokeWidth="1" opacity="0.9" />

            {/* Threshold Line (Amber solid when capped, red dashed when uncapped) */}
            <line 
              x1="60" 
              y1="35" 
              x2="445" 
              y2="35" 
              stroke={isCapped ? "#D97706" : "#DC2626"} 
              strokeWidth={isCapped ? "2" : "1.5"} 
              strokeDasharray={isCapped ? "none" : "4 4"}
              opacity={isCapped ? 1 : 0.6}
              className="transition-all duration-300 ease-out"
            />

            {/* Morphing Cost Line: single path element interpolates smoothly */}
            <path
              d={isCapped ? cappedPath : uncappedPath}
              stroke={isCapped ? "#0F172A" : "#DC2626"}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />

            {/* Breaker Cut-off Point Indicator */}
            <circle 
              cx={isCapped ? 275 : 370} 
              cy={isCapped ? 35 : 2} 
              r="5" 
              fill={isCapped ? "#D97706" : "#DC2626"} 
              className="transition-all duration-300 ease-out"
            />
            <circle 
              cx={isCapped ? 275 : 370} 
              cy={isCapped ? 35 : 2} 
              r="8" 
              stroke={isCapped ? "#D97706" : "#DC2626"} 
              strokeWidth="1.5" 
              opacity="0.4" 
              className="transition-all duration-300 ease-out animate-pulse"
            />

            {/* Annotation Box: Clean Zentra-style callout pill */}
            <g 
              transform={isCapped ? "translate(225, 48)" : "translate(205, 44)"}
              className="transition-transform duration-300 ease-out"
            >
              <rect 
                x="0" 
                y="0" 
                width={isCapped ? 200 : 220} 
                height="44" 
                rx="8" 
                fill="#FFFFFF" 
                stroke={isCapped ? "#FCD34D" : "#FECACA"} 
                strokeWidth="1" 
                className="transition-all duration-300 ease-out shadow-md"
              />
              <text 
                x="12" 
                y="17" 
                fill={isCapped ? "#D97706" : "#DC2626"} 
                fontSize="10" 
                fontFamily="monospace" 
                fontWeight="700"
                className="transition-colors duration-200"
              >
                {isCapped ? "BUDGET_CAP_EXCEEDED" : "RUNAWAY RETRY LOOP"}
              </text>
              <text 
                x="12" 
                y="33" 
                fill="#475569" 
                fontSize="9.5" 
                fontFamily="monospace"
              >
                {isCapped ? "Call #41 halted at $4.00 • Saved $38" : "200 calls in 4 min • $42.00 billed"}
              </text>
            </g>
          </svg>

          {/* Time axis footer */}
          <div className="absolute right-4 bottom-2 text-[10px] font-mono text-[#64748B] transition-all duration-200 tabular-nums">
            {isCapped ? '00:00:00 — 00:00:48 duration' : '00:00:00 — 00:04:12 duration (loop)'}
          </div>
        </div>

        {/* Screen Base Information Row */}
        <div className="mt-3.5 pt-3 border-t border-[#EEF1F6] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-[#64748B] gap-1.5">
          <span className={`transition-colors duration-200 font-semibold ${isCapped ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
            {isCapped ? 'HTTP 402 / BUDGET_LIMIT_REACHED' : '200 API CALLS / RE-SENDING 38K TOKENS'}
          </span>
          <span className="text-[#059669] font-medium">Proxy benchmark: &lt;5ms latency overhead</span>
        </div>
      </div>
    </div>
  );
};
