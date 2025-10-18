import { SearchResponse, searchTimings } from "@/services/services";
import { CacheEntry } from "../hooks/use-search-cache";

export interface EnhancedSearchOptions {
  enableCache?: boolean;
  cacheTTL?: number;
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface SearchResult<T> {
  data: T;
  fromCache: boolean;
  performance: {
    startTime: number;
    endTime: number;
    duration: number;
  };
  metadata: {
    cacheKey: string;
    timestamp: number;
    filters: SearchFilters;
  };
}

export class EnhancedSearchService {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultOptions: Required<EnhancedSearchOptions> = {
    enableCache: true,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    timeout: 30000, // 30 seconds
  };

  private generateCacheKey(filters: SearchFilters): string {
    const sortedFilters = Object.keys(filters)
      .sort()
      .reduce((result, key) => {
        const value = filters[key as keyof SearchFilters];
        if (value) {
          result[key] = value;
        }
        return result;
      }, {} as Record<string, string>);
    
    return `enhanced_search_${JSON.stringify(sortedFilters)}`;
  }

  private isCacheValid(entry: CacheEntry<any>): boolean {
    const now = Date.now();
    return now - entry.timestamp <= entry.ttl;
  }

  private async withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Search request timeout')), timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }

  private async withRetry<T>(
    operation: () => Promise<T>,
    attempts: number,
    delay: number
  ): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (i < attempts - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }

    throw lastError!;
  }

  async search(
    filters: SearchFilters,
    options: EnhancedSearchOptions = {}
  ): Promise<SearchResult<SearchResponse>> {
    const opts = { ...this.defaultOptions, ...options };
    const cacheKey = this.generateCacheKey(filters);
    const startTime = performance.now();

    // Check cache first
    if (opts.enableCache) {
      const cachedEntry = this.cache.get(cacheKey);
      if (cachedEntry && this.isCacheValid(cachedEntry)) {
        const endTime = performance.now();
        return {
          data: cachedEntry.data,
          fromCache: true,
          performance: {
            startTime,
            endTime,
            duration: endTime - startTime,
          },
          metadata: {
            cacheKey,
            timestamp: Date.now(),
            filters,
          },
        };
      }
    }

    // Perform search with retry and timeout
    try {
      const searchPromise = this.withRetry(
        () => this.withTimeout(searchTimings(filters), opts.timeout),
        opts.retryAttempts,
        opts.retryDelay
      );

      const result = await searchPromise;
      const endTime = performance.now();

      // Cache the result
      if (opts.enableCache) {
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
          ttl: opts.cacheTTL,
        });
      }

      return {
        data: result,
        fromCache: false,
        performance: {
          startTime,
          endTime,
          duration: endTime - startTime,
        },
        metadata: {
          cacheKey,
          timestamp: Date.now(),
          filters,
        },
      };
    } catch (error) {
      const endTime = performance.now();
      throw {
        error: error as Error,
        performance: {
          startTime,
          endTime,
          duration: endTime - startTime,
        },
        metadata: {
          cacheKey,
          timestamp: Date.now(),
          filters,
        },
      };
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): {
    size: number;
    entries: Array<{
      key: string;
      age: number;
      ttl: number;
      isValid: boolean;
    }>;
  } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.timestamp,
      ttl: entry.ttl,
      isValid: this.isCacheValid(entry),
    }));

    return {
      size: this.cache.size,
      entries,
    };
  }

  preloadSearch(filters: SearchFilters): Promise<void> {
    return this.search(filters).then(() => {
      console.log('Search preloaded for filters:', filters);
    }).catch(error => {
      console.warn('Failed to preload search:', error);
    });
  }
}

// Export singleton instance
export const enhancedSearchService = new EnhancedSearchService();
