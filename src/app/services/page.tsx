import { Header } from '@/components/layout/header';
import { ServicesPageContent } from '@/components/services/services-page-content';

export const metadata = {
  title: 'AI 서비스 카탈로그',
  description: '최고의 AI 도구들을 한눈에 비교하고 찾아보세요. 카테고리별로 정리된 AI 서비스들을 탐색해보세요.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ServicesPageContent />
    </div>
  );
}