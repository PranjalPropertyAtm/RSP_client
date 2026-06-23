import { Navigate, Outlet } from 'react-router-dom';
import type { Role } from '@/types';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth.store';

interface RoleGuardProps {
  allowedRoles: Role[];
  children?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children ?? <Outlet />;
}
