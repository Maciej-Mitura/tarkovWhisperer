"use server";

import {
  type ActionResult,
  toActionError,
} from "@/lib/actions/utils";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateUserSettingsSchema } from "@/lib/validations/progress";
import type { UserSettings } from "@/types/database";

export async function updateUserSettings(
  input: unknown,
): Promise<ActionResult<UserSettings>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const limit = rateLimit(`write:settings:${user.id}`);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please wait a moment." };
  }

  const parsed = updateUserSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid settings data." };
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.preferredMapId !== undefined) {
    updates.preferred_map_id = parsed.data.preferredMapId;
  }
  if (parsed.data.theme !== undefined) {
    updates.theme = parsed.data.theme;
  }
  if (parsed.data.notificationsEnabled !== undefined) {
    updates.notifications_enabled = parsed.data.notificationsEnabled;
  }

  if (Object.keys(updates).length === 0) {
    return { success: false, error: "No settings to update." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_settings")
    .upsert(
      {
        user_id: user.id,
        ...updates,
      },
      { onConflict: "user_id" },
    )
    .select("*")
    .single();

  if (error || !data) {
    return { success: false, error: toActionError() };
  }

  return { success: true, data };
}

export async function getUserSettings(): Promise<ActionResult<UserSettings>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return { success: false, error: toActionError() };
  }

  return { success: true, data };
}
