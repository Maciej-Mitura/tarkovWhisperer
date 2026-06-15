# RaidBoard

A Tarkov-inspired progression assistant with a dark tactical dashboard. **Unofficial fan project** — not affiliated with Escape from Tarkov.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- ESLint
- Zod
- TanStack Query
- Supabase Auth + Postgres (SSR via `@supabase/ssr`)

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- `NEXT_PUBLIC_*` — browser + server (anon key only)
- `SUPABASE_SERVICE_ROLE_KEY` — **server/scripts only**, never exposed to the client

### Database setup

1. Create a Supabase project
2. Run the migration in `supabase/migrations/20240616000000_initial_schema.sql` via the Supabase SQL editor or CLI
3. Seed reference data:

```bash
npm run db:seed
```

Or run `supabase/seed.sql` directly in the SQL editor.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Public landing page |
| `/login` | Sign in (Supabase Auth) |
| `/register` | Create account |
| `/auth/callback` | OAuth/email confirmation callback |
| `/app` | Protected dashboard |
| `/app/tasks` | Task tracker |
| `/app/hideout` | Hideout tracker |
| `/app/maps` | Map priority |
| `/app/stats` | Stats |

`/app/*` routes are protected by middleware and a server layout guard.

## Database schema

| Table | Access |
|-------|--------|
| `profiles` | User-owned (RLS) |
| `user_task_progress` | User-owned (RLS), unique `(user_id, task_id)` |
| `user_hideout_progress` | User-owned (RLS), unique `(user_id, hideout_module_id)` |
| `user_settings` | User-owned (RLS) |
| `tasks`, `maps`, `items`, `hideout_modules` | Public read, no client writes |

New users automatically get a `profiles` row and `user_settings` row via database trigger.

## Server actions

| Action | File |
|--------|------|
| `getCurrentUserProfile` | `src/lib/actions/profile.ts` |
| `updateTaskProgress` | `src/lib/actions/progress.ts` |
| `updateHideoutProgress` | `src/lib/actions/progress.ts` |
| `updateUserSettings` | `src/lib/actions/settings.ts` |
| `signIn` / `signUp` / `signOut` | `src/lib/auth/actions.ts` |

Security properties:
- `user_id` is always derived from the authenticated session — never accepted from the client
- All inputs validated with Zod + allowlisted enums
- Progress updates use upsert with unique constraints
- Safe, generic error messages returned to clients
- In-memory rate limiting on write actions (`src/lib/rate-limit.ts`)

## Project structure

```
src/
  app/                  # App Router pages + auth callback
  middleware.ts         # Session refresh + /app protection
  components/
    auth/               # Login/register forms
    layout/             # App shell, sidebar, profile context
    raidboard/          # UI components
  config/routes.ts      # Typed route constants
  lib/
    actions/            # Server actions
    auth/               # Session helpers + auth actions
    supabase/           # Browser, server, middleware, admin clients
    validations/        # Zod schemas
  types/database.ts     # Supabase table types
supabase/
  migrations/           # SQL migrations with RLS
  seed.sql              # Reference data seed
scripts/
  seed.ts               # Node seed script (uses service role)
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
npm run db:seed   # Seed reference tables (requires service role key)
```

## License

From player, for players.
