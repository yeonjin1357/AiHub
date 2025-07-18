import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search, Star, TrendingUp, Users, Zap, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            AIMOA가 특별한 이유
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            최고의 AI 서비스를 찾기 위한 모든 도구를 제공합니다
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  <Search className='h-6 w-6 text-blue-600' />
                </div>
                <CardTitle className='text-xl'>스마트 검색</CardTitle>
              </div>
              <CardDescription>
                AI 기반 검색으로 당신이 원하는 정확한 서비스를 빠르게
                찾아보세요. 기능, 가격, 용도별로 필터링할 수 있습니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-green-100 rounded-lg'>
                  <Star className='h-6 w-6 text-green-600' />
                </div>
                <CardTitle className='text-xl'>실제 사용자 리뷰</CardTitle>
              </div>
              <CardDescription>
                검증된 사용자들의 솔직한 리뷰와 평점을 확인하여 현명한 선택을
                하세요. 상세한 장단점 분석도 제공합니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-purple-100 rounded-lg'>
                  <TrendingUp className='h-6 w-6 text-purple-600' />
                </div>
                <CardTitle className='text-xl'>가격 비교</CardTitle>
              </div>
              <CardDescription>
                여러 AI 서비스의 요금제를 한눈에 비교하고, 가성비 최고의 옵션을
                찾아보세요. 할인 정보도 놓치지 마세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-yellow-100 rounded-lg'>
                  <Users className='h-6 w-6 text-yellow-600' />
                </div>
                <CardTitle className='text-xl'>커뮤니티</CardTitle>
              </div>
              <CardDescription>
                AI 도구를 사용하는 전문가들과 소통하고, 팁과 노하우를 공유하며
                함께 성장하세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-red-100 rounded-lg'>
                  <Sparkles className='h-6 w-6 text-red-600' />
                </div>
                <CardTitle className='text-xl'>신규 서비스 알림</CardTitle>
              </div>
              <CardDescription>
                새로운 AI 서비스가 출시되면 가장 먼저 알려드립니다.
                얼리어답터로서 최신 기술을 경험해보세요.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='group transition-all duration-300 border-0 bg-white/70 backdrop-blur hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-indigo-100 rounded-lg'>
                  <Zap className='h-6 w-6 text-indigo-600' />
                </div>
                <CardTitle className='text-xl'>개인 맞춤 추천</CardTitle>
              </div>
              <CardDescription>
                당신의 업무와 관심사에 맞는 AI 서비스를 개인화된 알고리즘으로
                추천해드립니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
