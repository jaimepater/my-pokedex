'use client';

import { Progress } from '@/components/ui/progress';
import { typeText } from '../utils/colors';
import { cn } from '@/lib/utils';
import { PokemonStat } from '../types';

interface PokemonDetailsStatsProps {
  stats: PokemonStat[];
  primaryType: string;
}

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

export function PokemonDetailsStats({
  stats,
  primaryType,
}: PokemonDetailsStatsProps) {
  const titleColorClass = typeText[primaryType] || 'text-gray-500';

  // Helper to format stat value (e.g. 045)
  const formatStatValue = (val: number) => val.toString().padStart(3, '0');

  // Helper to normalize stat value for progress bar (assuming max 255 for base stats)
  const getProgressValue = (val: number) => Math.min((val / 255) * 100, 100);

  return (
    <div className="px-6 pb-6 w-full">
      <h2
        className={cn(
          'text-center text-md font-bold mb-3 capitalize',
          titleColorClass
        )}
      >
        Base Stats
      </h2>

      <div className="flex flex-col gap-4">
        {stats.map((stat) => {
          const label = statLabels[stat.name] || stat.name;
          return (
            <div key={stat.name} className="flex items-center text-xs">
              <span className={cn('w-10 font-bold', titleColorClass)}>
                {label}
              </span>
              <span className="w-12 text-foreground font-medium text-right mr-4">
                {formatStatValue(stat.value)}
              </span>
              <Progress
                value={getProgressValue(stat.value)}
                className="h-2 flex-1"
                indicatorClassName={cn(
                  'bg-current',
                  titleColorClass.replace('text-', 'bg-') // Map text color back to bg for the bar
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
