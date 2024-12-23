import { cookies } from "next/headers";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (token) {
    document.cookie = `auth_token=${token}; path=/`;
  }
  return token;
}

export function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem("token", token);
    document.cookie = `auth_token=${token}; path=/`;
  } else {
    localStorage.removeItem("token");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
