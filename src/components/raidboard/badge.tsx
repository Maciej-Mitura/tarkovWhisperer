import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "green" | "orange" | "muted" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground",
  green: "bg-raid-green/15 text-raid-green border-raid-green/30",
  orange: "bg-raid-orange/15 text-raid-orange border-raid-orange/30",
  muted: "bg-muted text-muted-foreground",
  outline: "border border-border text-foreground",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
