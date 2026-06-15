import { AppShell } from "@/components/layout/app-shell";
import {
  Badge,
  ProgressBar,
  RaidCard,
  StatusPill,
} from "@/components/raidboard";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/config/routes";
import { MOCK_DASHBOARD, MOCK_TASKS } from "@/data/mock";

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Your current ops overview"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <RaidCard title="Active tasks" accent="green">
            <p className="font-mono text-3xl font-semibold text-raid-green">
              {MOCK_DASHBOARD.activeTasks}
            </p>
          </RaidCard>
          <RaidCard title="Hideout progress" accent="orange">
            <ProgressBar
              value={MOCK_DASHBOARD.hideoutProgress}
              variant="orange"
              showValue
            />
          </RaidCard>
          <RaidCard title="Next raid" accent="green">
            <p className="text-lg font-medium">{MOCK_DASHBOARD.nextRaidMap}</p>
            <Badge variant="outline" className="mt-2">
              Priority map
            </Badge>
          </RaidCard>
          <RaidCard title="Weekly raids" accent="neutral">
            <p className="font-mono text-3xl font-semibold">
              {MOCK_DASHBOARD.weeklyRaids}
            </p>
          </RaidCard>
        </div>

        <RaidCard
          title="Priority tasks"
          description="Top objectives from your tracker"
          accent="green"
          action={
            <ButtonLink href={ROUTES.app.tasks} variant="outline" size="sm">
              View all
            </ButtonLink>
          }
        >
          <ul className="divide-y divide-border/60">
            {MOCK_TASKS.map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{task.name}</p>
                  <p className="text-sm text-muted-foreground">{task.trader}</p>
                </div>
                <div className="flex flex-col gap-2 sm:w-56">
                  <StatusPill status={task.status} />
                  <ProgressBar value={task.progress} variant="green" />
                </div>
              </li>
            ))}
          </ul>
        </RaidCard>
      </div>
    </AppShell>
  );
}
