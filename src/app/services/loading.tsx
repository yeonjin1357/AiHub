import { Header } from '@/components/layout/header';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 헤더 스켈레톤 */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded-lg max-w-md mx-auto mb-3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg max-w-lg mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg max-w-sm mx-auto animate-pulse"></div>
          </div>

          {/* 검색 및 필터 스켈레톤 */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 컨텐츠 스켈레톤 */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 사이드바 스켈레톤 */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* 서비스 그리드 스켈레톤 */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}