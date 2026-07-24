export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    changePassword: '/auth/change-password',
    resetPassword: '/auth/reset-password',
  },
  users: {
    list: '/users',
    create: '/users',
    detail: (id: string) => `/users/${id}`,
    activate: (id: string) => `/users/${id}/activate`,
    deactivate: (id: string) => `/users/${id}/deactivate`,
  },
  complaints: {
    list: '/complaints',
    create: '/complaints',
    detail: (id: string) => `/complaints/${id}`,
  },
  villages: {
    list: '/villages',
    create: '/villages',
    detail: (id: string) => `/villages/${id}`,
    details: (id: string) => `/villages/${id}/details`,
    activate: (id: string) => `/villages/${id}/activate`,
    deactivate: (id: string) => `/villages/${id}/deactivate`,
    filterOptions: '/villages/filter-options',
  },
  sankalpPreraks: {
    list: '/sankalp-preraks',
    create: '/sankalp-preraks',
    detail: (id: string) => `/sankalp-preraks/${id}`,
    profile: (id: string) => `/sankalp-preraks/${id}/profile`,
    deactivate: (id: string) => `/sankalp-preraks/${id}/deactivate`,
    transfer: (id: string) => `/sankalp-preraks/${id}/transfer`,
  },
  workLogs: {
    list: '/work-logs',
    create: '/work-logs',
    detail: (id: string) => `/work-logs/${id}`,
    timeline: (prerakId: string) => `/work-logs/timeline/${prerakId}`,
  },
  dashboard: '/dashboard',
  locations: {
    pincode: (pincode: string) => `/locations/pincode/${pincode}`,
  },
  uploads: {
    single: '/uploads/single',
    multiple: '/uploads/multiple',
  },
} as const;
