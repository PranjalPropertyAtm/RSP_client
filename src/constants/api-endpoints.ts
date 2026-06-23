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
  dashboard: '/dashboard',
  locations: {
    pincode: (pincode: string) => `/locations/pincode/${pincode}`,
  },
  uploads: {
    single: '/uploads/single',
    multiple: '/uploads/multiple',
  },
} as const;
