import { LoginForm } from './LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-type-electric/20 via-type-psychic/10 to-type-water/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
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
          <LoginForm />
        </CardContent>

        <CardFooter>
          <div className="w-full p-4 bg-type-water/10 dark:bg-type-water/20 border border-type-water/30 rounded-xl">
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold text-type-water">
                Demo Credentials:
              </span>
              <br />
              <span className="font-mono font-semibold">admin / admin</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
