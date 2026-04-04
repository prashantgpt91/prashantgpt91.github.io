const CardSkeleton = ({ accent = "blue" }: { accent?: "blue" | "purple" | "teal" }) => {
  const borderColor = accent === "purple" ? "border-l-purple-500/30" : accent === "teal" ? "border-l-teal-500/30" : "border-l-blue-500/30";

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden p-6 border-l-2 ${borderColor} animate-pulse`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-16 bg-muted rounded-full" />
        <div className="h-5 w-20 bg-muted rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-muted rounded mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-14 bg-muted rounded-full" />
        <div className="h-5 w-14 bg-muted rounded-full" />
        <div className="h-5 w-14 bg-muted rounded-full" />
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

export default CardSkeleton;
