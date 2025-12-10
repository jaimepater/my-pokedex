'use client';

import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { PokemonDetailsHeader } from './PokemonDetailsHeader';
import { PokemonDetailsBadges } from './PokemonDetailsBadges';
import { PokemonDetailsAbout } from './PokemonDetailsAbout';
import { PokemonDetailsDescription } from './PokemonDetailsDescription';
import { PokemonDetailsStats } from './PokemonDetailsStats';
import { PokemonDetailsSkeleton } from './PokemonDetailsSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { typeBackgrounds } from '@/features/pokemon-details/utils/colors';
import { cn } from '@/lib/utils';

interface PokemonDetailsViewProps {
  id: string;
}

export function PokemonDetailsView({ id }: PokemonDetailsViewProps) {
  const { data, isLoading, error } = usePokemonDetails(id);

  if (isLoading) {
    return <PokemonDetailsSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load Pokémon details.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const primaryType = data.types[0];
  const bgClass = typeBackgrounds[primaryType] || 'bg-gray-400';

  return (
    <div
      className={cn(
        'bg-background pb-8 relative h-screen overflow-hidden',
        bgClass
      )}
    >
      <PokemonDetailsHeader id={data.id} name={data.name} image={data.image} />
      <div className="bg-card rounded-t-3xl -mt-12 pt-6 px-6 w-11/12 mx-auto relative z-1">
        <PokemonDetailsBadges types={data.types} />
        <PokemonDetailsAbout
          weight={data.weight}
          height={data.height}
          abilities={data.abilities}
        />
        <PokemonDetailsDescription description={data.description} />
        <PokemonDetailsStats stats={data.stats} primaryType={primaryType} />
      </div>
    </div>
  );
}
