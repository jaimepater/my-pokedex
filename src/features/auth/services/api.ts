import { LoginErrorResponse, LoginRequest } from '@/features/auth/types/login';
import { LoginResponse } from '@/lib/shared/types/login';

export async function loginApi(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as LoginErrorResponse;
    throw new Error(errorData.error || 'Login failed');
  }

  return data as LoginResponse;
}
