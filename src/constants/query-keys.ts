export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    session: () => [...QUERY_KEYS.auth.all, 'session'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...QUERY_KEYS.dashboard.all, 'stats'] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...QUERY_KEYS.users.all, 'list'] as const,
    list: (params: object) => [...QUERY_KEYS.users.lists(), params] as const,
    details: () => [...QUERY_KEYS.users.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.users.details(), id] as const,
  },
  complaints: {
    all: ['complaints'] as const,
    lists: () => [...QUERY_KEYS.complaints.all, 'list'] as const,
    list: (params: object) => [...QUERY_KEYS.complaints.lists(), params] as const,
    details: () => [...QUERY_KEYS.complaints.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.complaints.details(), id] as const,
  },
} as const;
