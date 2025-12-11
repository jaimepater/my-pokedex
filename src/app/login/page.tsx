import type { Metadata } from 'next';
import { LoginPage } from '@/features/auth/ui/LoginPage';

export const metadata: Metadata = {
  title: 'Login | My Pokédex',
  description: 'Sign in to access your Pokédex',
};

export default function Page() {
  return <LoginPage />;
}
