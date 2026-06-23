import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type { ApiSuccessResponse } from '@/types';

export interface PostOffice {
  name: string;
  branchType: string;
  deliveryStatus: string;
}

export interface LocationData {
  pincode: string;
  state: string;
  district: string;
  postOffices: PostOffice[];
}

export const locationsApi = {
  getByPincode: async (pincode: string) => {
    const { data } = await apiClient.get<ApiSuccessResponse<LocationData>>(
      API_ENDPOINTS.locations.pincode(pincode)
    );
    return data.data;
  },
};
