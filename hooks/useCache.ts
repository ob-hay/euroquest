import { useEffect, useState, useCallback } from 'react';
import cacheService from '@/lib/cache';
import { cacheManagement } from '@/services/services';

// Cache statistics interface
interface CacheStats {
  size: number;
  keys: string[];
  oldestItem?: string;
  newestItem?: string;
}

// Hook for cache management
export const useCache = () => {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get cache statistics
  const getStats = useCallback(() => {
    const currentStats = cacheService.getStats();
    setStats(currentStats);
    return currentStats;
  }, []);

  // Clear all cache
  const clearAll = useCallback(() => {
    cacheService.clear();
    getStats();
  }, [getStats]);

  // Clear specific cache
  const clearCache = useCallback((type: 'categories' | 'cities' | 'courses' | 'upcoming' | 'search') => {
    switch (type) {
      case 'categories':
        cacheManagement.clearCategoriesCache();
        break;
      case 'cities':
        cacheManagement.clearCitiesCache();
        break;
      case 'courses':
        cacheManagement.clearCoursesCache();
        break;
      case 'upcoming':
        cacheManagement.clearUpcomingCoursesCache();
        break;
      case 'search':
        cacheManagement.clearSearchCache();
        break;
    }
    getStats();
  }, [getStats]);

  // Preload critical data
  const preloadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await cacheManagement.preloadCriticalData();
      getStats();
    } catch (error) {
      console.error('Error preloading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getStats]);

  // Update stats periodically
  useEffect(() => {
    getStats();
    
    const interval = setInterval(getStats, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [getStats]);

  return {
    stats,
    isLoading,
    getStats,
    clearAll,
    clearCache,
    preloadData,
  };
};

// Hook for cached data fetching with automatic refresh
export const useCachedData = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  ttl?: number
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to get from cache first
      const cached = cacheService.get<T>(key);
      if (cached) {
        setData(cached);
        setLastFetch(new Date());
        setIsLoading(false);
        return;
      }

      // Fetch fresh data
      const freshData = await fetchFn();
      cacheService.set(key, freshData, undefined, ttl);
      setData(freshData);
      setLastFetch(new Date());
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, ttl, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    cacheService.delete(key);
    fetchData();
  }, [key, fetchData]);

  return {
    data,
    isLoading,
    error,
    lastFetch,
    refresh,
  };
};

// Hook for cache status monitoring
export const useCacheStatus = () => {
  const [status, setStatus] = useState<{
    totalItems: number;
    memoryUsage: string;
    oldestItem: string | null;
    newestItem: string | null;
  }>({
    totalItems: 0,
    memoryUsage: '0 KB',
    oldestItem: null,
    newestItem: null,
  });

  useEffect(() => {
    const updateStatus = () => {
      const stats = cacheService.getStats();
      const memoryUsage = new Blob([JSON.stringify(stats)]).size;
      
      setStatus({
        totalItems: stats.size,
        memoryUsage: `${Math.round(memoryUsage / 1024)} KB`,
        oldestItem: stats.oldestItem || null,
        newestItem: stats.newestItem || null,
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return status;
};
