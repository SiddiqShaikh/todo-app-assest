"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, setStoredToken } from "@/lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getStoredToken();
    setToken(storedToken);
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    setStoredToken(newToken);
    setToken(newToken);
    router.replace("/");
  };

  const logout = () => {
    setStoredToken(null);
    setToken(null);
    router.replace("/login");
  };

  return { token, loading, login, logout };
}
