'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Services page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[600px] px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          서비스를 불러올 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8">
          일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className="space-y-3">
          <Button onClick={reset} variant="default" className="w-full sm:w-auto">
            다시 시도
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline"
            className="w-full sm:w-auto ml-0 sm:ml-3"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}