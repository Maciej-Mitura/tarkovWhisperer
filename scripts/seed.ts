import { config } from "dotenv";
import { resolve } from "node:path";

import { createSupabaseAdminClient } from "../src/lib/supabase/admin";
import {
  SEED_HIDEOUT_MODULES,
  SEED_ITEMS,
  SEED_MAPS,
  SEED_TASKS,
} from "./seed-data";

config({ path: resolve(process.cwd(), ".env.local") });

async function seed() {
  console.log("Seeding reference data…");

  const supabase = createSupabaseAdminClient();

  const { error: tasksError } = await supabase
    .from("tasks")
    .upsert([...SEED_TASKS], { onConflict: "id" });

  if (tasksError) {
    throw new Error(`Failed to seed tasks: ${tasksError.message}`);
  }

  const { error: mapsError } = await supabase
    .from("maps")
    .upsert([...SEED_MAPS], { onConflict: "id" });

  if (mapsError) {
    throw new Error(`Failed to seed maps: ${mapsError.message}`);
  }

  const { error: itemsError } = await supabase
    .from("items")
    .upsert([...SEED_ITEMS], { onConflict: "id" });

  if (itemsError) {
    throw new Error(`Failed to seed items: ${itemsError.message}`);
  }

  const { error: hideoutError } = await supabase
    .from("hideout_modules")
    .upsert([...SEED_HIDEOUT_MODULES], { onConflict: "id" });

  if (hideoutError) {
    throw new Error(`Failed to seed hideout modules: ${hideoutError.message}`);
  }

  console.log("Seed complete:");
  console.log(`  tasks: ${SEED_TASKS.length}`);
  console.log(`  maps: ${SEED_MAPS.length}`);
  console.log(`  items: ${SEED_ITEMS.length}`);
  console.log(`  hideout_modules: ${SEED_HIDEOUT_MODULES.length}`);
}

seed().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
