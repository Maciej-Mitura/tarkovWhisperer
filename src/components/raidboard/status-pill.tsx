import { cn } from "@/lib/utils";

export type StatusKind = "ready" | "in_progress" | "blocked" | "complete" | "warning";

type StatusPillProps = {
  status: StatusKind;
  label?: string;
  className?: string;
};

const statusConfig: Record<
  StatusKind,
  { label: string; className: string }
> = {
  ready: {
    label: "Ready",
    className: "bg-raid-green/15 text-raid-green border-raid-green/35",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-raid-orange/15 text-raid-orange border-raid-orange/35",
  },
  blocked: {
    label: "Blocked",
    className: "bg-destructive/15 text-destructive border-destructive/35",
  },
  complete: {
    label: "Complete",
    className: "bg-raid-green/20 text-raid-green border-raid-green/40",
  },
  warning: {
    label: "Attention",
    className: "bg-raid-orange/20 text-raid-orange border-raid-orange/40",
  },
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label ?? config.label}
    </span>
  );
}
