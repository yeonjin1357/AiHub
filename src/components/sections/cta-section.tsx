import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl'></div>

      <div className='relative mx-auto max-w-4xl text-center'>
        <div className='inline-flex items-center justify-center p-2 mb-8'>
          <Sparkles className='h-12 w-12 text-blue-500 glow-text' />
        </div>

        <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
          AI의 미래를 함께 만들어가요
        </h2>
        <p className='mt-4 text-lg text-zinc-400'>
          무료로 가입하고 100개 이상의 AI 서비스를 탐색해보세요
        </p>

        <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            size='lg'
            className='h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 btn-glow group'
            asChild
          >
            <Link href='/signup'>
              무료로 시작하기
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='h-12 px-8 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
            asChild
          >
            <Link href='/services'>더 알아보기</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className='mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-zinc-500'>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-green-500'></div>
            <span>실시간 업데이트</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-blue-500'></div>
            <span>5,000+ 활성 사용자</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-purple-500'></div>
            <span>100% 무료</span>
          </div>
        </div>
      </div>
    </section>
  );
}
