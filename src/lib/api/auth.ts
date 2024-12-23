import { ApiErrorResponse, TAuthData } from "@/types/commonTypes";
import axios from "axios";
import { api } from "./axios-instance";

export async function register(credentials: TAuthData) {
  try {
    const response = await api.post("/auth/register", credentials);
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        data: null,
        error: errorResponse?.error || "Registration failed",
        details: errorResponse?.details || [],
      };
    }
    return { data: null, error: "An unexpected error occurred" };
  }
}
export async function login(credentials: TAuthData) {
  try {
    const response = await api.post("/auth/login", credentials);
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        data: null,
        error: errorResponse?.error || "Registration failed",
        details: errorResponse?.details || [],
      };
    }
    return { data: null, error: "An unexpected error occurred" };
  }
}
