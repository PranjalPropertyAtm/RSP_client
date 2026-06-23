import { queryClient } from '@/lib/query-client';
import { useAuthStore } from '@/stores/auth.store';

export function clearSessionCache() {
  queryClient.clear();
}

export function endSession() {
  clearSessionCache();
  useAuthStore.getState().logout();
}
