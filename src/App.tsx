import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVisual } from './components/HeroVisual';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { DemoMoment } from './components/DemoMoment';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CaptureModal } from './components/CaptureModal';
import { ShareKitModal } from './components/ShareKitModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path.startsWith('/admin') || hash === '#/admin' || hash === '#admin';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setIsAdminRoute(path.startsWith('/admin') || hash === '#/admin' || hash === '#admin');
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('nav_cta');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [shareKitOpen, setShareKitOpen] = useState(false);

  const handleOpenAudit = (source: string, tier: string | null = null) => {
    setModalSource(source);
    setSelectedTier(tier);
    setModalOpen(true);
  };

  const handleSelectTier = (tierName: string) => {
    handleOpenAudit(`pricing_${tierName.toLowerCase()}`, tierName);
  };

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#ECEFF3] text-[#0F172A] selection:bg-[#FDE68A] selection:text-[#92400E] pt-4">
      {/* Floating Pill Navbar */}
      <Navbar onOpenAudit={handleOpenAudit} />

      <main>
        {/* 1. HERO — Ultra-clean open split layout inspired by Zentra & Autopilot */}
        <section className="relative pt-6 sm:pt-10 pb-14 sm:pb-18 md:py-20 border-b border-[#E2E6ED]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Copy Left */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E6ED] text-[11px] sm:text-[12px] font-mono text-[#D97706] font-semibold shadow-xs max-w-full">
                  <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse shrink-0" />
                  <span className="hidden sm:inline">PER-TASK COST OBSERVABILITY & BUDGET CAPS</span>
                  <span className="sm:hidden">PER-TASK COST & BUDGET CAPS</span>
                </div>

                <h1 className="spec-h1">
                  Know what every finished agent task actually costs
                </h1>

                <p className="spec-body text-[16px] sm:text-[19px] text-[#475569] max-w-[56ch] leading-relaxed">
                  Per-task cost tracking and budget caps for teams spending $5K–$50K a month on AI agents in production.
                </p>

                {/* Email capture form */}
                <div className="pt-1 sm:pt-2 max-w-[520px]">
                  <LeadCaptureForm source="hero" />
                </div>

                {/* Credibility line with verified reference source */}
                <div className="pt-1 sm:pt-2 text-[12px] sm:text-[13px] text-[#64748B] flex items-start sm:items-center gap-2 font-mono leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1 sm:mt-0" />
                  <span>
                    67% of teams running AI agents overran their budget by more than 10% last year (IDC, July 2026).
                  </span>
                </div>
              </div>

              {/* Hero Image Right */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* 2. DEMO MOMENT — Centerpiece: Zentra-Style Agent Spend Audit Bento Console */}
        <DemoMoment onOpenAudit={handleOpenAudit} />

        {/* 3. PROBLEM — Clean Bento Cards */}
        <Problem />

        {/* 4. HOW IT WORKS — Numbered Bento Steps & Code Passthrough */}
        <HowItWorks />

        {/* 5. BENEFITS — Structured Capability Matrix */}
        <Benefits />

        {/* 6. PRICING — Clean Bento Comparison */}
        <Pricing onSelectTier={handleSelectTier} />

        {/* 7. FAQ — Clean Rounded Disclosures */}
        <FAQ />

        {/* 8. FINAL CTA — Centered Invitation */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer onOpenShareKit={() => setShareKitOpen(true)} />

      {/* Modal for Tier Reservations */}
      <CaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
        tier={selectedTier}
      />

      {/* Validation Share Kit Modal */}
      <ShareKitModal
        isOpen={shareKitOpen}
        onClose={() => setShareKitOpen(false)}
      />
    </div>
  );
}
