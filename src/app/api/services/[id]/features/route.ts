import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET - 서비스 특징 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    
    if (!serviceId) {
      return NextResponse.json(
        { error: '서비스 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 서비스 특징 조회
    const { data: features, error } = await supabase
      .from('service_features')
      .select('*')
      .eq('service_id', serviceId)
      .order('display_order');

    if (error) {
      console.error('Error fetching service features:', error);
      return NextResponse.json(
        { error: '서비스 특징을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(features || []);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST - 서비스 특징 생성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const body = await request.json();
    
    if (!serviceId) {
      return NextResponse.json(
        { error: '서비스 ID가 필요합니다.' },
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

    // 서비스 특징 생성
    const { data: feature, error } = await supabase
      .from('service_features')
      .insert([{ ...body, service_id: serviceId }])
      .select()
      .single();

    if (error) {
      console.error('Error creating service feature:', error);
      return NextResponse.json(
        { error: '서비스 특징 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(feature);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT - 서비스 특징 일괄 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const { features } = await request.json();
    
    if (!serviceId || !features) {
      return NextResponse.json(
        { error: '서비스 ID와 특징 데이터가 필요합니다.' },
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

    // 기존 특징 삭제
    const { error: deleteError } = await supabase
      .from('service_features')
      .delete()
      .eq('service_id', serviceId);

    if (deleteError) {
      console.error('Error deleting existing features:', deleteError);
      return NextResponse.json(
        { error: '기존 특징 삭제에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 새로운 특징 추가
    if (features.length > 0) {
      const { error: insertError } = await supabase
        .from('service_features')
        .insert(
          features.map((feature: any) => ({
            service_id: serviceId,
            feature_key: feature.feature_key,
            custom_label: feature.custom_label,
            custom_description: feature.custom_description,
            is_highlighted: feature.is_highlighted,
            display_order: feature.display_order,
            category: feature.category
          }))
        );

      if (insertError) {
        console.error('Error inserting new features:', insertError);
        return NextResponse.json(
          { error: '새로운 특징 추가에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}