import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Link as LinkIcon, Zap, FileText } from 'lucide-react';

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  // 관리자 권한 확인
  const userProfile = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userProfile?.data?.role !== 'ADMIN') {
    redirect('/');
  }

  // 서비스 목록 가져오기
  const { data: services } = await supabase
    .from('ai_services')
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `
    )
    .order('name');

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#0a0a0b]'>
        {/* Background gradient effects */}
        <div className='fixed inset-0 pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full animate-blob' />
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full animate-blob animation-delay-2000' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-white'>서비스 관리</h1>
                <p className='mt-2 text-zinc-400'>
                  AI 서비스 정보 및 특징 관리
                </p>
              </div>
              <Link
                href='/admin'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all'
              >
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                대시보드로 돌아가기
              </Link>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services?.map((service) => (
              <Card
                key={service.id}
                className='glass border-0 gradient-border-effect hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3'>
                    {service.logo_url ? (
                      <div className='w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm p-1.5 shadow-inner border border-white/30 relative'>
                        <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-lg'></div>
                        <img
                          src={service.logo_url}
                          alt={`${service.name} logo`}
                          className='relative z-10 w-full h-full object-contain rounded drop-shadow-lg'
                          style={{
                            filter:
                              'brightness(1.2) contrast(1.3) saturate(1.2)',
                            mixBlendMode: 'normal',
                          }}
                        />
                      </div>
                    ) : (
                      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold'>
                        {service.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <CardTitle className='text-lg text-white'>
                        {service.name}
                      </CardTitle>
                      <p className='text-sm text-zinc-500'>
                        {service.categories?.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col justify-between'>
                  <p className='text-sm text-zinc-400 mb-4 line-clamp-2'>
                    {service.description}
                  </p>
                  <div className='space-y-2'>
                    <div className='grid grid-cols-2 gap-2'>
                      <Button
                        asChild
                        size='sm'
                        variant='outline'
                        className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      >
                        <Link
                          href={`/admin/services/${service.slug}/functions`}
                        >
                          <Zap className='h-4 w-4 mr-1' />
                          기능
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size='sm'
                        variant='outline'
                        className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      >
                        <Link href={`/admin/services/${service.slug}/links`}>
                          <LinkIcon className='h-4 w-4 mr-1' />
                          링크
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size='sm'
                        variant='outline'
                        className='border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      >
                        <Link href={`/admin/services/${service.slug}/updates`}>
                          <FileText className='h-4 w-4 mr-1' />
                          업데이트
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size='sm'
                        className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0'
                      >
                        <Link href={`/services/${service.slug}`}>
                          <ExternalLink className='h-4 w-4 mr-1' />
                          서비스 보기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!services?.length && (
            <div className='text-center py-12'>
              <p className='text-zinc-500'>등록된 서비스가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
