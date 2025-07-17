import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, Database, Users, BarChart3 } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/signin');
  }

  // 사용자 역할 확인
  const userProfile = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userProfile?.data?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">관리자 대시보드</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              AIMOA 플랫폼 관리 도구
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">서비스 관리</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">AI 서비스</div>
                <p className="text-xs text-muted-foreground mb-4">
                  서비스 정보 및 특징 관리
                </p>
                <Button asChild className="w-full">
                  <Link href="/admin/services">서비스 관리</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">사용자 관리</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">사용자</div>
                <p className="text-xs text-muted-foreground mb-4">
                  사용자 계정 및 권한 관리
                </p>
                <Button className="w-full" variant="outline" disabled>
                  사용자 관리 (준비중)
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">통계</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">대시보드</div>
                <p className="text-xs text-muted-foreground mb-4">
                  사용 통계 및 분석
                </p>
                <Button className="w-full" variant="outline" disabled>
                  통계 보기 (준비중)
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <CardHeader>
                <CardTitle>빠른 작업</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button asChild variant="outline">
                    <Link href="/admin/services">
                      <Settings className="h-4 w-4 mr-2" />
                      서비스 특징 관리
                    </Link>
                  </Button>
                  <Button variant="outline" disabled>
                    <Database className="h-4 w-4 mr-2" />
                    카테고리 관리 (준비중)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}