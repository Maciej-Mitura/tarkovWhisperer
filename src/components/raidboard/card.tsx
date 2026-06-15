import { cn } from "@/lib/utils";

type RaidCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  accent?: "green" | "orange" | "neutral";
};

const accentStyles = {
  green: "border-t-raid-green/60",
  orange: "border-t-raid-orange/60",
  neutral: "border-t-border",
};

export function RaidCard({
  title,
  description,
  action,
  children,
  className,
  accent = "neutral",
}: RaidCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border/80 bg-card/90 shadow-sm backdrop-blur-sm",
        "border-t-2",
        accentStyles[accent],
        className,
      )}
    >
      {(title || description || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
          <div className="space-y-1">
            {title && (
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
