import { AppShell } from "@/components/layout/app-shell";
import { ProgressBar, RaidCard } from "@/components/raidboard";
import { MOCK_STATS } from "@/data/mock";

export default function StatsPage() {
  return (
    <AppShell
      title="Stats"
      subtitle="Progress metrics and trends"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <RaidCard title="Raids this week" accent="green">
          <p className="font-mono text-4xl font-semibold text-raid-green">
            {MOCK_STATS.raidsThisWeek}
          </p>
        </RaidCard>
        <RaidCard title="Tasks completed" accent="orange">
          <p className="font-mono text-4xl font-semibold text-raid-orange">
            {MOCK_STATS.tasksCompleted}
          </p>
        </RaidCard>
        <RaidCard title="Survival rate" accent="green">
          <ProgressBar
            value={MOCK_STATS.survivalRate}
            label="Extract success"
            variant="green"
          />
        </RaidCard>
        <RaidCard title="Hideout upgrades" accent="orange">
          <p className="font-mono text-4xl font-semibold">
            {MOCK_STATS.hideoutUpgrades}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Stations improved this wipe
          </p>
        </RaidCard>
      </div>
    </AppShell>
  );
}
