'use client';

import React from 'react';

// Single Vehicle Card Skeleton Loader
export function VehicleCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm flex flex-col overflow-hidden h-full">
      {/* Card Image Pulse Placeholder */}
      <div className="relative aspect-video w-full bg-navy-light/5 animate-pulse flex items-center justify-center">
        {/* Category Badges Placeholders */}
        <div className="absolute top-4 left-4 bg-navy-light/10 w-16 h-5 rounded-full" />
        <div className="absolute top-4 right-4 bg-navy-light/10 w-24 h-5 rounded-full" />
      </div>

      {/* Card Details Placeholders */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Title */}
        <div className="h-6 bg-navy-light/10 rounded w-2/3 animate-pulse" />

        {/* Short Description */}
        <div className="space-y-2">
          <div className="h-3.5 bg-navy-light/10 rounded w-full animate-pulse" />
          <div className="h-3.5 bg-navy-light/10 rounded w-5/6 animate-pulse" />
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-cream/80 rounded-xl border border-navy-light/5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-4 h-4 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-12 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-x border-navy-light/10">
            <div className="w-4 h-4 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-12 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-4 h-4 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-12 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Key Features Bullet List */}
        <div className="space-y-2.5 flex-1 pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 bg-navy-light/10 rounded-full animate-pulse" />
            <div className="w-32 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 bg-navy-light/10 rounded-full animate-pulse" />
            <div className="w-28 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 bg-navy-light/10 rounded-full animate-pulse" />
            <div className="w-36 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Custom Group Rental Terms Box Placeholder */}
        <div className="mb-5 space-y-1.5 bg-cream-warm/40 p-3.5 rounded-xl border border-navy-light/5">
          <div className="flex justify-between">
            <div className="w-16 h-3 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-20 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex justify-between">
            <div className="w-16 h-3 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-24 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="flex justify-between">
            <div className="w-20 h-3 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-16 h-3 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="w-3/4 h-2.5 bg-navy-light/10 rounded animate-pulse mx-auto mt-2" />
        </div>

        {/* Pricing and Action CTA */}
        <div className="pt-4 border-t border-navy-light/10 flex items-center justify-between mt-auto">
          <div className="flex-1 pr-2 space-y-2">
            <div className="w-16 h-2.5 bg-navy-light/10 rounded animate-pulse" />
            <div className="w-24 h-5.5 bg-navy-light/10 rounded animate-pulse" />
          </div>
          <div className="w-11 h-11 bg-navy-light/10 rounded-full animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  );
}

// Single Route Card Skeleton Loader
export function RouteCardSkeleton() {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-navy-light/10 shadow-sm bg-navy-dark animate-pulse">
      {/* Content Area simulating the overlay and fields */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-navy-dark/95 via-navy/70 to-transparent">
        {/* Route Icons placeholder */}
        <div className="w-36 h-3.5 bg-white/10 rounded mb-3" />

        {/* Origin and Destination Pair */}
        <div className="w-3/4 h-6 bg-white/15 rounded mb-3" />

        {/* Distance & Duration Row */}
        <div className="flex items-center space-x-4 mb-5">
          <div className="w-16 h-3 bg-white/10 rounded" />
          <div className="w-2.5 h-2.5 bg-white/10 rounded-full" />
          <div className="w-12 h-3 bg-white/10 rounded" />
        </div>

        {/* Price & CTA Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between w-full">
          <div className="space-y-2">
            <div className="w-10 h-2 bg-white/10 rounded" />
            <div className="w-28 h-5 bg-white/15 rounded" />
          </div>
          <div className="w-20 h-8 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Group row loading wrapper for Home Page Categories
export function FleetCategoryRowSkeleton() {
  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b border-navy-light/10 pb-3 mb-6">
        <div className="h-8 bg-navy-light/10 rounded w-1/4 animate-pulse" />
      </div>
      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <VehicleCardSkeleton />
        <VehicleCardSkeleton />
        <VehicleCardSkeleton />
      </div>
    </div>
  );
}

// Single Testimonial Card Skeleton Loader
export function TestimonialCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-navy-light/10 p-8 shadow-sm flex flex-col relative h-full animate-pulse">
      {/* Quote Icon Overlay placeholder */}
      <div className="absolute top-6 right-6 w-10 h-10 bg-navy-light/5 rounded-full" />
      {/* Star Ratings placeholder */}
      <div className="flex items-center space-x-1 mb-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-4 h-4 bg-navy-light/10 rounded-full" />
        ))}
      </div>
      {/* Review Text placeholder */}
      <div className="space-y-2 mb-6 flex-1">
        <div className="h-3.5 bg-navy-light/10 rounded w-full" />
        <div className="h-3.5 bg-navy-light/10 rounded w-5/6" />
        <div className="h-3.5 bg-navy-light/10 rounded w-4/5" />
      </div>
      {/* Reviewer Details placeholder */}
      <div className="pt-4 border-t border-navy-light/10 flex items-center space-x-3 mt-auto w-full">
        <div className="w-10 h-10 rounded-full bg-navy-light/10 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-navy-light/10 rounded w-2/3" />
          <div className="h-3 bg-navy-light/10 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
