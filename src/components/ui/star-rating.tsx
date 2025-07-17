'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 12,
  className = '',
  showValue = false,
}: StarRatingProps) {
  const normalizedRating = Math.min(Math.max(rating, 0), maxRating);

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const difference = normalizedRating - i + 1;
      
      if (difference >= 1) {
        // 완전히 채워진 별
        stars.push(
          <Star
            key={i}
            size={size}
            className="text-yellow-500 fill-yellow-500"
          />
        );
      } else if (difference > 0) {
        // 부분적으로 채워진 별 (반별)
        stars.push(
          <div key={i} className="relative inline-block">
            <Star
              size={size}
              className="text-gray-300 fill-gray-300"
            />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${difference * 100}%` }}
            >
              <Star
                size={size}
                className="text-yellow-500 fill-yellow-500"
              />
            </div>
          </div>
        );
      } else {
        // 빈 별
        stars.push(
          <Star
            key={i}
            size={size}
            className="text-gray-300 fill-gray-300"
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {renderStars()}
      </div>
      {showValue && (
        <span className="text-sm font-medium ml-1">
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}