import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { isAdmin } from '@/utils/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; updateId: string }> }
) {
  try {
    const { id, updateId } = await params
    const supabase = await createClient()

    const adminCheck = await isAdmin(supabase)
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, content, link_url, source, source_name, published_at } = body

    const { data, error } = await supabase
      .from('service_updates')
      .update({
        title,
        description,
        content,
        link_url,
        source,
        source_name,
        published_at: published_at ? new Date(published_at).toISOString() : undefined
      })
      .eq('id', updateId)
      .eq('service_id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating service update:', error)
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }

    return NextResponse.json({ update: data })
  } catch (error) {
    console.error('Error in PUT /api/services/[id]/updates/[updateId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; updateId: string }> }
) {
  try {
    const { id, updateId } = await params
    const supabase = await createClient()

    const adminCheck = await isAdmin(supabase)
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('service_updates')
      .delete()
      .eq('id', updateId)
      .eq('service_id', id)

    if (error) {
      console.error('Error deleting service update:', error)
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/services/[id]/updates/[updateId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}