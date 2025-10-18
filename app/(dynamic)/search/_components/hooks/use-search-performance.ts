import { useState, useCallback, useRef } from "react";
import { SearchPerformance } from "../types/search-types";

export interface UseSearchPerformanceReturn {
  performance: SearchPerformance | null;
  startSearch: () => void;
  endSearch: (cacheHit: boolean) => void;
  getSearchMetrics: () => {
    averageResponseTime: number;
    cacheHitRate: number;
    totalSearches: number;
  };
}

export function useSearchPerformance(): UseSearchPerformanceReturn {
  const [performance, setPerformance] = useState<SearchPerformance | null>(null);
  const startTimeRef = useRef<number>(0);
  const searchHistoryRef = useRef<SearchPerformance[]>([]);

  const startSearch = useCallback(() => {
    startTimeRef.current = window.performance.now();
  }, []);

  const endSearch = useCallback((cacheHit: boolean) => {
    const endTime = window.performance.now();
    const duration = endTime - startTimeRef.current;
    
    const searchPerf: SearchPerformance = {
      startTime: startTimeRef.current,
      endTime,
      duration,
      cacheHit,
    };

    setPerformance(searchPerf);
    searchHistoryRef.current.push(searchPerf);
    
    // Keep only last 50 searches for metrics
    if (searchHistoryRef.current.length > 50) {
      searchHistoryRef.current = searchHistoryRef.current.slice(-50);
    }
  }, []);

  const getSearchMetrics = useCallback(() => {
    const history = searchHistoryRef.current;
    if (history.length === 0) {
      return {
        averageResponseTime: 0,
        cacheHitRate: 0,
        totalSearches: 0,
      };
    }

    const totalDuration = history.reduce((sum, perf) => sum + perf.duration, 0);
    const cacheHits = history.filter(perf => perf.cacheHit).length;
    
    return {
      averageResponseTime: totalDuration / history.length,
      cacheHitRate: (cacheHits / history.length) * 100,
      totalSearches: history.length,
    };
  }, []);

  return {
    performance,
    startSearch,
    endSearch,
    getSearchMetrics,
  };
}
