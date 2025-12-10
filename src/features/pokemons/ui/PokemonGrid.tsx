'use client';

import { usePokemons } from '../hooks/usePokemons';
import { PokemonCard } from './PokemonCard';
import { PokemonCardSkeleton } from '../components/PokemonCardSkeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { usePokemonFilterSort } from '../hooks/usePokemonFilterSort';

export function PokemonGrid() {
  const { pokemons: rawPokemons, isError, isLoadingMore, isReachingEnd, size, setSize } =
    usePokemons();

  const pokemons = usePokemonFilterSort(rawPokemons);

  // Initial loading state (first page)
  const isInitialLoading = isLoadingMore && rawPokemons.length === 0;

  if (isError) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Pokémon data. Please check your connection and try
            again.
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (pokemons.length === 0 && !isInitialLoading && !isLoadingMore && rawPokemons.length > 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">No Pokémon found.</p>
        <p className="text-sm">Try adjusting your search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}

        {(isInitialLoading || isLoadingMore) &&
          Array.from({ length: 10 }).map((_, i) => (
            <PokemonCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {!isReachingEnd && !isInitialLoading && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore}
            size="lg"
            variant="outline"
            className="min-w-[200px]"
          >
            {isLoadingMore ? 'Loading...' : 'Load More Pokémon'}
          </Button>
        </div>
      )}
    </div>
  );
}
