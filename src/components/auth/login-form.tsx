"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { RaidCard } from "@/components/raidboard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { signIn } from "@/lib/auth/actions";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth_callback_failed"
      ? "Authentication failed. Please try again."
      : null,
  );
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    startTransition(async () => {
      const result = await signIn({ email, password });

      if (!result.success) {
        setError(result.error);
        return;
      }

      const redirectTo = searchParams.get("redirect") ?? ROUTES.app.root;
      router.push(redirectTo);
      router.refresh();
    });
  }

  return (
    <RaidCard title="Credentials" accent="green">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="operator@example.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </RaidCard>
  );
}
