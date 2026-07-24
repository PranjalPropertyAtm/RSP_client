import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { workLogsApi } from '@/features/workLogs/api/workLogs.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { CreateWorkLogPayload, UpdateWorkLogPayload, WorkLogListParams } from '@/types';

export function useWorkLogs(params: WorkLogListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.workLogs.list(params),
    queryFn: () => workLogsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useWorkTimeline(prerakId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.workLogs.timeline(prerakId),
    queryFn: () => workLogsApi.getTimeline(prerakId),
    enabled: Boolean(prerakId),
  });
}

export function useCreateWorkLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWorkLogPayload) => workLogsApi.create(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workLogs.lists() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workLogs.timeline(variables.sankalpPrerakId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sankalpPreraks.profile(variables.sankalpPrerakId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}

export function useUpdateWorkLog(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateWorkLogPayload) => workLogsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workLogs.lists() });
    },
  });
}

export function useDeleteWorkLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workLogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workLogs.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}
