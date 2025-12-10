import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const formatId = (id: number) => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  const imageUrl =
    pokemon.sprites.other?.['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <Card className="overflow-visible bg-white border-0 shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300 relative group">
      <CardContent className="p-2 pb-0">
        {/* ID Number Top Right */}
        <div className="flex justify-end pr-2 pt-1">
          <span className="text-[10px] text-gray-400 font-medium">
            {formatId(pokemon.id)}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square w-full -mt-2 mb-2 flex items-center justify-center">
          {imageUrl ? (
            <div className="relative w-[85%] h-[85%] transition-transform duration-300 group-hover:scale-110">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={pokemon.id <= 20}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
              <span className="text-gray-300 text-xs">No Image</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* Name Footer with Background */}
      <div className="bg-[#f0f0f0] rounded-[7px] mx-1 mb-1 py-3 text-center">
        <h3 className="text-sm font-medium capitalize text-gray-800 truncate px-1">
          {pokemon.name}
        </h3>
      </div>
    </Card>
  );
}
