import React, { useState } from 'react';

export const CodePassthrough: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'node' | 'curl'>('python');
  const [copied, setCopied] = useState(false);

  const snippets = {
    python: `# 1. Swap base URL & pass task ID in your OpenAI client
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://proxy.taskfuse.dev/v1",  # <- One line change
    default_headers={"X-TaskFuse-ID": "triage_task_8842"},
    api_key=os.environ["OPENAI_API_KEY"],
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
) `,
    node: `// 1. Swap base URL & pass task ID in your OpenAI client
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://proxy.taskfuse.dev/v1", // <- One line change
  defaultHeaders: {
    "X-TaskFuse-ID": "triage_task_8842",
  },
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: prompt }],
});`,
    curl: `curl https://proxy.taskfuse.dev/v1/chat/completions \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "X-TaskFuse-ID: triage_task_8842" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Triage this ticket..."}]
  }'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[24px] border border-[#E2E6ED] bg-[#0F172A] overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[#1E293B] bg-[#1E293B]/70">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#334155]" />
          <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#334155]" />
          <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-[#334155]" />
          <span className="font-mono text-[11px] sm:text-[11.5px] text-[#94A3B8]">
            <span className="hidden sm:inline">Zero SDK • OpenAI Compatible Passthrough</span>
            <span className="sm:hidden">Zero SDK • OpenAI Compatible</span>
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Language Tabs */}
          <div className="flex items-center bg-[#0F172A] rounded-full p-1 border border-[#334155]">
            {(['python', 'node', 'curl'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-[11.5px] font-mono rounded-full transition-all cursor-pointer ${
                  activeTab === lang
                    ? 'bg-[#334155] text-[#FCD34D] font-bold shadow-xs'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF]'
                }`}
              >
                {lang === 'node' ? 'TypeScript' : lang === 'python' ? 'Python' : 'cURL'}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 text-[11px] sm:text-[11.5px] font-mono font-medium rounded-full border border-[#475569] bg-[#334155] text-[#FFFFFF] hover:bg-[#475569] cursor-pointer transition-colors shrink-0"
            aria-label="Copy code snippet"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <pre className="font-mono text-[13px] text-[#E2E8F0] leading-[1.65]">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};
