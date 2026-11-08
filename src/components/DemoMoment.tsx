import React, { useState } from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { SpendCalculator } from './SpendCalculator';

interface DemoMomentProps {
  onOpenAudit: (source: string) => void;
}

export const DemoMoment: React.FC<DemoMomentProps> = ({ onOpenAudit }) => {
  const [activeQuery, setActiveQuery] = useState<string>('Why did triage_run_8842 cost $42?');
  const [activeTab, setActiveTab] = useState<'funnel' | 'breakdown' | 'trace'>('funnel');
  const [selectedBar, setSelectedBar] = useState<number>(2); // Default to Retry Loops

  const queries = [
    'Why did triage_run_8842 cost $42?',
    'Where is my biggest token waste?',
    'How much do we save with a $4 cap?',
  ];

  return (
    <section id="audit-console" className="py-16 md:py-24 border-b border-[#E2E6ED]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Title & Subheading */}
        <div className="max-w-[840px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[12px] font-mono text-[#D97706] font-semibold mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
            <span>THE ARTIFACT • LIVE AUDIT CONSOLE</span>
          </div>
          <h2 className="spec-h2">
            This is the audit founding users get in week one
          </h2>
          <p className="spec-body text-[17px] text-[#475569] mt-2">
            Sample numbers from a production support-triage workflow. Real cost per finished task, isolated retry loops, and dollar budget limits.
          </p>
        </div>

        {/* Master Bento Container (Mirroring Zentra & Autopilot Craftsmanship) */}
        <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[32px] p-4 sm:p-7 shadow-[0_12px_45px_-8px_rgba(15,23,42,0.08)] space-y-6">
          {/* Top Window Navigation Bar (Zentra Pill Segments) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EEF1F6]">
            {/* Title & Status */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D97706] font-bold text-[14px]">
                TF
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Support Triage Audit
                  </h3>
                  <span className="text-[11px] font-mono text-[#475569] px-2 py-0.5 rounded-full bg-[#F1F4F8] border border-[#E2E6ED]">
                    REF: TF-2026-WK07
                  </span>
                </div>
                <div className="text-[12.5px] text-[#64748B]">
                  Workflow: Zendesk Ticket Resolver · 7-day observation period
                </div>
              </div>
            </div>

            {/* Pill Filters & Period Selectors */}
            <div className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-[#475569]">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E6ED] hover:border-[#CBD3DF] cursor-pointer transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Feb 18 – Feb 25, 2026</span>
                <span className="text-[#94A3B8]">▾</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E6ED]">
                <span className="text-[#94A3B8]">vs</span>
                <span>Prior 7 Days</span>
                <span className="text-[#94A3B8]">▾</span>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E6ED]">
                <span>Daily</span>
                <span className="text-[#94A3B8] ml-1">▾</span>
              </div>

              <button
                type="button"
                onClick={() => onOpenAudit('demo_csv_export')}
                className="btn-primary-sm text-[12px] py-1.5 px-3.5 ml-auto sm:ml-0"
              >
                Export CSV Audit
              </button>
            </div>
          </div>

          {/* Primary Bento Grid: Funnel Hero (Left) + Gross Volume / Waste Breakdown (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: Task Execution & Cost Funnel (Zentra Payments Style) */}
            <div className="lg:col-span-8 rounded-[24px] border border-[#E2E6ED] bg-[#F8FAFC]/60 p-4 sm:p-6 flex flex-col justify-between space-y-6">
              {/* Funnel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                    TASK EXECUTION & SPEND FUNNEL
                  </div>
                  <div className="text-[15px] sm:text-[17px] font-bold text-[#0F172A] mt-0.5">
                    1,412 Completed Tasks · $2.02 Blended Unit Cost
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#EEF2F6] p-1 rounded-full text-[12px] self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTab('funnel')}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      activeTab === 'funnel' ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs' : 'text-[#64748B]'
                    }`}
                  >
                    Funnel
                  </button>
                  <button
                    onClick={() => setActiveTab('trace')}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      activeTab === 'trace' ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs' : 'text-[#64748B]'
                    }`}
                  >
                    Task Trace
                  </button>
                </div>
              </div>

              {activeTab === 'funnel' ? (
                /* Volumetric 3D-Style Textured Bar Chart */
                <div className="relative pt-4 sm:pt-6 pb-2">
                  {/* Top Floating Inspection Tooltip Pill (Responsive) */}
                  <div className="flex justify-center mb-5 sm:mb-6 px-1">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-[#0F172A] text-[#FFFFFF] px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg text-[11px] sm:text-[12.5px] font-mono text-center max-w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                        <span className="font-semibold text-[#FCD34D]">214 Retry Tasks</span>
                      </div>
                      <span className="text-[#94A3B8] hidden sm:inline">|</span>
                      <span>Cost: $6.70 avg (5.7x clean)</span>
                      <span className="text-[#94A3B8] hidden sm:inline">|</span>
                      <span className="text-[#FCA5A5] font-semibold">-$1,181 Waste</span>
                    </div>
                  </div>

                  {/* 5 Funnel Stages with Textured Striped Volumetric Bars */}
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-5 items-end h-[210px] px-0.5 sm:px-4">
                    {/* Stage 1: Initiated */}
                    <div 
                      onClick={() => setSelectedBar(0)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#64748B] mb-1.5 tabular-nums">
                        1,412
                      </div>
                      <div className="w-full max-w-[56px] h-[180px] rounded-t-[12px] sm:rounded-t-[14px] pattern-stripes-slate transition-all group-hover:opacity-90 shadow-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-[12px] sm:rounded-t-[14px]" />
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#475569] mt-2 text-center truncate w-full">
                        Initiated
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-[#94A3B8]">100%</div>
                    </div>

                    {/* Stage 2: First-Pass Clean */}
                    <div 
                      onClick={() => setSelectedBar(1)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#059669] mb-1.5 tabular-nums">
                        1,198
                      </div>
                      <div className="w-full max-w-[56px] h-[155px] rounded-t-[12px] sm:rounded-t-[14px] pattern-stripes-green transition-all group-hover:opacity-90 shadow-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent rounded-t-[12px] sm:rounded-t-[14px]" />
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#059669] mt-2 text-center truncate w-full">
                        Clean Pass
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-[#059669] font-medium">$1.18 avg</div>
                    </div>

                    {/* Stage 3: Retry Loops (Highlighted) */}
                    <div 
                      onClick={() => setSelectedBar(2)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group relative"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#D97706] mb-1.5 tabular-nums">
                        214
                      </div>
                      <div className="w-full max-w-[56px] h-[120px] rounded-t-[12px] sm:rounded-t-[14px] pattern-stripes-amber transition-all ring-2 ring-[#F59E0B] ring-offset-1 sm:ring-offset-2 group-hover:opacity-90 shadow-md relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-[12px] sm:rounded-t-[14px]" />
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-bold text-[#D97706] mt-2 text-center truncate w-full">
                        Retry Loop
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-[#D97706] font-bold">$6.70 avg</div>
                    </div>

                    {/* Stage 4: Halted at Cap */}
                    <div 
                      onClick={() => setSelectedBar(3)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#2563EB] mb-1.5 tabular-nums">
                        38
                      </div>
                      <div className="w-full max-w-[56px] h-[65px] rounded-t-[12px] sm:rounded-t-[14px] pattern-stripes-blue transition-all group-hover:opacity-90 shadow-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent rounded-t-[12px] sm:rounded-t-[14px]" />
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#2563EB] mt-2 text-center truncate w-full">
                        <span className="hidden sm:inline">$4.00 Cap Stop</span>
                        <span className="sm:hidden">$4 Cap</span>
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-[#2563EB]">Saved $38</div>
                    </div>

                    {/* Stage 5: Completed Output */}
                    <div 
                      onClick={() => setSelectedBar(4)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0F172A] mb-1.5 tabular-nums">
                        1,374
                      </div>
                      <div className="w-full max-w-[56px] h-[172px] rounded-t-[12px] sm:rounded-t-[14px] bg-[#0F172A] transition-all group-hover:opacity-90 shadow-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-[12px] sm:rounded-t-[14px]" />
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#0F172A] mt-2 text-center truncate w-full">
                        Delivered
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-[#64748B]">97.3%</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Detailed Task Trace View */
                <div className="p-3.5 sm:p-4 rounded-[18px] bg-[#FFFFFF] border border-[#E2E6ED] space-y-3 font-mono text-[11.5px] sm:text-[12px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EEF1F6]">
                    <span className="font-bold text-[#D97706]">TASK ID: triage_run_8842</span>
                    <span className="text-[#DC2626] font-semibold">Runaway Retry Loop (41 calls)</span>
                  </div>
                  <div className="text-[#475569] space-y-1.5 leading-relaxed">
                    <p>• Call #01–#04: Classification passed (gpt-4o-mini) — $0.06</p>
                    <p>• Call #05–#40: Tool calling failure loop; agent resent 38,400 token payload 36 times without backoff.</p>
                    <p className="text-[#059669] font-bold">• Call #41: TaskFuse Circuit Breaker fired at $4.00 budget ceiling. Proxy returned HTTP 402 BUDGET_LIMIT_REACHED.</p>
                    <p className="text-[#475569] pt-1">Billed: $4.00 · Uncapped estimate: $42.00 · Saved: $38.00 on this single ticket.</p>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Query / Prompt Bar (Zentra "What would you like to explore next?" style) */}
              <div className="pt-3 border-t border-[#E2E6ED]">
                <div className="bg-[#FFFFFF] border border-[#CBD3DF] rounded-[18px] p-2 sm:p-2.5 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 px-2 text-[12px] font-medium text-[#64748B]">
                    <span className="text-[#D97706] font-bold">✦</span>
                    <span>What would you like to explore next?</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {queries.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveQuery(q);
                          setActiveTab('trace');
                        }}
                        className={`text-[12px] font-mono px-3 py-1 rounded-full cursor-pointer transition-all ${
                          activeQuery === q
                            ? 'bg-[#0F172A] text-[#FFFFFF] font-medium'
                            : 'bg-[#F1F4F8] text-[#475569] hover:bg-[#E2E6ED]'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Gross Agent Spend & Waste Breakdown (Zentra Gross Volume style) */}
            <div className="lg:col-span-4 rounded-[24px] border border-[#E2E6ED] bg-[#FFFFFF] p-5 sm:p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                    GROSS AGENT SPEND
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>

                <div className="flex items-baseline gap-2.5 mt-2">
                  <div className="text-[36px] font-bold text-[#0F172A] font-mono tracking-tight tabular-nums">
                    $2,847.14
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    <span>▲</span> 15% overrun prevented
                  </div>
                </div>
                <div className="text-[12px] text-[#64748B] mt-0.5">
                  Total provider invoice for 1,412 workflow tasks
                </div>
              </div>

              {/* Textured Diagonal Striped Progress Meters */}
              <div className="space-y-4 pt-2">
                {/* Meter 1: Clean Tasks */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#475569] font-medium">Clean Tasks (1,198)</span>
                    <span className="font-mono font-bold text-[#0F172A]">$1,413.64</span>
                  </div>
                  <div className="h-3 w-full bg-[#F1F4F8] rounded-full overflow-hidden p-0.5">
                    <div className="h-full rounded-full pattern-stripes-green w-[50%]" />
                  </div>
                </div>

                {/* Meter 2: Retry Loop Waste */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#D97706] font-semibold">Retry Loops (214)</span>
                    <span className="font-mono font-bold text-[#D97706]">-$1,181.00</span>
                  </div>
                  <div className="h-3 w-full bg-[#F1F4F8] rounded-full overflow-hidden p-0.5">
                    <div className="h-full rounded-full pattern-stripes-amber w-[42%]" />
                  </div>
                </div>

                {/* Meter 3: Frontier Model Over-Provisioning */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#475569]">Model Over-Provisioning</span>
                    <span className="font-mono font-semibold text-[#2563EB]">-$346.00</span>
                  </div>
                  <div className="h-3 w-full bg-[#F1F4F8] rounded-full overflow-hidden p-0.5">
                    <div className="h-full rounded-full pattern-stripes-blue w-[12%]" />
                  </div>
                </div>

                {/* Meter 4: Failed Unfinished Tasks */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#475569]">61 Failed / Empty Runs</span>
                    <span className="font-mono font-semibold text-[#DC2626]">-$188.00</span>
                  </div>
                  <div className="h-3 w-full bg-[#F1F4F8] rounded-full overflow-hidden p-0.5">
                    <div className="h-full rounded-full pattern-stripes-rose w-[7%]" />
                  </div>
                </div>
              </div>

              {/* Action Note */}
              <div className="p-3.5 rounded-[16px] bg-[#FFFBEB] border border-[#FDE68A] text-[12px] text-[#92400E] font-medium leading-relaxed">
                <span className="font-bold">IDC 2026 Finding:</span> 67% of teams overran their agent budget by &gt;10% due to unmonitored retry loops resending full prompts.
              </div>
            </div>
          </div>

          {/* Secondary Bento Row (Zentra Micro Cards + Sunset Gradient Insight Card) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            {/* Bento 1: Task Retention & Success Rate */}
            <div className="lg:col-span-3 rounded-[24px] border border-[#E2E6ED] bg-[#FFFFFF] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                  DELIVERY RATE
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                  97.3%
                </span>
              </div>
              <div className="py-4">
                {/* Visual Step-Chart Line */}
                <svg className="w-full h-14" viewBox="0 0 160 50" fill="none">
                  <path
                    d="M 5 40 L 25 40 L 25 28 L 50 28 L 50 18 L 85 18 L 85 24 L 115 24 L 115 12 L 155 12"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="5" y1="48" x2="155" y2="48" stroke="#EEF1F6" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="text-[12px] text-[#64748B]">
                1,374 delivered tasks out of 1,412 total runs
              </div>
            </div>

            {/* Bento 2: Activity Density Matrix (Transactions) */}
            <div className="lg:col-span-3 rounded-[24px] border border-[#E2E6ED] bg-[#FFFFFF] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                  THROUGHPUT
                </span>
                <span className="text-[10px] font-mono text-[#475569] bg-[#F1F4F8] px-2 py-0.5 rounded-full">
                  Peak: Wed
                </span>
              </div>

              <div className="my-2">
                <div className="text-[28px] font-bold text-[#0F172A] font-mono">106k</div>
                <div className="text-[11px] text-[#059669] font-mono font-medium">+34,002 calls vs last week</div>
              </div>

              {/* Dot Matrix Visual (Zentra style) */}
              <div className="flex items-end justify-between gap-1 pt-2">
                {[3, 5, 8, 12, 10, 6, 4].map((h, i) => (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <span
                        key={j}
                        className={`w-2 h-2 rounded-full ${
                          j < Math.ceil(h / 3) ? 'bg-[#10B981]' : 'bg-[#E2E6ED]'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bento 3: Sunset Gradient Actionable Insights Card (Zentra Style Centerpiece) */}
            <div className="lg:col-span-6 rounded-[24px] bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#D97706] p-5 sm:p-6 text-[#FFFFFF] shadow-lg flex flex-col justify-between relative overflow-hidden">
              {/* Subtle ambient decorative lighting */}
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] sm:text-[11.5px] font-medium tracking-wide">
                    <span>💡</span>
                    <span>FINOPS AUDIT INSIGHT</span>
                  </div>
                  <span className="text-[10.5px] sm:text-[11px] font-mono bg-white/20 px-2 py-0.5 rounded-full text-white/90">
                    WEEK 1 AUDIT
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-[34px] sm:text-[44px] font-extrabold font-mono tracking-tight leading-none">
                    ~$4,700<span className="text-[18px] sm:text-[20px] font-normal text-white/80">/mo</span>
                  </div>
                  <div className="text-[15px] sm:text-[16px] font-semibold text-white/95 mt-1">
                    Estimated monthly recoverable spend
                  </div>
                </div>

                <p className="text-[13px] sm:text-[13.5px] text-white/85 mt-2.5 leading-relaxed max-w-[48ch]">
                  Enforcing a $4.00 per-task cap on ticket triage stops runaway retry loops while routing simple classification to fast models saves $346/wk.
                </p>
              </div>

              {/* Progress Slider Track at Bottom */}
              <div className="pt-4 border-t border-white/20 mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="w-full sm:w-1/2 h-1.5 bg-white/25 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[78%]" />
                </div>
                <button
                  type="button"
                  onClick={() => onOpenAudit('insights_card')}
                  className="bg-white text-[#0F172A] font-semibold text-[12.5px] px-3.5 py-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-center"
                >
                  Claim My Free Audit →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Box Attached Directly Under Audit */}
        <div className="bg-[#FFFFFF] rounded-[24px] border border-[#E2E6ED] p-5 sm:p-8 shadow-sm">
          <div className="max-w-[720px] space-y-4">
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Get this exact one-page spend audit on your agent in week one
            </h3>
            <p className="text-[15px] text-[#475569]">
              Connect via our zero-SDK proxy (one line base-URL swap). We observe your workflow for 7 days, quantify unit economics, and deliver this exact breakdown.
            </p>
            <div className="pt-2 max-w-[500px]">
              <LeadCaptureForm source="demo_panel" />
            </div>
          </div>
        </div>

        {/* Spend Calculator Section */}
        <div id="calculator" className="pt-4">
          <SpendCalculator onOpenAudit={onOpenAudit} />
        </div>
      </div>
    </section>
  );
};
