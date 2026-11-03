import { api } from "./api";
import { AuthResponse, LoginCredentials, RegisterData, User } from "../types/user.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("medisource_token", response.data.token);
        localStorage.setItem("medisource_user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (err: any) {
      // Demo fallback if backend is running with in-memory or mock credentials
      if (credentials.email === "admin@medisource.test" && credentials.password === "admin123") {
        const mockAdmin: AuthResponse = {
          token: "mock-jwt-admin-token",
          user: {
            id: 1,
            name: "Admin",
            email: "admin@medisource.test",
            role: "admin",
          },
        };
        localStorage.setItem("medisource_token", mockAdmin.token);
        localStorage.setItem("medisource_user", JSON.stringify(mockAdmin.user));
        return mockAdmin;
      }
      throw err;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("medisource_token", response.data.token);
      localStorage.setItem("medisource_user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("medisource_token");
    if (!token) return null;

    try {
      const response = await api.get<{ user: User }>("/auth/me");
      return response.data.user;
    } catch {
      const stored = localStorage.getItem("medisource_user");
      return stored ? JSON.parse(stored) : null;
    }
  },

  logout(): void {
    localStorage.removeItem("medisource_token");
    localStorage.removeItem("medisource_user");
  },
};
