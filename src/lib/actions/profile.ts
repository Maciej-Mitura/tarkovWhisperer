"use server";

import { getAuthenticatedUser } from "@/lib/auth/session";
import {
  type ActionResult,
  SAFE_ERROR_MESSAGE,
  toActionError,
} from "@/lib/actions/utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getCurrentUserProfile(): Promise<ActionResult<Profile>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return { success: false, error: toActionError() };
  }

  return { success: true, data };
}

export async function updateProfileDisplayName(
  displayName: string,
): Promise<ActionResult<Profile>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const trimmed = displayName.trim();
  if (trimmed.length < 2 || trimmed.length > 48) {
    return { success: false, error: "Display name must be 2–48 characters." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: trimmed })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error || !data) {
    return { success: false, error: SAFE_ERROR_MESSAGE };
  }

  return { success: true, data };
}
