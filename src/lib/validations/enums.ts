export const TASK_STATUSES = [
  "not_started",
  "in_progress",
  "ready",
  "blocked",
  "complete",
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const THEME_PREFERENCES = ["dark", "light"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export const MAP_PRIORITIES = ["low", "medium", "high"] as const;

export type MapPriority = (typeof MAP_PRIORITIES)[number];
