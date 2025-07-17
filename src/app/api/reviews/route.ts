import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { service_id, rating, comment } = body;

    // 입력값 검증
    if (!service_id || !rating || !comment) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: '별점은 1-5 사이여야 합니다.' }, { status: 400 });
    }

    if (comment.trim().length < 10) {
      return NextResponse.json({ error: '리뷰는 최소 10자 이상 작성해주세요.' }, { status: 400 });
    }

    if (comment.length > 1000) {
      return NextResponse.json({ error: '리뷰는 최대 1000자까지 작성할 수 있습니다.' }, { status: 400 });
    }

    // 서비스 존재 확인
    const { data: service, error: serviceError } = await supabase
      .from('ai_services')
      .select('id')
      .eq('id', service_id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json({ error: '존재하지 않는 서비스입니다.' }, { status: 404 });
    }

    // 중복 리뷰 확인
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', user.id)
      .eq('service_id', service_id)
      .single();

    if (existingReview) {
      return NextResponse.json({ error: '이미 이 서비스에 리뷰를 작성하셨습니다.' }, { status: 409 });
    }

    // 리뷰 생성
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        service_id,
        rating,
        comment: comment.trim(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewError) {
      
      // 테이블이 없는 경우
      if (reviewError.code === '42P01') {
        return NextResponse.json({ 
          error: 'reviews 테이블이 존재하지 않습니다. 데이터베이스를 확인해주세요.',
          details: reviewError.message 
        }, { status: 500 });
      }
      
      // RLS 정책 위반
      if (reviewError.code === '42501') {
        return NextResponse.json({ 
          error: '권한이 없습니다. RLS 정책을 확인해주세요.',
          details: reviewError.message 
        }, { status: 403 });
      }
      
      return NextResponse.json({ 
        error: '리뷰 작성에 실패했습니다.',
        details: reviewError.message 
      }, { status: 500 });
    }

    return NextResponse.json({ message: '리뷰가 성공적으로 작성되었습니다.', review });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('service_id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!serviceId) {
      return NextResponse.json({ error: 'service_id가 필요합니다.' }, { status: 400 });
    }

    // 리뷰 목록 조회
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        id,
        user_id,
        rating,
        comment,
        created_at,
        user_profiles (
          id,
          email,
          name
        )
      `)
      .eq('service_id', serviceId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (reviewsError) {
      return NextResponse.json({ error: '리뷰를 불러오는데 실패했습니다.' }, { status: 500 });
    }

    // 리뷰 통계 조회
    const { data: stats, error: statsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('service_id', serviceId);

    if (statsError) {
      return NextResponse.json({ error: '리뷰 통계를 불러오는데 실패했습니다.' }, { status: 500 });
    }

    // 평균 별점 계산
    const totalReviews = stats.length;
    const averageRating = totalReviews > 0 
      ? stats.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    // 별점별 개수 계산
    const ratingCounts = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: stats.filter(review => review.rating === rating).length
    }));

    // 현재 사용자 정보 가져오기 (로그인된 경우)
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // 결과 포맷팅
    const formattedReviews = reviews.map(review => {
      const userData = Array.isArray(review.user_profiles) ? review.user_profiles[0] : review.user_profiles;
      return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        user_id: review.user_id,
        is_own_review: currentUser ? review.user_id === currentUser.id : false,
        user: {
          name: userData?.name || userData?.email?.split('@')[0] || '익명',
          email: userData?.email || ''
        }
      };
    });

    return NextResponse.json({
      reviews: formattedReviews,
      stats: {
        total_reviews: totalReviews,
        average_rating: Math.round(averageRating * 10) / 10,
        rating_counts: ratingCounts
      },
      pagination: {
        page,
        limit,
        has_more: reviews.length === limit
      }
    });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');

    if (!reviewId) {
      return NextResponse.json({ error: 'review_id가 필요합니다.' }, { status: 400 });
    }

    // 리뷰 존재 여부 및 소유자 확인
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .select('id, user_id')
      .eq('id', reviewId)
      .single();

    if (reviewError || !review) {
      return NextResponse.json({ error: '존재하지 않는 리뷰입니다.' }, { status: 404 });
    }

    if (review.user_id !== user.id) {
      return NextResponse.json({ error: '본인의 리뷰만 삭제할 수 있습니다.' }, { status: 403 });
    }

    // 리뷰 삭제
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (deleteError) {
      return NextResponse.json({ error: '리뷰 삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '리뷰가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}