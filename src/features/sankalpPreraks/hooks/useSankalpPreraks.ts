import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { sankalpPreraksApi } from '@/features/sankalpPreraks/api/sankalpPreraks.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type {
  CreateSankalpPrerakPayload,
  SankalpPrerakListParams,
  TransferSankalpPrerakPayload,
  UpdateSankalpPrerakPayload,
} from '@/types';

export function useSankalpPreraks(params: SankalpPrerakListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.sankalpPreraks.list(params),
    queryFn: () => sankalpPreraksApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useSankalpPrerak(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.sankalpPreraks.detail(id),
    queryFn: () => sankalpPreraksApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useSankalpPrerakProfile(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.sankalpPreraks.profile(id),
    queryFn: () => sankalpPreraksApi.getProfile(id),
    enabled: Boolean(id),
  });
}

export function useCreateSankalpPrerak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSankalpPrerakPayload) => sankalpPreraksApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}

export function useUpdateSankalpPrerak(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSankalpPrerakPayload) => sankalpPreraksApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.profile(id) });
    },
  });
}

export function useDeactivateSankalpPrerak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sankalpPreraksApi.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
    },
  });
}

export function useTransferSankalpPrerak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransferSankalpPrerakPayload }) =>
      sankalpPreraksApi.transfer(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sankalpPreraks.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
    },
  });
}
