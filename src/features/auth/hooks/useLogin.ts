'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi } from '../services/api';
import type { LoginRequest, UseLoginReturn } from '../types';

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await loginApi(credentials);
      router.push('/pokemons');
    } catch (err) {
      // Handle different error types
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}
