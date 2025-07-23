import { Header } from '@/components/layout/header';
import { ServicesPageServerContent } from './page-content';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI 서비스 카탈로그',
  description: '최고의 AI 도구들을 한눈에 비교하고 찾아보세요. 카테고리별로 정리된 AI 서비스들을 탐색해보세요.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]'></div>
          <div className='absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]'></div>
          <div className='absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[180px]'></div>
        </div>
      </div>
      
      <Header />
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
        <ServicesPageServerContent />
      </Suspense>
    </div>
  );
}