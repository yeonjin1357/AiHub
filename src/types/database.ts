export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  role: 'USER' | 'ADMIN'
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  created_at: string
}

export interface AIService {
  id: string
  name: string
  slug: string
  description: string
  website_url: string
  logo_url?: string
  category_id: string
  category?: Category
  pricing_info: PricingPlan[]
  features: string[]
  is_free: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  name: string
  price: number
  currency: string
  period: 'monthly' | 'yearly' | 'one-time'
  features: string[]
  is_popular?: boolean
}

export interface Review {
  id: string
  user_id: string
  service_id: string
  rating: number
  comment: string
  helpful_count: number
  is_verified: boolean
  created_at: string
  user?: User
  service?: AIService
}

export interface Favorite {
  id: string
  user_id: string
  service_id: string
  created_at: string
}