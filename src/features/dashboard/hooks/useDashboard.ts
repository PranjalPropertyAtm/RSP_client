import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/features/dashboard/api/dashboard.api';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.stats(),
    queryFn: dashboardApi.getStats,
  });
}
