import type { LoginRequest, LoginResponse, LoginErrorResponse } from '../types';

/**
 * Low-level fetch wrapper for login API
 * Handles JSON parsing and error responses
 */
export async function loginApi(
    credentials: LoginRequest
): Promise<LoginResponse> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
        const errorData = data as LoginErrorResponse;
        throw new Error(errorData.error || 'Login failed');
    }

    return data as LoginResponse;
}
