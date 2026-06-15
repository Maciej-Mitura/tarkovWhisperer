"use server";

import {
  type ActionResult,
  toActionError,
} from "@/lib/actions/utils";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  updateHideoutProgressSchema,
  updateTaskProgressSchema,
} from "@/lib/validations/progress";
import type { UserHideoutProgress, UserTaskProgress } from "@/types/database";

export async function updateTaskProgress(
  input: unknown,
): Promise<ActionResult<UserTaskProgress>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const limit = rateLimit(`write:task-progress:${user.id}`);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please wait a moment." };
  }

  const parsed = updateTaskProgressSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid task progress data." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_task_progress")
    .upsert(
      {
        user_id: user.id,
        task_id: parsed.data.taskId,
        status: parsed.data.status,
        progress: parsed.data.progress,
      },
      { onConflict: "user_id,task_id" },
    )
    .select("*")
    .single();

  if (error || !data) {
    return { success: false, error: toActionError() };
  }

  return { success: true, data };
}

export async function updateHideoutProgress(
  input: unknown,
): Promise<ActionResult<UserHideoutProgress>> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const limit = rateLimit(`write:hideout-progress:${user.id}`);
  if (!limit.success) {
    return { success: false, error: "Too many requests. Please wait a moment." };
  }

  const parsed = updateHideoutProgressSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid hideout progress data." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_hideout_progress")
    .upsert(
      {
        user_id: user.id,
        hideout_module_id: parsed.data.hideoutModuleId,
        level: parsed.data.level,
        progress: parsed.data.progress,
      },
      { onConflict: "user_id,hideout_module_id" },
    )
    .select("*")
    .single();

  if (error || !data) {
    return { success: false, error: toActionError() };
  }

  return { success: true, data };
}
