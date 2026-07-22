import { api } from "@/api/api";
import type { User } from "@/types/user";

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/me");

  return response.data?.user;
}
