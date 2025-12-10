/**
 * Authentication feature type definitions
 */

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
}

export interface LoginErrorResponse {
  error: string;
  details?: Record<string, string[]>;
}

export interface UseLoginReturn {
  login: (credentials: LoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
