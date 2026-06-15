import { z } from "zod";

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Server-only env vars. Never import in client components. */
export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export function isServiceRoleConfigured(
  env: ServerEnv = getServerEnv(),
): boolean {
  return Boolean(env.SUPABASE_SERVICE_ROLE_KEY);
}
