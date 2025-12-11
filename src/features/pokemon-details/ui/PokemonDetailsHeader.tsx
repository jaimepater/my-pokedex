'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PokeBall } from '@/components/PokeBall';
import { formatId } from '@/features/pokemon-details/utils/formatId';

interface PokemonDetailsHeaderProps {
  id: number;
  name: string;
  image: string;
}

export function PokemonDetailsHeader({
  id,
  name,
  image,
}: PokemonDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div
      className={
        'relative flex flex-col items-center transition-colors duration-300'
      }
    >
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <PokeBall className="w-[200px] h-[200px] text-white" />
      </div>
      <div className="w-full flex items-baseline z-10 text-white py-2 gap-1 pr-2 justify-between">
        <div className={'flex items-center gap-1 '}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/pokemons')}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white capitalize mb-0 z-10">
            {name}
          </h1>
        </div>
        <p className="font-bold text-md ">{formatId(id)}</p>
      </div>

      <div className="relative z-10 mt-4">
        {image && (
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            className="object-contain drop-shadow-2xl"
            priority
          />
        )}
      </div>
    </div>
  );
}
