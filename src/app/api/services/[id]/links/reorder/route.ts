import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, props: Params) {
  const params = await props.params;
  try {
    const supabase = await createClient();
    
    // 현재 사용자 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
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
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { links } = await request.json();

    // 각 링크의 display_order 업데이트
    const updatePromises = links.map(async (link: any, index: number) => {
      return supabase
        .from('service_links')
        .update({ display_order: index })
        .eq('id', link.id)
        .eq('service_id', params.id);
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering links:', error);
    return NextResponse.json(
      { error: 'Failed to reorder links' },
      { status: 500 }
    );
  }
}