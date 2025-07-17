import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/favorites - 사용자의 모든 찜 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const { data: favorites, error } = await supabase
      .from('favorites')
      .select(`
        id,
        service_id,
        created_at,
        ai_services (
          id,
          name,
          slug,
          description,
          website_url,
          logo_url,
          features,
          is_free,
          pricing_type,
          is_featured,
          created_at,
          updated_at,
          category_id,
          reviews:reviews(rating)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }

    // 평점과 리뷰 수 계산
    const favoritesWithRatings = favorites?.map(favorite => {
      if (favorite.ai_services && Array.isArray(favorite.ai_services)) {
        // ai_services가 배열인 경우 첫 번째 서비스를 사용
        const service = favorite.ai_services[0];
        const reviews = (service as any).reviews || [];
        const reviewCount = reviews.length;
        const averageRating = reviewCount > 0 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
          : 0;

        return {
          ...favorite,
          ai_services: {
            ...service,
            reviews: undefined, // reviews 필드 제거
            review_count: reviewCount,
            average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
          }
        };
      } else if (favorite.ai_services && !Array.isArray(favorite.ai_services)) {
        // ai_services가 객체인 경우
        const reviews = (favorite.ai_services as any).reviews || [];
        const reviewCount = reviews.length;
        const averageRating = reviewCount > 0 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
          : 0;

        return {
          ...favorite,
          ai_services: {
            ...(favorite.ai_services as any),
            reviews: undefined, // reviews 필드 제거
            review_count: reviewCount,
            average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
          }
        };
      }
      return favorite;
    }) || [];

    return NextResponse.json({ favorites: favoritesWithRatings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/favorites - 서비스를 찜 목록에 추가
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { service_id } = body;


    if (!service_id) {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 });
    }

    // 이미 찜한 서비스인지 확인
    const { data: existingFavorite, error: checkError } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('service_id', service_id)
      .single();

    if (existingFavorite) {
      return NextResponse.json({ error: 'Service already favorited' }, { status: 409 });
    }

    // 새로운 찜 추가
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        service_id: service_id,
      })
      .select(`
        id,
        service_id,
        created_at,
        ai_services (
          id,
          name,
          slug,
          description,
          website_url,
          logo_url,
          features,
          is_free,
          pricing_type,
          is_featured,
          created_at,
          updated_at,
          category_id,
          reviews:reviews(rating)
        )
      `)
      .single();

    if (error) {
      
      // 구체적인 에러 타입별 메시지
      if (error.code === '23503') {
        return NextResponse.json({ 
          error: '존재하지 않는 서비스이거나 사용자 프로필이 없습니다.',
          details: error.message 
        }, { status: 400 });
      }
      
      if (error.code === '23505') {
        return NextResponse.json({ 
          error: '이미 찜한 서비스입니다.',
          details: error.message 
        }, { status: 409 });
      }
      
      return NextResponse.json({ 
        error: 'Failed to add favorite',
        details: error.message 
      }, { status: 500 });
    }

    // 평점과 리뷰 수 계산
    if (favorite?.ai_services) {
      const reviews = (favorite.ai_services as any).reviews || [];
      const reviewCount = reviews.length;
      const averageRating = reviewCount > 0 
        ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
        : 0;

      favorite.ai_services = {
        ...favorite.ai_services,
        reviews: undefined, // reviews 필드 제거
        review_count: reviewCount,
        average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
      } as any;
    }

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/favorites - 찜 목록에서 서비스 제거
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const service_id = searchParams.get('service_id');

    if (!service_id) {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('service_id', service_id);

    if (error) {
      return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}