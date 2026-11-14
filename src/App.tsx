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
    <div className="min-h-screen bg-[#F5F5F3] text-[#0B0C0E] selection:bg-[#FDE68A] selection:text-[#78350F] pt-3">
      {/* Orynthiq-Inspired Obsidian Top Bar */}
      <Navbar onOpenAudit={handleOpenAudit} />

      <main>
        {/* 1. HERO — Orynthiq Light Architectural Canvas + Quantix Amber Horizon Command Center */}
        <section className="relative bg-[#F5F5F3] bg-architectural-grid pt-12 sm:pt-16 pb-10 sm:pb-14 overflow-hidden">
          {/* Smooth edge fade mask on grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 35%, transparent 35%, #F5F5F3 85%)',
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="text-[12px] font-mono text-[#6E737D] uppercase tracking-wider">
              Per-task cost tracking · Hard budget caps
            </div>

            <h1 className="spec-h1 text-[#0B0C0E] max-w-[820px] mx-auto">
              Know what every finished agent task actually costs
            </h1>

            <p className="spec-body text-[17px] sm:text-[19px] text-[#4B5058] max-w-[54ch] mx-auto leading-relaxed">
              Per-task cost tracking and dollar budget limits for teams spending $5K–$50K a month on AI agents in production.
            </p>

            {/* Primary Email Capture */}
            <div className="pt-2 max-w-[520px] mx-auto text-left">
              <LeadCaptureForm source="hero" />
            </div>

            <p className="text-[12.5px] font-mono text-[#6E737D] pt-1">
              67% of teams running AI agents overran their budget by more than 10% last year — IDC, July 2026
            </p>
          </div>
        </section>

        {/* Sculptural Obsidian Transition & Command Center Stage (Orynthiq + Quantix Halo) */}
        <section className="relative bg-[#0A0B0E] pt-8 sm:pt-12 pb-16 sm:pb-20 border-b border-white/10 overflow-hidden">
          {/* Warm Amber Horizon Glow Arc (Quantix halo motif in TaskFuse Amber) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[280px] opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.55) 0%, rgba(10,11,14,0) 72%)',
            }}
          />

          {/* Subtle transition gradient bridging #F5F5F3 stone canvas into #0A0B0E obsidian stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#F5F5F3] to-transparent opacity-10"
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
            <HeroVisual />
          </div>
        </section>

        {/* 2. PROBLEM — Orynthiq Obsidian KPI Band + WizardZ Alternating 2x2 Bento */}
        <Problem />

        {/* 3. DEMO MOMENT — Sample Spend Audit Bento Console + Spend Estimator */}
        <DemoMoment onOpenAudit={handleOpenAudit} />

        {/* 4. HOW IT WORKS — Crypto Staggered Amber Focal Steps + Passthrough */}
        <HowItWorks />

        {/* 5. BENEFITS — Quantix 3+2 Asymmetric Bento + WizardZ Grounded Workflow Strip */}
        <Benefits />

        {/* 6. PRICING — Curely Clean 3-Tier Comparison with Obsidian Center Tier */}
        <Pricing onSelectTier={handleSelectTier} />

        {/* 7. FAQ — Editorial 4/8 Split Accordion */}
        <FAQ />

        {/* 8. FINAL CTA — Clean Invitation Card */}
        <FinalCTA />
      </main>

      {/* Deep Obsidian Footer */}
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
