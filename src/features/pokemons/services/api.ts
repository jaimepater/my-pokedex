import { Pokemon, PokemonListResponse } from '@/lib/shared/types/pokemon';

export async function getPokemons(
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> {
  // Call our internal API instead of external
  const response = await fetch(`/api/pokemons?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }
  return response.json();
}

// export function getPokemonDetails is no longer needed by the client
// but we might keep it if other components reuse it, or delete it.
// Given the plan says "Simplify hooks", we can delete it or leave it unused.
// I will keep getPokemonById as it might be useful later.

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonById(id: number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }
  return response.json();
}
