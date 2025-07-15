'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';

export function AuthSuccessHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const authParam = searchParams.get('auth');
    
    if (authParam === 'success' && user) {
      // 소셜 로그인 성공 토스트 표시
      const provider = user.app_metadata?.provider;
      if (provider && provider !== 'email') {
        const providerName = provider === 'google' ? 'Google' : 
                            provider === 'github' ? 'GitHub' : provider;
        toast.success(`${providerName} 로그인이 완료되었습니다`);
      } else {
        toast.success('로그인이 완료되었습니다');
      }
      
      // URL에서 auth 파라미터 제거 (브라우저 히스토리에 영향 없이)
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [searchParams, user, router]);

  return null; // 화면에 렌더링할 것이 없음
}