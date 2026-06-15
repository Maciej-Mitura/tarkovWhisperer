import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";
import { ROUTES } from "@/config/routes";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-raid-orange">
            RaidBoard
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Set up your operator profile and progress tracking.
          </p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link href={ROUTES.login} className="text-raid-orange hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
