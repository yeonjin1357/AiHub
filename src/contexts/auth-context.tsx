'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { auth, supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 사용자 프로필 가져오기
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    // 초기 사용자 상태 확인
    const getInitialUser = async () => {
      try {
        // 먼저 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted && session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
          setIsInitialized(true);
          setLoading(false);
        } else {
          // 세션이 없으면 현재 사용자 확인
          const { data } = await auth.getCurrentUser();
          if (mounted) {
            setUser(data.user);
            if (data.user) {
              await fetchUserProfile(data.user.id);
            }
            setIsInitialized(true);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error getting initial user:', error);
        if (mounted) {
          setLoading(false);
          setIsInitialized(true);
        }
      }
    };

    getInitialUser();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        // 초기화가 완료된 후에만 상태 업데이트
        if (isInitialized || event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        }
      }
    });

    // 탭 간 세션 동기화를 위한 storage 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'supabase.auth.token' && mounted) {
        getInitialUser();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, [isInitialized]);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserProfile(null);
      toast.success('로그아웃되었습니다');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다');
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}