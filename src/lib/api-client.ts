import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { endSession } from '@/lib/session';
import { useAuthStore } from '@/stores/auth.store';
import type { ApiSuccessResponse } from '@/types';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
}

function shouldAttemptRefresh(url?: string): boolean {
  if (!url) return true;
  return !url.includes('/auth/login') && !url.includes('/auth/refresh-token');
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const { data } = await axios.post<ApiSuccessResponse<{ accessToken: string }>>(
    `${env.apiBaseUrl}${API_ENDPOINTS.auth.refreshToken}`,
    { refreshToken }
  );
  return data.data.accessToken;
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      !shouldAttemptRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    const { refreshToken, setTokens } = useAuthStore.getState();

    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);

      setTokens(newAccessToken, refreshToken);
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      endSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
