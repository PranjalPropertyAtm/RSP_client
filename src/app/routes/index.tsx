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
const VillageListPage = lazyRoute(
  () => import('@/features/villages/pages/VillageListPage'),
  'VillageListPage'
);
const CreateVillagePage = lazyRoute(
  () => import('@/features/villages/pages/CreateVillagePage'),
  'CreateVillagePage'
);
const EditVillagePage = lazyRoute(
  () => import('@/features/villages/pages/EditVillagePage'),
  'EditVillagePage'
);
const VillageDetailsPage = lazyRoute(
  () => import('@/features/villages/pages/VillageDetailsPage'),
  'VillageDetailsPage'
);
const SankalpPrerakListPage = lazyRoute(
  () => import('@/features/sankalpPreraks/pages/SankalpPrerakListPage'),
  'SankalpPrerakListPage'
);
const CreateSankalpPrerakPage = lazyRoute(
  () => import('@/features/sankalpPreraks/pages/CreateSankalpPrerakPage'),
  'CreateSankalpPrerakPage'
);
const EditSankalpPrerakPage = lazyRoute(
  () => import('@/features/sankalpPreraks/pages/EditSankalpPrerakPage'),
  'EditSankalpPrerakPage'
);
const SankalpPrerakProfilePage = lazyRoute(
  () => import('@/features/sankalpPreraks/pages/SankalpPrerakProfilePage'),
  'SankalpPrerakProfilePage'
);
const CreateWorkLogPage = lazyRoute(
  () => import('@/features/workLogs/pages/CreateWorkLogPage'),
  'CreateWorkLogPage'
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
              { path: ROUTES.VILLAGES.LIST, element: <VillageListPage /> },
              { path: '/villages/:id', element: <VillageDetailsPage /> },
              { path: ROUTES.SANKALP_PRERAKS.LIST, element: <SankalpPrerakListPage /> },
              { path: '/sankalp-preraks/:id', element: <SankalpPrerakProfilePage /> },
              { path: ROUTES.WORK_LOGS.CREATE, element: <CreateWorkLogPage /> },
              {
                element: <RoleGuard allowedRoles={[ROLES.ADMIN]} />,
                children: [
                  { path: ROUTES.VILLAGES.CREATE, element: <CreateVillagePage /> },
                  { path: '/villages/:id/edit', element: <EditVillagePage /> },
                  { path: ROUTES.SANKALP_PRERAKS.CREATE, element: <CreateSankalpPrerakPage /> },
                  { path: '/sankalp-preraks/:id/edit', element: <EditSankalpPrerakPage /> },
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
