'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { AIService } from '@/lib/api/services';

interface Favorite {
  id: string;
  service_id: string;
  created_at: string;
  ai_services?: AIService;
}

interface FavoritesContextType {
  favorites: Favorite[];
  favoriteServiceIds: Set<string>;
  loading: boolean;
  addFavorite: (serviceId: string) => Promise<boolean>;
  removeFavorite: (serviceId: string) => Promise<boolean>;
  toggleFavorite: (serviceId: string) => Promise<boolean>;
  isFavorited: (serviceId: string) => boolean;
  loadFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteServiceIds, setFavoriteServiceIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // 사용자의 찜 목록 로드 (한 번만 실행)
  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setFavoriteServiceIds(new Set());
      setHasLoaded(false);
      setLoading(false);
      return;
    }

    // 이미 로드했다면 다시 로드하지 않음
    if (hasLoaded) return;

    setLoading(true);
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
        setFavoriteServiceIds(new Set(data.favorites?.map((f: Favorite) => f.service_id) || []));
        setHasLoaded(true);
      } else {
        console.error('Failed to load favorites');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user, hasLoaded]);

  // 서비스를 찜 목록에 추가
  const addFavorite = useCallback(async (serviceId: string) => {
    if (!user) return false;

    // 즉시 UI 업데이트 (낙관적 업데이트)
    setFavoriteServiceIds(prev => new Set(prev).add(serviceId));

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service_id: serviceId }),
      });

      if (response.ok) {
        // 성공 시 favorites 목록도 업데이트
        const data = await response.json();
        setFavorites(prev => [data.favorite, ...prev]);
        return true;
      } else {
        // 실패 시 rollback
        setFavoriteServiceIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(serviceId);
          return newSet;
        });
        const error = await response.json();
        console.error('Failed to add favorite:', error);
        return false;
      }
    } catch (error) {
      // 에러 시 rollback
      setFavoriteServiceIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(serviceId);
        return newSet;
      });
      console.error('Error adding favorite:', error);
      return false;
    }
  }, [user]);

  // 찜 목록에서 서비스 제거
  const removeFavorite = useCallback(async (serviceId: string) => {
    if (!user) return false;

    // 현재 상태 백업 (rollback용)
    const prevFavorites = favorites;
    
    // 즉시 UI 업데이트 (낙관적 업데이트)
    setFavoriteServiceIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(serviceId);
      return newSet;
    });
    setFavorites(prev => prev.filter(fav => fav.service_id !== serviceId));

    try {
      const response = await fetch(`/api/favorites?service_id=${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return true;
      } else {
        // 실패 시 rollback
        setFavoriteServiceIds(prev => new Set(prev).add(serviceId));
        setFavorites(prevFavorites);
        const error = await response.json();
        console.error('Failed to remove favorite:', error);
        return false;
      }
    } catch (error) {
      // 에러 시 rollback
      setFavoriteServiceIds(prev => new Set(prev).add(serviceId));
      setFavorites(prevFavorites);
      console.error('Error removing favorite:', error);
      return false;
    }
  }, [user, favorites]);

  // 찜 상태 토글
  const toggleFavorite = useCallback(async (serviceId: string) => {
    if (!user) return false;

    const isFavorited = favoriteServiceIds.has(serviceId);
    
    if (isFavorited) {
      return await removeFavorite(serviceId);
    } else {
      return await addFavorite(serviceId);
    }
  }, [user, favoriteServiceIds, addFavorite, removeFavorite]);

  // 특정 서비스가 찜되어 있는지 확인
  const isFavorited = useCallback((serviceId: string) => {
    return favoriteServiceIds.has(serviceId);
  }, [favoriteServiceIds]);

  // 사용자가 변경될 때만 찜 목록 로드
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      // 로그아웃 시 상태 초기화
      setFavorites([]);
      setFavoriteServiceIds(new Set());
      setHasLoaded(false);
    }
  }, [user, loadFavorites]);

  const value: FavoritesContextType = {
    favorites,
    favoriteServiceIds,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
    loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}