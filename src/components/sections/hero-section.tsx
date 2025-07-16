import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl text-center'>
        <div className='mx-auto max-w-5xl'>
          <Badge variant='secondary' className='mb-4'>
            <Sparkles className='mr-2 h-3 w-3' />
            새로운 AI 서비스를 발견하세요
          </Badge>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl'>
            AI 서비스의 모든 것을
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              {' '}
              한곳에서
            </span>
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl'>
            100+ AI 구독 서비스를 비교하고, 실제 사용자 리뷰를 확인하여 당신에게
            맞는 최고의 AI 도구를 찾아보세요.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button size='lg' className='h-12 px-8' asChild>
              <Link href='/services'>
                서비스 둘러보기
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='h-12 px-8'>
              커뮤니티 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
