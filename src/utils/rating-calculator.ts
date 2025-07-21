import { createClient } from '@/utils/supabase/server';

interface RatingStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [key: string]: number;
  };
}

export async function calculateRatingStats(serviceId: string): Promise<RatingStats> {
  const supabase = await createClient();
  
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('service_id', serviceId);

  if (error || !reviews || reviews.length === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
    };
  }

  const distribution: { [key: string]: number } = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };

  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
    distribution[review.rating.toString()]++;
  });

  return {
    average_rating: Math.round((sum / reviews.length) * 10) / 10,
    total_reviews: reviews.length,
    rating_distribution: distribution,
  };
}

export async function enrichServicesWithRatings<T extends { id: string }>(
  services: T[]
): Promise<(T & RatingStats)[]> {
  const ratingsPromises = services.map((service) =>
    calculateRatingStats(service.id)
  );

  const ratings = await Promise.all(ratingsPromises);

  return services.map((service, index) => ({
    ...service,
    ...ratings[index],
  }));
}