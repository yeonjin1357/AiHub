import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Header } from '@/components/layout/header';
import { DashboardStats } from '@/components/admin/dashboard-stats';

export const metadata: Metadata = {
  title: '통계 대시보드 - AIMOA Admin',
  description: '플랫폼 통계 및 분석',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/signin');
  }
  
  // 관리자 권한 확인
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (!userProfile || userProfile.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">통계 대시보드</h1>
                <p className="mt-2 text-gray-600">
                  AIMOA 플랫폼의 사용 통계와 성과를 한눈에 확인하세요.
                </p>
              </div>
              <Link 
                href="/admin" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                대시보드로 돌아가기
              </Link>
            </div>
          </div>
          
          <DashboardStats />
        </div>
      </main>
    </div>
  );
}