"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Crosshair,
  Home,
  LayoutDashboard,
  ListChecks,
  Warehouse,
} from "lucide-react";

import { APP_NAV_ITEMS, ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const navIcons = {
  Dashboard: LayoutDashboard,
  Tasks: ListChecks,
  Hideout: Warehouse,
  Maps: Crosshair,
  Stats: BarChart3,
} as const;

type AppSidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function AppSidebar({ onNavigate, className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border/80 bg-sidebar/95",
        className,
      )}
    >
      <div className="border-b border-border/60 px-5 py-5">
        <Link
          href={ROUTES.app.root}
          className="group flex items-center gap-3"
          onClick={onNavigate}
        >
          <span className="flex size-9 items-center justify-center rounded border border-raid-green/40 bg-raid-green/10 font-mono text-xs font-bold text-raid-green">
            RB
          </span>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
              RaidBoard
            </p>
            <p className="text-xs text-muted-foreground">Ops dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="App navigation">
        {APP_NAV_ITEMS.map((item) => {
          const Icon = navIcons[item.label as keyof typeof navIcons];
          const isActive =
            pathname === item.href ||
            (item.href !== ROUTES.app.root && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "border-raid-green/30 bg-raid-green/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 px-5 py-4">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          onClick={onNavigate}
        >
          <Home className="size-3.5" aria-hidden />
          Back to landing
        </Link>
      </div>
    </aside>
  );
}
