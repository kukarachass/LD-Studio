import { MAX_RATING } from "@/content/reviews";
import { cn } from "@/lib/utils";

/** Ряд зірок оцінки. Порожні зірки лишаються приглушеними контурами. */
export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`Оцінка ${rating} з ${MAX_RATING}`}
    >
      {Array.from({ length: MAX_RATING }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn(
            "h-4 w-4",
            i < rating ? "text-magenta" : "text-line-strong",
          )}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.6l2.47 5.28 5.53.72-4.08 3.9 1.05 5.62L10 14.4l-4.97 2.72 1.05-5.62L2 7.6l5.53-.72L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}
