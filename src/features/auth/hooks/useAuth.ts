import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '@/features/auth/api/auth.api';
import { clearSessionCache, endSession } from '@/lib/session';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/constants/routes';
import type { LoginFormValues } from '@/features/auth/schemas/login.schema';

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, setAuth, refreshToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormValues) => authApi.login(credentials),
    onSuccess: (data) => {
      clearSessionCache();
      setAuth(data.user, data.tokens.accessToken, data.tokens.refreshToken);
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      navigate(from ?? ROUTES.DASHBOARD, { replace: true });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      endSession();
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
  };
}
