import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authApi } from '@/features/auth/api/auth.api';
import { endSession } from '@/lib/session';
import { isTokenExpired } from '@/lib/token';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/constants/routes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
}

export function PublicOnlyRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children ?? <Outlet />;
}

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore.persist.hasHydrated();
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    let cancelled = false;

    async function bootstrapSession() {
      const { accessToken, refreshToken, isAuthenticated, setTokens } = useAuthStore.getState();

      if (!isAuthenticated || !refreshToken) {
        if (!cancelled) setSessionReady(true);
        return;
      }

      if (accessToken && !isTokenExpired(accessToken)) {
        if (!cancelled) setSessionReady(true);
        return;
      }

      try {
        const { accessToken: newAccessToken } = await authApi.refreshSession(refreshToken);
        setTokens(newAccessToken, refreshToken);
      } catch {
        endSession();
      } finally {
        if (!cancelled) setSessionReady(true);
      }
    }

    void bootstrapSession();

    return () => {
      cancelled = true;
    };
  }, [hasHydrated]);

  if (!hasHydrated || !sessionReady) {
    return <LoadingSpinner label="Initializing session..." />;
  }

  return <>{children}</>;
}
