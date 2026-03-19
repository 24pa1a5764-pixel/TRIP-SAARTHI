import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <div>
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </div>

      {/* Search bar skeleton */}
      <div className="px-5 pb-4 pt-2">
        <Skeleton className="w-full h-12 rounded-2xl" />
      </div>

      {/* Hero banner skeleton */}
      <div className="px-5 mb-4">
        <Skeleton className="w-full h-40 rounded-3xl" />
      </div>

      {/* Categories skeleton */}
      <div className="px-5 mb-4">
        <Skeleton className="h-4 w-36 mb-3" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Quick features skeleton */}
      <div className="px-5 mb-4 md:hidden">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="shrink-0 h-10 w-28 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Trending skeleton */}
      <div className="px-5 mb-5">
        <Skeleton className="h-4 w-28 mb-3" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border">
              <Skeleton className="w-full h-28" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
