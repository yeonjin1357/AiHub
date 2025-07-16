import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length < 1) {
      return NextResponse.json([]);
    }

    const supabase = await createClient();

    // 서비스 검색 (이름, 설명, 짧은 설명에서 검색)
    const { data: services, error } = await supabase
      .from('ai_services')
      .select(`
        id,
        name,
        slug,
        short_description,
        logo_url,
        pricing_type,
        categories (
          name,
          slug
        )
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)
      .limit(10);

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json([], { status: 500 });
    }

    // 결과 포맷팅
    const formattedResults = services.map(service => ({
      id: service.id,
      name: service.name,
      slug: service.slug,
      short_description: service.short_description || '관련 AI 서비스',
      logo_url: service.logo_url,
      pricing_type: service.pricing_type,
      category: {
        name: service.categories?.name || '기타',
        slug: service.categories?.slug || 'other'
      }
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}