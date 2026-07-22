// REACT
import { useState, createContext, useContext, useEffect } from "react";

// TYPES
import type { User } from "@/types/user";
import type { AuthResponse } from "@/types/auth";
// AUTH
import { getToken, removeToken, saveToken } from "@/auth/token-storage";
import { getCurrentUser } from "@/auth/auth.api";

type AuthContextValue = {
  user: User | null;

  isAuthenticated: boolean;

  login: (response: AuthResponse) => void;

  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      const token = getToken();

      if (!token) {
        return;
      }

      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.log("error from auth ", error);
      }
    };

    restoreSession();
  }, []);

  const isAuthenticated = user !== null;

  const login = (response: AuthResponse) => {
    saveToken(response.token);
    setUser(response.user);
  };
  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
