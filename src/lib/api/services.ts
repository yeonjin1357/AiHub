import { createClient } from '@/utils/supabase/client';
import { fetchWithCache } from '@/utils/api-cache';

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
  average_rating?: number;
  review_count?: number;
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
  return fetchWithCache('services:all', async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('ai_services')
      .select(`
        *,
        reviews:reviews(rating)
      `)
      .order('is_featured', { ascending: false })
      .order('name', { ascending: true });

    if (error) {
      throw new Error('Failed to fetch services');
    }

    // 평점과 리뷰 수 계산
    const servicesWithRatings = (data || []).map(service => {
      const reviews = service.reviews || [];
      const reviewCount = reviews.length;
      const averageRating = reviewCount > 0 
        ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
        : 0;

      return {
        ...service,
        reviews: undefined, // reviews 필드 제거
        review_count: reviewCount,
        average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
      };
    });

    return servicesWithRatings;
  }, { ttl: 60 }); // 1분 캐시
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithCache('categories:all', async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error('Failed to fetch categories');
    }

    return data || [];
  }, { ttl: 300 }); // 5분 캐시
}

export async function getServiceBySlug(
  slug: string
): Promise<AIService | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select(`
      *,
      reviews:reviews(rating)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Service not found
    }
    throw new Error('Failed to fetch service');
  }

  // 평점과 리뷰 수 계산
  const reviews = data.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
    : 0;

  return {
    ...data,
    reviews: undefined, // reviews 필드 제거
    review_count: reviewCount,
    average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
  };
}

export async function getServicesByCategory(
  categoryId: string
): Promise<AIService[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select(`
      *,
      reviews:reviews(rating)
    `)
    .eq('category_id', categoryId)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to fetch services');
  }

  // 평점과 리뷰 수 계산
  const servicesWithRatings = (data || []).map(service => {
    const reviews = service.reviews || [];
    const reviewCount = reviews.length;
    const averageRating = reviewCount > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
      : 0;

    return {
      ...service,
      reviews: undefined, // reviews 필드 제거
      review_count: reviewCount,
      average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
    };
  });

  return servicesWithRatings;
}

export async function searchServices(query: string): Promise<AIService[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_services')
    .select(`
      *,
      reviews:reviews(rating)
    `)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to search services');
  }

  // 평점과 리뷰 수 계산
  const servicesWithRatings = (data || []).map(service => {
    const reviews = service.reviews || [];
    const reviewCount = reviews.length;
    const averageRating = reviewCount > 0 
      ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewCount
      : 0;

    return {
      ...service,
      reviews: undefined, // reviews 필드 제거
      review_count: reviewCount,
      average_rating: Math.round(averageRating * 10) / 10 // 소수점 첫째자리까지
    };
  });

  return servicesWithRatings;
}
