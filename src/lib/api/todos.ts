import {
  ApiResponse,
  ApiErrorResponse,
  ApiSuccessResponse,
  CreateTodoData,
  Todo,
} from "@/types/commonTypes";
import { api } from "./axios-instance";
import axios from "axios";

export const getTodos = async (): Promise<{
  data?: ApiResponse;
  error?: string;
}> => {
  try {
    const response = await api.get<ApiResponse>("/todo");
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        error: errorResponse?.error || "Failed to fetch todos",
      };
    }
    return { error: "An unexpected error occurred" };
  }
};
export async function createTodo(data: CreateTodoData) {
  try {
    const response = await api.post<ApiSuccessResponse<Todo>>("/todo", data);
    return { data: response.data.todo, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        data: null,
        error:
          errorResponse?.details?.[0]?.message ||
          errorResponse?.error ||
          "Failed to create todo",
      };
    }
    return { data: null, error: "An unexpected error occurred" };
  }
}
export async function updateTodo(
  id: string,
  data: Partial<CreateTodoData & { completed: boolean }>
) {
  try {
    const response = await api.put<ApiSuccessResponse<Todo>>(
      `/todo/${id}`,
      data
    );
    return { data: response.data.todo, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        data: null,
        error: errorResponse?.error || "Failed to update todo",
      };
    }
    return { data: null, error: "An unexpected error occurred" };
  }
}

export async function deleteTodo(id: string) {
  try {
    const response = await api.delete<ApiSuccessResponse<void>>(`/todo/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ApiErrorResponse;
      return {
        data: null,
        error: errorResponse?.error || "Failed to delete todo",
      };
    }
    return { data: null, error: "An unexpected error occurred" };
  }
}
