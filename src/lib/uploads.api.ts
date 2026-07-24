import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type { ApiSuccessResponse } from '@/types';

interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadsApi = {
  uploadSingle: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<ApiSuccessResponse<UploadResult>>(
      API_ENDPOINTS.uploads.single,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data;
  },

  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const { data } = await apiClient.post<ApiSuccessResponse<UploadResult[]>>(
      API_ENDPOINTS.uploads.multiple,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data;
  },
};
