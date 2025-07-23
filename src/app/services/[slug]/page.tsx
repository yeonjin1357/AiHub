import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ServiceDetailContent } from '@/components/services/service-detail-content';
import { createClient } from '@/utils/supabase/server';
import { getRelatedServices } from '@/lib/related-services';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getService(slug: string) {
  const supabase = await createClient();
  
  const { data: service, error } = await supabase
    .from('ai_services')
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        description,
        icon
      ),
      reviews:reviews(rating),
      service_updates(published_at)
    `)
    .eq('slug', slug)
    .single();

  if (error || !service) {
    return null;
  }

  // 평점과 리뷰 수 계산
  const reviews = service.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
    : 0;

  return {
    ...service,
    reviews: undefined, // reviews 필드 제거
    service_updates: undefined, // service_updates 필드 제거
    review_count: reviewCount,
    average_rating: Math.round(averageRating * 10) / 10, // 소수점 첫째자리까지
    latest_update_at: service.updated_at
  };
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) {
    return {
      title: '서비스를 찾을 수 없습니다 | AIMOA',
    };
  }

  return {
    title: `${service.name} - AI 서비스 상세 정보 | AIMOA`,
    description: service.description,
    openGraph: {
      title: `${service.name} | AIMOA`,
      description: service.description,
      images: service.logo_url ? [service.logo_url] : [],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  // 관련 서비스 데이터 가져오기
  const relatedServices = await getRelatedServices(slug);

  return (
    <div className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]'></div>
          <div className='absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]'></div>
          <div className='absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[180px]'></div>
        </div>
      </div>
      
      <Header />
      <ServiceDetailContent service={service} relatedServices={relatedServices} />
    </div>
  );
}