import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check admin authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // Check admin role
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

    // Find Canva service
    const { data: services, error: serviceError } = await supabase
      .from('ai_services')
      .select('id, name')
      .ilike('name', '%canva%')
      .limit(1);

    if (serviceError || !services || services.length === 0) {
      return NextResponse.json(
        { error: 'Canva 서비스를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    const canvaService = services[0];

    // Get current stats
    const { data: currentUpdates } = await supabase
      .from('service_updates')
      .select('id, source')
      .eq('service_id', canvaService.id);

    const stats = {
      total: currentUpdates?.length || 0,
      official: currentUpdates?.filter(u => u.source === 'official').length || 0,
      news: currentUpdates?.filter(u => u.source === 'news').length || 0
    };

    // Update all service_updates with source='official' to source='news'
    const { data: updatedData, error: updateError } = await supabase
      .from('service_updates')
      .update({ source: 'news' })
      .eq('service_id', canvaService.id)
      .eq('source', 'official')
      .select();

    if (updateError) {
      return NextResponse.json(
        { error: '업데이트 중 오류가 발생했습니다', details: updateError },
        { status: 500 }
      );
    }

    // Get updated stats
    const { data: updatedStats } = await supabase
      .from('service_updates')
      .select('id, source')
      .eq('service_id', canvaService.id);

    const newStats = {
      total: updatedStats?.length || 0,
      official: updatedStats?.filter(u => u.source === 'official').length || 0,
      news: updatedStats?.filter(u => u.source === 'news').length || 0
    };

    return NextResponse.json({
      success: true,
      service: {
        id: canvaService.id,
        name: canvaService.name
      },
      updateCount: updatedData?.length || 0,
      stats: {
        before: stats,
        after: newStats
      }
    });

  } catch (error) {
    console.error('Error in update-canva-source:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}