export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  auth: {
    callback: "/auth/callback",
  },
  app: {
    root: "/app",
    tasks: "/app/tasks",
    hideout: "/app/hideout",
    maps: "/app/maps",
    stats: "/app/stats",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;

export const APP_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: ROUTES.app.root,
    description: "Overview and priorities",
  },
  {
    label: "Tasks",
    href: ROUTES.app.tasks,
    description: "Quest and objective tracker",
  },
  {
    label: "Hideout",
    href: ROUTES.app.hideout,
    description: "Station upgrades",
  },
  {
    label: "Maps",
    href: ROUTES.app.maps,
    description: "Raid priority planner",
  },
  {
    label: "Stats",
    href: ROUTES.app.stats,
    description: "Progress metrics",
  },
] as const;
