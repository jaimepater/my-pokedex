import { render, screen } from '@testing-library/react';
import { PokemonDetailsView } from '../ui/PokemonDetailsView';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useSWR from 'swr';

// Mock SWR
vi.mock('swr', () => ({
    default: vi.fn(),
}));

// Mock child components to simplify testing (shallow render equivalent)
vi.mock('../ui/PokemonDetailsHeader', () => ({
    PokemonDetailsHeader: ({ name }: any) => <div data-testid="header">{name}</div>,
}));
vi.mock('../ui/PokemonDetailsBadges', () => ({
    PokemonDetailsBadges: ({ types }: any) => <div data-testid="badges">{types.join(',')}</div>,
}));
vi.mock('../ui/PokemonDetailsAbout', () => ({
    PokemonDetailsAbout: () => <div data-testid="about">About</div>,
}));
vi.mock('../ui/PokemonDetailsDescription', () => ({
    PokemonDetailsDescription: ({ description }: any) => <div data-testid="description">{description}</div>,
}));
vi.mock('../ui/PokemonDetailsStats', () => ({
    PokemonDetailsStats: () => <div data-testid="stats">Stats</div>,
}));
vi.mock('../ui/PokemonDetailsSkeleton', () => ({
    PokemonDetailsSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

describe('PokemonDetailsView', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render skeleton when loading', () => {
        (useSWR as any).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
        });

        render(<PokemonDetailsView id="1" />);
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('should render error alert when error occurs', () => {
        (useSWR as any).mockReturnValue({
            data: undefined,
            error: new Error('Failed to fetch'),
            isLoading: false,
        });

        render(<PokemonDetailsView id="1" />);
        expect(screen.getByText(/Failed to load Pok.mon details/i)).toBeInTheDocument();
    });

    it('should render pokemon details when data is available', () => {
        const mockData = {
            id: 1,
            name: 'bulbasaur',
            types: ['grass', 'poison'],
            weight: 6.9,
            height: 0.7,
            abilities: ['overgrow'],
            description: 'A seed.',
            stats: [],
            image: 'img.png',
        };

        (useSWR as any).mockReturnValue({
            data: mockData,
            error: undefined,
            isLoading: false,
        });

        render(<PokemonDetailsView id="1" />);

        expect(screen.getByTestId('header')).toHaveTextContent('bulbasaur');
        expect(screen.getByTestId('badges')).toHaveTextContent('grass,poison');
        expect(screen.getByTestId('about')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toHaveTextContent('A seed.');
        expect(screen.getByTestId('stats')).toBeInTheDocument();
    });
});
