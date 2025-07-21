// 간단한 인메모리 캐시 구현
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlSeconds = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: ttlSeconds * 1000,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  clearByPattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new ApiCache();

// 중복 요청 방지를 위한 Promise 저장소
const pendingRequests = new Map<string, Promise<any>>();

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    ttl?: number;
    forceRefresh?: boolean;
  }
): Promise<T> {
  const { ttl = 300, forceRefresh = false } = options || {};

  // 강제 새로고침이 아니고 캐시에 데이터가 있으면 반환
  if (!forceRefresh) {
    const cached = apiCache.get<T>(key);
    if (cached !== null) {
      return cached;
    }
  }

  // 이미 진행 중인 요청이 있으면 그 Promise를 반환
  const pending = pendingRequests.get(key);
  if (pending) {
    return pending;
  }

  // 새 요청 시작
  const promise = fetcher()
    .then((data) => {
      apiCache.set(key, data, ttl);
      pendingRequests.delete(key);
      return data;
    })
    .catch((error) => {
      pendingRequests.delete(key);
      throw error;
    });

  pendingRequests.set(key, promise);
  return promise;
}