'use client';

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../validators/loginSchema';
import type { LoginFormData } from '../validators/loginSchema';

/**
 * Login form component with shadcn/ui primitives
 * Handles client-side validation, loading states, and error display
 */
export function LoginForm() {
    const { login, isLoading, error: globalError } = useLogin();
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const [fieldErrors, setFieldErrors] = useState<
        Partial<Record<keyof LoginFormData, string>>
    >({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});

        // Client-side validation with Zod
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const errors: Partial<Record<keyof LoginFormData, string>> = {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    errors[issue.path[0] as keyof LoginFormData] = issue.message;
                }
            });
            setFieldErrors(errors);

            // Focus on first invalid input for accessibility
            const firstErrorField = Object.keys(errors)[0] as keyof LoginFormData;
            if (firstErrorField) {
                document.getElementById(firstErrorField)?.focus();
            }
            return;
        }

        await login(formData);
    };

    const handleChange = (field: keyof LoginFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear field error when user starts typing
        if (fieldErrors[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Welcome Back
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Global error message */}
                    {globalError && (
                        <div
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-md text-sm"
                            role="alert"
                            aria-live="polite"
                        >
                            {globalError}
                        </div>
                    )}

                    {/* Username field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="admin"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!fieldErrors.username}
                            aria-describedby={fieldErrors.username ? 'username-error' : undefined}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${fieldErrors.username
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {fieldErrors.username && (
                            <p
                                id="username-error"
                                className="text-sm text-red-600 dark:text-red-400"
                                role="alert"
                            >
                                {fieldErrors.username}
                            </p>
                        )}
                    </div>

                    {/* Password field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            disabled={isLoading}
                            aria-invalid={!!fieldErrors.password}
                            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${fieldErrors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {fieldErrors.password && (
                            <p
                                id="password-error"
                                className="text-sm text-red-600 dark:text-red-400"
                                role="alert"
                            >
                                {fieldErrors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Demo credentials hint */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Demo credentials: <span className="font-mono font-semibold">admin / admin</span>
                </p>
            </div>
        </div>
    );
}
