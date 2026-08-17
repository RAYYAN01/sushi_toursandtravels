import React from 'react';
import { getBreadcrumbListSchema } from '@/lib/schema';
import { packages } from '@/lib/packages';
import PackageCard from '@/components/PackageCard';

export const metadata = {
  title: 'Tours & Packages | Sushi Travels Bangalore',
  description:
    'Explore Sushi Travels tour packages from Bangalore — Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry round trips with 9/12/17-seater Tempo Travellers, sedans and SUVs.',
};

export default function ToursAndPackagesPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Tours & Packages', item: '/tours-and-packages' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />

      {/* Tours & Packages Hero Banner — pulled up under the fixed transparent header, same pattern as the Fleet page */}
      <div
        className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center bg-cover bg-center px-4 text-center text-white"
        style={{ backgroundImage: `url('/Isha-Temple.webp')` }}
      >
        <div className="absolute inset-0 bg-navy-dark/75 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            Tours &amp; Packages
          </h1>
          <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">
            Ready-made round trips from Bangalore to Mysore, Coorg, Ooty, Goa, Tirupati and Pondicherry — matched to the right vehicle for your group size.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6 text-navy text-xs sm:text-sm leading-relaxed text-center">
          <strong>Don&apos;t see your destination?</strong> We run custom outstation trips across South and North India — call or WhatsApp us with your route and we&apos;ll put together a quote.
        </div>
      </div>
    </div>
  );
}
