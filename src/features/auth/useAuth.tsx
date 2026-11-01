import { createContext, useContext, type ReactNode } from "react";
import { apiSend } from "../../api/client";
import type { AuthUser } from "./types";

interface AuthContextValue {
  user: AuthUser | null;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  setAuth,
  clearAuth,
  children,
}: {
  user: AuthUser | null;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
  children: ReactNode;
}) {
  async function logout(): Promise<void> {
    try {
      await apiSend("/auth/logout", "POST");
    } finally {
      clearAuth();
    }
  }

  return (
    <AuthContext.Provider value={{ user, setAuth, clearAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook acoplado ao provider
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return value;
}
