'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  MessageSquare, 
  Heart, 
  TrendingUp,
  Star,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DashboardStats {
  overview: {
    totalUsers: number;
    totalServices: number;
    totalReviews: number;
    totalFavorites: number;
  };
  servicesByCategory: Array<{
    category: string;
    count: number;
  }>;
  ratingDistribution: {
    [key: string]: number;
  };
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  topServices: Array<{
    name: string;
    slug: string;
    reviews: number;
    favorites: number;
    engagement: number;
  }>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">통계를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 평점 분포 데이터 변환
  const ratingData = Object.entries(stats.ratingDistribution).map(([rating, count]) => ({
    rating: `${rating}점`,
    count,
  }));

  return (
    <div className="space-y-8">
      {/* 개요 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 사용자</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">등록된 사용자 수</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">등록 서비스</CardTitle>
            <Package className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.totalServices.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">AI 서비스 수</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 리뷰</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.totalReviews.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">작성된 리뷰 수</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 찜</CardTitle>
            <Heart className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.totalFavorites.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">찜한 서비스 수</p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 사용자 증가 추이 */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">신규 가입자 추이</CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), 'yyyy년 MM월 dd일', { locale: ko })}
                    formatter={(value) => [`${value}명`, '신규 가입']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 카테고리별 서비스 분포 */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">카테고리별 서비스</CardTitle>
            <Package className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.servicesByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `${value}개`} />
                  <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 평점 분포 */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">평점 분포</CardTitle>
            <Star className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ rating, count, percent }) => 
                      `${rating}: ${count}개 (${((percent || 0) * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 인기 서비스 TOP 5 */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">인기 서비스 TOP 5</CardTitle>
            <Activity className="h-5 w-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topServices.map((service, index) => (
                <div key={service.slug} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">
                        리뷰 {service.reviews}개 · 찜 {service.favorites}개
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{service.engagement}</p>
                    <p className="text-xs text-gray-500">참여도</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 추가 통계 정보 */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">플랫폼 참여도</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {stats.overview.totalReviews && stats.overview.totalUsers
                  ? (stats.overview.totalReviews / stats.overview.totalUsers).toFixed(1)
                  : '0'}
              </p>
              <p className="text-sm text-gray-600 mt-2">사용자당 평균 리뷰 수</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats.overview.totalFavorites && stats.overview.totalUsers
                  ? (stats.overview.totalFavorites / stats.overview.totalUsers).toFixed(1)
                  : '0'}
              </p>
              <p className="text-sm text-gray-600 mt-2">사용자당 평균 찜 수</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.overview.totalReviews && stats.overview.totalServices
                  ? (stats.overview.totalReviews / stats.overview.totalServices).toFixed(1)
                  : '0'}
              </p>
              <p className="text-sm text-gray-600 mt-2">서비스당 평균 리뷰 수</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}