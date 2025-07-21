import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceLinksManager } from '@/components/admin/service-links-manager';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';

interface ServiceLinksPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceLinksPage({ params }: ServiceLinksPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
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

  // 서비스 정보 가져오기
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
    .single();

  if (!service) {
    notFound();
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
                      {service.name} 링크 관리
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

          {/* Links Manager */}
          <div className="space-y-6">
            <ServiceLinksManager serviceId={service.id} />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              사용 방법
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>링크 추가</strong>: 서비스와 관련된 유용한 링크를 추가합니다 (문서, 튜토리얼, 커뮤니티 등).</li>
              <li>• <strong>아이콘 선택</strong>: 링크의 성격에 맞는 적절한 아이콘을 선택하세요.</li>
              <li>• <strong>표시 순서</strong>: 숫자가 작을수록 먼저 표시됩니다.</li>
              <li>• <strong>설명 추가</strong>: 사용자가 링크의 내용을 이해할 수 있도록 간단한 설명을 추가하세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}