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
  const [profileFetchPromise, setProfileFetchPromise] = useState<Promise<void> | null>(null);

  // 사용자 프로필 가져오기 (중복 호출 방지)
  const fetchUserProfile = async (userId: string) => {
    // 이미 같은 사용자의 프로필이 있으면 다시 가져오지 않음
    if (userProfile?.id === userId) {
      return;
    }
    
    // 이미 프로필 가져오기가 진행 중이면 기다림
    if (profileFetchPromise) {
      return profileFetchPromise;
    }
    
    const promise = (async () => {
      try {
        console.log('Fetching user profile for:', userId);
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
      } finally {
        setProfileFetchPromise(null);
      }
    })();
    
    setProfileFetchPromise(promise);
    return promise;
  };

  useEffect(() => {
    let mounted = true;
    let isInitialLoad = true;

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
      } finally {
        isInitialLoad = false;
      }
    };

    getInitialUser();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, 'isInitialLoad:', isInitialLoad);
      
      // 초기 로드 중에 INITIAL_SESSION 이벤트는 무시 (getInitialUser에서 처리)
      if (isInitialLoad && event === 'INITIAL_SESSION') {
        return;
      }
      
      if (mounted) {
        // 로그인/로그아웃 이벤트만 처리
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
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
      if (e.key === 'supabase.auth.token' && mounted && !loading) {
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
  }, []);

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