import useSWRInfinite from 'swr/infinite';
import { PokemonListResponse } from '@/lib/shared/types/pokemon';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getKey = (pageIndex: number, previousPageData: PokemonListResponse) => {
  if (previousPageData && !previousPageData.next) return null;
  const offset = pageIndex * 20;
  return `/api/pokemons?offset=${offset}&limit=20`;
};

export function usePokemons() {
  const { data, error, size, setSize, isLoading } =
    useSWRInfinite<PokemonListResponse>(getKey, fetcher, {
      revalidateOnFocus: false,
      keepPreviousData: true,
      persistSize: true,
    });

  const pokemons = data ? data.flatMap((page) => page.results) : [];
  const isError = error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.next === null);

  return {
    pokemons,
    isError,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  };
}
