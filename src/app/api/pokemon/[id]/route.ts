import { NextRequest, NextResponse } from 'next/server';
import { PokemonDetails } from '@/features/pokemon-details/types';

interface PokeApiType {
  type: {
    name: string;
  };
}

interface PokeApiAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokeApiFlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Pokemon ID is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch core data and species data in parallel
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    if (!pokemonRes.ok) {
      if (pokemonRes.status === 404) {
        return NextResponse.json(
          { error: 'Pokemon not found' },
          { status: 404 }
        );
      }
      throw new Error('Failed to fetch pokemon data');
    }

    const pokemonData = await pokemonRes.json();
    let description = '';

    if (speciesRes.ok) {
      const speciesData = await speciesRes.json();
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry: PokeApiFlavorText) => entry.language.name === 'en'
      );
      if (englishEntry) {
        description = englishEntry.flavor_text.replace(/[\f\n\r\t]/g, ' ');
      }
    }

    const details: PokemonDetails = {
      id: pokemonData.id,
      name: pokemonData.name,
      types: pokemonData.types.map((t: PokeApiType) => t.type.name),
      weight: pokemonData.weight / 10, // Convert hectograms to kg
      height: pokemonData.height / 10, // Convert decimeters to m
      abilities: pokemonData.abilities
        .filter((a: PokeApiAbility) => !a.is_hidden)
        .map((a: PokeApiAbility) => a.ability.name),
      description,
      stats: pokemonData.stats.map((s: PokeApiStat) => ({
        name: s.stat.name, // e.g. "hp", "attack"
        value: s.base_stat,
      })),
      image:
        pokemonData.sprites.other?.['official-artwork']?.front_default ||
        pokemonData.sprites.front_default ||
        '',
    };

    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
