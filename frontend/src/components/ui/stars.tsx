import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

export function Stars({ rating, size = "md", showValue = false, className }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className={cn("star-rating", sizeMap[size])}>
        {Array.from({ length: full }, (_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {half && <span className="text-yellow-400">★</span>}
        {Array.from({ length: empty }, (_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </span>
      {showValue && (
        <span className="ml-1.5 font-semibold text-sm">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
