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
  Clock,
  Award,
  ArrowRight,
} from 'lucide-react';
import { getFeatureData } from '@/lib/feature-icons';
import { RelatedService } from '@/lib/related-services';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { useFavorites } from '@/contexts/favorites-context';
import { AIService } from '@/lib/api/services';

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

export function ServiceDetailContent({ service, relatedServices }: ServiceDetailContentProps) {
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const isServiceFavorited = isFavorited(service.id);


  const handleFavorite = async () => {
    if (!user) return;
    toggleFavorite(service.id).catch((error) => {
      console.error('Error toggling favorite:', error);
    });
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
      default:
        return {
          label: '프리미엄',
          color:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
    }
  };

  const pricing = getPricingDisplay();

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            <div>
              <div className='flex items-center gap-4 mb-6'>
                {getLogoElement()}
                <div>
                  <div className='flex items-center gap-3 mb-2'>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                      {service.name}
                    </h1>
                    {service.is_featured && (
                      <Badge className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
                        <Star size={14} className='mr-1' />
                        추천
                      </Badge>
                    )}
                  </div>
                  <div className='flex items-center gap-3'>
                    <Badge className={pricing.color}>
                      <DollarSign size={12} className='mr-1' />
                      {pricing.label}
                    </Badge>
                    {service.categories && (
                      <Badge variant='outline'>{service.categories.name}</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
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

            {/* Stats Card */}
            <div className='lg:pl-8'>
              <Card className='border-gray-200 dark:border-gray-700 shadow-sm'>
                <CardHeader className='pb-4'>
                  <CardTitle className='text-center text-lg'>
                    서비스 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-2 gap-4 text-center'>
                    <div className='p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800'>
                      <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                        {service.pricing_type === 'free' ? '무료' : '프리미엄'}
                      </div>
                      <div className='text-sm text-blue-600/70 dark:text-blue-400/70 font-medium'>
                        요금제
                      </div>
                    </div>
                    <div className='p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800'>
                      <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                        {service.features.length}+
                      </div>
                      <div className='text-sm text-green-600/70 dark:text-green-400/70 font-medium'>
                        주요 기능
                      </div>
                    </div>
                  </div>

                  <div className='pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4'>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <Globe size={16} />웹 기반 서비스
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <Shield size={16} />
                      데이터 보안 제공
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <Users size={16} />
                      개인 및 팀 사용 가능
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Tabs defaultValue='overview' className='space-y-10'>
          <div className='flex justify-center'>
            <TabsList className='grid w-full max-w-md grid-cols-4 h-12 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl'>
              <TabsTrigger
                value='overview'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-lg transition-all'
              >
                개요
              </TabsTrigger>
              <TabsTrigger
                value='features'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-lg transition-all'
              >
                기능
              </TabsTrigger>
              <TabsTrigger
                value='pricing'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-lg transition-all'
              >
                요금제
              </TabsTrigger>
              <TabsTrigger
                value='reviews'
                className='text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-lg transition-all'
              >
                리뷰
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-8'>
            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 space-y-8'>
                <Card className='border-gray-200 dark:border-gray-700 shadow-sm'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-2 text-xl'>
                      <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                        <Zap
                          size={20}
                          className='text-blue-600 dark:text-blue-400'
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

                <Card className='border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-2 text-xl'>
                      <div className='p-2 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 rounded-lg border border-yellow-200 dark:border-yellow-700'>
                        <Award
                          size={20}
                          className='text-yellow-600 dark:text-yellow-400'
                        />
                      </div>
                      서비스 특징
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <div className='p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800'>
                      <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                        {service.name}은 최신 AI 기술을 활용하여 사용자에게
                        최고의 경험을 제공합니다. 직관적인 인터페이스와 강력한
                        기능으로 다양한 작업을 효율적으로 수행할 수 있습니다.
                      </p>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-blue-200/50 dark:border-blue-700/50'>
                          <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center'>
                            <Zap
                              size={16}
                              className='text-blue-600 dark:text-blue-400'
                            />
                          </div>
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            최신 AI 모델 기반
                          </span>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-blue-200/50 dark:border-blue-700/50'>
                          <div className='w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center'>
                            <Users
                              size={16}
                              className='text-green-600 dark:text-green-400'
                            />
                          </div>
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            사용자 친화적 UI
                          </span>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-blue-200/50 dark:border-blue-700/50'>
                          <div className='w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center'>
                            <Globe
                              size={16}
                              className='text-purple-600 dark:text-purple-400'
                            />
                          </div>
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            다양한 통합 옵션
                          </span>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-blue-200/50 dark:border-blue-700/50'>
                          <div className='w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center'>
                            <Clock
                              size={16}
                              className='text-orange-600 dark:text-orange-400'
                            />
                          </div>
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            지속적인 업데이트
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-8'>
                <Card className='border-gray-200 dark:border-gray-700 shadow-sm'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                      <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                        <Clock
                          size={18}
                          className='text-green-600 dark:text-green-400'
                        />
                      </div>
                      최근 업데이트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3 text-sm'>
                      <div className='pb-3 border-b border-gray-200 dark:border-gray-700'>
                        <div className='font-medium'>새로운 기능 추가</div>
                        <div className='text-gray-600 dark:text-gray-400'>
                          2025년 1월
                        </div>
                      </div>
                      <div className='pb-3 border-b border-gray-200 dark:border-gray-700'>
                        <div className='font-medium'>성능 개선</div>
                        <div className='text-gray-600 dark:text-gray-400'>
                          2024년 12월
                        </div>
                      </div>
                      <div>
                        <div className='font-medium'>UI/UX 개선</div>
                        <div className='text-gray-600 dark:text-gray-400'>
                          2024년 11월
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-gray-200 dark:border-gray-700 shadow-sm'>
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
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group'>
                              <div className='w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200 dark:border-gray-600'>
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
                                <span className='text-xs font-bold text-gray-600 dark:text-gray-400 hidden'>
                                  {relatedService.name.charAt(0)}
                                </span>
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                  {relatedService.name}
                                </div>
                                <div className='text-xs text-gray-500 dark:text-gray-400 truncate'>
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
                        <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
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

          {/* Features Tab */}
          <TabsContent value='features' className='space-y-8'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {service.features.map((feature, index) => {
                const featureData = getFeatureData(feature);
                const FeatureIcon = featureData.icon;
                return (
                  <Card
                    key={index}
                    className='border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-700 group-hover:scale-110 transition-transform'>
                          <FeatureIcon
                            size={20}
                            className='text-blue-600 dark:text-blue-400'
                          />
                        </div>
                        <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                          {feature}
                        </h3>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                        {featureData.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value='pricing' className='space-y-8'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.isArray(service.pricing_info) &&
                service.pricing_info.map((plan: any, index: number) => (
                  <Card
                    key={index}
                    className={`relative border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all ${
                      plan.is_popular
                        ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105'
                        : ''
                    }`}
                  >
                    {plan.is_popular && (
                      <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                        <Badge className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 shadow-lg'>
                          ⭐ 가장 인기
                        </Badge>
                      </div>
                    )}
                    <CardHeader className='text-center pb-4'>
                      <CardTitle className='text-xl text-gray-900 dark:text-white'>
                        {plan.name}
                      </CardTitle>
                      <div className='text-4xl font-bold text-gray-900 dark:text-white'>
                        ${plan.price}
                        <span className='text-lg font-normal text-gray-600 dark:text-gray-400'>
                          /{plan.period === 'monthly' ? '월' : '년'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className='pt-4'>
                      <ul className='space-y-3 mb-8'>
                        {plan.features?.map(
                          (feature: string, featureIndex: number) => (
                            <li
                              key={featureIndex}
                              className='flex items-start gap-3 text-sm'
                            >
                              <div className='mt-0.5'>
                                <Check size={16} className='text-green-500' />
                              </div>
                              <span className='leading-relaxed'>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                      <Button
                        className={`w-full py-3 font-medium ${
                          plan.is_popular ? 'bg-blue-600 hover:bg-blue-700' : ''
                        }`}
                        variant={plan.is_popular ? 'default' : 'outline'}
                        asChild
                      >
                        <a
                          href={service.website_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          시작하기
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value='reviews' className='space-y-8'>
            <Card className='border-gray-200 dark:border-gray-700 shadow-sm'>
              <CardHeader className='pb-6'>
                <CardTitle className='text-xl'>사용자 리뷰</CardTitle>
                <div className='flex items-center gap-3'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className='text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                    4.8
                  </span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    (1,234 리뷰)
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600'>
                  <div className='mb-4'>
                    <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <Star
                        size={32}
                        className='text-blue-600 dark:text-blue-400'
                      />
                    </div>
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                    리뷰 기능 준비 중
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
                    곧 사용자 리뷰를 확인하고 직접 리뷰를 작성하실 수 있습니다.
                    더 나은 서비스 선택에 도움이 되도록 준비하고 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
