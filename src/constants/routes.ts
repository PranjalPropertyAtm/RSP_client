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
  VILLAGES: {
    LIST: '/villages',
    CREATE: '/villages/create',
    EDIT: (id: string) => `/villages/${id}/edit`,
    DETAILS: (id: string) => `/villages/${id}`,
    ADD_PRERAK: (id: string) => `/sankalp-preraks/create?villageId=${id}`,
  },
  SANKALP_PRERAKS: {
    LIST: '/sankalp-preraks',
    CREATE: '/sankalp-preraks/create',
    EDIT: (id: string) => `/sankalp-preraks/${id}/edit`,
    PROFILE: (id: string) => `/sankalp-preraks/${id}`,
  },
  WORK_LOGS: {
    CREATE: '/work-logs/create',
  },
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;
