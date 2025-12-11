'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { loginApi } from '../services/api';
import { LoginRequest, UseLoginReturn } from '@/features/auth/types/login';

export function useLogin(): UseLoginReturn {
  const router = useRouter();

  const { trigger, isMutating, error } = useSWRMutation(
    '/api/login',
    async (_url, { arg }: { arg: LoginRequest }) => {
      return loginApi(arg);
    },
    {
      onSuccess: () => {
        router.push('/pokemons');
      },
    }
  );

  return {
    login: async (credentials: LoginRequest) => {
      try {
        await trigger(credentials);
      } catch (e) {
        // Error is handled by SWR state `error` property
      }
    },
    isLoading: isMutating,
    error: error
      ? error instanceof Error
        ? error.message
        : 'Login failed'
      : null,
  };
}
