import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type {
  ApiSuccessResponse,
  CreateSankalpPrerakPayload,
  PaginatedResponse,
  SankalpPrerak,
  SankalpPrerakListParams,
  SankalpPrerakProfile,
  ServerPaginatedApiResponse,
  TransferSankalpPrerakPayload,
  UpdateSankalpPrerakPayload,
} from '@/types';

export const sankalpPreraksApi = {
  list: async (params: SankalpPrerakListParams): Promise<PaginatedResponse<SankalpPrerak>> => {
    const { data } = await apiClient.get<ServerPaginatedApiResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.list,
      { params }
    );
    return { data: data.data, meta: data.meta.pagination };
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.detail(id)
    );
    return data.data;
  },

  getProfile: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<SankalpPrerakProfile>>(
      API_ENDPOINTS.sankalpPreraks.profile(id)
    );
    return data.data;
  },

  create: async (payload: CreateSankalpPrerakPayload) => {
    const { data } = await apiClient.post<ApiSuccessResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.create,
      payload
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateSankalpPrerakPayload) => {
    const { data } = await apiClient.put<ApiSuccessResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.detail(id),
      payload
    );
    return data.data;
  },

  deactivate: async (id: string) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.deactivate(id)
    );
    return data.data;
  },

  transfer: async (id: string, payload: TransferSankalpPrerakPayload) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<SankalpPrerak>>(
      API_ENDPOINTS.sankalpPreraks.transfer(id),
      payload
    );
    return data.data;
  },
};
