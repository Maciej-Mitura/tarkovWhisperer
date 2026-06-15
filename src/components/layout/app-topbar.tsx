"use client";

import { LogOut, Menu } from "lucide-react";
import { useTransition } from "react";

import { useAppProfile } from "@/components/layout/app-profile-provider";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MOCK_USER } from "@/data/mock";
import { signOut } from "@/lib/auth/actions";

type AppTopbarProps = {
  title: string;
  subtitle?: string;
};

export function AppTopbar({ title, subtitle }: AppTopbarProps) {
  const profile = useAppProfile();
  const [isSigningOut, startSignOut] = useTransition();

  const displayName = profile?.display_name ?? MOCK_USER.displayName;
  const callsign =
    profile?.callsign ?? `LVL ${profile?.level ?? MOCK_USER.level}`;

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border/80 bg-background/90 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open navigation"
              />
            }
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <AppSidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="font-heading text-base font-semibold uppercase tracking-wider text-foreground md:text-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 rounded-md border border-border/70 bg-card/60 px-3 py-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-foreground">{displayName}</p>
            <p className="font-mono text-xs text-muted-foreground">{callsign}</p>
          </div>
          <Avatar className="size-9 border border-raid-orange/30">
            <AvatarFallback className="bg-raid-orange/15 text-xs font-semibold text-raid-orange">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Sign out"
          disabled={isSigningOut}
          onClick={() => startSignOut(() => signOut())}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
