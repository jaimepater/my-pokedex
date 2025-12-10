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
