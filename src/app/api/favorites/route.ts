import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/favorites - 사용자의 모든 찜 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: favorites, error } = await supabase
      .from('favorites')
      .select(`
        id,
        service_id,
        created_at,
        ai_services (
          id,
          name,
          slug,
          description,
          website_url,
          logo_url,
          features,
          is_free,
          pricing_type,
          is_featured,
          created_at,
          updated_at,
          category_id,
          pricing_info
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/favorites - 서비스를 찜 목록에 추가
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { service_id } = body;

    if (!service_id) {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 });
    }

    // 이미 찜한 서비스인지 확인
    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('service_id', service_id)
      .single();

    if (existingFavorite) {
      return NextResponse.json({ error: 'Service already favorited' }, { status: 409 });
    }

    // 새로운 찜 추가
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        service_id: service_id,
      })
      .select(`
        id,
        service_id,
        created_at,
        ai_services (
          id,
          name,
          slug,
          description,
          website_url,
          logo_url,
          features,
          is_free,
          pricing_type,
          is_featured,
          created_at,
          updated_at,
          category_id,
          pricing_info
        )
      `)
      .single();

    if (error) {
      console.error('Error adding favorite:', error);
      return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
    }

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/favorites - 찜 목록에서 서비스 제거
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const service_id = searchParams.get('service_id');

    if (!service_id) {
      return NextResponse.json({ error: 'service_id is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('service_id', service_id);

    if (error) {
      console.error('Error removing favorite:', error);
      return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}