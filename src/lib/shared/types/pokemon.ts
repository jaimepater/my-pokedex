export interface PokeApiType {
  type: {
    name: string;
  };
}

export interface PokeApiAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeApiFlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[]; // e.g., ["grass", "poison"]
  weight: number; // in kg
  height: number; // in m
  abilities: string[];
  description: string;
  stats: PokemonStat[];
  image: string;
}

export interface PokemonSprite {
  front_default: string | null;
  other?: {
    'official-artwork': {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprite;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
