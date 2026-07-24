import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type {
  ApiSuccessResponse,
  CreateWorkLogPayload,
  PaginatedResponse,
  ServerPaginatedApiResponse,
  UpdateWorkLogPayload,
  WorkLog,
  WorkLogListParams,
} from '@/types';

export const workLogsApi = {
  list: async (params: WorkLogListParams): Promise<PaginatedResponse<WorkLog>> => {
    const { data } = await apiClient.get<ServerPaginatedApiResponse<WorkLog>>(
      API_ENDPOINTS.workLogs.list,
      { params }
    );
    return { data: data.data, meta: data.meta.pagination };
  },

  getTimeline: async (prerakId: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<WorkLog[]>>(
      API_ENDPOINTS.workLogs.timeline(prerakId)
    );
    return data.data;
  },

  create: async (payload: CreateWorkLogPayload) => {
    const { data } = await apiClient.post<ApiSuccessResponse<WorkLog>>(
      API_ENDPOINTS.workLogs.create,
      payload
    );
    return data.data;
  },

  update: async (id: string, payload: UpdateWorkLogPayload) => {
    const { data } = await apiClient.put<ApiSuccessResponse<WorkLog>>(
      API_ENDPOINTS.workLogs.detail(id),
      payload
    );
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.workLogs.detail(id));
  },
};
