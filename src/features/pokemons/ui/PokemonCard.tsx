import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Pokemon } from '@/lib/shared/types/pokemon';
import { formatId } from '@/lib/shared/utils/formatId';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites.other?.['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <Card className="overflow-hidden bg-white border-0 shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300 relative group flex flex-col justify-between py-2 gap-2">
      <CardContent className="flex-1 flex flex-col px-4">
        {/* ID Number Top Right */}
        <div className="flex justify-end pr-1 pt-1">
          <span className="text-[10px] text-gray-400 font-medium">
            {formatId(pokemon.id)}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square w-full flex-1 flex items-center justify-center ">
          {imageUrl ? (
            <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
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
      <div className="text-center">
        <h3 className="text-sm font-medium capitalize text-gray-800 truncate px-1">
          {pokemon.name}
        </h3>
      </div>
    </Card>
  );
}
