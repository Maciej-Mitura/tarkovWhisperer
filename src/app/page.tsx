import { ArrowRight, Crosshair, Shield, Target } from "lucide-react";

import { Badge, RaidCard } from "@/components/raidboard";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/config/routes";

const features = [
  {
    title: "Task Tracker",
    description: "Prioritize quests and objectives across traders.",
    icon: Target,
    accent: "green" as const,
  },
  {
    title: "Hideout Planner",
    description: "Track station levels and upgrade requirements.",
    icon: Shield,
    accent: "orange" as const,
  },
  {
    title: "Map Priority",
    description: "Plan raids around loot focus and quest progress.",
    icon: Crosshair,
    accent: "green" as const,
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,120,86,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded border border-raid-green/40 bg-raid-green/10 font-mono text-sm font-bold text-raid-green">
            RB
          </span>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest">
              RaidBoard
            </p>
            <p className="text-xs text-muted-foreground">Progression assistant</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <ButtonLink href={ROUTES.login} variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href={ROUTES.register} size="sm">
            Get started
          </ButtonLink>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="green">Unofficial fan project</Badge>
            <h1 className="max-w-2xl font-heading text-4xl font-bold uppercase leading-tight tracking-wide text-foreground md:text-5xl">
              Plan your next raid with clarity
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              RaidBoard is a dark tactical dashboard for tracking tasks, hideout
              upgrades, and map priorities. Built for players — not affiliated
              with any official game.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ROUTES.app.root}>
                Open dashboard
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={ROUTES.register} variant="outline">
                Create account
              </ButtonLink>
            </div>
          </div>

          <RaidCard
            title="Ops snapshot"
            description="Mock preview — real data connects later"
            accent="orange"
          >
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Active tasks</dt>
                <dd className="font-mono text-2xl font-semibold text-raid-green">4</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Hideout</dt>
                <dd className="font-mono text-2xl font-semibold text-raid-orange">62%</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Next map</dt>
                <dd className="font-medium">Customs</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">This week</dt>
                <dd className="font-medium">12 raids</dd>
              </div>
            </dl>
          </RaidCard>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <RaidCard
                key={feature.title}
                title={feature.title}
                accent={feature.accent}
              >
                <div className="space-y-3">
                  <Icon className="size-5 text-muted-foreground" aria-hidden />
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </RaidCard>
            );
          })}
        </section>
      </main>
    </div>
  );
}
