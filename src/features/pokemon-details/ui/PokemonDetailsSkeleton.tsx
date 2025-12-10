import { Skeleton } from '@/components/ui/skeleton';

export function PokemonDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-8 max-w-md mx-auto relative shadow-2xl overflow-hidden rounded-[2.5rem] mt-4 mb-4 border border-border">
      {/* Header Skeleton */}
      <div className="relative flex flex-col items-center pb-12 pt-6 rounded-b-[2.5rem] bg-gray-200">
        <div className="w-full px-6 flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-60 w-60 rounded-full" />
      </div>

      {/* Badges Skeleton */}
      <div className="flex justify-center gap-4 mt-8 mb-6">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      {/* About Skeleton */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4 pb-8">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="px-6 mb-8">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </div>

      {/* Stats Skeleton */}
      <div className="px-6">
        <Skeleton className="h-6 w-32 mx-auto mb-6" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 mb-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-2 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
