export type TAuthData = {
  email: string;
  password: string;
};
export interface AuthResponse {
  token: string;
  user: {
    email: string;
  };
}
export interface ApiErrorResponse {
  status?: boolean;
  error: string;
  details?: { message: string }[] | null;
}

export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

export interface ApiResponse {
  status: boolean;
  todo: Todo[];
  message: string;
}

export interface ApiSuccessResponse<T> {
    status: true;
    message: string;
    todo?: T;
  }
  export interface CreateTodoData {
    title: string;
    description: string;
  }