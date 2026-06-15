import { createClient } from "@supabase/supabase-js";

import { getClientEnv, isSupabaseConfigured } from "@/lib/env";
import { getServerEnv, isServiceRoleConfigured } from "@/lib/env.server";
import type { Database } from "@/types/database";

/**
 * Service-role client for trusted server scripts only (e.g. seed).
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createSupabaseAdminClient() {
  const clientEnv = getClientEnv();
  const serverEnv = getServerEnv();

  if (!isSupabaseConfigured(clientEnv) || !isServiceRoleConfigured(serverEnv)) {
    throw new Error(
      "Admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }

  return createClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL!,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
