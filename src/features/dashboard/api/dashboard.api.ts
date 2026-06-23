import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import type { ApiSuccessResponse } from '@/types';

export interface UserComplaintStat {
  userId: string;
  fullName: string;
  email: string;
  isActive: boolean;
  totalComplaints: number;
  lastComplaintAt: string | null;
  firstComplaintAt: string | null;
}

export interface RecentComplaintActivity {
  id: string;
  caseId: string;
  complainantName: string;
  submittedDate: string;
  filedBy: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface DashboardStats {
  totalComplaints: number;
  todayComplaints: number;
  monthComplaints: number;
  activeUsers?: number;
  userComplaintStats?: UserComplaintStat[];
  recentComplaints?: RecentComplaintActivity[];
}

export const dashboardApi = {
  getStats: async () => {
    const { data } = await apiClient.get<ApiSuccessResponse<DashboardStats>>(API_ENDPOINTS.dashboard);
    return data.data;
  },
};
