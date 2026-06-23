import type { Role } from './api.types';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
