export type UserRole = "customer" | "admin" | "CUSTOMER" | "ADMIN";

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
  organization?: string;
  phone?: string;
}
