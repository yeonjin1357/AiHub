import { createClient } from '@/utils/supabase/client';

// 관련 서비스 타입 정의
export interface RelatedService {
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  pricing_type?: 'free' | 'freemium' | 'paid';
}

// 같은 카테고리에서 관련 서비스 가져오기 함수
export async function getRelatedServices(serviceSlug: string): Promise<RelatedService[]> {
  const supabase = createClient();
  
  try {
    // 현재 서비스의 카테고리 조회
    const { data: currentService, error: serviceError } = await supabase
      .from('ai_services')
      .select('category_id')
      .eq('slug', serviceSlug)
      .single();

    if (serviceError || !currentService) {
      return [];
    }

    // 같은 카테고리의 다른 서비스들 조회 (현재 서비스 제외)
    const { data: relatedServices, error: relatedError } = await supabase
      .from('ai_services')
      .select('name, slug, logo_url, short_description, pricing_type')
      .eq('category_id', currentService.category_id)
      .neq('slug', serviceSlug)
      .limit(10); // 더 많이 가져온 후 랜덤 선택

    if (relatedError || !relatedServices) {
      return [];
    }

    // 랜덤으로 3개 선택
    const shuffled = relatedServices.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected.map((service: any) => ({
      name: service.name,
      slug: service.slug,
      logo_url: service.logo_url,
      description: service.short_description || '관련 AI 서비스',
      pricing_type: service.pricing_type,
    }));
  } catch (error) {
    return [];
  }
}
