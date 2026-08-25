import type { Vehicle as PrismaVehicle, PopularRoute, Review } from '@prisma/client';

/**
 * Shared shape-mapping helpers for Prisma rows -> the client-facing shape the
 * frontend already reads/writes. Previously duplicated (near-identically)
 * across `src/app/api/fleet/route.ts` and `src/app/api/home-data/route.ts`;
 * now those two API routes and the server-rendered `/` and `/fleet` pages
 * (`src/app/page.tsx`, `src/app/fleet/page.tsx`) all import from here.
 */

// Maps Prisma's primary key back to Mongo-style `_id`, and the business
// slug field (`vehicleId` in Postgres, was Mongo's `id` field) back to `id`.
export function toClientVehicle(vehicle: PrismaVehicle) {
  const { id, vehicleId, ...rest } = vehicle;
  return { ...rest, id: vehicleId, _id: id };
}

// Generic Prisma row -> `{ ...rest, id, _id }` mapper for entities whose
// business-facing `id` is the same as the Prisma primary key (routes,
// reviews) — unlike Vehicle, which has a separate `vehicleId` slug field.
export function toClient<T extends { id: string }>(entity: T) {
  const { id, ...rest } = entity;
  return { ...rest, _id: id, id };
}

export type ClientVehicle = ReturnType<typeof toClientVehicle>;
export type ClientRoute = ReturnType<typeof toClient<PopularRoute>>;
export type ClientReview = ReturnType<typeof toClient<Review>>;
