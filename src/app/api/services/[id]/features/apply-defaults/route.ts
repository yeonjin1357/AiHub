import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getCategoryDefaultFeatures, SERVICE_FEATURES } from '@/lib/service-features';

// 특징 키에 따른 카테고리 반환
function getFeatureCategory(featureKey: string): string {
  const feature = SERVICE_FEATURES[featureKey];
  return feature?.category || 'platform';
}

// POST - 기본 특징 적용
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const { categorySlug } = await request.json();
    
    if (!serviceId || !categorySlug) {
      return NextResponse.json(
        { error: '서비스 ID와 카테고리가 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // 사용자 인증 및 관리자 권한 확인
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userProfile?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // 기본 특징 가져오기
    const defaultFeatures = getCategoryDefaultFeatures(categorySlug);
    
    if (defaultFeatures.length === 0) {
      return NextResponse.json(
        { error: `카테고리 '${categorySlug}'에 대한 기본 특징이 없습니다.` },
        { status: 400 }
      );
    }
    
    // 기존 특징 확인
    const { data: existingFeatures } = await supabase
      .from('service_features')
      .select('feature_key')
      .eq('service_id', serviceId);

    const existingFeatureKeys = existingFeatures?.map(f => f.feature_key) || [];
    
    // 새로운 특징만 추가
    const newFeatures = defaultFeatures
      .filter(featureKey => !existingFeatureKeys.includes(featureKey))
      .map((featureKey, index) => ({
        service_id: serviceId,
        feature_key: featureKey,
        is_highlighted: index < 3, // 처음 3개는 하이라이트
        display_order: existingFeatures?.length || 0 + index,
        category: getFeatureCategory(featureKey)
      }));

    if (newFeatures.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: '추가할 새로운 특징이 없습니다.' 
      });
    }

    // 새로운 특징 추가
    const { error } = await supabase
      .from('service_features')
      .insert(newFeatures);

    if (error) {
      console.error('Error applying default features:', error);
      return NextResponse.json(
        { error: '기본 특징 적용에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      addedCount: newFeatures.length,
      message: `${newFeatures.length}개의 기본 특징이 추가되었습니다.`
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}