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
        <Image
          src={service.logo_url}
          alt={`${service.name} logo`}
          width={80}
          height={80}
          className='rounded-xl object-contain'
          onError={() => setImageError(true)}
        />
      );
    }

    return (
      <div className='w-20 h-20 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl'>
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
            'bg-green-100 text-green-800',
        };
      case 'freemium':
        return {
          label: '프리미엄',
          color:
            'bg-blue-100 text-blue-800',
        };
      case 'paid':
        return {
          label: '유료',
          color:
            'bg-orange-100 text-orange-800',
        };
      default:
        return {
          label: '프리미엄',
          color:
            'bg-blue-100 text-blue-800',
        };
    }
  };

  const pricing = getPricingDisplay();

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            <div>
              <div className='flex items-center gap-4 mb-6'>
                {getLogoElement()}
                <div>
                  <div className='flex items-center gap-3 mb-2'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                      {service.name}
                    </h1>
                    {service.is_featured && (
                      <Badge className='bg-yellow-100 text-yellow-800'>
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
                      <Badge variant='outline'>{service.categories.name}</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* 평점 및 리뷰 수 표시 */}
              <div className='flex items-center gap-3 mb-6'>
                <div className='flex items-center gap-2'>
                  <StarRating 
                    rating={reviewStats.averageRating} 
                    size={20}
                  />
                  <span className='text-lg font-medium text-gray-900'>
                    {reviewStats.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className='flex items-center gap-1 text-gray-500'>
                  <MessageCircle size={16} />
                  <span>{reviewStats.reviewCount}개 리뷰</span>
                </div>
              </div>

              <p className='text-lg text-gray-600 mb-6 leading-relaxed'>
                {service.description}
              </p>

              <div className='flex items-center gap-4'>
                <Button size='lg' asChild>
                  <a
                    href={service.website_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2'
                  >
                    <ExternalLink size={18} />
                    서비스 시작하기
                  </a>
                </Button>

                {user && (
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={handleFavorite}
                    className={`inline-flex items-center gap-2 ${
                      isServiceFavorited ? 'text-red-500 border-red-200' : ''
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
            <TabsList className='grid w-full max-w-2xl grid-cols-4 h-12 bg-gray-100 p-1 rounded-xl'>
              <TabsTrigger
                value='overview'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all'
              >
                개요
              </TabsTrigger>
              <TabsTrigger
                value='updates'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all'
              >
                업데이트
              </TabsTrigger>
              <TabsTrigger
                value='features'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all'
              >
                기능
              </TabsTrigger>
              <TabsTrigger
                value='reviews'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all'
              >
                리뷰
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-8'>
            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 space-y-8'>
                <Card className='border-gray-100 shadow-sm bg-white'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-2 text-xl'>
                      <div className='p-2 bg-blue-100 rounded-lg'>
                        <Zap
                          size={20}
                          className='text-blue-600'
                        />
                      </div>
                      주요 기능
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-3'>
                      {service.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2'>
                          <Check
                            size={16}
                            className='text-green-500 flex-shrink-0'
                          />
                          <span className='text-sm'>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-8'>
                <Card className='border-gray-100 shadow-sm bg-white'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-lg'>관련 서비스</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {relatedServices.length > 0 ? (
                        relatedServices.map((relatedService, index) => (
                          <Link
                            key={index}
                            href={`/services/${relatedService.slug}`}
                            className='block'
                          >
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all cursor-pointer border border-transparent hover:border-blue-200 group'>
                              <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100'>
                                <img
                                  src={relatedService.logo_url}
                                  alt={`${relatedService.name} logo`}
                                  className='w-6 h-6 object-contain'
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling!.textContent =
                                      relatedService.name.charAt(0);
                                  }}
                                />
                                <span className='text-xs font-bold text-gray-600 hidden'>
                                  {relatedService.name.charAt(0)}
                                </span>
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                                  {relatedService.name}
                                </div>
                                <div className='text-xs text-gray-500 truncate'>
                                  {relatedService.description}
                                </div>
                              </div>
                              <ArrowRight
                                size={16}
                                className='text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0'
                              />
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className='text-center py-8 text-gray-500'>
                          <div className='text-sm'>
                            관련 서비스 정보가 준비 중입니다.
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
      </section>
    </div>
  );
}
