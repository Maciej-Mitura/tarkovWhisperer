import { AppShell } from "@/components/layout/app-shell";
import {
  Badge,
  ProgressBar,
  RaidCard,
  StatusPill,
} from "@/components/raidboard";
import { MOCK_TASKS } from "@/data/mock";

export default function TasksPage() {
  return (
    <AppShell
      title="Tasks"
      subtitle="Quest and objective tracker"
    >
      <div className="space-y-4">
        {MOCK_TASKS.map((task) => (
          <RaidCard
            key={task.id}
            title={task.name}
            description={task.trader}
            accent="green"
            action={<Badge variant="muted">{task.id}</Badge>}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <StatusPill status={task.status} />
              <div className="w-full sm:max-w-xs">
                <ProgressBar
                  value={task.progress}
                  label="Completion"
                  variant={task.status === "blocked" ? "orange" : "green"}
                />
              </div>
            </div>
          </RaidCard>
        ))}
      </div>
    </AppShell>
  );
}
