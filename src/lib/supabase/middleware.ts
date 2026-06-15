import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { getClientEnv, isSupabaseConfigured } from "@/lib/env";

export type SessionResult = {
  supabaseResponse: NextResponse;
  user: User | null;
};

export async function updateSession(request: NextRequest): Promise<SessionResult> {
  const supabaseResponse = NextResponse.next({ request });

  if (!isSupabaseConfigured(getClientEnv())) {
    return { supabaseResponse, user: null };
  }

  const env = getClientEnv();
  let response = supabaseResponse;

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse: response, user };
}
