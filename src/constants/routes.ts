export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: {
    LIST: '/users',
    CREATE: '/users/create',
    EDIT: (id: string) => `/users/${id}/edit`,
  },
  COMPLAINTS: {
    LIST: '/complaints',
    CREATE: '/complaints/create',
    DETAILS: (id: string) => `/complaints/${id}`,
  },
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;
