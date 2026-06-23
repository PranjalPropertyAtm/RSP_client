import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { complaintsApi } from '@/features/complaints/api/complaints.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { ComplaintListParams, CreateComplaintPayload, UpdateComplaintPayload } from '@/types';

export function useComplaints(params: ComplaintListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.complaints.list(params),
    queryFn: () => complaintsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useComplaint(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.complaints.detail(id),
    queryFn: () => complaintsApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateComplaint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateComplaintPayload) => complaintsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.complaints.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}

export function useUpdateComplaint(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateComplaintPayload) => complaintsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.complaints.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.complaints.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}
