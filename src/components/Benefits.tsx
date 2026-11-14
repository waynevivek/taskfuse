import React from 'react';

export const Benefits: React.FC = () => {
  const topCapabilities = [
    {
      title: 'One number for the CFO',
      text: 'Report the cost of one closed ticket, one enriched lead, or one processed document — not a token count.',
      category: 'Unit Economics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h5" />
        </svg>
      ),
    },
    {
      title: "Catch loops while they're cheap",
      text: 'Repeated near-identical calls get flagged with their wasted spend totaled before the monthly invoice arrives.',
      category: 'Loop Detection',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M21 21v-5h-5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'A hard stop at your price',
      text: 'Set a dollar cap per task. Past it, calls return a standard HTTP 402 error your agent handles cleanly.',
      category: 'Budget Limits',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  const workflows = [
    {
      name: 'Support Triage',
      metric: 'Ticket resolver',
      detail: 'Tracks classifier routing, escalation retries, and hard caps runaway ticket loops before billing spikes.',
    },
    {
      name: 'Document Processing',
      metric: 'Invoice & contract extraction',
      detail: 'Attributes multi-page OCR + JSON schema repair retries to each finished document ID.',
    },
    {
      name: 'Sales Operations',
      metric: 'Lead enrichment & research',
      detail: 'Prevents recursive web-scraping and enrichment agents from burning $10+ on dead leads.',
    },
    {
      name: 'Research Agents',
      metric: 'Deep synthesis pipelines',
      detail: 'Separates high-margin finished reports from empty loops and oversized context resends.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2DC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-[740px] space-y-2.5">
          <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
            04. Financial Controls
          </div>
          <h2 className="spec-h2 text-[#0B0C0E]">
            Built for production agent economics
          </h2>
          <p className="spec-body text-[16.5px] text-[#4B5058] max-w-[58ch]">
            Every capability engineered for small SaaS teams and agencies footing the model bill at scale.
          </p>
        </div>

        {/* Quantix-Inspired Asymmetric 5-Card Bento Rhythm (3 Top + 2 Wide Bottom) */}
        <div className="space-y-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCapabilities.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[24px] bg-[#FFFFFF] border border-[#E2E2DC] p-7 flex flex-col justify-between space-y-6 shadow-[0_2px_12px_rgba(11,12,14,0.03)]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] text-[#0B0C0E] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11.5px] font-mono text-[#6E737D]">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[19px] font-bold text-[#0B0C0E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-[#4B5058] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Wide Marquee Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wide Card 1: No rewrite, no SDK */}
            <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E2E2DC] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_2px_12px_rgba(11,12,14,0.03)]">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-mono text-[#6E737D] uppercase tracking-wider">
                  Zero Lock-In
                </span>
                <span className="text-[12px] font-mono text-[#D97706] font-semibold">
                  1-line config
                </span>
              </div>

              {/* Clean architectural header preview */}
              <div className="py-4 border-t border-b border-[#ECECE8] font-mono text-[12.5px] space-y-1.5 text-[#4B5058]">
                <div className="flex items-center justify-between">
                  <span>base_url</span>
                  <span className="text-[#0B0C0E] font-semibold">https://proxy.taskfuse.dev/v1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>header</span>
                  <span className="text-[#D97706] font-semibold">X-TaskFuse-ID: run_8842</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[20px] font-bold text-[#0B0C0E]" style={{ fontFamily: 'var(--font-heading)' }}>
                  No rewrite, no SDK
                </h3>
                <p className="text-[15px] text-[#4B5058] leading-relaxed">
                  A base-URL swap and a header. Your agent framework and orchestration code stay untouched.
                </p>
              </div>
            </div>

            {/* Wide Card 2: Margin per workflow */}
            <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E2E2DC] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_2px_12px_rgba(11,12,14,0.03)]">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-mono text-[#6E737D] uppercase tracking-wider">
                  Gross Margin Visibility
                </span>
                <span className="text-[12px] font-mono text-[#059669] font-semibold">
                  Per-workflow P&L
                </span>
              </div>

              {/* Tabular margin rows */}
              <div className="py-4 border-t border-b border-[#ECECE8] font-mono text-[12.5px] space-y-2 tabular-nums">
                <div className="flex items-center justify-between">
                  <span className="text-[#4B5058]">Support Triage</span>
                  <span className="text-[#0B0C0E] font-semibold">$1.18 / task · 78% margin</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4B5058]">Doc Extraction</span>
                  <span className="text-[#D97706] font-semibold">$4.90 / task · Watch retries</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[20px] font-bold text-[#0B0C0E]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Margin per workflow
                </h3>
                <p className="text-[15px] text-[#4B5058] leading-relaxed">
                  See immediately which automated workflows make money at current model prices and which quietly erode margin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WizardZ-Inspired Dark Grounded 4-Column Workflow Strip */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-[#111318] text-white p-7 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-7 border-b border-white/10">
            <span className="text-[12px] font-mono text-[#F59E0B] uppercase tracking-wider">
              Built for Production Workflows
            </span>
            <span className="text-[13px] text-[#9499A3]">
              Agencies & AI-native SaaS teams
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {workflows.map((wf, i) => (
              <div
                key={i}
                className={`space-y-2.5 ${
                  i > 0 ? 'lg:pl-7 lg:border-l lg:border-white/12' : ''
                } ${i < workflows.length - 1 ? 'lg:pr-7' : ''}`}
              >
                <div className="text-[11px] font-mono text-[#9499A3] uppercase tracking-wider">
                  {wf.metric}
                </div>
                <h4 className="text-[17px] font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {wf.name}
                </h4>
                <p className="text-[13.5px] text-[#A1A6B0] leading-relaxed">
                  {wf.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
