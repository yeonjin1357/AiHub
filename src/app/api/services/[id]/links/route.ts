import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: links, error } = await supabase
      .from('service_links')
      .select('*')
      .eq('service_id', id)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json([], { status: 200 }); // Return empty array if table doesn't exist
      }
      
      throw error;
    }

    return NextResponse.json(links || []);
  } catch (error) {
    console.error('Error fetching service links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service links' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
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
      .insert({
        service_id: serviceId,
        label,
        url,
        icon,
        description,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) {
      console.error('Database error on insert:', error);
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Service links table does not exist. Please run the database migration.' },
          { status: 503 }
        );
      }
      
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating service link:', error);
    return NextResponse.json(
      { error: 'Failed to create service link' },
      { status: 500 }
    );
  }
}