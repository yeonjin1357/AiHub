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
        <div
          className={`relative ${
            viewMode === 'list' ? 'w-20 h-20' : 'w-12 h-12'
          } rounded-lg bg-white/10 backdrop-blur-sm p-2 shadow-inner border border-white/20`}
        >
          <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-lg'></div>
          <Image
            src={service.logo_url}
            alt={`${service.name} logo`}
            width={viewMode === 'list' ? 64 : 32}
            height={viewMode === 'list' ? 64 : 32}
            className='relative z-10 w-full h-full object-contain rounded drop-shadow-lg'
            style={{
              filter: 'brightness(1.2) contrast(1.3) saturate(1.2)',
              mixBlendMode: 'normal',
            }}
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    // 폴백 아바타 (CSS로 생성)
    return (
      <div
        className={`${
          viewMode === 'list' ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-lg'
        } rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold`}
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
            color: 'bg-green-500/20 text-green-400 border-green-500/30',
          };
        case 'freemium':
          return {
            label: '프리미엄',
            color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          };
        case 'paid':
          return {
            label: '유료',
            color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          };
      }
    }

    // 기존 로직 (하위 호환성)
    if (service.pricing_type === 'freemium') {
      return {
        label: '프리미엄',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      };
    }
    return {
      label: '유료',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
  };

  const pricing = getPricingDisplay();

  if (viewMode === 'list') {
    return (
      <Card className='flex flex-col md:flex-row overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 glass border-0 group gradient-border-effect'>
        <div className='md:w-48 p-6 flex items-center justify-center'>
          {getLogoElement()}
        </div>

        <div className='flex-1 p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors'>
                  {service.name}
                </h3>
                {service.is_featured && (
                  <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/30'>
                    <Star size={12} className='mr-1' />
                    추천
                  </Badge>
                )}
                <Badge className={pricing.color}>{pricing.label}</Badge>
              </div>

              {category && (
                <div className='text-sm text-zinc-500 mb-2'>
                  {category.name}
                </div>
              )}

              <p className='text-zinc-400 mb-4'>{service.description}</p>

              <div className='flex flex-wrap gap-2 mb-4'>
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-zinc-400 border border-white/10'
                  >
                    <Check size={10} className='mr-1' />
                    {feature}
                  </span>
                ))}
              </div>

              {/* 평점 및 리뷰 수 */}
              <div className='flex items-center gap-3 text-sm text-zinc-500 mb-4'>
                <div className='flex items-center gap-1'>
                  <StarRating rating={service.average_rating || 0} size={14} />
                  <span className='font-medium text-zinc-400'>
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
                    isServiceFavorited
                      ? 'text-red-500 hover:text-red-400'
                      : 'text-zinc-400 hover:text-white'
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
                  className='text-zinc-400 hover:text-white hover:bg-white/10'
                >
                  <Link href={`/admin/services/${service.slug}/updates`}>
                    <Settings size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2 mt-4'>
            <Button
              size='sm'
              variant='default'
              asChild
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
            >
              <Link href={`/services/${service.slug}`}>자세히 보기</Link>
            </Button>
            <Button
              size='sm'
              variant='outline'
              asChild
              className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
            >
              <a
                href={service.website_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <ExternalLink size={14} className='mr-1' />
                공식 사이트
              </a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className='overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 glass border-0 group hover:-translate-y-1 gradient-border-effect'>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            {getLogoElement()}
            <div>
              <h3 className='font-semibold text-lg leading-tight text-white group-hover:text-blue-400 transition-colors'>
                {service.name}
              </h3>
              {category && (
                <p className='text-xs text-zinc-500'>{category.name}</p>
              )}
            </div>
          </div>
          <div className='flex items-center gap-1'>
            {service.is_featured && (
              <Star size={14} className='text-yellow-500' fill='currentColor' />
            )}
            {user && !isAdmin && (
              <Button
                variant='ghost'
                size='sm'
                onClick={handleFavorite}
                className={`p-1 h-auto ${
                  isServiceFavorited
                    ? 'text-red-500 hover:text-red-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
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
                className='p-1 h-auto text-zinc-400 hover:text-white hover:bg-white/10'
              >
                <Link href={`/admin/services/${service.slug}/updates`}>
                  <Settings size={16} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-4'>
        <p className='text-sm text-zinc-400 line-clamp-2 mb-3'>
          {service.description}
        </p>

        <div className='flex items-center justify-between mb-3'>
          <Badge className={pricing.color}>{pricing.label}</Badge>

          {/* 평점 */}
          <div className='flex items-center gap-1 text-xs'>
            <StarRating rating={service.average_rating || 0} size={12} />
            <span className='text-zinc-500'>
              {(service.average_rating || 0).toFixed(1)}
            </span>
          </div>
        </div>

        <div className='space-y-1'>
          {service.features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className='text-xs text-zinc-500 flex items-center gap-1'
            >
              <Check size={10} className='text-green-400' />
              <span className='truncate'>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className='pt-4 border-t border-white/5'>
        <div className='w-full flex gap-2'>
          <Button
            size='sm'
            variant='default'
            asChild
            className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
          >
            <Link href={`/services/${service.slug}`}>자세히 보기</Link>
          </Button>
          <Button
            size='icon'
            variant='outline'
            asChild
            className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
          >
            <a
              href={service.website_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink size={16} />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
