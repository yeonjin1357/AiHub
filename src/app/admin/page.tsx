import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, Database, Users, BarChart3, Star, Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

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

  // 최근 리뷰 가져오기
  const { data: recentReviews } = await supabase
    .from('reviews')
    .select(`
      *,
      user_profiles (
        name,
        email
      ),
      ai_services (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0a0a0b]">
        {/* Background gradient effects */}
        <div className='fixed inset-0 pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[128px] rounded-full animate-blob' />
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[128px] rounded-full animate-blob animation-delay-2000' />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
            <p className="mt-2 text-zinc-400">
              AIMOA 플랫폼 관리 도구
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass border-0 gradient-border-effect hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-zinc-300">서비스 관리</CardTitle>
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Database className="h-4 w-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 text-white">AI 서비스</div>
                <p className="text-xs text-zinc-500 mb-4">
                  서비스 정보 및 특징 관리
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                  <Link href="/admin/services">서비스 관리</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-0 gradient-border-effect hover:shadow-2xl hover:shadow-purple-500/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-zinc-300">사용자 관리</CardTitle>
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 text-white">사용자</div>
                <p className="text-xs text-zinc-500 mb-4">
                  사용자 계정 및 권한 관리
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0">
                  <Link href="/admin/users">사용자 관리</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-0 gradient-border-effect hover:shadow-2xl hover:shadow-green-500/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-zinc-300">통계</CardTitle>
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 text-white">대시보드</div>
                <p className="text-xs text-zinc-500 mb-4">
                  사용 통계 및 분석
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0">
                  <Link href="/admin/dashboard">통계 보기</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="glass border-0 gradient-border-effect">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-white">최근 리뷰</CardTitle>
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                {recentReviews && recentReviews.length > 0 ? (
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-white/10 pb-4 last:border-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link 
                                href={`/services/${review.ai_services?.slug}`}
                                className="font-medium text-white hover:text-blue-400 transition-colors"
                              >
                                {review.ai_services?.name}
                              </Link>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating 
                                        ? 'text-yellow-500 fill-yellow-500' 
                                        : 'text-zinc-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                              {review.comment}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {review.user_profiles?.name || review.user_profiles?.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(new Date(review.created_at), 'MM월 dd일 HH:mm', { locale: ko })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-zinc-500 py-8">
                    아직 작성된 리뷰가 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}