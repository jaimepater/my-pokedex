import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

/**
 * Backend integration tests for POST /api/login
 * Tests authentication, cookie handling, and validation
 */

// Initialize Next.js app for testing
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3001; // Use different port for testing

let app: any;
let server: any;
let handle: any;

beforeAll(async () => {
    // Create Next.js app instance
    app = next({ dev, hostname, port });
    handle = app.getRequestHandler();

    await app.prepare();

    // Create HTTP server
    server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url!, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    });

    // Start server
    await new Promise<void>((resolve) => {
        server.listen(port, () => {
            console.log(`> Test server ready on http://${hostname}:${port}`);
            resolve();
        });
    });
});

afterAll(async () => {
    // Close server and app
    await new Promise<void>((resolve, reject) => {
        server.close((err: Error) => {
            if (err) reject(err);
            else resolve();
        });
    });
    await app.close();
});

describe('POST /api/login', () => {
    describe('Valid Credentials', () => {
        it('should return 200 and set HttpOnly cookie with valid credentials', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual({ success: true });

            // Check Set-Cookie header exists
            const setCookieHeader = response.headers['set-cookie'];
            expect(setCookieHeader).toBeDefined();
            expect(Array.isArray(setCookieHeader)).toBe(true);

            // Get the token cookie
            const tokenCookie = setCookieHeader.find((cookie: string) =>
                cookie.startsWith('token=')
            );
            expect(tokenCookie).toBeDefined();

            // Verify cookie attributes
            expect(tokenCookie).toContain('HttpOnly');
            expect(tokenCookie).toContain('Secure');
            expect(tokenCookie).toContain('SameSite=Strict');
            expect(tokenCookie).toContain('Path=/');
            expect(tokenCookie).toContain('Max-Age=86400');
        });

        it('should generate a unique token for each login', async () => {
            const response1 = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const response2 = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const cookie1 = response1.headers['set-cookie'][0];
            const cookie2 = response2.headers['set-cookie'][0];

            // Extract token values
            const token1 = cookie1.split(';')[0].split('=')[1];
            const token2 = cookie2.split(';')[0].split('=')[1];

            expect(token1).not.toBe(token2);
        });

        it('should set cookie with 24-hour expiration', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const setCookieHeader = response.headers['set-cookie'];
            const tokenCookie = setCookieHeader.find((cookie: string) =>
                cookie.startsWith('token=')
            );

            // 86400 seconds = 24 hours
            expect(tokenCookie).toContain('Max-Age=86400');
        });
    });

    describe('Invalid Credentials', () => {
        it('should return 401 with wrong username', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'wrong', password: 'admin' })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual({
                error: 'Invalid username or password',
            });

            // Should not set cookie
            expect(response.headers['set-cookie']).toBeUndefined();
        });

        it('should return 401 with wrong password', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'wrong' })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual({
                error: 'Invalid username or password',
            });

            // Should not set cookie
            expect(response.headers['set-cookie']).toBeUndefined();
        });

        it('should return 401 with both credentials wrong', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'wrong', password: 'wrong' })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual({
                error: 'Invalid username or password',
            });
        });
    });

    describe('Validation', () => {
        it('should return 400 when username is missing', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ password: 'admin' })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.error).toBe('Validation failed');
            expect(response.body.details).toBeDefined();
            expect(response.body.details.username).toBeDefined();
        });

        it('should return 400 when password is missing', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin' })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.error).toBe('Validation failed');
            expect(response.body.details).toBeDefined();
            expect(response.body.details.password).toBeDefined();
        });

        it('should return 400 when both fields are missing', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.error).toBe('Validation failed');
            expect(response.body.details).toBeDefined();
            expect(response.body.details.username).toBeDefined();
            expect(response.body.details.password).toBeDefined();
        });

        it('should return 400 when username is empty string', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: '', password: 'admin' })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.error).toBe('Validation failed');
            expect(response.body.details.username).toBeDefined();
        });

        it('should return 400 when password is empty string', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: '' })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body.error).toBe('Validation failed');
            expect(response.body.details.password).toBeDefined();
        });
    });

    describe('Cookie Security Attributes', () => {
        it('should set HttpOnly flag to prevent JavaScript access', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const tokenCookie = response.headers['set-cookie'].find((cookie: string) =>
                cookie.startsWith('token=')
            );

            expect(tokenCookie).toContain('HttpOnly');
        });

        it('should set Secure flag for HTTPS only', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const tokenCookie = response.headers['set-cookie'].find((cookie: string) =>
                cookie.startsWith('token=')
            );

            expect(tokenCookie).toContain('Secure');
        });

        it('should set SameSite=Strict to prevent CSRF', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const tokenCookie = response.headers['set-cookie'].find((cookie: string) =>
                cookie.startsWith('token=')
            );

            expect(tokenCookie).toContain('SameSite=Strict');
        });

        it('should set Path=/ for site-wide access', async () => {
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(200);

            const tokenCookie = response.headers['set-cookie'].find((cookie: string) =>
                cookie.startsWith('token=')
            );

            expect(tokenCookie).toContain('Path=/');
        });
    });

    describe('Error Handling', () => {
        it('should handle malformed JSON gracefully', async () => {
            const response = await request(server)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send('{ invalid json }')
                .expect(500);

            expect(response.body.error).toBeDefined();
        });

        it('should return proper content-type header', async () => {
            await request(server)
                .post('/api/login')
                .send({ username: 'admin', password: 'admin' })
                .expect('Content-Type', /json/);
        });
    });
});
