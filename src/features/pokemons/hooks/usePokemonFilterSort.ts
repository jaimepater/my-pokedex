import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Pokemon } from '../types/pokemon';

export function usePokemonFilterSort(pokemons: Pokemon[]) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const sort = searchParams.get('sort') || 'id_asc';

    const processedPokemons = useMemo(() => {
        let result = [...pokemons];

        // Filter by Search Query
        if (query) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(query) ||
                p.id.toString().includes(query)
            );
        }

        // Sort
        result.sort((a, b) => {
            switch (sort) {
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'id_desc':
                    return b.id - a.id;
                case 'id_asc':
                default:
                    return a.id - b.id;
            }
        });

        return result;
    }, [pokemons, query, sort]);

    return processedPokemons;
}
