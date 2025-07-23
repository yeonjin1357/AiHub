import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl text-center'>
        <div className='mx-auto max-w-5xl'>
          <div className='mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm leading-6 text-zinc-400'>
            <Sparkles className='mr-2 h-3 w-3 text-blue-500' />
            100+ AI 서비스 등록 완료
            <span className='mx-2'>·</span>
            매일 업데이트
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl'>
            AI의 모든 것을
            <br />
            <span className='relative'>
              <span className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient'>
                한곳에서 발견하세요
              </span>
              <div className='absolute -inset-x-20 -inset-y-10 z-[-1] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl'></div>
            </span>
          </h1>

          <p className='mt-6 text-lg leading-8 text-zinc-400 sm:text-xl max-w-3xl mx-auto'>
            100개 이상의 AI 도구를 비교하고, 실제 사용자 리뷰를 확인하며, 당신의
            비즈니스에 완벽한 AI 솔루션을 찾아보세요.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button
              size='lg'
              className='h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 btn-glow group'
              asChild
            >
              <Link href='/services'>
                <Zap className='mr-2 h-4 w-4' />
                AI 서비스 둘러보기
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='h-12 px-8 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
              asChild
            >
              <Link href='/contact'>
                <Globe className='mr-2 h-4 w-4' />
                서비스 등록 요청
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className='mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4'>
            <div className='glass-light rounded-lg p-4'>
              <div className='text-2xl font-bold gradient-text'>100+</div>
              <div className='text-sm text-zinc-500'>AI 서비스</div>
            </div>
            <div className='glass-light rounded-lg p-4'>
              <div className='text-2xl font-bold gradient-text'>15+</div>
              <div className='text-sm text-zinc-500'>카테고리</div>
            </div>
            <div className='glass-light rounded-lg p-4'>
              <div className='text-2xl font-bold gradient-text'>500+</div>
              <div className='text-sm text-zinc-500'>사용자 리뷰</div>
            </div>
            <div className='glass-light rounded-lg p-4'>
              <div className='text-2xl font-bold gradient-text'>매일</div>
              <div className='text-sm text-zinc-500'>업데이트</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
