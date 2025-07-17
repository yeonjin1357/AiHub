'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Heart,
  Star,
  DollarSign,
  Check,
  Zap,
  Settings,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useState } from 'react';
import { AIService, Category } from '@/lib/api/services';
import { useAuth } from '@/contexts/auth-context';
import { useFavorites } from '@/contexts/favorites-context';
import { StarRating } from '@/components/ui/star-rating';

interface ServiceCardProps {
  service: AIService;
  category?: Category;
  viewMode?: 'grid' | 'list';
}

export function ServiceCard({
  service,
  category,
  viewMode = 'grid',
}: ServiceCardProps) {
  const { user, userProfile } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const isAdmin = userProfile?.role === 'ADMIN';

  const handleFavorite = async () => {
    if (!user) return;

    // 즉시 반응하도록 비동기로 처리 (await 제거)
    toggleFavorite(service.id).catch(() => {
      // Error handled in context
    });
  };

  const isServiceFavorited = isFavorited(service.id);

  const getLogoSrc = () => {
    if (service.logo_url && !imageError) {
      return service.logo_url;
    }
    // 기본 로고 - 서비스 이름의 첫 글자로 생성
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      service.name
    )}&background=6366f1&color=fff&size=128`;
  };

  const getLogoElement = () => {
    if (service.logo_url && !imageError) {
      return (
        <Image
          src={service.logo_url}
          alt={`${service.name} logo`}
          width={viewMode === 'list' ? 80 : 48}
          height={viewMode === 'list' ? 80 : 48}
          className='rounded-lg object-contain'
          onError={() => setImageError(true)}
        />
      );
    }

    // 폴백 아바타 (CSS로 생성)
    return (
      <div
        className={`${
          viewMode === 'list' ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-lg'
        } rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold`}
      >
        {service.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  const getPricingDisplay = () => {
    // pricing_type이 있으면 우선 사용
    if (service.pricing_type) {
      switch (service.pricing_type) {
        case 'free':
          return {
            label: '무료',
            color:
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          };
        case 'freemium':
          return {
            label: '프리미엄',
            color:
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          };
        case 'paid':
          return {
            label: '유료',
            color:
              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
          };
      }
    }

    // 기존 로직 (하위 호환성)
    if (service.pricing_type === 'freemium') {
      return {
        label: '프리미엄',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      };
    }
    return {
      label: '유료',
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
  };

  const pricing = getPricingDisplay();

  if (viewMode === 'list') {
    return (
      <Card className='flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-700'>
        <div className='md:w-48 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800'>
          {getLogoElement()}
        </div>

        <div className='flex-1 p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  {service.name}
                </h3>
                {service.is_featured && (
                  <Badge className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
                    <Star size={12} className='mr-1' />
                    추천
                  </Badge>
                )}
                <Badge className={pricing.color}>{pricing.label}</Badge>
              </div>

              {category && (
                <div className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                  {category.name}
                </div>
              )}

              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {service.description}
              </p>

              <div className='flex flex-wrap gap-2 mb-4'>
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  >
                    <Check size={10} className='mr-1' />
                    {feature}
                  </span>
                ))}
              </div>

              {/* 평점 및 리뷰 수 */}
              <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4'>
                <div className='flex items-center gap-1'>
                  <StarRating 
                    rating={service.average_rating || 0} 
                    size={14}
                  />
                  <span className='font-medium'>
                    {(service.average_rating || 0).toFixed(1)}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <MessageCircle size={12} />
                  <span>{service.review_count || 0}개 리뷰</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 ml-4'>
              {user && !isAdmin && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleFavorite}
                  className={
                    isServiceFavorited ? 'text-red-500' : 'text-gray-400'
                  }
                >
                  <Heart
                    size={16}
                    fill={isServiceFavorited ? 'currentColor' : 'none'}
                  />
                </Button>
              )}

              {isAdmin && (
                <Button
                  variant='ghost'
                  size='sm'
                  asChild
                >
                  <Link href={`/admin/services/${service.id}/edit` as any}>
                    <Settings size={16} />
                  </Link>
                </Button>
              )}

              <Button size='sm' asChild>
                <Link href={`/services/${service.slug}` as any}>
                  자세히 보기
                </Link>
              </Button>

              <Button variant='outline' size='sm' asChild>
                <a
                  href={service.website_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ExternalLink size={14} className='mr-2' />
                  방문하기
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className='group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden border-gray-200 dark:border-gray-700'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              {getLogoElement()}
              {service.is_featured && (
                <div className='absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1'>
                  <Star size={10} fill='currentColor' />
                </div>
              )}
            </div>

            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis'>
                {service.name}
              </h3>
              {category && (
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {category.name}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center gap-1'>
            {user && !isAdmin && (
              <Button
                variant='ghost'
                size='sm'
                onClick={handleFavorite}
                className={`${
                  isServiceFavorited ? 'text-red-500' : 'text-gray-400'
                } ${
                  isServiceFavorited
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                } transition-opacity`}
              >
                <Heart
                  size={16}
                  fill={isServiceFavorited ? 'currentColor' : 'none'}
                />
              </Button>
            )}

            {isAdmin && (
              <Button
                variant='ghost'
                size='sm'
                asChild
                className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600'
              >
                <Link href={`/admin/services/${service.id}/edit` as any}>
                  <Settings size={16} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-4'>
        <p className='text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2'>
          {service.description}
        </p>

        <div className='flex items-center gap-2 mb-3'>
          <Badge className={pricing.color}>
            <DollarSign size={10} className='mr-1' />
            {pricing.label}
          </Badge>
        </div>

        <div className='space-y-1 mb-3'>
          {service.features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className='flex items-center text-xs text-gray-500 dark:text-gray-400'
            >
              <Check size={10} className='mr-2 text-green-500' />
              {feature}
            </div>
          ))}
        </div>

        {/* 평점 및 리뷰 수 */}
        <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-1'>
            <StarRating 
              rating={service.average_rating || 0} 
              size={12}
            />
            <span className='font-medium'>
              {(service.average_rating || 0).toFixed(1)}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <MessageCircle size={10} />
            <span>{service.review_count || 0}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='pt-0 gap-2'>
        <Button className='flex-1' size='sm' asChild>
          <Link href={`/services/${service.slug}` as any}>자세히 보기</Link>
        </Button>

        <Button variant='outline' size='sm' asChild>
          <a
            href={service.website_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
