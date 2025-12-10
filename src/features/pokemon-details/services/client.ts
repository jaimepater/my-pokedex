import { PokemonDetails } from '../types';

export const getPokemonDetails = async (
  id: string
): Promise<PokemonDetails> => {
  const response = await fetch(`/api/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Failed to load Pokémon');
  }
  return response.json();
};
