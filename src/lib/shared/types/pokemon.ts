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
