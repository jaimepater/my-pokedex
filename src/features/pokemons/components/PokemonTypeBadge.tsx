import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PokemonTypeBadgeProps {
  type: string;
  className?: string;
}

export function PokemonTypeBadge({ type, className }: PokemonTypeBadgeProps) {
  // Map API type names to our Badge variants
  // The Badge component already handles the color mapping via cva
  return (
    <Badge type={type as any} className={cn('capitalize', className)}>
      {type}
    </Badge>
  );
}
