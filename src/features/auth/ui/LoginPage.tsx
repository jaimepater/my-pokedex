import { LoginForm } from './LoginForm';

/**
 * Login page wrapper component
 * Pokémon-themed layout with centered card
 */
export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-type-electric/20 via-type-psychic/10 to-type-water/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <LoginForm />
    </div>
  );
}
