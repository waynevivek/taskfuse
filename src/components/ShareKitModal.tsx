import React, { useState, useEffect } from 'react';

interface ShareKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareKitModal: React.FC<ShareKitModalProps> = ({ isOpen, onClose }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://taskfuse.dev';

  const posts = [
    {
      channel: 'Reddit — r/AI_Agents',
      title: 'Token dashboards tell you what you spent. Not what one finished task cost.',
      body: `I've been researching agent cost blowups for a few months — the 200-calls-in-four-minutes retry loops, the $19K surprise bills, the run that costs $200 one night and $7 the next. The pattern I keep seeing: every tool reports tokens per request, but nobody can say what one completed task cost — one closed ticket, one enriched lead — with retries and failures rolled in. IDC found 67% of enterprises overran their agent budget by 10%+ last year, and AWS just wrote cost-per-task into the Agentic AI Lens as a target KPI. I put together a page for a per-task cost tracker with hard dollar caps per task, and I'd genuinely like this sub to poke holes in it before I build further. Is cost-per-completed-task the number you'd actually use, or is your current setup enough? ${currentUrl}`,
    },
    {
      channel: 'X / Twitter',
      title: 'Launch Post',
      body: `Agents burn 5–30x more tokens per task than a chatbot (Gartner). Uber blew its entire 2026 AI budget by April. 67% of teams overran agent budgets last year (IDC). Everyone measures tokens per request. Nobody measures cost per finished task — which is the only number a margin cares about. I put together a page for a tool that tracks exactly that and hard-caps any task at a dollar limit. Would honestly value takes from anyone running agents in production: ${currentUrl}`,
    },
    {
      channel: 'Reddit — r/AIToolsPerformance',
      title: 'You already track cost per successful task by hand. Should that be automatic?',
      body: `This sub is one of the only places I've seen people track first-try success rate, retries needed, and total cost per successful task — which is exactly the metric the rest of the agent world ignores. I've been talking to teams running production agents, and the gap between "what the provider bill says" and "what a clean completed task costs" is routinely 3–6x once retry loops are counted. I put together a page for a proxy that attributes every call to a task ID and reports cost per completed task automatically, with optional per-task dollar caps. Since you all live in this data manually, I'd rather hear what's wrong with the approach now than after building: ${currentUrl}`,
    },
    {
      channel: 'Direct Message (DM)',
      title: '1-on-1 Outreach',
      body: `Saw your post about agent costs getting unpredictable — I've been researching that exact problem and put together a page for a tool that tracks cost per completed task (retries included) and hard-caps any task at a dollar limit. Would you take 60 seconds and tell me if this would actually help, or what's missing? ${currentUrl}`,
    },
  ];

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0B0E]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[700px] max-h-[88vh] overflow-y-auto rounded-[24px] bg-[#FFFFFF] border border-[#E2E2DC] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5F5F3] text-[#4B5058] hover:text-[#0B0C0E] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-6 border-b border-[#ECECE8] pb-4 pr-8">
          <div className="text-[11.5px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
            Validation Distribution
          </div>
          <h3 className="text-[22px] font-bold text-[#0B0C0E] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            Validation Share Kit
          </h3>
          <p className="text-[14px] text-[#4B5058] mt-1">
            Pre-written copy tailored for founder-to-founder feedback channels and community validation.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post, idx) => (
            <div key={idx} className="p-5 rounded-[20px] bg-[#F5F5F3] border border-[#E2E2DC] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11.5px] font-semibold text-[#6E737D] uppercase tracking-wider">
                  {post.channel}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(idx, post.body)}
                  className="px-3.5 py-1.5 text-[12px] font-mono font-semibold rounded-full bg-[#0B0C0E] text-white hover:bg-[#1F2229] cursor-pointer transition-colors shrink-0"
                >
                  {copiedIdx === idx ? 'Copied ✓' : 'Copy Text'}
                </button>
              </div>
              <div className="text-[14.5px] font-bold text-[#0B0C0E]">
                {post.title}
              </div>
              <p className="text-[13.5px] text-[#4B5058] leading-relaxed whitespace-pre-line font-mono pt-2 border-t border-[#E2E2DC]">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
