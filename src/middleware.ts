import { type NextRequest, NextResponse } from "next/server";

import { ROUTES } from "@/config/routes";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/app") && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ROUTES.login;
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    (pathname === ROUTES.login || pathname === ROUTES.register) &&
    user
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ROUTES.app.root;
    redirectUrl.searchParams.delete("redirect");
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/app/:path*",
    "/login",
    "/register",
    "/auth/callback",
  ],
};
