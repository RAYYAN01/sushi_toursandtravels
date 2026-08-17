import { PrismaClient } from '@prisma/client';
import { seedDatabase } from './seed';

// Standard Next.js hot-reload-safe Prisma Client singleton. In dev, Next.js
// clears the module cache on every edit, which would otherwise create a new
// PrismaClient (and a new connection pool) on every reload — stashing the
// instance on `globalThis` avoids that.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Seeding no longer needs an explicit "connect" step the way Mongoose did —
// Prisma Client connects lazily on first query. We still want the one-time
// admin/vehicle/route/review seed to run automatically the first time
// any API route touches the database (mirrors the old connectDB() behavior),
// so `connectDB()` is kept as the call site every route already uses; it now
// just guarantees seeding has been kicked off and hands back the client.
let seedingKicked = false;

export async function connectDB() {
  if (!seedingKicked) {
    seedingKicked = true;
    seedDatabase().catch((err) => {
      console.error('Database seeding failed:', err);
      // Allow a retry on the next request instead of permanently giving up.
      seedingKicked = false;
    });
  }
  return prisma;
}
