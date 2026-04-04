const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={`shimmer rounded ${className || ''}`} />
);

const CardSkeleton = ({ accent = "blue" }: { accent?: "blue" | "purple" | "teal" }) => {
  const borderColor =
    accent === "purple" ? "border-l-purple-500/30" :
    accent === "teal" ? "border-l-teal-500/30" :
    "border-l-blue-500/30";

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden p-6 border-l-2 ${borderColor}`}>
      <div className="flex items-center gap-2 mb-4">
        <ShimmerBlock className="h-5 w-16 rounded-full" />
        <ShimmerBlock className="h-5 w-20 rounded-full" />
      </div>
      <ShimmerBlock className="h-6 w-3/4 mb-3" />
      <div className="space-y-2 mb-4">
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-5/6" />
      </div>
      <div className="flex gap-1.5">
        <ShimmerBlock className="h-5 w-14 rounded-full" />
        <ShimmerBlock className="h-5 w-14 rounded-full" />
        <ShimmerBlock className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
};

export const CardSkeletonGrid = ({ count = 4, accent = "blue" }: { count?: number; accent?: "blue" | "purple" | "teal" }) => (
  <div className="grid gap-6 md:gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} accent={accent} />
    ))}
  </div>
);

/**
 * Shimmer skeleton for detail pages (article-like layout).
 */
export const DetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <ShimmerBlock className="h-5 w-20 rounded-full" />
        <ShimmerBlock className="h-5 w-16 rounded-full" />
      </div>
      <ShimmerBlock className="h-10 w-4/5 mb-4" />
      <ShimmerBlock className="h-10 w-3/5 mb-6" />
      <div className="flex gap-4 mb-6">
        <ShimmerBlock className="h-4 w-24" />
        <ShimmerBlock className="h-4 w-20" />
        <ShimmerBlock className="h-4 w-16" />
      </div>
      <ShimmerBlock className="h-5 w-full mb-2" />
      <ShimmerBlock className="h-5 w-4/5" />
    </div>
    <div className="border-t border-border pt-8 space-y-4">
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-5/6" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-3/4" />
      <ShimmerBlock className="h-32 w-full rounded-lg" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-5/6" />
    </div>
  </div>
);

/**
 * Shimmer for inline sections (related posts, featured content).
 */
export const InlineSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-3">
        <ShimmerBlock className="h-5 w-5 rounded shrink-0" />
        <div className="flex-1 space-y-1.5">
          <ShimmerBlock className="h-4 w-3/4" />
          <ShimmerBlock className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Shimmer for comments section.
 */
export const CommentsSkeleton = () => (
  <div className="space-y-3 py-4">
    <ShimmerBlock className="h-8 w-48 rounded-full" />
    <ShimmerBlock className="h-24 w-full rounded-lg" />
  </div>
);

export default CardSkeleton;
