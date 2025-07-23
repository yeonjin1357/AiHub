import { Suspense } from 'react'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UpdateManager from '@/components/admin/updates/UpdateManager'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface ServiceUpdatesPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServiceUpdatesPage({ params }: ServiceUpdatesPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/signin')
  }

  // 관리자 권한 확인
  const userProfile = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (userProfile?.data?.role !== 'ADMIN') {
    redirect('/')
  }

  // slug로 서비스 조회
  const { data: service } = await supabase
    .from('ai_services')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .single()

  if (!service) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0a0a0b]">
        {/* Background gradient effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full animate-blob animation-delay-2000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/10">
                    <Link href="/admin/services">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      서비스 목록
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {service.logo_url ? (
                    <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm p-2 shadow-inner border border-white/30 relative'>
                      <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-xl'></div>
                      <img
                        src={service.logo_url}
                        alt={`${service.name} logo`}
                        className='relative z-10 w-full h-full object-contain rounded drop-shadow-lg'
                        style={{
                          filter: 'brightness(1.2) contrast(1.3) saturate(1.2)',
                          mixBlendMode: 'normal',
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {service.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {service.name} 업데이트 관리
                    </h1>
                    <p className="text-zinc-400">
                      {service.categories?.name} • {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                <Link href={`/services/${service.slug}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  서비스 보기
                </Link>
              </Button>
            </div>
          </div>

          {/* Update Manager */}
          <div className="space-y-6">
            <Suspense fallback={<div className="flex justify-center py-8 text-zinc-400">로딩 중...</div>}>
              <UpdateManager serviceId={service.id} />
            </Suspense>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 glass border-0 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              사용 방법
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• <strong className="text-blue-400">업데이트 추가</strong>: 서비스의 새로운 기능이나 개선사항을 기록합니다.</li>
              <li>• <strong className="text-blue-400">날짜 형식</strong>: 업데이트가 실제로 배포된 날짜를 선택하세요.</li>
              <li>• <strong className="text-blue-400">변경 사항</strong>: 사용자가 이해하기 쉽게 구체적으로 작성해주세요.</li>
              <li>• <strong className="text-blue-400">카테고리</strong>: 업데이트의 성격에 맞는 카테고리를 선택하세요 (새 기능, 개선, 버그 수정 등).</li>
              <li>• <strong className="text-blue-400">정렬</strong>: 최신 업데이트가 상단에 표시됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}