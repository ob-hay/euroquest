import { useState, useCallback, useEffect } from "react";

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface UseSearchCacheReturn {
  getCachedResult: <T>(key: string) => T | null;
  setCachedResult: <T>(key: string, data: T, ttl?: number) => void;
  clearCache: () => void;
  isCacheValid: (key: string) => boolean;
  getCacheStats: () => {
    size: number;
    hitRate: number;
    missRate: number;
  };
}

export function useSearchCache(): UseSearchCacheReturn {
  const [cache, setCache] = useState<Map<string, CacheEntry<any>>>(new Map());
  const [hitCount, setHitCount] = useState(0);
  const [missCount, setMissCount] = useState(0);

  const generateCacheKey = useCallback((filters: SearchFilters): string => {
    const sortedFilters = Object.keys(filters)
      .sort()
      .reduce((result, key) => {
        const value = filters[key as keyof SearchFilters];
        if (value) {
          result[key] = value;
        }
        return result;
      }, {} as Record<string, string>);
    
    return `search_${JSON.stringify(sortedFilters)}`;
  }, []);

  const getCachedResult = useCallback(<T>(key: string): T | null => {
    const entry = cache.get(key);
    
    if (!entry) {
      setMissCount(prev => prev + 1);
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      setCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(key);
        return newCache;
      });
      setMissCount(prev => prev + 1);
      return null;
    }

    setHitCount(prev => prev + 1);
    return entry.data;
  }, [cache]);

  const setCachedResult = useCallback(<T>(key: string, data: T, ttl: number = 5 * 60 * 1000) => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.set(key, {
        data,
        timestamp: Date.now(),
        ttl,
      });
      return newCache;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCache(new Map());
    setHitCount(0);
    setMissCount(0);
  }, []);

  const isCacheValid = useCallback((key: string): boolean => {
    const entry = cache.get(key);
    if (!entry) return false;
    
    const now = Date.now();
    return now - entry.timestamp <= entry.ttl;
  }, [cache]);

  const getCacheStats = useCallback(() => {
    const total = hitCount + missCount;
    return {
      size: cache.size,
      hitRate: total > 0 ? (hitCount / total) * 100 : 0,
      missRate: total > 0 ? (missCount / total) * 100 : 0,
    };
  }, [cache.size, hitCount, missCount]);

  // Clean up expired entries periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCache(prev => {
        const newCache = new Map();
        for (const [key, entry] of prev) {
          if (now - entry.timestamp <= entry.ttl) {
            newCache.set(key, entry);
          }
        }
        return newCache;
      });
    }, 60000); // Clean up every minute

    return () => clearInterval(interval);
  }, []);

  return {
    getCachedResult,
    setCachedResult,
    clearCache,
    isCacheValid,
    getCacheStats,
  };
}
