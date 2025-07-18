import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { ServiceFunctionsManager } from '@/components/admin/service-functions-manager';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface AdminServiceFunctionsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminServiceFunctionsPage({ params }: AdminServiceFunctionsPageProps) {
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
                      {service.name} 기능 관리
                    </h1>
                    <p className="text-gray-600">
                      {service.categories?.name} • {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/services/${service.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  서비스 보기
                </Link>
              </Button>
            </div>
          </div>

          {/* Functions Manager */}
          <div className="space-y-6">
            <ServiceFunctionsManager serviceId={service.id} />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              사용 방법
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>편집 모드</strong>: 기능을 추가, 수정, 삭제하거나 순서를 변경할 수 있습니다.</li>
              <li>• <strong>드래그 앤 드롭</strong>: 기능 순서를 직관적으로 변경할 수 있습니다.</li>
              <li>• <strong>아이콘</strong>: Lucide 아이콘 라이브러리의 아이콘 이름을 입력하세요 (예: Zap, Star, Brain).</li>
              <li>• <strong>설명</strong>: 각 기능에 대한 상세한 설명을 추가하여 사용자 이해를 돕습니다.</li>
              <li>• <strong>전체 저장</strong>: 모든 변경사항은 전체 저장 버튼을 클릭해야 적용됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}