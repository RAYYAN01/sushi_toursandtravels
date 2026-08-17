# Database (Neon Postgres + Prisma)

This project uses [Prisma](https://www.prisma.io/) as its ORM against a
[Neon](https://neon.tech) Postgres database. Mongo/Mongoose has been removed
entirely.

## 1. Get a Neon connection string

1. Create a free project at https://console.neon.tech.
2. Open the project's **Connect** panel. Neon gives you two connection
   strings:
   - **Pooled connection** (host ends in `-pooler`) — use this for
     `DATABASE_URL`. It goes through Neon's PgBouncer pooler, which is
     required for serverless/Vercel functions so you don't exhaust Postgres'
     connection limit under concurrent traffic.
   - **Direct connection** (no `-pooler`) — use this for `DIRECT_URL`.
     Prisma's schema/migration commands (`prisma migrate`, `prisma db push`)
     need a direct, non-pooled connection.
3. Put both into `.env` (read by the Prisma CLI) **and** `.env.local` (read
   by Next.js at runtime) — keep them in sync:

   ```
   DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
   DIRECT_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require"
   ```

## 2. Create the tables

One-time, against your real Neon database:

```bash
npx prisma migrate dev --name init
```

(or `npm run db:push` for a quick schema sync without generating a migration
history — fine for a small single-environment project like this one).

## 3. Seeding

There's no separate seed command to run by hand. `src/lib/seed.ts` runs
automatically, once per server instance, the first time any API route (or
the blog page / sitemap) calls `connectDB()` — this mirrors the old Mongoose
`connectDB()` behavior. It:

- Creates (or updates) the single Admin user from `ADMIN_EMAIL` /
  `ADMIN_PASSWORD` / `ADMIN_SECRET_KEY`.
- Seeds initial blog posts / vehicles from `src/lib/blogPosts.ts` /
  `src/lib/vehicles.ts` if those tables are empty.
- Seeds the initial popular-routes and testimonial rows if those tables are
  empty.

So after creating the tables (step 2), just start the app / hit any page —
seeding happens on the first request.

## Prisma + Neon setup notes

- ORM: Prisma, with the standard `postgresql` datasource provider (not the
  `@prisma/adapter-neon` driver adapter). Neon's pooled connection string
  already solves the serverless connection-pool-exhaustion problem that the
  driver adapter is mainly useful for, so the standard setup is simpler and
  just as robust for this app's traffic level on Vercel.
- `prisma/schema.prisma` has `url = env("DATABASE_URL")` and
  `directUrl = env("DIRECT_URL")` — the latter is Prisma's built-in way of
  giving migrations a non-pooled connection while the app itself uses the
  pooled one.
- `src/lib/db.ts` exports a `PrismaClient` singleton (`prisma`) stashed on
  `globalThis` in development to survive Next.js hot-reload without opening
  new connection pools each time.
- `package.json` has a `postinstall: "prisma generate"` script so Vercel
  (and any fresh `npm install`) regenerates the Prisma Client automatically.

## Vercel environment variables

Set these in the Vercel project settings:

- `DATABASE_URL` — Neon pooled connection string.
- `DIRECT_URL` — Neon direct connection string (only needed if you run
  `prisma migrate`/`db push` from CI/Vercel; harmless to set otherwise).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SECRET_KEY` — unchanged from
  before, used for the admin seed/login/JWT flow.
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` — unchanged, for
  outgoing booking/OTP emails.
