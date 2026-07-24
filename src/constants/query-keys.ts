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
  villages: {
    all: ['villages'] as const,
    lists: () => [...QUERY_KEYS.villages.all, 'list'] as const,
    list: (params: object) => [...QUERY_KEYS.villages.lists(), params] as const,
    details: () => [...QUERY_KEYS.villages.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.villages.details(), id] as const,
    filterOptions: () => [...QUERY_KEYS.villages.all, 'filter-options'] as const,
  },
  sankalpPreraks: {
    all: ['sankalp-preraks'] as const,
    lists: () => [...QUERY_KEYS.sankalpPreraks.all, 'list'] as const,
    list: (params: object) => [...QUERY_KEYS.sankalpPreraks.lists(), params] as const,
    details: () => [...QUERY_KEYS.sankalpPreraks.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.sankalpPreraks.details(), id] as const,
    profile: (id: string) => [...QUERY_KEYS.sankalpPreraks.all, 'profile', id] as const,
  },
  workLogs: {
    all: ['work-logs'] as const,
    lists: () => [...QUERY_KEYS.workLogs.all, 'list'] as const,
    list: (params: object) => [...QUERY_KEYS.workLogs.lists(), params] as const,
    timeline: (prerakId: string) => [...QUERY_KEYS.workLogs.all, 'timeline', prerakId] as const,
  },
} as const;
