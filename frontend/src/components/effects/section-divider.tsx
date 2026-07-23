export function SectionDivider({ variant = "wave" }: { variant?: "wave" | "dune" | "gold" }) {
  if (variant === "gold") {
    return (
      <div className="relative h-px w-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-desert-400 to-transparent opacity-60" />
      </div>
    );
  }

  if (variant === "dune") {
    return (
      <div className="relative h-16 md:h-24 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 60 480 20 720 40C960 60 1200 20 1440 40V80H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-12 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1440 48" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
        <path
          d="M0 48L60 38C120 28 240 8 360 14C480 20 600 44 720 42C840 40 960 12 1080 10C1200 8 1320 32 1380 44L1440 48V48H0Z"
          fill="currentColor"
          className="text-background opacity-80"
        />
      </svg>
    </div>
  );
}
