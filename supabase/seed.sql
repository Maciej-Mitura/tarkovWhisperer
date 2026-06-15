-- Reference data seed (run via Supabase SQL editor or supabase db seed)
-- Idempotent upserts for local testing without the real Tarkov API.

INSERT INTO public.tasks (id, name, trader, description, sort_order) VALUES
  ('signal-part-1', 'Signal Part 1', 'Mechanic', 'Locate and mark the first signal transmitter.', 1),
  ('cult-part-2', 'The Cult Part 2', 'Peacekeeper', 'Investigate cult activity near the shoreline.', 2),
  ('inventory-check', 'Inventory Check', 'Ragman', 'Deliver specified clothing items.', 3),
  ('gunsmith-part-5', 'Gunsmith Part 5', 'Mechanic', 'Modify an M4 to meet specification.', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  trader = EXCLUDED.trader,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.maps (id, name, loot_focus) VALUES
  ('customs', 'Customs', 'Quest items and early-game gear'),
  ('woods', 'Woods', 'Keys, barter items, long-range fights'),
  ('shoreline', 'Shoreline', 'Loot runs and quest chains'),
  ('interchange', 'Interchange', 'High-value loot and PvP hotspots')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  loot_focus = EXCLUDED.loot_focus;

INSERT INTO public.items (id, name, category) VALUES
  ('bolts', 'Bolts', 'barter'),
  ('cpu-fan', 'CPU Fan', 'electronics'),
  ('salewa', 'Salewa', 'medical'),
  ('flash-drive', 'Flash Drive', 'electronics'),
  ('gas-analyzer', 'Gas Analyzer', 'quest')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category;

INSERT INTO public.hideout_modules (id, name, max_level) VALUES
  ('medstation', 'Medstation', 3),
  ('workbench', 'Workbench', 3),
  ('bitcoin-farm', 'Bitcoin Farm', 3),
  ('water-collector', 'Water Collector', 3),
  ('nutrition-unit', 'Nutrition Unit', 3)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  max_level = EXCLUDED.max_level;
