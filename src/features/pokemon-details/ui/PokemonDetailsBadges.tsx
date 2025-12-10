import { Badge } from '@/components/ui/badge';
import { typeBackgrounds } from '../utils/colors';
import { cn } from '@/lib/utils';

interface PokemonDetailsBadgesProps {
  types: string[];
}

export function PokemonDetailsBadges({ types }: PokemonDetailsBadgesProps) {
  return (
    <div className="flex justify-center gap-4 mt-6 mb-4">
      {types.map((type) => (
        <Badge
          key={type}
          className={cn(
            'px-4 py-1.5 text-white capitalize rounded-full  font-medium hover:opacity-90 transition-opacity border-none shadow-sm text-xs',
            typeBackgrounds[type] || 'bg-gray-400'
          )}
        >
          {type}
        </Badge>
      ))}
    </div>
  );
}
