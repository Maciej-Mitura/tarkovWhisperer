import { z } from "zod";

import { TASK_STATUSES, THEME_PREFERENCES } from "@/lib/validations/enums";

export const updateTaskProgressSchema = z.object({
  taskId: z.string().trim().min(1).max(64),
  status: z.enum(TASK_STATUSES),
  progress: z.number().int().min(0).max(100),
});

export type UpdateTaskProgressInput = z.infer<typeof updateTaskProgressSchema>;

export const updateHideoutProgressSchema = z.object({
  hideoutModuleId: z.string().trim().min(1).max(64),
  level: z.number().int().min(0).max(99),
  progress: z.number().int().min(0).max(100),
});

export type UpdateHideoutProgressInput = z.infer<
  typeof updateHideoutProgressSchema
>;

export const updateUserSettingsSchema = z.object({
  preferredMapId: z.string().trim().min(1).max(64).nullable().optional(),
  theme: z.enum(THEME_PREFERENCES).optional(),
  notificationsEnabled: z.boolean().optional(),
});

export type UpdateUserSettingsInput = z.infer<typeof updateUserSettingsSchema>;
