import type { AuthResponse, LoginRequest } from "@/types/auth";

import { api } from "@/api/api";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
}
