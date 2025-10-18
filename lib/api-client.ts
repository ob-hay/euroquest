interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  status?: number;
  success?: boolean;
}

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  
  constructor(baseURL: string = 'https://api.euroqst.com/api') {
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authentication token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // Build URL with query parameters
  private buildURL(endpoint: string, params?: Record<string, string | number>): string {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });

    return `${url}?${searchParams.toString()}`;
  }

  // Generic request method
  private async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildURL(endpoint, config?.params);
      
      // Check if data is FormData
      const isFormData = data instanceof FormData;
      
      const headers = {
        ...this.defaultHeaders,
        ...config?.headers,
      };

      // Remove Content-Type header for FormData to let browser set it with boundary
      if (isFormData) {
        delete headers['Content-Type'];
      }

      const requestOptions: RequestInit = {
        method,
        headers,
        signal: config?.timeout ? AbortSignal.timeout(config.timeout) : undefined,
      };

      if (data && method !== 'GET') {
        if (isFormData) {
          requestOptions.body = data;
        } else {
          requestOptions.body = JSON.stringify(data);
        }
      }

      const response = await fetch(url, requestOptions);
      
      let responseData: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 
          responseData || 
          `HTTP error! status: ${response.status}`;
        
        // Enhanced error logging for debugging
        console.error(`API Error Details:`, {
          url,
          method,
          status: response.status,
          statusText: response.statusText,
          responseData,
          errorMessage
        });
        
        throw new Error(errorMessage);
      }

      return {
        data: responseData,
        status: response.status,
        success: true,
        message: responseData?.message || 'Success',
      };

    } catch (error) {
      console.error(`API ${method} ${endpoint} failed:`, {
        endpoint,
        method,
        url: this.buildURL(endpoint, config?.params),
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error,
        requestData: data,
        config
      });
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred');
    }
  }

  // GET request
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  // POST request
  async post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  // PUT request
  async put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  // PATCH request
  async patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  // DELETE request
  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }
}

// Create and export a default instance
const apiClient = new ApiClient();

export default apiClient;
export { ApiClient };
export type { ApiResponse, RequestConfig };
