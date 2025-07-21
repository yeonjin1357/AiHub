import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/services/[id]/updates - 서비스 업데이트 목록 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: updates, error } = await supabase
      .from('service_updates')
      .select('*')
      .eq('service_id', id)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching service updates:', error);
      return NextResponse.json(
        { error: '업데이트를 불러오는데 실패했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json(updates || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// POST /api/services/[id]/updates - 서비스 업데이트 추가 (관리자 전용)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userProfile?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, content, link_url, source, source_name, published_at } = body;

    // 필수 필드 검증
    if (!title || !source || !published_at) {
      return NextResponse.json(
        { error: '제목, 소스, 발행일은 필수 항목입니다' },
        { status: 400 }
      );
    }

    const { data: update, error } = await supabase
      .from('service_updates')
      .insert({
        service_id: id,
        title,
        description,
        content,
        link_url,
        source,
        source_name,
        published_at: new Date(published_at + '-01').toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating service update:', error);
      return NextResponse.json(
        { error: '업데이트 추가에 실패했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}