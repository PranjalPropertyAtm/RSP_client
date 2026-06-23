import type { Role } from './api.types';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}

export interface UpdateUserPayload {
  fullName?: string;
  email?: string;
  role?: Role;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: Role;
  isActive?: boolean;
}
