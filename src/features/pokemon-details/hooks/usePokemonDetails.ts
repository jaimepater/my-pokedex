import useSWR from 'swr';
import { getPokemonDetails } from '../services/client';
import { PokemonDetails } from '../types';

export function usePokemonDetails(id: string) {
  const { data, error, isLoading } = useSWR<PokemonDetails>(
    id ? `/api/pokemon/${id}` : null,
    () => getPokemonDetails(id)
  );

  return {
    data,
    isLoading,
    error,
  };
}
