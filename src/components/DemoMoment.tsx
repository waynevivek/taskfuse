import React, { useState } from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { SpendCalculator } from './SpendCalculator';

interface DemoMomentProps {
  onOpenAudit: (source: string) => void;
}

export const DemoMoment: React.FC<DemoMomentProps> = ({ onOpenAudit }) => {
  const [activeQuery, setActiveQuery] = useState<string>('Why did triage_run_8842 cost $42?');
  const [activeTab, setActiveTab] = useState<'funnel' | 'trace'>('funnel');

  const queries = [
    'Why did triage_run_8842 cost $42?',
    'Where is my biggest token waste?',
    'How much do we save with a $4 cap?',
  ];

  return (
    <section id="audit-console" className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2DC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="max-w-[780px] space-y-2.5">
          <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
            02. Sample Spend Audit · Week 1 Deliverable
          </div>
          <h2 className="spec-h2 text-[#0B0C0E]">
            This is the audit founding users get in week one
          </h2>
          <p className="spec-body text-[16.5px] text-[#4B5058] max-w-[62ch]">
            Sample numbers from a production support-triage workflow. Real cost per finished task, isolated retry loops, and dollar budget limits.
          </p>
        </div>

        {/* Single-Level Architectural Bento Console (No nested bordered card clutter) */}
        <div className="bg-[#FFFFFF] border border-[#E2E2DC] rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-[0_8px_36px_-12px_rgba(11,12,14,0.08)] space-y-7">
          {/* Console Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#ECECE8]">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B0C0E] text-[#F59E0B] flex items-center justify-center font-mono font-bold text-[14px] shrink-0">
                TF
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[18px] font-bold text-[#0B0C0E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Support Triage Audit
                  </h3>
                  <span className="text-[11.5px] font-mono text-[#6E737D]">
                    · REF: TF-2026-WK07 · Sample Data
                  </span>
                </div>
                <div className="text-[13px] text-[#6E737D] mt-0.5">
                  Workflow: Zendesk Ticket Resolver · Feb 18 – Feb 25, 2026 (7-day window)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              {/* Interactive Tab Switcher */}
              <div className="flex items-center bg-[#F5F5F3] p-1 rounded-full border border-[#E2E2DC] text-[12px] font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('funnel')}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'funnel' ? 'bg-[#0B0C0E] text-white' : 'text-[#4B5058] hover:text-[#0B0C0E]'
                  }`}
                >
                  Funnel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('trace')}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'trace' ? 'bg-[#0B0C0E] text-white' : 'text-[#4B5058] hover:text-[#0B0C0E]'
                  }`}
                >
                  Task Trace
                </button>
              </div>

              <button
                type="button"
                onClick={() => onOpenAudit('demo_csv_export')}
                className="btn-primary-sm whitespace-nowrap shrink-0"
              >
                Export CSV Audit
              </button>
            </div>
          </div>

          {/* Primary Bento Split: Execution Funnel (Left) + Gross Spend Ledger (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT: Task Execution & Cost Funnel */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6 lg:pr-6 lg:border-r border-[#ECECE8]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <div className="text-[11.5px] font-mono uppercase tracking-wider text-[#6E737D]">
                    Task Execution & Spend Funnel
                  </div>
                  <div className="text-[18px] sm:text-[20px] font-bold text-[#0B0C0E] mt-1 tabular-nums">
                    1,412 Completed Tasks · $2.02 Blended Unit Cost
                  </div>
                </div>
                <div className="text-[12px] font-mono text-[#D97706] font-semibold tabular-nums">
                  214 Retry Tasks · -$1,181.00 Waste
                </div>
              </div>

              {activeTab === 'funnel' ? (
                <div className="pt-4 pb-2">
                  {/* 5 Funnel Stages with Clean Volumetric Striped Bars */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-5 items-end h-[215px]">
                    {/* Stage 1: Initiated */}
                    <div className="flex flex-col items-center h-full justify-end">
                      <div className="text-[11px] font-mono font-bold text-[#4B5058] mb-2 tabular-nums">
                        1,412
                      </div>
                      <div className="w-full max-w-[60px] h-[175px] rounded-t-xl pattern-stripes-slate relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                      </div>
                      <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#0B0C0E] mt-2.5 text-center truncate w-full">
                        Initiated
                      </div>
                      <div className="text-[10px] font-mono text-[#6E737D] tabular-nums">100%</div>
                    </div>

                    {/* Stage 2: Clean Pass */}
                    <div className="flex flex-col items-center h-full justify-end">
                      <div className="text-[11px] font-mono font-bold text-[#059669] mb-2 tabular-nums">
                        1,198
                      </div>
                      <div className="w-full max-w-[60px] h-[150px] rounded-t-xl pattern-stripes-green relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>
                      <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#059669] mt-2.5 text-center truncate w-full">
                        Clean Pass
                      </div>
                      <div className="text-[10px] font-mono text-[#059669] tabular-nums">$1.18 avg</div>
                    </div>

                    {/* Stage 3: Retry Loops (Focal Highlight) */}
                    <div className="flex flex-col items-center h-full justify-end">
                      <div className="text-[11px] font-mono font-bold text-[#D97706] mb-2 tabular-nums">
                        214
                      </div>
                      <div className="w-full max-w-[60px] h-[116px] rounded-t-xl pattern-stripes-amber ring-2 ring-[#F59E0B] ring-offset-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                      </div>
                      <div className="text-[10.5px] sm:text-[11.5px] font-bold text-[#D97706] mt-2.5 text-center truncate w-full">
                        Retry Loop
                      </div>
                      <div className="text-[10px] font-mono text-[#D97706] font-bold tabular-nums">$6.70 avg</div>
                    </div>

                    {/* Stage 4: Cap Stop */}
                    <div className="flex flex-col items-center h-full justify-end">
                      <div className="text-[11px] font-mono font-bold text-[#2563EB] mb-2 tabular-nums">
                        38
                      </div>
                      <div className="w-full max-w-[60px] h-[64px] rounded-t-xl pattern-stripes-blue relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>
                      <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#2563EB] mt-2.5 text-center truncate w-full">
                        <span className="hidden sm:inline">$4.00 Cap Stop</span>
                        <span className="sm:hidden">$4 Cap</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#2563EB] tabular-nums">Saved $38</div>
                    </div>

                    {/* Stage 5: Delivered */}
                    <div className="flex flex-col items-center h-full justify-end">
                      <div className="text-[11px] font-mono font-bold text-[#0B0C0E] mb-2 tabular-nums">
                        1,374
                      </div>
                      <div className="w-full max-w-[60px] h-[168px] rounded-t-xl bg-[#0B0C0E] relative overflow-hidden" />
                      <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#0B0C0E] mt-2.5 text-center truncate w-full">
                        Delivered
                      </div>
                      <div className="text-[10px] font-mono text-[#6E737D] tabular-nums">97.3%</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Detailed Task Trace View */
                <div className="py-4 space-y-3 font-mono text-[12px] sm:text-[12.5px] border-t border-b border-[#ECECE8]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#ECECE8]">
                    <span className="font-bold text-[#D97706]">TASK ID: triage_run_8842</span>
                    <span className="text-[#DC2626] font-semibold">Runaway Retry Loop (41 calls)</span>
                  </div>
                  <div className="text-[#4B5058] space-y-2 leading-relaxed">
                    <p>• Call #01–#04: Classification passed (gpt-4o-mini) — $0.06</p>
                    <p>• Call #05–#40: Tool calling failure loop; agent resent 38,400 token payload 36 times without backoff.</p>
                    <p className="text-[#059669] font-bold">• Call #41: TaskFuse Circuit Breaker fired at $4.00 budget ceiling. Proxy returned HTTP 402 BUDGET_LIMIT_REACHED.</p>
                    <p className="text-[#0B0C0E] font-medium pt-1">Billed: $4.00 · Uncapped estimate: $42.00 · Saved: $38.00 on this single ticket.</p>
                  </div>
                </div>
              )}

              {/* Prompt Query Selector Bar */}
              <div className="pt-4 border-t border-[#ECECE8] space-y-2.5">
                <div className="text-[12px] font-medium text-[#6E737D]">
                  Inspect sample diagnostic question:
                </div>
                <div className="flex flex-wrap gap-2">
                  {queries.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveQuery(q);
                        setActiveTab('trace');
                      }}
                      className={`text-[12px] font-mono px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                        activeQuery === q
                          ? 'bg-[#0B0C0E] text-white font-medium'
                          : 'bg-[#F5F5F3] text-[#4B5058] hover:bg-[#EBEBE7]'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Gross Agent Spend Breakdown */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11.5px] font-mono uppercase tracking-wider text-[#6E737D]">
                  Gross Agent Spend
                </div>

                <div className="flex flex-wrap items-baseline gap-2.5 mt-2">
                  <div className="text-[36px] font-bold text-[#0B0C0E] font-mono tracking-tight tabular-nums leading-none">
                    $2,847.14
                  </div>
                  <span className="text-[12px] font-mono font-semibold text-[#059669]">
                    15% overrun prevented
                  </span>
                </div>
                <div className="text-[12.5px] text-[#6E737D] mt-1.5">
                  Total provider invoice for 1,412 workflow tasks
                </div>
              </div>

              {/* Progress Meters */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#4B5058] font-medium">Clean Tasks (1,198)</span>
                    <span className="font-mono font-bold text-[#0B0C0E] tabular-nums">$1,413.64</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
                    <div className="h-full rounded-full pattern-stripes-green w-[50%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#D97706] font-semibold">Retry Loops (214)</span>
                    <span className="font-mono font-bold text-[#D97706] tabular-nums">-$1,181.00</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
                    <div className="h-full rounded-full pattern-stripes-amber w-[42%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#4B5058]">Model Over-Provisioning</span>
                    <span className="font-mono font-semibold text-[#2563EB] tabular-nums">-$346.00</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
                    <div className="h-full rounded-full pattern-stripes-blue w-[12%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#4B5058]">61 Failed / Empty Runs</span>
                    <span className="font-mono font-semibold text-[#DC2626] tabular-nums">-$188.00</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
                    <div className="h-full rounded-full pattern-stripes-rose w-[7%]" />
                  </div>
                </div>
              </div>

              {/* Clean Text Callout (No thick left border, crisp hairline) */}
              <div className="pt-4 border-t border-[#ECECE8] text-[12.5px] text-[#4B5058] leading-relaxed">
                <span className="font-semibold text-[#0B0C0E]">IDC 2026 Finding:</span> 67% of teams overran their agent budget by &gt;10% due to unmonitored retry loops resending full prompts.
              </div>
            </div>
          </div>

          {/* Secondary Bento Row: Metrics + Orynthiq Warm Amber Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-6 border-t border-[#ECECE8] items-stretch">
            <div className="lg:col-span-3 flex flex-col justify-between py-2">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#6E737D]">
                  Delivery Rate
                </span>
                <span className="text-[12px] font-mono font-bold text-[#059669] tabular-nums">
                  97.3%
                </span>
              </div>
              <div className="py-4">
                <svg className="w-full h-14" viewBox="0 0 160 50" fill="none">
                  <path
                    d="M 5 40 L 25 40 L 25 28 L 50 28 L 50 18 L 85 18 L 85 24 L 115 24 L 115 12 L 155 12"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="5" y1="48" x2="155" y2="48" stroke="#ECECE8" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="text-[12.5px] text-[#6E737D]">
                1,374 delivered tasks out of 1,412 runs
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-between py-2 md:pl-6 md:border-l border-[#ECECE8]">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#6E737D]">
                  Throughput
                </span>
                <span className="text-[11.5px] font-mono text-[#6E737D]">
                  Peak: Wed
                </span>
              </div>

              <div className="my-2">
                <div className="text-[28px] font-bold text-[#0B0C0E] font-mono tabular-nums leading-none">106k</div>
                <div className="text-[12px] text-[#059669] font-mono font-medium mt-1 tabular-nums">+34,002 calls vs prior week</div>
              </div>

              <div className="flex items-end justify-between gap-1 pt-2">
                {[3, 5, 8, 12, 10, 6, 4].map((h, i) => (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <span
                        key={j}
                        className={`w-2 h-2 rounded-full ${
                          j < Math.ceil(h / 3) ? 'bg-[#0B0C0E]' : 'bg-[#E2E2DC]'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Orynthiq Warm Amber Spotlight Card */}
            <div
              className="lg:col-span-6 rounded-[20px] p-6 text-white flex flex-col justify-between relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #111318 0%, #78350F 58%, #D97706 100%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] font-mono text-[#FDE68A]">
                  <span>WEEK 1 AUDIT OUTCOME</span>
                  <span>SAMPLE WORKFLOW</span>
                </div>

                <div className="mt-4">
                  <div className="text-[36px] sm:text-[42px] font-bold font-mono tracking-tight leading-none tabular-nums">
                    ~$4,700<span className="text-[18px] font-normal text-white/75">/mo</span>
                  </div>
                  <div className="text-[15.5px] font-semibold text-white mt-1.5">
                    Estimated monthly recoverable spend
                  </div>
                </div>

                <p className="text-[13.5px] text-white/85 mt-2 leading-relaxed max-w-[48ch]">
                  Enforcing a $4.00 per-task cap on ticket triage stops runaway retry loops while routing classification to fast models saves $346/wk.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-[12px] font-mono text-white/80">
                  7-day observe-only onboarding
                </span>
                <button
                  type="button"
                  onClick={() => onOpenAudit('insights_card')}
                  className="bg-white text-[#0B0C0E] font-semibold text-[13px] px-4 py-2 rounded-full hover:bg-[#FEF3C7] transition-colors cursor-pointer text-center whitespace-nowrap"
                >
                  Claim free spend audit →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Audit Signup Strip */}
        <div className="bg-[#111318] text-white rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-[540px] space-y-1.5">
            <h3 className="text-[19px] sm:text-[21px] font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Get this exact one-page spend audit on your agent in week one
            </h3>
            <p className="text-[14.5px] text-[#A1A6B0]">
              Connect via a one-line base-URL swap. We observe your workflow for 7 days and deliver your unit economics report.
            </p>
          </div>
          <div className="w-full lg:max-w-[460px]">
            <LeadCaptureForm source="demo_panel" dark />
          </div>
        </div>

        {/* Spend Calculator Section */}
        <div id="calculator" className="pt-2">
          <SpendCalculator onOpenAudit={onOpenAudit} />
        </div>
      </div>
    </section>
  );
};
