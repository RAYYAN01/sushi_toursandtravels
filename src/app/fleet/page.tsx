'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { getFleetItemListSchema, getBreadcrumbListSchema } from '@/lib/schema';
import { sortVehiclesForDisplay, Vehicle } from '@/lib/vehicles';
import VehicleCard from '@/components/VehicleCard';
import { VehicleCardSkeleton } from '@/components/SkeletonLoader';

export default function FleetPage() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('/api/fleet', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Fleet API responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.vehicles) setVehiclesList(sortVehiclesForDisplay(data.vehicles));
      })
      .catch((err) => {
        console.error('Error fetching fleet:', err);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterCategories = ['All', ...Array.from(new Set(vehiclesList.map(v => v.type).filter(Boolean)))];

  const filteredVehicles = activeFilter === 'All'
    ? vehiclesList
    : vehiclesList.filter((v) => v.type.toLowerCase() === activeFilter.toLowerCase());

  // Breadcrumbs config
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Our Fleet', item: '/fleet' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFleetItemListSchema(vehiclesList)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />

      {/* Fleet Hero Banner — pulled up under the fixed header (-mt cancels out main's pt-[72px]/[80px] offset) so the transparent header shows this video, not empty page background. Extra top padding keeps the breadcrumb/heading clear of the header bar. */}
      <div className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center px-4 text-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/videos/fleet-scene-12.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/fleet-scene-12-poster.webp"
        />
        {/* Flat wash — matched to the home hero's 55% strength for reliable text contrast against bright video frames, while the fleet video itself stays visible */}
        <div className="absolute inset-0 bg-navy-dark/55 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold">
            Tempo Traveller Rental Fleet in Bangalore
          </h1>
          <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">
            9-seater, 12-seater &amp; 17-seater Tempo Traveller rentals in Bangalore, plus sedans, SUVs, and mini coaches — all with verified professional drivers for local, outstation, and group travel.
          </p>
        </div>
      </div>

      {/* SEO intro copy targeting general tempo traveller rental Bangalore terms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
            9, 12 & 17 Seater Tempo Traveller Rental in Bangalore
          </h2>
          <p className="text-sm text-navy-light leading-relaxed">
            Sushi Tours &amp; Travels (Sushi Travels) offers 9 seater, 12 seater and 17 seater Tempo Traveller hire in Bangalore for outstation trips, corporate travel, weddings, and pilgrimages. Every Tempo Traveller booking includes a verified driver, and our sedans, SUVs, and mini coach round out the fleet for smaller or larger groups. See our{' '}
            <Link href="/vehicles" className="text-primary font-semibold hover:text-primary-dark">
              dedicated vehicle pricing &amp; details pages
            </Link>{' '}
            for a full breakdown by category, or browse{' '}
            <Link href="/services" className="text-primary font-semibold hover:text-primary-dark">
              our rental services
            </Link>{' '}
            for airport, outstation, local and corporate travel.
          </p>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col space-y-6">

          {/* Filters List */}
          <div className="flex items-center justify-center overflow-x-auto py-2.5 space-x-3 scrollbar-thin">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                  activeFilter === category
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-navy-light/10 text-navy hover:bg-cream-warm hover:border-navy-light/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 justify-items-center">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="h-full w-full max-w-md mx-auto sm:max-w-none">
                  <VehicleCardSkeleton />
                </div>
              ))}
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 justify-items-center">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="h-full w-full max-w-md mx-auto sm:max-w-none">
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          ) : fetchError ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-navy-light/10 flex flex-col items-center justify-center space-y-3">
              <HelpCircle className="w-12 h-12 text-primary" />
              <h2 className="font-serif font-bold text-xl text-navy">Couldn&apos;t Load the Fleet</h2>
              <p className="text-xs text-navy max-w-sm">
                Something went wrong loading our vehicles. Please refresh the page, or call/WhatsApp us directly and we&apos;ll help you right away.
              </p>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-navy-light/10 flex flex-col items-center justify-center space-y-3">
              <HelpCircle className="w-12 h-12 text-primary animate-bounce" />
              <h2 className="font-serif font-bold text-xl text-navy">No Vehicles Available</h2>
              <p className="text-xs text-navy">We currently do not have vehicles listed in this category. Check back soon!</p>
            </div>
          )}

          {/* Core Rental Terms Disclaimer — combines the fare-variance note and the specific billing rules in one place instead of two stacked boxes */}
          <div className="mt-12 bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-4 text-navy">
            <div className="border-b border-navy-light/10 pb-3 space-y-1">
              <h2 className="font-serif font-bold text-lg">
                Core Car Rental Information
              </h2>
              <p className="text-xs text-navy-light">Final fare may vary depending on vehicle type, route, trip duration, tolls, parking, permits and other applicable charges.</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-navy">
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Mileage calculation:</strong> Trip mileage is counted depot-to-depot (from our garage coordinates back to garage).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Chauffeur food & lodging:</strong> Included in the outstation package rate per kilometer. No extra charge.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Interstate permit taxes:</strong> Charged extra based on border state check-posts receipts (e.g. crossing Karnataka to Tamil Nadu/Kerala).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold text-sm">✓</span>
                <span><strong>Airport Tolls:</strong> Included or charged on actual fastag logs. GST (5%) is added to the finalized invoice.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
