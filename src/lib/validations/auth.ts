import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const signUpSchema = z.object({
  displayName: z.string().trim().min(2).max(48),
  email: z.email(),
  password: z.string().min(8).max(128),
});
