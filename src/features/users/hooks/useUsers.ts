import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { usersApi } from '@/features/users/api/users.api';
import { authApi } from '@/features/auth/api/auth.api';
import { QUERY_KEYS } from '@/constants/query-keys';
import type { CreateUserPayload, UpdateUserPayload, UserListParams } from '@/types';

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => usersApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.users.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => usersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() });
    },
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => usersApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.detail(id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() });
    },
  });
}

export function useResetUserPassword(userId: string) {
  return useMutation({
    mutationFn: (newPassword: string) => authApi.resetPassword({ userId, newPassword }),
  });
}
