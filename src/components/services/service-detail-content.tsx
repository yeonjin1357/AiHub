'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Heart,
  Star,
  Check,
  DollarSign,
  Users,
  Globe,
  Shield,
  Zap,
  Award,
  ArrowRight,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Home,
  History,
  Sparkles,
} from 'lucide-react';
import { RelatedService } from '@/lib/related-services';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewForm } from './review-form';
import { ReviewList } from './review-list';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { useFavorites } from '@/contexts/favorites-context';
import { AIService } from '@/lib/api/services';
import { ServiceLinksDisplay } from '@/components/service-links-display';
import { ServiceFunctionsDisplay } from '@/components/service-functions-display';
import { ServiceUpdatesDisplay } from '@/components/service-updates-display';

interface ServiceDetailContentProps {
  service: AIService & {
    categories?: {
      id: string;
      name: string;
      slug: string;
      description?: string;
      icon?: string;
    };
  };
  relatedServices: RelatedService[];
}

export function ServiceDetailContent({
  service,
  relatedServices,
}: ServiceDetailContentProps) {
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);
  const [reviewStats, setReviewStats] = useState({
    averageRating: service.average_rating || 0,
    reviewCount: service.review_count || 0
  });

  const isServiceFavorited = isFavorited(service.id);

  const handleFavorite = async () => {
    if (!user) return;
    toggleFavorite(service.id).catch(() => {
      // Error already handled in context
    });
  };

  const updateReviewStats = async () => {
    try {
      const response = await fetch(`/api/services/${service.id}/stats`);
      if (response.ok) {
        const stats = await response.json();
        setReviewStats({
          averageRating: stats.average_rating || 0,
          reviewCount: stats.review_count || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch updated review stats:', error);
    }
  };

  const handleReviewSubmitted = async () => {
    setReviewRefreshTrigger((prev) => prev + 1);
    await updateReviewStats();
  };

  const handleReviewDeleted = async () => {
    setReviewRefreshTrigger((prev) => prev + 1);
    await updateReviewStats();
  };

  const getLogoElement = () => {
    if (service.logo_url && !imageError) {
      return (
        <div className='w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm p-3 shadow-inner border border-white/30 relative'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-xl'></div>
          <Image
            src={service.logo_url}
            alt={`${service.name} logo`}
            width={56}
            height={56}
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

    return (
      <div className='w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl'>
        {service.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  const getPricingDisplay = () => {
    switch (service.pricing_type) {
      case 'free':
        return {
          label: '무료',
          color:
            'bg-green-500/20 text-green-400 border-green-500/30',
        };
      case 'freemium':
        return {
          label: '프리미엄',
          color:
            'bg-blue-500/20 text-blue-400 border-blue-500/30',
        };
      case 'paid':
        return {
          label: '유료',
          color:
            'bg-orange-500/20 text-orange-400 border-orange-500/30',
        };
      default:
        return {
          label: '프리미엄',
          color:
            'bg-blue-500/20 text-blue-400 border-blue-500/30',
        };
    }
  };

  const pricing = getPricingDisplay();

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='glass border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          {/* 뒤로 가기 버튼 */}
          <div className='mb-6'>
            <Link
              href='/services'
              className='inline-flex items-center text-zinc-400 hover:text-white transition-colors'
            >
              <ArrowLeft size={20} className='mr-2' />
              <span>서비스 목록으로</span>
            </Link>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            <div>
              <div className='flex items-center gap-4 mb-6'>
                {getLogoElement()}
                <div>
                  <div className='flex items-center gap-3 mb-2'>
                    <h1 className='text-3xl font-bold text-white'>
                      {service.name}
                    </h1>
                    {service.is_featured && (
                      <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/30'>
                        <Star size={14} className='mr-1' />
                        추천
                      </Badge>
                    )}
                  </div>
                  <div className='flex items-center gap-3'>
                    <Badge className={pricing.color}> <DollarSign size={12} className='mr-1' />
                      {pricing.label}
                    </Badge>
                    {service.categories && (
                      <Badge variant='outline' className='border-white/10 text-zinc-400'>{service.categories.name}</Badge>
                    )}
                  </div>
                  {/* 최근 업데이트 정보 */}
                  {service.latest_update_at && (
                    <div className='flex items-center gap-2 mt-2 text-sm text-zinc-500'>
                      <Calendar size={14} />
                      <span>
                        최근 업데이트: {new Date(service.latest_update_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 평점 및 리뷰 수 표시 */}
              <div className='flex items-center gap-3 mb-6'>
                <div className='flex items-center gap-2'>
                  <StarRating 
                    rating={reviewStats.averageRating} 
                    size={20}
                  />
                  <span className='text-lg font-medium text-white'>
                    {reviewStats.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className='flex items-center gap-1 text-zinc-500'>
                  <MessageCircle size={16} />
                  <span>{reviewStats.reviewCount}개 리뷰</span>
                </div>
              </div>

              <p className='text-lg text-zinc-400 mb-6 leading-relaxed'>
                {service.description}
              </p>

              <div className='flex items-center gap-4'>
                <Button 
                  size='lg' 
                  onClick={() => {
                    // 클릭 시 새 탭으로 열기
                    window.open(service.website_url, '_blank', 'noopener,noreferrer');
                  }}
                  className='inline-flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
                >
                  <ExternalLink size={18} />
                  서비스 시작하기
                </Button>

                {user && (
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={handleFavorite}
                    className={`inline-flex items-center gap-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 ${
                      isServiceFavorited ? 'text-red-400 border-red-500/30' : 'text-white hover:text-white'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isServiceFavorited ? 'currentColor' : 'none'}
                    />
                    {isServiceFavorited ? '찜 해제' : '찜하기'}
                  </Button>
                )}
              </div>
            </div>

            {/* Service Links Card */}
            <div className='lg:pl-8'>
              <ServiceLinksDisplay 
                serviceId={service.id}
                serviceSlug={service.slug}
                serviceName={service.name}
                websiteUrl={service.website_url}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Tabs defaultValue='overview' className='space-y-10'>
          <div className='flex justify-center'>
            <TabsList className='grid w-full max-w-2xl grid-cols-4 h-12 glass border-0 p-1 rounded-xl'>
              <TabsTrigger
                value='overview'
                className='text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all text-zinc-400 inline-flex items-center gap-2'
              >
                <Home size={16} />
                개요
              </TabsTrigger>
              <TabsTrigger
                value='updates'
                className='text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all text-zinc-400 inline-flex items-center gap-2'
              >
                <History size={16} />
                업데이트
              </TabsTrigger>
              <TabsTrigger
                value='features'
                className='text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all text-zinc-400 inline-flex items-center gap-2'
              >
                <Sparkles size={16} />
                기능
              </TabsTrigger>
              <TabsTrigger
                value='reviews'
                className='text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all text-zinc-400 inline-flex items-center gap-2'
              >
                <MessageCircle size={16} />
                리뷰
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-8'>
            <div className='space-y-8'>
              <Card className='glass border-0 gradient-border-effect'>
                <CardHeader className='pb-4'>
                  <CardTitle className='flex items-center gap-2 text-xl text-white'>
                    <div className='p-2 bg-blue-600/20 rounded-lg'>
                      <Zap
                        size={20}
                        className='text-blue-400'
                      />
                    </div>
                    주요 기능
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid md:grid-cols-2 gap-3'>
                    {service.features.map((feature, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <Check
                          size={16}
                          className='text-green-400 flex-shrink-0'
                        />
                        <span className='text-sm text-zinc-300'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value='updates' className='space-y-8'>
            <ServiceUpdatesDisplay serviceId={service.id} />
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value='features' className='space-y-8'>
            <ServiceFunctionsDisplay serviceId={service.id} />
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value='reviews' className='space-y-8'>
            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <ReviewList
                  serviceId={service.id}
                  refreshTrigger={reviewRefreshTrigger}
                  onReviewDeleted={handleReviewDeleted}
                />
              </div>
              <div>
                <ReviewForm
                  serviceId={service.id}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* 관련 서비스 - 모든 탭에서 표시 */}
        {relatedServices.length > 0 && (
          <div className='mt-12'>
            <Card className='glass border-0 gradient-border-effect'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg text-white'>관련 서비스</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-3 gap-4'>
                  {relatedServices.map((relatedService, index) => (
                    <Link
                      key={index}
                      href={`/services/${relatedService.slug}`}
                      className='block'
                    >
                      <div className='flex flex-col p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20 group h-full'>
                        <div className='flex items-center gap-3 mb-3'>
                          <div className='w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm p-1.5 shadow-inner border border-white/30 flex items-center justify-center flex-shrink-0 relative'>
                            <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-lg'></div>
                            <img
                              src={relatedService.logo_url}
                              alt={`${relatedService.name} logo`}
                              className='relative z-10 w-full h-full object-contain rounded drop-shadow-md'
                              style={{
                                filter: 'brightness(1.2) contrast(1.3) saturate(1.2)',
                                mixBlendMode: 'normal',
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.textContent =
                                  relatedService.name.charAt(0);
                              }}
                            />
                            <span className='text-xs font-bold text-zinc-400 hidden'>
                              {relatedService.name.charAt(0)}
                            </span>
                          </div>
                          <div className='text-sm font-medium text-white group-hover:text-blue-400 transition-colors'>
                            {relatedService.name}
                          </div>
                        </div>
                        <p className='text-xs text-zinc-500 line-clamp-2 mb-3 flex-grow'>
                          {relatedService.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <Badge 
                            variant='outline' 
                            className={relatedService.pricing_type === 'freemium' 
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            }
                          >
                            {relatedService.pricing_type === 'freemium' ? '프리미엄' : '유료'}
                          </Badge>
                          <ArrowRight
                            size={14}
                            className='text-zinc-400 group-hover:text-blue-400 transition-colors'
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}
