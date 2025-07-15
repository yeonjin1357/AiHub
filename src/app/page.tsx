import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/sections/hero-section';
import { AILogosSection } from '@/components/sections/ai-logos-section';
import { StatsSection } from '@/components/sections/stats-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CTASection } from '@/components/sections/cta-section';
import { AuthSuccessHandler } from '@/components/auth/auth-success-handler';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'>
      <Suspense fallback={null}>
        <AuthSuccessHandler />
      </Suspense>
      <Header />
      <HeroSection />
      <AILogosSection />
      {/* <StatsSection /> */}
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
