import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PokemonCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-square rounded-none" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
