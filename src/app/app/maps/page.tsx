import { AppShell } from "@/components/layout/app-shell";
import { Badge, RaidCard } from "@/components/raidboard";
import { MOCK_MAPS } from "@/data/mock";

const priorityVariant = {
  high: "green",
  medium: "orange",
  low: "muted",
} as const;

export default function MapsPage() {
  return (
    <AppShell
      title="Maps"
      subtitle="Raid priority planner"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_MAPS.map((map) => (
          <RaidCard
            key={map.id}
            title={map.name}
            description={map.lootFocus}
            accent={map.priority === "high" ? "green" : "orange"}
            action={
              <Badge variant={priorityVariant[map.priority]}>
                {map.priority} priority
              </Badge>
            }
          >
            <p className="text-sm text-muted-foreground">
              Plan your next run around current task and loot goals.
            </p>
          </RaidCard>
        ))}
      </div>
    </AppShell>
  );
}
