import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type {
  ApiSuccessResponse,
  CreateUserPayload,
  PaginatedResponse,
  ServerPaginatedApiResponse,
  UpdateUserPayload,
  User,
  UserListParams,
} from '@/types';

export const usersApi = {
  list: async (params: UserListParams): Promise<PaginatedResponse<User>> => {
    const { data } = await apiClient.get<ServerPaginatedApiResponse<User>>(
      API_ENDPOINTS.users.list,
      { params }
    );
    return {
      data: data.data,
      meta: data.meta.pagination,
    };
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<User>>(API_ENDPOINTS.users.detail(id));
    return data.data;
  },

  create: async (payload: CreateUserPayload) => {
    const { data } = await apiClient.post<ApiSuccessResponse<User>>(API_ENDPOINTS.users.create, payload);
    return data.data;
  },

  update: async (id: string, payload: UpdateUserPayload) => {
    const { data } = await apiClient.put<ApiSuccessResponse<User>>(
      API_ENDPOINTS.users.detail(id),
      payload
    );
    return data.data;
  },

  activate: async (id: string) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<User>>(API_ENDPOINTS.users.activate(id));
    return data.data;
  },

  deactivate: async (id: string) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<User>>(API_ENDPOINTS.users.deactivate(id));
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.users.detail(id));
  },
};
