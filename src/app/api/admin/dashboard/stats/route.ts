import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 관리자 권한 확인
    const { data: adminProfile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!adminProfile || adminProfile.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 총 사용자 수
    const { count: totalUsers } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    // 총 서비스 수
    const { count: totalServices } = await supabase
      .from('ai_services')
      .select('*', { count: 'exact', head: true });

    // 총 리뷰 수
    const { count: totalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    // 총 찜 수
    const { count: totalFavorites } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true });

    // 카테고리별 서비스 수
    const { data: categoriesData } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        ai_services(count)
      `);

    const servicesByCategory = categoriesData?.map(cat => ({
      category: cat.name,
      count: cat.ai_services?.[0]?.count || 0
    })) || [];

    // 평점 분포
    const { data: ratingsData } = await supabase
      .from('reviews')
      .select('rating');

    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    ratingsData?.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
      }
    });

    // 최근 30일 신규 가입자 수 (일별)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: newUsersData } = await supabase
      .from('user_profiles')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // 일별 신규 가입자 집계
    const userGrowth: { [key: string]: number } = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      userGrowth[dateKey] = 0;
    }

    newUsersData?.forEach(user => {
      const dateKey = user.created_at.split('T')[0];
      if (userGrowth.hasOwnProperty(dateKey)) {
        userGrowth[dateKey]++;
      }
    });

    const userGrowthArray = Object.entries(userGrowth)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // 인기 서비스 TOP 5
    const { data: popularServices } = await supabase
      .from('ai_services')
      .select(`
        id,
        name,
        slug,
        reviews(count),
        favorites(count)
      `)
      .limit(5);

    const topServices = popularServices?.map(service => ({
      name: service.name,
      slug: service.slug,
      reviews: service.reviews?.[0]?.count || 0,
      favorites: service.favorites?.[0]?.count || 0,
      engagement: (service.reviews?.[0]?.count || 0) + (service.favorites?.[0]?.count || 0)
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5) || [];

    return NextResponse.json({
      overview: {
        totalUsers: totalUsers || 0,
        totalServices: totalServices || 0,
        totalReviews: totalReviews || 0,
        totalFavorites: totalFavorites || 0,
      },
      servicesByCategory,
      ratingDistribution,
      userGrowth: userGrowthArray,
      topServices,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}