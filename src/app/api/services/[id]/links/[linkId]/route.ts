import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const { linkId } = await params;
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { label, url, icon, description, display_order } = body;

    const { data, error } = await supabase
      .from('service_links')
      .update({
        label,
        url,
        icon,
        description,
        display_order
      })
      .eq('id', linkId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating service link:', error);
    return NextResponse.json(
      { error: 'Failed to update service link' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  try {
    const { linkId } = await params;
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabase
      .from('service_links')
      .delete()
      .eq('id', linkId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service link:', error);
    return NextResponse.json(
      { error: 'Failed to delete service link' },
      { status: 500 }
    );
  }
}