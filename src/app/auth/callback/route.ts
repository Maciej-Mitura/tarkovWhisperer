import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ROUTES } from "@/config/routes";
import { getClientEnv, isSupabaseConfigured } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? ROUTES.app.root;

  if (!code || !isSupabaseConfigured()) {
    return NextResponse.redirect(
      `${origin}${ROUTES.login}?error=auth_callback_failed`,
    );
  }

  const cookieStore = await cookies();
  const env = getClientEnv();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}${ROUTES.login}?error=auth_callback_failed`,
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
