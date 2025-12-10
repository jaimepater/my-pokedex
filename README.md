This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Generative AI Prompts 

## Login Screen 

I want you to generate the entire Login feature for a Next.js application using the following stack and rules. Follow everything exactly and produce clean, fully typed, production-grade code. The project must use a Feature-Based (domain/feature) folder architecture (i.e. each feature has its own folder with UI, hooks, services, types, validators, tests, etc.).

TECH STACK & REQUIREMENTS

Next.js 15 (App Router)

TypeScript (strict mode)

TailwindCSS

shadcn/ui

Zod for validation

Cookies HttpOnly for authentication

Next.js Middleware for route protection

Next.js Route Handlers (app/api/.../route.ts) for backend API

fetch (not Axios) for login request

Zustand only for UI state, not for authentication

Jest + React Testing Library for frontend tests

Vitest + Supertest for backend tests

ESLint + Prettier formatting

Feature-Based folder architecture is required: each feature folder (e.g., features/auth/) must contain UI components, validators, hooks/services, types and tests for that feature.

GOAL: Build the full Login feature

You must implement the following using Feature-Based structure (place files under src/features/auth/... unless otherwise specified):

REQUIRED FILES & LOCATIONS (feature-based)
src/features/auth/ui/LoginPage.tsx            // page wrapper if needed
src/app/login/page.tsx                        // route that composes the feature UI
src/features/auth/ui/LoginForm.tsx            // Client component form
src/features/auth/hooks/useLogin.ts           // hook handling submit logic
src/features/auth/services/api.ts             // fetch wrapper for /api/login
src/features/auth/validators/loginSchema.ts   // Zod schema and TS type
src/features/auth/types.ts                    // TS types for auth feature
src/features/auth/tests/LoginForm.test.tsx    // frontend tests (RTL + Jest)
src/features/auth/tests/api.login.test.ts     // backend tests (Vitest + Supertest)

app/api/login/route.ts                         // Next.js route handler for POST /api/login
middleware.ts                                  // Next.js middleware protecting routes

FEATURE SPECIFIC REQUIREMENTS

Login page & UI

app/login/page.tsx must render or compose the feature's LoginPage or LoginForm from features/auth/ui.

The form component (LoginForm.tsx) must be a Client Component ("use client"). Use shadcn/ui primitives (Input, Button, Form wrappers) and Tailwind for layout.

Fields: username, password. Labels and accessible attributes required.

Show field-level errors under each input and a global form error area.

Disable submit button while submitting.

Validation

Create a Zod schema in features/auth/validators/loginSchema.ts:

username: string().min(1)

password: string().min(1)

Export schema and TypeScript type.

Hook & Service

features/auth/hooks/useLogin.ts should:

Use fetch to POST /api/login with { username, password }

On success, rely on server-set cookie; do not store token client-side

Return status and error, and a helper to trigger login

features/auth/services/api.ts should contain the low-level fetch wrapper (handle JSON parsing and non-OK responses).

Route Handler

app/api/login/route.ts must:

Accept JSON { username, password }

Validate input with the same Zod schema (server-side)

Check credentials: only admin / admin are valid

On invalid → return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

On valid:

generate a random token (uuid or secure random string)

set cookie named token with these attributes:

HttpOnly: true

Secure: true

SameSite: 'Strict'

Path: '/'

Max-Age: 86400 (24h)

return { success: true }

Use Next.js 15 route handler conventions and NextResponse.

Middleware

middleware.ts must:

Allow static assets, API routes, and public files without redirection

If request pathname starts with /login and cookies().get('token') exists → redirect to /pokemons

If request pathname starts with /pokemons (or other protected routes) and cookie token does NOT exist → redirect to /login

Use NextResponse.redirect() and read cookies using cookies().get('token')

Routing behavior

If user already authenticated (cookie exists) and visits /login → redirect to /pokemons

If user unauthenticated and tries to access /pokemons → redirect to /login

Testing

Frontend test: src/features/auth/tests/LoginForm.test.tsx (RTL + Jest)

Test rendering of fields and submit button

Test client-side Zod validation errors when fields empty

Mock fetch to simulate:

invalid login (401) → assert global error is shown

valid login (200 with cookie header) → assert router.push('/pokemons') called (mock Next router)

Backend test: src/features/auth/tests/api.login.test.ts (Vitest + Supertest)

Test valid credentials return 200 and Set-Cookie header includes:

token=...

HttpOnly

Secure

SameSite=Strict

Path=/

Max-Age=86400

Test invalid credentials return 401

Code quality

All code fully typed (no any)

Use async/await and try/catch properly

Add minimal useful comments

Use Tailwind classes

Use shadcn/ui components

Provide accessible labels and error messages

Architecture requirement

The feature must follow Feature-Based structure. The features/auth folder must include UI, hooks, services, validators, types, and tests for the login feature. The app folder should only compose the feature (render it) and handle route-level concerns.

SAMPLE BEHAVIOR & UX DETAILS (to include in implementation)

The login form should be mobile-first and responsive.

Inputs should have placeholders (e.g., "admin") but not pre-fill credentials.

Show spinner or disabled state on submit.

On server error (non-401), show a generic message: "Something went wrong. Please try again."

On invalid credentials, show: "Invalid username or password."

Ensure focus moves to first invalid input on validation failure (for accessibility).

DELIVERABLE

Generate the full contents of the files listed earlier with production-ready TypeScript code, ready to drop into a Next.js 15 app using the feature-based structure. Include tests as described. Keep code clean, idiomatic and consistent with the stack and architecture rules above.
