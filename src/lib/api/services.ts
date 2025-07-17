import { createClient } from '@/utils/supabase/client';

export type PricingType = 'free' | 'freemium' | 'paid';

export interface AIService {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_url: string | null;
  category_id: string;
  features: string[];
  is_free: boolean;
  pricing_type: PricingType;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at: string;
}

export async function getServices(): Promise<AIService[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to fetch services');
  }

  return data || [];
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to fetch categories');
  }

  return data || [];
}

export async function getServiceBySlug(
  slug: string
): Promise<AIService | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Service not found
    }
    throw new Error('Failed to fetch service');
  }

  return data;
}

export async function getServicesByCategory(
  categoryId: string
): Promise<AIService[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select('*')
    .eq('category_id', categoryId)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to fetch services');
  }

  return data || [];
}

export async function searchServices(query: string): Promise<AIService[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to search services');
  }

  return data || [];
}
