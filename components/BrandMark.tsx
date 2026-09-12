interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = {
  sm: "text-[1.65rem] leading-none",
  md: "text-4xl leading-none",
  lg: "text-6xl leading-none",
};

export default function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span
      className={`font-brand font-semibold tracking-tight ${SIZE[size]} ${className}`}
      aria-label="GoGo"
    >
      <span className="text-[var(--gogo-red)]">Go</span>
      <span className="text-[var(--gogo-orange)]">Go</span>
    </span>
  );
}
