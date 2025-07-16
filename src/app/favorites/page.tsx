'use client';

import { useAuth } from '@/contexts/auth-context';
import { useFavorites } from '@/contexts/favorites-context';
import { ServiceCard } from '@/components/services/service-card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading } = useFavorites();

  // 인증이 로딩 중이거나 아직 사용자 정보가 없을 때
  if (authLoading) {
    return (
      <>
        <Header />
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
        </div>
      </>
    );
  }

  // 로딩 완료 후 사용자가 없으면 로그인 필요
  if (!user) {
    return (
      <>
        <Header />
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <Heart size={64} className='mx-auto text-gray-300 mb-4' />
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              로그인이 필요합니다
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              찜한 AI 서비스를 확인하려면 로그인하세요.
            </p>
            <Button asChild>
              <Link href='/signin'>로그인하기</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3'>
            <Heart size={32} className='text-red-500' fill='currentColor' />
            찜한 AI 서비스
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            관심있는 AI 서비스들을 모아보세요.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className='text-center py-16'>
            <Heart size={64} className='mx-auto text-gray-300 mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              아직 찜한 서비스가 없습니다
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              다양한 AI 서비스를 둘러보고 관심있는 서비스를 찜해보세요.
            </p>
            <Button asChild>
              <Link href='/services' className='inline-flex items-center gap-2'>
                <Plus size={16} />
                AI 서비스 둘러보기
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className='mb-6'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                총 {favorites.length}개의 서비스를 찜했습니다.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {favorites.map((favorite) => {
                if (!favorite.ai_services) {
                  console.warn('Favorite missing ai_services data:', favorite);
                  return null;
                }

                const service = favorite.ai_services;

                return (
                  <ServiceCard
                    key={favorite.id}
                    service={service}
                    viewMode='grid'
                  />
                );
              })}
            </div>

            <div className='mt-12 text-center'>
              <Button variant='outline' asChild>
                <Link href='/services'>더 많은 AI 서비스 찾기</Link>
              </Button>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}
