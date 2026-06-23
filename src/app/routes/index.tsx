import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/common/ProtectedRoute';
import { RoleGuard } from '@/components/common/RoleGuard';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { lazyRoute } from '@/lib/lazy-route';

const LoginPage = lazyRoute(() => import('@/features/auth/pages/LoginPage'), 'LoginPage');
const DashboardHomePage = lazyRoute(
  () => import('@/features/dashboard/pages/DashboardHomePage'),
  'DashboardHomePage'
);
const UserListPage = lazyRoute(() => import('@/features/users/pages/UserListPage'), 'UserListPage');
const CreateUserPage = lazyRoute(
  () => import('@/features/users/pages/CreateUserPage'),
  'CreateUserPage'
);
const EditUserPage = lazyRoute(() => import('@/features/users/pages/EditUserPage'), 'EditUserPage');
const ComplaintListPage = lazyRoute(
  () => import('@/features/complaints/pages/ComplaintListPage'),
  'ComplaintListPage'
);
const ComplaintDetailsPage = lazyRoute(
  () => import('@/features/complaints/pages/ComplaintDetailsPage'),
  'ComplaintDetailsPage'
);
const CreateComplaintPage = lazyRoute(
  () => import('@/features/complaints/pages/CreateComplaintPage'),
  'CreateComplaintPage'
);
const NotFoundPage = lazyRoute(() => import('@/pages/errors/NotFoundPage'), 'NotFoundPage');
const UnauthorizedPage = lazyRoute(
  () => import('@/pages/errors/UnauthorizedPage'),
  'UnauthorizedPage'
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: ROUTES.DASHBOARD, element: <DashboardHomePage /> },
              {
                path: ROUTES.COMPLAINTS.LIST,
                element: <ComplaintListPage />,
              },
              {
                path: ROUTES.COMPLAINTS.CREATE,
                element: <CreateComplaintPage />,
              },
              {
                path: '/complaints/:id',
                element: <ComplaintDetailsPage />,
              },
              {
                element: <RoleGuard allowedRoles={[ROLES.ADMIN]} />,
                children: [
                  { path: ROUTES.USERS.LIST, element: <UserListPage /> },
                  { path: ROUTES.USERS.CREATE, element: <CreateUserPage /> },
                  { path: '/users/:id/edit', element: <EditUserPage /> },
                ],
              },
            ],
          },
          { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> },
        ],
      },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
