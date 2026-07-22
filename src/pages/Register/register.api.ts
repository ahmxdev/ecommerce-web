import type { AuthResponse, RegisterRequest } from "@/types/auth";
import { api } from "@/api/api";

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
}
