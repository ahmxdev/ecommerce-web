import { api } from "@/api/api";
import type { User } from "@/types/user";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/me");

  return response.data?.user;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}
