import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 서비스 존재 확인
    const { data: service, error: serviceError } = await supabase
      .from('ai_services')
      .select('id')
      .eq('id', id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json(
        { error: '서비스를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 리뷰 통계 계산
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('service_id', id);

    if (reviewsError) {
      return NextResponse.json(
        { error: '리뷰 데이터를 가져오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const reviewCount = reviews?.length || 0;
    const averageRating = reviewCount > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;

    return NextResponse.json({
      review_count: reviewCount,
      average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}