import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { LoadingState } from "@/components/raidboard";
import { ROUTES } from "@/config/routes";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-raid-green">
            RaidBoard
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access your protected ops dashboard.
          </p>
        </div>

        <Suspense fallback={<LoadingState title="Loading form" />}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href={ROUTES.register} className="text-raid-green hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
