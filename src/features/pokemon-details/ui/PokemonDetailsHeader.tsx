'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { typeBackgrounds } from '../utils/colors';
import { cn } from '@/lib/utils';

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

  const formatId = (id: number) => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center transition-colors duration-300'
      )}
    >
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg
          width="200"
          height="200"
          viewBox="0 0 100 100"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 85 C30.7 85 15 69.3 15 50 C15 30.7 30.7 15 50 15 C69.3 15 85 30.7 85 50 C85 69.3 69.3 85 50 85 Z" />
          <path d="M50 40 C44.5 40 40 44.5 40 50 C40 55.5 44.5 60 50 60 C55.5 60 60 55.5 60 50 C60 44.5 55.5 40 50 40 Z" />
        </svg>
      </div>
      <div className="w-full flex items-baseline z-10 text-white py-2 gap-1 pr-2 justify-between">
        <div className={'flex items-center gap-1 '}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
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
