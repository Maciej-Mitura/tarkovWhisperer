"use server";

import { redirect } from "next/navigation";

import { ROUTES } from "@/config/routes";
import {
  type ActionResult,
  SAFE_ERROR_MESSAGE,
} from "@/lib/actions/utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";

export async function signIn(
  input: unknown,
): Promise<ActionResult<null>> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Invalid email or password." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: "Invalid email or password." };
  }

  return { success: true, data: null };
}

export async function signUp(
  input: unknown,
): Promise<ActionResult<null>> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Please check your registration details." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        display_name: parsed.data.displayName,
      },
    },
  });

  if (error) {
    return { success: false, error: SAFE_ERROR_MESSAGE };
  }

  if (data.user && !data.session) {
    return {
      success: true,
      data: null,
      message: "Check your email to confirm your account before signing in.",
    };
  }

  return { success: true, data: null };
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(ROUTES.login);
}
