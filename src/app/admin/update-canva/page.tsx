'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UpdateCanvaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/update-canva-source', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '업데이트 실패');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Canva 서비스 업데이트 소스 변경</CardTitle>
          <CardDescription>
            Canva 서비스의 모든 업데이트 레코드의 source를 'official'에서 'news'로 변경합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!result && !error && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">주의사항</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>이 작업은 되돌릴 수 없습니다</li>
                      <li>Canva 서비스의 모든 'official' 소스가 'news'로 변경됩니다</li>
                      <li>관리자 권한이 필요합니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleUpdate} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    업데이트 중...
                  </>
                ) : (
                  '업데이트 실행'
                )}
              </Button>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-2">업데이트 완료!</p>
                    <p>{result.service.name} (ID: {result.service.id})</p>
                    <p className="mt-1">{result.updateCount}개의 레코드가 업데이트되었습니다.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">업데이트 전후 비교</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">업데이트 전</p>
                    <div className="bg-white rounded p-2 space-y-1">
                      <p>전체: {result.stats.before.total}개</p>
                      <p>official: {result.stats.before.official}개</p>
                      <p>news: {result.stats.before.news}개</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">업데이트 후</p>
                    <div className="bg-white rounded p-2 space-y-1">
                      <p>전체: {result.stats.after.total}개</p>
                      <p>official: {result.stats.after.official}개</p>
                      <p>news: {result.stats.after.news}개</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/admin/services')}
                  className="flex-1"
                >
                  서비스 관리로 이동
                </Button>
                <Button 
                  onClick={() => {
                    setResult(null);
                    setError(null);
                  }}
                  className="flex-1"
                >
                  다시 실행
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-semibold">오류 발생</p>
                    <p className="mt-1">{error}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setError(null);
                  setResult(null);
                }}
                variant="outline"
                className="w-full"
              >
                다시 시도
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}