import { Star, TrendingUp, Users, Zap } from 'lucide-react';

export function StatsSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='text-center'>
            <div className='flex justify-center mb-2'>
              <Zap className='h-8 w-8 text-blue-600' />
            </div>
            <div className='text-3xl font-bold text-gray-900'>
              1,000+
            </div>
            <div className='text-sm text-gray-600'>
              AI 서비스
            </div>
          </div>
          <div className='text-center'>
            <div className='flex justify-center mb-2'>
              <Users className='h-8 w-8 text-green-600' />
            </div>
            <div className='text-3xl font-bold text-gray-900'>
              50,000+
            </div>
            <div className='text-sm text-gray-600'>
              활성 사용자
            </div>
          </div>
          <div className='text-center'>
            <div className='flex justify-center mb-2'>
              <Star className='h-8 w-8 text-yellow-500' />
            </div>
            <div className='text-3xl font-bold text-gray-900'>
              25,000+
            </div>
            <div className='text-sm text-gray-600'>
              사용자 리뷰
            </div>
          </div>
          <div className='text-center'>
            <div className='flex justify-center mb-2'>
              <TrendingUp className='h-8 w-8 text-purple-600' />
            </div>
            <div className='text-3xl font-bold text-gray-900'>
              98%
            </div>
            <div className='text-sm text-gray-600'>
              만족도
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}