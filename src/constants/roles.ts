import type { Role } from '@/types';

export const ROLES = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
} as const satisfies Record<string, Role>;

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Administrator',
  EMPLOYEE: 'Employee',
};
