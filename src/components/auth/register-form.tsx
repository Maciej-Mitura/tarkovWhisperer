"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { RaidCard } from "@/components/raidboard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { signUp } from "@/lib/auth/actions";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await signUp({
        displayName: formData.get("displayName"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      if (result.message) {
        setMessage(result.message);
        return;
      }

      router.push(ROUTES.app.root);
      router.refresh();
    });
  }

  return (
    <RaidCard title="New operator" accent="orange">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-md border border-raid-green/30 bg-raid-green/10 px-3 py-2 text-sm text-raid-green" role="status">
            {message}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="displayName" className="text-sm font-medium text-foreground">
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="nickname"
            required
            minLength={2}
            maxLength={48}
            placeholder="Operator"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </RaidCard>
  );
}
