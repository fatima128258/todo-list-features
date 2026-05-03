import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, setToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const t = localStorage.getItem("token");
    if (!t) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await api("/api/auth/me");
      setUser(data.user);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Apply login/register API response { token, user } */
  const completeAuth = useCallback((data) => {
    if (data?.token) setToken(data.token);
    if (data?.user) setUser(data.user);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    completeAuth(data);
    return data;
  }, [completeAuth]);

  const register = useCallback(
    async (name, email, password) => {
      const data = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      completeAuth(data);
      return data;
    },
    [completeAuth]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refresh,
      completeAuth,
    }),
    [user, loading, login, register, logout, refresh, completeAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
