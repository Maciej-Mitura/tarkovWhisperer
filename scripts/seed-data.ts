export const SEED_TASKS = [
  {
    id: "signal-part-1",
    name: "Signal Part 1",
    trader: "Mechanic",
    description: "Locate and mark the first signal transmitter.",
    sort_order: 1,
  },
  {
    id: "cult-part-2",
    name: "The Cult Part 2",
    trader: "Peacekeeper",
    description: "Investigate cult activity near the shoreline.",
    sort_order: 2,
  },
  {
    id: "inventory-check",
    name: "Inventory Check",
    trader: "Ragman",
    description: "Deliver specified clothing items.",
    sort_order: 3,
  },
  {
    id: "gunsmith-part-5",
    name: "Gunsmith Part 5",
    trader: "Mechanic",
    description: "Modify an M4 to meet specification.",
    sort_order: 4,
  },
] as const;

export const SEED_MAPS = [
  {
    id: "customs",
    name: "Customs",
    loot_focus: "Quest items and early-game gear",
  },
  {
    id: "woods",
    name: "Woods",
    loot_focus: "Keys, barter items, long-range fights",
  },
  {
    id: "shoreline",
    name: "Shoreline",
    loot_focus: "Loot runs and quest chains",
  },
  {
    id: "interchange",
    name: "Interchange",
    loot_focus: "High-value loot and PvP hotspots",
  },
] as const;

export const SEED_ITEMS = [
  { id: "bolts", name: "Bolts", category: "barter" },
  { id: "cpu-fan", name: "CPU Fan", category: "electronics" },
  { id: "salewa", name: "Salewa", category: "medical" },
  { id: "flash-drive", name: "Flash Drive", category: "electronics" },
  { id: "gas-analyzer", name: "Gas Analyzer", category: "quest" },
] as const;

export const SEED_HIDEOUT_MODULES = [
  { id: "medstation", name: "Medstation", max_level: 3 },
  { id: "workbench", name: "Workbench", max_level: 3 },
  { id: "bitcoin-farm", name: "Bitcoin Farm", max_level: 3 },
  { id: "water-collector", name: "Water Collector", max_level: 3 },
  { id: "nutrition-unit", name: "Nutrition Unit", max_level: 3 },
] as const;
