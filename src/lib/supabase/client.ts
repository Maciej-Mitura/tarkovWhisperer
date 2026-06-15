import { createBrowserClient } from "@supabase/ssr";

import { getClientEnv, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

/** Browser Supabase client. Requires NEXT_PUBLIC_* vars in .env.local — never hardcode keys. */
export function createSupabaseBrowserClient() {
  const env = getClientEnv();

  if (!isSupabaseConfigured(env)) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    );
  }

  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
