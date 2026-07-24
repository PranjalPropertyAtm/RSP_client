import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type {
  ApiSuccessResponse,
  CreateVillagePayload,
  PaginatedResponse,
  ServerPaginatedApiResponse,
  UpdateVillagePayload,
  Village,
  VillageDetails,
  VillageFilterOption,
  VillageListParams,
} from '@/types';

export const villagesApi = {
  list: async (params: VillageListParams): Promise<PaginatedResponse<Village>> => {
    const { data } = await apiClient.get<ServerPaginatedApiResponse<Village>>(
      API_ENDPOINTS.villages.list,
      { params }
    );
    return { data: data.data, meta: data.meta.pagination };
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Village>>(
      API_ENDPOINTS.villages.detail(id)
    );
    return data.data;
  },

  getDetails: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<VillageDetails>>(
      API_ENDPOINTS.villages.details(id)
    );
    return data.data;
  },

  getFilterOptions: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<VillageFilterOption[]>>(
      API_ENDPOINTS.villages.filterOptions
    );
    return data.data;
  },

  create: async (payload: CreateVillagePayload) => {
    const { data } = await apiClient.post<ApiSuccessResponse<Village>>(
      API_ENDPOINTS.villages.create,
      payload
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateVillagePayload) => {
    const { data } = await apiClient.put<ApiSuccessResponse<Village>>(
      API_ENDPOINTS.villages.detail(id),
      payload
    );
    return data.data;
  },

  activate: async (id: string) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<Village>>(
      API_ENDPOINTS.villages.activate(id)
    );
    return data.data;
  },

  deactivate: async (id: string) => {
    const { data } = await apiClient.patch<ApiSuccessResponse<Village>>(
      API_ENDPOINTS.villages.deactivate(id)
    );
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.villages.detail(id));
  },
};
