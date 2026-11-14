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
)`,
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
    <div className="rounded-[24px] border border-white/12 bg-[#12141A] overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* Code Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-[#161922]">
        <span className="font-mono text-[12px] text-[#9499A3]">
          OpenAI-Compatible Passthrough · Zero SDK Required
        </span>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
          <div className="flex items-center bg-[#0A0B0E] rounded-full p-1 border border-white/10">
            {(['python', 'node', 'curl'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveTab(lang)}
                className={`px-3 py-1 text-[11.5px] font-mono rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === lang
                    ? 'bg-[#F59E0B] text-[#0A0B0E] font-bold'
                    : 'text-[#9499A3] hover:text-white'
                }`}
              >
                {lang === 'node' ? 'TypeScript' : lang === 'python' ? 'Python' : 'cURL'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 text-[11.5px] font-mono font-medium rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer transition-colors shrink-0 whitespace-nowrap"
            aria-label="Copy code snippet"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="p-5 sm:p-7 overflow-x-auto bg-[#0D0F14]">
        <pre className="font-mono text-[13px] text-[#E5E7EB] leading-[1.68]">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};
