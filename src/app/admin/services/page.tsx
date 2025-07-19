import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Link as LinkIcon, Zap } from 'lucide-react';

export default async function AdminServicesPage() {
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

  // 서비스 목록 가져오기
  const { data: services } = await supabase
    .from('ai_services')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .order('name');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">서비스 관리</h1>
                <p className="mt-2 text-gray-600">
                  AI 서비스 정보 및 특징 관리
                </p>
              </div>
              <Button asChild>
                <Link href="/admin">← 대시보드로</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <Card key={service.id} className="border-gray-200/60 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {service.logo_url ? (
                      <img
                        src={service.logo_url}
                        alt={`${service.name} logo`}
                        className="w-10 h-10 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                        {service.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {service.categories?.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/services/${service.slug}/functions`}>
                          <Zap className="h-4 w-4 mr-1" />
                          기능
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/services/${service.slug}/links`}>
                          <LinkIcon className="h-4 w-4 mr-1" />
                          링크
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="col-span-2">
                        <Link href={`/services/${service.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-1" />
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
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 서비스가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}