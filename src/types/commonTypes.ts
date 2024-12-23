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

//   export interface RegisterCredentials extends LoginCredentials {}
