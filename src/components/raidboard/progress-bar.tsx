import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "green" | "orange";
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  variant = "green",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = Math.round((clamped / max) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono tabular-nums">{percent}%</span>}
        </div>
      )}
      <div
        className="h-2 overflow-hidden rounded-sm border border-border/70 bg-muted/40"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progress"}
      >
        <div
          className={cn(
            "h-full rounded-sm transition-all duration-300",
            variant === "green" ? "bg-raid-green" : "bg-raid-orange",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
