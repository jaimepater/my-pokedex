'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../validators/loginSchema';
import type { LoginFormData } from '../validators/loginSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export function LoginForm() {
  const { login, isLoading, error: globalError } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          {/* Global error message */}
          {globalError && (
            <Alert variant="destructive">
              <AlertDescription>⚠️ {globalError}</AlertDescription>
            </Alert>
          )}

          {/* Username field */}
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              {...register('username')}
              id="username"
              type="text"
              autoComplete="username"
              placeholder="admin"
              disabled={isLoading}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <FieldError id="username-error">
                {errors.username.message}
              </FieldError>
            )}
          </Field>

          {/* Password field */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...register('password')}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isLoading}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <FieldError id="password-error">
                {errors.password.message}
              </FieldError>
            )}
          </Field>

          {/* Submit button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Signing in...
              </>
            ) : (
              <>⚡ Sign In</>
            )}
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
