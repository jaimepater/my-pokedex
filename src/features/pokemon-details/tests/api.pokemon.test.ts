// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

/**
 * Backend integration tests for GET /api/pokemon/[id]
 */

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 0; // Use random available port

let app: any;
let server: any;
let handle: any;

beforeAll(async () => {
  vi.spyOn(global, 'fetch').mockImplementation(async (url) => {
    const urlString = url.toString();

    // Mock Core Data
    if (urlString.includes('pokeapi.co/api/v2/pokemon/1')) {
      return {
        ok: true,
        json: async () => ({
          id: 1,
          name: 'bulbasaur',
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
          weight: 69,
          height: 7,
          abilities: [{ ability: { name: 'overgrow' }, is_hidden: false }],
          stats: [
            { base_stat: 45, stat: { name: 'hp' } },
            { base_stat: 49, stat: { name: 'attack' } },
          ],
          sprites: {
            front_default: 'front.png',
            other: { 'official-artwork': { front_default: 'artwork.png' } },
          },
        }),
      } as Response;
    }

    // Mock Species Data
    if (urlString.includes('pokeapi.co/api/v2/pokemon-species/1')) {
      return {
        ok: true,
        json: async () => ({
          flavor_text_entries: [
            {
              flavor_text: 'A strange seed was\nplanted on its\nback at birth.',
              language: { name: 'en' },
            },
          ],
        }),
      } as Response;
    }

    // Mock 404
    if (urlString.includes('pokeapi.co/api/v2/pokemon/999')) {
      return {
        ok: false,
        status: 404,
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

describe('GET /api/pokemon/[id]', () => {
  it('should return formatted pokemon details for valid ID', async () => {
    const response = await request(server)
      .get('/api/pokemon/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
      weight: 6.9, // 69 / 10
      height: 0.7, // 7 / 10
      abilities: ['overgrow'],
      description: 'A strange seed was planted on its back at birth.',
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
      ],
      image: 'artwork.png',
    });
  });

  it('should return 404 for non-existent pokemon', async () => {
    // Need to handle the internal fetch 404 which causes route to return 404
    const response = await request(server)
      .get('/api/pokemon/999')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual({ error: 'Pokemon not found' });
  });
});
