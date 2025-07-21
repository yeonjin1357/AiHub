import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET: 서비스 기능 목록 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceId = (await params).id;
    console.log('Fetching functions for service:', serviceId);
    
    const supabase = await createClient();

    // 먼저 테이블이 존재하는지 확인
    const { data: tableCheck, error: tableError } = await supabase
      .from('service_functions')
      .select('id')
      .limit(1);

    if (tableError) {
      console.error('Table check error:', tableError);
      
      // 테이블이 없는 경우 빈 배열 반환
      if (tableError.message.includes('relation') && tableError.message.includes('does not exist')) {
        console.log('service_functions table does not exist, returning empty array');
        return NextResponse.json([]);
      }
    }

    const { data: functions, error } = await supabase
      .from('service_functions')
      .select('*')
      .eq('service_id', serviceId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching service functions:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // 테이블이 없는 경우 빈 배열 반환
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('service_functions table does not exist, returning empty array');
        return NextResponse.json([]);
      }
      
      return NextResponse.json(
        { 
          error: '서비스 기능을 불러오는데 실패했습니다.',
          details: error.message 
        },
        { status: 500 }
      );
    }

    console.log('Functions fetched successfully:', functions?.length || 0);
    return NextResponse.json(functions || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 새 기능 추가
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceId = (await params).id;
    const supabase = await createClient();
    
    // 관리자 권한 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, icon_name, display_order } = body;

    const { data, error } = await supabase
      .from('service_functions')
      .insert({
        service_id: serviceId,
        name,
        description,
        icon_name: icon_name || 'Zap',
        display_order: display_order || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating service function:', error);
      return NextResponse.json(
        { error: '기능 추가에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 서비스의 updated_at 갱신
    await supabase
      .from('ai_services')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', serviceId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT: 기능 일괄 업데이트
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceId = (await params).id;
    const supabase = await createClient();
    
    // 관리자 권한 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { functions } = body;

    // 트랜잭션처럼 처리하기 위해 모든 업데이트를 수집
    const updates = [];
    const inserts = [];
    const deletes = [];

    // 기존 기능 목록 가져오기
    const { data: existingFunctions } = await supabase
      .from('service_functions')
      .select('id')
      .eq('service_id', serviceId);

    const existingIds = existingFunctions?.map(f => f.id) || [];
    const updatedIds = functions.filter((f: any) => f.id).map((f: any) => f.id);
    
    // 삭제할 기능 찾기
    const idsToDelete = existingIds.filter(id => !updatedIds.includes(id));
    
    if (idsToDelete.length > 0) {
      const { error } = await supabase
        .from('service_functions')
        .delete()
        .in('id', idsToDelete);
        
      if (error) {
        throw error;
      }
    }

    // 업데이트 및 삽입 처리
    for (const func of functions) {
      if (func.id) {
        // 기존 기능 업데이트
        const { error } = await supabase
          .from('service_functions')
          .update({
            name: func.name,
            description: func.description,
            icon_name: func.icon_name,
            display_order: func.display_order,
            is_active: func.is_active !== false,
          })
          .eq('id', func.id);
          
        if (error) {
          throw error;
        }
      } else {
        // 새 기능 추가
        const { error } = await supabase
          .from('service_functions')
          .insert({
            service_id: serviceId,
            name: func.name,
            description: func.description,
            icon_name: func.icon_name || 'Zap',
            display_order: func.display_order,
            is_active: func.is_active !== false,
          });
          
        if (error) {
          throw error;
        }
      }
    }

    // 서비스의 updated_at 갱신
    await supabase
      .from('ai_services')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', serviceId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}