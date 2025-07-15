import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
          지금 시작하세요
        </h2>
        <p className='mt-4 text-lg text-blue-100'>
          무료로 가입하고 100개 이상의 AI 서비스를 탐색해보세요
        </p>
        <div className='mt-8 flex items-center justify-center gap-x-6'>
          <Button size='lg' variant='secondary' className='h-12 px-8'>
            <Link href='/signup'>무료로 시작하기</Link>
          </Button>
          <Button size='lg' variant='outline' className='h-12 px-8'>
            더 알아보기
          </Button>
        </div>
      </div>
    </section>
  );
}
