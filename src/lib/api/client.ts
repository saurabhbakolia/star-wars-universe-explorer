import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const SWAPI_BASE_URL = 'https://swapi.info/api';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Server responded with error status
          console.error('[API] Response error:', {
            status: error.response.status,
            data: error.response.data,
            url: error.config?.url,
          });
        } else if (error.request) {
          // Request made but no response received
          console.error('[API] No response received:', error.request);
        } else {
          // Error setting up request
          console.error('[API] Request setup error:', error.message);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const status = error.response.status;
      const message = this.getErrorMessage(status);
      return new Error(message);
    }
    if (error.request) {
      return new Error('Network error: Unable to reach the server');
    }
    return new Error(`Request error: ${error.message}`);
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 404:
        return 'Resource not found';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `API error (${status})`;
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    try {
      // If URL is absolute, use it directly; otherwise use baseURL
      const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
      
      if (isAbsoluteUrl) {
        const response = await axios.get<T>(url, { params });
        return response.data;
      }
      
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new ApiClient(SWAPI_BASE_URL);
