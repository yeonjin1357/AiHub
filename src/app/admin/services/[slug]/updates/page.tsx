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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/services">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      서비스 목록
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {service.logo_url ? (
                    <img
                      src={service.logo_url}
                      alt={`${service.name} logo`}
                      className="w-12 h-12 rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {service.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {service.name} 업데이트 관리
                    </h1>
                    <p className="text-gray-600">
                      {service.categories?.name} • {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/services/${service.slug}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  서비스 보기
                </Link>
              </Button>
            </div>
          </div>

          {/* Update Manager */}
          <div className="space-y-6">
            <Suspense fallback={<div className="flex justify-center py-8">로딩 중...</div>}>
              <UpdateManager serviceId={service.id} />
            </Suspense>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              사용 방법
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>업데이트 추가</strong>: 서비스의 새로운 기능이나 개선사항을 기록합니다.</li>
              <li>• <strong>날짜 형식</strong>: 업데이트가 실제로 배포된 날짜를 선택하세요.</li>
              <li>• <strong>변경 사항</strong>: 사용자가 이해하기 쉽게 구체적으로 작성해주세요.</li>
              <li>• <strong>카테고리</strong>: 업데이트의 성격에 맞는 카테고리를 선택하세요 (새 기능, 개선, 버그 수정 등).</li>
              <li>• <strong>정렬</strong>: 최신 업데이트가 상단에 표시됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}