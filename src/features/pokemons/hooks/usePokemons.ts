import useSWRInfinite from 'swr/infinite';
import { getPokemons } from '../services/api';
import { Pokemon } from '../types/pokemon';

const PAGE_LIMIT = 20;

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.next) return null; // reached the end
  return `pokemon-page-${pageIndex}`; // SWR key
};

export function usePokemons() {
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    async (key) => {
      const pageIndex = parseInt(key.split('-')[2]);
      const offset = pageIndex * PAGE_LIMIT;
      return await getPokemons(offset, PAGE_LIMIT);
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      persistSize: true,
    }
  );

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
