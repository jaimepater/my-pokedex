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
