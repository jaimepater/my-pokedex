import { z } from 'zod';

/**
 * Zod schema for login form validation
 * Used for both client-side and server-side validation
 */
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * TypeScript type inferred from the Zod schema
 */
export type LoginFormData = z.infer<typeof loginSchema>;
