import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import { env } from '@/config/env';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type { ApiSuccessResponse, LoginCredentials, LoginResponse } from '@/types';

interface RefreshTokenResponse {
  accessToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    return data.data;
  },

  logout: async (refreshToken: string) => {
    await apiClient.post(API_ENDPOINTS.auth.logout, { refreshToken });
  },

  refreshSession: async (refreshToken: string) => {
    const { data } = await axios.post<ApiSuccessResponse<RefreshTokenResponse>>(
      `${env.apiBaseUrl}${API_ENDPOINTS.auth.refreshToken}`,
      { refreshToken }
    );
    return data.data;
  },

  resetPassword: async (payload: { userId: string; newPassword: string }) => {
    const { data } = await apiClient.post<ApiSuccessResponse<{ message: string }>>(
      API_ENDPOINTS.auth.resetPassword,
      payload
    );
    return data;
  },
};
