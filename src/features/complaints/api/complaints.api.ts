import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type {
  ApiSuccessResponse,
  Complaint,
  ComplaintListParams,
  CreateComplaintPayload,
  PaginatedResponse,
  ServerPaginatedApiResponse,
  UpdateComplaintPayload,
} from '@/types';

export const complaintsApi = {
  list: async (params: ComplaintListParams): Promise<PaginatedResponse<Complaint>> => {
    const { data } = await apiClient.get<ServerPaginatedApiResponse<Complaint>>(
      API_ENDPOINTS.complaints.list,
      { params }
    );
    return {
      data: data.data,
      meta: data.meta.pagination,
    };
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<Complaint>>(
      API_ENDPOINTS.complaints.detail(id)
    );
    return data.data;
  },

  create: async (payload: CreateComplaintPayload) => {
    const { data } = await apiClient.post<ApiSuccessResponse<Complaint>>(
      API_ENDPOINTS.complaints.create,
      payload
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateComplaintPayload) => {
    const { data } = await apiClient.put<ApiSuccessResponse<Complaint>>(
      API_ENDPOINTS.complaints.detail(id),
      payload
    );
    return data.data;
  },
};
