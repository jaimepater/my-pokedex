# Login Feature - README

This directory contains the complete Login feature implementation using feature-based architecture.

## Structure

```
src/features/auth/
├── hooks/
│   └── useLogin.ts          # React hook for login logic
├── services/
│   └── api.ts               # Fetch wrapper for API calls
├── tests/
│   ├── LoginForm.test.tsx   # Frontend tests (Jest + RTL)
│   └── api.login.test.ts    # Backend tests (Vitest + Supertest)
├── types.ts                 # TypeScript type definitions
├── ui/
│   ├── LoginForm.tsx        # Login form component
│   └── LoginPage.tsx        # Login page wrapper
└── validators/
    └── loginSchema.ts       # Zod validation schema
```

## Features

- ✅ Feature-based architecture
- ✅ TypeScript strict mode
- ✅ Client and server-side validation with Zod
- ✅ HttpOnly cookie authentication
- ✅ Route protection with Next.js middleware
- ✅ Accessible form with ARIA attributes
- ✅ Loading states and error handling
- ✅ Responsive, mobile-first design
- ✅ Comprehensive test coverage

## Usage

### Demo Credentials
- Username: `admin`
- Password: `admin`

### Running Tests

```bash
# Frontend tests
npm run test

# Backend tests
npm run test:api

# All tests
npm run test:all
```

## Authentication Flow

1. User submits login form
2. Client-side Zod validation
3. POST request to `/api/login`
4. Server-side validation
5. Credential verification
6. HttpOnly cookie set on success
7. Redirect to `/pokemons`

## Route Protection

The middleware protects routes based on authentication status:
- `/login` → redirects to `/pokemons` if authenticated
- `/pokemons` → redirects to `/login` if not authenticated
