import React from 'react';

export interface Crumb {
  name: string;
  href: string;
}

interface LandingHeroProps {
  h1: string;
  subtitle: string;
  image: string;
  /** Kept for callers' BreadcrumbList JSON-LD schema — no longer rendered visually in the hero. */
  crumbs: Crumb[];
}

/**
 * Shared hero banner for the /vehicles, /services, /locations and /routes
 * landing page families. Mirrors the visual pattern used on /fleet, /about
 * and /contact (flat navy wash over a background photo, pulled up under the
 * fixed transparent header) instead of introducing a new hero style.
 */
export default function LandingHero({ h1, subtitle, image }: LandingHeroProps) {
  return (
    <div
      className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center bg-cover bg-center px-4 text-center text-white overflow-hidden"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-navy-dark/60 z-0" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">{h1}</h1>
        <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
}
