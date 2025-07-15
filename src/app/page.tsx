import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import {
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'>
      <Header />

      {/* Hero Section */}
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
              1000+ AI 구독 서비스를 비교하고, 실제 사용자 리뷰를 확인하여
              당신에게 맞는 최고의 AI 도구를 찾아보세요.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button size='lg' className='h-12 px-8'>
                서비스 둘러보기
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button variant='outline' size='lg' className='h-12 px-8'>
                카테고리 보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='text-center'>
              <div className='flex justify-center mb-2'>
                <Zap className='h-8 w-8 text-blue-600' />
              </div>
              <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                1,000+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                AI 서비스
              </div>
            </div>
            <div className='text-center'>
              <div className='flex justify-center mb-2'>
                <Users className='h-8 w-8 text-green-600' />
              </div>
              <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                50,000+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                활성 사용자
              </div>
            </div>
            <div className='text-center'>
              <div className='flex justify-center mb-2'>
                <Star className='h-8 w-8 text-yellow-500' />
              </div>
              <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                25,000+
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                사용자 리뷰
              </div>
            </div>
            <div className='text-center'>
              <div className='flex justify-center mb-2'>
                <TrendingUp className='h-8 w-8 text-purple-600' />
              </div>
              <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                98%
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                만족도
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              왜 AI Hub Directory를 선택해야 할까요?
            </h2>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
              최고의 AI 서비스를 찾기 위한 모든 도구를 제공합니다
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
                    <Search className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <CardTitle className='text-xl'>스마트 검색</CardTitle>
                </div>
                <CardDescription>
                  AI 기반 검색으로 당신이 원하는 정확한 서비스를 빠르게
                  찾아보세요. 기능, 가격, 용도별로 필터링할 수 있습니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
                    <Star className='h-6 w-6 text-green-600 dark:text-green-400' />
                  </div>
                  <CardTitle className='text-xl'>실제 사용자 리뷰</CardTitle>
                </div>
                <CardDescription>
                  검증된 사용자들의 솔직한 리뷰와 평점을 확인하여 현명한 선택을
                  하세요. 상세한 장단점 분석도 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
                    <TrendingUp className='h-6 w-6 text-purple-600 dark:text-purple-400' />
                  </div>
                  <CardTitle className='text-xl'>가격 비교</CardTitle>
                </div>
                <CardDescription>
                  여러 AI 서비스의 요금제를 한눈에 비교하고, 가성비 최고의
                  옵션을 찾아보세요. 할인 정보도 놓치지 마세요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg'>
                    <Users className='h-6 w-6 text-yellow-600 dark:text-yellow-400' />
                  </div>
                  <CardTitle className='text-xl'>커뮤니티</CardTitle>
                </div>
                <CardDescription>
                  AI 도구를 사용하는 전문가들과 소통하고, 팁과 노하우를 공유하며
                  함께 성장하세요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
                    <Sparkles className='h-6 w-6 text-red-600 dark:text-red-400' />
                  </div>
                  <CardTitle className='text-xl'>신규 서비스 알림</CardTitle>
                </div>
                <CardDescription>
                  새로운 AI 서비스가 출시되면 가장 먼저 알려드립니다.
                  얼리어답터로서 최신 기술을 경험해보세요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='group transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg'>
                    <Zap className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
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

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            지금 시작하세요
          </h2>
          <p className='mt-4 text-lg text-blue-100'>
            무료로 가입하고 1000개 이상의 AI 서비스를 탐색해보세요
          </p>
          <div className='mt-8 flex items-center justify-center gap-x-6'>
            <Button variant='normal' size='lg' className='h-12 px-8'>
              무료로 시작하기
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg' className='h-12 px-8'>
              더 알아보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
