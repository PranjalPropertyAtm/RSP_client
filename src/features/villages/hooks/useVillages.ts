import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { villagesApi } from '@/features/villages/api/villages.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { CreateVillagePayload, UpdateVillagePayload, VillageListParams } from '@/types';

export function useVillages(params: VillageListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.villages.list(params),
    queryFn: () => villagesApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useVillage(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.villages.detail(id),
    queryFn: () => villagesApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useVillageDetails(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.villages.detail(id), 'details'],
    queryFn: () => villagesApi.getDetails(id),
    enabled: Boolean(id),
  });
}

export function useVillageFilterOptions() {
  return useQuery({
    queryKey: QUERY_KEYS.villages.filterOptions(),
    queryFn: () => villagesApi.getFilterOptions(),
  });
}

export function useCreateVillage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVillagePayload) => villagesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.filterOptions() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}

export function useUpdateVillage(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateVillagePayload) => villagesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.filterOptions() });
    },
  });
}

export function useDeleteVillage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => villagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.stats() });
    },
  });
}

export function useActivateVillage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => villagesApi.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
    },
  });
}

export function useDeactivateVillage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => villagesApi.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.villages.lists() });
    },
  });
}
