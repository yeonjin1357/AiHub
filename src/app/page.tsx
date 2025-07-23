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
    <div className='min-h-screen bg-[#0a0a0b] relative overflow-hidden'>
      {/* Background gradient effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0'>
          {/* Top gradient */}
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-blob'></div>
          <div className='absolute top-0 right-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-blob animation-delay-2000'></div>
          
          {/* Middle gradient */}
          <div className='absolute top-1/2 left-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[180px] animate-blob animation-delay-4000'></div>
          <div className='absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] animate-blob animation-delay-2000'></div>
          
          {/* Bottom gradient */}
          <div className='absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[200px] animate-blob'></div>
          <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-blob animation-delay-4000'></div>
        </div>
      </div>
      
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
