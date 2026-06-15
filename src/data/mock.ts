export const MOCK_USER = {
  displayName: "Operator",
  callsign: "RB-0142",
  level: 28,
} as const;

export const MOCK_DASHBOARD = {
  activeTasks: 4,
  hideoutProgress: 62,
  nextRaidMap: "Customs",
  weeklyRaids: 12,
} as const;

export const MOCK_TASKS = [
  {
    id: "task-1",
    name: "Signal Part 1",
    trader: "Mechanic",
    status: "in_progress" as const,
    progress: 45,
  },
  {
    id: "task-2",
    name: "The Cult Part 2",
    trader: "Peacekeeper",
    status: "ready" as const,
    progress: 80,
  },
  {
    id: "task-3",
    name: "Inventory Check",
    trader: "Ragman",
    status: "blocked" as const,
    progress: 10,
  },
] as const;

export const MOCK_HIDEOUT_STATIONS = [
  { id: "med", name: "Medstation", level: 2, target: 3, progress: 66 },
  { id: "workbench", name: "Workbench", level: 2, target: 2, progress: 100 },
  { id: "bitcoin", name: "Bitcoin Farm", level: 1, target: 3, progress: 33 },
] as const;

export const MOCK_MAPS = [
  { id: "customs", name: "Customs", priority: "high" as const, lootFocus: "Quest items" },
  { id: "woods", name: "Woods", priority: "medium" as const, lootFocus: "Keys & barter" },
  { id: "shoreline", name: "Shoreline", priority: "low" as const, lootFocus: "Long-range practice" },
] as const;

export const MOCK_STATS = {
  raidsThisWeek: 12,
  survivalRate: 41,
  tasksCompleted: 7,
  hideoutUpgrades: 3,
} as const;
