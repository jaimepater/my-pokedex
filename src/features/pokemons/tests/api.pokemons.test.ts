// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

/**
 * Backend integration tests for GET /api/pokemons
 */

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 0; // Use random available port

let app: any;
let server: any;
let handle: any;

let fetchSpy: any;

beforeAll(async () => {
    fetchSpy = vi.spyOn(global, 'fetch');
    fetchSpy.mockImplementation(async (url: any) => {
        const urlString = url.toString();

        // Mock List Data
        if (urlString.includes('pokeapi.co/api/v2/pokemon?')) {
            return {
                ok: true,
                json: async () => ({
                    count: 10,
                    next: null,
                    previous: null,
                    results: [
                        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                    ],
                }),
            } as Response;
        }

        // Mock Detail Data (Bulbasaur)
        if (urlString.includes('pokeapi.co/api/v2/pokemon/1/')) {
            return {
                ok: true,
                json: async () => ({
                    id: 1,
                    name: 'bulbasaur',
                    sprites: {
                        front_default: 'front.png',
                        other: {
                            'official-artwork': { front_default: 'artwork-1.png' },
                        },
                    },
                }),
            } as Response;
        }

        // Mock Detail Data (Ivysaur)
        if (urlString.includes('pokeapi.co/api/v2/pokemon/2/')) {
            return {
                ok: true,
                json: async () => ({
                    id: 2,
                    name: 'ivysaur',
                    sprites: {
                        front_default: 'front.png',
                        other: {
                            'official-artwork': { front_default: 'artwork-2.png' },
                        },
                    },
                }),
            } as Response;
        }

        return { ok: false, status: 500 } as Response;
    });

    app = next({ dev, hostname, port });
    handle = app.getRequestHandler();
    await app.prepare();

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

    await new Promise<void>((resolve) => {
        server.listen(port, () => {
            resolve();
        });
    });
}, 30000);

afterAll(async () => {
    vi.restoreAllMocks();
    await new Promise<void>((resolve, reject) => {
        server.close((err: Error) => {
            if (err) reject(err);
            else resolve();
        });
    });
    await app.close();
});

describe('GET /api/pokemons', () => {
    it('should return a list of pokemons with default pagination', async () => {
        const response = await request(server)
            .get('/api/pokemons')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('results');
        expect(response.body.results).toHaveLength(2);

        const firstPokemon = response.body.results[0];
        expect(firstPokemon.id).toBe(1);
        expect(firstPokemon.name).toBe('bulbasaur');
        expect(firstPokemon.sprites.other['official-artwork'].front_default).toBe(
            'artwork-1.png'
        );
    });

    it('should accept limit and offset parameters', async () => {
        // Note: We are mocking the fetch response to always return the same 2 items for this test simplicity.
        // Real implementation would pass params to PokeAPI.
        await request(server).get('/api/pokemons?limit=5&offset=10').expect(200);

        // Verify our spy was called with correct params
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('limit=5'),
            expect.anything()
        );
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('offset=10'),
            expect.anything()
        );
    });

    it('should handle API errors gracefully', async () => {
        // Mock failure
        fetchSpy.mockImplementationOnce(async () => ({
            ok: false,
            status: 500,
        }));

        await request(server).get('/api/pokemons').expect(500);
    });
});
