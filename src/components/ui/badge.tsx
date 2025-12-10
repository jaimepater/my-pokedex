import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Pokémon Type Badge Component
 * Vibrant, playful badges for all 18 Pokémon types
 */

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105',
  {
    variants: {
      type: {
        normal: 'bg-type-normal text-white hover:brightness-110',
        fire: 'bg-type-fire text-white hover:brightness-110 shadow-type-fire/30',
        water:
          'bg-type-water text-white hover:brightness-110 shadow-type-water/30',
        grass:
          'bg-type-grass text-white hover:brightness-110 shadow-type-grass/30',
        electric:
          'bg-type-electric text-gray-900 hover:brightness-110 shadow-type-electric/30',
        ice: 'bg-type-ice text-gray-900 hover:brightness-110 shadow-type-ice/30',
        fighting:
          'bg-type-fighting text-white hover:brightness-110 shadow-type-fighting/30',
        poison:
          'bg-type-poison text-white hover:brightness-110 shadow-type-poison/30',
        ground:
          'bg-type-ground text-white hover:brightness-110 shadow-type-ground/30',
        flying:
          'bg-type-flying text-white hover:brightness-110 shadow-type-flying/30',
        psychic:
          'bg-type-psychic text-white hover:brightness-110 shadow-type-psychic/30',
        bug: 'bg-type-bug text-white hover:brightness-110 shadow-type-bug/30',
        rock: 'bg-type-rock text-white hover:brightness-110 shadow-type-rock/30',
        ghost:
          'bg-type-ghost text-white hover:brightness-110 shadow-type-ghost/30',
        dragon:
          'bg-type-dragon text-white hover:brightness-110 shadow-type-dragon/30',
        dark: 'bg-type-dark text-white hover:brightness-110 shadow-type-dark/30',
        steel:
          'bg-type-steel text-gray-900 hover:brightness-110 shadow-type-steel/30',
        fairy:
          'bg-type-fairy text-white hover:brightness-110 shadow-type-fairy/30',
      },
    },
    defaultVariants: {
      type: 'normal',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, type, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ type }), className)} {...props} />;
}

export { Badge, badgeVariants };
