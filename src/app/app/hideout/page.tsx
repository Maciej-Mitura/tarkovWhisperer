import { AppShell } from "@/components/layout/app-shell";
import { Badge, ProgressBar, RaidCard } from "@/components/raidboard";
import { MOCK_HIDEOUT_STATIONS } from "@/data/mock";

export default function HideoutPage() {
  return (
    <AppShell
      title="Hideout"
      subtitle="Station upgrades and requirements"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {MOCK_HIDEOUT_STATIONS.map((station) => (
          <RaidCard
            key={station.id}
            title={station.name}
            description={`Level ${station.level} → ${station.target}`}
            accent="orange"
            action={
              <Badge variant={station.progress === 100 ? "green" : "orange"}>
                {station.progress === 100 ? "Maxed" : "Upgrading"}
              </Badge>
            }
          >
            <ProgressBar
              value={station.progress}
              label="Upgrade progress"
              variant="orange"
            />
          </RaidCard>
        ))}
      </div>
    </AppShell>
  );
}
