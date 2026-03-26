import api from "@/lib/api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  document: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  document: string;
  password: string; 
}

export const authService = {
  // POST /api/auth/login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", { email, password });
    return response.data;
  },

  // POST /api/users/register
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await api.post<User>("/users/register", data);
    return response.data;
  },

  // GET /api/users/me (Usa o token do interceptor)
  getMe: async (): Promise<User> => {
    const response = await api.get<User>("/users/me");
    return response.data;
  }
};