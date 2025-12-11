import { render, screen } from '@testing-library/react';
import { PokemonListPage } from '../ui/PokemonListPage';
import { vi, describe, it, expect } from 'vitest';

// Mock Hooks
vi.mock('../hooks/usePokemons', () => ({
    usePokemons: vi.fn(),
}));

vi.mock('../hooks/usePokemonFilterSort', () => ({
    usePokemonFilterSort: vi.fn((pokemons) => pokemons),
}));

import { usePokemons } from '../hooks/usePokemons';

// Mock Child Components
vi.mock('../ui/PokemonCard', () => ({
    PokemonCard: ({ pokemon }: any) => <div data-testid="pokemon-card">{pokemon.name}</div>,
}));

vi.mock('../ui/PokemonCardSkeleton', () => ({
    PokemonCardSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock('../ui/PokemonSearchBar', () => ({
    PokemonSearchBar: () => <div data-testid="search-bar">Search</div>,
}));

vi.mock('../ui/PokemonSortMenu', () => ({
    PokemonSortMenu: () => <div data-testid="sort-menu">Sort</div>,
}));

describe('PokemonListPage', () => {

    it('should render page layout elements', () => {
        (usePokemons as any).mockReturnValue({
            pokemons: [],
            isLoading: false,
            error: null,
            size: 1,
            setSize: vi.fn(),
        });

        render(<PokemonListPage />);
        expect(screen.getByText('Pokédex')).toBeInTheDocument();
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });

    it('should render list of pokemons via Grid', () => {
        const mockPokemons = [
            { id: 1, name: 'bulbasaur', sprites: { front_default: 'img' } },
            { id: 2, name: 'ivysaur', sprites: { front_default: 'img' } }
        ];

        (usePokemons as any).mockReturnValue({
            pokemons: mockPokemons,
            isLoading: false, // Not initial loading
            isLoadingMore: false,
            error: null,
            size: 1,
            setSize: vi.fn(),
        });

        render(<PokemonListPage />);
        expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2);
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    it('should render loading skeletons when loading more', () => {
        (usePokemons as any).mockReturnValue({
            pokemons: [],
            isLoading: false,
            isLoadingMore: true,
            error: null,
            size: 1,
            setSize: vi.fn(),
        });

        render(<PokemonListPage />);
        // Grid renders skeletons if initial loading or loading more
        expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
    });
});
