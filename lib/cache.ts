// Cache configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 60 * 60 * 1000, // 1 hour in milliseconds
  SEARCH_TTL: 10 * 60 * 1000, // 10 minutes for search results
  MAX_SIZE: 200, // Maximum number of items in cache
  CLEANUP_INTERVAL: 5 * 60 * 1000, // Cleanup every 5 minutes
} as const;

// Cache item interface
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
}

// Cache storage interface
interface CacheStorage {
  [key: string]: CacheItem<any>;
}

class CacheService {
  private cache: CacheStorage = {};
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.startCleanupTimer();
  }

  /**
   * Generate a cache key from endpoint and parameters
   */
  private generateKey(endpoint: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return endpoint;
    }
    
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return `${endpoint}?${sortedParams}`;
  }

  /**
   * Check if cache item is expired
   */
  private isExpired(item: CacheItem<any>): boolean {
    const now = Date.now();
    return now - item.timestamp > item.ttl;
  }

  /**
   * Get item from cache
   */
  get<T>(endpoint: string, params?: Record<string, any>): T | null {
    const key = this.generateKey(endpoint, params);
    const item = this.cache[key];

    if (!item) {
      return null;
    }

    if (this.isExpired(item)) {
      delete this.cache[key];
      return null;
    }

    return item.data as T;
  }

  /**
   * Set item in cache
   */
  set<T>(
    endpoint: string, 
    data: T, 
    params?: Record<string, any>, 
    ttl: number = CACHE_CONFIG.DEFAULT_TTL
  ): void {
    const key = this.generateKey(endpoint, params);
    
    // Check cache size limit
    if (Object.keys(this.cache).length >= CACHE_CONFIG.MAX_SIZE) {
      this.evictOldest();
    }

    this.cache[key] = {
      data,
      timestamp: Date.now(),
      ttl,
      key,
    };
  }

  /**
   * Remove specific item from cache
   */
  delete(endpoint: string, params?: Record<string, any>): boolean {
    const key = this.generateKey(endpoint, params);
    if (this.cache[key]) {
      delete this.cache[key];
      return true;
    }
    return false;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache = {};
  }

  /**
   * Clear cache by pattern
   */
  clearByPattern(pattern: string): void {
    const regex = new RegExp(pattern);
    Object.keys(this.cache).forEach(key => {
      if (regex.test(key)) {
        delete this.cache[key];
      }
    });
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    keys: string[];
    oldestItem?: string;
    newestItem?: string;
  } {
    const keys = Object.keys(this.cache);
    let oldestTime = Infinity;
    let newestTime = 0;
    let oldestItem: string | undefined;
    let newestItem: string | undefined;

    keys.forEach(key => {
      const item = this.cache[key];
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestItem = key;
      }
      if (item.timestamp > newestTime) {
        newestTime = item.timestamp;
        newestItem = key;
      }
    });

    return {
      size: keys.length,
      keys,
      oldestItem,
      newestItem,
    };
  }

  /**
   * Evict oldest item when cache is full
   */
  private evictOldest(): void {
    let oldestTime = Infinity;
    let oldestKey: string | undefined;

    Object.keys(this.cache).forEach(key => {
      const item = this.cache[key];
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      delete this.cache[oldestKey];
    }
  }

  /**
   * Cleanup expired items
   */
  private cleanup(): void {
    Object.keys(this.cache).forEach(key => {
      const item = this.cache[key];
      if (this.isExpired(item)) {
        delete this.cache[key];
      }
    });
  }

  /**
   * Start automatic cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, CACHE_CONFIG.CLEANUP_INTERVAL);
  }

  /**
   * Stop cleanup timer
   */
  stopCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * Invalidate cache for specific endpoints
   */
  invalidateEndpoints(endpoints: string[]): void {
    endpoints.forEach(endpoint => {
      this.clearByPattern(`^${endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    });
  }

  /**
   * Preload data into cache
   */
  async preload<T>(
    endpoint: string,
    fetchFn: () => Promise<T>,
    params?: Record<string, any>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(endpoint, params);
    if (cached) {
      return cached;
    }

    const data = await fetchFn();
    this.set(endpoint, data, params, ttl);
    return data;
  }
}

// Create singleton instance
const cacheService = new CacheService();

// Export the service and types
export default cacheService;
export { CacheService };
export type { CacheItem, CacheStorage };
