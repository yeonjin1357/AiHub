import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (typeof document !== 'undefined') {
            const value = document.cookie
              .split('; ')
              .find(row => row.startsWith(name + '='))
              ?.split('=')[1];
            
            return value ? decodeURIComponent(value) : undefined;
          }
          return undefined;
        },
        set(name: string, value: string, options?: any) {
          if (typeof document !== 'undefined') {
            let cookieString = `${name}=${encodeURIComponent(value)}`;
            
            // 기본값 설정
            const path = options?.path || '/';
            const maxAge = options?.maxAge || 60 * 60 * 24 * 365; // 기본 1년
            
            cookieString += `; Path=${path}`;
            cookieString += `; Max-Age=${maxAge}`;
            
            // domain 설정 - 현재 도메인의 모든 서브도메인에서 사용 가능
            if (options?.domain) {
              cookieString += `; Domain=${options.domain}`;
            }
            
            // Secure 설정 - HTTPS에서만
            if (window.location.protocol === 'https:') {
              cookieString += `; Secure`;
            }
            
            // SameSite 설정
            const sameSite = options?.sameSite || 'lax';
            cookieString += `; SameSite=${sameSite}`;
            
            document.cookie = cookieString;
          }
        },
        remove(name: string, options?: any) {
          if (typeof document !== 'undefined') {
            document.cookie = `${name}=; Max-Age=0; Path=${options?.path || '/'}`;
          }
        },
      },
    }
  );
};