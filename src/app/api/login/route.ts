import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { loginSchema } from '@/features/auth/validators/loginSchema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation with Zod
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: z.treeifyError(result.error),
        },
        { status: 400 }
      );
    }

    const { username, password } = result.data;

    // Check credentials (hardcoded for demo - replace with database in production)
    if (username !== 'admin' || password !== 'admin') {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate secure token
    const token = randomUUID();

    // Create response with success flag
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set HttpOnly cookie with secure attributes
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
