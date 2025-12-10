'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../validators/loginSchema';
import type { LoginFormData } from '../validators/loginSchema';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
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

/**
 * Login form component - React Hook Form with Field components
 * Handles client-side validation, loading states, and error display
 */
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
    <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-type-electric/20 dark:border-type-electric/30">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-type-electric via-type-psychic to-type-water bg-clip-text text-transparent">
          Welcome Back, Trainer!
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to access your Pokédex
        </CardDescription>
      </CardHeader>

      <CardContent>
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
                  aria-describedby={
                    errors.username ? 'username-error' : undefined
                  }
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
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
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
      </CardContent>

      <CardFooter>
        <div className="w-full p-4 bg-type-water/10 dark:bg-type-water/20 border border-type-water/30 rounded-xl">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            <span className="font-bold text-type-water">Demo Credentials:</span>
            <br />
            <span className="font-mono font-semibold">admin / admin</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
