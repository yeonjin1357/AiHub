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
                    <div className='w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm p-2 shadow-inner border border-white/30 relative'>
                      <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/20 rounded-lg'></div>
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
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {service.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {service.name} 링크 관리
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

          {/* Links Manager */}
          <div className="space-y-6">
            <ServiceLinksManager serviceId={service.id} />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 glass border-0 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              사용 방법
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• <strong className="text-blue-400">링크 추가</strong>: 서비스와 관련된 유용한 링크를 추가합니다 (문서, 튜토리얼, 커뮤니티 등).</li>
              <li>• <strong className="text-blue-400">아이콘 선택</strong>: 링크의 성격에 맞는 적절한 아이콘을 선택하세요.</li>
              <li>• <strong className="text-blue-400">표시 순서</strong>: 숫자가 작을수록 먼저 표시됩니다.</li>
              <li>• <strong className="text-blue-400">설명 추가</strong>: 사용자가 링크의 내용을 이해할 수 있도록 간단한 설명을 추가하세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}