import { Weight, Ruler } from 'lucide-react';

interface PokemonDetailsAboutProps {
  weight: number;
  height: number;
  abilities: string[];
}

export function PokemonDetailsAbout({
  weight,
  height,
  abilities,
}: PokemonDetailsAboutProps) {
  return (
    <div className="px-6 mb-6">
      <h2 className="text-center text-xl font-bold text-type-grass hidden">
        About
      </h2>
      <div className="grid grid-cols-3 gap-4 border-b border-gray-100 text-center divide-x divide-gray-200">
        <div className="flex flex-col items-center justify-start gap-3 px-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-xs">
            <Weight className="w-4 h-4" />
            <span>{weight.toFixed(1).replace('.', ',')} kg</span>
          </div>
          <span className="text-xs text-muted-foreground font-normal mt-auto">
            Weight
          </span>
        </div>

        <div className="flex flex-col items-center justify-start gap-3 px-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-xs">
            <Ruler className="w-4 h-4 rotate-90" />
            <span>{height.toFixed(1).replace('.', ',')} m</span>
          </div>
          <span className="text-xs text-muted-foreground font-normal mt-auto">
            Height
          </span>
        </div>

        <div className="flex flex-col items-center justify-start gap-3 px-2">
          <div className="flex flex-col gap-1 text-xs font-medium text-foreground capitalize">
            {abilities.slice(0, 2).map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-normal mt-auto pt-1">
            Abilities
          </span>
        </div>
      </div>
    </div>
  );
}
