import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getFirestoreDb, 
  getFirebaseAuth, 
  signInWithGoogle, 
  signOutUser, 
  onAuthChange,
  handleFirestoreError,
  OperationType 
} from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy,
  type Unsubscribe 
} from 'firebase/firestore';
import type { User } from 'firebase/auth';

interface LeadRecord {
  id: string;
  email: string;
  source: string;
  tier?: string | null;
  createdAt: string;
  timestamp?: unknown;
}

interface AppSettings {
  ownerUid: string;
  ownerEmail: string;
  createdAt: string;
  liveUrl?: string;
  visitorsCount?: number;
  checklist?: Record<string, boolean>;
}

export const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Editable fields with local state
  const [liveUrl, setLiveUrl] = useState<string>('');
  const [visitorsCount, setVisitorsCount] = useState<number>(0);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch or observe /settings/app
  const loadSettings = useCallback(async (currentUser: User) => {
    setSettingsLoading(true);
    setAuthError(null);
    try {
      const db = await getFirestoreDb();
      if (!db) {
        setSettingsLoading(false);
        return;
      }
      const settingsRef = doc(db, 'settings', 'app');
      const snap = await getDoc(settingsRef);
      if (snap.exists()) {
        const data = snap.data() as AppSettings;
        setSettings(data);
        const ownerMatch = data.ownerUid === currentUser.uid;
        setIsOwner(ownerMatch);
        setLiveUrl(data.liveUrl || window.location.origin);
        setVisitorsCount(data.visitorsCount || 0);
        setChecklist(data.checklist || {});
      } else {
        // No owner claimed yet
        setSettings(null);
        setIsOwner(false);
        setLiveUrl(window.location.origin);
      }
    } catch (err) {
      console.error('Settings load error:', err);
      setAuthError('Unable to verify owner status. Check Firestore connection.');
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadSettings(user);
    } else {
      setSettings(null);
      setIsOwner(false);
      setSettingsLoading(false);
    }
  }, [user, loadSettings]);

  // Real-time leads feed if user is verified owner
  useEffect(() => {
    if (!user || !isOwner) {
      setLeads([]);
      setLeadsLoading(false);
      return;
    }

    let unsub: Unsubscribe | null = null;
    let isMounted = true;

    async function subscribeLeads() {
      try {
        const db = await getFirestoreDb();
        if (!db || !isMounted) return;

        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        unsub = onSnapshot(
          q,
          (snapshot) => {
            const items: LeadRecord[] = [];
            snapshot.forEach((docSnap) => {
              items.push({
                id: docSnap.id,
                ...(docSnap.data() as Omit<LeadRecord, 'id'>),
              });
            });
            // Stable in-memory timestamp sort
            items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            if (isMounted) {
              setLeads(items);
              setLeadsLoading(false);
            }
          },
          (error) => {
            console.error('Leads subscription error:', error);
            handleFirestoreError(error, OperationType.LIST, 'leads');
            if (isMounted) setLeadsLoading(false);
          }
        );
      } catch (err) {
        console.error('Subscribe leads error:', err);
        if (isMounted) setLeadsLoading(false);
      }
    }

    subscribeLeads();
    return () => {
      isMounted = false;
      if (unsub) unsub();
    };
  }, [user, isOwner]);

  // Claim ownership for the first signed-in account
  const handleClaimOwnership = async () => {
    if (!user) return;
    setSettingsLoading(true);
    setAuthError(null);
    try {
      const db = await getFirestoreDb();
      if (!db) throw new Error('Database unavailable');
      const initialSettings: AppSettings = {
        ownerUid: user.uid,
        ownerEmail: user.email || '',
        createdAt: new Date().toISOString(),
        liveUrl: window.location.origin,
        visitorsCount: 0,
        checklist: {},
      };
      await setDoc(doc(db, 'settings', 'app'), initialSettings);
      setSettings(initialSettings);
      setIsOwner(true);
      setLiveUrl(initialSettings.liveUrl || window.location.origin);
      setVisitorsCount(0);
      setChecklist({});
    } catch (err) {
      console.error('Claim ownership error:', err);
      setAuthError('Failed to claim ownership. Another account may have claimed it first.');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Update live URL
  const handleSaveLiveUrl = async (newUrl: string) => {
    setLiveUrl(newUrl);
    if (!isOwner || !user) return;
    try {
      const db = await getFirestoreDb();
      if (!db) return;
      await updateDoc(doc(db, 'settings', 'app'), { liveUrl: newUrl });
    } catch (err) {
      console.error('Failed to save live URL:', err);
    }
  };

  // Update visitors count
  const handleSaveVisitors = async (val: number) => {
    const cleanVal = Math.max(0, val);
    setVisitorsCount(cleanVal);
    if (!isOwner || !user) return;
    try {
      const db = await getFirestoreDb();
      if (!db) return;
      await updateDoc(doc(db, 'settings', 'app'), { visitorsCount: cleanVal });
    } catch (err) {
      console.error('Failed to save visitors count:', err);
    }
  };

  // Toggle checklist item
  const handleToggleChecklist = async (key: string) => {
    if (!isOwner || !user) return;
    const nextChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(nextChecklist);
    try {
      const db = await getFirestoreDb();
      if (!db) return;
      await updateDoc(doc(db, 'settings', 'app'), { checklist: nextChecklist });
    } catch (err) {
      console.error('Failed to update checklist:', err);
    }
  };

  // Copy helper
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Sign out
  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    setIsOwner(false);
    setSettings(null);
  };

  // Metrics calculations for scoreboard
  const metrics = useMemo(() => {
    const total = leads.length;
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let todayCount = 0;
    let yesterdayCount = 0;
    let past7DaysCount = 0;

    leads.forEach((l) => {
      const leadDate = new Date(l.createdAt);
      const leadDateStr = l.createdAt ? l.createdAt.slice(0, 10) : '';
      if (leadDateStr === todayStr) todayCount++;
      if (leadDateStr === yesterdayStr) yesterdayCount++;
      if (leadDate >= sevenDaysAgo) past7DaysCount++;
    });

    return { total, todayCount, yesterdayCount, past7DaysCount };
  }, [leads]);

  // Verdict calculation
  const verdictData = useMemo(() => {
    if (!visitorsCount || visitorsCount <= 0) {
      return {
        rate: null,
        message: 'Enter your approximate visitor count above to compute conversion and read the validation verdict.',
      };
    }
    const rate = (leads.length / visitorsCount) * 100;
    const formattedRate = rate.toFixed(1);

    if (rate >= 10) {
      return {
        rate: formattedRate,
        message: 'Real interest. Build the full product.',
      };
    } else if (rate >= 3) {
      return {
        rate: formattedRate,
        message: "There's a pulse but the pitch is off. Change the headline or the offer and share again.",
      };
    } else {
      return {
        rate: formattedRate,
        message: "Let this one go and grab the next idea. That's the system working.",
      };
    }
  }, [leads.length, visitorsCount]);

  // Effective URL for posts
  const effectiveUrl = liveUrl.trim() || (typeof window !== 'undefined' ? window.location.origin : 'https://taskfuse.dev');

  // Launch kit posts (verbatim from research brief + share kit)
  const launchPosts = useMemo(() => [
    {
      id: 'reddit_ai_agents',
      caption: 'WHERE IT GOES: REDDIT — r/AI_AGENTS (NICHE COMMUNITY FEEDBACK)',
      body: `I've been researching agent cost blowups for a few months — the 200-calls-in-four-minutes retry loops, the $19K surprise bills, the run that costs $200 one night and $7 the next. The pattern I keep seeing: every tool reports tokens per request, but nobody can say what one completed task cost — one closed ticket, one enriched lead — with retries and failures rolled in. IDC found 67% of enterprises overran their agent budget by 10%+ last year, and AWS just wrote cost-per-task into the Agentic AI Lens as a target KPI. I put together a page for a per-task cost tracker with hard dollar caps per task, and I'd genuinely like this sub to poke holes in it before I build further. Is cost-per-completed-task the number you'd actually use, or is your current setup enough? ${effectiveUrl}`,
    },
    {
      id: 'twitter_launch',
      caption: 'WHERE IT GOES: X / TWITTER (PUBLIC LAUNCH POST)',
      body: `Agents burn 5–30x more tokens per task than a chatbot (Gartner). Uber blew its entire 2026 AI budget by April. 67% of teams overran agent budgets last year (IDC). Everyone measures tokens per request. Nobody measures cost per finished task — which is the only number a margin cares about. I put together a page for a tool that tracks exactly that and hard-caps any task at a dollar limit. Would honestly value takes from anyone running agents in production: ${effectiveUrl}`,
    },
    {
      id: 'reddit_performance',
      caption: 'WHERE IT GOES: REDDIT — r/AITOOLSPERFORMANCE (TECHNICAL EVAL & MARGINS)',
      body: `This sub is one of the only places I've seen people track first-try success rate, retries needed, and total cost per successful task — which is exactly the metric the rest of the agent world ignores. I've been talking to teams running production agents, and the gap between "what the provider bill says" and "what a clean completed task costs" is routinely 3–6x once retry loops are counted. I put together a page for a proxy that attributes every call to a task ID and reports cost per completed task automatically, with optional per-task dollar caps. Since you all live in this data manually, I'd rather hear what's wrong with the approach now than after building: ${effectiveUrl}`,
    },
    {
      id: 'direct_message',
      caption: 'WHERE IT GOES: DIRECT MESSAGE (1-ON-1 OUTREACH TO FOUNDERS & OPS LEADS)',
      body: `Saw your post about agent costs getting unpredictable — I've been researching that exact problem and put together a page for a tool that tracks cost per completed task (retries included) and hard-caps any task at a dollar limit. Would you take 60 seconds and tell me if this would actually help, or what's missing? ${effectiveUrl}`,
    },
  ], [effectiveUrl]);

  // Welcome emails (3 sequence stages)
  const welcomeEmails = useMemo(() => [
    {
      id: 'email_instant',
      caption: 'WHEN TO SEND: IMMEDIATELY UPON SIGNUP (AUTOMATED OR DIRECT)',
      body: `Subject Option 1: Your TaskFuse early access and audit reservation
Subject Option 2: What happens next with your spend audit

Hi,

Thanks for reserving early access to TaskFuse.

You are locked in for a free seven-day Agent Spend Audit of one workflow as soon as we onboard the next cohort.

Here is exactly what happens next:
We are onboarding founding users in small batches so we can personally review each proxy integration. When your batch opens, I will send you an onboarding link to route a single test workflow through our proxy — one config line, zero SDK, sub-5ms overhead.

At the end of your first seven days, you will receive a one-page audit breakdown showing your true cost per completed task, isolated retry-loop spend, top three token waste sources, and calculated monthly savings.

If you would like to jump the queue, reply directly to this email with which agent workflow you are running (support triage, document extraction, sales ops) and roughly how many tasks it runs per day.`,
    },
    {
      id: 'email_day2',
      caption: 'WHEN TO SEND: DAY 2 AFTER SIGNUP',
      body: `Subject Option 1: The hidden math behind agent retry loops
Subject Option 2: Why token bills hide true task costs

Hi,

Most teams we speak with do not realize their agent costs are spiking until the end-of-month model invoice arrives.

When an agent succeeds on the first try, the cost is pennies. But when an agent hits an ambiguous JSON payload, a rate limit, or a tool failure, it often retries silently three, six, or twelve times. Each attempt resends the full conversation history. A run that should have cost $0.08 ends up costing $4.50 — and standard token dashboards just show a spike in input tokens, not which business task failed.

That is why we built TaskFuse around cost per completed task rather than tokens per request.

Quick question for you: Have you ever had a runaway agent run or unexpected monthly model bill? Reply and tell me what happened — I read and answer every email personally.`,
    },
    {
      id: 'email_day5',
      caption: 'WHEN TO SEND: DAY 5 AFTER SIGNUP',
      body: `Subject Option 1: The #1 concern about agent proxy latency
Subject Option 2: How we cap costs without breaking agents

Hi,

The most common question founders and ops leads ask us is: "Will putting a proxy in front of my agents add latency or break active runs?"

The short answer is no. TaskFuse runs an ultra-low latency edge passthrough that adds under 5ms of overhead. More importantly, everything begins in observe-only mode. You get total visibility into cost per finished task and runaway retry patterns without changing a single execution behavior.

Only when you choose to turn on hard budget caps do we stop calls that exceed your dollar ceiling, returning a standard 402 HTTP response your agent error handler catches cleanly.

We are finalizing our next wave of pilot onboarding next week. If you have 15 minutes, reply here or grab a quick slot on my calendar so we can map out your workflow before your audit starts.`,
    },
  ], []);

  // Checklist item definitions
  const checklistItems = [
    { id: 'page_live', label: 'Page live — public domain accessible and lead capture tested' },
    { id: 'channel_1', label: 'Shared to r/AI_Agents — niche community problem post' },
    { id: 'channel_2', label: 'Shared to X / Twitter — broad token-waste insight launch post' },
    { id: 'channel_3', label: 'Shared to r/AIToolsPerformance — technical eval & margin discussion' },
    { id: 'dms_sent', label: 'Direct messages sent — 1-on-1 outreach to 5 target founders or ops leads' },
    { id: 'visitors_100', label: '100 unique visitors — sufficient sample size for conversion signal' },
    { id: 'read_verdict', label: 'Read the verdict — evaluate conversion rate against 3% and 10% thresholds' },
  ];

  // Render: Loading state
  if (authLoading || (user && settingsLoading)) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-8 max-w-[420px] w-full text-center space-y-3 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
            INITIALIZING LAUNCH HQ
          </div>
          <div className="text-[15px] text-[#475569]">
            Connecting to Firebase authentication and data store...
          </div>
        </div>
      </div>
    );
  }

  // Render: Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-7 max-w-[480px] w-full space-y-5 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
            AUTHENTICATION REQUIRED
          </div>
          <div className="space-y-1.5">
            <h1 className="text-[20px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              TaskFuse Launch HQ
            </h1>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              Sign in with Google to access or claim this private launch dashboard. The first Google account to sign in becomes the sole owner.
            </p>
          </div>

          {authError && (
            <div className="text-[13px] text-[#DC2626] font-mono">
              {authError}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => signInWithGoogle().catch((e) => setAuthError(e.message))}
              className="bg-[#D97706] hover:bg-[#B45309] text-[#FFFFFF] font-medium text-[14px] px-5 py-2.5 rounded-full cursor-pointer transition-colors w-full sm:w-auto"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render: Signed in, but no owner claimed yet
  if (!settings) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-7 max-w-[500px] w-full space-y-5 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
            UNCLAIMED LAUNCH HQ
          </div>
          <div className="space-y-2">
            <h1 className="text-[20px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Claim Launch HQ Ownership
            </h1>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              No owner has claimed this Launch HQ yet. You are signed in as <span className="font-semibold text-[#0F172A]">{user.email}</span>. Click below to register this Google account as the permanent owner.
            </p>
          </div>

          {authError && (
            <div className="text-[13px] text-[#DC2626] font-mono">
              {authError}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleClaimOwnership}
              className="bg-[#D97706] hover:bg-[#B45309] text-[#FFFFFF] font-medium text-[14px] px-5 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              Claim Launch HQ Ownership
            </button>
            <button
              onClick={handleSignOut}
              className="text-[13.5px] text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render: Signed in, but not the owner
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-7 max-w-[480px] w-full space-y-4 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
            ACCESS RESTRICTED
          </div>
          <div className="space-y-1.5">
            <h1 className="text-[20px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Access Denied
            </h1>
            <p className="text-[14.5px] text-[#475569] leading-relaxed">
              You are signed in as <span className="font-semibold text-[#0F172A]">{user.email}</span>. This Launch HQ has already been claimed by another owner account.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleSignOut}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-[#FFFFFF] font-medium text-[13.5px] px-4 py-2 rounded-full cursor-pointer transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render: Main Launch HQ Dashboard (Strictly One Column, 720–840px measure)
  return (
    <div className="min-h-screen bg-[#ECEFF3] text-[#0F172A] pb-20">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10 sm:space-y-12">
        
        {/* Top Minimal Admin Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#D8DFE8]">
          <div>
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              OPERATIONS CONSOLE
            </div>
            <h1 className="text-[22px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              TaskFuse Launch HQ
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[13px] text-[#64748B]">
            <span>{user.email}</span>
            <span className="text-[#CBD3DF]">•</span>
            <button
              onClick={handleSignOut}
              className="text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* ============================================================== */}
        {/* 1. SIGNUPS FEED: Live Scoreboard */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              SCOREBOARD
            </div>
            <h2 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Live Signups Feed
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-6 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
            {/* Count-per-day stats row (Allowed multi-column for short numbers only) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#EEF1F6]">
              <div>
                <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                  Total Leads
                </div>
                <div className="text-[26px] font-bold text-[#0F172A] font-mono tabular-nums">
                  {metrics.total}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                  Today
                </div>
                <div className="text-[26px] font-bold text-[#0F172A] font-mono tabular-nums">
                  {metrics.todayCount}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                  Yesterday
                </div>
                <div className="text-[26px] font-bold text-[#0F172A] font-mono tabular-nums">
                  {metrics.yesterdayCount}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                  Past 7 Days
                </div>
                <div className="text-[26px] font-bold text-[#0F172A] font-mono tabular-nums">
                  {metrics.past7DaysCount}
                </div>
              </div>
            </div>

            {/* List of Leads */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                LATEST ENTRIES (NEWEST FIRST)
              </div>

              {leadsLoading ? (
                <div className="text-[14px] text-[#64748B] py-3">
                  Loading signups from Firestore...
                </div>
              ) : leads.length === 0 ? (
                <div className="text-[14.5px] text-[#64748B] py-4 leading-relaxed">
                  No signups recorded yet. Share your launch posts below to start driving validation traffic.
                </div>
              ) : (
                <div className="divide-y divide-[#EEF1F6]">
                  {leads.map((lead) => (
                    <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[14px]">
                      <div>
                        <div className="font-semibold text-[#0F172A] font-mono">
                          {lead.email}
                        </div>
                        <div className="text-[12px] text-[#64748B] space-x-2">
                          <span>Source: {lead.source || 'website'}</span>
                          {lead.tier && <span>• Tier: {lead.tier}</span>}
                        </div>
                      </div>
                      <div className="text-[12px] font-mono text-[#64748B] sm:text-right">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }) : 'Just now'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. LAUNCH KIT */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              DISTRIBUTION
            </div>
            <h2 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Launch Kit
            </h2>
          </div>

          {/* Live URL Input Field */}
          <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-3 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Your Live URL (Replaces [YOUR LINK] in every post)
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => handleSaveLiveUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#FFFFFF] border border-[#CBD3DF] rounded-xl px-3.5 py-2.5 text-[14.5px] text-[#0F172A] focus:outline-none focus:border-[#D97706] font-mono"
            />
          </div>

          {/* Launch Posts: One column, stacked, identical card structure */}
          {launchPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-4 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]"
            >
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                {post.caption}
              </div>
              <div className="text-[15.5px] text-[#1E293B] leading-[1.6] max-w-[75ch] whitespace-pre-line font-sans">
                {post.body}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleCopy(post.id, post.body)}
                  className="bg-[#D97706] hover:bg-[#B45309] text-[#FFFFFF] text-[13px] font-medium px-4 py-2 rounded-full cursor-pointer transition-colors"
                >
                  {copiedId === post.id ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ============================================================== */}
        {/* 3. WELCOME EMAILS */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              CONVERSION
            </div>
            <h2 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Welcome Emails
            </h2>
          </div>

          {/* Welcome Email Cards: One column, stacked, identical card structure */}
          {welcomeEmails.map((email) => (
            <div 
              key={email.id}
              className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-4 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]"
            >
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                {email.caption}
              </div>
              <div className="text-[15.5px] text-[#1E293B] leading-[1.6] max-w-[75ch] whitespace-pre-line font-sans">
                {email.body}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleCopy(email.id, email.body)}
                  className="bg-[#D97706] hover:bg-[#B45309] text-[#FFFFFF] text-[13px] font-medium px-4 py-2 rounded-full cursor-pointer transition-colors"
                >
                  {copiedId === email.id ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ============================================================== */}
        {/* 4. CHECKLIST */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              OPERATIONS
            </div>
            <h2 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Launch Checklist
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-4 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              PROGRESSION TO 100 VISITORS
            </div>

            <div className="space-y-3">
              {checklistItems.map((item) => {
                const isChecked = !!checklist[item.id];
                return (
                  <label 
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer group py-1"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleChecklist(item.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#D97706] focus:ring-[#D97706] cursor-pointer"
                    />
                    <span className={`text-[15px] leading-snug transition-colors ${isChecked ? 'line-through text-[#94A3B8]' : 'text-[#1E293B]'}`}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. VERDICT */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              SIGNAL ANALYSIS
            </div>
            <h2 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>
              Validation Verdict
            </h2>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E6ED] rounded-[24px] p-6 sm:p-7 space-y-6 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
            {/* Input field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                Approximate Unique Visitors
              </label>
              <input
                type="number"
                min="0"
                value={visitorsCount === 0 ? '' : visitorsCount}
                onChange={(e) => handleSaveVisitors(parseInt(e.target.value) || 0)}
                placeholder="e.g. 100"
                className="w-full bg-[#FFFFFF] border border-[#CBD3DF] rounded-xl px-3.5 py-2.5 text-[15px] font-mono text-[#0F172A] focus:outline-none focus:border-[#D97706]"
              />
            </div>

            {/* Computed Verdict Display */}
            <div className="space-y-2 pt-2 border-t border-[#EEF1F6]">
              <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                AUTOMATED VERDICT
              </div>

              {verdictData.rate ? (
                <div className="space-y-1">
                  <div className="text-[13.5px] text-[#64748B] font-mono">
                    {leads.length} signups ÷ {visitorsCount} visitors = <span className="font-bold text-[#0F172A]">{verdictData.rate}%</span>
                  </div>
                  <div className="text-[18px] font-bold text-[#D97706] leading-snug">
                    {verdictData.message}
                  </div>
                </div>
              ) : (
                <div className="text-[14.5px] text-[#64748B] leading-relaxed">
                  {verdictData.message}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
