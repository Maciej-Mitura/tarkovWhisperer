import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getClientEnv, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

/** Server Supabase client for auth/session and RLS-scoped queries. */
export async function createSupabaseServerClient() {
  const env = getClientEnv();

  if (!isSupabaseConfigured(env)) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll can fail in Server Components; safe to ignore until auth middleware is added.
          }
        },
      },
    },
  );
}
