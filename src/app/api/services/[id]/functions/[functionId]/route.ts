import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// PATCH: 개별 기능 수정
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; functionId: string } }
) {
  try {
    const { id: serviceId, functionId } = params;
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

    const { data, error } = await supabase
      .from('service_functions')
      .update(body)
      .eq('id', functionId)
      .eq('service_id', serviceId)
      .select()
      .single();

    if (error) {
      console.error('Error updating service function:', error);
      return NextResponse.json(
        { error: '기능 수정에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 개별 기능 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; functionId: string } }
) {
  try {
    const { id: serviceId, functionId } = params;
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

    const { error } = await supabase
      .from('service_functions')
      .delete()
      .eq('id', functionId)
      .eq('service_id', serviceId);

    if (error) {
      console.error('Error deleting service function:', error);
      return NextResponse.json(
        { error: '기능 삭제에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}