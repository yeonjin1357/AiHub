import { Header } from '@/components/layout/header';
import { ServicesPageServerContent } from './page-content';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI 서비스 카탈로그',
  description: '최고의 AI 도구들을 한눈에 비교하고 찾아보세요. 카테고리별로 정리된 AI 서비스들을 탐색해보세요.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
        <ServicesPageServerContent />
      </Suspense>
    </div>
  );
}