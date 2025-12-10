import type { Metadata } from 'next';
import { LoginPage } from '@/features/auth/ui/LoginPage';

export const metadata: Metadata = {
  title: 'Login | My Pokédex',
  description: 'Sign in to access your Pokédex',
};

/**
 * Next.js 15 App Router page for login
 * Renders the LoginPage component from the auth feature
 */
export default function Page() {
  return <LoginPage />;
}
