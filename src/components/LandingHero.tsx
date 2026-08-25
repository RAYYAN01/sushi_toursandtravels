import React from 'react';

export interface Crumb {
  name: string;
  href: string;
}

interface LandingHeroProps {
  h1: string;
  subtitle: string;
  /** Kept for callers' BreadcrumbList JSON-LD schema — no longer rendered visually in the hero. */
  crumbs: Crumb[];
}

/**
 * Shared page header for the /vehicles, /services, /locations, /routes and
 * /blog landing page families.
 *
 * Deliberately image-free (owner instruction, 2026-08-25): landing pages open
 * on a simple flat navy band rather than a full-screen vehicle photo, so the
 * page gets to its actual content immediately.
 *
 * It still spans up under the fixed header (the negative margin cancels the
 * padding LayoutWrapper puts on <main>, and the matching padding pushes the
 * text back down). That is load-bearing, not decorative: the navbar is
 * translucent until you scroll, so it needs a dark band behind it to stay
 * legible — dropping it would leave white nav text on the cream page.
 */
export default function LandingHero({ h1, subtitle }: LandingHeroProps) {
  return (
    <div className="relative -mt-[72px] md:-mt-[80px] pt-[72px] md:pt-[80px] bg-navy-dark px-4 text-center text-white">
      <div className="max-w-4xl mx-auto py-14 md:py-20 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">{h1}</h1>
        <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
}
