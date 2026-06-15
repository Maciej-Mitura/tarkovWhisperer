-- RaidBoard initial schema: reference tables, user progress, profiles, RLS

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums (allowlisted status values)
-- ---------------------------------------------------------------------------

CREATE TYPE public.task_status AS ENUM (
  'not_started',
  'in_progress',
  'ready',
  'blocked',
  'complete'
);

CREATE TYPE public.theme_preference AS ENUM ('dark', 'light');

-- ---------------------------------------------------------------------------
-- Reference tables (public read, no client writes)
-- ---------------------------------------------------------------------------

CREATE TABLE public.tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trader TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.maps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  loot_focus TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.hideout_modules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  max_level INTEGER NOT NULL DEFAULT 3 CHECK (max_level >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- User-owned tables
-- ---------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Operator',
  callsign TEXT,
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.user_task_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES public.tasks (id) ON DELETE CASCADE,
  status public.task_status NOT NULL DEFAULT 'not_started',
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT user_task_progress_user_task_unique UNIQUE (user_id, task_id)
);

CREATE TABLE public.user_hideout_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  hideout_module_id TEXT NOT NULL REFERENCES public.hideout_modules (id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 0 CHECK (level >= 0),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT user_hideout_progress_user_module_unique UNIQUE (user_id, hideout_module_id)
);

CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  preferred_map_id TEXT REFERENCES public.maps (id) ON DELETE SET NULL,
  theme public.theme_preference NOT NULL DEFAULT 'dark',
  notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER user_task_progress_set_updated_at
  BEFORE UPDATE ON public.user_task_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER user_hideout_progress_set_updated_at
  BEFORE UPDATE ON public.user_hideout_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER user_settings_set_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create profile + settings on signup
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, callsign)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', 'Operator'),
    NEW.raw_user_meta_data ->> 'callsign'
  );

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_task_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hideout_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hideout_modules ENABLE ROW LEVEL SECURITY;

-- profiles: own row only
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- user_task_progress: own rows only
CREATE POLICY "user_task_progress_select_own"
  ON public.user_task_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_task_progress_insert_own"
  ON public.user_task_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_task_progress_update_own"
  ON public.user_task_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_task_progress_delete_own"
  ON public.user_task_progress FOR DELETE
  USING (auth.uid() = user_id);

-- user_hideout_progress: own rows only
CREATE POLICY "user_hideout_progress_select_own"
  ON public.user_hideout_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_hideout_progress_insert_own"
  ON public.user_hideout_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_hideout_progress_update_own"
  ON public.user_hideout_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_hideout_progress_delete_own"
  ON public.user_hideout_progress FOR DELETE
  USING (auth.uid() = user_id);

-- user_settings: own row only
CREATE POLICY "user_settings_select_own"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_settings_insert_own"
  ON public.user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_settings_update_own"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reference tables: public read, no client writes
CREATE POLICY "tasks_public_read"
  ON public.tasks FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "maps_public_read"
  ON public.maps FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "items_public_read"
  ON public.items FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "hideout_modules_public_read"
  ON public.hideout_modules FOR SELECT
  TO anon, authenticated
  USING (TRUE);
